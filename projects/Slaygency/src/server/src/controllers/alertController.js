import mongoose from 'mongoose';
import { Alert } from '../models/Alert.js';
import { HealthRecord } from '../models/HealthRecord.js';
import { USER_ROLES, User } from '../models/User.js';

function asNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function evaluateConditionRisk({ systolicBP, diastolicBP, hemoglobin, symptoms = [] }) {
  const reasons = [];

  const systolic = asNumber(systolicBP);
  const diastolic = asNumber(diastolicBP);
  const hb = asNumber(hemoglobin);

  if (systolic !== null && systolic >= 140) reasons.push(`Elevated systolic BP (${systolic})`);
  if (diastolic !== null && diastolic >= 90) reasons.push(`Elevated diastolic BP (${diastolic})`);
  if (hb !== null && hb < 10) reasons.push(`Low hemoglobin (${hb})`);

  const criticalSymptoms = new Set([
    'severe headache',
    'blurred vision',
    'swelling',
    'bleeding',
    'seizure',
    'convulsion',
  ]);

  const normalizedSymptoms = Array.isArray(symptoms)
    ? symptoms.map((item) => String(item).trim().toLowerCase())
    : [];

  if (normalizedSymptoms.some((symptom) => criticalSymptoms.has(symptom))) {
    reasons.push('Critical maternal symptoms detected');
  }

  return {
    isHighRisk: reasons.length > 0,
    reasons,
  };
}

export async function createAlert(req, res, next) {
  try {
    const {
      patientId,
      healthRecordId,
      manualHighRisk = false,
      message,
      reasons = [],
      vitals,
    } = req.body;

    if (!mongoose.isValidObjectId(patientId)) {
      return res.status(400).json({ message: 'Valid patientId is required' });
    }

    const patient = await User.findById(patientId);
    if (!patient || !patient.isActive || patient.role !== USER_ROLES.PATIENT) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    let record = null;
    if (healthRecordId !== undefined) {
      if (!mongoose.isValidObjectId(healthRecordId)) {
        return res.status(400).json({ message: 'Invalid healthRecordId' });
      }

      record = await HealthRecord.findById(healthRecordId);
      if (!record || record.user.toString() !== patientId) {
        return res.status(404).json({ message: 'Health record not found for patient' });
      }
    }

    const conditionRisk = evaluateConditionRisk(
      vitals ||
        (record
          ? {
              systolicBP: record.systolicBP,
              diastolicBP: record.diastolicBP,
              hemoglobin: record.hemoglobin,
              symptoms: record.symptoms,
            }
          : {})
    );

    const manualReasons = Array.isArray(reasons)
      ? reasons.map((item) => String(item).trim()).filter(Boolean)
      : [];

    const isHighRisk = Boolean(manualHighRisk) || conditionRisk.isHighRisk;
    if (!isHighRisk) {
      return res.status(400).json({
        message: 'Alert can be created only for manually high-risk or condition-based high-risk cases',
      });
    }

    const source = manualHighRisk ? 'manual' : 'condition';
    const mergedReasons = [...new Set([...(manualHighRisk ? manualReasons : []), ...conditionRisk.reasons])];

    const alert = await Alert.create({
      patient: patient._id,
      healthRecord: record?._id || null,
      createdBy: req.user.id,
      source,
      priority: 'high',
      status: 'active',
      reasons: mergedReasons,
      message:
        String(message || '').trim() ||
        `High-risk alert generated for ${patient.name} (${source === 'manual' ? 'manual' : 'condition-based'})`,
    });

    const populatedAlert = await Alert.findById(alert._id)
      .populate('patient', 'name email phone')
      .populate('healthRecord');

    return res.status(201).json({ alert: populatedAlert });
  } catch (error) {
    return next(error);
  }
}

export async function getAlerts(req, res, next) {
  try {
    const { status = 'active', patientId, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    if (patientId) {
      if (!mongoose.isValidObjectId(patientId)) {
        return res.status(400).json({ message: 'Invalid patientId filter' });
      }
      query.patient = patientId;
    }

    const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      Alert.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .populate('patient', 'name email phone')
        .populate('createdBy', 'name role')
        .populate('healthRecord'),
      Alert.countDocuments(query),
    ]);

    return res.json({
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    });
  } catch (error) {
    return next(error);
  }
}

export async function createConditionAlertFromRecord({ healthRecord, actorId }) {
  const conditionRisk = evaluateConditionRisk({
    systolicBP: healthRecord.systolicBP,
    diastolicBP: healthRecord.diastolicBP,
    hemoglobin: healthRecord.hemoglobin,
    symptoms: healthRecord.symptoms,
  });

  if (!conditionRisk.isHighRisk) {
    return null;
  }

  const existing = await Alert.findOne({
    patient: healthRecord.user,
    healthRecord: healthRecord._id,
    status: 'active',
    source: 'condition',
  });

  if (existing) {
    return existing;
  }

  return Alert.create({
    patient: healthRecord.user,
    healthRecord: healthRecord._id,
    createdBy: actorId,
    source: 'condition',
    priority: 'high',
    status: 'active',
    reasons: conditionRisk.reasons,
    message: 'Condition-based high-risk alert generated from health record',
  });
}
