import { useState, useEffect } from "react";
import { smoothScrollToTop } from "../utils/lang";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible ? (
    <button className="back-to-top" onClick={smoothScrollToTop} aria-label="Back to top">↑</button>
  ) : null;
}
