import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function DocsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="1.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 6.5h7M6.5 10h7M6.5 13.5h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

export default function SideNavbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show side nav after top navbar (72px) has fully left the viewport
    const THRESHOLD = 80;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      className={`${styles.sidebar} ${visible ? styles.visible : ''}`}
      aria-label="Side navigation"
    >
      {/* Logo */}
      <Link to="/" className={styles.logoLink} aria-label="Autobase home">
        <img
          src="/img/navbar/logo-icon.svg"
          alt="Autobase"
          width={26}
          height={23}
          className={styles.logoImg}
        />
      </Link>

      <div className={styles.divider} />

      {/* Docs */}
      <Link to="/docs" className={styles.iconLink} title="Docs">
        <DocsIcon />
      </Link>

      <div className={styles.divider} />

      {/* GitHub */}
      <a
        href="https://github.com/autobase-tech/autobase"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconLink}
        title="GitHub"
      >
        <GitHubIcon />
      </a>

      <div className={styles.divider} />

      {/* Demo */}
      <a
        href="https://demo.autobase.tech"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.demoBtn}
        title="Book a demo"
      >
        <span className={styles.demoBtnText}>DEMO</span>
      </a>
    </aside>
  );
}
