import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css';

const props = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <text x="8" y="23" fontFamily="monospace" fontSize="14" fill="currentColor" fontWeight="bold">{'> _'}</text>
      </svg>
    ),
    title: 'Your Infrastructure',
    description: 'Run anywhere. You are in control.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <ellipse cx="18" cy="10" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10v8c0 2.49 5.37 4.5 12 4.5s12-2.01 12-4.5v-8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 18v8c0 2.49 5.37 4.5 12 4.5s12-2.01 12-4.5v-8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Your Data',
    description: 'Your data stays where you deploy.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 4L6 9v9c0 7.18 5.13 13.9 12 15.47C24.87 31.9 30 25.18 30 18V9L18 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 18l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Your Security',
    description: 'Your network. Your rules.',
  },
];

export default function ValuePropsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx;
    import('gsap').then(({ gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            gridRef.current?.querySelectorAll(`.${styles.card}`),
            { opacity: 0, scale: 0.6, y: -10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.55,
              ease: 'back.out(1.4)',
              stagger: 0.12,
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      })
    );
    return () => ctx?.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid} ref={gridRef}>
          {props.map((p) => (
            <div key={p.title} className={styles.card}>
              <div className={styles.icon}>{p.icon}</div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.description}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
