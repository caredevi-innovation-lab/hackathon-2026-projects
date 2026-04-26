import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/DoctorSideBar";

export default function PreviewPDF() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <SideBar />
      <div className="flex-1 flex flex-col pb-12 overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="font-semibold text-gray-800 text-lg">Document Preview</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-md transition-colors flex items-center gap-2 border border-gray-300 shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Document
            </button>
            <button onClick={() => navigate('/finalize-record')} className="px-5 py-2 bg-[#2c31c4] hover:bg-blue-800 text-white font-semibold text-sm rounded-md shadow-md transition-colors">
              Proceed to Sign
            </button>
          </div>
        </header>

        {/* PDF Container */}
        <main className="w-full flex justify-center pt-10 pb-20 px-4">
          
          {/* "A4 Paper" element */}
          <div className="bg-white w-full max-w-[850px] min-h-[1100px] shadow-2xl p-12 lg:p-16 relative">
            
            {/* Letterhead */}
            <div className="border-b-2 border-gray-800 pb-8 mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-gray-900 tracking-tight">MedPro Regional Hospital</h2>
                <p className="text-sm text-gray-600 mt-2">124 Healthcare Ave, Medical District &bull; (555) 019-8273</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 uppercase tracking-widest text-xs mb-1">Official Medical Record</p>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Patient Info Block */}
            <div className="bg-gray-50 border border-gray-200 p-5 mb-8 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Patient Name</p>
                  <p className="text-lg font-semibold text-gray-900">Elena Rostova</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Patient ID</p>
                  <p className="text-lg font-medium text-gray-800">#99281-RT</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Date of Birth</p>
                  <p className="text-base font-medium text-gray-800">Oct 12, 1994 (31 yrs)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Attending Physician</p>
                  <p className="text-base font-semibold text-gray-900">Dr. Sarah Jenkins</p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              
              <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">Clinical Observations</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  Patient presented for standard prenatal screening. Patient reports mild fatigue and occasional morning nausea, consistent with early second-trimester symptoms. No signs of irregular bleeding or severe abdominal pain. Fetal movement is reported as consistent. Patient was advised to maintain current hydration levels and continue prenatal vitamin regimen.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">Vital Signs</h3>
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 text-gray-600 font-medium w-1/3">Blood Pressure</td>
                      <td className="py-2 text-gray-900 font-semibold">120/80 mmHg</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 text-gray-600 font-medium">Fetal Heart Rate</td>
                      <td className="py-2 text-gray-900 font-semibold">140 BPM</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 text-gray-600 font-medium">Hemoglobin (Hb)</td>
                      <td className="py-2 text-gray-900 font-semibold">12.5 g/dL</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">Prescribed Medications</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Folic Acid (5mg)</strong> - Once daily, Oral. Duration: 30 Days.</li>
                  <li><strong>Prenatal Multivitamins</strong> - Once daily, Oral. Duration: 60 Days.</li>
                </ul>
              </section>

            </div>

            {/* Signature Block - fixed to bottom of page */}
            <div className="absolute bottom-16 right-16 w-64 text-center">
              <div className="border-b border-gray-400 h-16 mb-2 flex items-end justify-center">
                <span className="italic text-gray-300">electronically signed</span>
              </div>
              <p className="font-semibold text-gray-900">Dr. Sarah Jenkins</p>
              <p className="text-xs text-gray-500">License: MED-77421</p>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
