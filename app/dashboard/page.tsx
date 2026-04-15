"use client";

import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { Activity, AlertTriangle, CheckCircle, Clock, History } from "lucide-react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function DashboardOverview() {
  const { data: trends, isLoading, isError } = useQuery({
    queryKey: ['trends'],
    queryFn: scansApi.getTrends,
  });

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Overview</h1>
        <p className="text-slate-500 mt-2">Monitor your overall platform health and recent scanning activity.</p>
      </motion.div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {/* KPI Cards Area */}
      {!isLoading && !isError && trends && (
        <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {/* Card 1: Total Scans */}
          <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-600 text-sm">Total Scans</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{trends.total_scans}</p>
          </motion.div>

          {/* Card 2: Avg Score */}
          <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-600 text-sm">Average Score</h3>
            </div>
            <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-slate-900">{trends.average_score}</p>
                <span className="text-sm font-medium text-slate-400 mb-1">/ 100</span>
            </div>
          </motion.div>

           {/* Card 3: Latest Score Mock */}
           <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-600 text-sm">Latest Scan Risk</h3>
            </div>
            <p className="text-lg font-bold text-slate-900">
                {trends.recent_scans && trends.recent_scans.length > 0 
                  ? (trends.recent_scans[0].security_score < 60 ? "High Risk" : trends.recent_scans[0].security_score < 80 ? "Moderate" : "Secure")
                  : "N/A"
                }
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Recent Scans Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white border border-slate-200 rounded-2xl shadow-sm shadow-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-900">Recent Scanning Activity</h2>
        </div>
        
        {isLoading && (
            <div className="p-6">
                <div className="h-4 bg-slate-200 animate-pulse rounded w-1/3 mb-4" />
                <div className="h-4 bg-slate-200 animate-pulse rounded w-full mb-4" />
                <div className="h-4 bg-slate-200 animate-pulse rounded w-2/3" />
            </div>
        )}

        {!isLoading && trends && trends.recent_scans && trends.recent_scans.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <History className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">No scan history yet</h3>
                <p className="text-sm text-slate-500 max-w-sm">Initiate your first scan to populate the dashboard and unlock your security insights.</p>
            </div>
        )}

        {!isLoading && trends && trends.recent_scans && trends.recent_scans.length > 0 && (
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 hidden md:table-header-group">
                <tr>
                    <th className="px-6 py-4 font-medium">Target URL</th>
                    <th className="px-6 py-4 font-medium">Security Score</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {trends.recent_scans.map((scan: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group flex flex-col md:table-row py-4 md:py-0">
                    <td className="px-6 py-2 md:py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${scan.security_score >= 80 ? 'bg-green-500' : scan.security_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        {scan.url}
                    </td>
                    <td className="px-6 py-2 md:py-4 text-slate-600">
                        <span className="md:hidden font-semibold mr-2">Score:</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${scan.security_score >= 80 ? 'bg-green-100 text-green-700' : scan.security_score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {scan.security_score}/100
                        </span>
                    </td>
                    <td className="px-6 py-2 md:py-4 text-slate-500 flex items-center gap-2">
                        <span className="md:hidden font-semibold mr-2 text-slate-600">Date:</span>
                        <Clock className="w-4 h-4" />
                        {new Date(scan.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 md:py-4 text-right">
                        <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100">
                            View Report &rarr;
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
      </motion.div>
    </div>
  );
}
