import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById, getAdjacentEvents } from "../data/events";
import { categories } from "../data/categories";
import { t, fallbackImg } from "../utils/lang";
import Lightbox from "../components/Lightbox";

export default function EventDetail({ lang, text }) {
  const { id } = useParams();
  const event = getEventById(id);
  const labels = text.activities;
  const { prev, next } = getAdjacentEvents(id);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    document.title = event ? `${t(event.title, lang)} | CIK` : "404 | CIK";
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
  const igBtnLabel = event.isVideo ? labels.watchVideo : igLabel + " ↗";
  const videoMsg = labels.videoMessage;
  const openLabel = labels.openInstagram;

  return (
    <main className="page event-detail-page">
      <div className="container">
        <Link to="/activities" className="back-link">← {labels.back}</Link>

        <header className="event-detail-header">
          {event.isVideo && <span className="event-badge video-badge">{labels.videoLabel}</span>}
          {category && !event.isVideo && <span className="event-badge">{t(category.label, lang)}</span>}
          <span className="event-date">{event.date}</span>
          <h1>{t(event.title, lang)}</h1>
          <p className="event-location">📍 {t(event.location, lang)}</p>
          <p className="event-detail-desc">{t(event.description, lang)}</p>
          <a href={igUrl} target="_blank" rel="noreferrer" className="btn btn-outline">{igBtnLabel}</a>
        </header>

        {event.isVideo ? (
          <div className="video-placeholder">
            <div className="video-placeholder-inner">
              <span className="video-play-icon">▶</span>
              <p>{videoMsg}</p>
              <a href={igUrl} target="_blank" rel="noreferrer" className="btn btn-primary">{openLabel}</a>
            </div>
          </div>
        ) : (
          <div className="event-gallery">
            {event.images.map((src, i) => (
              <figure key={src} className="event-gallery-item">
                <img src={src} alt={`${t(event.title, lang)} — ${i + 1}`} loading="lazy" onError={fallbackImg} onClick={() => setLightboxIdx(i)} />
              </figure>
            ))}
          </div>
        )}

        <nav className="event-nav" aria-label={labels.eventNav}>
          {prev ? (
            <Link to={`/activities/${prev.id}`} className="event-nav-link event-nav-prev">
              <span className="event-nav-label">← {labels.prev}</span>
              <strong>{t(prev.title, lang)}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/activities/${next.id}`} className="event-nav-link event-nav-next">
              <span className="event-nav-label">{labels.next} →</span>
              <strong>{t(next.title, lang)}</strong>
            </Link>
          ) : <span />}
        </nav>
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          src={event.images[lightboxIdx]}
          alt={`${t(event.title, lang)} — ${lightboxIdx + 1}`}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxIdx > 0 ? () => setLightboxIdx(lightboxIdx - 1) : null}
          onNext={lightboxIdx < event.images.length - 1 ? () => setLightboxIdx(lightboxIdx + 1) : null}
        />
      )}
    </main>
  );
}
