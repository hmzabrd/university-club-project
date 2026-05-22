import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById, getAdjacentEvents } from "../data/events";
import { categories } from "../data/categories";
import { t } from "../utils/lang";

export default function EventDetail({ lang, text }) {
  const { id } = useParams();
  const event = getEventById(id);
  const labels = text.activities;
  const { prev, next } = getAdjacentEvents(id);

  // Update browser tab title
  useEffect(() => {
    if (event) {
      document.title = `${t(event.title, lang)} | CIK`;
    } else {
      document.title = "404 | CIK";
    }
  }, [event, lang]);

  if (!event) {
    return (
      <main className="page">
        <div className="container narrow">
          <h1>{labels.notFound}</h1>
          <Link to="/activities">{labels.back}</Link>
        </div>
      </main>
    );
  }

  const category = categories.find((cat) => cat.id === event.category);
  const igUrl = event.instagram || "https://www.instagram.com/cik_fsbm/";
  const igLabel = event.instagram ? labels.seeInstagram : text.home.followIg;

  // button label for the instagram link
  let igBtnLabel = igLabel + " ↗";
  if (event.isVideo) {
    if (lang === "ar") igBtnLabel = "شاهد على إنستغرام ↗";
    else if (lang === "fr") igBtnLabel = "Voir la vidéo ↗";
    else igBtnLabel = "Watch on Instagram ↗";
  }

  // text shown inside the video placeholder
  let videoMsg = "This post is a video — watch it on Instagram";
  if (lang === "ar") videoMsg = "هذا المنشور فيديو — شاهده على إنستغرام";
  if (lang === "fr")
    videoMsg = "Ce post est une vidéo — regardez-le sur Instagram";

  let openLabel = "Open on Instagram";
  if (lang === "ar") openLabel = "فتح على إنستغرام";
  if (lang === "fr") openLabel = "Ouvrir sur Instagram";

  return (
    <main className="page event-detail-page">
      <div className="container">
        <Link to="/activities" className="back-link">
          ← {labels.back}
        </Link>

        {/* Event info header */}
        <header className="event-detail-header">
          {event.isVideo && (
            <span className="event-badge video-badge">▶ Vidéo</span>
          )}
          {category && !event.isVideo && (
            <span className="event-badge">{t(category.label, lang)}</span>
          )}
          <span className="event-date">{event.date}</span>
          <h1>{t(event.title, lang)}</h1>
          <p className="event-location">📍 {t(event.location, lang)}</p>
          <p className="event-detail-desc">{t(event.description, lang)}</p>
          <a
            href={igUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            {igBtnLabel}
          </a>
        </header>

        {/* Video-only post: no photos, just a CTA */}
        {event.isVideo ? (
          <div className="video-placeholder">
            <div className="video-placeholder-inner">
              <span className="video-play-icon">▶</span>
              <p>{videoMsg}</p>
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {openLabel}
              </a>
            </div>
          </div>
        ) : (
          /* Full photo gallery */
          <div className="event-gallery">
            {event.images.map((src, i) => (
              <figure key={src} className="event-gallery-item">
                <img
                  src={src}
                  alt={`${t(event.title, lang)} — ${i + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/images/logo.jpg";
                  }}
                />
              </figure>
            ))}
          </div>
        )}

        {/* Prev / Next navigation */}
        <nav className="event-nav" aria-label={labels.eventNav}>
          {prev ? (
            <Link
              to={`/activities/${prev.id}`}
              className="event-nav-link event-nav-prev"
            >
              <span className="event-nav-label">← {labels.prev}</span>
              <strong>{t(prev.title, lang)}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/activities/${next.id}`}
              className="event-nav-link event-nav-next"
            >
              <span className="event-nav-label">{labels.next} →</span>
              <strong>{t(next.title, lang)}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}
