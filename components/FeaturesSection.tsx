"use client";

export default function FeaturesSection() {
  const capabilities = [
    {
      glyph: "◉",
      title: "codebase pattern engine",
      subtitle: "deterministic local analysis",
      description:
        "Traverses local repositories honoring .gitignore rules. Uses regex pattern checks for hardcoded AWS keys, private keys, dangerous functions (eval/exec), shell=True, and raw SQL formatting.",
      badge: "offline ready",
      color: "border-[var(--accent)] text-[var(--accent)]",
    },
    {
      glyph: "▣",
      title: "web configuration & exposure",
      subtitle: "live target audit & ssrf guard",
      description:
        "Audits SSL/TLS certificates, expiry dates, HSTS, CSP, and security headers. Probes sensitive endpoints (.env, .git) with strict RFC 1918 private IP SSRF blocking.",
      badge: "ssrf guarded",
      color: "border-[var(--cyan)] text-[var(--cyan)]",
    },
    {
      glyph: "⇄",
      title: "optional ai threat triage",
      subtitle: "contextual explanations & advice",
      description:
        "LiteLLM multi-provider integration (Gemini, Claude, GPT, Ollama) contextualizes findings, identifies security-sensitive files, and provides advisory remediation guidance.",
      badge: "optional ai",
      color: "border-[var(--accent)] text-[var(--accent)]",
    },
    {
      glyph: "▤",
      title: "stateful interactive repl",
      subtitle: "in-memory investigation shell",
      description:
        "Unified CLI shell maintains active scan memory. Query findings with /issues critical, ask follow-up questions, switch models dynamically, and export reports.",
      badge: "prompt_toolkit",
      color: "border-[var(--warning)] text-[var(--warning)]",
    },
    {
      glyph: "⇢",
      title: "deterministic risk scoring",
      subtitle: "0–100 scale & letter grades",
      description:
        "Severity scoring is deterministic rather than LLM-generated. Deducts -20 for Critical, -12 for High, -5 for Medium, and -2 for Low from a base score of 100.",
      badge: "verifiable math",
      color: "border-[var(--danger)] text-[var(--danger)]",
    },
    {
      glyph: "✓",
      title: "reports & ci pipeline exit codes",
      subtitle: "pdf, json, markdown & ci mode",
      description:
        "Generates styled PDF security reports with FPDF2, exports machine-readable JSON/Markdown, and supports automated pipelines via --ci --fail-on high.",
      badge: "fpdf2 + ci",
      color: "border-[var(--accent)] text-[var(--accent)]",
    },
  ];

  return (
    <section id="capabilities" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (03) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">03</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">core capabilities</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            Six pillars of the SecureLens architecture.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Combines deterministic code checks, live web exposure audits, transparent risk deductions, and optional AI explanations into a unified investigation workflow.
          </p>
        </header>

        {/* 6 Grid Capabilities (Uniform 3x2 Grid) */}
        <div className="mt-12">
          <ul className="grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, idx) => (
              <li
                key={idx}
                className="group h-full flex flex-col justify-between bg-[var(--canvas)] p-6 sm:p-7 transition-colors hover:bg-[var(--surface)]/80"
              >
                <div>
                  {/* Top Glyph & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border font-mono text-lg transition-transform group-hover:scale-105 select-none ${item.color}`}
                    >
                      {item.glyph}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--faint)] border border-[var(--border)] px-2 py-0.5 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-mono text-base font-semibold tracking-tight text-[var(--text)]">
                      {item.title}
                    </h3>
                    <span className="mt-1 block font-mono text-xs text-[var(--accent)] font-medium">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 font-mono text-xs text-[var(--muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--faint)] flex items-center justify-between">
                  <span>MODULE // 0{idx + 1}</span>
                  <span className="text-[var(--text)] group-hover:text-[var(--accent)] transition-colors font-medium">
                    VERIFIED →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
