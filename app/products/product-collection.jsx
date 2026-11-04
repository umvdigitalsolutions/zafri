"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  { id: "zafri-pan-masala", name: "Zafri Pan Masala", market: "Domestic", type: "Pan masala", image: "zafari_img.png", width: 424, height: 362, description: "The domestic pan masala offering, shown in the original golden Zafri sachet.", detail: "The catalogue identifies this as the domestic Pan Masala product. This viewer presents its original packaging image; pack weights and current formats are not specified here.", canEnquire: true },
  { id: "zafri-gutkha", name: "Zafri Gutkha", market: "Export", type: "Gutkha · tobacco product", image: "zafarigutkaimg.jpg", width: 250, height: 193, description: "The Zafri-branded gutkha entry listed in the export catalogue.", detail: "This packaging reference is labelled “For Export Only” in the original image. It is shown here as a catalogue record.", canEnquire: false },
  { id: "z-gold", name: "Z Gold", market: "Export", type: "Gutkha · tobacco product", image: "zafarigutkaimg2.jpg", width: 250, height: 188, description: "The Z Gold entry from the company’s export product references.", detail: "The original pack identifies the product as Z Gold Gutkha and carries a “For Export Only” label. It is shown here as a catalogue record.", canEnquire: false },
];
const filters = ["All products", "Domestic", "Export"];

export default function ProductCollection() {
  const [filter, setFilter] = useState("All products");
  const [selectedId, setSelectedId] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const isOpen = selectedId !== null;
  const visible = products.filter(product => filter === "All products" || product.market === filter);
  const selected = products.find(product => product.id === selectedId);
  const selectedIndex = visible.findIndex(product => product.id === selectedId);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
      trigger?.focus();
    };
  }, [isOpen]);

  function openProduct(product, event) {
    triggerRef.current = event.currentTarget;
    setSelectedId(product.id);
  }

  function moveProduct(direction) {
    if (visible.length < 2) return;
    setSelectedId(visible[(selectedIndex + direction + visible.length) % visible.length].id);
  }

  function handleViewerKeys(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveProduct(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveProduct(1); }
  }

  return <section id="collection" className="catalogue products-wrap" aria-labelledby="collection-heading">
    <div className="catalogue-heading"><div><span className="products-kicker">THE PRODUCT INDEX</span><h2 id="collection-heading">Explore <em>the range.</em></h2></div><p>Select a market, then open a product to inspect its packaging.</p></div>
    <div className="catalogue-controls"><div className="catalogue-filters" role="group" aria-label="Filter products">{filters.map(value => <button type="button" key={value} onClick={() => setFilter(value)} aria-pressed={filter === value} aria-controls="catalogue-results">{value}<span>{String(value === "All products" ? products.length : products.filter(product => product.market === value).length).padStart(2, "0")}</span></button>)}</div><span className="catalogue-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "product" : "products"}</span></div>
    <div id="catalogue-results" className={`catalogue-grid${visible.length === 1 ? " is-single" : ""}`} data-count={visible.length}>{visible.map(product => <article className="catalogue-card" key={product.id}><button type="button" className="catalogue-image-button" onClick={event => openProduct(product, event)} aria-label={`View packaging for ${product.name}`}><span className="catalogue-market">{product.market}</span><Image className={product.market === "Export" ? "catalogue-pack is-reference" : "catalogue-pack"} src={`/images/${product.image}`} alt={`${product.name} packaging`} width={product.width} height={product.height} sizes={product.market === "Export" ? "250px" : "(max-width: 760px) 75vw, 340px"} /><span className="catalogue-inspect">View packaging <span aria-hidden="true">↗</span></span></button><div className="catalogue-card-copy"><span className="catalogue-type">{product.type}</span><h3>{product.name}</h3><p>{product.description}</p></div></article>)}</div>
    <div className="catalogue-note"><p>Range and packaging references follow the <a href="http://zafri.org/product.html" target="_blank" rel="noreferrer">original Zafri catalogue ↗</a>. Confirm current product information with the company.</p><p>Pan masala is injurious to health. Tobacco products are injurious to health. For adults only.</p></div>

    <dialog ref={dialogRef} className="product-viewer" aria-labelledby="product-detail-title" onCancel={() => setSelectedId(null)} onClose={() => setSelectedId(null)} onKeyDown={handleViewerKeys} onClick={event => { if (event.target === event.currentTarget) setSelectedId(null); }}>
      {selected && <div className="product-viewer-inner"><div className="product-viewer-top"><span>PACKAGING REFERENCE</span><button className="product-viewer-close" type="button" aria-label="Close product details" onClick={() => setSelectedId(null)}>Close <span aria-hidden="true">×</span></button></div><div className="product-viewer-layout"><div className="product-viewer-image"><Image src={`/images/${selected.image}`} alt={`${selected.name} original packaging`} width={selected.width} height={selected.height} sizes={selected.market === "Export" ? "250px" : "400px"} className={selected.market === "Export" ? "is-reference" : ""} /></div><div className="product-viewer-copy" aria-live="polite"><span className="products-kicker">{selected.market} catalogue</span><h2 id="product-detail-title">{selected.name}</h2><p>{selected.detail}</p><dl><div><dt>Product type</dt><dd>{selected.type}</dd></div><div><dt>Listed market</dt><dd>{selected.market}</dd></div></dl>{selected.canEnquire && <><details className="product-origins"><summary>Ingredient origins <span aria-hidden="true">+</span></summary><p>Cardamom from Kerala, saffron from Kashmir and betel nuts from Assam are among the ingredients described in Zafri’s sourcing story.</p><Link href="/making">Read the ingredient story ↗</Link></details><Link className="product-enquiry" href="/contact?interest=Zafri%20Pan%20Masala" onClick={() => setSelectedId(null)}>Enquire about Zafri Pan Masala <span aria-hidden="true">↗</span></Link></>}<p className="product-viewer-health">{selected.canEnquire ? "Pan masala is injurious to health." : "Tobacco products are injurious to health."}</p></div></div><div className="product-viewer-bottom"><button type="button" onClick={() => moveProduct(-1)} disabled={visible.length < 2}><span aria-hidden="true">←</span> Previous</button><span>{String(selectedIndex + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span><button type="button" onClick={() => moveProduct(1)} disabled={visible.length < 2}>Next <span aria-hidden="true">→</span></button></div></div>}
    </dialog>
  </section>;
}
