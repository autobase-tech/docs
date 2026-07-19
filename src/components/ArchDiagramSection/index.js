import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const clusterCount = 32;

const growthStages = [
  {
    at: 0,
    visibleCount: 1,
    onlineCount: '0001',
    messages: ['CLUSTER_001 ONLINE', 'MONITOR CLUSTER_001'],
    service: { type: 'monitoring', index: 0 },
  },
  {
    at: 900,
    visibleCount: 2,
    onlineCount: '0002',
    messages: ['PROVISION CLUSTER_002', 'MAINTAIN CLUSTER_001'],
    service: { type: 'maintaining', index: 0 },
  },
  {
    at: 1800,
    visibleCount: 4,
    onlineCount: '0004',
    messages: ['PROVISION CLUSTERS_003-004', 'MONITOR CLUSTERS_001-002'],
    service: { type: 'monitoring', index: 0 },
  },
  {
    at: 2800,
    visibleCount: 8,
    onlineCount: '0008',
    messages: ['PROVISION CLUSTERS_005-008', 'SCALE REPLICA_002'],
    service: { type: 'scaling', index: 1 },
  },
  {
    at: 4000,
    visibleCount: 16,
    onlineCount: '0016',
    messages: ['PROVISION CLUSTERS_009-016', 'HEAL PRIMARY_005'],
    service: { type: 'healing', index: 4 },
  },
  {
    at: 5400,
    visibleCount: 32,
    onlineCount: '0032',
    messages: ['PROVISION CLUSTERS_017-032', 'SCALE REPLICA_013'],
    service: { type: 'scaling', index: 12 },
  },
  {
    at: 6500,
    visibleCount: 32,
    onlineCount: '0064',
    messages: ['PROVISION BATCH_0064', 'MAINTAIN CLUSTERS_001-032'],
    service: { type: 'maintaining', index: 15 },
  },
  {
    at: 7100,
    visibleCount: 32,
    onlineCount: '0128',
    messages: ['PROVISION BATCH_0128', 'MONITOR FLEET HEALTH'],
    service: { type: 'monitoring', index: 20 },
  },
  {
    at: 7700,
    visibleCount: 32,
    onlineCount: '0256',
    messages: ['PROVISION BATCH_0256', 'SCALE REPLICA_013'],
    service: { type: 'scaling', index: 12 },
  },
  {
    at: 8300,
    visibleCount: 32,
    onlineCount: '0512',
    messages: ['PROVISION BATCH_0512', 'HEAL PRIMARY_009'],
    service: { type: 'healing', index: 8 },
  },
  {
    at: 8900,
    visibleCount: 32,
    onlineCount: '1000+',
    messages: ['FLEET EXPANDED TO 1000+', 'ALL CLUSTERS ONLINE'],
    service: { type: 'monitoring', index: 31 },
  },
];

const settledActivities = [
  {
    messages: ['MONITOR FLEET_1000+', 'ALL SYSTEMS NOMINAL'],
    service: { type: 'monitoring', index: 20 },
  },
  {
    messages: ['SCALE REPLICA_013', '1000+ CLUSTERS ONLINE'],
    service: { type: 'scaling', index: 12 },
  },
  {
    messages: ['HEAL PRIMARY_009', 'FAILOVER COMPLETE'],
    service: { type: 'healing', index: 8 },
  },
  {
    messages: ['MAINTAIN CLUSTER_016', 'ZERO-DOWNTIME'],
    service: { type: 'maintaining', index: 15 },
  },
];

function useFleetSequence() {
  const fleetRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [isSettled, setIsSettled] = useState(false);
  const [settledIndex, setSettledIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setReduceMotion(true);
      setStageIndex(growthStages.length - 1);
      setHasStarted(true);
      setIsSettled(true);
      return undefined;
    }

    const node = fleetRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || reduceMotion || isSettled) return undefined;

    const stageTimers = growthStages.slice(1).map((stage, index) => (
      window.setTimeout(() => setStageIndex(index + 1), stage.at)
    ));
    const settleTimer = window.setTimeout(
      () => setIsSettled(true),
      growthStages[growthStages.length - 1].at + 1400,
    );

    return () => {
      stageTimers.forEach(window.clearTimeout);
      window.clearTimeout(settleTimer);
    };
  }, [hasStarted, isSettled, reduceMotion]);

  useEffect(() => {
    if (!isSettled || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setSettledIndex((current) => (current + 1) % settledActivities.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [isSettled, reduceMotion]);

  const finalStage = growthStages[growthStages.length - 1];
  const stage = isSettled
    ? { ...finalStage, ...settledActivities[settledIndex] }
    : growthStages[stageIndex];

  return { fleetRef, hasStarted, stage };
}

function ControlBus({ active }) {
  return (
    <div className={styles.controlBus} aria-hidden="true">
      <svg viewBox="0 0 800 84" fill="none" preserveAspectRatio="none">
        <path className={styles.controlRoute} d="M400 0V28H96V74" />
        <path className={styles.controlRoute} d="M400 28V74" />
        <path className={styles.controlRoute} d="M400 28H704V74" />

        {active && <rect className={styles.controlPacket} x="-3" y="-3" width="6" height="6">
          <animateMotion
            dur="8s"
            begin="0s"
            repeatCount="indefinite"
            calcMode="discrete"
            keyPoints="0;0.12;0.24;0.36;0.48;0.6;0.72;0.84;0.88;0.92;0.96;1;1"
            keyTimes="0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;1"
            path="M400 0V28H704V74"
          />
          <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.3;0.33;1" />
        </rect>}

        {active && <rect className={styles.controlPacket} x="-3" y="-3" width="6" height="6">
          <animateMotion
            dur="8s"
            begin="2.65s"
            repeatCount="indefinite"
            calcMode="discrete"
            keyPoints="0;0.12;0.24;0.36;0.48;0.6;0.72;0.84;0.88;0.92;0.96;1;1"
            keyTimes="0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;1"
            path="M400 0V74"
          />
          <animate attributeName="opacity" dur="8s" begin="2.65s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.3;0.33;1" />
        </rect>}

        {active && <rect className={styles.controlPacket} x="-3" y="-3" width="6" height="6">
          <animateMotion
            dur="8s"
            begin="5.3s"
            repeatCount="indefinite"
            calcMode="discrete"
            keyPoints="0;0.12;0.24;0.36;0.48;0.6;0.72;0.84;0.88;0.92;0.96;1;1"
            keyTimes="0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;1"
            path="M400 0V28H96V74"
          />
          <animate attributeName="opacity" dur="8s" begin="5.3s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.3;0.33;1" />
        </rect>}
      </svg>
    </div>
  );
}

function FleetCluster({ activity, index, online }) {
  const number = String(index + 1).padStart(3, '0');
  const activityClass = activity?.index === index
    ? styles[`cluster${activity.type[0].toUpperCase()}${activity.type.slice(1)}`]
    : '';

  return (
    <div
      className={`${styles.fleetCluster} ${online ? styles.fleetClusterOnline : styles.fleetClusterPending} ${activityClass}`}
      aria-hidden="true"
    >
      <span className={styles.clusterNumber}>{number}</span>
      <span className={styles.miniTopology}>
        <span className={`${styles.miniNode} ${styles.miniPrimary}`} />
        <span className={`${styles.miniNode} ${styles.miniReplica} ${styles.miniReplicaLeft}`} />
        <span className={`${styles.miniNode} ${styles.miniReplica} ${styles.miniReplicaRight}`} />
      </span>
    </div>
  );
}

function ClusterFleet({ fleetRef, stage }) {
  return (
    <div
      ref={fleetRef}
      className={styles.fleet}
      role="img"
      aria-label="One Autobase platform continuously provisions, scales, monitors, and heals hundreds or thousands of PostgreSQL clusters"
    >
      <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true">+</span>
      <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true">+</span>
      <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true">+</span>
      <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true">+</span>

      <div className={styles.fleetHeader}>
        <div>
          <div className={styles.fleetTitle}>PostgreSQL Clusters</div>
          <div className={styles.fleetSubtitle}>One control plane. Every cluster lifecycle.</div>
        </div>
        <div className={styles.fleetScale}>
          <span className={styles.fleetScaleLabel}>Managed fleet</span>
          <span className={styles.fleetCount}><span>{stage.onlineCount}</span> ONLINE</span>
        </div>
      </div>

      <div className={styles.fleetGrid} aria-hidden="true">
        {Array.from({ length: clusterCount }, (_, index) => (
          <FleetCluster
            key={index}
            index={index}
            online={index < stage.visibleCount}
            activity={stage.service}
          />
        ))}
      </div>

      <div className={styles.fleetFooter} aria-hidden="true">
        <div className={styles.fleetActivity}>
          {stage.messages.map((message, index) => (
            <div className={styles.activityLine} key={message}>
              <span className={styles.activityPrompt}>{index === 0 ? '>' : '+'}</span>
              <span className={styles.activityMessage}>{message}</span>
            </div>
          ))}
        </div>
        <span className={styles.fleetOnline}><span /> AUTOMATION ACTIVE</span>
      </div>
    </div>
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
  const { fleetRef, hasStarted, stage } = useFleetSequence();

  return (
    <div className={styles.diagram}>
      <div className={styles.row}>
        <div className={`${styles.box} ${styles.platform}`}>
          <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true">+</span>
          <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true">+</span>
          <div className={styles.platformEyebrow}>One control plane</div>
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
      <ControlBus active={hasStarted} />
      <ClusterFleet fleetRef={fleetRef} stage={stage} />
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
