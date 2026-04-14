"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.navLinks}>
            <Link href="/shop" className={styles.link}>Shop</Link>
            <Link href="/accessories" className={styles.link}>Accessories</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              <img src="/images/logos/logo.png" alt="ENZARO" style={{ height: "70px", objectFit: "contain" }} />
            </Link>
          </div>

          <div className={styles.navIcons}>
            <button
              className={styles.iconBtn}
              aria-label="Search"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <Link href="/login" className={styles.iconBtn} aria-label="Login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
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

        {/* Search overlay */}
        <div className={`${styles.searchBar} ${searchOpen ? styles.searchBarOpen : ""}`}>
          <form className={`container ${styles.searchForm}`} onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              type="search"
              className={styles.searchInput}
              placeholder="Search perfumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchSubmit} aria-label="Submit search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button type="button" className={styles.searchClose} onClick={() => setSearchOpen(false)} aria-label="Close search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </form>
        </div>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          <Link href="/shop" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/accessories" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Accessories</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/login" className={styles.mobileActionBtn} onClick={() => setMenuOpen(false)}>Login</Link>
          <Link href="/cart" className={styles.mobileActionBtn} onClick={() => setMenuOpen(false)}>
            Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </div>
      </nav>

      <button
        className={`${styles.backdrop} ${menuOpen || searchOpen ? styles.backdropOpen : ""}`}
        aria-hidden={!menuOpen && !searchOpen}
        onClick={() => { setMenuOpen(false); setSearchOpen(false); }}
      />
    </>
  );
}
