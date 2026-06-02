/* ============================================================
   FILE: src/pages/Home.jsx — Homepage
   Sections: Hero, About, Mosaic, Quote, Partners, Team, Activities
   ============================================================ */

import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { getSortedEvents } from "../data/events";
import { instagramHighlights } from "../data/highlights";
import { links } from "../data/siteText";
import EventCard from "../components/EventCard";
import FadeIn from "../components/FadeIn";
import { fallbackImg } from "../utils/lang";
import { team } from "../data/team";

const HAS_INTRO_VIDEO = false;
const HERO_SRC = "/images/hero.jpg";

const RANGE = 3;
const GAP = 18;

export default function Home({ lang, text }) {
  const [teamIdx, setTeamIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(window.innerWidth < 768 ? 160 : 240);
  const pausedRef = useRef(false);
  const lastAdvRef = useRef(0);
  const rafRef = useRef(null);

  const STEP = cardW + GAP;

  useEffect(() => { document.title = `${text.nav.home} | CIK`; }, [text.nav.home]);

  pausedRef.current = paused;

  useEffect(() => {
    const onResize = () => setCardW(window.innerWidth < 768 ? 160 : 240);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!paused) lastAdvRef.current = 0;
  }, [paused]);

  useEffect(() => {
    function tick(now) {
      if (!pausedRef.current) {
        if (!lastAdvRef.current) lastAdvRef.current = now;
        if (now - lastAdvRef.current >= 3000) {
          setTeamIdx((prev) => (prev + 1) % team.length);
          lastAdvRef.current = now;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function getVisibleTeam() {
    const result = [];
    for (let i = -RANGE; i <= RANGE; i++) {
      const idx = ((teamIdx + i) % team.length + team.length) % team.length;
      result.push({ ...team[idx], virtualIdx: teamIdx + i });
    }
    return result;
  }

  const latest = getSortedEvents().slice(0, 6);
  const mosaic = useMemo(() =>
    getSortedEvents()
      .filter((e) => e.images.length >= 3)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)
      .map((e, i) => ({ src: e.images[i % e.images.length], eventId: e.id })),
  []);
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
          <img src="/images/logo.jpg" alt={text.clubShort} className="hero-logo" />
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
      <FadeIn><section className="section">
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
      </section></FadeIn>

      {/* Photo Mosaic */}
      <FadeIn><section className="section section-alt">
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
      </section></FadeIn>

      {/* Quote + Highlights */}
      <FadeIn><section className="section">
        <div className="container">
          <blockquote className="club-quote">{h.quote}</blockquote>
          <h2 className="section-title">{h.highlightsTitle}</h2>
          <div className="highlight-chips">
            {instagramHighlights.map((item) => (
              <a key={item.name} href={item.instagram || links.instagram} target="_blank" rel="noreferrer" className="highlight-chip">
                <span className="chip-emoji">{item.emoji}</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </section></FadeIn>

      {/* Partners */}
      <FadeIn><section className="section section-alt">
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
      </section></FadeIn>

      {/* Team Carousel */}
      <FadeIn><section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{h.teamTitle}</h2>
            <Link to="/team" className="link-more">{h.teamViewAll} →</Link>
          </div>
          <div
            className="team-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {getVisibleTeam().map((member) => {
              const offset = member.virtualIdx - teamIdx;
              const dist = Math.abs(offset);
              const t = dist / RANGE;
              return (
                <article
                  key={member.id}
                  className={`team-carousel-card${dist === 0 ? ' is-center' : ''}`}
                  style={{
                    transform: `translateY(-50%) translateX(-50%) translateX(${offset * STEP}px) scale(${1 - t * 0.3})`,
                    opacity: 0.2 + (1 - t) * 0.8,
                    filter: `brightness(${1 - t * 0.5})`,
                    zIndex: RANGE - dist + 1,
                  }}
                >
                  <div className="team-card-photo">
                    <img src={member.photo} alt={member.name} loading="lazy" onError={fallbackImg} />
                  </div>
                  <div className="team-card-info">
                    <h3>{member.name}</h3>
                    <p>{text.team[member.roleKey]}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section></FadeIn>

      {/* Latest Activities */}
      <FadeIn><section className="section">
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
      </section></FadeIn>
    </main>
  );
}
