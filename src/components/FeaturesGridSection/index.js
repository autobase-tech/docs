import React from 'react';
import styles from './styles.module.css';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'HA',
    title: 'High Availability',
    description: 'Automatic High Availability',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="3" y="10" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="19" y="10" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 16h6M17 13l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Failover',
    title: 'Failover',
    description: 'Automatic Failover & Self-Healing',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="8" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Backups',
    title: 'Backups',
    description: 'Continuous Backups',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="10" x2="8" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="10" x2="14" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="10" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="16" r="3" fill="currentColor"/>
      </svg>
    ),
    label: 'PITR',
    title: 'PITR',
    description: 'Point-in-Time Recovery',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polyline points="4,22 10,14 15,18 20,10 28,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="4" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Monitoring',
    title: 'Monitoring',
    description: 'Built-in Metrics & Alerting',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4v18M10 16l6-12 6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="26" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Upgrades',
    title: 'Upgrades',
    description: 'Zero-Downtime Upgrades',
  },
];

export default function FeaturesGridSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.label} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <div className={styles.label}>{f.label}</div>
              <div className={styles.description}>{f.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
