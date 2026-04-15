"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { User, Shield, KeyRound, Bell, LogOut, AlertOctagon } from "lucide-react";

export default function AccountPage() {
  const { user, logout } = useAuth();
  
  const cardStyle = "bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]";

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      
      <div className="flex flex-col justify-start items-start gap-4 mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent flex items-center gap-3">
            <User className="w-8 h-8 text-indigo-600" />
            Account Security
        </h1>
        <p className="text-slate-500 font-medium text-sm max-w-xl">Manage your personal account credentials, active sessions, and multi-factor authentication policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-8">
              <div className={`${cardStyle} p-8`}>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/30">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{user?.username || 'user'}</h2>
                          <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mt-1 inline-block">Active Plan: Enterprise</div>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                          <input disabled type="email" value={user?.email || 'user@example.com'} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium" />
                      </div>
                      <button className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                          Modify Email
                      </button>
                  </div>
              </div>

              <div className={`${cardStyle} p-8`}>
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                      <LogOut className="w-5 h-5 text-slate-400" /> Active Sessions
                  </h3>
                  <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl">
                          <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">MacBook Pro • Chrome</p>
                              <p className="text-xs text-slate-500">Current Session • New York, US</p>
                          </div>
                      </div>
                  </div>
                  <button onClick={() => logout()} className="mt-6 w-full text-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                      Sign out of all sessions
                  </button>
              </div>
          </div>

          <div className="space-y-8">
              <div className={`${cardStyle} p-8`}>
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                      <Shield className="w-5 h-5 text-emerald-500" /> Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      Add an extra layer of security to your account by requiring a dynamically generated code from an authenticator app upon login.
                  </p>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6">
                      <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">Status: Disabled</span>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-sm">
                          Set Up 2FA
                      </button>
                  </div>
              </div>

              <div className={`${cardStyle} p-8`}>
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                      <KeyRound className="w-5 h-5 text-slate-400" /> Password Management
                  </h3>
                  <form className="space-y-4">
                      <div>
                          <input type="password" placeholder="Current Password" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner placeholder:text-slate-400" />
                      </div>
                      <div>
                          <input type="password" placeholder="New Password" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner placeholder:text-slate-400" />
                      </div>
                      <button type="button" className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                          Update Password
                      </button>
                  </form>
              </div>

              <div className={`${cardStyle} p-8 border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-900/10`}>
                  <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-2">
                      <AlertOctagon className="w-5 h-5" /> Danger Zone
                  </h3>
                  <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mb-6">Permanently delete your account and all associated scan data. This action is irreversible.</p>
                  <button onClick={() => confirm("Are you sure? Contact support for account deletion.")} className="w-full bg-white dark:bg-rose-950 border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                      Delete Account
                  </button>
              </div>
          </div>

      </div>
    </div>
  );
}
