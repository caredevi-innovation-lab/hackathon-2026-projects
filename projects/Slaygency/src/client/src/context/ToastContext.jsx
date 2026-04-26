import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

/**
 * Global toast notification provider.
 * Usage: const { showToast } = useToast();
 *        showToast('Saved!', 'success');
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, text: '', tone: 'success' });

  const showToast = useCallback((text, tone = 'success', duration = 3000) => {
    setToast({ show: true, text, tone });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), duration);
  }, []);

  const value = useMemo(() => ({ toast, showToast }), [toast, showToast]);

  const tones = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    danger: 'border-rose-200 bg-rose-50 text-rose-700',
    info: 'border-blue-200 bg-blue-50 text-blue-700',
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Global toast element */}
      {toast.show && (
        <div className="fixed right-4 top-4 z-[9999] animate-[slideIn_0.3s_ease-out]">
          <div
            className={`rounded-xl border px-5 py-3.5 text-sm font-semibold shadow-[0_12px_24px_rgba(13,45,96,0.16)] backdrop-blur-sm ${
              tones[toast.tone] || tones.success
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
