import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const LINE1   = 'DATABASE PLATFORM';
const LINE2   = 'FOR POSTGRESQL';
const SUBTEXT = 'Self-Hosted DBaaS (Database as a Service)';
const SPEED   = 60; // ms per character
const H1_TOTAL = LINE1.length + LINE2.length;
const SUB_DELAY = H1_TOTAL * SPEED + 200;     // starts after headline + 0.2s pause

export default function HeroSection() {
  const [h1Count,     setH1Count]     = useState(0);
  const [subCount,    setSubCount]    = useState(0);
  const [subStarted,  setSubStarted]  = useState(false);

  // headline typing (left → right)
  useEffect(() => {
    if (h1Count >= H1_TOTAL) return;
    const id = setTimeout(() => setH1Count(n => n + 1), SPEED);
    return () => clearTimeout(id);
  }, [h1Count]);

  // subheading delay trigger
  useEffect(() => {
    const id = setTimeout(() => setSubStarted(true), SUB_DELAY);
    return () => clearTimeout(id);
  }, []);

  // subheading typing (right → left: rightmost chars appear first)
  useEffect(() => {
    if (!subStarted || subCount >= SUBTEXT.length) return;
    const id = setTimeout(() => setSubCount(n => n + 1), SPEED);
    return () => clearTimeout(id);
  }, [subStarted, subCount]);

  const c1      = Math.min(h1Count, LINE1.length);
  const c2      = Math.max(0, h1Count - LINE1.length);

  // reverse: slice from the right, so last chars appear first
  const subDisplayed = SUBTEXT.slice(SUBTEXT.length - subCount);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          <span className={styles.line}>
            {LINE1.slice(0, c1)}
          </span>
          <span className={styles.line}>
            {LINE2.slice(0, c2)}
          </span>
        </h1>

        <p className={styles.subheading}>
          {subStarted && (
            <>
              {subDisplayed}
              <span className={styles.cursor}>_</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
