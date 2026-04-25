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
