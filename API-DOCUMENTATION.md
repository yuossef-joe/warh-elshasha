# API Documentation

## Warh Elshasha Psychological Services Platform

| Field | Detail |
| --- | --- |
| Source | `Technical-Specifications-Frontend-Backend.md` and `backend-structure.md` |
| Backend | Strapi 5 REST API with custom controllers where needed |
| Access Model | Public published content, authenticated operational endpoints, restricted clinical endpoints |

---

## 1. API Response Standards

### 1.1 Success Response

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

### 1.2 Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed.",
    "details": [
      {
        "field": "phone",
        "message": "Phone number is required."
      }
    ]
  }
}
```

### 1.3 Required Error Codes

| Code | Use |
| --- | --- |
| `VALIDATION_ERROR` | Missing or invalid request data. |
| `AUTHENTICATION_REQUIRED` | User must log in. |
| `AUTHORIZATION_DENIED` | User lacks permission for the action. |
| `OWNERSHIP_REQUIRED` | User is authenticated but not assigned to the record. |
| `NOT_FOUND` | Record does not exist or is not visible to the user. |
| `SLOT_UNAVAILABLE` | Slot is full, closed, cancelled, unpublished, or unavailable. |
| `STATUS_TRANSITION_DENIED` | Requested status change is not allowed. |
| `RATE_LIMITED` | Sensitive endpoint rate limit was exceeded. |
| `SERVER_ERROR` | Unexpected server-side failure. |

---

## 2. Public Content Endpoints

Public endpoints must return only published localized content.

| Endpoint | Method | Purpose | Query |
| --- | --- | --- | --- |
| `/api/site-information` | GET | Header, footer, contact, social, legal links. | `locale`, `populate` |
| `/api/home-page` | GET | Home page content. | `locale`, `populate` |
| `/api/about-page` | GET | About page content. | `locale`, `populate` |
| `/api/service-page` | GET | Services page content. | `locale`, `populate` |
| `/api/therapists-page` | GET | Therapist listing page content. | `locale`, `populate` |
| `/api/contact-page` | GET | Contact page content. | `locale`, `populate` |
| `/api/privacy-page` | GET | Privacy policy. | `locale`, `populate` |
| `/api/terms-page` | GET | Terms of service. | `locale`, `populate` |
| `/api/consent-page` | GET | Consent and confidentiality guidance. | `locale`, `populate` |
| `/api/services` | GET | Service catalog. | `locale`, `filters`, `pagination`, `sort`, `populate` |
| `/api/therapists` | GET | Therapist listing. | `locale`, `filters`, `pagination`, `sort`, `populate` |
| `/api/therapists/:documentId` | GET | Therapist details. | `locale`, `populate` |
| `/api/blogs` | GET | Articles/blog listing. | `locale`, `filters`, `pagination`, `sort`, `populate` |
| `/api/blogs/:slug` | GET | Article detail by slug or document lookup. | `locale`, `populate` |
| `/api/support-groups` | GET | Support group listing. | `locale`, `filters`, `pagination`, `sort`, `populate` |
| `/api/assessments` | GET | Assessment listing. | `locale`, `filters`, `pagination`, `sort`, `populate` |
| `/api/awareness-events` | GET | Awareness event listing. | `locale`, `filters`, `pagination`, `sort`, `populate` |

---

## 3. Public Booking Endpoint

### 3.1 Create Booking Request

| Field | Detail |
| --- | --- |
| Endpoint | `/api/appointments/public-request` |
| Method | POST |
| Auth | Public or public token, according to Strapi policy |
| Rate Limit | Required |
| Purpose | Validate public booking request, optionally persist appointment, and return WhatsApp handoff data |

#### Request Body

```json
{
  "bookingType": "therapy_session",
  "serviceId": "service-document-id",
  "therapistId": "therapist-document-id",
  "availabilitySlotId": "slot-document-id",
  "deliveryMode": "online",
  "date": "2026-06-10",
  "time": "15:00",
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+201000000000",
  "ageGroup": "adult",
  "guardianName": null,
  "guardianPhone": null,
  "message": "Optional note",
  "consentAcknowledged": true,
  "locale": "en"
}
```

#### Required Validation

- `bookingType` must be an allowed booking type.
- `deliveryMode` must be `online`, `offline`, or `hybrid`.
- `name` and `phone` are required.
- `serviceId` is required for service/session bookings.
- `consentAcknowledged` must be true.
- `availabilitySlotId` is required when slot scheduling is enabled.
- Offline sessions require location or selected slot with location.
- Child/adolescent bookings require guardian name, guardian phone, and consent metadata.
- Slot must not be full, cancelled, closed, unavailable, or unpublished.

#### Success Response

```json
{
  "success": true,
  "data": {
    "appointmentId": "appointment-document-id",
    "status": "pending_confirmation",
    "whatsappUrl": "https://wa.me/...",
    "whatsappMessage": "Localized encoded booking summary"
  }
}
```

---

## 4. Restricted Dashboard Endpoints

All restricted endpoints require authentication, authorization, and ownership checks where applicable.

| Endpoint | Method | Purpose | Roles |
| --- | --- | --- | --- |
| `/api/appointments` | GET | Paginated appointment list. | Admin, receptionist, support, therapist by assignment |
| `/api/appointments/:id` | GET | Appointment detail. | Admin, receptionist, support, therapist by assignment |
| `/api/appointments/:id/status` | PATCH | Update appointment status. | Admin, receptionist, assigned therapist |
| `/api/availability-slots` | GET | Slot list/calendar. | Admin, receptionist, therapist |
| `/api/availability-slots` | POST | Create slot. | Admin, receptionist, therapist where allowed |
| `/api/availability-slots/:id` | PATCH | Update slot. | Admin, receptionist, owner therapist where allowed |
| `/api/clients` | GET | Client list. | Admin, operations limited, clinical by assignment |
| `/api/clients/:id` | GET | Client detail. | Admin, operations limited, clinical by assignment |
| `/api/session-notes` | POST | Create restricted session note. | Assigned therapist/counselor |
| `/api/treatment-plans` | POST | Create or update treatment plan. | Assigned therapist/counselor |
| `/api/campaigns/:id/metrics` | PATCH | Update campaign metrics. | Admin, media manager |
| `/api/reports/operations-summary` | GET | Operational KPI report. | Admin, leadership |

---

## 5. List Query Standards

List endpoints must support:

- `page`.
- `pageSize`.
- `sort`.
- `search` where useful.
- Filters relevant to the entity.
- Locale for public localized content.
- Stable pagination metadata.

Dashboard lists should not return unbounded data.

---

## 6. Security Notes

- Public API permissions must not include clinical records, clients, appointments, payment details, or video links.
- Dashboard APIs must enforce role and ownership server-side, not only in the frontend.
- Sensitive endpoint rate limiting is required for public booking and authentication.
- All external redirect URLs must be validated or sourced from trusted CMS fields.
- API tokens and secrets must remain in environment variables.
- Error responses must not leak clinical or client details.
