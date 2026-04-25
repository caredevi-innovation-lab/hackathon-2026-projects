import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import PatientHistory from './pages/PatientHistory.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/SubmitHealthData.jsx';
import WorkerDashboard from './pages/WorkerDashboard.jsx';
import './app.css';

export default function App() {
  const location = useLocation();
  const isDoctorRoute = location.pathname === '/doctor';
  const shellClassName = isDoctorRoute
    ? 'app-shell min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(92,76,255,0.12),transparent_28%),linear-gradient(180deg,#fbfaff_0%,#f6f2ff_100%)]'
    : 'app-shell min-h-screen';

  return (
    <div className={shellClassName}>
      {!isDoctorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/doctor" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/submit" element={<SubmitHealthData />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
