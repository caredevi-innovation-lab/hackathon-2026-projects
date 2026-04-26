import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import { fetchHealth } from '../../api.js';
import { useAuth } from '../../hooks/useAuth.js';

function getRiskLevel(record) {
  let score = 10;
  if (record.systolicBP >= 140 || record.diastolicBP >= 90) score += 35;
  else if (record.systolicBP >= 130 || record.diastolicBP >= 85) score += 18;
  if (record.hemoglobin < 10) score += 20;
  score += (record.symptoms?.length || 0) * 6;
  score = Math.min(96, score);
  if (score >= 60) return { label: 'High', color: 'text-red-600', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500', score };
  if (score >= 35) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500', score };
  return { label: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', score };
}

function MiniLineChart({ records }) {
  if (!records.length) return null;
  const data = [...records].reverse(); // oldest first for left-to-right
  const scores = data.map((r) => getRiskLevel(r).score);
  const maxVal = Math.max(...scores, 100);
  const W = 500;
  const H = 80;
  const PAD = 8;
  const xStep = data.length > 1 ? (W - PAD * 2) / (data.length - 1) : W - PAD * 2;
  const points = scores.map((s, i) => {
    const x = PAD + i * xStep;
    const y = H - PAD - ((s / maxVal) * (H - PAD * 2));
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${points[0]} L ${points.join(' L ')} L ${PAD + (data.length - 1) * xStep},${H} L ${PAD},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#riskGrad)" />
      <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {scores.map((s, i) => (
        <circle
          key={i}
          cx={PAD + i * xStep}
          cy={H - PAD - ((s / maxVal) * (H - PAD * 2))}
          r="4"
          fill={s >= 60 ? '#ef4444' : s >= 35 ? '#f59e0b' : '#10b981'}
          stroke="white"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function PatientRecord() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchHealth()
      .then(setRecords)
      .catch(() => setError('Failed to load records. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    if (!q) return true;
    const bp = `${r.systolicBP}/${r.diastolicBP}`;
    const syms = (r.symptoms || []).join(' ').toLowerCase();
    return bp.includes(q) || syms.includes(q) || String(r.age).includes(q);
  });

  const totalRecords = records.length;
  const highRiskCount = records.filter((r) => getRiskLevel(r).label === 'High').length;
  const avgHb = records.length
    ? (records.reduce((s, r) => s + r.hemoglobin, 0) / records.length).toFixed(1)
    : null;

  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />

      <div className="flex-1 flex flex-col overflow-y-auto relative w-full min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-white border-b border-slate-100 sticky top-0 z-40 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">My Records</h2>
            <p className="text-xs text-slate-400 mt-0.5">{totalRecords} health entr{totalRecords !== 1 ? 'ies' : 'y'} logged</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              <input
                type="text" placeholder="Search records..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-slate-700 outline-none w-40 placeholder:text-slate-400"
              />
            </div>
            <Link
              to="/patient-health-data-entry"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" fill="none"><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>
              New Entry
            </Link>
          </div>
        </header>

        <main className="p-4 md:p-8 w-full">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-600 fill-current"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3h4v2M9 5h6"/></svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Records</p>
                <p className="text-3xl font-black text-slate-800">{totalRecords}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 fill-current"><path d="M12 3l10 18H2L12 3z"/></svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">High Risk Events</p>
                <p className={`text-3xl font-black ${highRiskCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>{highRiskCount}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600 fill-current"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Hemoglobin</p>
                <p className="text-3xl font-black text-slate-800">{avgHb ?? '—'} <span className="text-base font-medium text-slate-400">g/dL</span></p>
              </div>
            </div>
          </div>

          {/* Chart */}
          {records.length > 1 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Risk Score Trend</h3>
                <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Last {Math.min(records.length, 10)} entries</span>
              </div>
              <MiniLineChart records={records.slice(0, 10)} />
              <div className="flex gap-4 mt-3 text-[10px] font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/>Low Risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"/>Moderate</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"/>High Risk</span>
              </div>
            </div>
          )}

          {/* Records Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Health Log</h3>
              {search && <p className="text-xs text-slate-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</p>}
            </div>

            {loading ? (
              <div className="p-8 space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-24 h-5 bg-slate-100 rounded" />
                    <div className="flex-1 h-5 bg-slate-100 rounded" />
                    <div className="w-16 h-5 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 text-sm">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-400 text-sm mb-4">{search ? 'No records match your search.' : 'No health records yet.'}</p>
                {!search && (
                  <Link to="/patient-health-data-entry" className="text-indigo-600 font-bold text-sm hover:underline">
                    Log your first entry →
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Blood Pressure</th>
                      <th className="px-6 py-3 text-left">Hemoglobin</th>
                      <th className="px-6 py-3 text-left">Age</th>
                      <th className="px-6 py-3 text-left">Symptoms</th>
                      <th className="px-6 py-3 text-left">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((record, idx) => {
                      const risk = getRiskLevel(record);
                      return (
                        <tr key={record._id || idx} className="border-t border-slate-50 hover:bg-indigo-50/30 transition-colors">
                          <td className="px-6 py-4 text-slate-600 text-xs whitespace-nowrap">
                            {new Date(record.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${record.systolicBP >= 140 || record.diastolicBP >= 90 ? 'text-red-600' : 'text-slate-800'}`}>
                              {record.systolicBP}/{record.diastolicBP}
                            </span>
                            <span className="text-xs text-slate-400 ml-1">mmHg</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${record.hemoglobin < 10 ? 'text-amber-600' : 'text-slate-800'}`}>
                              {record.hemoglobin}
                            </span>
                            <span className="text-xs text-slate-400 ml-1">g/dL</span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{record.age} yrs</td>
                          <td className="px-6 py-4">
                            {record.symptoms?.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {record.symptoms.slice(0, 3).map((s) => (
                                  <span key={s} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">{s}</span>
                                ))}
                                {record.symptoms.length > 3 && (
                                  <span className="text-[10px] text-slate-400 font-semibold">+{record.symptoms.length - 3}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">None</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${risk.bg} ${risk.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                              {risk.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
