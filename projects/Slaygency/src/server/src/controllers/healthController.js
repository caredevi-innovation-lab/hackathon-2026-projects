import {
  createHealthRecordForUser,
  listHealthRecordsForUser,
  updateHealthRecordForUser,
} from '../services/healthService.js';
import mongoose from 'mongoose';
import { USER_ROLES, User } from '../models/User.js';

export async function addHealthRecord(req, res, next) {
  try {
    let targetUserId = req.user.id;
    const { patientId, ...payload } = req.body || {};

    // Doctor/Admin must explicitly select a patient when creating records.
    if ([USER_ROLES.DOCTOR, USER_ROLES.ADMIN].includes(req.user.role) && patientId === undefined) {
      return res.status(400).json({ message: 'patientId is required for Doctor/Admin health record submission' });
    }

    if (patientId !== undefined) {
      if (![USER_ROLES.DOCTOR, USER_ROLES.ADMIN].includes(req.user.role)) {
        return res.status(403).json({ message: 'Only Doctor or Admin can submit records for a patient' });
      }

      if (!mongoose.isValidObjectId(patientId)) {
        return res.status(400).json({ message: 'Invalid patientId' });
      }

      const patient = await User.findById(patientId);
      if (!patient || !patient.isActive || patient.role !== USER_ROLES.PATIENT) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      targetUserId = patient._id.toString();
    }

    const record = await createHealthRecordForUser({
      userId: targetUserId,
      payload,
    });

    return res.status(201).json(record);
  } catch (error) {
    return next(error);
  }
}

export async function getHealthRecords(req, res, next) {
  try {
    let targetUserId = req.user.id;
    const { patientId } = req.query || {};

    if (patientId !== undefined) {
      if (![USER_ROLES.DOCTOR, USER_ROLES.ADMIN].includes(req.user.role)) {
        return res.status(403).json({ message: 'Only Doctor or Admin can view records by patientId' });
      }

      if (!mongoose.isValidObjectId(patientId)) {
        return res.status(400).json({ message: 'Invalid patientId' });
      }

      const patient = await User.findById(patientId);
      if (!patient || !patient.isActive || patient.role !== USER_ROLES.PATIENT) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      targetUserId = patient._id.toString();
    }

    const records = await listHealthRecordsForUser(targetUserId);
    return res.json(records);
  } catch (error) {
    return next(error);
  }
}

export async function updateHealthRecord(req, res, next) {
  try {
    const record = await updateHealthRecordForUser({
      userId: req.user.id,
      recordId: req.params.id,
      payload: req.body,
    });

    return res.json(record);
  } catch (error) {
    return next(error);
  }
}
