import React from 'react';
import Link from '@docusaurus/Link';
import BlackFridayOffer from './BlackFridayOffer';
import TrustedByLogos from '@site/src/components/TrustedByLogos';
import { requestDemoUrl } from '@site/src/demoLinks';
import styles from './styles.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.inner}>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <p className={styles.productLabel}><span aria-hidden="true">//</span> Self-hosted database platform for PostgreSQL</p>
            <h1 id="home-title" className={styles.heading}>
              <span className={styles.accent}>Your data.</span>{' '}
              Your rules.
            </h1>
            <p className={styles.subheading}>
              The simplicity of managed databases{' '}
              <span>on your own infrastructure.</span>
            </p>
            <div className={styles.actions}>
              <Link className={`${styles.button} ${styles.primaryButton}`} to="/docs">
                Start for Free <span aria-hidden="true">→</span>
              </Link>
              <a className={`${styles.button} ${styles.secondaryButton}`} href={requestDemoUrl}>
                Request a Demo
              </a>
            </div>
          </div>
          <BlackFridayOffer />
        </div>

        <TrustedByLogos />
        <a className={styles.reference}
          href="https://docs.cloud.google.com/distributed-cloud/hosted/docs/latest/gdcag/solutions/postgres-db-architecture"
          target="_blank" rel="noopener noreferrer">
          <span><span className={styles.referenceAccent}>Google Cloud</span> documentation identifies Autobase as the reference automation tool in its air-gapped PostgreSQL architecture.</span>
          <span className={styles.referenceLink}>Read the architecture <span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </section>
  );
}
