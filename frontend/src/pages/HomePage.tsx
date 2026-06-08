import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import { Effect, Effects } from "../components/Effect";
import Section from "../components/Section";
import SectionImage from "../components/SectionImage";
import ServiceCard from "../components/ServiceCard";
import TherapistCard from "../components/TherapistCard";
import { articles, copy, services, t, therapists } from "../data/content";
import { sectionImages } from "../data/images";
import type { Locale } from "../types/content";

export default function HomePage({ locale }: { locale: Locale }) {
  const heroTitle =
    locale === "ar"
      ? "رعاية نفسية موثوقة ومحتوى توعوي ثنائي اللغة"
      : "Trusted psychological care, clear booking, and responsible mental health media";

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <Effect inView={false} delay={80} slide="up">
            <p className="eyebrow">{locale === "ar" ? "ورح الشاشة" : "Warh Elshasha"}</p>
          </Effect>
          <h1>
            <AnimatedText text={heroTitle} locale={locale} />
          </h1>
          <Effects inView={false} delay={110} slide="up">
            <p>
              {locale === "ar"
                ? "اكتشف الخدمات، اختر طريقة الجلسة، وابدأ طلب الحجز بثقة وسرية."
                : "Explore services, choose online or offline support, and start a confidential booking request with clarity."}
            </p>
            <div className="hero-actions">
              <Link className="button primary animated-button" to="/booking">
                {t(copy.cta.book, locale)}
              </Link>
              <Link className="button ghost animated-button" to="/services">
                {locale === "ar" ? "استعرض الخدمات" : "Explore services"}
              </Link>
            </div>
            <p className="confidentiality">{t(copy.common.confidentiality, locale)}</p>
          </Effects>
        </div>
        <div className="hero-visual">
          <div
            className="hero-image"
            role="img"
            aria-label={t(sectionImages.hero.alt, locale)}
            style={{ backgroundImage: `url(${sectionImages.hero.src})` }}
          />
          <div className="activity-rail" aria-hidden="true">
            <span>{locale === "ar" ? "استشارة" : "Consultation"}</span>
            <span>{locale === "ar" ? "تأكيد" : "Confirm"}</span>
            <span>{locale === "ar" ? "متابعة" : "Follow-up"}</span>
          </div>
        </div>
      </section>

      <Section
        eyebrow={locale === "ar" ? "مسارات الرعاية" : "Care paths"}
        title={locale === "ar" ? "اختر نوع الدعم المناسب" : "Choose the support that fits"}
        intro={locale === "ar" ? "خدمات واضحة للحجز الفردي والأسري والتقييمات ومجموعات الدعم." : "Clear services for individual care, family support, assessments, and group programs."}
      >
        <div className="image-backed-section">
          <SectionImage
            src={sectionImages.services.src}
            alt={sectionImages.services.alt}
            locale={locale}
            className="wide-section-image"
            label={{ en: "Care pathways", ar: "مسارات الرعاية" }}
          />
          <div className="image-backed-content card-grid">
            <Effects>
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
            </Effects>
          </div>
        </div>
      </Section>

      <section className="proof-band">
        <Effects slide="up" delay={120}>
          <div>
            <span>01</span>
            <strong>{locale === "ar" ? "سرية" : "Confidential"}</strong>
            <p>{locale === "ar" ? "فصل واضح بين بيانات الحجز والسجلات الإكلينيكية." : "Clear separation between booking details and clinical records."}</p>
          </div>
          <div>
            <span>02</span>
            <strong>{locale === "ar" ? "ثنائية اللغة" : "Bilingual"}</strong>
            <p>{locale === "ar" ? "تجربة عربية وإنجليزية مع اتجاه صحيح للواجهة." : "Arabic and English experience with correct interface direction."}</p>
          </div>
          <div>
            <span>03</span>
            <strong>{locale === "ar" ? "حجز منظم" : "Structured booking"}</strong>
            <p>{locale === "ar" ? "تفاصيل الجلسة تصل لفريق الدعم دون تكرار." : "Session details reach support staff without repeated questions."}</p>
          </div>
        </Effects>
      </section>

      <Section
        eyebrow={locale === "ar" ? "الفريق" : "Therapists"}
        title={locale === "ar" ? "ملفات مهنية واضحة" : "Professional profiles, easy decisions"}
      >
        <div className="image-backed-section">
          <SectionImage
            src={sectionImages.therapists.src}
            alt={sectionImages.therapists.alt}
            locale={locale}
            className="wide-section-image"
            label={{ en: "Clinical team", ar: "الفريق المختص" }}
          />
          <div className="image-backed-content stack">
            <Effects slide="left">
              {therapists.map((therapist) => (
                <TherapistCard key={therapist.id} therapist={therapist} locale={locale} />
              ))}
            </Effects>
          </div>
        </div>
      </Section>

      <Section
        eyebrow={locale === "ar" ? "محتوى توعوي" : "Psychological media"}
        title={locale === "ar" ? "تعلم قبل أن تحجز" : "Learn before you book"}
      >
        <div className="image-backed-section">
          <SectionImage
            src={sectionImages.media.src}
            alt={sectionImages.media.alt}
            locale={locale}
            className="wide-section-image"
            label={{ en: "Psychological media", ar: "محتوى نفسي" }}
          />
          <div className="image-backed-content editorial-list">
            <Effects slide="up" blur={false}>
              {articles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`}>
                  <span>{t(article.topic, locale)}</span>
                  <strong>{t(article.title, locale)}</strong>
                  <p>{t(article.excerpt, locale)}</p>
                </Link>
              ))}
            </Effects>
          </div>
        </div>
      </Section>
    </main>
  );
}
