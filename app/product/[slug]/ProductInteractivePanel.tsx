"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Variant = {
  sizeMl: number;
  price: number;
  mrp: number;
};

type ProductInteractivePanelProps = {
  name: string;
  subtitle: string;
  variants: Variant[];
  description: string;
  tags: string[];
  couponText: string;
};

export default function ProductInteractivePanel({
  name,
  subtitle,
  variants,
  description,
  tags,
  couponText,
}: ProductInteractivePanelProps) {
  const initialVariant = useMemo(
    () => variants.find((variant) => variant.sizeMl === 50) || variants[0],
    [variants]
  );
  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant);
  const [quantity, setQuantity] = useState(1);

  const formattedPrice = new Intl.NumberFormat("en-IN").format(selectedVariant.price);
  const formattedMrp = new Intl.NumberFormat("en-IN").format(selectedVariant.mrp);
  const discountPercent = Math.max(
    1,
    Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)
  );
  const totalPrice = new Intl.NumberFormat("en-IN").format(selectedVariant.price * quantity);

  return (
    <>
      <h1 className={styles.title}>
        {name} <span>{selectedVariant.sizeMl ? `${selectedVariant.sizeMl}ML` : subtitle}</span>
      </h1>

      <div className={styles.priceRow}>
        <p className={styles.price}>₹{formattedPrice}</p>
        <p className={styles.mrp}>MRP ₹{formattedMrp}</p>
        <span className={styles.discount}>{discountPercent}% OFF</span>
      </div>

      <div className={styles.variantRow}>
        {variants.map((variant) => (
          <button
            key={variant.sizeMl}
            className={`${styles.variantBtn} ${
              variant.sizeMl === selectedVariant.sizeMl ? styles.variantBtnActive : ""
            }`}
            type="button"
            aria-label={`${variant.sizeMl} milliliter variant`}
            onClick={() => {
              setSelectedVariant(variant);
              setQuantity(1);
            }}
          >
            <span>{variant.sizeMl}ML</span>
            <small>₹{new Intl.NumberFormat("en-IN").format(variant.price)}</small>
          </button>
        ))}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tagRow}>
        {tags.map((tag: string) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.couponCard}>
        <div className={styles.couponIcon}>%</div>
        <p>{couponText}</p>
      </div>

      <div className={styles.purchaseRow}>
        <div className={styles.qtyControl}>
          <button
            aria-label="Decrease quantity"
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            aria-label="Increase quantity"
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button className="btn-primary" type="button">
          Add to Cart - ₹{totalPrice}
        </button>
      </div>
    </>
  );
}
