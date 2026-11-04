"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./site";
import "./header.css";

const links = [
  { href: "/", label: "Home", description: "Welcome to Zafri" },
  { href: "/about", label: "Our story", description: "People, purpose & heritage" },
  { href: "/products", label: "Our products", description: "Explore the collection" },
  { href: "/making", label: "Craftsmanship", description: "The detail behind the blend" },
  { href: "/career", label: "Careers", description: "Grow with our team" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const wideScreen = window.matchMedia("(min-width: 1061px)");
    const closeOnDesktop = (event) => { if (event.matches) setOpen(false); };
    wideScreen.addEventListener("change", closeOnDesktop);
    return () => {
      wideScreen.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      dialog.close();
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="z-header">
        <div className="z-header-main z-header-container">
          <Link className="z-header-brand" href="/" aria-label="Zafri home"><span>Zafri</span><small>EST. 1980</small></Link>
          <nav className="z-header-navigation" aria-label="Main navigation">{links.map(link => <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
          <Link className="z-header-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Get in touch</Link>
          <button ref={toggleRef} className="z-header-menu-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="z-mobile-navigation"><span>Menu</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.4"/></svg></button>
        </div>
      </header>
      <dialog id="z-mobile-navigation" ref={dialogRef} className="z-header-dialog" aria-labelledby="z-menu-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="z-header-dialog-top"><div onClick={() => setOpen(false)}><Brand /></div><button className="z-header-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu"><span>Close</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.3"/></svg></button></div>
        <div className="z-header-dialog-content"><p id="z-menu-title" className="z-header-menu-title">DISCOVER THE WORLD OF ZAFRI</p><nav aria-label="Mobile navigation">{links.map(link => <Link href={link.href} key={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}><span className="z-header-menu-link"><span>{link.label}</span><small>{link.description}</small></span></Link>)}</nav><Link className="z-header-menu-contact" href="/contact" onClick={() => setOpen(false)}>Let’s start a conversation</Link><div className="z-header-menu-footer"><div><span>JODHPUR, RAJASTHAN<br />A LEGACY SINCE 1980</span></div><a href="tel:+912912740713">Call our team</a></div></div>
      </dialog>
    </>
  );
}
