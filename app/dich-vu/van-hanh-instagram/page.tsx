'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layout, Code, ChevronRight, Menu, X, ArrowUpRight, CheckCircle2, Award, Phone } from 'lucide-react';

// Import modular sub-components
import HeroSection from '@/components/instagram/HeroSection';
import ProfileSection from '@/components/instagram/ProfileSection';
import GridLayoutSection from '@/components/instagram/GridLayoutSection';
import InteractiveTools from '@/components/instagram/InteractiveTools';
import BusinessSection from '@/components/instagram/BusinessSection';
import TechDeliverables from '@/components/instagram/TechDeliverables';

export default function InstagramServicePage() {
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Smooth scroll helper
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDataGenerated = (data: any) => {
    setGeneratedData(data);
    // Smooth scroll down to interactive preview after generation
    setTimeout(() => {
      const el = document.getElementById('interactive-preview-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-150 selection:text-amber-900 leading-relaxed antialiased">
      
      {/* 1. Header Navigation Bar */}
      

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 w-full bg-white border-b border-stone-200 shadow-xl z-40 md:hidden p-6 space-y-4"
          >
            <div className="flex flex-col gap-4 text-sm font-bold text-stone-700">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-600 py-1 transition border-b border-stone-50">Trang chủ</a>
              <a href="#packages-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-600 py-1 transition border-b border-stone-50">Các Gói Gói Dịch Vụ</a>
              <a href="#tech-handoff-spec" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-600 py-1 transition border-b border-stone-50 flex items-center gap-1">
                <Code className="w-4 h-4 text-amber-500" /> Tài Liệu Bàn Giao
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToForm();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              Liên hệ tư vấn <Phone className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Landing Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1: Hero Visual Brand Studio */}
        <HeroSection onScrollToForm={scrollToForm} />

        {/* Section 2, 3, 4, 5: Definition, Benefits, Signs, AI profile demo */}
        <ProfileSection onDataGenerated={handleDataGenerated} generatedData={generatedData} />

        {/* Anchor scroll helper target */}
        <div id="interactive-preview-anchor" className="h-4"></div>

        {/* Section 6, 7: Visual guidelines, Grid style switcher */}
        <GridLayoutSection />

        {/* Section 8, 9, 10, 11: Reels format, Caption creator, CRO pipeline flowchart, KPI SVG graph */}
        <InteractiveTools />

        {/* Section 12, 13, 14, 15, 16: Slider, Packages, Faq accordion, Related nodes, Contact Form */}
        <BusinessSection formRef={formRef} />

        {/* Special Tech Deliverables Documentation for SEO, Designers, Developers */}
        <TechDeliverables />

      </main>

      {/* Footer System Signature */}
      

      {/* Sticky Mobile CTA Tab for CRO */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 py-3.5 px-4 md:hidden z-40 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Vận hành Instagram</span>
          <span className="text-sm font-serif font-bold text-stone-950 mt-0.5 inline-block">Chỉ từ 5tr/tháng</span>
        </div>
        <button
          onClick={scrollToForm}
          className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer active:scale-95 transition"
        >
          Nhận tư vấn ngay <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
