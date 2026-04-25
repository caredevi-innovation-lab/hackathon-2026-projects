import TrendChart from '../components/TrendChart.jsx';

export default function WorkerDashboard() {
  return (
    <main>
      <h1>Health Worker Dashboard</h1>
      <TrendChart records={[]} />
    </main>
  );
}
