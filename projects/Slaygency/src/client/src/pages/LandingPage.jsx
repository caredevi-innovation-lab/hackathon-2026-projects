import React from 'react';
import { Link } from 'react-router-dom';
import patientImg from '../assets/images/patient.png';
import adminImg from '../assets/images/adminstrator.png';
import doctorImg from '../assets/images/doctor.png';

const PatientIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);

const AdminIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-600 fill-current"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
);

const DoctorIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-600 fill-current"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-8 md:px-16 bg-transparent absolute top-0 w-full z-50">
        <Link to="/" className="text-xl font-black tracking-tight text-indigo-900">
          MaterNova
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#about" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">About</a>
          <a href="#how" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#impact" className="hover:text-indigo-600 transition-colors">Impact</a>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Login
          </Link>
          <Link to="/register" className="bg-[#3730a3] hover:bg-indigo-900 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-8 md:px-16 overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/30 z-0"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-indigo-200">
              Advancing Maternal Health in Nepal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-800 leading-[1.15] mb-6">
              Empowering Every Mother in Nepal with <span className="text-indigo-600">AI-Driven Care.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
              A life-saving dashboard connecting expectant mothers, community health workers, and doctors for early risk detection.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/register" className="bg-[#3730a3] hover:bg-indigo-900 text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-[0_8px_20px_rgba(55,48,163,0.25)] transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                Join the Platform
                <span className="text-lg leading-none">→</span>
              </Link>
              <button className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M8 5v14l11-7z"/></svg>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Dashboard Mockup */}
          <div className="relative w-full aspect-[4/3] max-w-xl mx-auto md:ml-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-white/60 p-4 backdrop-blur-xl transform rotate-1 scale-105"></div>
            <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-100">
              {/* Mockup Header */}
              <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-4 bg-slate-50/50">
                <div className="w-24 h-4 bg-indigo-100 rounded-md"></div>
                <div className="flex gap-2 ml-auto">
                  <div className="w-16 h-3 bg-slate-200 rounded-md"></div>
                  <div className="w-16 h-3 bg-slate-200 rounded-md"></div>
                </div>
              </div>
              {/* Mockup Body */}
              <div className="p-5 flex-1 flex gap-4">
                <div className="w-1/3 flex flex-col gap-3">
                  <div className="w-full h-24 bg-slate-100 rounded-xl"></div>
                  <div className="w-full h-32 bg-slate-100 rounded-xl"></div>
                  <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                </div>
                <div className="w-2/3 flex flex-col gap-3">
                  <div className="w-full h-40 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 100 50" className="w-full h-full absolute inset-0 text-indigo-200 stroke-current" fill="none" strokeWidth="2"><path d="M0,25 C20,25 30,10 50,25 C70,40 80,25 100,25"/></svg>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/2 h-32 bg-slate-100 rounded-xl"></div>
                    <div className="w-1/2 h-32 bg-slate-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Care Ecosystem */}
      <section id="how" className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">The Care Ecosystem</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto font-medium">
            Our platform bridges the gap between traditional community support and modern medical provision.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            {/* Card 1 */}
            <div className="bg-[#f8f9fc] rounded-3xl p-8 flex flex-col items-start border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <PatientIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Patients</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Log vitals, get AI risk scores, and track your pregnancy journey through a localized, easy-to-use mobile interface.
              </p>
              <div className="w-full mt-auto bg-slate-200 rounded-2xl flex items-center justify-center aspect-video overflow-hidden border border-slate-200">
                <img src={patientImg} alt="Patient View" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f8f9fc] rounded-3xl p-8 flex flex-col items-start border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <AdminIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Administrators</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Oversee platform operations, manage facility access, and monitor high-level maternal health statistics across all regions.
              </p>
              <div className="w-full mt-auto bg-slate-200 rounded-2xl flex items-center justify-center aspect-video overflow-hidden border border-slate-200">
                <img src={adminImg} alt="Admin View" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f8f9fc] rounded-3xl p-8 flex flex-col items-start border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <DoctorIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Doctors</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Access clinical deep-dives, validate AI predictions, and provide remote care through a secure, data-rich physician portal.
              </p>
              <div className="w-full mt-auto bg-slate-200 rounded-2xl flex items-center justify-center aspect-video overflow-hidden border border-slate-200">
                <img src={doctorImg} alt="Doctor View" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 px-8 md:px-16 bg-[#3730a3] text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-16">Creating Sustainable Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-indigo-400/50">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <h3 className="text-5xl font-black mb-3">82%</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-3">Early Detection Rate</p>
              <p className="text-sm text-indigo-100 font-medium max-w-[200px] leading-relaxed">Identifying high-risk pregnancies before complications arise.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <h3 className="text-5xl font-black mb-3">2,000+</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-3">Medical Professionals</p>
              <p className="text-sm text-indigo-100 font-medium max-w-[200px] leading-relaxed">Trained and active on the platform across the nation.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <h3 className="text-5xl font-black mb-3">14</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-3">Districts Covered</p>
              <p className="text-sm text-indigo-100 font-medium max-w-[200px] leading-relaxed">Expanding rapidly to reach remote mountain communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 md:px-16 bg-[#f8f9fc] relative">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-12 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Ready to save lives?</h2>
          <p className="text-slate-500 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
            Whether you are a donor, a health facility, or a government partner, join us in making motherhood safe for every Nepali woman.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button className="bg-[#3730a3] hover:bg-indigo-900 text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-md transition-transform hover:-translate-y-0.5">
              Partner With Us
            </button>
            <button className="bg-indigo-50 hover:bg-indigo-100 text-[#3730a3] text-sm font-bold py-3.5 px-8 rounded-xl transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 md:px-16 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-800 text-lg mb-1">MaterNova</h3>
            <p className="text-[10px] font-medium text-slate-400">© 2026 MaterNova. Supporting Maternal Health in Nepal.</p>
          </div>
          
          <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Ministry Partners</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all">
               <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all">
               <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
