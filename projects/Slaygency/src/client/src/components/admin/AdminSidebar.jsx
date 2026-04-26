import { Link, useLocation } from 'react-router-dom';
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

      <div className="mt-8 border-t border-[rgba(146,145,189,0.18)] pt-4 text-xs text-[#8c96b0]">
        System settings and logout controls can be connected here.
      </div>
    </aside>
  );
}
