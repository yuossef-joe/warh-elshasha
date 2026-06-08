import { Link } from "react-router-dom";
import { copy, t } from "../data/content";
import type { Locale, Therapist } from "../types/content";

export default function TherapistCard({ therapist, locale }: { therapist: Therapist; locale: Locale }) {
  return (
    <article className="therapist-row">
      <div className="avatar" aria-hidden="true">
        {t(therapist.name, locale).slice(0, 1)}
      </div>
      <div>
        <p className="eyebrow">{t(therapist.title, locale)}</p>
        <h3>{t(therapist.name, locale)}</h3>
        <p>{t(therapist.bio, locale)}</p>
        <div className="chips">
          {therapist.specializations.map((item) => (
            <span key={t(item, locale)}>{t(item, locale)}</span>
          ))}
        </div>
      </div>
      <div className="row-actions">
        <span>{t(therapist.availability, locale)}</span>
        <Link className="button secondary compact" to={`/therapists/${therapist.id}`}>
          {t(copy.cta.profile, locale)}
        </Link>
      </div>
    </article>
  );
}
