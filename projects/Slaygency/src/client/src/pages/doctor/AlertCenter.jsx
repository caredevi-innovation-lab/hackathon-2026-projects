import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAlerts, resolveAlert } from '../../api.js';
import { FaCheckCircle, FaExclamationTriangle, FaSearch } from 'react-icons/fa';

function formatTime(value) {
  if (!value) return '--';
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AlertCenter() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [query, setQuery] = useState(initialSearch);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshingId, setRefreshingId] = useState('');
  const [error, setError] = useState('');

  async function loadAlerts() {
    try {
      setLoading(true);
      const [activeRes, resolvedRes] = await Promise.all([
        getAlerts({ status: 'active', limit: 50 }),
        getAlerts({ status: 'resolved', limit: 10 }),
      ]);
      setActiveAlerts(Array.isArray(activeRes?.items) ? activeRes.items : []);
      setResolvedAlerts(Array.isArray(resolvedRes?.items) ? resolvedRes.items : []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to fetch alerts from server.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  useEffect(() => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  const filteredActive = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return activeAlerts;
    return activeAlerts.filter((item) => {
      const patientName = item?.patient?.name || '';
      const message = item?.message || '';
      const reasons = Array.isArray(item?.reasons) ? item.reasons.join(' ') : '';
      return [patientName, message, reasons].some((part) => part.toLowerCase().includes(normalized));
    });
  }, [activeAlerts, query]);

  const criticalCount = filteredActive.filter((item) => Array.isArray(item?.reasons) && item.reasons.length > 0).length;

  const handleResolve = async (alertId) => {
    try {
      setRefreshingId(alertId);
      await resolveAlert(alertId);
      await loadAlerts();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not resolve this alert.');
    } finally {
      setRefreshingId('');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6">
        <section className="bg-white border border-indigo-100 rounded-2xl p-5">
          <p className="text-xs  tracking-wider text-indigo-500 font-semibold mb-2">Doctor Alerts</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="m-0 text-3xl font-semibold text-slate-800">Alerts Center</h1>
              <p className="m-0 mt-1 text-sm text-slate-500">
                {filteredActive.length} active alert{filteredActive.length !== 1 ? 's' : ''} requiring attention.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2 w-full md:w-[320px]">
              <FaSearch className="text-slate-400 text-sm shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search alerts by patient or reason..."
                className="w-full border-0 outline-none bg-transparent text-sm text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-indigo-600 text-white p-4">
            <p className="m-0 text-xs  tracking-wider text-indigo-100 font-semibold">Active</p>
            <p className="m-0 mt-1 text-2xl font-semibold">{filteredActive.length}</p>
          </div>
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="m-0 text-xs  tracking-wider text-red-500 font-semibold">Critical</p>
            <p className="m-0 mt-1 text-2xl font-semibold text-red-600">{criticalCount}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
            <p className="m-0 text-xs  tracking-wider text-emerald-600 font-semibold">Resolved (Recent)</p>
            <p className="m-0 mt-1 text-2xl font-semibold text-emerald-600">{resolvedAlerts.length}</p>
          </div>
        </section>

        <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="m-0 text-lg font-semibold text-slate-800">Active Alerts</h2>
          </div>

          {loading ? (
            <div className="p-5 text-sm text-slate-400">Loading alerts...</div>
          ) : filteredActive.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No alerts match your current search.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredActive.map((alert) => {
                const patientName = alert?.patient?.name || 'Unknown Patient';
                const reasons = Array.isArray(alert?.reasons) ? alert.reasons : [];
                const isCritical = reasons.length > 0;
                const bpText =
                  alert?.healthRecord?.systolicBP && alert?.healthRecord?.diastolicBP
                    ? `${alert.healthRecord.systolicBP}/${alert.healthRecord.diastolicBP} mmHg`
                    : null;

                return (
                  <article key={alert._id} className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {isCritical ? (
                            <FaExclamationTriangle className="text-red-500 shrink-0" />
                          ) : (
                            <FaCheckCircle className="text-indigo-500 shrink-0" />
                          )}
                          <h3 className="m-0 text-base font-semibold text-slate-800 truncate">{patientName}</h3>
                          <span className={`text-[10px]  font-semibold px-2 py-1 rounded-full ${isCritical ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                            {isCritical ? 'High Risk' : 'Alert'}
                          </span>
                        </div>
                        <p className="m-0 text-sm text-slate-600">{alert.message}</p>
                        <p className="m-0 mt-1 text-xs text-slate-400">
                          {bpText ? `Latest BP: ${bpText} â€¢ ` : ''}Created: {formatTime(alert.createdAt)}
                        </p>
                        {reasons.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {reasons.map((reason) => (
                              <span key={reason} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                {reason}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/submit?patientId=${encodeURIComponent(alert?.patient?._id || '')}`)}
                          className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50"
                        >
                          Open Record
                        </button>
                        <button
                          type="button"
                          disabled={refreshingId === alert._id}
                          onClick={() => handleResolve(alert._id)}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60"
                        >
                          {refreshingId === alert._id ? 'Resolving...' : 'Resolve'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

