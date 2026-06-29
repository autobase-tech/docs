import React from 'react';
import styles from './styles.module.css';

const highlights = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 20l4.5 4.5 9.5-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Open Source',
    description: 'MIT License',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 6l-14 8v10c0 7.18 5.97 13.9 14 15.47C28.03 37.9 34 31.18 34 24V14L20 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="15" y="18" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 18v-3a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Self-Hosted',
    description: 'Full control. No vendor lock-in.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <polygon points="20,4 24,14 35,14 26,21 29,32 20,26 11,32 14,21 5,14 16,14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Production Ready',
    description: 'Battle-tested. Built for reliability.',
  },
];

export default function ProductHighlightsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          {highlights.map((h, i) => (
            <React.Fragment key={h.title}>
              <div className={styles.item}>
                <div className={styles.icon}>{h.icon}</div>
                <div className={styles.text}>
                  <div className={styles.title}>{h.title}</div>
                  <div className={styles.description}>{h.description}</div>
                </div>
              </div>
              {i < highlights.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
