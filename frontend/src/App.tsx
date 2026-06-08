import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { copy, t } from "./data/content";
import AboutPage from "./pages/AboutPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LegalPage from "./pages/LegalPage";
import ListingPage from "./pages/ListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import TherapistDetailPage from "./pages/TherapistDetailPage";
import type { Locale } from "./types/content";

const navItems = [
  { to: "/services", label: copy.nav.services },
  { to: "/therapists", label: copy.nav.therapists },
  { to: "/booking", label: copy.nav.booking },
  { to: "/articles", label: copy.nav.media },
  { to: "/about", label: copy.nav.about },
  { to: "/contact", label: copy.nav.contact },
];

export default function App() {
  const stored = window.localStorage.getItem("warh-locale") as Locale | null;
  const [locale, setLocale] = useState<Locale>(stored ?? "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("warh-locale", locale);
  }, [locale]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const context = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Warh Elshasha home">
          <span className="brand-mark">و</span>
          <span>
            <strong>Warh Elshasha</strong>
            <small>{locale === "ar" ? "رعاية نفسية وإعلام توعوي" : "Psychological care and media"}</small>
          </span>
        </Link>

        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "site-nav open" : "site-nav"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {t(item.label, locale)}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="language-toggle" onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
            {locale === "en" ? "عربي" : "English"}
          </button>
          <Link className="button primary compact" to="/booking">
            {t(copy.cta.book, locale)}
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage {...context} />} />
        <Route path="/about" element={<AboutPage {...context} />} />
        <Route path="/services" element={<ListingPage {...context} kind="services" />} />
        <Route path="/therapists" element={<ListingPage {...context} kind="therapists" />} />
        <Route path="/therapists/:id" element={<TherapistDetailPage {...context} />} />
        <Route path="/appointments" element={<BookingPage {...context} />} />
        <Route path="/booking" element={<BookingPage {...context} />} />
        <Route path="/support-groups" element={<ListingPage {...context} kind="support-groups" />} />
        <Route path="/assessments" element={<ListingPage {...context} kind="assessments" />} />
        <Route path="/awareness-events" element={<ListingPage {...context} kind="events" />} />
        <Route path="/articles" element={<ListingPage {...context} kind="articles" />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage {...context} />} />
        <Route path="/podcasts" element={<ListingPage {...context} kind="podcasts" />} />
        <Route path="/videos" element={<ListingPage {...context} kind="videos" />} />
        <Route path="/contact" element={<ContactPage {...context} />} />
        <Route path="/privacy" element={<LegalPage {...context} kind="privacy" />} />
        <Route path="/terms" element={<LegalPage {...context} kind="terms" />} />
        <Route path="/consent" element={<LegalPage {...context} kind="consent" />} />
        <Route path="*" element={<NotFoundPage {...context} />} />
      </Routes>

      <footer className="site-footer">
        <div>
          <h2>Warh Elshasha</h2>
          <p>{locale === "ar" ? "منصة ثنائية اللغة للرعاية النفسية والمحتوى التوعوي." : "A bilingual platform for psychological services and responsible mental health media."}</p>
        </div>
        <div className="footer-links">
          <Link to="/privacy">{locale === "ar" ? "الخصوصية" : "Privacy"}</Link>
          <Link to="/terms">{locale === "ar" ? "الشروط" : "Terms"}</Link>
          <Link to="/consent">{locale === "ar" ? "الموافقة والسرية" : "Consent & confidentiality"}</Link>
        </div>
        <p className="footer-note">{t(copy.common.nonEmergency, locale)}</p>
      </footer>
    </div>
  );
}
