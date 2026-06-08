import type { Locale } from "../types/content";

export default function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" | "consent" }) {
  const titles = {
    privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    terms: { en: "Terms of Service", ar: "شروط الخدمة" },
    consent: { en: "Consent and confidentiality", ar: "الموافقة والسرية" },
  };

  return (
    <main>
      <article className="article-page">
        <p className="eyebrow">{locale === "ar" ? "المحتوى القانوني" : "Legal content"}</p>
        <h1>{titles[kind][locale]}</h1>
        <p>
          {locale === "ar"
            ? "تتم إدارة هذه الصفحة من Strapi في النسخة الإنتاجية. يجب مراجعة النص باللغتين قبل النشر."
            : "This page is managed through Strapi in production. English and Arabic copy must be reviewed before publishing."}
        </p>
        <p>
          {locale === "ar"
            ? "تستخدم بيانات الحجز لغرض المتابعة وتأكيد الموعد فقط، ولا تعرض السجلات النفسية أو الملاحظات الإكلينيكية في الموقع العام."
            : "Booking details are used for follow-up and appointment confirmation only. Psychological records and clinical notes are never exposed on the public website."}
        </p>
      </article>
    </main>
  );
}
