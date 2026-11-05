import React from 'react';
import Link from '@docusaurus/Link';
import TrustedByLogos from '@site/src/components/TrustedByLogos';
import { ArchitectureDiagram } from '@site/src/components/ArchDiagramSection';
import styles from './styles.module.css';

const LINE1 = 'DATABASE PLATFORM';
const LINE2 = 'FOR POSTGRESQL';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <p className={styles.label}><span aria-hidden="true">//</span> Self-Hosted DBaaS</p>
            <h1 className={styles.heading}>
              <span className="landing-sr-only">
                {LINE1} {LINE2}
              </span>
              <span aria-hidden="true">
                <span className={styles.line}>{LINE1}</span>
                <span className={styles.line}>{LINE2}</span>
              </span>
            </h1>

            <p className={styles.subheading}>
              The simplicity of managed PostgreSQL.{' '}
              <span className={styles.subheadingSecondLine}>On your own infrastructure.</span>
            </p>

            <div className={styles.actions}>
              <a className={`${styles.button} ${styles.primaryButton}`} href="https://demo.autobase.tech" target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">&gt;</span> Live Demo <span aria-hidden="true">↵</span>
              </a>
              <Link className={`${styles.button} ${styles.secondaryButton}`} to="/docs#getting-started">
                Get Started <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
          <ArchitectureDiagram />
        </div>

        <TrustedByLogos />

        <a
          className={styles.reference}
          href="https://docs.cloud.google.com/distributed-cloud/hosted/docs/latest/gdcag/solutions/postgres-db-architecture"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.referenceText}>
            <strong>Named as a reference automation tool in Google Distributed Cloud air-gapped PostgreSQL architecture</strong>
            <span><span className={styles.referenceAccent}>Google Cloud</span> documentation identifies Autobase for provisioning and configuring the HA PostgreSQL stack.</span>
          </span>
          <span className={styles.referenceLink}>View source documentation <span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </section>
  );
}
