import { IconSearch } from './icons.jsx';

export default function AdminTopbar({ title, subtitle }) {
  return (
    <header className="px-1 py-1 sm:px-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="m-0 text-[1.95rem] font-semibold tracking-tight text-[#10264d]">
            {title}
          </h1>
          <p className="m-0 mt-1 text-base text-[#4f6990]">{subtitle}</p>
        </div>

        <label className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[#c9d8ef] bg-white px-4 py-3 text-[#4f6990] shadow-[0_10px_20px_rgba(17,68,144,0.1)] sm:w-auto">
          <IconSearch />
          <input
            className="w-full border-0 bg-transparent text-base text-[#1f3f70] outline-none"
            placeholder="Search users, patients, alerts..."
          />
        </label>
      </div>
    </header>
  );
}
