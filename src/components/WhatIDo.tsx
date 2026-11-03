'use client';

import React from 'react';
import { Palette, Layers, Feather, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppCustomOrderUrl } from '@/utils/whatsapp';

export default function WhatIDo() {
  const offerings = [
    {
      id: 1,
      icon: Feather,
      title: 'Hand Crafts on Pillows',
      subtitle: 'Luxury Artisan Textile Art',
      image: '/images/wa-art-9.jpeg',
      description:
        'Transforming premium velvet, raw silk, and pure linen into statement artisan pillows. Each cushion features original hand-painted motifs, 3D pleated tulle, velvet ribbon bows, and delicate embroidery tailored to match your living space.',
      highlights: [
        'One-of-a-kind 3D fabric and tulle detailing',
        'Hand-embroidered floral rosettes & French knots',
        'Custom color matching for interior decors',
        'Durable, washable artisan luxury finish',
      ],
      whatsappTopic: 'Hand Crafted Pillows & Cushions',
    },
    {
      id: 2,
      icon: Palette,
      title: 'Acrylic Paintings on Canvas',
      subtitle: 'Modern & Textured Fine Art',
      image: '/images/wa-art-10.jpeg',
      description:
        'Vibrant, emotionally evocative acrylic paintings on high-grade canvas. Neelofar blends rich palette knife impasto textures, contemporary cubist/pop portraits, and metallic embellishments to create modern focal masterpieces.',
      highlights: [
        'Heavy impasto & contemporary mosaic styles',
        'Signed original acrylic canvas works',
        'Abstract, figurative & atmospheric themes',
        'Gallery-wrapped, ready-to-hang stretched canvas',
      ],
      whatsappTopic: 'Acrylic Canvas Painting',
    },
    {
      id: 3,
      icon: Layers,
      title: 'Other Paintings & Mixed Media',
      subtitle: 'Bespoke Private Commissions',
      image: '/images/wa-art-6.jpeg',
      description:
        'Bespoke mixed-media artworks integrating thread embroidery on wooden hoops, calligraphy on natural river stone, and stipple ink portraiture. Tailored for art collectors seeking rare, heirloom art.',
      highlights: [
        'Landscape embroidery in wooden hoop frames',
        'Hand-painted Arabic calligraphy on river stone',
        'Pointillism pen & ink inspirational portraits',
        'Complete room coordination & styling consult',
      ],
      whatsappTopic: 'Mixed Media, Stone & Hoop Arts',
    },
  ];

  const handleOrderWhatsApp = (topic: string) => {
    window.open(getWhatsAppCustomOrderUrl(topic), '_blank');
  };

  return (
    <section
      id="what-i-do"
      className="relative bg-[#383e26] pt-[120px] md:pt-[150px] lg:pt-[170px] pb-[100px] md:pb-[140px] lg:pb-[160px] px-6 sm:px-10 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-[#e7c76a] font-inter uppercase tracking-[3px] text-xs font-semibold mb-3 inline-block">
            Artisan Services & Crafts
          </span>

          <h2 className="font-poppins font-semibold text-[#e7c76a] text-[44px] sm:text-[68px] md:text-[84px] lg:text-[100px] leading-[1.05] tracking-tight mb-5">
            What I Do
          </h2>

          <p className="font-inter text-white/80 text-[16px] sm:text-[18px] leading-[30px]">
            At <strong>Art Heaven</strong>, Neelofar Usman creates bespoke fine art and handcrafted textiles. From custom-painted luxury pillows to statement acrylic canvas art, each piece is handcrafted with love and devotion.
          </p>
        </div>

        {/* 3 Featured Craft Showcase Cards with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {offerings.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#40472b] rounded-sm overflow-hidden shadow-2xl transition-all duration-500 flex flex-col group hover:-translate-y-2 border border-white/10 hover:border-[#e7c76a]/50"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#383e26]/90 backdrop-blur-md flex items-center justify-center text-[#e7c76a] shadow-md border border-white/10">
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#e7c76a] uppercase tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-poppins font-semibold text-2xl text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="font-inter text-[15px] text-white/75 leading-[26px] mb-6">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                      {item.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-center text-xs sm:text-sm text-white/85 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e7c76a] mr-2.5 flex-shrink-0"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct WhatsApp Action Button */}
                  <button
                    onClick={() => handleOrderWhatsApp(item.whatsappTopic)}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
                  >
                    <MessageCircle size={18} className="fill-white/20" />
                    <span>Order {item.title} via WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order Callout Banner (Direct WhatsApp) */}
        <div className="bg-[#40472b] rounded-sm shadow-2xl p-8 sm:p-14 md:p-16 max-w-4xl mx-auto border border-white/10 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#e7c76a]/5 blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center space-x-2 text-[#e7c76a] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={16} />
            <span>Bespoke Commissions</span>
          </div>

          <h3 className="font-poppins font-semibold text-3xl sm:text-4xl text-white mb-4">
            Have a Specific Vision in Mind?
          </h3>

          <p className="font-inter text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Whether you want custom-embroidered luxury pillows tailored to your room or an original acrylic painting sized to your living room walls, message Neelofar Usman directly on WhatsApp.
          </p>

          <button
            onClick={() => handleOrderWhatsApp('Bespoke Custom Artwork Consultation')}
            className="inline-flex items-center justify-center space-x-3 px-10 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-base sm:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-98"
          >
            <MessageCircle size={22} className="fill-white/20" />
            <span>Chat on WhatsApp for Custom Orders</span>
          </button>
        </div>
      </div>
    </section>
  );
}
