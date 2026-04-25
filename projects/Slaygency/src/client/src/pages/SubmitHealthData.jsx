import { useState } from 'react';
import axios from 'axios';
import AlertBanner from '../components/AlertBanner.jsx';
import HealthForm from '../components/HealthForm.jsx';

export default function SubmitHealthData() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/health', payload);
      setMessage('Health data submitted successfully');
    } catch (_e) {
      setMessage('Failed to submit health data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Submit Health Data</h1>
      <AlertBanner message={message} type={message.startsWith('Failed') ? 'error' : 'success'} />
      <HealthForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}
