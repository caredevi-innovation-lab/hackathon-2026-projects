/**
 * Consistent page header used across ALL roles.
 * Provides title, optional subtitle, and action slot.
 */
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="m-0 text-xl font-semibold text-slate-800 leading-tight">{title}</h1>
        {subtitle && (
          <p className="m-0 mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

