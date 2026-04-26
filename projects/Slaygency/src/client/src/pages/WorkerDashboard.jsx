
import HealthWorkerSideBar from '../components/HealthWorkerSideBar.jsx';
import RiskBadge from '../components/RiskBadge.jsx';

// Dummy data for demonstration
const patients = [
  {
    initials: 'MD',
    name: 'Maya Devi',
    age: 24,
    weeks: 32,
    risk: 'High',
    lastVisit: '48 hours ago',
    overdue: true,
    critical: true,
    reason: 'Pre-eclampsia risk',
  },
  {
    initials: 'SL',
    name: 'Sushma Lama',
    age: 28,
    weeks: 14,
    risk: 'Medium',
    lastVisit: 'Today, 09:15 AM',
    overdue: false,
    critical: false,
    reason: '',
  },
  {
    initials: 'PR',
    name: 'Pooja Rai',
    age: 21,
    weeks: 20,
    risk: 'Low',
    lastVisit: 'Yesterday',
    overdue: false,
    critical: false,
    reason: '',
  },
  {
    initials: 'RS',
    name: 'Rita Shrestha',
    age: 31,
    weeks: 36,
    risk: 'High',
    lastVisit: '72 hours ago',
    overdue: true,
    critical: true,
    reason: 'Severe Anemia',
  },
];

const highRiskOverdue = patients.filter(p => p.critical);

export default function WorkerDashboard() {
  return (
    <main className="grid min-h-screen bg-[linear-gradient(180deg,#f9f8ff_0%,#f4f3ff_100%)] text-[#1f2538] lg:grid-cols-[220px_minmax(0,1fr)]">
      <HealthWorkerSideBar />
      <section className="min-w-0 p-4 sm:p-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-1">Community Triage</h1>
            <p className="text-sm text-[#78819a]">Managing 124 patients in Kathmandu Ward 7</p>
          </div>
          <button className="bg-[#5348ff] hover:bg-[#3a37e0] text-white font-semibold px-5 py-2 rounded-lg shadow transition-all text-sm self-start sm:self-auto">
            + Add New Patient
          </button>
        </div>

        {/* Alert and Visits Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Critical Alert */}
          <div className="flex-1 bg-[#fff0f0] border border-[#ffd6d6] rounded-xl p-5 flex flex-col gap-2 shadow-sm min-w-[320px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#ff4d4f] text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold">!</span>
              <span className="font-semibold text-[#b71c1c] text-base">Critical Intervention Required</span>
            </div>
            <span className="text-[#b71c1c] text-sm">{highRiskOverdue.length} high-risk patients have not been visited in &gt;48+ hours.</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {highRiskOverdue.map(p => (
                <span key={p.name} className="bg-[#fff] border border-[#ffd6d6] rounded-full px-3 py-1 text-xs font-medium text-[#b71c1c] flex items-center gap-1">
                  {p.name.split(' ')[0]} <span className="text-[#888]">({p.reason})</span>
                </span>
              ))}
            </div>
          </div>
          {/* Visits Completed */}
          <div className="w-full md:w-64 bg-[#f5f7ff] border border-[#dbe2ff] rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
            <div className="text-[#5348ff] text-3xl font-bold">14<span className="text-[#bfc6e6]">/22</span></div>
            <div className="text-xs text-[#78819a] mt-1 mb-2">VISITS COMPLETED</div>
            <div className="text-xs text-[#3a37e0]">8 more visits scheduled for today</div>
          </div>
        </div>

        {/* Patient Table Card */}
        <div className="bg-white border border-[rgba(168,166,206,0.18)] rounded-2xl shadow p-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex gap-2 px-6 pt-4 pb-2 border-b border-[#f0f0f0]">
            <button className="px-3 py-1 rounded text-sm font-medium text-[#5348ff] bg-[#f5f7ff]">All Patients</button>
            <button className="px-3 py-1 rounded text-sm font-medium text-[#78819a] hover:bg-[#f5f7ff]">High Risk</button>
            <button className="px-3 py-1 rounded text-sm font-medium text-[#78819a] hover:bg-[#f5f7ff]">Medium Risk</button>
            <button className="px-3 py-1 rounded text-sm font-medium text-[#78819a] hover:bg-[#f5f7ff]">Low Risk</button>
            <button className="ml-auto px-3 py-1 rounded text-sm font-medium text-[#78819a] hover:bg-[#f5f7ff]">More Filters</button>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-[#78819a] text-xs border-b border-[#f0f0f0]">
                  <th className="px-6 py-3 text-left font-medium">Patient Name</th>
                  <th className="px-3 py-3 text-left font-medium">Risk Level</th>
                  <th className="px-3 py-3 text-left font-medium">Last Visit</th>
                  <th className="px-3 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => (
                  <tr key={p.name} className="border-b last:border-0 hover:bg-[#f8f9ff]">
                    <td className="px-6 py-3 flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] text-[#5348ff] font-bold text-base">
                        {p.initials}
                      </span>
                      <span>
                        <span className="font-medium">{p.name}</span>
                        <span className="block text-xs text-[#78819a]">Age: {p.age} • {p.weeks} Weeks Pregnant</span>
                      </span>
                    </td>
                    <td className="px-3 py-3"><RiskBadge level={p.risk + ' Risk'} /></td>
                    <td className="px-3 py-3">
                      <span>{p.lastVisit}</span>
                      {p.overdue && (
                        <span className="block text-xs text-[#d32f2f] font-semibold">{p.critical ? 'Critical Overdue' : 'Overdue'}</span>
                      )}
                      {!p.overdue && idx === 1 && (
                        <span className="block text-xs text-[#2e7d32] font-semibold">Completed</span>
                      )}
                      {!p.overdue && idx === 2 && (
                        <span className="block text-xs text-[#78819a] font-semibold">Scheduled: Fri</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {p.overdue ? (
                        <button className="bg-[#5348ff] hover:bg-[#3a37e0] text-white px-4 py-1.5 rounded font-semibold text-xs shadow">Record Visit</button>
                      ) : (
                        <button className="bg-[#f5f7ff] text-[#5348ff] px-4 py-1.5 rounded font-semibold text-xs border border-[#e0e7ff]">View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 text-xs text-[#78819a] bg-[#fafbff] border-t border-[#f0f0f0]">Showing 4 of 124 patients</div>
        </div>
      </section>
    </main>
  );
}
