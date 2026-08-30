"use client";

import { useState } from "react";
import { Check, Copy, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function GetStartedSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeQuickstart, setActiveQuickstart] = useState<"cli" | "offline" | "docker">("cli");
  const [copied, setCopied] = useState(false);

  const cliCmd = "pipx install git+https://github.com/Rarebuffalo/securelens-backend.git#subdirectory=cli\nsecurelens configure\nsecurelens scan .";
  const offlineCmd = "securelens scan ./my-project --no-ai\n# Runs deterministic pattern matching locally without external LLM calls";
  const dockerCmd = "git clone https://github.com/Rarebuffalo/securelens-backend.git\ncd securelens-backend\ndocker compose up --build\n# Backend server runs at http://localhost:8000 (API Docs at /docs)";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const currentCode =
    activeQuickstart === "cli"
      ? cliCmd
      : activeQuickstart === "offline"
      ? offlineCmd
      : dockerCmd;

  return (
    <section id="quickstart" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (07) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">07</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">quickstart & deployment</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Left Column: Quickstart Installation Commands */}
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
                Start investigating your app security posture.
              </h2>
              <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Install the lightweight CLI for local scanning or deploy the central FastAPI server with PostgreSQL and Docker Compose for team persistence and scan synchronization.
              </p>

              {/* Quickstart Tab Selector */}
              <div className="mt-8">
                <div className="flex gap-2 border-b border-[var(--border)] pb-2 font-mono text-xs">
                  <button
                    onClick={() => setActiveQuickstart("cli")}
                    className={`px-3 py-1 transition-colors ${
                      activeQuickstart === "cli"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-bold"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    [1] Local CLI Setup
                  </button>
                  <button
                    onClick={() => setActiveQuickstart("offline")}
                    className={`px-3 py-1 transition-colors ${
                      activeQuickstart === "offline"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-bold"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    [2] Offline Scanning
                  </button>
                  <button
                    onClick={() => setActiveQuickstart("docker")}
                    className={`px-3 py-1 transition-colors ${
                      activeQuickstart === "docker"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-bold"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    [3] Docker Server
                  </button>
                </div>

                {/* Command Box */}
                <div className="mt-4 border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
                  <div className="flex items-center justify-between text-xs text-[var(--faint)] mb-2">
                    <span>
                      {activeQuickstart === "cli"
                        ? "pipx / pip binary"
                        : activeQuickstart === "offline"
                        ? "no external api dependencies"
                        : "docker compose production stack"}
                    </span>
                    <button
                      onClick={() => handleCopy(currentCode)}
                      className="flex items-center gap-1 text-[var(--accent)] hover:underline text-[11px]"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy Command"}</span>
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-xs text-[var(--text)] leading-relaxed whitespace-pre font-mono p-3 bg-[var(--canvas)] border border-[var(--border)]">
                    {currentCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live API & Release Notification Box */}
          <div className="h-full border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                  securelens://api/live-endpoints
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                ONLINE
              </span>
            </div>

            <div className="p-6 font-mono text-xs">
              <div className="mb-5 border border-[var(--border)] bg-[var(--canvas)] p-4">
                <div className="text-[10px] text-[var(--faint)] uppercase tracking-wider mb-1">
                  Public Backend Deployment
                </div>
                <div className="font-semibold text-[var(--text)] flex items-center justify-between">
                  <span className="truncate mr-2">https://securelens-backend.onrender.com</span>
                  <a
                    href="https://securelens-backend.onrender.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline flex items-center gap-1 text-[11px] shrink-0 font-medium"
                  >
                    <span>Swagger Docs</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
                <div className="mt-2 text-[11px] text-[var(--muted)]">
                  Healthcheck endpoint: <code className="text-[var(--accent)]">GET /health</code>
                </div>
              </div>

              {submitted ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--accent)] mb-2" />
                  <h3 className="text-sm font-bold text-[var(--text)]">Subscribed!</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    You will receive GitHub release notes and security updates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="text-xs text-[var(--muted)] leading-relaxed">
                    Get notified about new releases, custom YAML rules, and CI/CD packages:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@company.com"
                      className="flex-1 bg-[var(--canvas)] border border-[var(--border)] px-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--faint)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 border border-[var(--accent)] bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent-dim)] transition-colors shadow-xs"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
