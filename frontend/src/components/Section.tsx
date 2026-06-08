import type { PropsWithChildren } from "react";
import { Effect } from "./Effect";

interface SectionProps extends PropsWithChildren {
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
}

export default function Section({ eyebrow, title, intro, className = "", children }: SectionProps) {
  return (
    <section className={`section ${className}`}>
      {(eyebrow || title || intro) && (
        <Effect slide="up">
          <div className="section-heading">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        </Effect>
      )}
      {children}
    </section>
  );
}
