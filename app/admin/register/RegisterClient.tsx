"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/page.module.css";

export default function RegisterClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data?.error || "Registration failed.");
        setLoading(false);
        return;
      }
      
      if (data.pending) {
        setSuccess(true);
        setLoading(false);
      } else {
        // Automatically logged in (was the first admin)
        router.replace("/admin");
        router.refresh();
      }
    } catch (_error) {
      setError("Unable to register right now.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.wrap}`}>
          <div className={styles.card} style={{ textAlign: "center" }}>
            <p className={styles.kicker}>Registration Successful</p>
            <h1 style={{ marginBottom: "1rem" }}>Application Received</h1>
            <p className={styles.hint} style={{ marginBottom: "2rem" }}>
              Your admin account is pending verification by a Super Admin. You will not be able to login until your account is activated.
            </p>
            <Link href="/admin/login" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              Return to Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={`container ${styles.wrap}`}>
        <form className={styles.card} onSubmit={onSubmit}>
          <p className={styles.kicker}>ENZARO Admin</p>
          <h1>Register Account</h1>

          <label>
            Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
          </label>

          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Apply for Admin"}
          </button>

          <p className={styles.credLine}>
            <Link href="/admin/login" style={{ color: "gray", textDecoration: "underline" }}>Already have an account? Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
