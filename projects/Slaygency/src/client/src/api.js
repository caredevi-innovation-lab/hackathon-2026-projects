import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// ── Request interceptor: auto-attach JWT token ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 gracefully ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth API ──
export async function loginUser(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

// ── Dashboard API ──
export async function fetchDashboardStats() {
  const { data } = await api.get('/dashboard/stats');
  return data;
}

// ── Patients API ──
export async function fetchPatients(params = {}) {
  const { data } = await api.get('/patients', { params });
  return data;
}

export async function fetchPatientById(id) {
  const { data } = await api.get(`/patients/${id}`);
  return data;
}

// ── Alerts API ──
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

// ── Health Records API ──
export async function fetchHealthRecords() {
  const { data } = await api.get('/health');
  return data;
}

export async function addHealthRecord(payload) {
  const { data } = await api.post('/health', payload);
  return data;
}

export async function updateHealthRecord(id, payload) {
  const { data } = await api.put(`/health/${id}`, payload);
  return data;
}

// ── Risk API ──
export async function predictRisk(payload) {
  const { data } = await api.post('/risk/predict', payload);
  return data;
}

// ── Legacy export ──
export async function fetchHealth() {
  const { data } = await api.get('/health');
  return data;
}

export default api;
