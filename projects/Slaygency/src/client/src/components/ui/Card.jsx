/**
 * Consistent card wrapper used across ALL roles.
 * Provides standardized padding, border, shadow, and hover effect.
 */
export default function Card({ children, className = '', onClick, padding = 'p-5' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${padding} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
