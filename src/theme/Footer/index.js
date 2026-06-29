import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalFooter from '@theme-original/Footer';
import styles from './styles.module.css';

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function Footer(props) {
  const { pathname } = useLocation();
  const { colorModeChoice, setColorMode } = useColorMode();
  const homePath = useBaseUrl('/');
  const isHomepage = normalizePath(pathname) === normalizePath(homePath);
  const colorModeLabel = colorModeChoice ?? 'system';
  const isSystemColorMode = colorModeChoice == null;
  const nextColorModeChoice =
    isSystemColorMode ? 'light' : colorModeChoice === 'light' ? 'dark' : null;
  const nextColorModeLabel = nextColorModeChoice ?? 'system';

  if (!isHomepage) {
    return <OriginalFooter {...props} />;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.divider} />

        <div className={styles.logoRow}>
          <div className={styles.logoMark}>
            <img src="/img/footer/logo-icon.svg" alt="" aria-hidden="true" width={40} height={35} />
            <span className={styles.logoText}>Autobase</span>
          </div>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setColorMode(nextColorModeChoice)}
            aria-label={`Theme mode: ${colorModeLabel}. Switch to ${nextColorModeLabel}.`}
          >
            <span className={styles.themePrompt}>&gt;</span>
            <span>{colorModeLabel}</span>
          </button>
        </div>

        <p className={styles.copyright}>
          Copyright © 2019 - 2026. All rights reserved.
        </p>

        <p className={styles.legal}>
          Payments are processed by NovaBridge Tech OÜ, which acts as the authorized payment and billing partner for Autobase.<br />
          NovaBridge Tech OÜ. Reg. nr 17390133 · Võru tn 11, Lasnamäe linnaosa, Tallinn 13612, Harjumaa, Estonia
        </p>

      </div>
    </footer>
  );
}
