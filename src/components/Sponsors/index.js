import React, { useEffect, useRef } from 'react';
import 'swiper/css';
import styles from './styles.module.css';

const sponsors = [
  { name: 'Axiom',          img: '/img/sponsors/axiom.png',          href: 'https://axiom.trade' },
  { name: 'Awarebuildings', img: '/img/sponsors/awarebuildings.png',  href: 'https://www.awarebuildings.com' },
  { name: 'Antistock',      img: '/img/sponsors/antistock.png',       href: 'https://antistock.io' },
  { name: 'Codefloe',       img: '/img/sponsors/codefloe.png',        href: 'https://codefloe.com' },
  { name: 'Edclub',         img: '/img/sponsors/edclub.png',          href: 'https://www.edclub.com' },
  { name: 'Fera',           img: '/img/sponsors/fera.png',            href: 'https://fera.ai' },
  { name: 'GS Labs',        img: '/img/sponsors/gs-labs.png',         href: 'https://gs-labs.ru' },
  { name: 'New Byte',       img: '/img/sponsors/newbyte.png',         href: 'https://newbyte.net.br' },
  { name: 'Optiwise',       img: '/img/sponsors/optiwise.png',        href: 'https://optiwise.nl' },
  { name: 'Postgres.AI',    img: '/img/sponsors/postgresai.png',      href: 'https://postgres.ai' },
  { name: 'Staffery',       img: '/img/sponsors/staffery.png',        href: 'https://www.staffery.com' },
  { name: 'Toncarton',      img: '/img/sponsors/toncarton.png',       href: 'https://www.toncarton.com' },
  { name: 'We-Manage',      img: '/img/sponsors/we-manage.png',       href: 'https://we-manage.de' },
];

// Triple: the middle copy is the "live" window, giving drag room in both directions
const tripled = [...sponsors, ...sponsors, ...sponsors];

export default function SponsorSection() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const tweenRef     = useRef(null);
  const isHovered    = useRef(false);
  const isDragging   = useRef(false);
  const lastClientX  = useRef(0);
  const setWidth     = useRef(0);

  useEffect(() => {
    let mounted = true;

    import('gsap').then(({ gsap }) => {
      if (!mounted) return;
      const track = trackRef.current;
      if (!track) return;

      setWidth.current = track.scrollWidth / 3;

      // Begin at the second copy so backward drag never hits a blank edge
      gsap.set(track, { x: -setWidth.current });

      tweenRef.current = gsap.to(track, {
        x: `-=${setWidth.current}`,
        duration: setWidth.current / 80,   // 80 px/s — comfortable pace
        ease: 'none',
        repeat: -1,
        modifiers: {
          // Wrap x strictly inside [-2×setW, -setW] for a seamless loop
          x: gsap.utils.unitize((raw) => {
            const v   = parseFloat(raw);
            const lo  = -2 * setWidth.current;
            const hi  = -setWidth.current;
            const len = hi - lo;
            return lo + ((v - lo) % len + len) % len;
          }),
        },
      });
    });

    return () => {
      mounted = false;
      tweenRef.current?.kill();
    };
  }, []);

  /* ── hover pause / resume ── */
  const handleEnter = () => {
    isHovered.current = true;
    tweenRef.current?.pause();
  };

  const handleLeave = () => {
    isHovered.current = false;
    if (!isDragging.current) tweenRef.current?.resume();
  };

  /* ── pointer drag ── */
  const handlePointerDown = (e) => {
    if (!tweenRef.current) return;
    isDragging.current = true;
    lastClientX.current = e.clientX;
    containerRef.current.setPointerCapture(e.pointerId);
    tweenRef.current.pause();
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !tweenRef.current) return;
    const delta = e.clientX - lastClientX.current;
    lastClientX.current = e.clientX;
    const raw = tweenRef.current.progress() - delta / setWidth.current;
    tweenRef.current.progress(((raw % 1) + 1) % 1);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (!isHovered.current) tweenRef.current?.resume();
  };

  return (
    <section className={styles.section}>
      <p className={styles.heading}>
        Proven Autobase <span className={styles.orange}>trust and reliability</span>
      </p>

      <div
        ref={containerRef}
        className={styles.strip}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={trackRef} className={styles.track}>
          {tripled.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoLink}
              draggable="false"
              onClick={(e) => isDragging.current && e.preventDefault()}
            >
              <div className={styles.logoCell}>
                <img
                  src={s.img}
                  alt={s.name}
                  className={styles.logoImg}
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
