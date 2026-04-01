import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.link}>Shop</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <img src="/images/logos/logo.png" alt="ENZARO" style={{ height: '35px', objectFit: 'contain' }} />
          </Link>
        </div>
        
        <div className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Login">
            Login
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
