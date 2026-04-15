"use client";

import { HelpCircle, Mail, MessageCircle, FileText, ChevronDown, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { question: "How does SecureLens calculate the Health Score?", answer: "The Health Score is computed by aggregating vulnerabilities across all scanned layers (dependencies, code, configuration) and factoring in severity weights. Critical vulnerabilities heavily penalize the score." },
  { question: "How often should I scan my infrastructure?", answer: "We recommend scanning your infrastructure on every CI/CD deployment or at least once daily to ensure you are protected against newly disclosed zero-day vulnerabilities." },
  { question: "Can I manage multiple API keys for different environments?", answer: "Yes! Navigate to Platform Settings > API Keys to generate unique scoped keys for development, staging, and production environments." },
  { question: "Is my scan data kept private?", answer: "Absolutely. All scan data is encrypted at rest and in transit. We conform strictly to SOC2 and ISO 27001 standards." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cardStyle = "bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]";

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
          setIsSubmitting(false);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
      }, 1000);
  };

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      
      <div className="flex flex-col justify-start items-start gap-4 mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Support Center
        </h1>
        <p className="text-slate-500 font-medium text-sm max-w-xl">We're here to help! Search through our frequently asked questions or submit a ticket to our security engineering team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
              <div className={`${cardStyle} p-8`}>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                     {FAQS.map((faq, index) => (
                         <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-indigo-500/30">
                             <button
                                 onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                 className="w-full text-left px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-[#090b14]/50 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                             >
                                 <span className="font-bold text-sm text-slate-900 dark:text-white pr-4">{faq.question}</span>
                                 <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                             </button>
                             <AnimatePresence>
                                 {openFaq === index && (
                                     <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                         <div className="px-6 pb-5 pt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                                            {faq.answer}
                                         </div>
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                         </div>
                     ))}
                 </div>
              </div>
          </div>

          <div className="space-y-6">
              
              <div className={`${cardStyle} p-8`}>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Us</h2>
                  
                  {submitted ? (
                      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-6 text-center">
                          <div className="bg-emerald-100 dark:bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Message Sent</h3>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400/80">Our team will get back to you shortly.</p>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Topic</label>
                              <select className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
                                  <option>Billing Question</option>
                                  <option>Security Incident</option>
                                  <option>API Integration Help</option>
                                  <option>General Feedback</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Message</label>
                              <textarea 
                                  required
                                  rows={4} 
                                  placeholder="How can we help?"
                                  className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium placeholder:text-slate-400 resize-none"
                              />
                          </div>
                          <button disabled={isSubmitting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md shadow-indigo-500/20 disabled:opacity-50">
                              {isSubmitting ? 'Sending...' : 'Submit Ticket'}
                          </button>
                      </form>
                  )}
              </div>

              <div className={`${cardStyle} p-6`}>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Other Channels</h3>
                  <div className="space-y-3">
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
                          <MessageCircle className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                          <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">Community Discord</div>
                              <div className="text-[11px] text-slate-500">Join 5,000+ developers</div>
                          </div>
                      </a>
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
                          <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                          <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">Documentation</div>
                              <div className="text-[11px] text-slate-500">API references and guides</div>
                          </div>
                      </a>
                  </div>
              </div>

          </div>

      </div>

    </div>
  );
}
