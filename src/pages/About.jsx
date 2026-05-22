import { useEffect } from "react";
import { Link } from "react-router-dom";
import { events } from "../data/events";
import { links } from "../data/siteText";

export default function About({ text }) {
  useEffect(() => {
    document.title = `${text.about.title} | CIK`;
  }, [text.about.title]);

  // Take the first photo from each of the first 8 events for the photo strip
  const photos = events
    .flatMap((e) => e.images.slice(0, 1).map((src) => ({ src, id: e.id })))
    .slice(0, 8);

  return (
    <main className="page about-page">
      <div className="container">
        <h1 className="page-title">{text.about.title}</h1>
        <p className="lead about-lead">{text.about.lead}</p>
        <p>{text.about.p1}</p>
        <blockquote className="club-quote about-quote">
          {text.about.p2}
        </blockquote>

        {/* Photo strip — links to each activity */}
        <div className="about-photo-strip">
          {photos.map((p) => (
            <Link key={p.id} to={`/activities/${p.id}`} className="about-photo">
              <img
                src={p.src}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/logo.jpg";
                }}
              />
            </Link>
          ))}
        </div>

        <div className="about-box">
          <h2>{text.about.missionTitle}</h2>
          <p>{text.about.missionText}</p>
        </div>

        <div className="about-box about-do">
          <h2>{text.about.doTitle}</h2>
          <ul className="about-list">
            {text.about.doItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p>{text.about.p3}</p>

        <div className="about-box">
          <h2>{text.about.whyTitle}</h2>
          <p>{text.about.whyText}</p>
          <p className="verse-block">{text.verse}</p>
        </div>

        <div className="about-cta">
          <h2>{text.about.joinCta}</h2>
          <p>{text.about.joinCtaText}</p>
          <div className="about-cta-actions">
            <a
              href={links.form}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              {text.join.formBtn}
            </a>
            <a
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              @cik_fsbm
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
