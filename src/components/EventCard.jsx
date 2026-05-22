import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { t } from "../utils/lang";

// One activity card shown in the grid on Home and Activities pages
export default function EventCard({ event, lang, linkLabel }) {
  // First image is the cover photo; fall back to logo if missing
  const cover = event.images[0];
  const photoCount = event.images.length;

  // Find the category label (Health, Solidarity, etc.)
  const category = categories.find((c) => c.id === event.category);

  return (
    <article className="event-card">
      <Link to={`/activities/${event.id}`} className="event-card-link">
        {/* Cover photo */}
        <div className="event-card-image">
          <img
            src={cover}
            alt={t(event.title, lang)}
            loading="lazy"
            onError={(e) => {
              e.target.src = "/images/logo.jpg";
            }}
          />
          <span className="photo-count">📷 {photoCount}</span>
          {category && (
            <span className="card-cat">{t(category.label, lang)}</span>
          )}
        </div>

        {/* Text info */}
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
