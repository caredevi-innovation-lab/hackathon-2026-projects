import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
      <p className="text-[11px] font-semibold tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-800">{value}</p>
      {note && <p className="mt-1 text-xs font-medium text-slate-500">{note}</p>}
    </article>
  );
}

function getRisk(record) {
  if (!record) return { score: 0, label: 'No Data', tone: 'slate' };
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
  const { i18n } = useTranslation();
  const isNe = i18n.language?.startsWith('ne');
  const tx = (en, ne) => (isNe ? ne : en);
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth().then(setRecords).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const latest = records[0] || null;
  const risk = useMemo(() => getRisk(latest), [latest]);
  const riskLabel = isNe
    ? risk.label.replace('No Data', 'डेटा छैन').replace('High Risk', 'उच्च जोखिम').replace('Moderate', 'मध्यम').replace('Low', 'न्यून')
    : risk.label;
  const latestDate = latest
    ? new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '--';
  const symptomsText = latest?.symptoms?.length > 0 ? latest.symptoms.slice(0, 3).join(', ') : tx('No symptoms reported', 'कुनै लक्षण रिपोर्ट गरिएको छैन');

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <section className="mb-7">
        <p className="text-xs font-semibold tracking-wide text-[#3730a3]">{tx('Patient Workspace', 'बिरामी कार्यक्षेत्र')}</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-800">
          {loading ? tx('Loading your dashboard...', 'तपाईंको ड्यासबोर्ड लोड हुँदैछ...') : (isNe ? `स्वागत छ, ${user?.name || 'बिरामी'}` : `Welcome, ${user?.name || 'Patient'}`)}
        </h1>
      </section>

      <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard label={tx('Latest Blood Pressure', 'नवीनतम रक्तचाप')} value={latest ? `${latest.systolicBP}/${latest.diastolicBP}` : '--'} note="mmHg" tone="indigo" />
        <InfoCard label={tx('Hemoglobin', 'हेमोग्लोबिन')} value={latest ? `${latest.hemoglobin}` : '--'} note="g/dL" tone="emerald" />
        <InfoCard label={tx('Current Risk', 'हालको जोखिम')} value={riskLabel} note={isNe ? `स्कोर: ${risk.score}/100` : `Score: ${risk.score}/100`} tone={risk.tone} />
        <InfoCard label={tx('Total Entries', 'कुल प्रविष्टि')} value={records.length} note={isNe ? `पछिल्लो अपडेट: ${latestDate}` : `Last update: ${latestDate}`} tone="amber" />
      </section>

      <section className="mb-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link to="/patient-health-data-entry" className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm font-semibold text-slate-800">{tx('Log Health Entry', 'स्वास्थ्य प्रविष्टि')}</Link>
        <Link to="/patient-risk-assessment" className="rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm font-semibold text-slate-800">{tx('Run Risk Assessment', 'जोखिम मूल्यांकन')}</Link>
        <Link to="/my-records" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800">{tx('View My Records', 'मेरो रेकर्ड')}</Link>
        <Link to="/health-reports" className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm font-semibold text-slate-800">{tx('Health Reports', 'स्वास्थ्य रिपोर्ट')}</Link>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">{tx('Recent Clinical Snapshot', 'हालको क्लिनिकल सारांश')}</h3>
            <Link to="/my-records" className="text-xs font-semibold text-[#3730a3] hover:text-indigo-900">{tx('View All', 'सबै हेर्नुहोस्')}</Link>
          </div>
          {latest ? (
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500">{tx('Recorded On', 'रेकर्ड मिति')}:</span> <span className="font-semibold">{latestDate}</span></p>
              <p><span className="text-slate-500">{tx('Blood Pressure', 'रक्तचाप')}:</span> <span className="font-semibold">{latest.systolicBP}/{latest.diastolicBP} mmHg</span></p>
              <p><span className="text-slate-500">{tx('Hemoglobin', 'हेमोग्लोबिन')}:</span> <span className="font-semibold">{latest.hemoglobin} g/dL</span></p>
              <p><span className="text-slate-500">{tx('Symptoms', 'लक्षण')}:</span> <span className="font-semibold">{symptomsText}</span></p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">{tx('No data yet. Add your first health entry.', 'अहिलेसम्म डेटा छैन। पहिलो स्वास्थ्य प्रविष्टि थप्नुहोस्।')}</p>
          )}
        </article>
      </section>
    </div>
  );
}
