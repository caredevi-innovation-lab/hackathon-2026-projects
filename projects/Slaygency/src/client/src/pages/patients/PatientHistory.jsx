import SideBar from '../../components/SideBar.jsx';

const timelineEntries = [
  {
    type: 'CRITICAL ALERT',
    title: 'Sudden BP Elevation Detected',
    time: 'Oct 24, 2023 - 02:15 PM',
    details:
      'Systolic BP reached 155 mmHg during remote monitoring. Patient notified to visit clinical center immediately. Pre-eclampsia screening initiated.',
    tags: ['TELEMONITORING', 'BP_WATCH'],
    tone: 'critical',
  },
  {
    type: 'ROUTINE CHECKUP',
    title: 'Weekly Prenatal Visit',
    time: 'Oct 18, 2023 - 10:00 AM',
    details:
      'Fetal heartbeat stable at 142 bpm. Fundal height tracking correctly for 31 weeks. Recommended iron supplement adjustment.',
    quote: 'Patient reports mild edema in lower extremities during late evenings. - Dr. Akwren K.',
    tone: 'routine',
  },
  {
    type: 'LAB RESULTS',
    title: 'Hemoglobin & Glucose Screening',
    time: 'Oct 12, 2023 - 09:30 AM',
    details:
      'Hb levels at 11.2 g/dL (slightly low). Blood glucose levels within normal fasting range. Recommended increased leafy green intake.',
    linkLabel: 'View Full Report (PDF)',
    tone: 'lab',
  },
];

const vitalsRows = [
  {
    metric: 'BP (mmHg)',
    w29: '118/76',
    w30: '120/80',
    w31: '124/82',
    w32: '155/95',
    critical: true,
  },
  { metric: 'Weight (kg)', w29: '62.4', w30: '63.1', w31: '63.8', w32: '64.6' },
  { metric: 'Heart Rate', w29: '78', w30: '82', w31: '80', w32: '88' },
  { metric: 'Fundal (cm)', w29: '29', w30: '30', w31: '31', w32: '32' },
];

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M12 4a4 4 0 00-4 4v2.3c0 .7-.2 1.3-.6 1.9L6 14.5h12l-1.4-2.3a3.5 3.5 0 01-.6-1.9V8a4 4 0 00-4-4z"
        fill="currentColor"
      />
      <path d="M10 18a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function PatientHistory() {
  return (
    <main className="grid min-h-screen bg-[linear-gradient(180deg,#f9f8ff_0%,#f4f3ff_100%)] text-[#1f2538] lg:grid-cols-[220px_minmax(0,1fr)]">
      <SideBar />

      <section className="min-w-0 p-3 sm:p-5">
        <header className="mb-4 grid gap-3 rounded-2xl border border-[rgba(168,166,206,0.24)] bg-[rgba(255,255,255,0.9)] p-3 shadow-[0_14px_35px_rgba(78,67,170,0.08)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <label className="flex items-center gap-2 rounded-xl bg-[#f3f4fa] px-3 py-2 text-[#8f97ae]">
            <IconSearch />
            <input
              type="text"
              placeholder="Search patient ID, name, or records..."
              className="w-full border-0 bg-transparent text-sm text-[#3b4358] outline-none placeholder:text-[#97a0b6]"
            />
          </label>
          <div className="flex items-center justify-end gap-3">
            <a href="#" className="text-sm text-[#68718c] no-underline hover:text-[#4048df]">
              Dashboard
            </a>
            <a href="#" className="text-sm font-semibold text-[#4048df] no-underline">
              Patients
            </a>
            <a href="#" className="text-sm text-[#68718c] no-underline hover:text-[#4048df]">
              Resources
            </a>
            <span className="ml-2 rounded-full bg-[#eef0ff] px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#545ce6]">
              Role: Doctor
            </span>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4fa] text-[#5e6782]"
            >
              <IconBell />
            </button>
          </div>
        </header>

        <section className="rounded-2xl border border-[rgba(168,166,206,0.24)] bg-[rgba(255,255,255,0.9)] p-4 shadow-[0_14px_35px_rgba(78,67,170,0.08)]">
          <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4bd8d0] to-[#3f74dc] text-sm font-semibold text-white">
                SS
              </div>
              <div>
                <h2 className="m-0 text-3xl font-semibold leading-none">Sunita Sharma</h2>
                <p className="m-0 mt-1 text-sm text-[#78819a]">
                  Patient ID: #MC-2940 â€¢ 28 Years â€¢ 32 Weeks Gestation
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-[#d6d9ea] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#666f89]"
              >
                Export Report
              </button>
              <button
                type="button"
                className="rounded-xl border border-[#5b55ff] bg-gradient-to-br from-[#635dff] to-[#5142f7] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white"
              >
                Add New Entry
              </button>
            </div>
          </header>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section className="rounded-2xl border border-[rgba(168,166,206,0.22)] bg-white p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="m-0 text-xl font-semibold text-[#4a4fb9]">Interaction Timeline</h3>
                <button
                  type="button"
                  className="rounded-md border border-[#e5e7f2] bg-white px-2 py-1 text-xs text-[#7b839c]"
                >
                  â–¼
                </button>
              </div>

              <div className="space-y-3">
                {timelineEntries.map((entry) => (
                  <article key={entry.title} className="rounded-xl border border-[#eceef7] p-3">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <div>
                        <p
                          className={`m-0 text-xs font-semibold tracking-[0.08em] ${
                            entry.tone === 'critical'
                              ? 'text-[#d72334]'
                              : entry.tone === 'routine'
                                ? 'text-[#6361df]'
                                : 'text-[#d66b87]'
                          }`}
                        >
                          {entry.type}
                        </p>
                        <h4 className="m-0 mt-1 text-base font-semibold">{entry.title}</h4>
                      </div>
                      <p className="m-0 text-xs text-[#9ba2b7]">{entry.time}</p>
                    </div>
                    <p className="m-0 text-sm text-[#6f7891]">{entry.details}</p>

                    {entry.tags && (
                      <div className="mt-2 flex gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-[#f1f2f9] px-2 py-1 text-[0.63rem] font-semibold text-[#8188a0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.quote && (
                      <blockquote className="m-0 mt-2 border-l-2 border-[#6570ff] pl-2 text-xs italic text-[#6f7891]">
                        {entry.quote}
                      </blockquote>
                    )}

                    {entry.linkLabel && (
                      <button
                        type="button"
                        className="mt-2 border-0 bg-transparent p-0 text-xs font-semibold text-[#5a62e8]"
                      >
                        {entry.linkLabel}
                      </button>
                    )}
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="mt-3 w-full rounded-xl border border-[#e6e8f4] bg-[#f9faff] py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8b92aa]"
              >
                Load Previous Interactions
              </button>
            </section>

            <aside className="grid gap-4">
              <section className="rounded-2xl border border-[rgba(168,166,206,0.22)] bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="m-0 text-xl font-semibold text-[#4a4fb9]">Vitals Tracking</h3>
                  <span className="rounded bg-[#f2f4ff] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#7f87a3]">
                    Last 4 Weeks
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#eceef7]">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#f7f8ff] text-[#7c839d]">
                      <tr>
                        <th className="px-2 py-2 font-semibold">Metric</th>
                        <th className="px-2 py-2 font-semibold">Wk 29</th>
                        <th className="px-2 py-2 font-semibold">Wk 30</th>
                        <th className="px-2 py-2 font-semibold">Wk 31</th>
                        <th className="px-2 py-2 font-semibold">Wk 32</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitalsRows.map((row) => (
                        <tr key={row.metric} className="border-t border-[#eceef7]">
                          <td className="px-2 py-2 font-semibold text-[#5f6781]">{row.metric}</td>
                          <td className="px-2 py-2 text-[#707895]">{row.w29}</td>
                          <td className="px-2 py-2 text-[#707895]">{row.w30}</td>
                          <td className="px-2 py-2 text-[#707895]">{row.w31}</td>
                          <td
                            className={`px-2 py-2 ${row.critical ? 'font-semibold text-[#d22230]' : 'text-[#707895]'}`}
                          >
                            {row.w32}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  className="mt-2 w-full border-0 bg-transparent py-1 text-xs font-semibold text-[#5a62e8]"
                >
                  View Detailed Analytics
                </button>
              </section>

              <section className="rounded-2xl border border-[rgba(168,166,206,0.22)] bg-white p-3">
                <h4 className="m-0 text-sm font-semibold uppercase tracking-[0.08em] text-[#878ea6]">
                  History Tools
                </h4>
                <input
                  type="text"
                  placeholder="Filter by date range..."
                  className="mt-2 w-full rounded-lg border border-[#e1e4f1] px-3 py-2 text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Search by keyword (eg. edema)..."
                  className="mt-2 w-full rounded-lg border border-[#e1e4f1] px-3 py-2 text-sm outline-none"
                />
              </section>

              <section className="rounded-2xl border border-[#5d55ff] bg-gradient-to-br from-[#615aff] to-[#4739ea] p-4 text-white shadow-[0_16px_30px_rgba(80,62,232,0.35)]">
                <p className="m-0 text-xs uppercase tracking-[0.1em] text-[#d6d4ff]">
                  Active Risk Level
                </p>
                <h4 className="m-0 mt-1 text-3xl font-semibold leading-none">High Risk</h4>
                <p className="m-0 mt-1 text-sm text-[#ddd9ff]">Requires immediate attention</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-lg border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.12)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white"
                >
                  Schedule Emergency Visit
                </button>
              </section>
            </aside>
          </div>
        </section>
      </section>
    </main>
  );
}
