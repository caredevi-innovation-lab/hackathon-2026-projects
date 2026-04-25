import mongoose from 'mongoose';
import { HealthRecord } from '../models/HealthRecord.js';
import { USER_ROLES, User } from '../models/User.js';

const ALLOWED_ROLE_FILTERS = new Set([...Object.values(USER_ROLES), 'all']);

export async function listPatients(req, res, next) {
  try {
    const { role = USER_ROLES.PATIENT, search, page = 1, limit = 20 } = req.query;

    if (!ALLOWED_ROLE_FILTERS.has(role)) {
      return res.status(400).json({
        message: `Invalid role filter. Allowed: ${[...ALLOWED_ROLE_FILTERS].join(', ')}`,
      });
    }

    const query = { isActive: true };

    if (role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [patients, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      User.countDocuments(query),
    ]);

    return res.json({
      items: patients.map((patient) => patient.toPublicJSON()),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getPatientById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid patient id' });
    }

    const patient = await User.findById(id);
    if (!patient || patient.role !== USER_ROLES.PATIENT || !patient.isActive) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const records = await HealthRecord.find({ user: patient._id }).sort({ createdAt: -1 });

    return res.json({
      patient: patient.toPublicJSON(),
      records,
    });
  } catch (error) {
    return next(error);
  }
}
