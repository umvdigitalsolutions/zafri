"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import slides from "./hero-slides";
import "./hero-carousel.css";

const ROTATION_INTERVAL = 5000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToVisibility(onChange) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getPageVisibility() {
  return document.visibilityState === "visible";
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSlideFocus, setHasSlideFocus] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const regionRef = useRef(null);
  const gestureRef = useRef(null);
  const prefersReducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => true);
  const isPageVisible = useSyncExternalStore(subscribeToVisibility, getPageVisibility, () => false);
  const canRotate = !prefersReducedMotion && !hasSlideFocus && isInView && isPageVisible;
  const slideCount = slides.length;

  useEffect(() => {
    const region = regionRef.current;
    if (!region || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.1);
    }, { threshold: [0, 0.1] });

    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canRotate || slideCount < 2) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex(index => (index + 1) % slideCount);
    }, ROTATION_INTERVAL);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, canRotate, slideCount]);

  function chooseSlide(index) {
    const nextIndex = (index + slideCount) % slideCount;
    setActiveIndex(nextIndex);
    setAnnouncement(`Slide ${nextIndex + 1} of ${slideCount}: ${slides[nextIndex].label}.`);
  }

  function moveSlide(direction) {
    chooseSlide(activeIndex + direction);
  }

  function handleKeyDown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target;
    if (target.isContentEditable || target.closest("input, textarea, select")) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextIndex = (activeIndex + direction + slideCount) % slideCount;
      regionRef.current?.querySelector(`button[aria-controls="hero-slide-${slides[nextIndex].id}"]`)?.focus({ preventScroll: true });
      chooseSlide(nextIndex);
    }
  }

  function handleTouchStart(event) {
    if (event.touches.length !== 1) {
      gestureRef.current = null;
      return;
    }

    const touch = event.touches[0];
    gestureRef.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || event.touches.length > 0) return;

    const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id);
    if (!touch) return;

    const distanceX = touch.clientX - gesture.x;
    const distanceY = touch.clientY - gesture.y;
    if (Math.abs(distanceX) >= 50 && Math.abs(distanceX) > Math.abs(distanceY) * 1.3) {
      moveSlide(distanceX < 0 ? 1 : -1);
    }
  }

  return (
    <section
      ref={regionRef}
      className="hero-carousel"
      aria-label="Discover Zafri"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      onFocusCapture={event => {
        // Keep a focused slide link visible; navigation controls remain available across slides.
        setHasSlideFocus(Boolean(event.target.closest(".hero-carousel-copy")));
      }}
      onBlurCapture={event => {
        if (!event.relatedTarget?.closest(".hero-carousel-copy")) setHasSlideFocus(false);
      }}
    >
      <div
        className="hero-carousel-visual"
        onTouchStart={handleTouchStart}
        onTouchMove={event => { if (event.touches.length !== 1) gestureRef.current = null; }}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { gestureRef.current = null; }}
      >
        {slides.map((slide, index) => (
          <Image
            key={slide.id}
            className={`hero-carousel-image${index === activeIndex ? " is-active" : ""}`}
            src={slide.image}
            alt={slide.alt}
            aria-hidden={index !== activeIndex}
            fill
            sizes="100vw"
            {...(index === 0 ? { preload: true } : { loading: "lazy" })}
          />
        ))}
        {slides.map((slide, index) => (
          <p
            key={slide.id}
            className={`hero-carousel-caption${index === activeIndex ? " is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            {slide.caption}
          </p>
        ))}
      </div>

      <div className="hero-carousel-content home-shell">
        <div className="hero-carousel-copy-grid">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div
                id={`hero-slide-${slide.id}`}
                key={slide.id}
                className={`hero-carousel-copy${isActive ? " is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slideCount}: ${slide.label}`}
                aria-hidden={!isActive}
                inert={!isActive}
              >
                <span className="hero-carousel-kicker">{slide.kicker}</span>
                <Heading className="hero-carousel-title"><span>{slide.title}</span>{" "}<em>{slide.accent}</em></Heading>
                <p className="hero-carousel-lead">{slide.lead}</p>
                <p className="hero-carousel-description">{slide.description}</p>
                <div className="hero-carousel-actions">
                  <Link href={slide.href} className="button button-green">{slide.cta}</Link>
                  <Link href={slide.secondaryHref} className="home-text-link">{slide.secondaryLabel}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hero-carousel-footer home-shell">
        <div className="hero-carousel-tabs" role="group" aria-label="Choose hero slide">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-pressed={index === activeIndex}
              aria-controls={`hero-slide-${slide.id}`}
              onClick={() => chooseSlide(index)}
            >
              <span>{slide.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="hero-carousel-announcement" aria-live="polite" aria-atomic="true">{announcement}</p>
    </section>
  );
}
