import React, { useEffect, useState } from 'react';
import TrustedByCarousel from '@site/src/components/TrustedByCarousel';
import styles from './styles.module.css';

const LINE1 = 'DATABASE PLATFORM';
const LINE2 = 'FOR POSTGRESQL';
const SUBTEXT = 'Self-Hosted DBaaS [Database as a Service]';
const HEADING_SPEED = 60;
const SUBTEXT_SPEED = 42;
const H1_TOTAL = LINE1.length + LINE2.length;
const SUB_DELAY = H1_TOTAL * HEADING_SPEED + 160;

export default function HeroSection() {
  const [h1Count, setH1Count] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [subStarted, setSubStarted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || h1Count >= H1_TOTAL) return undefined;
    const id = setTimeout(() => setH1Count((count) => count + 1), HEADING_SPEED);
    return () => clearTimeout(id);
  }, [h1Count, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = setTimeout(() => setSubStarted(true), SUB_DELAY);
    return () => clearTimeout(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !subStarted || subCount >= SUBTEXT.length) return undefined;
    const id = setTimeout(() => setSubCount((count) => count + 1), SUBTEXT_SPEED);
    return () => clearTimeout(id);
  }, [subStarted, subCount, prefersReducedMotion]);

  const firstLineCount = prefersReducedMotion ? LINE1.length : Math.min(h1Count, LINE1.length);
  const secondLineCount = prefersReducedMotion ? LINE2.length : Math.max(0, h1Count - LINE1.length);
  const visibleSubtext = prefersReducedMotion
    ? SUBTEXT
    : SUBTEXT.slice(SUBTEXT.length - subCount);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          <span className="landing-sr-only">
            {LINE1} {LINE2}
          </span>
          <span aria-hidden="true">
            <span className={styles.line}>{LINE1.slice(0, firstLineCount)}</span>
            <span className={styles.line}>{LINE2.slice(0, secondLineCount)}</span>
          </span>
        </h1>

        <p className={styles.subheading}>
          <span className="landing-sr-only">{SUBTEXT}</span>
          <span aria-hidden="true">
            {(subStarted || prefersReducedMotion) && visibleSubtext}
            {(subStarted || prefersReducedMotion) && <span className={styles.cursor}>_</span>}
          </span>
        </p>

        <TrustedByCarousel />
      </div>
    </section>
  );
}
