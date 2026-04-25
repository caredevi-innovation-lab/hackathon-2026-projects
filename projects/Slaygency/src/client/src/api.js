import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
});

export async function fetchHealth() {
  const { data } = await api.get('/health');
  return data;
}

export default api;
