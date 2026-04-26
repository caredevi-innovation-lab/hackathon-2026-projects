import DoctorSideBar from '../components/DoctorSideBar.jsx';

const patientList = [
  { name: 'Sunita Rai', weeks: 28, id: '#SR-2024', active: true, avatar: 'from-[#ffb26b] to-[#e86f70]' },
  { name: 'Maya Tamang', weeks: 14, id: '#MT-8812', avatar: 'from-[#f3d48b] to-[#df8a72]' },
  { name: 'Priya Sharma', weeks: 32, id: '#PS-4009', avatar: 'from-[#d5a566] to-[#7f3d2d]' },
  { name: 'Anjali Karki', weeks: 20, id: '#AK-3321', avatar: 'from-[#86d0d7] to-[#5876cf]' },
];

const notes = [
  {
    time: 'Yesterday, 14:30',
    title: 'Weekly Check-up: Hypertension Management',
    body:
      'Patient reports mild headaches in the morning. Blood pressure remains above baseline. Recommended bed rest and increased fluid intake. Scheduled follow-up in 3 days.',
  },
  {
    time: '4 days ago',
    title: 'Nutrition Consultation',
    body:
      'Iron-rich diet plan discussed. Patient is compliant with prenatal vitamins but experiencing nausea with ferrous sulfate. Suggested alternative liquid formulation.',
  },
];

function IconBell({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 4a4 4 0 00-4 4v2.3c0 .7-.2 1.3-.6 1.9L6 14.5h12l-1.4-2.3a3.5 3.5 0 01-.6-1.9V8a4 4 0 00-4-4z" fill="currentColor" />
      <path d="M10 18a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconTranslate({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 6h10M9 6c0 6-2.5 9.2-6 11M7 10c1.2 2.7 3.5 5 6.5 6.5M14 6h6M17 6v12M14.5 14h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconVideo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="6" width="12" height="12" rx="3" fill="currentColor" />
      <path d="M15 10l6-3v10l-6-3z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function IconPhone({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M7.5 4h3l1 4-2 1.5a15 15 0 005 5L16 13l4 1v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 7c0-1.1.9-2 2-2z" fill="currentColor" />
    </svg>
  );
}

function IconHistory({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 5v5h5M6.5 14a6 6 0 106.2-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 9v4l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFile({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 3v5h5M10 12h6M10 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFlag({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M6 20V4M7 5h8l-1.4 3L15 11H7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDocument({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill="currentColor" />
      <circle cx="18.5" cy="18.5" r="2.5" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function IconPlus({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconEdit({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5z" fill="currentColor" />
      <path d="M13.5 7l3.5 3.5" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

function PatientAvatar({ name }) {
  const avatarGradient = patientList.find((patient) => patient.name === name)?.avatar || 'from-[#ffb26b] to-[#e86f70]';
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <div
      className={`inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient} text-[0.82rem] font-bold tracking-[0.04em] text-white`}
    >
      {initials}
    </div>
  );
}

export default function DoctorDashboard() {
  const iconClass = 'h-[18px] w-[18px] shrink-0';
  const panelClass =
    'rounded-[22px] border border-[rgba(163,157,222,0.16)] bg-[rgba(255,255,255,0.9)] shadow-[0_18px_45px_rgba(80,66,170,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(80,66,170,0.14)]';

  return (
    <main className="grid min-h-screen text-[#20253d] lg:grid-cols-[228px_minmax(0,1fr)]">
      <DoctorSideBar />

      <section className="min-w-0">
        <header className="flex flex-col gap-4 border-b border-[rgba(134,132,188,0.16)] bg-[rgba(255,255,255,0.62)] px-4 py-4 backdrop-blur-[20px] sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:py-[0.85rem]">
          <label className="flex min-w-[220px] w-full max-w-[320px] items-center gap-3 rounded-full bg-[#f3f4fa] px-4 py-3.5 text-[#8e95ac]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] shrink-0">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search patients or records..."
              className="flex-1 border-0 bg-transparent text-[#373d54] outline-none placeholder:text-[#8e95ac]"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-3">
              <button
                className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e6e9f7] bg-white text-[#4d5a78] shadow-[0_10px_24px_rgba(96,110,160,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cfd6ff] hover:text-[#4039e6] hover:shadow-[0_16px_30px_rgba(76,72,255,0.18)]"
                type="button"
                aria-label="Notifications"
              >
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ff4d6d] ring-2 ring-white" />
                <IconBell className="h-[19px] w-[19px] shrink-0 transition duration-200 group-hover:scale-110" />
              </button>
              <button
                className="group relative flex h-11 min-w-[52px] items-center justify-center gap-1.5 rounded-2xl border border-[#e6e9f7] bg-gradient-to-br from-white to-[#f4f6ff] px-3 text-[#4d5a78] shadow-[0_10px_24px_rgba(96,110,160,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cfd6ff] hover:text-[#4039e6] hover:shadow-[0_16px_30px_rgba(76,72,255,0.18)]"
                type="button"
                aria-label="Translate"
              >
                <IconTranslate className="h-[18px] w-[18px] shrink-0 transition duration-200 group-hover:scale-110" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#6a72a0] transition duration-200 group-hover:text-[#4039e6]">
                  En
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3 border-l-0 pl-0 sm:border-l sm:border-[rgba(134,132,188,0.2)] sm:pl-4">
              <div>
                <strong className="block text-[0.96rem] font-semibold">Dr. Aarav Sharma</strong>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[#433cff]">Role: Doctor</span>
              </div>
              <div className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-[3px] border-[#4ed7cc] bg-gradient-to-br from-[#1b2132] to-[#2a3757] text-[0.82rem] font-bold tracking-[0.04em] text-white">
                AS
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 p-4 sm:p-7 xl:grid-cols-[282px_minmax(0,1fr)]">
          <section className={`${panelClass} order-2 self-start py-4 md:min-h-[384px] xl:order-1`}>
            <div className="flex items-start justify-between gap-4 px-4 pb-3">
              <p className="m-0 text-[0.72rem] uppercase tracking-[0.16em] text-[#878ea6]">Active Pregnancies</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-[#5b54ff] bg-gradient-to-br from-[#625bff] to-[#5141f8] px-3.5 py-2 text-sm text-white"
                >
                  All
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#dcdff0] bg-white px-3.5 py-2 text-sm text-[#67718d]"
                >
                  High Risk
                </button>
              </div>
            </div>

            <div className="grid gap-1.5">
              {patientList.map((patient) => (
                <article
                  key={patient.id}
                  className={`grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3.5 px-4 py-3.5 transition duration-200 hover:translate-x-1 hover:bg-[#f8f9ff] ${
                    patient.active
                      ? 'border-l-[3px] border-l-[#4f48ff] bg-[linear-gradient(90deg,rgba(88,81,255,0.07),rgba(88,81,255,0))]'
                      : 'border-l-[3px] border-l-transparent'
                  }`}
                >
                  <PatientAvatar name={patient.name} />
                  <div className="min-w-0">
                    <strong className="block truncate font-semibold">{patient.name}</strong>
                    <span className="text-[0.86rem] text-[#727a93]">
                      {patient.weeks} Weeks | ID: {patient.id}
                    </span>
                  </div>
                  {patient.active && <span className="h-2 w-2 rounded-full bg-[#d91f32]" />}
                </article>
              ))}
            </div>
          </section>

          <section className="order-1 grid gap-6 xl:order-2">
            <header className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] lg:items-center">
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PatientAvatar name="Sunita Rai" />
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h2 className="m-0 text-[1.1rem] font-semibold">Sunita Rai</h2>
                    <span className="inline-flex items-center justify-center rounded-full bg-[#f1f3fa] px-3 py-1.5 text-[0.74rem] font-semibold text-[#6d7691]">
                      28 Weeks Pregnant
                    </span>
                  </div>
                  <p className="m-0 text-[0.86rem] text-[#727a93]">Age: 26 | LMP: Aug 12, 2023 | EDD: May 19, 2024</p>
                </div>
                <span className="absolute -left-2 top-[calc(100%-0.3rem)] inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#ff5858] to-[#c91e2d] px-1.5 py-[0.15rem] text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-white sm:bottom-[-0.3rem] sm:top-auto">
                  High Risk
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:gap-4">
                <button className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-[#3e44d6]" type="button">
                  <IconPhone className={iconClass} />
                  <span>Emergency Contacts</span>
                </button>
                <button className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-[#5e667b]" type="button">
                  <IconHistory className={iconClass} />
                  <span>Full Medical History</span>
                </button>
              </div>

              <button
                className="inline-flex w-full items-center justify-center gap-3 rounded-[14px] bg-gradient-to-br from-[#5f58ff] to-[#4b3bf0] px-5 py-4 font-semibold text-white shadow-[0_18px_30px_rgba(77,60,241,0.24)] lg:w-auto"
                type="button"
              >
                <IconVideo className={iconClass} />
                <span>Start Consultation</span>
              </button>
            </header>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_160px]">
              <section className="rounded-[22px] border border-[rgba(241,170,169,0.32)] bg-[radial-gradient(circle_at_top_right,rgba(255,235,235,0.9),transparent_36%),rgba(255,255,255,0.92)] p-6 shadow-[0_18px_45px_rgba(80,66,170,0.08)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ef4f4f] to-[#cb1f26] text-white">
                      <IconDocument className={iconClass} />
                    </div>
                    <div>
                      <h3 className="m-0 text-[1.1rem] font-semibold">AI Risk Intelligence</h3>
                      <p className="m-0 text-[#727a93]">Real-time predictive analysis based on latest vitals</p>
                    </div>
                  </div>
                  <div className="text-left leading-none sm:text-right">
                    <strong className="block text-[2rem] text-[#d01a1d]">82</strong>
                    <span className="text-[1.1rem] text-[#9ca1b4]">/100</span>
                    <small className="mt-1.5 block text-[0.7rem] uppercase tracking-[0.14em] text-[#ef9d9d]">
                      Pre-eclampsia Risk
                    </small>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,150px)_minmax(0,1fr)]">
                  <div className="grid gap-4">
                    <article className="rounded-[18px] border border-[rgba(239,171,171,0.42)] bg-[rgba(255,255,255,0.88)] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(219,78,78,0.12)]">
                      <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[#878ea6]">Elevated BP</span>
                      <strong className="my-1 block text-[1.1rem] font-semibold">145/95 mmHg</strong>
                      <p className="m-0 text-[#727a93]">Sustained increase over 48 hours (+15% trend)</p>
                      <em className="mt-2 block text-[0.78rem] font-bold uppercase not-italic text-[#d0164d]">Critical</em>
                    </article>

                    <article className="rounded-[18px] border border-[rgba(239,171,171,0.42)] bg-[rgba(255,255,255,0.88)] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(219,78,78,0.12)]">
                      <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[#878ea6]">Low Hemoglobin</span>
                      <strong className="my-1 block text-[1.1rem] font-semibold">9.2 g/dL</strong>
                      <p className="m-0 text-[#727a93]">Below recommended threshold of 11.0 g/dL.</p>
                      <em className="mt-2 block text-[0.78rem] font-bold uppercase not-italic text-[#d0164d]">Monitor</em>
                    </article>
                  </div>

                  <div className="grid gap-4">
                    <article className="rounded-[18px] border border-[rgba(185,191,248,0.7)] bg-gradient-to-b from-[rgba(240,243,255,0.9)] to-[rgba(234,236,255,0.75)] p-4 text-[#2b2f77] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(88,93,214,0.14)]">
                      <p className="m-0 leading-8 text-[#2f2e74]">
                        AI suggests immediate Proteinuria screening and adjustment of Iron supplementation.
                        Predicted risk of preterm labor increased by 12%.
                      </p>
                    </article>

                    <button
                      className="inline-flex justify-start gap-3 self-start rounded-2xl bg-white px-4 py-3 text-[#242944] shadow-[0_10px_18px_rgba(93,85,210,0.12)]"
                      type="button"
                    >
                      <IconSparkle className="h-[18px] w-[18px] text-[#5247ff]" />
                      <span>Approve AI Prediction</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className={`${panelClass} flex flex-col justify-between p-4`}>
                <div className="flex items-center justify-between text-[#5d59ff]">
                  <IconFlag className={iconClass} />
                  <span className="inline-flex items-center justify-center rounded-full bg-[#ebf9ec] px-3 py-1.5 text-[0.74rem] font-semibold uppercase text-[#16a34a]">
                    Healthy
                  </span>
                </div>
                <div className="mt-auto flex items-baseline gap-1.5">
                  <strong className="block text-5xl font-semibold leading-none">142</strong>
                  <span className="text-[#9aa0b6]">bpm</span>
                </div>
                <p className="m-0 text-[0.8rem] uppercase tracking-[0.16em] text-[#727a93]">Fetal Heart Rate</p>
                <div className="flex h-16 items-end gap-[0.3rem]" aria-hidden="true">
                  <span className="flex-1 rounded-t-[3px] bg-[#d7dcff]" style={{ height: '22px' }} />
                  <span className="flex-1 rounded-t-[3px] bg-[#d7dcff]" style={{ height: '32px' }} />
                  <span className="flex-1 rounded-t-[3px] bg-[#8e98ff]" style={{ height: '28px' }} />
                  <span className="flex-1 rounded-t-[3px] bg-[#5a56ff]" style={{ height: '38px' }} />
                  <span className="flex-1 rounded-t-[3px] bg-[#d7dcff]" style={{ height: '36px' }} />
                  <span className="flex-1 rounded-t-[3px] bg-[#d7dcff]" style={{ height: '22px' }} />
                </div>
              </section>
            </div>

            <section className={`${panelClass} p-6`}>
              <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="m-0 text-[1.1rem] font-semibold">Longitudinal Health Trends</h3>
                  <p className="m-0 text-[#727a93]">Correlation of BP vs Hemoglobin over the last 8 weeks</p>
                </div>
                <div className="flex flex-wrap items-center gap-[1.15rem] text-[0.85rem] text-[#3f4561]">
                  <span className="inline-flex items-center gap-2">
                    <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#3030ff]" />
                    BP (Systolic)
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#d0177c]" />
                    Hemoglobin
                  </span>
                </div>
              </div>

              <div className="grid gap-3">
                <svg viewBox="0 0 700 260" preserveAspectRatio="none" aria-hidden="true" className="h-[220px] w-full sm:h-[290px]">
                  <defs>
                    <linearGradient id="doctorChartFade" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4c4cff" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#4c4cff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="200" x2="660" y2="200" stroke="#ebe7f8" strokeWidth="1.5" />
                  <line x1="40" y1="145" x2="660" y2="145" stroke="#f0ecfa" strokeWidth="1.5" />
                  <line x1="40" y1="90" x2="660" y2="90" stroke="#f0ecfa" strokeWidth="1.5" />
                  <path d="M40 160 C140 160, 180 154, 260 142 S430 116, 660 100" fill="none" stroke="#3030ff" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M40 88 C150 92, 240 104, 320 120 S500 156, 660 170" fill="none" stroke="#d0177c" strokeWidth="3.2" strokeLinecap="round" />
                  <circle cx="580" cy="106" r="5.5" fill="#3030ff" stroke="#fff" strokeWidth="2" />
                  <circle cx="580" cy="164" r="5.5" fill="#d0177c" stroke="#fff" strokeWidth="2" />
                  <path d="M40 160 C140 160, 180 154, 260 142 S430 116, 660 100 L660 220 L40 220 Z" fill="url(#doctorChartFade)" />
                </svg>
                <div className="flex justify-between gap-2 text-[0.72rem] text-[#8a90a7] sm:text-[0.84rem]">
                  <span>Week 20</span>
                  <span>Week 22</span>
                  <span>Week 24</span>
                  <span>Week 26</span>
                  <span className="font-semibold text-[#2f32ff]">Current (Week 28)</span>
                </div>
              </div>
            </section>

            <section className={`${panelClass} p-6`}>
              <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <IconFile className="h-[18px] w-[18px] text-[#3e3dff]" />
                  <h3 className="m-0 text-[1.1rem] font-semibold">Clinical Progress Notes</h3>
                </div>
                <button className="inline-flex items-center gap-3 bg-transparent p-0 text-[#3235ff]" type="button">
                  <IconPlus className="h-[18px] w-[18px] text-[#3e3dff]" />
                  <span>Add New Note</span>
                </button>
              </div>

              <div className="grid gap-4">
                {notes.map((note) => (
                  <article key={note.title} className="relative rounded-[18px] bg-[#fafbfe] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(89,97,130,0.12)]">
                    <div className="mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-[#878ea6]">{note.time}</div>
                    <button
                      className="absolute right-4 top-4 border-0 bg-transparent p-0 text-[#c0c6d9]"
                      type="button"
                      aria-label={`Edit ${note.title}`}
                    >
                      <IconEdit className={iconClass} />
                    </button>
                    <h4 className="mb-2 mr-8 mt-0 text-[1.02rem] font-semibold">{note.title}</h4>
                    <p className="m-0 leading-7 text-[#727a93]">{note.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}