import type { CSSProperties } from "react";
import { t } from "../data/content";
import type { Locale } from "../types/content";

interface SectionImageProps {
  src: string;
  alt: Record<Locale, string>;
  locale: Locale;
  className?: string;
  label?: Record<Locale, string>;
}

export default function SectionImage({ src, alt, locale, className = "", label }: SectionImageProps) {
  const altText = t(alt, locale);

  return (
    <figure className={`section-image ${className}`}>
      <div className="section-image-inner">
        <div
          className="section-image-media"
          role="img"
          aria-label={altText}
          style={{ backgroundImage: `url(${src})` } as CSSProperties}
        />
        <span className="image-sheen" aria-hidden="true" />
        <span className="image-corner-mark image-corner-mark-start" aria-hidden="true" />
        <span className="image-corner-mark image-corner-mark-end" aria-hidden="true" />
        {label && <figcaption>{t(label, locale)}</figcaption>}
      </div>
    </figure>
  );
}
