'use client';

import React from 'react';

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative bg-[#40472b] pt-[60px] md:pt-[90px] lg:pt-[110px] pb-[100px] md:pb-[140px] lg:pb-[160px] border-t border-white/5"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Two-Column Editorial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & Artist Signature */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <span className="text-[#e7c76a] font-inter uppercase tracking-[3px] text-xs font-semibold">
              Studio Philosophy
            </span>
            <h2 className="font-poppins font-semibold text-[#e7c76a] text-[42px] sm:text-[64px] md:text-[80px] xl:text-[96px] 2xl:text-[100px] leading-[1.05] tracking-tight">
              Art Heaven
              <br />
              Creations
            </h2>
            <p className="font-inter font-medium text-[18px] sm:text-[20px] tracking-[-0.5px] text-white">
              By Neelofar Usman
            </p>
          </div>

          {/* Right Column: Bio Paragraphs & CTA */}
          <div className="lg:col-span-6 flex flex-col space-y-6 pt-2">
            <p className="font-inter text-[16px] sm:text-[17px] text-white/80 leading-[34px] sm:leading-[36px]">
              Welcome to <strong className="text-white font-medium">Art Heaven</strong> — a bespoke artistic sanctuary founded and curated by <strong>Neelofar Usman</strong>. Rooted in a deep reverence for organic textures, vivid chromatic depth, and tactile expressions, every creation bridges timeless fine art with functional living beauty.
            </p>
            <p className="font-inter text-[16px] sm:text-[17px] text-white/80 leading-[34px] sm:leading-[36px]">
              Specializing in original hand-crafted fabric artistry on cushions and pillows, dramatic acrylic paintings on canvas, and bespoke mixed-media collections, each piece is an individualized, one-of-a-kind narrative designed to bring serenity, joy, and warmth into your home.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#gallery"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#e7c76a] hover:bg-white text-[#202020] font-semibold text-[15px] sm:text-[16px] rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                View Gallery
              </a>
              <a
                href="#what-i-do"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 hover:border-[#e7c76a] text-white hover:text-[#e7c76a] font-semibold text-[15px] sm:text-[16px] rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                What I Do
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
