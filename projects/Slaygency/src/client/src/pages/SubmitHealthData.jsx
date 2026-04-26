import SideBar from "../components/DoctorSideBar";

export default function SubmitHealthData() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fe] font-sans text-gray-800">
      <SideBar />
      <div className="flex-1 flex flex-col pb-12 overflow-x-hidden">
        {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-64">
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search patient or record..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100/70 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 font-medium"
            />
          </div>
        </div>
        
        <nav className="flex items-center justify-center gap-8 flex-1">
          <a href="#" className="text-sm font-bold text-gray-800">Schedules</a>
          <a href="#" className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Reports</a>
          <a href="#" className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Resources</a>
        </nav>
        
        <div className="flex items-center justify-end gap-5 flex-1">
          <button className="px-5 py-2 bg-[#be2e2e] hover:bg-red-700 text-white text-xs font-bold rounded-md shadow-sm transition-colors">
            Emergency Protocol
          </button>
          <button className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-300">
             <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
             </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1100px] w-full mx-auto px-6 pt-8 flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest mb-3">
              <span className="text-gray-400">PATIENT RECORDS</span>
              <span className="text-gray-300">/</span>
              <span className="text-[#5c69e5]">NEW ENTRY</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Submit Health Record</h1>
            <p className="text-gray-500 text-sm">
              Patient: <span className="font-bold text-gray-700">Elena Rostova</span> &bull; PID: #99281-RT
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="px-6 py-2.5 bg-[#e9ebf0] hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-sm transition-colors">
              Discard
            </button>
            <button className="px-6 py-2.5 bg-[#2c31c4] hover:bg-blue-800 text-white font-bold rounded-lg text-sm shadow-md transition-colors">
              Save Record
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* Clinical Notes */}
            <div className="bg-white rounded-2xl p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col min-h-[380px]">
              <div className="flex items-center gap-2.5 mb-5 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
                <svg className="w-4 h-4 text-[#5c69e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Clinical Notes
              </div>
              
              {/* Toolbar */}
              <div className="flex items-center gap-5 border-b border-gray-100 pb-3 mb-4 px-1">
                <button className="text-gray-800 font-extrabold hover:text-blue-600 transition-colors text-sm">B</button>
                <button className="text-gray-800 italic font-bold hover:text-blue-600 transition-colors text-sm">I</button>
                <button className="text-gray-800 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="text-gray-800 font-bold hover:text-blue-600 transition-colors text-sm flex items-center gap-1">
                  <span className="font-serif">A</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <textarea 
                className="w-full flex-1 resize-y outline-none text-gray-600 placeholder-gray-300 font-medium text-[15px] leading-relaxed"
                placeholder="Describe the patient's current condition, complaints, and physician observations..."
              ></textarea>
            </div>

            {/* Prescribed Medications */}
            <div className="bg-white rounded-2xl p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
                  <svg className="w-4 h-4 text-[#a0522d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Prescribed Medications
                </div>
                <button className="flex items-center gap-1.5 text-[#2c31c4] font-bold text-sm hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4 bg-[#2c31c4] text-white rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Med
                </button>
              </div>
              
              {/* Added Med */}
              <div className="border border-gray-100 rounded-xl p-4 px-5 mb-4 flex items-center justify-between hover:border-gray-200 transition-colors bg-white shadow-sm">
                <div>
                  <h4 className="font-bold text-gray-800 text-[15px]">Folic Acid (5mg)</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Once daily, Oral</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">DURATION</p>
                    <p className="text-sm font-bold text-gray-700">30 Days</p>
                  </div>
                  <button className="w-8 h-8 bg-gray-100 hover:bg-red-50 rounded flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add Med Form */}
              <div className="border-[1.5px] border-dashed border-[#d8cfff] bg-[#f8f6ff] rounded-xl p-2 pl-4 flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Medication Name" 
                  className="flex-1 bg-transparent border-none text-sm outline-none placeholder-gray-400 text-gray-700 font-medium" 
                />
                <input 
                  type="text" 
                  placeholder="Dosage" 
                  className="w-24 bg-transparent border-none text-sm outline-none placeholder-gray-400 text-gray-700 font-medium" 
                />
                <button className="px-6 py-2.5 bg-[#e4dcff] hover:bg-[#d0c4fa] text-[#4f3bd6] text-[11px] font-bold rounded-lg transition-colors tracking-wider uppercase">
                  Confirm
                </button>
              </div>
            </div>

          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Vitals Entry */}
            <div className="bg-white rounded-2xl p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100">
              <div className="flex items-center gap-2.5 mb-6 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
                <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Vitals Entry
              </div>
              
              <div className="flex flex-col gap-5">
                {/* BP */}
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Blood Pressure (SYS/DIA)</label>
                  <div className="flex items-center gap-3">
                    <input type="text" defaultValue="120/80" className="flex-1 bg-[#f8f6ff] border border-[#f0eaff] rounded-lg px-4 py-3 text-gray-600 font-semibold text-sm outline-none focus:border-purple-300 transition-colors shadow-inner" />
                    <span className="text-gray-400 text-[13px] font-bold w-12">mmHg</span>
                  </div>
                </div>
                {/* HR */}
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Fetal Heart Rate</label>
                  <div className="flex items-center gap-3">
                    <input type="text" defaultValue="140" className="flex-1 bg-[#f8f6ff] border border-[#f0eaff] rounded-lg px-4 py-3 text-gray-600 font-semibold text-sm outline-none focus:border-purple-300 transition-colors shadow-inner" />
                    <span className="text-gray-400 text-[13px] font-bold w-12">BPM</span>
                  </div>
                </div>
                {/* HB */}
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Hemoglobin (Hb)</label>
                  <div className="flex items-center gap-3">
                    <input type="text" defaultValue="12.5" className="flex-1 bg-[#f8f6ff] border border-[#f0eaff] rounded-lg px-4 py-3 text-gray-600 font-semibold text-sm outline-none focus:border-purple-300 transition-colors shadow-inner" />
                    <span className="text-gray-400 text-[13px] font-bold w-12">g/dL</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-600 text-[11px] font-bold">Below threshold for patient trimester</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Immediate Risk Assessment */}
            <div className="bg-[#eeebff] rounded-2xl p-6 shadow-sm border border-[#e4dcff]">
              <h3 className="text-[#3b41c5] font-bold text-[11px] tracking-widest uppercase mb-5">Immediate Risk Assessment</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">High Risk Pregnancy</span>
                  <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Emergency Referral</span>
                  <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                </label>
              </div>
            </div>

            {/* Follow-up Actions */}
            <div className="bg-white rounded-2xl p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex-1">
              <div className="flex items-center gap-2.5 mb-6 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
                <svg className="w-4 h-4 text-[#5c69e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Follow-up Actions
              </div>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Next Appointment</label>
                  <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#f8f6ff] border border-[#f0eaff] rounded-lg pl-4 pr-10 py-3 text-gray-700 font-medium text-sm outline-none focus:border-purple-300 transition-colors shadow-inner" />
                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Laboratory Tests</label>
                  <div className="relative">
                    <select className="w-full bg-[#f8f6ff] border border-[#f0eaff] rounded-lg pl-4 pr-10 py-3 text-gray-500 font-medium text-sm outline-none focus:border-purple-300 transition-colors appearance-none cursor-pointer shadow-inner">
                      <option value="" disabled selected>Select standard panel...</option>
                      <option value="panel1">Standard Panel 1</option>
                      <option value="panel2">Standard Panel 2</option>
                    </select>
                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-1 flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded border border-gray-300 bg-white flex-shrink-0 cursor-pointer"></div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      Notify patient via SMS for appointment reminder and lab instructions.
                    </p>
                    <div className="mt-3 inline-flex bg-white rounded-full p-1 border border-gray-100 shadow-sm self-start">
                      <button className="px-4 py-1.5 rounded-full bg-[#2c31c4] text-white text-[11px] font-bold shadow-sm">English</button>
                      <button className="px-4 py-1.5 rounded-full text-gray-500 text-[11px] font-bold hover:bg-gray-50 transition-colors">Nepali</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom Bar: Data Integrity Check */}
        <div className="bg-[#f8f5ff] border border-[#eae2ff] rounded-2xl p-5 shadow-sm mt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2c31c4]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-gray-800 font-bold text-[15px]">Data Integrity Check</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Record will be encrypted and synced to central clinical server.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-white text-[#2c31c4] font-bold rounded-lg text-sm shadow-sm transition-colors border border-gray-100 hover:border-gray-200">
              Preview PDF
            </button>
            <button className="px-7 py-2.5 bg-[#2c31c4] hover:bg-blue-800 text-white font-bold rounded-lg text-sm shadow-md transition-colors">
              Finalize & Sign
            </button>
          </div>
        </div>

      </main>
      </div>
    </div>
  );
}
