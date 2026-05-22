import { useState } from "react";
import { NavLink } from "react-router-dom";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";

export default function Header({ lang, setLang, text, theme, setTheme }) {
  // Controls whether mobile nav is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: text.nav.home, end: true },
    { to: "/about", label: text.nav.about },
    { to: "/activities", label: text.nav.activities },
    { to: "/team", label: text.nav.team },
    { to: "/gallery", label: text.nav.gallery },
    { to: "/join", label: text.nav.join },
  ];

  // Close the menu whenever a link is clicked
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo + club name */}
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src="/images/logo.jpg" alt="CIK logo" className="brand-logo" />
          <span className="brand-text">
            <strong>{text.clubShort}</strong>
            <small>CIK — FSBM</small>
          </span>
        </NavLink>

        {/* Desktop nav (hidden on mobile unless open) */}
        <nav className={`main-nav${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: theme + lang + hamburger */}
        <div className="header-actions">
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            label={text.themeToggle}
          />
          <LangSwitch lang={lang} setLang={setLang} />

          {/* Hamburger button — only visible on mobile */}
          <button
            className="hamburger"
            type="button"
            aria-label="Menu"
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
