/* Site footer — social links, copyright */

import { links } from "../data/siteText";

export default function Footer({ text }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-label">{text.footer.social}</p>

        <div className="footer-socials">
          <a href={links.instagram} target="_blank" rel="noreferrer" title="Instagram">
            <span>📸</span> @cik_fsbm
          </a>
          <a href={links.facebook} target="_blank" rel="noreferrer" title="Facebook">
            <span>📘</span> Facebook
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
            <span>💼</span> LinkedIn
          </a>
          <a href={links.email} title="Email">
            <span>✉️</span> clubibnkhaldoun2015@gmail.com
          </a>
        </div>

        <p className="footer-faculty">
          <a href={links.facultyIg} target="_blank" rel="noreferrer">@fsbm_casablanca</a>
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} {text.clubShort} — {text.footer.rights}
        </p>
      </div>
    </footer>
  );
}
