import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import DoctorAlertCenter from './pages/doctor/AlertCenter.jsx';
import DoctorPatientRecords from './pages/doctor/PatientRecords.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/patients/PatientDashboard.jsx';
import PatientHistory from './pages/patients/PatientHistory.jsx';
import PatientHealthDataEntryForm from './pages/patients/PatientHealthDataEntryForm.jsx';
import PatientsPage from './pages/PatientsPage.jsx';
import PatientRiskPage from './pages/patients/patientRiskPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/doctor/SubmitHealthData.jsx';
import UsersPage from './pages/UsersPage.jsx';
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
  const isDoctorRoute = location.pathname.startsWith('/doctor') || location.pathname === '/patient-records' || location.pathname === '/alerts' || location.pathname === '/submit';
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

        {/* ── Patient Routes ── */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['Patient', 'patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-history"
          element={
            <ProtectedRoute allowedRoles={['Patient', 'patient']}>
              <PatientHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-health-data-entry"
          element={
            <ProtectedRoute allowedRoles={['Patient', 'patient']}>
              <PatientHealthDataEntryForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-risk-assessment"
          element={
            <ProtectedRoute allowedRoles={['Patient', 'patient']}>
              <PatientRiskPage />
            </ProtectedRoute>
          }
        />

        {/* ── Doctor Routes ── */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-records"
          element={
            <ProtectedRoute allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorPatientRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorAlertCenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute allowedRoles={['Doctor', 'doctor', 'Admin', 'admin', 'Patient', 'patient']}>
              <SubmitHealthData />
            </ProtectedRoute>
          }
        />

        {/* ── Admin Routes ── */}
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
