'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { playCue } from './ActionBurst';

interface ThemeToggleProps {
  className?: string;
  id?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = '',
  id = 'theme-toggle',
  showLabel = false,
}: ThemeToggleProps) {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const willBeLight = !root.classList.contains('light');
    const newTheme = willBeLight ? 'light' : 'dark';

    playCue('toggle-on');

    if (
      !('startViewTransition' in document) ||
      typeof (document as any).startViewTransition !== 'function'
    ) {
      root.classList.remove('dark', 'light');
      root.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      setIsLight(willBeLight);
      return;
    }

    const rect = btnRef.current?.getBoundingClientRect() || {
      left: e.clientX,
      top: e.clientY,
      width: 40,
      height: 40,
    };
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      root.classList.remove('dark', 'light');
      root.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      setIsLight(willBeLight);
    });

    transition.ready.then(() => {
      const clip = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ];
      root.animate(
        {
          clipPath: willBeLight ? clip : [...clip].reverse(),
        },
        {
          duration: 450,
          easing: 'ease-in-out',
          pseudoElement: willBeLight
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        }
      );
    });
  };

  if (!mounted) {
    return (
      <button
        ref={btnRef}
        id={id}
        className={`theme-btn ${className}`}
        aria-label="Toggle color theme"
      >
        <Moon size={18} strokeWidth={2.2} />
      </button>
    );
  }

  return (
    <button
      ref={btnRef}
      id={id}
      className={`theme-btn ${className}`}
      aria-label="Toggle color theme"
      data-burst="THEME SHIFT! 🌗"
      onClick={toggleTheme}
    >
      {isLight ? (
        <Sun size={18} strokeWidth={2.2} />
      ) : (
        <Moon size={18} strokeWidth={2.2} />
      )}
      {showLabel && <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>}
    </button>
  );
}
