# Backend Structure

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Backend Platform | Strapi 5 |
| Primary Purpose | CMS, appointment operations, therapist scheduling, media publishing, support programs, and restricted clinical data |
| Languages | English and Arabic through Strapi i18n |
| Critical Boundary | Public website content must be separated from client records, session notes, treatment plans, and assessment results |

---

## 1. Backend Goals

The backend must provide a maintainable Strapi 5 architecture for a bilingual psychological media and mental health services platform. It should support public content publishing, service discovery, therapist profiles, structured appointment intake, availability management, support groups, assessments, awareness campaigns, media publishing, operational reporting, and privacy-protected clinical workflows.

The backend must be implementation-ready for the current public website and future dashboard modules without exposing sensitive psychological records through public APIs.

---

## 2. Architecture Overview

### 2.1 Main Layers

| Layer | Responsibility |
| --- | --- |
| Strapi Admin | Staff content management, operations management, media management, and future dashboard data administration. |
| Public REST API | Published localized website content, service catalog, therapist profiles, public media, legal pages, and contact content. |
| Restricted REST API | Appointment records, client records, therapist schedules, support group registrations, payment status, feedback, and reports. |
| Clinical Data Layer | Session notes, treatment plans, assessment summaries, restricted follow-ups, and sensitive client information. |
| Media Library | Images, audio, video previews, documents, campaign assets, and gallery media. |
| Integration Layer | WhatsApp handoff, video session metadata, maps, future payment provider, future newsletter provider, and analytics metadata. |

### 2.2 Recommended Project Layout

```text
backend/
  config/
    admin.ts
    api.ts
    database.ts
    middlewares.ts
    plugins.ts
    server.ts
  src/
    api/
      site-information/
      home-page/
      about-page/
      service-page/
      therapists-page/
      appointments-page/
      support-groups-page/
      assessments-page/
      awareness-events-page/
      blogs-page/
      podcasts-page/
      videos-page/
      contact-page/
      privacy-page/
      terms-page/
      consent-page/
      service/
      therapist/
      availability-slot/
      appointment/
      client/
      session-note/
      treatment-plan/
      assessment/
      support-group/
      awareness-event/
      campaign/
      blog/
      podcast/
      educational-video/
      newsletter/
      feedback-survey/
    components/
      global/
      home/
      about/
      services/
      therapists/
      appointments/
      support-groups/
      media/
      contact/
      legal/
    extensions/
    middlewares/
    policies/
    utils/
  types/
  public/
  .env
```

### 2.3 Custom Logic Structure

Use Strapi generated routes/controllers/services where possible, and add custom controllers only for workflow logic that cannot be safely represented by standard CRUD.

```text
Route
-> Controller
-> Service
-> Repository / Strapi entity service
-> Database
```

| Layer | Responsibility |
| --- | --- |
| Route | HTTP method/path mapping only. |
| Controller | Request parsing, validation invocation, service delegation, consistent response formatting. |
| Service | Appointment workflow rules, capacity checks, consent rules, ownership checks, publishing workflow rules. |
| Repository / Entity Service | Data reads/writes, filters, populate configuration, pagination, and relation handling. |
| Policy / Middleware | Authentication, authorization, ownership pre-checks, rate limiting, and security headers. |

Business logic must not be placed directly in route definitions.

---

## 3. Content-Type Strategy

### 3.1 Public Single Types

| Content Type | Purpose | Public API |
| --- | --- | --- |
| `site-information` | Logo, navigation, social links, contact info, footer, copyright. | Read published only |
| `home-page` | Home hero, stats, services, trust content, awareness highlights, CTA. | Read published only |
| `about-page` | Story, mission, vision, values, experts, gallery, CTA. | Read published only |
| `service-page` | Services page hero, category sections, delivery guidance, CTA. | Read published only |
| `therapists-page` | Therapist listing hero, intro, filters, CTA. | Read published only |
| `appointments-page` | Optional appointment landing content. | Read published only |
| `support-groups-page` | Support groups listing intro. | Read published only |
| `assessments-page` | Assessment listing intro. | Read published only |
| `awareness-events-page` | Awareness events listing intro. | Read published only |
| `blogs-page` | Articles/blog listing hero metadata. | Read published only |
| `podcasts-page` | Podcast listing hero metadata. | Read published only |
| `videos-page` | Educational video listing hero metadata. | Read published only |
| `contact-page` | Contact copy, form labels, WhatsApp text, location, map URL. | Read published only |
| `privacy-page` | Privacy policy. | Read published only |
| `terms-page` | Terms of service. | Read published only |
| `consent-page` | Consent, confidentiality, cancellation, and data-use guidance. | Read published only |

### 3.2 Public Collection Types

| Content Type | Purpose | Public API |
| --- | --- | --- |
| `service` | Psychological service catalog. | Read published only |
| `therapist` | Therapist and psychologist profiles. | Read published only, excluding private fields |
| `assessment` | Public assessment catalog and booking metadata. | Read published only |
| `support-group` | Public group programs and registration metadata. | Read published only |
| `awareness-event` | Public events, webinars, workshops, and campaigns. | Read published only |
| `blog` | Articles, blogs, educational written content. | Read published only |
| `podcast` | Podcast episodes. | Read published only |
| `educational-video` | Educational video records. | Read published only |
| `campaign` | Public campaign landing metadata where approved. | Limited read published only |

### 3.3 Restricted Operational Collection Types

| Content Type | Purpose | Access |
| --- | --- | --- |
| `availability-slot` | Therapist slots, service slots, capacity, location, and online/offline mode. | Admin, operations, therapist by assignment |
| `appointment` | Booking requests, confirmations, payment status, delivery mode, consent, source. | Admin, operations, assigned therapist/counselor |
| `client` | Client profile, contact details, guardian metadata, consent status, service history. | Admin, operations limited, clinical roles by assignment |
| `feedback-survey` | Satisfaction and service feedback. | Admin, operations, reporting roles |
| `newsletter` | Newsletter issues and engagement metadata. | Media roles |

### 3.4 Restricted Clinical Collection Types

| Content Type | Purpose | Access |
| --- | --- | --- |
| `session-note` | Restricted clinical notes and follow-up actions. | Assigned therapist/counselor, clinical leadership, super admin only |
| `treatment-plan` | Goals, interventions, progress notes, next review date. | Assigned therapist/counselor, clinical leadership, super admin only |
| `assessment-result` or restricted assessment fields | Assessment result summaries, recommendations, clinician notes. | Assigned therapist/psychologist and clinical leadership only |

Clinical records must not be available to public roles, unauthenticated users, media roles, content creators, or receptionists.

---

## 4. Core Content Type Fields

### 4.1 `service`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Text, localized | Required |
| `slug` | UID | Localized or generated from title |
| `image` | Media | Meaningful service visual |
| `serviceType` | Enumeration | `consultation`, `therapy_session`, `counseling_session`, `assessment`, `support_group`, `awareness_event` |
| `tagline` | Text, localized | Short card copy |
| `description` | Rich text / blocks, localized | Full service explanation |
| `duration` | Text / integer | Session duration |
| `price` | Decimal / text | Allow manual pricing labels |
| `deliveryMode` | Enumeration | `online`, `offline`, `hybrid` |
| `eligibleAudience` | Component list | Adults, couples, families, parents, adolescents, organizations |
| `benefits` | Repeatable component | Public benefit copy |
| `requirements` | Repeatable component | Preparation, consent, guardian requirement |
| `therapists` | Relation | Many-to-many with therapist |
| `availabilityStatus` | Enumeration | `available`, `limited`, `full`, `closed`, `unpublished` |
| `bookingCTA` | Component | Label and route |
| `contactPhone` | Text | Optional override |
| `contactEmail` | Email | Optional override |
| `address` | Text | Offline location override |

### 4.2 `therapist`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | Text, localized | Required |
| `image` | Media | Profile photo |
| `title` | Text, localized | Professional title |
| `credentials` | Component list | Degree, certificate, license, qualification |
| `specialization` | Repeatable text/component | Anxiety, family, child/adolescent, trauma, etc. |
| `bio` | Rich text / blocks, localized | Public bio |
| `languages` | Enumeration / component | Arabic, English, other |
| `services` | Relation | Many-to-many with service |
| `sessionModes` | Enumeration list | Online, offline, hybrid |
| `locations` | Component list | Clinic/location names and map URLs |
| `availabilitySummary` | Text, localized | Public availability text |
| `status` | Enumeration | `active`, `inactive`, `draft`, `archived` |
| `privateNotes` | Text | Restricted, never public |

### 4.3 `availability-slot`

| Field | Type | Notes |
| --- | --- | --- |
| `therapist` | Relation | Required when therapist-specific |
| `service` | Relation | Optional service slot |
| `date` | Date | Required |
| `startTime` | Time | Required |
| `endTime` | Time | Required |
| `capacity` | Integer | Default 1 for private sessions |
| `availableSeats` | Integer | Derived manually or by backend logic |
| `status` | Enumeration | `available`, `limited`, `full`, `cancelled`, `closed`, `unpublished` |
| `deliveryMode` | Enumeration | Online, offline, hybrid |
| `location` | Text | Required for offline |
| `mapUrl` | URL | Optional |
| `videoEnabled` | Boolean | For online/hybrid |
| `notes` | Text | Internal instructions |

### 4.4 `appointment`

| Field | Type | Notes |
| --- | --- | --- |
| `bookingType` | Enumeration | Matches BRD booking types |
| `service` | Relation | Required when selected |
| `therapist` | Relation | Optional therapist preference |
| `availabilitySlot` | Relation | Required when slot scheduling is enabled |
| `client` | Relation | Optional until client record creation |
| `name` | Text | Required |
| `email` | Email | Required when policy requires |
| `phone` | Text | Required |
| `ageGroup` | Enumeration | Adult, young adult, child, adolescent |
| `guardianName` | Text | Required for child/adolescent where applicable |
| `guardianPhone` | Text | Required for child/adolescent where applicable |
| `message` | Text | Optional client notes |
| `deliveryMode` | Enumeration | Online, offline, hybrid |
| `consentAcknowledged` | Boolean | Required |
| `consentTimestamp` | DateTime | Required when persisted |
| `paymentStatus` | Enumeration | `unpaid`, `pending`, `paid`, `partially_paid`, `refunded`, `waived` |
| `appointmentStatus` | Enumeration | `new`, `pending_confirmation`, `confirmed`, `rescheduled`, `cancelled`, `completed`, `no_show`, `follow_up_required` |
| `source` | Enumeration/Text | Website, WhatsApp, admin, campaign |
| `locale` | Enumeration | `en`, `ar` |

### 4.5 `client`

| Field | Type | Notes |
| --- | --- | --- |
| `clientCode` | UID/Text | Internal identifier |
| `name` | Text | Required |
| `phone` | Text | Required |
| `email` | Email | Optional |
| `ageGroup` | Enumeration | Adult, young adult, child, adolescent |
| `guardianDetails` | Component | Required where applicable |
| `consentStatus` | Enumeration | `not_requested`, `pending`, `accepted`, `revoked`, `expired` |
| `communicationPreferences` | Component | WhatsApp, phone, email |
| `appointments` | Relation | Appointment history |
| `followUpStatus` | Enumeration | None, active, overdue, closed |

### 4.6 `session-note`

| Field | Type | Notes |
| --- | --- | --- |
| `appointment` | Relation | Required |
| `client` | Relation | Required |
| `therapist` | Relation | Required |
| `noteType` | Enumeration | Intake, progress, assessment, follow-up, risk, summary |
| `restrictedContent` | Rich text | Restricted clinical content |
| `treatmentPlan` | Relation | Optional |
| `followUpActions` | Component list | Owner, due date, status, priority |
| `visibilityScope` | Enumeration | Assigned clinician, clinical leadership |
| `createdByUser` | Relation/User metadata | Audit reference |
| `updatedByUser` | Relation/User metadata | Audit reference |

### 4.7 `campaign`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Text, localized | Required |
| `objective` | Text, localized | Awareness, education, service leads |
| `audience` | Component/list | Public, parents, students, corporate, community |
| `channels` | Enumeration list | Website, social, newsletter, event, video |
| `linkedContent` | Relations | Services, groups, events, articles |
| `startDate` | Date | Required |
| `endDate` | Date | Optional |
| `owner` | User/Relation | Media manager |
| `approvalStatus` | Enumeration | Draft, review, approved, scheduled, published, archived, rejected |
| `reach` | Integer | Optional |
| `impressions` | Integer | Optional |
| `clicks` | Integer | Optional |
| `engagementRate` | Decimal | Optional |
| `notes` | Text | Internal |

---

## 5. Shared Components

| Component | Fields |
| --- | --- |
| `global.button` | label, href, variant, opensNewTab |
| `global.cta` | title, description, primaryButton, secondaryButton, image |
| `global.stat` | label, value, description, icon |
| `global.link` | label, href, order, isExternal |
| `global.social-link` | platform, url, icon |
| `global.contact-info` | phone, email, address, mapUrl, whatsappNumber |
| `global.confidentiality-notice` | title, body, emergencyDisclaimer, emergencyResourceText |
| `services.benefit` | title, description, icon |
| `services.requirement` | title, description, required |
| `therapists.credential` | label, issuer, year, description |
| `appointments.booking-step` | title, description, fields, order |
| `appointments.follow-up-action` | title, ownerRole, dueDate, status, priority, notes |
| `media.approval-history` | reviewer, reviewedAt, decision, comments |
| `media.metric` | metricName, metricValue, source, measuredAt |
| `legal.content-section` | title, body, order |

---

## 6. Localization

- Enable Strapi i18n for all public single types and public collection types.
- English and Arabic content must be maintained for all navigation, public pages, services, therapists, legal content, forms, validation copy, media titles, and booking guidance.
- Store language-neutral operational records such as appointments and client records with `locale` metadata rather than duplicating records by locale.
- Arabic frontend requests must use `locale=ar`; English requests must use `locale=en`.
- Public APIs should return fallback content only where the frontend explicitly handles missing localized entries.

---

## 7. Roles and Permissions

| Role | Permissions |
| --- | --- |
| Super Admin | Full access to all content, users, settings, audit data, and restricted records. |
| Organization Admin | Manage services, staff, schedules, reports, appointments, public content settings, and payment metadata. |
| Clinical Leadership | Access clinical records, treatment plans, assessment summaries, and review psychologically sensitive media. |
| Therapist / Psychologist | Manage own profile, own availability, assigned appointments, assigned client clinical notes, and treatment plans. |
| Counselor | Manage assigned counseling sessions, support groups, attendance, notes within scope, and follow-ups. |
| Receptionist | Manage appointment requests, confirmations, rescheduling, payment status, and client contact details. No restricted notes. |
| Support Staff | Limited appointment, event, group, and follow-up access. No restricted notes. |
| Content Creator | Draft localized media and page content. No publish approval, no client data, no clinical records. |
| Media Manager | Approve, schedule, publish, archive, and measure media content and campaigns. No clinical records. |
| Public | Read published public content only and submit permitted public forms. |

---

## 8. API Strategy

### 8.1 Public API Rules

- Expose only published localized public content.
- Never expose `appointment`, `client`, `session-note`, `treatment-plan`, private therapist notes, assessment result fields, video access links, or internal payment metadata through unauthenticated public APIs.
- Use Strapi populate queries carefully and centrally in frontend helpers.
- Return meaningful media fields and alt text for public content.
- Keep public read tokens limited to safe content types only.

### 8.2 Restricted API Rules

- Require authenticated users for appointment operations, client records, schedules, feedback, payment status, and reporting.
- Enforce role-based policies for every restricted endpoint.
- Separate operational access from clinical access.
- Validate appointment status transitions and slot capacity before updates.
- Store consent timestamp and locale when appointment persistence is enabled.

### 8.3 Recommended Custom Controllers

| Controller | Purpose |
| --- | --- |
| `appointment/create-public-request` | Validate public booking payload, optionally persist appointment, and return WhatsApp message metadata. |
| `availability/check-slot` | Check slot status and capacity before booking. |
| `appointment/update-status` | Enforce allowed appointment status transitions. |
| `session-note/create-restricted` | Enforce therapist assignment and clinical role permissions. |
| `campaign/metrics-summary` | Provide dashboard metrics from stored campaign metadata. |
| `reports/operations-summary` | Return appointment, therapist utilization, revenue, support group, and assessment KPIs for authorized roles. |

### 8.4 Standard API Requirements

Every custom endpoint must include:

- Request validation.
- Authentication checks when endpoint is not public.
- Authorization checks by role.
- Ownership or assignment checks for appointment, client, clinical, and therapist-specific data.
- Consistent success response.
- Consistent error response.
- Pagination for lists.
- Search and filters where the dashboard or website requires them.
- Rate limiting for public booking and other sensitive endpoints.

### 8.5 API Response Standards

Custom success responses should follow:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Custom error responses should follow:

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

### 8.6 Validation Schemas

Define validation schemas for:

- Public booking request.
- Appointment creation and status update.
- Availability slot creation/update.
- Client create/update.
- Session note create/update.
- Treatment plan create/update.
- Support group registration/attendance.
- Campaign metrics update.
- Media approval status update.

Validation must run before persistence and before external handoff generation.

---

## 9. Database and Migration Strategy

### 9.1 Database Requirements

- Use PostgreSQL for production.
- Use Strapi relations rather than duplicating relationship fields where possible.
- Add indexes for high-traffic filters and reports.
- Add uniqueness constraints where required for internal codes and localized slugs.
- Keep client, appointment, clinical note, and treatment plan tables restricted from public access.

### 9.2 Recommended Indexes

| Entity | Indexes / Constraints |
| --- | --- |
| `service` | `slug`, `serviceType`, `deliveryMode`, `publishedAt`, locale. |
| `therapist` | `documentId`, `status`, `publishedAt`, locale. |
| `availability-slot` | therapist, service, date, status, delivery mode. |
| `appointment` | appointment status, therapist, service, slot, payment status, source, created date. |
| `client` | unique `clientCode`, phone where policy permits, consent status. |
| `session-note` | appointment, client, therapist, created date. |
| `treatment-plan` | client, therapist, status, next review date. |
| `blog` | slug per locale, topic/category, published date, `publishedAt`. |
| `campaign` | approval status, owner, start date, end date. |

### 9.3 Safe Migration Rules

- Back up database and media before production migrations.
- Prefer additive schema changes.
- Backfill required fields before making them mandatory.
- Test public API permissions after every content-type change.
- Keep rollback notes for every production migration.
- Do not remove deprecated fields until frontend and backend usage has moved away from them.

---

## 10. Security and Privacy

- Use environment variables for API tokens, database credentials, media host configuration, WhatsApp fallback number, and future payment/video/newsletter settings.
- Restrict Strapi admin access to authorized staff.
- Enable HTTPS in production.
- Keep sensitive client data encrypted in transit and apply encryption at rest where hosting supports it.
- Maintain audit logs for role changes, appointment status changes, consent changes, content approvals, and clinical-record access.
- Use strict public API permissions and verify them before launch.
- Ensure video consultation links are never rendered publicly.
- Add `noopener noreferrer` handling for external WhatsApp, map, video, and payment links.
- Review Arabic and English legal pages before publication.
- Do not present crisis or emergency response unless approved staffing and policies exist.
- Validate external URLs before storing or rendering them.
- Avoid logging appointment messages, clinical notes, assessment summaries, treatment plans, or client-sensitive data.
- Add rate limiting to public booking and authentication endpoints.
- Use server-side authorization even when the frontend hides restricted controls.

---

## 11. Reporting Data

| Report | Required Data |
| --- | --- |
| Appointment Pipeline | Appointment status, service type, therapist, source, created date, confirmation date. |
| Therapist Utilization | Availability slots, confirmed sessions, completed sessions, cancellations, therapist assignment. |
| Client Activity | Client records, appointment history, active follow-up status, returning client marker. |
| Revenue | Payment status, service price, package/subscription metadata, refunds, outstanding amounts. |
| Support Groups | Group capacity, registrations, attendance, facilitator, feedback. |
| Assessments | Assessment bookings, completions, follow-up recommendations, therapist assignment. |
| Content Engagement | Views, reads/listens/views, CTA clicks, related leads, topic/category. |
| Campaign Performance | Reach, impressions, clicks, shares, registrations, appointment leads, engagement rate. |

---

## 12. Deployment Requirements

- Use separate environments for development, staging, and production.
- Keep production Strapi admin protected with strong credentials and restricted access.
- Configure CORS only for approved frontend domains.
- Use production-grade database backups and restore procedures.
- Store uploaded media through a reliable provider or server volume with backups.
- Run schema migrations and content-type changes through reviewed deployment steps.
- Keep `.env` files out of version control.
- Document public API token permissions and rotate tokens when staff or environments change.
- Deploy to VPS using PM2 and Nginx or OpenLiteSpeed.
- Configure HTTPS, security headers, request size limits, and upload/media handling.
- Keep deployment logs separate from sensitive application data.
- Do not use Docker or Kubernetes for the current project scope.

---

## 13. Acceptance Criteria

- Public content types support English and Arabic where required.
- Public APIs expose only published safe content.
- Appointment persistence can capture required booking data, consent, status, source, and locale.
- Therapist schedules and availability can represent online, offline, and hybrid sessions.
- Receptionist users cannot access restricted session notes or treatment plans.
- Content creators cannot publish without approval when workflow is enabled.
- Media managers can track campaign metadata and publishing status.
- Clinical records are restricted by role and assignment.
- Legal, consent, privacy, and confidentiality content can be managed in Strapi.
- Dashboard reporting data is available from structured records.
- Custom endpoints follow controller -> service -> repository/entity service flow.
- Mutations include validation, authorization, ownership checks, and consistent response shapes.
- Migration notes, API documentation, README, and task files remain updated.
