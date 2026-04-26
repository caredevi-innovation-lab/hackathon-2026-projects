// Icon components for sidebar
const icons = {
  overview: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" opacity=".5"/><rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor"/><rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" opacity=".5"/></svg>
  ),
  patient: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" opacity=".12"/><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.31 0-6 2.69-6 6h2a4 4 0 018 0h2c0-3.31-2.69-6-6-6z" fill="currentColor"/></svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><polygon points="12,2 22,20 2,20" fill="currentColor" opacity=".12"/><polygon points="12,6 19,18 5,18" fill="currentColor"/></svg>
  ),
  outreach: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm0 2a5 5 0 100 10 5 5 0 000-10z" fill="currentColor" opacity=".12"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="currentColor"/></svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity=".12"/><rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor"/></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".12"/><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6v2m0 16v2m8-10h2M2 12H0m15.54-7.54l1.42 1.42M4.22 19.78l1.42-1.42m12.02 0l-1.42-1.42M4.22 4.22l1.42 1.42" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".12"/><path d="M12 17h.01M12 13a2 2 0 10-2-2" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
  ),
  signout: (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="3" y="3" width="7" height="18" rx="2" fill="currentColor" opacity=".12"/></svg>
  ),
};

function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition text-[0.97rem] font-medium ${
      active
        ? 'bg-[#f4f6ff] text-[#3a37e0]' : 'text-[#5348ff] hover:bg-[#f4f6ff] hover:text-[#3a37e0]'}
    `}>
      <span className="shrink-0 text-[#5348ff]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function HealthWorkerSideBar() {
  return (
    <aside className="flex flex-col h-full min-h-screen w-[230px] bg-white border-r border-[#f0f0f0] shadow-sm justify-between py-6 px-0">
      <div>
        {/* Logo and title */}
        <div className="flex items-center gap-3 px-6 pb-7">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#635bff] to-[#483ae6] text-white shadow-md">
            <svg viewBox="0 0 24 24" className="w-6 h-6"><rect x="4" y="4" width="16" height="16" rx="4" fill="white" opacity=".18"/><rect x="8" y="8" width="8" height="8" rx="2" fill="white" opacity=".5"/></svg>
          </div>
          <div>
            <h1 className="m-0 text-[1.08rem] font-semibold leading-tight">Maternova</h1>
            <p className="m-0 text-[0.7rem] uppercase tracking-[0.14em] text-[#b0b5c9] font-medium">Healthcare Portal</p>
          </div>
        </div>
        {/* Main nav */}
        <nav className="flex flex-col gap-1 px-2">
          <SidebarItem icon={icons.overview} label="Dashboard" />
          <SidebarItem icon={icons.patient} label="Patient Records" active />
          <SidebarItem icon={icons.risk} label="Risk Monitoring" />
          <SidebarItem icon={icons.outreach} label="Community Outreach" />
          <SidebarItem icon={icons.reports} label="Health Reports" />
          <SidebarItem icon={icons.settings} label="Settings" />
        </nav>
        {/* Add Health Data button */}
        <div className="px-6 mt-6">
          <button className="w-full bg-[#5348ff] hover:bg-[#3a37e0] text-white font-semibold py-2 rounded-lg shadow transition-all text-sm flex items-center justify-center gap-2">
            <span className="text-lg">+</span> Add Health Data
          </button>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex flex-col gap-1 px-2 mt-8">
        <SidebarItem icon={icons.help} label="Help Center" />
        <SidebarItem icon={icons.signout} label="Sign Out" />
      </div>
    </aside>
  );
}
  ;
