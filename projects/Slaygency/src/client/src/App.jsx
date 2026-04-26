import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/patients/PatientDashboard.jsx';
import PatientHistory from './pages/patients/PatientHistory.jsx';
import PatientRecords from './pages/PatientRecords.jsx';
import PatientRecord from './pages/patients/PatientRecord.jsx';
import SettingsPage from './pages/patients/setting.jsx';
import PatientRiskPage from './pages/patients/patientRiskPage.jsx';
import PatientHealthReport from './pages/patients/PatientHealthReport.jsx';

import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/SubmitHealthData.jsx';
import UsersPage from './pages/UsersPage.jsx';
import './app.css';

export default function App() {
  const location = useLocation();
  const isDoctorRoute = location.pathname === '/doctor';
  const shellClassName = isDoctorRoute
    ? 'app-shell min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(92,76,255,0.12),transparent_28%),linear-gradient(180deg,#fbfaff_0%,#f6f2ff_100%)]'
    : 'app-shell min-h-screen';

  return (
    <div className={shellClassName}>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/patient-health-data-entry" element={<PatientHealthDataEntryForm />} />
        <Route path="/patient-risk-assessment" element={<PatientRiskPage />} />
        {/* <Route path="/worker" element={<WorkerDashboard />} /> */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/my-records" element={<PatientRecord />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/risk-monitoring" element={<PatientRiskPage />} />
        <Route path="/health-reports" element={<PatientHealthReport />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/submit" element={<SubmitHealthData />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
