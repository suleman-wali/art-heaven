'use client';

import React, { useState } from 'react';
import { MessageCircle, Check, Sparkles } from 'lucide-react';
import { getWhatsAppArtworkUrl, ART_HEAVEN_DOMAIN } from '@/utils/whatsapp';

export default function Hero() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const heroArtworks = [
    {
      id: 'ballerina',
      title: 'The Ballerina Silhouette Pillow',
      price: 'PKR 8,500',
      medium: 'Handcrafted 3D Tulle & Velvet Cushion',
      image: '/images/wa-art-9.jpeg',
    },
    {
      id: 'lake',
      title: 'Serenade by the Lake',
      price: 'PKR 14,000',
      medium: 'Hand-Embroidered Hoop Landscape',
      image: '/images/wa-art-6.jpeg',
    },
    {
      id: 'stone',
      title: 'Calligraphy on River Stone',
      price: 'PKR 5,500',
      medium: 'Hand-Painted Arabic Calligraphy on Stone',
      image: '/images/wa-art-12.jpeg',
    },
  ];

  const handleWhatsAppBuy = (e: React.MouseEvent, item: typeof heroArtworks[0]) => {
    e.stopPropagation();
    const shareText = `Art Heaven - "${item.title}" (${item.price}): ${ART_HEAVEN_DOMAIN}${item.image}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 3000);
    }

    const url = getWhatsAppArtworkUrl(item.title, item.price, item.medium, item.image);
    window.open(url, '_blank');
  };

  return (
    <section
      id="home"
      className="relative bg-[#40472b] pt-[150px] md:pt-[180px] lg:pt-[200px] pb-[80px] lg:pb-[110px] overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Center Header: Small "Art Heaven" & Big "Art Work by Neelofar Usman" */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mb-16 lg:mb-20">
          
          {/* Small: ART HEAVEN */}
          <div className="inline-flex items-center space-x-2.5 px-5 py-1.5 rounded-full bg-white/10 border border-[#e7c76a]/30 mb-5 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#e7c76a]" />
            <span className="font-poppins font-semibold text-[#e7c76a] text-xs sm:text-sm tracking-[5px] uppercase">
              Art Heaven
            </span>
          </div>

          {/* Big: Art Work by Neelofar Usman */}
          <h1 className="font-poppins font-semibold text-white text-[44px] sm:text-[68px] md:text-[90px] lg:text-[104px] xl:text-[118px] leading-[1.02] tracking-[-1.5px] mb-6 select-none">
            Art Work by
            <br />
            <span className="text-[#e7c76a]">Neelofar Usman</span>
          </h1>

          {/* Subtitle / Specialties Badge */}
          <div className="inline-flex items-center space-x-3 text-white/90 py-2.5 px-6 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e7c76a] animate-pulse"></span>
            <span className="font-inter text-[14px] sm:text-[16px] tracking-normal font-normal">
              Hand Crafts on Pillows • Acrylic Paintings • Fine Art Commissions
            </span>
          </div>
        </div>

        {/* 3 Featured Hero Artworks: Same Size & Double Bordered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {heroArtworks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center group"
            >
              {/* Double Border Frame: Outer Gold Border + Inner White Border */}
              <div className="w-full max-w-[340px] aspect-square p-2.5 rounded-sm border-2 border-[#e7c76a] bg-[#383e26] shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full aspect-square overflow-hidden rounded-sm border-2 border-white/50 relative bg-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-poppins font-bold text-xs sm:text-sm text-[#202020] px-3 py-1 rounded-full bg-[#e7c76a] shadow-md">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & WhatsApp Buy Action */}
              <div className="w-full max-w-[340px] mt-5 text-center flex flex-col space-y-2.5">
                <h3 className="font-poppins font-semibold text-[17px] sm:text-[18px] text-white group-hover:text-[#e7c76a] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="font-inter text-xs text-white/65">
                  {item.medium}
                </p>

                <button
                  onClick={(e) => handleWhatsAppBuy(e, item)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 mt-1"
                >
                  <MessageCircle size={16} className="fill-white/20" />
                  <span>
                    {copiedId === item.id ? 'Opening WhatsApp...' : 'Buy via WhatsApp'}
                  </span>
                  {copiedId === item.id && <Check size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
