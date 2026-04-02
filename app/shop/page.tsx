import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/services/products";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function Shop() {
  const products = await getAllProducts();
  return (
    <div className={styles.shopContainer}>
      <div className={`container ${styles.header}`}>
        <h1 className={styles.title}>Our Collection</h1>
        <p className={styles.subtitle}>Discover the perfect fragrance for every occasion.</p>
      </div>

      <div className={`container ${styles.productGrid}`}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
