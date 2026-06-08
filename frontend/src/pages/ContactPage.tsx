import type { Locale } from "../types/content";

export default function ContactPage({ locale }: { locale: Locale }) {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{locale === "ar" ? "تواصل معنا" : "Contact"}</p>
        <h1>{locale === "ar" ? "ابدأ بسؤال أو طلب حجز" : "Start with a question or booking request"}</h1>
        <p>{locale === "ar" ? "فريق الدعم يساعدك في اختيار الخدمة وتأكيد الموعد المناسب." : "The support team can help you choose a service and confirm the right appointment."}</p>
      </section>
      <section className="section">
        <div className="contact-grid">
          <a href="tel:+201000000000">
            <span>{locale === "ar" ? "الهاتف" : "Phone"}</span>
            <strong>+20 100 000 0000</strong>
          </a>
          <a href="mailto:hello@warhelshasha.example">
            <span>{locale === "ar" ? "البريد" : "Email"}</span>
            <strong>hello@warhelshasha.example</strong>
          </a>
          <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer">
            <span>WhatsApp</span>
            <strong>{locale === "ar" ? "تواصل عبر واتساب" : "Message support"}</strong>
          </a>
        </div>
      </section>
    </main>
  );
}
