import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

export default function VideoSection() {
  const iframeRef = useRef(null);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);

  function playVideo() {
    if (!iframeRef.current?.contentWindow) {
      return;
    }

    setHasStartedVideo(true);

    setTimeout(() => {
      if (!iframeRef.current?.contentWindow) return;

      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'playVideo',
        }),
        '*'
      );
    }, 300);
  }

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
              automated database platform.
            </p>
          </div>
        </div>

        {/* ── Video card ── */}
        <div className={styles.videoWrap}>
          <div className={styles.videoCard}>
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/iji83uWMuNE?enablejsapi=1&mute=0&rel=0&playsinline=1&modestbranding=1"
              title="Autobase — PostgreSQL. Without Chaos."
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {!hasStartedVideo && (
              <button
                type="button"
                className={styles.videoCover}
                onClick={playVideo}
                aria-label="Play Autobase video"
              >
                <span className={styles.coverBrand}>
                  <img src="/img/navbar/logo-icon.svg" alt="" width={42} height={37} />
                  <span>autobase</span>
                </span>
                <span className={styles.coverCopy}>
                  PostgreSQL
                  <span>without chaos</span>
                </span>
                <span className={styles.playButton} aria-hidden="true">
                  <span />
                </span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
