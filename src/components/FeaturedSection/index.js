import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const stats = [
  { icon: '/img/featured/icon-github-sm.svg', number: '2500+',  label: 'Github clones ( 14 days )' },
  { icon: '/img/featured/icon-docker.svg',    number: '100k+',  label: 'Docker downloads' },
  { icon: '/img/featured/icon-ansible.svg',   number: '9 800+', label: 'Ansible installs' },
  { icon: '/img/featured/icon-star.svg',      number: '4k+',    label: 'Github stars' },
];

const cards = [
  {
    icon: '/img/featured/icon-production.svg',
    title: 'Used in production since 2019',
    body: 'Built on real workloads – not assumptions',
  },
  {
    icon: '/img/featured/icon-github-lg.svg',
    title: 'The project is live. The community is growing.',
    body: (
      <>
        Join thousands of engineers building with{' '}
        <span className={styles.orange}>Autobase</span>.
      </>
    ),
  },
];

export default function FeaturedSection() {
  return (
    <section className={styles.section}>

      {/* ── Title block ── */}
      <div className={styles.titleBlock}>
        <p className={styles.titleLine}>
          <span className={styles.orange}>2,500+</span>
          {' '}clones in just 14 days
        </p>
        <p className={styles.subtitle}>
          Real developers. Real interest. Straight from{' '}
          <span className={styles.orange}>Github</span>
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className={clsx('row justify-content-center align-items-center', styles.statsRow)}>
        {stats.map((s) => (
          <div key={s.label} className="col-auto">
            <div className={styles.statItem}>
              <img src={s.icon} alt="" aria-hidden="true" width={36} height={36} loading="lazy" decoding="async" />
              <div className={styles.statText}>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Placeholder graphic ── */}
      <div className={styles.placeholder}>
        <span className={styles.placeholderLabel}>Graphic coming soon</span>
      </div>

      {/* ── Featured in ── */}
      <div className={styles.featuredBlock}>
        <div className={styles.featuredTitle}>
          <span className={styles.featuredIn}>Featured in</span>
          <img
            src="/img/featured/logo-brightcoding.png"
            alt="BrightCoding"
            className={styles.featuredLogo}
            width={60}
            height={49}
          />
        </div>
        <div className={styles.featuredArticle}>
          <p className={styles.articleTitle}>
            Autobase: The Revolutionary PostgreSQL Cluster Automation Tool
          </p>
          <a
            href="https://www.blog.brightcoding.dev/2026/02/14/autobase-the-revolutionary-postgresql-cluster-automation-tool"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.articleLink}
          >
            Read article
          </a>
        </div>
      </div>

      {/* ── Bottom trust cards ── */}
      <div className={clsx('row', styles.cardsRow)}>
        {cards.map((card, i) => (
          <div key={i} className="col-12 col-md-6">
            <div className={styles.card}>
              <img src={card.icon} alt="" aria-hidden="true" width={46} height={46} className={styles.cardIcon} loading="lazy" decoding="async" />
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
