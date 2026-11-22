import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { blackFridayOffer, useBlackFridayOfferActive } from '@site/src/blackFridayOffer';
import {
  BlackFridayDeadline,
  BlackFridayPromoCode,
} from '@site/src/components/HeroSection/BlackFridayOffer';
import styles from './black-friday.module.css';

function GuideScreenshot({ path, screen, alt, width, height }) {
  const src = useBaseUrl(path);

  return (
    <figure className={styles.guideScreenshot}>
      <a href={src} aria-label={`Open the full-size ${screen} screenshot`}>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
    </figure>
  );
}

export default function BlackFridayPage() {
  const offerActive = useBlackFridayOfferActive();
  const offerEnded = offerActive === false;
  const { code, discount, firstYearPrice, renewalPrice } = blackFridayOffer;

  return (
    <Layout
      wrapperClassName="landingPage"
      title="Black Friday 2026"
      description="Pricing, terms, and redemption details for the Autobase Standard annual Black Friday offer.">
      <main className={styles.page}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Black Friday 2026</p>
            <h1>
              {offerEnded ? 'The Black Friday offer has ended' : (
                <><span>{discount} off</span> your first year of Autobase Standard</>
              )}
            </h1>
            <p className={styles.description}>
              Standard supports up to five PostgreSQL clusters and includes up to one DBA consulting hour per month.
            </p>
          </div>

          <section aria-labelledby="offer-terms-heading" className={styles.terms}>
            <h2 id="offer-terms-heading">Offer terms</h2>
            <dl>
              <div><dt>Plan</dt><dd>Standard (Annual)</dd></div>
              <div><dt>First year</dt><dd>{firstYearPrice}</dd></div>
              <div><dt>Annual renewal</dt><dd>{renewalPrice}/year</dd></div>
            </dl>
            {offerActive && <BlackFridayPromoCode />}
            <p className={styles.deadline}>
              {offerEnded ? 'Ended' : 'Offer deadline'} <BlackFridayDeadline />
            </p>
          </section>
        </div>

        {offerActive && (
          <section aria-labelledby="redeem-offer-heading" className={styles.steps}>
            <h2 id="redeem-offer-heading">How to redeem</h2>
            <ol>
              <li>
                In your Autobase Console, open <strong>Billing</strong> in the sidebar
                (the <code>/billing</code> page) and click <strong>Upgrade plan</strong>.
                <GuideScreenshot
                  path="/img/black-friday/billing.png"
                  screen="Billing"
                  alt="Autobase Console with Billing selected in the sidebar and the Upgrade plan button highlighted."
                  width={1910}
                  height={1516}
                />
              </li>
              <li>
                Set <strong>Billing period</strong> to <strong>annual</strong> and <strong>Payment method</strong> to{' '}
                <strong>Stripe</strong>. Under <strong>Standard</strong>, click <strong>Select plan</strong>.
                <GuideScreenshot
                  path="/img/black-friday/upgrade-plan.png"
                  screen="Upgrade plan"
                  alt="The Upgrade plan dialog with arrows pointing to annual billing and the Select plan button for Standard."
                  width={1830}
                  height={914}
                />
              </li>
              <li>
                In Stripe Checkout, open <strong>Add promotion code</strong> and enter <strong>{code}</strong>.
                <GuideScreenshot
                  path="/img/black-friday/stripe-add-code.png"
                  screen="Stripe promotion code entry"
                  alt="Stripe Checkout for Standard Annual with Add promotion code highlighted below the subtotal."
                  width={1419}
                  height={1109}
                />
              </li>
              <li>
                Before paying, confirm that Stripe shows <strong>{discount} off for a year</strong> and a first-year
                price of <strong>{firstYearPrice}</strong>.
                <GuideScreenshot
                  path="/img/black-friday/stripe-code-applied.png"
                  screen="Stripe discount confirmation"
                  alt="Stripe Checkout with FRIDAY2026 applied, showing $1,536 due today and $3,072 per year starting next year."
                  width={1411}
                  height={1115}
                />
              </li>
            </ol>
          </section>
        )}

        <section aria-labelledby="slack-support-heading" className={styles.steps}>
          <h2 id="slack-support-heading">Your private Slack support channel</h2>
          <p className={styles.supportCopy}>
            Once your Standard subscription is active, we’ll create a private Slack support channel for your team.
            Send us the email addresses of up to two teammates to invite, or ask us to connect the channel to your
            organization’s Slack workspace. Please contact us at{' '}
            <a href="mailto:support@autobase.tech">support@autobase.tech</a>.
          </p>
        </section>
      </main>
    </Layout>
  );
}
