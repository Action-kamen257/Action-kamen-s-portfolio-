'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MarvelHeroTitleProps {
  firstWord?: string;
  secondWord?: string;
}

export default function MarvelHeroTitle({
  firstWord = 'TUSHAR',
  secondWord = 'MALI',
}: MarvelHeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (badgeRef.current) {
        const reelFrames = badgeRef.current.querySelectorAll('.reel-frame');
        gsap.fromTo(
          reelFrames,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.12,
            stagger: { each: 0.08, repeat: 3, yoyo: true },
            ease: 'none',
          }
        );
      }

      if (containerRef.current) {
        const chars = containerRef.current.querySelectorAll<HTMLElement>('.marvel-char');
        chars.forEach((char) => {
          const enterHandler = () => {
            gsap.to(char, {
              y: -12,
              scale: 1.25,
              rotate: (Math.random() - 0.5) * 20,
              color: '#00b4d8',
              duration: 0.25,
              ease: 'back.out(2)',
            });
          };

          const leaveHandler = () => {
            gsap.to(char, {
              y: 0,
              scale: 1,
              rotate: 0,
              color: '',
              duration: 0.4,
              ease: 'elastic.out(1, 0.4)',
            });
          };

          char.addEventListener('mouseenter', enterHandler);
          char.addEventListener('mouseleave', leaveHandler);
        });
      }
    }
  }, []);

  return (
    <h1 ref={containerRef} className="hero-title marvel-title-root">
      <div className="marvel-studio-badge" ref={badgeRef}>
        <span className="marvel-badge-text">STUDIO_ARC // 2026</span>
        <div className="reel-frames-container">
          <div className="reel-frame rf-1">⚡</div>
          <div className="reel-frame rf-2">🧠</div>
          <div className="reel-frame rf-3">🤖</div>
          <div className="reel-frame rf-4">🔥</div>
        </div>
      </div>
      <div className="title-row first-word">
        <span className="t-line t-yellow marvel-extrude">
          {firstWord.split('').map((c, i) => (
            <span key={i} className="marvel-char inline-block" data-char={c}>
              {c}
            </span>
          ))}
        </span>
      </div>
      <div className="title-row second-word">
        <span className="t-line t-outline marvel-extrude">
          {secondWord.split('').map((c, i) => (
            <span key={i} className="marvel-char inline-block" data-char={c}>
              {c}
            </span>
          ))}
        </span>
      </div>
    </h1>
  );
}
