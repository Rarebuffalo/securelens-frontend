"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";

const staggerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await authApi.login({ email, password });
      
      // Token structure usually contains access_token based on our API spec
      const token = data.access_token;
      if (!token) throw new Error("Invalid token received from server");

      // Temporarily store token so getMe() can attach it
      localStorage.setItem("securelens_token", token);
      
      // Fetch user context
      const userData = await authApi.getMe();

      login(token, userData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div custom={0} initial="hidden" animate="visible" variants={staggerVariants} className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard.</p>
      </motion.div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3 text-sm font-medium"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <motion.div custom={1} initial="hidden" animate="visible" variants={staggerVariants}>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              placeholder="you@company.com"
            />
          </div>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={staggerVariants}>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={staggerVariants}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none group shadow-md shadow-slate-900/10"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign in to Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      </form>

      <motion.p custom={4} initial="hidden" animate="visible" variants={staggerVariants} className="mt-8 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Create an account
        </Link>
      </motion.p>
    </div>
  );
}
