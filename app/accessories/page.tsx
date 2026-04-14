import type { Metadata } from "next";
import Link from "next/link";
import { getAccessories } from "@/lib/services/products";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Accessories",
};

export const dynamic = "force-dynamic";

const accessoryCategories = [
  { key: "neck-tie", label: "Neck Tie" },
  { key: "bow", label: "Bow" },
  { key: "cufflinks", label: "Cufflinks" },
  { key: "pocket-square", label: "Pocket Square" },
  { key: "suspender", label: "Suspender" },
];

export default async function AccessoriesPage() {
  const accessories = await getAccessories();

  return (
    <section className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Accessories</h1>
          <p>Complete your fragrance style with premium accessories.</p>
        </header>

        <div className={styles.categoryRow}>
          {accessoryCategories.map((item) => (
            <a key={item.key} href={`#${item.key}`} className={styles.categoryChip}>
              {item.label}
            </a>
          ))}
        </div>

        {accessoryCategories.map((category) => {
          const list = accessories.filter((item) => item.accessoryCategory === category.key);
          return (
            <section key={category.key} id={category.key} className={styles.sectionBlock}>
              <h2>{category.label}</h2>
              {list.length === 0 ? (
                <p className={styles.empty}>No products listed yet.</p>
              ) : (
                <div className={styles.grid}>
                  {list.map((item) => (
                    <article key={item.id} className={styles.card}>
                      <img src={item.image} alt={item.name} />
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className={styles.metaRow}>
                        <span>₹{new Intl.NumberFormat("en-IN").format(item.price || 0)}</span>
                        <span>Stock: {item.stock || 0}</span>
                      </div>
                      <Link href={`/product/${item.slug}`} className="btn-outline">
                        View Details
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
