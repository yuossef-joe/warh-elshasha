import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import { Effect } from "../components/Effect";
import { copy, services, t, therapists } from "../data/content";
import type { BookingForm, DeliveryMode, Locale } from "../types/content";
import { buildWhatsAppUrl, emptyBooking, validateBooking } from "../utils/booking";

const steps = ["Service", "Mode", "Details", "Review"];

export default function BookingPage({ locale }: { locale: Locale }) {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    ...emptyBooking,
    serviceId: params.get("service_id") ?? "",
    therapistId: params.get("therapist_id") ?? "",
    deliveryMode: (params.get("delivery_mode") as DeliveryMode) || "online",
    date: params.get("date") ?? "",
    time: params.get("time") ?? "",
  });

  const selectedService = useMemo(() => services.find((item) => item.id === form.serviceId), [form.serviceId]);
  const selectedTherapist = useMemo(() => therapists.find((item) => item.id === form.therapistId), [form.therapistId]);
  const errors = validateBooking(form, step);

  function update<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function next() {
    const currentErrors = validateBooking(form, step);
    if (currentErrors.length === 0) setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function submit() {
    const finalErrors = validateBooking(form, 3);
    if (finalErrors.length > 0) return;
    const url = buildWhatsAppUrl(form, locale, selectedService ? t(selectedService.title, locale) : "", selectedTherapist ? t(selectedTherapist.name, locale) : "");
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <main>
      <section className="booking-layout">
        <aside className="booking-aside">
          <Effect inView={false} slide="up">
            <p className="eyebrow">{locale === "ar" ? "الحجز" : "Booking"}</p>
          </Effect>
          <h1>
            <AnimatedText text={locale === "ar" ? "ابدأ طلب حجز منظم" : "Start a structured booking request"} locale={locale} />
          </h1>
          <Effect inView={false} delay={180} slide="up">
            <p>{t(copy.common.confidentiality, locale)}</p>
          </Effect>
          <ol className="step-list">
            {steps.map((item, index) => (
              <li className={index === step ? "active" : index < step ? "done" : ""} key={item}>
                <span>{index + 1}</span>
                {locale === "ar" ? ["الخدمة", "الطريقة", "البيانات", "المراجعة"][index] : item}
              </li>
            ))}
          </ol>
          <div className="booking-progress" aria-hidden="true">
            <span style={{ inlineSize: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </aside>

        <div className="booking-panel">
          {submitted ? (
            <div className="empty-state success">
              <h2>{locale === "ar" ? "تم فتح واتساب" : "WhatsApp opened"}</h2>
              <p>{locale === "ar" ? "احتفظ بصفحة التأكيد هذه. سيتابع فريق الدعم تفاصيل الموعد معك." : "Keep this confirmation page. The support team will follow up to confirm your appointment details."}</p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="form-step step-motion" key="service-step">
                  <h2>{locale === "ar" ? "اختر الخدمة" : "Choose a service"}</h2>
                  <div className="choice-grid">
                    {services.map((service) => (
                      <button className={form.serviceId === service.id ? "choice selected" : "choice"} onClick={() => update("serviceId", service.id)} key={service.id}>
                        <strong>{t(service.title, locale)}</strong>
                        <span>{t(service.tagline, locale)}</span>
                      </button>
                    ))}
                  </div>
                  <label>
                    {locale === "ar" ? "تفضيل المعالج" : "Therapist preference"}
                    <select value={form.therapistId} onChange={(event) => update("therapistId", event.target.value)}>
                      <option value="">{locale === "ar" ? "بدون تفضيل" : "No preference"}</option>
                      {therapists.map((therapist) => (
                        <option key={therapist.id} value={therapist.id}>
                          {t(therapist.name, locale)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="form-step step-motion" key="mode-step">
                  <h2>{locale === "ar" ? "طريقة الجلسة والموعد" : "Session mode and time"}</h2>
                  <div className="segmented">
                    {(["online", "offline", "hybrid"] as DeliveryMode[]).map((mode) => (
                      <button className={form.deliveryMode === mode ? "selected" : ""} onClick={() => update("deliveryMode", mode)} key={mode}>
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="field-grid">
                    <label>
                      {locale === "ar" ? "التاريخ" : "Date"}
                      <input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} />
                    </label>
                    <label>
                      {locale === "ar" ? "الوقت" : "Time"}
                      <input type="time" value={form.time} onChange={(event) => update("time", event.target.value)} />
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step step-motion" key="details-step">
                  <h2>{locale === "ar" ? "بيانات التواصل" : "Contact details"}</h2>
                  <div className="field-grid">
                    <label>
                      {locale === "ar" ? "الاسم" : "Name"}
                      <input value={form.name} onChange={(event) => update("name", event.target.value)} />
                    </label>
                    <label>
                      {locale === "ar" ? "الهاتف" : "Phone"}
                      <input value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                    </label>
                    <label>
                      {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                      <input value={form.email} onChange={(event) => update("email", event.target.value)} />
                    </label>
                    <label>
                      {locale === "ar" ? "الفئة العمرية" : "Age group"}
                      <select value={form.ageGroup} onChange={(event) => update("ageGroup", event.target.value as BookingForm["ageGroup"])}>
                        <option value="adult">{locale === "ar" ? "بالغ" : "Adult"}</option>
                        <option value="young_adult">{locale === "ar" ? "شاب" : "Young adult"}</option>
                        <option value="child">{locale === "ar" ? "طفل" : "Child"}</option>
                        <option value="adolescent">{locale === "ar" ? "مراهق" : "Adolescent"}</option>
                      </select>
                    </label>
                  </div>
                  {["child", "adolescent"].includes(form.ageGroup) && (
                    <div className="field-grid">
                      <label>
                        {locale === "ar" ? "اسم ولي الأمر" : "Guardian name"}
                        <input value={form.guardianName} onChange={(event) => update("guardianName", event.target.value)} />
                      </label>
                      <label>
                        {locale === "ar" ? "هاتف ولي الأمر" : "Guardian phone"}
                        <input value={form.guardianPhone} onChange={(event) => update("guardianPhone", event.target.value)} />
                      </label>
                    </div>
                  )}
                  <label>
                    {locale === "ar" ? "رسالة اختيارية" : "Optional message"}
                    <textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="form-step step-motion" key="review-step">
                  <h2>{locale === "ar" ? "المراجعة والموافقة" : "Review and consent"}</h2>
                  <div className="review-box">
                    <p><strong>{locale === "ar" ? "الخدمة:" : "Service:"}</strong> {selectedService ? t(selectedService.title, locale) : "-"}</p>
                    <p><strong>{locale === "ar" ? "المعالج:" : "Therapist:"}</strong> {selectedTherapist ? t(selectedTherapist.name, locale) : locale === "ar" ? "بدون تفضيل" : "No preference"}</p>
                    <p><strong>{locale === "ar" ? "الطريقة:" : "Mode:"}</strong> {form.deliveryMode}</p>
                    <p><strong>{locale === "ar" ? "الموعد:" : "Time:"}</strong> {form.date || "-"} {form.time}</p>
                  </div>
                  <label className="check-row">
                    <input type="checkbox" checked={form.consentAcknowledged} onChange={(event) => update("consentAcknowledged", event.target.checked)} />
                    <span>{locale === "ar" ? "أوافق على مشاركة بيانات الحجز مع فريق الدعم المصرح له لغرض المتابعة." : "I agree to share booking details with authorized support staff for follow-up."}</span>
                  </label>
                </div>
              )}

              {errors.length > 0 && <p className="error-line">{locale === "ar" ? "يرجى إكمال الحقول المطلوبة قبل المتابعة." : "Please complete the required fields before continuing."}</p>}

              <div className="form-actions">
                <button className="button secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))}>
                  {locale === "ar" ? "السابق" : "Back"}
                </button>
                {step < 3 ? (
                  <button className="button primary" onClick={next}>
                    {locale === "ar" ? "التالي" : "Next"}
                  </button>
                ) : (
                  <button className="button primary" onClick={submit}>
                    {t(copy.cta.whatsapp, locale)}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
