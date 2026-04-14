"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import styles from "./page.module.css";

export default function CartClient() {
  const { items, updateQty, removeItem, subtotal, clearCart } = useCart();
  const subtotalFormatted = new Intl.NumberFormat("en-IN").format(subtotal);

  if (items.length === 0) {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.emptyWrap}`}>
          <h1>Your cart is empty</h1>
          <p>Add your signature scent and continue to checkout.</p>
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
        <div>
          <h1 className={styles.title}>Your Cart</h1>
          <div className={styles.itemList}>
            {items.map((item) => {
              const lineTotal = new Intl.NumberFormat("en-IN").format(item.unitPrice * item.quantity);
              return (
                <article key={item.id} className={styles.itemCard}>
                  <img src={item.image} alt={item.name} className={styles.thumb} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>{item.sizeMl === 80 ? '4x20' : item.sizeMl}ML</p>
                    <div className={styles.itemActions}>
                      <div className={styles.qtyControl}>
                        <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button type="button" className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                    <p className={styles.lineTotal}>₹{lineTotal}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <strong>₹{subtotalFormatted}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <strong>₹{subtotalFormatted}</strong>
          </div>
          <Link href="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
          <button type="button" className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </aside>
      </div>
    </section>
  );
}
