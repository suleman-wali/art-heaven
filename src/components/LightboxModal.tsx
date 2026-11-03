'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, Copy, Check } from 'lucide-react';
import { getWhatsAppArtworkUrl } from '@/utils/whatsapp';

interface Artwork {
  id: number;
  thumb: string;
  src: string;
  title: string;
  price: string;
  medium: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  images: Artwork[];
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({
  isOpen,
  onClose,
  currentIndex,
  images,
  onPrev,
  onNext,
}: LightboxProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handleBuyOnWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `Art Heaven - "${currentImage.title}" (${currentImage.price}): ${origin}${currentImage.src}`;
    
    // Copy link
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    // Open WhatsApp
    const url = getWhatsAppArtworkUrl(
      currentImage.title,
      currentImage.price,
      currentImage.medium,
      currentImage.src
    );
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-lightbox"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 text-white/80 hover:text-white transition-colors rounded-full bg-black/50 hover:bg-black/90 border border-white/10"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 z-50 p-3 text-white/80 hover:text-white transition-all rounded-full bg-black/50 hover:bg-[#e7c76a] hover:text-[#202020] border border-white/10"
        aria-label="Previous artwork"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 z-50 p-3 text-white/80 hover:text-white transition-all rounded-full bg-black/50 hover:bg-[#e7c76a] hover:text-[#202020] border border-white/10"
        aria-label="Next artwork"
      >
        <ChevronRight size={32} />
      </button>

      {/* Image container & metadata */}
      <div
        className="relative max-w-5xl max-h-[92vh] w-full h-full flex flex-col items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-auto h-auto max-w-full max-h-[68vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-h-[66vh] max-w-full w-auto h-auto object-contain shadow-2xl rounded-sm"
          />
        </div>

        {/* Artwork details & WhatsApp CTA */}
        <div className="mt-4 text-center flex flex-col items-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h3 className="font-poppins font-semibold text-xl text-white">
              {currentImage.title}
            </h3>
            <span className="text-[#e7c76a] font-poppins font-bold text-lg px-3 py-0.5 rounded-full bg-[#e7c76a]/15 border border-[#e7c76a]/30">
              {currentImage.price}
            </span>
          </div>

          <p className="text-sm text-white/70 font-inter">
            {currentImage.medium} • By Neelofar Usman
          </p>

          {/* WhatsApp Direct Buy Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleBuyOnWhatsApp}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-lg hover:scale-105"
            >
              <MessageCircle size={18} className="fill-white/20" />
              <span>I want this painting (WhatsApp)</span>
            </button>
            {copied && (
              <span className="text-xs text-[#e7c76a] flex items-center space-x-1 animate-pulse">
                <Check size={14} />
                <span>Link Copied!</span>
              </span>
            )}
          </div>

          <p className="text-xs text-white/40 font-mono tracking-wider pt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
