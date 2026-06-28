import React from 'react';
import styles from './styles.module.css';

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M20.6667 12.8888L14.4444 19.111L23.7778 28.4443L30 3.55545L2 14.4443L8.22222 17.5554L11.3333 26.8888L16 20.6666"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <rect width="22" height="16" rx="3.5" fill="#FF0000"/>
      <path d="M9 11.5V4.5L15.5 8L9 11.5Z" fill="white"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 0C24.84 0 32 7.16 32 16C31.9991 19.3524 30.947 22.6201 28.9917 25.3432C27.0364 28.0664 24.2763 30.1077 21.1 31.18C20.3 31.34 20 30.84 20 30.42C20 29.88 20.02 28.16 20.02 26.02C20.02 24.52 19.52 23.56 18.94 23.06C22.5 22.66 26.24 21.3 26.24 15.16C26.24 13.4 25.62 11.98 24.6 10.86C24.76 10.46 25.32 8.82 24.44 6.62C24.44 6.62 23.1 6.18 20.04 8.26C18.76 7.9 17.4 7.72 16.04 7.72C14.68 7.72 13.32 7.9 12.04 8.26C8.98 6.2 7.64 6.62 7.64 6.62C6.76 8.82 7.32 10.46 7.48 10.86C6.46 11.98 5.84 13.42 5.84 15.16C5.84 21.28 9.56 22.66 13.12 23.06C12.66 23.46 12.24 24.16 12.1 25.2C11.18 25.62 8.88 26.3 7.44 23.88C7.14 23.4 6.24 22.22 4.98 22.24C3.64 22.26 4.44 23 5 23.3C5.68 23.68 6.46 25.1 6.64 25.56C6.96 26.46 8 28.18 12.02 27.44C12.02 28.78 12.04 30.04 12.04 30.42C12.04 30.84 11.74 31.32 10.94 31.18C7.75328 30.1193 4.98147 28.082 3.01778 25.3573C1.05409 22.6325 -0.00176096 19.3586 2.20462e-06 16C2.20462e-06 7.16 7.16 0 16 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

const columns = [
  {
    title: 'Contact',
    subtitle: "We'd love to hear from you.",
    links: [
      { label: '@autobase_tech', href: 'https://x.com/autobase_tech', prefix: 'X' },
      { label: 'info@autobase.tech', href: 'mailto:info@autobase.tech', prefix: '@' },
      { label: '@autobase_tech', href: 'https://t.me/autobase_tech', prefix: <TelegramIcon /> },
      { label: 'youtube.com/@Autobase', href: 'https://youtube.com/@Autobase', prefix: <YouTubeIcon /> },
      { label: 'github.com/autobasehq', href: 'https://github.com/autobase-tech/autobase', prefix: <GitHubIcon /> },
    ],
  },
  {
    title: 'Docs',
    subtitle: 'Everything you need to know.',
    links: [
      { label: '→ docs.autobase.tech', href: '/docs' },
    ],
  },
  {
    title: 'Support',
    subtitle: 'Get help and resources.',
    links: [
      { label: '→ autobase.tech/support', href: '/docs/support' },
    ],
  },
];

export default function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{col.title}</h3>
              {col.subtitle && <p className={styles.columnSubtitle}>{col.subtitle}</p>}
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.link}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.prefix && <span className={styles.prefix}>{link.prefix}</span>}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
