import RiskBadge from '../components/RiskBadge.jsx';

export default function PatientDashboard() {
  return (
    <main>
      <h1>Patient Dashboard</h1>
      <p>Your latest risk: <RiskBadge level="Low" /></p>
    </main>
  );
}
