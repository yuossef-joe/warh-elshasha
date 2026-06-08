export type Locale = "en" | "ar";

export type LocalizedText = Record<Locale, string>;

export type DeliveryMode = "online" | "offline" | "hybrid";

export type BookingType =
  | "consultation"
  | "therapy_session"
  | "counseling_session"
  | "assessment"
  | "support_group"
  | "awareness_event";

export type AvailabilityStatus = "available" | "limited" | "full" | "closed" | "unpublished";

export interface Service {
  id: string;
  title: LocalizedText;
  type: BookingType;
  tagline: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  price: LocalizedText;
  deliveryMode: DeliveryMode;
  audience: LocalizedText;
  availability: AvailabilityStatus;
}

export interface Therapist {
  id: string;
  name: LocalizedText;
  title: LocalizedText;
  bio: LocalizedText;
  credentials: LocalizedText;
  specializations: LocalizedText[];
  languages: string[];
  sessionModes: DeliveryMode[];
  availability: LocalizedText;
  services: string[];
}

export interface Article {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  topic: LocalizedText;
  author: LocalizedText;
  date: string;
  readTime: LocalizedText;
  body: LocalizedText[];
}

export interface Program {
  id: string;
  title: LocalizedText;
  topic: LocalizedText;
  description: LocalizedText;
  schedule: LocalizedText;
  deliveryMode: DeliveryMode;
  capacity: LocalizedText;
  ctaType: BookingType;
}

export interface BookingForm {
  bookingType: BookingType;
  serviceId: string;
  therapistId: string;
  deliveryMode: DeliveryMode;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  ageGroup: "adult" | "young_adult" | "child" | "adolescent";
  guardianName: string;
  guardianPhone: string;
  message: string;
  consentAcknowledged: boolean;
}
