import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Sidebar now provided by AppLayout
import { createHealthRecord, predictRisk } from '../../api.js';

const SYMPTOM_OPTIONS = ['Headache', 'Swelling', 'Dizziness', 'Fatigue', 'Vision Blur', 'Abdominal Pain', 'Nausea', 'Bleeding'];

const PREGNANCY_OPTIONS = [
  { value: '', label: 'Select history...' },
  { value: 'None', label: 'None / First Pregnancy' },
  { value: 'Normal', label: 'Normal Delivery' },
  { value: 'Caesarean', label: 'Caesarean Section' },
  { value: 'Pre-eclampsia', label: 'Pre-eclampsia' },
  { value: 'Hypertension', label: 'Gestational Hypertension' },
  { value: 'Miscarriage', label: 'Miscarriage' },
];

const initialForm = {
  age: '',
  systolicBP: '120',
  diastolicBP: '80',
  hemoglobin: '11.5',
  pregnancyHistory: '',
  symptoms: [],
};

function RangeInput({ name, label, value, min, max, unit, onChange, color = 'indigo' }) {
  const pct = ((Number(value) - min) / (max - min)) * 100;
  const colors = {
    indigo: 'accent-indigo-600',
    pink: 'accent-pink-600',
    amber: 'accent-amber-500',
    emerald: 'accent-emerald-500',
  };
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className={`text-xl font-semibold text-indigo-700`}>{value} <span className="text-xs font-medium text-slate-400">{unit}</span></span>
      </div>
      <input
        type="range" name={name} min={min} max={max} step={name === 'hemoglobin' ? '0.1' : '1'}
        value={value} onChange={onChange}
        className={`w-full h-2 rounded-full ${colors[color]} bg-slate-100 cursor-pointer`}
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

export default function PatientHealthDataEntryForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSymptomToggle = (symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const onReset = () => { setForm(initialForm); setMessage(''); };

  // Live risk estimate for visual feedback
  const liveRisk = useMemo(() => {
    const sys = Number(form.systolicBP);
    const dia = Number(form.diastolicBP);
    const hb = Number(form.hemoglobin);
    let score = 10;
    if (sys >= 140 || dia >= 90) score += 35;
    else if (sys >= 130 || dia >= 85) score += 18;
    if (hb > 0 && hb < 10) score += 20;
    if (form.pregnancyHistory === 'Pre-eclampsia') score += 22;
    else if (form.pregnancyHistory === 'Hypertension') score += 14;
    score += form.symptoms.length * 6;
    return Math.min(96, score);
  }, [form]);

  const riskLabel = liveRisk >= 60 ? { text: 'High Risk', cls: 'bg-red-100 text-red-700' }
    : liveRisk >= 35 ? { text: 'Moderate', cls: 'bg-amber-100 text-amber-700' }
    : { text: 'Low Risk', cls: 'bg-emerald-100 text-emerald-700' };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.age) { setMessage('Please enter your age.'); return; }
    if (Number(form.age) < 10 || Number(form.age) > 60) { setMessage('Age must be between 10 and 60.'); return; }
    if (!form.pregnancyHistory) { setMessage('Please select your pregnancy history.'); return; }
    if (Number(form.systolicBP) <= Number(form.diastolicBP)) {
      setMessage('Systolic BP must be greater than Diastolic BP.'); return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      // â”€â”€ Backend expects these exact field names â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      const healthPayload = {
        age: Number(form.age),
        systolicBP: Number(form.systolicBP),
        diastolicBP: Number(form.diastolicBP),
        hemoglobin: Number(form.hemoglobin),
        symptoms: form.symptoms,
        pregnancyHistory: form.pregnancyHistory,
      };

      // Save health record first
      const record = await createHealthRecord(healthPayload);

      // â”€â”€ Risk service also maps bpSystolic / bpDiastolic fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      let prediction = null;
      try {
        const riskRes = await predictRisk({
          age: healthPayload.age,
          bpSystolic: healthPayload.systolicBP,
          bpDiastolic: healthPayload.diastolicBP,
          hemoglobin: healthPayload.hemoglobin,
          symptoms: healthPayload.symptoms,
        });
        prediction = riskRes?.prediction ?? null;
      } catch (riskErr) {
        // AI service may be offline â€” use client-side estimate
        console.warn('AI risk service unavailable, using estimate:', riskErr.message);
        prediction = {
          riskScore: liveRisk,
          riskCategory: riskLabel.text,
          confidence: 80,
        };
      }

      navigate('/patient-risk-assessment', {
        state: {
          assessment: {
            age: healthPayload.age,
            bloodPressure: `${healthPayload.systolicBP}/${healthPayload.diastolicBP} mmHg`,
            hemoglobin: healthPayload.hemoglobin,
            symptoms: healthPayload.symptoms.length ? healthPayload.symptoms : ['No major symptom reported'],
            riskScore: prediction?.riskScore ?? liveRisk,
            confidence: prediction?.confidence ?? 80,
            reportId: record?._id ?? `MR-${Math.floor(68000 + Math.random() * 1300)}`,
          },
        },
      });
    } catch (err) {
      console.error('Health data submission failed:', err);
      setMessage(err?.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full text-[#10264d]">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold text-sm mb-1">MaterNova â€” Health Data Entry</p>
          <h1 className="text-3xl font-semibold text-slate-800">Log Your Health Data</h1>
          <p className="text-slate-500 text-sm mt-1">Fill in your current vitals for an AI-powered maternal risk assessment.</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full max-w-3xl">

          {/* Vitals Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-600 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </span>
              Vital Signs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" name="age" value={form.age}
                  onChange={onFieldChange} min="10" max="60" required
                  placeholder="e.g. 26"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              {/* Pregnancy History */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Pregnancy History <span className="text-red-500">*</span>
                </label>
                <select
                  name="pregnancyHistory" value={form.pregnancyHistory}
                  onChange={onFieldChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition appearance-none"
                >
                  {PREGNANCY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} disabled={!o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Systolic BP */}
              <RangeInput name="systolicBP" label="Systolic Blood Pressure" value={form.systolicBP} min={70} max={200} unit="mmHg" onChange={onFieldChange} color="pink" />

              {/* Diastolic BP */}
              <RangeInput name="diastolicBP" label="Diastolic Blood Pressure" value={form.diastolicBP} min={40} max={130} unit="mmHg" onChange={onFieldChange} color="indigo" />

              {/* Hemoglobin */}
              <div className="md:col-span-2">
                <RangeInput name="hemoglobin" label="Hemoglobin Level" value={form.hemoglobin} min={4} max={20} unit="g/dL" onChange={onFieldChange} color="emerald" />
              </div>
            </div>
          </div>

          {/* Symptoms Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-pink-600 fill-current"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
              </span>
              Current Symptoms
              {form.symptoms.length > 0 && (
                <span className="ml-auto text-xs bg-pink-100 text-pink-700 font-semibold px-2.5 py-1 rounded-full">{form.symptoms.length} selected</span>
              )}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SYMPTOM_OPTIONS.map((s) => {
                const active = form.symptoms.includes(s);
                return (
                  <button
                    key={s} type="button" onClick={() => onSymptomToggle(s)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Risk Preview */}
          <div className={`rounded-2xl p-5 border flex items-center justify-between gap-4 transition-all ${
            liveRisk >= 60 ? 'bg-red-50 border-red-200' : liveRisk >= 35 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div>
              <p className="text-xs font-semibold text-slate-500  tracking-widest mb-1">Live Risk Estimate</p>
              <p className={`text-2xl font-semibold ${liveRisk >= 60 ? 'text-red-700' : liveRisk >= 35 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {riskLabel.text}
              </p>
              <p className="text-xs text-slate-500 mt-1">Submit to get the full AI-powered analysis</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-5xl font-semibold ${liveRisk >= 60 ? 'text-red-600' : liveRisk >= 35 ? 'text-amber-600' : 'text-emerald-600'}`}>{liveRisk}</p>
              <p className="text-xs text-slate-400">/ 100</p>
            </div>
          </div>

          {/* Error / Status */}
          {message && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
              {message}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button" onClick={onReset}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
            >
              Reset
            </button>
            <button
              type="submit" disabled={submitting}
              className="flex-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-8 rounded-xl shadow-md shadow-indigo-200 transition-all text-sm flex-1 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Analyzing...
                </>
              ) : 'Run Risk Analysis â†’'}
            </button>
          </div>
        </form>
    </div>
  );
}


