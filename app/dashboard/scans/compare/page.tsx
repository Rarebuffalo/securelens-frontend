"use client";

import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { useState } from "react";
import { ArrowLeft, GitCompare, CheckCircle, AlertTriangle, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScoreGauge from "@/components/ScoreGauge";

export default function CompareScansPage() {
  const [baseScanId, setBaseScanId] = useState("");
  const [targetScanId, setTargetScanId] = useState("");

  const { data: allScansData } = useQuery({
    queryKey: ['scansHistory'],
    queryFn: scansApi.getScans,
  });

  const { data: comparisonData, isLoading: isComparing } = useQuery({
    queryKey: ['compare', baseScanId, targetScanId],
    queryFn: () => scansApi.compareScans(baseScanId, targetScanId),
    enabled: !!baseScanId && !!targetScanId && baseScanId !== targetScanId,
  });

  const scans = allScansData?.scans || [];

  return (
    <div className="w-full space-y-8 pb-10">
      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
            <Link href="/dashboard/scans" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-4 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Repositories
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3 mb-2">
                <GitCompare className="w-8 h-8 text-indigo-600" />
                Scan Comparison
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Select a baseline and a target scan to track remediation progress and identify newly introduced vulnerabilities.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Baseline Scan</label>
            <select 
                value={baseScanId} 
                onChange={(e) => setBaseScanId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
                <option value="">Select an older scan...</option>
                {scans.map((s: any) => (
                    <option key={s.id} value={s.id}>
                        {new Date(s.created_at).toLocaleDateString()} - {s.url} (Score: {s.security_score})
                    </option>
                ))}
            </select>
        </div>
        
        <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-3 rounded-full mt-6">
            <ArrowRight className="w-5 h-5 text-slate-400" />
        </div>

        <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Target Scan</label>
            <select 
                value={targetScanId} 
                onChange={(e) => setTargetScanId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
                <option value="">Select a newer scan...</option>
                {scans.map((s: any) => (
                    <option key={s.id} value={s.id}>
                       {new Date(s.created_at).toLocaleDateString()} - {s.url} (Score: {s.security_score})
                    </option>
                ))}
            </select>
        </div>
      </div>

      {isComparing && (
          <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
      )}

      {!isComparing && targetScanId && baseScanId && baseScanId === targetScanId && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-2xl p-6 text-center">
              <p className="text-yellow-700 dark:text-yellow-400 font-medium.">Cannot compare identical scans. Please select two different records.</p>
          </div>
      )}

      {!isComparing && comparisonData && (
          <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Base Score</h3>
                      <ScoreGauge score={comparisonData.base_score || 0} />
                   </div>
                   
                   <div className="bg-indigo-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg text-white">
                      <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-2">Net Change</h3>
                      <div className="text-5xl font-black mb-2 flex items-center gap-2">
                        {(comparisonData.target_score - comparisonData.base_score) > 0 ? '+' : ''}
                        {comparisonData.target_score - comparisonData.base_score}
                      </div>
                      <p className="font-medium text-indigo-100 text-sm">
                        Overall security posture has {comparisonData.target_score > comparisonData.base_score ? 'improved' : 'declined'} by {Math.abs(comparisonData.target_score - comparisonData.base_score)} points.
                      </p>
                   </div>
                   
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Target Score</h3>
                      <ScoreGauge score={comparisonData.target_score || 0} />
                   </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                     <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                         <CheckCircle className="w-5 h-5 text-green-500" /> Resolved Vulnerabilities
                     </h3>
                     <div className="space-y-4">
                         {(!comparisonData.resolved_issues || comparisonData.resolved_issues.length === 0) && (
                             <p className="text-slate-500 text-sm italic py-4">No issues were resolved between these scans.</p>
                         )}
                         {comparisonData.resolved_issues?.map((issue: any, i: number) => (
                             <div key={i} className="flex gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                                 <Shield className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                                 <div>
                                     <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{issue.issue}</p>
                                     <p className="text-xs text-slate-500">{issue.layer}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                     <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                         <AlertTriangle className="w-5 h-5 text-red-500" /> New Vulnerabilities
                     </h3>
                     <div className="space-y-4">
                         {(!comparisonData.new_issues || comparisonData.new_issues.length === 0) && (
                             <p className="text-slate-500 text-sm italic py-4">Excellent! No new issues were introduced.</p>
                         )}
                         {comparisonData.new_issues?.map((issue: any, i: number) => (
                             <div key={i} className="flex gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                 <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                                 <div>
                                     <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{issue.issue}</p>
                                     <p className="text-xs text-slate-500">{issue.layer} • Severity: {issue.severity}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

              </div>
              
          </div>
      )}

    </div>
  );
}
