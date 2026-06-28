import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

const navLinks = [
  { label: '/docs',   to: '/docs' },
  { label: '/github', href: 'https://github.com/autobase-tech/autobase' },
  { label: '/demo',   href: 'https://demo.autobase.tech' },
];

export default function Navbar() {
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
