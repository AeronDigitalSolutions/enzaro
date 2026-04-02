import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <header className={styles.header}>
          <p className={styles.overline}>Contact ENZARO</p>
          <h1>Contact Us</h1>
          <p>
            We are here to help with orders, fragrance recommendations, exchanges, and business inquiries. Fill out the form and
            our team will get back to you shortly.
          </p>
        </header>

        <section className={styles.grid}>
          <aside className={styles.infoPanel}>
            <h2>Get in touch</h2>
            <p>
              Customer care is available Monday to Saturday. For faster support, include your order ID and the issue details.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoCard}>
                <h3>Email</h3>
                <a href="mailto:aminternational97@gmail.com">aminternational97@gmail.com</a>
              </div>

              <div className={styles.infoCard}>
                <h3>Phone</h3>
                <a href="tel:+917042703031">+91 70427 03031</a>
              </div>

              <div className={styles.infoCard}>
                <h3>Office Hours</h3>
                <p>Mon - Sat, 10:00 AM - 7:00 PM IST</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Head Office</h3>
                <p>ENZARO Fragrance Studio, New Delhi, India</p>
              </div>
            </div>
          </aside>

          <div className={styles.formPanel}>
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
