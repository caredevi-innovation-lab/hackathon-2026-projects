import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// â”€â”€ Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
    </svg>
  ),
  healthEntry: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </svg>
  ),
  records: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" fill="currentColor" opacity=".12" />
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  patients: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <circle cx="9" cy="8" r="3" fill="currentColor" />
      <path d="M3.5 18.5a5.5 5.5 0 0111 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 8v8M13 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  alerts: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17h.01" strokeWidth="2" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity=".12" />
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M8 17V11M12 17V7M16 17v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
};

// â”€â”€ Navigation Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PATIENT_NAV = [
  { labelKey: 'nav.health_entry', to: '/patient-health-data-entry', icon: icons.healthEntry },
  { labelKey: 'nav.my_records', to: '/my-records', icon: icons.records },
  { labelKey: 'nav.reports', to: '/health-reports', icon: icons.reports },
  { labelKey: 'nav.settings', to: '/patient-settings', icon: icons.settings },
];

const DOCTOR_NAV = [
  { labelKey: 'nav.dashboard', to: '/doctor', icon: icons.dashboard },
  { labelKey: 'nav.patients', to: '/patient-records', icon: icons.patients },
  { labelKey: 'nav.alerts', to: '/alerts', icon: icons.alerts },
  { labelKey: 'nav.health_records', to: '/health-entry', icon: icons.records },
  { labelKey: 'nav.settings', to: '/settings', icon: icons.settings },
];

const ADMIN_NAV = [
  { labelKey: 'nav.dashboard', to: '/admin/dashboard', icon: icons.dashboard },
  { labelKey: 'nav.users', to: '/admin/users', icon: icons.users },
  { labelKey: 'nav.patients', to: '/admin/patients', icon: icons.patients },
  { labelKey: 'nav.alerts', to: '/admin/alerts', icon: icons.alerts },
  { labelKey: 'nav.settings', to: '/settings', icon: icons.settings },
];

function getNavForRole(role) {
  switch (role) {
    case 'Admin': return ADMIN_NAV;
    case 'Doctor': return DOCTOR_NAV;
    case 'Patient':
    default: return PATIENT_NAV;
  }
}

// â”€â”€ Sidebar Link â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SidebarLink({ to, icon, label, collapsed, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 shadow-[inset_3px_0_0_#6366f1]'
            : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
        } ${collapsed ? 'justify-center' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      <span className="shrink-0 flex items-center justify-center w-5 h-5">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}

// â”€â”€ Topbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Topbar({ onToggleSidebar, sidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const { t, i18n } = useTranslation();

  const initials = (user?.name || t('roles.user'))
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isDoctorSurface = ['/doctor', '/patient-records', '/alerts', '/health-entry', '/settings', '/submit'].some((path) =>
    location.pathname.startsWith(path)
  );

  const handleTopbarSearch = (event) => {
    if (event.key !== 'Enter') return;
    const cleaned = query.trim();
    if (!cleaned) return;
    if (location.pathname === '/alerts') {
      navigate(`/alerts?search=${encodeURIComponent(cleaned)}`);
      return;
    }
    navigate(`/patient-records?search=${encodeURIComponent(cleaned)}`);
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-slate-100">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? icons.close : icons.menu}
        </button>

        {isDoctorSurface && (
          <div className="hidden sm:flex items-center w-[280px] md:w-[360px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <svg className="w-4 h-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleTopbarSearch}
              placeholder={location.pathname === '/alerts' ? t('topbar.search_alerts') : t('topbar.search_patients')}
              className="w-full bg-transparent border-0 outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium">{t('topbar.lang_label')}</span>
          <select
            value={i18n.language?.startsWith('ne') ? 'ne' : 'en'}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            aria-label={t('topbar.lang_label')}
          >
            <option value="en">{t('common.english')}</option>
            <option value="ne">{t('common.nepali')}</option>
          </select>
        </label>
        {/* User info */}
        <div className="hidden md:flex flex-col items-end mr-1">
          <span className="text-sm font-semibold text-slate-700 leading-tight">{user?.name || t('roles.user')}</span>
          <span className="text-[10px] font-semibold text-slate-400  tracking-wider">
            {user?.role === 'Doctor' ? t('roles.doctor') : user?.role === 'Admin' ? t('roles.admin') : t('roles.patient')}
          </span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
          {initials}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
        >
          {icons.logout}
          <span className="hidden sm:inline">{t('topbar.sign_out')}</span>
        </button>
      </div>
    </header>
  );
}

// â”€â”€ AppLayout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function AppLayout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = getNavForRole(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 h-full flex flex-col bg-white border-r border-slate-100 shadow-sm transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${collapsed ? 'w-[72px]' : 'w-64'}
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center h-16 border-b border-slate-100 shrink-0 ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-200">
                <HeartPulse className="h-4 w-4" />
              </span>
              <div>
                <h1 className="m-0 text-sm font-semibold text-slate-800 leading-tight">{t('app_name')}</h1>
                <p className="m-0 text-[10px] font-semibold text-slate-400 tracking-wider ">
                  {user?.role === 'Doctor'
                    ? t('roles.doctor')
                    : user?.role === 'Admin'
                    ? t('roles.admin')
                    : user?.role === 'Patient'
                    ? t('roles.patient')
                    : t('roles.portal')}
                </p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => { setCollapsed((c) => !c); setMobileOpen(false); }}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            aria-label="Collapse sidebar"
          >
            <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* User card (expanded only) */}
        {!collapsed && user && (
          <div className="mx-3 mt-4 mb-2 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-2.5 border border-indigo-100">
            <p className="m-0 text-xs font-semibold text-indigo-700 truncate">{user.name}</p>
            <p className="m-0 text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={t(item.labelKey)}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        {/* Bottom section */}
        <div className={`border-t border-slate-100 p-2 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
          <button
            type="button"
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors border-0 bg-transparent cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? t('topbar.sign_out') : undefined}
          >
            {icons.logout}
            {!collapsed && <span>{t('topbar.sign_out')}</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onToggleSidebar={() => setMobileOpen((v) => !v)}
          sidebarOpen={mobileOpen}
        />
        <main className="flex-1 overflow-y-auto route-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}

