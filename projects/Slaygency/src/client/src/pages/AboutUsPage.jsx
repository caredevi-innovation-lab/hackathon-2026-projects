import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeartPulse } from 'lucide-react';
import { FaUserMd, FaUsers, FaShieldAlt, FaHeartbeat } from 'react-icons/fa';

const contributors = [
  { name: 'Kushal JK', role: 'Project Lead & Full Stack' },
  { name: 'Samana Upreti', role: 'Frontend & UX' },
  { name: 'Pranisha Karki', role: 'Data & Integration' },
  { name: 'Dinisha Parajuli', role: 'Testing & Quality' },
];

export default function AboutUsPage() {
  const { i18n, t } = useTranslation();
  const isNe = i18n.language?.startsWith('ne');
  const tx = (en, ne) => (isNe ? ne : en);

  const values = [
    {
      title: tx('Clinical Clarity', 'क्लिनिकल स्पष्टता'),
      detail: tx(
        'We surface maternal risk data clearly so care teams can decide faster and safer.',
        'हामी मातृ जोखिम डेटा स्पष्ट रूपमा देखाउँछौं ताकि उपचार टोलीले छिटो र सुरक्षित निर्णय लिन सकोस्।'
      ),
      icon: <FaUserMd className="h-4 w-4" />,
    },
    {
      title: tx('Field Practicality', 'क्षेत्रीय व्यवहारिकता'),
      detail: tx(
        'Workflows are built for real clinic and hospital operations, not just demos.',
        'कार्यप्रवाह वास्तविक क्लिनिक र अस्पताल सञ्चालनलाई ध्यानमा राखेर बनाइएका छन्।'
      ),
      icon: <FaUsers className="h-4 w-4" />,
    },
    {
      title: tx('Responsible Access', 'जिम्मेवार पहुँच'),
      detail: tx(
        'Role-based access keeps sensitive data visible only to the right people.',
        'भूमिका-आधारित पहुँचले संवेदनशील डेटा सही व्यक्तिसम्म मात्र पुग्ने बनाउँछ।'
      ),
      icon: <FaShieldAlt className="h-4 w-4" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-200">
              <HeartPulse className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-tight text-slate-800">{t('app_name')}</span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider">Maternal Health Platform</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#3730a3] hover:text-indigo-900">
              {tx('Login', 'लगइन')}
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#3730a3] px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-900"
            >
              {tx('Register', 'दर्ता')}
            </Link>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#3730a3]">
            {tx('About', 'बारेमा')} {t('app_name')}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-700">
            {tx(
              'A maternal health platform focused on timely action, clean handoffs, and safer outcomes.',
              'समयमै कदम चाल्ने, समन्वय सुधार्ने र सुरक्षित परिणाम दिने मातृ स्वास्थ्य प्लेटफर्म।'
            )}
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-500">
            {tx(
              'We built MaterNova to reduce delay between risk detection and care response with practical, role-focused tools.',
              'हामीले MaterNova जोखिम पहिचान र उपचार प्रतिक्रियाबीचको ढिलाइ घटाउन व्यवहारिक र भूमिका-केन्द्रित उपकरणसहित बनाएका छौं।'
            )}
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                {value.icon}
              </div>
              <h2 className="text-lg font-semibold text-slate-700">{value.title}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{value.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 md:p-10">
          <div className="mb-5 flex items-center gap-2 text-indigo-700">
            <FaHeartbeat className="h-4 w-4" />
            <h2 className="m-0 text-2xl font-semibold text-slate-700">
              {tx('Team Contributions', 'टोली योगदान')}
            </h2>
          </div>
          <p className="mb-5 text-sm font-medium text-slate-500">
            {tx(
              'This project is built collaboratively by:',
              'यो प्रोजेक्ट निम्न सदस्यहरूको सहकार्यबाट तयार गरिएको हो:'
            )}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {contributors.map((member) => (
              <article key={member.name} className="rounded-xl border border-indigo-100 bg-white px-4 py-4">
                <p className="m-0 text-base font-semibold text-slate-800">{member.name}</p>
                <p className="m-0 mt-1 text-sm text-slate-500">
                  {isNe ? 'योगदानकर्ता' : member.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p className="m-0">© {new Date().getFullYear()} {t('app_name')}</p>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-500 no-underline hover:text-indigo-700">Home</Link>
              <Link to="/login" className="text-slate-500 no-underline hover:text-indigo-700">Login</Link>
              <Link to="/register" className="text-slate-500 no-underline hover:text-indigo-700">Register</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
