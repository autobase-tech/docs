import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const integrations = [
  ['Hetzner Cloud', 'hetzner'], ['AWS', 'aws'], ['Google Cloud', 'gcp'],
  ['Azure', 'azure'], ['DigitalOcean', 'digitalocean'],
];

export default function ValuePropsSection() {
  return (
    <section className={styles.section} aria-labelledby="data-sovereignty-title">
      <div className={styles.inner}>
        <p className={styles.label}><span aria-hidden="true">//</span> Data sovereignty</p>
        <h2 id="data-sovereignty-title" className={styles.heading}>Choose where your data lives.</h2>
        <p className={styles.intro}>
          Your team decides where databases and backups are stored, who has access, and how they are configured.
          Autobase automates Postgres deployment and day-to-day operations on the infrastructure you choose.
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Bring your own cloud <span className={styles.acronym}>(BYOC)</span></h3>
            <p>Deploy Postgres in your own account with a supported cloud provider.</p>
            <ul className={styles.links} aria-label="Cloud deployment guides">
              {integrations.map(([name, slug]) => (
                <li key={slug}><Link to={`/docs/deployment/${slug}`}>{name}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.card}>
            <h3>Bring your own machines <span className={styles.acronym}>(BYOM)</span></h3>
            <p>Run on existing Linux servers in your data center or private cloud.</p>
            <Link to="/docs/deployment/your-own-machines">Deploy on your servers <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
