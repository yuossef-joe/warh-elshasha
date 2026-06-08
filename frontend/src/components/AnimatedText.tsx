import type { CSSProperties } from "react";
import type { Locale } from "../types/content";

export default function AnimatedText({ text, locale }: { text: string; locale: Locale }) {
  const words = text.split(" ");

  return (
    <span className="animated-text" aria-label={text}>
      {words.map((word, index) => (
        <span aria-hidden="true" className="animated-word" style={{ "--word-delay": `${index * 55}ms` } as CSSProperties} key={`${word}-${index}`}>
          {word}
          {index < words.length - 1 && (locale === "ar" ? "\u00A0" : " ")}
        </span>
      ))}
    </span>
  );
}
