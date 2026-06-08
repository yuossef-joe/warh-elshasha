import { Link } from "react-router-dom";
import Section from "../components/Section";
import SectionImage from "../components/SectionImage";
import ServiceCard from "../components/ServiceCard";
import TherapistCard from "../components/TherapistCard";
import { articles, programs, services, t, therapists } from "../data/content";
import { sectionImages } from "../data/images";
import type { Locale } from "../types/content";

type Kind = "services" | "therapists" | "support-groups" | "assessments" | "events" | "articles" | "podcasts" | "videos";

export default function ListingPage({ locale, kind }: { locale: Locale; kind: Kind }) {
  if (kind === "services" || kind === "assessments") {
    const filtered = kind === "assessments" ? services.filter((service) => service.type === "assessment") : services;
    return (
      <main>
        <section className="page-hero">
          <p className="eyebrow">{locale === "ar" ? "الخدمات" : "Services"}</p>
          <h1>{kind === "assessments" ? (locale === "ar" ? "التقييمات النفسية" : "Psychological assessments") : locale === "ar" ? "خدمات نفسية واضحة للحجز" : "Clear psychological services for booking"}</h1>
        </section>
        <Section>
          <div className="image-backed-section">
            <SectionImage
              src={kind === "assessments" ? sectionImages.assessments.src : sectionImages.services.src}
              alt={kind === "assessments" ? sectionImages.assessments.alt : sectionImages.services.alt}
              locale={locale}
              className="wide-section-image"
              label={kind === "assessments" ? { en: "Assessment desk", ar: "مكتب التقييم" } : { en: "Care pathways", ar: "مسارات الرعاية" }}
            />
            <div className="image-backed-content card-grid">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
            </div>
          </div>
        </Section>
      </main>
    );
  }

  if (kind === "therapists") {
    return (
      <main>
        <section className="page-hero">
          <p className="eyebrow">{locale === "ar" ? "المعالجون" : "Therapists"}</p>
          <h1>{locale === "ar" ? "تعرف على الفريق قبل الحجز" : "Know the team before you book"}</h1>
        </section>
        <Section>
          <div className="image-backed-section">
            <SectionImage
              src={sectionImages.therapists.src}
              alt={sectionImages.therapists.alt}
              locale={locale}
              className="wide-section-image"
              label={{ en: "Clinical team", ar: "الفريق المختص" }}
            />
            <div className="image-backed-content stack">
              {therapists.map((therapist) => (
                <TherapistCard key={therapist.id} therapist={therapist} locale={locale} />
              ))}
            </div>
          </div>
        </Section>
      </main>
    );
  }

  if (kind === "support-groups" || kind === "events") {
    return (
      <main>
        <section className="page-hero">
          <p className="eyebrow">{locale === "ar" ? "البرامج" : "Programs"}</p>
          <h1>{kind === "events" ? (locale === "ar" ? "فعاليات التوعية" : "Awareness events") : locale === "ar" ? "مجموعات الدعم" : "Support groups"}</h1>
        </section>
        <Section>
          <div className="image-backed-section">
            <SectionImage
              src={sectionImages.supportGroups.src}
              alt={sectionImages.supportGroups.alt}
              locale={locale}
              className="wide-section-image"
              label={kind === "events" ? { en: "Awareness room", ar: "غرفة التوعية" } : { en: "Support circle", ar: "دائرة الدعم" }}
            />
            <div className="image-backed-content card-grid">
              {programs.map((program) => (
                <article className="item-card" key={program.id}>
                  <div className="card-topline">
                    <span>{t(program.topic, locale)}</span>
                    <strong>{program.deliveryMode}</strong>
                  </div>
                  <h3>{t(program.title, locale)}</h3>
                  <p>{t(program.description, locale)}</p>
                  <dl>
                    <div>
                      <dt>{locale === "ar" ? "الموعد" : "Schedule"}</dt>
                      <dd>{t(program.schedule, locale)}</dd>
                    </div>
                    <div>
                      <dt>{locale === "ar" ? "السعة" : "Capacity"}</dt>
                      <dd>{t(program.capacity, locale)}</dd>
                    </div>
                  </dl>
                  <Link className="text-link" to={`/booking?service=${program.ctaType}&delivery_mode=${program.deliveryMode}`}>
                    {locale === "ar" ? "سجل اهتمامك" : "Register interest"}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{locale === "ar" ? "المحتوى النفسي" : "Psychological media"}</p>
        <h1>{kind === "articles" ? (locale === "ar" ? "مقالات وإرشادات" : "Articles and guidance") : kind === "podcasts" ? (locale === "ar" ? "البودكاست" : "Podcasts") : locale === "ar" ? "الفيديوهات التعليمية" : "Educational videos"}</h1>
      </section>
      <Section>
        <div className="image-backed-section">
          <SectionImage
            src={sectionImages.media.src}
            alt={sectionImages.media.alt}
            locale={locale}
            className="wide-section-image"
            label={{ en: "Psychological media", ar: "محتوى نفسي" }}
          />
          <div className="image-backed-content editorial-list">
            {kind === "articles" ? (
              articles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`}>
                  <span>{t(article.topic, locale)}</span>
                  <strong>{t(article.title, locale)}</strong>
                  <p>{t(article.excerpt, locale)}</p>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <h3>{locale === "ar" ? "سيتم نشر المحتوى قريبا" : "Content coming soon"}</h3>
                <p>{locale === "ar" ? "سيتم ربط هذه الصفحة بمحتوى Strapi عند الإطلاق." : "This page is ready to connect to Strapi media content at launch."}</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
