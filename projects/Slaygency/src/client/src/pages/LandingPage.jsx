import { Link } from 'react-router-dom';
import patientImg from '../assets/images/patient.png';
import doctorImg from '../assets/images/doctor.png';
import adminImg from '../assets/images/adminstrator.png';

const featureCards = [
  {
    title: 'Patient Journey Tracking',
    description:
      'Capture symptoms, vitals, and checkup history in one clear flow for faster follow-up.',
    image: patientImg,
  },
  {
    title: 'Clinical Risk Monitoring',
    description:
      'Help doctors spot high-risk cases earlier with structured, continuously updated indicators.',
    image: doctorImg,
  },
  {
    title: 'Program Oversight',
    description:
      'Enable admin teams to monitor coverage, activity, and quality trends across facilities.',
    image: adminImg,
  },
];

const metricCards = [
  { label: 'Early Alert Coverage', value: '82%' },
  { label: 'Clinical Users', value: '2,000+' },
  { label: 'District Reach', value: '14' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[#3730a3]">
            MaterNova
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#overview" className="hover:text-[#3730a3]">
              Overview
            </a>
            <a href="#impact" className="hover:text-[#3730a3]">
              Impact
            </a>
            <Link to="/about" className="hover:text-[#3730a3]">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#3730a3] hover:text-indigo-900">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#3730a3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-900"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8">
          <div>
            <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold  tracking-wide text-[#3730a3]">
              Maternal Health Intelligence
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-700 md:text-5xl">
              Clean workflows for mothers, doctors, and care administrators.
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-500">
              MaterNova centralizes maternal health data, risk scoring, and response coordination so
              care teams can move with clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-xl bg-[#3730a3] px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-900"
              >
                Create account
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:border-indigo-200 hover:text-[#3730a3]"
              >
                Learn about us
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">Platform Highlights</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metricCards.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-semibold text-[#3730a3]">{metric.value}</p>
                  <p className="mt-1 text-xs font-semibold  tracking-wide text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-medium text-indigo-900">
                Role-based dashboards keep each user focused on the information they need, right when
                they need it.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
            <h2 className="text-3xl font-semibold text-slate-700">Built For The Full Care Team</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium text-slate-500">
              Every interface is tuned for practical decisions and consistent handoffs across teams.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {featureCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-700">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{item.description}</p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mt-4 aspect-video w-full rounded-xl border border-slate-200 object-cover"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="impact" className="bg-[#3730a3]">
          <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-14 md:grid-cols-3 md:px-8">
            {metricCards.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-indigo-300/40 bg-indigo-700/20 p-6">
                <p className="text-xs font-semibold  tracking-wide text-indigo-200">{metric.label}</p>
                <p className="mt-2 text-4xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

