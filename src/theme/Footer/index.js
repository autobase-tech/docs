import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.divider} />

        <div className={styles.logoMark}>
          <img src="/img/footer/logo-icon.svg" alt="" aria-hidden="true" width={40} height={35} />
          <span className={styles.logoText}>Autobase</span>
        </div>

        <p className={styles.copyright}>
          Copyright © 2019 - 2026. All rights reserved.
        </p>

        <p className={styles.legal}>
          Payments are processed by NovaBridge Tech OÜ,<br />
          which acts as the authorized payment and billing partner for Autobase.
        </p>

        <p className={styles.legal}>
          NovaBridge Tech OÜ. Reg. nr 17390133 · Võru tn 11,<br />
          Lasnamäe linnaosa, Tallinn 13612, Harjumaa, Estonia
        </p>

      </div>
    </footer>
  );
}
