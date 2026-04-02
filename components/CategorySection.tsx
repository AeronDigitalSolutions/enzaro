import Link from 'next/link';
import styles from './CategorySection.module.css';

export default function CategorySection() {
  return (
    <section className={styles.categorySection}>
      <div className={styles.grid}>
        <div className={styles.categoryCard}>
          <div className={styles.bgImage} style={{ backgroundImage: "url('/images/Category/for-her.png')" }} />
          <div className={styles.overlay}>
            <h2 className={styles.title}>For Her</h2>
            <Link href="/shop?category=her" className="btn-outline">Shop Now</Link>
          </div>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.bgImage} style={{ backgroundImage: "url('/images/Category/for-him.png')" }} />
          <div className={styles.overlay}>
            <h2 className={styles.title}>For Him</h2>
            <Link href="/shop?category=him" className="btn-outline">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
