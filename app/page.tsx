"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import EvidenceSection from "@/components/EvidenceSection";
import FeaturesSection from "@/components/FeaturesSection";
import InteractivePlayground from "@/components/InteractivePlayground";
import WorkflowSection from "@/components/WorkflowSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import GetStartedSection from "@/components/GetStartedSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--canvas)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white">
      {/* Sticky Monospace Header */}
      <Navbar />

      {/* Main Landing Page Stream */}
      <main className="flex flex-col flex-1">
        <HeroSection />
        <ProblemSection />
        <EvidenceSection />
        <FeaturesSection />
        <InteractivePlayground />
        <WorkflowSection />
        <IntegrationsSection />
        <GetStartedSection />
      </main>

      {/* Developer Footer */}
      <Footer />
    </div>
  );
}
