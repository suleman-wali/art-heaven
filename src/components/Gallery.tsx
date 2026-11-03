'use client';

import React, { useState } from 'react';
import LightboxModal from './LightboxModal';
import { ChevronLeft, ChevronRight, MessageCircle, Check } from 'lucide-react';
import { getWhatsAppArtworkUrl } from '@/utils/whatsapp';

export interface Artwork {
  id: number;
  thumb: string;
  src: string;
  title: string;
  price: string;
  medium: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    thumb: '/images/wa-art-9.jpeg',
    src: '/images/wa-art-9.jpeg',
    title: 'The Ballerina Silhouette Pillow',
    price: 'PKR 8,500',
    medium: 'Handcrafted 3D Tulle, Velvet Bow & Sequin Bodice on Cushion',
  },
  {
    id: 2,
    thumb: '/images/wa-art-6.jpeg',
    src: '/images/wa-art-6.jpeg',
    title: 'Serenade by the Lake',
    price: 'PKR 14,000',
    medium: 'Hand-Embroidered Landscape in Wooden Hoop Frame',
  },
  {
    id: 3,
    thumb: '/images/wa-art-10.jpeg',
    src: '/images/wa-art-10.jpeg',
    title: 'Mosaic Soul',
    price: 'PKR 28,000',
    medium: 'Original Contemporary Monochromatic Acrylic Painting (Signed by Neelo)',
  },
  {
    id: 4,
    thumb: '/images/wa-art-7.jpeg',
    src: '/images/wa-art-7.jpeg',
    title: 'Vintage Floral Bicycle',
    price: 'PKR 9,500',
    medium: 'Hand-Embroidered Botanical Meadow Bike on Linen Fabric',
  },
  {
    id: 5,
    thumb: '/images/wa-art-1.jpeg',
    src: '/images/wa-art-1.jpeg',
    title: 'Wildflower Golden Vines',
    price: 'PKR 6,500',
    medium: 'French Knot & Silk Thread Floral Embroidery on Natural Linen',
  },
  {
    id: 6,
    thumb: '/images/wa-art-12.jpeg',
    src: '/images/wa-art-12.jpeg',
    title: 'Calligraphy on River Stone',
    price: 'PKR 5,500',
    medium: 'Original Hand-Painted Arabic Calligraphy on Polished River Stone',
  },
  {
    id: 7,
    thumb: '/images/wa-art-3.jpeg',
    src: '/images/wa-art-3.jpeg',
    title: 'Pearl Blossom Trio',
    price: 'PKR 7,500',
    medium: 'Silk Ribbon Rosette Embroidery with Pearl Centers on Silk',
  },
  {
    id: 8,
    thumb: '/images/wa-art-5.jpeg',
    src: '/images/wa-art-5.jpeg',
    title: 'Spider Web Rose Garden',
    price: 'PKR 7,800',
    medium: 'Multi-Toned Silk Ribbon Spider Web Roses on Olive-Lime Silk',
  },
  {
    id: 9,
    thumb: '/images/wa-art-2.jpeg',
    src: '/images/wa-art-2.jpeg',
    title: 'Coral Petals Duo',
    price: 'PKR 6,200',
    medium: 'Hand-Folded Silk Ribbon Flowers with Botanical Stem on Fabric',
  },
  {
    id: 10,
    thumb: '/images/wa-art-8.jpeg',
    src: '/images/wa-art-8.jpeg',
    title: 'Meadow Bloom Quartet',
    price: 'PKR 7,200',
    medium: 'Magenta & Amber Silk Ribbon Daisies with French Knots',
  },
  {
    id: 11,
    thumb: '/images/wa-art-11.jpeg',
    src: '/images/wa-art-11.jpeg',
    title: 'Fuchsia Blossom Garland',
    price: 'PKR 6,800',
    medium: 'Silk Ribbon Woven Floral Vines with Pearl Detailing',
  },
  {
    id: 12,
    thumb: '/images/wa-art-13.jpeg',
    src: '/images/wa-art-13.jpeg',
    title: 'Ballerina Gown Pillow (Studio Close-Up)',
    price: 'PKR 8,500',
    medium: 'Bespoke Handcrafted Luxury Cushion by Neelofar Usman',
  },
  {
    id: 13,
    thumb: '/images/wa-art-4.jpeg',
    src: '/images/wa-art-4.jpeg',
    title: '"One Day" Inspirational Stipple Art',
    price: 'PKR 12,500',
    medium: 'Fine Pointillism Pen & Ink Portrait with Calligraphic Lettering',
  },
  {
    id: 14,
    thumb: '/images/wa-art-14.jpeg',
    src: '/images/wa-art-14.jpeg',
    title: 'Heritage Heirloom Baby Set',
    price: 'PKR 4,800',
    medium: 'Handcrafted Crochet & Silk Ribbon Bonnet & Pearl Booties',
  },
];

const ITEMS_PER_PAGE = 9;

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const totalPages = Math.ceil(artworks.length / ITEMS_PER_PAGE);

  // Current page items (1-9 on Page 1, 10-14 on Page 2)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArtworks = artworks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenLightbox = (indexInCurrentPage: number) => {
    setSelectedArtworkIndex(startIndex + indexInCurrentPage);
    setLightboxOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setSelectedArtworkIndex((prev) =>
      prev === 0 ? artworks.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedArtworkIndex((prev) =>
      prev === artworks.length - 1 ? 0 : prev + 1
    );
  };

  const handleWhatsAppBuy = (e: React.MouseEvent, item: Artwork) => {
    e.stopPropagation();

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `Art Heaven - "${item.title}" (${item.price}): ${origin}${item.src}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 3000);
    }

    const url = getWhatsAppArtworkUrl(item.title, item.price, item.medium, item.src);
    window.open(url, '_blank');
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#40472b] pt-[120px] md:pt-[150px] lg:pt-[170px] pb-[80px] md:pb-[100px] lg:pb-[120px]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Title & Info */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#e7c76a] font-inter uppercase tracking-[3px] text-xs font-semibold mb-3 inline-block">
            Art Heaven Collections
          </span>
          <h2 className="font-poppins font-semibold text-[#e7c76a] text-[44px] sm:text-[68px] md:text-[84px] lg:text-[100px] leading-[1.05] tracking-tight mb-4">
            Artwork Gallery
          </h2>
          <p className="font-inter text-white/80 text-[16px] sm:text-[18px] max-w-2xl mx-auto">
            Original handcrafted pillows, acrylic paintings, and embroidery arts by Neelofar Usman. Tap any artwork to zoom or click the WhatsApp button to purchase directly.
          </p>
        </div>

        {/* 3-Column Artworks Grid (9 per page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {currentArtworks.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group flex flex-col bg-[#383e26]/85 rounded-sm overflow-hidden cursor-pointer border border-white/5 hover:border-[#e7c76a]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Image Frame */}
              <div className="relative aspect-[650/740] w-full overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumb}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Price Tag Overlay on Image */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="font-poppins font-bold text-sm sm:text-base text-[#202020] px-4 py-1.5 rounded-full bg-[#e7c76a] shadow-lg">
                    {item.price}
                  </span>
                </div>

                {/* Hover overlay icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3.5 rounded-full bg-white/20 backdrop-blur-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Artwork Info & WhatsApp Buy Button */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3 className="font-poppins font-semibold text-[19px] sm:text-[20px] text-white group-hover:text-[#e7c76a] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-white/65 mt-1 line-clamp-2">
                    {item.medium}
                  </p>
                </div>

                {/* WhatsApp Buy Button under every painting */}
                <div className="pt-2">
                  <button
                    onClick={(e) => handleWhatsAppBuy(e, item)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[15px] font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
                  >
                    <MessageCircle size={18} className="fill-white/20" />
                    <span>
                      {copiedId === item.id ? 'Opening WhatsApp (Link Copied!)' : 'Buy via WhatsApp'}
                    </span>
                    {copiedId === item.id && <Check size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section (9 items on Page 1, items 10+ on Page 2) */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10">
          <p className="text-white/60 text-sm font-inter">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, artworks.length)} of {artworks.length} artworks
          </p>

          <div className="flex items-center space-x-2">
            {/* Prev button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-full border border-white/20 hover:border-[#e7c76a] text-white hover:text-[#e7c76a] disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-11 h-11 rounded-full font-poppins font-semibold text-sm transition-all duration-300 ${
                  currentPage === pageNum
                    ? 'bg-[#e7c76a] text-[#202020] shadow-md scale-105'
                    : 'bg-white/5 border border-white/10 text-white hover:border-[#e7c76a] hover:text-[#e7c76a]'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-full border border-white/20 hover:border-[#e7c76a] text-white hover:text-[#e7c76a] disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Next Page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={selectedArtworkIndex}
        images={artworks}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
