import type { Locale } from "../types/content";

type ImageMeta = {
  src: string;
  alt: Record<Locale, string>;
};

export const sectionImages = {
  hero: {
    src: "/images/hero-therapy-room.png",
    alt: {
      en: "Calm private therapy consultation room with teal chairs and soft daylight.",
      ar: "غرفة استشارة نفسية هادئة بكراس بلون فيروزي وضوء طبيعي ناعم.",
    },
  },
  services: {
    src: "/images/services-planning.png",
    alt: {
      en: "Therapy service planning desk with notebook, appointment card, tea, and teal folder.",
      ar: "مكتب تخطيط للخدمات النفسية يحتوي على دفتر وبطاقة موعد وكوب شاي وملف فيروزي.",
    },
  },
  therapists: {
    src: "/images/therapists-team.png",
    alt: {
      en: "Professional therapists reviewing a blank tablet in a private counseling office.",
      ar: "مختصتان تراجعان جهازا لوحيا فارغا داخل مكتب استشارات خاص.",
    },
  },
  supportGroups: {
    src: "/images/support-group-room.png",
    alt: {
      en: "Welcoming support group room with chairs arranged in a circle.",
      ar: "غرفة مجموعة دعم ترحيبية بكراس مرتبة في دائرة.",
    },
  },
  assessments: {
    src: "/images/assessments-desk.png",
    alt: {
      en: "Confidential assessment desk with abstract cards, blank tablet, and teal materials.",
      ar: "مكتب تقييم سري يحتوي على بطاقات مجردة وجهاز لوحي فارغ وأدوات فيروزية.",
    },
  },
  media: {
    src: "/images/media-workspace.png",
    alt: {
      en: "Mental health media workspace with microphone, headphones, blank tablet, and camera.",
      ar: "مساحة عمل للمحتوى النفسي تحتوي على ميكروفون وسماعات وجهاز لوحي فارغ وكاميرا.",
    },
  },
} satisfies Record<string, ImageMeta>;
