/* Gallery page — all photos with category filter and pagination */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllGalleryImages } from "../data/events";
import { categories } from "../data/categories";
import { t, fallbackImg } from "../utils/lang";

const PAGE_SIZE = 30;

export default function Gallery({ lang, text }) {
  const labels = text.gallery;

  useEffect(() => {
    document.title = `${labels.title} | CIK`;
  }, [labels.title]);

  const [filter, setFilter] = useState("all");
  const [showing, setShowing] = useState(PAGE_SIZE);

  function changeFilter(id) {
    setFilter(id);
    setShowing(PAGE_SIZE);
  }

  const allPhotos = getAllGalleryImages();
  const filtered = filter === "all" ? allPhotos : allPhotos.filter((photo) => photo.category === filter);
  const visible = filtered.slice(0, showing);
  const hasMore = showing < filtered.length;

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">{labels.title}</h1>
        <p className="lead">{labels.intro}</p>

        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={filter === cat.id ? "active" : ""}
              onClick={() => changeFilter(cat.id)}
            >
              {t(cat.label, lang)}
            </button>
          ))}
        </div>

        <p className="results-count">{visible.length} / {filtered.length} {labels.resultsLabel}</p>

        <div className="gallery-grid">
          {visible.map((photo, index) => (
            <Link key={`${photo.eventId}-${index}`} to={`/activities/${photo.eventId}`} className="gallery-item">
              <img src={photo.src} alt={t(photo.caption, lang)} loading="lazy" onError={fallbackImg} />
              <span>{t(photo.caption, lang)}</span>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="btn btn-outline load-more-btn"
              onClick={() => setShowing(showing + PAGE_SIZE)}
            >
              {`${labels.showMore} (${filtered.length - showing} ${labels.resultsLabel})`}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
