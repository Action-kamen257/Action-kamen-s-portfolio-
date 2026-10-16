'use client';

import React, { useEffect, useRef } from 'react';

export default function SpeedLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const lines: Array<{ angle: number; length: number; speed: number; opacity: number }> = [];
    for (let i = 0; i < 32; i++) {
      lines.push({
        angle: (i / 32) * Math.PI * 2 + (Math.random() - 0.5) * 0.1,
        length: 250 * Math.random() + 150,
        speed: 0.002 * Math.random() + 0.001,
        opacity: 0.08 * Math.random() + 0.02,
      });
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      if (reducedMotion) return;

      const originX = 0.75 * w;
      const originY = 0.45 * h;
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? 'rgba(255, 210, 26,' : 'rgba(11, 18, 32,';

      lines.forEach((line) => {
        line.angle += line.speed;
        const innerR = 0.25 * Math.min(w, h);
        const outerR = innerR + line.length;
        const x1 = originX + Math.cos(line.angle) * innerR;
        const y1 = originY + Math.sin(line.angle) * innerR;
        const x2 = originX + Math.cos(line.angle) * outerR;
        const y2 = originY + Math.sin(line.angle) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `${baseColor} ${line.opacity})`;
        ctx.lineWidth = Math.random() > 0.8 ? 2 : 1;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="speed-lines-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
