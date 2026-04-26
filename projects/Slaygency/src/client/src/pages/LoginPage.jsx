import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { loginUser } from '../services/apiService.js';
import loginImage from '../assets/images/login.jpg';

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
    <main className="login-page">
      <section className="login-shell" aria-label="Aama Care login">
        <aside
          className="login-hero"
          aria-hidden="true"
          style={{ '--login-hero-image': `url(${loginImage})` }}
        >
          <h1>SAFE MOTHERHOOD, SMARTER CARE</h1>
          <p>
            Compassionate maternal healthcare supported by clinical excellence and modern risk
            screening.
          </p>
        </aside>

        <section className="login-panel">
          <header className="login-header">
            <p className="login-eyebrow">
              <strong>Welcome back</strong>
            </p>
            <h2>Sign in to your health portal</h2>
            <p>Access monitoring dashboards, alerts, and care recommendations in one place.</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="yourname@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            {errorMessage && <p className="login-error">{errorMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="login-footer-note">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
