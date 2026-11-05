import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const trusted = [
  { name: 'Staffery', img: '/img/trusted/staffery.png', href: 'https://www.staffery.com' },
  { name: 'Fera', img: '/img/trusted/fera.png', darkImg: '/img/trusted/fera.dark.png', href: 'https://fera.ai' },
  { name: 'Axiom', img: '/img/trusted/axiom.png', darkImg: '/img/trusted/axiom.dark.png', href: 'https://axiom.trade' },
  { name: 'GS Labs', img: '/img/trusted/gs-labs.png', darkImg: '/img/trusted/gs-labs.dark.png', href: 'https://gs-labs.ru' },
  { name: 'Edclub', img: '/img/trusted/edclub.png', darkImg: '/img/trusted/edclub.dark.png', href: 'https://www.edclub.com' },
  { name: 'Optiwise', img: '/img/trusted/optiwise.png', darkImg: '/img/trusted/optiwise.dark.png', href: 'https://optiwise.nl' },
  { name: 'New Byte', img: '/img/trusted/newbyte.png', darkImg: '/img/trusted/newbyte.dark.png', href: 'https://newbyte.net.br' },
  { name: 'Antistock', img: '/img/trusted/antistock.png', darkImg: '/img/trusted/antistock.dark.png', href: 'https://antistock.io' },
  { name: 'We-Manage', img: '/img/trusted/we-manage.png', darkImg: '/img/trusted/we-manage.dark.png', href: 'https://we-manage.de' },
  { name: 'Postgres.AI', img: '/img/trusted/postgresai.png', darkImg: '/img/trusted/postgresai.dark.png', href: 'https://postgres.ai' },
  { name: 'Toncarton', img: '/img/trusted/toncarton.png', darkImg: '/img/trusted/toncarton.dark.png', href: 'https://www.toncarton.com' },
  { name: 'Asakabank', img: '/img/trusted/asakabank.png', darkImg: '/img/trusted/asakabank.dark.png', href: 'https://www.asakabank.uz/en/' },
  { name: 'Codefloe', img: '/img/trusted/codefloe.png', darkImg: '/img/trusted/codefloe.dark.png', href: 'https://codefloe.com', scale: 1.2 },
  { name: 'Awarebuildings', img: '/img/trusted/awarebuildings.png', darkImg: '/img/trusted/awarebuildings.dark.png', href: 'https://www.awarebuildings.com', square: true, scale: 1.5 },
];

const uniqueLogos = trusted.filter(
  (logo, index) => trusted.findIndex((entry) => entry.name === logo.name) === index,
);
const logoLimit = 14;
const logoOffsetKey = 'autobase-trusted-logo-offset';

function getLogoBatch(offset) {
  return uniqueLogos.slice(offset).concat(uniqueLogos.slice(0, offset)).slice(0, logoLimit);
}

function LogoGrid({ children }) {
  const [logos, setLogos] = useState(() => getLogoBatch(0));
  const hasSelectedBatch = useRef(false);

  useEffect(() => {
    if (uniqueLogos.length < 2 || hasSelectedBatch.current) return;
    hasSelectedBatch.current = true;

    try {
      const storedOffset = Number(window.sessionStorage.getItem(logoOffsetKey));
      const offset = Number.isSafeInteger(storedOffset) && storedOffset >= 0
        ? storedOffset % uniqueLogos.length
        : 0;
      const step = uniqueLogos.length > logoLimit ? logoLimit : 1;
      const nextOffset = (offset + step) % uniqueLogos.length;
      window.sessionStorage.setItem(logoOffsetKey, String(nextOffset));
      setLogos(getLogoBatch(offset));
    } catch {
      // Keep the initial batch when session storage is unavailable.
    }
  }, []);

  return (
    <div className={styles.logoGrid}>
      {logos.map((sponsor) => {
        const imageClassName = sponsor.square
          ? `${styles.logoImg} ${styles.logoSquareAsset}`
          : styles.logoImg;

        return (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
            style={sponsor.scale === undefined ? undefined : { '--logo-scale': sponsor.scale }}
            aria-label={sponsor.name}
          >
            <img
              src={sponsor.img}
              alt=""
              className={sponsor.darkImg ? `${imageClassName} ${styles.logoLight}` : imageClassName}
              loading="lazy"
              decoding="async"
            />
            {sponsor.darkImg && (
              <img
                src={sponsor.darkImg}
                alt=""
                className={`${imageClassName} ${styles.logoDark}`}
                loading="lazy"
                decoding="async"
              />
            )}
          </a>
        );
      })}
      {children}
    </div>
  );
}

export default function TrustedByLogos() {
  const dialogRef = useRef(null);
  const dialogTitleRef = useRef(null);
  const emailHref = `mailto:info@autobase.tech?subject=${encodeURIComponent('Autobase customer logo and story')}&body=${encodeURIComponent('Hi Autobase team,\n\nWe use Autobase at [company]. Here is how we use it:\n\n[Your story]\n')}`;
  const addLogoButton = (
    <button type="button" className={styles.addLogo} onClick={() => {
      dialogRef.current?.showModal();
      dialogTitleRef.current?.focus();
    }}>
      <span aria-hidden="true">+</span> <span>Add logo</span>
    </button>
  );

  return (
    <div className={styles.trustedBy}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.prompt}>//</span>
          <span>Trusted by teams running Autobase in production</span>
        </div>
        {addLogoButton}
      </div>
      <LogoGrid>{addLogoButton}</LogoGrid>
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
