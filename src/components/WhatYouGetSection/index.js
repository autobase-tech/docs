import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const listItems = [
  'PostgreSQL is no longer a failure point',
  'The system behaves predictably',
  'Issues do not turn into incidents',
];

export default function WhatYouGetSection() {
  return (
    <section id="section-what-you-get" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Row 1: image left / text right ── */}
        <div className={clsx('row align-items-center', styles.contentRow)}>

          {/* Col 1 — image */}
          <div className="col-12 col-lg-6">
            <img
              className={styles.mainImage}
              src="/img/whatyouget/image-main.png"
              alt="Autobase infrastructure diagram"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Col 2 — text + list, right-aligned */}
          <div className="col-12 col-lg-6">
            <div className={styles.content}>

              {/* type.h3.900 */}
              <h3 className={styles.heading}>What you actually get</h3>

              {/* type.body-lg.500 */}
              <p className={styles.subtext}>
                You're not getting a tool.<br />
                You're getting <span className={styles.orange}>certainty</span>.
              </p>

              {/* sequence-list */}
              <ul className={styles.list}>
                {listItems.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    <img
                      className={styles.listIcon}
                      src="/img/whatyouget/icon-check.svg"
                      alt=""
                      aria-hidden="true"
                      width={32}
                      height={32}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.listText}>{item}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

        {/* ── Row 2: CTA — pinned to bottom of 100vh ── */}
        <div className={clsx('row', styles.ctaRow)}>
          <div className="col-12 text-center">
            <p className={styles.ctaHeading}>Try it in practice. Start with a trial.</p>
            <Link to="/docs" className={styles.ctaButton}>Start a Free trial now</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
