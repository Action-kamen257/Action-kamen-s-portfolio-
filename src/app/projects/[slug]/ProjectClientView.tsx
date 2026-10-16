'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Cpu,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Layers,
  ExternalLink,
  Share2,
  CircleCheck,
  User,
  Calendar,
  Flame,
  ChevronLeft,
  ChevronRight,
  Brain,
  ShieldCheck,
  MapPin,
  Bot,
  Activity,
} from 'lucide-react';
import Spider3DLogo from '@/components/Spider3DLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { playCue } from '@/components/ActionBurst';
import { DOSSIERS } from '@/data/dossiers';

interface ProjectClientViewProps {
  dossierId: string;
}

function getIcon(id: string) {
  switch (id) {
    case 'brain-tumor-ai':
      return Brain;
    case 'dhule-cyber-police':
      return ShieldCheck;
    case 'dhule-gis-map':
      return MapPin;
    case 'silly-smart-mark1':
      return Bot;
    case 'pune-crime-dashboard':
      return Activity;
    default:
      return Sparkles;
  }
}

export default function ProjectClientView({ dossierId }: ProjectClientViewProps) {
  const [copied, setCopied] = useState(false);

  const dossier = DOSSIERS.find((d) => d.id === dossierId) || DOSSIERS[0];
  const IconComp = getIcon(dossier.id);

  const currentIndex = DOSSIERS.findIndex((d) => d.id === dossier.id);
  const prevProject =
    currentIndex > 0 ? DOSSIERS[currentIndex - 1] : DOSSIERS[DOSSIERS.length - 1];
  const nextProject =
    currentIndex < DOSSIERS.length - 1 ? DOSSIERS[currentIndex + 1] : DOSSIERS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    playCue('select');
    setTimeout(() => setCopied(false), 2000);
  };

  const cs = dossier.caseStudy;

  return (
    <div className="notion-page-root">
      <header className="notion-nav">
        <div className="notion-nav-inner">
          <div className="notion-breadcrumbs">
            <Link href="/" className="notion-crumb" onClick={() => playCue('select')}>
              <Spider3DLogo size={20} />
              <span className="font-bold">Tushar Mali</span>
            </Link>
            <span className="notion-crumb-sep">/</span>
            <Link
              href="/#missions"
              className="notion-crumb"
              onClick={() => playCue('select')}
            >
              Projects
            </Link>
            <span className="notion-crumb-sep">/</span>
            <span className="notion-crumb-active">{dossier.title}</span>
          </div>

          <div className="notion-nav-actions">
            <button
              className="notion-action-btn"
              onClick={handleCopy}
              title="Copy Page URL"
              aria-label="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500 mr-1.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} className="mr-1.5" />
                  <span>Share</span>
                </>
              )}
            </button>
            <ThemeToggle className="notion-theme-btn" />
            <Link
              href="/#missions"
              className="notion-back-btn"
              onClick={() => playCue('press')}
            >
              <ArrowLeft size={15} className="mr-1" />
              <span>Back to Mission Control</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="notion-cover">
        <div className="notion-cover-mesh" />
        <div className="notion-cover-badge">{dossier.codeName}</div>
      </div>

      <main className="notion-container">
        <div className="notion-header-group">
          <div className="notion-page-icon">
            <IconComp size={38} color={dossier.accentColor || '#e11d48'} />
          </div>
          <h1 className="notion-title">{dossier.title}</h1>
          <p className="notion-summary">{dossier.summary}</p>
        </div>

        <div className="notion-properties-card">
          <div className="notion-prop-row">
            <div className="notion-prop-label">
              <CircleCheck size={14} className="mr-2 opacity-60" /> Status
            </div>
            <div className="notion-prop-value">
              <span className={`notion-status-badge ${dossier.statusType || 'deployed'}`}>
                {dossier.status}
              </span>
            </div>
          </div>

          {cs?.role && (
            <div className="notion-prop-row">
              <div className="notion-prop-label">
                <User size={14} className="mr-2 opacity-60" /> Role
              </div>
              <div className="notion-prop-value font-medium">{cs.role}</div>
            </div>
          )}

          {cs?.timeline && (
            <div className="notion-prop-row">
              <div className="notion-prop-label">
                <Calendar size={14} className="mr-2 opacity-60" /> Timeline
              </div>
              <div className="notion-prop-value text-muted-foreground">{cs.timeline}</div>
            </div>
          )}

          <div className="notion-prop-row">
            <div className="notion-prop-label">
              <Layers size={14} className="mr-2 opacity-60" /> Tech Stack
            </div>
            <div className="notion-prop-value flex-wrap gap-1.5">
              {dossier.tags.map((tag) => (
                <span key={tag} className="notion-tech-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {(dossier.liveUrl || dossier.githubUrl) && (
            <div className="notion-prop-row">
              <div className="notion-prop-label">
                <ExternalLink size={14} className="mr-2 opacity-60" /> Deployments
              </div>
              <div className="notion-prop-value gap-3">
                {dossier.liveUrl && (
                  <a
                    href={dossier.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="notion-link-pill primary"
                    onClick={() => playCue('open')}
                  >
                    <ExternalLink size={13} className="mr-1" />
                    <span>Live Production</span>
                  </a>
                )}
                {dossier.githubUrl && (
                  <a
                    href={dossier.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="notion-link-pill"
                    onClick={() => playCue('open')}
                  >
                    <svg
                      width={13}
                      height={13}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 inline"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="notion-section">
          <div className="notion-callout">
            <div className="notion-callout-icon">
              <Sparkles size={22} className="text-amber-500" />
            </div>
            <div className="notion-callout-body">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">
                Executive Briefing
              </h4>
              <p className="text-sm leading-relaxed opacity-90">{dossier.briefing}</p>
            </div>
          </div>
        </section>

        {dossier.metrics && dossier.metrics.length > 0 && (
          <section className="notion-section">
            <h2 className="notion-h2">
              <Cpu size={20} className="mr-2 text-accent inline" /> Key Impact & Performance Metrics
            </h2>
            <div className="notion-metrics-grid">
              {dossier.metrics.map((m) => (
                <div key={m.label} className="notion-metric-box">
                  <div className="notion-metric-value">{m.value}</div>
                  <div className="notion-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="notion-section">
          <h2 className="notion-h2">
            <Layers size={20} className="mr-2 text-accent inline" /> System Architecture & Pipeline
          </h2>
          {dossier.previewImage && (
            <div className="notion-media-card">
              <img
                src={dossier.previewImage}
                alt={`${dossier.title} architecture`}
                className="notion-media-img"
              />
              <div className="notion-media-caption">
                Figure 1.0 — High-level architectural pipeline & user workflow telemetry.
              </div>
            </div>
          )}
          <div className="notion-arch-list">
            {dossier.architecture.map((arch, idx) => (
              <div key={idx} className="notion-arch-item">
                <span className="notion-arch-num">0{idx + 1}</span>
                <p className="notion-arch-text">{arch}</p>
              </div>
            ))}
          </div>
        </section>

        {cs?.problem && cs?.solution && (
          <section className="notion-section">
            <div className="notion-twocol-grid">
              <div className="notion-story-card problem">
                <div className="notion-sc-head">
                  <Flame size={18} className="text-rose-500 mr-2" />
                  <h3>The Clinical / Domain Problem</h3>
                </div>
                <p>{cs.problem}</p>
              </div>
              <div className="notion-story-card solution">
                <div className="notion-sc-head">
                  <Lightbulb size={18} className="text-emerald-500 mr-2" />
                  <h3>The Engineered Solution</h3>
                </div>
                <p>{cs.solution}</p>
              </div>
            </div>
          </section>
        )}

        {cs?.keyFeatures && cs.keyFeatures.length > 0 && (
          <section className="notion-section">
            <h2 className="notion-h2">
              <Sparkles size={20} className="mr-2 text-accent inline" /> Core Engineering Features
            </h2>
            <ul className="notion-feature-list">
              {cs.keyFeatures.map((feat, idx) => (
                <li key={idx} className="notion-feature-item">
                  <span className="notion-feature-bullet">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {cs?.challenges && cs.challenges.length > 0 && (
          <section className="notion-section">
            <h2 className="notion-h2">
              <Flame size={20} className="mr-2 text-accent inline" /> Engineering Challenges &
              Resolutions
            </h2>
            <div className="notion-challenges-grid">
              {cs.challenges.map((ch, idx) => (
                <div key={idx} className="notion-challenge-card">
                  <div className="notion-cc-title">{ch.title}</div>
                  <div className="notion-cc-block problem">
                    <span className="notion-cc-tag">Obstacle</span>
                    <p>{ch.problem}</p>
                  </div>
                  <div className="notion-cc-block resolution">
                    <span className="notion-cc-tag">Engineered Fix</span>
                    <p>{ch.resolution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs?.learnings && cs.learnings.length > 0 && (
          <section className="notion-section">
            <h2 className="notion-h2">
              <GraduationCap size={20} className="mr-2 text-accent inline" /> Production Insights &
              Takeaways
            </h2>
            <div className="notion-learnings-box">
              {cs.learnings.map((lrn, idx) => (
                <div key={idx} className="notion-learning-item">
                  <span className="notion-learning-icon">💡</span>
                  <p>{lrn}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="notion-switcher-bar">
          <Link
            href={`/projects/${prevProject.id}`}
            className="notion-switch-btn prev"
            onClick={() => playCue('select')}
          >
            <ChevronLeft size={18} className="mr-1" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono opacity-60">Previous Project</div>
              <div className="font-bold text-sm truncate max-w-[200px]">{prevProject.title}</div>
            </div>
          </Link>
          <Link
            href={`/projects/${nextProject.id}`}
            className="notion-switch-btn next"
            onClick={() => playCue('select')}
          >
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono opacity-60">Next Project</div>
              <div className="font-bold text-sm truncate max-w-[200px]">{nextProject.title}</div>
            </div>
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </main>

      <footer className="notion-footer">
        <div className="notion-footer-inner">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Spider3DLogo size={24} />
            <span>Tushar Mali — ML Engineer & Full-Stack Architect</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-accent transition-colors">
              Return Home
            </Link>
            <span>•</span>
            <Link href="/#missions" className="hover:text-accent transition-colors">
              All Missions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
