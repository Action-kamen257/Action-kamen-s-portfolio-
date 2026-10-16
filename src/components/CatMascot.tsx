'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CatMascotProps {
  directions?: string;
  reactions?: string;
  size?: number;
  className?: string;
  label?: string;
}

const of_directions = [
  'up-left',
  'up',
  'up-right',
  'left',
  'center',
  'right',
  'down-left',
  'down',
  'down-right',
];

const om_reactions = [
  'blink',
  'heart',
  'sparkle',
  'surprised',
  'wink',
  'bashful',
  'sleepy',
  'dizzy',
  'delighted',
];

const og_angles = [
  'right',
  'down-right',
  'down',
  'down-left',
  'left',
  'up-left',
  'up',
  'up-right',
];

const ov_step = (2 * Math.PI) / og_angles.length;
const ox_reactions = ['heart', 'sparkle', 'delighted'];

const bounceKeyframes: Keyframe[] = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' },
];

function getPosition(idx: number): React.CSSProperties {
  return {
    backgroundPosition: `${(idx % 3) * 50}% ${Math.floor(idx / 3) * 50}%`,
  };
}

const spriteBaseStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundSize: '300% 300%',
  backgroundRepeat: 'no-repeat',
};

export default function CatMascot({
  directions = '/mascots/cat-directions.webp',
  reactions = '/mascots/cat-reactions.webp',
  size = 230,
  className = '',
  label = 'Cyber Cat Companion',
}: CatMascotProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  const clickTracker = useRef({ count: 0, at: 0 });

  const [dir, setDir] = useState('center');
  const [reaction, setReaction] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let lastIdx = -1;
    let coords: { x: number; y: number } | null = null;

    const calc = () => {
      const btn = btnRef.current;
      if (!btn || !coords) return;
      const rect = btn.getBoundingClientRect();
      const dx = coords.x - (rect.left + rect.width / 2);
      const dy = coords.y - (rect.top + rect.height / 2);

      if (Math.hypot(dx, dy) < 70) {
        lastIdx = -1;
        setDir('center');
        return;
      }

      const angle = Math.atan2(dy, dx);
      if (
        lastIdx !== -1 &&
        Math.abs(Math.atan2(Math.sin(angle - lastIdx * ov_step), Math.cos(angle - lastIdx * ov_step))) <
          ov_step / 2 + 0.12
      ) {
        return;
      }

      lastIdx = (Math.round(angle / ov_step) + og_angles.length) % og_angles.length;
      setDir(og_angles[lastIdx]);
    };

    const handlePointer = (e: PointerEvent) => {
      coords = { x: e.clientX, y: e.clientY };
      calc();
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', calc, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', calc);
    };
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

  const handleClick = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];

    const queue = (ms: number, val: string | null) => {
      timers.current.push(window.setTimeout(() => setReaction(val), ms));
    };

    const now = Date.now();
    const tracker = clickTracker.current;
    tracker.count = now - tracker.at < 1600 ? tracker.count + 1 : 1;
    tracker.at = now;

    if (tracker.count >= 4) {
      tracker.count = 0;
      setReaction('dizzy');
      queue(1100, null);
    } else {
      setReaction('blink');
      queue(120, ox_reactions[(tracker.count - 1) % ox_reactions.length]);
      queue(560, null);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spanRef.current?.animate(bounceKeyframes, { duration: 420, easing: 'linear' });
    }
  };

  const dirIndex = of_directions.indexOf(dir);
  const reactIndex = om_reactions.indexOf(reaction ?? 'blink');

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={`Boop the ${label}`}
      className={className}
      style={{
        position: 'relative',
        display: 'block',
        flexShrink: 0,
        width: size,
        height: size,
        padding: 0,
        border: 0,
        background: 'transparent',
        appearance: 'none',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span
        ref={spanRef}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          transformOrigin: '50% 78%',
        }}
      >
        <span
          style={{
            ...spriteBaseStyle,
            backgroundImage: `url(${directions})`,
            ...getPosition(dirIndex >= 0 ? dirIndex : 4),
            opacity: reaction ? 0 : 1,
          }}
        />
        <span
          style={{
            ...spriteBaseStyle,
            backgroundImage: `url(${reactions})`,
            ...getPosition(reactIndex >= 0 ? reactIndex : 0),
            opacity: reaction ? 1 : 0,
          }}
        />
      </span>
    </button>
  );
}
