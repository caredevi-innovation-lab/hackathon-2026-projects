import React from 'react';
import PatientSideBar from '../../components/PatientSideBar.jsx';

export default function PatientHealthReport() {
  return (
    <div className="flex h-screen bg-[#f3f4fb] font-sans overflow-hidden">
      <PatientSideBar />
      
      <div className="flex-1 flex flex-col overflow-y-auto p-8 items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Health Reports</h2>
          <p className="text-slate-500 mb-6">Your comprehensive health reports will appear here once your recent lab results are fully processed.</p>
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
            Check for Updates
          </button>
        </div>
      </div>
    </div>
  );
}
