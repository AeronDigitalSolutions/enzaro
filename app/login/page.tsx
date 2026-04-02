import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.wrap}`}>
        <form className={styles.form}>
          <h1>Welcome Back</h1>
          <p>Login to access your orders, saved addresses, and faster checkout.</p>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn-primary">
            Login
          </button>
          <div className={styles.metaRow}>
            <button type="button">Forgot Password?</button>
            <button type="button">Create Account</button>
          </div>
        </form>
      </div>
    </section>
  );
}

