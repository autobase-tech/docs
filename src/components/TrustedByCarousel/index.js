import React, { useRef } from 'react';
import styles from './styles.module.css';

const trusted = [
  { name: 'Axiom', img: '/img/trusted/axiom.png', darkImg: '/img/trusted/axiom.dark.png', href: 'https://axiom.trade' },
  { name: 'Awarebuildings', img: '/img/trusted/awarebuildings.png', darkImg: '/img/trusted/awarebuildings.dark.png', href: 'https://www.awarebuildings.com' },
  { name: 'Antistock', img: '/img/trusted/antistock.png', darkImg: '/img/trusted/antistock.dark.png', href: 'https://antistock.io' },
  { name: 'Codefloe', img: '/img/trusted/codefloe.png', darkImg: '/img/trusted/codefloe.dark.png', href: 'https://codefloe.com' },
  { name: 'Edclub', img: '/img/trusted/edclub.png', darkImg: '/img/trusted/edclub.dark.png', href: 'https://www.edclub.com' },
  { name: 'Fera', img: '/img/trusted/fera.png', darkImg: '/img/trusted/fera.dark.png', href: 'https://fera.ai' },
  { name: 'GS Labs', img: '/img/trusted/gs-labs.png', darkImg: '/img/trusted/gs-labs.dark.png', href: 'https://gs-labs.ru' },
  { name: 'New Byte', img: '/img/trusted/newbyte.png', darkImg: '/img/trusted/newbyte.dark.png', href: 'https://newbyte.net.br' },
  { name: 'Optiwise', img: '/img/trusted/optiwise.png', darkImg: '/img/trusted/optiwise.dark.png', href: 'https://optiwise.nl' },
  { name: 'Postgres.AI', img: '/img/trusted/postgresai.png', darkImg: '/img/trusted/postgresai.dark.png', href: 'https://postgres.ai' },
  { name: 'Staffery', img: '/img/trusted/staffery.png', href: 'https://www.staffery.com' },
  { name: 'Toncarton', img: '/img/trusted/toncarton.png', darkImg: '/img/trusted/toncarton.dark.png', href: 'https://www.toncarton.com' },
  { name: 'We-Manage', img: '/img/trusted/we-manage.png', darkImg: '/img/trusted/we-manage.dark.png', href: 'https://we-manage.de' },
  { name: 'Asakabank', img: '/img/trusted/asakabank.png', darkImg: '/img/trusted/asakabank.dark.png', href: 'https://www.asakabank.uz/en/' },
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
      {trusted.map((sponsor) => {
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
  const dialogRef = useRef(null);
  const dialogTitleRef = useRef(null);
  const emailHref = `mailto:info@autobase.tech?subject=${encodeURIComponent('Autobase customer logo and story')}&body=${encodeURIComponent('Hi Autobase team,\n\nWe use Autobase at [company]. Here is how we use it:\n\n[Your story]\n')}`;

  return (
    <div className={styles.trustedBy}>
      <div className={styles.label}>
        <span className={styles.prompt}>//</span>
        <span>Trusted by teams running Autobase in production</span>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.strip}>
          <div className={styles.track}>
            <LogoSet />
            <LogoSet hidden />
          </div>
        </div>
        <button type="button" className={styles.addLogo} onClick={() => {
          dialogRef.current?.showModal();
          dialogTitleRef.current?.focus();
        }}>
          <span aria-hidden="true">+</span> <span>Add logo</span>
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="add-logo-title"
        aria-describedby="add-logo-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className={styles.dialogContent}>
          <button type="button" className={styles.closeDialog} aria-label="Close dialog" onClick={() => dialogRef.current?.close()}>×</button>
          <h2 id="add-logo-title" ref={dialogTitleRef} tabIndex={-1}>Add your logo</h2>
          <p id="add-logo-description">
            Does your company use Autobase and want to see your logo here? Send your logo to <a href="mailto:info@autobase.tech">info@autobase.tech</a> and tell us how you use Autobase. We’d love to hear your story.
          </p>
          <a className={styles.emailButton} href={emailHref}>Email us <span aria-hidden="true">↗</span></a>
        </div>
      </dialog>
    </div>
  );
}
