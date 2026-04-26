import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listPatients } from '../../api.js';
import { FaSearch, FaUserInjured } from 'react-icons/fa';

function riskTone(level) {
  const value = String(level || '').toLowerCase();
  if (value === 'high') return 'bg-red-100 text-red-600';
  if (value === 'moderate') return 'bg-amber-100 text-amber-600';
  return 'bg-emerald-100 text-emerald-600';
}

function initials(name) {
  return (name || 'U')
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientRecords() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [query, setQuery] = useState(initialQuery);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadPatients(search = '') {
    try {
      setLoading(true);
      const data = await listPatients({ search, limit: 100 });
      setPatients(Array.isArray(data?.items) ? data.items : []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch patients from backend.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients(initialQuery);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleaned = query.trim();
      if (cleaned) setSearchParams({ search: cleaned });
      else setSearchParams({});
      loadPatients(cleaned);
    }, 350);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  const highRiskCount = useMemo(
    () => patients.filter((item) => String(item?.riskLevel || '').toLowerCase() === 'high').length,
    [patients]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6">
        <section className="bg-white border border-indigo-100 rounded-2xl p-5">
          <p className="m-0 text-xs  tracking-wider text-indigo-500 font-semibold mb-2">Doctor Patients</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="m-0 text-3xl font-semibold text-slate-800">Patient Records</h1>
              <p className="m-0 mt-1 text-sm text-slate-500">Live patient list from backend with risk visibility.</p>
            </div>
            <div className="w-full md:w-[340px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
              <FaSearch className="text-slate-400 text-sm" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email or phone..."
                className="w-full border-0 outline-none bg-transparent text-sm text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-indigo-600 text-white p-4">
            <p className="m-0 text-xs  tracking-wider text-indigo-100 font-semibold">Total Patients</p>
            <p className="m-0 mt-1 text-2xl font-semibold">{patients.length}</p>
          </div>
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="m-0 text-xs  tracking-wider text-red-500 font-semibold">High Risk</p>
            <p className="m-0 mt-1 text-2xl font-semibold text-red-600">{highRiskCount}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
            <p className="m-0 text-xs  tracking-wider text-emerald-600 font-semibold">Stable</p>
            <p className="m-0 mt-1 text-2xl font-semibold text-emerald-600">{Math.max(patients.length - highRiskCount, 0)}</p>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <FaUserInjured className="text-indigo-500" />
            <h2 className="m-0 text-lg font-semibold text-slate-800">Patients</h2>
          </div>

          {loading ? (
            <div className="p-5 text-sm text-slate-400">Loading patients...</div>
          ) : patients.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No patients found for this query.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500">
                    <th className="text-left px-5 py-3 font-semibold">Patient</th>
                    <th className="text-left px-5 py-3 font-semibold">Email</th>
                    <th className="text-left px-5 py-3 font-semibold">Phone</th>
                    <th className="text-left px-5 py-3 font-semibold">Risk</th>
                    <th className="text-left px-5 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => {
                    const patientId = patient?._id || patient?.id || '';
                    return (
                    <tr key={patientId || patient?.email || `patient-${index}`} className="border-t border-slate-100">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold flex items-center justify-center">
                            {initials(patient?.name)}
                          </div>
                          <div>
                            <p className="m-0 font-semibold text-slate-800">{patient?.name || 'Unknown'}</p>
                            <p className="m-0 text-xs text-slate-400">{patientId ? patientId.slice(-8).toUpperCase() : '--'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{patient?.email || '--'}</td>
                      <td className="px-5 py-3 text-slate-600">{patient?.phone || '--'}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${riskTone(patient?.riskLevel)}`}>
                          {(patient?.riskLevel || 'low').toString()}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!patientId) return;
                            navigate(`/submit?patientId=${encodeURIComponent(patientId)}`);
                          }}
                          disabled={!patientId}
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                        >
                          Open Record
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

