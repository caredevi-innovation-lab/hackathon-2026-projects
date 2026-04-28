import { RISK_BADGE_CLASSES } from '../../utils/riskColors.js';

/**
 * Consistent stat card used across ALL roles.
 * Shows a metric with icon, title, value, and optional trend text.
 */
export default function StatCard({ title, value, trend, icon, tone = 'primary', onClick }) {
  const iconTones = {
    primary: 'bg-indigo-50 text-indigo-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="m-0 text-xs font-semibold text-slate-500  tracking-wider">{title}</p>
          <p className="m-0 mt-2 text-2xl font-semibold leading-none text-slate-800">{value}</p>
          {trend && <p className="m-0 mt-2 text-xs font-medium text-slate-400">{trend}</p>}
        </div>
        {icon && (
          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${iconTones[tone] || iconTones.primary}`}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

