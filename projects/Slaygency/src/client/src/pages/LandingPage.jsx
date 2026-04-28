import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeartPulse } from 'lucide-react';
import patientImg from '../assets/images/patient.png';
import doctorImg from '../assets/images/doctor.png';
import adminImg from '../assets/images/adminstrator.png';

export default function LandingPage() {
  const { i18n, t } = useTranslation();
  const isNe = i18n.language?.startsWith('ne');
  const tx = (en, ne) => (isNe ? ne : en);

  const featureCards = isNe
    ? [
        {
          title: 'बिरामी यात्रा ट्र्याकिङ',
          description: 'लक्षण, जीवनचिन्ह र जाँच इतिहास एउटै प्रवाहमा राखेर छिटो फलोअप गर्न सहयोग गर्छ।',
          image: patientImg,
        },
        {
          title: 'क्लिनिकल जोखिम अनुगमन',
          description: 'संरचित र अपडेट हुने सूचकहरूको आधारमा उच्च जोखिम केस छिटो चिन्हित गर्न सहयोग गर्छ।',
          image: doctorImg,
        },
        {
          title: 'कार्यक्रम निरीक्षण',
          description: 'प्रशासनिक टोलीलाई कभरेज, सक्रियता र गुणस्तर प्रवृत्ति हेर्न सजिलो बनाउँछ।',
          image: adminImg,
        },
      ]
    : [
        {
          title: 'Patient Journey Tracking',
          description: 'Capture symptoms, vitals, and checkup history in one clear flow for faster follow-up.',
          image: patientImg,
        },
        {
          title: 'Clinical Risk Monitoring',
          description: 'Help doctors spot high-risk cases earlier with structured, continuously updated indicators.',
          image: doctorImg,
        },
        {
          title: 'Program Oversight',
          description: 'Enable admin teams to monitor coverage, activity, and quality trends across facilities.',
          image: adminImg,
        },
      ];

  const metricCards = isNe
    ? [
        { label: 'प्रारम्भिक अलर्ट कभरेज', value: '82%' },
        { label: 'क्लिनिकल प्रयोगकर्ता', value: '2,000+' },
        { label: 'जिल्ला पहुँच', value: '14' },
      ]
    : [
        { label: 'Early Alert Coverage', value: '82%' },
        { label: 'Clinical Users', value: '2,000+' },
        { label: 'District Reach', value: '14' },
      ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-200">
              <HeartPulse className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-tight text-slate-800">{t('app_name')}</span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider">Maternal Health Platform</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#overview" className="hover:text-[#3730a3]">{tx('Overview', 'अवलोकन')}</a>
            <a href="#impact" className="hover:text-[#3730a3]">{tx('Impact', 'प्रभाव')}</a>
            <Link to="/about" className="hover:text-[#3730a3]">{tx('About Us', 'हाम्रो बारेमा')}</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#3730a3] hover:text-indigo-900">
              {tx('Login', 'लगइन')}
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#3730a3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-900"
            >
              {tx('Register', 'दर्ता')}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8">
          <div>
            <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#3730a3]">
              {tx('Maternal Health Intelligence', 'मातृ स्वास्थ्य सूचक प्रणाली')}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-700 md:text-5xl">
              {tx('Clean workflows for mothers, doctors, and care administrators.', 'आमा, डाक्टर र प्रशासकका लागि स्पष्ट र सहज कार्यप्रवाह।')}
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-500">
              {tx(
                'MaterNova centralizes maternal health data, risk scoring, and response coordination so care teams can move with clarity.',
                'मेटरनोभाले मातृ स्वास्थ्य डेटा, जोखिम स्कोर र समन्वयलाई एउटै ठाउँमा ल्याएर उपचार टोलीलाई छिटो निर्णय गर्न सहयोग गर्छ।'
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-xl bg-[#3730a3] px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-900"
              >
                {tx('Create account', 'खाता बनाउनुहोस्')}
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:border-indigo-200 hover:text-[#3730a3]"
              >
                {tx('Learn about us', 'हाम्रो बारेमा जान्नुहोस्')}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">{tx('Platform Highlights', 'प्लेटफर्मका मुख्य बुँदा')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metricCards.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-semibold text-[#3730a3]">{metric.value}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-medium text-indigo-900">
                {tx(
                  'Role-based dashboards keep each user focused on the information they need, right when they need it.',
                  'भूमिका अनुसारको ड्यासबोर्डले प्रत्येक प्रयोगकर्तालाई आवश्यक जानकारी सही समयमा देखाउँछ।'
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
            <h2 className="text-3xl font-semibold text-slate-700">{tx('Built For The Full Care Team', 'पूरा उपचार टोलीका लागि बनाइएको')}</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium text-slate-500">
              {tx(
                'Every interface is tuned for practical decisions and consistent handoffs across teams.',
                'प्रत्येक इन्टरफेस व्यावहारिक निर्णय र टोलीबीचको सहज समन्वयका लागि तयार गरिएको छ।'
              )}
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
                <p className="text-xs font-semibold tracking-wide text-indigo-200">{metric.label}</p>
                <p className="mt-2 text-4xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="m-0">© {new Date().getFullYear()} {t('app_name')}</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-slate-500 no-underline hover:text-indigo-700">About</Link>
            <Link to="/login" className="text-slate-500 no-underline hover:text-indigo-700">Login</Link>
            <Link to="/register" className="text-slate-500 no-underline hover:text-indigo-700">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
