import React, { useEffect, useRef } from 'react';

// Digits pool — mix of decimal + hex for a pg/terminal data feel
const DIGITS = '0123456789ABCDEF01234567890123456789';

// Weighted color pool — mostly dark, rare orange spark
const COLORS = [
  { color: '#111111', weight: 5 },
  { color: '#555555', weight: 3 },
  { color: '#999999', weight: 2 },
  { color: '#ff5722', weight: 1 },
];
const TOTAL_WEIGHT = COLORS.reduce((s, c) => s + c.weight, 0);

function pickColor() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const c of COLORS) {
    r -= c.weight;
    if (r <= 0) return c.color;
  }
  return COLORS[0].color;
}

function pickDigit() {
  return DIGITS[Math.floor(Math.random() * DIGITS.length)];
}

export default function ClickEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(x, y) {
      const count = 8 + Math.floor(Math.random() * 7);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 4;
        const fontSize = 10 + Math.floor(Math.random() * 8); // 10–17px
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,  // bias upward
          alpha: 0.9 + Math.random() * 0.1,
          decay: 0.025 + Math.random() * 0.025,
          color: pickColor(),
          digit: pickDigit(),
          fontSize,
          font: `${fontSize}px "Courier New", monospace`,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0);
      for (const p of particles) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.18;   // gravity
        p.vx *= 0.97;   // drag
        p.alpha -= p.decay;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle   = p.color;
        ctx.font        = p.font;
        ctx.fillText(p.digit, Math.round(p.x), Math.round(p.y));
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onClick(e) { spawn(e.clientX, e.clientY); }
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
