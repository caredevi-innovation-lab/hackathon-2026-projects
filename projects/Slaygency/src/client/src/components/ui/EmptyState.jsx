/**
 * Consistent empty state used across ALL roles.
 */
export default function EmptyState({ icon, title, message, children }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center">
      {icon && <div className="mb-3 text-slate-300">{icon}</div>}
      <p className="m-0 text-base font-semibold text-slate-600">{title}</p>
      {message && <p className="m-0 mt-2 max-w-md text-sm text-slate-400">{message}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
