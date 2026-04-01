"use client";
import { useState, useEffect } from 'react';
import styles from './OfferSlider.module.css';

interface Banner {
  id: number;
  image: string;
  alt: string;
}

interface OfferSliderProps {
  banners: Banner[];
}

export default function OfferSlider({ banners }: OfferSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className={styles.bannerContainer}>
      {banners.map((banner, index) => (
        <div 
          key={banner.id} 
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
          style={{ backgroundImage: `url(${banner.image})` }}
          aria-label={banner.alt}
        >
          <div className={styles.overlay}>
            <h3 className={styles.bannerText}>{banner.alt}</h3>
          </div>
        </div>
      ))}
      {banners.length > 1 && (
        <div className={styles.dots}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
