import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/DoctorSideBar";

export default function FinalizeRecord() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] font-sans text-gray-800">
      <SideBar />
      <div className="flex-1 flex flex-col pb-12 overflow-x-hidden relative">
        
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[#2c31c4] rounded-b-[40px] z-0"></div>

        {/* Content */}
        <main className="max-w-[800px] w-full mx-auto px-6 pt-20 flex flex-col gap-6 z-10">
          
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#2c31c4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Finalize Medical Record</h1>
            <p className="text-gray-500 max-w-md leading-relaxed mb-8">
              You are about to cryptographically sign and finalize the health record for 
              <strong className="text-gray-800"> Elena Rostova (#99281-RT)</strong>. 
              Once finalized, this record cannot be altered and will be permanently synced to the central server.
            </p>

            {/* Signature Box */}
            <div className="w-full max-w-md bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 mb-8 text-left">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Electronic Signature</label>
              <div className="h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-gray-400 italic text-sm">Click here to draw or type your signature</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <button 
                onClick={() => navigate(-1)} 
                className="w-full px-6 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => navigate('/patient-records')} 
                className="w-full px-6 py-3.5 bg-[#2c31c4] hover:bg-blue-800 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sign & Submit
              </button>
            </div>

          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 font-medium">Secured by MedPro Enterprise End-to-End Encryption</p>
          </div>

        </main>
      </div>
    </div>
  );
}
