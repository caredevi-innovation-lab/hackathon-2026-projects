import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export async function loginUser({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registerUser({ name, email, password, role, phone }) {
  const { data } = await api.post('/auth/register', { name, email, password, role, phone });
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

// ─── Health Records ──────────────────────────────────────────────────────────
export async function createHealthRecord(payload) {
  const { data } = await api.post('/health', payload);
  return data;
}

export async function getMyHealthRecords() {
  const { data } = await api.get('/health');
  return data;
}

export async function updateHealthRecord(recordId, payload) {
  const { data } = await api.put(`/health/${recordId}`, payload);
  return data;
}

// ─── Risk Prediction ─────────────────────────────────────────────────────────
export async function predictRisk(payload) {
  const { data } = await api.post('/risk/predict', payload);
  return data;
}

export async function getRiskHealth() {
  const { data } = await api.get('/risk/health');
  return data;
}

// ─── Admin: Users ────────────────────────────────────────────────────────────
export async function listUsers(params = {}) {
  const { data } = await api.get('/users/admin', { params });
  return data;
}

export async function getUserById(userId) {
  const { data } = await api.get(`/users/admin/${userId}`);
  return data;
}

export async function updateUser(userId, payload) {
  const { data } = await api.patch(`/users/admin/${userId}`, payload);
  return data;
}

export async function updateUserPassword(userId, newPassword) {
  const { data } = await api.patch(`/users/admin/${userId}/password`, { newPassword });
  return data;
}

export async function deleteUser(userId) {
  const { data } = await api.delete(`/users/admin/${userId}`);
  return data;
}

// ─── Admin: Patients ─────────────────────────────────────────────────────────
export async function listPatients(params = {}) {
  const { data } = await api.get('/patients', { params });
  return data;
}

export async function getPatientById(patientId) {
  const { data } = await api.get(`/patients/${patientId}`);
  return data;
}

// ─── Admin: Alerts ───────────────────────────────────────────────────────────
export async function getAlerts(params = {}) {
  const { data } = await api.get('/alerts', { params });
  return data;
}

export async function createAlert(payload) {
  const { data } = await api.post('/alerts', payload);
  return data;
}

export async function resolveAlert(alertId) {
  const { data } = await api.patch(`/alerts/${alertId}/resolve`);
  return data;
}

export default api;
