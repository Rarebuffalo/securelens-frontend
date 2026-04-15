# SecureLens Frontend Integration And Enhancement Plan

## 1. Current Audit

The current frontend does not yet match the product described in [`README.md`](/home/Krishna-Singh/securelens-frontend/README.md).

What exists today:

- A single client-rendered page in [`app/page.js`](/home/Krishna-Singh/securelens-frontend/app/page.js#L1)
- A basic score gauge in [`app/components/ScoreGauge.js`](/home/Krishna-Singh/securelens-frontend/app/components/ScoreGauge.js#L1)
- A direct `fetch()` call to `http://127.0.0.1:8000/scan` with no environment-based config, auth, or error handling in [`app/page.js`](/home/Krishna-Singh/securelens-frontend/app/page.js#L44)
- Local-only scan history stored in `localStorage`, not the backend history API, in [`app/page.js`](/home/Krishna-Singh/securelens-frontend/app/page.js#L9)

What is missing relative to the README and backend:

- No authentication UI
- No persisted scan history UI
- No trends dashboard
- No scan detail route
- No compare/diff flow between scans
- No AI chat about a scan
- No threat narrative view
- No export CSV/PDF actions
- No API key management UI
- No loading skeletons, empty states, retry states, or rate-limit handling
- No API abstraction layer, typed contracts, or startup-grade state management
- No serious product design system or responsive information architecture

Bottom line: the current app is a prototype, not yet a product frontend.

## 2. Backend Capabilities Already Available

The backend is ready for a much richer frontend than the current UI uses.

### Core scan flow

- `POST /scan`
- Optional auth
- Returns:
  - `id`
  - `url`
  - `security_score`
  - `layers`
  - `issues`
  - `created_at`

Important detail:

- If the user is authenticated, scans are persisted and returned with an `id`
- If the user is anonymous, scans still work but are not saved

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Saved scan history

- `GET /scans`
- `GET /scans/{id}`
- `DELETE /scans/{id}`
- `GET /scans/trends`

### AI and analysis

- `POST /scans/{id}/chat`
- `GET /scans/{id}/threat-narrative`
- `GET /scans/{old_id}/diff/{new_id}`

### Reports

- `GET /scans/{id}/export/csv`
- `GET /scans/{id}/export/pdf`

### Platform features

- `POST /api-keys`
- `GET /api-keys`
- `DELETE /api-keys/{id}`

## 3. What The UI Still Needs To Implement

### P0: Required to truly integrate the backend

- Replace hardcoded backend URL with `NEXT_PUBLIC_API_BASE_URL`
- Build a shared API client
- Add auth token storage and authenticated requests
- Replace `localStorage` scan history with `GET /scans`
- Persist authenticated scans automatically by including bearer token
- Add proper error handling for invalid URL, network failure, `401`, `404`, `409`, `429`, and `502`
- Add loading, empty, and error states for every major screen

### P1: Required to match the backend product

- Auth screens: sign up, sign in, sign out, current user state
- Dashboard page with recent scans and trend cards
- Scan details page for a saved scan
- Scan history page with pagination
- Delete scan action with confirmation
- Export buttons for CSV and PDF
- Threat narrative panel
- Ask-AI chat panel for a saved scan
- Compare two scans and render resolved/new/persisting issues

### P2: Required for startup-grade product quality

- Clear navigation and page architecture
- Serious visual system
- Better issue filtering, sorting, and grouping
- Copy-to-clipboard for fixes and remediation snippets
- Mobile-first responsive layouts
- Accessible components and keyboard flows
- Better empty states and onboarding
- Query caching and request deduplication
- Telemetry and product analytics hooks

### P3: Required for platform maturity

- API key management screen
- Webhook management screen if/when frontend support is desired
- Team/multi-user workspaces later
- Billing/readiness surfaces later

## 4. Recommended Frontend Architecture

Use the App Router properly and split the product into real routes.

### Proposed route map

- `/`
  - marketing or product landing plus primary scan CTA
- `/app`
  - authenticated dashboard shell
- `/app/scan`
  - new scan experience
- `/app/scans`
  - saved scans list
- `/app/scans/[scanId]`
  - scan details
- `/app/scans/compare`
  - compare two scans
- `/app/settings/api-keys`
  - API key management
- `/login`
  - login page
- `/register`
  - register page

### Proposed folder shape

```text
app/
  (marketing)/
  (auth)/
    login/
    register/
  (dashboard)/
    app/
      layout.tsx
      page.tsx
      scan/page.tsx
      scans/page.tsx
      scans/[scanId]/page.tsx
      scans/compare/page.tsx
      settings/api-keys/page.tsx
components/
  app-shell/
  dashboard/
  scan/
  issue/
  charts/
  auth/
lib/
  api/
  auth/
  utils/
types/
```

### API layer

Create one thin client around `fetch`:

- `lib/api/client.ts`
- `lib/api/auth.ts`
- `lib/api/scans.ts`
- `lib/api/reports.ts`
- `lib/api/apiKeys.ts`

This layer should handle:

- base URL
- auth header
- JSON parsing
- typed error mapping
- `429` handling
- file downloads for CSV/PDF

### Types to define first

- `ScanResponse`
- `Issue`
- `LayerStatus`
- `ScanHistoryItem`
- `ScanHistoryResponse`
- `DashboardTrendsResponse`
- `ChatResponse`
- `ThreatNarrativeResponse`
- `ScanDiffResponse`
- `UserResponse`
- `TokenResponse`

## 5. Recommended Product UX

### Main product concept

Do not keep this as a plain developer form with a results list under it. Position it like a security command center for modern teams.

### Dashboard structure

Top section:

- strong product heading
- URL scan bar
- user/session state
- last scan status

KPI row:

- average security score
- total scans
- critical issue count in latest scan
- trend delta from previous scan

Main content:

- latest scan summary
- layer health cards
- prioritized issues table
- threat narrative panel
- history sidebar or recent scan rail

Details page:

- score hero
- risk badge
- timeline metadata
- issue filters by severity and layer
- AI explanation accordion
- remediation snippet blocks
- export actions
- ask-AI chat

Compare view:

- score delta hero
- resolved issues
- new issues
- persistent issues
- before/after layer comparison

## 6. Design Direction For A Startup-Grade Frontend

The current UI is functional but visually generic. The startup-grade direction should feel deliberate, premium, and trustworthy.

### Visual direction

- Base look: security operations meets modern SaaS
- Tone: high-trust, high-signal, not hacker-themed
- Style: bright neutral background with deep ink surfaces and selective alert colors
- Accent color: cyan/blue for analysis actions, amber/red only for risk states

### Design system rules

- Use a consistent 8px spacing scale
- Use one headline typeface and one readable UI typeface
- Use semantic tokens for all colors
- Use severity colors consistently across all components
- Use cards sparingly; rely more on hierarchy, spacing, and section framing
- Use charts and status indicators that are calm and legible, not flashy

### Suggested UI primitives

- App shell with fixed sidebar and slim topbar
- Reusable stat cards
- Layer health bars
- Severity pills
- Issue data table with filters
- Empty state templates
- Skeleton loaders
- Slide-over panel for scan details/chat on smaller screens

### Motion

- soft number count-up for score
- subtle gauge animation
- staggered reveal for issue cards
- no excessive motion on critical security data

## 7. Exact Integration Plan

### Phase 1: Foundation

Goal: stop being a prototype.

Implement:

- Convert from `.js` to `.tsx` where possible
- Add `types/securelens.ts`
- Add `NEXT_PUBLIC_API_BASE_URL`
- Create `lib/api/client.ts`
- Add auth context or small session provider
- Add reusable request helpers
- Introduce global layout and app shell

Definition of done:

- No hardcoded backend URLs remain
- All API calls go through one client
- Token-based auth works across refreshes

### Phase 2: Real scan workflow

Goal: make scanning reliable and polished.

Implement:

- dedicated scan form component
- client-side URL validation before submit
- backend error display
- loading progress state
- successful scan result page or panel
- authenticated save behavior

Definition of done:

- Anonymous users can scan
- Logged-in users can scan and save results
- Bad URLs and backend failures are clearly handled

### Phase 3: Saved scans and dashboard

Goal: expose the persisted value of the backend.

Implement:

- dashboard route
- recent scans list from `/scans`
- trend cards from `/scans/trends`
- paginated history table
- scan detail page using `/scans/{id}`
- delete scan action

Definition of done:

- Users can browse and reopen past scans
- The app no longer depends on local-only history

### Phase 4: Advanced analysis surfaces

Goal: surface the product differentiation.

Implement:

- threat narrative panel
- ask-AI chat module
- compare scans page
- exports for CSV and PDF

Definition of done:

- Users can understand change over time
- Users can export and share reports
- Users can ask follow-up questions about findings

### Phase 5: Startup-grade polish

Goal: make it feel investable and launch-ready.

Implement:

- serious responsive design pass
- accessibility pass
- loading skeletons and microcopy pass
- structured analytics events
- better onboarding and empty-state education
- issue prioritization UX

Definition of done:

- The app looks and behaves like a product, not a demo

## 8. Suggested Screen-Level Components

### Dashboard

- `ScanUrlForm`
- `DashboardStats`
- `RecentScansList`
- `LatestScanSummary`
- `LayerOverviewGrid`
- `TopIssuesTable`
- `ThreatNarrativeCard`

### Scan detail

- `ScoreHero`
- `RiskBadge`
- `LayerBreakdown`
- `IssueFilters`
- `IssueList`
- `IssueExplanationCard`
- `RemediationSnippet`
- `ExportActions`
- `ScanChatPanel`

### Compare

- `ScanCompareSelector`
- `ScoreDeltaCard`
- `ResolvedIssuesList`
- `NewIssuesList`
- `PersistingIssuesList`
- `LayerDeltaTable`

### Auth

- `AuthForm`
- `PasswordField`
- `SessionGuard`
- `UserMenu`

## 9. Data/State Strategy

Recommended:

- Use server components for page shells and first-load data where practical
- Use client components for forms, chat, filtering, compare interactions, and local UI state
- Use TanStack Query or a similarly disciplined fetch/cache layer

Why:

- scan history, scan detail, trends, and user profile are natural cached resources
- mutation flows like login, scan submit, delete scan, and create API key become predictable
- refetch and invalidation logic becomes simple

Suggested query keys:

- `["me"]`
- `["scans", page, perPage]`
- `["scan", scanId]`
- `["trends"]`
- `["scan-diff", oldId, newId]`
- `["threat-narrative", scanId]`
- `["api-keys"]`

## 10. Error Handling Requirements

Do not treat the backend as always-happy-path.

Required UI behavior:

- `400` or validation failure: show field-level error on URL input
- `401`: redirect to login or show session-expired callout
- `404`: render scan not found state
- `409`: show account conflict messaging on register
- `429`: show rate limit warning with retry timing guidance
- `502`: show target unreachable or target blocked state
- network failure: show retry CTA

## 11. Security Requirements For The Frontend

- Do not keep hardcoded API URLs in components
- Store token consistently and clear it on logout
- Avoid leaking token in logs
- Sanitize and safely render explanation fields as plain text
- Prefer HttpOnly cookie auth later if backend is extended for it
- Never trust client-side URL validation alone

## 12. Highest-Value MVP Build Order

If time is limited, build in this order:

1. API client + env config
2. Auth flow
3. Dashboard shell
4. Real scan submit flow
5. Saved scan history page
6. Scan detail page
7. Trends cards
8. Exports
9. Compare view
10. AI chat and threat narrative
11. API key management

## 13. Recommended Immediate Next Implementation Sprint

Sprint target: convert the current prototype into a usable authenticated product shell.

Build this first:

- `app/login/page.tsx`
- `app/register/page.tsx`
- `app/app/layout.tsx`
- `app/app/page.tsx`
- `app/app/scans/page.tsx`
- `app/app/scans/[scanId]/page.tsx`
- `lib/api/client.ts`
- `lib/api/auth.ts`
- `lib/api/scans.ts`
- `types/securelens.ts`
- `components/scan/ScanUrlForm.tsx`
- `components/dashboard/DashboardStats.tsx`
- `components/issue/IssueList.tsx`

## 14. Final Product Standard

The frontend should feel like:

- a trustworthy security SaaS
- understandable by non-security users
- efficient for developers
- structured around saved scan workflows, not just one-off scans

The key product mistake to avoid is keeping everything on one page with a form and some cards. The backend now supports an actual platform. The frontend should be reorganized around dashboard, scan detail, history, comparison, and account-level workflows.
