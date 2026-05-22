/* ============================================================
   FILE: src/pages/Home.jsx — Homepage
   Sections: Hero, About, Mosaic, Quote, Partners, Team, Activities
   ============================================================ */

import { Link } from "react-router-dom";
import { getSortedEvents, getAllGalleryImages } from "../data/events";
import { instagramHighlights } from "../data/highlights";
import { links } from "../data/siteText";
import EventCard from "../components/EventCard";
import { fallbackImg } from "../utils/lang";
import { team } from "../data/team";

const HAS_INTRO_VIDEO = false;
const HERO_SRC = "/images/hero.jpg";

export default function Home({ lang, text }) {
  const latest = getSortedEvents().slice(0, 6);
  const mosaic = getAllGalleryImages().slice(0, 12);
  const h = text.home;

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        {HAS_INTRO_VIDEO ? (
          <video className="hero-bg hero-video" src="/video/intro.mp4" autoPlay muted loop playsInline poster={HERO_SRC} />
        ) : (
          <img src={HERO_SRC} alt="" className="hero-bg" />
        )}
        <div className="hero-overlay" />
        <div className="container hero-content">
          <img src="/images/logo.jpg" alt="CIK" className="hero-logo" />
          <p className="hero-verse">{text.verse}</p>
          <h1>{text.clubFull}</h1>
          <p className="hero-tagline">{text.tagline}</p>
          <p className="hero-faculty">{text.faculty}</p>
          <div className="hero-actions">
            <Link to="/activities" className="btn btn-primary">{text.hero.ctaActivities}</Link>
            <Link to="/join" className="btn btn-light">{text.hero.ctaJoin}</Link>
          </div>
        </div>
      </section>

      {/* About / Pillars */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{h.introTitle}</h2>
          <p className="section-text">{h.introText}</p>
          <div className="pillars-grid">
            {h.pillars.map((p) => (
              <article key={p.title} className="pillar-card">
                <span className="pillar-emoji" aria-hidden="true">{p.emoji}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Mosaic */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{h.mosaicTitle}</h2>
          <div className="home-mosaic">
            {mosaic.map((item, i) => (
              <Link key={`${item.eventId}-${i}`} to={`/activities/${item.eventId}`} className="mosaic-item">
                <img src={item.src} alt="" loading="lazy" onError={fallbackImg} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + Highlights */}
      <section className="section">
        <div className="container">
          <blockquote className="club-quote">{h.quote}</blockquote>
          <h2 className="section-title">{h.highlightsTitle}</h2>
          <div className="highlight-chips">
            {instagramHighlights.map((item) => (
              <a key={item.name} href={links.instagram} target="_blank" rel="noreferrer" className="highlight-chip">
                <span className="chip-emoji">{item.emoji}</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{h.partnersTitle}</h2>
          <div className="partners-grid">
            {h.partners.map((name) => (
              <div key={name} className="partner-card">
                <span className="partner-icon">🤝</span>
                <p>{name}</p>
              </div>
            ))}
          </div>
          <p className="anniversary-note">{h.anniversaryNote}</p>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{h.teamTitle}</h2>
          <div className="team-grid">
            {team.slice(0, 4).map((member) => (
              <article key={member.id} className="team-card">
                <div className="team-card-photo">
                  <img src={member.photo} alt={member.name} onError={fallbackImg} />
                </div>
                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <p>{text.team[member.roleKey]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Activities */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{h.latestTitle}</h2>
            <Link to="/activities" className="link-more">{h.viewAll} →</Link>
          </div>
          <div className="events-grid">
            {latest.map((event) => (
              <EventCard key={event.id} event={event} lang={lang} linkLabel={text.activities.viewPhotos} />
            ))}
          </div>
          <p className="ig-footer-link">
            <a href={links.instagram} target="_blank" rel="noreferrer">{h.followIg} @cik_fsbm →</a>
          </p>
        </div>
      </section>
    </main>
  );
}
