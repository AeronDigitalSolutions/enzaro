import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
};

const featureTiles = [
  {
    title: "Timeless Craft",
    description: "Crafted with heritage and innovation, our perfumes embody elegance.",
    image: "/images/products/product-10.jpeg",
  },
  {
    title: "Distinctive Blends",
    description: "Unique aromas designed to inspire memories and lasting beauty.",
    image: "/images/products/product-11.jpeg",
  },
  {
    title: "Elegant Experience",
    description: "Refined details ensure every scent elevates daily life beautifully.",
    image: "/images/products/product-12.jpeg",
  },
  {
    title: "Lasting Impressions",
    description: "Fragrances created to evoke emotion and remain unforgettable.",
    image: "/images/products/product-13.jpeg",
  },
];

const history = [
  {
    title: "Timeless Beginnings",
    year: "1985",
    description:
      "ENZARO was founded, creating timeless perfumes blending elegance, artistry, and lasting heritage.",
    image: "/images/products/product-14.jpeg",
  },
  {
    title: "Global Expansion",
    year: "2008",
    description:
      "Fragrances expanded globally, inspiring diverse cultures with elegance, creativity, and artistry.",
    image: "/images/products/product-15.jpeg",
  },
  {
    title: "Modern Innovation",
    year: "2020",
    description:
      "Sustainable perfumes launched, blending heritage traditions with artistry, elegance, and modern creativity.",
    image: "/images/products/product-16.jpeg",
  },
];

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.overline}>About Us</p>
            <h1 className={styles.heroTitle}>
              About <span>Us.</span>
            </h1>
            <p className={styles.heroLead}>
              ENZARO creates timeless perfumes blending tradition and modernity through fragrances designed to elevate everyday
              moments with lasting beauty.
            </p>
            <p className={styles.breadcrumb}>HOME / ABOUT US</p>
          </div>
          <div className={styles.heroVisual}>
            <Image src="/images/products/product-17.jpeg" alt="Woman applying perfume" fill sizes="(max-width: 900px) 100vw, 44vw" className={styles.imageCover} />
          </div>
        </div>
      </section>

      <section className={styles.signatureSection}>
        <div className={`container ${styles.signatureGrid}`}>
          <div className={styles.signatureMainImage}>
            <Image src="/images/products/product-18.jpeg" alt="Signature ENZARO portrait" fill sizes="(max-width: 900px) 100vw, 40vw" className={styles.imageCover} />
          </div>

          <div className={styles.signatureContent}>
            <div className={styles.signatureTopRow}>
              <div className={styles.signatureMiniImage}>
                <Image src="/images/products/product-19.jpeg" alt="Perfume bottle close-up" fill sizes="(max-width: 900px) 50vw, 20vw" className={styles.imageCover} />
              </div>
              <div className={styles.signatureMiniImage}>
                <Image src="/images/products/product-20.jpeg" alt="Luxury fragrance textures" fill sizes="(max-width: 900px) 50vw, 20vw" className={styles.imageCover} />
              </div>
            </div>

            <p className={styles.overline}>About ENZARO</p>
            <h2 className={styles.sectionTitle}>
              Creating signature ENZARO scents that define <span>your true essence.</span>
            </h2>

            <div className={styles.twoColText}>
              <p>
                Our perfumes are crafted to awaken emotions, capture memories, and enhance your unique identity every day.
              </p>
              <p>
                With a passion for excellence, we bring true elegance, artistry, and timeless beauty into every bottle.
              </p>
            </div>

            <button className={styles.ghostBtn}>Know Us More</button>
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={`container ${styles.whyGrid}`}>
          <div className={styles.whyContent}>
            <p className={styles.overline}>Why Choose Us</p>
            <h2 className={styles.sectionTitle}>
              Experience fragrances crafted <span>with passion.</span>
            </h2>
            <p className={styles.copy}>
              We craft timeless perfumes that combine creativity, heritage, and innovation, elegance, confidence, and
              unforgettable memories every day.
            </p>

            <div className={styles.statCard}>
              <div className={styles.avatarGroup}>
                <span>A</span>
                <span>E</span>
                <span>N</span>
                <span>Z</span>
              </div>
              <h3>800,000+</h3>
              <p className={styles.statLabel}>Happy Customers</p>
              <p>More than 800K people enjoy ENZARO perfumes, elevating daily life with elegance and confidence.</p>
            </div>
          </div>

          <div className={styles.tilesGrid}>
            {featureTiles.map((tile) => (
              <article key={tile.title} className={styles.tile}>
                <Image src={tile.image} alt={tile.title} fill sizes="(max-width: 900px) 100vw, 28vw" className={styles.imageCover} />
                <div className={styles.tileOverlay}>
                  <h3>{tile.title}</h3>
                  <p>{tile.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.historySection}>
        <div className="container">
          <p className={`${styles.overline} ${styles.center}`}>Our History</p>
          <h2 className={`${styles.sectionTitle} ${styles.centerTitle}`}>
            Discover our fragrance journey <span>through time.</span>
          </h2>

          <div className={styles.timelineGrid}>
            {history.map((item) => (
              <article key={item.year} className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <h3>{item.title}</h3>
                  <span>{item.year}</span>
                </div>
                <p>{item.description}</p>
                <div className={styles.timelineImage}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 28vw" className={styles.imageCover} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
