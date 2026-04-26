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
    <main className="grid min-h-screen bg-[radial-gradient(circle_at_16%_12%,rgba(34,80,182,0.12),transparent_34%),radial-gradient(circle_at_84%_0%,rgba(0,122,138,0.1),transparent_34%),linear-gradient(180deg,#f5f8ff_0%,#edf2fa_100%)] text-[#10264d] lg:grid-cols-[220px_minmax(0,1fr)]">
      <SideBar />

      <section className="min-w-0 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-5xl rounded-[1.4rem] border border-[rgba(172,188,218,0.44)] bg-[rgba(255,255,255,0.93)] p-4 shadow-[0_24px_48px_rgba(11,43,99,0.1)] sm:p-6 lg:p-7">
          <header className="mb-6 text-center">
            <h1 className="m-0 text-[1.95rem] font-semibold tracking-tight text-[#10264d]">
              Patient Health Data Entry
            </h1>
            <p className="m-0 mt-2 text-sm text-[#59719a]">
              Enter patient details for risk assessment
            </p>
          </header>

          <form className="grid gap-5" onSubmit={onSubmit}>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onReset}
                className="rounded-full border border-[#c8d8ee] bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] px-5 py-2 text-sm font-semibold text-[#4d6f99] shadow-[0_6px_16px_rgba(31,88,164,0.12)] transition hover:-translate-y-[1px] hover:bg-[#f7fbff]"
              >
                Reset Form
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
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
                    className="w-full rounded-lg border border-[#d6dfef] bg-white px-3 py-2.5 pr-14 text-sm outline-none focus:border-[#2d78d9]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                    years
                  </span>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
                  Previous Pregnancy History
                </span>
                <select
                  name="priorPregnancyHistory"
                  value={form.priorPregnancyHistory}
                  onChange={onFieldChange}
                  className="rounded-lg border border-[#d6dfef] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2d78d9]"
                >
                  <option value="">Select option</option>
                  <option>None</option>
                  <option>Hypertension</option>
                  <option>Pre-eclampsia</option>
                  <option>Gestational Diabetes</option>
                </select>
              </label>
            </div>

            <section className="rounded-xl border border-[#e0e7f4] bg-[#f8fbff] p-4">
              <h2 className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
                Blood Pressure Group
              </h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
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
                      className="w-full rounded-lg border border-[#d6dfef] bg-white px-3 py-2.5 pr-14 text-sm outline-none focus:border-[#2d78d9]"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                      mmHg
                    </span>
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
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
                      className="w-full rounded-lg border border-[#d6dfef] bg-white px-3 py-2.5 pr-14 text-sm outline-none focus:border-[#2d78d9]"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                      mmHg
                    </span>
                  </div>
                </label>
              </div>
            </section>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
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
                  className="w-full rounded-lg border border-[#d6dfef] bg-white px-3 py-2.5 pr-14 text-sm outline-none focus:border-[#2d78d9]"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#87a0c1]">
                  g/dL
                </span>
              </div>
            </label>

            <section>
              <h2 className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[#6b80a4]">
                Symptoms Checklist
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {symptomOptions.map((symptom) => {
                  const active = form.symptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => onSymptomToggle(symptom)}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        active
                          ? 'border-[#2d78d9] bg-[rgba(45,120,217,0.12)] text-[#204c8a]'
                          : 'border-[#e1e8f5] bg-white text-[#5e7497] hover:border-[#c6d5ec]'
                      }`}
                    >
                      {symptom}
                    </button>
                  );
                })}
              </div>
            </section>

            <p className="m-0 rounded-lg border border-[#d7e5f6] bg-[#f2f8ff] px-3 py-2 text-xs text-[#56739a]">
              This data will be used to assess maternal health risks such as pre-eclampsia. Please
              ensure all vitals are recorded accurately using clinical instruments.
            </p>

            {message ? (
              <p className="m-0 rounded-lg border border-[#f0c7ce] bg-[#fff4f5] px-3 py-2 text-sm text-[#af2f45]">
                {message}
              </p>
            ) : null}

            <div className="grid justify-items-center gap-3 border-t border-[rgba(164,186,218,0.42)] pt-4">
              <button
                type="submit"
                className="w-full max-w-[360px] rounded-xl border border-transparent bg-[linear-gradient(90deg,#2250b6_0%,#007a8a_100%)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(17,76,159,0.24)] transition hover:-translate-y-[1px]"
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
