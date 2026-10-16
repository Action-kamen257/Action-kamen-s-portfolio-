'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  characters?: string;
  animateOn?: 'view' | 'hover' | 'both';
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
}

export default function ScrambleText({
  text,
  speed = 40,
  maxIterations = 12,
  className = '',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!&%?$*~',
  animateOn = 'both',
  revealDirection = 'start',
  useOriginalCharsOnly = false,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const chars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
      : characters.split('');

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() => {
        const letters = text.split('');
        const len = letters.length;
        return letters
          .map((char, i) => {
            if (char === ' ') return ' ';
            let revealed = false;
            if (revealDirection === 'start') {
              revealed = i < (iteration / maxIterations) * len;
            } else if (revealDirection === 'end') {
              revealed = i >= len - (iteration / maxIterations) * len;
            } else {
              const mid = len / 2;
              revealed = Math.abs(i - mid) <= (iteration / maxIterations) * mid;
            }
            return revealed
              ? text[i]
              : chars[Math.floor(Math.random() * chars.length)] || '?';
          })
          .join('');
      });

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'both') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              hasAnimated.current = true;
              startScramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (spanRef.current) observer.observe(spanRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, text]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={() => {
        if (animateOn === 'hover' || animateOn === 'both') startScramble();
      }}
      className={`inline-block select-none font-mono ${className}`}
      data-scramble="true"
    >
      {displayText}
    </span>
  );
}
