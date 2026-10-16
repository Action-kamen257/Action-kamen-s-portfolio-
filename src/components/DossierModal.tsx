'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Activity,
  Lightbulb,
  Sparkles,
  Brain,
  ShieldCheck,
  Bot,
  MapPin,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { SpiderWebCorner } from './SpiderWeb';
import { playCue, triggerActionBurst } from './ActionBurst';
import { Dossier } from '../data/dossiers';

interface DossierModalProps {
  dossier: Dossier | null;
  onClose: () => void;
}

function getIcon(category: string, id: string) {
  if (id === 'brain-tumor-ai') return Brain;
  if (id === 'dhule-cyber-police') return ShieldCheck;
  if (id === 'dhule-gis-map') return MapPin;
  if (id === 'silly-smart-mark1') return Bot;
  if (id === 'pune-crime-dashboard') return Activity;
  return Sparkles;
}

export default function DossierModal({ dossier, onClose }: DossierModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playCue('close');
        onClose();
      }
    };

    if (dossier) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dossier, onClose]);

  if (!dossier) return null;

  const IconComp = getIcon(dossier.category, dossier.id);
  const cs = dossier.caseStudy;

  const handleClose = () => {
    playCue('close');
    onClose();
  };

  return (
    <div
      className="dossier-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dossier-title"
      data-lenis-prevent="true"
    >
      <div
        className="dossier-modal-window"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <SpiderWebCorner size={48} position="top-right" />
        <header className="dossier-modal-header">
          <div className="dmh-left">
            <span className="dmh-stamp">TOP SECRET // CLASSIFIED</span>
            <span className="dmh-code">{dossier.codeName}</span>
          </div>
          <button
            onClick={handleClose}
            className="dossier-close-btn"
            aria-label="Close dossier modal"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </header>

        <div className="dossier-modal-content notion-case-study" data-lenis-prevent="true">
          {dossier.previewImage && (
            <div className="notion-cover-wrapper comic-grain-container">
              <img
                src={dossier.previewImage}
                alt={dossier.title}
                className="notion-cover-img comic-grain-img"
                width={800}
                height={260}
                decoding="async"
              />
              <div className="comic-grain-overlay" aria-hidden="true" />
            </div>
          )}

          <div className="notion-header-row">
            <div className="notion-icon-avatar" style={{ color: 'var(--accent)' }}>
              <IconComp size={34} />
            </div>
            <div>
              <div className="dm-status-badge">
                <span className="dm-status-dot" />
                {dossier.status}
              </div>
              <h1 id="modal-dossier-title" className="notion-page-title">
                {dossier.title}
              </h1>
              <p className="notion-page-summary">{dossier.summary}</p>
            </div>
          </div>

          <div className="notion-properties-card">
            <div className="notion-prop-row">
              <span className="notion-prop-key">Category</span>
              <span className="notion-prop-val">
                <span className="notion-tag-badge">{dossier.category.toUpperCase()}</span>
              </span>
            </div>

            {cs && (
              <>
                <div className="notion-prop-row">
                  <span className="notion-prop-key">Role</span>
                  <span className="notion-prop-val text-white">{cs.role}</span>
                </div>
                <div className="notion-prop-row">
                  <span className="notion-prop-key">Timeline</span>
                  <span className="notion-prop-val">{cs.timeline}</span>
                </div>
              </>
            )}

            <div className="notion-prop-row">
              <span className="notion-prop-key">Tech Stack</span>
              <div className="notion-prop-val flex-wrap gap-1.5">
                {dossier.tags.map((tag) => (
                  <span key={tag} className="notion-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {dossier.liveUrl && (
              <div className="notion-prop-row">
                <span className="notion-prop-key">Live Link</span>
                <a
                  href={dossier.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="notion-link-val"
                  onClick={() => playCue('press')}
                >
                  <span>{dossier.liveUrl}</span>
                  <ExternalLink size={13} className="inline ml-1" />
                </a>
              </div>
            )}
          </div>

          {cs?.problem && (
            <div className="notion-callout notion-callout-problem">
              <div className="notion-callout-icon">
                <Lightbulb size={20} className="text-accent" />
              </div>
              <div className="notion-callout-body">
                <div className="notion-callout-title">THE PROBLEM // MISSION CONTEXT</div>
                <p>{cs.problem}</p>
              </div>
            </div>
          )}

          {cs?.solution && (
            <div className="notion-callout notion-callout-solution">
              <div className="notion-callout-icon">
                <Sparkles size={20} className="text-accent-2" />
              </div>
              <div className="notion-callout-body">
                <div className="notion-callout-title">THE SOLUTION // CORE INNOVATION</div>
                <p>{cs.solution}</p>
              </div>
            </div>
          )}

          <div className="notion-section">
            <h2 className="notion-h2">
              <Cpu size={18} className="inline mr-2 text-accent" />
              System Architecture & Data Pipelines
            </h2>
            <div className="notion-arch-grid">
              {dossier.architecture.map((step, i) => (
                <div key={i} className="notion-arch-card">
                  <div className="notion-arch-step-num">STAGE 0{i + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {cs?.keyFeatures && cs.keyFeatures.length > 0 && (
            <div className="notion-section">
              <h2 className="notion-h2">
                <Layers size={18} className="inline mr-2 text-accent-2" />
                Key Capabilities & Engineering Specs
              </h2>
              <div className="notion-features-list">
                {cs.keyFeatures.map((feat, i) => (
                  <div key={i} className="notion-feat-row">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-1" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cs?.challenges && cs.challenges.length > 0 && (
            <div className="notion-section">
              <h2 className="notion-h2">
                <Flame size={18} className="inline mr-2 text-accent" />
                Technical Challenges & Solutions
              </h2>
              <div className="notion-challenges-grid">
                {cs.challenges.map((ch, i) => (
                  <div key={i} className="notion-challenge-card">
                    <div className="notion-ch-title">{ch.title}</div>
                    <div className="notion-ch-body">
                      <div className="notion-ch-row">
                        <span className="notion-ch-tag tag-prob">Hurdle:</span>
                        <p>{ch.problem}</p>
                      </div>
                      <div className="notion-ch-row">
                        <span className="notion-ch-tag tag-sol">Resolution:</span>
                        <p>{ch.resolution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dossier.metrics && dossier.metrics.length > 0 && (
            <div className="notion-section">
              <h2 className="notion-h2">
                <Activity size={18} className="inline mr-2 text-accent-2" />
                Verified Telemetry & Benchmarks
              </h2>
              <div className="notion-metrics-grid">
                {dossier.metrics.map((m, i) => (
                  <div key={i} className="notion-metric-tile">
                    <div className="notion-metric-val">{m.value}</div>
                    <div className="notion-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cs?.learnings && cs.learnings.length > 0 && (
            <div className="notion-section">
              <h2 className="notion-h2">
                <Sparkles size={18} className="inline mr-2 text-accent" />
                Key Learnings & Takeaways
              </h2>
              <ul className="notion-learnings-list">
                {cs.learnings.map((lrn, i) => (
                  <li key={i}>
                    <span className="notion-learn-bullet">✦</span>
                    <span>{lrn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="notion-actions-row">
            {dossier.liveUrl && (
              <a
                href={dossier.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                data-burst="LAUNCH MISSION! 🚀"
                onClick={(e) => {
                  playCue('press');
                  triggerActionBurst(e.clientX, e.clientY, 'MISSION ENGAGED! ⚡');
                }}
              >
                <span>LAUNCH LIVE PRODUCTION SYSTEM</span>
                <ExternalLink size={17} />
              </a>
            )}
            {dossier.githubUrl && (
              <a
                href={dossier.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                data-burst="INSPECT CODE! 🐙"
                onClick={(e) => {
                  playCue('press');
                  triggerActionBurst(e.clientX, e.clientY, 'OPENING REPO! 📂');
                }}
              >
                <svg
                  width={17}
                  height={17}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>INSPECT REPOSITORY</span>
              </a>
            )}
            <Link
              href={`/projects/${dossier.id}`}
              className="btn btn-ghost"
              data-burst="DEEP DIVE! 🔍"
              onClick={() => playCue('select')}
            >
              <span>FULL NOTION DOSSIER</span>
              <ExternalLink size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
