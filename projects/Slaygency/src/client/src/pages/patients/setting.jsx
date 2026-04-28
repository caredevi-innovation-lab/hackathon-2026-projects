import React, { useEffect, useState } from 'react';
// Sidebar now provided by AppLayout
import { useAuth } from '../../hooks/useAuth.js';
import { updateProfile, changePassword } from '../../api.js';

// â”€â”€ SVG Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current">
    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/>
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

function InputField({ label, type = 'text', value, onChange, placeholder, readOnly, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500  tracking-wider mb-1.5">{label}</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        readOnly={readOnly} required={required}
        className={`w-full border rounded-xl px-4 py-3 text-sm font-medium text-slate-800 transition outline-none
          ${readOnly
            ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent'}`}
      />
    </div>
  );
}

function StatusBadge({ message, tone = 'error' }) {
  if (!message) return null;
  return (
    <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${tone === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
      {message}
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();

  // Profile state
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [profileMsgType, setProfileMsgType] = useState('');

  // Password state
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwMsgType, setPwMsgType] = useState('');

  // Populate form from auth context
  useEffect(() => {
    if (user) {
      setProfileForm({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  // â”€â”€ Profile Update â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) { setProfileMsgType('error'); setProfileMsg('Name is required.'); return; }
    setProfileSaving(true);
    setProfileMsg('');
    setProfileMsgType('');
    try {
      await updateProfile({ name: profileForm.name.trim(), phone: profileForm.phone.trim() });
      setProfileMsgType('success');
      setProfileMsg('Profile updated successfully.');
    } catch (err) {
      setProfileMsgType('error');
      setProfileMsg(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  // â”€â”€ Password Change â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 8) { setPwMsgType('error'); setPwMsg('New password must be at least 8 characters.'); return; }
    if (pwForm.newPassword !== pwForm.confirmPassword) { setPwMsgType('error'); setPwMsg('Passwords do not match.'); return; }
    setPwSaving(true);
    setPwMsg('');
    setPwMsgType('');
    try {
      await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwMsgType('success');
      setPwMsg('Password changed successfully.');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPwMsgType('error');
      setPwMsg(err?.response?.data?.message || 'Failed to change password.');
    } finally {
      setPwSaving(false);
    }
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full">

          {/* Profile Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-3xl font-semibold shadow-md shadow-indigo-200">
                {initial}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" title="Active" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-slate-800">{user?.name || 'Patient User'}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                <span className="bg-indigo-100 text-indigo-700 text-[11px] font-semibold px-3 py-1 rounded-full">{user?.role || 'Patient'}</span>
                <span className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">Active Account</span>
                {user?.lastLoginAt && (
                  <span className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-3 py-1 rounded-full">
                    Last login: {new Date(user.lastLoginAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Update Form */}
            <form onSubmit={handleProfileSave} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><UserIcon /></div>
                <h3 className="text-base font-semibold text-slate-800">Personal Information</h3>
              </div>

              <InputField
                label="Full Name" value={profileForm.name}
                onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your full name" required
              />
              <InputField
                label="Email Address" value={user?.email || ''}
                readOnly placeholder="Email cannot be changed"
              />
              <InputField
                label="Phone Number" value={profileForm.phone}
                onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+977 9xx-xxxxxxx"
              />

              <StatusBadge message={profileMsg} tone={profileMsgType} />

              <button
                type="submit" disabled={profileSaving}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 mt-auto"
              >
                {profileSaving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Profile'}
              </button>
            </form>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><LockIcon /></div>
                <h3 className="text-base font-semibold text-slate-800">Change Password</h3>
              </div>

              <InputField
                label="Current Password" type="password" value={pwForm.currentPassword}
                onChange={(e) => setPwForm((p) => ({ ...p, currentPassword: e.target.value }))}
                placeholder="Enter current password" required
              />
              <InputField
                label="New Password" type="password" value={pwForm.newPassword}
                onChange={(e) => setPwForm((p) => ({ ...p, newPassword: e.target.value }))}
                placeholder="Min. 8 characters" required
              />
              <InputField
                label="Confirm New Password" type="password" value={pwForm.confirmPassword}
                onChange={(e) => setPwForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Repeat new password" required
              />

              {/* Password strength indicator */}
              {pwForm.newPassword && (
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold  tracking-widest mb-1">Password Strength</p>
                  <div className="flex gap-1">
                    {[8, 12, 16].map((threshold, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          pwForm.newPassword.length >= threshold
                            ? i === 0 ? 'bg-red-400' : i === 1 ? 'bg-amber-400' : 'bg-emerald-500'
                            : 'bg-slate-100'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {pwForm.newPassword.length < 8 ? 'Too short' : pwForm.newPassword.length < 12 ? 'Weak' : pwForm.newPassword.length < 16 ? 'Good' : 'Strong'}
                  </p>
                </div>
              )}

              <StatusBadge message={pwMsg} tone={pwMsgType} />

              <button
                type="submit" disabled={pwSaving}
                className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 mt-auto"
              >
                {pwSaving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Updating...
                  </>
                ) : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Security Info */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Security Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Account Status</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Active & Secure</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <LockIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Two-Factor Auth</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Not enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Last Login</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Just now'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
            <h3 className="text-sm font-semibold text-red-600 mb-4">Danger Zone</h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Deactivate Account</p>
                <p className="text-xs text-slate-400 mt-0.5">This will permanently disable your account and all associated data.</p>
              </div>
              <button className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                Deactivate Account
              </button>
            </div>
          </div>

    </div>
  );
}


