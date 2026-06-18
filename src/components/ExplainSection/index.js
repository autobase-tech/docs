import React from 'react';
import styles from './styles.module.css';

const SPRITE = '/img/explain/icons-sprite.png';

const row1 = [
  {
    text: ['Production-ready cluster', 'in 10–15 minutes'],
    containerW: 79.431, containerH: 86.751,
    imgLeft: '-62.67%', imgTop: '-7.59%', imgW: '353.92%', imgH: '216.03%',
  },
  {
    text: ['High-availability architecture'],
    containerW: 80, containerH: 78.609,
    imgLeft: '-234.25%', imgTop: '-34.86%', imgW: '420.82%', imgH: '286.77%',
  },
  {
    text: ['Predictable system behavior'],
    containerW: 81.328, containerH: 68.03,
    imgLeft: '-19.91%', imgTop: '-152.12%', imgW: '363.98%', imgH: '290.08%',
  },
];

const row2 = [
  {
    text: ['Reduced dependency', 'on DevOps'],
    containerW: 83.478, containerH: 82.611,
    imgLeft: '-152.73%', imgTop: '-133.6%', imgW: '398.96%', imgH: '268.77%',
  },
  {
    text: ['Fewer errors', 'and no downtime'],
    containerW: 77.929, containerH: 85.565,
    imgLeft: '-303.75%', imgTop: '-133.6%', imgW: '442.65%', imgH: '268.77%',
  },
];

function IconItem({ text, containerW, containerH, imgLeft, imgTop, imgW, imgH }) {
  return (
    <div className={styles.iconItem}>
      {/* 96×96 clip box */}
      <div className={styles.iconClip}>
        <div style={{
          position: 'absolute',
          width: containerW,
          height: containerH,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden',
        }}>
          <img
            src={SPRITE}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: imgLeft,
              top: imgTop,
              width: imgW,
              height: imgH,
              maxWidth: 'none',
            }}
          />
        </div>
      </div>

      <div className={styles.iconText}>
        {text.map((line, i) => (
          <p key={i} className={styles.iconLine}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function ExplainSection() {
  return (
    <section className={styles.section}>
      {/* Decorative orange inner border */}
      <div className={styles.innerBorder} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Title block — centered */}
        <div className={styles.titleBlock}>
          <h2 className={styles.heading}>
            PostgreSQL stops being a risk.
          </h2>
          <p className={styles.subtext}>
            It becomes a <span className={styles.orange}>controlled</span> system.
          </p>
        </div>

        {/* Row 1 — 3 icons */}
        <div className="row">
          {row1.map((item, i) => (
            <div key={i} className="col-12 col-md-4">
              <IconItem {...item} />
            </div>
          ))}
        </div>

        {/* Row 2 — 2 icons centered */}
        <div className="row justify-content-center">
          {row2.map((item, i) => (
            <div key={i} className="col-12 col-md-4">
              <IconItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
