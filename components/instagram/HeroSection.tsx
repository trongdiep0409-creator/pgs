'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, MessageCircle, Play, Bookmark, Instagram } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
}

export default function HeroSection({ onScrollToForm }: HeroProps) {
  // Floating Card hover motion
  const floatAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const slowFloat = {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-stone-50 overflow-hidden pt-24 pb-16">
      
      {/* Background elegant line decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
          <path d="M0,70 Q30,50 60,70 T100,70" fill="none" stroke="#D4AF37" strokeWidth="0.08" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Strategy Message */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" /> 
              Visual Brand Studio
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-tight font-medium tracking-tight">
              Dịch vụ vận hành Instagram giúp thương hiệu xây dựng hình ảnh <span className="relative inline-block">
                <span className="relative z-10">chuyên nghiệp</span>
                <span className="absolute left-0 bottom-1 w-full h-2.5 bg-amber-200/50 -z-10 rounded"></span>
              </span>, đồng bộ và hỗ trợ marketing
            </h1>

            <p className="text-stone-600 text-base md:text-lg font-sans max-w-xl leading-relaxed">
              Vượt qua lối mòn đăng bài rời rạc. PGS Agency đồng hành cùng doanh nghiệp xây dựng hệ thống tăng trưởng trên Instagram bằng thiết kế Grid 3x3 sang trọng, kịch bản Reels chất lượng cao, tối ưu hóa Hashtag chuẩn và Bio định vị thương hiệu mạnh mẽ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onScrollToForm}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 text-center flex items-center justify-center gap-2 transform active:scale-95"
              >
                Nhận tư vấn vận hành Instagram <Sparkles className="w-4 h-4" />
              </button>
              <a
                href="#packages-section"
                className="px-8 py-4 rounded-xl bg-white border border-amber-500/30 hover:border-amber-500 text-stone-900 font-semibold transition-all duration-300 text-center flex items-center justify-center hover:bg-stone-50 transform active:scale-95"
              >
                Xem các gói dịch vụ
              </a>
            </div>

            {/* Micro stats tag */}
            <div className="pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-xl md:text-2xl font-serif font-bold text-stone-950">100%</p>
                <p className="text-xs text-stone-500">Đồng bộ Brand Guidelines</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-serif font-bold text-stone-950">3X</p>
                <p className="text-xs text-stone-500">Tỷ lệ tương tác tự nhiên</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-serif font-bold text-stone-950">24/7</p>
                <p className="text-xs text-stone-500">Quản lý & Giám sát kênh</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual Grid 3D mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient gold glow */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-200/20 blur-3xl -z-10"></div>

            {/* Main Phone/Mockup Container */}
            <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-white rounded-[40px] shadow-2xl border-8 border-stone-900 p-3 overflow-hidden flex flex-col">
              
              {/* Phone Speaker & Camera notches */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
                <div className="w-12 h-1 bg-stone-800 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-stone-800 rounded-full"></div>
              </div>

              {/* Instagram App Top Nav */}
              <div className="flex items-center justify-between px-2 pt-6 pb-2 border-b border-stone-100 z-10">
                <span className="font-serif font-bold text-base text-stone-900 tracking-tight flex items-center gap-1">
                  <Instagram className="w-4 h-4 text-amber-500" /> pgs_agency
                </span>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                </div>
              </div>

              {/* Instagram Profile Meta */}
              <div className="px-3 py-3 flex items-center gap-4 border-b border-stone-50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white font-serif font-bold text-amber-600 text-lg">
                    PGS
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="font-bold text-stone-900 text-xs md:text-sm">18</p>
                      <p className="text-[9px] text-stone-500">Bài viết</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-xs md:text-sm">3.4K</p>
                      <p className="text-[9px] text-stone-500">Follower</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-xs md:text-sm">125</p>
                      <p className="text-[9px] text-stone-500">Đang theo dõi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Bio */}
              <div className="px-3 py-2 text-[10px] space-y-1 text-stone-800 border-b border-stone-100">
                <p className="font-bold">PGS Agency | Marketing Tổng Thể</p>
                <p className="text-stone-500 font-sans">⚜️ Xây dựng hệ thống tăng trưởng số</p>
                <p className="text-stone-500 font-sans">📈 Tối ưu chuyển đổi - Tăng lead bứt phá</p>
                <p className="text-amber-600 font-medium font-mono cursor-pointer hover:underline">linktr.ee/pgsagency_gold</p>
              </div>

              {/* Highlights Section */}
              <div className="px-3 py-2 flex gap-3 border-b border-stone-50 overflow-x-auto scrollbar-none">
                {['Dự án', 'Dịch vụ', 'Đội ngũ', 'Báo cáo'].map((hl, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full border border-amber-300 p-[1.5px] mb-1">
                      <div className="w-full h-full rounded-full bg-stone-100 border border-white flex items-center justify-center font-serif text-[8px] font-bold text-stone-600 uppercase">
                        {hl[0]}
                      </div>
                    </div>
                    <span className="text-[8px] text-stone-500">{hl}</span>
                  </div>
                ))}
              </div>

              {/* Grid 3x3 of Feed - Visual Art Grid style */}
              <div className="flex-1 bg-stone-50 p-1.5 grid grid-cols-3 gap-1 overflow-y-auto scrollbar-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                  const colors = [
                    'bg-amber-100/60 border-amber-200',
                    'bg-stone-100 border-stone-200',
                    'bg-amber-50 border-amber-200/50',
                    'bg-stone-200/40 border-stone-300',
                    'bg-amber-100/40 border-amber-200/80',
                    'bg-stone-50 border-stone-150',
                    'bg-stone-100/80 border-stone-200',
                    'bg-amber-50/70 border-amber-200/30',
                    'bg-stone-200/30 border-stone-250',
                  ];
                  return (
                    <div
                      key={item}
                      className={`aspect-square rounded border relative flex flex-col justify-between p-1 overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-md ${colors[item - 1]}`}
                    >
                      {/* Grid Item Header status bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] font-mono text-amber-800 tracking-tighter uppercase font-semibold">Post {item}</span>
                        {item % 3 === 0 ? (
                          <Play className="w-2.5 h-2.5 text-amber-600 fill-amber-500/20" />
                        ) : item % 2 === 0 ? (
                          <Heart className="w-2.5 h-2.5 text-stone-400" />
                        ) : (
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                        )}
                      </div>

                      {/* Geometric grid design symbol representing lifestyle branding */}
                      <div className="my-auto flex flex-col items-center justify-center">
                        <div className="w-5 h-5 rounded-full border border-amber-500/30 flex items-center justify-center relative">
                          <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-amber-500/10 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[7px] text-stone-600 mt-1 scale-90 font-serif font-medium truncate w-full text-center px-1">
                          {item === 1 && "Brand Story"}
                          {item === 2 && "Growth Tips"}
                          {item === 3 && "Reels #1"}
                          {item === 4 && "USP Slide"}
                          {item === 5 && "Case Study"}
                          {item === 6 && "Reels #2"}
                          {item === 7 && "Team Grid"}
                          {item === 8 && "Checklist"}
                          {item === 9 && "Viral Idea"}
                        </span>
                      </div>

                      {/* Footer micro actions */}
                      <div className="flex justify-between items-center text-[7px] text-stone-400 mt-auto pt-1 border-t border-stone-200/30">
                        <span className="flex items-center gap-0.5"><Heart className="w-1.5 h-1.5" /> {item * 15}</span>
                        <span className="flex items-center gap-0.5"><Bookmark className="w-1.5 h-1.5" /></span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Floating Glassmorphism Cards around Phone */}
            <motion.div
              animate={floatAnimation}
              className="absolute -left-10 top-16 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200/60 shadow-xl max-w-[150px] z-10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-lg bg-amber-100 text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-serif text-[11px] font-bold text-stone-900">Reels Hub</span>
              </div>
              <p className="text-[9px] text-stone-500 leading-normal">Lên kịch bản, quay dựng, lồng âm thanh xu hướng chuẩn định dạng.</p>
            </motion.div>

            <motion.div
              animate={slowFloat}
              className="absolute -right-8 bottom-16 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200/60 shadow-xl max-w-[160px] z-10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-lg bg-amber-100 text-amber-700">
                  <Play className="w-4 h-4" />
                </div>
                <span className="font-serif text-[11px] font-bold text-stone-900">9-Grid Layout</span>
              </div>
              <p className="text-[9px] text-stone-500 leading-normal">Cơ chế quy hoạch Checkerboard, Row by Topic đồng bộ màu thương hiệu.</p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
