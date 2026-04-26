import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar.jsx';

const symptomOptions = ['Headache', 'Swelling', 'Dizziness', 'Fatigue', 'Vision Blur'];

const initialForm = {
  age: '',
  priorPregnancyHistory: '',
  bpSystolic: '120',
  bpDiastolic: '80',
  hemoglobin: '11.5',
  symptoms: [],
};

function calculateRiskScore(form) {
  let score = 18;
  const systolic = Number(form.bpSystolic || 0);
  const diastolic = Number(form.bpDiastolic || 0);
  const hb = Number(form.hemoglobin || 0);

  if (systolic >= 140 || diastolic >= 90) {
    score += 28;
  } else if (systolic >= 130 || diastolic >= 85) {
    score += 14;
  }

  if (hb > 0 && hb < 10) {
    score += 15;
  }

  if (form.priorPregnancyHistory === 'Pre-eclampsia') {
    score += 20;
  } else if (form.priorPregnancyHistory === 'Hypertension') {
    score += 14;
  }

  score += form.symptoms.length * 6;
  return Math.max(12, Math.min(96, score));
}

export default function PatientHealthDataEntryForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  const activeSymptomCount = useMemo(() => form.symptoms.length, [form.symptoms]);

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSymptomToggle = (symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((item) => item !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const onReset = () => {
    setForm(initialForm);
    setMessage('');
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.age || !form.priorPregnancyHistory) {
      setMessage('Please fill age and previous pregnancy history before analysis.');
      return;
    }

    const riskScore = calculateRiskScore(form);

    navigate('/patient-risk-assessment', {
      state: {
        assessment: {
          age: Number(form.age),
          bloodPressure: `${form.bpSystolic}/${form.bpDiastolic} mmHg`,
          symptoms: form.symptoms.length ? form.symptoms : ['No major symptom reported'],
          riskScore,
          confidence: Number((90 + Math.random() * 8).toFixed(1)),
          reportId: `MR-${Math.floor(68000 + Math.random() * 1300)}`,
        },
      },
    });
  };

  return (
    <main className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,80,182,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,122,138,0.12),transparent_28%),linear-gradient(180deg,#f5f8ff_0%,#ecf3fb_100%)] text-[#10264d] lg:grid-cols-[220px_minmax(0,1fr)]">
      <SideBar />

      <section className="min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-7">
        <div className="flex h-full w-full flex-col gap-5">
          <header className="rounded-[1.4rem] border border-[rgba(172,188,218,0.3)] bg-[rgba(255,255,255,0.72)] px-5 py-5 shadow-[0_18px_40px_rgba(11,43,99,0.08)] backdrop-blur-xl sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="m-0 text-xs font-semibold tracking-[0.12em] text-[#4a7eb4]">
                  Maternal Risk Assessment
                </p>
                <h1 className="m-0 mt-1 text-[2rem] font-semibold tracking-tight text-[#10264d] sm:text-[2.35rem]">
                  Patient Health Data Entry
                </h1>
                <p className="m-0 mt-2 max-w-xl text-sm leading-6 text-[#5e7497] sm:text-base">
                  Enter the patient details below to generate a clinical risk analysis with a
                  cleaner, more readable experience.
                </p>
              </div>

              <div className="grid gap-2 text-right">
                <div className="inline-flex items-center justify-end gap-2 rounded-full border border-[rgba(45,120,217,0.16)] bg-[rgba(45,120,217,0.08)] px-3 py-1.5 text-xs font-semibold text-[#245191]">
                  <span className="h-2 w-2 rounded-full bg-[#0f8f78]" />
                  Ready for assessment
                </div>
                <p className="m-0 text-xs text-[#6b80a4]">Fast, guided, and clinically focused.</p>
              </div>
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#d8e5f7] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(17,68,144,0.08)] backdrop-blur-sm">
              <p className="m-0 text-xs font-semibold text-[#6b80a4]">Assessment</p>
              <p className="m-0 mt-1 text-sm font-semibold text-[#12325f]">
                Maternal risk screening
              </p>
            </div>
            <div className="rounded-2xl border border-[#d8e5f7] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(17,68,144,0.08)] backdrop-blur-sm">
              <p className="m-0 text-xs font-semibold text-[#6b80a4]">Input quality</p>
              <p className="m-0 mt-1 text-sm font-semibold text-[#12325f]">
                Vitals and symptom summary
              </p>
            </div>
            <div className="rounded-2xl border border-[#d8e5f7] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(17,68,144,0.08)] backdrop-blur-sm">
              <p className="m-0 text-xs font-semibold text-[#6b80a4]">Output</p>
              <p className="m-0 mt-1 text-sm font-semibold text-[#12325f]">
                Risk page after analysis
              </p>
            </div>
          </div>

          <form
            className="grid gap-5 rounded-[1.6rem] border border-[rgba(172,188,218,0.34)] bg-[rgba(255,255,255,0.82)] p-4 shadow-[0_22px_46px_rgba(11,43,99,0.08)] backdrop-blur-xl sm:p-6 lg:p-7"
            onSubmit={onSubmit}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onReset}
                className="rounded-full border border-[#c8d8ee] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] px-5 py-2 text-sm font-semibold text-[#4d6f99] shadow-[0_8px_18px_rgba(31,88,164,0.12)] transition hover:-translate-y-[1px] hover:bg-[#f7fbff]"
              >
                Reset Form
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-4">
                <section className="rounded-2xl border border-[#dfe7f5] bg-[linear-gradient(180deg,#f9fcff_0%,#f2f7ff_100%)] p-4 shadow-[0_10px_24px_rgba(17,68,144,0.06)]">
                  <h2 className="m-0 text-sm font-semibold tracking-[0.02em] text-[#33527d]">
                    Patient Details
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                        Age
                      </span>
                      <div className="relative">
                        <input
                          name="age"
                          type="number"
                          value={form.age}
                          onChange={onFieldChange}
                          min={1}
                          max={70}
                          placeholder="Enter age"
                          className="w-full rounded-xl border border-[#d7e1f1] bg-white px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#2d78d9] focus:shadow-[0_0_0_4px_rgba(45,120,217,0.12)]"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                          years
                        </span>
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                        Previous Pregnancy History
                      </span>
                      <select
                        name="priorPregnancyHistory"
                        value={form.priorPregnancyHistory}
                        onChange={onFieldChange}
                        className="rounded-xl border border-[#d7e1f1] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2d78d9] focus:shadow-[0_0_0_4px_rgba(45,120,217,0.12)]"
                      >
                        <option value="">Select option</option>
                        <option>None</option>
                        <option>Hypertension</option>
                        <option>Pre-eclampsia</option>
                        <option>Gestational Diabetes</option>
                      </select>
                    </label>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#dfe7f5] bg-white p-4 shadow-[0_10px_24px_rgba(17,68,144,0.06)]">
                  <h2 className="m-0 text-sm font-semibold tracking-[0.02em] text-[#33527d]">
                    Blood Pressure Group
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                        Systolic
                      </span>
                      <div className="relative">
                        <input
                          name="bpSystolic"
                          type="number"
                          value={form.bpSystolic}
                          onChange={onFieldChange}
                          min={60}
                          max={220}
                          className="w-full rounded-xl border border-[#d7e1f1] bg-white px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#2d78d9] focus:shadow-[0_0_0_4px_rgba(45,120,217,0.12)]"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                          mmHg
                        </span>
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                        Diastolic
                      </span>
                      <div className="relative">
                        <input
                          name="bpDiastolic"
                          type="number"
                          value={form.bpDiastolic}
                          onChange={onFieldChange}
                          min={40}
                          max={140}
                          className="w-full rounded-xl border border-[#d7e1f1] bg-white px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#2d78d9] focus:shadow-[0_0_0_4px_rgba(45,120,217,0.12)]"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                          mmHg
                        </span>
                      </div>
                    </label>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#dfe7f5] bg-[linear-gradient(180deg,#fbfdff_0%,#f5f9ff_100%)] p-4 shadow-[0_10px_24px_rgba(17,68,144,0.06)]">
                  <h2 className="m-0 text-sm font-semibold tracking-[0.02em] text-[#33527d]">
                    Symptoms Checklist
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    {symptomOptions.map((symptom) => {
                      const active = form.symptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => onSymptomToggle(symptom)}
                          className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                            active
                              ? 'border-[#2d78d9] bg-[linear-gradient(180deg,rgba(45,120,217,0.12),rgba(45,120,217,0.08))] text-[#204c8a] shadow-[0_8px_18px_rgba(45,120,217,0.12)]'
                              : 'border-[#e1e8f5] bg-white text-[#5e7497] hover:-translate-y-[1px] hover:border-[#c6d5ec]'
                          }`}
                        >
                          {symptom}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className="grid content-start gap-4">
                <label className="grid gap-2 rounded-2xl border border-[#dfe7f5] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8ff_100%)] p-4 shadow-[0_10px_24px_rgba(17,68,144,0.06)]">
                  <span className="text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                    Hemoglobin Level
                  </span>
                  <div className="relative">
                    <input
                      name="hemoglobin"
                      type="number"
                      step="0.1"
                      value={form.hemoglobin}
                      onChange={onFieldChange}
                      min={4}
                      max={20}
                      placeholder="Enter Hb level"
                      className="w-full rounded-xl border border-[#d7e1f1] bg-white px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#2d78d9] focus:shadow-[0_0_0_4px_rgba(45,120,217,0.12)]"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                      g/dL
                    </span>
                  </div>
                </label>

                <div className="rounded-2xl border border-[#dfe7f5] bg-white p-4 shadow-[0_10px_24px_rgba(17,68,144,0.06)]">
                  <p className="m-0 text-xs font-semibold tracking-[0.02em] text-[#6b80a4]">
                    Notes
                  </p>
                  <p className="m-0 mt-2 text-sm leading-6 text-[#5f7698]">
                    This data will be used to assess maternal health risks such as pre-eclampsia.
                    Please ensure all vitals are recorded accurately using clinical instruments.
                  </p>
                </div>
              </aside>
            </div>

            {message ? (
              <p className="m-0 rounded-2xl border border-[#f0c7ce] bg-[#fff4f5] px-4 py-3 text-sm text-[#af2f45] shadow-[0_8px_18px_rgba(175,47,69,0.08)]">
                {message}
              </p>
            ) : null}

            <div className="grid justify-items-center gap-3 border-t border-[rgba(164,186,218,0.36)] pt-5">
              <button
                type="submit"
                className="w-full max-w-[420px] rounded-2xl border border-transparent bg-[linear-gradient(90deg,#2250b6_0%,#007a8a_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_28px_rgba(17,76,159,0.26)] transition hover:-translate-y-[1px] hover:shadow-[0_20px_34px_rgba(17,76,159,0.3)]"
              >
                Analyze Risk{activeSymptomCount ? ` (${activeSymptomCount})` : ''}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
