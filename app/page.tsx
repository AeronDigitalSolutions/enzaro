import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import OfferSlider from "@/components/OfferSlider";
import ProductCarousel from "@/components/ProductCarousel";
import FAQ from "@/components/FAQ";
import { getHomeCollections } from "@/lib/services/products";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

const offerBanners1 = [
  { id: 1, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop", alt: "Complimentary Shipping over $150" },
  { id: 2, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop", alt: "Discover our Spring Collection" }
];

const offerBanners2 = [
  { id: 1, image: "https://images.unsplash.com/photo-1615397347271-9f2010836c2e?q=80&w=2000&auto=format&fit=crop", alt: "Special Gift with Purchase" },
  { id: 2, image: "https://images.unsplash.com/photo-1616949755610-8b9aaf89d094?q=80&w=2000&auto=format&fit=crop", alt: "Join ENZARO Exclusives" }
];

export default async function Home() {
  const { bestSellers, newArrivals } = await getHomeCollections();
  return (
    <div className={styles.page}>
      <HeroSlider />
      <CategorySection />
      <OfferSlider banners={offerBanners1} />
      <ProductCarousel title="Best Sellers" products={bestSellers} />
      <OfferSlider banners={offerBanners2} />
      <ProductCarousel title="New Arrivals" products={newArrivals} />
      <FAQ />
    </div>
  );
}
