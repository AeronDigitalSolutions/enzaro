import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
};

export default function Returns() {
  return (
    <div style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--color-gold)', marginBottom: '2rem' }}>
          Return & Refund Policy
        </h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At ENZARO, we are committed to delivering high-quality products and services. Please read our return policy carefully before making a purchase.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Eligibility for Returns
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Returns are accepted within 7 days of delivery.</p>
          <p style={{ marginBottom: '1.5rem' }}>
            The product must be unused, in original condition, and in original packaging.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>A valid proof of purchase is required.</p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Non-Returnable Items
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Digital products, downloadable items, or services once delivered.</p>
          <p style={{ marginBottom: '1.5rem' }}>Customized or personalized products.</p>
          <p style={{ marginBottom: '1.5rem' }}>Items marked as non-returnable on the product page.</p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Refund Process
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Once your return is received and inspected, we will notify you.</p>
          <p style={{ marginBottom: '1.5rem' }}>
            If approved, refunds will be processed within 5-7 business days to the original payment method.
          </p>

          <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
            Shipping
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Customers are responsible for return shipping charges unless the item received was defective or incorrect.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            For return requests, contact us at: support@enzaro.com
          </p>
        </div>
      </div>
    </div>
  );
}
