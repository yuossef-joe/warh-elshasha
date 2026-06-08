import type { BookingForm, Locale } from "../types/content";

export const emptyBooking: BookingForm = {
  bookingType: "consultation",
  serviceId: "",
  therapistId: "",
  deliveryMode: "online",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  ageGroup: "adult",
  guardianName: "",
  guardianPhone: "",
  message: "",
  consentAcknowledged: false,
};

export function validateBooking(form: BookingForm, step: number): string[] {
  const errors: string[] = [];
  if (step >= 0 && !form.serviceId) errors.push("service");
  if (step >= 1 && !form.deliveryMode) errors.push("deliveryMode");
  if (step >= 1 && form.deliveryMode !== "online" && (!form.date || !form.time)) errors.push("slot");
  if (step >= 2 && !form.name.trim()) errors.push("name");
  if (step >= 2 && !form.phone.trim()) errors.push("phone");
  if (step >= 2 && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push("email");
  if (step >= 2 && ["child", "adolescent"].includes(form.ageGroup)) {
    if (!form.guardianName.trim()) errors.push("guardianName");
    if (!form.guardianPhone.trim()) errors.push("guardianPhone");
  }
  if (step >= 3 && !form.consentAcknowledged) errors.push("consent");
  return errors;
}

export function buildWhatsAppUrl(form: BookingForm, locale: Locale, serviceTitle: string, therapistName: string) {
  const phone = import.meta.env.VITE_WHATSAPP_FALLBACK_NUMBER || "201000000000";
  const lines =
    locale === "ar"
      ? [
          "طلب حجز من موقع ورح الشاشة",
          `الخدمة: ${serviceTitle}`,
          `المعالج/التفضيل: ${therapistName || "بدون تفضيل"}`,
          `نوع الجلسة: ${form.deliveryMode}`,
          `التاريخ/الوقت: ${form.date || "يتم التأكيد"} ${form.time || ""}`,
          `الاسم: ${form.name}`,
          `الهاتف: ${form.phone}`,
          `البريد: ${form.email || "غير مضاف"}`,
          `الفئة العمرية: ${form.ageGroup}`,
          `موافقة الخصوصية: نعم`,
          `ملاحظات: ${form.message || "لا توجد"}`,
        ]
      : [
          "Booking request from Warh Elshasha website",
          `Service: ${serviceTitle}`,
          `Therapist preference: ${therapistName || "No preference"}`,
          `Delivery mode: ${form.deliveryMode}`,
          `Date/time: ${form.date || "To be confirmed"} ${form.time || ""}`,
          `Name: ${form.name}`,
          `Phone: ${form.phone}`,
          `Email: ${form.email || "Not provided"}`,
          `Age group: ${form.ageGroup}`,
          `Consent acknowledged: yes`,
          `Notes: ${form.message || "None"}`,
        ];

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
