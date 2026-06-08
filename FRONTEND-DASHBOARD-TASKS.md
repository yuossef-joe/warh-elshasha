# Frontend Dashboard Tasks

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Frontend Stack | React, TypeScript, Vite, React Router, TanStack Query, Axios, Tailwind CSS, shadcn/Radix UI |
| Dashboard Purpose | Internal operations, appointments, therapist scheduling, client management, clinical workflows, content operations, reporting |
| Priority Model | P0 critical, P1 launch, P2 post-launch, P3 future enhancement |

---

## 1. Dashboard Foundation

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-001 | P0 | Define dashboard route structure under `/dashboard`. | Protected dashboard routes are separated from public website routes. |
| FD-002 | P0 | Implement authenticated layout shell. | Sidebar, top bar, page title area, user menu, language toggle, and responsive mobile drawer render consistently. |
| FD-003 | P0 | Add role-aware navigation. | Menu items are visible only to permitted roles. |
| FD-004 | P0 | Add loading, empty, error, and permission-denied states. | Every dashboard page handles API and authorization failure gracefully. |
| FD-005 | P0 | Add dashboard API client helpers. | Restricted API calls use authenticated headers and centralized error handling. |
| FD-006 | P0 | Add TanStack Query patterns for lists, details, mutations, and cache invalidation. | Mutations refresh affected lists and detail views. |
| FD-007 | P0 | Support English and Arabic dashboard UI. | `dir` and `lang` update correctly, and dense layouts remain readable in RTL. |
| FD-008 | P1 | Add reusable table, filter bar, status badge, detail drawer, confirmation dialog, and form section components. | Operational pages use consistent controls and status styling. |
| FD-009 | P0 | Define typed dashboard API contracts. | Dashboard list, detail, mutation, pagination, success, and error responses are represented with TypeScript types. |
| FD-010 | P0 | Centralize authenticated API error handling. | Unauthorized, forbidden, ownership denied, validation, not-found, and server errors map to consistent UI states. |
| FD-011 | P0 | Add route guard and session recovery behavior. | Protected routes redirect or show permission-denied states without exposing sensitive data. |
| FD-012 | P1 | Confirm package policy. | Dashboard uses existing React, TypeScript, Tailwind, shadcn/Radix, TanStack Query, and Axios patterns without unnecessary new packages. |

---

## 2. Dashboard Home

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-020 | P1 | Build operational dashboard overview. | Shows appointment pipeline, today's sessions, pending confirmations, follow-ups due, payment alerts, content waiting approval, and campaign highlights. |
| FD-021 | P1 | Add quick actions. | Users can create appointment, add client, add availability slot, create service/content, or open reports based on role. |
| FD-022 | P1 | Add role-specific summaries. | Therapists see own schedule and assigned follow-ups; reception sees booking queue; media sees approval queue; admins see KPIs. |
| FD-023 | P2 | Add date range filters. | KPI cards and charts can filter by today, week, month, quarter, or custom range. |

---

## 3. Appointment Management

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-030 | P0 | Build appointment list page. | Users can view appointments by date, status, therapist, service, delivery mode, source, and payment status. |
| FD-031 | P0 | Add appointment detail view. | Detail shows client info, service, therapist, selected slot, delivery mode, consent, status, payment, notes, and source. |
| FD-032 | P1 | Add appointment creation form. | Authorized staff can create online/offline appointment records manually. |
| FD-033 | P1 | Add status update actions. | Staff can move appointments through new, pending confirmation, confirmed, rescheduled, cancelled, completed, no-show, and follow-up required. |
| FD-034 | P1 | Add reschedule flow. | Staff can select another available slot and record reason. |
| FD-035 | P1 | Add cancellation flow. | Staff can cancel with reason, owner, and optional follow-up task. |
| FD-036 | P1 | Add WhatsApp message preview. | Staff can generate localized follow-up messages from appointment data. |
| FD-037 | P1 | Add consent display and audit marker. | Appointment details show consent acknowledged, timestamp, locale, and guardian metadata where relevant. |
| FD-038 | P1 | Add payment status control. | Reception/admin can update unpaid, pending, paid, partially paid, refunded, or waived. |
| FD-039 | P2 | Add reminders queue. | Staff can see reminders due for confirmed sessions, payment follow-up, and attendance instructions. |
| FD-040 | P1 | Add appointment mutation validation helpers. | Status, payment, reschedule, cancellation, guardian, consent, and slot fields are validated before API mutation. |
| FD-041 | P1 | Handle backend validation response details. | Field-level and summary errors from appointment APIs display clearly and locally. |

---

## 4. Therapist Scheduling

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-050 | P1 | Build therapist schedule calendar. | Calendar supports day, week, and list views. |
| FD-051 | P1 | Add availability slot creation. | Staff can create date, time, capacity, service, therapist, delivery mode, location, and online/video metadata. |
| FD-052 | P1 | Add slot status management. | Slots can be available, limited, full, cancelled, closed, or unpublished. |
| FD-053 | P1 | Add capacity visibility. | Slot cards show confirmed bookings, remaining seats, and full/closed warnings. |
| FD-054 | P1 | Add therapist filters. | Calendar filters by therapist, specialization, service, delivery mode, and location. |
| FD-055 | P2 | Add recurring availability creation. | Admin can create repeated schedules with conflict checks. |
| FD-056 | P2 | Add blocked time and leave management. | Staff can block unavailable time and prevent booking conflicts. |

---

## 5. Client Management

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-070 | P2 | Build client list page. | Authorized users can search clients by code, name, phone, email, age group, consent status, and follow-up status. |
| FD-071 | P2 | Build client profile detail. | Shows operational profile, contact details, guardian info, consent status, appointment history, support groups, assessments, and feedback. |
| FD-072 | P2 | Add client creation/edit form. | Staff can create and update allowed client fields. |
| FD-073 | P2 | Separate operational and clinical tabs. | Users without clinical permission cannot see clinical tabs or note metadata. |
| FD-074 | P2 | Add follow-up task panel. | Tasks include owner, due date, status, priority, notes, and reminders. |
| FD-075 | P2 | Add communication preference controls. | Staff can record WhatsApp, phone, and email preferences. |

---

## 6. Clinical Workspace

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-090 | P2 | Build therapist session queue. | Therapists see assigned confirmed, upcoming, completed, and follow-up-required sessions. |
| FD-091 | P2 | Build secure session note form. | Assigned therapists can enter restricted notes by note type. |
| FD-092 | P2 | Build treatment plan view. | Therapists can create goals, interventions, follow-up cadence, progress notes, status, and next review date. |
| FD-093 | P2 | Build assessment summary workflow. | Authorized clinicians can record assessment summary and follow-up recommendations. |
| FD-094 | P2 | Enforce clinical permission UI boundaries. | Reception, content, media, and support roles cannot view or access clinical records. |
| FD-095 | P2 | Add clinical audit visibility for leadership. | Clinical leadership can review access/update history where backend supports audit logs. |
| FD-096 | P2 | Add sensitive form safety behavior. | Clinical note and treatment plan forms warn about unsaved changes and never store restricted content in localStorage. |
| FD-097 | P2 | Add ownership-denied handling. | Assigned-only clinical screens show safe denied states when a therapist is not assigned to the record. |

---

## 7. Support Groups and Awareness Events

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-110 | P1 | Build support group list and detail pages. | Staff can manage topic, facilitator, schedule, capacity, eligibility, delivery mode, price/free status, resources, and registration status. |
| FD-111 | P1 | Add participant registration management. | Staff can confirm participants, update attendance, and add follow-up actions. |
| FD-112 | P1 | Build awareness events management. | Staff can manage topic, date/time, location/online link, speaker, registration CTA, capacity, campaign relation, and feedback status. |
| FD-113 | P2 | Add attendance tools. | Facilitators can mark present, absent, cancelled, and follow-up required. |
| FD-114 | P2 | Add feedback review. | Staff can review event/group satisfaction and comments. |

---

## 8. Services and Therapist Content Management

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-130 | P1 | Build services admin list. | Admin can search, filter, publish state, service type, delivery mode, and availability status. |
| FD-131 | P1 | Build service editor. | Admin can manage title, image, service type, description, duration, price, eligibility, benefits, requirements, therapist relations, and booking CTA. |
| FD-132 | P1 | Build therapist admin list. | Admin can search and filter by specialization, language, session mode, and status. |
| FD-133 | P1 | Build therapist profile editor. | Admin can manage public profile fields, credentials, services, session modes, locations, availability summary, and status. |
| FD-134 | P1 | Support localized editing links. | Editors can quickly switch between English and Arabic versions. |

---

## 9. Media and Campaign Operations

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-150 | P1 | Build media content queue. | Articles, blogs, podcasts, videos, newsletters, campaigns, and events can be filtered by status, owner, type, topic, and locale. |
| FD-151 | P1 | Build article/blog editor shell. | Content creators can draft title, slug, excerpt, image, author, reviewer, topic, disclaimer, rich content, and related services. |
| FD-152 | P2 | Build podcast editor shell. | Editors can manage episode number, host, guest, audio/embed URL, transcript, duration, image, and status. |
| FD-153 | P2 | Build educational video editor shell. | Editors can manage presenter, video/embed URL, transcript or summary, duration, image, topic, and status. |
| FD-154 | P1 | Add approval workflow controls. | Media managers and clinical reviewers can approve, reject, schedule, publish, unpublish, or archive content according to role. |
| FD-155 | P2 | Build campaign editor. | Media team can manage objectives, audience, channels, linked content, dates, assets, owner, approval status, and metrics. |
| FD-156 | P2 | Add media metrics view. | Shows views, reads/listens/views, CTA clicks, shares, registrations, appointment leads, and engagement rate when available. |

---

## 10. Reporting Dashboard

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-170 | P2 | Build appointment pipeline report. | Shows appointment counts by status, service, therapist, source, and date range. |
| FD-171 | P2 | Build therapist utilization report. | Shows booked hours, available hours, completed sessions, cancellations, and utilization rate. |
| FD-172 | P2 | Build client activity report. | Shows active clients, new clients, returning clients, service type, and follow-up status. |
| FD-173 | P2 | Build revenue report. | Shows paid sessions, packages, subscriptions, outstanding payments, refunds, and revenue by service line. |
| FD-174 | P2 | Build support group and assessment reports. | Shows registration, attendance, capacity, completions, and follow-up recommendations. |
| FD-175 | P2 | Build media and campaign report. | Shows content engagement, campaign reach, impressions, registrations, leads, and conversion rate. |
| FD-176 | P3 | Add export actions. | Authorized users can export filtered report data where policy allows. |
| FD-177 | P2 | Add report pagination and filter persistence. | Large reports remain paginated, scoped by role, and filterable without returning unbounded data. |

---

## 11. Security UX

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-190 | P0 | Add permission-denied page. | Users understand they do not have access without exposing record details. |
| FD-191 | P0 | Hide restricted actions by role. | UI does not show actions the user cannot perform. |
| FD-192 | P0 | Confirm sensitive status changes. | Cancellation, clinical note save, payment refund/waive, and publish actions require confirmation. |
| FD-193 | P1 | Add clinical privacy warnings. | Clinical note and treatment plan screens visibly reinforce restricted access. |
| FD-194 | P1 | Add audit hints. | Sensitive pages indicate that access or changes may be logged. |

---

## 12. Dashboard Testing

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FD-210 | P0 | Test role-based navigation. | Each staff role sees the correct menu and blocked routes. |
| FD-211 | P0 | Test appointment workflows. | Create, confirm, reschedule, cancel, complete, no-show, follow-up, and payment updates work. |
| FD-212 | P1 | Test schedule and capacity flows. | Full and unavailable slots cannot be selected for new bookings. |
| FD-213 | P1 | Test RTL dashboard layout. | Tables, drawers, forms, filters, and navigation work in Arabic. |
| FD-214 | P1 | Test clinical access restrictions. | Non-clinical roles cannot access session notes or treatment plans. |
| FD-215 | P1 | Test content approval workflow. | Draft, review, approved, scheduled, published, archived, and rejected states behave correctly. |
| FD-216 | P2 | Test report filters and totals. | Dashboard counts match source records for selected date ranges. |
| FD-217 | P1 | Test dashboard API response handling. | Success, validation, unauthorized, forbidden, ownership denied, not-found, and server errors render correct UI states. |
| FD-218 | P1 | Test sensitive data storage behavior. | Client and clinical data are not persisted in localStorage, URL query strings, or unsafe logs. |
| FD-219 | P1 | Test production build readiness. | Dashboard build, environment variables, protected route behavior, and VPS proxy assumptions are verified. |
