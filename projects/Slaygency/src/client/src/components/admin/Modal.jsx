export default function Modal({ open, title, children, onClose, onConfirm, confirmText = 'Save' }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(11,24,49,0.45)] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#dce6f7] bg-white p-5 shadow-[0_24px_60px_rgba(16,43,92,0.3)]">
        <div className="flex items-center justify-between">
          <h3 className="m-0 text-lg font-semibold text-[#133463]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d6e1f2] px-2 py-1 text-xs text-[#5f789f] hover:bg-[#f6faff]"
          >
            Close
          </button>
        </div>

        <div className="mt-4">{children}</div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d6e1f2] px-4 py-2 text-sm font-semibold text-[#5f789f] hover:bg-[#f6faff]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg border border-transparent bg-[linear-gradient(90deg,#2250b6_0%,#007a8a_100%)] px-4 py-2 text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
