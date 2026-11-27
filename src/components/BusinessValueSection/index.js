import React from 'react';
import Link from '@docusaurus/Link';
import { INFRASTRUCTURE_COSTS, formatCurrency } from '@site/src/infrastructureCosts';
import styles from './styles.module.css';

const profile = INFRASTRUCTURE_COSTS.medium;
const aws = profile.providers.find((provider) => provider.name === 'AWS');
const monthlySavings = aws.managed - aws.autobase;
const savingsPercent = Math.round(monthlySavings / aws.managed * 100);
const annualSavings = monthlySavings * 12;

export default function BusinessValueSection() {
  return (
    <section className={styles.section} aria-labelledby="business-value-title">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.label}><span aria-hidden="true">//</span> The economics</p>
          <h2 id="business-value-title">What could you save?</h2>
          <p>Choose infrastructure that fits your workload and use Autobase to run your databases without building an internal platform.</p>
          <Link to="/pricing#infrastructure-heading">Compare costs for your setup <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.example}>
          <h3>One Postgres cluster</h3>
          <p>AWS pricing model · One primary and two replicas<br />{profile.label}</p>
          <dl className={styles.comparison}>
            <div className={styles.costRow}>
              <dt>Managed Postgres</dt>
              <dd>{formatCurrency.format(aws.managed)}<small> / mo</small></dd>
            </div>
            <div className={`${styles.costRow} ${styles.autobaseCost}`} style={{'--bar-width': `${aws.autobase / aws.managed * 100}%`}}>
              <dt>Autobase Postgres</dt>
              <dd>{formatCurrency.format(aws.autobase)}<small> / mo</small></dd>
            </div>
          </dl>
          <dl className={styles.savings}>
            <div>
              <dt>Lower infrastructure costs</dt>
              <dd>{savingsPercent}%</dd>
            </div>
            <div>
              <dt>Estimated annual infrastructure savings</dt>
              <dd>{formatCurrency.format(annualSavings)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
