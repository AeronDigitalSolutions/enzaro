import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
};

const products = [
  { id: "1", slug: "savage-elixir", name: "Savage Elixir", price: 185, image: "/images/products/savage-elixir.jpeg" },
  { id: "2", slug: "ocean-water", name: "Ocean Water", price: 210, image: "/images/products/ocean-water.jpeg" },
  { id: "3", slug: "vikings", name: "Vikings", price: 165, image: "/images/products/vikings.jpeg" },
  { id: "4", slug: "chrome", name: "Chrome", price: 150, image: "/images/products/chrome.jpeg" },
  { id: "5", slug: "7-cr", name: "7 CR", price: 195, image: "/images/products/7-cr.jpeg" },
  { id: "6", slug: "million-and-love", name: "Million & Love", price: 140, image: "/images/products/million-and-love.jpeg" },
];

export default function Shop() {
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
