import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--color-gold)', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>Effective Date: April 2, 2026</p>
          <p style={{ marginBottom: '1.5rem' }}>
            ENZARO values your trust and is committed to protecting your privacy. This policy explains how we collect, use, and
            safeguard your personal information when you visit our website or place an order.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We may collect your name, email address, phone number, shipping/billing details, and order information when you make
            a purchase or submit a contact request.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            We may also collect non-personal data such as browser type, device information, and pages visited to improve user
            experience.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We use your information to process orders, provide customer support, send transactional updates, and improve our
            services.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            If you opt in, we may send promotional communication regarding new launches, offers, and updates.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            3. Payments & Security
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Payments are processed through secure third-party gateways. ENZARO does not store full card details on its servers.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            We maintain reasonable technical and administrative safeguards to protect personal data from unauthorized access.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            4. Data Sharing
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We share information only with trusted service providers required to operate our business, such as logistics partners,
            payment processors, and support tools.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            We do not sell your personal information to third parties.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            5. Your Rights
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            You may request correction or deletion of your personal information by contacting our support team.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            6. Contact
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            For privacy-related concerns, contact us at: aminternational97@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
