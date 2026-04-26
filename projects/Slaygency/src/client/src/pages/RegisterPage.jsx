import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { registerUser } from '../services/apiService.js';
import registerImage from '../assets/images/register.jpg';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const roleOptions = [
    { value: 'Patient', label: t('register.patient_role') },
    { value: 'Doctor', label: t('register.doctor_role') },
  ];
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Patient',
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const selectRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!form.agreed) {
      setErrorMessage(t('register.need_terms'));
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      login(data);
      navigate(getRedirectPath(data?.user?.role), { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        t('register.failed');
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-shell" aria-label={t('register.aria')}>
        <aside
          className="register-hero"
          aria-hidden="true"
          style={{ '--register-hero-image': `url(${registerImage})` }}
        >
          <h1>{t('register.hero_title')}</h1>
          <p>{t('register.hero_subtitle')}</p>
          <blockquote>&quot;{t('register.hero_quote')}&quot;</blockquote>
        </aside>

        <section className="register-panel">
          <header className="register-header">
            <div className="register-brand-row">
              <p className="register-brand">{t('app_name')}</p>
            </div>

            <h2>{t('register.title')}</h2>
            <p>{t('register.subtitle')}</p>
          </header>

          <form className="register-form" onSubmit={onSubmit} noValidate>
            <fieldset className="register-role-group">
              <legend>{t('register.role_title')}</legend>
              <div
                className="register-role-buttons"
                role="radiogroup"
                aria-label={t('register.role_title')}
              >
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={form.role === option.value}
                    className={form.role === option.value ? 'active' : ''}
                    onClick={() => selectRole(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label htmlFor="register-name">{t('register.name')}</label>
            <input
              id="register-name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={t('register.name_placeholder')}
              autoComplete="name"
              required
            />

            <label htmlFor="register-email">{t('register.email')}</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder={t('register.email_placeholder')}
              autoComplete="email"
              required
            />

            <label htmlFor="register-phone">{t('register.phone')}</label>
            <input
              id="register-phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder={t('register.phone_placeholder')}
              autoComplete="tel"
            />

            <label htmlFor="register-password">{t('register.password')}</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder={t('register.password_placeholder')}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label className="register-terms-row" htmlFor="register-terms">
              <input
                id="register-terms"
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={onChange}
              />
              <span>
                {t('register.terms')}
              </span>
            </label>

            {errorMessage && <p className="register-error">{errorMessage}</p>}
            {successMessage && <p className="register-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting} className="register-submit-btn">
              {isSubmitting ? t('register.creating') : t('register.submit')}
            </button>

            <div className="register-or-separator">{t('register.join_via')}</div>

            <div className="register-social-row">
              <button type="button">{t('register.google')}</button>
              <button type="button">{t('register.facebook')}</button>
            </div>
          </form>

          <p className="register-login-note">
            {t('register.already')} <Link to="/login">{t('register.signin')}</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
