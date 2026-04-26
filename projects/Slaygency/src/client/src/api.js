import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function fetchHealth() {
  const { data } = await api.get('/health');
  return data;
}

export async function createHealthRecord(payload) {
  const { data } = await api.post('/health', payload);
  return data;
}

export async function predictRisk(payload) {
  const { data } = await api.post('/risk/predict', payload);
  return data;
}

export async function updateProfile(payload) {
  const { data } = await api.patch('/users/profile', payload);
  return data;
}

export async function changePassword(payload) {
  const { data } = await api.post('/auth/password/change', payload);
  return data;
}

export default api;
