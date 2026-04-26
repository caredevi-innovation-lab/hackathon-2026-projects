import React, { useEffect, useState } from 'react';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchHealth } from '../../api.js';

// SVG Icons
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
);
const TranslateIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 fill-current"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
);
const ExportIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-600 fill-current"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
);
const AlertStarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-red-500 fill-current"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const CriticalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 fill-current"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
);
const ModerateIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
);
const StableIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500 fill-current"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 10h-4v2h4v-2zm2-4H8v2h8V8z"/></svg>
);

export default function PatientRecord() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHealth();
        setRecords(data);
      } catch (error) {
        console.error('Failed to fetch health records:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Helper to map risk score to risk level
  const getRiskLevel = (score) => {
    if (!score) return { text: 'Low', color: 'emerald', icon: <StableIcon /> };
    if (score > 50) return { text: 'High', color: 'red', icon: <CriticalIcon /> };
    if (score > 25) return { text: 'Moderate', color: 'amber', icon: <ModerateIcon /> };
    return { text: 'Low', color: 'emerald', icon: <StableIcon /> };
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <PatientSideBar />
      
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        
        {/* Top Header */}
        <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-800">My Records</h2>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 border-r border-slate-200 pr-6">
              <button className="text-indigo-600">EN</button>
              <span>|</span>
              <button className="hover:text-indigo-600">NE</button>
            </div>

            <button className="hover:opacity-80 transition-opacity"><BellIcon /></button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center text-indigo-700 font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'Patient'}</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">Patient ID: #{user?.id?.substring(0, 4) || '8821'}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 w-full max-w-[100vw] pb-12">
          
          {/* Title Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Patient Risk Timeline</h1>
              <p className="text-sm text-slate-500 font-medium">Longitudinal health monitoring for current pregnancy cycle.</p>
            </div>
            <div className="flex gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                <ExportIcon /> Export Report
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#4338ca] hover:bg-[#3730a3] text-white rounded-lg text-sm font-bold shadow-md transition-colors">
                + New Observation
              </button>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-slate-100 mb-6 relative w-full h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Composite Risk Score (0-100)</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Moderate</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Risk</div>
              </div>
            </div>

            {/* Dynamic SVG Chart */}
            <div className="relative w-full h-[250px] overflow-hidden sm:overflow-visible overflow-x-auto">
              <svg className="w-[800px] sm:w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 250">
                {/* Grid lines */}
                <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />

                {records.length > 0 ? (
                  <>
                    <polyline
                      points={records.map((r, i) => {
                        const x = 50 + (i * 900) / (records.length === 1 ? 1 : records.length - 1);
                        const risk = r.riskScore || 15;
                        const y = 250 - (risk / 100) * 250;
                        return `${x},${Math.max(20, Math.min(230, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    {records.map((r, i) => {
                      const x = 50 + (i * 900) / (records.length === 1 ? 1 : records.length - 1);
                      const risk = r.riskScore || 15;
                      const y = 250 - (risk / 100) * 250;
                      const level = getRiskLevel(risk);
                      return (
                        <g key={r._id || i}>
                          <line x1={x} y1={y} x2={x} y2="250" stroke="#e2e8f0" strokeWidth="1.5" />
                          <circle cx={x} cy={y} r="5" fill="#dc2626" />
                          <text x={x} y={y - 15} fontSize="10" fill="#64748b" textAnchor="middle">{r.bloodPressure}</text>
                        </g>
                      );
                    })}
                  </>
                ) : (
                  <text x="500" y="125" fontSize="14" fill="#94a3b8" textAnchor="middle">No records available to chart.</text>
                )}
              </svg>

              {/* X-Axis Labels */}
              <div className="absolute -bottom-6 left-0 w-[800px] sm:w-full flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                {records.length > 0 ? records.map((r, i) => (
                  <span key={r._id || i} className="text-center w-full">
                    {new Date(r.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                )) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Event History */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">Event History</h2>
                <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  Filter by Type 
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-20">Week</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-40">Event</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Observation</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-28 text-center">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {loading ? (
                      <tr><td colSpan="4" className="py-4 text-center text-slate-500 text-sm">Loading records...</td></tr>
                    ) : records.length === 0 ? (
                      <tr><td colSpan="4" className="py-4 text-center text-slate-500 text-sm">No records found.</td></tr>
                    ) : (
                      records.map((record) => {
                        const risk = getRiskLevel(record.riskScore);
                        return (
                          <tr key={record._id} className="border-b border-slate-50">
                            <td className="py-5 align-top">
                              <div className="font-bold text-slate-800 text-xs">Date</div>
                              <div className="font-bold text-slate-800 text-xs">{new Date(record.createdAt).toLocaleDateString()}</div>
                            </td>
                            <td className="py-5 align-top">
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full bg-${risk.color}-50 flex items-center justify-center shrink-0 mt-0.5`}>
                                  {risk.icon}
                                </div>
                                <span className="font-bold text-slate-800 leading-tight pt-1">
                                  {record.symptoms && record.symptoms.length > 0 ? 'Symptom Check' : 'Routine Check'}
                                </span>
                              </div>
                            </td>
                            <td className="py-5 pr-4 text-slate-600 text-xs leading-relaxed">
                              BP: {record.bloodPressure || 'N/A'}. 
                              {record.symptoms?.length > 0 && ` Symptoms: ${record.symptoms.join(', ')}.`}
                            </td>
                            <td className="py-5 text-center">
                              <span className={`inline-block px-2.5 py-1 bg-${risk.color}-50 text-${risk.color}-600 text-[9px] font-bold rounded uppercase tracking-wider`}>
                                {risk.text}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Widgets */}
            <div className="flex flex-col gap-6">
              
              {/* Current Risk Status Widget */}
              <div className="bg-gradient-to-br from-[#5c55e6] to-[#463ac7] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-100 mb-4">Current Risk Status</h3>
                
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-black tracking-tight">82</span>
                  <span className="text-sm font-medium text-indigo-200 ml-1">/ 100</span>
                </div>
                
                <p className="text-xs text-indigo-100 leading-relaxed pr-8 mb-6">
                  High risk due to sudden BP escalation. Immediate monitoring required at Biratnagar Zonal Hospital.
                </p>
                
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">Hypertension</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">Third Trimester</span>
                </div>

                {/* Floating bell icon */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
                </div>
              </div>

              {/* Primary Care Contact Widget */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-4">Primary Care Contact</h3>
                
                <div className="flex items-center gap-3 mb-5">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&h=100&q=80" alt="Doctor" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Dr. Rajesh Hamal</p>
                    <p className="text-xs text-slate-500">Lead Obstetrician</p>
                  </div>
                </div>
                
                <button className="w-full py-2.5 bg-white border-2 border-indigo-100 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                  Contact Physician
                </button>
              </div>

              {/* Next Scheduled Checkup Widget */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-4">Next Scheduled Checkup</h3>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-12 h-12 shrink-0">
                    <span className="text-[8px] font-bold text-indigo-600 uppercase">Oct</span>
                    <span className="text-base font-black text-slate-800 leading-none">24</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Week 33 Checkup</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">9:30 AM - Biratnagar Unit</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
