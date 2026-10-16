'use client';

import React, { useEffect, useRef } from 'react';

const BURST_TEXTS = [
  'POW!',
  'ZAP!',
  'BAM!',
  'DEPLOYED!',
  'TRAINED!',
  'COMPILED!',
  'KAPOW!',
  'WHAM!',
  'SHIPPED!',
  '100% ACCURACY!',
  'OPTIMIZED!',
  'BOOM!',
];

const BURST_COLORS = [
  '#ffd21a',
  '#00d9ff',
  '#ff4f6d',
  '#10b981',
  '#a855f7',
  '#f97316',
];

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playComicActionSfx(text: string) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (text.includes('ZAP') || text.includes('⚡')) {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.18);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } else if (text.includes('POW') || text.includes('BOOM') || text.includes('💥')) {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.22);
      gain.gain.setValueAtTime(0.42, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.22);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(587.33, t);
      osc.frequency.setValueAtTime(880, t + 0.08);
      gain.gain.setValueAtTime(0.245, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }
  } catch {}
}

export function playCue(cueType: string) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (cueType === 'toggle-on') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    } else if (cueType === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    } else if (cueType === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(250, t + 0.12);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    } else if (cueType === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, t);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    } else if (cueType === 'select') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(780, t + 0.08);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  } catch {}
}

export function triggerActionBurst(x: number, y: number, customText?: string) {
  const container = document.getElementById('action-burst-container');
  if (!container) return;

  const text =
    customText || BURST_TEXTS[Math.floor(Math.random() * BURST_TEXTS.length)];
  const color =
    BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];

  playComicActionSfx(text);

  const tag = document.createElement('div');
  tag.className = 'comic-burst-tag';
  tag.textContent = text;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.style.background = color;
  tag.style.color = '#080b18';
  tag.style.position = 'fixed';
  tag.style.pointerEvents = 'none';
  tag.style.zIndex = '9999';
  tag.style.fontFamily = 'var(--font-display, Bangers, cursive)';
  tag.style.fontSize = '22px';
  tag.style.letterSpacing = '0.08em';
  tag.style.padding = '6px 14px 4px';
  tag.style.borderRadius = '8px';
  tag.style.border = '3px solid #000000';
  tag.style.boxShadow = '4px 4px 0 #000000';
  tag.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
  container.appendChild(tag);

  const particles: HTMLDivElement[] = [];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'comic-burst-particle';
    p.style.position = 'fixed';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.width = '8px';
    p.style.height = '8px';
    p.style.borderRadius = i % 2 === 0 ? '50%' : '2px';
    p.style.background = i % 2 === 0 ? '#ffffff' : color;
    p.style.border = '1.5px solid #000000';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '9998';
    container.appendChild(p);
    particles.push(p);
  }

  const rot = (Math.random() - 0.5) * 35;

  tag.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.25) rotate(0deg)', opacity: 0 },
      { transform: `translate(-50%, -36px) scale(1.12) rotate(${rot}deg)`, opacity: 1, offset: 0.20 },
      { transform: `translate(-50%, -54px) scale(1.0) rotate(${rot * 0.88}deg)`, opacity: 1, offset: 0.80 },
      { transform: `translate(-50%, -84px) scale(0.94) rotate(${rot * 0.65}deg)`, opacity: 0, offset: 1.0 }
    ],
    { duration: 3000, easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)' }
  ).onfinish = () => tag.remove();

  particles.forEach((p, i) => {
    const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5);
    const dist = 50 + 55 * Math.random();
    const destX = Math.cos(angle) * dist;
    const destY = Math.sin(angle) * dist;

    p.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(1.5)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${destX * 1.25}px, ${destY * 1.25}px) scale(0)`, opacity: 0, offset: 1.0 }
      ],
      { duration: 1800, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
    ).onfinish = () => p.remove();
  });
}

export default function ActionBurst() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest(
        'button, .btn, .orbit-chip, .duty-card, .logo-badge, .comic-tab-btn, [data-burst]'
      );
      if (trigger) {
        const text = trigger.getAttribute('data-burst') || undefined;
        triggerActionBurst(e.clientX, e.clientY, text);
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return <div id="action-burst-container" ref={containerRef} />;
}

export const triggerBurst = triggerActionBurst;

