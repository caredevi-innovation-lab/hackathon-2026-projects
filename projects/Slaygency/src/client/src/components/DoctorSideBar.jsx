function IconShield() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 3l7 3v5c0 4.7-2.9 8.9-7 10-4.1-1.1-7-5.3-7-10V6l7-3z" fill="currentColor" />
      <path d="M12 8v7M8.5 11.5h7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function IconPatient() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <circle cx="9" cy="8" r="3" fill="currentColor" />
      <path d="M3.5 18.5a5.5 5.5 0 0111 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 8v8M13 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v6M16 3v6M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M5 18V9M12 18V5M19 18v-7M4 19h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 3v5h5M10 12h6M10 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.18" />
      <path d="M9.7 9.4a2.6 2.6 0 114.1 2.1c-.8.5-1.3 1-1.3 1.9M12 17h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M10 5H6v14h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 8l4 4-4 4M17 12H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-2xl border-0 px-4 py-3 text-left text-[0.95rem] transition duration-200 ${
        active
          ? 'bg-[linear-gradient(90deg,#eef2ff_0%,#f7f8ff_100%)] text-[#3a37e0] shadow-[inset_-3px_0_0_#5348ff]'
          : 'text-[#54607a] hover:bg-[#f2f4ff] hover:text-[#3d39de]'
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function DoctorSideBar() {
  return (
    <aside className="flex flex-row items-start gap-4 overflow-x-auto border-b border-[rgba(134,132,188,0.14)] bg-[rgba(255,255,255,0.88)] p-4 backdrop-blur-[20px] lg:flex-col lg:justify-between lg:gap-8 lg:border-b-0 lg:border-r lg:px-3 lg:py-5">
      <div className="w-full">
        <div className="flex items-center gap-3 px-2 pb-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#635bff] to-[#483ae6] text-white shadow-[0_10px_24px_rgba(84,72,255,0.2)]">
            <IconShield />
          </div>
          <div>
            <h1 className="m-0 text-[1rem] font-semibold tracking-[-0.01em]">Maternova</h1>
            <p className="m-0 text-[0.68rem] uppercase tracking-[0.16em] text-[#8b92ab]">Nepal Health Portal</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 lg:grid lg:gap-1.5">
          <SidebarItem icon={<IconGrid />} label="Dashboard" active />
          <SidebarItem icon={<IconPatient />} label="Patient Records" />
          <SidebarItem icon={<IconCalendar />} label="Appointments" />
          <SidebarItem icon={<IconChart />} label="Health Analytics" />
          <SidebarItem icon={<IconFile />} label="Medical Resources" />
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-2 border-0 pt-0 lg:ml-0 lg:grid lg:w-full lg:gap-1.5 lg:border-t lg:border-[rgba(134,132,188,0.14)] lg:px-2 lg:pt-5">
        <SidebarItem icon={<IconHelp />} label="Help & Support" />
        <SidebarItem icon={<IconLogout />} label="Logout" />
      </div>
    </aside>
  );
}
