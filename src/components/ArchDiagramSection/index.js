import React from 'react';
import Link from '@docusaurus/Link';
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

function ClusterNodeIcon() {
  return (
    <svg className={styles.clusterNodeIcon} width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 7v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 14v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-7" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function ClusterTopology() {
  return (
    <div className={styles.clusterTopology} aria-hidden="true">
      <svg className={styles.clusterTopologyLines} viewBox="0 0 120 70" fill="none" preserveAspectRatio="none">
        <path d="M60 28V36" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M26 40H94" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M26 40V48" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M94 40V48" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      <div className={`${styles.clusterNode} ${styles.clusterNodePrimary}`}>
        <ClusterNodeIcon />
        <span>Primary</span>
      </div>
      <div className={`${styles.clusterNode} ${styles.clusterNodeReplica} ${styles.clusterNodeReplicaLeft}`}>
        <ClusterNodeIcon />
        <span>Replica</span>
      </div>
      <div className={`${styles.clusterNode} ${styles.clusterNodeReplica} ${styles.clusterNodeReplicaRight}`}>
        <ClusterNodeIcon />
        <span>Replica</span>
      </div>
    </div>
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

function FeatureGlyph({ children }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M8 16V8h8M32 8h8v8M40 32v8h-8M16 40H8v-8" />
        {children}
      </g>
    </svg>
  );
}

const features = [
  {
    label: 'High Availability',
    description: 'Automatic Failover & Self-Healing',
    icon: (
      <FeatureGlyph>
        <path d="M24 13l10 4v7c0 6-4 10-10 12-6-2-10-6-10-12v-7l10-4z" />
        <path d="M18 24l4 4 8-9" />
      </FeatureGlyph>
    ),
  },
  {
    label: 'Backups',
    description: 'Continuous Backups',
    icon: (
      <FeatureGlyph>
        <path d="M14 24h20v11H14zM14 28h20" />
        <path d="M24 13v9M20 18l4 4 4-4" />
      </FeatureGlyph>
    ),
  },
  {
    label: 'PITR',
    description: 'Point-in-Time Recovery',
    icon: (
      <FeatureGlyph>
        <path d="M19 14h10l5 5v10l-5 5H19l-5-5V19l5-5z" />
        <path d="M24 18v7h6" />
      </FeatureGlyph>
    ),
  },
  {
    label: 'Upgrades',
    description: 'Zero-Downtime Upgrades',
    icon: (
      <FeatureGlyph>
        <path d="M24 34V15M17 22l7-7 7 7M15 34h18" />
      </FeatureGlyph>
    ),
  },
  {
    label: 'Scaling',
    description: 'Cluster Scaling with read replicas',
    icon: (
      <FeatureGlyph>
        <path d="M13 20h8v8h-8zM28 13h8v8h-8zM28 28h8v8h-8z" />
        <path d="M21 24h4v-7h3M25 24v8h3" />
      </FeatureGlyph>
    ),
  },
  {
    label: 'Monitoring',
    description: 'Built-in Metrics & Alerting',
    icon: (
      <FeatureGlyph>
        <path d="M14 34V15M14 34h21" />
        <path d="M17 30l5-7 5 4 7-11" />
        <path d="M31 16h3v3" />
      </FeatureGlyph>
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
            <span>Developers</span>
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
          <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true">+</span>
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
           <span className={styles.sep}>|</span>
            <span>Monitoring</span>
          </div>
        </div>
      </div>
      <ClusterConnectors />
      <div className={styles.mobileConnector}><ArrowDown /></div>
      <div className={styles.clustersRow}>
        <div className={styles.clusterBox}>
          <ClusterTopology />
          <span className={`${styles.clusterHint} ${styles.clusterHintDesktop}`}>PostgreSQL Cluster 1</span>
          <span className={`${styles.clusterHint} ${styles.clusterHintMobile}`}>PostgreSQL Clusters</span>
        </div>
        <div className={styles.clusterBox}>
          <ClusterTopology />
          <span className={styles.clusterHint}>PostgreSQL Cluster 2</span>
        </div>
        <div className={`${styles.clusterBox} ${styles.clusterBoxOptional}`}>
          <ClusterTopology />
          <span className={styles.clusterHint}>PostgreSQL Cluster N</span>
        </div>
      </div>
      <StorageConnectors />
      <div className={styles.mobileConnector}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={styles.storageRow}>
            <StorageIcon />
            <div>
              <div className={styles.storageTitle}>Database Storage / Backup Storage</div>
              <div className={styles.storageSub}>Local NVMe, SSD, EBS for data / S3 for backups</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArchDiagramSection() {
  return (
    <section className={styles.section} aria-labelledby="system-overview-title">
      <div className={styles.inner}>
        <h2 id="system-overview-title" className={styles.sectionLabel}>
          <span aria-hidden="true">//</span>
          System overview
        </h2>

        {/* ── Architecture Diagram ── */}
        <DiagramInner />

        <Link to="/docs/overview/architecture" className={styles.architectureLink}>
          Architecture details
          <span aria-hidden="true">-&gt;</span>
        </Link>

        {/* ── Divider ── */}
        <hr className={styles.divider} />

        {/* ── Features Grid ── */}
        <div className={styles.featuresGrid} aria-label="Platform capabilities">
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
