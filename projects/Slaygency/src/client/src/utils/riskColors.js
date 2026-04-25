const COLORS = {
  Low: '#2e7d32',
  Moderate: '#ed6c02',
  High: '#d32f2f',
};

export function riskLevelColor(level) {
  return COLORS[level] || '#607d8b';
}

export default COLORS;
