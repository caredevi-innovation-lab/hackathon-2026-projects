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

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

export function validateRiskPayload(req, res, next) {
  const { age, bpSystolic, bpDiastolic, hemoglobin, symptoms } = req.body || {};

  if (!isFiniteNumber(age) || Number(age) < 10 || Number(age) > 60) {
    return res.status(400).json({ message: 'Age must be between 10 and 60' });
  }

  if (!isFiniteNumber(bpSystolic) || Number(bpSystolic) < 60 || Number(bpSystolic) > 200) {
    return res.status(400).json({ message: 'Systolic BP must be between 60 and 200' });
  }

  if (!isFiniteNumber(bpDiastolic) || Number(bpDiastolic) < 40 || Number(bpDiastolic) > 130) {
    return res.status(400).json({ message: 'Diastolic BP must be between 40 and 130' });
  }

  if (!isFiniteNumber(hemoglobin) || Number(hemoglobin) < 4 || Number(hemoglobin) > 20) {
    return res.status(400).json({ message: 'Hemoglobin must be between 4 and 20' });
  }

  if (symptoms !== undefined && !Array.isArray(symptoms)) {
    return res.status(400).json({ message: 'Symptoms must be an array of strings' });
  }

  return next();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const allowedRoles = ['Patient', 'Doctor', 'Admin'];
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

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
