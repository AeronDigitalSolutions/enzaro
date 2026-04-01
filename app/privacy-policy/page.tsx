import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--color-gold)', marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>Effective Date: April 1, 2026</p>
          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '1.5rem' }}>We collect personal information that you provide to us when you register on our website, place an order, subscribe to our newsletter, or contact us. This may include your name, email address, shipping address, and payment details.</p>
          
          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: '1.5rem' }}>We use your information to process transactions, deliver our products, improve our website, and send periodic marketing communications (if opted-in).</p>
          
          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Data Security</h2>
          <p style={{ marginBottom: '1.5rem' }}>We implement a variety of security measures to maintain the safety of your personal information. All payment information is securely processed through our gateway providers.</p>
        </div>
      </div>
    </div>
  );
}
