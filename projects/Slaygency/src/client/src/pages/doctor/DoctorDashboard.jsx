import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchDashboardStats } from '../../api.js';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { HiSparkles } from 'react-icons/hi2';

export default function DoctorDashboard() {
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
          setError(err.response?.data?.message || 'Failed to load dashboard');
          // Fallback to mock data so UI isn't empty
          setStats({ totalPatients: 0, highRiskCount: 0, pendingReports: 0, avgResponseTime: '-' });
          setUrgentAlerts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const doctorName = user?.name || 'Doctor';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${doctorName}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/alerts')} className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {stats?.highRiskCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center">{stats.highRiskCount}</span>
            )}
          </button>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-6">

          {/* Error Banner */}
          {error && (
            <div className="bg-[#fff1f5] border border-[#ff4d6d]/20 text-[#ff4d6d] px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {error} - showing fallback data. Please check if the server is running.
            </div>
          )}
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/patient-records')}>
              <div className="w-12 h-12 rounded-xl bg-[#e8e9ff] flex items-center justify-center text-[#4039e6]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              </div>
              <div>
                <p className="text-[#8e95ac] text-xs font-semibold">Total Active Patients</p>
                <p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.totalPatients?.toLocaleString() || '0'}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/alerts')}>
              <div className="w-12 h-12 rounded-xl bg-[#ffe4e4] flex items-center justify-center text-[#ff4d6d]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-[#8e95ac] text-xs font-semibold">High-Risk Mothers</p>
                <p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.highRiskCount || '0'}</p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#ffebf3] flex items-center justify-center text-[#d0177c]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-[#8e95ac] text-xs font-semibold">Pending Reports</p>
                <p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.pendingReports || '0'}</p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#f0f4f8] flex items-center justify-center text-[#64748b]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[#8e95ac] text-xs font-semibold">Avg Response Time</p>
                <p className="text-xl font-semibold text-gray-800">{loading ? '...' : stats?.avgResponseTime || '-'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Urgent Priority Queue â€” from API */}
              <section>
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff4d6d] font-semibold">!</span>
                    <h2 className="text-gray-700 font-semibold text-[15px]">Urgent Priority Queue</h2>
                  </div>
                  <button onClick={() => navigate('/alerts')} className="text-[#4039e6] font-semibold text-sm hover:underline">View All Alerts</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loading ? (
                    [1, 2].map(i => (
                      <div key={i} className="bg-white rounded-2xl p-5 border-l-4 border-l-gray-200 shadow-sm animate-pulse">
                        <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-50 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-50 rounded w-3/4 mb-4"></div>
                        <div className="h-9 bg-gray-100 rounded"></div>
                      </div>
                    ))
                  ) : urgentAlerts.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-2xl p-8 shadow-sm text-center">
                      <p className="text-gray-400 font-semibold text-sm inline-flex items-center gap-1.5">
                        <span>No active alerts - all patients are stable!</span>
                        <HiSparkles className="w-4 h-4 text-indigo-400" />
                      </p>
                    </div>
                  ) : (
                    urgentAlerts.slice(0, 2).map((alert, idx) => {
                      const borderColor = idx === 0 ? 'border-l-[#ff4d6d]' : 'border-l-[#d5a566]';
                      const tagBg = idx === 0 ? 'bg-[#ffe4e4] text-[#ff4d6d]' : 'bg-[#fff1df] text-[#c48737]';
                      const tagText = alert.reasons?.[0] || alert.message || 'High Risk';
                      const bpText = alert.healthRecord ? `${alert.healthRecord.systolicBP}/${alert.healthRecord.diastolicBP} mmHg` : '';
                      const hbText = alert.healthRecord?.hemoglobin ? `Hb: ${alert.healthRecord.hemoglobin} g/dL` : '';
                      const description = bpText && hbText ? `Current: ${bpText}. ${hbText}.` : alert.message;

                      return (
                        <div key={alert.id} className={`bg-white rounded-2xl p-5 border-l-4 ${borderColor} shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all`}>
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-800">{alert.patientName}</h3>
                              <span className={`${tagBg} text-[10px] font-semibold px-2.5 py-1 rounded-md`}>{tagText.length > 20 ? `${tagText.slice(0, 20)}...` : tagText}</span>
                            </div>
                            <p className="text-[#64748b] text-xs mb-4 leading-relaxed">{description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const targetPatientId = alert.patientId || alert.patient?._id || '';
                                navigate(`/submit?patientId=${encodeURIComponent(targetPatientId)}`);
                              }}
                              className="flex-1 bg-[#3630c4] hover:bg-[#282496] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                            >
                              View Record
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-[#4039e6] hover:bg-gray-50 transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              {/* Longitudinal Risk Analysis Chart Area */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-gray-700 font-semibold text-[15px] mb-1">Longitudinal Risk Analysis</h2>
                    <p className="text-[#8e95ac] text-xs">Average population risk score trend (Last 30 Days)</p>
                  </div>
                  <select className="bg-[#f4f6ff] text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg outline-none border-none">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
                <div className="h-48 w-full relative flex items-end justify-between px-2">
                   <svg className="absolute inset-0 w-full h-full text-[#e8e9ff] opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,100 L0,50 Q25,10 50,50 T100,50 L100,100 Z" fill="currentColor" />
                   </svg>
                   {[20, 30, 45, 80, 100, 40, 50, 85, 30, 20].map((h, i) => (
                     <div key={i} className={`w-8 rounded-t-sm z-10 ${i === 4 ? 'bg-[#4039e6]' : i === 3 ? 'bg-[#b6b3ff]' : 'bg-[#f4f6ff]'}`} style={{ height: `${h}%` }}></div>
                   ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-semibold px-4">
                  <span>WEEK 1</span><span>WEEK 2</span><span>WEEK 3</span><span>WEEK 4</span>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-700 font-semibold text-[15px]">Today's Schedule</h2>
                  <span className="text-[#4039e6] font-semibold text-xs">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex flex-col gap-5 flex-1 relative">
                  <div className="absolute left-[56px] top-2 bottom-2 w-px bg-gray-100"></div>
                  {[
                    { time: '09:00', period: 'AM', name: 'Anjali Sharma', type: 'Tele-consultation', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                    { time: '10:30', period: 'AM', name: 'Priya Khatri', type: 'In-Clinic Followup', active: true, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                    { time: '02:15', period: 'PM', name: 'Sunita Rai', type: 'Initial Screening', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 relative z-10">
                      {item.active && <div className="absolute left-[54.5px] top-0 bottom-0 w-1 bg-[#4039e6] rounded-full"></div>}
                      <div className="text-right w-12 pt-1">
                        <p className={`${item.active ? 'text-[#4039e6]' : 'text-gray-800'} font-semibold text-xs leading-none`}>{item.time}</p>
                        <span className={`${item.active ? 'text-[#4039e6]' : 'text-gray-400'} text-[9px] font-semibold`}>{item.period}</span>
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-gray-800 font-semibold text-sm">{item.name}</p>
                            <p className={`${item.active ? 'text-[#4039e6]' : 'text-gray-400'} text-xs mt-0.5`}>{item.type}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#f4f6ff] flex items-center justify-center text-[#4039e6]">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors">Manage Calendar</button>
              </section>

              <section className="bg-[#f4f6ff] rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-[#4039e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  <h2 className="text-gray-700 font-semibold text-[15px]">Tasks to Complete</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { text: 'Sign notes for Maya Devi', tag: 'URGENT', tagColor: 'text-[#ff4d6d]' },
                    { text: 'Review Lab Results (4)', tag: 'TODAY', tagColor: 'text-gray-500' },
                    { text: 'Call Health Worker re: Sarah', tag: 'TODAY', tagColor: 'text-gray-500' },
                  ].map((task, i) => (
                    <label key={i} className="bg-white p-3.5 rounded-xl flex items-center gap-3 cursor-pointer shadow-sm">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4039e6] focus:ring-[#4039e6]" />
                      <span className="text-gray-700 font-semibold text-xs flex-1">{task.text}</span>
                      <span className={`${task.tagColor} font-semibold text-[9px]`}>{task.tag}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#1a1b41] to-[#2a2991] rounded-2xl p-6 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-blue-300 opacity-20 rounded-full"></div>
                <div className="relative z-10">
                  <p className="text-[10px] font-semibold text-blue-200 mb-1">Resource Spotlight</p>
                  <h3 className="font-semibold text-sm leading-snug">New Hypertension Guidelines for Third Trimester</h3>
                </div>
              </section>
            </div>
          </div>
      </div>
    </div>
  );
}

