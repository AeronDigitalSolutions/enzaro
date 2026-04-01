import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id?: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ slug, name, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.overlay}>
          <span className="btn-outline">View Details</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
