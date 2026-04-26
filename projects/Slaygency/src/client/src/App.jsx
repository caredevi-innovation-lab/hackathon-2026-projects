import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SharedNavbar from './components/admin/SharedNavbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AlertsPage from './pages/admin/AlertsPage.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/patients/PatientDashboard.jsx';
import PatientHistory from './pages/patients/PatientHistory.jsx';
import PatientHealthDataEntryForm from './pages/patients/PatientHealthDataEntryForm.jsx';
import PatientsPage from './pages/admin/PatientsPage.jsx';
import PatientRecords from './pages/PatientRecords.jsx';
import PatientRiskPage from './pages/patients/patientRiskPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/SubmitHealthData.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
import { useAuth } from './hooks/useAuth.js';
import './app.css';

function RoleRedirect() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  switch (user?.role) {
    case 'Admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'Doctor':
      return <Navigate to="/doctor" replace />;
    case 'Patient':
    default:
      return <Navigate to="/patient-health-data-entry" replace />;
  }
}

export default function App() {
  const location = useLocation();
  const isDoctorRoute = location.pathname === '/doctor';
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const shellClassName = isDoctorRoute
    ? 'app-shell min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(92,76,255,0.12),transparent_28%),linear-gradient(180deg,#fbfaff_0%,#f6f2ff_100%)]'
    : 'app-shell min-h-screen';

  return (
    <div className={shellClassName}>
      {!isAuthRoute && <SharedNavbar />}
      <Routes>
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/patient-health-data-entry" element={<PatientHealthDataEntryForm />} />
        <Route path="/patient-risk-assessment" element={<PatientRiskPage />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'admin']}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'admin']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'admin']}>
              <PatientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/alerts"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'admin']}>
              <AlertsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
