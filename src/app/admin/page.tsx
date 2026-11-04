'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  PlusCircle,
  Trash2,
  ExternalLink,
  MessageCircle,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  LogOut,
  Copy,
  Check,
  Eye,
  Database
} from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { getWhatsAppArtworkUrl } from '@/utils/whatsapp';

export interface GalleryItem {
  id: number | string;
  title: string;
  price: string;
  medium: string;
  src: string;
  thumb: string;
  created_at?: string;
}

const ADMIN_PASSWORD = 'neelofarusman';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Artworks state
  const [artworks, setArtworks] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [medium, setMedium] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Deleting state
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  // Schema modal state
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth session
  useEffect(() => {
    const savedAuth = localStorage.getItem('art_heaven_admin_session');
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true);
      fetchArtworks();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('art_heaven_admin_session', 'authenticated');
      fetchArtworks();
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    localStorage.removeItem('art_heaven_admin_session');
  };

  const fetchArtworks = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from('art_gallery')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        throw error;
      }

      setArtworks(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to connect to Supabase';
      setDbError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePriceInput = (value: string) => {
    let clean = value.trim();
    if (clean && !clean.toUpperCase().startsWith('PKR')) {
      clean = `PKR ${clean}`;
    }
    setPrice(clean);
  };

  const handleAddArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!title.trim()) {
      setFormError('Please enter artwork title');
      return;
    }
    if (!price.trim()) {
      setFormError('Please enter price in PKR');
      return;
    }
    if (!medium.trim()) {
      setFormError('Please enter medium / category');
      return;
    }
    if (!selectedFile) {
      setFormError('Please select an artwork photo to upload');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload image to Supabase Storage bucket 'arts'
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `artwork_${Date.now()}_${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('arts')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}. Make sure bucket "arts" is public.`);
      }

      // 2. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('arts')
        .getPublicUrl(uploadData.path);

      const publicImageUrl = publicUrlData.publicUrl;

      // 3. Insert record into `art_gallery` table
      const formattedPrice = price.toUpperCase().startsWith('PKR') ? price : `PKR ${price}`;

      const { data: insertData, error: insertError } = await supabase
        .from('art_gallery')
        .insert([
          {
            title: title.trim(),
            price: formattedPrice,
            medium: medium.trim(),
            src: publicImageUrl,
            thumb: publicImageUrl,
          },
        ])
        .select();

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      setFormSuccess(`"${title}" has been successfully added to your art gallery!`);
      // Reset form
      setTitle('');
      setPrice('');
      setMedium('');
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Refresh list
      fetchArtworks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while adding artwork';
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArtwork = async (item: GalleryItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.title}" from your gallery?`
    );
    if (!confirmDelete) return;

    setDeletingId(item.id);

    try {
      const { error } = await supabase
        .from('art_gallery')
        .delete()
        .eq('id', item.id);

      if (error) {
        throw error;
      }

      // If file was in Supabase storage bucket 'arts', attempt deletion
      if (item.src && item.src.includes('/arts/')) {
        const parts = item.src.split('/arts/');
        if (parts.length > 1) {
          const filePath = parts[1];
          await supabase.storage.from('arts').remove([filePath]);
        }
      }

      setArtworks((prev) => prev.filter((a) => a.id !== item.id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete artwork';
      alert(`Error deleting: ${msg}`);
    } finally {
      setDeletingId(null);
    }
  };

  const copySqlSchema = () => {
    const sql = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.art_gallery (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    medium TEXT NOT NULL,
    src TEXT NOT NULL,
    thumb TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.art_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view artworks" ON public.art_gallery FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.art_gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON public.art_gallery FOR DELETE USING (true);
CREATE POLICY "Enable update for all users" ON public.art_gallery FOR UPDATE USING (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('arts', 'arts', true) ON CONFLICT (id) DO UPDATE SET public = true;
CREATE POLICY "Public access to arts bucket" ON storage.objects FOR SELECT USING (bucket_id = 'arts');
CREATE POLICY "Public insert to arts bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'arts');
CREATE POLICY "Public delete from arts bucket" ON storage.objects FOR DELETE USING (bucket_id = 'arts');`;

    navigator.clipboard.writeText(sql);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  // If not authenticated, render the Password Protection Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#383e26] flex items-center justify-center p-4 selection:bg-[#e7c76a] selection:text-[#202020]">
        <div className="w-full max-w-md bg-[#40472b] border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative p-1.5 rounded-full bg-white/10 border border-[#e7c76a]/40 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/art-heaven-logo.png"
                alt="Art Heaven Logo"
                className="w-20 h-20 object-contain rounded-full"
              />
            </div>
          </div>

          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-2">
            Art Heaven Admin
          </h1>
          <p className="font-inter text-sm text-white/70 mb-8">
            Studio Gallery Management Portal • Neelofar Usman
          </p>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm flex items-center space-x-2 text-left">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="text-left">
              <label className="block text-xs uppercase font-semibold text-[#e7c76a] tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter access password"
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#e7c76a] focus:ring-2 focus:ring-[#e7c76a]/30 transition-all font-mono"
                />
                <Lock
                  size={18}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#e7c76a] hover:bg-[#ebd281] text-[#202020] font-poppins font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Unlock size={18} />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <Link
              href="/"
              className="hover:text-[#e7c76a] transition-colors flex items-center space-x-1"
            >
              <span>← Back to Website</span>
            </Link>
            <span>Gujranwala, Pakistan</span>
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#383e26] text-white selection:bg-[#e7c76a] selection:text-[#202020]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#40472b]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/art-heaven-logo.png"
              alt="Art Heaven"
              className="w-10 h-10 object-contain rounded-full bg-white/10 p-0.5"
            />
            <div>
              <h1 className="font-poppins font-bold text-lg sm:text-xl text-white tracking-wide flex items-center space-x-2">
                <span>ART HEAVEN</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#e7c76a] text-[#202020]">
                  ADMIN
                </span>
              </h1>
              <p className="text-xs text-white/60">Artwork Management Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setShowSchemaModal(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all border border-white/10"
              title="View Supabase SQL Setup"
            >
              <Database size={14} className="text-[#e7c76a]" />
              <span>SQL Schema</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-medium text-white transition-all border border-white/10"
            >
              <span>View Website</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs sm:text-sm font-medium transition-all border border-red-500/30"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 py-8 sm:py-12 space-y-10">
        {/* Supabase Error Alert / Guide */}
        {dbError && (
          <div className="p-5 bg-amber-500/15 border border-amber-500/40 rounded-xl text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <AlertCircle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-amber-300">
                  Supabase Setup Notice
                </h4>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-0.5">
                  Could not load artworks: <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-100">{dbError}</code>.
                  Make sure you have executed the SQL Schema in Supabase SQL Editor.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSchemaModal(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs sm:text-sm rounded-lg transition-all flex-shrink-0"
            >
              View SQL Schema
            </button>
          </div>
        )}

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#40472b] border border-white/10 rounded-xl p-5 shadow-lg">
            <span className="text-xs text-white/60 uppercase font-semibold tracking-wider">
              Total Artworks
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-poppins font-bold text-3xl sm:text-4xl text-[#e7c76a]">
                {loading ? '...' : artworks.length}
              </span>
              <span className="text-xs text-white/50">Pieces in Gallery</span>
            </div>
          </div>

          <div className="bg-[#40472b] border border-white/10 rounded-xl p-5 shadow-lg">
            <span className="text-xs text-white/60 uppercase font-semibold tracking-wider">
              WhatsApp Integration
            </span>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-poppins font-semibold text-sm sm:text-base text-emerald-400 flex items-center space-x-1.5">
                <MessageCircle size={18} />
                <span>+92 301 3100089</span>
              </span>
              <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-medium">
                Active
              </span>
            </div>
          </div>

          <div className="bg-[#40472b] border border-white/10 rounded-xl p-5 shadow-lg">
            <span className="text-xs text-white/60 uppercase font-semibold tracking-wider">
              Storage Bucket
            </span>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-sm text-white/90">arts (public)</span>
              <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full font-medium">
                Supabase
              </span>
            </div>
          </div>

          <div className="bg-[#40472b] border border-white/10 rounded-xl p-5 shadow-lg">
            <span className="text-xs text-white/60 uppercase font-semibold tracking-wider">
              Studio Location
            </span>
            <div className="mt-2">
              <p className="text-xs text-white/80 line-clamp-2">
                House# 49-A, Meeran Jee City, near Ratta Road, Gujranwala, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Add New Artwork Post Form */}
        <div className="bg-[#40472b] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
            <div className="p-2 rounded-lg bg-[#e7c76a]/20 text-[#e7c76a]">
              <PlusCircle size={22} />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                Add New Artwork
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                Upload a photo, set price in PKR, and publish directly to Art Heaven gallery.
              </p>
            </div>
          </div>

          {formSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-sm flex items-center space-x-2">
              <CheckCircle size={20} className="flex-shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {formError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-200 text-sm flex items-center space-x-2">
              <AlertCircle size={20} className="flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleAddArtwork} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#e7c76a] tracking-wider mb-1.5">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Emerald Embroidered Pillow, Golden Horizon Canvas"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#e7c76a] focus:ring-1 focus:ring-[#e7c76a] transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#e7c76a] tracking-wider mb-1.5">
                      Price in PKR *
                    </label>
                    <input
                      type="text"
                      required
                      value={price}
                      onChange={(e) => handlePriceInput(e.target.value)}
                      placeholder="e.g. PKR 9,500 or 15000"
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#e7c76a] focus:ring-1 focus:ring-[#e7c76a] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#e7c76a] tracking-wider mb-1.5">
                      Medium / Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      placeholder="e.g. Handcrafted Pillow, Acrylic on Canvas"
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#e7c76a] focus:ring-1 focus:ring-[#e7c76a] transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-black/20 rounded-xl border border-white/5 text-xs text-white/70 space-y-1">
                  <p className="flex items-center space-x-1.5 text-[#e7c76a]">
                    <CheckCircle size={14} />
                    <span className="font-semibold">Automatic WhatsApp Link</span>
                  </p>
                  <p>
                    A &quot;Buy via WhatsApp&quot; button will be automatically generated with title, price, and image link for customers to contact +92 301 3100089.
                  </p>
                </div>
              </div>

              {/* Right Column: Image File Upload & Preview */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#e7c76a] tracking-wider mb-1.5">
                    Artwork Photo (Uploaded to &apos;arts&apos; Bucket) *
                  </label>
                  
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[210px] ${
                      previewUrl
                        ? 'border-[#e7c76a] bg-black/40'
                        : 'border-white/20 hover:border-[#e7c76a]/60 bg-black/20 hover:bg-black/30'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {previewUrl ? (
                      <div className="space-y-3 w-full flex flex-col items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg shadow-md border border-[#e7c76a]"
                        />
                        <p className="text-xs text-[#e7c76a] font-medium">
                          Click to change selected photo ({selectedFile?.name})
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 flex flex-col items-center">
                        <div className="p-3 rounded-full bg-white/10 text-[#e7c76a]">
                          <Upload size={24} />
                        </div>
                        <p className="text-sm font-medium text-white">
                          Click to browse or drop artwork image
                        </p>
                        <p className="text-xs text-white/50">
                          Supports JPG, PNG, WEBP, JPEG
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#e7c76a] hover:bg-[#ebd281] disabled:opacity-50 disabled:cursor-not-allowed text-[#202020] font-poppins font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Uploading to Supabase...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle size={18} />
                        <span>Publish Artwork to Gallery</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Section 2: Manage Artworks Table */}
        <div className="bg-[#40472b] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                Gallery Artworks Table ({artworks.length})
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                All live items pulled directly from Supabase <code className="text-[#e7c76a]">art_gallery</code>.
              </p>
            </div>

            <button
              onClick={fetchArtworks}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-medium text-white transition-all self-start sm:self-auto border border-white/10"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Table</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw size={32} className="animate-spin text-[#e7c76a] mx-auto" />
              <p className="text-sm text-white/70">Loading artworks from Supabase...</p>
            </div>
          ) : artworks.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-black/20 rounded-xl border border-dashed border-white/15 p-8">
              <ImageIcon size={40} className="text-white/30 mx-auto" />
              <h3 className="font-poppins font-semibold text-lg text-white">
                No artworks found in database
              </h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                Your <code className="text-[#e7c76a]">art_gallery</code> table in Supabase does not have any records yet. Use the form above to add your first post, or click below to run the SQL seed script.
              </p>
              <button
                onClick={() => setShowSchemaModal(true)}
                className="px-5 py-2.5 rounded-lg bg-[#e7c76a] text-[#202020] font-semibold text-xs transition-all hover:bg-white"
              >
                Copy Initial Seed SQL Script
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-xs uppercase font-semibold text-[#e7c76a] tracking-wider">
                    <th className="pb-3.5 pr-4">Artwork</th>
                    <th className="pb-3.5 px-4">Title</th>
                    <th className="pb-3.5 px-4">Price</th>
                    <th className="pb-3.5 px-4">Medium / Details</th>
                    <th className="pb-3.5 px-4 text-center">WhatsApp Link</th>
                    <th className="pb-3.5 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {artworks.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-white/5 transition-colors"
                    >
                      {/* Thumbnail */}
                      <td className="py-4 pr-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/40 border border-white/15 flex-shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumb || item.src}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-4 font-poppins font-medium text-white">
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-xs text-white/40 mt-0.5">ID: {item.id}</div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-semibold text-[#e7c76a] whitespace-nowrap">
                        {item.price}
                      </td>

                      {/* Medium */}
                      <td className="py-4 px-4 text-xs text-white/80 max-w-xs">
                        <span className="line-clamp-2">{item.medium}</span>
                      </td>

                      {/* WhatsApp Link Preview */}
                      <td className="py-4 px-4 text-center">
                        <a
                          href={getWhatsAppArtworkUrl(item.title, item.price, item.medium, item.src)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium transition-all"
                          title="Test WhatsApp Order Link"
                        >
                          <MessageCircle size={14} />
                          <span>Buy Link</span>
                        </a>
                      </td>

                      {/* Delete Action */}
                      <td className="py-4 pl-4 text-right">
                        <button
                          onClick={() => handleDeleteArtwork(item)}
                          disabled={deletingId === item.id}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-300 transition-all disabled:opacity-50"
                          title="Delete Artwork"
                        >
                          {deletingId === item.id ? (
                            <RefreshCw size={16} className="animate-spin text-red-400" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* SQL Schema Modal */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#40472b] border border-[#e7c76a]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Database className="text-[#e7c76a]" size={22} />
                <h3 className="font-poppins font-bold text-lg text-white">
                  Supabase SQL Setup Script
                </h3>
              </div>
              <button
                onClick={() => setShowSchemaModal(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <p className="text-white/80">
                To set up your database table <code className="text-[#e7c76a]">art_gallery</code> and public bucket <code className="text-[#e7c76a]">arts</code>, run this SQL script in your Supabase project:
              </p>
              <ol className="list-decimal list-inside text-xs text-white/70 space-y-1">
                <li>Go to your Supabase Project Dashboard (<code className="text-white">kcfjzethvavquaubjxjn</code>)</li>
                <li>Click <strong>SQL Editor</strong> in the left sidebar</li>
                <li>Click <strong>New query</strong></li>
                <li>Paste the script below and click <strong>Run</strong></li>
              </ol>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-emerald-300 font-mono overflow-x-auto max-h-64">
{`-- Create table art_gallery
CREATE TABLE IF NOT EXISTS public.art_gallery (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    medium TEXT NOT NULL,
    src TEXT NOT NULL,
    thumb TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.art_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view artworks" ON public.art_gallery FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.art_gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON public.art_gallery FOR DELETE USING (true);

-- Storage bucket 'arts'
INSERT INTO storage.buckets (id, name, public) VALUES ('arts', 'arts', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public access to arts bucket" ON storage.objects FOR SELECT USING (bucket_id = 'arts');
CREATE POLICY "Public insert to arts bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'arts');
CREATE POLICY "Public delete from arts bucket" ON storage.objects FOR DELETE USING (bucket_id = 'arts');`}
                </pre>
                <button
                  onClick={copySqlSchema}
                  className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-[#e7c76a] hover:bg-white text-[#202020] font-semibold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  {copiedSchema ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedSchema ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>

              <p className="text-xs text-white/50">
                A full file with all 14 seed items is also saved at <code className="text-white">supabase_schema.sql</code>.
              </p>
            </div>

            <div className="p-4 bg-black/20 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowSchemaModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
