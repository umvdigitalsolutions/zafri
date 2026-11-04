"use client";

import Link from "next/link";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Brand() {
  return <Link className="brand" href="/" aria-label="Zafri home"><span className="brand-word">Zafri</span><span className="brand-caption">A TRADITION OF EXCELLENCE</span></Link>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-top"><div><Brand /><p>G.K. Tobacco Industries</p></div><div className="footer-links"><span>EXPLORE</span><Link href="/about">Our story</Link><Link href="/products">Our products</Link><Link href="/making">The craftsmanship</Link></div><div className="footer-links"><span>CONNECT</span><Link href="/contact">Contact us</Link><Link href="/career">Careers</Link><a href="tel:+912912740713">+91 291 274 0713</a></div><div className="footer-address"><span>FROM THE HEART OF RAJASTHAN</span><p>29, Industrial Area, Basni<br />Opposite Diesel Shed<br />Jodhpur, Rajasthan, India</p></div></div><div className="footer-bottom"><span>© 2026 Zafri. All rights reserved.</span></div><p className="health-note">Pan masala is injurious to health. For adults only.</p></footer>;
}

export function SectionLabel({ children, light = false }) {
  return <div className={`eyebrow${light ? " light" : ""}`}>{children}</div>;
}

export function ContactBanner() {
  return <section className="contact-banner"><div><SectionLabel light>LET’S START A CONVERSATION</SectionLabel><h2>Good things begin<br />with a connection.</h2><p>For product information, distribution, exports or a general enquiry, connect with our team in Jodhpur.</p></div><Link className="button button-cream" href="/contact">Connect with us <Arrow /></Link></section>;
}
