import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { loginUser } from '../services/apiService.js';
import loginImage from '../assets/images/login.jpg';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        t('login.invalid');
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-label={t('login.aria')}>
        <aside
          className="login-hero"
          aria-hidden="true"
          style={{ '--login-hero-image': `url(${loginImage})` }}
        >
          <h1>{t('login.hero_title')}</h1>
          <p>{t('login.hero_subtitle')}</p>
        </aside>

        <section className="login-panel">
          <header className="login-header">
            <div className="register-brand-row">
            </div>
            <p className="login-eyebrow">
              <strong>{t('login.welcome_back')}</strong>
            </p>
            <h2>{t('login.title')}</h2>
            <p>{t('login.subtitle')}</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <label htmlFor="email">{t('login.email')}</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={t('login.email_placeholder')}
              autoComplete="email"
              required
            />

            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={t('login.password_placeholder')}
              autoComplete="current-password"
              required
            />

            {errorMessage && <p className="login-error">{errorMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('login.signing_in') : t('login.sign_in')}
            </button>
          </form>

          <p className="login-footer-note">
            {t('login.no_account')} <Link to="/register">{t('login.create_one')}</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
