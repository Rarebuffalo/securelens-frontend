"use client";

import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { Download, Search, Settings, Filter, DownloadCloud, Activity, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ScansHistoryPage() {
  const [selectedScans, setSelectedScans] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: scansResponse, isLoading } = useQuery({
    queryKey: ['scansHistory'],
    queryFn: scansApi.getScans,
  });

  const { data: trends } = useQuery({
    queryKey: ['trends'],
    queryFn: scansApi.getTrends,
  });

  const scans = scansResponse?.scans || [];

  const chartData = useMemo(() => {
    if (!scans || scans.length === 0) return [];
    // Take up to 15 most recent scans, reverse so oldest is first for the x-axis
    return [...scans].slice(0, 15).reverse().map((scan: any, i: number) => ({
      name: new Date(scan.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      score: scan.security_score,
      id: scan.id.split('-')[0].toUpperCase(),
    }));
  }, [scans]);

  const filteredScans = useMemo(() => {
      if (!searchQuery) return scans;
      return scans.filter((scan: any) => scan.url.toLowerCase().includes(searchQuery.toLowerCase()) || scan.id.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [scans, searchQuery]);

  const toggleSelect = (id: string) => {
      setSelectedScans(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
      if (selectedScans.length === filteredScans.length) {
          setSelectedScans([]);
      } else {
          setSelectedScans(filteredScans.map((s: any) => s.id));
      }
  };

  return (
    <div className="w-full space-y-8 pb-10">
      
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Scan Repositories</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Historical view of your security posture across the entire application portfolio.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Total Scans</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{trends?.total_scans || 0}</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Average Health</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{trends?.average_score || 0}</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Issues Patched</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">--</span>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center p-3 rounded-xl shadow-sm transition-colors ml-auto lg:ml-4">
                <DownloadCloud className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-[#2D2A32] dark:bg-slate-800 border border-slate-800 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start mb-8">
              <div>
                  <h3 className="text-white font-bold text-lg mb-1">Vulnerability Remediation Velocity</h3>
                  <p className="text-slate-400 text-sm font-medium">Tracking aggregate security score improvements across all endpoints over the last month.</p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-2">
                  <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">30 Days</span>
                  <span className="bg-transparent text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold px-3 py-1.5 rounded-lg">90 Days</span>
              </div>
          </div>

          <div className="h-[250px] w-full relative z-10">
              {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} dx={-10} domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={4} dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
                    </LineChart>
                 </ResponsiveContainer>
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">Not enough data to graph</div>
              )}
          </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                      type="text" 
                      placeholder="Search targets or IDs..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium transition-colors"
                  />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm tracking-wide hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-colors">
                      <Filter className="w-4 h-4" /> Filters
                  </button>
              </div>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                      <tr>
                          <th className="px-6 py-4 w-10">
                              <input 
                                type="checkbox" 
                                checked={filteredScans.length > 0 && selectedScans.length === filteredScans.length}
                                onChange={toggleSelectAll}
                                className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                              />
                          </th>
                          <th className="px-6 py-4">Target URI</th>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Last Scan</th>
                          <th className="px-6 py-4">Health Score</th>
                          <th className="px-6 py-4">Endpoint</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {isLoading && (
                          <tr><td colSpan={7} className="px-6 py-10 text-center"><div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" /></td></tr>
                      )}
                      {!isLoading && filteredScans.length === 0 && (
                          <tr><td colSpan={7} className="px-6 py-10 text-center text-slate-500">No scans found matching your search.</td></tr>
                      )}
                      {!isLoading && filteredScans.map((scan: any) => {
                          const isSafe = scan.security_score >= 80;
                          const isWarning = scan.security_score >= 50 && scan.security_score < 80;
                          
                          // Very basic domain extraction for visual appeal
                          let domain = "N/A";
                          try {
                              domain = new URL(scan.url).hostname;
                          } catch {
                              domain = scan.url;
                          }

                          return (
                            <tr key={scan.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedScans.includes(scan.id)}
                                        onChange={() => toggleSelect(scan.id)}
                                        className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                                    />
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <Link href={`/dashboard/scans/${scan.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {domain}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono text-slate-400 uppercase">
                                    {scan.id.split('-')[0]}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isSafe ? 'bg-green-500' : isWarning ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isSafe ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : isWarning ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {scan.security_score} {isSafe ? 'Safe' : isWarning ? 'Warning' : 'Critical'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                                    /*
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/dashboard/scans/${scan.id}`} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
