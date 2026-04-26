/**
 * Consistent primary button used across ALL roles.
 * Supports: primary, secondary, danger, ghost variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 border-transparent',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200 border-transparent',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 border-transparent',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
