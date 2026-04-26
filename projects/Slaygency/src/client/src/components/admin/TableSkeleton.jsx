export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-2xl border border-[#dbe4f3] bg-white p-4 shadow-[0_10px_24px_rgba(17,68,144,0.08)]">
      <div className="mb-3 h-4 w-40 animate-pulse rounded bg-[#e8eef8]" />
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-xl bg-[#f3f7ff]" />
        ))}
      </div>
    </div>
  );
}
