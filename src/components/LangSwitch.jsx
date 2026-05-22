/* Language selector — three buttons: ع / FR / EN */

const langs = [
  { id: 'ar', label: 'ع' },
  { id: 'fr', label: 'FR' },
  { id: 'en', label: 'EN' },
];

export default function LangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch">
      {langs.map((l) => (
        <button
          key={l.id}
          type="button"
          className={lang === l.id ? 'active' : ''}
          onClick={() => setLang(l.id)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
