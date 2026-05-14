import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zebrix — NBA Referee Alpha Trader',
  description:
    'Automated Polymarket trader exploiting NBA referee assignment biases. Scrapes official assignments, calculates referee adjustment factors, and trades Over/Under and Moneyline markets before prices adjust.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Zebrix — NBA Referee Alpha Trader',
    description:
      'Automated Polymarket trader exploiting NBA referee assignment biases for the DEGA NBA Playoffs Prediction Market Hackathon.',
    url: 'https://zebrix.vercel.app',
    siteName: 'Zebrix',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zebrix — NBA Referee Alpha Trader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zebrix — NBA Referee Alpha Trader',
    description:
      'Automated Polymarket trader exploiting NBA referee assignment biases.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
