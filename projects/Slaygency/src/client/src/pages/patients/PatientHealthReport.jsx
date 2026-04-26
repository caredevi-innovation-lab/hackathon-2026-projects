import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import { fetchHealth } from '../../api.js';
import { useAuth } from '../../hooks/useAuth.js';

function StatCard({ label, value, sub, color = 'indigo' }) {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-200',
    pink:   'from-pink-500 to-rose-500 shadow-pink-200',
    emerald:'from-emerald-500 to-teal-500 shadow-emerald-200',
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-5 shadow-lg`}>
      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">{label}</p>
      <p className="text-3xl font-black leading-tight">{value}</p>
      {sub && <p className="text-xs text-white/70 mt-1">{sub}</p>}
    </div>
  );
}

export default function PatientHealthReport() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  async function loadData(showRefresh = false) {
    if (showRefresh) setRefreshing(true);
    try {
      const data = await fetchHealth();
      setRecords(data);
      if (showRefresh) setStatusMsg('✓ Reports updated successfully.');
    } catch {
      setStatusMsg('Could not fetch report data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const totalRecords = records.length;
  const avgHb = totalRecords
    ? (records.reduce((s, r) => s + r.hemoglobin, 0) / totalRecords).toFixed(1)
    : null;
  const avgSystolic = totalRecords
    ? Math.round(records.reduce((s, r) => s + r.systolicBP, 0) / totalRecords)
    : null;
  const avgDiastolic = totalRecords
    ? Math.round(records.reduce((s, r) => s + r.diastolicBP, 0) / totalRecords)
    : null;

  const highRiskCount = records.filter((r) => {
    let score = 10;
    if (r.systolicBP >= 140 || r.diastolicBP >= 90) score += 35;
    if (r.hemoglobin < 10) score += 20;
    score += (r.symptoms?.length || 0) * 6;
    return score >= 60;
  }).length;

  // Most common symptom
  const symptomFreq = {};
  records.forEach((r) => (r.symptoms || []).forEach((s) => { symptomFreq[s] = (symptomFreq[s] || 0) + 1; }));
  const topSymptom = Object.entries(symptomFreq).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />

      <div className="flex-1 flex flex-col overflow-y-auto relative w-full min-w-0">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 py-4 px-4 md:px-8 bg-white border-b border-slate-100 sticky top-0 z-40 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Health Reports</h2>
            <p className="text-xs text-slate-400 mt-0.5">Your comprehensive maternal health summary</p>
          </div>
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} stroke="currentColor" strokeWidth="2" fill="none">
              <path strokeLinecap="round" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 0012 20v4c-6.6 0-12-5.4-12-12h4z"/>
            </svg>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        <main className="p-4 md:p-8">
          {statusMsg && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${statusMsg.startsWith('✓') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {statusMsg}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[1,2,3].map(i => <div key={i} className="h-28 bg-white rounded-2xl animate-pulse border border-slate-100"/>)}
            </div>
          ) : totalRecords === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-indigo-400 fill-current"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3h4v2M9 5h6"/></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">No Reports Yet</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">Your health reports will appear here once you've logged at least one health entry.</p>
              <Link to="/patient-health-data-entry" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-block shadow-md shadow-indigo-200">
                Log Health Data
              </Link>
            </div>
          ) : (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Total Entries" value={totalRecords} sub={`Last: ${new Date(records[0].createdAt).toLocaleDateString()}`} color="indigo" />
                <StatCard label="Avg Blood Pressure" value={`${avgSystolic}/${avgDiastolic}`} sub="mmHg (systolic/diastolic)" color="pink" />
                <StatCard label="Avg Hemoglobin" value={`${avgHb} g/dL`} sub={avgHb < 10.5 ? '⚠ Below normal range' : '✓ Within normal range'} color="emerald" />
              </div>

              {/* Insight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* High Risk Events */}
                <div className={`rounded-2xl p-6 border shadow-sm ${highRiskCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{highRiskCount > 0 ? '⚠️' : '✅'}</span>
                    <h4 className="font-bold text-slate-800">High-Risk Events</h4>
                  </div>
                  <p className={`text-4xl font-black mb-1 ${highRiskCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {highRiskCount}
                  </p>
                  <p className="text-xs text-slate-500">
                    {highRiskCount > 0
                      ? `${highRiskCount} record${highRiskCount > 1 ? 's' : ''} with elevated BP or low hemoglobin detected.`
                      : 'No high-risk events detected in your history.'}
                  </p>
                  {highRiskCount > 0 && (
                    <Link to="/patient-risk-assessment" className="mt-3 text-xs font-bold text-red-600 hover:underline inline-block">
                      View Risk Analysis →
                    </Link>
                  )}
                </div>

                {/* Top Symptom */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📋</span>
                    <h4 className="font-bold text-slate-800">Most Reported Symptom</h4>
                  </div>
                  {topSymptom ? (
                    <>
                      <p className="text-3xl font-black text-indigo-600 mb-1">{topSymptom[0]}</p>
                      <p className="text-xs text-slate-500">Reported {topSymptom[1]} time{topSymptom[1] !== 1 ? 's' : ''} across your records.</p>
                    </>
                  ) : (
                    <p className="text-slate-400 text-sm mt-2">No symptoms reported.</p>
                  )}
                </div>
              </div>

              {/* BP History Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">BP & Hemoglobin History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Systolic</th>
                        <th className="px-6 py-3 text-left">Diastolic</th>
                        <th className="px-6 py-3 text-left">Hemoglobin</th>
                        <th className="px-6 py-3 text-left">Symptoms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r, i) => (
                        <tr key={r._id || i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-3 font-bold text-slate-800">
                            <span className={r.systolicBP >= 140 ? 'text-red-600' : ''}>{r.systolicBP}</span>
                          </td>
                          <td className="px-6 py-3 font-bold text-slate-800">
                            <span className={r.diastolicBP >= 90 ? 'text-red-600' : ''}>{r.diastolicBP}</span>
                          </td>
                          <td className="px-6 py-3 font-bold text-slate-800">
                            <span className={r.hemoglobin < 10 ? 'text-amber-600' : ''}>{r.hemoglobin}</span>
                          </td>
                          <td className="px-6 py-3 text-xs text-slate-400">
                            {r.symptoms?.length > 0 ? r.symptoms.join(', ') : 'None'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
