export default function StatCard({ title, value, trend, icon, tone = 'primary' }) {
  const tones = {
    primary: 'from-[#eaf2ff] to-[#f6f9ff] text-[#25529a]',
    success: 'from-[#e9fbf4] to-[#f7fffc] text-[#0f8f78]',
    warning: 'from-[#fff7e6] to-[#fffdf5] text-[#bc7a10]',
    danger: 'from-[#fff0f2] to-[#fff8f9] text-[#c83b52]',
  };

  return (
    <article className="rounded-2xl border border-[rgba(169,189,220,0.3)] bg-white p-4 shadow-[0_12px_26px_rgba(17,68,144,0.08)] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_34px_rgba(17,68,144,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="m-0 text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">{title}</p>
          <p className="m-0 mt-2 text-[1.9rem] font-semibold leading-none text-[#112f59]">
            {value}
          </p>
          <p className="m-0 mt-2 text-xs font-semibold text-[#5e7497]">{trend}</p>
        </div>
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tones[tone] || tones.primary}`}
        >
          {icon}
        </span>
      </div>
    </article>
  );
}
