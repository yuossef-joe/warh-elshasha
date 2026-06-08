# Backend Tasks

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Backend Platform | Strapi 5 |
| Priority Model | P0 critical, P1 launch, P2 post-launch, P3 future enhancement |

---

## 1. Foundation

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-001 | P0 | Initialize or verify Strapi 5 backend project structure. | Backend has standard `config`, `src/api`, `src/components`, and environment setup. |
| BE-002 | P0 | Configure database, server, admin, middleware, and plugin settings. | Development and production environment variables are documented and loaded correctly. |
| BE-003 | P0 | Enable Strapi i18n. | Public content types can be localized in English and Arabic. |
| BE-004 | P0 | Configure upload/media provider. | Images, audio, and video preview assets can be uploaded and resolved by the frontend. |
| BE-005 | P0 | Configure CORS for approved frontend origins. | Only approved origins can access the API in production. |
| BE-006 | P0 | Define public read-only API token strategy. | Public token cannot access restricted records. |
| BE-007 | P0 | Define admin roles and initial users. | Super admin and required staff roles are configured. |

---

## 2. Public CMS Single Types

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-010 | P0 | Create `site-information` single type. | Logo, pages, contact, social links, footer, copyright, WhatsApp number, and legal links are manageable. |
| BE-011 | P0 | Create `home-page` single type. | Hero, stats, services, trust content, testimonials, awareness highlights, and CTA are manageable. |
| BE-012 | P0 | Create `about-page` single type. | Story, mission, vision, values, experts, gallery, and CTA are manageable. |
| BE-013 | P0 | Create `service-page` single type. | Service page hero, categories, benefits, delivery modes, eligibility guidance, and CTA are manageable. |
| BE-014 | P1 | Create `therapists-page` single type. | Listing hero, intro, filters, and CTA are manageable. |
| BE-015 | P1 | Create `appointments-page` single type. | Appointment landing content can be maintained if route is used. |
| BE-016 | P1 | Create `support-groups-page` single type. | Support group listing hero and intro content are manageable. |
| BE-017 | P1 | Create `assessments-page` single type. | Assessment listing hero and intro content are manageable. |
| BE-018 | P1 | Create `awareness-events-page` single type. | Awareness event listing hero and intro content are manageable. |
| BE-019 | P1 | Create `blogs-page`, `podcasts-page`, and `videos-page` single types. | Media listing hero metadata is manageable by locale. |
| BE-020 | P0 | Create `contact-page` single type. | Contact info, form labels, WhatsApp copy, clinic locations, map URL, and emergency disclaimer are manageable. |
| BE-021 | P0 | Create `privacy-page`, `terms-page`, and `consent-page` single types. | Legal, consent, confidentiality, cancellation, and data-use content are localized and published. |

---

## 3. Public Collection Types

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-030 | P0 | Create `service` collection. | Services include type, title, image, description, duration, price, delivery mode, eligibility, requirements, therapists, availability, and booking CTA. |
| BE-031 | P0 | Create `therapist` collection. | Profiles include image, title, credentials, specialization, bio, languages, services, session modes, locations, availability summary, and status. |
| BE-032 | P1 | Create `assessment` collection. | Assessment catalog includes audience, duration, requirements, consent guidance, price, therapist relation, follow-up process, and status. |
| BE-033 | P1 | Create `support-group` collection. | Groups include topic, facilitator, schedule, capacity, eligibility, delivery mode, price/free status, resources, and public CTA. |
| BE-034 | P1 | Create `awareness-event` collection. | Events include topic, date/time, location or online link, speakers, campaign relation, registration CTA, capacity, and feedback status. |
| BE-035 | P1 | Create `blog` collection. | Articles include slug, title, excerpt, content, author, reviewer, date, image, topic, disclaimer, and related services. |
| BE-036 | P2 | Create `podcast` collection. | Episodes include slug, title, episode number, host, guest, audio/embed URL, transcript, duration, image, and status. |
| BE-037 | P2 | Create `educational-video` collection. | Videos include slug, title, presenter, video/embed URL, transcript or summary, duration, image, topic, and status. |
| BE-038 | P2 | Create `campaign` collection. | Campaigns include objective, audience, channels, linked content, dates, owner, approval status, and performance metrics. |

---

## 4. Operational Collection Types

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-050 | P1 | Create `availability-slot` collection. | Slots include therapist, service, date, start/end time, capacity, status, delivery mode, location, map URL, video flag, and notes. |
| BE-051 | P1 | Create `appointment` collection. | Records include booking type, service, therapist, slot, client details, guardian metadata, message, delivery mode, consent, payment status, appointment status, source, and locale. |
| BE-052 | P2 | Create `client` collection. | Client profiles include code, contact details, age group, guardian details, consent status, communication preferences, appointments, and follow-up status. |
| BE-053 | P2 | Create `feedback-survey` collection. | Surveys link to sessions, events, support groups, or content with rating, satisfaction score, comments, and created date. |
| BE-054 | P2 | Create `newsletter` collection. | Newsletters include audience segment, content blocks, scheduled date, status, opens, clicks, and unsubscribe metadata. |

---

## 5. Restricted Clinical Data

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-060 | P2 | Create `session-note` collection with strict permissions. | Only assigned therapist/counselor, clinical leadership, and super admin can access notes. |
| BE-061 | P2 | Create `treatment-plan` collection with strict permissions. | Treatment plans include goals, interventions, follow-up cadence, progress notes, status, and review date. |
| BE-062 | P2 | Add restricted assessment result support. | Assessment summaries and recommendations are not exposed publicly. |
| BE-063 | P0 | Verify public roles cannot access clinical records. | Public API returns no clinical collection data. |
| BE-064 | P1 | Separate receptionist access from clinical note access. | Receptionists can manage scheduling and payment status but cannot see restricted notes. |

---

## 6. Shared Components

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-070 | P0 | Create global components for buttons, links, stats, CTA, contact info, and confidentiality notices. | Public pages can reuse consistent structured content. |
| BE-071 | P0 | Create page-section components for home, about, services, therapists, appointments, support groups, media, contact, and legal content. | Single types can assemble required page content without custom fields for every section. |
| BE-072 | P1 | Create media approval and metric components. | Campaigns and media content can store approval history and engagement metadata. |
| BE-073 | P1 | Create appointment follow-up action component. | Follow-up tasks store owner, due date, status, priority, and notes. |

---

## 7. Custom Logic and Validation

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-080 | P1 | Implement public appointment request validation. | Required fields, consent, slot status, and delivery mode rules are validated before persistence. |
| BE-081 | P1 | Add availability slot capacity check. | Full, cancelled, closed, unavailable, or unpublished slots cannot be booked. |
| BE-082 | P1 | Add appointment status transition validation. | Status changes follow allowed workflow values. |
| BE-083 | P1 | Add child/adolescent guardian validation. | Guardian contact and consent metadata are required where applicable. |
| BE-084 | P2 | Add therapist assignment checks for clinical records. | Therapists can create or view notes only for assigned clients/sessions. |
| BE-085 | P2 | Add campaign approval workflow fields and validation. | Content cannot move to published without approval where required. |
| BE-086 | P0 | Define validation schema pattern for all custom mutations. | Booking, appointment, slot, client, session note, treatment plan, campaign, and media mutations validate body, enum values, relations, and required fields before persistence. |
| BE-087 | P0 | Keep custom endpoint business logic in services. | Custom Strapi routes delegate controller -> service -> repository/entity service; route files contain no business rules. |
| BE-088 | P1 | Add ownership and assignment validation utilities. | Restricted endpoints can verify therapist assignment, client access, content ownership, and role scope consistently. |

---

## 8. API and Integration

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-090 | P0 | Configure public read endpoints for page content, services, therapists, and media. | Frontend can fetch published localized content with populate queries. |
| BE-091 | P1 | Add optional public appointment creation endpoint. | Booking flow can create appointment records before WhatsApp handoff when enabled. |
| BE-092 | P1 | Store WhatsApp source metadata. | Appointment records identify website/WhatsApp source and locale. |
| BE-093 | P2 | Store video consultation metadata for confirmed online sessions. | Video links are restricted and never public. |
| BE-094 | P2 | Prepare payment metadata fields. | Payment provider can be integrated without changing appointment core model. |
| BE-095 | P2 | Prepare newsletter and analytics metadata fields. | Media and campaign reports can consume engagement data. |
| BE-096 | P1 | Ensure external link safety metadata. | URLs intended for new tabs are marked for `noopener noreferrer` handling. |
| BE-097 | P0 | Standardize custom API success and error responses. | Custom endpoints return consistent `success`, `data`, `meta`, and `error` shapes. |
| BE-098 | P0 | Add pagination, search, filter, and sort support to list endpoints. | Dashboard and public list endpoints do not return unbounded records. |
| BE-099 | P1 | Add rate limiting for sensitive endpoints. | Public booking and authentication-related endpoints are protected from abusive traffic. |

---

## 9. Security and Compliance

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-100 | P0 | Configure safe public permissions. | Public role can read only approved public content. |
| BE-101 | P0 | Restrict client, appointment, payment, and clinical endpoints. | Unauthenticated users cannot access restricted data. |
| BE-102 | P0 | Verify API token permissions. | Public token cannot access appointment, client, notes, treatment plans, or assessment results. |
| BE-103 | P1 | Add audit logging strategy for sensitive actions. | Role changes, consent changes, appointment status changes, content approvals, and clinical access can be audited where supported. |
| BE-104 | P1 | Document data retention requirements. | Client, appointment, consent, feedback, campaign, and analytics retention policies are documented. |
| BE-105 | P1 | Review legal page publishing workflow. | Privacy, terms, consent, and confidentiality pages are approved in both languages. |
| BE-106 | P1 | Add no-emergency disclaimer content support. | Public pages can redirect emergency needs to local emergency resources without implying crisis response. |
| BE-107 | P0 | Validate external URLs and redirects. | WhatsApp, map, video, payment, and campaign URLs are trusted, validated, or safely blocked. |
| BE-108 | P0 | Prevent sensitive logging. | Logs do not include clinical notes, treatment plans, assessment summaries, appointment messages, or client-sensitive data. |
| BE-109 | P1 | Add server-side authorization tests. | Backend denies unauthorized, forbidden, and ownership-denied access regardless of frontend UI state. |

---

## 10. Database and Migrations

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-110 | P0 | Configure PostgreSQL production database strategy. | Production database configuration, backups, least-privilege credentials, and restore procedure are documented. |
| BE-111 | P1 | Add indexes for frequent filters and reports. | Services, therapists, slots, appointments, clients, notes, plans, blogs, and campaigns support expected filters efficiently. |
| BE-112 | P1 | Add uniqueness constraints where required. | Localized slugs and internal client codes cannot duplicate unexpectedly. |
| BE-113 | P1 | Define safe migration workflow. | Additive changes, backfill steps, staging verification, permission review, and rollback notes are documented. |
| BE-114 | P1 | Add content backfill plan. | Required English/Arabic pages, services, therapists, legal content, and contact data can be seeded or backfilled safely. |

---

## 11. Reporting

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-130 | P2 | Build appointment pipeline report endpoint or admin view. | Authorized users can inspect appointment counts by status, service, therapist, source, and date. |
| BE-131 | P2 | Build therapist utilization report. | Utilization can be calculated from slots and confirmed/completed sessions. |
| BE-132 | P2 | Build client activity report. | Active and returning clients can be measured. |
| BE-133 | P2 | Build revenue report. | Revenue can be grouped by service, therapist, package/subscription, payment status, and refund amount. |
| BE-134 | P2 | Build support group and assessment reports. | Registrations, attendance, completions, and follow-up recommendations can be measured. |
| BE-135 | P2 | Build media and campaign reports. | Views, CTA clicks, reach, impressions, registrations, appointment leads, and engagement rate can be measured. |

---

## 12. Content Seeding

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-150 | P0 | Seed site information and navigation. | Header and footer can render in English and Arabic. |
| BE-151 | P0 | Seed core services. | Consultation, individual therapy, family counseling, couples counseling, child/adolescent counseling, assessments, support groups, and awareness programs exist. |
| BE-152 | P1 | Seed sample therapist profiles. | Therapist listing and detail pages can be tested. |
| BE-153 | P1 | Seed legal and consent pages. | Booking and footer legal links work in both languages. |
| BE-154 | P1 | Seed contact page and WhatsApp number. | Contact and booking handoff can resolve operational contact details. |
| BE-155 | P2 | Seed sample media content. | Articles, podcasts, videos, campaigns, and events can be tested. |

---

## 13. Testing and Launch Checks

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-170 | P0 | Test public API exposure. | Restricted content cannot be read by public token or unauthenticated requests. |
| BE-171 | P0 | Test localized content retrieval. | English and Arabic content returns correctly for all public routes. |
| BE-172 | P1 | Test booking validation rules. | Missing fields, missing consent, unavailable slots, and child/guardian cases fail correctly. |
| BE-173 | P1 | Test media URL resolution. | Images, audio, and video preview URLs work from the frontend. |
| BE-174 | P1 | Test role-based staff access. | Reception, therapist, media, content, and admin roles see only permitted records. |
| BE-175 | P1 | Test backup and restore process. | Production database and media restore plan is verified. |
| BE-176 | P1 | Document launch checklist. | API tokens, CORS, environment variables, admin users, legal pages, localization, and permission checks are verified. |
| BE-177 | P1 | Test custom API response shapes. | Success and error responses match `API-DOCUMENTATION.md`. |
| BE-178 | P1 | Test database constraints and relation errors. | Duplicate, missing relation, invalid relation, and invalid status scenarios fail safely. |

---

## 14. VPS Deployment

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| BE-190 | P1 | Configure PM2 process for Strapi. | Production Strapi process restarts safely and logs are accessible without exposing secrets. |
| BE-191 | P1 | Configure Nginx or OpenLiteSpeed for backend. | HTTPS, reverse proxy, CORS, request size limits, and security headers are configured. |
| BE-192 | P1 | Configure production media storage and backups. | Uploaded media persists across deploys and restore process is documented. |
| BE-193 | P1 | Configure production environment variables. | Secrets are not committed and required production variables are documented in `.env.example`. |
| BE-194 | P1 | Verify deployment excludes Docker and Kubernetes. | Deployment plan uses VPS, PM2, and Nginx/OpenLiteSpeed only. |
