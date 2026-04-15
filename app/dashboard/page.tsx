"use client";

import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { ArrowRight, BarChart2, Globe, Shield, ShieldAlert, Check, AlertTriangle, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardOverview() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const { data: trends, isLoading } = useQuery({
    queryKey: ['trends'],
    queryFn: scansApi.getTrends,
  });

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      router.push(`/dashboard/scan?url=${encodeURIComponent(url)}`);
    }
  };

  const lastScan = trends?.recent_scans?.[0];
  const avgScoreNum = trends?.average_score != null ? Number(trends.average_score) : null;
  const avgScoreStr = avgScoreNum != null ? avgScoreNum.toFixed(1) : "--";

  const cardStyle = "bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300";

  return (
    <div className="w-full space-y-8 pb-10">
      {/* Top Banner Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Initiate Scan Card */}
        <div className={`lg:col-span-2 p-8 flex flex-col justify-center ${cardStyle}`}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">Initiate Deep Scan</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium text-sm">Enter a target URL or IP to perform a comprehensive security audit.</p>
          
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500/70" />
              <input 
                type="url" 
                placeholder="https://api.infrastructure.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-400 shadow-inner"
                required
              />
            </div>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              Scan Now <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Last Scan Card */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between text-white shadow-xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/30 blur-3xl rounded-full" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold tracking-widest text-indigo-200 uppercase opacity-80">Last Scan</span>
              {lastScan && <span className="bg-indigo-500/30 text-indigo-100 text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full border border-indigo-400/30 shadow-sm">COMPLETED</span>}
            </div>
            <h3 className="text-xl font-bold mb-1 truncate" title={lastScan?.url || "No scans yet"}>
              {lastScan ? lastScan.url : "No active scans"}
            </h3>
            <p className="text-xs text-indigo-200 opacity-70 font-medium">
              {lastScan ? new Date(lastScan.created_at).toUTCString() : "Run a scan to see insights"}
            </p>
          </div>

          <div className="flex items-end justify-between mt-8 relative z-10">
            <div>
              <p className="text-xs text-indigo-200 opacity-80 font-bold mb-1">Health Score</p>
              <div className="flex items-baseline gap-1 drop-shadow-md">
                <span className="text-5xl font-black">{lastScan ? lastScan.security_score : "--"}</span>
                <span className="text-indigo-300 font-bold">/100</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
              <BarChart2 className="w-6 h-6 text-indigo-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${cardStyle} p-6 relative overflow-hidden group`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Avg. Security Score</span>
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_theme('colors.indigo.500')]" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{avgScoreStr}<span className="text-lg text-slate-400">%</span></span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500/10">
             <div className="h-full bg-indigo-500" style={{ width: `${avgScoreNum || 0}%` }} />
          </div>
        </div>

        <div className={`${cardStyle} p-6 relative`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Total Scans (30d)</span>
            <Target className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{trends?.total_scans || 0}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Increased scan frequency detected</p>
        </div>

        <div className={`${cardStyle} p-6 relative`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Critical Issues</span>
            <ShieldAlert className="w-4 h-4 text-rose-500 drop-shadow-sm" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-rose-500 drop-shadow-sm">
              {trends?.recent_scans?.[0]?.issues?.filter((i:any) => i.severity === 'Critical')?.length || 0}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Across all active monitored assets</p>
        </div>

        <div className={`${cardStyle} p-6 relative`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Security Trend</span>
            <TrendingUp className="w-4 h-4 text-emerald-500 drop-shadow-sm" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">Stable</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-2">
            <Check className="w-3 h-3" /> Compliant with SOC2/ISO
          </p>
        </div>
      </div>

      {/* Three Column Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Threat Resistance */}
        <div className={`${cardStyle} p-8 flex flex-col items-center justify-center text-center`}>
            <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[11px] tracking-widest uppercase mb-8">Threat Resistance</h3>
            
            <div className="relative w-44 h-44 flex items-center justify-center mb-8 drop-shadow-lg">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800/80" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" strokeDasharray={`${283 * ((avgScoreNum || 0) / 100)} 283`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">{avgScoreStr}</span>
                <span className="text-[10px] font-bold text-indigo-500 tracking-wider mt-1 uppercase">Excellent</span>
              </div>
            </div>

            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 px-4">
              Your infrastructure is resilient against <span className="text-indigo-600 dark:text-indigo-400 font-bold">{avgScoreStr}%</span> of known OWASP Top 10 vulnerabilities.
            </p>
        </div>

        {/* Top Critical Findings */}
        <div className={`${cardStyle} p-8`}>
           <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
             <AlertTriangle className="w-5 h-5 text-indigo-500" /> Top Critical Findings
           </h3>

           <div className="space-y-6">
             {trends?.recent_scans?.[0]?.issues?.slice(0,3).map((issue: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${issue.severity === 'Critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{issue.issue}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{issue.layer}</p>
                  </div>
                </div>
             )) || (
               <div className="text-sm text-slate-500 dark:text-slate-400 italic">No critical findings in the latest scan.</div>
             )}
           </div>

           <button className="w-full mt-8 py-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors">
              View All Findings
           </button>
        </div>

        {/* Security Layers */}
        <div className={`${cardStyle} p-8`}>
           <div className="flex justify-between items-center mb-8">
             <h3 className="font-bold text-slate-900 dark:text-white">Security Layers</h3>
           </div>

           <div className="space-y-5">
             {Object.entries(trends?.recent_scans?.[0]?.layers || {}).slice(0, 4).map(([name, status]: [string, any], i) => {
                const isGreen = status === 'Safe' || status.status === 'green';
                const isRed = status === 'Critical' || status.status === 'red';
                return (
                  <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${isGreen ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : isRed ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20' : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                        {isGreen ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">{name}</span>
                    </div>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${isGreen ? 'text-emerald-600 dark:text-emerald-400' : isRed ? 'text-rose-500 dark:text-rose-400' : 'text-slate-500'}`}>
                      {isGreen ? 'Optimized' : isRed ? 'Vulnerable' : 'Neutral'}
                    </span>
                  </div>
                )
             })}
           </div>

           {/* Asset Coverage Bar */}
           <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50">
              <div className="flex justify-between text-[11px] font-bold mb-3">
                <span className="text-slate-500 uppercase tracking-widest">Asset Coverage</span>
                <span className="text-indigo-600 dark:text-indigo-400">78%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium text-center">Last full sync with Infrastructure provider was 12 min ago.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
