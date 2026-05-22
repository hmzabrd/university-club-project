import { useEffect } from "react";
import { getSortedEvents } from "../data/events";
import EventCard from "../components/EventCard";

export default function Activities({ lang, text }) {
  const labels = text.activities;
  const events = getSortedEvents();

  useEffect(() => {
    document.title = `${labels.title} | CIK`;
  }, [labels.title]);

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">{labels.title}</h1>
        <p className="lead">{labels.intro}</p>
        <p className="results-count">
          {events.length} {labels.resultsLabel} — {labels.sortedByDate}
        </p>
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              lang={lang}
              linkLabel={labels.viewPhotos}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
