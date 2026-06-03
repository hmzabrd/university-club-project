import { useState, useEffect } from "react";
import { getAllGalleryImages } from "../data/events";
import { categories } from "../data/categories";
import { t, fallbackImg } from "../utils/lang";
import Lightbox from "../components/Lightbox";

const PAGE_SIZE = 30;

export default function Gallery({ lang, text }) {
  const labels = text.gallery;

  useEffect(() => {
    document.title = `${labels.title} | CIK`;
  }, [labels.title]);

  const [filter, setFilter] = useState("all");
  const [showing, setShowing] = useState(PAGE_SIZE);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  function changeFilter(id) {
    setFilter(id);
    setShowing(PAGE_SIZE);
    setLightboxIdx(null);
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
            <div key={`${photo.eventId}-${index}`} className="gallery-item" onClick={() => setLightboxIdx(index)}>
              <img src={photo.src} alt={t(photo.caption, lang)} loading="lazy" onError={fallbackImg} />
              <span>{t(photo.caption, lang)}</span>
            </div>
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
      {lightboxIdx !== null && (
        <Lightbox
          src={filtered[lightboxIdx].src}
          alt={t(filtered[lightboxIdx].caption, lang)}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxIdx > 0 ? () => setLightboxIdx(lightboxIdx - 1) : null}
          onNext={lightboxIdx < filtered.length - 1 ? () => setLightboxIdx(lightboxIdx + 1) : null}
        />
      )}
    </main>
  );
}
