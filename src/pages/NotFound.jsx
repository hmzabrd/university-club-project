import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// 404 page — shown when someone types a wrong URL
export default function NotFound({ text }) {
  useEffect(() => {
    document.title = '404 | CIK';
  }, []);

  return (
    <main className="page notfound-page">
      <div className="container narrow" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src="/images/logo.jpg" alt="CIK" className="notfound-logo" />
        <h1 className="notfound-code">404</h1>
        <p className="notfound-msg">
          {text?.lang === 'fr'
            ? 'Page introuvable.'
            : text?.lang === 'en'
            ? 'Page not found.'
            : 'الصفحة غير موجودة.'}
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          {text?.nav?.home || '← Accueil'}
        </Link>
      </div>
    </main>
  );
}
