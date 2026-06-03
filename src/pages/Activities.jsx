import { useState, useEffect } from "react";
import { getSortedEvents } from "../data/events";
import { categories } from "../data/categories";
import { t } from "../utils/lang";
import EventCard from "../components/EventCard";

export default function Activities({ lang, text }) {
  const labels = text.activities;
  const allEvents = getSortedEvents();
  const [filter, setFilter] = useState("all");
  const events = filter === "all"
    ? allEvents
    : allEvents.filter((e) => e.category === filter);

  useEffect(() => {
    document.title = `${labels.title} | CIK`;
  }, [labels.title]);

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
              onClick={() => setFilter(cat.id)}
            >
              {t(cat.label, lang)}
            </button>
          ))}
        </div>

        <p className="results-count">
          {events.length} / {allEvents.length} {labels.resultsLabel} — {labels.sortedByDate}
        </p>

        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} lang={lang} linkLabel={labels.viewPhotos} />
          ))}
        </div>
      </div>
    </main>
  );
}
