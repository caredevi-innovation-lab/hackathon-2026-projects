import { createConditionAlertFromRecord } from '../controllers/alertController.js';
import { HealthRecord } from '../models/HealthRecord.js';
import { createHttpError } from '../utils/httpError.js';
import { validateHealthInput } from './clinicalValidationService.js';
import { predictMaternalRisk } from './riskService.js';

function normalizeHealthPayload(payload = {}) {
  return {
    age: Number(payload.age),
    systolicBP: Number(payload.systolicBP),
    diastolicBP: Number(payload.diastolicBP),
    hemoglobin: Number(payload.hemoglobin),
    symptoms: Array.isArray(payload.symptoms) ? payload.symptoms : [],
    pregnancyHistory: payload.pregnancyHistory !== undefined ? payload.pregnancyHistory : '',
  };
}

/**
 * Run AI risk prediction on a health record and attach results.
 * Non-blocking: if AI fails, the record is still saved with riskSource = null.
 */
async function attachRiskPrediction(record) {
  try {
    const prediction = await predictMaternalRisk({
      age: record.age,
      systolicBP: record.systolicBP,
      diastolicBP: record.diastolicBP,
      hemoglobin: record.hemoglobin,
      symptoms: record.symptoms,
    });

    if (prediction && prediction.riskLevel) {
      record.riskLevel = prediction.riskLevel;
      record.riskScore = prediction.riskScore;
      record.riskExplanation = prediction.explanation || '';
      record.riskSource = prediction.source || 'ai';
      await record.save();
    }
  } catch (error) {
    // AI prediction failure should never block record creation
    // eslint-disable-next-line no-console
    console.warn('[healthService] AI prediction failed for record', record._id, error.message);
  }
}

export async function createHealthRecordForUser({ userId, payload }) {
  const validationError = validateHealthInput(payload);
  if (validationError) {
    throw createHttpError(validationError, 400);
  }

  const normalized = normalizeHealthPayload(payload);
  const record = await HealthRecord.create({
    user: userId,
    ...normalized,
  });

  // Run AI prediction and condition alert in parallel (non-blocking)
  await Promise.allSettled([
    attachRiskPrediction(record),
    createConditionAlertFromRecord({
      healthRecord: record,
      actorId: userId,
    }),
  ]);

  // Reload to get any updates from attachRiskPrediction
  const updatedRecord = await HealthRecord.findById(record._id);
  return updatedRecord || record;
}

export async function listHealthRecordsForUser(userId) {
  return HealthRecord.find({ user: userId }).sort({ createdAt: -1 });
}

export async function updateHealthRecordForUser({ userId, recordId, payload }) {
  const record = await HealthRecord.findById(recordId);
  if (!record) {
    throw createHttpError('Health record not found', 404);
  }

  if (record.user.toString() !== userId) {
    throw createHttpError('Forbidden', 403);
  }

  const mergedPayload = {
    age: payload.age ?? record.age,
    systolicBP: payload.systolicBP ?? record.systolicBP,
    diastolicBP: payload.diastolicBP ?? record.diastolicBP,
    hemoglobin: payload.hemoglobin ?? record.hemoglobin,
    symptoms: payload.symptoms ?? record.symptoms,
    pregnancyHistory: payload.pregnancyHistory ?? record.pregnancyHistory,
  };

  const validationError = validateHealthInput(mergedPayload);
  if (validationError) {
    throw createHttpError(validationError, 400);
  }

  const normalized = normalizeHealthPayload(mergedPayload);
  record.age = normalized.age;
  record.systolicBP = normalized.systolicBP;
  record.diastolicBP = normalized.diastolicBP;
  record.hemoglobin = normalized.hemoglobin;
  record.symptoms = normalized.symptoms;
  record.pregnancyHistory = normalized.pregnancyHistory;

  await record.save();

  // Re-run AI prediction and condition alert on update
  await Promise.allSettled([
    attachRiskPrediction(record),
    createConditionAlertFromRecord({
      healthRecord: record,
      actorId: userId,
    }),
  ]);

  const updatedRecord = await HealthRecord.findById(record._id);
  return updatedRecord || record;
}
