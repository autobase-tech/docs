import React from 'react';
import styles from './styles.module.css';

function CalendarWithClockIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Calendar body */}
      <rect x="6" y="12" width="52" height="46" rx="4" stroke="currentColor" strokeWidth="2.2"/>
      {/* Top bar */}
      <rect x="6" y="12" width="52" height="14" rx="4" fill="currentColor" opacity="0.07"/>
      <line x1="6" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="2"/>
      {/* Ring tabs */}
      <line x1="20" y1="6" x2="20" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="6" x2="44" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Date dots — row 1 */}
      <circle cx="20" cy="34" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="34" r="2.5" fill="var(--color-border)"/>
      <circle cx="44" cy="34" r="2.5" fill="var(--color-border)"/>
      {/* Date dots — row 2 */}
      <circle cx="20" cy="43" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="43" r="2.5" fill="var(--color-border)"/>
      <circle cx="44" cy="43" r="2.5" fill="var(--color-border)"/>
      {/* Date dots — row 3 */}
      <circle cx="20" cy="52" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="52" r="2.5" fill="var(--color-border)"/>

      {/* Clock overlay — bottom right */}
      <circle cx="52" cy="54" r="13" fill="var(--color-bg)" stroke="currentColor" strokeWidth="2"/>
      <line x1="52" y1="46" x2="52" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="52" y1="54" x2="58" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="52" cy="54" r="2" fill="currentColor"/>
    </svg>
  );
}

function StopwatchIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Speed lines */}
      <line x1="4"  y1="34" x2="14" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="6"  y1="42" x2="16" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4"  y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Top button */}
      <rect x="30" y="4" width="12" height="6" rx="3" fill="currentColor"/>
      {/* Stopwatch circle */}
      <circle cx="42" cy="44" r="25" stroke="currentColor" strokeWidth="2.5"/>
      {/* Side crown/button */}
      <line x1="54" y1="22" x2="60" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="57" y="11" width="8" height="5" rx="2" fill="currentColor"/>
      {/* "10" text */}
      <text
        x="42" y="46"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fontWeight="800"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
      >10</text>
      {/* "MIN" text */}
      <text
        x="42" y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="1"
        fontFamily="system-ui, sans-serif"
      >MIN</text>
    </svg>
  );
}

export default function SocialProofSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.banner}>

          {/* Left — text */}
          <div className={styles.text}>
            <p className={styles.before}>1 Month of Infrastructure Work</p>
            <p className={styles.after}>10 Minutes in Autobase</p>
            <span className={styles.underbar} />
          </div>

          {/* Right — visual */}
          <div className={styles.visual}>

            <div className={styles.timeBlock}>
              <CalendarWithClockIcon />
              <span className={styles.timeLabel}>1 MONTH</span>
            </div>

            {/* Arrow */}
            <svg className={styles.arrow} width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden="true">
              <line x1="0" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <polyline points="30,4 42,12 30,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <div className={styles.divider} />

            <div className={styles.timeBlock}>
              <StopwatchIcon />
              <span className={`${styles.timeLabel} ${styles.accentLabel}`}>10 MINUTES</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
