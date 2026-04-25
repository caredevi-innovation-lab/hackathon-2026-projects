import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/auth/login', { email, password });
    login(data);
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
