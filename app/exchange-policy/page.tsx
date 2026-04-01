import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exchange Policy",
};

export default function ExchangePolicy() {
  return (
    <div style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--color-gold)', marginBottom: '2rem' }}>
          Exchange Policy
        </h1>

        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At ENZARO, customer satisfaction is our priority, and we offer exchanges under the following conditions:
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Exchange Eligibility
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Requests must be made within 7 days of delivery.</p>
          <p style={{ marginBottom: '1.5rem' }}>The product must be unused and in original packaging.</p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Exchange Conditions
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Exchanges are allowed only for:</p>
          <p style={{ marginBottom: '1.5rem' }}>Defective products</p>
          <p style={{ marginBottom: '1.5rem' }}>Incorrect items received</p>
          <p style={{ marginBottom: '1.5rem' }}>Size/variant issues (if applicable)</p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Process
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Contact us at support@enzaro.com with your order details.</p>
          <p style={{ marginBottom: '1.5rem' }}>Once approved, we will initiate the exchange process.</p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Note
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Exchanges are subject to product availability.</p>
          <p style={{ marginBottom: '1.5rem' }}>
            If the requested product is unavailable, a refund or store credit may be offered.
          </p>
        </div>
      </div>
    </div>
  );
}
