import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import OriginalNavbar from '@theme-original/Navbar';
import clsx from 'clsx';
import styles from './styles.module.css';

const navLinks = [
  { label: '/docs',   to: '/docs' },
  { label: '/github', href: 'https://github.com/autobase-tech/autobase' },
  { label: '/demo',   href: 'https://demo.autobase.tech' },
];

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function Navbar(props) {
  const { pathname } = useLocation();
  const homePath = useBaseUrl('/');
  const isHomepage = normalizePath(pathname) === normalizePath(homePath);

  if (!isHomepage) {
    return (
      <div className={styles.docsNavbar}>
        <OriginalNavbar {...props} />
      </div>
    );
  }

  return (
    <nav className={clsx('navbar', styles.navbar)}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="autobase home">
          <img
            src="/img/navbar/logo-icon.svg"
            alt=""
            className={styles.logoIcon}
            width={40}
            height={35}
          />
          <span className={styles.logoText}>Autobase</span>
        </Link>

        {/* Center nav links */}
        <nav className={styles.navLinks} aria-label="Main navigation">
          {navLinks.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className={styles.navLink}>
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                {link.label}
              </a>
            )
          )}
        </nav>


      </div>
    </nav>
  );
}
