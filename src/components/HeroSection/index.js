import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const TYPEWRITER_TEXT = 'DBaaS Platform';
const CHAR_SPEED = 58;

export default function HeroSection() {
  const postgresRef = useRef(null);
  const bodyRef     = useRef(null);
  const [typed, setTyped]               = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    import('gsap').then(({ gsap }) => {
      if (!mounted) return;

      // 1. "PostgreSQL." — scale + opacity entrance
      gsap.fromTo(
        postgresRef.current,
        { opacity: 0, scale: 0.88, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.95,
          ease: 'expo.out',
          onComplete() {
            if (!mounted) return;
            setCursorVisible(true);
            let i = 0;
            const tick = setInterval(() => {
              if (!mounted) { clearInterval(tick); return; }
              i++;
              setTyped(TYPEWRITER_TEXT.slice(0, i));
              if (i >= TYPEWRITER_TEXT.length) {
                clearInterval(tick);
                setTimeout(() => { if (mounted) setCursorVisible(false); }, 800);
              }
            }, CHAR_SPEED);
          },
        }
      );

      // 2. Body + CTAs fade up slightly after
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.55 }
      );
    });

    return () => { mounted = false; };
  }, []);

  return (
    <section id="autobase-hero-section" className={styles.heroSection}>
      <img
        aria-hidden="true"
        className={styles.bgTexture}
        src="/img/hero/hero-bg-texture.png"
        alt=""
        decoding="async"
      />

      <div className={styles.inner}>
        <div className="row align-items-center" style={{ minHeight: '100vh' }}>

          {/* Text column */}
          <div className="col-12 col-lg-6">
            <div className={styles.content}>
              <h1 className={styles.heading}>
                <span
                  ref={postgresRef}
                  className={styles.headingWhite}
                  style={{ opacity: 0 }}
                >
                  PostgreSQL
                </span>
                <span className={styles.headingLine2}>
                  <span className={styles.headingGradient}>{typed}</span>
                  {cursorVisible && (
                    <span className={styles.typingCursor} aria-hidden="true">|</span>
                  )}
                </span>
              </h1>

              <div ref={bodyRef} className={styles.bodyWrap} style={{ opacity: 0 }}>
                <p className={styles.body}>
                  Get the experience of a managed database service inside your own infrastructure.
                  Deploy, operate, scale and manage PostgreSQL with a unified platform while keeping full control over your infrastructure and data.
                </p>
                <div className={styles.ctaRow}>
                  <Link className={styles.ctaPrimary} to="/docs">
                    Get started
                  </Link>
                  <Link className={styles.ctaSecondary} to="https://t.me/pavel_kovcheg">
                    Chat on Telegram
                    <img src="/img/hero/telegram.svg" alt="" width={24} height={24} decoding="async" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
            <img
              className={styles.heroImage}
              src="/img/hero/hero-server.png"
              alt="PostgreSQL server illustration"
              fetchpriority="high"
              decoding="async"
            />
          </div>

        </div>
      </div>

      <img aria-hidden="true" className={styles.gridDotsLg} src="/img/hero/grid-dots-lg.svg" alt="" decoding="async" />
      <img aria-hidden="true" className={styles.gridDotsSm} src="/img/hero/grid-dots-sm.svg" alt="" decoding="async" />
    </section>
  );
}
