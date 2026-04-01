import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <section className={styles.carouselSection}>
      <div className="container">
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {products.map(product => (
              <div key={product.id} className={styles.cardWrapper}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
