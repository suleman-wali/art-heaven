'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu, MessageCircle } from 'lucide-react';
import { getWhatsAppCustomOrderUrl } from '@/utils/whatsapp';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#intro' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'The Artist', href: '#artists' },
    { name: 'What I Do', href: '#what-i-do' },
  ];

  const handleCustomOrder = () => {
    window.open(getWhatsAppCustomOrderUrl('Custom Painting or Pillow Craft'), '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#40472b]/95 backdrop-blur-md py-3 shadow-lg'
            : 'bg-[#40472b] py-6 lg:py-8'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link href="#home" className="flex items-center space-x-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/art-heaven-logo.png"
                alt="Art Heaven Logo"
                className={`w-auto object-contain transition-all duration-300 rounded-full bg-white/10 p-0.5 shadow-sm group-hover:scale-105 ${
                  isScrolled ? 'h-11 md:h-12' : 'h-14 md:h-16'
                }`}
              />
              <span className="font-poppins font-bold text-[19px] md:text-[22px] tracking-wider text-white group-hover:text-[#e7c76a] transition-colors">
                ART HEAVEN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#e7c76a] font-medium text-[16px] tracking-wide transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: WhatsApp Custom Order Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={handleCustomOrder}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-[15px] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <MessageCircle size={18} className="fill-white/20" />
              <span>Custom Order</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={handleCustomOrder}
              className="inline-flex sm:hidden p-2 bg-[#25D366] text-white rounded-full"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-[300px] sm:w-[360px] bg-[#383e26] text-white p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-white/10">
              <div className="flex items-center space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/art-heaven-logo.png" alt="Art Heaven" className="h-10 w-10 rounded-full object-contain" />
                <span className="font-poppins font-bold text-lg text-white">ART HEAVEN</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-medium text-white hover:text-[#e7c76a] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleCustomOrder();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#25D366] text-white font-semibold text-[16px] rounded-full hover:bg-[#20ba5a] transition-all shadow-md"
            >
              <MessageCircle size={20} />
              <span>Custom Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
