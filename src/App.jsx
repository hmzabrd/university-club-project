import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { siteText } from "./data/siteText";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import EventDetail from "./pages/EventDetail";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import "./App.css";

// Scrolls to top every time you navigate to a new page
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("cik-theme") || "light",
  );
  const text = siteText[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = lang === "ar" ? "lang-ar" : "lang-latin";
    localStorage.setItem("cik-theme", theme);
  }, [lang, theme]);

  const pageProps = { lang, text };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header
        lang={lang}
        setLang={setLang}
        text={text}
        theme={theme}
        setTheme={setTheme}
      />
      <Routes>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/about" element={<About {...pageProps} />} />
        <Route path="/activities" element={<Activities {...pageProps} />} />
        <Route
          path="/activities/:id"
          element={<EventDetail {...pageProps} />}
        />
        <Route path="/team" element={<Team {...pageProps} />} />
        <Route path="/gallery" element={<Gallery {...pageProps} />} />
        <Route path="/join" element={<Join {...pageProps} />} />
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound {...pageProps} />} />
      </Routes>
      <Footer text={text} />
    </BrowserRouter>
  );
}
