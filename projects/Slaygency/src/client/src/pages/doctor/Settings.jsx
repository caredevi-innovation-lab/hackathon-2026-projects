import React, { useState } from 'react';
import DoctorSideBar from '../../components/DoctorSideBar.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export default function Settings() {
  const { user } = useAuth();

  // Profile state
  const [fullName, setFullName] = useState(user?.name || 'Dr. Aris Thorne');
  const [email, setEmail] = useState(user?.email || 'aris.thorne@careportal');
  const [specialization, setSpecialization] = useState('Senior Clinician - Internal Medicine');
  const [language, setLanguage] = useState('en-US');

  // Notification toggles
  const [notifications, setNotifications] = useState({
    urgentAlerts: true,
    labResults: true,
    maintenance: false,
    dailySummary: true,
  });
  const [receiveEmail, setReceiveEmail] = useState(true);
  const [receiveSMS, setReceiveSMS] = useState(false);

  // Security
  const [twoFactor, setTwoFactor] = useState(true);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle component
  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? 'bg-[#5348ff]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] font-sans text-gray-800">
      <DoctorSideBar />

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Top Navbar */}
        <header className="h-[72px] bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Settings</h1>
          <div className="flex items-center gap-5">
            <button className="relative hover:text-[#5348ff] text-gray-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user?.name || 'Dr. Julianne Smith'}</p>
                <p className="text-[11px] text-gray-400">{user?.role || 'Cardiologist'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#312e81] to-[#4338ca] overflow-hidden flex items-end justify-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julianne&backgroundColor=312e81"
                  alt="User"
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-x-hidden overflow-y-auto">
          <div className="max-w-[1100px] mx-auto w-full flex flex-col gap-6">

            {/* ── Top Row: Profile + Help/Status ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Profile Settings (left, wider) */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Profile Settings</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Manage your professional identity and public information.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#5348ff] to-[#6c5ce7] shadow-[0_4px_14px_rgba(83,72,255,0.3)] hover:shadow-[0_6px_20px_rgba(83,72,255,0.45)] hover:translate-y-[-1px] transition-all duration-200">
                    Save Changes
                  </button>
                </div>

                <div className="flex items-start gap-5 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] overflow-hidden flex items-end justify-center shadow-md flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=ArisThorne&backgroundColor=1e3a5f"
                      alt="Profile"
                      className="w-14 h-14"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    <div>
                      <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">Specialization</label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-[#fafbff] focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 focus:border-[#5348ff] transition-all duration-200"
                  />
                </div>

                {/* Localization */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Localization</h3>
                  <div className="flex items-center justify-between bg-[#fafbff] rounded-xl px-4 py-3 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#eef0ff] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#5348ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">System Language</p>
                        <p className="text-[11px] text-gray-400">Choose your preferred language for the interface</p>
                      </div>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#5348ff]/20 cursor-pointer"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="ne-NP">नेपाली</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right column: Help + System Status */}
              <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Help & Support */}
                <div className="bg-gradient-to-br from-[#5348ff] to-[#6c5ce7] rounded-2xl p-6 shadow-[0_8px_24px_rgba(83,72,255,0.25)] text-white">
                  <h3 className="text-lg font-bold mb-2">Help & Support</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">
                    Need assistance? Access our documentation or speak with technical support.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-semibold transition-colors duration-200">
                      Documentation
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-xl bg-white text-[#5348ff] text-sm font-bold hover:bg-white/90 transition-colors duration-200">
                      Report an Issue
                    </button>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                  <h4 className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-3">System Status</h4>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-600">All systems operational</span>
                  </div>
                  <p className="text-xs text-gray-400">Version 2.4.1 (Stable Build)</p>
                </div>
              </div>
            </div>

            {/* ── Bottom Row: Notifications + Security ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Notification Preferences */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 rounded-lg bg-[#eef0ff] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#5348ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </span>
                  Notification Preferences
                </h3>

                <div className="flex flex-col gap-0">
                  {/* Urgent Alerts */}
                  <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Urgent Patient Alerts</p>
                      <p className="text-[11px] text-gray-400">Critical changes in patient status</p>
                    </div>
                    <Toggle enabled={notifications.urgentAlerts} onToggle={() => toggleNotification('urgentAlerts')} />
                  </div>

                  {/* Lab Results */}
                  <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">New Lab Results</p>
                      <p className="text-[11px] text-gray-400">When results are uploaded to system</p>
                    </div>
                    <Toggle enabled={notifications.labResults} onToggle={() => toggleNotification('labResults')} />
                  </div>

                  {/* Maintenance */}
                  <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">System Maintenance</p>
                      <p className="text-[11px] text-gray-400">Scheduled downtime and updates</p>
                    </div>
                    <Toggle enabled={notifications.maintenance} onToggle={() => toggleNotification('maintenance')} />
                  </div>

                  {/* Daily Summary */}
                  <div className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Daily Summary</p>
                      <p className="text-[11px] text-gray-400">End-of-day activity report</p>
                    </div>
                    <Toggle enabled={notifications.dailySummary} onToggle={() => toggleNotification('dailySummary')} />
                  </div>
                </div>

                {/* Receive via checkboxes */}
                <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setReceiveEmail(!receiveEmail)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        receiveEmail ? 'bg-[#5348ff] border-[#5348ff]' : 'border-gray-300 bg-white group-hover:border-[#5348ff]/50'
                      }`}
                    >
                      {receiveEmail && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Receive via Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setReceiveSMS(!receiveSMS)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        receiveSMS ? 'bg-[#5348ff] border-[#5348ff]' : 'border-gray-300 bg-white group-hover:border-[#5348ff]/50'
                      }`}
                    >
                      {receiveSMS && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Receive via SMS</span>
                  </label>
                </div>
              </div>

              {/* Security & Privacy */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(83,72,255,0.06)] border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 rounded-lg bg-[#eef0ff] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#5348ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  Security &amp; Privacy
                </h3>

                {/* Password */}
                <div className="mb-5">
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">Password</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="password"
                      value="••••••••••"
                      readOnly
                      className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-[#fafbff]"
                    />
                    <button className="text-[#5348ff] text-sm font-bold hover:underline transition-all">Change</button>
                  </div>
                </div>

                {/* Two-Factor */}
                <div className="flex items-center justify-between py-3 px-4 bg-[#fafbff] rounded-xl border border-gray-100 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Two-Factor Authentication</p>
                    <p className="text-[11px] text-gray-400">Highly recommended for clinician accounts</p>
                  </div>
                  <Toggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
                </div>

                {/* Active Sessions */}
                <div>
                  <h4 className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-3">Active Sessions</h4>
                  <div className="flex flex-col gap-3">
                    {/* Session 1 */}
                    <div className="flex items-center justify-between py-3 px-4 bg-[#fafbff] rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Windows PC • Chrome</p>
                          <p className="text-[11px] text-gray-400">Kathmandu, Nepal • Current Session</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">Active</span>
                    </div>

                    {/* Session 2 */}
                    <div className="flex items-center justify-between py-3 px-4 bg-[#fafbff] rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">iPhone 14 Pro • App</p>
                          <p className="text-[11px] text-gray-400">Lalitpur, Nepal • 2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="mt-4 pt-5 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3 pb-6">
              <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                <span className="hover:text-[#5348ff] cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-[#5348ff] cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-[#5348ff] cursor-pointer transition-colors">Cookie Settings</span>
              </div>
              <p className="text-xs text-gray-400">© 2024 Aama CarePortal. All healthcare data is encrypted.</p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
