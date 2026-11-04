import Image from "next/image";
import Link from "next/link";
import SectionNavigation from "./section-navigation";
import "./about.css";

export const metadata = {
  title: "Our story",
  description: "The company behind Zafri: explore the history of G.K. Tobacco Industries, meet founder Gopi Kishan Malani and learn about its community association.",
};

const milestones = [
  {
    year: "1980",
    title: "The first chapter",
    text: "The business is established as Dinesh Industries, the original identity of the company behind Zafri.",
  },
  {
    year: "2013",
    title: "A new name, a continuing story",
    text: "Dinesh Industries becomes G.K. Tobacco Industries, marking the next chapter in the company’s history.",
  },
];

function Arrow({ down = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {down ? <path d="M12 4v16m-6-6 6 6 6-6" /> : <path d="M5 19 19 5M5 5h14v14" />}
    </svg>
  );
}

export default function About() {
  return (
    <main id="main-content" className="story-page">
      <section className="story-opening story-shell" aria-labelledby="story-title">
        <div className="story-opening-topline">
          <nav className="story-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Our story</span>
          </nav>
          <span className="story-overline">ESTABLISHED 1980</span>
        </div>
        <div className="story-masthead">
          <div>
            <span className="story-overline">THE COMPANY BEHIND ZAFRI</span>
            <h1 id="story-title">Our <em>story.</em></h1>
          </div>
          <div className="story-opening-intro">
            <p>A company, its people, and the place it calls home. Get to know G.K. Tobacco Industries, from its beginnings to the perspective of its founder.</p>
            <a className="story-text-link" href="#md-message">Meet our Managing Director <Arrow down /></a>
          </div>
        </div>
        <figure className="story-city">
          <div className="story-city-image">
            <Image
              src="/images/editorial/jodhpur-editorial.webp"
              alt="An AI-created editorial view of Jodhpur’s blue city beneath Mehrangarh Fort at sunset"
              fill
              sizes="(min-width: 1500px) 1320px, 88vw"
              preload
            />
          </div>
          <figcaption><span>JODHPUR, RAJASTHAN</span><span>A sense of place. A company’s home.</span></figcaption>
        </figure>
      </section>

      <SectionNavigation />

      <section id="company" className="story-company story-shell" aria-labelledby="company-heading">
        <div className="story-company-intro">
          <div>
            <span className="story-overline">01 / THE COMPANY</span>
            <h2 id="company-heading">The name<br />behind Zafri.</h2>
          </div>
          <div className="story-company-copy">
            <p className="story-lead">G.K. Tobacco Industries is a company based in Basni, Jodhpur, Rajasthan.</p>
            <p>Its work brings together product development, manufacturing and packaging. Known earlier as Dinesh Industries, the business is the company behind the Zafri name and its domestic and export product catalogue.</p>
          </div>
        </div>
        <section id="journey" className="story-archive" aria-labelledby="journey-heading">
          <figure className="story-premises">
            <Image
              src="/images/aboutimg.jpg"
              alt="G.K. Tobacco Industries’ premises, with the company building and courtyard"
              width={678}
              height={300}
              sizes="(max-width: 760px) 88vw, (min-width: 1500px) 678px, 47vw"
            />
            <figcaption><span>G.K. Tobacco Industries</span><span>Basni, Jodhpur</span></figcaption>
            <p className="story-archive-note">Our company’s history connects two names, with a beginning that dates back to 1980.</p>
          </figure>
          <div className="story-chronology">
            <h3 id="journey-heading" className="story-overline">02 / OUR JOURNEY</h3>
            <ol>{milestones.map(milestone => (
              <li key={milestone.year}>
                <span className="story-year">{milestone.year}</span>
                <div><h4>{milestone.title}</h4><p>{milestone.text}</p></div>
              </li>
            ))}</ol>
            <a className="story-archive-source" href="http://zafri.org/history.html" target="_blank" rel="noreferrer">From the company history <Arrow /></a>
          </div>
        </section>
      </section>

      <section id="md-message" className="story-founder" aria-labelledby="md-heading">
        <div className="story-shell">
          <div className="story-founder-heading">
            <span className="story-overline">03 / LEADERSHIP</span>
            <h2 id="md-heading">A message from our Managing Director.</h2>
          </div>
          <div className="story-founder-layout">
            <figure className="story-portrait">
              <Image
                src="/images/userimg.jpg"
                alt="Mr. Gopi Kishan Malani"
                width={853}
                height={1280}
                sizes="(max-width: 760px) 128px, (max-width: 1050px) 31vw, 340px"
              />
              <figcaption><span>Mr. Gopi Kishan Malani</span><small>Founder &amp; Managing Director</small></figcaption>
            </figure>
            <div className="story-letter">
              <blockquote><p>“Apke Swaad Se<br />Waakif Hain Hum”</p></blockquote>
              <div className="story-letter-body">
                <p>Our work begins with an understanding of the people we serve. As preferences and expectations change, we seek to respond through product development and presentation that reflect those changing tastes.</p>
                <p>Zafri’s outlook brings an Indian perspective to an international ambition. Our vision is to build a recognisable identity across markets, remaining attentive to the people and preferences behind that journey.</p>
              </div>
              <div className="story-letter-signoff"><span>Gopi Kishan Malani</span><small>G.K. TOBACCO INDUSTRIES</small></div>
              <p className="story-letter-source">Message adapted from the Managing Director’s published address. <a href="http://zafri.org/about.html" target="_blank" rel="noreferrer">Read the original <span aria-hidden="true">↗</span></a></p>
            </div>
          </div>
        </div>
      </section>

      <section id="responsibility" className="story-community story-shell" aria-labelledby="community-heading">
        <div className="story-community-heading">
          <div><span className="story-overline">04 / IN THE COMMUNITY</span><h2 id="community-heading">Beyond the business.</h2></div>
          <p>The company’s community story includes an association with Ajneshwar Ashram Gaushala, reflecting an interest in animal welfare and the role of animal husbandry in rural livelihoods.</p>
        </div>
        <figure className="story-community-feature">
          <Image
            src="/images/csrimg.jpg"
            alt="A company visit to Ajneshwar Ashram Gaushala, with visitors and a caretaker beside the cattle"
            width={752}
            height={300}
            sizes="(max-width: 760px) 88vw, 752px"
          />
          <figcaption>
            <span className="story-overline">A COMMUNITY ASSOCIATION</span>
            <h3>Ajneshwar Ashram<br />Gaushala</h3>
            <p>A moment from the company’s community account, documenting its connection with the Gaushala and the people involved in its work.</p>
          </figcaption>
        </figure>
      </section>

      <section className="story-closing" aria-labelledby="connect-heading">
        <div className="story-shell story-closing-inner">
          <div><span className="story-overline">CONTINUE THE CONVERSATION</span><h2 id="connect-heading">Connect with our team.</h2></div>
          <Link href="/contact" className="story-contact-link">Get in touch <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
