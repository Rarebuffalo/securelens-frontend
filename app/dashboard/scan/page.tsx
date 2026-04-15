"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Link as LinkIcon, ShieldAlert, CheckCircle, Info } from "lucide-react";
import { scansApi } from "@/lib/api/scans";
import ScoreGauge from "@/components/ScoreGauge";

export default function NewScanPage() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.startsWith("http")) {
      setError("Please include http:// or https:// in the URL");
      return;
    }

    setIsScanning(true);
    setError("");
    setResult(null);

    try {
      const data = await scansApi.triggerScan(url);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during scanning. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskColor = (score: number, type: 'bg' | 'text' | 'border') => {
    if (score >= 80) return type === 'bg' ? 'bg-green-50' : type === 'text' ? 'text-green-700' : 'border-green-200';
    if (score >= 50) return type === 'bg' ? 'bg-yellow-50' : type === 'text' ? 'text-yellow-700' : 'border-yellow-200';
    return type === 'bg' ? 'bg-red-50' : type === 'text' ? 'text-red-700' : 'border-red-200';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Initiate Security Scan</h1>
        <p className="text-slate-500 mt-2">Enter your target application URL to perform a comprehensive infrastructure and vulnerability test.</p>
      </motion.div>

      {/* Main Scan Input Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10 max-w-3xl mx-auto">
        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <LinkIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none font-medium text-lg placeholder:font-normal"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isScanning}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isScanning || !url}
            className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px]"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Start Scan
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 text-sm text-red-600 font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading Skeleton */}
      <AnimatePresence>
        {isScanning && !result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Target...</h3>
            <p className="text-slate-500 max-w-md mx-auto">We are testing layers, checking headers, and utilizing our AI engine to compile your risk profile.</p>
            
            <div className="flex gap-2 justify-center mt-8">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results View */}
      <AnimatePresence>
        {result && !isScanning && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                <ScoreGauge score={result.security_score} />
                <div className={`mt-6 px-4 py-1.5 rounded-full text-sm font-bold ${getRiskColor(result.security_score, 'bg')} ${getRiskColor(result.security_score, 'text')}`}>
                  {result.security_score >= 80 ? 'Low Risk' : result.security_score >= 50 ? 'Moderate Risk' : 'High Risk Profile'}
                </div>
              </div>

              {/* Layers Card */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-slate-400" />
                    Layer Intelligence
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(result.layers || {}).map(([layerName, data]: [string, any]) => (
                        <div key={layerName} className={`p-4 rounded-2xl border ${data.status === 'green' ? 'bg-green-50 border-green-100' : data.status === 'yellow' ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-slate-900">{layerName}</span>
                                {data.status === 'green' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <ShieldAlert className={`w-5 h-5 ${data.status === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`} />}
                            </div>
                            <span className="text-sm font-medium text-slate-600">{data.issues} Issues Found</span>
                        </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* AI Risk Summary mocked for now since real Threat Narrative is separate */}
            <div className="bg-gradient-to-r from-blue-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <h3 className="font-bold flex items-center gap-2 text-lg mb-3">
                        <Info className="w-5 h-5 text-blue-400" />
                        AI Analysis
                    </h3>
                    <p className="text-slate-300 leading-relaxed max-w-4xl text-sm sm:text-base">
                        {result.security_score >= 80 
                            ? "Your application demonstrates a strong security posture with robust header configurations and minimal exposure points. Only minor hardening improvements are recommended."
                            : result.security_score >= 50
                            ? "Your application is moderately secure but displays key security weaknesses across server configuration or exposure layers that an attacker could trivially chain."
                            : "Critical vulnerabilities detected. Immediate remediation is required to patch exposed access points or fundamentally broken security headers."
                        }
                    </p>
                </div>
            </div>

            {/* Actionable Issues Table */}
            {result.issues && result.issues.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-slate-400" />
                        Actionable Intelligence
                    </h3>
                    
                    <div className="space-y-4">
                        {result.issues.map((issue: any, i: number) => (
                            <div key={i} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl hover:bg-white transition-colors duration-300 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                                            issue.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                            issue.severity === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {issue.severity}
                                        </span>
                                        <h4 className="font-bold text-slate-900 text-base">{issue.issue}</h4>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{issue.layer}</span>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-xl p-4 mt-3">
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Remediation Script</span>
                                    <code className="text-sm text-blue-700 font-mono block overflow-x-auto whitespace-pre-wrap">
                                        {issue.fix || "Check backend documentation."}
                                    </code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
