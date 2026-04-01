import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import OfferSlider from "@/components/OfferSlider";
import ProductCarousel from "@/components/ProductCarousel";
import FAQ from "@/components/FAQ";
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

const bestSellers = [
  { id: "1", slug: "savage-elixir", name: "Savage Elixir", price: 185, image: "/images/products/savage-elixir.jpeg" },
  { id: "2", slug: "ocean-water", name: "Ocean Water", price: 210, image: "/images/products/ocean-water.jpeg" },
  { id: "3", slug: "vikings", name: "Vikings", price: 165, image: "/images/products/vikings.jpeg" },
  { id: "5", slug: "7-cr", name: "7 CR", price: 195, image: "/images/products/7-cr.jpeg" },
];

const newArrivals = [
  { id: "4", slug: "chrome", name: "Chrome", price: 150, image: "/images/products/chrome.jpeg" },
  { id: "6", slug: "million-and-love", name: "Million & Love", price: 140, image: "/images/products/million-and-love.jpeg" },
  { id: "7", slug: "her", name: "H.E.R", price: 175, image: "/images/products/her.jpeg" },
  { id: "8", slug: "dark-opium", name: "Dark Opium", price: 160, image: "/images/products/dark-opium.jpeg" },
];

export default function Home() {
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
