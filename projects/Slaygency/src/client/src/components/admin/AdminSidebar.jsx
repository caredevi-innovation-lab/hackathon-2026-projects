import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { IconAlert, IconDashboard, IconPatients, IconUsers } from './icons.jsx';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <IconDashboard /> },
  { label: 'Users', to: '/admin/users', icon: <IconUsers /> },
  { label: 'Patients', to: '/admin/patients', icon: <IconPatients /> },
  { label: 'Alerts', to: '/admin/alerts', icon: <IconAlert /> },
];

function SidebarLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold no-underline transition ${
        active
          ? 'bg-[linear-gradient(90deg,#eef2ff_0%,#f7f8ff_100%)] text-[#3a37e0] shadow-[inset_-3px_0_0_#5348ff]'
          : 'text-[#5a6988] hover:bg-[#f1f5ff] hover:text-[#3d39de]'
      }`}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const onSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="border-r border-[rgba(146,145,189,0.18)] bg-[rgba(255,255,255,0.78)] p-4 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-2 px-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5d58ff] to-[#3f88a8] text-white">
          <IconDashboard />
        </span>
        <div>
          <h1 className="m-0 text-sm font-semibold text-[#1b2f53]">Aama Care</h1>
          <p className="m-0 text-[0.65rem] tracking-[0.08em] text-[#8b93ab]">
            Maternal Health Admin
          </p>
        </div>
      </div>

      {user && (
        <div className="mb-4 rounded-xl bg-[#f0f2ff] px-3 py-2">
          <p className="m-0 text-xs font-semibold text-[#3a37e0]">{user.name}</p>
          <p className="m-0 text-[0.65rem] text-[#8b93ab]">{user.email}</p>
        </div>
      )}

      <nav className="grid gap-1.5">
        {navItems.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.to}
          />
        ))}
      </nav>

      <div className="mt-8 border-t border-[rgba(146,145,189,0.18)] pt-4">
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl border-0 bg-transparent px-3 py-2.5 text-sm font-semibold text-[#5a6988] transition hover:bg-[#fff0f2] hover:text-[#b54057] cursor-pointer"
        >
          <span className="inline-flex h-4 w-4 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
