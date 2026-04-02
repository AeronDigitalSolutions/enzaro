import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandCol}>
          <div className={styles.logoWrap}>
            <img src="/images/logos/logo.png" alt="ENZARO" className={styles.logoImage} />
          </div>
          <p className={styles.tagline}>The essence of luxury and sophistication.</p>
        </div>
        
        <div className={styles.linksCol}>
          <h3>Shop</h3>
          <Link href="/shop" className={styles.link}>All Perfumes</Link>
          <Link href="/about" className={styles.link}>Our Story</Link>
        </div>

        <div className={styles.linksCol}>
          <h3>Support</h3>
          <Link href="/contact" className={styles.link}>Contact Us</Link>
          <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
          <Link href="/returns" className={styles.link}>Return & Refund Policy</Link>
          <Link href="/exchange-policy" className={styles.link}>Exchange Policy</Link>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>
            Copyright © 2026 ENZARO | Designed by <span className={styles.designer}>WE PUBLICISE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
