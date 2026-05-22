export default function ThemeToggle({ theme, setTheme, label }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
