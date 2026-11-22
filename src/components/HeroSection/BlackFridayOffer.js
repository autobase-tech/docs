import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { blackFridayOffer, useBlackFridayOfferActive } from '@site/src/blackFridayOffer';
import { ArchitectureDiagram } from '@site/src/components/ArchDiagramSection';
import styles from './styles.module.css';

export function BlackFridayPromoCode() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(blackFridayOffer.code);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Select and copy the code manually.');
    }
  }

  return (
    <div className={styles.offerRedemption}>
      <p>Use this code at checkout</p>
      <div className={styles.offerCode}>
        <code>{blackFridayOffer.code}</code>
        <button type="button" onClick={copyCode} aria-label="Copy promo code">
          {copyStatus === 'Copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className={copyStatus === 'Copied' || !copyStatus ? 'landing-sr-only' : undefined} role="status">
        {copyStatus === 'Copied' ? 'Promo code copied.' : copyStatus}
      </p>
    </div>
  );
}

export function BlackFridayDeadline() {
  return <time dateTime={blackFridayOffer.endsAt}>{blackFridayOffer.deadline}</time>;
}

function OfferCard() {
  return (
    <article className={styles.offerCard} aria-labelledby="black-friday-heading">
      <p className={styles.label}><span aria-hidden="true">//</span> Black Friday 2026</p>
      <h2 className={styles.offerHeading} id="black-friday-heading">
        <span className={styles.offerDiscount}>{blackFridayOffer.discount} OFF</span>
        <span>Your first year of Autobase Standard</span>
      </h2>

      <p className={styles.offerPrice}>
        <strong>{blackFridayOffer.firstYearPrice}</strong> for the first year. Renews at {blackFridayOffer.renewalPrice}/year.
      </p>
      <p className={styles.offerTerms}>Annual billing. Includes up to 1 DBA hour per month.</p>

      <BlackFridayPromoCode />
      <div className={styles.offerFooter}>
        <p>Ends <BlackFridayDeadline /></p>
        <Link className={styles.offerDetailsLink} to="/black-friday">Offer details</Link>
      </div>
    </article>
  );
}

export default function BlackFridayOffer() {
  const offerActive = useBlackFridayOfferActive();

  if (offerActive === null) return null;

  return offerActive ? <OfferCard /> : <ArchitectureDiagram />;
}
