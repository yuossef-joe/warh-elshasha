import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import { copy, services, t, therapists } from "../data/content";
import type { Locale } from "../types/content";

export default function TherapistDetailPage({ locale }: { locale: Locale }) {
  const { id } = useParams();
  const therapist = therapists.find((item) => item.id === id);

  if (!therapist) {
    return (
      <main>
        <section className="page-hero">
          <h1>{locale === "ar" ? "لم يتم العثور على المعالج" : "Therapist not found"}</h1>
          <Link className="button primary" to="/therapists">
            {locale === "ar" ? "العودة للفريق" : "Back to therapists"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t(therapist.title, locale)}</p>
        <h1>{t(therapist.name, locale)}</h1>
        <p>{t(therapist.bio, locale)}</p>
        <Link className="button primary" to={`/booking?therapist_id=${therapist.id}`}>
          {t(copy.cta.book, locale)}
        </Link>
      </section>
      <Section title={locale === "ar" ? "الخبرة والخدمات" : "Credentials and services"}>
        <div className="two-column">
          <div>
            <h3>{locale === "ar" ? "المؤهلات" : "Credentials"}</h3>
            <p>{t(therapist.credentials, locale)}</p>
            <div className="chips">
              {therapist.specializations.map((item) => (
                <span key={t(item, locale)}>{t(item, locale)}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>{locale === "ar" ? "الخدمات المتاحة" : "Available services"}</h3>
            <ul className="clean-list">
              {services
                .filter((service) => therapist.services.includes(service.id))
                .map((service) => (
                  <li key={service.id}>{t(service.title, locale)}</li>
                ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
