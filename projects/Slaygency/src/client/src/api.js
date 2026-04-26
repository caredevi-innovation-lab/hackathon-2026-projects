/**
 * Backward-compatible re-exports from the canonical API service.
 * All new code should import from './services/apiService.js' directly.
 * This file exists only so existing pages that import from './api.js' continue to work.
 */
export {
  default,
  default as api,
} from './services/apiService.js';

export {
  loginUser,
  registerUser,
  getMe as fetchMe,
  createHealthRecord,
  createHealthRecord as addHealthRecord,
  getMyHealthRecords as fetchHealth,
  updateHealthRecord,
  predictRisk,
  listUsers,
  listPatients,
  getPatientById,
  getAlerts,
  createAlert,
  resolveAlert,
} from './services/apiService.js';

// ── Dashboard stats (kept here for backward compat) ─────────────────────────
import apiInstance from './services/apiService.js';

export async function fetchDashboardStats() {
  try {
    const { data } = await apiInstance.get('/dashboard/stats');
    return data;
  } catch {
    const [patientsResult, alertsResult] = await Promise.allSettled([
      apiInstance.get('/patients', { params: { role: 'Patient', limit: 1 } }),
      apiInstance.get('/alerts', { params: { status: 'active', limit: 10 } }),
    ]);

    const patientsData = patientsResult.status === 'fulfilled' ? patientsResult.value.data : {};
    const alertsData = alertsResult.status === 'fulfilled' ? alertsResult.value.data : {};

    const totalPatients = Number(patientsData?.total) || 0;
    const urgentAlerts = Array.isArray(alertsData?.items) ? alertsData.items : [];

    return {
      stats: {
        totalPatients,
        highRiskCount: urgentAlerts.length,
        pendingReports: 0,
        avgResponseTime: '--',
      },
      urgentAlerts,
    };
  }
}

// ── Profile (backward compat) ────────────────────────────────────────────────
export async function updateProfile(payload) {
  const { data } = await apiInstance.patch('/users/profile', payload);
  return data;
}

export async function changePassword(payload) {
  const { data } = await apiInstance.post('/auth/password/change', payload);
  return data;
}
