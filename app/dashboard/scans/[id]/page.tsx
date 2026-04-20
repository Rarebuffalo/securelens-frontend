"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { aiApi } from "@/lib/api/ai";
import { ArrowLeft, Clock, ShieldAlert, CheckCircle, FileText, Download, Send, Sparkles, AlertTriangle, Hash, Shield, Search, Database, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ChatSidebar = ({ scanId }: { scanId: string }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Think of your database as a locked room. A SQL injection is like someone slipping a note under the door that tricks the guard inside into letting them in without a key." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await aiApi.sendChatMessage(scanId, userMessage);
      setMessages(prev => [...prev, { role: 'ai', content: response.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I had trouble reaching the AI engine. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-0">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div className="bg-indigo-600 p-2 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="font-bold text-slate-900 dark:text-white">SecureLens AI</h3>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase">System Analyst • Active</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-hide">
        {messages.map((m, i) => (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[90%] rounded-2xl px-5 py-3.5 shadow-sm text-sm ${
                 m.role === 'user' 
                 ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100 rounded-br-none' 
                 : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none border border-slate-100 dark:border-slate-700'
             }`}>
                {m.content}
             </div>
          </motion.div>
        ))}
        {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 items-center border border-slate-100 dark:border-slate-700">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
         <form onSubmit={handleSend} className="relative mt-2">
             <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI anything..."
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl pl-4 pr-14 py-4 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                disabled={isTyping}
             />
             <button type="submit" disabled={!input || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 rounded-xl text-white disabled:opacity-50 hover:bg-indigo-700 transition-colors">
                <Send className="w-4 h-4 ml-0.5" />
             </button>
         </form>
         <div className="flex gap-2 mt-4 text-xs font-bold text-slate-500 justify-center">
             <button onClick={() => { setInput("Provide a patch guide"); handleSend(); }} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">PATCH GUIDE</button>
             <button onClick={() => { setInput("Assess risk level"); handleSend(); }} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">RISK LEVEL</button>
         </div>
      </div>
    </div>
  );
};

export default function ScanDetailsPage() {
  const params = useParams();
  const scanId = params.id as string;
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const { data: scan, isLoading: scanLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: () => scansApi.getScanDetails(scanId),
  });

  const { data: narrative, isLoading: narrativeLoading } = useQuery({
    queryKey: ['threat-narrative', scanId],
    queryFn: () => aiApi.getThreatNarrative(scanId),
    enabled: !!scanId
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const token = typeof window !== 'undefined' ? localStorage.getItem('securelens_token') : '';

  const handleExport = (type: 'pdf' | 'csv') => {
      fetch(`${BASE_URL}/scans/${scanId}/export/${type}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.blob())
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `securelens_report_${scanId}.${type}`;
          document.body.appendChild(a);
          a.click();
          a.remove();
      });
  };

  if (scanLoading) {
      return (
         <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
         </div>
      );
  }

  if (!scan) return <div>Scan not found</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Navigation / Header */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
            <div className="flex gap-6 font-semibold text-sm">
                <span className="text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-1">Scan Details</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer pb-1">Infrastructure</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer pb-1">Network</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer pb-1">Assets</span>
            </div>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {scan.security_score < 50 ? 'High Risk' : scan.security_score < 80 ? 'Moderate Risk' : 'Low Risk'}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">Scan ID: {scan.id.split('-')[0].toUpperCase()}</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 truncate max-w-xl" title={scan.url}>
                    {scan.url}
                </h1>
                <p className="text-slate-500 font-medium text-sm">
                    Initiated on {new Date(scan.created_at).toUTCString()}
                </p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-sm">
                    <FileText className="w-4 h-4" /> PDF Report
                </button>
                <button onClick={() => handleExport('csv')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-sm transition-colors text-sm">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>
        </div>

        {/* Hero Cards Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Score Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                        {/* Dynamic stroke depending on score length */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-purple-600 dark:text-purple-500" strokeDasharray={`${283 * (scan.security_score / 100)} 283`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                        <span className="text-5xl font-black text-slate-900 dark:text-white leading-none mb-1">{scan.security_score}</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Safety Score</span>
                    </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Your score is <strong className="text-red-500">{100 - scan.security_score}% lower</strong> than the industry average for Fintech sectors.
                </p>
            </div>

            {/* Threat Narrative */}
            <div className="bg-purple-50 shrink-0 dark:bg-purple-900/10 border-l-4 border-l-purple-600 rounded-r-3xl rounded-bl-xl p-8 relative">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 text-xs tracking-widest uppercase">
                    <Sparkles className="w-4 h-4 text-purple-600" /> Threat Narrative
                </h3>
                {narrativeLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-purple-200 dark:bg-purple-800/50 rounded w-full" />
                        <div className="h-4 bg-purple-200 dark:bg-purple-800/50 rounded w-5/6" />
                        <div className="h-4 bg-purple-200 dark:bg-purple-800/50 rounded w-4/6" />
                    </div>
                ) : (
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-sm italic">
                        &quot;{narrative?.narrative || "No narrative generated."}&quot;
                    </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                    Recommended immediate action: Review the critical issues in the list below and deploy the suggested remediation patches.
                </p>
            </div>
        </div>

        {/* Layers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(scan.layers || {}).slice(0, 4).map(([layerName, layerData]: [string, any], index) => {
                 const isSafe = layerData === 'Safe' || layerData?.status === 'green';
                 const issuesText = isSafe ? '0 Critical Issues' : 'Issues Found';
                 return (
                    <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-3">
                            <Database className="w-5 h-5 text-slate-400" />
                            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${isSafe ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {isSafe ? 'Healthy' : 'Critical'}
                            </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{layerName}</h4>
                        <p className="text-xs text-slate-500 font-medium">{issuesText}</p>
                    </div>
                 )
            })}
        </div>

        {/* Vulnerabilities Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Detected Vulnerabilities</h3>
                <div className="flex gap-2">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg">Severity: High</span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg">Layer: All</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-900/50 hidden md:table-header-group">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-widest">Severity</th>
                            <th className="px-6 py-4 font-bold tracking-widest">Vulnerability</th>
                            <th className="px-6 py-4 font-bold tracking-widest">Location</th>
                            <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                            <th className="px-6 py-4 font-bold tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {scan.issues?.map((issue: any, index: number) => {
                            const isCritical = issue.severity === 'Critical';
                            const isExpanded = expandedIssue === index;
                            return (
                                <React.Fragment key={index}>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors flex flex-col md:table-row py-4 md:py-0 border-b border-slate-100 dark:border-slate-800">
                                        <td className="px-6 py-2 md:py-5">
                                            <span className={`inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${
                                                isCritical ? 'bg-red-100 text-red-700 dark:bg-red-900/30 xl:bg-red-100' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30'
                                            }`}>
                                                {issue.severity || 'High'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-2 md:py-5 font-bold text-slate-900 dark:text-white max-w-sm">
                                            {issue.issue}
                                        </td>
                                        <td className="px-6 py-2 md:py-5 text-slate-500 font-mono text-xs">
                                            {issue.layer} {issue.context ? '/...' : ''}
                                        </td>
                                        <td className="px-6 py-2 md:py-5">
                                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-xs">
                                                <div className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500' : 'bg-purple-500'}`} />
                                                Open
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 md:py-5 text-right">
                                            <button 
                                                onClick={() => setExpandedIssue(isExpanded ? null : index)}
                                                className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px] tracking-widest hover:text-indigo-800 transition-colors"
                                            >
                                                {isExpanded ? 'Hide' : 'Expand'}
                                            </button>
                                        </td>
                                    </tr>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.tr 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden"
                                            >
                                                <td colSpan={5} className="px-6 py-6 pb-8 border-b border-slate-200 dark:border-slate-700">
                                                    <div className="bg-[#2D2A32] rounded-2xl p-6 shadow-sm">
                                                        <h4 className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-4">
                                                            <Fingerprint className="w-4 h-4" /> Remediation Snippet
                                                        </h4>
                                                        <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                                                            {issue.remediation_snippet || issue.fix || "// Review the vulnerability explanation and apply standard security patches."}
                                                        </pre>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Right Fixed AI Chat Sidebar */}
      <div className="hidden xl:flex w-[350px] flex-shrink-0 flex-col gap-6">
          <ChatSidebar scanId={scanId} />
          
          {/* Security Tip Card */}
          <div className="bg-[#2D2A32] rounded-3xl p-6 text-white relative overflow-hidden flex-shrink-0">
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white/5" />
             </div>
             <h4 className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-3">Security Tip</h4>
             <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                Implementing a Content Security Policy (CSP) header would mitigate 40% of the minor XSS warnings found in this scan.
             </p>
             <button className="text-xs font-bold text-purple-400 hover:text-purple-300 border-b border-purple-400/30 pb-0.5 transition-colors">
                 Generate Policy
             </button>
          </div>
      </div>

    </div>
  );
}

