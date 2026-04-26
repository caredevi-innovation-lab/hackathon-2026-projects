export default function EmptyState({ title, message }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-[#cfdcf0] bg-[rgba(255,255,255,0.7)] px-6 py-12 text-center">
      <p className="m-0 text-lg font-semibold text-[#183f76]">{title}</p>
      <p className="m-0 mt-2 max-w-md text-sm text-[#60799f]">{message}</p>
    </div>
  );
}
