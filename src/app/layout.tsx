import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Art Work by Neelofar Usman | Art Heaven',
  description: 'Art Heaven by Neelofar Usman – Exclusive handcrafted pillows, bespoke acrylic paintings, textile crafts, and fine art collections.',
  icons: {
    icon: '/images/art-heaven-logo.png',
    shortcut: '/images/art-heaven-logo.png',
    apple: '/images/art-heaven-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/images/art-heaven-logo.png" />
        <link rel="apple-touch-icon" href="/images/art-heaven-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#40472b] text-white font-inter selection:bg-[#e7c76a] selection:text-[#202020] antialiased">
        {children}
      </body>
    </html>
  );
}
