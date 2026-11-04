import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../components/site";
import ProductCollection from "./product-collection";
import "./products.css";

export const metadata = {
  title: "Our products",
  description: "Explore Zafri Pan Masala and view the packaging references in the domestic and export catalogue.",
};

const questions = [
  { question: "What do the market labels mean?", answer: "Domestic and Export follow the categories in Zafri’s original product catalogue. These labels describe how the products were listed; they do not confirm current availability in a particular country." },
  { question: "Where can I find current packaging information?", answer: "The product viewer shows the original packaging images available to us. For current product specifications and pack formats, contact the company’s office in Jodhpur." },
];

export default function Products() {
  return <main id="main-content" className="products-page">
    <section className="products-hero products-wrap" aria-labelledby="products-title"><div className="products-hero-copy"><nav className="products-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Our products</span></nav><span className="products-kicker">THE ZAFRI COLLECTION</span><h1 id="products-title">A familiar name.<br /><em>A signature presence.</em></h1><p>Explore Zafri Pan Masala and browse the packaging references in our domestic and export catalogue.</p><a href="#collection" className="products-hero-link">View the range <span aria-hidden="true">↓</span></a></div><figure className="products-hero-photo"><Image src="/images/editorial/zafri-editorial-hero.webp" alt="AI-created still life of Zafri Pan Masala with cardamom, saffron and a rose" fill sizes="(max-width: 760px) 88vw, 49vw" priority /><figcaption>ZAFRI PAN MASALA</figcaption></figure></section>

    <ProductCollection />

    <section className="products-information"><div className="products-wrap products-information-layout"><div><span className="products-kicker">PRODUCT INFORMATION</span><h2>A few details,<br /><em>before you explore.</em></h2><p>About the catalogue, market labels and packaging images.</p></div><div>{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

    <section className="products-craft products-wrap"><span className="products-kicker">BEHIND THE BLEND</span><Link href="/making"><span>Get to know <em>the ingredients.</em></span><Arrow /></Link></section>
  </main>;
}
