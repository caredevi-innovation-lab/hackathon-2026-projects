import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Sidebar now provided by AppLayout
import { fetchHealth } from '../../api.js';
import { useAuth } from '../../hooks/useAuth.js';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';
import { HiMiniExclamationCircle } from 'react-icons/hi2';

function getRiskLevel(record) {
  let score = 10;
  if (record.systolicBP >= 140 || record.diastolicBP >= 90) score += 35;
  else if (record.systolicBP >= 130 || record.diastolicBP >= 85) score += 18;
  if (record.hemoglobin < 10) score += 20;
  score += (record.symptoms?.length || 0) * 6;
  score = Math.min(96, score);
  if (score >= 60) return { label: 'CRITICAL ALERT', tone: 'critical', score };
  if (score >= 35) return { label: 'MODERATE', tone: 'routine', score };
  return { label: 'NORMAL', tone: 'lab', score };
}

const TONE_STYLES = {
  critical: { badge: 'bg-red-100 text-red-700', border: 'border-red-200', title: 'Elevated BP Detected', Icon: HiMiniExclamationCircle, iconClass: 'text-red-600' },
  routine:  { badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200', title: 'Routine Health Check', Icon: FaBolt, iconClass: 'text-amber-500' },
  lab:      { badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', title: 'Normal Vitals Logged', Icon: FaCheckCircle, iconClass: 'text-emerald-500' },
};

export default function PatientHistory() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchHealth()
      .then(setRecords)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (r.symptoms || []).some((s) => s.toLowerCase().includes(q))
      || `${r.systolicBP}/${r.diastolicBP}`.includes(q)
      || String(r.hemoglobin).includes(q);
  });

  const highCount = records.filter((r) => getRiskLevel(r).label === 'CRITICAL ALERT').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-6">

            {/* Timeline */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-slate-800">Interaction Timeline</h3>
                <span className="text-xs text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full">{filtered.length} entr{filtered.length !== 1 ? 'ies' : 'y'}</span>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 animate-pulse">
                      <div className="flex gap-3 mb-3">
                        <div className="w-20 h-5 bg-slate-100 rounded-full"/>
                        <div className="flex-1 h-5 bg-slate-100 rounded"/>
                      </div>
                      <div className="h-4 w-3/4 bg-slate-100 rounded"/>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                  <p className="text-slate-400 text-sm mb-4">{search ? 'No entries match your search.' : 'No health history yet.'}</p>
                  {!search && (
                    <Link to="/patient-health-data-entry" className="text-indigo-600 font-semibold text-sm hover:underline">
                      Log your first entry â†’
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((record, idx) => {
                    const risk = getRiskLevel(record);
                    const style = TONE_STYLES[risk.tone];
                    const Icon = style.Icon;
                    return (
                      <article key={record._id || idx} className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow ${style.border}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className={`text-lg ${style.iconClass}`} />
                            <div>
                              <span className={`text-[10px] font-semibold  tracking-widest px-2 py-0.5 rounded-full ${style.badge}`}>
                                {risk.label}
                              </span>
                              <h4 className="font-semibold text-slate-800 mt-1 text-base">{style.title}</h4>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 whitespace-nowrap">
                            {new Date(record.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                          BP: <strong>{record.systolicBP}/{record.diastolicBP} mmHg</strong> &nbsp;â€¢&nbsp;
                          Hb: <strong>{record.hemoglobin} g/dL</strong> &nbsp;â€¢&nbsp;
                          Age: <strong>{record.age} yrs</strong>
                        </p>

                        {record.symptoms?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {record.symptoms.map((s) => (
                              <span key={s} className="bg-slate-100 text-slate-500 text-[10px] font-semibold px-2.5 py-1 rounded-full">{s}</span>
                            ))}
                          </div>
                        )}

                        {record.pregnancyHistory && (
                          <blockquote className="mt-3 border-l-2 border-indigo-400 pl-3 text-xs text-slate-500 italic">
                            Pregnancy history: {record.pregnancyHistory}
                          </blockquote>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Sidebar Panel */}
            <aside className="flex flex-col gap-5">
              {/* Vitals Snapshot */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-700 text-sm">Latest Vitals</h4>
                  {records.length > 0 && <span className="text-[10px] text-slate-400">Most recent</span>}
                </div>
                {records.length > 0 ? (
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'Blood Pressure', value: `${records[0].systolicBP}/${records[0].diastolicBP} mmHg`, flag: records[0].systolicBP >= 140 },
                      { label: 'Hemoglobin', value: `${records[0].hemoglobin} g/dL`, flag: records[0].hemoglobin < 10 },
                      { label: 'Age', value: `${records[0].age} years` },
                    ].map(({ label, value, flag }) => (
                      <div key={label} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
                        <span className="text-xs text-slate-400">{label}</span>
                        <span className={`font-semibold text-xs ${flag ? 'text-red-600' : 'text-slate-700'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">No records yet.</p>
                )}
              </div>

              {/* Risk Status */}
              <div className={`rounded-2xl p-5 text-white shadow-md ${
                highCount > 0 ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-indigo-600 to-indigo-700'
              }`}>
                <p className="text-xs  tracking-widest text-white/70 mb-1">Active Risk Level</p>
                <h4 className="text-2xl font-semibold mb-1">
                  {highCount > 0 ? 'High Risk' : records.length > 0 ? 'Low Risk' : 'No Data'}
                </h4>
                <p className="text-xs text-white/80 mb-4">
                  {highCount > 0 ? `${highCount} critical event${highCount > 1 ? 's' : ''} on record` : 'Your readings look good'}
                </p>
                <Link
                  to="/patient-risk-assessment"
                  className="block w-full py-2 text-center border border-white/30 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold transition-colors"
                >
                  Full Risk Analysis
                </Link>
              </div>

              {/* Filter Tools */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-500  tracking-widest mb-3">Filter History</h4>
                <input
                  type="text" placeholder="Search symptoms, BP..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 transition placeholder:text-slate-400"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="mt-2 text-xs text-indigo-600 font-semibold hover:underline w-full text-left">
                    Clear filter
                  </button>
                )}
              </div>
            </aside>

          </div>
    </div>
  );
}


