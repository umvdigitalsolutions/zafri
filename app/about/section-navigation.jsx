"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  ["company", "The company"],
  ["journey", "Our journey"],
  ["md-message", "MD’s message"],
  ["responsibility", "Community"],
];

export default function SectionNavigation() {
  const [active, setActive] = useState("company");
  const navigationRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const navigationHeight = navigationRef.current?.offsetHeight ?? 0;
      const readingLine = Math.max(
        navigationHeight + 24,
        Math.min(180, window.innerHeight * 0.22),
      );
      let current = sections[0][0];

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= readingLine) {
          current = element.id;
        }
      }

      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    // Recheck section positions during scrolling and after content changes size.
    const observer = new ResizeObserver(scheduleUpdate);
    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const container = linksRef.current;
    const selected = container?.querySelector('[aria-current="location"]');
    if (!container || !selected) return;

    const bounds = container.getBoundingClientRect();
    const linkBounds = selected.getBoundingClientRect();
    const offset = linkBounds.left < bounds.left
      ? linkBounds.left - bounds.left
      : linkBounds.right > bounds.right
        ? linkBounds.right - bounds.right
        : 0;

    if (offset) {
      container.scrollBy({
        left: offset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [active]);

  return (
    <nav ref={navigationRef} className="story-chapters" aria-label="On this page">
      <div className="story-shell story-chapters-inner">
        <span className="story-chapters-label">IN THIS STORY</span>
        <div ref={linksRef} className="story-chapter-links">
          {sections.map(([id, label], index) => (
            <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>
              <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
