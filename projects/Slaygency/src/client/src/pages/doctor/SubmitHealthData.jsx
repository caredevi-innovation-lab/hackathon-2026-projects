import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorSideBar from '../../components/DoctorSideBar.jsx';

export default function SubmitHealthData() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] font-sans text-gray-800">
      <DoctorSideBar />
      
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Top Navbar */}
        <header className="h-[72px] bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {/* Title removed per request */}
          </div>

          <div className="flex items-center gap-6">
            {/* New Consultation button removed per request */}
            <div className="flex items-center gap-4 text-gray-500">
              <button className="hover:text-[#4039e6] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="hover:text-[#4039e6] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
              <button className="hover:text-[#4039e6] transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                   </svg>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6">
            
            {/* Top Patient Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className="w-20 h-20 bg-teal-900 rounded-2xl overflow-hidden flex items-end justify-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor&backgroundColor=0f766e" alt="Patient" className="w-16 h-16" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#be2e2e] text-white text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap shadow-sm">
                    High Risk
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900 mb-2">Eleanor Vance</h2>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      ID: 482-119-204
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      54 Years (Female)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      O+
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 md:gap-12 pl-4 md:border-l border-gray-100">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Latest BP</p>
                  <p className="text-2xl font-semibold text-[#be2e2e]">142/91</p>
                  <p className="text-xs text-gray-400 mt-1">mmHg</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Glucose</p>
                  <p className="text-2xl font-semibold text-gray-800">104</p>
                  <p className="text-xs text-gray-400 mt-1">mg/dL</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">BMI</p>
                  <p className="text-2xl font-semibold text-gray-800">28.4</p>
                  <p className="text-xs text-gray-400 mt-1">Overweight</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column (Trends & History) */}
              <div className="xl:col-span-2 flex flex-col gap-6">
                
                {/* Vital Trends */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Vital Trends (6 Months)</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#4039e6]"></div>
                        <span className="text-xs text-gray-500 font-semibold">Heart Rate</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#be2e2e]"></div>
                        <span className="text-xs text-gray-500 font-semibold">Blood Pressure</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Placeholder (SVG Curve) */}
                  <div className="h-48 w-full relative">
                    {/* Y-axis grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-b border-gray-50 h-0"></div>
                      <div className="border-b border-gray-50 h-0"></div>
                      <div className="border-b border-gray-50 h-0"></div>
                      <div className="border-b border-gray-50 h-0"></div>
                    </div>
                    {/* SVG Chart */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Gradient for blue area */}
                      <defs>
                        <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#4039e6" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#4039e6" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0,80 Q20,80 40,50 T80,30 T100,50 L100,100 L0,100 Z" fill="url(#blueGradient)" />
                      {/* Blue Line (Heart Rate) */}
                      <path d="M0,80 Q20,80 40,50 T80,30 T100,50" fill="none" stroke="#4039e6" strokeWidth="2" />
                      {/* Red Line (Blood Pressure) */}
                      <path d="M0,50 Q20,30 40,60 T80,80 T100,20" fill="none" stroke="#be2e2e" strokeWidth="2" strokeDasharray="4 2" />
                    </svg>
                    {/* X-axis labels */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-gray-400 font-semibold uppercase">
                      <span>MAY</span>
                      <span>JUN</span>
                      <span>JUL</span>
                      <span>AUG</span>
                      <span>SEP</span>
                      <span>OCT</span>
                    </div>
                  </div>
                </div>

                {/* Encounter History */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Encounter History</h3>
                    <button className="flex items-center gap-1.5 text-[#4039e6] text-xs font-semibold hover:underline">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter
                    </button>
                  </div>

                  <div className="flex flex-col gap-0 relative">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100 z-0"></div>

                    {/* Timeline Item 1 */}
                    <div className="flex items-start gap-4 mb-8 relative z-10">
                      <div className="w-4 h-4 rounded-full border-2 border-[#4039e6] bg-white flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm">General Consultation</h4>
                          <span className="text-xs text-gray-400 font-medium">14 Oct 2023</span>
                        </div>
                        <p className="text-sm text-gray-500 italic mb-3">"Patient reports increased shortness of breath during light physical activity. BP remains elevated despite medication adherence."</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[9px] font-semibold uppercase tracking-wider rounded">Follow-Up</span>
                          <span className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[9px] font-semibold uppercase tracking-wider rounded">Cardiology</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Item 2 */}
                    <div className="flex items-start gap-4 mb-8 relative z-10">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm">Laboratory Screening</h4>
                          <span className="text-xs text-gray-400 font-medium">22 Aug 2023</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Routine blood panel and lipid profile. Results indicated borderline high LDL.</p>
                      </div>
                    </div>

                    {/* Timeline Item 3 */}
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm">Initial Assessment</h4>
                          <span className="text-xs text-gray-400 font-medium">05 Jan 2023</span>
                        </div>
                        <p className="text-sm text-gray-500">Comprehensive health evaluation. Family history of cardiovascular disease noted.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images Row */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  <div className="w-48 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=200&h=120" alt="X-Ray" className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 mb-0.5">Chest X-Ray PA View</p>
                      <p className="text-[10px] text-gray-400 font-medium">12 Oct 2023</p>
                    </div>
                  </div>
                  <div className="w-48 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=200&h=120" alt="Blood Smear" className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 mb-0.5">Peripheral Blood Smear</p>
                      <p className="text-[10px] text-gray-400 font-medium">14 Oct 2023</p>
                    </div>
                  </div>
                  <div className="w-48 h-[148px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-500">Upload Images</span>
                  </div>
                </div>

              </div>

              {/* Right Column (Meds & Labs) */}
              <div className="flex flex-col gap-6">
                
                {/* Active Medications */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-6">Active Medications</h3>
                  
                  <div className="flex flex-col gap-3">
                    {/* Med 1 */}
                    <div className="bg-[#f8f9fe] rounded-xl p-4 flex flex-col gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">Lisinopril 20mg</h4>
                        <p className="text-xs text-gray-500">1 tablet daily in morning</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#4039e6] text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">Hypertension</span>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Refills: 2</span>
                      </div>
                    </div>
                    {/* Med 2 */}
                    <div className="bg-[#fff1f5] rounded-xl p-4 flex flex-col gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">Metformin 500mg</h4>
                        <p className="text-xs text-gray-500">2 tablets with dinner</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#ff4d6d] text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">Diabetes</span>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Refills: 5</span>
                      </div>
                    </div>
                    {/* Med 3 */}
                    <div className="bg-[#fff8f0] rounded-xl p-4 flex flex-col gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">Atorvastatin 40mg</h4>
                        <p className="text-xs text-gray-500">1 tablet before bed</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#fb8500] text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">Cholesterol</span>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Refills: 0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Lab Results */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
                  <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-6">Critical Lab Results</h3>
                  
                  <div className="flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="py-3 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Test Name</th>
                          <th className="py-3 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Value</th>
                          <th className="py-3 text-[10px] text-gray-400 font-semibold uppercase tracking-wider text-right">Ref. Range</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-700">Hemoglobin (Hb)</td>
                          <td className="py-3 font-semibold text-[#be2e2e] flex items-center gap-1">
                            11.2
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                          </td>
                          <td className="py-3 text-gray-400 text-right">12.0 - 15.5</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-700">LDL Cholesterol</td>
                          <td className="py-3 font-semibold text-[#be2e2e] flex items-center gap-1">
                            162
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                          </td>
                          <td className="py-3 text-gray-400 text-right">&lt; 100</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-700">Creatinine</td>
                          <td className="py-3 font-semibold text-gray-800">0.9</td>
                          <td className="py-3 text-gray-400 text-right">0.6 - 1.1</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-700">Potassium</td>
                          <td className="py-3 font-semibold text-gray-800">4.2</td>
                          <td className="py-3 text-gray-400 text-right">3.5 - 5.1</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-gray-700">HbA1c</td>
                          <td className="py-3 font-semibold text-[#be2e2e]">6.8%</td>
                          <td className="py-3 text-gray-400 text-right">&lt; 5.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button className="w-full mt-6 py-2.5 bg-[#f4f6ff] text-[#4039e6] rounded-lg text-sm font-semibold hover:bg-[#e8ebff] transition-colors">
                    View Full Laboratory Report
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-400 font-medium">© 2023 MedPulse Health Systems. All clinical data encrypted and HIPAA compliant.</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Language:</span>
                <button className="text-xs font-semibold text-gray-800 px-2 py-1 border border-gray-200 rounded">ENGLISH</button>
                <button className="text-xs font-semibold text-gray-500 px-2 py-1 hover:text-gray-800 transition-colors">नेपाली</button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
