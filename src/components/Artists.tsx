'use client';

import React from 'react';
import { Sparkles, Palette, Heart, MapPin } from 'lucide-react';

export default function Artists() {
  return (
    <section
      id="artists"
      className="relative bg-[#383e26] pt-[120px] md:pt-[160px] lg:pt-[190px] pb-[100px] md:pb-[140px] lg:pb-[170px] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Title */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-[#e7c76a] font-inter uppercase tracking-[3px] text-sm font-semibold mb-3 inline-block">
            The Vision Behind Art Heaven • Gujranwala
          </span>
          <h2 className="font-poppins font-semibold text-[#e7c76a] text-[44px] sm:text-[68px] md:text-[84px] lg:text-[100px] leading-[1.05] tracking-tight">
            Neelofar Usman
          </h2>
        </div>

        {/* Artist Profile Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] group">
              {/* Outer decorative gold border accent */}
              <div className="absolute -inset-3 rounded-sm border-2 border-[#e7c76a]/30 -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative aspect-[440/540] w-full bg-[#40472b] rounded-sm overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/neelofar-usman.jpg"
                  alt="Neelofar Usman - Artist and Founder of Art Heaven, Gujranwala"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-center">
                  <h3 className="font-poppins font-bold text-xl text-white">
                    Neelofar Usman
                  </h3>
                  <p className="font-inter text-xs text-[#e7c76a] uppercase tracking-widest mt-1">
                    Master Artist & Textile Creator
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#e7c76a] font-medium text-sm">
              <Sparkles size={18} />
              <span>Dedicated to Handcrafted Precision & Fine Art in Gujranwala</span>
            </div>

            <h3 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Transforming everyday living into an inspiring sanctuary of bespoke beauty.
            </h3>

            <p className="font-inter text-[16px] sm:text-[17px] text-white/80 leading-[32px] sm:leading-[36px]">
              Neelofar Usman is the visionary artist behind <strong>Art Heaven</strong>, operating from her dedicated art studio in Gujranwala. With an intimate passion for organic textures, vibrant chromatic interplay, and tactile materials, she crafts one-of-a-kind art pieces that bridge fine painting and artisanal home luxury.
            </p>

            <p className="font-inter text-[16px] sm:text-[17px] text-white/80 leading-[32px] sm:leading-[36px]">
              Every canvas painting is an exploration of light, pigment, and emotion, while each custom pillow and textile craft is meticulously hand-painted and finished to elevate residential spaces, gallery interiors, and discerning private collections across Pakistan and worldwide.
            </p>

            {/* Specialties Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 p-3.5 rounded-sm bg-[#40472b]/80 border border-white/5">
                <Palette className="w-5 h-5 text-[#e7c76a] flex-shrink-0" />
                <span className="font-inter text-sm text-white/90">Original Acrylics & Canvas Art</span>
              </div>
              <div className="flex items-center space-x-3 p-3.5 rounded-sm bg-[#40472b]/80 border border-white/5">
                <Heart className="w-5 h-5 text-[#e7c76a] flex-shrink-0" />
                <span className="font-inter text-sm text-white/90">Hand Crafts on Luxury Pillows</span>
              </div>
            </div>

            {/* Studio Address Tag */}
            <div className="flex items-start space-x-2.5 p-3.5 rounded-sm bg-black/20 border border-white/10 text-xs sm:text-sm text-white/75">
              <MapPin size={18} className="text-[#e7c76a] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Studio Address:</strong> Sahibzada Sayyed Khubaib Hasan Bukhari AHC, House# 49-A, Meeran Jee City, near Ratta Road, Jhal, Gujranwala, 52250, Pakistan
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#what-i-do"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#e7c76a] hover:bg-white text-[#202020] font-semibold text-[15px] sm:text-[16px] rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Inquire & Commission
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
