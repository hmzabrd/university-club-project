import { useEffect, useRef } from "react";
import { fallbackImg } from "../utils/lang";

export default function Lightbox({ src, alt, onClose, onPrev, onNext }) {
  const touchX = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  function handleTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && onNext) onNext();
      if (diff > 0 && onPrev) onPrev();
    }
    touchX.current = null;
  }

  return (
    <div className="lightbox-overlay" onClick={onClose} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <img src={src} alt={alt} className="lightbox-img" onError={fallbackImg} />
      {onPrev && <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>}
      {onNext && <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>}
    </div>
  );
}
