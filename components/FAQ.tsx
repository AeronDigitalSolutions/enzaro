"use client";
import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: "How long does the fragrance last on the skin?",
    answer: "Our fragrances are formulated as Extrait de Parfum or Eau de Parfum with high concentration levels, ensuring a long-lasting scent trail that typically spans 8-12 hours depending on skin chemistry."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally to most countries. International delivery usually takes between 5-10 business days. Customs duties may apply depending on your region."
  },
  {
    question: "Can I return an opened bottle?",
    answer: "For hygiene and quality assurance reasons, we can only accept returns on unopened, sealed bottles within 30 days of purchase. We recommend purchasing our Discovery Set if you are unsure of a scent."
  },
  {
    question: "Are your ingredients ethically sourced?",
    answer: "Absolutely. We are committed to sustainability and work directly with ethical farms to source our raw ingredients, such as our Bulgarian Rose and Southeast Asian Oud."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.questionBlock}>
                <h3 className={styles.question}>{faq.question}</h3>
                <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
              </div>
              <div className={styles.answerBlock}>
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
