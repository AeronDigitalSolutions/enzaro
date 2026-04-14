"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (_error) {
      setError("Unable to login right now.");
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={`container ${styles.wrap}`}>
        <form className={styles.card} onSubmit={onSubmit}>
          <p className={styles.kicker}>ENZARO Admin</p>
          <h1>Inventory Login</h1>
          {/* <p className={styles.hint}>Secure Dashboard Access</p> */}

          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className={styles.credLine}>
            <Link href="/admin/register" style={{ color: "gray", textDecoration: "underline" }}>Apply for an Admin Account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
