"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 font-sans text-slate-900">
      {/* Left side: Animated abstract branding area */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 flex-col py-12 px-16 justify-between">
        
        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400/20 blur-[100px] mix-blend-screen pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SecureLens</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-xl"
        >
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Advanced security scanning, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">simplified for modern teams.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Continuously monitor your application infrastructure, uncover critical vulnerabilities, and get actionable AI-driven insights to secure your stacks instantly.
          </p>
        </motion.div>
        
        <div className="relative z-10 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} SecureLens Platform. All rights reserved.
        </div>
      </div>

      {/* Right side: White clean form area */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 bg-white relative">
        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
