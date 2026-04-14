"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from "@/components/providers/CartProvider";

interface ProductCardProps {
  id?: string;
  slug: string;
  name: string;
  price: number;
  mrp?: number;
  image: string;
  reviewScore?: string;
  reviewCount?: number;
  tags?: string[];
  isNewArrival?: boolean;
}

function renderStars(score?: string) {
  const numeric = Number(score || 0);
  if (!numeric) return "☆☆☆☆☆";
  const filled = Math.max(0, Math.min(5, Math.round(numeric)));
  return `${"★".repeat(filled)}${"☆".repeat(Math.max(0, 5 - filled))}`;
}

export default function ProductCard({
  slug,
  name,
  price,
  mrp,
  image,
  reviewScore,
  reviewCount,
  tags,
  isNewArrival,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat("en-IN").format(price);
  const fallbackMrp = Math.round(price * 1.45);
  const effectiveMrp = mrp && mrp > price ? mrp : fallbackMrp;
  const formattedMrp = new Intl.NumberFormat("en-IN").format(effectiveMrp);
  const discountPercent = Math.max(1, Math.round(((effectiveMrp - price) / effectiveMrp) * 100));
  const categoryLabel = tags?.[0]?.toUpperCase() || "EDP";
  const stars = renderStars(reviewScore);
  const reviewsText = reviewCount ? `(${reviewCount} reviews)` : "No reviews";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug,
      name,
      image,
      sizeMl: 50,
      unitPrice: price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        {isNewArrival ? <span className={styles.badge}>NEW LAUNCH</span> : null}
        <div className={styles.overlay}>
          <span className="btn-outline">View Details</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.rating}>
          <span className={styles.stars}>{stars}</span>
          <span className={styles.reviewText}>
            {reviewScore || "0.0"} <span className={styles.reviewCount}>({reviewCount || 0})</span>
          </span>
        </div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.metaRow}>
          <span className={styles.chip}>{categoryLabel}</span>
          <span className={styles.chip}>50ML</span>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.price}>₹{formattedPrice}</p>
          <div className={styles.mrpDiscountRow}>
            <p className={styles.mrp}>₹{formattedMrp}</p>
            <span className={styles.discount}>{discountPercent}% OFF</span>
          </div>
        </div>
        <button 
          className={styles.cartBtn} 
          onClick={handleAddToCart}
          style={added ? { backgroundColor: '#4ade80', color: '#000', borderColor: '#4ade80' } : {}}
        >
          {added ? "ADDED!" : "ADD TO CART"}
        </button>
      </div>
    </Link>
  );
}
