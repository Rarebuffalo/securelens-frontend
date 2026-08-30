"use client";

export default function ProblemSection() {
  return (
    <section id="problem" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Index Marker */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">01</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">problem & positioning</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        {/* Section Heading */}
        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            Detection tools find raw alerts. <br />
            Engineering teams struggle with the investigation.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Security detection tools identify potential vulnerabilities across repositories and web targets. But teams often struggle with the post-detection workflow: understanding architectural context, triaging severity, explaining impact to developers, and prioritizing remediation steps.
          </p>
        </header>

        {/* What SecureLens Does NOT Replace Banner */}
        <div className="mt-8 border border-[var(--border)] bg-[var(--surface)]/70 p-5 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--accent)] font-bold mb-2 uppercase tracking-wider">
            <span>ℹ Scope & Boundaries</span>
          </div>
          <p className="text-[var(--text)] leading-relaxed">
            <strong>SecureLens is not a replacement for specialized security scanners</strong> such as Semgrep, SonarQube, CodeQL, Gitleaks, TruffleHog, Trivy, Snyk, or OWASP ZAP. Instead, SecureLens provides an orchestration, triage, scoring, explanation, and interactive investigation layer designed to make security findings easier to analyze, prioritize, and remediate.
          </p>
        </div>

        {/* ASCII Workflow & Bottleneck Diagram */}
        <div className="mt-8">
          <div className="border border-[var(--border)] bg-[var(--surface)]/60 p-6 sm:p-8 font-mono">
            <div className="mb-4 flex items-center justify-between text-xs text-[var(--faint)] border-b border-[var(--border)] pb-3">
              <span>RAW FINDINGS → CONTEXTUAL INVESTIGATION PIPELINE</span>
              <span className="text-[var(--accent)] font-semibold">POST-DETECTION LAYER</span>
            </div>

            {/* ASCII flow diagram */}
            <div className="overflow-x-auto py-4">
              <div className="min-w-[640px] text-xs sm:text-sm leading-relaxed">
                <div className="grid grid-cols-4 gap-4 text-center font-bold text-[var(--muted)]">
                  <div className="border border-[var(--border-strong)] bg-[var(--canvas)] p-2">Local Codebase</div>
                  <div className="border border-[var(--border-strong)] bg-[var(--canvas)] p-2">Secrets / Patterns</div>
                  <div className="border border-[var(--border-strong)] bg-[var(--canvas)] p-2">Web Target / URL</div>
                  <div className="border border-[var(--border-strong)] bg-[var(--canvas)] p-2">TLS & Headers</div>
                </div>

                <div className="text-center text-[var(--faint)] py-2 select-none">
                  │                     │                     │                     │
                  <br />
                  ▼                     ▼                     ▼                     ▼
                </div>

                <div className="grid grid-cols-4 gap-4 text-center text-[11px] text-[var(--muted)]">
                  <div className="text-[var(--accent)]">Path Discovery</div>
                  <div className="text-[var(--danger)]">Regex Rules</div>
                  <div className="text-[var(--accent)]">SSRF Guard</div>
                  <div className="text-[var(--warning)]">Config Audits</div>
                </div>

                <div className="text-center text-[var(--accent)] py-3 select-none">
                  ╲                     │                     │                     ╱
                  <br />
                  ╲                   │                     │                   ╱
                  <br />
                  ▼                 ▼                     ▼                 ▼
                  <br />
                  ┌─────────────────────────────────────────────────────────────────┐
                  <br />
                  │   SECURELENS INVESTIGATION & TRIAGE LAYER                       │
                  <br />
                  │   • Deterministic Risk Scoring (0–100 Scale & Grades A–F)       │
                  <br />
                  │   • Security-Sensitive File Triage (Auth, DB, Routes)           │
                  <br />
                  │   • Optional AI-Assisted Threat Context & Remediation Guidance   │
                  <br />
                  │   • Interactive REPL Shell + Multi-Format Reports (PDF / JSON)  │
                  <br />
                  └─────────────────────────────────────────────────────────────────┘
                  <br />
                  ✓ Prioritized Findings · Explainable Risk · Actionable Guidance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Workflow Gaps Solved */}
        <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
          <div className="bg-[var(--canvas)] p-6">
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
              01 · Unified Local Workflow
            </span>
            <h3 className="font-mono text-sm font-semibold text-[var(--text)] mb-2">
              Code & Web Analysis in One CLI
            </h3>
            <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
              Consolidates local repository scanning (secrets, SQL formatting, command execution) and live web configuration audits (TLS, security headers, cookie flags) into a single tool.
            </p>
          </div>

          <div className="bg-[var(--canvas)] p-6">
            <span className="font-mono text-xs text-[var(--warning)] font-semibold uppercase tracking-wider block mb-2">
              02 · Transparent Scoring
            </span>
            <h3 className="font-mono text-sm font-semibold text-[var(--text)] mb-2">
              Deterministic Severity Deductions
            </h3>
            <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
              Severity scoring is deterministic rather than LLM-generated: Base 100 with transparent deductions (-20 Critical, -12 High, -5 Medium, -2 Low) mapped to letter grades.
            </p>
          </div>

          <div className="bg-[var(--canvas)] p-6">
            <span className="font-mono text-xs text-[var(--cyan)] font-semibold uppercase tracking-wider block mb-2">
              03 · Remediation Guidance
            </span>
            <h3 className="font-mono text-sm font-semibold text-[var(--text)] mb-2">
              Contextual Explanation & Advice
            </h3>
            <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
              Provides code-level remediation suggestions and threat explanations, with an interactive terminal REPL to drill down into active findings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
