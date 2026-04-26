import { IconSearch } from './icons.jsx';

export default function AdminTopbar({ title, subtitle }) {
  return (
    <header className="px-1 py-1 sm:px-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="m-0 text-[1.85rem] font-semibold tracking-tight text-[#10264d]">
            {title}
          </h1>
          <p className="m-0 mt-1 text-sm text-[#5f7698]">{subtitle}</p>
        </div>

        <label className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-[#d8e3f2] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-[#5f7698] shadow-[0_8px_16px_rgba(17,68,144,0.08)] backdrop-blur-sm sm:w-auto">
          <IconSearch />
          <input
            className="w-full border-0 bg-transparent text-sm text-[#2d4570] outline-none"
            placeholder="Search users, patients, alerts..."
          />
        </label>
      </div>
    </header>
  );
}
