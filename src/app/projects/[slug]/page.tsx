import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DOSSIERS } from '@/data/dossiers';
import ProjectClientView from './ProjectClientView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DOSSIERS.map((dossier) => ({
    slug: dossier.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dossier = DOSSIERS.find((d) => d.id === slug);

  if (!dossier) {
    return {
      title: 'Project Not Found | Tushar Mali',
    };
  }

  const BASE_URL = 'https://tushar-portfolio-dev.web.app';
  const pageTitle = `${dossier.title} — Case Study | Tushar Mali`;

  return {
    title: pageTitle,
    description: dossier.summary,
    alternates: {
      canonical: `${BASE_URL}/projects/${slug}/`,
    },
    openGraph: {
      title: pageTitle,
      description: dossier.summary,
      url: `${BASE_URL}/projects/${slug}/`,
      type: 'article',
      images: dossier.previewImage ? [`${BASE_URL}${dossier.previewImage}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: dossier.summary,
      images: dossier.previewImage ? [`${BASE_URL}${dossier.previewImage}`] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const dossier = DOSSIERS.find((d) => d.id === slug);

  if (!dossier) {
    notFound();
  }

  return <ProjectClientView dossierId={slug} />;
}
