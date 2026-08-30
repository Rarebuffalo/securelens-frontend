"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Terminal, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-150 border-b ${
        scrolled
          ? "border-[var(--border-strong)] bg-[var(--canvas)]/95 backdrop-blur-md shadow-xs"
          : "border-[var(--border)] bg-[var(--canvas)]/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-14 sm:h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ZONE A: Brand Logo & Compact Version */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[var(--accent)] group"
          >
            {/* Shield Glyph */}
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 transition-colors group-hover:border-[var(--accent)] shrink-0">
              <span className="font-mono text-xs font-bold leading-none select-none">⬡</span>
            </div>
            <span className="tracking-tighter font-bold text-sm sm:text-base">SECURELENS</span>
          </Link>

          {/* Compact Version Badge */}
          <span className="hidden md:inline-flex items-center rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-[var(--accent)] whitespace-nowrap select-none">
            CLI v2.0 · API v1.1
          </span>
        </div>

        {/* ZONE B: Section Navigation (Visible on xl+ screens where width is guaranteed) */}
        <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-xs font-mono text-[var(--muted)] whitespace-nowrap">
          <Link
            href="#problem"
            className="transition-colors hover:text-[var(--text)]"
          >
            01·problem
          </Link>
          <Link
            href="#evidence"
            className="transition-colors hover:text-[var(--text)]"
          >
            02·evidence
          </Link>
          <Link
            href="#capabilities"
            className="transition-colors hover:text-[var(--text)]"
          >
            03·capabilities
          </Link>
          <Link
            href="#playground"
            className="transition-colors hover:text-[var(--text)]"
          >
            04·playground
          </Link>
          <Link
            href="#workflow"
            className="transition-colors hover:text-[var(--text)]"
          >
            05·workflow
          </Link>
          <Link
            href="#providers"
            className="transition-colors hover:text-[var(--text)]"
          >
            06·providers
          </Link>
        </nav>

        {/* ZONE C: Action Group & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ThemeToggle />

          {/* GitHub Repo / Test Count Badge */}
          <a
            href="https://github.com/Rarebuffalo/securelens-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center justify-center gap-1.5 border border-[var(--border-strong)] bg-transparent px-2.5 py-1.5 font-mono text-xs text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] shrink-0"
            aria-label="View SecureLens on GitHub"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span className="hidden lg:inline">GitHub</span>
            <span
              aria-hidden="true"
              className="hidden lg:inline h-3 w-px bg-[var(--border-strong)] transition-colors group-hover:bg-[var(--accent)]/40"
            />
            <span className="tabular-nums text-[var(--accent)] font-semibold">112 tests</span>
          </a>

          {/* API Docs Link */}
          <a
            href="https://securelens-backend.onrender.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center gap-1 border border-[var(--border-strong)] bg-transparent px-2.5 py-1.5 font-mono text-xs text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] shrink-0"
          >
            <span>API Docs</span>
            <ArrowUpRight className="h-3 w-3 text-[var(--faint)]" />
          </a>

          {/* Primary CTA: Install CLI */}
          <Link
            href="#quickstart"
            className="inline-flex items-center justify-center gap-1.5 border border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 font-mono text-xs font-semibold tracking-tight text-white transition-all hover:bg-[var(--accent-dim)] hover:border-[var(--accent-dim)] shadow-xs whitespace-nowrap shrink-0"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Install CLI</span>
          </Link>

          {/* Mobile/Tablet Menu Button (Visible on screens smaller than xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center justify-center p-1.5 text-[var(--muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 font-mono text-xs flex flex-col gap-3 shadow-lg">
          <div className="md:hidden pb-2 border-b border-[var(--border)] flex items-center justify-between">
            <span className="text-[10px] text-[var(--faint)] uppercase">Version</span>
            <span className="text-[10px] font-bold text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-1.5 py-0.5">
              CLI v2.0 · API v1.1
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              01 · Problem & Scope
            </Link>
            <Link
              href="#evidence"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              02 · Evidence & Scoring
            </Link>
            <Link
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              03 · Core Capabilities
            </Link>
            <Link
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              04 · Interactive Playground
            </Link>
            <Link
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              05 · Analysis Pipeline
            </Link>
            <Link
              href="#providers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors"
            >
              06 · Providers & Ecosystem
            </Link>
            <Link
              href="#quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--canvas)] transition-colors sm:col-span-2"
            >
              07 · Quickstart & Deployment
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs">
            <a
              href="https://securelens-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] font-semibold flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
            >
              <span>REST API Swagger Docs</span>
              <ArrowUpRight className="h-3 w-3 text-[var(--faint)]" />
            </a>
            <a
              href="https://github.com/Rarebuffalo/securelens-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <span>GitHub Repo ↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
