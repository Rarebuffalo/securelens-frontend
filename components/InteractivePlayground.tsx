"use client";

import { useState } from "react";
import { Terminal, Play, Code2, Globe, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"code" | "web" | "repl">("code");
  const [selectedSnippet, setSelectedSnippet] = useState<"project" | "auth" | "command">("project");
  const [noAiMode, setNoAiMode] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [replInput, setReplInput] = useState("");
  const [replHistory, setReplHistory] = useState<Array<{ type: "cmd" | "resp" | "ai"; text: string }>>([
    { type: "cmd", text: "securelens scan ./services/api" },
    { type: "resp", text: "✓ Analyzed repository (38 files). Score: 68/100 (Grade D).\nDeductions: -20 (1 Critical), -12 (1 High). Total findings: 2." },
    { type: "cmd", text: "/issues critical" },
    { type: "resp", text: "  [1] Critical  Hardcoded AWS Access Key ID  services/auth.py:5\n      Key: AKIA...REDACTED" },
  ]);

  const snippets = {
    project: {
      title: "Sample Repository (2 Findings)",
      filename: "services/api/ (Full Project)",
      code: `# File 1: services/auth.py:5\nAWS_ACCESS_KEY_ID = "AKIA...REDACTED"\nAWS_SECRET_ACCESS_KEY = "REDACTED"\n\n# File 2: utils/runner.py:6\ncmd = f"python scripts/{user_script_name}"\nsubprocess.check_output(cmd, shell=True)`,
      suggestedFix: `# 1. Use IAM Roles in auth.py:\nboto3.client('s3')\n\n# 2. Use list arguments with shell=False in runner.py:\nsubprocess.check_output(["python", f"scripts/{user_script_name}"], shell=False)`,
      issue: "1 Critical (AWS Key: -20 pts) + 1 High (shell=True: -12 pts)",
      severity: "Critical & High",
      cwe: "Multi-Finding Scope",
      deduction: 32,
      score: 68,
      grade: "D",
      line: "auth.py:5 & runner.py:6",
      explanation:
        "Full repository scan identified 1 Critical credential exposure in auth.py (-20 pts) and 1 High command injection risk in runner.py (-12 pts).",
      fixAdvice:
        "Revoke the AWS key and load credentials via IAM roles. Refactor subprocess calls to use structured argument lists with shell=False.",
    },
    auth: {
      title: "Single File: auth.py",
      filename: "services/auth.py",
      code: `# Authentication Handler\nimport os, boto3\n\n# HARDCODED AWS CREDENTIALS (VULNERABILITY)\nAWS_ACCESS_KEY_ID = "AKIA...REDACTED"\nAWS_SECRET_ACCESS_KEY = "REDACTED"\n\ndef init_session():\n    return boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID)`,
      suggestedFix: `# Remediation Suggestion: Use AWS IAM / Environment Variables\nimport os, boto3\n\ndef init_session():\n    # Credentials loaded dynamically from IAM Role or Environment\n    return boto3.client('s3')`,
      issue: "Hardcoded AWS Access Key ID",
      severity: "Critical",
      cwe: "Hardcoded Secret",
      deduction: 20,
      score: 80,
      grade: "B",
      line: "Line 5",
      explanation:
        "AWS credentials hardcoded in source code can lead to complete infrastructure compromise if version control or build artifacts are exposed.",
      fixAdvice:
        "Revoke the exposed key in the AWS Console and load credentials dynamically via environment variables or AWS IAM roles.",
    },
    command: {
      title: "Single File: runner.py",
      filename: "utils/runner.py",
      code: `# Command Execution Helper\nimport subprocess\n\ndef execute_user_script(user_script_name):\n    # INSECURE SUBPROCESS SHELL=TRUE\n    cmd = f"python scripts/{user_script_name}"\n    return subprocess.check_output(cmd, shell=True)`,
      suggestedFix: `# Remediation Suggestion: Set shell=False and pass arguments as list\nimport subprocess\n\ndef execute_user_script(user_script_name):\n    # shell=False prevents command injection vectors\n    cmd = ["python", f"scripts/{user_script_name}"]\n    return subprocess.check_output(cmd, shell=False)`,
      issue: "Insecure Command Execution (shell=True)",
      severity: "High",
      cwe: "Command Injection",
      deduction: 12,
      score: 88,
      grade: "B",
      line: "Line 6",
      explanation:
        "Invoking the system shell with shell=True makes the application vulnerable to command injection if input contains uncontrolled characters.",
      fixAdvice:
        "Set shell=False and pass arguments as a structured list of parameters.",
    },
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  const handleSendRepl = (cmd: string) => {
    if (!cmd.trim()) return;
    const cleanCmd = cmd.trim();
    const newItems = [...replHistory, { type: "cmd" as const, text: cleanCmd }];

    if (cleanCmd === "/score") {
      newItems.push({
        type: "resp",
        text: "Score: 68/100 | Grade: D\nTransparent Deductions: -20 (1 Critical AWS Key), -12 (1 High shell=True)",
      });
    } else if (cleanCmd.startsWith("/issues")) {
      newItems.push({
        type: "resp",
        text: "Active Findings:\n  [1] Critical  services/auth.py:5  Hardcoded AWS Access Key ID (-20 pts)\n  [2] High      utils/runner.py:6   Insecure Command Execution (shell=True) (-12 pts)",
      });
    } else if (cleanCmd === "/export pdf") {
      newItems.push({
        type: "resp",
        text: "✓ PDF security report compiled locally via FPDF2:\n  Saved to ./securelens-report-20260831.pdf (Deterministic Scorecard + Remediation Guidance)",
      });
    } else if (cleanCmd.toLowerCase().includes("fix") || cleanCmd.toLowerCase().includes("how")) {
      newItems.push({
        type: "ai",
        text: "AI Remediation Guidance (LiteLLM / Gemini):\nTo remediate auth.py, remove the hardcoded string from source control. Use boto3.client('s3') without explicit keys so credentials load automatically from IAM roles or ~/.aws/credentials.",
      });
    } else {
      newItems.push({
        type: "resp",
        text: `Command '${cleanCmd}' executed in active session memory. Use /issues, /score, /export pdf, or ask a question.`,
      });
    }

    setReplHistory(newItems);
    setReplInput("");
  };

  const current = snippets[selectedSnippet];

  return (
    <section id="playground" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28 bg-[var(--surface)]/40">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header (04) */}
        <div
          aria-hidden="true"
          className="flex select-none items-center gap-2 font-mono text-xs text-[var(--border-strong)]"
        >
          <span>├</span>
          <span className="h-px w-6 shrink-0 bg-current" />
          <span className="flex items-center gap-2 whitespace-nowrap uppercase tracking-[0.2em]">
            <span className="text-[var(--accent)] font-bold">04</span>
            <span className="text-[var(--faint)]">·</span>
            <span className="text-[var(--muted)]">interactive demonstration</span>
          </span>
          <span className="h-px flex-1 bg-current" />
          <span>┤</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] text-balance">
            Explore the SecureLens workflow live.
          </h2>
          <p className="mt-4 font-mono text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Interactive demonstration of the triage workflow: inspect code findings, observe transparent risk calculations, toggle offline modes, or test interactive REPL commands.
          </p>
        </header>

        {/* Playground Container */}
        <div className="mt-12 border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)]">
          {/* Top Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            {/* Mode Selectors */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors ${
                  activeTab === "code"
                    ? "bg-[var(--canvas)] text-[var(--accent)] border border-[var(--border-strong)] font-semibold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Code Scanner</span>
              </button>

              <button
                onClick={() => setActiveTab("web")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors ${
                  activeTab === "web"
                    ? "bg-[var(--canvas)] text-[var(--accent)] border border-[var(--border-strong)] font-semibold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Web Exposure</span>
              </button>

              <button
                onClick={() => setActiveTab("repl")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors ${
                  activeTab === "repl"
                    ? "bg-[var(--canvas)] text-[var(--accent)] border border-[var(--border-strong)] font-semibold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Interactive REPL</span>
              </button>
            </div>

            {/* Offline Mode Toggle & Status */}
            <div className="flex items-center gap-3 font-mono text-xs pt-2 sm:pt-0">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--muted)] hover:text-[var(--text)] select-none">
                <input
                  type="checkbox"
                  checked={noAiMode}
                  onChange={(e) => setNoAiMode(e.target.checked)}
                  className="rounded border-[var(--border-strong)] text-[var(--accent)] focus:ring-0"
                />
                <span className="text-[11px]">Offline Mode (`--no-ai`)</span>
              </label>
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-blink" />
            </div>
          </div>

          {/* TAB 1: CODE SCANNER */}
          {activeTab === "code" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
              {/* Left Column: Sample Select & Code Editor */}
              <div className="lg:col-span-7 p-5 font-mono">
                {/* Scope Presets */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs text-[var(--faint)] uppercase tracking-wider">
                    Select Scope Sample:
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSelectedSnippet("project")}
                      className={`px-2 py-1 text-[11px] border transition-colors ${
                        selectedSnippet === "project"
                          ? "border-[var(--danger)] text-[var(--danger)] bg-[var(--danger)]/10 font-bold"
                          : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      Project (2 Issues)
                    </button>
                    <button
                      onClick={() => setSelectedSnippet("auth")}
                      className={`px-2 py-1 text-[11px] border transition-colors ${
                        selectedSnippet === "auth"
                          ? "border-[var(--warning)] text-[var(--warning)] bg-[var(--warning)]/10 font-bold"
                          : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      auth.py only
                    </button>
                    <button
                      onClick={() => setSelectedSnippet("command")}
                      className={`px-2 py-1 text-[11px] border transition-colors ${
                        selectedSnippet === "command"
                          ? "border-[var(--cyan)] text-[var(--cyan)] bg-[var(--cyan)]/10 font-bold"
                          : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      runner.py only
                    </button>
                  </div>
                </div>

                {/* Code Window Box */}
                <div className="border border-[var(--border)] bg-[var(--canvas)] p-4 text-xs font-mono">
                  <div className="flex items-center justify-between text-[var(--faint)] text-[10px] pb-2 border-b border-[var(--border)] mb-3">
                    <span>{current.filename}</span>
                    <span className="text-[var(--danger)] font-semibold">
                      {current.line}
                    </span>
                  </div>
                  <pre className="overflow-x-auto text-[var(--text)] leading-relaxed whitespace-pre font-mono">
                    {current.code}
                  </pre>
                </div>

                {/* Scan Action Bar */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={handleRunScan}
                    disabled={isScanning}
                    className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-[var(--accent-dim)] transition-colors shadow-xs"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Running Pattern Checks...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>Run Scan: securelens scan {selectedSnippet === "project" ? "." : current.filename}</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-[var(--faint)]">
                    {noAiMode ? "Deterministic Pattern Rules" : "Triage + LiteLLM"}
                  </span>
                </div>
              </div>

              {/* Right Column: Scan Triage & Remediation Output */}
              <div className="lg:col-span-5 p-5 bg-[var(--surface)]/50 font-mono flex flex-col justify-between">
                <div>
                  {/* Score & Badge Card */}
                  <div className="flex items-center justify-between border border-[var(--border)] bg-[var(--canvas)] p-3.5 mb-4">
                    <div>
                      <span className="text-[10px] uppercase text-[var(--faint)] tracking-wider block">
                        Deterministic Risk Score
                      </span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-bold text-[var(--text)]">
                          {current.score}
                          <span className="text-xs text-[var(--muted)]">/100</span>
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-bold border ${
                            current.grade === "A" || current.grade === "B"
                              ? "border-[var(--accent)] text-[var(--accent)]"
                              : "border-[var(--danger)] text-[var(--danger)]"
                          }`}
                        >
                          Grade: {current.grade}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-[11px]">
                      <span className="text-[var(--danger)] font-bold block">
                        -{current.deduction} pts penalty
                      </span>
                      <span className="text-[var(--muted)] text-[10px]">
                        Base 100 - Deductions
                      </span>
                    </div>
                  </div>

                  {/* Finding Details */}
                  <div className="border border-[var(--border)] bg-[var(--canvas)] p-3.5 mb-4 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-2">
                      <div className="flex items-center gap-1.5 text-[var(--danger)] font-bold">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>{current.issue}</span>
                      </div>
                      <span className="text-[10px] text-[var(--faint)] uppercase">{current.cwe}</span>
                    </div>

                    <p className="text-[var(--muted)] text-[11px] leading-relaxed mb-3">
                      {current.explanation}
                    </p>

                    <div className="bg-[var(--surface)] p-2.5 border border-[var(--border)]">
                      <span className="text-[10px] uppercase text-[var(--accent)] font-semibold block mb-1">
                        Remediation Guidance:
                      </span>
                      <p className="text-[11px] text-[var(--text)]">{current.fixAdvice}</p>
                    </div>
                  </div>

                  {/* Code Suggestion */}
                  <div className="border border-[var(--accent)]/40 bg-[var(--canvas)] p-3 text-xs">
                    <span className="text-[10px] uppercase text-[var(--accent)] font-bold block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Suggested Code-Level Refactor</span>
                    </span>
                    <pre className="overflow-x-auto text-[11px] text-[var(--text)] whitespace-pre font-mono bg-[var(--surface)] p-2 border border-[var(--border)]">
                      {current.suggestedFix}
                    </pre>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--faint)]">
                  <span>Export: JSON · Markdown · PDF</span>
                  <span className="text-[var(--accent)]">CLI Ready ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEB EXPOSURE SCANNER */}
          {activeTab === "web" && (
            <div className="p-6 font-mono">
              <div className="max-w-2xl mx-auto">
                <div className="border border-[var(--border)] bg-[var(--canvas)] p-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-2">
                    <span className="text-[var(--accent)] font-bold">$</span>
                    <code>securelens web https://api.demo-target.internal</code>
                  </div>
                  <div className="text-[11px] text-[var(--faint)]">
                    SSRF Guard: Target IP verified · Private IP ranges (RFC 1918, loopback) actively blocked
                  </div>
                </div>

                {/* Web Audit Checklist Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="border border-[var(--accent)]/40 bg-[var(--canvas)] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--accent)]">TLS / SSL Certificate</span>
                      <span className="text-[10px] text-[var(--accent)] border border-[var(--accent)]/40 px-1.5">PASS</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)]">
                      Valid certificate · Verified expiration date · Secure protocol check
                    </p>
                  </div>

                  <div className="border border-[var(--danger)]/40 bg-[var(--canvas)] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--danger)]">Content-Security-Policy</span>
                      <span className="text-[10px] text-[var(--danger)] border border-[var(--danger)]/40 px-1.5">MISSING</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)]">
                      Missing CSP header. Flagged for risk of cross-site scripting and unauthorized embedding.
                    </p>
                  </div>

                  <div className="border border-[var(--accent)]/40 bg-[var(--canvas)] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--accent)]">HSTS Transport</span>
                      <span className="text-[10px] text-[var(--accent)] border border-[var(--accent)]/40 px-1.5">PASS</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)]">
                      Strict-Transport-Security enforced with max-age directive.
                    </p>
                  </div>

                  <div className="border border-[var(--warning)]/40 bg-[var(--canvas)] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--warning)]">Sensitive Path Probe</span>
                      <span className="text-[10px] text-[var(--warning)] border border-[var(--warning)]/40 px-1.5">FLAGGED</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)]">
                      Probe for `/.git/config` or `.env` exposed on web root.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE REPL */}
          {activeTab === "repl" && (
            <div className="p-5 font-mono text-xs bg-[var(--canvas)]">
              <div className="h-64 overflow-y-auto terminal-scroll p-3 bg-[var(--surface)] border border-[var(--border)] mb-3 space-y-2">
                {replHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === "cmd" && (
                      <div className="text-[var(--text)] font-semibold flex items-center gap-1.5">
                        <span className="text-[var(--accent)] select-none">securelens [api] &gt;</span>
                        <span>{item.text}</span>
                      </div>
                    )}
                    {item.type === "resp" && (
                      <div className="text-[var(--muted)] pl-4 whitespace-pre-wrap">
                        {item.text}
                      </div>
                    )}
                    {item.type === "ai" && (
                      <div className="text-[var(--accent)] pl-4 bg-[var(--accent)]/5 border-l-2 border-[var(--accent)] p-2 my-1 whitespace-pre-wrap">
                        {item.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] text-[var(--faint)] uppercase self-center">Quick Run:</span>
                <button
                  onClick={() => handleSendRepl("/issues critical")}
                  className="px-2 py-0.5 border border-[var(--border-strong)] hover:border-[var(--accent)] text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  /issues critical
                </button>
                <button
                  onClick={() => handleSendRepl("/score")}
                  className="px-2 py-0.5 border border-[var(--border-strong)] hover:border-[var(--accent)] text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  /score
                </button>
                <button
                  onClick={() => handleSendRepl("/export pdf")}
                  className="px-2 py-0.5 border border-[var(--border-strong)] hover:border-[var(--accent)] text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  /export pdf
                </button>
                <button
                  onClick={() => handleSendRepl("How do I migrate auth.py to AWS IAM roles?")}
                  className="px-2 py-0.5 border border-[var(--border-strong)] hover:border-[var(--accent)] text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Ask AI: How to fix auth.py?
                </button>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendRepl(replInput);
                }}
                className="flex gap-2"
              >
                <span className="text-[var(--accent)] font-bold self-center select-none">$</span>
                <input
                  type="text"
                  value={replInput}
                  onChange={(e) => setReplInput(e.target.value)}
                  placeholder="Type a slash command (/issues, /score, /export) or ask a question..."
                  className="flex-1 bg-[var(--surface)] border border-[var(--border-strong)] px-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--faint)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-[var(--accent)] bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-dim)] transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
