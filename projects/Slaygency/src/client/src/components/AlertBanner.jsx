export default function AlertBanner({ message, type = 'info' }) {
  if (!message) return null;

  const palette = {
    info: { bg: '#e3f2fd', color: '#0d47a1' },
    warning: { bg: '#fff3e0', color: '#e65100' },
    error: { bg: '#ffebee', color: '#b71c1c' },
    success: { bg: '#e8f5e9', color: '#1b5e20' },
  };

  const style = palette[type] || palette.info;

  return (
    <div
      style={{ background: style.bg, color: style.color, padding: '0.75rem 1rem', borderRadius: 8 }}
    >
      {message}
    </div>
  );
}
