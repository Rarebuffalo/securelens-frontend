"use client";

import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SecureLens</span>
        </div>
        <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-sm">
                Get Started
            </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        
        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                App security posture, <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    analyzed in seconds.
                </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect your targets, gain instantaneous intelligence on your vulnerabilities, and receive actionable remediation workflows powered by advanced AI contextual analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
                    Start Scanning Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                    Access Dashboard
                </Link>
            </div>
        </motion.div>
      </main>
    </div>
  );
}
