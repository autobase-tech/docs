import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

const navGroups = [
  {
    title: 'Docs',
    links: [{ label: 'Introduction', href: '/docs/intro' }],
  },
  {
    title: 'Support',
    links: [{ label: 'Support Packages', href: '/support' }],
  },
  {
    title: 'Source code',
    links: [{ label: 'Github', href: 'https://github.com/autobase-tech/autobase', external: true }],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Decorative vector — absolutely positioned, clips on right edge */}
      <img
        className={styles.vectorLine}
        src="/img/footer/vector-line.svg"
        alt=""
        aria-hidden="true"
      />

      <div className={styles.inner}>

        {/* ── Hero area: hero text + CTAs ── */}
        <div className={styles.heroArea}>
          <div className={styles.heroContent}>

            {/* type.hero.900 */}
            <h2 className={styles.heroHeading}>
              Run PostgreSQL<br />
              as a <span className={styles.orange}>system</span>.
            </h2>

            {/* type.body-lg.500 */}
            <p className={styles.heroSubtext}>Not as a set of servers.</p>

            {/* CTAs */}
            <div className={styles.ctaRow}>
              <Link to="/docs" className={styles.ctaPrimary}>
                Get started
              </Link>
              <a
                href="https://t.me/autobase_tech"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                Chat on Telegram
                <img
                  src="/img/footer/icon-telegram.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                />
              </a>
            </div>

          </div>
        </div>

        {/* ── Footer bottom: nav + social + copyright ── */}
        <div className={styles.footerBottom}>

          {/* Nav groups + social */}
          <div className={clsx('row align-items-start', styles.navRow)}>
            {navGroups.map((group) => (
              <div key={group.title} className="col-12 col-md-auto">
                <div className={styles.navGroup}>
                  <span className={styles.navTitle}>{group.title}</span>
                  {group.links.map((link) =>
                    link.external ? (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                        {link.label}
                      </a>
                    ) : (
                      <Link key={link.label} to={link.href} className={styles.navLink}>
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="col-12 col-md-auto">
              <div className={styles.socialGroup}>
                <a
                  href="https://x.com/autobase_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <img src="/img/footer/icon-x.svg" alt="X (Twitter)" width={24} height={24} />
                  <span>autobase_tech</span>
                </a>
                <a href="mailto:info@autobase.tech" className={styles.socialItem}>
                  <img src="/img/footer/icon-email.svg" alt="Email" width={24} height={24} />
                  <span>info@autobase.tech</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className={styles.copyrightRow}>
            <div className={styles.logoMark}>
              <img
                src="/img/footer/logo-icon.svg"
                alt=""
                aria-hidden="true"
                width={48}
                height={42}
              />
              <span className={styles.logoText}>autobase</span>
            </div>
            <p className={styles.copyright}>
              Copyright © 2019 - 2026. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
