import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function loginUser(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function fetchHealth() {
  const { data } = await api.get('/health');
  return data;
}

// ── Dashboard ──
export async function fetchDashboardStats() {
  const { data } = await api.get('/dashboard/stats');
  return data;
}

// ── Patients ──
export async function fetchPatients(params = {}) {
  const { data } = await api.get('/patients', { params });
  return data;
}

export async function fetchPatientById(id) {
  const { data } = await api.get(`/patients/${id}`);
  return data;
}

// ── Alerts ──
export async function fetchAlerts(params = {}) {
  const { data } = await api.get('/alerts', { params });
  return data;
}

export async function createAlert(payload) {
  const { data } = await api.post('/alerts', payload);
  return data;
}

export async function resolveAlert(id) {
  const { data } = await api.patch(`/alerts/${id}/resolve`);
  return data;
}

// ── Health Records ──
export async function addHealthRecord(payload) {
  const { data } = await api.post('/health', payload);
  return data;
}

export async function updateHealthRecord(id, payload) {
  const { data } = await api.put(`/health/${id}`, payload);
  return data;
}

// ── Risk ──
export async function predictRisk(payload) {
  const { data } = await api.post('/risk/predict', payload);
  return data;
}

export default api;
