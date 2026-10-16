import React from 'react';

interface Spider3DLogoProps {
  size?: number;
  className?: string;
}

export default function Spider3DLogo({ size = 38, className = '' }: Spider3DLogoProps) {
  return (
    <div
      className={`spider-3d-logo-wrapper ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src="/assets/spider-3d-logo.png"
        alt="3D Spider-Man Logo"
        width={size}
        height={size}
        className="spider-3d-img"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
