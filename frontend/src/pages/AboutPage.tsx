import Section from "../components/Section";
import type { Locale } from "../types/content";

export default function AboutPage({ locale }: { locale: Locale }) {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{locale === "ar" ? "من نحن" : "About Warh Elshasha"}</p>
        <h1>{locale === "ar" ? "منصة تجمع الرعاية النفسية والمحتوى المسؤول" : "A platform where psychological care and responsible media meet"}</h1>
        <p>
          {locale === "ar"
            ? "نساعد الأفراد والأسر والمؤسسات على الوصول إلى دعم نفسي واضح وسري ومحتوى توعوي موثوق."
            : "We help individuals, families, and organizations find clear confidential support and trustworthy educational content."}
        </p>
      </section>

      <Section title={locale === "ar" ? "الرؤية والرسالة" : "Vision and mission"}>
        <div className="two-column">
          <div>
            <h3>{locale === "ar" ? "الرؤية" : "Vision"}</h3>
            <p>{locale === "ar" ? "أن نوسع الوصول إلى دعم نفسي موثوق ونقلل الوصمة عبر الرعاية والتعليم." : "To improve access to trusted mental health support and reduce stigma through care and education."}</p>
          </div>
          <div>
            <h3>{locale === "ar" ? "الرسالة" : "Mission"}</h3>
            <p>{locale === "ar" ? "تقديم دعم نفسي رحيم ومنظم من خلال مختصين مؤهلين وتجربة رقمية آمنة." : "To deliver compassionate structured psychological support through qualified professionals and safe digital workflows."}</p>
          </div>
        </div>
      </Section>

      <Section title={locale === "ar" ? "قيمنا" : "Values"}>
        <div className="value-list">
          {(locale === "ar" ? ["السرية", "النزاهة الإكلينيكية", "الإتاحة", "التعاطف", "التعليم"] : ["Confidentiality", "Clinical integrity", "Accessibility", "Empathy", "Education"]).map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </Section>
    </main>
  );
}
