import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Clinical Clarity',
    detail:
      'We present maternal risk information in a format that supports faster and safer care decisions.',
  },
  {
    title: 'Field Practicality',
    detail:
      'Our workflows are designed for real operations in clinics, wards, and community follow-up contexts.',
  },
  {
    title: 'Responsible Access',
    detail:
      'Role-based access ensures the right data reaches the right person with minimal friction.',
  },
];

const roadmap = [
  'Expand real-time care coordination between frontline workers and doctors.',
  'Improve alert quality with stronger risk model feedback loops.',
  'Support more district programs with localized reporting views.',
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-[#3730a3]">
            MaterNova
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#3730a3] hover:text-indigo-900">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#3730a3] px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-900"
            >
              Register
            </Link>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#3730a3]">
            About MaterNova
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-700">
            A maternal health platform focused on timely action, cleaner handoffs, and safer outcomes.
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-500">
            MaterNova was built to reduce delay between risk detection and care response. We combine
            structured health input, role-based visibility, and practical dashboards so teams can
            respond with confidence.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-700">{value.title}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{value.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-slate-700">What We Are Building Next</h2>
          <ul className="mt-4 space-y-3 text-sm font-medium text-slate-600">
            {roadmap.map((item) => (
              <li key={item} className="rounded-lg border border-indigo-100 bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
