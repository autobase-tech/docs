import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const items = [
  {
    img: '/img/about/image-list-1.png',
    alt: 'Production-ready cluster icon',
    label: (
      <>
        production-ready cluster<br />
        in <span className={styles.orange}>10–15 minutes</span>
      </>
    ),
  },
  {
    img: '/img/about/image-list-2.png',
    alt: 'Infrastructure icon',
    label: (
      <>
        Fully based<br />
        on your <span className={styles.orange}>infrastructure</span>
      </>
    ),
  },
  {
    img: '/img/about/image-list-3.png',
    alt: 'No vendor lock-in icon',
    label: (
      <>
        No vendor<br />
        <span className={styles.orange}>lock-in</span>
      </>
    ),
  },
];

export default function AboutSection() {
  return (
    <section id="section-about" className={styles.sectionAbout}>
      <div className="container py-5">

        {/* Title */}
        <div className="row justify-content-center pt-4 pb-5">
          <div className="col-12 col-lg-9 text-center">
            <h2 className={styles.title}>
              <span className={styles.titleOrange}>Autobase — </span>
              <span className={styles.titleBlack}>PostgreSQL infrastructure management platform</span>
            </h2>
          </div>
        </div>

        {/* Feature items */}
        <div className="row align-items-start justify-content-center pb-4">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <div className="col-12 col-md-auto">
                <div className={styles.item}>
                  <div className={styles.thumb}>
                    <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
                  </div>
                  <p className={styles.label}>{item.label}</p>
                </div>
              </div>

              {i < items.length - 1 && (
                <div className={clsx('col-auto d-none d-md-flex align-items-center', styles.arrowWrap)}>
                  <img
                    className={styles.arrow}
                    src="/img/about/arrow-next.svg"
                    alt=""
                    aria-hidden="true"
                    width={46}
                    height={34}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
