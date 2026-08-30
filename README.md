# SecureLens — Public Landing Page

<div align="center">

```
 ███████╗███████╗ ██████╗██╗   ██╗██████╗ ███████╗██╗     ███████╗███╗   ██╗███████╗
 ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██╔════╝██║     ██╔════╝████╗  ██║██╔════╝
 ╚█████╗ █████╗  ██║     ██║   ██║██████╔╝█████╗  ██║     █████╗  ██╔██╗ ██║███████╗
  ╚═══██╗██╔══╝  ██║     ██║   ██║██╔══██╗██╔══╝  ██║     ██╔══╝  ██║╚██╗██║╚════██║
 ██████╔╝███████╗╚██████╗╚██████╔╝██║  ██║███████╗███████╗███████╗██║ ╚████║███████║
 ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

**AI-Assisted AppSec Analysis Platform & Local Security Investigation Layer**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests: 112 passed](https://img.shields.io/badge/Tests-112%20passed-brightgreen?style=flat-square)](https://github.com/Rarebuffalo/securelens-backend)
[![CLI Version](https://img.shields.io/badge/CLI-v2.0.0-059669?style=flat-square)](https://github.com/Rarebuffalo/securelens-backend/tree/main/cli)
[![API Version](https://img.shields.io/badge/API-v1.1.0-0891b2?style=flat-square)](https://securelens-backend.onrender.com/docs)

</div>

---

## Overview

This repository contains the **official public-facing showcase and interactive landing page** for [SecureLens](https://github.com/Rarebuffalo/securelens-backend).

SecureLens is an AI-assisted AppSec analysis platform that sits above security scanners and turns raw code and web-security findings into **prioritized, explainable security investigations** and **remediation guidance** with transparent, mathematical **0–100 risk scoring**.

---

## Key Highlights of the Showcase

- **Interactive Live Monitor**: HTML5 canvas visualizer simulating the deterministic scoring engine, radar pulse, pattern connections, and severity deduction overlays.
- **Interactive Playground**:
  - **Code Scanner Demo**: Select multi-finding projects or single files (`auth.py`, `runner.py`) to observe immediate pattern matching, deduction math, and code-level refactor suggestions.
  - **Web Exposure Audit**: Inspect TLS cert validity, HSTS, Content-Security-Policy checks, sensitive path probes (`.env`, `.git`), and SSRF guard status.
  - **Interactive REPL Simulator**: Test stateful terminal commands (`/issues`, `/score`, `/export pdf`) and AI remediation queries.
- **Evidence & Transparent Scoring**:
  - 112 automated test cases verifying CLI, web scanner, auth, webhooks, and reporting modules.
  - Verifiable mathematical deductions: Critical (`-20 pts`), High (`-12 pts`), Medium (`-5 pts`), Low (`-2 pts`).
  - True offline mode (`--no-ai`): Zero remote API calls when scanning locally.
- **Ecosystem & Providers**:
  - Multi-provider AI triage via LiteLLM (Gemini 2.0 Flash, Claude 3.5 Haiku, GPT-4o, local Ollama).
  - Clear distinction between implemented capabilities and planned roadmap items.
- **1-Click Quickstart**: Copyable `pipx` installation commands and Docker deployment guides.

---

## Repository Architecture

```
SecureLens Ecosystem
│
├── securelens-frontend/ (This Repository)
│   └── High-performance, accessible Next.js 16 public landing page
│       ├── Monospace hacker aesthetic & theme toggle (light / dark)
│       ├── Fully responsive layout with mobile drawer
│       └── Self-contained interactive demos and documentation links
│
└── securelens-backend/ (Core Engine & Backend)
    ├── Core FastAPI REST API (https://securelens-backend.onrender.com)
    ├── CLI Tool (`securelens-ai` v2.0.0 via Click + Rich + prompt_toolkit + FPDF2)
    ├── Async SQLAlchemy 2.0 ORM (PostgreSQL & SQLite)
    └── 112 Pytest test suite
```

---

## Sections Included

1. `01·problem` — Detection tools vs. post-detection investigation bottlenecks; explicit scope boundary (what SecureLens does NOT replace).
2. `02·evidence` — 112 automated tests, 0–100 risk scoring formula, and offline local mode guarantees.
3. `03·capabilities` — Six architecture pillars: Codebase Pattern Engine, Web Configuration, Optional AI Triage, Stateful REPL, Deterministic Scoring, and Reports & CI exit codes.
4. `04·playground` — Interactive tri-tab demonstration (Code Scanner, Web Exposure, REPL Shell).
5. `05·workflow` — Complete analysis pipeline from target ingestion to CI exit codes.
6. `06·providers` — Supported LLMs, verified tools (FastAPI, SQLite, FPDF2, Webhooks, APScheduler), and roadmap items (SCA, custom YAML rules, PR generation).
7. `07·quickstart` — Local CLI installation, offline command syntax, Docker stack, and live API health links.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Typography**: [Geist & Geist Mono](https://vercel.com/font)

---

## Local Development

### Prerequisites
- Node.js 20+
- npm 10+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/Rarebuffalo/securelens-frontend.git
cd securelens-frontend

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
# Compile and build production bundle
npm run build

# Start production server
npm run start
```

---

## Deployment

The landing page is optimized for **zero-configuration deployment on [Vercel](https://vercel.com/)**:

1. Import this repository into Vercel.
2. The framework preset is automatically detected as **Next.js**.
3. No mandatory environment variables are required.
4. Click **Deploy**.

---

## Connected Resources

- **Core Backend & CLI Repository**: [github.com/Rarebuffalo/securelens-backend](https://github.com/Rarebuffalo/securelens-backend)
- **Live REST API Health Endpoint**: [https://securelens-backend.onrender.com/health](https://securelens-backend.onrender.com/health)
- **Interactive Swagger Documentation**: [https://securelens-backend.onrender.com/docs](https://securelens-backend.onrender.com/docs)
- **CLI Quick Install**:
  ```bash
  pipx install git+https://github.com/Rarebuffalo/securelens-backend.git#subdirectory=cli
  ```

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
