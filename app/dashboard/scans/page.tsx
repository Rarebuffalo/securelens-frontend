"use client";

import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { History, ShieldAlert, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";


export default function ScansHistoryPage() {
  // According to our plan, /scans returns the full history list
  const { data: scans, isLoading } = useQuery({
    queryKey: ['scansHistory'],
    queryFn: scansApi.getScans,
  });

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Scan History</h1>
            <p className="text-slate-500 mt-2">Browse and review all previously executed security audits.</p>
        </div>
        <Link href="/dashboard/scan" className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
            New Scan
        </Link>
      </motion.div>

      {isLoading && (
        <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-white border border-slate-200 animate-pulse rounded-2xl" />)}
        </div>
      )}

      {!isLoading && scans && scans.scans && scans.scans.length === 0 && (
         <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="bg-slate-50 p-6 rounded-full mb-6">
                 <History className="w-10 h-10 text-slate-400" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">No historical data</h3>
             <p className="text-slate-500 max-w-sm mb-8">You haven&apos;t performed any scans yet. Run your first analysis to see it appear here.</p>
             <Link href="/dashboard/scan" className="bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
                Initiate Analysis
            </Link>
         </div>
      )}

      {!isLoading && scans && scans.scans && scans.scans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scans.scans.map((scan: any, i: number) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={scan.id || i}
                >
                    <Link href={`/dashboard/scans/${scan.id}`} className="block bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group h-full flex flex-col relative overflow-hidden">
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 w-full truncate pr-4">
                                <h3 className="font-bold text-slate-900 truncate text-lg group-hover:text-blue-600 transition-colors" title={scan.url}>{scan.url}</h3>
                                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {new Date(scan.created_at || scan.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${scan.security_score >= 80 ? 'bg-green-500' : scan.security_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        </div>

                        <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-5">
                             <div className="bg-slate-50 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-100">
                                <ShieldAlert className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700">{scan.security_score}<span className="text-slate-400 font-medium">/100</span></span>
                             </div>

                             <div className="ml-auto text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all font-semibold flex items-center gap-1 text-sm">
                                View <ArrowRight className="w-4 h-4" />
                             </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
