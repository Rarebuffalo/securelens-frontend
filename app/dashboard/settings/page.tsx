"use client";

import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-blue-600" />
          Settings
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your account preferences and system configurations.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm flex flex-col items-center text-center">
        <div className="bg-blue-50 p-4 rounded-full mb-6">
          <SettingsIcon className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Under Construction</h2>
        <p className="text-slate-500 max-w-md leading-relaxed">
          The settings interface is currently a placeholder. Ready to implement the new reference design whenever you provide it!
        </p>
      </div>
    </div>
  );
}
