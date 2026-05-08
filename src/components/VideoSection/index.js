import React from 'react';
import styles from './styles.module.css';

const items = [
  {
    img: '/img/video/icon-deploy.svg',
    alt: 'Cluster deployment icon',
    label: <>How a cluster<br />is deployed</>,
  },
  {
    img: '/img/video/icon-architecture.svg',
    alt: 'Architecture icon',
    label: <>How architecture<br />is standardized</>,
  },
  {
    img: '/img/video/icon-control.svg',
    alt: 'Control icon',
    label: <>How control<br />is established</>,
  },
];

export default function VideoSection() {
  return (
    <section id="section-video" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Heading ── */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            <h2 className={styles.heading}>
              See how <span className={styles.orange}>Autobase</span> works in practice
            </h2>
            <p className={styles.subtext}>
              From manual setup and operational chaos to a structured,<br />
              automated PostgreSQL platform.
            </p>
          </div>
        </div>

        {/* ── Icon list ── */}
        <div className="row justify-content-center">
          {items.map((item, i) => (
            <div key={i} className="col-12 col-md-4 col-lg-auto">
              <div className={styles.item}>
                <div className={styles.thumb}>
                  <img src={item.img} alt={item.alt} width={48} height={48} />
                </div>
                <p className={styles.label}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Video card ── */}
        <div className={styles.videoWrap}>
          <div className={styles.videoCard}>
            <iframe
              src="https://www.youtube.com/embed/Q4Jiv1UtgOk?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1"
              title="Autobase — PostgreSQL. Without Chaos."
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  );
}
