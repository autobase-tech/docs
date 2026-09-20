import React from 'react';
import styles from './styles.module.css';

const props = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="28" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="20" width="28" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10.5h1M10 25.5h1M22 10.5h4M22 25.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Your Infrastructure',
    description: 'Postgres runs in your cloud account or on your own servers.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <ellipse cx="14" cy="8" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 8v9c0 2.2 4.48 4 10 4M4 17v9c0 2.2 4.48 4 10 4M24 8v6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M25 16l-8 3.5v5c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9v-5L25 16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M21.5 25l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Your Data',
    description: 'Your databases and backups stay in infrastructure you control.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M4 9h7m6 0h15M4 18h18m6 0h4M4 27h4m6 0h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="25" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="11" cy="27" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Your Rules',
    description: 'SSH and superuser access, 500+ extensions, and full customization freedom.',
  },
];

export default function ValuePropsSection() {
  return (
    <section className={styles.section} aria-label="Your infrastructure, your data, your rules">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {props.map((p) => (
            <div key={p.title} className={styles.card}>
              <div className={styles.icon}>{p.icon}</div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.description}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
