import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

function ArrowDown() {
  return (
    <svg className={styles.arrowDown} width="16" height="48" viewBox="0 0 16 48" fill="none" aria-hidden="true">
      <line x1="8" y1="0" x2="8" y2="40" stroke="#999999" strokeWidth="2"/>
      <polyline points="3,32 8,44 13,32" fill="none" stroke="#999999" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowBi() {
  return (
    <svg className={styles.arrowBi} width="56" height="16" viewBox="0 0 56 16" fill="none" aria-hidden="true">
      <line x1="2" y1="8" x2="54" y2="8" stroke="#999999" strokeWidth="2"/>
      <polyline points="10,3 2,8 10,13" fill="none" stroke="#999999" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="46,3 54,8 46,13" fill="none" stroke="#999999" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <ellipse cx="22" cy="11" rx="16" ry="6" stroke="#aaaaaa" strokeWidth="1.5"/>
      <path d="M6 11v11c0 3.31 7.16 6 16 6s16-2.69 16-6V11" stroke="#aaaaaa" strokeWidth="1.5"/>
      <path d="M6 22v11c0 3.31 7.16 6 16 6s16-2.69 16-6V22" stroke="#aaaaaa" strokeWidth="1.5"/>
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="30" height="12" rx="2" stroke="#aaaaaa" strokeWidth="1.5"/>
      <rect x="3" y="20" width="30" height="12" rx="2" stroke="#aaaaaa" strokeWidth="1.5"/>
      <circle cx="29" cy="10" r="2" fill="#aaaaaa"/>
      <circle cx="29" cy="26" r="2" fill="#aaaaaa"/>
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

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Reusable diagram JSX ────────────────────────────────────────────── */
function DiagramInner({ compact }) {
  return (
    <div className={`${styles.diagram} ${compact ? styles.diagramCompact : ''}`}>
      <div className={styles.row}>
        <div className={styles.box}>Applications</div>
      </div>
      <div className={styles.arrowRow}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={styles.box}>
          PgBouncer <span className={styles.muted}>(optional)</span>
        </div>
      </div>
      <div className={styles.arrowRow}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={`${styles.box} ${styles.controlPlane}`}>
          <div className={styles.cpHeader}>
            <img src="/img/navbar/logo-icon.svg" alt="" width={28} height={25} />
            <span className={styles.cpTitle}>Autobase Control Plane</span>
          </div>
          <div className={styles.cpPills}>
            <span>Provisioning</span>
            <span className={styles.sep}>|</span>
            <span>Orchestration</span>
            <span className={styles.sep}>|</span>
            <span>Automation</span>
            <span className={styles.sep}>|</span>
            <span>Monitoring</span>
          </div>
        </div>
      </div>
      <div className={styles.splitArrows}>
        <ArrowDown /><ArrowDown /><ArrowDown />
      </div>
      <div className={styles.clustersRow}>
        <div className={styles.clusterBox}><DatabaseIcon /><span>PostgreSQL<br />Cluster 1</span></div>
        <ArrowBi />
        <div className={styles.clusterBox}><DatabaseIcon /><span>PostgreSQL<br />Cluster 2</span></div>
        <ArrowBi />
        <div className={styles.clusterBox}><DatabaseIcon /><span>PostgreSQL<br />Cluster N</span></div>
      </div>
      <div className={styles.arrowRow}><ArrowDown /></div>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={styles.storageRow}>
            <StorageIcon />
            <div>
              <div className={styles.storageTitle}>Object Storage / Backup Storage</div>
              <div className={styles.storageSub}>S3, MinIO, NFS, etc.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pinch-zoom / drag-pan lightbox ──────────────────────────────────── */
function DiagramLightbox({ onClose }) {
  const canvasRef  = useRef(null);
  const contentRef = useRef(null);
  const stateRef   = useRef({ scale: 1, x: 0, y: 0 });
  const touchRef   = useRef(null);
  const [scale, setScale] = useState(1);

  const applyTransform = (s, x, y) => {
    stateRef.current = { scale: s, x, y };
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
  };

  const zoomBy = (delta) => {
    const { scale: s, x, y } = stateRef.current;
    const next = Math.min(5, Math.max(0.4, s + delta));
    applyTransform(next, x, y);
    setScale(next);
  };

  const reset = () => {
    applyTransform(1, 0, 0);
    setScale(1);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        touchRef.current = {
          type: 'pinch',
          dist: Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY,
          ),
          initScale: stateRef.current.scale,
        };
      } else {
        touchRef.current = {
          type: 'drag',
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          initX: stateRef.current.x,
          initY: stateRef.current.y,
        };
      }
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const t = touchRef.current;
      if (!t) return;
      const { scale: s, x, y } = stateRef.current;

      if (e.touches.length === 2 && t.type === 'pinch') {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        const next = Math.min(5, Math.max(0.4, t.initScale * (dist / t.dist)));
        applyTransform(next, x, y);
      } else if (e.touches.length === 1 && t.type === 'drag') {
        applyTransform(s,
          t.initX + (e.touches[0].clientX - t.startX),
          t.initY + (e.touches[0].clientY - t.startY),
        );
      }
    };

    const onTouchEnd = () => {
      touchRef.current = null;
      setScale(stateRef.current.scale);
    };

    el.addEventListener('touchstart',  onTouchStart, { passive: false });
    el.addEventListener('touchmove',   onTouchMove,  { passive: false });
    el.addEventListener('touchend',    onTouchEnd);
    return () => {
      el.removeEventListener('touchstart',  onTouchStart);
      el.removeEventListener('touchmove',   onTouchMove);
      el.removeEventListener('touchend',    onTouchEnd);
    };
  }, []);

  /* Mouse drag support for desktop */
  const mouseRef = useRef(null);
  const onMouseDown = (e) => {
    mouseRef.current = { startX: e.clientX, startY: e.clientY, initX: stateRef.current.x, initY: stateRef.current.y };
  };
  const onMouseMove = (e) => {
    if (!mouseRef.current) return;
    const m = mouseRef.current;
    applyTransform(stateRef.current.scale,
      m.initX + (e.clientX - m.startX),
      m.initY + (e.clientY - m.startY),
    );
  };
  const onMouseUp = () => {
    mouseRef.current = null;
    setScale(stateRef.current.scale);
  };

  /* Wheel zoom */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const { scale: s, x, y } = stateRef.current;
      const next = Math.min(5, Math.max(0.4, s + delta));
      applyTransform(next, x, y);
      setScale(next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return createPortal(
    <div className={styles.lbOverlay}>
      <button className={styles.lbClose} onClick={onClose} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div
        ref={canvasRef}
        className={styles.lbCanvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={reset}
      >
        <div ref={contentRef} className={styles.lbContent}>
          <DiagramInner />
        </div>
      </div>

      <div className={styles.lbControls}>
        <button className={styles.lbBtn} onClick={() => zoomBy(0.25)} aria-label="Zoom in">+</button>
        <span className={styles.lbScale}>{Math.round(scale * 100)}%</span>
        <button className={styles.lbBtn} onClick={() => zoomBy(-0.25)} aria-label="Zoom out">−</button>
        <button className={styles.lbBtn} onClick={reset} aria-label="Reset zoom">↺</button>
      </div>
    </div>,
    document.body,
  );
}

export default function ArchDiagramSection() {
  const [lbOpen,   setLbOpen]   = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Architecture Diagram ── */}
        <div className={styles.diagramWrapper}>
          <DiagramInner />
          <button
            className={styles.expandBtn}
            onClick={() => setLbOpen(true)}
            aria-label="Expand diagram"
          >
            <ExpandIcon />
            <span>Expand</span>
          </button>
        </div>

        {mounted && lbOpen && <DiagramLightbox onClose={() => setLbOpen(false)} />}

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
