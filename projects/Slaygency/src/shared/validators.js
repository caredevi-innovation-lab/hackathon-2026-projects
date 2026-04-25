export function isValidRiskLevel(level) {
  return ['Low', 'Moderate', 'High'].includes(level);
}

export function isValidRole(role) {
  return ['Patient', 'HealthWorker', 'Doctor', 'Admin'].includes(role);
}

export function validateHealthInput(input) {
  if (!input) return false;

  const requiredNumberFields = ['age', 'bpSystolic', 'bpDiastolic', 'hemoglobin'];
  const numbersOk = requiredNumberFields.every((key) => typeof input[key] === 'number' && !Number.isNaN(input[key]));

  return (
    numbersOk &&
    Array.isArray(input.symptoms) &&
    typeof input.priorHypertension === 'boolean'
  );
}
