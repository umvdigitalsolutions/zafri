"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./brand-film.css";

const watchUrl = "https://www.youtube.com/watch?v=XduIzW4KU6o";
const embedUrl = "https://www.youtube.com/embed/XduIzW4KU6o?si=jucGyfKHraScIuMS&autoplay=1&rel=0&playsinline=1&controls=1";

export default function BrandFilm() {
  const [status, setStatus] = useState("idle");
  const [attempt, setAttempt] = useState(0);
  const playButtonRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const playing = status !== "idle";

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("stalled"), 10000);
    return () => window.clearTimeout(timeout);
  }, [status, attempt]);

  useEffect(() => {
    if (status === "idle" && restoreFocusRef.current) {
      playButtonRef.current?.focus({ preventScroll: true });
      restoreFocusRef.current = false;
    }
  }, [status]);

  function openVideo() {
    setAttempt((current) => current + 1);
    setStatus("loading");
  }

  function closeVideo() {
    restoreFocusRef.current = true;
    setStatus("idle");
  }

  return (
    <div className="brand-film">
      <div className="brand-film-stage" aria-busy={status === "loading"}>
        <Image
          src="/images/media/zafri-film-cover.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 760px) 88vw, (max-width: 1400px) 53vw, 780px"
          className="brand-film-poster"
        />
        {playing ? (
          <>
            <iframe
              key={attempt}
              src={embedUrl}
              title="Zafri Pan Masala television commercial"
              width="1280"
              height="720"
              className={`brand-film-frame${status === "ready" ? " is-ready" : ""}`}
              tabIndex={status === "ready" ? 0 : -1}
              aria-hidden={status !== "ready"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("stalled")}
            />
            {status === "loading" && (
              <div className="brand-film-message">
                <p role="status">Opening the commercial…</p>
              </div>
            )}
            {status === "stalled" && (
              <div className="brand-film-message">
                <p role="status">Having trouble loading?</p>
                <span>Try again or watch on YouTube below.</span>
                <button type="button" className="brand-film-retry" onClick={openVideo}>
                  Try again
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            ref={playButtonRef}
            className="brand-film-play"
            type="button"
            onClick={openVideo}
            aria-label="Watch Zafri television commercial"
          >
            <span className="brand-film-cover-kicker">TELEVISION COMMERCIAL</span>
            <span className="brand-film-cover-title">The Zafri film</span>
            <span className="brand-film-play-label">
              <svg viewBox="0 0 16 18" width="13" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M2 1.5 14 9 2 16.5Z" /></svg>
              <span>Watch the commercial</span>
            </span>
          </button>
        )}
      </div>
      <div className="brand-film-toolbar">
        <span className="brand-film-caption">Zafri television commercial</span>
        <div className="brand-film-actions">
          {playing && <button type="button" onClick={closeVideo}>Close video <span aria-hidden="true">×</span></button>}
          <a href={watchUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>
        </div>
      </div>
    </div>
  );
}
