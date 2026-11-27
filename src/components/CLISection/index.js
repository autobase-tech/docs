import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function CLISection() {
  return (
    <section className={styles.section} aria-labelledby="get-started-title">
      <div className={styles.inner}>
        <h2 id="get-started-title" className={styles.heading}>Bring Autobase to your team.</h2>
        <div className={styles.ctas}>
          <Link
            to="/docs#getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            <span className={styles.ctaArrow} aria-hidden="true">&gt;</span>
            <div>
              <div className={styles.ctaTitle}>Download Platform</div>
              <div className={styles.ctaSubtitle}>Start free · Upgrade as you grow</div>
            </div>
          </Link>
          <a
            href="https://demo.autobase.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            <span className={styles.ctaArrow} aria-hidden="true">&gt;</span>
            <div>
              <div className={styles.ctaTitle}>Live Demo</div>
              <div className={styles.ctaSubtitle}>See Autobase in action · Try the sandbox</div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
