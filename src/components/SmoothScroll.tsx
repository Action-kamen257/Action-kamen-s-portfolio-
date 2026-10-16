'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      root.classList.remove('dark', 'light');
      root.classList.add(savedTheme);
    }

    let lenis: Lenis | null = null;
    const tickerUpdate = (time: number) => {
      lenis?.raf(time * 1000);
    };

    function scrollToTarget(target: string) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.2 });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (!reducedMotion) {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // Scroll Progress Bar
      const progressBar = document.getElementById('scroll-progress');
      const updateScrollProgress = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        if (progressBar) {
          progressBar.style.width = `${progress * 100}%`;
        }
      };
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();

      // Active Navigation Link Tracker
      const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => {
                link.classList.toggle(
                  'active',
                  link.getAttribute('data-nav') === `#${entry.target.id}`
                );
              });
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      document.querySelectorAll('main section[id]').forEach((sec) => navObserver.observe(sec));

      // Mobile Menu Handlers
      const mobileMenu = document.getElementById('mobile-menu');
      const closeMobileMenu = (cb?: () => void) => {
        if (mobileMenu) {
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
          lenis?.start();
          cb?.();
        }
      };

      document.getElementById('menu-open-mobile')?.addEventListener('click', () => {
        if (mobileMenu) {
          mobileMenu.classList.add('open');
          document.body.style.overflow = 'hidden';
          lenis?.stop();
        }
      });

      document.getElementById('menu-close-x')?.addEventListener('click', () => closeMobileMenu());

      mobileMenu?.querySelectorAll('a.mm-link').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          closeMobileMenu(() => {
            if (href && href.startsWith('#')) {
              setTimeout(() => scrollToTarget(href), 60);
            }
          });
        });
      });

      // Smooth Hash Link Clicking
      document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
        if (!link.closest('#mobile-menu')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
              scrollToTarget(href);
            }
          });
        }
      });

      // Hero Entrance Timeline
      const heroTl = gsap.timeline({ paused: true, delay: 0.05 });
      if (document.querySelector('.marvel-studio-badge')) {
        heroTl.fromTo(
          '.marvel-studio-badge',
          { opacity: 0, scale: 0.8, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }
        );
      }

      if (document.querySelector('.hero [data-reveal]')) {
        heroTl.to(
          '.hero [data-reveal]',
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.07 },
          '-=0.3'
        );
      }
      if (document.querySelector('#art-card')) {
        heroTl.fromTo(
          '#art-card',
          { clipPath: 'inset(100% 0 0 0)', rotate: 8 },
          { clipPath: 'inset(0% 0 0 0)', rotate: 2, duration: 0.85, ease: 'power3.out' },
          '-=0.5'
        );
      }
      if (document.querySelector('.orbit-chip')) {
        heroTl.fromTo(
          '.orbit-chip',
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.08 },
          '-=0.4'
        );
      }
      if (document.querySelector('.scroll-cue')) {
        heroTl.fromTo('.scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
      }

      // Loader Sequence
      const loader = document.getElementById('loader');
      const loaderText = document.getElementById('loader-text');
      const loaderFill = document.getElementById('loader-fill');

      if (reducedMotion || !loader) {
        gsap.set('.hero [data-reveal], .orbit-chip, .scroll-cue', { opacity: 1 });
        gsap.set('.marvel-char', { opacity: 1, y: 0 });
      } else {
        gsap
          .timeline({
            onComplete: () => {
              gsap.to(loader, {
                yPercent: -100,
                duration: 0.55,
                ease: 'power3.inOut',
                onComplete: () => {
                  loader.style.display = 'none';
                  heroTl.play();
                  ScrollTrigger.refresh();
                },
              });
            },
          })
          .to(loaderFill, { width: '35%', duration: 0.35, ease: 'power1.inOut' })
          .add(() => {
            if (loaderText) loaderText.textContent = 'INITIALIZING COMIC CORE...';
          })
          .to(loaderFill, { width: '75%', duration: 0.4, ease: 'power1.inOut' })
          .add(() => {
            if (loaderText) loaderText.textContent = 'ACTIVATING AI SYSTEMS...';
          })
          .to(loaderFill, { width: '100%', duration: 0.3, ease: 'power2.out' })
          .add(() => {
            if (loaderText) loaderText.textContent = 'TUSHAR.EXE READY!';
          });
      }

      // Idle Float Animations
      if (!reducedMotion) {
        gsap.utils.toArray<HTMLElement>('.orbit-chip').forEach((chip, i) => {
          gsap.to(chip, {
            y: i % 2 ? -10 : 12,
            duration: 2.2 + 0.4 * i,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        });

        if (document.querySelector('#art-card')) {
          gsap.to('#art-card', {
            y: -12,
            duration: 3.2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        }

        const heroArt = document.getElementById('hero-art');
        if (heroArt && window.matchMedia('(hover:hover) and (min-width:1024px)').matches) {
          const chips = gsap.utils.toArray<HTMLElement>('.orbit-chip');
          heroArt.addEventListener('pointermove', (e) => {
            const rect = heroArt.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to('#art-card', { x: 18 * relX, y: 14 * relY, duration: 0.5, ease: 'power2.out' });
            chips.forEach((c, idx) => {
              gsap.to(c, {
                x: relX * (16 + 8 * idx),
                y: relY * (12 + 6 * idx),
                duration: 0.6,
                ease: 'power2.out',
              });
            });
          });
        }

        // Marvel Character Interactive Hover Animation (TUSHAR MALI)
        const reelFrames = document.querySelectorAll('.marvel-studio-badge .reel-frame');
        if (reelFrames.length > 0) {
          gsap.fromTo(
            reelFrames,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.12, stagger: { each: 0.08, repeat: 3, yoyo: true }, ease: 'none' }
          );
        }

        const marvelChars = document.querySelectorAll<HTMLElement>('.marvel-char');
        marvelChars.forEach((el) => {
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              y: -12,
              scale: 1.25,
              rotate: (Math.random() - 0.5) * 20,
              color: '#00b4d8',
              duration: 0.25,
              ease: 'back.out(2)',
              overwrite: 'auto',
            });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              y: 0,
              scale: 1,
              rotate: 0,
              color: '',
              duration: 0.4,
              ease: 'elastic.out(1, 0.4)',
              overwrite: 'auto',
            });
          });
        });
      }

      // Scroll Trigger Reveals
      document.querySelectorAll('[data-reveal]:not(.hero [data-reveal])').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        });
      });

      // Animated Stat Counters
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.val));
          },
        });
      });

      // Skill Tiles Highlight
      document.querySelectorAll('.skill-tile').forEach((tile) => {
        ScrollTrigger.create({
          trigger: tile,
          start: 'top 92%',
          once: true,
          onEnter: () => tile.classList.add('lit'),
        });
      });

      // 3D Mission Cards Tilt
      if (!reducedMotion) {
        document.querySelectorAll<HTMLElement>('.mission-card').forEach((card) => {
          card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: 9 * relX,
              rotateX: -(9 * relY),
              transformPerspective: 900,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          card.addEventListener('pointerleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.5)',
            });
          });
        });
      }

      // Field Log Timeline Progress Line
      ScrollTrigger.create({
        trigger: '#fieldlog',
        start: 'top 70%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const fill = document.getElementById('flog-fill');
          if (fill) {
            fill.style.height = `${100 * self.progress}%`;
          }
        },
      });

      // Transmit Signal Button & Confetti
      const transmitBtn = document.getElementById('transmit-btn');
      transmitBtn?.addEventListener('click', () => {
        transmitBtn.querySelectorAll('.tx-ring').forEach((ring, idx) => {
          gsap.fromTo(
            ring,
            { scale: 1, opacity: 0.9 },
            { scale: 16 + 6 * idx, opacity: 0, duration: 1 + 0.25 * idx, ease: 'power2.out' }
          );
        });

        confetti({
          particleCount: 40,
          spread: 65,
          origin: { y: 0.8 },
          colors: ['#ffd21a', '#00d9ff', '#ff4f6d', '#ffffff'],
        });

        const originalText = transmitBtn.textContent;
        transmitBtn.textContent = 'SIGNAL TRANSMITTED ✓';
        gsap.fromTo(transmitBtn, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
        window.setTimeout(() => {
          if (transmitBtn) transmitBtn.textContent = originalText;
        }, 2200);
      });
    });

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(tickerUpdate);
      }
    };
  }, []);

  return <>{children}</>;
}
