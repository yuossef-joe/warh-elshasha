# Technical Specifications: Frontend and Backend

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Frontend | React, TypeScript, Vite, React Router, TanStack Query, Axios, Tailwind CSS, shadcn/Radix UI |
| Backend | Strapi 5 CMS and REST API |
| Languages | English and Arabic |
| Integration Model | CMS-driven public website, optional appointment persistence, WhatsApp handoff, restricted operational dashboard |

---

## 1. System Overview

Warh Elshasha is a bilingual psychological services, therapy booking, counseling, assessments, support groups, awareness programs, and psychological media platform. The frontend renders a public website and future operational dashboard. The backend stores CMS content, public service data, therapist profiles, availability slots, appointment records, media content, campaign records, and restricted clinical data.

The system must prioritize confidentiality, bilingual access, structured appointment conversion, CMS maintainability, responsive UX, and strict separation between public content and sensitive psychological records.

---

## 2. Environments

| Environment | Purpose | Requirements |
| --- | --- | --- |
| Development | Local frontend/backend development. | Local Strapi URL, local frontend URL, test content, safe seed data. |
| Staging | Pre-launch QA and content review. | Production-like API permissions, bilingual content, legal review, role tests. |
| Production | Public and operational use. | HTTPS, restricted CORS, production database, media storage, backups, reviewed permissions. |

### 2.1 Frontend Environment Variables

| Variable | Purpose |
| --- | --- |
| `VITE_STRAPI_URL` | Base URL for Strapi API and media URL resolution. |
| `VITE_STRAPI_API_TOKEN` | Optional public read-only token if required by backend policy. Must not grant restricted access. |
| `VITE_DEFAULT_LOCALE` | Default locale, normally `en` or `ar`. |
| `VITE_WHATSAPP_FALLBACK_NUMBER` | Fallback WhatsApp number when CMS contact data is unavailable. |
| `VITE_ENABLE_APPOINTMENT_PERSISTENCE` | Enables Strapi appointment creation before WhatsApp handoff. |
| `VITE_ENABLE_ANALYTICS` | Enables analytics hooks when approved. |

### 2.2 Backend Environment Variables

| Variable | Purpose |
| --- | --- |
| `HOST`, `PORT`, `APP_KEYS` | Strapi runtime configuration. |
| `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET` | Strapi security secrets. |
| `DATABASE_*` | Database connection settings. |
| `UPLOAD_PROVIDER_*` | Media provider configuration. |
| `FRONTEND_PUBLIC_URL` | Public website URL for CORS and links. |
| `WHATSAPP_FALLBACK_NUMBER` | Operational WhatsApp fallback. |
| `PAYMENT_PROVIDER_*` | Future payment integration. |
| `VIDEO_PROVIDER_*` | Future secure video integration. |
| `NEWSLETTER_PROVIDER_*` | Future newsletter integration. |

---

## 3. Frontend Architecture

### 3.1 Suggested Source Structure

```text
src/
  api/
    client.ts
    strapi.ts
    media.ts
    queries/
      pages.ts
      services.ts
      therapists.ts
      booking.ts
      media.ts
  components/
    layout/
    ui/
    common/
    booking/
    services/
    therapists/
    media/
    dashboard/
  contexts/
    LanguageContext.tsx
    AuthContext.tsx
  hooks/
    useLocale.ts
    useStrapiImage.ts
    useBookingPrefill.ts
  pages/
    public/
    dashboard/
  routes/
    PublicRoutes.tsx
    DashboardRoutes.tsx
  types/
    strapi.ts
    booking.ts
    dashboard.ts
  utils/
    whatsapp.ts
    validation.ts
    dates.ts
```

### 3.2 Frontend Principles

- Use React Router for public and dashboard route separation.
- Use TanStack Query for all CMS/API reads and dashboard mutations.
- Keep Strapi populate parameters centralized to avoid inconsistent API requests.
- Keep translations and static fallback copy centralized.
- Store selected language in localStorage.
- Set HTML `lang` and `dir` whenever language changes.
- Use reusable components for cards, status badges, filters, form sections, empty states, and confirmation dialogs.
- Avoid public frontend requests for sensitive data.

---

## 4. Backend Architecture

### 4.1 Strapi Content Categories

| Category | Examples | Exposure |
| --- | --- | --- |
| Public page single types | `home-page`, `about-page`, `contact-page`, legal pages | Public read published only |
| Public collections | `service`, `therapist`, `blog`, `podcast`, `educational-video`, `support-group`, `assessment`, `awareness-event` | Public read published only |
| Operational collections | `appointment`, `availability-slot`, `client`, `feedback-survey`, `newsletter` | Authenticated restricted |
| Clinical collections | `session-note`, `treatment-plan`, assessment results | Strict clinical access only |

### 4.2 Public API Rules

- Use only published localized content.
- Never expose client records, appointments, payment details, video links, session notes, treatment plans, or assessment results publicly.
- Public media content must avoid sensitive client-identifying information unless documented consent exists.
- CMS entries should include alt text and localized titles/copy where possible.

### 4.3 Restricted API Rules

- Require authentication for dashboard routes and restricted endpoints.
- Enforce role-based access at both API and UI layers.
- Validate appointment status transitions.
- Validate slot status and capacity before booking.
- Validate guardian metadata for child/adolescent bookings.
- Audit sensitive actions where backend support exists.

### 4.4 Custom Backend Flow

For Strapi custom endpoints, keep business logic out of route definitions. Use this flow:

```text
Route
-> Controller
-> Service
-> Repository / Strapi entity service
-> Database
```

| Layer | Responsibility |
| --- | --- |
| Route | Maps HTTP method and path to controller action. |
| Controller | Parses request context, calls validation, delegates to service, returns consistent response shape. |
| Service | Owns business rules such as appointment status transitions, slot capacity, consent rules, and ownership checks. |
| Repository / Entity Service | Performs Strapi data access, populate selection, filtering, pagination, and persistence. |
| Policies / Middleware | Enforces authentication, authorization, rate limiting, and request safety before business logic runs. |

Do not place booking rules, ownership checks, clinical access checks, or payment rules directly in route files.

---

## 5. Public Routes

| Route | Page | Data Sources |
| --- | --- | --- |
| `/` | Home | `site-information`, `home-page`, featured services/media |
| `/about` | About | `about-page` |
| `/services` | Services | `service-page`, `service` |
| `/therapists` | Therapists listing | `therapists-page`, `therapist` |
| `/therapists/:id` | Therapist details | `therapist` by Strapi `documentId` |
| `/appointments` | Appointment landing | `appointments-page`, services/therapists |
| `/booking` | Booking flow | `service`, `therapist`, `availability-slot`, `site-information`, optional `appointment` |
| `/support-groups` | Support groups | `support-groups-page`, `support-group` |
| `/assessments` | Assessments | `assessments-page`, `assessment` |
| `/awareness-events` | Awareness events | `awareness-events-page`, `awareness-event` |
| `/articles` | Articles listing | `blogs-page`, `blog` |
| `/articles/:slug` | Article detail | `blog` |
| `/podcasts` | Podcasts listing | `podcasts-page`, `podcast` |
| `/videos` | Videos listing | `videos-page`, `educational-video` |
| `/contact` | Contact | `contact-page`, `site-information` |
| `/privacy` | Privacy | `privacy-page` |
| `/terms` | Terms | `terms-page` |
| `/consent` | Consent/confidentiality | `consent-page` |
| `*` | Not found | Static fallback and site info |

---

## 6. Dashboard Routes

| Route | Purpose | Roles |
| --- | --- | --- |
| `/dashboard` | Overview and KPIs | Admin, operations, therapist, media by role |
| `/dashboard/appointments` | Appointment queue and status management | Admin, receptionist, support, therapist by assignment |
| `/dashboard/schedule` | Therapist availability and slots | Admin, receptionist, therapist |
| `/dashboard/clients` | Client operational records | Admin, receptionist limited, support limited, clinical by assignment |
| `/dashboard/clinical/sessions` | Therapist session queue | Therapist, counselor, clinical leadership |
| `/dashboard/clinical/notes` | Restricted session notes | Assigned therapist/counselor, clinical leadership |
| `/dashboard/services` | Service management | Admin |
| `/dashboard/therapists` | Therapist profile management | Admin, therapist own profile where approved |
| `/dashboard/support-groups` | Group operations | Admin, counselor, support |
| `/dashboard/assessments` | Assessment operations | Admin, therapist/psychologist |
| `/dashboard/media` | Articles, podcasts, videos, newsletters | Content creator, media manager, clinical reviewer |
| `/dashboard/campaigns` | Campaign management and metrics | Media manager, admin |
| `/dashboard/reports` | Operational, revenue, campaign, and utilization reports | Admin, leadership |
| `/dashboard/settings` | Organization settings and permissions | Super admin, organization admin |

---

## 7. Data Contracts

### 7.1 Booking Type Values

```ts
type BookingType =
  | "consultation"
  | "therapy_session"
  | "counseling_session"
  | "assessment"
  | "support_group"
  | "awareness_event";
```

### 7.2 Delivery Mode Values

```ts
type DeliveryMode = "online" | "offline" | "hybrid";
```

### 7.3 Appointment Status Values

```ts
type AppointmentStatus =
  | "new"
  | "pending_confirmation"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show"
  | "follow_up_required";
```

### 7.4 Payment Status Values

```ts
type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "partially_paid"
  | "refunded"
  | "waived";
```

### 7.5 Availability Status Values

```ts
type AvailabilityStatus =
  | "available"
  | "limited"
  | "full"
  | "cancelled"
  | "closed"
  | "unpublished";
```

### 7.6 Publishing Status Values

```ts
type PublishingStatus =
  | "draft"
  | "review"
  | "approved"
  | "scheduled"
  | "published"
  | "unpublished"
  | "archived"
  | "rejected";
```

---

## 8. Booking Flow Specification

### 8.1 Inputs

The booking page must support optional URL prefill:

| Query Param | Purpose |
| --- | --- |
| `service_id` | Preselect service record. |
| `therapist_id` | Preselect therapist record. |
| `session_id` | Preselect availability slot/session record. |
| `service` | Preselect service type or display label. |
| `delivery_mode` | Preselect online/offline/hybrid. |
| `date` | Preselect appointment date. |
| `time` | Preselect appointment time. |

### 8.2 Required Form Fields

| Field | Required Rule |
| --- | --- |
| Booking type | Always required. |
| Service | Required for all service/session bookings. |
| Therapist preference | Optional unless route requires a therapist-specific booking. |
| Delivery mode | Required. |
| Date/time | Required when schedule or offline slot selection is enabled. |
| Location | Required for offline sessions when multiple locations or slots exist. |
| Name | Required. |
| Phone | Required. |
| Email | Required where organization policy requires confirmation by email. |
| Age group | Required. |
| Guardian details | Required for child/adolescent bookings. |
| Consent acknowledgement | Required before submission. |
| Message | Optional. |

### 8.3 WhatsApp Message Requirements

The generated WhatsApp message must include:

- Booking type.
- Selected service or session.
- Therapist preference.
- Delivery mode.
- Date and time.
- Location for offline sessions.
- Client name, phone, email where provided.
- Age group.
- Guardian details where applicable.
- Consent acknowledgement.
- Client notes.
- Locale/language context.

### 8.4 Persistence Rules

When appointment persistence is disabled, the frontend generates the WhatsApp message and displays confirmation.

When appointment persistence is enabled, the frontend first creates an `appointment` record with:

- Status `new` or `pending_confirmation`.
- Payment status `unpaid` or `pending`.
- Source `website`.
- Active locale.
- Consent acknowledgement and timestamp.
- Selected service, therapist, and slot references where available.

If Strapi persistence fails, the frontend should either block submission or continue to WhatsApp only if organization policy explicitly allows fallback handoff.

---

## 9. API Query Strategy

### 9.1 Public Reads

Use TanStack Query keys that include locale:

```ts
["page", "home", locale]
["services", locale, filters]
["therapists", locale, filters]
["therapist", documentId, locale]
["blogs", locale, page, filters]
["blog", slug, locale]
```

### 9.2 Mutations

Use mutations for:

- Appointment creation.
- Appointment status updates.
- Slot creation/update.
- Client creation/update.
- Session note creation/update.
- Treatment plan creation/update.
- Content approval status changes.
- Campaign metric updates.
- Feedback survey creation.

Each mutation must invalidate affected list and detail queries.

### 9.3 API Response Shape

Custom endpoints should return a consistent success shape:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "locale": "en",
    "pagination": {
      "page": 1,
      "pageSize": 12,
      "pageCount": 1,
      "total": 0
    }
  }
}
```

Custom endpoints should return a consistent error shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed.",
    "details": []
  }
}
```

### 9.4 List Endpoint Standards

Every list endpoint used by the public website or dashboard must support:

- Pagination.
- Search where useful.
- Filters required by the UI.
- Stable sort options.
- Locale for public localized content.
- Authorization-scoped results for restricted dashboard lists.

Dashboard list endpoints must never return unbounded sensitive data.

### 9.5 Validation Standards

Every mutation endpoint must validate:

- Request body shape.
- Required fields.
- Enum values.
- Relation IDs.
- Date/time values.
- Slot status and capacity.
- Appointment status transition.
- Authenticated user permission.
- Record ownership or assignment where applicable.
- Sensitive external URLs before rendering or redirecting.

---

## 10. Security Requirements

### 10.1 Frontend

- Do not hard-code sensitive backend tokens.
- Do not request restricted clinical collections from public routes.
- Never render video consultation links publicly.
- Add `rel="noopener noreferrer"` for external links opened in new tabs.
- Hide dashboard controls the user cannot perform.
- Treat permission-denied states as normal UI states.
- Avoid storing sensitive client or clinical details in localStorage.

### 10.2 Backend

- Public role can read only safe published content.
- Appointment, client, payment, slot-management, and clinical endpoints require authentication.
- Clinical records require assignment-aware access checks.
- Public API token must be read-only and limited to safe public content.
- Admin access must be restricted.
- Audit sensitive actions where available.
- Add rate limiting to public booking, authentication, and other sensitive endpoints.
- Validate redirects and externally configured URLs to reduce unsafe redirect risk.
- Use server-side authorization even when dashboard controls are hidden in the UI.
- Avoid leaking client or clinical data in logs and error responses.

---

## 11. Database and Migration Requirements

- Use PostgreSQL for production.
- Add indexes for common filters: status, therapist, service, date, delivery mode, locale, published state, and campaign dates.
- Add uniqueness constraints for fields such as localized slugs or internal client codes where supported.
- Use foreign keys/relations for appointment-service, appointment-therapist, appointment-slot, note-client, and treatment-plan-client links.
- Prefer additive migrations first, then backfill, then switch frontend/backend usage.
- Back up database and media before production schema changes.
- Keep public API permissions restricted after every content-type migration.
- Document migration and rollback steps in `MIGRATION-NOTES.md`.

---

## 12. Accessibility Requirements

- All navigation, controls, forms, language toggle, menu buttons, booking steps, dialogs, tabs, filters, and links must be keyboard accessible.
- Form inputs must have visible labels or accessible labels.
- Errors must be connected to fields and translated.
- Status colors must be supported by text labels, not color alone.
- Arabic RTL must work in layout, ordering, alignment, table controls, and form flows.
- Text must not overlap or overflow on mobile, tablet, or desktop.

---

## 13. Performance Requirements

- Lazy-load route components where practical.
- Use TanStack Query caching for CMS content.
- Avoid unbounded populate queries.
- Paginate media and operational tables.
- Optimize images and use responsive dimensions.
- Use stable layout dimensions for cards, grids, booking steps, and dashboard tables.
- Avoid unnecessary API refetches on language, route, or filter changes.

---

## 14. Testing Strategy

| Area | Required Tests |
| --- | --- |
| Public routes | Render all routes in English and Arabic with CMS content and fallback states. |
| Booking | Validate required fields, slot status, online/offline differences, guardian flow, WhatsApp message, and optional persistence. |
| API safety | Confirm public frontend never requests restricted records. |
| Dashboard roles | Confirm route access, visible menu items, blocked actions, and permission-denied states. |
| Clinical privacy | Confirm non-clinical roles cannot access notes, treatment plans, or assessment results. |
| Localization | Confirm `lang`, `dir`, translations, RTL layout, and locale query params. |
| Responsive UI | Confirm mobile, tablet, desktop, and dashboard dense table states. |
| Media | Confirm image fallback, alt text, audio/video embed fallback, and article pagination. |
| External links | Confirm WhatsApp, map, phone, email, and future video/payment links open safely. |
| API responses | Confirm success and error shapes are consistent. |
| Authorization | Confirm unauthorized, forbidden, and ownership-denied scenarios. |
| Database constraints | Confirm duplicate slugs/codes, invalid relations, and status constraints fail safely. |

---

## 15. Deployment Specification

Production deployment should use:

- VPS hosting.
- PM2 for Strapi process management.
- Nginx or OpenLiteSpeed for HTTPS, reverse proxy, redirects, and security headers.
- PostgreSQL with backups.
- Production-safe environment variables.
- Restricted CORS.
- Separate frontend and backend deployment logs.
- Database and media backup/restore documentation.

Do not use Docker or Kubernetes for this project unless the project scope changes.

---

## 16. Launch Criteria

- Public website renders core pages in English and Arabic.
- Public booking flow works and creates a correct WhatsApp handoff.
- Appointment persistence is either implemented and tested or explicitly disabled.
- Public API permissions are verified.
- Clinical and client records are not public.
- Therapist, service, legal, contact, and confidentiality content exists in both languages.
- Header, footer, mobile menu, language toggle, and booking CTA work.
- Privacy, terms, consent, and confidentiality pages are discoverable.
- Design matches approved palette and accessibility contrast rules.
- Production environment variables, CORS, backups, and media settings are configured.
- API documentation, migration notes, README, and task files are updated.
- VPS deployment checklist is complete with PM2 and Nginx or OpenLiteSpeed.
