import { Link } from "react-router-dom";
import type { Locale } from "../types/content";

export default function NotFoundPage({ locale }: { locale: Locale }) {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>{locale === "ar" ? "الصفحة غير موجودة" : "Page not found"}</h1>
        <Link className="button primary" to="/">
          {locale === "ar" ? "العودة للرئيسية" : "Back home"}
        </Link>
      </section>
    </main>
  );
}
