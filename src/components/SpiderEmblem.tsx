import React from 'react';

interface SpiderEmblemProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SpiderEmblem({
  className = '',
  size = 24,
  color = 'var(--accent)',
}: SpiderEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`spider-emblem ${className}`}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="5.5" stroke={color} strokeWidth="3.2" fill="none" />
      <path
        d="M16 4.5V8.5 M16 23.5V27.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 7.5L10.5 10.5 M24.5 7.5L21.5 10.5 M7.5 24.5L10.5 21.5 M24.5 24.5L21.5 21.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
