import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import ironImg from '../../assets/images/iron.png';
import sidenapImg from '../../assets/images/sidenap.png';
import walkImg from '../../assets/images/walk.png';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchHealth } from '../../api.js';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
);
const HeartOutlineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
);
const SmileIcon = () => (
  <svg viewBox="0 0 24 24" className="w-24 h-24 text-slate-100 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-10.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm5 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="3" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

function StatCard({ icon, label, value, color }) {
  const colors = {
    pink: 'bg-pink-50',
    blue: 'bg-blue-50',
    amber: 'bg-amber-50',
    red: 'bg-red-50',
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 md:p-2">
      <div className={`w-10 h-10 rounded-full ${colors[color] || 'bg-slate-50'} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="text-center md:text-left">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-slate-800">{value || 'N/A'}</p>
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth()
      .then(setRecords)
      .catch((err) => console.error('Failed to fetch health records:', err))
      .finally(() => setLoading(false));
  }, []);

  const latest = records.length > 0 ? records[0] : null;

  // HealthRecord model stores systolicBP + diastolicBP (numbers), not bloodPressure string
  const recentBP = latest ? `${latest.systolicBP}/${latest.diastolicBP} mmHg` : 'N/A';
  const recentHb  = latest ? `${latest.hemoglobin} g/dL` : 'N/A';
  const recentAge = latest?.age || user?.name;
  const recentSymptoms = latest?.symptoms?.length > 0 ? latest.symptoms.join(', ') : 'None';

  // Derive a simple risk score from BP (no AI needed for dashboard display)
  const riskScore = latest
    ? Math.min(96, Math.max(5,
        (latest.systolicBP >= 140 || latest.diastolicBP >= 90 ? 45 : 10) +
        (latest.hemoglobin < 10 ? 20 : 0) +
        (latest.symptoms?.length || 0) * 5
      ))
    : 5;
  const isHighRisk = riskScore > 50;

  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />

      <div className="flex-1 flex flex-col overflow-y-auto relative w-full min-w-0">
        {/* Chat FAB */}
        <button
          aria-label="Chat support"
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
        </button>

        {/* Header */}
        <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-white border-b border-slate-100 shrink-0 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 border-r border-slate-200 pr-6">
              <button className="text-indigo-600">EN</button>
              <span>|</span>
              <button className="hover:text-indigo-600">NE</button>
            </div>
            <button className="hover:opacity-80 transition-opacity"><BellIcon /></button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'Patient'}</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">Patient</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="p-4 md:p-8 w-full">

          {/* Title Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div>
              <h3 className="text-indigo-600 font-semibold text-sm mb-1">My Journey</h3>
              <h1 className="text-2xl font-bold text-slate-800">
                {loading ? 'Loading...' : latest ? 'Your Latest Record' : 'Feeling Great Today!'}
              </h1>
            </div>
            <Link
              to="/patient-health-data-entry"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span className="flex items-center justify-center bg-white/20 rounded-full w-5 h-5 text-sm">+</span>
              Log Health Data
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Journey Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute right-8 top-12 opacity-70 pointer-events-none">
                <SmileIcon />
              </div>

              {loading ? (
                <div className="flex flex-col gap-3 animate-pulse">
                  <div className="h-6 w-32 bg-slate-100 rounded-full" />
                  <div className="h-8 w-48 bg-slate-100 rounded" />
                  <div className="h-4 w-64 bg-slate-100 rounded" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      {latest ? `${records.length} Record${records.length !== 1 ? 's' : ''} Total` : 'No Records Yet'}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 mb-0.5">Last Updated</p>
                      <p className="text-indigo-600 font-bold text-lg">
                        {latest ? new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 mb-1">Health Overview</h2>
                  <p className="text-slate-500 text-sm mb-6">
                    {latest
                      ? `Haemoglobin: ${latest.hemoglobin} g/dL • BP: ${latest.systolicBP}/${latest.diastolicBP} mmHg • Symptoms: ${recentSymptoms}`
                      : 'Log your first health record to see your personalized overview.'}
                  </p>

                  {/* Progress Bar — shows ratio of records vs 9-month journey (40 weeks) */}
                  <div className="mb-6 relative">
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (records.length / 10) * 100)}%` }}
                      />
                    </div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ left: `${Math.max(3, Math.min(97, (records.length / 10) * 100))}%` }}
                    >
                      <HeartOutlineIcon />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-50">
                      <p className="text-xs text-slate-500 font-medium mb-1">Hemoglobin</p>
                      <p className="font-bold text-slate-800 text-lg">{latest ? `${latest.hemoglobin} g/dL` : '—'}</p>
                    </div>
                    <div className="bg-pink-50/50 rounded-xl p-3 border border-pink-50">
                      <p className="text-xs text-slate-500 font-medium mb-1">Systolic BP</p>
                      <p className="font-bold text-slate-800 text-lg">{latest ? `${latest.systolicBP} mmHg` : '—'}</p>
                    </div>
                    <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-50">
                      <p className="text-xs text-slate-500 font-medium mb-1">Diastolic BP</p>
                      <p className="font-bold text-slate-800 text-lg">{latest ? `${latest.diastolicBP} mmHg` : '—'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Risk Score Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <h3 className="text-[11px] font-bold text-slate-400 mb-6 w-full text-center uppercase tracking-widest">Health Safety Score</h3>

              <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={isHighRisk ? '#ef4444' : riskScore > 25 ? '#f59e0b' : '#10b981'}
                    strokeWidth="3.5"
                    strokeDasharray={`${riskScore} 100`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.8s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-4xl font-black text-slate-800 leading-none">{riskScore}</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1">/ 100</span>
                </div>
              </div>

              <div className={`font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1.5 mb-4 ${
                isHighRisk ? 'bg-red-50 text-red-700' : riskScore > 25 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
                <CheckIcon />
                {isHighRisk ? 'High Risk — See Doctor' : riskScore > 25 ? 'Moderate Risk' : 'Low Risk Profile'}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                {loading ? 'Calculating your health score...' : latest
                  ? `BP: ${latest.systolicBP}/${latest.diastolicBP} • Hb: ${latest.hemoglobin} g/dL`
                  : 'Log your first health entry to see your score.'}
              </p>

              {!loading && (
                <Link
                  to="/patient-risk-assessment"
                  className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Full Risk Analysis →
                </Link>
              )}
            </div>
          </div>

          {/* Personal Health Tips */}
          <h3 className="text-lg font-bold text-slate-800 mb-4">Personal Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { src: ironImg, tag: 'Nutrition', tagColor: 'bg-orange-500', title: 'Boost your iron intake', desc: 'Adding spinach and lentils to your lunch helps support baby\'s brain development.' },
              { src: sidenapImg, tag: 'Rest', tagColor: 'bg-indigo-500', title: "The 'Left-Side' Nap", desc: 'Sleeping on your left side improves circulation to the placenta and baby.' },
              { src: walkImg, tag: 'Exercise', tagColor: 'bg-emerald-500', title: '15-Min Morning Walk', desc: 'Gentle movement helps manage swelling and boosts your natural energy levels.' },
            ].map((tip) => (
              <div key={tip.title} className="group cursor-pointer">
                <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                  <img src={tip.src} alt={tip.tag} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className={`absolute bottom-3 left-3 ${tip.tagColor} text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>{tip.tag}</div>
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{tip.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* Recent Vitals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-800">Recent Vitals</h3>
              <Link to="/my-records" className="text-indigo-600 text-xs font-bold hover:underline">View All Records ›</Link>
            </div>

            {loading ? (
              <div className="flex gap-6 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="flex-1 h-14 bg-slate-50 rounded-xl" />)}
              </div>
            ) : latest ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <StatCard icon={<svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-500 fill-current"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-13h-2v4H8v2h3v4h2v-4h3v-2h-3V7z"/></svg>} label="Blood Pressure" value={`${latest.systolicBP}/${latest.diastolicBP}`} color="pink" />
                <StatCard icon={<svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 fill-current"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>} label="Hemoglobin" value={`${latest.hemoglobin} g/dL`} color="blue" />
                <StatCard icon={<svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>} label="Age" value={`${latest.age} yrs`} color="amber" />
                <StatCard icon={<svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-current"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>} label="Symptoms" value={latest.symptoms?.length > 0 ? `${latest.symptoms.length} flagged` : 'None'} color="red" />
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm mb-3">No vitals recorded yet.</p>
                <Link to="/patient-health-data-entry" className="text-indigo-600 font-bold text-sm hover:underline">Log your first entry →</Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center pb-8 pt-4">
            <p className="text-xs text-slate-400 mb-2">© 2024 MaterNova — Secure Maternal Portal</p>
            <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <button className="hover:text-slate-700 transition-colors">Privacy Policy</button>
              <button className="hover:text-slate-700 transition-colors">Emergency Support</button>
              <button className="hover:text-slate-700 transition-colors">Doctor Hotline</button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
