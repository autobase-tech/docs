import React from 'react';
import styles from './styles.module.css';

const sponsors = [
  { name: 'Axiom', img: '/img/sponsors/axiom.png', href: 'https://axiom.trade' },
  { name: 'Awarebuildings', img: '/img/sponsors/awarebuildings.png', href: 'https://www.awarebuildings.com' },
  { name: 'Antistock', img: '/img/sponsors/antistock.png', href: 'https://antistock.io' },
  { name: 'Codefloe', img: '/img/sponsors/codefloe.png', href: 'https://codefloe.com' },
  { name: 'Edclub', img: '/img/sponsors/edclub.png', href: 'https://www.edclub.com' },
  { name: 'Fera', img: '/img/sponsors/fera.png', href: 'https://fera.ai' },
  { name: 'GS Labs', img: '/img/sponsors/gs-labs.png', href: 'https://gs-labs.ru' },
  { name: 'New Byte', img: '/img/sponsors/newbyte.png', href: 'https://newbyte.net.br' },
  { name: 'Optiwise', img: '/img/sponsors/optiwise.png', href: 'https://optiwise.nl' },
  { name: 'Postgres.AI', img: '/img/sponsors/postgresai.png', href: 'https://postgres.ai' },
  { name: 'Staffery', img: '/img/sponsors/staffery.png', href: 'https://www.staffery.com' },
  { name: 'Toncarton', img: '/img/sponsors/toncarton.png', href: 'https://www.toncarton.com' },
  { name: 'We-Manage', img: '/img/sponsors/we-manage.png', href: 'https://we-manage.de' },
];

function LogoSet({ hidden = false }) {
  return (
    <div className={styles.logoSet} aria-hidden={hidden}>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoLink}
        >
          <img
            src={sponsor.img}
            alt={hidden ? '' : sponsor.name}
            className={styles.logoImg}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
}

export default function TrustedByCarousel() {
  return (
    <div className={styles.trustedBy}>
      <div className={styles.label}>
        <span className={styles.prompt}>//</span>
        <span>Trusted by teams running Autobase in production</span>
      </div>
      <div className={styles.strip}>
        <div className={styles.track}>
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </div>
  );
}
