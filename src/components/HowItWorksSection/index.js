import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const slides = [
  {
    title: 'Deployment',
    body: 'You create a cluster — Autobase deploys a production-ready infrastructure.',
  },
  {
    title: 'Standardization',
    body: 'The system applies a proven architecture without manual setup.',
  },
  {
    title: 'Control',
    body: 'You operate PostgreSQL through a unified control layer. Direct server access remains available, but is no longer required for daily operations.',
  },
];

const tableRows = [
  { label: 'Control',    managed: 'cross', devops: 'warn',  autobase: 'check' },
  { label: 'Cost',       managed: 'cross', devops: 'warn',  autobase: 'check' },
  { label: 'Complexity', managed: 'check', devops: 'cross', autobase: 'check-alt' },
];

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>

      {/* ── How it works ── */}
      <h2 className={styles.heading}>How it works</h2>

      <div className={clsx('row align-items-start', styles.hiwRow)}>

        {/* Tabs */}
        <div className="col-12 col-lg-5">
          <div className={styles.tabs}>
            {slides.map((slide, i) => (
              <div
                key={slide.title}
                className={styles.tab}
              >
                <span className={styles.tabTitle}>{slide.title}</span>
                <span className={styles.tabBody}>{slide.body}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo preview */}
        <div className="col-12 col-lg-7">
          <div className={styles.placeholder}>
            {/*
            <svg className={styles.playIcon} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="31" stroke="#ff5722" strokeWidth="2" />
              <path d="M26 20L46 32L26 44V20Z" fill="#ff5722" />
            </svg>
            <span className={styles.placeholderLabel}>Video coming soon</span>
            */}
            <img
              src="/img/autobase_create_cluster_demo.gif"
              alt="Autobase create cluster demo"
              className={styles.demoPreview}
            />
          </div>
        </div>

      </div>

      {/* ── Comparing container ── */}
      <div className={styles.comparing}>

        <div className={styles.comparingHeader}>
          <p className={styles.comparingTitle}>
            A combination of <span className={styles.orange}>both</span> worlds:
          </p>
          <p className={styles.comparingSubtitle}>
            Automation of managed services with the flexibility of self-hosted infrastructure
          </p>
        </div>

        {/* Table */}
        <div className={styles.table}>

          {/* Column headers */}
          <div className={clsx(styles.tableRow, styles.tableHeaderRow)}>
            <div className={styles.labelCell} />
            {['Managed', 'DevOps', 'Autobase'].map((h) => (
              <div key={h} className={clsx(styles.dataCell, styles.headerCell)}>{h}</div>
            ))}
          </div>

          {/* Data rows */}
          {tableRows.map((row, i) => (
            <React.Fragment key={row.label}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.tableRow}>
                <div className={styles.labelCell}>{row.label}</div>
                {[row.managed, row.devops, row.autobase].map((icon, j) => (
                  <div key={j} className={styles.dataCell}>
                    <img
                      src={`/img/howitworks/icon-${icon}.svg`}
                      alt={icon}
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}

        </div>
      </div>

      {/* ── Bottom text ── */}
      <div className={clsx('row align-items-center', styles.bottomRow)}>
        <div className="col-12 col-md-auto">
          <p className={styles.bottomHeading}>
            Companies want <br />
            <span className={styles.orange}>one</span> thing:
          </p>
        </div>
        <div className="col-12 col-md">
          <p className={styles.bottomBody}>
            PostgreSQL that stays reliable.
          </p>
        </div>
      </div>

    </section>
  );
}
