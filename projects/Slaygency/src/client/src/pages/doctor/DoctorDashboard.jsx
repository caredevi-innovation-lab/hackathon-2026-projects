import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchDashboardStats } from '../../api.js';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { HiSparkles } from 'react-icons/hi2';

export default function DoctorDashboard() {
  const { i18n } = useTranslation();
  const isNe = i18n.language?.startsWith('ne');
  const tx = (en, ne) => (isNe ? ne : en);
  const [stats, setStats] = useState(null);
  const [urgentAlerts, setUrgentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchDashboardStats();
        if (!cancelled) {
          setStats(data.stats);
          setUrgentAlerts(data.urgentAlerts || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Dashboard fetch failed:', err);
          setError(err.response?.data?.message || tx('Failed to load dashboard', 'ड्यासबोर्ड लोड गर्न सकिएन'));
          setStats({ totalPatients: 0, highRiskCount: 0, pendingReports: 0, avgResponseTime: '-' });
          setUrgentAlerts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const doctorName = user?.name || tx('Doctor', 'डाक्टर');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <PageHeader title={tx('Dashboard', 'ड्यासबोर्ड')} subtitle={isNe ? `फेरि स्वागत छ, ${doctorName}` : `Welcome back, ${doctorName}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/alerts')} className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {stats?.highRiskCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center">{stats.highRiskCount}</span>}
          </button>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-6">
        {error && (
          <div className="bg-[#fff1f5] border border-[#ff4d6d]/20 text-[#ff4d6d] px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error} - {tx('showing fallback data. Please check if the server is running.', 'वैकल्पिक डेटा देखाइँदैछ। कृपया सर्भर चलिरहेको छ कि छैन जाँच गर्नुहोस्।')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/patient-records')}>
            <div className="w-12 h-12 rounded-xl bg-[#e8e9ff] flex items-center justify-center text-[#4039e6]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg></div>
            <div><p className="text-[#8e95ac] text-xs font-semibold">{tx('Total Active Patients', 'कुल सक्रिय बिरामी')}</p><p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.totalPatients?.toLocaleString() || '0'}</p></div>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/alerts')}>
            <div className="w-12 h-12 rounded-xl bg-[#ffe4e4] flex items-center justify-center text-[#ff4d6d]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
            <div><p className="text-[#8e95ac] text-xs font-semibold">{tx('High-Risk Mothers', 'उच्च जोखिम आमाहरू')}</p><p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.highRiskCount || '0'}</p></div>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-[#ffebf3] flex items-center justify-center text-[#d0177c]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
            <div><p className="text-[#8e95ac] text-xs font-semibold">{tx('Pending Reports', 'पेन्डिङ रिपोर्ट')}</p><p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.pendingReports || '0'}</p></div>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-[#f0f4f8] flex items-center justify-center text-[#64748b]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            <div><p className="text-[#8e95ac] text-xs font-semibold">{tx('Avg Response Time', 'औसत प्रतिक्रिया समय')}</p><p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.avgResponseTime || '-'}</p></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2"><span className="text-[#ff4d6d] font-semibold">!</span><h2 className="text-gray-700 font-semibold text-[15px]">{tx('Urgent Priority Queue', 'तत्काल प्राथमिकता सूची')}</h2></div>
                <button onClick={() => navigate('/alerts')} className="text-[#4039e6] font-semibold text-sm hover:underline">{tx('View All Alerts', 'सबै अलर्ट हेर्नुहोस्')}</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  [1, 2].map((i) => <div key={i} className="bg-white rounded-2xl p-5 border-l-4 border-l-gray-200 shadow-sm animate-pulse"><div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div><div className="h-3 bg-gray-50 rounded w-full mb-2"></div><div className="h-3 bg-gray-50 rounded w-3/4 mb-4"></div><div className="h-9 bg-gray-100 rounded"></div></div>)
                ) : urgentAlerts.length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl p-8 shadow-sm text-center"><p className="text-gray-400 font-semibold text-sm inline-flex items-center gap-1.5"><span>{tx('No active alerts - all patients are stable!', 'सक्रिय अलर्ट छैन - सबै बिरामी स्थिर छन्!')}</span><HiSparkles className="w-4 h-4 text-indigo-400" /></p></div>
                ) : (
                  urgentAlerts.slice(0, 2).map((alert, idx) => {
                    const borderColor = idx === 0 ? 'border-l-[#ff4d6d]' : 'border-l-[#d5a566]';
                    const tagBg = idx === 0 ? 'bg-[#ffe4e4] text-[#ff4d6d]' : 'bg-[#fff1df] text-[#c48737]';
                    const tagText = alert.reasons?.[0] || alert.message || tx('High Risk', 'उच्च जोखिम');
                    const bpText = alert.healthRecord ? `${alert.healthRecord.systolicBP}/${alert.healthRecord.diastolicBP} mmHg` : '';
                    const hbText = alert.healthRecord?.hemoglobin ? `Hb: ${alert.healthRecord.hemoglobin} g/dL` : '';
                    const description = bpText && hbText ? `${tx('Current', 'हालको')}: ${bpText}. ${hbText}.` : alert.message;
                    return (
                      <div key={alert.id} className={`bg-white rounded-2xl p-5 border-l-4 ${borderColor} shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all`}>
                        <div><div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-gray-800">{alert.patientName}</h3><span className={`${tagBg} text-[10px] font-semibold px-2.5 py-1 rounded-md`}>{tagText.length > 20 ? `${tagText.slice(0, 20)}...` : tagText}</span></div><p className="text-[#64748b] text-xs mb-4 leading-relaxed">{description}</p></div>
                        <div className="flex items-center gap-2"><button onClick={() => { const targetPatientId = alert.patientId || alert.patient?._id || ''; navigate(`/submit?patientId=${encodeURIComponent(targetPatientId)}`); }} className="flex-1 bg-[#3630c4] hover:bg-[#282496] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">{tx('View Record', 'रेकर्ड हेर्नुहोस्')}</button><button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-[#4039e6] hover:bg-gray-50 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></button></div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col">
              <div className="flex items-center justify-between mb-6"><h2 className="text-gray-700 font-semibold text-[15px]">{tx("Today's Schedule", 'आजको तालिका')}</h2><span className="text-[#4039e6] font-semibold text-xs">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
              <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors">{tx('Manage Calendar', 'क्यालेन्डर व्यवस्थापन')}</button>
            </section>
            <section className="bg-[#f4f6ff] rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4"><svg className="w-4 h-4 text-[#4039e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg><h2 className="text-gray-700 font-semibold text-[15px]">{tx('Tasks to Complete', 'पूरा गर्नुपर्ने काम')}</h2></div>
            </section>
            <section className="bg-gradient-to-br from-[#1a1b41] to-[#2a2991] rounded-2xl p-6 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-end"><div className="relative z-10"><p className="text-[10px] font-semibold text-blue-200 mb-1">{tx('Resource Spotlight', 'स्रोत विशेष')}</p><h3 className="font-semibold text-sm leading-snug">{tx('New Hypertension Guidelines for Third Trimester', 'तेस्रो त्रैमासिकका लागि नयाँ उच्च रक्तचाप निर्देशिका')}</h3></div></section>
          </div>
        </div>
      </div>
    </div>
  );
}
