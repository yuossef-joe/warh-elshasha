# Frontend Main Website Tasks

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Frontend Stack | React, TypeScript, Vite, React Router, TanStack Query, Axios, Tailwind CSS, shadcn/Radix UI |
| Website Purpose | Bilingual public website for psychological services, therapy booking, counseling, assessments, support groups, awareness programs, and media content |
| Priority Model | P0 critical, P1 launch, P2 post-launch, P3 future enhancement |

---

## 1. Website Foundation

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-001 | P0 | Configure public route map. | Routes include `/`, `/about`, `/services`, `/therapists`, `/therapists/:id`, `/appointments`, `/booking`, `/support-groups`, `/assessments`, `/awareness-events`, `/articles`, `/articles/:slug`, `/podcasts`, `/videos`, `/contact`, `/privacy`, `/terms`, `/consent`, and not found. |
| FW-002 | P0 | Implement global layout. | Sticky header, mobile menu, footer, logo fallback, navigation, language toggle, and booking CTA render on public pages. |
| FW-003 | P0 | Connect active locale to API requests. | Axios requests include `locale=en` or `locale=ar` based on selected language. |
| FW-004 | P0 | Persist language preference. | Selected language is stored in localStorage and restored on reload. |
| FW-005 | P0 | Apply HTML language and direction. | `document.documentElement.lang` and `dir` update correctly for English and Arabic. |
| FW-006 | P0 | Centralize Strapi media URL resolver. | Relative media paths are resolved from the configured Strapi base URL. |
| FW-007 | P0 | Add fallback translations. | Navigation, booking, forms, validation, confidentiality notices, and error states remain usable when CMS content is missing. |
| FW-008 | P0 | Add shared loading, empty, error, and not-found states. | CMS/API failures do not produce blank pages. |
| FW-009 | P1 | Add SEO-ready metadata helpers. | Public pages can define localized title, description, canonical path, and social preview data. |
| FW-010 | P0 | Define TypeScript API response types. | Public queries and booking mutations use typed success, error, pagination, and Strapi entity response shapes. |
| FW-011 | P0 | Centralize public API error handling. | Validation, not-found, server, permission, and CMS failure states map to localized UI states. |
| FW-012 | P1 | Confirm package policy. | Implementation uses existing React, TypeScript, Tailwind, shadcn/Radix, TanStack Query, and Axios patterns without unnecessary new packages. |

---

## 2. Home Page

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-020 | P0 | Build CMS-driven hero. | Hero renders title, supporting copy, two CTAs, optional background/media, confidentiality positioning, and booking CTA. |
| FW-021 | P0 | Show service discovery section. | Displays consultation, therapy, counseling, assessments, support groups, awareness programs, and media paths. |
| FW-022 | P1 | Show trust and credibility content. | Stats, therapist trust signals, why-choose content, values, testimonials where appropriate, and impact sections render when CMS content exists. |
| FW-023 | P1 | Show awareness highlights. | Articles, campaigns, events, podcasts, or videos can be featured from CMS. |
| FW-024 | P0 | Add non-emergency guidance. | Public content avoids crisis-response promises and can show emergency redirection text when configured. |
| FW-025 | P1 | Add final CTA section. | Users can move to booking, services, therapists, or contact from the end of the page. |

---

## 3. About Page

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-040 | P0 | Build about page sections. | Hero, story, mission, vision, values, experts, gallery, and CTA render from Strapi. |
| FW-041 | P1 | Add media rendering. | Story images, expert avatars, and gallery images render with alt text and responsive sizes. |
| FW-042 | P0 | Communicate identity and values. | Page explains psychological services, media mission, confidentiality, empathy, accessibility, and clinical integrity. |

---

## 4. Services Page

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-060 | P0 | Build services overview page. | Presents service categories and routes users toward booking, therapist profiles, assessment, support group, or event paths. |
| FW-061 | P0 | Render service cards from CMS. | Cards show title, image, tagline, service type, duration, delivery mode, availability, and booking CTA. |
| FW-062 | P1 | Add filters or grouping. | Users can filter/group by service type, audience, delivery mode, and online/offline availability where data exists. |
| FW-063 | P1 | Add service detail pattern if route is added. | Service details show benefits, eligibility, requirements, therapist relations, price, duration, and booking CTA. |
| FW-064 | P0 | Include confidentiality and consent guidance. | Relevant service flows link to consent and privacy content. |

---

## 5. Therapists

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-080 | P0 | Build therapists listing page. | Fetches published localized therapists and displays image, name, title, specialization, credentials, languages, session modes, availability summary, and CTA. |
| FW-081 | P1 | Add therapist filters. | Users can filter by specialization, service type, language, and online/offline availability. |
| FW-082 | P0 | Build therapist detail page. | Loads therapist by Strapi `documentId` and displays bio, credentials, support areas, services, languages, locations, availability, and booking CTA. |
| FW-083 | P0 | Pass therapist context to booking. | Booking CTA includes therapist ID/name, service category, and delivery mode query params where available. |
| FW-084 | P0 | Add therapist not-found state. | Missing, unpublished, or draft therapist records show a clear fallback. |

---

## 6. Booking Flow

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-100 | P0 | Build multi-step booking page. | Steps cover service, therapist preference, delivery mode, date/time where applicable, client details, consent, review, and confirmation. |
| FW-101 | P0 | Support URL preselection. | Query params for `service_id`, `therapist_id`, `session_id`, `service`, `delivery_mode`, `date`, and `time` prefill the form. |
| FW-102 | P0 | Fetch services and therapists. | Published localized CMS entries populate selection controls. |
| FW-103 | P1 | Fetch availability slots when enabled. | Online/offline slots show date, time, location, capacity, status, and delivery mode. |
| FW-104 | P0 | Validate required fields by step. | Missing service, contact details, consent, and required slot/location fields block progress. |
| FW-105 | P0 | Support online consultation rules. | Online sessions do not require a physical location and include video access guidance after confirmation. |
| FW-106 | P0 | Support offline appointment rules. | Offline sessions require available date/time and location when slots exist. |
| FW-107 | P0 | Support guardian metadata. | Child/adolescent bookings collect parent or guardian contact and consent details. |
| FW-108 | P0 | Generate localized WhatsApp message. | Message includes booking type, service/session, therapist preference, delivery mode, date, time, client details, consent, and notes. |
| FW-109 | P0 | Resolve WhatsApp phone from CMS. | Uses `site-information.contact` number with configured fallback. |
| FW-110 | P0 | Open WhatsApp safely. | Opens `wa.me` URL in a new tab with encoded message and `noopener noreferrer`. |
| FW-111 | P1 | Persist appointment record when enabled. | Creates Strapi appointment before WhatsApp handoff and stores status, source, locale, and consent. |
| FW-112 | P0 | Show confirmation state. | User sees confirmation, next steps, confidentiality reminder, payment/cancellation guidance, and contact links. |
| FW-113 | P0 | Add typed booking validation helpers. | Booking payload validates booking type, delivery mode, relation IDs, date/time, guardian fields, consent, phone, and email before mutation/handoff. |
| FW-114 | P1 | Handle API error response shapes. | Booking persistence errors display localized field-level or summary errors from backend response details. |
| FW-115 | P1 | Add safe external URL handling. | WhatsApp, map, phone, email, and future video/payment links are encoded and opened safely. |

---

## 7. Support Groups, Assessments, and Events

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-130 | P1 | Build support groups listing. | Shows topic, facilitator, schedule, delivery mode, capacity, eligibility, price/free status, resources, and registration CTA. |
| FW-131 | P1 | Route support groups to booking. | Registration CTA preselects booking type and group/service context. |
| FW-132 | P1 | Build assessments listing. | Shows assessment type, audience, duration, requirements, consent guidance, price, follow-up process, and booking CTA. |
| FW-133 | P1 | Route assessments to booking. | CTA preselects assessment booking type and assessment/service context. |
| FW-134 | P1 | Build awareness events listing. | Shows event topic, date/time, speaker/facilitator, location or online mode, capacity, and registration CTA. |
| FW-135 | P1 | Route awareness events to booking or registration. | CTA passes event context to the booking flow. |

---

## 8. Media Pages

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-150 | P1 | Build articles listing page. | Fetches `blogs-page` and published localized `blogs`; cards show image, title, excerpt, author, date, read time, topic, and read-more link. |
| FW-151 | P1 | Add article pagination. | Configurable number of articles display per page with clear empty state. |
| FW-152 | P1 | Build article detail page. | Shows title, author, reviewer, date, image, rich content, related services, disclaimers, and more articles. |
| FW-153 | P1 | Add back-to-articles navigation. | Users can return to listing without confusion. |
| FW-154 | P2 | Build podcast listing page. | Shows image, episode number, host, guest, duration, summary, audio/embed access, and transcript link where available. |
| FW-155 | P2 | Build educational video listing page. | Shows preview, presenter, topic, duration, summary, video/embed access, and transcript link where available. |
| FW-156 | P1 | Add educational disclaimer support. | Media details can show non-crisis and clinically reviewed content notices from CMS. |
| FW-157 | P2 | Add CTA tracking hooks. | Related appointment leads and content CTA clicks can be tracked when analytics is enabled. |

---

## 9. Contact and Legal Pages

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-170 | P0 | Build contact page. | Fetches title, description, info items, form labels, WhatsApp content, clinic locations, and map URL. |
| FW-171 | P0 | Render contact cards. | Phone, email, WhatsApp, address, and map links work correctly. |
| FW-172 | P0 | Build contact form UI. | Required name, email, and message fields validate and show success feedback. |
| FW-173 | P0 | Add emergency disclaimer area. | Emergency/crisis guidance displays only when configured. |
| FW-174 | P0 | Build privacy page. | Renders localized Strapi blocks content. |
| FW-175 | P0 | Build terms page. | Renders localized Strapi blocks content. |
| FW-176 | P0 | Build consent/confidentiality page. | Renders consent, confidentiality, cancellation, and data-use guidance. |

---

## 10. Accessibility and Responsive Testing

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-190 | P0 | Test keyboard navigation. | Header, mobile menu, language toggle, forms, CTAs, tabs, filters, and booking flow are keyboard accessible. |
| FW-191 | P0 | Test responsive layouts. | Mobile, tablet, and desktop layouts remain readable and non-overlapping. |
| FW-192 | P0 | Test RTL layouts. | Arabic pages render right-to-left correctly across header, footer, forms, booking steps, cards, and media pages. |
| FW-193 | P0 | Test form validation. | Required fields, invalid email/phone, missing consent, and unavailable slots produce clear localized messages. |
| FW-194 | P1 | Test image and media fallback states. | Missing CMS media does not break layout. |
| FW-195 | P1 | Test external links. | WhatsApp, map, phone, email, video, and payment links work safely. |
| FW-196 | P1 | Test CMS failure states. | Pages remain usable with loading, empty, fallback, and not-found states. |
| FW-197 | P1 | Test typed API response handling. | Success, validation error, not-found, and server error shapes render correct UI states. |
| FW-198 | P1 | Test booking helper edge cases. | Invalid enum, missing guardian data, invalid date/time, unavailable slot, and unsafe external URL cases are covered. |

---

## 11. Launch Checklist

| ID | Priority | Task | Acceptance Criteria |
| --- | --- | --- | --- |
| FW-210 | P0 | Verify public pages in both languages. | All required public routes render English and Arabic content or safe fallback copy. |
| FW-211 | P0 | Verify booking handoff. | Booking flow generates correct WhatsApp message and confirmation state. |
| FW-212 | P0 | Verify no sensitive data exposure. | Public frontend does not request or render client records, session notes, treatment plans, or assessment results. |
| FW-213 | P0 | Verify legal access. | Privacy, terms, consent, and confidentiality links are discoverable from footer and booking flow. |
| FW-214 | P1 | Verify palette and UI consistency. | Public UI uses approved teal palette and accessible contrast. |
| FW-215 | P1 | Verify content quality. | Images, alt text, localized copy, therapist credentials, and disclaimers are reviewed before launch. |
| FW-216 | P1 | Verify production build and deployment readiness. | Frontend build output, environment variables, API base URL, and VPS static/proxy strategy are documented and tested. |
