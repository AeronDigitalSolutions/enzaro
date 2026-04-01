"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2000&auto=format&fit=crop",
    title: "The Essence of Luxury",
    subtitle: "Discover our signature collection of artisanal perfumes.",
    ctaText: "Explore Collection",
    ctaLink: "/shop"
  },
  {
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop",
    title: "Oud Noire",
    subtitle: "A deep, mysterious blend of agarwood and midnight rose.",
    ctaText: "Shop Oud Noire",
    ctaLink: "/product/noire"
  },
  {
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop",
    title: "Santal Gold",
    subtitle: "Warm Australian sandalwood meets sun-drenched amber.",
    ctaText: "Shop Santal Gold",
    ctaLink: "/product/santal-gold"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div key={index} className={`${styles.slide} ${index === current ? styles.active : ''}`}>
          <div className={styles.imageBackground} style={{ backgroundImage: `url(${slide.image})` }} />
          <div className={styles.overlay}>
            <div className={`container ${styles.content}`}>
              <h1 className={`${styles.title} ${index === current ? styles.animateTitle : ''}`}>{slide.title}</h1>
              <p className={`${styles.subtitle} ${index === current ? styles.animateSubtitle : ''}`}>{slide.subtitle}</p>
              <div className={`${styles.cta} ${index === current ? styles.animateCta : ''}`}>
                <Link href={slide.ctaLink} className="btn-primary">
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
