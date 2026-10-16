import React from 'react';

interface SpiderWebRadialProps {
  size?: number;
  className?: string;
}

export function SpiderWebRadial({ size = 480, className = '' }: SpiderWebRadialProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`spider-web-radial ${className}`}
      aria-hidden="true"
    >
      <line x1="200" y1="200" x2="200" y2="10" />
      <line x1="200" y1="200" x2="334" y2="66" />
      <line x1="200" y1="200" x2="390" y2="200" />
      <line x1="200" y1="200" x2="334" y2="334" />
      <line x1="200" y1="200" x2="200" y2="390" />
      <line x1="200" y1="200" x2="66" y2="334" />
      <line x1="200" y1="200" x2="10" y2="200" />
      <line x1="200" y1="200" x2="66" y2="66" />
      <path d="M200,160 Q230,165 240,200 Q230,235 200,240 Q170,235 160,200 Q170,165 200,160 Z" />
      <path d="M200,120 Q255,130 280,200 Q255,270 200,280 Q145,270 120,200 Q145,130 200,120 Z" />
      <path d="M200,75 Q285,90 325,200 Q285,310 200,325 Q115,310 75,200 Q115,90 200,75 Z" />
      <path d="M200,30 Q315,50 370,200 Q315,350 200,370 Q85,350 30,200 Q85,50 200,30 Z" />
    </svg>
  );
}

interface SpiderWebCornerProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  style?: React.CSSProperties;
}

export function SpiderWebCorner({
  size = 60,
  position = 'top-left',
  className = '',
  style = {},
}: SpiderWebCornerProps) {
  let transform = 'scale(1, 1)';
  let posStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0 };

  if (position === 'top-right') {
    transform = 'scale(-1, 1)';
    posStyle = { position: 'absolute', top: 0, right: 0 };
  } else if (position === 'bottom-left') {
    transform = 'scale(1, -1)';
    posStyle = { position: 'absolute', bottom: 0, left: 0 };
  } else if (position === 'bottom-right') {
    transform = 'scale(-1, -1)';
    posStyle = { position: 'absolute', bottom: 0, right: 0 };
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`spider-web-corner ${className}`}
      style={{ ...posStyle, transform, pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2="100" y2="0" />
      <line x1="0" y1="0" x2="92" y2="38" />
      <line x1="0" y1="0" x2="70" y2="70" />
      <line x1="0" y1="0" x2="38" y2="92" />
      <line x1="0" y1="0" x2="0" y2="100" />
      <path d="M25,0 Q21,12 18,18 Q12,21 0,25" />
      <path d="M50,0 Q44,22 35,35 Q22,44 0,50" />
      <path d="M75,0 Q67,33 53,53 Q33,67 0,75" />
      <path d="M100,0 Q90,42 70,70 Q42,90 0,100" />
    </svg>
  );
}
