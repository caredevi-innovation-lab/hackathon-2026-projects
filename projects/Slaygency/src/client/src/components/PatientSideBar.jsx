import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

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
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" fill="currentColor" opacity=".12"/>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 3l10 18H2L12 3z" fill="currentColor" opacity=".15"/>
      <path d="M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
      <path d="M12 17h.01M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  signout: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  add: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
};

function SidebarItem({ icon, label, to, onClick }) {
  const location = useLocation();
  const active = to && location.pathname === to;

  const className = `flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-150 text-sm font-medium ${
    active
      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
      : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
  }`;

  const content = (
    <>
      <span className={`shrink-0 flex items-center justify-center transition-colors`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-70" />}
    </>
  );

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }
  return <button onClick={onClick} className={`${className} w-full text-left`}>{content}</button>;
}

export default function PatientSideBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-white border-r border-slate-100 shadow-sm justify-between py-6 shrink-0">
      <div className="px-4 flex flex-col gap-0">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-200">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path d="M12 3l7 3v5c0 4.7-2.9 8.9-7 10-4.1-1.1-7-5.3-7-10V6l7-3z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold text-slate-800 leading-tight">MaterNova</h1>
            <p className="m-0 text-[10px] tracking-wider text-slate-400 font-semibold mt-0.5 uppercase">Healthcare Portal</p>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={icons.overview} label="Dashboard" to="/patient" />
          <SidebarItem icon={icons.records} label="My Records" to="/my-records" />
          <SidebarItem icon={icons.risk} label="Risk Monitoring" to="/patient-risk-assessment" />
          <SidebarItem icon={icons.reports} label="Health Reports" to="/health-reports" />
          <SidebarItem icon={icons.settings} label="Settings" to="/patient-settings" />
        </nav>

        {/* Add Health Data CTA */}
        <div className="mt-6">
          <Link
            to="/patient-health-data-entry"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-indigo-200 transition-all text-sm flex items-center justify-center gap-2"
          >
            {icons.add}
            Add Health Data
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col gap-1 px-4 pt-4 border-t border-slate-100">
        <SidebarItem icon={icons.help} label="Help Center" to="#" />
        <SidebarItem icon={icons.signout} label="Sign Out" onClick={handleSignOut} />
      </div>
    </aside>
  );
}
