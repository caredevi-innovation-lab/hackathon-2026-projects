import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Patient' });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    alert('Registered. Please login.');
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" />
        <select name="role" value={form.role} onChange={onChange}>
          <option>Patient</option>
          <option>HealthWorker</option>
          <option>Doctor</option>
          <option>Admin</option>
        </select>
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}
