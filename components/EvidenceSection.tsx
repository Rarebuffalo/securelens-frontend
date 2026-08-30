"use client";

export default function EvidenceSection() {
  return (
    <section id="evidence" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28 bg-[var(--surface)]/30">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (02) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">02</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">evidence & verified baseline</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            Deterministic risk scoring. <br />
            Audited test baseline.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Severity scoring is deterministic rather than LLM-generated. SecureLens calculates objective risk scores from finding severities, backed by a comprehensive automated test suite.
          </p>
        </header>

        {/* 3 Unified Metric Cards */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
            {/* Card 1: 112 / 112 Tests */}
            <article className="h-full flex flex-col justify-between bg-[var(--canvas)] p-6 sm:p-8">
              <div>
                <p className="mb-6 font-mono text-xs text-[var(--faint)] sm:text-sm">
                  <span className="text-[var(--accent)] font-bold"># </span>Automated test suite pass rate
                </p>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex items-end gap-2 text-[var(--accent)]">
                      <span className="sr-only">112</span>
                      <pre
                        aria-hidden="true"
                        className="select-none whitespace-pre font-mono leading-[1.05] [font-size:clamp(4px,1.4vw,11px)] font-bold"
                      >
{`  ██    ██   ██████
 ███   ███  ██    ██
  ██    ██      ███ 
  ██    ██    ███   
████████████████████`}
                      </pre>
                    </div>
                    <p className="mt-3 font-mono text-xs text-[var(--muted)] sm:text-sm">
                      112 passed / 112 total tests
                    </p>
                  </div>
                  <span className="self-center font-mono text-xl text-[var(--border-strong)]">/</span>
                  <div className="flex-1">
                    <div className="flex items-end gap-1 text-[var(--accent)]">
                      <span className="font-mono text-2xl sm:text-3xl font-bold">100%</span>
                    </div>
                    <p className="mt-3 font-mono text-xs text-[var(--muted)] sm:text-sm">
                      pytest & asyncio suite
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 border-t border-[var(--border)] pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
                CLI · Web Scanner · Auth · Webhooks · Reports ↗
              </p>
            </article>

            {/* Card 2: 0-100 Transparent Scoring */}
            <article className="h-full flex flex-col justify-between bg-[var(--canvas)] p-6 sm:p-8">
              <div>
                <p className="mb-6 font-mono text-xs text-[var(--faint)] sm:text-sm">
                  <span className="text-[var(--accent)] font-bold"># </span>Deterministic risk scoring scale
                </p>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex items-end gap-2 text-[var(--cyan)]">
                      <span className="sr-only">0-100</span>
                      <pre
                        aria-hidden="true"
                        className="select-none whitespace-pre font-mono leading-[1.05] [font-size:clamp(4px,1.4vw,11px)] font-bold"
                      >
{` ██████   ██    ██████
██    ██  ██   ██    ██
██    ██  ██   ██    ██
██    ██  ██   ██    ██
 ██████   ██    ██████`}
                      </pre>
                    </div>
                    <p className="mt-3 font-mono text-xs text-[var(--muted)] sm:text-sm">
                      Base 100 with deduction bounds
                    </p>
                  </div>
                  <span className="self-center font-mono text-xs text-[var(--border-strong)]">vs</span>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 text-[11px] font-mono">
                      <span className="text-[var(--danger)]">Crit: -20 pts</span>
                      <span className="text-[var(--warning)]">High: -12 pts</span>
                      <span className="text-[var(--cyan)]">Med: -5 pts</span>
                      <span className="text-[var(--muted)]">Low: -2 pts</span>
                    </div>
                    <p className="mt-2 font-mono text-[11px] text-[var(--muted)]">
                      Deterministic deductions
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 border-t border-[var(--border)] pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
                Letter Grade Scale: A (90+), B (80+), C (70+), D (60+), F (&lt;60) ↗
              </p>
            </article>

            {/* Card 3: Offline Local Mode */}
            <article className="h-full flex flex-col justify-between bg-[var(--canvas)] p-6 sm:p-8">
              <div>
                <p className="mb-6 font-mono text-xs text-[var(--faint)] sm:text-sm">
                  <span className="text-[var(--accent)] font-bold"># </span>Local Offline Mode (`--no-ai`)
                </p>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex items-end gap-2 text-[var(--accent)]">
                      <span className="sr-only">100%</span>
                      <pre
                        aria-hidden="true"
                        className="select-none whitespace-pre font-mono leading-[1.05] [font-size:clamp(4px,1.4vw,11px)] font-bold"
                      >
{`  ██   ██████  ██████
 ███   ██  ██  ██  ██
  ██   ██  ██  ██  ██
  ██   ██  ██  ██  ██
██████ ██████  ██████`}
                      </pre>
                      <span className="font-mono text-xl font-bold pb-0.5">%</span>
                    </div>
                    <p className="mt-3 font-mono text-xs text-[var(--muted)] sm:text-sm">
                      Local execution
                    </p>
                  </div>
                  <span className="self-center font-mono text-xs text-[var(--border-strong)]">/</span>
                  <div className="flex-1">
                    <div className="text-[var(--text)] font-mono text-lg font-bold">
                      Zero Code Leaks
                    </div>
                    <p className="mt-3 font-mono text-xs text-[var(--muted)] sm:text-sm">
                      No remote calls when offline
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 border-t border-[var(--border)] pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
                Deterministic regex rules execute locally without external LLM ↗
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
