"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { keysApi } from "@/lib/api/keys";
import { Copy, Plus, Trash2, KeyRound, ShieldAlert, Check } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('api-keys');
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
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

  const handleCopy = () => {
      if (generatedKey) {
          navigator.clipboard.writeText(generatedKey);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Platform Settings</h1>
            <p className="text-slate-500 font-medium">Manage your organizational profile, preferences, and API access.</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab('general')} className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'general' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
              General Profile
          </button>
          <button onClick={() => setActiveTab('api-keys')} className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'api-keys' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
              <KeyRound className="w-4 h-4" /> API Keys
          </button>
      </div>

      {activeTab === 'general' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Profile</h3>
              <div className="max-w-md space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                      <input disabled type="text" value={user?.username || ''} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-500" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input disabled type="email" value={user?.email || ''} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-500" />
                  </div>
                  <div className="pt-4">
                      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed">Save Changes</button>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'api-keys' && (
          <div className="space-y-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Developer Keys</h3>
                          <p className="text-slate-500 text-sm">Create API keys to integrate SecureLens scans into your CI/CD pipelines.</p>
                      </div>
                      <button 
                        onClick={() => setIsCreating(!isCreating)} 
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm ${isCreating ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      >
                          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4" /> Generate New Key</>}
                      </button>
                  </div>

                  <AnimatePresence>
                      {isCreating && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
                              <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6">
                                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Create a new API Key</h4>
                                  <div className="flex gap-3">
                                      <input 
                                        type="text" 
                                        placeholder="e.g. GitHub Actions Production" 
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      />
                                      <button 
                                        disabled={!newKeyName || createMutation.isPending}
                                        onClick={() => createMutation.mutate(newKeyName)}
                                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50"
                                      >
                                        {createMutation.isPending ? 'Creating...' : 'Create'}
                                      </button>
                                  </div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <AnimatePresence>
                      {generatedKey && (
                          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 bg-[#2D2A32] rounded-2xl p-6 border border-slate-800 flex flex-col gap-4">
                              <div className="flex items-start gap-3">
                                  <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
                                      <ShieldAlert className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white mb-1">Save your new API Key</h4>
                                      <p className="text-sm text-slate-400">For security reasons, we will never show this key again. Please copy it and store it somewhere safe immediately.</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 bg-black/30 rounded-xl p-2 border border-white/10">
                                  <code className="flex-1 text-green-400 font-mono text-sm px-3">{generatedKey}</code>
                                  <button onClick={handleCopy} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                                      {copied ? <><Check className="w-4 h-4 text-green-400" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                                  </button>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                          <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-xs uppercase tracking-widest text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                              <tr>
                                  <th className="px-5 py-4 rounded-tl-xl w-1/3">Key Name</th>
                                  <th className="px-5 py-4">Prefix</th>
                                  <th className="px-5 py-4">Created Date</th>
                                  <th className="px-5 py-4 rounded-tr-xl text-right">Actions</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {isLoading && (
                                  <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500">Loading keys...</td></tr>
                              )}
                              {!isLoading && (!apiKeys || apiKeys.length === 0) && (
                                  <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500">No active API keys found.</td></tr>
                              )}
                              {!isLoading && apiKeys?.map((key: any) => (
                                  <tr key={key.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                                          <div className="w-2 h-2 rounded-full bg-green-500" />
                                          {key.name}
                                      </td>
                                      <td className="px-5 py-4 font-mono text-slate-500 text-xs">{key.prefix}••••••••</td>
                                      <td className="px-5 py-4 text-slate-500">{new Date(key.created_at).toLocaleDateString()}</td>
                                      <td className="px-5 py-4 text-right">
                                          <button 
                                              onClick={() => {
                                                  if (confirm("Are you sure you want to revoke this API key? This action cannot be undone and will break any integrations using it.")) {
                                                      revokeMutation.mutate(key.id);
                                                  }
                                              }}
                                              disabled={revokeMutation.isPending}
                                              className="text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 p-2 rounded-lg transition-colors inline-block disabled:opacity-50"
                                          >
                                              <Trash2 className="w-4 h-4" />
                                          </button>
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
