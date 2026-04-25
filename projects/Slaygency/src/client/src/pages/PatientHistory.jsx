import Sidebar from '../components/Sidebar.jsx';

const foodPlan = [
  {
    title: 'Green Leafy Vegetables',
    text: 'Spinach, fenugreek, nettle, and mustard greens daily.'
  },
  {
    title: 'Pulses and Legumes',
    text: 'Dal, chickpeas, and beans provide plant-based iron.'
  },
  {
    title: 'Vitamin C Pairings',
    text: 'Eat oranges or lemon with meals to increase iron absorption.'
  }
];

const activityPlan = [
  {
    title: 'Recommended: Light Walking',
    text: '20 to 30 minutes of gentle walking in the morning or evening.',
    status: 'safe'
  },
  {
    title: 'Rest Priorities',
    text: 'Avoid heavy lifting and prolonged standing over one hour.',
    status: 'alert'
  }
];

const warningSigns = [
  { title: 'Severe Headache', text: 'Not relieved by rest.' },
  { title: 'Vaginal Bleeding', text: 'Any amount of blood loss.' },
  { title: 'Vision Changes', text: 'Blurred or flashing lights.' },
  { title: 'Severe Pain', text: 'Sharp pain in abdomen or chest.' }
];

const resources = [
  {
    name: 'Paropakar Maternity Hospital',
    details: 'Thapathali, Kathmandu',
    action: 'CALL NOW'
  },
  {
    name: 'Maternal Health Helpline',
    details: 'Available 24x7',
    action: '1660 780 78'
  },
  {
    name: 'Ward Health Clinic',
    details: 'Nearest municipality unit',
    action: 'VIEW MAP'
  }
];

export default function PatientHistory() {
  return (
    <section className="min-h-[calc(100vh-58px)] bg-[linear-gradient(145deg,#eef0fb_0%,#f5f6fb_45%,#ffffff_100%)] p-6 text-[#23233d]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-5 lg:grid-cols-[232px_1fr]">
        <Sidebar />

        <main className="order-1 rounded-[22px] border border-[#ececf3] bg-[#f8f8fd] p-5 shadow-[0_18px_45px_rgba(34,43,78,0.06)] lg:order-2">
          <div className="mb-4 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <input
              className="w-full rounded-full border border-[#e1e4f0] bg-white px-4 py-2.5 text-sm md:max-w-[430px]"
              type="text"
              placeholder="Search Patients or Resources..."
              aria-label="Search"
            />
            <span className="whitespace-nowrap text-sm font-bold text-[#57608e]">Dr. Sunita Sharma</span>
          </div>

          <header className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="m-0 text-[clamp(1.05rem,2vw,1.42rem)] font-bold">Personalized Health Care Plan</h1>
              <p className="mt-1 text-[0.84rem] text-[#66719f]">
                Based on the latest check-up for Maya Devi (28 weeks pregnant).
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="rounded-full border border-[#dfe4f8] bg-white px-4 py-2 text-xs font-bold text-[#4f5889]"
                type="button"
              >
                Print Advice
              </button>
              <button className="rounded-full bg-[#4a44dc] px-4 py-2 text-xs font-bold text-white" type="button">
                Share with Patient
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
            <article className="rounded-[15px] border border-[#eceef7] bg-white p-4">
              <span className="inline-flex rounded-full bg-[#ffe6f0] px-2.5 py-1 text-[0.69rem] font-bold text-[#d04169]">
                Risk Status: Mild Anemia
              </span>
              <h3 className="mb-1 mt-2.5 text-[0.95rem] font-semibold">Current Assessment</h3>
              <p className="text-[0.8rem] text-[#6a73a3]">
                Hemoglobin levels are low and nutritional intervention is recommended
                to support maternal energy and fetal development.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f6f7ff] px-3 py-2 text-[0.76rem] text-[#5f6998]">
                  Hemoglobin
                  <strong className="mt-0.5 block text-[0.9rem] text-[#23233d]">10.2 g/dL</strong>
                </div>
                <div className="rounded-xl bg-[#f6f7ff] px-3 py-2 text-[0.76rem] text-[#5f6998]">
                  Blood Pressure
                  <strong className="mt-0.5 block text-[0.9rem] text-[#23233d]">110/75</strong>
                </div>
              </div>
            </article>

            <article className="grid gap-2 rounded-[15px] bg-[linear-gradient(155deg,#514ad8_0%,#6558e7_100%)] p-4 text-white">
              <h4 className="m-0 text-[0.9rem] font-semibold">Next Milestone</h4>
              <p className="m-0 text-xs opacity-90">Week 30 screening</p>
              <p className="m-0 text-xs opacity-90">Scheduled for 18th Oct, 2026</p>
              <div className="h-[7px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.23)]" aria-hidden="true">
                <span className="block h-full w-[76%] rounded-full bg-white" />
              </div>
              <div className="text-[0.72rem] opacity-90">76% toward trimester goal</div>
            </article>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <article className="rounded-[15px] border border-[#eceef7] bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="m-0 text-[0.88rem] font-semibold">Nutrition and Dietary Focus</h4>
                <span className="text-[0.67rem] font-bold text-[#7a82ad]">ANEMIA CONTROL</span>
              </div>

              <div className="grid gap-2">
                {foodPlan.map((item) => (
                  <div className="rounded-[11px] border border-[#edf0fc] bg-[#f7f8ff] px-3 py-2.5" key={item.title}>
                    <strong className="mb-0.5 block text-[0.79rem]">{item.title}</strong>
                    <p className="m-0 text-[0.73rem] text-[#66709c]">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[15px] border border-[#eceef7] bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="m-0 text-[0.88rem] font-semibold">Safe Physical Activity</h4>
                <span className="text-[0.67rem] font-bold text-[#7a82ad]">DAILY</span>
              </div>

              <div className="grid gap-2">
                {activityPlan.map((item) => (
                  <div
                    className={`rounded-[11px] border border-[#edf0fc] bg-[#f7f8ff] px-3 py-2.5 ${
                      item.status === 'alert' ? 'border-l-[3px] border-l-[#f45858]' : 'border-l-[3px] border-l-[#4f6bfb]'
                    }`}
                    key={item.title}
                  >
                    <strong className="mb-0.5 block text-[0.79rem]">{item.title}</strong>
                    <p className="m-0 text-[0.73rem] text-[#66709c]">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="mt-4 rounded-[15px] bg-[linear-gradient(155deg,#b10d1f_0%,#99081a_100%)] p-4 text-white">
            <h4 className="m-0 text-[0.98rem] font-semibold">EMERGENCY WARNING SIGNS</h4>
            <p className="mb-3 mt-1 text-[0.73rem] opacity-90">
              Seek immediate medical attention if you experience these symptoms.
            </p>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              {warningSigns.map((item) => (
                <div
                  className="rounded-[10px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.12)] p-2.5"
                  key={item.title}
                >
                  <strong className="block text-[0.78rem]">{item.title}</strong>
                  <small className="mt-1 block text-[0.68rem] opacity-90">{item.text}</small>
                </div>
              ))}
            </div>
          </article>

          <section className="mt-4" aria-label="Local health resources">
            <h5 className="mb-2 text-[0.83rem] font-semibold text-[#5b648f]">Local Health Resources (Nepal)</h5>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {resources.map((item) => (
                <article className="rounded-[15px] border border-[#eceef7] bg-white p-3" key={item.name}>
                  <strong className="block text-[0.79rem]">{item.name}</strong>
                  <p className="my-1 text-[0.73rem] text-[#6b76a5]">{item.details}</p>
                  <a className="text-[0.72rem] font-bold text-[#3450e6] no-underline" href="#">
                    {item.action}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <footer className="mt-3 flex flex-wrap justify-between gap-2 rounded-[15px] border border-[#eceef7] bg-white px-3 py-2 text-[0.69rem] text-[#7e86af]">
            <span>Clinically reviewed by Ministry of Health, Nepal.</span>
            <span>Last updated: Apr 25, 2026.</span>
            <span>Privacy Policy | Contact Support</span>
          </footer>
        </main>
      </div>
    </section>
  );
}
