"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] px-5 py-12 sm:px-8 bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-[var(--text)]">
              <span className="text-[var(--accent)]">⬡</span>
              <span>SECURELENS</span>
              <span className="text-[var(--faint)] text-xs font-normal">
                · AI-assisted AppSec analysis & local investigation layer
              </span>
            </div>
            <p className="font-mono text-xs text-[var(--muted)] max-w-md leading-relaxed">
              An analysis and investigation layer that combines deterministic security checks with optional AI assistance to help developers understand, prioritize, investigate, and act on security findings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <a
              href="https://github.com/Rarebuffalo/securelens-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <span>GitHub Repo</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <a
              href="https://securelens-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <span>REST API Docs</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <Link
              href="#quickstart"
              className="text-[var(--accent)] hover:underline transition-colors"
            >
              Install CLI
            </Link>
          </div>
        </div>

        {/* Bottom Bar: License & Authors */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-[var(--border)] pt-6 font-mono text-[11px] text-[var(--faint)] gap-4">
          <div>
            <span>MIT License © 2026 SecureLens Core Maintainers.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>112 Tests Passing (100%)</span>
            </span>
            <span>·</span>
            <span>CLI v2.0 · API v1.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
