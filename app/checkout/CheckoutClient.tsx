"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import styles from "./page.module.css";

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const totalFormatted = new Intl.NumberFormat("en-IN").format(subtotal);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.successBox}`}>
          <h1>Order Placed Successfully</h1>
          <p>Thank you for shopping with ENZARO. We have sent confirmation details to your email.</p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1>Checkout</h1>
          <div className={styles.row}>
            <input type="text" placeholder="Full Name" required />
            <input type="tel" placeholder="Phone Number" required />
          </div>
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Address Line 1" required />
          <input type="text" placeholder="Address Line 2 (Optional)" />
          <div className={styles.row}>
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Pincode" required />
          </div>
          <div className={styles.row}>
            <input type="text" placeholder="State" required />
            <select defaultValue="COD">
              <option value="COD">Cash on Delivery</option>
              <option value="CARD">Card / UPI (Mock)</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={items.length === 0}>
            Place Order
          </button>
        </form>

        <aside className={styles.summary}>
          <h2>Order Details</h2>
          {items.length === 0 ? <p className={styles.emptyText}>Your cart is empty.</p> : null}
          {items.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <span>
                {item.name} ({item.sizeMl === 80 ? '4x20' : item.sizeMl}ML) x {item.quantity}
              </span>
              <strong>₹{new Intl.NumberFormat("en-IN").format(item.unitPrice * item.quantity)}</strong>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>₹{totalFormatted}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

