import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Modern SVG icons matching the sidebar design
const icons = {
  overview: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".5"/>
    </svg>
  ),
  records: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" fill="currentColor" opacity=".12"/>
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M9 18v-1a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 3l10 18H2L12 3z" fill="currentColor" opacity=".15"/>
      <path d="M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  outreach: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 00-3-3.87M9 21v-2a4 4 0 014-4h1" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="17" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity=".12"/>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M8 17V11M12 17V7M16 17v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.84 1 1.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M12 17h.01M12 13a2 2 0 10-2-2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  signout: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
};

function SidebarItem({ icon, label, to }) {
  const location = useLocation();
  const active = location.pathname === to;
  const content = (
    <>
      <span className={`shrink-0 flex items-center justify-center ${active ? 'text-indigo-700' : 'text-slate-500'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </>
  );

  const className = `flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
    active
      ? 'bg-indigo-50 text-indigo-700' 
      : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
  }`;

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }

  return <div className={className}>{content}</div>;
}

export default function PatientSideBar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-white border-r border-slate-100 shadow-sm justify-between py-6">
      <div className="px-4">
        {/* Logo and title */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path d="M12 3l7 3v5c0 4.7-2.9 8.9-7 10-4.1-1.1-7-5.3-7-10V6l7-3z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold text-slate-800">MaterNova</h1>
            <p className="m-0 text-[10px] tracking-wider text-slate-400 font-bold mt-0.5">Healthcare Portal</p>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={icons.overview} label="Dashboard" to="/patient" />
          <SidebarItem icon={icons.records} label="My Records" to="/my-records" />
          <SidebarItem icon={icons.risk} label="Risk Monitoring" to="/risk-monitoring" />
          <SidebarItem icon={icons.reports} label="Health Reports" to="/health-reports" />
          <SidebarItem icon={icons.settings} label="Settings" to="/settings" />
        </nav>

        {/* Add Health Data button */}
        <div className="mt-6">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
            <span className="text-lg leading-none font-normal">+</span> Add Health Data
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col gap-1 px-4 mt-8 pt-4 border-t border-slate-100">
        <SidebarItem icon={icons.help} label="Help Center" />
        <SidebarItem icon={icons.signout} label="Sign Out" />
      </div>
    </aside>
  );
}
