import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PatientSideBar from '../../components/PatientSideBar.jsx';

const baseResult = {
  age: 28,
  bloodPressure: '150/95 mmHg',
  symptoms: ['Headache', 'Swelling', 'Vision Blur'],
  riskScore: 72,
  confidence: 94.8,
  reportId: 'MR-68219',
};

export default function PatientRiskPage() {
  const location = useLocation();
  const incomingAssessment = location.state?.assessment;
  const [result, setResult] = useState(() => ({
    ...baseResult,
    ...incomingAssessment,
  }));
  const [rechecking, setRechecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const riskCategory = useMemo(() => {
    if (result.riskScore >= 70) {
      return 'High Risk';
    }
    if (result.riskScore >= 40) {
      return 'Moderate Risk';
    }
    return 'Low Risk';
  }, [result.riskScore]);

  const riskColor =
    result.riskScore >= 70 ? '#df4358' : result.riskScore >= 40 ? '#f39a37' : '#0f8f78';

  const onRecheck = () => {
    setRechecking(true);
    setStatusMessage('');

    setTimeout(() => {
      const nextScore = Math.max(
        32,
        Math.min(93, result.riskScore + (Math.random() > 0.5 ? 2 : -3))
      );

      setResult((prev) => ({
        ...prev,
        riskScore: nextScore,
        confidence: Number((92 + Math.random() * 6).toFixed(1)),
        reportId: `MR-${Math.floor(68000 + Math.random() * 1300)}`,
      }));

      setRechecking(false);
      setStatusMessage('Risk analysis refreshed with latest available vitals.');
    }, 850);
  };

  const onSaveReport = () => {
    setStatusMessage('Report saved successfully for clinical follow-up.');
  };

  return (
    <main className="grid min-h-screen bg-[radial-gradient(circle_at_16%_12%,rgba(34,80,182,0.12),transparent_34%),radial-gradient(circle_at_84%_0%,rgba(0,122,138,0.1),transparent_34%),linear-gradient(180deg,#f5f8ff_0%,#edf2fa_100%)] text-[#10264d] lg:grid-cols-[220px_minmax(0,1fr)]">
      <PatientSideBar />

      <section className="min-w-0 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl rounded-[1.4rem] border border-[rgba(172,188,218,0.44)] bg-[rgba(255,255,255,0.93)] p-4 shadow-[0_24px_48px_rgba(11,43,99,0.1)] sm:p-6 lg:p-7">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(165,184,214,0.4)] pb-4">
            <div>
              <p className="m-0 text-sm font-semibold text-indigo-600">
                MaterNova Risk Analysis
              </p>
              <h1 className="m-0 mt-1 text-2xl font-bold text-slate-800 sm:text-[2rem]">
                Risk Analysis Result
              </h1>
              <p className="m-0 mt-1 text-sm text-slate-500">
                AI-powered maternal health assessment • ID: #{result.reportId}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onRecheck}
                disabled={rechecking}
                className="rounded-xl border border-[#b7c6df] bg-white px-4 py-2 text-sm font-semibold text-[#214a87] shadow-[0_6px_16px_rgba(17,68,144,0.09)] transition hover:-translate-y-[1px] hover:bg-[#f5f9ff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {rechecking ? 'Re-checking...' : 'Re-check'}
              </button>
              <button
                type="button"
                onClick={onSaveReport}
                className="rounded-xl border border-transparent bg-[linear-gradient(90deg,#2250b6_0%,#007a8a_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(17,76,159,0.24)] transition hover:-translate-y-[1px]"
              >
                Save Report
              </button>
            </div>
          </header>

          <div className="mb-5 rounded-xl border border-[#f0c7ce] bg-[#fff4f5] px-4 py-3 text-sm font-semibold text-[#af2f45]">
            High risk detected. Immediate medical attention required.
          </div>

          {statusMessage ? (
            <p className="mb-5 rounded-xl border border-[#b8d4ea] bg-[#f2f9ff] px-4 py-2.5 text-sm text-[#265687]">
              {statusMessage}
            </p>
          ) : null}

          <section className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
            <article className="rounded-2xl border border-[#d8e0f0] bg-white p-4 shadow-[0_8px_22px_rgba(13,60,126,0.08)]">
              <p className="m-0 text-sm font-bold text-slate-800 mb-4">
                Patient Summary
              </p>

              <div className="flex flex-col gap-4 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center">
                  <p className="m-0 text-slate-500 font-medium">Age</p>
                  <p className="m-0 text-base font-bold text-slate-800">
                    {result.age} Years
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="m-0 text-slate-500 font-medium">Blood Pressure</p>
                  <p className="m-0 text-base font-bold text-red-500">
                    {result.bloodPressure}
                  </p>
                </div>
                <div>
                  <p className="m-0 text-slate-500 font-medium mb-2">Reported Symptoms</p>
                  <div className="flex flex-wrap gap-2">
                    {result.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="grid gap-4 rounded-2xl border border-[#d8e0f0] bg-white p-4 shadow-[0_8px_22px_rgba(13,60,126,0.08)] sm:grid-cols-2">
              <div className="grid place-items-center rounded-2xl bg-[#f8fbff] px-4 py-5">
                <div
                  className="grid h-40 w-40 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(${riskColor} 0 ${result.riskScore}%, #e4ebf7 ${result.riskScore}% 100%)`,
                  }}
                >
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_rgba(174,190,217,0.42)]">
                    <p className="m-0 text-[2rem] font-bold leading-none text-[#112f59]">
                      {result.riskScore}%
                    </p>
                    <p
                      className="m-0 mt-1 text-[0.68rem] font-bold uppercase tracking-[0.15em]"
                      style={{ color: riskColor }}
                    >
                      {riskCategory}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f8fbff] p-4">
                <p className="m-0 text-sm font-bold text-slate-800">
                  AI Explanation
                </p>
                <p className="m-0 mt-3 text-sm leading-relaxed text-[#36547d]">
                  High blood pressure combined with swelling indicates possible early signs of
                  pre-eclampsia. System analysis suggests immediate clinical verification and
                  continuous monitoring of vitals.
                </p>
                <p className="m-0 mt-4 text-xs font-semibold text-[#607ba1]">
                  Confidence: {result.confidence}%
                </p>
              </div>
            </article>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#d8e0f0] bg-[linear-gradient(180deg,#f8fbff_0%,#f4f8ff_100%)] p-4 shadow-[0_8px_22px_rgba(13,60,126,0.08)]">
              <h2 className="m-0 text-xl font-semibold text-[#1f4581]">Clinical Recommendations</h2>
              <ul className="m-0 mt-4 grid gap-2.5 list-none p-0">
                <li className="rounded-xl bg-white px-3 py-2.5 text-sm text-[#2f4e76]">
                  <strong className="block text-[#163a6f]">Monitor BP daily</strong>
                  Record twice daily and log in the vitals section.
                </li>
                <li className="rounded-xl bg-white px-3 py-2.5 text-sm text-[#2f4e76]">
                  <strong className="block text-[#163a6f]">Visit nearest health center</strong>
                  Professional evaluation required within 24 hours.
                </li>
                <li className="rounded-xl bg-white px-3 py-2.5 text-sm text-[#2f4e76]">
                  <strong className="block text-[#163a6f]">Watch for severe symptoms</strong>
                  Immediate ER if vision blurs or severe upper pain occurs.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#d8e0f0] bg-white p-4 shadow-[0_8px_22px_rgba(13,60,126,0.08)]">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[#6580aa]">
                Resources & Sharing
              </p>
              <div className="mt-3 overflow-hidden rounded-xl bg-[linear-gradient(120deg,#082b51_0%,#0e5e67_100%)] p-5 text-white">
                <p className="m-0 text-xs uppercase tracking-[0.12em] text-[#b6d8ff]">Guidance</p>
                <p className="m-0 mt-1 text-lg font-semibold">Understanding Pre-eclampsia</p>
                <p className="m-0 mt-2 text-sm text-[#dbe9ff]">
                  Learn warning signs and emergency care pathways.
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-[#d9e3f3] bg-[#f8fbff] px-3 py-2 text-sm text-[#335983]">
                Patient_Report_{result.riskScore}_High.pdf
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  className="rounded-xl border border-[#c9d7eb] bg-white px-3 py-2 text-sm font-semibold text-[#2b578f] hover:bg-[#f7fbff]"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-[#c9d7eb] bg-white px-3 py-2 text-sm font-semibold text-[#2b578f] hover:bg-[#f7fbff]"
                >
                  Print
                </button>
              </div>
            </article>
          </section>

          <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(165,184,214,0.4)] pt-3 text-xs text-[#6f84a3]">
            <span>MaterNova Care Platform v2.4.0</span>
            <span>Privacy Protocol . Terms of Use . System Online</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
