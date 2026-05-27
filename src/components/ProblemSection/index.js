import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const listItems = [
  'Downtime',
  'Performance\ndegradation',
  'Risk of data loss',
];

export default function ProblemSection() {
  return (
    /* Wrapper gives vertical room for the image that bleeds above the card */
    <div className={styles.wrapper}>
      <section id="section-problem1" className={styles.section}>

        {/* Awareness image — overflows above via negative top, z-index above ::before */}
        <img
          className={styles.awarenessImage}
          src="/img/problem/awareness.png"
          alt="Chaotic PostgreSQL infrastructure"
          loading="lazy"
          decoding="async"
        />

        <div className={styles.inner}>
          <div className="row">

            {/* ── Left: text content ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.content}>

                {/* type.h3.900.white */}
                <h3 className={styles.heading}>
                  <span className={styles.white}>PostgreSQL is not</span>
                  <span className={styles.white}> the problem</span>
                  <br />
                  <span className={styles.orange}>The problem is </span>
                  <span className={styles.orange}>everything around it.</span>
                </h3>

                {/* type.body-lg.500.white */}
                <p className={styles.subtext}>
                  Companies are not afraid of PostgreSQL. They are afraid of the consequences:
                </p>

                {/* sequence-list */}
                <div className={styles.list}>
                  {listItems.map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      <img
                        className={styles.listIcon}
                        src="/img/problem/warning-icon.svg"
                        alt=""
                        aria-hidden="true"
                        width={96}
                        height={96}
                      />
                      <span className={styles.listText}>
                        {item.split('\n').map((line, j) => (
                          <React.Fragment key={j}>{line}{j < item.split('\n').length - 1 && <br />}</React.Fragment>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ── Right: image col placeholder (image is absolute) ── */}
            <div className="col-12 col-lg-6" />

          </div>

          {/* ── Bottom bar: "PostgreSQL works." ── */}
          <div className={clsx('row align-items-center', styles.bottomRow)}>
            <div className="col-12 col-md-auto">
              {/* type.extra.900 = --fs-h2 size */}
              <p className={styles.bottomHeading}>
                <span className={styles.white}>Infrastructure <br />without a</span>
                <span className={styles.orange}> system</span>
              </p>
            </div>
            <div className="col-12 col-md">
              {/* type.body.500.white */}
              <p className={styles.bottomBody}>
                <br />becomes unpredictable.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
