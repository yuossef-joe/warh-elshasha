# Migration Notes

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source | `backend-structure.md`, `BACKEND-TASKS.md`, `Technical-Specifications-Frontend-Backend.md` |
| Backend | Strapi 5 with PostgreSQL recommended for production |
| Purpose | Safe schema, content, data, and deployment migration guidance |

---

## 1. Migration Principles

- Run schema changes first in development, then staging, then production.
- Back up the production database and media before any production migration.
- Treat clinical and client data as sensitive during every migration.
- Avoid destructive schema changes unless data is backed up and the rollback path is known.
- Prefer additive changes, then backfill, then switch usage, then remove deprecated fields later.
- Keep public API permissions restrictive after every content-type change.

---

## 2. Strapi Content-Type Migration Strategy

| Step | Action | Acceptance Criteria |
| --- | --- | --- |
| 1 | Add new content type or field. | Existing content remains readable. |
| 2 | Configure roles and permissions. | Public role cannot access restricted entities. |
| 3 | Add indexes or constraints where supported. | Queries remain performant and duplicate-sensitive fields are controlled. |
| 4 | Seed or backfill safe data. | Required public pages and relations can render. |
| 5 | Test localized content. | English and Arabic content return correctly. |
| 6 | Test frontend integration. | Loading, empty, error, and fallback states work. |
| 7 | Deploy to staging. | Permissions, schemas, and content are verified. |
| 8 | Deploy to production. | Backups exist and launch checks pass. |

---

## 3. Recommended Index and Constraint Considerations

| Entity | Index / Constraint |
| --- | --- |
| `service` | Index `slug`, `serviceType`, `deliveryMode`, `publishedAt`, locale. |
| `therapist` | Index `documentId`, `status`, `publishedAt`, locale. |
| `availability-slot` | Index therapist, service, date, status, delivery mode. |
| `appointment` | Index status, therapist, service, slot, source, created date, payment status. |
| `client` | Unique or indexed `clientCode`; index phone and consent status where policy allows. |
| `session-note` | Index appointment, client, therapist, created date; restrict public access. |
| `treatment-plan` | Index client, therapist, status, next review date. |
| `blog` | Unique slug per locale; index topic/category, published date, publishedAt. |
| `campaign` | Index status, owner, start date, end date. |

---

## 4. Backfill Strategy

| Data | Backfill Requirement |
| --- | --- |
| Existing public pages | Create English and Arabic entries or document fallback content. |
| Services | Add service type, delivery mode, booking CTA, availability status, and localized title/description. |
| Therapists | Add credentials, languages, session modes, availability summary, and safe public status. |
| Legal pages | Add privacy, terms, consent, confidentiality, cancellation, and data-use content in both languages. |
| Appointments | If imported, map old statuses to approved appointment status values. |
| Clients | If imported, assign client codes and consent status without exposing records publicly. |
| Media | Add topic/category, image alt text, author/reviewer, disclaimer, and published state. |

---

## 5. Rollback Guidance

- Keep database and media backups before production schema changes.
- For additive migrations, rollback can disable new frontend paths and remove public permissions.
- For data updates, keep export files or backup snapshots until verification is complete.
- For permission mistakes, immediately revoke public token permissions and rotate exposed tokens.
- For clinical data exposure risk, disable affected endpoint permissions and run an access audit.

---

## 6. Launch Migration Checklist

- Production backup completed.
- Public API token permissions reviewed.
- Public role cannot access restricted records.
- Required public pages have English and Arabic content.
- Legal pages are approved.
- Services and therapists are published.
- Booking flow is tested.
- Appointment persistence setting is confirmed.
- CORS is restricted to approved frontend domains.
- Strapi admin users and roles are reviewed.
- Database and media restore procedure is tested.
