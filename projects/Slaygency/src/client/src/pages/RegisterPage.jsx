import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { registerUser } from '../api.js';

const roleOptions = [
  { value: 'Patient', label: 'Patient / Guardian' },
  { value: 'Doctor', label: 'Doctor / Health Worker' },
];

function getRedirectPath(role) {
  if (role === 'Admin' || role === 'admin') {
    return '/admin/dashboard';
  }
  if (role === 'Doctor' || role === 'doctor') {
    return '/doctor';
  }
  return '/patient';
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Patient',
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!form.agreed) {
      setErrorMessage('Please accept Terms and Privacy Policy to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
        phone: form.phone,
      });
      login(data);
      navigate(getRedirectPath(data?.user?.role), { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Registration failed. Please review your details and try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-[#3730a3]">
            MaterNova
          </Link>
          <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-[#3730a3]">
            About Us
          </Link>
        </div>

        <section className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">
          <aside className="bg-gradient-to-b from-indigo-50 to-white p-8 md:p-10">
            <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#3730a3]">
              Account Setup
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-700">
              Join the network delivering coordinated maternal care.
            </h1>
            <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
              Create your account and choose your user type. Admin role remains restricted.
            </p>
          </aside>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-slate-700">Create account</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Register as a patient or doctor to access your tailored workflow.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-slate-600">User type</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {roleOptions.map((roleOption) => (
                    <button
                      key={roleOption.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: roleOption.value }))}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                        form.role === roleOption.value
                          ? 'border-[#3730a3] bg-indigo-50 text-[#3730a3]'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-indigo-200'
                      }`}
                    >
                      {roleOption.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="register-name" className="mb-1 block text-sm font-semibold text-slate-600">
                  Full name
                </label>
                <input
                  id="register-name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              <div>
                <label htmlFor="register-email" className="mb-1 block text-sm font-semibold text-slate-600">
                  Email address
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              <div>
                <label htmlFor="register-phone" className="mb-1 block text-sm font-semibold text-slate-600">
                  Phone number
                </label>
                <input
                  id="register-phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  autoComplete="tel"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              <div>
                <label htmlFor="register-password" className="mb-1 block text-sm font-semibold text-slate-600">
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-[#3730a3]/25 transition focus:border-[#3730a3] focus:ring"
                />
              </div>

              <label htmlFor="register-terms" className="flex items-start gap-2 text-sm font-medium text-slate-500">
                <input
                  id="register-terms"
                  type="checkbox"
                  name="agreed"
                  checked={form.agreed}
                  onChange={onChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#3730a3] focus:ring-[#3730a3]"
                />
                <span>I agree to the Terms of Service and Privacy Policy.</span>
              </label>

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
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#3730a3] hover:text-indigo-900">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
