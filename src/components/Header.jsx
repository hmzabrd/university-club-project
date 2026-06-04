import { useState } from "react";
import { NavLink } from "react-router-dom";
import { smoothScrollToTop } from "../utils/lang";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";

export default function Header({ lang, setLang, text, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: text.nav.home, end: true },
    { to: "/about", label: text.nav.about },
    { to: "/activities", label: text.nav.activities },
    { to: "/team", label: text.nav.team },
    { to: "/gallery", label: text.nav.gallery },
    { to: "/join", label: text.nav.join },
    { to: "/bonus", label: text.nav.bonus },
  ];

  function closeMenu() {
    setMenuOpen(false);
    smoothScrollToTop();
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src="/images/logo.jpg" alt={text.clubShort} className="brand-logo" />
          <span className="brand-text">
            <strong>{text.clubShort}</strong>
            <small>CIK — FSBM</small>
          </span>
        </NavLink>

        <nav className={`main-nav${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle theme={theme} setTheme={setTheme} label={text.themeToggle} />
          <LangSwitch lang={lang} setLang={setLang} />
          <button
            className="hamburger"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
