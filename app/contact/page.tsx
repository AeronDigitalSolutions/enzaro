import type { Metadata } from "next";
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
                <a href="mailto:support@enzaro.com">support@enzaro.com</a>
              </div>

              <div className={styles.infoCard}>
                <h3>Phone</h3>
                <a href="tel:+919999999999">+91 99999 99999</a>
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
            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Your full name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="topic">Inquiry Type</label>
                  <select id="topic" name="topic" defaultValue="">
                    <option value="" disabled>
                      Select topic
                    </option>
                    <option value="order">Order Support</option>
                    <option value="exchange">Exchange / Return</option>
                    <option value="product">Product Recommendation</option>
                    <option value="business">Business Inquiry</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="orderId">Order ID (Optional)</label>
                <input id="orderId" name="orderId" type="text" placeholder="e.g. ENZ-12345" />
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} placeholder="Tell us how we can help..." required />
              </div>

              <button type="submit" className="btn-primary">
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
