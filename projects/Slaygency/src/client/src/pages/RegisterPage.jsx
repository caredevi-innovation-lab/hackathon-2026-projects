import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { registerUser } from '../services/apiService.js';
import registerImage from '../assets/images/register.jpg';

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
      setErrorMessage('Please accept Terms and Privacy Policy to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await registerUser({
        name: form.name,
        email: form.email,
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
    <main className="register-page">
      <section className="register-shell" aria-label="Aama Care registration">
        <aside
          className="register-hero"
          aria-hidden="true"
          style={{ '--register-hero-image': `url(${registerImage})` }}
        >
          <h1>Elevate maternal care with intelligent monitoring.</h1>
          <p>
            Join a care ecosystem designed for health professionals and families. Coordinate visits,
            streamline reporting, and reduce avoidable risks.
          </p>
          <blockquote>
            &quot;The platform helped us focus on patients instead of paperwork and delays.&quot;
          </blockquote>
        </aside>

        <section className="register-panel">
          <header className="register-header">
            <div className="register-brand-row">
              <p className="register-brand">Aama Care</p>
              <button type="button" className="register-language-pill">
                English
              </button>
            </div>

            <h2>Create account</h2>
            <p>Start your journey toward human-centric care.</p>
          </header>

          <form className="register-form" onSubmit={onSubmit} noValidate>
            <fieldset className="register-role-group">
              <legend>Select your role</legend>
              <div
                className="register-role-buttons"
                role="radiogroup"
                aria-label="Select your role"
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

            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="name@institution.com"
              autoComplete="email"
              required
            />

            <label htmlFor="register-phone">Phone number</label>
            <input
              id="register-phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="+977 98X XXX XXX"
              autoComplete="tel"
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Min. 8 characters"
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
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </span>
            </label>

            {errorMessage && <p className="register-error">{errorMessage}</p>}
            {successMessage && <p className="register-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting} className="register-submit-btn">
              {isSubmitting ? 'Creating account...' : 'Complete Registration'}
            </button>

            <div className="register-or-separator">or join via</div>

            <div className="register-social-row">
              <button type="button">Google</button>
              <button type="button">Facebook</button>
            </div>
          </form>

          <p className="register-login-note">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
