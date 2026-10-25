import React from 'react';
import styles from './styles.module.css';

export default function CLISection() {
  return (
    <section className={styles.section} aria-labelledby="get-started-title">
      <div className={styles.inner}>
        <h2 id="get-started-title" className="landing-sr-only">Get started with Autobase</h2>
        <div className={styles.ctas}>
          <a
            href="/docs#getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            <span className={styles.ctaArrow}>&gt;</span>
            <div>
              <div className={styles.ctaTitle}>DOWNLOAD PLATFORM</div>
              <div className={styles.ctaSubtitle}>Free Starter plan · Up to 2 clusters · No time limit</div>
            </div>
          </a>
          <a
            href="https://demo.autobase.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            <span className={styles.ctaArrow}>&gt;</span>
            <div>
              <div className={styles.ctaTitle}>LIVE DEMO</div>
              <div className={styles.ctaSubtitle}>See Autobase in action · Try the sandbox</div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
