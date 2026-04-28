import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const patientLinks = [
  { label: 'Health Data', to: '/patient-health-data-entry' },
  { label: 'Risk Assessment', to: '/patient-risk-assessment' },
];

const doctorLinks = [
  { label: 'Dashboard', to: '/doctor' },
  { label: 'Patient Records', to: '/patient-records' },
];

const adminLinks = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Users', to: '/admin/users' },
  { label: 'Patients', to: '/admin/patients' },
  { label: 'Alerts', to: '/admin/alerts' },
];

function getLinksForRole(role) {
  switch (role) {
    case 'Admin':
      return adminLinks;
    case 'Doctor':
      return doctorLinks;
    case 'Patient':
    default:
      return patientLinks;
  }
}

export default function SharedNavbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  const links = getLinksForRole(user?.role);

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="shared-navbar">
      <div className="shared-navbar-inner">
        <div className="shared-navbar-brand">
          <span className="shared-navbar-logo">M</span>
        </div>

        <ul className="shared-navbar-links">
          {links.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [
                    'shared-navbar-link',
                    isActive ? 'shared-navbar-link--active' : '',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="shared-navbar-user">
          <div className="shared-navbar-user-info">
            <strong>{user?.name || 'User'}</strong>
            <span>{user?.role || 'Patient'}</span>
          </div>
          <button type="button" className="shared-navbar-logout" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
