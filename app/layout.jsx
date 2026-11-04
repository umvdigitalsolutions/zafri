import { Geist } from "next/font/google";
import { brandDisplay } from "./fonts";
import "./globals.css";
import { Footer } from "./components/site";
import Header from "./components/Header";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata = {
  title: { default: "Zafri — Tradition. Taste. Timeless.", template: "%s | Zafri" },
  icons: { icon: "/brand-icon.svg" },
  description: "Discover Zafri’s story, rooted in Jodhpur since 1980. Explore our heritage, carefully selected ingredients, craftsmanship and product collection.",
};
export default function RootLayout({ children }) {
  return <html lang="en" className={`${geist.variable} ${brandDisplay.variable}`}><body><a href="#main-content" className="skip-link">Skip to content</a><Header />{children}<Footer /></body></html>;
}
