import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const clusterCount = 32;

const initialFleetStage = {
  visibleCount: 1,
  onlineCount: '0001',
  message: 'CLUSTER_001 ONLINE',
  service: { type: 'monitoring', index: 0 },
};

const settledActivities = [
  {
    message: 'MONITOR FLEET HEALTH',
    service: { type: 'monitoring', index: 20 },
  },
  {
    message: 'SCALE REPLICA_013',
    service: { type: 'scaling', index: 12 },
  },
  {
    message: 'HEAL PRIMARY_009',
    service: { type: 'healing', index: 8 },
  },
  {
    message: 'MAINTAIN CLUSTER_016',
    service: { type: 'maintaining', index: 15 },
  },
];

function formatOnlineCount(count) {
  return String(count).padStart(4, '0');
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatServiceMessage(service) {
  const number = String(service.index + 1).padStart(3, '0');

  switch (service.type) {
    case 'scaling':
      return `SCALE REPLICA_${number}`;
    case 'healing':
      return `HEAL PRIMARY_${number}`;
    case 'maintaining':
      return `MAINTAIN CLUSTER_${number}`;
    default:
      return `MONITOR CLUSTER_${number}`;
  }
}

function useFleetSequence() {
  const fleetRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [stage, setStage] = useState(initialFleetStage);
  const [isSettled, setIsSettled] = useState(false);
  const [settledIndex, setSettledIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setReduceMotion(true);
      setStage({
        visibleCount: clusterCount,
        onlineCount: '1000+',
        ...settledActivities[0],
      });
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

    const timers = new Set();
    let visibleCount = 1;
    let onlineCountValue = clusterCount;
    let growthActivityIndex = 0;

    const schedule = (callback, minDelay, maxDelay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, randomBetween(minDelay, maxDelay));
      timers.add(timer);
    };

    const growCounter = () => {
      if (onlineCountValue >= 1000) {
        schedule(() => setIsSettled(true), 1400, 1900);
        return;
      }

      const batchSize = Math.min(randomBetween(1, 4), 1000 - onlineCountValue);
      onlineCountValue += batchSize;
      const activity = settledActivities[onlineCountValue % settledActivities.length];

      setStage({
        visibleCount: clusterCount,
        onlineCount: onlineCountValue === 1000 ? '1000+' : formatOnlineCount(onlineCountValue),
        message: onlineCountValue === 1000
          ? 'FLEET EXPANDED TO 1000+'
          : activity.message,
        service: activity.service,
      });

      if (onlineCountValue < 1000) {
        schedule(growCounter, 900, 1800);
      } else {
        schedule(() => setIsSettled(true), 1600, 2200);
      }
    };

    const growVisibleFleet = () => {
      const batchSize = Math.min(randomBetween(1, 4), clusterCount - visibleCount);
      const firstCluster = visibleCount + 1;
      visibleCount += batchSize;
      const lastCluster = visibleCount;
      const range = firstCluster === lastCluster
        ? `CLUSTER_${String(firstCluster).padStart(3, '0')}`
        : `CLUSTERS_${String(firstCluster).padStart(3, '0')}-${String(lastCluster).padStart(3, '0')}`;
      const cyclePosition = growthActivityIndex % (settledActivities.length + 1);
      const showProvisioning = cyclePosition === settledActivities.length;
      const serviceTemplate = settledActivities[cyclePosition % settledActivities.length].service;
      const service = {
        ...serviceTemplate,
        index: Math.min(serviceTemplate.index, Math.max(0, firstCluster - 2)),
      };
      growthActivityIndex += 1;

      setStage({
        visibleCount,
        onlineCount: formatOnlineCount(visibleCount),
        message: showProvisioning ? `PROVISION ${range}` : formatServiceMessage(service),
        service: showProvisioning ? null : service,
      });

      if (visibleCount < clusterCount) {
        schedule(growVisibleFleet, 1200, 2100);
      } else {
        schedule(growCounter, 1500, 2200);
      }
    };

    schedule(growVisibleFleet, 1200, 1800);

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [hasStarted, isSettled, reduceMotion]);

  useEffect(() => {
    if (!isSettled || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setSettledIndex((current) => (current + 1) % settledActivities.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [isSettled, reduceMotion]);

  const currentStage = isSettled
    ? {
      visibleCount: clusterCount,
      onlineCount: '1000+',
      ...settledActivities[settledIndex],
    }
    : stage;

  return { fleetRef, hasStarted, stage: currentStage };
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
          <div className={styles.activityLine}>
            <span className={styles.activityPrompt}>&gt;</span>
            <span className={styles.activityMessage}>{stage.message}</span>
          </div>
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
