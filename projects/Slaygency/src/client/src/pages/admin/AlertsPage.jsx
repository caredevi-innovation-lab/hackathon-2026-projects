import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import Badge from '../../components/admin/Badge.jsx';
import EmptyState from '../../components/admin/EmptyState.jsx';
import TableSkeleton from '../../components/admin/TableSkeleton.jsx';
import Toast from '../../components/admin/Toast.jsx';
import { getAlerts, resolveAlert as resolveAlertApi } from '../../services/apiService.js';

function alertTone(alert) {
  if (alert.resolved || alert.status === 'resolved') return 'success';
  if (alert.severity === 'High' || alert.priority === 'high') return 'danger';
  if (alert.severity === 'Medium') return 'warning';
  return 'success';
}

export default function AlertsPage() {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [toast, setToast] = useState({ show: false, text: '', tone: 'success' });

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const params = { limit: 50 };
        if (severityFilter === 'Resolved') params.status = 'resolved';
        else if (severityFilter !== 'All') params.status = 'active';

        const res = await getAlerts(params);
        const items = (res.items || []).map((a) => ({
          id: a._id,
          patient: a.patient?.name || 'Unknown',
          message: a.message || 'Alert',
          time: a.createdAt ? new Date(a.createdAt).toLocaleString() : 'Unknown',
          severity: 'High',
          resolved: a.status === 'resolved',
          reasons: a.reasons || [],
        }));
        setAlerts(items);
      } catch {
        setToast({ show: true, text: 'Failed to load alerts from server.', tone: 'danger' });
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, [severityFilter]);

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 1800);
    return () => clearTimeout(timer);
  }, [toast.show]);

  const filtered = useMemo(() => {
    return alerts.filter((alert) => {
      if (severityFilter === 'All') return true;
      if (severityFilter === 'Resolved') return alert.resolved;
      return alert.severity === severityFilter && !alert.resolved;
    });
  }, [alerts, severityFilter]);

  const onResolve = async (id) => {
    try {
      await resolveAlertApi(id);
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
      setToast({ show: true, text: 'Alert marked as resolved.', tone: 'success' });
    } catch {
      setToast({ show: true, text: 'Failed to resolve alert. Please try again.', tone: 'danger' });
    }
  };

  return (
    <AdminLayout
      title="System Alerts"
      subtitle="Track and resolve clinical alerts across the system."
    >
      <Toast show={toast.show} text={toast.text} tone={toast.tone} />
      <section className="overflow-hidden rounded-2xl border border-[rgba(171,189,220,0.38)] bg-[linear-gradient(120deg,rgba(34,80,182,0.14)_0%,rgba(0,122,138,0.12)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,68,144,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-sm font-semibold text-[#1b4a85]">
            Manage critical events and close loops with care teams.
          </p>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">
            Live data
          </span>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-2xl border border-[#d8e3f2] bg-[rgba(255,255,255,0.75)] p-2 shadow-[0_10px_22px_rgba(17,68,144,0.07)] backdrop-blur-sm">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-xl border border-[#d8e3f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>Resolved</option>
            </select>
          </div>
          <p className="m-0 text-xs font-semibold text-[#6782aa]">{filtered.length} alerts shown</p>
        </div>
        {loading ? (
          <TableSkeleton rows={4} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No alerts found"
            message="There are no alerts for this filter right now."
          />
        ) : (
          <div className="grid gap-3">
            {filtered.map((alert) => (
              <article
                key={alert.id}
                className={`rounded-xl border p-4 transition duration-200 hover:-translate-y-[1px] ${alertTone(alert) === 'danger' ? 'border-[#f3c7cf] bg-[rgba(255,241,244,0.8)]' : alertTone(alert) === 'warning' ? 'border-[#f0e2ba] bg-[rgba(255,249,231,0.8)]' : 'border-[#cfe8de] bg-[rgba(239,252,246,0.8)]'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1e467f]">{alert.message}</p>
                    <p className="m-0 mt-1 text-xs text-[#5f789f]">Patient: {alert.patient}</p>
                    <p className="m-0 mt-1 text-xs text-[#6e85a8]">{alert.time}</p>
                    {alert.reasons.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {alert.reasons.map((r, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[rgba(175,47,69,0.1)] px-2 py-0.5 text-xs text-[#8a1a35]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid justify-items-end gap-2">
                    <Badge tone={alertTone(alert)}>
                      {alert.resolved ? 'Resolved' : `${alert.severity} severity`}
                    </Badge>
                    {!alert.resolved && (
                      <button
                        type="button"
                        onClick={() => onResolve(alert.id)}
                        className="rounded-lg border border-transparent bg-[linear-gradient(90deg,#2250b6_0%,#007a8a_100%)] px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Mark as resolved
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}
