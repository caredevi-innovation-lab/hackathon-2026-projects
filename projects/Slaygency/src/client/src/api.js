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

// ── Auth ────────────────────────────────────────────────────────────────────
export async function loginUser(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get('/auth/me');
  return data; // { user: {...} }
}

export async function changePassword(payload) {
  const { data } = await api.post('/auth/password/change', payload);
  return data;
}

// ── Health Records ───────────────────────────────────────────────────────────
export async function fetchHealth() {
  const { data } = await api.get('/health');
  return data; // Array of health records
}

/**
 * Create a health record.
 * Backend expects: age, systolicBP, diastolicBP, hemoglobin, symptoms[], pregnancyHistory
 */
export async function createHealthRecord(payload) {
  const { data } = await api.post('/health', payload);
  return data;
}

export async function updateHealthRecord(id, payload) {
  const { data } = await api.put(`/health/${id}`, payload);
  return data;
}

// ── Risk Analysis ────────────────────────────────────────────────────────────
/**
 * Predict risk.
 * Backend expects: age, bpSystolic (or systolicBP), bpDiastolic (or diastolicBP),
 *                  hemoglobin, symptoms[]
 */
export async function predictRisk(payload) {
  const { data } = await api.post('/risk/predict', payload);
  return data; // { success: true, prediction: {...} }
}

// ── User / Profile ───────────────────────────────────────────────────────────
export async function updateProfile(payload) {
  // payload: { name?, phone? }
  const { data } = await api.patch('/users/profile', payload);
  return data; // { user: {...} }
}

export default api;
