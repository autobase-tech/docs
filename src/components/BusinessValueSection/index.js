import React from 'react';
import Link from '@docusaurus/Link';
import { INFRASTRUCTURE_COSTS, formatCurrency } from '@site/src/infrastructureCosts';
import styles from './styles.module.css';

const profile = INFRASTRUCTURE_COSTS.medium;
const aws = profile.providers.find((provider) => provider.name === 'AWS');

export default function BusinessValueSection() {
  return (
    <section className={styles.section} aria-labelledby="business-value-title">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.label}><span aria-hidden="true">//</span> The economics</p>
          <h2 id="business-value-title">What would PostgreSQL cost on your own infrastructure?</h2>
          <p>You pay your provider for the machines and choose an Autobase plan for the software.
            Your team gets a platform for running its databases without having to build one in-house.</p>
          <Link to="/pricing#infrastructure-heading">Compare costs for your setup <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.example}>
          <h3>One cluster on AWS</h3>
          <p>Pricing model · One primary and two replicas<br />{profile.label}</p>
          <dl>
            <div><dt>Managed PostgreSQL</dt><dd>{formatCurrency.format(aws.managed)}<small> / mo</small></dd></div>
            <div><dt>Infrastructure with Autobase</dt><dd>{formatCurrency.format(aws.autobase)}<small> / mo</small></dd></div>
          </dl>
          <p>Autobase Starter is free for up to two clusters.</p>
        </div>
      </div>
    </section>
  );
}
