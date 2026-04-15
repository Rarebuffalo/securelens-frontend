"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { LogOut, LayoutDashboard, Search, History, Settings, Menu, X, Shield, Bell, HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scan", href: "/dashboard/scan", icon: Shield },
  { name: "History", href: "/dashboard/scans", icon: History },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const BOTTOM_ITEMS = [
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  { name: "Account", href: "/dashboard/account", icon: User },
];

const NavLinks = ({ items, onClick, pathname }: { items: any[], onClick?: () => void, pathname: string }) => (
  <>
    {items.map((item) => {
      const Icon = item.icon;
      // Exact match for dashboard to avoid active state on all subroutes, except if it's not base route
      const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
      
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-2.5 my-0.5 rounded-lg transition-all font-medium text-sm ${
            isActive 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
          {item.name}
        </Link>
      );
    })}
  </>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Click outside listener for dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotifsOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col md:flex-row">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-md">
                <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">SecureLens</span>
        </div>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-500 dark:text-slate-400">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-[60px] left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-40"
          >
            <div className="p-4 flex flex-col gap-2">
              <NavLinks items={NAV_ITEMS} onClick={() => setMobileMenuOpen(false)} pathname={pathname} />
              <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
              <NavLinks items={BOTTOM_ITEMS} onClick={() => setMobileMenuOpen(false)} pathname={pathname} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-[#090b14] border-r border-slate-200 dark:border-slate-800/80 h-screen sticky top-0 px-4 py-6 z-10 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-600/30">
                <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest text-slate-900 dark:text-white leading-tight">SECURELENS</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider">COMMAND CENTER</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1 mb-8">
            <NavLinks items={NAV_ITEMS} pathname={pathname} />
          </nav>
        </div>

        <div className="flex flex-col gap-1 mb-6">
            <NavLinks items={BOTTOM_ITEMS} pathname={pathname} />
        </div>

        <button onClick={() => router.push('/dashboard/scan')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2.5 transition-all text-sm shadow-md shadow-indigo-600/20">
            New Scan
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] flex flex-col min-h-screen">
        
        {/* Top Header Bar */}
        <header className="hidden md:flex h-16 w-full items-center justify-between px-8 z-10 bg-inherit py-4">
            <div className="flex-1 flex max-w-xl">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search assets, domains..." 
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-colors placeholder:text-slate-400 shadow-sm"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                <ThemeToggle />
                
                <div className="relative">
                  <button 
                    onClick={() => { setNotifsOpen(!notifsOpen); setProfileOpen(false); }} 
                    className={`relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors ${notifsOpen ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : ''}`}
                  >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                  </button>
                  
                  <AnimatePresence>
                  {notifsOpen && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden z-50">
                         <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                           <h3 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h3>
                           <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800">Clear</button>
                         </div>
                         <div className="p-6 text-center text-sm text-slate-500 flex flex-col items-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-3">
                                <Bell className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                            </div>
                            You&apos;re all caught up!
                         </div>
                      </motion.div>
                  )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <div 
                    onClick={() => { setProfileOpen(!profileOpen); setNotifsOpen(false); }}
                    className={`relative cursor-pointer h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform hover:scale-105 ${profileOpen ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950' : ''}`}
                  >
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>

                  <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden z-50 py-2">
                         <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2 bg-slate-50/50 dark:bg-slate-800/10">
                           <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.username || 'user'}</p>
                           <p className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
                         </div>
                         <Link href="/dashboard/account" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <User className="w-4 h-4" /> Account Settings
                         </Link>
                         <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <Settings className="w-4 h-4" /> System Preferences
                         </Link>
                         <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                         <button onClick={() => { setProfileOpen(false); logout(); }} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                            <LogOut className="w-4 h-4" /> Sign Out Session
                         </button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
            </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
            
            {/* Footer */}
            <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <p>&copy; {(new Date()).getFullYear()} SECURELENS SYSTEMS INC.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">API DOCS</Link>
                    <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">PRIVACY PROTOCOL</Link>
                    <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">SYSTEM STATUS</Link>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
