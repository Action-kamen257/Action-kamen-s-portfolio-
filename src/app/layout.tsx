import type { Metadata } from 'next';
import { Bangers, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const bangers = Bangers({
  variable: '--font-bangers',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
});

const BASE_URL = 'https://tushar-portfolio-dev.web.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Tushar Mali — ML Engineer & Full-Stack Developer',
  description:
    'Portfolio of Tushar Mali — ML Engineer & Full-Stack Developer from Pune, India. Building explainable vision AI (NeuraScan), police case-management platforms (5,200+ cases), and autonomous vision robots.',
  applicationName: 'Tushar Mali Portfolio',
  authors: [{ name: 'Tushar Mali', url: BASE_URL }],
  keywords: [
    'Tushar Mali',
    'ML Engineer',
    'Machine Learning Engineer',
    'Computer Vision',
    'Full-Stack Developer',
    'Deep Learning',
    'PyTorch',
    'FastAPI',
    'Next.js Portfolio',
    'Pune Developer',
    'NeuraScan',
    'Dhule Police GIS',
    'Silly Smart Mark1',
    'Explainable AI',
    'Grad-CAM',
  ],
  creator: 'Tushar Mali',
  publisher: 'Tushar Mali',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: 'Tushar Mali — ML Engineer & Full-Stack Developer',
    description:
      'Explore the comic-tech portfolio of Tushar Mali. Featuring Brain Tumor AI, Dhule Police Case Management (5,200+ cases), GIS Maps, and Robotics.',
    url: `${BASE_URL}/`,
    siteName: 'Tushar Mali Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/assets/projects/neurascan-gradcam.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tushar Mali — ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tusharmali',
    title: 'Tushar Mali — ML Engineer & Full-Stack Developer',
    description: 'ML Engineer building explainable AI, robotics, and law enforcement GIS systems.',
    images: [`${BASE_URL}/assets/projects/neurascan-gradcam.jpg`],
  },
  other: {
    'theme-color': '#e11d48',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Tushar Mali',
      jobTitle: 'ML Engineer & Full-Stack Developer',
      url: BASE_URL,
      sameAs: ['https://github.com', 'https://linkedin.com'],
      worksFor: { '@type': 'Organization', name: 'Freelance / Open Source' },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'D.Y. Patil International University, Pune',
      },
      knowsAbout: [
        'Machine Learning',
        'Deep Learning',
        'Computer Vision',
        'PyTorch',
        'Full-Stack Web Development',
        'Next.js',
        'Robotics & IoT',
        'Geographic Information Systems (GIS)',
      ],
      description:
        'Computer Science student & ML engineer specializing in medical computer vision, explainable AI, and real-world law enforcement platforms.',
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Tushar Mali Portfolio',
      publisher: { '@id': `${BASE_URL}/#person` },
      description:
        'Interactive Marvel Comic-Tech Portfolio of Tushar Mali — Machine Learning & Full-Stack Engineer.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${bangers.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/assets/spider-3d-logo.png" />
        <meta name="theme-color" content="#e11d48" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
