# UI/UX Design Requirements

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source BRD | `BRD.md`, version 4.0 |
| Product Type | Bilingual psychological services, therapy booking, counseling, support programs, and psychological media platform |
| Primary Audience | Clients, families, parents, young adults, organizations, therapists, operations staff, content/media teams |
| Visual Source | Attached palette image |

---

## 1. Design Direction

The interface must feel calm, trustworthy, professional, private, and accessible. Warh Elshasha serves people seeking psychological support, so the design should avoid aggressive visual effects, loud colors, stressful motion, cluttered layouts, and marketing-heavy exaggeration.

The public website should prioritize reassurance, service clarity, therapist credibility, confidentiality, and a straightforward path to booking. The dashboard should prioritize staff efficiency, dense but readable information, clear status handling, privacy boundaries, and fast operational workflows.

---

## 2. Approved Color Palette

The UI must use the attached palette as the primary brand system.

### 2.1 Primary Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-primary` | `#2AA198` | Primary buttons, active states, selected controls, important CTAs, icons. |
| `--color-primary-dark` | `#1F7F78` | Button hover, stronger section accents, active navigation, dashboard highlights. |
| `--color-deep-teal` | `#0F4C5C` | Headings, dark text accents, footer bands, high-emphasis labels. |

### 2.2 Light Supporting Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-mint` | `#5FD3C6` | Secondary accents, progress indicators, charts, subtle icon fills. |
| `--color-soft-mint` | `#A8E6DF` | Soft backgrounds, selection surfaces, empty state accents. |
| `--color-mint-bg` | `#E0F7F5` | Page bands, form step backgrounds, quiet callouts, dashboard row highlights. |

### 2.3 Neutral Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-white` | `#FFFFFF` | Page background, card background, modal background. |
| `--color-ink` | `#102A2D` | Primary body text. |
| `--color-muted` | `#5E6F73` | Secondary text, metadata, helper text. |
| `--color-border` | `#D8E7E5` | Borders, dividers, table rules, input borders. |
| `--color-surface` | `#F7FBFA` | Light neutral surface behind sections and dashboard panels. |
| `--color-warning` | `#B7791F` | Payment pending, capacity limited, review needed. |
| `--color-danger` | `#B42318` | Cancelled, errors, permission risk, destructive actions. |
| `--color-success` | `#157A5A` | Confirmed, paid, completed, published. |

### 2.4 Color Rules

- Use `#2AA198` as the main CTA color.
- Use `#0F4C5C` for strong headings and footer/utility bands.
- Use `#E0F7F5` for calm page sections and form step backgrounds.
- Avoid making every section teal. Use white, neutral surface, and measured accents to keep the experience calm.
- Do not use purple/blue gradients, beige-heavy palettes, or decorative color blobs.
- Status indicators must include text labels, not only color.
- Ensure color contrast meets WCAG AA for text and controls.

---

## 3. Typography

| Element | Requirement |
| --- | --- |
| Font family | Use a readable Arabic/English compatible font stack such as `Inter`, `Noto Sans Arabic`, `Cairo`, or system fallback. |
| Headings | Clear, confident, and calm; use `#0F4C5C` for high-emphasis headings. |
| Body text | Comfortable line height, readable on mobile, no dense paragraphs on public pages. |
| Dashboard text | Smaller and denser than public website, but never cramped. |
| Letter spacing | Use normal letter spacing. Do not use negative tracking. |
| Scaling | Do not scale font size with viewport width. Use responsive layout, not viewport-based font scaling. |
| Arabic | Ensure Arabic line height and RTL alignment feel natural. |

---

## 4. Layout Principles

### 4.1 Public Website

- Build the actual service discovery and booking experience, not a marketing-only landing page.
- Make the first viewport immediately communicate psychological services, therapy booking, confidentiality, and bilingual access.
- Public pages should use full-width bands with constrained content, not nested cards.
- Use cards only for repeated items such as services, therapists, articles, support groups, assessments, and events.
- Use consistent section spacing on desktop and tighter but breathable spacing on mobile.
- Keep booking CTA visible in header and repeated at natural decision points.
- Always leave legal, consent, and confidentiality content discoverable.

### 4.2 Dashboard

- Dashboard should feel operational, quiet, and task-focused.
- Prefer tables, split panes, filters, status badges, drawers, and compact forms over decorative cards.
- Keep repeated operational content scannable.
- Use fixed dimensions and stable grid/table layouts to prevent shifts when statuses, names, or actions change.
- Do not hide critical actions behind ambiguous icons unless tooltips and accessible labels are present.

---

## 5. Core Public Components

### 5.1 Header

| Requirement | Detail |
| --- | --- |
| Sticky behavior | Header remains available while scrolling. |
| Brand | CMS logo when available, text fallback when missing. |
| Navigation | Services, Therapists, Booking/Appointments, Media, About, Contact. |
| Language toggle | Clear English/Arabic control with RTL/LTR update. |
| CTA | Primary booking CTA styled with `#2AA198`. |
| Mobile | Collapsible menu with accessible button and focus handling. |

### 5.2 Footer

Footer must include:

- Brand identity and short positioning.
- Quick links.
- Service links.
- Contact info.
- Social links.
- Privacy, terms, consent, and confidentiality links.
- Copyright.
- Optional no-emergency disclaimer.

### 5.3 Service Cards

Cards must show:

- Service image or safe fallback.
- Service type.
- Title.
- Short description.
- Duration.
- Delivery mode.
- Price or pricing note.
- Availability state.
- Booking CTA.

Cards should use white backgrounds, `#D8E7E5` borders, 8px radius or less, and subtle hover states.

### 5.4 Therapist Cards

Cards must show:

- Image.
- Name.
- Title.
- Specializations.
- Credentials summary.
- Languages.
- Online/offline/hybrid modes.
- Availability summary.
- Profile and booking actions.

Do not over-crop therapist images. The profile card should feel credible and respectful.

### 5.5 Media Cards

Cards must show:

- Image or preview.
- Content type.
- Topic/category.
- Title.
- Excerpt/summary.
- Author/presenter/host.
- Date or duration.
- Read/watch/listen CTA.

Educational disclaimers should appear on details pages where configured.

---

## 6. Booking UX

### 6.1 Booking Flow Goals

The booking flow must reduce anxiety and prevent users from feeling lost. It should clearly show what information is needed, why consent matters, how online/offline sessions differ, and what happens after WhatsApp handoff.

### 6.2 Steps

| Step | UX Requirement |
| --- | --- |
| Service | Let users choose consultation, therapy, counseling, assessment, support group, or awareness event. |
| Therapist | Allow therapist preference or no preference where appropriate. |
| Delivery mode | Clearly explain online, offline, and hybrid choices. |
| Date/time | Show available slots, location, capacity, and unavailable/full states. |
| Client details | Collect name, phone, email, age group, guardian details where applicable, and optional message. |
| Consent | Require acknowledgement before submission. |
| Review | Show a concise summary before WhatsApp handoff. |
| Confirmation | Explain next steps, payment/cancellation notes, confidentiality, and contact path. |

### 6.3 Booking Controls

- Use segmented controls for delivery mode.
- Use select menus or searchable lists for service and therapist choices.
- Use date and slot pickers for availability.
- Use checkbox/toggle for consent acknowledgement.
- Use clear validation messages near fields.
- Prevent progress when required data is missing.
- Disabled states must explain why an option is not available.

### 6.4 WhatsApp Handoff

- Button label must make clear that WhatsApp will open.
- Show a review summary before opening WhatsApp.
- Confirmation state must remain on the website after handoff.
- Use CMS WhatsApp number first, fallback number second.

---

## 7. Dashboard UX

### 7.1 Navigation

Dashboard navigation must group work by operational intent:

- Overview.
- Appointments.
- Schedule.
- Clients.
- Clinical Workspace.
- Services.
- Therapists.
- Support Groups.
- Assessments.
- Media.
- Campaigns.
- Reports.
- Settings.

Only permitted items should appear for each role.

### 7.2 Tables

Operational tables must include:

- Search.
- Filters.
- Sort where useful.
- Status badges.
- Date range controls.
- Row actions.
- Empty state.
- Pagination.
- Responsive mobile fallback.

### 7.3 Detail Views

Use side drawers or detail pages for appointment, client, therapist, content, and campaign records. Detail views must separate:

- Summary.
- Operational details.
- Timeline/status history.
- Notes or comments.
- Restricted clinical areas where permitted.
- Audit hints where applicable.

### 7.4 Status Badges

| Status Type | Visual Treatment |
| --- | --- |
| New / pending | Neutral or warning badge with clear text. |
| Confirmed / paid / completed / published | Success badge. |
| Rescheduled / follow-up required / review | Warning badge. |
| Cancelled / no-show / rejected / error | Danger badge. |
| Draft / unpublished / archived | Muted badge. |

---

## 8. Bilingual and RTL Requirements

- Language toggle must be visible in public header and dashboard shell.
- Arabic must set `dir="rtl"` and `lang="ar"`.
- English must set `dir="ltr"` and `lang="en"`.
- Icons that imply direction must flip in RTL where needed.
- Form labels, helper text, errors, buttons, and validation messages must be localized.
- Navigation order should feel natural in both languages.
- Arabic text should not be squeezed into components designed only for English.
- Avoid truncating therapist names, service titles, legal headings, and booking labels.

---

## 9. Accessibility Requirements

- All interactive elements must be reachable by keyboard.
- Buttons and icon buttons must have accessible labels.
- Dialogs, mobile menus, drawers, and popovers must trap and restore focus correctly.
- Forms must use labels and field-level errors.
- Validation messages must be translated.
- Statuses must not rely on color alone.
- Images should include meaningful alt text or be marked decorative where appropriate.
- Use sufficient contrast for teal buttons and text.
- Do not place text over busy images unless contrast is guaranteed.

---

## 10. Responsive Requirements

| Breakpoint | Requirement |
| --- | --- |
| Mobile | Single-column sections, compact header, accessible mobile menu, full-width form controls, no horizontal overflow. |
| Tablet | Two-column cards where space allows, readable booking steps, usable filters. |
| Desktop | Constrained content widths, multi-column service/media layouts, visible booking CTA, efficient dashboard tables. |
| Wide desktop | Avoid overly stretched lines and empty layouts; keep content centered and balanced. |

Text, buttons, cards, tables, and controls must not overlap at any viewport.

---

## 11. Page-Specific Requirements

### 11.1 Home

- Immediate signal: psychological services, therapy/counseling, booking, confidentiality.
- Show service pathways early.
- Use calm hero visuals related to care, consultation, or mental well-being.
- Include trust signals and therapist/service credibility.
- Include awareness/media highlights without overpowering booking.

### 11.2 Services

- Make service categories easy to compare.
- Clearly label online, offline, and hybrid delivery.
- Explain eligibility and preparation without overwhelming users.
- Provide direct booking actions.

### 11.3 Therapists

- Prioritize credentials, specialization, languages, availability, and session mode.
- Let users move from profile to booking with context preserved.
- Avoid layouts that make therapist profiles feel like generic marketing cards.

### 11.4 Booking

- Use a calm stepper and short sections.
- Keep progress visible.
- Make consent visible but not intimidating.
- Confirm what happens next after WhatsApp opens.

### 11.5 Media

- Articles, podcasts, and videos should feel educational and credible.
- Details pages must support author/reviewer information and disclaimers.
- Related services and booking CTAs should be present but not intrusive.

### 11.6 Contact

- Make WhatsApp, phone, email, and location easy to find.
- Show clinic/map information clearly.
- Include emergency disclaimer only when configured.

---

## 12. Visual Assets

- Use real or CMS-managed images for therapists, services, events, articles, podcasts, and videos whenever available.
- Images should be respectful, culturally appropriate, non-stigmatizing, and relevant.
- Avoid client-identifying or sensitive images unless explicit documented consent exists.
- Use optimized responsive image sizes.
- Provide fallback surfaces using `#E0F7F5` and simple icons when images are missing.

---

## 13. Motion and Interaction

- Use subtle transitions for hover, focus, drawer open/close, and step changes.
- Avoid dramatic animation, parallax, flashing, or high-motion effects.
- Respect reduced motion preferences.
- Dashboard interactions should feel immediate and stable.
- Loading states should preserve layout dimensions where possible.

---

## 14. Form Design

- Group related fields into clear sections.
- Use labels above inputs.
- Place validation messages close to the affected field.
- Use required markers sparingly and consistently.
- Use helper text for consent, privacy, online/offline session guidance, and guardian requirements.
- Keep submit buttons visually distinct with `#2AA198`.
- Disable submit only when necessary and explain validation problems clearly.

---

## 15. Content Tone

The interface copy should be:

- Calm.
- Respectful.
- Confidentiality-aware.
- Clear about what the service can and cannot provide.
- Bilingual and locally appropriate.
- Non-judgmental.
- Free from exaggerated promises or diagnosis claims.

Avoid language that implies emergency crisis response unless approved by the organization.

---

## 16. Acceptance Criteria

- Public website visually uses the approved teal palette.
- Primary booking CTAs use `#2AA198` with accessible contrast.
- Arabic RTL and English LTR layouts work across public and dashboard screens.
- Booking flow is clear, validates required data, and explains WhatsApp handoff.
- Services and therapists are easy to compare.
- Legal, privacy, consent, and confidentiality pages are discoverable.
- Dashboard is dense, readable, role-aware, and not decorative.
- Clinical records are visually and functionally separated from operational records.
- Text does not overflow or overlap on mobile, tablet, desktop, or wide desktop.
- Components have loading, empty, error, disabled, hover, focus, and selected states.
