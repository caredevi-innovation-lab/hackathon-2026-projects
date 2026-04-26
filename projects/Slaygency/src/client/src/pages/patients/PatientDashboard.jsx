import React from 'react';
import PatientSideBar from '../../components/PatientSideBar.jsx';
import ironImg from '../../assets/images/iron.png';
import sidenapImg from '../../assets/images/sidenap.png';
import walkImg from '../../assets/images/walk.png';

// SVG Icons
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
);
const TranslateIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg>
);
const HeartOutlineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
);
const SmileIcon = () => (
  <svg viewBox="0 0 24 24" className="w-24 h-24 text-slate-100 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-10.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm5 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-600 font-bold" stroke="currentColor" strokeWidth="3" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);
const BPIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-500 fill-current"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-13h-2v4H8v2h3v4h2v-4h3v-2h-3V7z" /></svg>
);
const WeightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /><path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
);
const SugarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
);

export default function PatientDashboard() {
  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />

      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {/* Chat Bubble Fab */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
        </button>

        {/* Header */}
        <header className="flex justify-between items-center py-4 px-8 bg-white border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border-r border-slate-200 pr-6">
              <button className="text-indigo-600">EN</button>
              <span>|</span>
              <button className="hover:text-indigo-600">NE</button>
            </div>

            <button className="hover:opacity-80 transition-opacity"><BellIcon /></button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-slate-100">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-tight">Sunita Rai</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">Patient ID: #8821</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 w-full">

          {/* Top Title & Button */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-indigo-600 font-semibold text-sm mb-1">My Journey</h3>
              <h1 className="text-2xl font-bold text-slate-800">Feeling Great Today!</h1>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2">
              <span className="flex items-center justify-center bg-white/20 rounded-full w-5 h-5"><span className="text-sm">+</span></span>
              Log Health Data
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Journey Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute right-8 top-12 opacity-80 pointer-events-none">
                <SmileIcon />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">Week 28 of 40</span>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5">Due Date</p>
                  <p className="text-indigo-600 font-bold text-xl">Sept 12, 2024</p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-1">Third Trimester</h2>
              <p className="text-slate-500 text-sm mb-8">Your baby is the size of an <span className="text-indigo-600 font-bold">eggplant</span>.</p>

              {/* Progress Bar */}
              <div className="mb-6 relative">
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: '70%' }}></div>
                </div>
                {/* Heart marker */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[70%] -translate-x-1/2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <HeartOutlineIcon />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Baby Weight</p>
                  <p className="font-bold text-slate-800 text-lg">~ 1.1 kg</p>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Baby Length</p>
                  <p className="font-bold text-slate-800 text-lg">~ 37.6 cm</p>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Heart Rate</p>
                  <p className="font-bold text-slate-800 text-lg">144 bpm</p>
                </div>
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <h3 className="text-[11px] font-bold text-slate-400 mb-6 self-start w-full text-center">Health Safety Score</h3>

              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                    transform="rotate(-225 18 18)"
                  />
                  {/* Foreground Circle - Green */}
                  <path
                    className="text-green-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray="20, 100"
                    strokeLinecap="round"
                    transform="rotate(-225 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 leading-none">15</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1">Risk Level</span>
                </div>
              </div>

              <div className="bg-green-50 text-green-700 font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1.5 mb-4">
                <CheckIcon /> Low Risk Profile
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Based on your recent BP (110/70) and symptoms, you're tracking perfectly.
              </p>
            </div>
          </div>

          {/* Personal Health Tips */}
          <h3 className="text-lg font-bold text-slate-800 mb-4">Personal Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group cursor-pointer">
              <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                <img src={ironImg} alt="Nutrition" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Nutrition</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Boost your iron intake</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Adding spinach and lentils to your lunch helps support baby's brain development.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                <img src={sidenapImg} alt="Rest" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-3 left-3 bg-indigo-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Rest</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">The 'Left-Side' Nap</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Sleeping on your left side improves circulation to the placenta and baby.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                <img src={walkImg} alt="Exercise" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Exercise</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">15-Min Morning Walk</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Gentle movement helps manage swelling and boosts your natural energy levels.</p>
            </div>
          </div>

          {/* Recent Vitals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-800">Recent Vitals</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">View History ›</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-100">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <BPIcon />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400">Blood Pressure</p>
                  <p className="text-lg font-bold text-slate-800">110/70 <span className="text-xs font-medium text-emerald-500 ml-1">Normal</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <WeightIcon />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400">Weight</p>
                  <p className="text-lg font-bold text-slate-800">64.5 kg <span className="text-xs font-medium text-slate-400 ml-1">+2kg trend</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <SugarIcon />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400">Blood Sugar</p>
                  <p className="text-lg font-bold text-slate-800">92 mg/dL <span className="text-xs font-medium text-emerald-500 ml-1">Stable</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-current"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400">Heart Rate</p>
                  <p className="text-lg font-bold text-slate-800">82 bpm <span className="text-xs font-medium text-emerald-500 ml-1">Healthy</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center pb-8 pt-4">
            <p className="text-xs text-slate-400 mb-2">&copy; 2024 MaterNova - Secure Maternal Portal</p>
            <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <button className="hover:text-slate-800">Privacy Policy</button>
              <button className="hover:text-slate-800">Emergency Support</button>
              <button className="hover:text-slate-800">Doctor Hotline</button>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
