"use client";

export default function IntegrationsSection() {
  const models = [
    { name: "Google Gemini 2.0 Flash", status: "Default & Verified", tag: "Low Latency" },
    { name: "Anthropic Claude", status: "Supported (LiteLLM)", tag: "Reasoning" },
    { name: "OpenAI GPT-4o / Mini", status: "Supported (LiteLLM)", tag: "Precision" },
    { name: "Ollama (Local Llama 3.1)", status: "Local / Offline", tag: "No External API Key" },
  ];

  const tools = [
    { name: "Nuclei Integration", desc: "Invoked via safe subprocess runner (shell=False) when binary is present; skips gracefully if absent." },
    { name: "FastAPI REST Server", desc: "Central backend managing JWT authentication, API keys, and scan synchronization." },
    { name: "PostgreSQL & SQLite", desc: "Async SQLAlchemy 2.0 with strict tenant data isolation." },
    { name: "FPDF2 Report Generator", desc: "Locally compiled executive PDF security scorecards and remediation notes." },
    { name: "HMAC-SHA256 Webhooks", desc: "Cryptographically signed scan payloads dispatched to registered endpoints." },
    { name: "APScheduler Background", desc: "Async recurring scan jobs and automated web surface monitoring." },
  ];

  const roadmapItems = [
    { name: "Native CI/CD Action Packages", desc: "Reusable GitHub Actions and GitLab CI workflows (current: --ci CLI exit codes)" },
    { name: "Dependency & SCA Auditing", desc: "Software Composition Analysis integrated against the OSV vulnerability database" },
    { name: "Automated PR Generation", desc: "Automated Git branch and remediation PR creation from confirmed fixes" },
    { name: "Custom YAML Rule Engine", desc: "User-defined YAML security pattern rules for custom organizational policies" },
  ];

  return (
    <section id="providers" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28 bg-[var(--surface)]/30">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (06) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">06</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">providers, ecosystem & roadmap</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            Works with your AI models and infrastructure.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Configure your preferred LLM provider via LiteLLM or run completely offline with deterministic rules and local Ollama inference.
          </p>
        </header>

        {/* AI Providers Badges */}
        <div className="mt-12">
          <div className="text-xs font-mono text-[var(--faint)] uppercase tracking-wider mb-4">
            AI Providers (LiteLLM Integration)
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono">
            {models.map((model, idx) => (
              <div
                key={idx}
                className="h-full flex flex-col justify-between border border-[var(--border-strong)] bg-[var(--canvas)] p-4 transition-colors hover:border-[var(--accent)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-[10px] text-[var(--faint)]">{model.tag}</span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text)]">{model.name}</div>
                </div>
                <div className="text-[11px] text-[var(--accent)] mt-3 pt-2 border-t border-[var(--border)] font-medium">
                  {model.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Verified Ecosystem Components */}
        <div className="mt-12">
          <div className="text-xs font-mono text-[var(--faint)] uppercase tracking-wider mb-4">
            Current Verified Architecture Components
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3 font-mono text-xs">
            {tools.map((tool, idx) => (
              <div key={idx} className="h-full flex flex-col justify-between bg-[var(--canvas)] p-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--text)] mb-2">
                    <span className="text-[var(--accent)] font-mono">#</span>
                    <span>{tool.name}</span>
                  </div>
                  <p className="text-[var(--muted)] text-[11px] leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[var(--border)] text-[10px] text-[var(--faint)] uppercase">
                  COMPONENT // 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explicit Roadmap Section */}
        <div className="mt-12 border border-[var(--border-strong)] bg-[var(--canvas)] p-6 font-mono">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--warning)] flex items-center gap-1.5">
              <span>⚙</span>
              <span>Project Roadmap (Planned Capabilities)</span>
            </span>
            <span className="text-[10px] text-[var(--faint)] border border-[var(--border)] px-2 py-0.5">
              FUTURE RELEASES
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            {roadmapItems.map((item, idx) => (
              <div key={idx} className="h-full flex flex-col justify-between border border-[var(--border)] bg-[var(--surface)]/50 p-4">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-[var(--text)] mb-1.5">
                    <span className="text-[var(--warning)]">○</span>
                    <span>{item.name}</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--border)] text-[10px] text-[var(--warning)] uppercase">
                  PLANNED
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
