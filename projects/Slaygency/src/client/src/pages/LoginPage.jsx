import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { loginUser } from '../api.js';

function getRedirectPath(role) {
  if (role === 'Admin' || role === 'admin') {
    return '/admin/dashboard';
  }
  if (role === 'Doctor' || role === 'doctor') {
    return '/doctor';
  }
  return '/patient';
}

function getRedirectPath(role) {
  switch (role) {
    case 'Admin':
      return '/admin/dashboard';
    case 'Doctor':
      return '/doctor';
    case 'Patient':
    default:
      return '/patient-health-data-entry';
  }
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      setIsSubmitting(true);
      const data = await loginUser({ email, password });
      login(data);
      navigate(getRedirectPath(data?.user?.role), { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Unable to sign in. Please verify your email and password.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-[#3730a3]">
            MaterNova
          </Link>
          <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-[#3730a3]">
            About Us
          </Link>
        </div>

        <section className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">
          <aside className="bg-gradient-to-br from-indigo-50 to-white p-8 md:p-10">
            <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#3730a3]">
              Secure Sign In
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-700">
              Welcome back to your maternal care workspace.
            </h1>
            <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
              Continue to monitor patient updates, review alerts, and keep follow-ups on schedule.
            </p>
          </aside>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-slate-700">Login</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Use your registered account to access role-based dashboards.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-600">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              {errorMessage && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#3730a3] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-[#3730a3] hover:text-indigo-900">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
