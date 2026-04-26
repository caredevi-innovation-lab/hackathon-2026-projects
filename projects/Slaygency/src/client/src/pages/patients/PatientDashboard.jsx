import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchHealth } from '../../api.js';

function InfoCard({ label, value, note, tone = 'indigo' }) {
  const toneMap = {
    indigo: 'border-indigo-100 bg-indigo-50/60',
    emerald: 'border-emerald-100 bg-emerald-50/60',
    amber: 'border-amber-100 bg-amber-50/70',
    rose: 'border-rose-100 bg-rose-50/70',
  };

  return (
    <article className={`rounded-xl border p-4 ${toneMap[tone] || toneMap.indigo}`}>
      <p className="text-[11px] font-semibold  tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-800">{value}</p>
      {note && <p className="mt-1 text-xs font-medium text-slate-500">{note}</p>}
    </article>
  );
}

function ActionCard({ title, description, to, cta, tone = 'indigo' }) {
  const toneMap = {
    indigo: 'border-indigo-100 bg-indigo-50/60',
    slate: 'border-slate-200 bg-white',
    emerald: 'border-emerald-100 bg-emerald-50/70',
    amber: 'border-amber-100 bg-amber-50/70',
  };

  return (
    <article className={`rounded-xl border p-4 ${toneMap[tone] || toneMap.indigo}`}>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex rounded-lg bg-[#3730a3] px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-900"
      >
        {cta}
      </Link>
    </article>
  );
}

function getRisk(record) {
  if (!record) {
    return { score: 0, label: 'No Data', tone: 'slate' };
  }

  let score = 10;
  if (record.systolicBP >= 140 || record.diastolicBP >= 90) score += 35;
  else if (record.systolicBP >= 130 || record.diastolicBP >= 85) score += 18;
  if (record.hemoglobin < 10) score += 20;
  score += (record.symptoms?.length || 0) * 6;
  score = Math.min(96, score);

  if (score >= 60) return { score, label: 'High Risk', tone: 'rose' };
  if (score >= 35) return { score, label: 'Moderate', tone: 'amber' };
  return { score, label: 'Low', tone: 'emerald' };
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth()
      .then(setRecords)
      .catch((err) => console.error('Failed to load health records:', err))
      .finally(() => setLoading(false));
  }, []);

  const latest = records[0] || null;
  const risk = useMemo(() => getRisk(latest), [latest]);
  const latestDate = latest
    ? new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '--';
  const symptomsText =
    latest?.symptoms?.length > 0 ? latest.symptoms.slice(0, 3).join(', ') : 'No symptoms reported';

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <section className="mb-7">
        <p className="text-xs font-semibold  tracking-wide text-[#3730a3]">Patient Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-800">
          {loading ? 'Loading your dashboard...' : `Welcome, ${user?.name || 'Patient'}`}
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Keep your entries updated so risk screening and follow-up planning stay accurate.
        </p>
      </section>

      <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard label="Latest Blood Pressure" value={latest ? `${latest.systolicBP}/${latest.diastolicBP}` : '--'} note="mmHg" tone="indigo" />
        <InfoCard label="Hemoglobin" value={latest ? `${latest.hemoglobin}` : '--'} note="g/dL" tone="emerald" />
        <InfoCard label="Current Risk" value={risk.label} note={`Score: ${risk.score}/100`} tone={risk.tone} />
        <InfoCard label="Total Entries" value={records.length} note={`Last update: ${latestDate}`} tone="amber" />
      </section>

      <section className="mb-7">
        <h2 className="mb-3 text-base font-semibold text-slate-800">Priority Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ActionCard
            title="Log Health Entry"
            description="Record vitals and symptoms for today."
            to="/patient-health-data-entry"
            cta="Open Form"
            tone="indigo"
          />
          <ActionCard
            title="Run Risk Assessment"
            description="View your latest AI-assisted risk analysis."
            to="/patient-risk-assessment"
            cta="Check Risk"
            tone="amber"
          />
          <ActionCard
            title="View My Records"
            description="Review historical entries and trends."
            to="/my-records"
            cta="Open Records"
            tone="slate"
          />
          <ActionCard
            title="Health Reports"
            description="See summary indicators and report insights."
            to="/health-reports"
            cta="Open Report"
            tone="emerald"
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Recent Clinical Snapshot</h3>
            <Link to="/my-records" className="text-xs font-semibold text-[#3730a3] hover:text-indigo-900">
              View All
            </Link>
          </div>

          {loading ? (
            <p className="text-sm font-medium text-slate-400">Loading recent entry...</p>
          ) : latest ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-medium text-slate-500">Recorded On</span>
                <span className="font-semibold text-slate-700">{latestDate}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-medium text-slate-500">Blood Pressure</span>
                <span className="font-semibold text-slate-700">{latest.systolicBP}/{latest.diastolicBP} mmHg</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-medium text-slate-500">Hemoglobin</span>
                <span className="font-semibold text-slate-700">{latest.hemoglobin} g/dL</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="font-medium text-slate-500">Symptoms</span>
                <span className="text-right font-semibold text-slate-700">{symptomsText}</span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">No data yet. Add your first health entry.</p>
            </div>
          )}
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">Today Checklist</h3>
          <ul className="space-y-2 text-sm font-medium text-slate-600">
            <li className="rounded-lg bg-slate-50 px-3 py-2">Check and log blood pressure</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Track symptom changes</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Review risk assessment result</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Plan next follow-up schedule</li>
          </ul>
        </article>
      </section>
    </div>
  );
}


