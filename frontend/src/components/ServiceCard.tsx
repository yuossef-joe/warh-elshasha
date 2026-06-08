import { Link } from "react-router-dom";
import { copy, t } from "../data/content";
import type { Locale, Service } from "../types/content";

export default function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <article className="item-card">
      <div className="card-topline">
        <span>{service.deliveryMode}</span>
        <strong>{service.availability}</strong>
      </div>
      <h3>{t(service.title, locale)}</h3>
      <p>{t(service.description, locale)}</p>
      <dl>
        <div>
          <dt>{locale === "ar" ? "المدة" : "Duration"}</dt>
          <dd>{t(service.duration, locale)}</dd>
        </div>
        <div>
          <dt>{locale === "ar" ? "السعر" : "Price"}</dt>
          <dd>{t(service.price, locale)}</dd>
        </div>
      </dl>
      <Link className="text-link" to={`/booking?service_id=${service.id}&delivery_mode=${service.deliveryMode}`}>
        {t(copy.cta.book, locale)}
      </Link>
    </article>
  );
}
