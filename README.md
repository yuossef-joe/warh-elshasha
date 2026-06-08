# Warh Elshasha Project Documentation

This workspace contains the implementation documentation for the Warh Elshasha psychological services, therapy booking, counseling, support programs, and psychological media platform.

## Documentation Set

| File | Purpose |
| --- | --- |
| `BRD.md` | Source business requirements document. |
| `backend-structure.md` | Strapi backend architecture, content types, permissions, APIs, deployment, and acceptance criteria. |
| `BACKEND-TASKS.md` | Backend implementation task list. |
| `FRONTEND-MAIN-WEBSITE-TASKS.md` | Public website task list. |
| `FRONTEND-DASHBOARD-TASKS.md` | Internal dashboard task list. |
| `Technical-Specifications-Frontend-Backend.md` | Shared frontend/backend technical specification. |
| `UI-UX-Design-Requirements.md` | Design system, layout, booking UX, dashboard UX, accessibility, and palette requirements. |
| `FULLSTACK-IMPLEMENTATION-PLAN.md` | Phased fullstack implementation plan. |
| `API-DOCUMENTATION.md` | API endpoint, response, validation, pagination, and security standards. |
| `MIGRATION-NOTES.md` | Strapi schema, data, permission, and deployment migration guidance. |

## Intended Stack

- React, TypeScript, Vite, React Router.
- Tailwind CSS and shadcn/Radix UI.
- TanStack Query and Axios.
- Strapi 5 CMS.
- PostgreSQL for production.
- VPS deployment with PM2 and Nginx or OpenLiteSpeed.

The project documentation intentionally excludes Flutter, Dart, Docker, and Kubernetes.

## Source of Truth

`BRD.md` is the business source of truth. The dependent technical, UI, backend, frontend, API, and migration documents should be updated when business requirements change.

## Implementation Notes

- Keep public content separate from appointment, client, payment, and clinical records.
- Public APIs must expose only published safe CMS content.
- Clinical records require strict role and ownership checks.
- English and Arabic are required for public-facing content.
- Booking must support WhatsApp handoff and optional Strapi appointment persistence.
- Deployment should use production-safe environment variables, HTTPS, backups, and restricted CORS.
