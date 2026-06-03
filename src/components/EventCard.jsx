import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { t, fallbackImg } from "../utils/lang";

export default function EventCard({ event, lang, linkLabel }) {
  const cover = event.images[0];
  const photoCount = event.images.length;
  const category = categories.find((c) => c.id === event.category);

  return (
    <article className="event-card">
      <Link to={`/activities/${event.id}`} className="event-card-link">
        <div className="event-card-image">
          {event.isVideo ? (
            <div className="video-placeholder">
              <div className="video-placeholder-inner">
                <span className="video-play-icon">▶</span>
              </div>
            </div>
          ) : (
            <img
              src={cover}
              alt={t(event.title, lang)}
              loading="lazy"
              onError={fallbackImg}
            />
          )}
          <span className="photo-count">{event.isVideo ? '▶' : '📷'} {photoCount}</span>
          {category && (
            <span className="card-cat">{t(category.label, lang)}</span>
          )}
        </div>
        <div className="event-card-body">
          <span className="event-date">{event.date}</span>
          <h3>{t(event.title, lang)}</h3>
          <p className="event-location">📍 {t(event.location, lang)}</p>
          <p className="event-excerpt">{t(event.description, lang)}</p>
          <span className="event-more">{linkLabel} →</span>
        </div>
      </Link>
    </article>
  );
}
