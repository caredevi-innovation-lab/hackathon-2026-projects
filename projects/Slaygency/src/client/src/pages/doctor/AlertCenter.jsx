import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/DoctorSideBar";

const initialAlerts = [
  {
    id: 1,
    title: 'Sudden BP Elevation',
    patient: 'Sarah Jenkins',
    patientId: '4429',
    details: 'Reading: 185/110 mmHg',
    badge: 'IMMEDIATE ACTION',
    badgeColor: 'bg-[#be2e2e]',
    textColor: 'text-[#be2e2e]',
    titleColor: 'text-[#be2e2e]',
    bgColor: 'from-[#fff3f3] to-[#fffbfb]',
    borderColor: 'border-[#ffe0e0]',
    iconBgColor: 'bg-[#ffe0e0]',
    accentColor: 'bg-[#be2e2e]',
    iconPath: <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />,
    buttonColor: 'bg-[#be2e2e] hover:bg-red-800',
    disabled: false
  },
  {
    id: 2,
    title: 'Lab Results Ready',
    patient: 'Marcus Thorne',
    patientId: '',
    details: 'Panel: Comprehensive Metabolic (CMP)',
    badge: 'PENDING REVIEW',
    badgeColor: 'bg-[#3b41c5]',
    textColor: 'text-[#3b41c5]',
    titleColor: 'text-[#2d3192]',
    bgColor: 'from-[#f5f3ff] to-[#fbfaff]',
    borderColor: 'border-[#e4dcff]',
    iconBgColor: 'bg-[#e4dcff]',
    accentColor: 'bg-[#3b41c5]',
    iconPath: <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />,
    buttonColor: 'bg-[#3b41c5] hover:bg-blue-800',
    disabled: false
  },
  {
    id: 3,
    title: 'Missed Appointment',
    patient: 'Elias Vance',
    patientId: '',
    details: 'Time: 09:30 AM (Cardiology Follow-up)',
    badge: 'FOLLOW-UP NEEDED',
    badgeColor: 'bg-gray-500',
    textColor: 'text-gray-500',
    titleColor: 'text-gray-700',
    bgColor: 'from-[#f9fafb] to-white',
    borderColor: 'border-gray-200',
    iconBgColor: 'bg-gray-100',
    accentColor: 'bg-gray-400',
    iconPath: <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />,
    buttonColor: 'bg-gray-100 text-gray-400 border border-gray-200',
    disabled: true
  }
];

export default function AlertCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [alertsData, setAlertsData] = useState(initialAlerts);

  return (
    <main className="grid min-h-screen bg-[#f8f9fe] font-sans text-gray-800 lg:grid-cols-[228px_minmax(0,1fr)]">
      <SideBar />
      <div className="min-w-0 flex flex-col pb-12 overflow-x-hidden">

        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#f8f9fe] z-10 border-b border-transparent">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-64 md:w-80 ml-4">
              <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patient alerts..."
                className="w-full pl-10 pr-4 py-2 bg-gray-200/50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#5c69e5] outline-none placeholder-gray-500 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="hidden lg:block flex-1"></div>

          <div className="flex items-center justify-end gap-5 flex-1">

            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center border border-gray-400 shadow-sm">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1200px] w-full mx-auto px-6 pt-6 flex flex-col gap-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-[#f8f9fe] py-2">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-widest mb-2 text-[#3b41c5] uppercase">
                CRITICAL MANAGEMENT
              </div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Alerts Center</h1>
              <p className="text-gray-500 text-sm font-medium">
                You have 3 critical patient updates requiring immediate attention.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Alerts
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm shadow-sm transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">

            {/* Left Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* Recent High-Risk Notifications */}
              <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col h-full">

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">
                      PRIORITY QUEUE
                    </div>
                    <h2 className="text-[22px] font-semibold text-gray-800">Recent High-Risk Notifications</h2>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                      <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                    </div>
                    <span className="bg-[#f0eaff] text-[#3b41c5] text-xs font-semibold px-2 py-1 rounded-full">+4</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 flex-1">
                  {alertsData.map((alert) => (
                    <div key={alert.id} className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${alert.bgColor} border ${alert.borderColor} flex flex-col sm:flex-row items-start sm:items-center p-5 pl-7 shadow-sm transition-transform hover:-translate-y-0.5`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.accentColor}`}></div>
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl ${alert.iconBgColor} flex items-center justify-center ${alert.textColor} flex-shrink-0`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            {alert.iconPath}
                          </svg>
                        </div>
                        <div>
                          <h3 className={`font-semibold ${alert.titleColor} text-base mb-1`}>{alert.title}</h3>
                          <p className="text-sm text-gray-600 font-medium mb-2.5">
                            Patient: {alert.patient} {alert.patientId ? `(ID: ${alert.patientId})` : ''} &bull; {alert.details}
                          </p>
                          <span className={`inline-block px-2.5 py-0.5 ${alert.badgeColor} text-white text-[9px] font-semibold uppercase tracking-wider rounded`}>{alert.badge}</span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex flex-row items-center gap-3 w-full sm:w-auto ml-16 sm:ml-0">
                        <button onClick={() => navigate('/submit')} className="px-5 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">View Details</button>
                        <button 
                          onClick={() => setAlertsData(alertsData.filter(a => a.id !== alert.id))}
                          className={`px-5 py-2.5 ${alert.disabled ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' : alert.buttonColor + ' text-white shadow-sm'} font-semibold text-sm rounded-lg transition-colors`}
                          disabled={alert.disabled}
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">

              {/* Alert Distribution */}
              <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(6,81,237,0.05)] border border-gray-100">
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-6">
                  ALERT DISTRIBUTION
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      {/* Administrative (Gray) - 3/12 = 25% */}
                      <path
                        className="text-gray-300"
                        strokeDasharray="25, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      {/* Routine Lab (Blue) - 5/12 = 41.6% */}
                      <path
                        className="text-[#3b41c5]"
                        strokeDasharray="41.6, 100"
                        strokeDashoffset="-25"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      {/* Critical (Red) - 4/12 = 33.3% */}
                      <path
                        className="text-[#be2e2e]"
                        strokeDasharray="33.3, 100"
                        strokeDashoffset="-66.6"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-semibold text-gray-800 leading-none">12</span>
                      <span className="text-[10px] text-gray-400 font-semibold tracking-widest mt-1">TOTAL</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 px-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#be2e2e]"></div>
                      <span className="text-sm font-medium text-gray-700">Critical</span>
                    </div>
                    <span className="font-semibold text-gray-900">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3b41c5]"></div>
                      <span className="text-sm font-medium text-gray-700">Routine Lab</span>
                    </div>
                    <span className="font-semibold text-gray-900">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Administrative</span>
                    </div>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                </div>
              </div>

              {/* Emergency Dispatch */}
              <div className="bg-gradient-to-br from-[#4f56f4] to-[#2c31c4] rounded-2xl p-6 shadow-md text-white">
                <div className="text-[10px] text-blue-200 font-semibold uppercase tracking-widest mb-1.5">
                  EMERGENCY DISPATCH
                </div>
                <h3 className="text-lg font-semibold mb-5">Quick Dial Station</h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex flex-col items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z" />
                    </svg>
                    <span className="text-[11px] font-semibold">ER Desk</span>
                  </button>
                  <button className="flex-1 flex flex-col items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-[11px] font-semibold">Nursing</span>
                  </button>
                </div>
              </div>

              {/* Shift Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(6,81,237,0.05)] border border-gray-100 relative">
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-5">
                  SHIFT OVERVIEW
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1 bg-[#c8ccf7] h-10 rounded-full mt-1"></div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold mb-0.5">Scheduled Appointments</p>
                      <p className="font-semibold text-gray-800 text-[15px]">08 of 14 Completed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1 bg-[#d62828] h-10 rounded-full mt-1"></div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold mb-0.5">Unsigned Charts</p>
                      <p className="font-semibold text-gray-800 text-[15px]">2 Remaining</p>
                    </div>
                  </div>
                </div>

                <button className="absolute bottom-5 right-5 w-12 h-12 bg-[#2c31c4] hover:bg-blue-800 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Section: Alert History */}
          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(6,81,237,0.05)] border border-gray-100 mt-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold text-gray-800">Alert History</h2>
              <button className="text-[#3b41c5] font-semibold text-sm hover:underline flex items-center gap-1">
                View Archive &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 text-[10px] text-gray-400 font-semibold uppercase tracking-widest px-2">TIMESTAMP</th>
                    <th className="pb-4 text-[10px] text-gray-400 font-semibold uppercase tracking-widest px-2">PATIENT</th>
                    <th className="pb-4 text-[10px] text-gray-400 font-semibold uppercase tracking-widest px-2">ALERT TYPE</th>
                    <th className="pb-4 text-[10px] text-gray-400 font-semibold uppercase tracking-widest px-2">ASSIGNED TO</th>
                    <th className="pb-4 text-[10px] text-gray-400 font-semibold uppercase tracking-widest px-2 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-2 text-gray-500 font-medium">Today, 08:45 AM</td>
                    <td className="py-5 px-2 font-semibold text-gray-800">Robert Williams</td>
                    <td className="py-5 px-2 text-gray-600 font-medium">Blood Oxygen Dip</td>
                    <td className="py-5 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#e4dcff] text-[#3b41c5] flex items-center justify-center text-[9px] font-semibold">AT</div>
                        <span className="font-medium text-gray-700">You</span>
                      </div>
                    </td>
                    <td className="py-5 px-2 text-right">
                      <span className="inline-block px-3 py-1 bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-semibold uppercase tracking-wider rounded-full">Resolved</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-2 text-gray-500 font-medium">Today, 07:12 AM</td>
                    <td className="py-5 px-2 font-semibold text-gray-800">Linda Miller</td>
                    <td className="py-5 px-2 text-gray-600 font-medium">EHR Update Required</td>
                    <td className="py-5 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#ffe0e0] text-[#be2e2e] flex items-center justify-center text-[9px] font-semibold">NS</div>
                        <span className="font-medium text-gray-700">Nurse Station</span>
                      </div>
                    </td>
                    <td className="py-5 px-2 text-right">
                      <span className="inline-block px-3 py-1 bg-[#fff8e1] text-[#f57f17] text-[10px] font-semibold uppercase tracking-wider rounded-full">In Progress</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </main>
  );
}
