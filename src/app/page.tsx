import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Gallery from '@/components/Gallery';
import Artists from '@/components/Artists';
import WhatIDo from '@/components/WhatIDo';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#40472b] selection:bg-[#e7c76a] selection:text-[#202020]">
      {/* Sticky Top Header with Art Heaven Logo */}
      <Header />

      {/* Main Content */}
      <main id="content" className="relative">
        {/* 1. Hero Section: Art Heaven by Neelofar Usman */}
        <Hero />

        {/* 2. Introduction Section: About Studio & Philosophy */}
        <Intro />

        {/* 3. Gallery Section: 9 items per page with PKR pricing & WhatsApp Buy */}
        <Gallery />

        {/* 4. The Artist: Neelofar Usman Spotlight */}
        <Artists />

        {/* 5. What I Do: Hand crafts on pillows, acrylic & mixed media in olive background */}
        <WhatIDo />
      </main>

      {/* Footer Section with Logo & Direct WhatsApp */}
      <Footer />
    </div>
  );
}
