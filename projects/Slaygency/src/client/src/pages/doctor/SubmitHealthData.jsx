import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getPatientById } from '../../api.js';

function parsePregnancyHistory(value) {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return { notes: String(value) };
  }
}

function formatDate(value) {
  if (!value) return '--';
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function riskFromRecord(record) {
  if (!record) return 'Low';
  if (record.riskLevel) return record.riskLevel;
  if (record.systolicBP >= 140 || record.diastolicBP >= 90 || record.hemoglobin < 10) return 'High';
  if (record.systolicBP >= 130 || record.diastolicBP >= 85) return 'Moderate';
  return 'Low';
}

function riskTone(level) {
  const value = String(level || '').toLowerCase();
  if (value === 'high') return 'bg-red-100 text-red-600 border-red-200';
  if (value === 'moderate') return 'bg-amber-100 text-amber-600 border-amber-200';
  return 'bg-emerald-100 text-emerald-600 border-emerald-200';
}

export default function SubmitHealthData() {
  const [params] = useSearchParams();
  const location = useLocation();
  const rawPatientId = params.get('patientId') || location.state?.patientId || '';
  const patientId =
    typeof rawPatientId === 'string' &&
    rawPatientId !== 'undefined' &&
    rawPatientId !== 'null' &&
    /^[a-f\d]{24}$/i.test(rawPatientId)
      ? rawPatientId
      : '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    async function load() {
      if (!patientId) {
        setLoading(false);
        setError('No valid patient selected. Open a patient from Patient Records first.');
        return;
      }
      try {
        setLoading(true);
        const data = await getPatientById(patientId);
        const list = Array.isArray(data?.records) ? data.records : [];
        setPatient(data?.patient || null);
        setRecords(list);
        setSelectedId(list[0]?._id || '');
        setError('');
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load patient record from backend.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [patientId]);

  const selectedRecord = useMemo(() => {
    if (!records.length) return null;
    return records.find((item) => item._id === selectedId) || records[0];
  }, [records, selectedId]);

  const latest = records[0];
  const latestRisk = riskFromRecord(latest);
  const parsedHistory = parsePregnancyHistory(selectedRecord?.pregnancyHistory);

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading patient record...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6">
        <section className="bg-white border border-indigo-100 rounded-2xl p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="m-0 text-xs  tracking-wider text-indigo-500 font-semibold mb-2">Patient Record</p>
              <h1 className="m-0 text-3xl font-semibold text-slate-800">{patient?.name || 'Patient Details'}</h1>
              <p className="m-0 mt-1 text-sm text-slate-500">
                {patient?.email || '--'} {patient?.phone ? `â€¢ ${patient.phone}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${riskTone(latestRisk)}`}>{latestRisk} Risk</span>
              <Link
                to={patientId ? `/health-entry?patientId=${encodeURIComponent(patientId)}` : '/health-entry'}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Add Health Entry
              </Link>
              <Link to="/patient-records" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                Back to Patients
              </Link>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {!error && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl bg-indigo-600 text-white p-4">
                <p className="m-0 text-xs  tracking-wider text-indigo-100 font-semibold">Total Records</p>
                <p className="m-0 mt-1 text-2xl font-semibold">{records.length}</p>
              </div>
              <div className="rounded-xl bg-white border border-slate-100 p-4">
                <p className="m-0 text-xs  tracking-wider text-slate-400 font-semibold">Latest BP</p>
                <p className="m-0 mt-1 text-2xl font-semibold text-slate-800">
                  {latest ? `${latest.systolicBP}/${latest.diastolicBP}` : '--'}
                </p>
              </div>
              <div className="rounded-xl bg-white border border-slate-100 p-4">
                <p className="m-0 text-xs  tracking-wider text-slate-400 font-semibold">Hemoglobin</p>
                <p className="m-0 mt-1 text-2xl font-semibold text-slate-800">{latest?.hemoglobin ?? '--'}</p>
              </div>
              <div className="rounded-xl bg-white border border-slate-100 p-4">
                <p className="m-0 text-xs  tracking-wider text-slate-400 font-semibold">Last Updated</p>
                <p className="m-0 mt-1 text-sm font-semibold text-slate-700">{formatDate(latest?.createdAt)}</p>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="m-0 text-lg font-semibold text-slate-800">Health Record Timeline</h2>
                </div>
                {!records.length ? (
                  <div className="p-8 text-sm text-slate-500">No health records found for this patient yet.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {records.map((record) => {
                      const isActive = selectedRecord?._id === record._id;
                      const badgeTone = riskTone(riskFromRecord(record));
                      return (
                        <button
                          type="button"
                          key={record._id}
                          onClick={() => setSelectedId(record._id)}
                          className={`w-full text-left p-4 transition-colors ${isActive ? 'bg-indigo-50/60' : 'hover:bg-slate-50'}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <p className="m-0 text-sm font-semibold text-slate-800">
                                BP {record.systolicBP}/{record.diastolicBP} â€¢ Hb {record.hemoglobin}
                              </p>
                              <p className="m-0 mt-1 text-xs text-slate-500">{formatDate(record.createdAt)}</p>
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${badgeTone}`}>
                              {riskFromRecord(record)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="m-0 text-base font-semibold text-slate-800 mb-4">Selected Record Details</h3>
                {!selectedRecord ? (
                  <p className="text-sm text-slate-500">No record selected.</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="m-0 text-xs text-slate-400 font-semibold  tracking-wider">Vitals</p>
                      <p className="m-0 mt-1 text-sm text-slate-700">
                        Blood Pressure: <span className="font-semibold">{selectedRecord.systolicBP}/{selectedRecord.diastolicBP}</span>
                      </p>
                      <p className="m-0 mt-1 text-sm text-slate-700">
                        Hemoglobin: <span className="font-semibold">{selectedRecord.hemoglobin}</span>
                      </p>
                      <p className="m-0 mt-1 text-sm text-slate-700">
                        Age: <span className="font-semibold">{selectedRecord.age}</span>
                      </p>
                    </div>

                    <div>
                      <p className="m-0 text-xs text-slate-400 font-semibold  tracking-wider">Symptoms</p>
                      {selectedRecord.symptoms?.length ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedRecord.symptoms.map((symptom) => (
                            <span key={symptom} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="m-0 mt-1 text-sm text-slate-500">No symptoms reported.</p>
                      )}
                    </div>

                    <div>
                      <p className="m-0 text-xs text-slate-400 font-semibold  tracking-wider">Clinical Notes</p>
                      <p className="m-0 mt-2 text-sm text-slate-600 leading-relaxed">
                        {parsedHistory?.clinicalNotes || parsedHistory?.notes || 'No clinical notes added.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

