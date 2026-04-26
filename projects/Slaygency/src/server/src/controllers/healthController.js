import {
  createHealthRecordForUser,
  listHealthRecordsForUser,
  updateHealthRecordForUser,
} from '../services/healthService.js';

export async function addHealthRecord(req, res, next) {
  try {
    const record = await createHealthRecordForUser({
      userId: req.user.id,
      payload: req.body,
    });

    return res.status(201).json(record);
  } catch (error) {
    return next(error);
  }
}

export async function getHealthRecords(req, res, next) {
  try {
    const records = await listHealthRecordsForUser(req.user.id);
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
