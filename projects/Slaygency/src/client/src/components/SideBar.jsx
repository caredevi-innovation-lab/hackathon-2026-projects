import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 3l7 3v5c0 4.7-2.9 8.9-7 10-4.1-1.1-7-5.3-7-10V6l7-3z" fill="currentColor" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SidebarItem({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
        active
          ? 'bg-[linear-gradient(90deg,rgba(95,90,255,0.15),rgba(95,90,255,0.05))] text-[#3f3cd3]'
          : 'text-[#6b748b] hover:bg-[#f3f4fb]'
      }`}
    >
      <span className="inline-flex h-[18px] w-[18px] items-center justify-center text-[#6a73a0]">
        <IconMenu />
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function SideBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="border-r border-[rgba(146,145,189,0.18)] bg-[rgba(255,255,255,0.74)] p-4 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-2 px-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5d58ff] to-[#4a41e8] text-white">
          <IconShield />
        </span>
        <div>
          <h1 className="m-0 text-sm font-semibold">MaterNova</h1>
          <p className="m-0 text-[0.66rem]  tracking-[0.14em] text-[#8b93ab]">Healthcare Portal</p>
        </div>
      </div>

      {user && (
        <div className="mb-4 rounded-xl bg-[#f3f4fb] px-3 py-2">
          <p className="m-0 text-xs font-semibold text-[#3f3cd3]">{user.name}</p>
          <p className="m-0 text-[0.65rem] text-[#8b93ab]">{user.role}</p>
        </div>
      )}

      <nav className="grid gap-1.5">
        <SidebarItem label="Overview" />
        <SidebarItem label="Patient Records" />
        <SidebarItem label="Risk Monitoring" active />
        <SidebarItem label="Community Outreach" />
        <SidebarItem label="Health Reports" />
        <SidebarItem label="Settings" />
      </nav>

      <div className="mt-8 grid gap-1.5 border-t border-[rgba(146,145,189,0.18)] pt-4">
        <SidebarItem label="Help Center" />
        <SidebarItem label="Sign Out" onClick={onSignOut} />
      </div>
    </aside>
  );
}

