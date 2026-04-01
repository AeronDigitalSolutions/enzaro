import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function Terms() {
  return (
    <div style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--color-gold)', marginBottom: '2rem' }}>Terms & Conditions</h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to ENZARO. By accessing or using our website, you agree to the following terms:
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Use of Website
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            You must be at least 18 years old or have parental consent.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            You agree not to misuse the website or engage in fraudulent activity.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Products & Services
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We reserve the right to modify or discontinue products without prior notice.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Prices are subject to change without notice.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Payments
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            All payments are processed securely via Razorpay.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            ENZARO is not responsible for payment failures due to third-party issues.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Intellectual Property
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            All content (logos, text, design) is owned by ENZARO and cannot be reused without permission.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Limitation of Liability
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            ENZARO shall not be liable for indirect or incidental damages arising from the use of our services.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Governing Law
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            These terms are governed by the laws of India.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            For any queries, contact: support@enzaro.com
          </p>
        </div>
      </div>
    </div>
  );
}
