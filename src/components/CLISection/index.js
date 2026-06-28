import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

/* ── Getting-started workflow (inline terminal) ─────────────────────── */
const SEQUENCES = [
  {
    command: '$ curl -fsSL https://autobase.tech/platform.yml \\\n    --output ./docker-compose.platform.yml',
    result:  '✓ Downloaded',
    detail:  '  ./docker-compose.platform.yml',
  },
  {
    command: '$ docker compose \\\n    -f docker-compose.platform.yml up -d',
    result:  '✓ Autobase Console started',
    detail:  '  http://your-server-address',
  },
  {
    command: '$ curl -fsSL https://autobase.tech/platform.ssl.yml \\\n    --output ./docker-compose.platform.ssl.yml',
    result:  '✓ Downloaded',
    detail:  '  ./docker-compose.platform.ssl.yml',
  },
  {
    command: '$ docker compose \\\n    -f docker-compose.platform.ssl.yml up -d',
    result:  '✓ Autobase Console started (SSL)',
    detail:  '  https://autobase.example.com',
  },
];

/* ── Getting-started workflow (fullscreen terminal — sequential) ────── */
const FS_SEQUENCES = [
  {
    command: '$ curl -fsSL https://autobase.tech/platform.yml \\\n    --output ./docker-compose.platform.yml',
    result:  '✓ Downloaded',
    detail:  '  ./docker-compose.platform.yml',
  },
  {
    command: '$ echo "AUTH_TOKEN=secret-token" > .env',
    result:  '✓ Environment configured',
    detail:  '  .env',
  },
  {
    command: '$ docker compose \\\n    -f docker-compose.platform.yml up -d',
    result:  '✓ Autobase Console started',
    detail:  '  http://your-server-address',
  },
  {
    command: '$ curl -fsSL https://autobase.tech/platform.ssl.yml \\\n    --output ./docker-compose.platform.ssl.yml',
    result:  '✓ Downloaded',
    detail:  '  ./docker-compose.platform.ssl.yml',
  },
  {
    command: '$ echo "DOMAIN=autobase.example.com\nACME_EMAIL=admin@example.com\nAUTH_TOKEN=secret-token" > .env',
    result:  '✓ SSL environment configured',
    detail:  '  .env',
  },
  {
    command: '$ docker compose \\\n    -f docker-compose.platform.ssl.yml up -d',
    result:  '✓ Autobase Console started (SSL)',
    detail:  '  https://autobase.example.com',
  },
  {
    command: '$ autobase upgrade \\\n    --cluster production \\\n    --from 15 --to 16',
    result:  '✓ Upgrade complete — zero downtime',
    detail:  '  primary: 16.3  replicas: 16.3',
  },
  {
    command: '=# CHECKPOINT;',
    result:  'CHECKPOINT',
    detail:  '  wal_lsn: 0/3B00000  duration: 0.21s',
  },
];

const CLEAR_CMD  = '\n$ \\! clear';
const CHAR_SPEED = 28;
const FS_SPEED   = 12;    // faster for fullscreen
const CLS_SPEED  = 90;
const HOLD_MS    = 2600;
const FLASH_MS   = 420;
const FS_HOLD_MS = 1800;  // shorter hold in fullscreen before next command


/* ── Code-rain canvas for the overlay background ──────────────────── */
const RAIN_CHARS = (
  '0123456789ABCDEFabcdef' +
  'SELECTFROMWHEREINSERTUPDATECREATEINDEXREPLICACLUSTER' +
  'WALPSQLNODESHARDLSNPGBASEAUTOBASE\\$=>_{}[]|;:,.'
).split('').filter((c, i, a) => a.indexOf(c) === i);

function MatrixCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const FONT_SIZE = 14;
    const LINE_H    = 20;

    let width, height, cols, drops, speeds, brightChance, frames;

    function init() {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
      cols   = Math.floor(width / FONT_SIZE);
      drops  = Array.from({ length: cols }, () => Math.random() * -(height / LINE_H));
      speeds = Array.from({ length: cols }, () => 0.18 + Math.random() * 0.38);
      brightChance = Array.from({ length: cols }, () => Math.random());
      frames = 0;
      ctx.fillStyle = '#040404';
      ctx.fillRect(0, 0, width, height);
    }

    init();
    window.addEventListener('resize', init);

    let raf;
    function draw() {
      frames++;

      // Slowly fade existing pixels (trail effect)
      ctx.fillStyle = 'rgba(4, 4, 4, 0.055)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

      for (let i = 0; i < cols; i++) {
        const y = Math.floor(drops[i]) * LINE_H;
        if (y < -LINE_H || y > height + LINE_H) {
          drops[i] += speeds[i];
          continue;
        }

        const char = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
        const roll = Math.random();

        if (roll < 0.006) {
          // Orange spark — very rare
          ctx.fillStyle = `rgba(255, 100, 30, ${0.55 + Math.random() * 0.3})`;
        } else if (roll < 0.025 && brightChance[i] > 0.7) {
          // Bright green-white head
          ctx.fillStyle = `rgba(200, 230, 200, ${0.18 + Math.random() * 0.12})`;
        } else if (roll < 0.10) {
          // Mid green
          ctx.fillStyle = `rgba(50, 130, 70, ${0.06 + Math.random() * 0.05})`;
        } else {
          // Dim: almost invisible
          ctx.fillStyle = `rgba(20, 55, 30, ${0.025 + Math.random() * 0.025})`;
        }

        ctx.fillText(char, i * FONT_SIZE, y);

        drops[i] += speeds[i];

        // Reset column when it exits the bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.random() * -(height / LINE_H * 0.5);
          speeds[i] = 0.18 + Math.random() * 0.38;
          brightChance[i] = Math.random();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 1v4H1M13 5H9V1M9 13v-4h4M1 9h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Inline terminal body (cycles SEQUENCES) ──────────────────────── */
function InlineBody({ typed, clsTyped, phase, seq }) {
  const showResult = phase === 'showing' || phase === 'typing_cls' || phase === 'flash';
  const showCls    = phase === 'typing_cls' || phase === 'flash';
  const isFlashing = phase === 'flash';
  const displayText = typed.startsWith('$ ') ? typed.slice(2) : typed;

  return (
    <pre className={`${styles.terminalCode} ${isFlashing ? styles.terminalFlash : ''}`}>
      <span className={styles.prompt}>$</span>
      {displayText}
      {phase === 'typing' && <span className={styles.caret}>_</span>}
      {showResult && (
        <>
          {'\n\n'}
          <span className={styles.success}>{seq.result}</span>
          {'\n'}
          <span className={styles.dimmed}>{seq.detail}</span>
        </>
      )}
      {showCls && (
        <>
          {'\n'}
          <span className={styles.dimmed}>{clsTyped}</span>
          {phase === 'typing_cls' && clsTyped.length < CLEAR_CMD.length && (
            <span className={styles.caret}>_</span>
          )}
        </>
      )}
    </pre>
  );
}

/* ── Fullscreen terminal body (independent random cycling) ────────── */
function FullscreenBody({ fsSeq, fsTyped, fsPhase }) {
  const showResult = fsPhase === 'showing' || fsPhase === 'clearing';
  const isClearing = fsPhase === 'clearing';

  return (
    <div className={styles.fsLayout}>
      {/* Scrolling terminal area */}
      <pre className={`${styles.terminalCodeFull} ${isClearing ? styles.terminalFlash : ''}`}>
        {fsSeq.command.startsWith('=# ') ? (
          <>
            <span className={styles.promptPg}>=# </span>
            {fsSeq.command.slice(3)}
          </>
        ) : (
          <>
            <span className={styles.prompt}>$</span>
            {fsSeq.command.startsWith('$ ') ? fsSeq.command.slice(2) : fsSeq.command}
          </>
        )}
        {fsPhase === 'typing' && <span className={styles.caret}>_</span>}
        {showResult && (
          <>
            {'\n\n'}
            <span className={styles.success}>{fsSeq.result}</span>
            {'\n'}
            <span className={styles.dimmed}>{fsSeq.detail}</span>
          </>
        )}
      </pre>

      {/* CTA menu — fixed below terminal, always visible */}
      <div className={styles.ctaMenu}>
        <div className={styles.menuDivider} />
        <a
          href="https://github.com/autobase-tech/autobase"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuItem}
        >
          <span className={styles.menuPrompt}>&gt;</span>
          <span className={styles.menuTitle}> Download Community Edition</span>
          <span className={styles.menuSub}>Open Source · Self-Hosted · Free</span>
        </a>
        <a
          href="https://demo.autobase.tech"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuItem}
        >
          <span className={styles.menuPrompt}>&gt;</span>
          <span className={styles.menuTitle}> Book Demo</span>
          <span className={styles.menuSub}>Talk to our engineers</span>
        </a>
      </div>
    </div>
  );
}

export default function CLISection() {
  /* ── Inline cycling state ── */
  const [seqIdx,   setSeqIdx]   = useState(0);
  const [typed,    setTyped]    = useState('');
  const [clsTyped, setClsTyped] = useState('');
  const [phase,    setPhase]    = useState('typing');
  const timer = useRef(null);

  /* ── Fullscreen state ── */
  const [fullscreen, setFullscreen] = useState(false);
  const [fsClosing,  setFsClosing]  = useState(false);
  const [fsIdx,      setFsIdx]      = useState(0);
  const [fsTyped,    setFsTyped]    = useState('');
  const [fsPhase,    setFsPhase]    = useState('idle'); // idle | typing | showing | clearing
  const fsTimer = useRef(null);

  const seq    = SEQUENCES[seqIdx];
  const fsSeq  = FS_SEQUENCES[fsIdx];

  /* ── Inline typewriter ── */
  useEffect(() => {
    if (phase !== 'typing') return;
    clearTimeout(timer.current);
    const cmd = seq.command;
    if (typed.length < cmd.length) {
      timer.current = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), CHAR_SPEED);
    } else {
      timer.current = setTimeout(() => setPhase('showing'), 300);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, seq.command]);

  useEffect(() => {
    if (phase !== 'showing') return;
    timer.current = setTimeout(() => { setClsTyped(''); setPhase('typing_cls'); }, HOLD_MS);
    return () => clearTimeout(timer.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'typing_cls') return;
    clearTimeout(timer.current);
    if (clsTyped.length < CLEAR_CMD.length) {
      timer.current = setTimeout(() => setClsTyped(CLEAR_CMD.slice(0, clsTyped.length + 1)), CLS_SPEED);
    } else {
      timer.current = setTimeout(() => setPhase('flash'), 180);
    }
    return () => clearTimeout(timer.current);
  }, [phase, clsTyped]);

  useEffect(() => {
    if (phase !== 'flash') return;
    timer.current = setTimeout(() => {
      setTyped(''); setClsTyped('');
      setSeqIdx(i => (i + 1) % SEQUENCES.length);
      setPhase('typing');
    }, FLASH_MS);
    return () => clearTimeout(timer.current);
  }, [phase]);

  /* ── Fullscreen: start fresh on open ── */
  useEffect(() => {
    if (fullscreen) {
      setFsIdx(0);
      setFsTyped('');
      setFsPhase('typing');
    } else {
      clearTimeout(fsTimer.current);
      setFsPhase('idle');
    }
  }, [fullscreen]);

  /* ── Fullscreen typewriter ── */
  useEffect(() => {
    if (fsPhase !== 'typing') return;
    clearTimeout(fsTimer.current);
    const target = fsSeq.command;
    if (fsTyped.length < target.length) {
      fsTimer.current = setTimeout(() => setFsTyped(target.slice(0, fsTyped.length + 1)), FS_SPEED);
    } else {
      fsTimer.current = setTimeout(() => setFsPhase('showing'), 240);
    }
    return () => clearTimeout(fsTimer.current);
  }, [fsPhase, fsTyped, fsSeq.command]);

  /* ── Fullscreen hold → clear → next ── */
  useEffect(() => {
    if (fsPhase !== 'showing') return;
    fsTimer.current = setTimeout(() => setFsPhase('clearing'), FS_HOLD_MS);
    return () => clearTimeout(fsTimer.current);
  }, [fsPhase]);

  useEffect(() => {
    if (fsPhase !== 'clearing') return;
    fsTimer.current = setTimeout(() => {
      setFsTyped('');
      setFsIdx(i => (i + 1) % FS_SEQUENCES.length);
      setFsPhase('typing');
    }, FLASH_MS);
    return () => clearTimeout(fsTimer.current);
  }, [fsPhase]);

  /* ── Close with exit animation ── */
  const closeFullscreen = () => {
    setFsClosing(true);
    setTimeout(() => {
      setFsClosing(false);
      setFullscreen(false);
    }, 280);
  };

  /* ── Escape key ── */
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeFullscreen(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const bar = (isFullscreen) => (
    <div className={styles.terminalBar}>
      <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
      <button
        className={styles.expandBtn}
        onClick={() => isFullscreen ? closeFullscreen() : setFullscreen(true)}
        aria-label="Toggle fullscreen"
      >
        {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>

          <div className={styles.terminal}>
            {bar(false)}
            <InlineBody typed={typed} clsTyped={clsTyped} phase={phase} seq={seq} />
          </div>

          <div className={styles.ctas}>
            <a
              href="https://github.com/autobase-tech/autobase"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <span className={styles.ctaArrow}>&gt;</span>
              <span>
                <div className={styles.ctaTitle}>DOWNLOAD COMMUNITY EDITION</div>
                <div className={styles.ctaSubtitle}>Open Source · Self-Hosted · Free</div>
              </span>
            </a>
            <a
              href="https://demo.autobase.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              <span className={styles.ctaArrow}>&gt;</span>
              <span>
                <div className={styles.ctaTitle}>BOOK DEMO</div>
                <div className={styles.ctaSubtitle}>Talk to our engineers</div>
              </span>
            </a>
          </div>

        </div>
      </div>

      {fullscreen && typeof document !== 'undefined' && createPortal(
        <div
          className={`${styles.overlay} ${fsClosing ? styles.overlayClosing : ''}`}
          onClick={closeFullscreen}
        >
          <MatrixCanvas />
          <div
            className={`${styles.overlayTerminal} ${fsClosing ? styles.overlayTerminalClosing : ''}`}
            onClick={e => e.stopPropagation()}
          >
            {bar(true)}
            <FullscreenBody fsSeq={fsSeq} fsTyped={fsTyped} fsPhase={fsPhase} />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
