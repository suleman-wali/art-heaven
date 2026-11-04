import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Art Work by Neelofar Usman | Best Art Shop in Gujranwala | Art Heaven',
  description:
    'Art Heaven by Neelofar Usman is the premier art shop in Gujranwala, Pakistan. Discover handcrafted 3D pillows, bespoke acrylic paintings on canvas, silk ribbon embroidery, and custom commissions at House# 49-A, Meeran Jee City, near Ratta Road, Jhal, Gujranwala.',
  keywords: [
    'art shop in gujranwala',
    'art shop in gujaranwala',
    'best art shop in gujranwala',
    'art gallery in gujranwala',
    'paintings in gujranwala',
    'handcrafts in gujranwala',
    'hand crafted pillows in gujranwala',
    'acrylic paintings gujranwala',
    'art work by neelofar usman',
    'neelofar usman gujranwala',
    'art heaven',
    'pakistan art gallery',
    'custom embroidery art gujranwala',
  ],
  authors: [{ name: 'Neelofar Usman' }],
  creator: 'Neelofar Usman',
  publisher: 'Art Heaven',
  metadataBase: new URL('https://artheaven.store'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Art Work by Neelofar Usman | Art Shop in Gujranwala | Art Heaven',
    description:
      'Premier art shop in Gujranwala featuring bespoke acrylic paintings, handcrafted luxury pillows, and fine embroidery by Neelofar Usman.',
    url: 'https://artheaven.store',
    siteName: 'Art Heaven',
    images: [
      {
        url: '/images/art-heaven-logo.png',
        width: 800,
        height: 800,
        alt: 'Art Heaven Logo - Neelofar Usman Art Studio Gujranwala',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  icons: {
    icon: '/images/art-heaven-logo.png',
    shortcut: '/images/art-heaven-logo.png',
    apple: '/images/art-heaven-logo.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ArtGallery', 'LocalBusiness'],
  name: 'Art Heaven by Neelofar Usman',
  description:
    'Premier art shop in Gujranwala, Pakistan. Original acrylic paintings on canvas, hand crafts on luxury pillows, silk ribbon embroidery, and bespoke art commissions.',
  url: 'https://artheaven.store',
  telephone: '+923013100089',
  image: 'https://artheaven.store/images/art-heaven-logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House# 49-A, Meeran Jee City, near Ratta Road, Jhal',
    addressLocality: 'Gujranwala',
    postalCode: '52250',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.1877,
    longitude: 74.1945,
  },
  priceRange: 'PKR 4,800 - PKR 30,000',
  founder: {
    '@type': 'Person',
    name: 'Neelofar Usman',
    jobTitle: 'Master Artist & Textile Artisan',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Gujranwala, Punjab, Pakistan',
  },
  keywords: 'art shop in gujranwala, art shop in gujaranwala, paintings in gujranwala, handcrafted pillows gujranwala',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#40472b] text-white font-inter selection:bg-[#e7c76a] selection:text-[#202020] antialiased">
        {children}
      </body>
    </html>
  );
}
