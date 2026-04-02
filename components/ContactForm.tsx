"use client";

import { useState } from "react";
import styles from "@/app/contact/page.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  orderId: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  orderId: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setStatus({ type: "error", message: result.error || "Failed to submit inquiry." });
        return;
      }

      setForm(initialForm);
      setStatus({ type: "success", message: result.message || "Inquiry submitted successfully." });
    } catch (_error) {
      setStatus({ type: "error", message: "Unable to submit right now. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={onChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="+91" value={form.phone} onChange={onChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="topic">Inquiry Type</label>
          <select id="topic" name="topic" value={form.topic} onChange={onChange}>
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
        <input id="orderId" name="orderId" type="text" placeholder="e.g. ENZ-12345" value={form.orderId} onChange={onChange} />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} placeholder="Tell us how we can help..." value={form.message} onChange={onChange} required />
      </div>

      {status.type !== "idle" && (
        <p className={status.type === "success" ? styles.successMessage : styles.errorMessage}>{status.message}</p>
      )}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

