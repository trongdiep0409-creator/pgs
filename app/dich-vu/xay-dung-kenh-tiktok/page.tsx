"use client";

import React, { useState, useEffect } from "react";
import { SECTIONS } from '@/lib/tiktok-data';
import TikTokPreview from '@/components/TikTokPreview';
import TikTokHandoffSpec from '@/components/TikTokHandoffSpec';
import { 
  Sparkles, 
  Layers, 
  FileCode2, 
  ArrowUpRight, 
  Video, 
  ExternalLink, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  Monitor,
  Menu,
  ChevronDown
} from "lucide-react";

export default function Page() {
  // Master Tab state: "preview" (Visual Live Page) vs "handoff" (Technical Spec documentation)
  const [activeTab, setActiveTab] = useState<"preview" | "handoff">("preview");
  
  // Selected Section ID for the Handoff documentation view
  const [selectedSpecId, setSelectedSpecId] = useState<number>(1);
  const activeSpecSection = SECTIONS.find(s => s.id === selectedSpecId) || SECTIONS[0];

  // Helper function to hop from visual preview section directly to its technical spec manual
  const handleHopToSpec = (sectionId: number) => {
    setSelectedSpecId(sectionId);
    setActiveTab("handoff");
    
    // Smooth scroll to the top of the spec editor area
    setTimeout(() => {
      const element = document.getElementById("handoff-content-hub");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Set page scroll restoration or hash handles if needed
  useEffect(() => {
    // Scroll to top on tab change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#FCFBFA] flex flex-col selection:bg-[#D4AF37]/20">
      
      {/* GLOBAL PREMIUM HEADER */}
      

      {/* DYNAMIC VIEW CONTAINER */}
      <main className="flex-1 w-full">
        {activeTab === "preview" ? (
          
          /* VIEW 1: LIVE PREVIEW LAYOUT WITH IN-CONTEXT SPECS JUMP */
          <div className="relative">

            {/* Actual Landing Page Sections */}
            <div className="relative">
              <TikTokPreview />
            </div>

          </div>
        ) : (
          
          /* VIEW 2: MASTER HANDOFF SYSTEM VIEW */
          <div id="handoff-content-hub" className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
            
            {/* Header info Spec */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">
                Cross-Disciplinary Handoff Manual
              </span>
              <h2 className="text-3xl font-display font-medium text-[#1E293B]">
                Tài liệu Đặc tả Bàn giao Liên ngành PGS Agency
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tài liệu này được đồng bộ trực tiếp cho <b>Designer</b> (dựng đồ họa visual 3D), <b>Developer</b> (coding chuyển động và SEO Schema) và <b>Content SEO</b> (thiết lập thẻ tiêu đề, cấu trúc phễu).
              </p>
            </div>

            {/* Spec selector & content layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sidebar Selector List */}
              <div className="lg:col-span-3 space-y-1.5 sticky top-24 z-30 bg-white border border-[#EEDDAB]/30 rounded-2xl p-4 shadow-xs max-h-[75vh] overflow-y-auto">
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase border-b border-slate-100 pb-2 mb-2">
                  Danh mục 16 trang bàn giao
                </span>
                <div className="space-y-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSpecId(s.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedSpecId === s.id
                          ? "bg-[#FCF9F0] text-[#825D1F] border-l-4 border-l-[#C5933A] shadow-xs font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <span className="truncate max-w-[170px]">{s.id}. {s.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${selectedSpecId === s.id ? "text-[#C5933A]" : "text-slate-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Spec content viewer */}
              <div className="lg:col-span-9 space-y-8">
                <TikTokHandoffSpec section={activeSpecSection} />
                
                {/* Meta Summary Global checklist for Page */}
                <div className="bg-[#1E293B] text-slate-300 rounded-2xl p-6 md:p-8 space-y-6 border border-slate-800">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-semibold text-white font-display">Tóm tắt Đặc tả Kỹ thuật Trang Dịch vụ</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-2">
                      <span className="font-mono font-bold text-amber-400 block uppercase">TIÊU TIÊU CHUẨN THIẾT KẾ</span>
                      <ul className="space-y-1 list-disc pl-4 text-slate-400">
                        <li>Phong cách: Light Premium Consulting.</li>
                        <li>Sử dụng khoảng trắng tối giản, tinh sạch.</li>
                        <li>Tránh dính chồng khối, padding lề rộng.</li>
                        <li>Tone vàng gold lấp lánh nhẹ nhàng.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono font-bold text-amber-400 block uppercase">TIÊU TIÊU CHUẨN LẬP TRÌNH</span>
                      <ul className="space-y-1 list-disc pl-4 text-slate-400">
                        <li>Dùng Next.js App Router (React Server).</li>
                        <li>Tích hợp schema Json-Ld tự động.</li>
                        <li>Sử dụng motion mượt, tối ưu hiệu năng.</li>
                        <li>SEO Tags duy nhất thẻ H1.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono font-bold text-amber-400 block uppercase">YÊU CẦU SEO & CONTENT</span>
                      <ul className="space-y-1 list-disc pl-4 text-slate-400">
                        <li>Văn phong EEAT uy tín, minh bạch.</li>
                        <li>Không chèn từ khóa spam vô tổ chức.</li>
                        <li>Giải quyết nỗi đau và dẫn dắt leads.</li>
                        <li>Cam kết chính xác, không dùng mock ảo.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </main>

      {/* FOOTER */}
      

    </div>
  );
}
