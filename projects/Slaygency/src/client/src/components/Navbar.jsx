import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const hideForAuth = location.pathname === '/login' || location.pathname === '/register';

  if (hideForAuth) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(165,184,214,0.28)] bg-[rgba(255,255,255,0.82)] px-4 py-3 shadow-[0_10px_24px_rgba(17,68,144,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2250b6_0%,#007a8a_100%)] text-white shadow-[0_10px_24px_rgba(17,76,159,0.24)]">
            A
          </span>
          <div>
            <p className="m-0 text-sm font-semibold text-[#10264d]">Aama Care</p>
            <p className="m-0 text-xs text-[#6b80a4]">Maternal Health Platform</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium text-[#526583]">
          <NavLink to="/doctor" className="rounded-full px-3 py-2 transition hover:bg-[#f2f6ff]">
            Doctor
          </NavLink>
          <NavLink to="/patient" className="rounded-full px-3 py-2 transition hover:bg-[#f2f6ff]">
            Patient
          </NavLink>
          <NavLink
            to="/admin/dashboard"
            className="rounded-full px-3 py-2 transition hover:bg-[#f2f6ff]"
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
