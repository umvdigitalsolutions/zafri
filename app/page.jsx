import Link from "next/link";
import Image from "next/image";
import BrandFilm from "./components/brand-film";
import HeroCarousel from "./components/hero-carousel";
import "./home.css";

const ingredients = [
  { name: "Cardamom", origin: "Kerala", image: "cardamom", description: "The green pods contribute fragrance and aromatic depth, and are one of the defining ingredients in the company’s sourcing story." },
  { name: "Saffron", origin: "Kashmir", image: "saffron", description: "Also known as kesar, its fine crimson threads contribute colour and fragrance to the ingredient collection." },
  { name: "Betel nut", origin: "Assam", image: "betel-nut", description: "A core ingredient in the blend. Selection and examination form part of the preparation process described by the company." },
];

const pathways = [
  { href: "#brand-film", title: "Zafri on screen", shortTitle: "The film", description: "Watch the television commercial" },
  { href: "#ingredients", title: "The ingredients", shortTitle: "Ingredients", description: "A closer look at their origins" },
  { href: "#contact", title: "Talk to our team", shortTitle: "Contact", description: "Company information & enquiries" },
];

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <HeroCarousel />

      <nav className="home-pathways home-shell" aria-label="Explore this page">
        {pathways.map(pathway => (
          <a href={pathway.href} key={pathway.href}>
            <span><strong><span className="home-pathway-long">{pathway.title}</span><span className="home-pathway-short">{pathway.shortTitle}</span></strong><small>{pathway.description}</small></span>
          </a>
        ))}
      </nav>

      <section id="brand-film" className="home-film home-shell" aria-labelledby="film-heading">
        <div className="home-film-layout">
          <div className="home-film-copy">
            <span className="home-overline">THE BRAND FILM</span>
            <h2 id="film-heading">The story<br /> on screen.</h2>
            <p>Watch the television commercial and discover Zafri’s on-screen identity.</p>
          </div>
          <BrandFilm />
        </div>
      </section>

      <section id="ingredients" className="home-ingredients" aria-labelledby="ingredients-heading">
        <div className="home-shell">
          <div className="home-section-heading">
            <div><span className="home-overline">INGREDIENT ORIGINS</span><h2 id="ingredients-heading">The ingredient story.</h2></div>
            <Link href="/making" className="home-text-link">Explore the full guide</Link>
          </div>
          <p className="home-ingredients-intro">Alongside cardamom and saffron, the company’s making story describes catechu and an aromatic profile that includes kewra, rose water and sandalwood oil. The full guide brings these ingredient groups together with their origins and individual roles in the blend.</p>
          <div className="home-ingredient-grid">
            {ingredients.map(ingredient => (
              <article className="home-ingredient" key={ingredient.image}>
                <div className="home-ingredient-image">
                  <Image
                    src={`/images/ingredients/${ingredient.image}.webp`}
                    alt={`AI-created ingredient photograph of ${ingredient.name.toLowerCase()}`}
                    width={1536}
                    height={1024}
                    sizes={ingredient.image === "cardamom" ? "(max-width: 760px) 88vw, (min-width: 1500px) 420px, 28vw" : "(max-width: 760px) 42vw, (min-width: 1500px) 420px, 28vw"}
                  />
                </div>
                <div className="home-ingredient-copy">
                  <div className="home-ingredient-title"><h3>{ingredient.name}</h3><span>{ingredient.origin}</span></div>
                  <p>{ingredient.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-company home-shell" aria-labelledby="company-heading">
        <figure className="home-company-photo">
          <div className="home-company-image">
            <Image
              src="/images/aboutimg.jpg"
              alt="G.K. Tobacco Industries’ original premises photograph, showing the building and courtyard"
              fill
              sizes="(max-width: 760px) 88vw, (min-width: 1500px) 660px, 44vw"
            />
          </div>
          <figcaption>COMPANY PREMISES · BASNI, JODHPUR</figcaption>
        </figure>
        <div className="home-company-copy">
          <span className="home-overline">THE COMPANY BEHIND ZAFRI</span>
          <h2 id="company-heading">People, place<br />&amp; perspective.</h2>
          <p>Meet founder and Managing Director Mr. Gopi Kishan Malani, and read the perspective behind G.K. Tobacco Industries. The company profile brings its leadership’s message together with its history and the people who shaped it.</p>
          <p>Beyond the business, its community account records an association with Ajneshwar Ashram Gaushala and an interest in animal welfare and rural livelihoods.</p>
          <Link href="/about" className="home-text-link">Get to know the company</Link>
        </div>
      </section>

      <section id="contact" className="home-contact" aria-labelledby="contact-heading">
        <div className="home-shell home-contact-layout">
          <div>
            <span className="home-overline">OUR OFFICE · JODHPUR</span>
            <h2 id="contact-heading">A direct connection<br />to our team.</h2>
            <p>Our office is at 29, Industrial Area, Basni, opposite Diesel Shed, Jodhpur, Rajasthan. Contact the team for company information, product details, careers and general enquiries, or visit the Contact page for telephone numbers and directions.</p>
          </div>
          <div className="home-contact-actions">
            <Link href="/contact" className="button button-green">Get in touch</Link>
            <a href="tel:+912912740713" className="home-phone-link"><span>Call our office</span>+91 291 274 0713</a>
          </div>
        </div>
      </section>
    </main>
  );
}
