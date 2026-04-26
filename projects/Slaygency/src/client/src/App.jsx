import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import AppLayout from './components/layout/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AlertsPage from './pages/admin/AlertsPage.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import DoctorAlertCenter from './pages/doctor/AlertCenter.jsx';
import DoctorPatientRecords from './pages/doctor/PatientRecords.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/patients/PatientDashboard.jsx';
import PatientHistory from './pages/patients/PatientHistory.jsx';
import PatientHealthDataEntryForm from './pages/patients/PatientHealthDataEntryForm.jsx';
import PatientRecord from './pages/patients/PatientRecord.jsx';
import PatientHealthReport from './pages/patients/PatientHealthReport.jsx';
import PatientSettingsPage from './pages/patients/setting.jsx';
import PatientsPage from './pages/admin/PatientsPage.jsx';
import PatientRiskPage from './pages/patients/patientRiskPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/doctor/SubmitHealthData.jsx';
import HealthEntry from './pages/doctor/HealthEntry.jsx';
import DoctorSettingsPage from './pages/doctor/Settings.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
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

/**
 * Wraps authenticated routes with the unified AppLayout (Topbar + Sidebar).
 * Adapts navigation links based on user role automatically.
 */
function AuthenticatedLayout({ children, allowedRoles }) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ── Patient Routes ── */}
        <Route
          path="/patient"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientDashboard />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/patient-history"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientHistory />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/patient-health-data-entry"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientHealthDataEntryForm />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/patient-risk-assessment"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientRiskPage />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/my-records"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientRecord />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/health-reports"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientHealthReport />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/patient-settings"
          element={
            <AuthenticatedLayout allowedRoles={['Patient', 'patient']}>
              <PatientSettingsPage />
            </AuthenticatedLayout>
          }
        />

        {/* ── Doctor Routes ── */}
        <Route
          path="/doctor"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorDashboard />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/patient-records"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorPatientRecords />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/alerts"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorAlertCenter />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/submit"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin', 'Patient', 'patient']}>
              <SubmitHealthData />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/health-entry"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <HealthEntry />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthenticatedLayout allowedRoles={['Doctor', 'doctor', 'Admin', 'admin']}>
              <DoctorSettingsPage />
            </AuthenticatedLayout>
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
            <AuthenticatedLayout allowedRoles={['Admin', 'admin']}>
              <AdminDashboard />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AuthenticatedLayout allowedRoles={['Admin', 'admin']}>
              <UsersPage />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <AuthenticatedLayout allowedRoles={['Admin', 'admin']}>
              <PatientsPage />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/admin/alerts"
          element={
            <AuthenticatedLayout allowedRoles={['Admin', 'admin']}>
              <AlertsPage />
            </AuthenticatedLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
