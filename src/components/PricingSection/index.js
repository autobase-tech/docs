import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const plans = [
  {
    id: 'free',
    name: 'Free',
    image: '/img/pricing/header-free.png',
    description: 'Open-source version with limited platform functionality.',
    features: ['No guarantees.', 'No support.'],
    cta: 'Try Free',
    href: '#',
  },
  {
    id: 'standard',
    name: 'Standard',
    image: '/img/pricing/header-standard.png',
    price: 256,
    billing: 'per month if billed monthly.',
    features: [
      'Basic monitoring',
      'Shared infrastructure',
      'Up to 2 clusters',
      '1 DBA hour included',
    ],
    cta: 'Start now',
    href: '#',
  },
  {
    id: 'professional',
    name: 'Professional',
    image: '/img/pricing/header-professional.png',
    price: 1024,
    billing: 'per month if billed monthly.',
    popular: true,
    features: [
      'Up to 10 clusters',
      'Up to 5 DBA hours included',
      'Priority support',
      'Production-ready setup',
      'SLA / uptime guarantee',
    ],
    cta: 'Launch production',
    href: '#',
  },
  {
    id: 'premium',
    name: 'Premium',
    image: '/img/pricing/header-premium.png',
    price: 4096,
    billing: 'per month if billed monthly.',
    premium: true,
    features: [
      'Unlimited clusters',
      'Up to 15 DBA hours included',
      'Dedicated DBA',
      'Custom architecture',
      'direct Slack / Telegram support',
      'Performance optimization',
    ],
    cta: 'Scale with Autobase',
    href: '#',
  },
];

export default function PricingSection() {
  const [monthly, setMonthly] = useState(true);

  return (
    <section className={styles.section}>

      {/* ── Heading ── */}
      <div className={styles.hero}>
        <h2 className={styles.heading}>Pricing</h2>
        <p className={styles.subtitle}>
          You are not buying a tool. You are buying a{' '}
          <span className={styles.orange}>system</span>.
        </p>
      </div>

      {/* ── Billing switcher (placeholder) ── */}
      <div className={styles.switcherWrap}>
        <p className={styles.billingLabel}>Billing period</p>
        <div className={styles.switcher}>
          <button
            className={clsx(styles.switchBtn, !monthly && styles.switchBtnActive)}
            onClick={() => setMonthly(false)}
          >
            Paid yearly
          </button>
          <button
            className={clsx(styles.switchBtn, monthly && styles.switchBtnActive)}
            onClick={() => setMonthly(true)}
          >
            Paid monthly
          </button>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className={clsx('row', styles.cardsRow)}>
        {plans.map((plan) => (
          <div key={plan.id} className="col-12 col-md-6 col-lg-3">
            <div className={clsx(styles.card, plan.premium && styles.cardPremium)}>

              {/* Header image */}
              <div className={styles.cardHeader}>
                <img
                  src={plan.image}
                  alt={plan.name}
                  className={styles.cardImg}
                />
                {plan.popular && (
                  <div className={styles.popularBadge}>Most popular</div>
                )}
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <p className={styles.planName}>{plan.name}</p>

                <div className={styles.priceBlock}>
                  {plan.price ? (
                    <>
                      <p className={styles.price}>
                        <span className={styles.currency}>$</span>
                        {plan.price}
                      </p>
                      <p className={styles.billing}>{plan.billing}</p>
                    </>
                  ) : (
                    <p className={styles.freeDesc}>{plan.description}</p>
                  )}
                </div>

                <ul className={styles.featureList}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <img
                        src="/img/pricing/icon-check.svg"
                        alt=""
                        aria-hidden="true"
                        width={18}
                        height={18}
                        className={styles.checkIcon}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.ctaWrap}>
                  <a href={plan.href} className={styles.cta}>
                    {plan.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Notes ── */}
      <div className={styles.notes}>
        <div className={styles.noteItem}>
          <img src="/img/pricing/icon-info.svg" alt="" aria-hidden="true" width={24} height={24} />
          <span>1 month free with annual billing</span>
        </div>
        <div className={styles.noteItem}>
          <img src="/img/pricing/icon-info.svg" alt="" aria-hidden="true" width={24} height={24} />
          <span>additional DBA hours: $300/hour</span>
        </div>
        <div className={styles.noteItem}>
          <img src="/img/pricing/stripe-logo.png" alt="Stripe" className={styles.stripeLogo} />
          <span>All-in-one Payment management</span>
        </div>
      </div>

    </section>
  );
}
