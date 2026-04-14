import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/services/products";
import ShopCatalog from "./ShopCatalog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
};

export const dynamic = "force-dynamic";

export default async function Shop() {
  const products = await getAllProducts();
  return (
    <div className={styles.shopContainer}>
      <div className={`container ${styles.header}`}>
        <h1 className={styles.title}>Our Collection</h1>
        <p className={styles.subtitle}>Discover the perfect fragrance for every occasion.</p>
      </div>
      <Suspense fallback={<div className={`container ${styles.loadingState}`}>Loading products...</div>}>
        <ShopCatalog products={products} />
      </Suspense>
    </div>
  );
}
