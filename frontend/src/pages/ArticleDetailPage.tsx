import { Link, useParams } from "react-router-dom";
import { articles, copy, t } from "../data/content";
import type { Locale } from "../types/content";

export default function ArticleDetailPage({ locale }: { locale: Locale }) {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main>
        <section className="page-hero">
          <h1>{locale === "ar" ? "المقال غير موجود" : "Article not found"}</h1>
          <Link className="button primary" to="/articles">
            {locale === "ar" ? "العودة للمقالات" : "Back to articles"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <article className="article-page">
        <p className="eyebrow">{t(article.topic, locale)} · {t(article.readTime, locale)}</p>
        <h1>{t(article.title, locale)}</h1>
        <p className="article-meta">{t(article.author, locale)} · {article.date}</p>
        {article.body.map((paragraph) => (
          <p key={t(paragraph, locale)}>{t(paragraph, locale)}</p>
        ))}
        <aside className="notice">{t(copy.common.nonEmergency, locale)}</aside>
        <Link className="button secondary" to="/articles">
          {locale === "ar" ? "العودة للمقالات" : "Back to articles"}
        </Link>
      </article>
    </main>
  );
}
