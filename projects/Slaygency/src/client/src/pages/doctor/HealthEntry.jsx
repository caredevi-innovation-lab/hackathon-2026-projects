import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Sidebar now provided by AppLayout
import { addHealthRecord, getPatientById } from '../../api.js';
import { FaClipboardList, FaCapsules, FaStethoscope, FaSyringe } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.js';

export default function HealthEntry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const rawPatientId = searchParams.get('patientId') || '';
  const patientId =
    typeof rawPatientId === 'string' &&
    rawPatientId !== 'undefined' &&
    rawPatientId !== 'null' &&
    /^[a-f\d]{24}$/i.test(rawPatientId)
      ? rawPatientId
      : '';
  const requiresPatientSelection = ['Doctor', 'Admin'].includes(user?.role);
  const canSubmit = !requiresPatientSelection || Boolean(patientId);

  const [vitals, setVitals] = useState({
    systolicBP: '120',
    diastolicBP: '80',
    weight: '68.5',
    hemoglobin: '12.4',
  });

  const [symptoms, setSymptoms] = useState({
    headache: false,
    visualChanges: false,
    edema: false,
    abdominalPain: false,
  });

  const [clinicalNotes, setClinicalNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // UI states
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [lastRecord, setLastRecord] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPatient() {
      if (!patientId) {
        if (!cancelled) {
          setPatientDetails(null);
          setLastRecord(null);
        }
        return;
      }
      try {
        const data = await getPatientById(patientId);
        if (!cancelled) {
          setPatientDetails(data?.patient || null);
          const latest = Array.isArray(data?.records) && data.records.length > 0 ? data.records[0] : null;
          setLastRecord(latest);
        }
      } catch {
        if (!cancelled) {
          setPatientDetails(null);
          setLastRecord(null);
        }
      }
    }
    loadPatient();
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  useEffect(() => {
    if (!lastRecord) return;
    setVitals((prev) => ({
      ...prev,
      systolicBP: String(lastRecord.systolicBP ?? prev.systolicBP),
      diastolicBP: String(lastRecord.diastolicBP ?? prev.diastolicBP),
      hemoglobin: String(lastRecord.hemoglobin ?? prev.hemoglobin),
    }));
  }, [lastRecord]);

  const handleVitalChange = (field, value) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleSymptomToggle = (field) => {
    setSymptoms((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Build the payload that matches the backend HealthRecord schema
  const buildPayload = () => {
    const selectedSymptoms = Object.entries(symptoms)
      .filter(([, checked]) => checked)
      .map(([key]) => {
        // Convert camelCase to readable label
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
      });

    const payload = {
      age: 24, // gestation weeks mapped as age (matching schema requirement)
      systolicBP: Number(vitals.systolicBP),
      diastolicBP: Number(vitals.diastolicBP),
      hemoglobin: Number(vitals.hemoglobin),
      symptoms: selectedSymptoms,
      pregnancyHistory: JSON.stringify({
        weight: Number(vitals.weight),
        clinicalNotes,
        prescription,
        followUpDate,
      }),
    };
    if (patientId) {
      payload.patientId = patientId;
    }
    return payload;
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    if (!canSubmit) {
      showToast('error', 'Please open a patient from Patient Records before saving.');
      return;
    }
    try {
      setSaving(true);
      const payload = buildPayload();
      await addHealthRecord(payload);
      showToast('success', 'Health record saved successfully!');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to save record. Please try again.';
      showToast('error', msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCompleteAndSave = async () => {
    if (!canSubmit) {
      showToast('error', 'Please open a patient from Patient Records before saving.');
      return;
    }
    try {
      setSaving(true);
      const payload = buildPayload();
      await addHealthRecord(payload);
      showToast('success', 'Entry completed & saved! Redirectingâ€¦');
      setTimeout(() => navigate('/patient-records'), 1800);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to save record. Please try again.';
      showToast('error', msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setShowDiscardDialog(true);
  };

  const confirmDiscard = () => {
    setShowDiscardDialog(false);
    navigate(-1);
  };

  const patientName = patientDetails?.name || 'Select a patient';
  const patientDisplayId = patientDetails?.id ? `#${patientDetails.id.slice(-8).toUpperCase()}` : '--';
  const gestationLabel = lastRecord?.age ? `Age: ${lastRecord.age}` : 'No previous records';
  const lastVisitLabel = lastRecord?.createdAt ? new Date(lastRecord.createdAt).toLocaleDateString('en-US') : '--';
  const progressionLabel = lastRecord?.riskLevel ? `${lastRecord.riskLevel} Risk` : 'No historical trend';
  const patientSeed = patientDetails?.id || patientName || 'patient';

  return (
    <div className="w-full">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[960px] mx-auto w-full flex flex-col gap-6">

            {/* â”€â”€ Breadcrumb â”€â”€ */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <span className="hover:text-[#5348ff] cursor-pointer transition-colors">Patients</span>
              <span>/</span>
              <span className="hover:text-[#5348ff] cursor-pointer transition-colors">{patientName}</span>
              <span>/</span>
              <span className="text-[#5348ff] font-semibold">New Health Entry</span>
            </nav>

            {!canSubmit && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-700 px-4 py-3 text-sm font-medium">
                Open a patient from Patient Records first. This page saves health records to the selected patient.
              </div>
            )}

            {/* â”€â”€ Page Header â”€â”€ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Clinical Health Entry</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef0ff] text-[#5348ff] border border-[#d8daff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5348ff] animate-pulse" />
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscard}
                  disabled={saving}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#5348ff] to-[#6c5ce7] shadow-[0_4px_14px_rgba(83,72,255,0.35)] hover:shadow-[0_6px_20px_rgba(83,72,255,0.5)] hover:translate-y-[-1px] transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {saving ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )}
                  {saving ? 'Savingâ€¦' : 'Save Record'}
                </button>
              </div>
            </div>

            {/* â”€â”€ Patient Info Card â”€â”€ */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
              {/* Subtle gradient accent on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5348ff] to-[#6c5ce7] rounded-l-2xl" />

              <div className="flex items-center gap-4 pl-3">
                <div className="w-16 h-16 bg-gradient-to-br from-[#312e81] to-[#4338ca] rounded-2xl overflow-hidden flex items-end justify-center shadow-md">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patientSeed)}&backgroundColor=312e81`}
                    alt={patientName}
                    className="w-14 h-14"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold  tracking-widest mb-0.5">Patient Name</p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1.5">{patientName}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#5348ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span>{patientDisplayId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#5348ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{gestationLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right pl-4 md:border-l border-gray-100 pr-2">
                <p className="text-[10px] text-gray-400 font-semibold  tracking-widest mb-1">Last Visit</p>
                <p className="text-lg font-semibold text-gray-900">{lastVisitLabel}</p>
                <p className="text-xs text-gray-400 mt-0.5">{progressionLabel}</p>
              </div>
            </div>

            {/* â”€â”€ Vitals + Symptoms Row â”€â”€ */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Vitals Entry */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <FaSyringe className="text-base text-[#5348ff]" />
                    Vitals Entry
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#eef0ff] text-[#5348ff] border border-[#d8daff]">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Today, 09:45 AM
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  {/* Systolic BP */}
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="text"
                      value={vitals.systolicBP}
                      onChange={(e) => handleVitalChange('systolicBP', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                  {/* Diastolic BP */}
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="text"
                      value={vitals.diastolicBP}
                      onChange={(e) => handleVitalChange('diastolicBP', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                  {/* Weight */}
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="text"
                      value={vitals.weight}
                      onChange={(e) => handleVitalChange('weight', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                  {/* Hemoglobin */}
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                      Hemoglobin (g/dL)
                    </label>
                    <input
                      type="text"
                      value={vitals.hemoglobin}
                      onChange={(e) => handleVitalChange('hemoglobin', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-6">
                  <FaStethoscope className="text-base text-[#5348ff]" />
                  Symptoms
                </h3>

                <div className="flex flex-col gap-4">
                  {[
                    { key: 'headache', label: 'Headache' },
                    { key: 'visualChanges', label: 'Visual Changes' },
                    { key: 'edema', label: 'Edema' },
                    { key: 'abdominalPain', label: 'Abdominal Pain' },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() => handleSymptomToggle(key)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          symptoms[key]
                            ? 'bg-[#5348ff] border-[#5348ff] shadow-[0_2px_8px_rgba(83,72,255,0.3)]'
                            : 'border-gray-300 bg-white group-hover:border-[#5348ff]/50'
                        }`}
                      >
                        {symptoms[key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* â”€â”€ Clinical Notes â”€â”€ */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-1">
                <FaClipboardList className="text-base text-[#5348ff]" />
                Clinical Notes
              </h3>
              <p className="text-xs text-gray-400 mb-4">Observations, diagnosis, and mental state assessment.</p>
              <textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Type clinical observations here..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-[#fafbff] resize-none placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
              />
            </div>

            {/* â”€â”€ Recommendations & Medications â”€â”€ */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100 relative overflow-hidden">
              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5348ff] to-[#6c5ce7] rounded-l-2xl" />

              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-5 pl-3">
                <FaCapsules className="text-base text-[#5348ff]" />
                Recommendations &amp; Medications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-3">
                {/* Prescription */}
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                    Prescription / Treatment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="e.g. Iron Supplement, 200mg daily"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-[#fafbff] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Follow-up Date */}
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold  tracking-widest mb-2">
                    Next Follow-Up Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Info Alert */}
              <div className="mt-5 ml-3 flex items-start gap-3 bg-[#f0f0ff] rounded-xl p-4 border border-[#e0e0ff]">
                <div className="w-5 h-5 rounded-full bg-[#5348ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Standard Follow-up</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Patient is currently in the late second trimester. Schedule tests for gestational diabetes at the next visit.
                  </p>
                </div>
              </div>
            </div>

            {/* â”€â”€ Footer Actions â”€â”€ */}
            <div className="flex items-center justify-center gap-4 pt-4 pb-8">
              <button
                onClick={handleDiscard}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#e74c3c] bg-white border-2 border-[#fde8e8] hover:bg-[#fef2f2] hover:border-[#e74c3c]/30 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Discard
              </button>
              <button
                onClick={handleCompleteAndSave}
                disabled={saving}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#5348ff] to-[#6c5ce7] shadow-[0_6px_20px_rgba(83,72,255,0.35)] hover:shadow-[0_8px_28px_rgba(83,72,255,0.5)] hover:translate-y-[-1px] transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {saving ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {saving ? 'Savingâ€¦' : 'Complete Entry & Save Record'}
              </button>
            </div>

          </div>

      {/* â”€â”€ Toast Notification â”€â”€ */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border transition-all duration-300 animate-[slideIn_0.3s_ease-out] ${
          toast.type === 'success'
            ? 'bg-white border-green-200 text-green-800'
            : 'bg-white border-red-200 text-red-800'
        }`}>
          {toast.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold">{toast.type === 'success' ? 'Success' : 'Error'}</p>
            <p className="text-xs opacity-75">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* â”€â”€ Discard Confirmation Dialog â”€â”€ */}
      {showDiscardDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowDiscardDialog(false)} />
          <div className="relative bg-white rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-sm w-full mx-4 animate-[scaleIn_0.2s_ease-out]">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Discard Changes?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">All unsaved data in this health entry will be lost. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDiscardDialog(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDiscard}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-[0_4px_12px_rgba(239,68,68,0.3)] transition-all"
              >
                Yes, Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

