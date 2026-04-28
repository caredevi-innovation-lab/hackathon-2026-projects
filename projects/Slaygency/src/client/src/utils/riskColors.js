const COLORS = {
  Low: '#2e7d32',
  Moderate: '#ed6c02',
  High: '#d32f2f',
};

export function riskLevelColor(level) {
  return COLORS[level] || '#607d8b';
}

/**
 * Tailwind class mappings for risk level badges.
 * Usage: <span className={RISK_BADGE_CLASSES[riskLevel]}>...</span>
 */
export const RISK_BADGE_CLASSES = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Unknown: 'bg-slate-100 text-slate-600 border-slate-200',
};

/**
 * Get the Tailwind background color class for a risk level.
 */
export function riskBgClass(level) {
  const map = {
    High: 'bg-red-500',
    Moderate: 'bg-amber-500',
    Low: 'bg-emerald-500',
  };
  return map[level] || 'bg-slate-400';
}

export default COLORS;
