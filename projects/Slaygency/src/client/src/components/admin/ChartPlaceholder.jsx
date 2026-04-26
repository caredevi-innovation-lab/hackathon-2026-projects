export default function ChartPlaceholder() {
  const bars = [48, 72, 88, 54, 80, 66];

  return (
    <div className="rounded-2xl border border-[#dbe4f3] bg-white p-5 shadow-[0_12px_26px_rgba(17,68,144,0.08)]">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h3 className="m-0 text-lg font-semibold text-[#163a6f]">Regional Health Trends</h3>
          <p className="m-0 mt-1 text-xs text-[#6482ac]">Comparative patient registration growth</p>
        </div>
        <span className="rounded-full border border-[#d7e2f3] bg-[#f6faff] px-3 py-1 text-xs font-semibold text-[#5c7395]">
          Monthly
        </span>
      </div>

      <div className="grid h-56 grid-cols-6 items-end gap-3">
        {bars.map((height, index) => (
          <div
            key={index}
            className="rounded-t-xl bg-[linear-gradient(180deg,#c5d4ff_0%,#6676ff_100%)]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
