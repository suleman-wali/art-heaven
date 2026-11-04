'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { getWhatsAppCustomOrderUrl } from '@/utils/whatsapp';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppChat = () => {
    window.open(getWhatsAppCustomOrderUrl('General Inquiry'), '_blank');
  };

  return (
    <footer id="tatsu-footer-container" className="bg-[#383e26] pt-[90px] pb-[40px] text-white border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand & User Logo */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="#home" className="flex items-center space-x-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/art-heaven-logo.png"
                alt="Art Heaven"
                className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full bg-white/10 p-1 shadow-md transition-transform group-hover:scale-105"
              />
              <span className="font-poppins font-bold text-2xl tracking-wider text-white group-hover:text-[#e7c76a] transition-colors">
                ART HEAVEN
              </span>
            </Link>
            <p className="font-inter text-sm text-white/70 max-w-xs leading-relaxed">
              Art work by Neelofar Usman. Premier <strong>art shop in Gujranwala</strong>. Exclusive handcrafted pillows, bespoke acrylic paintings on canvas, and embroidery arts in Pakistan & worldwide.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <span className="text-xs font-semibold text-[#e7c76a] uppercase tracking-widest block mb-4">
              Explore
            </span>
            <ul className="flex flex-col space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-[16px] text-white/80 hover:text-[#e7c76a] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#intro"
                  className="text-[16px] text-white/80 hover:text-[#e7c76a] transition-colors"
                >
                  About Studio
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-[16px] text-white/80 hover:text-[#e7c76a] transition-colors"
                >
                  Artwork Gallery
                </a>
              </li>
              <li>
                <a
                  href="#artists"
                  className="text-[16px] text-white/80 hover:text-[#e7c76a] transition-colors"
                >
                  The Artist (Neelofar Usman)
                </a>
              </li>
              <li>
                <a
                  href="#what-i-do"
                  className="text-[16px] text-white/80 hover:text-[#e7c76a] transition-colors"
                >
                  What I Do
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Location */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-semibold text-[#e7c76a] uppercase tracking-widest block mb-1">
              Studio Location
            </span>
            <div className="flex items-start space-x-2.5 text-white/80 text-sm leading-relaxed">
              <MapPin size={20} className="text-[#e7c76a] flex-shrink-0 mt-0.5" />
              <span>
                Sahibzada Sayyed Khubaib Hasan Bukhari AHC, House# 49-A, Meeran Jee City, near Ratta Road, Jhal, Gujranwala, 52250, Pakistan
              </span>
            </div>
            <p className="text-xs text-white/50">
              The premier art shop in Gujranwala for handcrafted pillows, embroidery, and acrylic canvas paintings.
            </p>
          </div>

          {/* Col 4: Direct WhatsApp & Contact */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-semibold text-[#e7c76a] uppercase tracking-widest block mb-1">
              Direct Orders & WhatsApp
            </span>
            <p className="font-poppins text-[15px] text-white/90 leading-[22px]">
              Neelofar Usman Art Studio
              <br />
              Art Heaven Fine Arts
            </p>

            {/* Direct Phone / WhatsApp Number */}
            <a
              href="https://wa.me/923013100089"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 text-[#25D366] hover:text-white transition-colors text-[17px] font-semibold"
            >
              <MessageCircle size={20} className="fill-[#25D366]/20" />
              <span>+92 301 3100089</span>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@artheaven.store"
              className="group flex items-center space-x-2.5 text-white/90 hover:text-[#e7c76a] transition-colors text-[15px]"
            >
              <Mail size={18} className="text-white/60 group-hover:text-[#e7c76a]" />
              <span>contact@artheaven.store</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/art_heaven2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2.5 text-white/90 hover:text-[#e7c76a] transition-colors text-[15px]"
            >
              <Instagram size={18} className="text-pink-400 group-hover:text-[#e7c76a]" />
              <span>@art_heaven2026</span>
            </a>

            {/* Scroll To Top Button */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-[50px] h-[50px] bg-[#e9d580] hover:bg-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 rounded-sm"
                aria-label="Scroll to top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 63 63"
                  fill="none"
                >
                  <path
                    d="M31.5 52.5V10.5M31.5 10.5L47.25 26.25M31.5 10.5L15.75 26.25"
                    stroke="#202020"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[15px] text-white/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 gap-2">
            <span className="font-poppins">© 2026 Art Heaven by Neelofar Usman</span>
            <span className="text-xs text-white/50">
              Art Shop in Gujranwala • Handcrafted Luxury Pillows & Fine Art
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="https://wa.me/923013100089"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#25D366] hover:text-white transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.instagram.com/art_heaven2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-white hover:text-[#e7c76a] transition-transform hover:scale-110"
              aria-label="Instagram"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/instagram.svg"
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>
            <a
              href="#"
              className="p-1 text-white hover:text-[#e7c76a] transition-transform hover:scale-110"
              aria-label="Facebook"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
