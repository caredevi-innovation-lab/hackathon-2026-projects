import React, { useEffect, useState } from 'react';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchHealth } from '../../api.js';

// SVGs
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
);
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current"><path d="M4 4h3l2-2h6l2 2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
);
const AsteriskIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-current"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-500 fill-current"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
);
const TranslateOutlineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-500 fill-current"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);
const EmptyCircleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-200 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
);

export default function SettingsPage() {
  const { user } = useAuth();
  const [latestRecord, setLatestRecord] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const records = await fetchHealth();
        if (records.length > 0) {
          setLatestRecord(records[0]);
        }
      } catch (err) {
        console.error('Failed to load health records for settings', err);
      }
    }
    loadData();
  }, []);

  const age = latestRecord?.age || 26;

  return (
    <div className="flex h-screen bg-[#fcfbfe] font-sans overflow-hidden">
      <PatientSideBar />
      
      <div className="flex-1 flex flex-col overflow-y-auto relative w-full">
        
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-4 md:px-8 border-b border-indigo-50/50 bg-white shadow-sm z-10 sticky top-0">
          <h2 className="text-lg font-bold text-indigo-600">Patient Profile</h2>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center text-xs font-bold text-slate-400 gap-1.5 border-r border-slate-200 pr-6">
              <button className="text-indigo-600">EN</button>
              <span>|</span>
              <button className="hover:text-indigo-600 transition-colors">NE</button>
            </div>
            
            <button className="hover:opacity-80 transition-opacity">
              <BellIcon />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 overflow-hidden shadow-sm flex items-center justify-center text-indigo-700 font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'Patient'}</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">Patient ID: #{user?.id?.substring(0, 4) || '8821'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-8 max-w-5xl mx-auto w-full pb-12">
          
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Profile Info Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors">
                  <CameraIcon />
                </button>
              </div>
              
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{user?.name || 'Patient User'}</h3>
                <p className="text-sm font-medium text-slate-500 mb-5">{user?.email || 'patient@maternova.com'}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  <div className="bg-indigo-50/70 rounded-xl px-5 py-3 w-[120px] sm:w-32 border border-indigo-50">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Age</p>
                    <p className="font-bold text-indigo-800">{age} Years</p>
                  </div>
                  <div className="bg-pink-50/70 rounded-xl px-5 py-3 w-[140px] sm:w-40 border border-pink-50">
                    <p className="text-[10px] font-bold text-pink-600 uppercase tracking-widest mb-1">Status</p>
                    <p className="font-bold text-pink-800">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <AsteriskIcon />
                <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">Emergency Contact</h3>
              </div>
              
              <h4 className="font-bold text-slate-800 text-base mb-1">Rajesh Thapa</h4>
              <p className="text-xs font-medium text-slate-500 mb-4">Spouse / Husband</p>
              
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <PhoneIcon />
                </div>
                <span className="font-bold text-slate-700 text-sm tracking-wide">+977 984-1234567</span>
              </div>
              
              <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                Edit Emergency Info
              </button>
            </div>
            
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Security Settings Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <LockIcon />
                <h3 className="text-base font-bold text-slate-800">Security Settings</h3>
              </div>

              <div className="flex flex-col gap-4">
                {/* Password */}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">Password</p>
                    <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                  </div>
                  <button className="px-5 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-50 transition-colors">
                    Update
                  </button>
                </div>

                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">Two-Factor Auth</p>
                    <p className="text-xs text-slate-500">Secure your account with SMS</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                  </button>
                </div>

                {/* Biometric Login */}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">Biometric Login</p>
                    <p className="text-xs text-slate-500">Use Face ID or Touch ID</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Language & Tips */}
            <div className="flex flex-col gap-6">
              
              {/* Language Preference */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100">
                <div className="flex items-center gap-2 mb-5">
                  <TranslateOutlineIcon />
                  <h3 className="text-sm font-bold text-slate-800">Language Preference</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* English Selected */}
                  <div className="flex items-center justify-between p-3 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">EN</div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">English</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">System primary language</p>
                      </div>
                    </div>
                    <CheckCircleIcon />
                  </div>

                  {/* Nepali Unselected */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">NE</div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">नेपाली (Nepali)</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">प्रणाली प्राथमिक भाषा</p>
                      </div>
                    </div>
                    <EmptyCircleIcon />
                  </div>
                </div>
              </div>

              {/* Weekly Tip Card */}
              <div className="bg-[#4338ca] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="relative z-10">
                  <h3 className="text-sm font-bold mb-2">Weekly Tip</h3>
                  <p className="text-xs text-indigo-100 leading-relaxed pr-2">
                    You're in Week 24! Baby is now growing hair and responding to sounds outside the womb.
                  </p>
                </div>
                <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold transition-colors self-start relative z-10 backdrop-blur-sm">
                  View Daily Guide
                </button>

                {/* Baby Face Watermark */}
                <div className="absolute -bottom-4 -right-4 w-28 h-28 opacity-[0.07] pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-10.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm5 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Area */}
          <div className="pt-6 border-t border-slate-200 mt-2 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Personal Data Management</h3>
              <p className="text-xs text-slate-500 font-medium">Download your medical history or manage account data.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                Export Records
              </button>
              <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#b91c1c] hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors">
                Deactivate Account
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
