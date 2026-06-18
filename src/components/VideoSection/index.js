import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export default function VideoSection() {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    const videoNode = videoRef.current;

    if (!videoNode || shouldPlayVideo) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldPlayVideo(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlayVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.35,
      }
    );

    observer.observe(videoNode);

    return () => observer.disconnect();
  }, [shouldPlayVideo]);

  useEffect(() => {
    if (!shouldPlayVideo || !iframeRef.current?.contentWindow) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: [],
      }),
      'https://www.youtube.com'
    );
  }, [shouldPlayVideo]);

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

        {/* ── Video card ── */}
        <div className={styles.videoWrap}>
          <div ref={videoRef} className={styles.videoCard}>
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/iji83uWMuNE?enablejsapi=1&mute=1&rel=0&playsinline=1&modestbranding=1"
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
