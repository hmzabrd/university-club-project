import { links } from "../data/siteText";

export default function Footer({ text }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-label">{text.footer.social}</p>

        <div className="footer-socials">
          <a href={links.instagram} target="_blank" rel="noreferrer" title="Instagram">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.976 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.976.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.976-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.976-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-1.163C8.741 1 8.333.014 7.053.072 5.773.13 4.387.382 3.135 1.634 1.883 2.886 1.631 4.272 1.573 5.552 1.515 6.832 1.5 7.24 1.5 10.5s.015 3.668.073 4.948c.058 1.28.31 2.666 1.562 3.918 1.252 1.252 2.638 1.504 3.918 1.562 1.28.058 1.688.072 4.948.072s3.668-.015 4.948-.072c1.28-.058 2.666-.31 3.918-1.562 1.252-1.252 1.504-2.638 1.562-3.918.058-1.28.072-1.688.072-4.948s-.015-3.668-.072-4.948c-.058-1.28-.31-2.666-1.562-3.918-1.252-1.252-2.638-1.504-3.918-1.562C16.668.014 16.26 0 13 0h-1z"/>
              <circle cx="12" cy="10.5" r="3.5"/>
            </svg>
            @cik_fsbm
          </a>
          <a href={links.facebook} target="_blank" rel="noreferrer" title="Facebook">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a href={links.email} title={text.footer.email}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {links.email.replace('mailto:', '')}
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
