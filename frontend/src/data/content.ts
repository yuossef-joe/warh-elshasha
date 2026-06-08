import type { Article, Locale, Program, Service, Therapist } from "../types/content";

export const t = (value: Record<Locale, string>, locale: Locale) => value[locale] ?? value.en;

export const copy = {
  nav: {
    services: { en: "Services", ar: "الخدمات" },
    therapists: { en: "Therapists", ar: "المعالجون" },
    booking: { en: "Booking", ar: "الحجز" },
    media: { en: "Media", ar: "المحتوى" },
    about: { en: "About", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  cta: {
    book: { en: "Book a consultation", ar: "احجز استشارة" },
    whatsapp: { en: "Open WhatsApp", ar: "افتح واتساب" },
    learn: { en: "Learn more", ar: "اعرف المزيد" },
    profile: { en: "View profile", ar: "عرض الملف" },
  },
  common: {
    nonEmergency: {
      en: "Warh Elshasha does not provide emergency crisis response through this website. If you are in immediate danger, contact local emergency services.",
      ar: "لا تقدم ورح الشاشة استجابة طارئة للأزمات عبر هذا الموقع. إذا كنت في خطر فوري، تواصل مع خدمات الطوارئ المحلية.",
    },
    confidentiality: {
      en: "Your booking details are handled with confidentiality and shared only with authorized support staff.",
      ar: "يتم التعامل مع بيانات الحجز بسرية ولا تتم مشاركتها إلا مع فريق الدعم المصرح له.",
    },
  },
};

export const services: Service[] = [
  {
    id: "individual-therapy",
    title: { en: "Individual Therapy", ar: "العلاج الفردي" },
    type: "therapy_session",
    tagline: { en: "Private support for emotional wellbeing.", ar: "دعم خاص للصحة النفسية والعاطفية." },
    description: {
      en: "Structured sessions for stress, anxiety, mood, life transitions, and personal growth.",
      ar: "جلسات منظمة لدعم التوتر والقلق والمزاج والتحولات الحياتية والنمو الشخصي.",
    },
    duration: { en: "50 minutes", ar: "50 دقيقة" },
    price: { en: "By confirmation", ar: "حسب التأكيد" },
    deliveryMode: "hybrid",
    audience: { en: "Adults and young adults", ar: "البالغون والشباب" },
    availability: "available",
  },
  {
    id: "family-counseling",
    title: { en: "Family Counseling", ar: "الإرشاد الأسري" },
    type: "counseling_session",
    tagline: { en: "Guided conversations for family systems.", ar: "حوارات موجهة للعلاقات الأسرية." },
    description: {
      en: "Support for communication, parenting stress, conflict patterns, and shared care plans.",
      ar: "دعم للتواصل وضغوط التربية وأنماط الخلاف وخطط الرعاية المشتركة.",
    },
    duration: { en: "60 minutes", ar: "60 دقيقة" },
    price: { en: "By confirmation", ar: "حسب التأكيد" },
    deliveryMode: "offline",
    audience: { en: "Families and guardians", ar: "الأسر وأولياء الأمور" },
    availability: "limited",
  },
  {
    id: "child-adolescent",
    title: { en: "Child & Adolescent Support", ar: "دعم الأطفال والمراهقين" },
    type: "consultation",
    tagline: { en: "Care pathways with guardian consent.", ar: "مسارات رعاية بموافقة ولي الأمر." },
    description: {
      en: "Consultation and counseling guidance for children, adolescents, and parents.",
      ar: "استشارات وإرشاد للأطفال والمراهقين وأولياء الأمور.",
    },
    duration: { en: "45 minutes", ar: "45 دقيقة" },
    price: { en: "By confirmation", ar: "حسب التأكيد" },
    deliveryMode: "hybrid",
    audience: { en: "Parents and guardians", ar: "أولياء الأمور" },
    availability: "available",
  },
  {
    id: "assessment",
    title: { en: "Psychological Assessments", ar: "التقييمات النفسية" },
    type: "assessment",
    tagline: { en: "Professional assessment with controlled follow-up.", ar: "تقييم مهني مع متابعة منظمة." },
    description: {
      en: "Assessment booking with consent, preparation guidance, and follow-up recommendations.",
      ar: "حجز تقييم مع موافقة وإرشادات تحضير وتوصيات متابعة.",
    },
    duration: { en: "Varies by assessment", ar: "تختلف حسب التقييم" },
    price: { en: "By assessment type", ar: "حسب نوع التقييم" },
    deliveryMode: "offline",
    audience: { en: "Adults, children, and guardians", ar: "البالغون والأطفال وأولياء الأمور" },
    availability: "available",
  },
];

export const therapists: Therapist[] = [
  {
    id: "dr-mariam",
    name: { en: "Dr. Mariam Hassan", ar: "د. مريم حسن" },
    title: { en: "Clinical Psychologist", ar: "أخصائية نفسية إكلينيكية" },
    bio: {
      en: "Focuses on anxiety, emotional regulation, family stress, and evidence-informed therapy planning.",
      ar: "تركز على القلق وتنظيم المشاعر وضغوط الأسرة وخطط العلاج المبنية على الدليل.",
    },
    credentials: { en: "PhD Psychology, CBT certified", ar: "دكتوراه علم النفس، معتمدة في العلاج المعرفي السلوكي" },
    specializations: [{ en: "Anxiety", ar: "القلق" }, { en: "Family stress", ar: "ضغوط الأسرة" }],
    languages: ["Arabic", "English"],
    sessionModes: ["online", "offline"],
    availability: { en: "Mon, Wed, Sat", ar: "الإثنين، الأربعاء، السبت" },
    services: ["individual-therapy", "child-adolescent"],
  },
  {
    id: "ahmed-samir",
    name: { en: "Ahmed Samir", ar: "أحمد سمير" },
    title: { en: "Counselor & Group Facilitator", ar: "مرشد وميسر مجموعات" },
    bio: {
      en: "Supports family communication, group programs, and practical follow-up plans.",
      ar: "يدعم التواصل الأسري وبرامج المجموعات وخطط المتابعة العملية.",
    },
    credentials: { en: "MSc Counseling Psychology", ar: "ماجستير الإرشاد النفسي" },
    specializations: [{ en: "Family counseling", ar: "الإرشاد الأسري" }, { en: "Support groups", ar: "مجموعات الدعم" }],
    languages: ["Arabic"],
    sessionModes: ["offline"],
    availability: { en: "Tue, Thu", ar: "الثلاثاء، الخميس" },
    services: ["family-counseling"],
  },
];

export const articles: Article[] = [
  {
    slug: "how-to-start-therapy",
    title: { en: "How to prepare for a first therapy session", ar: "كيف تستعد لجلسة العلاج الأولى" },
    excerpt: {
      en: "A simple guide to expectations, privacy, and what to bring into the first conversation.",
      ar: "دليل بسيط للتوقعات والخصوصية وما يمكن مشاركته في أول حوار.",
    },
    topic: { en: "Therapy guide", ar: "دليل العلاج" },
    author: { en: "Warh Elshasha Team", ar: "فريق ورح الشاشة" },
    date: "2026-06-02",
    readTime: { en: "5 min read", ar: "5 دقائق قراءة" },
    body: [
      {
        en: "The first session is usually about understanding your needs, goals, background, and what kind of support feels suitable.",
        ar: "تدور الجلسة الأولى غالبا حول فهم احتياجاتك وأهدافك وخلفيتك ونوع الدعم المناسب لك.",
      },
      {
        en: "You do not need to prepare a perfect story. Bring the concerns that feel most important now.",
        ar: "لا تحتاج إلى تحضير قصة مثالية. شارك المخاوف الأكثر أهمية بالنسبة لك الآن.",
      },
    ],
  },
  {
    slug: "supporting-adolescents",
    title: { en: "Supporting adolescents with emotional pressure", ar: "دعم المراهقين مع الضغط العاطفي" },
    excerpt: {
      en: "How guardians can notice stress signals and open safer conversations.",
      ar: "كيف يلاحظ أولياء الأمور علامات الضغط ويفتحون حوارات أكثر أمانا.",
    },
    topic: { en: "Parents", ar: "أولياء الأمور" },
    author: { en: "Clinical Review Team", ar: "فريق المراجعة الإكلينيكية" },
    date: "2026-06-04",
    readTime: { en: "4 min read", ar: "4 دقائق قراءة" },
    body: [
      {
        en: "Adolescents often show pressure through sleep changes, withdrawal, irritability, or school changes.",
        ar: "قد يظهر الضغط عند المراهقين من خلال تغيرات النوم أو الانسحاب أو سرعة الانفعال أو تغير الأداء الدراسي.",
      },
      {
        en: "Start with curiosity before advice. A calm question often opens more space than a quick solution.",
        ar: "ابدأ بالفضول قبل النصيحة. السؤال الهادئ يفتح مساحة أكبر من الحل السريع.",
      },
    ],
  },
];

export const programs: Program[] = [
  {
    id: "support-group",
    title: { en: "Emotional Resilience Group", ar: "مجموعة المرونة العاطفية" },
    topic: { en: "Support group", ar: "مجموعة دعم" },
    description: {
      en: "A facilitated group for practical coping skills and shared psychoeducation.",
      ar: "مجموعة ميسرة لمهارات التكيف العملية والتثقيف النفسي المشترك.",
    },
    schedule: { en: "Every Thursday, 6 PM", ar: "كل خميس، 6 مساء" },
    deliveryMode: "offline",
    capacity: { en: "12 participants", ar: "12 مشاركا" },
    ctaType: "support_group",
  },
  {
    id: "awareness-event",
    title: { en: "Mental Health Awareness Evening", ar: "أمسية التوعية بالصحة النفسية" },
    topic: { en: "Awareness event", ar: "فعالية توعوية" },
    description: {
      en: "A public session on stigma, help-seeking, and family support.",
      ar: "جلسة عامة حول الوصمة وطلب المساعدة ودعم الأسرة.",
    },
    schedule: { en: "June 18, 2026", ar: "18 يونيو 2026" },
    deliveryMode: "hybrid",
    capacity: { en: "Limited seats", ar: "أماكن محدودة" },
    ctaType: "awareness_event",
  },
];
