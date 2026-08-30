"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Copy, Terminal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const installCmd = "pipx install git+https://github.com/Rarebuffalo/securelens-backend.git#subdirectory=cli";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Interactive Live Canvas Network Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Simulated nodes in security pattern & network graph
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      label: string;
      type: "critical" | "high" | "medium" | "safe" | "engine";
      radius: number;
    }

    const labels = [
      { label: "auth.py:5 [AWS Key ID]", type: "critical" as const },
      { label: "runner.py:6 [shell=True]", type: "high" as const },
      { label: "users.py [Raw SQL String]", type: "high" as const },
      { label: "SSL/TLS: Valid 256-bit", type: "safe" as const },
      { label: "Header: Missing CSP", type: "medium" as const },
      { label: "Cookie: HttpOnly Set", type: "safe" as const },
      { label: ".env probe: Blocked 403", type: "safe" as const },
      { label: "Path Walker: .gitignore", type: "safe" as const },
      { label: "SSRF Guard: RFC 1918 Block", type: "safe" as const },
      { label: "Threat Context: Optional AI", type: "engine" as const },
    ];

    const nodes: Node[] = labels.map((item, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const dist = Math.min(width, height) * 0.28 + (Math.random() * 40 - 20);
      return {
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        label: item.label,
        type: item.type,
        radius: item.type === "critical" ? 6 : item.type === "high" ? 5 : 4,
      };
    });

    // Central Engine Node
    const centerNode: Node = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      label: "SECURELENS ENGINE",
      type: "engine",
      radius: 9,
    };

    let scanAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radar scan pulse from center
      scanAngle += 0.015;
      ctx.save();
      ctx.translate(centerNode.x, centerNode.y);
      const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.min(width, height) * 0.45);
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Scanline beam
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(
        0,
        0,
        Math.min(width, height) * 0.45,
        scanAngle - 0.25,
        scanAngle + 0.05
      );
      ctx.closePath();
      const sweepGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height) * 0.45);
      sweepGradient.addColorStop(0, "rgba(16, 185, 129, 0.25)");
      sweepGradient.addColorStop(1, "rgba(16, 185, 129, 0.01)");
      ctx.fillStyle = sweepGradient;
      ctx.fill();
      ctx.restore();

      // Draw connections
      nodes.forEach((node) => {
        // Move slightly
        node.x += node.vx;
        node.y += node.vy;

        // Bounce within boundaries
        if (node.x < 40 || node.x > width - 40) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;

        // Line to center
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        if (node.type === "critical") {
          ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
          ctx.lineWidth = 1.5;
        } else if (node.type === "high") {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
          ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Draw node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.type === "critical") {
          ctx.fillStyle = "#ef4444";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 10;
        } else if (node.type === "high") {
          ctx.fillStyle = "#f59e0b";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 8;
        } else if (node.type === "medium") {
          ctx.fillStyle = "#06b6d4";
          ctx.shadowColor = "#06b6d4";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = "#10b981";
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw Node Label tag
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = node.type === "critical" ? "#ef4444" : node.type === "high" ? "#f59e0b" : "#9ca3af";
        ctx.fillText(node.label, node.x + 10, node.y + 3);
      });

      // Draw Center Node
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = "bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "#10b981";
      ctx.textAlign = "center";
      ctx.fillText("[ DETERMINISTIC SCORING ENGINE ]", centerNode.x, centerNode.y - 16);
      ctx.textAlign = "start";

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--border)] bg-grid">
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        {/* Monospace Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs text-[var(--accent)]"
        >
          <span className="text-[var(--faint)]">[</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>AI-Assisted AppSec Analysis & Local Security Investigation Layer</span>
          <span className="text-[var(--faint)]">]</span>
        </motion.div>

        {/* ASCII Art Brand Heading */}
        <div className="mt-7 overflow-x-auto">
          <h1 className="relative">
            <span className="sr-only">
              SecureLens: AI-assisted AppSec analysis platform and local security investigation layer.
            </span>
            <pre
              aria-hidden="true"
              className="select-none overflow-hidden whitespace-pre font-mono leading-[1.02] text-[var(--text)] [font-size:clamp(6px,1.9vw,15px)] font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
            >
{` ███████╗███████╗ ██████╗██╗   ██╗██████╗ ███████╗██╗     ███████╗███╗   ██╗███████╗
 ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██╔════╝██║     ██╔════╝████╗  ██║██╔════╝
 ╚█████╗ █████╗  ██║     ██║   ██║██████╔╝█████╗  ██║     █████╗  ██╔██╗ ██║███████╗
  ╚═══██╗██╔══╝  ██║     ██║   ██║██╔══██╗██╔══╝  ██║     ██╔══╝  ██║╚██╗██║╚════██║
 ██████╔╝███████╗╚██████╗╚██████╔╝██║  ██║███████╗███████╗███████╗██║ ╚████║███████║
 ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝`}
            </pre>
          </h1>
        </div>

        {/* Primary Product Definition */}
        <p className="mt-6 max-w-3xl font-mono text-base text-[var(--muted)] sm:text-lg leading-relaxed">
          SecureLens is an AI-assisted AppSec analysis platform that sits above security scanners and turns raw code and web-security findings into{" "}
          <span className="text-[var(--text)] font-semibold">prioritized, explainable security investigations</span> and{" "}
          <span className="text-[var(--accent)] font-semibold">remediation guidance</span> with deterministic 0–100 risk scoring.
        </p>

        {/* Quick Action Toolbar & Install Bar */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* 1-Click Copy Install Command */}
          <div className="w-full max-w-xl">
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`Copy install command: ${installCmd}`}
              className="group flex w-full items-center justify-between gap-3 border border-[var(--border-strong)] bg-[var(--surface)]/80 px-4 py-3 font-mono text-xs sm:text-sm text-left transition-all hover:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <span className="text-[var(--accent)] select-none font-bold">$</span>
                <code className="min-w-0 truncate text-[var(--text)] font-mono">
                  {installCmd}
                </code>
              </div>
              <div className="shrink-0 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span className="text-[var(--accent)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </button>
            <p className="mt-2 text-[11px] font-mono text-[var(--faint)]">
              # Offline code scanning with `--no-ai` runs locally without sending code to an external LLM provider
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#quickstart"
              className="inline-flex items-center justify-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-mono text-sm font-semibold text-white transition-all hover:bg-[var(--accent-dim)] hover:border-[var(--accent-dim)] shadow-md"
            >
              <Terminal className="h-4 w-4" />
              <span>Install CLI</span>
            </Link>

            <Link
              href="#playground"
              className="inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 font-mono text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Try Live Playground</span>
              <ArrowRight className="h-4 w-4 text-[var(--accent)]" />
            </Link>
          </div>
        </div>

        {/* Live Visualizer Panel */}
        <div className="relative mt-10 h-[58vh] max-h-[32rem] min-h-[340px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]/50 shadow-[var(--panel-shadow)]">
          {/* Window Header Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                securelens://live-analysis/pattern-graph
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-[var(--accent)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-blink" />
                <span>ACTIVE MONITOR</span>
              </div>
              <span className="hidden sm:inline text-[var(--faint)]">|</span>
              <span className="hidden sm:inline text-[var(--muted)]">112 tests passing (100%)</span>
            </div>
          </div>

          {/* Canvas container */}
          <div className="relative h-[calc(100%-38px)] w-full">
            <canvas ref={canvasRef} className="h-full w-full block" />
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md border border-[var(--border-strong)] bg-[var(--canvas)]/90 backdrop-blur-md p-3.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[var(--faint)] text-[10px] uppercase tracking-wider mb-1.5">
                <span>Deterministic Scoring Engine</span>
                <span className="text-[var(--danger)] font-bold">Grade: D (68/100)</span>
              </div>
              <div className="text-[var(--text)] text-[11px] leading-relaxed">
                Found 1 Critical (AWS Key ID: <span className="text-[var(--danger)]">-20</span>), 1 High (shell=True: <span className="text-[var(--warning)]">-12</span>). Threat context & remediation ready.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
