import React from 'react';
import styles from './styles.module.css';

function ValueGlyph({ children }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M8 16V8h8M32 8h8v8M40 32v8h-8M16 40H8v-8" />
        {children}
      </g>
    </svg>
  );
}

const props = [
  {
    icon: (
      <ValueGlyph>
        <path d="M14 14h20v8H14zM14 26h20v8H14z" />
        <path d="M18 18h1M28 18h3M18 30h1M28 30h3" />
      </ValueGlyph>
    ),
    title: 'Your Infrastructure',
    description: 'Run PostgreSQL in your cloud account or on your own servers.',
  },
  {
    icon: (
      <ValueGlyph>
        <path d="M14 16l10-4 10 4-10 4-10-4zM14 16v16l10 4 10-4V16" />
        <path d="M14 24l10 4 10-4M24 20v16" />
      </ValueGlyph>
    ),
    title: 'Your Data',
    description: 'Keep databases and backups in infrastructure you control.',
  },
  {
    icon: (
      <ValueGlyph>
        <path d="M13 17h8M27 17h8M13 24h14M33 24h2M13 31h3M22 31h13" />
        <path d="M21 14h6v6h-6zM27 21h6v6h-6zM16 28h6v6h-6z" />
      </ValueGlyph>
    ),
    title: 'Your Rules',
    description: 'Full control over access, extensions, and configuration.',
  },
];

export default function ValuePropsSection() {
  return (
    <section className={styles.section} aria-labelledby="data-sovereignty-title">
      <div className={styles.inner}>
        <h2 id="data-sovereignty-title" className={styles.heading}>
          <span aria-hidden="true">//</span>
          Data Sovereignty by Design
        </h2>
        <p className={styles.intro}>
          The DBaaS experience, with full control over your infrastructure and data.
        </p>
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
