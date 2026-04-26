import { createConditionAlertFromRecord } from '../controllers/alertController.js';
import { HealthRecord } from '../models/HealthRecord.js';
import { validateHealthInput } from './clinicalValidationService.js';

function createHttpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

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

  await createConditionAlertFromRecord({
    healthRecord: record,
    actorId: userId,
  });

  return record;
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

  await createConditionAlertFromRecord({
    healthRecord: record,
    actorId: userId,
  });

  return record;
}
