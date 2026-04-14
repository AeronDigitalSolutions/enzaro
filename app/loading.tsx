import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loaderOverlay} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.logoWrap}>
        <Image
          src="/images/logos/logo.png"
          alt="ENZARO"
          width={120}
          height={120}
          priority
          className={styles.logo}
        />
      </div>
    </div>
  );
}
