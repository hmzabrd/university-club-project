import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { siteText } from "./data/siteText";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ReadingProgress from "./components/ReadingProgress";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import EventDetail from "./pages/EventDetail";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import "./App.css";

function getInitialLang() {
  const saved = localStorage.getItem("cik-lang");
  if (saved) return saved;
  const nav = navigator.language || navigator.userLanguage || "";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("en")) return "en";
  return "ar";
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
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
    localStorage.setItem("cik-lang", lang);
  }, [lang, theme]);

  const pageProps = { lang, text };

  return (
    <BrowserRouter>
      <ReadingProgress />
      <ScrollProgress />
      <ScrollToTop />
      <Header lang={lang} setLang={setLang} text={text} theme={theme} setTheme={setTheme} />
      <BackToTop />
      <Routes>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/about" element={<About {...pageProps} />} />
        <Route path="/activities" element={<Activities {...pageProps} />} />
        <Route path="/activities/:id" element={<EventDetail {...pageProps} />} />
        <Route path="/team" element={<Team {...pageProps} />} />
        <Route path="/gallery" element={<Gallery {...pageProps} />} />
        <Route path="/join" element={<Join {...pageProps} />} />
        <Route path="*" element={<NotFound {...pageProps} />} />
      </Routes>
      <Footer text={text} />
    </BrowserRouter>
  );
}
