import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import StickyMediaController from "./StickyMediaController";
import ProductInteractivePanel from "./ProductInteractivePanel";
import { getProductBySlug } from "@/lib/services/products";
import styles from "./page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product",
    };
  }

  return {
    title: `${product.name} ${product.subtitle}`,
    description: product.description,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const variants: { sizeMl: number; price: number; mrp: number }[] = product.variants || [];
  const selectedVariant = variants.find((variant) => variant.sizeMl === 50) || variants[0] || { sizeMl: 50, price: 1699, mrp: 2600 };
  const formattedPrice = new Intl.NumberFormat("en-IN").format(selectedVariant.price);

  const testimonials = [
    {
      quote:
        "The blend quality is exceptional. It starts refined and develops beautifully for hours without turning flat.",
      author: "Rohan M.",
      city: "Mumbai",
    },
    {
      quote:
        "Packaging, scent character, and longevity all feel premium. This is now my everyday signature.",
      author: "Aarav S.",
      city: "Bengaluru",
    },
    {
      quote:
        "I get compliments every time I wear this. Balanced projection, classy dry down, and very wearable.",
      author: "Ishita K.",
      city: "Delhi",
    },
  ];

  const productFaqs = [
    {
      question: "How long does this fragrance last?",
      answer:
        "Most wearers report 8-12 hours depending on skin chemistry, weather, and spray count.",
    },
    {
      question: "Is this suitable for daily use?",
      answer:
        "Yes. Use fewer sprays for office/daytime and layer up for evening occasions.",
    },
    {
      question: "Do you offer returns on opened bottles?",
      answer:
        "Opened bottles are not returnable due to hygiene standards. Unopened products can be returned as per policy.",
    },
  ];

  return (
    <div className={styles.pageShell}>
      <section id="product-section" className={styles.productContainer}>
        <div className={`container ${styles.grid}`}>
          <div id="product-media-column" className={styles.mediaColumn}>
            <div id="product-media-spacer" className={styles.mediaSpacer} aria-hidden />
            <div id="product-media-sticky" className={styles.mediaSticky}>
              <div className={styles.thumbnailRail}>
                {product.gallery.map((image: string, index: number) => (
                  <div key={image} className={styles.thumbCard}>
                    <Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="120px" className={styles.thumbImage} />
                  </div>
                ))}
              </div>
              <div className={styles.imageWrapper}>
                <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 52vw" className={styles.image} />
              </div>
            </div>
          </div>

          <div id="product-details-column" className={styles.detailsColumn}>
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.crumb}>
                Home
              </Link>
              <span className={styles.slash}>/</span>
              <Link href="/shop" className={styles.crumb}>
                Shop
              </Link>
              <span className={styles.slash}>/</span>
              <span className={styles.current}>{product.name}</span>
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.ratingPill}>★ {product.reviewScore}</span>
              <span className={styles.reviewText}>({product.reviewCount} reviews)</span>
            </div>

            <ProductInteractivePanel
              name={product.name}
              subtitle={product.subtitle}
              variants={variants}
              description={product.description}
              tags={product.tags}
              couponText={product.couponText}
            />

            <div className={styles.infoGrid}>
              {product.specs.map((spec: { label: string; value: string }) => (
                <div key={spec.label} className={styles.infoCard}>
                  <p>{spec.label}</p>
                  <h4>{spec.value}</h4>
                </div>
              ))}
            </div>

            <div className={styles.notesBlock}>
              <h3>Scent Notes</h3>
              <div className={styles.notesGrid}>
                {product.notes.map((note: { stage: string; value: string; symbol: string }) => (
                  <div key={note.stage} className={styles.noteCard}>
                    <span className={styles.noteGlyph}>{note.symbol}</span>
                    <p>{note.stage}</p>
                    <h4>{note.value}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.accordionBlock}>
              {product.accordion.map((item: { title: string; content: string; open?: boolean }) => (
                <details key={item.title} className={styles.accordionItem} open={item.open}>
                  <summary>{item.title}</summary>
                  <p>{item.content}</p>
                </details>
              ))}
            </div>

            <div className={styles.deliveryInfo}>
              <p>Free complimentary shipping and returns on all orders.</p>
            </div>
          </div>
        </div>
        <StickyMediaController />
      </section>

      <section className={styles.testimonialsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Testimonials</h2>
          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <article key={item.author} className={styles.testimonialCard}>
                <p>"{item.quote}"</p>
                <h4>{item.author}</h4>
                <span>{item.city}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.productFaqSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Product FAQ</h2>
          <div className={styles.faqList}>
            {productFaqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
