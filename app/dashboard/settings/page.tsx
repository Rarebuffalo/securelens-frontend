"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { keysApi } from "@/lib/api/keys";
import { Copy, Plus, Trash2, KeyRound, ShieldAlert, Check, HelpCircle, User } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('api-keys');
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedKeyIds, setCopiedKeyIds] = useState<Record<string, boolean>>({});
  
  const queryClient = useQueryClient();

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: keysApi.getKeys,
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => keysApi.createKey(name),
    onSuccess: (data) => {
      setGeneratedKey(data.key);
      setIsCreating(false);
      setNewKeyName("");
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    }
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) => keysApi.revokeKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    }
  });

  const handleCopyNew = () => {
      if (generatedKey) {
          navigator.clipboard.writeText(generatedKey);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  const handleCopyExisting = (key: any) => {
      navigator.clipboard.writeText(key.prefix + '****************');
      setCopiedKeyIds(prev => ({ ...prev, [key.id]: true }));
      setTimeout(() => setCopiedKeyIds(prev => ({ ...prev, [key.id]: false })), 2000);
  };

  const cardStyle = "bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]";

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">Platform Settings</h1>
            <p className="text-slate-500 font-medium text-sm">Manage your organizational profile, preferences, and API access.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab('general')} className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'general' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
              <User className="w-4 h-4" /> General Profile
          </button>
          <button onClick={() => setActiveTab('api-keys')} className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'api-keys' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
              <KeyRound className="w-4 h-4" /> API Keys
          </button>
      </div>

      {activeTab === 'general' && (
          <div className={`${cardStyle} p-8`}>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Profile</h3>
              <div className="max-w-md space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                      <input disabled type="text" value={user?.username || ''} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-500 font-medium" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input disabled type="email" value={user?.email || ''} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-500 font-medium" />
                  </div>
                  <div className="pt-4">
                      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed text-sm">Save Changes</button>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'api-keys' && (
          <div className="space-y-6">
              
              <div className={`${cardStyle} p-8`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Developer Keys</h3>
                          <p className="text-slate-500 text-sm">Create API keys to integrate SecureLens scans into your CI/CD pipelines.</p>
                      </div>
                      <button 
                        onClick={() => setIsCreating(!isCreating)} 
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm ${isCreating ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'}`}
                      >
                          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4" /> Generate New Key</>}
                      </button>
                  </div>

                  <AnimatePresence>
                      {isCreating && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
                              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/30 rounded-2xl p-6 shadow-inner">
                                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Create a new API Key</h4>
                                  <div className="flex gap-3">
                                      <input 
                                        type="text" 
                                        placeholder="e.g. GitHub Actions Production" 
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        className="flex-1 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                      />
                                      <button 
                                        disabled={!newKeyName || createMutation.isPending}
                                        onClick={() => createMutation.mutate(newKeyName)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 transition-colors shadow-md shadow-indigo-500/20"
                                      >
                                        {createMutation.isPending ? 'Creating...' : 'Create Key'}
                                      </button>
                                  </div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <AnimatePresence>
                      {generatedKey && (
                          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] rounded-2xl p-6 border border-indigo-500/30 flex flex-col gap-4 shadow-xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                              <div className="relative z-10 flex items-start gap-3">
                                  <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400 border border-amber-500/30 shadow-sm">
                                      <ShieldAlert className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white mb-1">Save your new API Key</h4>
                                      <p className="text-sm text-indigo-200/80">For security reasons, we will never show this key again. Please copy it and store it somewhere safe immediately.</p>
                                  </div>
                              </div>
                              <div className="relative z-10 flex items-center gap-2 bg-black/40 rounded-xl p-2 border border-white/10 shadow-inner">
                                  <code className="flex-1 text-emerald-400 font-mono text-sm px-3">{generatedKey}</code>
                                  <button onClick={handleCopyNew} className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-md shadow-indigo-500/30">
                                      {copied ? <><Check className="w-4 h-4 text-white" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                                  </button>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <div className="relative overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                          <thead className="bg-slate-50/80 dark:bg-slate-900/80 text-[11px] uppercase tracking-widest text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                              <tr>
                                  <th className="px-6 py-4 w-1/3">Key Name</th>
                                  <th className="px-6 py-4">Prefix</th>
                                  <th className="px-6 py-4">Created Date</th>
                                  <th className="px-6 py-4 text-right">Actions</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white/50 dark:bg-slate-900/20">
                              {isLoading && (
                                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">Loading keys...</td></tr>
                              )}
                              {!isLoading && (!apiKeys || apiKeys.length === 0) && (
                                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">No active API keys found.</td></tr>
                              )}
                              {!isLoading && apiKeys?.map((key: any) => (
                                  <tr key={key.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                          {key.name}
                                      </td>
                                      <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400 text-xs tracking-wider">{key.prefix}••••••••</td>
                                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{new Date(key.created_at).toLocaleDateString()}</td>
                                      <td className="px-6 py-4 text-right">
                                          <div className="flex items-center justify-end gap-2 outline-none">
                                              
                                              <button 
                                                  onClick={() => handleCopyExisting(key)}
                                                  title="Copy Key Prefix"
                                                  className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 p-2 rounded-xl transition-colors inline-block"
                                              >
                                                  {copiedKeyIds[key.id] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                              </button>

                                              <button 
                                                  onClick={() => {
                                                      if (confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
                                                          revokeMutation.mutate(key.id);
                                                      }
                                                  }}
                                                  disabled={revokeMutation.isPending}
                                                  title="Revoke Key"
                                                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-xl transition-colors inline-block disabled:opacity-50"
                                              >
                                                  <Trash2 className="w-4 h-4" />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}
