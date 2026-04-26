import { USER_ROLES } from '../models/User.js';
import { validateRiskInput } from '../services/clinicalValidationService.js';

export function validateHealthPayload(req, res, next) {
  const { age, bpSystolic, bpDiastolic, hemoglobin, symptoms, priorHypertension } = req.body;

  if (
    age === undefined ||
    bpSystolic === undefined ||
    bpDiastolic === undefined ||
    hemoglobin === undefined ||
    !Array.isArray(symptoms) ||
    typeof priorHypertension !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid health payload' });
  }

  return next();
}

export function validateRiskPayload(req, res, next) {
  const error = validateRiskInput(req.body || {});
  if (error) {
    return res.status(400).json({ message: error });
  }

  return next();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeRegisterRole(role) {
  if (!role) {
    return USER_ROLES.PATIENT;
  }

  const normalized = String(role).trim().toLowerCase();
  if (normalized === 'healthworker') {
    return USER_ROLES.DOCTOR;
  }

  if (normalized === String(USER_ROLES.PATIENT).toLowerCase()) {
    return USER_ROLES.PATIENT;
  }

  if (normalized === String(USER_ROLES.DOCTOR).toLowerCase()) {
    return USER_ROLES.DOCTOR;
  }

  if (normalized === String(USER_ROLES.ADMIN).toLowerCase()) {
    return USER_ROLES.ADMIN;
  }

  return null;
}

export function validateRegisterPayload(req, res, next) {
  const { name, email, password, role } = req.body;

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  if (!email || !EMAIL_REGEX.test(String(email).toLowerCase())) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!password || String(password).length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  const normalizedRole = normalizeRegisterRole(role);
  if (role && !normalizedRole) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  req.body.role = normalizedRole || USER_ROLES.PATIENT;

  return next();
}

export function validateLoginPayload(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  return next();
}

export function validateForgotPasswordPayload(req, res, next) {
  const { email } = req.body;
  if (!email || !EMAIL_REGEX.test(String(email).toLowerCase())) {
    return res.status(400).json({ message: 'Valid email is required' });
  }
  return next();
}

export function validateResetPasswordPayload(req, res, next) {
  const { token, newPassword } = req.body;
  if (!token || !newPassword || String(newPassword).length < 8) {
    return res
      .status(400)
      .json({ message: 'Token and newPassword (min 8 chars) are required' });
  }
  return next();
}

export function validatePasswordChangePayload(req, res, next) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || String(newPassword).length < 8) {
    return res.status(400).json({
      message: 'currentPassword and newPassword (min 8 chars) are required',
    });
  }
  return next();
}
