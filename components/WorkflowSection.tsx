"use client";

import { Check } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      tag: "INGEST & SCOPE",
      title: "Target Acquisition",
      description:
        "Accepts local repository paths or live URLs. Traverses directories honoring .gitignore and filters out binary assets. Validates web hostnames and enforces RFC 1918 private IP SSRF blocking.",
      color: "text-[var(--accent)] border-[var(--accent)]",
    },
    {
      number: "02",
      tag: "PATTERN RULES",
      title: "Deterministic Checks",
      description:
        "Scans candidate files with deterministic regex rules for hardcoded credentials, private keys, eval/exec, shell=True, and raw SQL string formatting. Audits TLS certs and web security headers.",
      color: "text-[var(--cyan)] border-[var(--cyan)]",
    },
    {
      number: "03",
      tag: "OPTIONAL AI",
      title: "OWASP Context & Triage",
      description:
        "When enabled, LiteLLM analyzes security-sensitive files (auth handlers, DB connectors, routes) to provide threat context and code-level remediation suggestions. Fully bypassable with --no-ai.",
      color: "text-[var(--warning)] border-[var(--warning)]",
    },
    {
      number: "04",
      tag: "OUTPUT & CI",
      title: "Scoring & Investigation",
      description:
        "Computes transparent 0–100 risk score and letter grade. Loads findings into the stateful interactive CLI REPL, exports local PDF/Markdown/JSON reports, and sets CI pipeline exit codes.",
      color: "text-[var(--accent)] border-[var(--accent)]",
    },
  ];

  return (
    <section id="workflow" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (05) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">05</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">analysis pipeline</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            From raw findings to explainable investigation.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            A structured analysis pipeline that discovers files, applies deterministic rules, calculates mathematical risk scores, and delivers explainable investigations across CLI and reports.
          </p>
        </header>

        {/* CSS-Grid Rebuilt Pipeline Architecture Diagram */}
        <div className="mt-12 border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          {/* Top Stage Bar */}
          <div className="overflow-x-auto">
            <div className="min-w-[720px] font-mono text-xs">
              {/* Column Headings */}
              <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--surface-raised)]">
                <div className="p-3.5 border-r border-[var(--border)] text-left font-bold text-[var(--text)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>TARGET</span>
                </div>
                <div className="p-3.5 border-r border-[var(--border)] text-left font-bold text-[var(--text)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--cyan)]" />
                  <span>FILTER & SCOPE</span>
                </div>
                <div className="p-3.5 border-r border-[var(--border)] text-left font-bold text-[var(--text)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--danger)]" />
                  <span>DETECTION</span>
                </div>
                <div className="p-3.5 border-r border-[var(--border)] text-left font-bold text-[var(--text)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--warning)]" />
                  <span>OPTIONAL AI</span>
                </div>
                <div className="p-3.5 text-left font-bold text-[var(--text)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>DELIVERY</span>
                </div>
              </div>

              {/* Grid Body with Mathematically Aligned Column Connectors */}
              <div className="relative divide-y divide-[var(--border)]/60 bg-[var(--canvas)]">
                {/* Event Row 1: Target Ingestion */}
                <div className="grid grid-cols-5 min-h-[56px] items-center">
                  <div className="p-3 border-r border-[var(--border)] text-[11px] font-semibold text-[var(--text)]">
                    Local Repo / URL
                  </div>
                  <div className="col-span-4 p-3 flex items-center gap-2 text-[11px] text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="font-semibold">$ securelens scan .</span>
                    <span className="text-[var(--faint)]">─────▶</span>
                    <span className="text-[var(--muted)]">Traverse workspace honoring .gitignore</span>
                  </div>
                </div>

                {/* Event Row 2: Filtering & SSRF Validation */}
                <div className="grid grid-cols-5 min-h-[56px] items-center">
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Target Verified
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--cyan)] font-semibold">
                    SSRF Guard & Ignore Spec
                  </div>
                  <div className="col-span-3 p-3 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                    <span className="text-[var(--faint)]">─────▶</span>
                    <span>Blocks RFC 1918 private IPs · Prunes node_modules & binaries</span>
                  </div>
                </div>

                {/* Event Row 3: Deterministic Rule Evaluation */}
                <div className="grid grid-cols-5 min-h-[56px] items-center">
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Candidate Files
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Triage Queue
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--danger)] font-semibold">
                    Regex Pattern Match
                  </div>
                  <div className="col-span-2 p-3 flex items-center gap-2 text-[11px] text-[var(--danger)]">
                    <span className="text-[var(--faint)]">─────▶</span>
                    <span>Flags AWS Keys (-20), shell=True (-12), SQL Interpolation (-12)</span>
                  </div>
                </div>

                {/* Event Row 4: Optional AI Context & Triage */}
                <div className="grid grid-cols-5 min-h-[56px] items-center">
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Raw Matches
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Security-Sensitive
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Finding Objects
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--warning)] font-semibold">
                    OWASP AI Context
                  </div>
                  <div className="p-3 text-[11px] text-[var(--warning)] flex items-center gap-2">
                    <span className="text-[var(--faint)]">──▶</span>
                    <span>Advisory guidance</span>
                  </div>
                </div>

                {/* Event Row 5: Scoring, Reports & CI */}
                <div className="grid grid-cols-5 min-h-[56px] items-center bg-[var(--surface)]/30">
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Scan Completed
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Deductions: -32 pts
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    2 Findings
                  </div>
                  <div className="p-3 border-r border-[var(--border)] text-[11px] text-[var(--faint)]">
                    Score: 68/100 (D)
                  </div>
                  <div className="p-3 text-[11px] text-[var(--accent)] font-semibold flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" />
                    <span>REPL · PDF · CI Exit 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step Lifecycle Cards (Uniform Grid) */}
        <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="h-full flex flex-col justify-between bg-[var(--canvas)] p-5 font-mono"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step.color}`}>
                    STEP {step.number}
                  </span>
                  <span className="text-[10px] text-[var(--faint)] uppercase">{step.tag}</span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-2">{step.title}</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border)] text-[10px] text-[var(--faint)] flex items-center justify-between">
                <span>STAGE 0{idx + 1} / 04</span>
                <span className="text-[var(--accent)] font-medium">PIPELINE ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
