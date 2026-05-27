import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import OriginalNavbar from '@theme-original/Navbar';
import clsx from 'clsx';
import styles from './styles.module.css';

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function Navbar(props) {
  const { pathname } = useLocation();
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();
  const homePath = useBaseUrl('/');
  const isHomepage = normalizePath(pathname) === normalizePath(homePath);
  const { navbarRef, isNavbarVisible } = useHideableNavbar(
    isHomepage && hideOnScroll
  );

  if (!isHomepage) {
    return (
      <div className={styles.docsNavbar}>
        <OriginalNavbar {...props} />
      </div>
    );
  }

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        styles.navbar,
        hideOnScroll && styles.navbarHideable,
        hideOnScroll && !isNavbarVisible && styles.navbarHidden
      )}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="autobase home">
          <img
            src="/img/navbar/logo-icon.svg"
            alt=""
            className={styles.logoIcon}
            width={48}
            height={42}
          />
          <span className={styles.logoText}>autobase</span>
        </Link>

        {/* Right actions */}
        <div className={styles.actions}>
          <Link to="/docs" className={clsx(styles.cta, styles.ctaPrimary)}>
            Get started
          </Link>
          <a
            href="https://demo.autobase.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.cta, styles.ctaSecondary, styles.demoCta)}
          >
            Product demo
            <span className={styles.demoTooltip} aria-hidden="true">
              use token <span className={styles.demoToken}>demo</span> to access
            </span>
          </a>
          <a
            href="https://github.com/autobase-tech/autobase"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
          >
            <img src="/img/navbar/github.svg" alt="" width={32} height={32} />
          </a>
          <a
            href="https://t.me/pavel_kovcheg"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="Telegram"
          >
            <img src="/img/navbar/telegram.svg" alt="" width={32} height={32} />
          </a>
        </div>

        {/* Mobile: only "Get started" */}
        <div className={styles.mobileActions}>
          <Link to="/docs" className={clsx(styles.cta, styles.ctaPrimary)}>
            Get started
          </Link>
        </div>

      </div>
    </nav>
  );
}
