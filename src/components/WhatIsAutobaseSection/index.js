import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const listItems = [
  'Defines a clear architecture',
  'Deploys clusters automatically',
  'Standardizes configurations',
  'Removes manual operations',
];

export default function WhatIsAutobaseSection() {
  return (
    <section id="section-what-is-autobase" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Top: heading + subtext + list (left col) ── */}
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className={styles.content}>

              {/* type.h3.900 */}
              <h3 className={styles.heading}>
                What is <span className={styles.orange}>Autobase</span>
              </h3>

              {/* type.body-lg.500 */}
              <p className={styles.subtext}>
                Autobase is a platform for running PostgreSQL as a system.
              </p>

              {/* sequence-list */}
              <ul className={styles.list}>
                {listItems.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    <img
                      className={styles.listIcon}
                      src="/img/whatisautobase/icon-check.svg"
                      alt=""
                      aria-hidden="true"
                      width={32}
                      height={32}
                    />
                    <span className={styles.listText}>{item}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
          <div className="col-12 col-lg-6" />
        </div>

        {/* ── Bottom bar: heading left, body right ── */}
        <div className={clsx('row align-items-center', styles.bottomRow)}>
          <div className="col-12 col-md-auto">
            {/* type.h2.900 */}
            <p className={styles.bottomHeading}>
              <span className={styles.white}>Manual management </span><br />
              <span className={styles.white}>does not </span>
              <span className={styles.orange}>scale</span>
              <span className={styles.white}>.</span>
            </p>
          </div>
          <div className="col-12 col-md">
            {/* type.body.500 */}
            <p className={styles.bottomBody}>
              PostgreSQL needs a system behind it
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
