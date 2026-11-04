import Image from "next/image";
import { SectionLabel, ContactBanner } from "../components/site";

export const metadata = {
  title: "The craftsmanship",
  description: "Explore the ingredients behind Zafri: cardamom from Kerala, saffron from Kashmir, betel nuts from Assam, catechu and traditional aromatics.",
};

const ingredients = [
  { name: "Cardamom", region: "KERALA", image: "cardamom", role: "FRAGRANCE & AROMATIC DEPTH", paragraphs: ["Green cardamom from Kerala contributes fragrance and aromatic depth. Its pods are one of the defining ingredients described in Zafri’s sourcing story."] },
  { name: "Saffron", region: "KASHMIR", image: "saffron", role: "COLOUR & CHARACTER", paragraphs: ["Known as kesar, saffron is sourced from Kashmir. Its fine crimson threads contribute both colour and fragrance."] },
  { name: "Catechu", region: "THE HIMALAYAS", image: "catechu", role: "COLOUR & TASTE", paragraphs: ["Catechu contributes colour and taste. The company’s published sourcing story describes material obtained from matured plants in the Himalayan region."] },
  { name: "Betel nut", region: "ASSAM", image: "betel-nut", role: "A CORE INGREDIENT", paragraphs: ["Betel nuts are sourced from Assam. Selection and examination of the nuts form part of the preparation process described by the company."] },
  { name: "Traditional aromatics", region: "A JOURNEY OF FRAGRANCE", image: "traditional-aromatics", role: "THE BLEND’S AROMATIC PROFILE", paragraphs: ["Kewra, rose water and sandalwood oil complete the aromatic profile. The company’s sourcing story includes sandalwood oil from Kerala and roses of Iranian breed."] },
];

export default function Making() {
  return <main id="main-content"><section className="page-intro section-wrap"><SectionLabel>THE ZAFRI CRAFT</SectionLabel><h1>Character begins<br /><em>with the details.</em></h1><p>Explore the five ingredient groups featured in Zafri’s sourcing story, with their origins and individual roles in the product.</p></section><section className="making-list section-wrap">{ingredients.map((ingredient, index) => <article className="making-item" key={ingredient.image}><div className="making-photo"><Image src={`/images/ingredients/${ingredient.image}.webp`} alt={ingredient.name} width={1536} height={1024} sizes="(max-width: 760px) 88vw, 43vw" /></div><div><SectionLabel>{String(index + 1).padStart(2, "0")} / {ingredient.region}</SectionLabel><h2>{ingredient.name}</h2><span className="making-role">{ingredient.role}</span>{ingredient.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</section><ContactBanner /></main>;
}
