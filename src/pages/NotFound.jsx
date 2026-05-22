/* 404 page — shown for unknown URLs */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound({ text, lang }) {
  useEffect(() => {
    document.title = '404 | CIK';
  }, []);

  return (
    <main className="page notfound-page">
      <div className="container narrow notfound-container">
        <img src="/images/logo.jpg" alt="CIK" className="notfound-logo" />
        <h1 className="notfound-code">404</h1>
        <p className="notfound-msg">
          {lang === 'fr' ? 'Page introuvable.' : lang === 'en' ? 'Page not found.' : 'الصفحة غير موجودة.'}
        </p>
        <Link to="/" className="btn btn-primary notfound-home-btn">{text.nav.home}</Link>
      </div>
    </main>
  );
}
