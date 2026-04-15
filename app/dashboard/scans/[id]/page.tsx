"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { scansApi } from "@/lib/api/scans";
import { aiApi } from "@/lib/api/ai";
import { ArrowLeft, Clock, ShieldAlert, CheckCircle, FileText, Download, Send, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScoreGauge from "@/components/ScoreGauge";

// The Chat Sidebar Component
const ChatSidebar = ({ scanId }: { scanId: string }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hi! Let's get to work fixing these vulnerabilities. Since I already analyzed this scan, ask me anything about the issues found!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl shadow-blue-900/10 max-h-[800px]">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <h3 className="font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Remediation Copilot
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700 leading-relaxed'}`}>
                {m.content}
             </div>
          </motion.div>
        ))}
        {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
         <form onSubmit={handleSend} className="relative">
             <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask how to fix your headers..."
                className="w-full bg-slate-800 text-white placeholder:text-slate-500 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700"
                disabled={isTyping}
             />
             <button type="submit" disabled={!input || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white disabled:opacity-50 hover:bg-blue-500 transition-colors">
                <Send className="w-4 h-4" />
             </button>
         </form>
      </div>
    </div>
  );
};

export default function ScanDetailsPage() {
  const params = useParams();
  const scanId = params.id as string;

  const { data: scan, isLoading: scanLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: () => scansApi.getScanDetails(scanId),
  });

  const { data: narrative, isLoading: narrativeLoading } = useQuery({
    queryKey: ['threat-narrative', scanId],
    queryFn: () => aiApi.getThreatNarrative(scanId),
    enabled: !!scanId // Only fetch narrative once we have the ID
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const token = typeof window !== 'undefined' ? localStorage.getItem('securelens_token') : '';

  const handleExport = (type: 'pdf' | 'csv') => {
      // Basic browser download by hitting the endpoint with auth header via fetch, then creating blob URL.
      // Since native <a> tags can't send Auth headers easily, we do it manually.
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
             <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
         </div>
      );
  }

  if (!scan) return <div>Scan not found</div>;

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col md:flex-row gap-6">
      
      {/* Scrollable Left Content */}
      <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-6 scrollbar-hide">
        
        <Link href="/dashboard/scans" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-2 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>
        
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 truncate max-w-[400px] lg:max-w-xl" title={scan.url}>
                    {scan.url}
                </h1>
                <p className="flex items-center gap-2 text-slate-500 font-medium">
                    <Clock className="w-4 h-4" /> {new Date(scan.created_at || new Date()).toLocaleString()}
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-bold text-slate-600 ml-2 border border-slate-200">ID: {scan.id.split('-')[0]}</span>
                </p>
            </div>

            <div className="flex gap-2">
                <button onClick={() => handleExport('csv')} className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 shadow-sm transition-all text-sm">
                    <FileText className="w-4 h-4" /> CSV
                </button>
                <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-sm transition-all text-sm">
                    <Download className="w-4 h-4" /> PDF Report
                </button>
            </div>
        </div>

        {/* Threat Narrative View */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-200 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/40 blur-3xl rounded-full" />
            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 relative z-10">
               <AlertTriangle className="w-5 h-5 text-indigo-600" /> Executive Threat Narrative
            </h3>
            {narrativeLoading ? (
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-indigo-200/50 rounded w-full" />
                    <div className="h-4 bg-indigo-200/50 rounded w-5/6" />
                    <div className="h-4 bg-indigo-200/50 rounded w-4/6" />
                </div>
            ) : (
                <p className="text-indigo-900/80 leading-relaxed relative z-10 font-medium">
                    {narrative?.narrative || "No narrative could be generated. Fix critical issues and rescan."}
                </p>
            )}
        </div>

        {/* Score & Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                <ScoreGauge score={scan.security_score} />
                <div className={`mt-6 px-4 py-1.5 rounded-full text-sm font-bold ${scan.security_score >= 80 ? 'bg-green-50 text-green-700' : scan.security_score >= 50 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                  {scan.security_score >= 80 ? 'Low Risk' : scan.security_score >= 50 ? 'Moderate Risk' : 'High Risk Profile'}
                </div>
              </div>

              {/* Layers Card */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest text-slate-400">Tested Layers</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(scan.layers || {}).map(([layerName, data]: [string, any]) => {
                        const isGreen = data === 'Safe' || data?.status === 'green';
                        const isYellow = data === 'Warning' || data?.status === 'yellow';
                        return (
                            <div key={layerName} className={`p-3 rounded-2xl border ${isGreen ? 'bg-green-50 border-green-100' : isYellow ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'}`}>
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold text-slate-900 text-sm">{layerName}</span>
                                    {isGreen ? <CheckCircle className="w-4 h-4 text-green-600" /> : <ShieldAlert className={`w-4 h-4 ${isYellow ? 'text-yellow-600' : 'text-red-600'}`} />}
                                </div>
                            </div>
                        );
                    })}
                 </div>
              </div>
        </div>

        {/* Issues List */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-slate-400" />
                Detections Sandbox
            </h3>
            
            <div className="space-y-4">
                {scan.issues && scan.issues.length > 0 ? scan.issues.map((issue: any, i: number) => (
                    <div key={i} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                issue.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                issue.severity === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                            }`}>
                                {issue.severity || issue.contextual_severity}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{issue.layer}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{issue.issue}</h4>
                        {issue.explanation && <p className="text-sm text-slate-600 mb-4">{issue.explanation}</p>}

                        <div className="bg-slate-900 rounded-xl p-4">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Remediation Snippet</span>
                            <code className="text-sm text-blue-400 font-mono block overflow-x-auto whitespace-pre-wrap">
                                {issue.remediation_snippet || issue.fix || "Check Ask-AI."}
                            </code>
                        </div>
                    </div>
                )) : (
                    <div className="p-8 text-center text-slate-500 font-medium">No pressing issues found.</div>
                )}
            </div>
        </div>

      </div>

      {/* Right Fixed AI Chat Sidebar */}
      <div className="hidden lg:block w-[400px] flex-shrink-0">
          <ChatSidebar scanId={scanId} />
      </div>

    </div>
  );
}
