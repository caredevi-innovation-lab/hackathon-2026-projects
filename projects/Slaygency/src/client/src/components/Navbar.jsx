import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        SlayGency
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
