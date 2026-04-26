export default function Toast({ show, text, tone = 'success' }) {
  if (!show) {
    return null;
  }

  const tones = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    danger: 'border-rose-200 bg-rose-50 text-rose-700',
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      <div
        className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-[0_12px_24px_rgba(13,45,96,0.16)] ${tones[tone] || tones.success}`}
      >
        {text}
      </div>
    </div>
  );
}
