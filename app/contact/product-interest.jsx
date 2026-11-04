"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./product-interest.css";

const supportedInterest = "Zafri Pan Masala";

export default function ProductInterest() {
  const searchParams = useSearchParams();

  if (searchParams.get("interest") !== supportedInterest) return null;

  return (
    <aside className="contact-product-interest" aria-label="Product enquiry context">
      <div>
        <span>Product enquiry</span>
        <strong>{supportedInterest}</strong>
      </div>
      <Link href="/contact">Clear selection <span aria-hidden="true">×</span></Link>
    </aside>
  );
}
