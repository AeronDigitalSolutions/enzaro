"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.navLinks}>
            <Link href="/shop" className={styles.link}>
              Shop
            </Link>
            <Link href="/about" className={styles.link}>
              About
            </Link>
            <Link href="/contact" className={styles.link}>
              Contact
            </Link>
          </div>

          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              <img src="/images/logos/logo.png" alt="ENZARO" style={{ height: "70px", objectFit: "contain" }} />
            </Link>
          </div>

          <div className={styles.navIcons}>
            <Link href="/login" className={styles.iconBtn} aria-label="Login">
              Login
            </Link>
            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
              Cart
              {itemCount > 0 ? <span className={styles.countBadge}>{itemCount}</span> : null}
            </Link>
          </div>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          <Link href="/shop" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/login" className={styles.mobileActionBtn} onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/cart" className={styles.mobileActionBtn} onClick={() => setMenuOpen(false)}>
            Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </div>
      </nav>

      <button
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ""}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
