import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const withoutItems = [
  'DevOps: $4,000+/month',
  'Manual setup and operations',
  'Downtime risk and incidents',
  'Architecture depends on people',
];

const withItems = [
  'Autobase: from $256/month',
  'Standardized architecture',
  'Predictable system behavior',
  'Your infrastructure. No vendor lock-in',
];

const resultItems = [
  'Save $3,000+/month',
  'Spend 5–20x less than managed DB services',
  'Reduce operational risk',
  'Gain real infrastructure control',
];

function FeatureList({ items, dark }) {
  return (
    <ul className={styles.featureList}>
      {items.map((item) => (
        <li key={item} className={clsx(styles.featureItem, dark && styles.featureItemDark)}>
          <img
            src="/img/pricing/icon-check.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className={styles.checkIcon}
            loading="lazy"
            decoding="async"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ComparisonSection() {
  const sectionRef = useRef(null);
  const resultRef  = useRef(null);

  useEffect(() => {
    let mounted = true;
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      if (resultRef.current) {
        resultRef.current.style.opacity = '1';
        resultRef.current.style.transform = 'none';
      }
      return () => { mounted = false; };
    }

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted) return;
        gsap.registerPlugin(ScrollTrigger);

        // Result block: starts invisible, fires when section is deep in view
        gsap.fromTo(
          resultRef.current,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 35%',
              once: true,
            },
          }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* ── Two comparison cards ── */}
      <div className={clsx('row justify-content-center', styles.cardsRow)}>

        {/* Without Autobase */}
        <div className="col-12 col-md-6">
          <div className={styles.cardLight}>
            <h3 className={clsx(styles.cardTitle, styles.cardTitleLight)}>
              Without Autobase
            </h3>
            <FeatureList items={withoutItems} />
          </div>
        </div>

        {/* With Autobase */}
        <div className="col-12 col-md-6">
          <div className={styles.cardDark}>
            <h3 className={clsx(styles.cardTitle, styles.cardTitleDark)}>
              With <span className={styles.orange}>Autobase</span>
            </h3>
            <FeatureList items={withItems} dark />
          </div>
        </div>

      </div>

      {/* ── Result — animates last ── */}
      <div ref={resultRef} className={styles.resultRow}>
        <p className={styles.resultHeading}>Result</p>
        <FeatureList items={resultItems} />
      </div>

    </section>
  );
}
