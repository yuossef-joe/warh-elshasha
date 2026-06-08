# Fullstack Implementation Plan

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source Documents | `BRD.md`, `backend-structure.md`, `BACKEND-TASKS.md`, `FRONTEND-DASHBOARD-TASKS.md`, `FRONTEND-MAIN-WEBSITE-TASKS.md`, `Technical-Specifications-Frontend-Backend.md`, `UI-UX-Design-Requirements.md` |
| Stack | React, TypeScript, Vite, Tailwind CSS, shadcn/Radix UI, TanStack Query, Axios, Strapi 5, PostgreSQL |
| Deployment Target | VPS with PM2 and Nginx or OpenLiteSpeed |
| Exclusions | No Flutter, Dart, Docker, or Kubernetes |

---

## 1. Implementation Principles

- Build from the BRD and keep all implementation decisions traceable to the documentation set.
- Keep public website, dashboard, operational records, and clinical records separated.
- Use TypeScript for frontend type safety and Strapi schema types where available.
- Add validation before accepting public booking data or dashboard mutations.
- Add authentication, authorization, and ownership checks before restricted data access.
- Use pagination, filtering, and search for list endpoints and dashboard tables.
- Avoid installing packages unless the project cannot meet requirements with existing tooling.
- Keep deployment simple and production-grade: VPS, PM2, Nginx or OpenLiteSpeed, PostgreSQL, backups, and HTTPS.

---

## 2. Phase 0: Project Setup and Verification

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-001 | Create frontend and backend workspaces. | Repository has clear `frontend/` and `backend/` directories or an agreed monorepo structure. |
| PLAN-002 | Initialize React/Vite TypeScript frontend. | App builds, routes render, Tailwind is configured, and no unnecessary packages are installed. |
| PLAN-003 | Initialize Strapi 5 backend. | Strapi admin runs locally and connects to PostgreSQL or approved local database. |
| PLAN-004 | Configure environment files. | `.env.example` files exist for frontend and backend without secrets. |
| PLAN-005 | Configure code quality commands. | Frontend and backend have documented build, lint, test, and format commands. |
| PLAN-006 | Verify documentation alignment. | Generated project structure matches `backend-structure.md` and technical spec. |

---

## 3. Phase 1: Strapi CMS Foundation

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-020 | Create public single types. | Site information, home, about, services page, contact, legal, and media listing single types exist. |
| PLAN-021 | Create public collection types. | Services, therapists, assessments, support groups, awareness events, blogs, podcasts, videos, and campaigns exist. |
| PLAN-022 | Enable i18n. | English and Arabic content can be created for public content types. |
| PLAN-023 | Create shared components. | Buttons, CTAs, stats, links, contact info, confidentiality notices, media metadata, and legal sections are reusable. |
| PLAN-024 | Configure media handling. | Public images and media resolve correctly through the frontend media helper. |
| PLAN-025 | Configure safe public permissions. | Public role reads only published safe content. |

---

## 4. Phase 2: Public Website

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-040 | Build public layout. | Header, footer, navigation, language toggle, mobile menu, and booking CTA work. |
| PLAN-041 | Implement localization. | Locale persists, API requests include locale, and HTML `lang`/`dir` update. |
| PLAN-042 | Build core pages. | Home, about, services, therapists, contact, legal, and not-found pages render CMS data and fallbacks. |
| PLAN-043 | Build service and therapist discovery. | Users can browse, filter, inspect details, and enter booking with context. |
| PLAN-044 | Build booking flow. | Multi-step booking validates data, handles online/offline rules, guardian details, consent, WhatsApp handoff, and confirmation. |
| PLAN-045 | Build media pages. | Articles and article detail pages launch first; podcasts and videos follow based on priority. |
| PLAN-046 | Add public tests. | Route rendering, localization, booking validation, WhatsApp generation, and API fallback tests pass. |

---

## 5. Phase 3: Appointment Persistence and Operations

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-060 | Create availability and appointment collections. | Slots and appointments store required booking, status, source, consent, locale, and payment data. |
| PLAN-061 | Add booking persistence endpoint. | Public booking requests validate payloads and persist records only when enabled. |
| PLAN-062 | Add slot capacity checks. | Full, unavailable, cancelled, closed, or unpublished slots cannot be booked. |
| PLAN-063 | Add dashboard appointment screens. | Staff can list, inspect, confirm, reschedule, cancel, complete, no-show, and follow up appointments. |
| PLAN-064 | Add dashboard schedule screens. | Staff can create slots, manage capacity, and filter by therapist/service/date/mode. |
| PLAN-065 | Add operations tests. | Validation, status transitions, capacity checks, and authorization tests pass. |

---

## 6. Phase 4: Dashboard, Client, and Clinical Modules

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-080 | Add dashboard auth and role-aware shell. | Protected routes enforce authenticated access and role navigation. |
| PLAN-081 | Build client management. | Authorized users manage operational client records without exposing clinical notes. |
| PLAN-082 | Build clinical workspace. | Assigned therapists/counselors can manage restricted session notes and treatment plans. |
| PLAN-083 | Add ownership checks. | Therapists can access only assigned clinical records unless leadership permission applies. |
| PLAN-084 | Add audit strategy. | Sensitive access and updates can be logged where backend support exists. |
| PLAN-085 | Add dashboard tests. | Role access, permission-denied states, clinical privacy, forms, and table filters are verified. |

---

## 7. Phase 5: Media, Campaigns, Reports, and Growth

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-100 | Build media operations. | Content creators draft content and media managers approve, schedule, publish, archive, or reject. |
| PLAN-101 | Add clinical review workflow. | Psychologically sensitive content can require clinical reviewer approval. |
| PLAN-102 | Build campaign management. | Campaigns store objective, audience, channels, linked content, dates, owner, status, and metrics. |
| PLAN-103 | Build reports. | Appointment pipeline, therapist utilization, revenue, support group, assessment, media, and campaign reports are available. |
| PLAN-104 | Add analytics hooks. | CTA and engagement tracking is implementation-ready without exposing sensitive data. |

---

## 8. Phase 6: VPS Deployment

| ID | Task | Acceptance Criteria |
| --- | --- | --- |
| PLAN-120 | Prepare production build process. | Frontend and Strapi build commands are documented and pass. |
| PLAN-121 | Configure PostgreSQL. | Production database uses strong credentials, backups, and least-privilege access. |
| PLAN-122 | Configure PM2. | Frontend/static server if needed and Strapi run under PM2 with restart policy. |
| PLAN-123 | Configure Nginx or OpenLiteSpeed. | HTTPS, redirects, static assets, API proxy, upload/media handling, and security headers are configured. |
| PLAN-124 | Configure backups. | Database and media backup/restore process is documented and tested. |
| PLAN-125 | Run launch verification. | Permissions, CORS, env vars, legal pages, localization, booking, and public API exposure are verified. |

---

## 9. Implementation Order

1. Strapi CMS schema and public permissions.
2. Public website shell, localization, and CMS fetching.
3. Services, therapists, legal, contact, and booking.
4. Optional appointment persistence and availability.
5. Dashboard authentication, appointments, and schedule.
6. Client and clinical modules with strict access controls.
7. Media workflow, campaigns, and reports.
8. VPS deployment and production launch checks.

---

## 10. Required Test Coverage

- Public route rendering in English and Arabic.
- CMS loading, empty, error, and fallback states.
- Booking happy path.
- Booking validation errors.
- Online and offline booking differences.
- Guardian metadata validation.
- WhatsApp message formatting.
- Appointment persistence API response shape.
- Slot capacity and status validation.
- Dashboard authorization and ownership checks.
- Clinical record access denial for non-clinical roles.
- Media approval workflow.
- Report totals and filters.

---

## 11. Open Decisions

| Decision | Options | Recommendation |
| --- | --- | --- |
| Frontend framework | React/Vite or Next.js | Keep React/Vite because the BRD names the current stack. |
| Backend app beyond Strapi | Strapi-only or Strapi plus Express API | Start Strapi-only; add Express only if Strapi policies/controllers cannot meet restricted workflow needs. |
| Appointment persistence | Disabled WhatsApp-only or enabled Strapi records | Launch with persistence if operations need reporting; otherwise keep WhatsApp-only as MVP. |
| Client portal | Public booking only or authenticated client portal | Keep portal out of MVP unless approved. |
| Payment integration | Manual/offline or online provider | Keep manual/offline first, prepare metadata for future integration. |
