import React from 'react';
import styles from './styles.module.css';

const sponsors = [
  { name: 'Axiom', img: '/img/sponsors/axiom.png', darkImg: '/img/sponsors/axiom.dark.png', href: 'https://axiom.trade' },
  { name: 'Awarebuildings', img: '/img/sponsors/awarebuildings.png', darkImg: '/img/sponsors/awarebuildings.dark.png', href: 'https://www.awarebuildings.com' },
  { name: 'Antistock', img: '/img/sponsors/antistock.png', darkImg: '/img/sponsors/antistock.dark.png', href: 'https://antistock.io' },
  { name: 'Codefloe', img: '/img/sponsors/codefloe.png', darkImg: '/img/sponsors/codefloe.dark.png', href: 'https://codefloe.com' },
  { name: 'Edclub', img: '/img/sponsors/edclub.png', darkImg: '/img/sponsors/edclub.dark.png', href: 'https://www.edclub.com' },
  { name: 'Fera', img: '/img/sponsors/fera.png', darkImg: '/img/sponsors/fera.dark.png', href: 'https://fera.ai' },
  { name: 'GS Labs', img: '/img/sponsors/gs-labs.png', darkImg: '/img/sponsors/gs-labs.dark.png', href: 'https://gs-labs.ru' },
  { name: 'New Byte', img: '/img/sponsors/newbyte.png', darkImg: '/img/sponsors/newbyte.dark.png', href: 'https://newbyte.net.br' },
  { name: 'Optiwise', img: '/img/sponsors/optiwise.png', darkImg: '/img/sponsors/optiwise.dark.png', href: 'https://optiwise.nl' },
  { name: 'Postgres.AI', img: '/img/sponsors/postgresai.png', darkImg: '/img/sponsors/postgresai.dark.png', href: 'https://postgres.ai' },
  { name: 'Staffery', img: '/img/sponsors/staffery.png', href: 'https://www.staffery.com' },
  { name: 'Toncarton', img: '/img/sponsors/toncarton.png', darkImg: '/img/sponsors/toncarton.dark.png', href: 'https://www.toncarton.com' },
  { name: 'We-Manage', img: '/img/sponsors/we-manage.png', darkImg: '/img/sponsors/we-manage.dark.png', href: 'https://we-manage.de' },
];

function normalizeLogoSize(event) {
  const image = event.currentTarget;
  if (!image.naturalWidth || !image.naturalHeight) {
    return;
  }

  if (image.naturalHeight / image.naturalWidth > 0.55) {
    image.classList.add(styles.logoSquareAsset);
  }
}

function LogoSet({ hidden = false }) {
  return (
    <div className={styles.logoSet} aria-hidden={hidden}>
      {sponsors.map((sponsor) => {
        const content = (
          <>
            <img
              src={sponsor.img}
              alt={hidden ? '' : sponsor.name}
              className={`${styles.logoImg} ${sponsor.darkImg ? styles.logoLight : ''}`}
              onLoad={normalizeLogoSize}
              loading="lazy"
              decoding="async"
            />
            {sponsor.darkImg && (
              <img
                src={sponsor.darkImg}
                alt=""
                aria-hidden="true"
                className={`${styles.logoImg} ${styles.logoDark}`}
                onLoad={normalizeLogoSize}
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        );

        return hidden ? (
          <span key={sponsor.name} className={styles.logoLink}>
            {content}
          </span>
        ) : (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
          >
            {content}
          </a>
        );
      })}
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
