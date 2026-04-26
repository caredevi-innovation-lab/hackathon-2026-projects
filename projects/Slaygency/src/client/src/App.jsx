import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import PatientHistory from './pages/PatientHistory.jsx';
import PatientRecords from './pages/doctor/PatientRecords.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SubmitHealthData from './pages/doctor/SubmitHealthData.jsx';
import AlertCenter from './pages/doctor/AlertCenter.jsx';
import PreviewPDF from './pages/doctor/PreviewPDF.jsx';
import FinalizeRecord from './pages/doctor/FinalizeRecord.jsx';
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
        {/* <Route path="/worker" element={<WorkerDashboard />} /> */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/submit" element={<SubmitHealthData />} />
        <Route path="/alerts" element={<AlertCenter />} />
        <Route path="/preview-pdf" element={<PreviewPDF />} />
        <Route path="/finalize-record" element={<FinalizeRecord />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
