export function formatDateTime(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}

export function formatRiskScore(score) {
  if (score === null || score === undefined) return '-';
  return Number(score).toFixed(2);
}

export function toTitleCase(input) {
  return String(input || '')
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}
