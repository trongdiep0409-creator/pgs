"use client";

import React, { useState } from "react";
import { TikTokSection } from '@/lib/tiktok-types';
import { 
  Search, 
  Layers, 
  Video, 
  Tag, 
  CheckSquare, 
  FileCode, 
  ExternalLink, 
  Copy, 
  Check 
} from "lucide-react";

interface SpecProps {
  section: TikTokSection;
}

export default function TikTokHandoffSpec({ section }: SpecProps) {
  const [copied, setCopied] = useState(false);
  const { spec } = section;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(spec.schemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={`spec-card-${section.id}`} className="bg-white border border-[#EEDDAB]/40 rounded-2xl shadow-sm p-6 md:p-8 space-y-8 animate-fade-in">
      {/* Header Info */}
      <div className="border-b border-[#EEDDAB]/20 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#C5933A] tracking-widest uppercase font-semibold">
            Section {section.id} / 16 — Specification Handoff
          </span>
          <h3 className="text-xl md:text-2xl font-display font-medium text-[#1E293B] mt-1">
            {section.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            URL Match: <span className="bg-slate-50 px-2 py-0.5 rounded text-rose-500">/dich-vu/dich-vu-xay-kenh-tiktok/#{section.slug}</span>
          </p>
        </div>
        <div className="bg-[#FCF9F0] text-[#A87A2B] border border-[#EEDDAB]/30 text-xs px-3 py-1.5 rounded-full font-medium font-mono">
          Light Premium Theme Standard
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - SEO & Strategic Intent */}
        <div className="space-y-6">
          {/* 1. Search Intent */}
          <div className="bg-[#FCF9F0]/40 p-5 rounded-xl border border-[#EEDDAB]/15">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#825D1F] mb-2 font-display">
              <Search className="w-4 h-4 text-[#C5933A]" />
              1. Search Intent chính (SEO)
            </h4>
            <p className="text-sm text-[#475569] leading-relaxed">
              {spec.searchIntent}
            </p>
          </div>

          {/* 2. Concept UI */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-2 font-display">
              <Layers className="w-4 h-4 text-[#C5933A]" />
              2. Concept UI & Bố cục
            </h4>
            <p className="text-sm text-[#475569] leading-relaxed">
              {spec.conceptUI}
            </p>
          </div>

          {/* 3. Hero 3D */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-2 font-display">
              <Video className="w-4 h-4 text-[#C5933A]" />
              3. Visual & 3D Hero Asset
            </h4>
            <p className="text-sm text-[#475569] leading-relaxed font-medium">
              {spec.hero3D}
            </p>
          </div>

          {/* 4. On-Page Metadata */}
          <div className="bg-[#FCF9F0]/10 p-5 rounded-xl border border-[#EEDDAB]/20 space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-2 font-display">
              <Tag className="w-4 h-4 text-[#C5933A]" />
              4. Cấu trúc SEO Tag On-Page
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono font-bold text-[#825D1F] block mb-1">Meta Title:</span>
                <span className="bg-slate-50 block p-2 rounded text-slate-700 select-all border border-slate-100">
                  {spec.metaTitle}
                </span>
              </div>
              <div>
                <span className="font-mono font-bold text-[#825D1F] block mb-1">Meta Description:</span>
                <span className="bg-slate-50 block p-2 rounded text-slate-700 select-all border border-slate-100 leading-relaxed">
                  {spec.metaDescription}
                </span>
              </div>
              <div>
                <span className="font-mono font-bold text-[#825D1F] block mb-1">Thẻ H1 (Duy nhất):</span>
                <span className="bg-slate-50 block p-2 rounded text-slate-700 select-all border border-slate-100">
                  {spec.h1}
                </span>
              </div>
              <div>
                <span className="font-mono font-bold text-[#825D1F] block mb-1">Thẻ H2/H3 chính:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 font-sans">
                  {spec.h2AndH3.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hand-off Checklists & Schema */}
        <div className="space-y-6">
          {/* Checklists */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-2 font-display">
              <CheckSquare className="w-4 h-4 text-[#C5933A]" />
              5. Quy trình bàn giao liên ngành
            </h4>

            {/* Designer Checklist */}
            <div className="border border-[#EEDDAB]/20 rounded-xl p-4 bg-white">
              <span className="text-xs font-mono font-bold text-[#C5933A] block mb-2 uppercase">
                🎨 Designer Checklist
              </span>
              <ul className="space-y-2 text-xs text-[#475569]">
                {spec.checklistDesigner.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5933A] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Checklist */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-mono font-bold text-slate-600 block mb-2 uppercase">
                💻 Developer Checklist
              </span>
              <ul className="space-y-2 text-xs text-[#475569]">
                {spec.checklistDeveloper.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5933A] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content SEO Checklist */}
            <div className="border border-[#EEDDAB]/20 rounded-xl p-4 bg-[#FCF9F0]/20">
              <span className="text-xs font-mono font-bold text-[#825D1F] block mb-2 uppercase">
                ✍️ Content SEO Checklist
              </span>
              <ul className="space-y-2 text-xs text-[#475569]">
                {spec.checklistContentSEO.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5933A] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links map */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase mb-1">
                Internal Links Đi
              </span>
              <div className="flex flex-wrap gap-1">
                {spec.internalLinkOut.map((link, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded font-mono">
                    {link}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase mb-1">
                Internal Links Nhận
              </span>
              <div className="flex flex-wrap gap-1">
                {spec.internalLinkIn.map((link, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded font-mono">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Schema đề xuất */}
          <div className="bg-slate-900 text-slate-300 rounded-xl p-4 font-mono text-xs relative group overflow-hidden">
            <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-3">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <FileCode className="w-3.5 h-3.5 text-[#C5933A]" />
                6. JSON-LD Schema Code
              </span>
              <button 
                onClick={handleCopySchema}
                className="hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="max-h-48 overflow-y-auto leading-normal text-slate-300 font-mono scrollbar-thin select-all">
              {spec.schemaCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
