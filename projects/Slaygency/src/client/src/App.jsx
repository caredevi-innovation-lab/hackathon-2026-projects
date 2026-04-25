import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { RoleProvider } from './context/RoleContext.jsx';
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
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      {/* <RoleProvider> */}
      <div className="app-shell min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/patient" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/history"
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker"
            element={
              <ProtectedRoute allowedRoles={['HealthWorker']}>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute allowedRoles={['Patient', 'HealthWorker']}>
                <SubmitHealthData />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* </RoleProvider> */}
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}
