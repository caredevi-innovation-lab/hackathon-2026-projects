import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import { fetchHealth, predictRisk } from '../../api.js';

function GaugeChart({ score }) {
  // score 0-100, arc on a 220° range
  const RADIUS = 60;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const ARC_FRACTION = 0.7; // 70% of circle = 252 degrees
  const arcLength = CIRCUMFERENCE * ARC_FRACTION;
  const dashOffset = arcLength - (score / 100) * arcLength;
  const color = score >= 60 ? '#ef4444' : score >= 35 ? '#f59e0b' : '#10b981';

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-[126deg]">
        {/* Track */}
        <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#f1f5f9" strokeWidth="12"
          strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`} strokeLinecap="round" />
        {/* Progress */}
        <circle cx="80" cy="80" r={RADIUS} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${arcLength - dashOffset} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-800 leading-none">{score}</span>
        <span className="text-xs font-bold text-slate-400 mt-1">/ 100</span>
      </div>
    </div>
  );
}

const RISK_TIPS = {
  high: [
    'Contact your doctor or visit a clinic immediately.',
    'Avoid strenuous physical activity and rest.',
    'Monitor your blood pressure every few hours.',
    'Ensure someone is with you at all times.',
  ],
  moderate: [
    'Schedule a check-up with your healthcare provider this week.',
    'Increase water intake and reduce sodium.',
    'Track your symptoms daily and log them here.',
    'Follow your prescribed iron and vitamin supplements.',
  ],
  low: [
    'Keep up your regular prenatal check-ups.',
    'Continue taking folic acid and prenatal vitamins.',
    'Stay active with gentle walks and stretching.',
    'Maintain a balanced diet rich in iron and calcium.',
  ],
};

export default function PatientRiskPage() {
  const location = useLocation();
  const incoming = location.state?.assessment;

  const [assessment, setAssessment] = useState(incoming || null);
  const [loading, setLoading] = useState(!incoming);
  const [rechecking, setRechecking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // If accessed directly (no incoming state), fetch latest record & predict
  useEffect(() => {
    if (incoming) return;
    async function load() {
      try {
        const records = await fetchHealth();
        if (!records.length) { setLoading(false); return; }
        const latest = records[0];
        let prediction = null;
        try {
          const res = await predictRisk({
            age: latest.age,
            bpSystolic: latest.systolicBP,
            bpDiastolic: latest.diastolicBP,
            hemoglobin: latest.hemoglobin,
            symptoms: latest.symptoms || [],
          });
          prediction = res?.prediction;
        } catch {
          // AI offline — compute locally
          let score = 10;
          if (latest.systolicBP >= 140 || latest.diastolicBP >= 90) score += 35;
          else if (latest.systolicBP >= 130 || latest.diastolicBP >= 85) score += 18;
          if (latest.hemoglobin < 10) score += 20;
          score += (latest.symptoms?.length || 0) * 6;
          prediction = { riskScore: Math.min(96, score), confidence: 80 };
        }
        setAssessment({
          age: latest.age,
          bloodPressure: `${latest.systolicBP}/${latest.diastolicBP} mmHg`,
          hemoglobin: latest.hemoglobin,
          symptoms: latest.symptoms?.length ? latest.symptoms : ['No symptoms reported'],
          riskScore: prediction?.riskScore ?? 15,
          confidence: prediction?.confidence ?? 80,
          reportId: latest._id ?? `MR-${Math.floor(68000 + Math.random() * 1300)}`,
        });
      } catch (err) {
        console.error(err);
        setStatusMsg('Could not load risk data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [incoming]);

  const riskScore = assessment?.riskScore ?? 0;
  const riskCategory = useMemo(() => {
    if (riskScore >= 60) return 'High Risk';
    if (riskScore >= 35) return 'Moderate Risk';
    return 'Low Risk';
  }, [riskScore]);
  const riskKey = riskScore >= 60 ? 'high' : riskScore >= 35 ? 'moderate' : 'low';
  const riskColor = riskScore >= 60 ? 'text-red-600' : riskScore >= 35 ? 'text-amber-600' : 'text-emerald-600';
  const riskBg = riskScore >= 60 ? 'bg-red-50 border-red-200' : riskScore >= 35 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200';
  const riskBadge = riskScore >= 60 ? 'bg-red-100 text-red-700' : riskScore >= 35 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';

  const handleRecheck = async () => {
    setRechecking(true);
    setStatusMsg('');
    try {
      const records = await fetchHealth();
      if (!records.length) { setStatusMsg('No records found to analyze.'); setRechecking(false); return; }
      const latest = records[0];
      let prediction = null;
      try {
        const res = await predictRisk({
          age: latest.age,
          bpSystolic: latest.systolicBP,
          bpDiastolic: latest.diastolicBP,
          hemoglobin: latest.hemoglobin,
          symptoms: latest.symptoms || [],
        });
        prediction = res?.prediction;
      } catch {
        let score = 10;
        if (latest.systolicBP >= 140 || latest.diastolicBP >= 90) score += 35;
        else if (latest.systolicBP >= 130 || latest.diastolicBP >= 85) score += 18;
        if (latest.hemoglobin < 10) score += 20;
        score += (latest.symptoms?.length || 0) * 6;
        prediction = { riskScore: Math.min(96, score), confidence: 80 };
      }
      setAssessment((prev) => ({
        ...prev,
        bloodPressure: `${latest.systolicBP}/${latest.diastolicBP} mmHg`,
        hemoglobin: latest.hemoglobin,
        symptoms: latest.symptoms?.length ? latest.symptoms : ['No symptoms reported'],
        riskScore: prediction?.riskScore ?? prev.riskScore,
        confidence: prediction?.confidence ?? prev.confidence,
        reportId: latest._id ?? prev.reportId,
      }));
      setStatusMsg('✓ Analysis refreshed with your latest vitals.');
    } catch (err) {
      setStatusMsg('Failed to refresh analysis. Please try again.');
    } finally {
      setRechecking(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />

      <div className="flex-1 flex flex-col overflow-y-auto relative w-full min-w-0">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 py-4 px-4 md:px-8 bg-white border-b border-slate-100 sticky top-0 z-40 shrink-0">
          <div>
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-0.5">MaterNova Risk Analysis</p>
            <h1 className="text-xl font-bold text-slate-800">Risk Analysis Result</h1>
            {assessment && <p className="text-xs text-slate-400 mt-0.5">Report ID: #{typeof assessment.reportId === 'string' ? assessment.reportId.slice(-8).toUpperCase() : assessment.reportId}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRecheck} disabled={rechecking || loading}
              className="border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {rechecking ? 'Refreshing...' : '↻ Re-check'}
            </button>
            <Link
              to="/patient-health-data-entry"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md shadow-indigo-200 transition-all"
            >
              + New Entry
            </Link>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {statusMsg && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${statusMsg.startsWith('✓') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {statusMsg}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg className="w-10 h-10 text-indigo-400 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p className="text-slate-400 text-sm">Analyzing your latest health data...</p>
            </div>
          ) : !assessment ? (
            <div className="text-center py-24">
              <p className="text-slate-400 text-sm mb-4">No health data available for analysis.</p>
              <Link to="/patient-health-data-entry" className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors inline-block">
                Log Health Data
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left — Gauge + Category */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Score Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Risk Score</h3>
                  <GaugeChart score={riskScore} />
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${riskBadge}`}>
                    {riskCategory}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    AI Confidence: <span className="font-bold text-slate-600">{assessment.confidence}%</span>
                  </p>
                </div>

                {/* Quick Vitals */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">Analyzed Vitals</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Blood Pressure</span>
                      <span className="text-sm font-bold text-slate-800">{assessment.bloodPressure}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Hemoglobin</span>
                      <span className="text-sm font-bold text-slate-800">{assessment.hemoglobin} g/dL</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Age</span>
                      <span className="text-sm font-bold text-slate-800">{assessment.age} years</span>
                    </div>
                    <div className="flex justify-between items-start py-2">
                      <span className="text-xs text-slate-500 mt-1">Symptoms</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                        {(assessment.symptoms || []).map((s) => (
                          <span key={s} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Recommendations */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Risk Banner */}
                <div className={`rounded-2xl p-6 border ${riskBg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl ${riskColor}`}>
                      {riskScore >= 60 ? '⚠️' : riskScore >= 35 ? '⚡' : '✅'}
                    </div>
                    <div>
                      <h2 className={`text-xl font-black mb-1 ${riskColor}`}>{riskCategory}</h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {riskScore >= 60
                          ? 'Your vitals suggest a high-risk condition. Please contact your healthcare provider immediately.'
                          : riskScore >= 35
                          ? 'Your readings show some elevated markers. We recommend scheduling a check-up soon.'
                          : 'Great news! Your current readings look healthy. Keep up your prenatal care routine.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Personalized Recommendations</h3>
                  <ul className="space-y-3">
                    {RISK_TIPS[riskKey].map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${riskScore >= 60 ? 'bg-red-500' : riskScore >= 35 ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/my-records"
                    className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl text-sm text-center hover:bg-slate-50 transition-colors"
                  >
                    View All Records
                  </Link>
                  <Link
                    to="/patient-health-data-entry"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm text-center shadow-md shadow-indigo-200 transition-all"
                  >
                    Log New Health Data
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
