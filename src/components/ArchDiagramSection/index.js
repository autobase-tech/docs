import React from 'react';
import styles from './styles.module.css';

function ArrowDown() {
  return (
    <svg className={styles.arrowDown} width="16" height="48" viewBox="0 0 16 48" fill="none" aria-hidden="true">
      <line x1="8" y1="0" x2="8" y2="40" stroke="currentColor" strokeWidth="2"/>
      <polyline points="3,32 8,44 13,32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function ClusterConnectors() {
  return (
    <svg className={styles.clusterConnectors} viewBox="0 0 800 72" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M400 0V24H133V56" stroke="currentColor" strokeWidth="2"/>
      <path d="M400 24V56" stroke="currentColor" strokeWidth="2"/>
      <path d="M400 24H667V56" stroke="currentColor" strokeWidth="2"/>
      <polyline points="126,48 133,64 140,48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="393,48 400,64 407,48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="660,48 667,64 674,48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function StorageConnectors() {
  return (
    <svg className={styles.storageConnectors} viewBox="0 0 800 72" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M133 0V24H667V0" stroke="currentColor" strokeWidth="2"/>
      <path d="M400 0V56" stroke="currentColor" strokeWidth="2"/>
      <polyline points="393,48 400,64 407,48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className={styles.diagramIcon} width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <ellipse cx="22" cy="11" rx="16" ry="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11v11c0 3.31 7.16 6 16 6s16-2.69 16-6V11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 22v11c0 3.31 7.16 6 16 6s16-2.69 16-6V22" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg className={styles.diagramIcon} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="30" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="20" width="30" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="29" cy="10" r="2" fill="currentColor"/>
      <circle cx="29" cy="26" r="2" fill="currentColor"/>
    </svg>
  );
}

const features = [
  {
    label: 'HA',
    description: 'Automatic High Availability',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Failover',
    description: 'Automatic Failover & Self-Healing',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="9" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="17" y="9" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M11 14h6M15 11.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Backups',
    description: 'Continuous Backups',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="3" width="18" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="7" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="12" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="12" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'PITR',
    description: 'Point-in-Time Recovery',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="7" y1="9" x2="7" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="13" y1="9" x2="13" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="19" y1="9" x2="19" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="22" cy="14" r="2.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Monitoring',
    description: 'Built-in Metrics & Alerting',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="3,20 9,13 14,17 19,9 25,9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Upgrades',
    description: 'Zero-Downtime Upgrades',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v17M9 15l5-11 5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="7" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ── Reusable diagram JSX ────────────────────────────────────────────── */
function DiagramInner() {
  return (
    <div className={styles.diagram}>
      <div className={styles.row}>
        <div className={`${styles.box} ${styles.usersBox}`}>
          <div className={styles.usersTitle}>Users</div>
          <div className={styles.userRoles}>
            <span>Developer</span>
            <span className={styles.sep}>|</span>
            <span>SRE</span>
            <span className={styles.sep}>|</span>
            <span>DBA</span>
          </div>
        </div>
      </div>
      <div className={styles.arrowRow}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={`${styles.box} ${styles.platform}`}>
          <div className={styles.cpHeader}>
            <img src="/img/navbar/logo-icon.svg" alt="" width={28} height={25} />
            <span className={styles.cpTitle}>Autobase Platform</span>
          </div>
          <div className={styles.cpPills}>
            <span>Provisioning</span>
            <span className={styles.sep}>|</span>
            <span>Maintenance</span>
            <span className={styles.sep}>|</span>
            <span>Scaling</span>
          </div>
        </div>
      </div>
      <ClusterConnectors />
      <div className={styles.mobileConnector}><ArrowDown /></div>
      <div className={styles.clustersRow}>
        <div className={styles.clusterBox}><DatabaseIcon /><span>PostgreSQL<br />Cluster 1</span></div>
        <div className={styles.clusterBox}><DatabaseIcon /><span>PostgreSQL<br />Cluster 2</span></div>
        <div className={`${styles.clusterBox} ${styles.clusterBoxOptional}`}><DatabaseIcon /><span>PostgreSQL<br />Cluster N</span></div>
      </div>
      <StorageConnectors />
      <div className={styles.mobileConnector}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={styles.storageRow}>
            <StorageIcon />
            <div>
              <div className={styles.storageTitle}>Database Storage / Backup Storage</div>
              <div className={styles.storageSub}>Local NVMe, SSD, EBS for data / S3, MinIO, etc. for backups</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArchDiagramSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Architecture Diagram ── */}
        <DiagramInner />

        {/* ── Divider ── */}
        <hr className={styles.divider} />

        {/* ── Features Grid ── */}
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.label} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureLabel}>{f.label}</div>
              <div className={styles.featureDesc}>{f.description}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
