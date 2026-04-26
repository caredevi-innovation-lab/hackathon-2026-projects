function asNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function isArrayOrUndefined(value) {
  return value === undefined || Array.isArray(value);
}

function isRealisticBP(systolicBP, diastolicBP) {
  if (systolicBP <= diastolicBP) return false;
  if (systolicBP < 70 || systolicBP > 260) return false;
  if (diastolicBP < 40 || diastolicBP > 160) return false;
  return true;
}

export function validateHealthInput(payload = {}) {
  const age = asNumber(payload.age);
  const systolicBP = asNumber(payload.systolicBP);
  const diastolicBP = asNumber(payload.diastolicBP);
  const hemoglobin = asNumber(payload.hemoglobin);

  if (age === null || age <= 0) {
    return 'Age must be greater than 0';
  }

  if (systolicBP === null || diastolicBP === null || !isRealisticBP(systolicBP, diastolicBP)) {
    return 'Blood pressure values are not realistic';
  }

  if (hemoglobin === null || hemoglobin <= 0) {
    return 'Hemoglobin must be greater than 0';
  }

  if (!isArrayOrUndefined(payload.symptoms)) {
    return 'Symptoms must be an array of strings';
  }

  return null;
}

export function validateRiskInput(payload = {}) {
  const age = asNumber(payload.age);
  const systolic = asNumber(payload.bpSystolic ?? payload.systolicBP);
  const diastolic = asNumber(payload.bpDiastolic ?? payload.diastolicBP);
  const hemoglobin = asNumber(payload.hemoglobin);

  if (age === null || age < 10 || age > 60) {
    return 'Age must be between 10 and 60';
  }

  if (systolic === null || systolic < 60 || systolic > 200) {
    return 'Systolic BP must be between 60 and 200';
  }

  if (diastolic === null || diastolic < 40 || diastolic > 130) {
    return 'Diastolic BP must be between 40 and 130';
  }

  if (hemoglobin === null || hemoglobin < 4 || hemoglobin > 20) {
    return 'Hemoglobin must be between 4 and 20';
  }

  if (!isArrayOrUndefined(payload.symptoms)) {
    return 'Symptoms must be an array of strings';
  }

  return null;
}
