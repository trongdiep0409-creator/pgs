'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Shield, 
  Database, 
  Search, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  FileText, 
  FileSpreadsheet, 
  Layers, 
  Lock, 
  Settings, 
  HelpCircle, 
  Send, 
  Smartphone, 
  Check, 
  Minus, 
  RefreshCw, 
  Play, 
  Flame, 
  TrendingUp, 
  UserCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const SCHEMA_ORG_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dịch vụ Chăm sóc Website Chuyên nghiệp - PGS Agency",
  "description": "Website Care OS là hệ điều hành chăm sóc, tối ưu SEO, bảo mật, bảo trì và theo dõi chuyển đổi cho website của PGS Agency.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "PGS Agency",
    "image": "https://picsum.photos/seed/pgs_logo/800/600",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hồ Chí Minh",
      "addressCountry": "VN"
    }
  },
  "areaServed": "VN",
  "serviceType": "Website Care, SEO Maintenance, Speed Optimization, Website Security"
};

const SAMPLE_PROJECT = {
  name: "Nội Thất Cao Cấp Royal Villa",
  field: "Kiến trúc & Nội thất Luxury",
  before: {
    speed: "42/100",
    index: "310 trang",
    leads: "12 leads/tháng",
    security: "Không cài SSL, dính mã độc chuyển hướng",
    content: "Lâu ngày không cập nhật, lỗi font, link gãy 404"
  },
  after: {
    speed: "96/100",
    index: "1,250 trang (phủ Google Search)",
    leads: "85 leads/tháng (Tăng 708%)",
    security: "Bảo mật đa lớp, Backup cloud tự động",
    content: "Cập nhật 15 bài chuẩn SEO/tháng, tối ưu giỏ hàng & CRO"
  }
};

const DETAILED_PACKAGES = [
  {
    id: "basic",
    name: "Website Care Basic",
    desc: "Phù hợp cho doanh nghiệp nhỏ cần giữ website sống ổn định, bảo mật và cập nhật cơ bản định kỳ.",
    price: "2,500,000",
    period: "tháng",
    features: [
      "Quét lỗi hệ thống & bảo trì hàng tuần",
      "Backup dữ liệu tự động (2 lần/tháng)",
      "Cập nhật nội dung cơ bản (4 bài viết/tháng)",
      "Báo cáo hiệu suất định kỳ hàng tháng",
      "Tối ưu tốc độ tải trang cơ bản",
      "Cài đặt SSL & cấu hình bảo mật tiêu chuẩn",
      "Thời gian phản hồi hỗ trợ kỹ thuật: 24h"
    ],
    recommended: false
  },
  {
    id: "seo",
    name: "Website SEO Care",
    desc: "Giải pháp tối ưu cho doanh nghiệp muốn tăng trưởng traffic từ Google Search và phủ từ khóa bền vững.",
    price: "4,500,000",
    period: "tháng",
    features: [
      "Tất cả tính năng gói Website Care Basic",
      "Sản xuất & Đăng bài chuẩn SEO (12 bài viết/tháng)",
      "Audit & Tối ưu SEO On-page (Meta, Title, Alt ảnh...)",
      "Index & Xử lý lỗi Google Search Console hàng tuần",
      "Thiết lập Schema Markup, sitemap chuẩn AI Search",
      "Backup dữ liệu tự động hàng tuần (Cloud riêng biệt)",
      "Thời gian phản hồi hỗ trợ kỹ thuật: <8h"
    ],
    recommended: true
  },
  {
    id: "growth",
    name: "Website Growth Care",
    desc: "Hệ điều hành tăng trưởng toàn diện. Tích hợp tracking hành vi, tối ưu chuyển đổi CRO để gia tăng lead tối đa.",
    price: "8,500,000",
    period: "tháng",
    features: [
      "Tất cả tính năng gói Website SEO Care",
      "Sản xuất & Đăng bài chuẩn SEO (20 bài viết/tháng)",
      "Cài đặt Tracking nâng cao (Google Analytics 4, GTM)",
      "Đo lường chi tiết hành vi click Zalo, Call, Form",
      "Đề xuất cải tiến UI/UX & Tối ưu chuyển đổi (CRO)",
      "Xây dựng Landing Page tặng kèm (1 trang/tháng)",
      "Thời gian phản hồi hỗ trợ kỹ thuật: <2h (Hotline riêng)"
    ],
    recommended: false
  }
];

export default function WebsiteCarePage() {
  // --- STATE MANAGEMENT ---
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Hero Mockup Interactive State
  const [heroTab, setHeroTab] = useState<'overall' | 'speed' | 'security' | 'seo'>('overall');
  const [heroScanning, setHeroScanning] = useState(false);
  const [heroScore, setHeroScore] = useState(98);
  const [heroTilt, setHeroTilt] = useState<React.CSSProperties>({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });

  // Trigger local rescan simulation for the hero gauge
  const triggerHeroScan = () => {
    if (heroScanning) return;
    setHeroScanning(true);
    
    const duration = 1200; // 1.2s scan
    const intervalTime = 60;
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += intervalTime;
      // Randomize display score while scanning
      setHeroScore(Math.floor(Math.random() * 40) + 50); // 50 to 90
      
      if (elapsed >= duration) {
        clearInterval(interval);
        setHeroScanning(false);
        // Settle on target score based on current tab
        setHeroTab(currentTab => {
          if (currentTab === 'overall') setHeroScore(98);
          else if (currentTab === 'speed') setHeroScore(96);
          else if (currentTab === 'security') setHeroScore(100);
          else if (currentTab === 'seo') setHeroScore(95);
          return currentTab;
        });
      }
    }, intervalTime);
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Limit rotation to maximum 8 degrees
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;
    setHeroTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };
  
  // Health Checker Tool State
  const [targetUrl, setTargetUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  // Calculator Tool State
  const [calcInputs, setCalcInputs] = useState({
    articles: 8,
    speedOptimize: true,
    securityHardening: true,
    trackingSetup: false,
    backupFrequency: 'weekly' // biweekly, weekly, daily
  });

  // Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    url: '',
    package: 'seo',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // --- HEALTH CHECK ANIMATION STEPS ---
  const analysisSteps = [
    "Đang kết nối tới tên miền...",
    "Kiểm tra chứng chỉ bảo mật SSL/HTTPS...",
    "Đo lường Core Web Vitals & tốc độ di động...",
    "Quét mã độc và lỗ hổng bảo mật nền tảng...",
    "Kiểm tra file robots.txt & Sitemap...",
    "Phân tích lỗi gãy liên kết (Broken links 404)...",
    "Đánh giá cấu trúc thẻ Heading (H1, H2, H3)...",
    "Kiểm tra form liên hệ và tracking nút bấm...",
    "Tổng hợp dữ liệu và xuất điểm sức khỏe..."
  ];

  // Trigger analysis simulation
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;
    
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisResults(null);

    // Simulate steps in sequence
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < analysisSteps.length) {
        setAnalysisStep(currentStep);
      } else {
        clearInterval(interval);
        // Completed
        setIsAnalyzing(false);
        setAnalysisResults({
          url: targetUrl.replace(/^(https?:\/\/)?(www\.)?/, ''),
          scoreBefore: Math.floor(Math.random() * 20) + 35, // 35 - 55
          scoreAfter: 98,
          issues: [
            { id: 1, title: "Tốc độ tải trang di động kém (3.8s)", desc: "Điểm Google PageSpeed cực thấp do tài nguyên JS phình to và ảnh chưa nén.", severity: "high" },
            { id: 2, title: "Form liên hệ bị rò rỉ dữ liệu / không có tracking", desc: "Không đo lường được bao nhiêu người đã điền form, dễ bị spam bot.", severity: "high" },
            { id: 3, title: "Thiếu Schema Markup chuẩn AI Search", desc: "Không có cấu trúc Schema định nghĩa dịch vụ, làm giảm khả năng lên top của AI Search như Gemini, Perplexity.", severity: "medium" },
            { id: 4, title: "12 liên kết nội bộ bị gãy (404 Error)", desc: "Gây thất thoát sức mạnh SEO và mang lại trải nghiệm tệ cho người dùng.", severity: "medium" },
            { id: 5, title: "Chưa cài đặt auto-backup cách ly", desc: "Nếu website bị nhà mạng khóa hoặc bị mã độc tấn công, dữ liệu có nguy cơ mất trắng hoàn toàn.", severity: "high" }
          ]
        });
        // Auto fill form url
        setLeadForm(prev => ({ ...prev, url: targetUrl }));
      }
    }, 450);
  };

  // Live Calculator Logic (Calculated synchronously during render to avoid useEffect state cascading renders)
  let calcPrice = 1500000; // Base rate for basic administration
  calcPrice += calcInputs.articles * 200000; // 200k per SEO article
  if (calcInputs.speedOptimize) calcPrice += 500000;
  if (calcInputs.securityHardening) calcPrice += 500000;
  if (calcInputs.trackingSetup) calcPrice += 700000;
  
  if (calcInputs.backupFrequency === 'weekly') calcPrice += 300000;
  if (calcInputs.backupFrequency === 'daily') calcPrice += 800000;

  // Form submission simulator
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    
    // Simulate API Post
    setFormSubmitted(true);
    setTimeout(() => {
      // Clear form after display success
    }, 5000);
  };

  // Toggle gold check lists
  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-screen text-[#1A1A1A] bg-[#FAF9F6] selection:bg-[#C5A880]/20 font-sans">
      
      {/* HEADER / NAVIGATION LINE */}
      

      {/* ----------------- SECTION 1: HERO WEBSITE CARE OS ----------------- */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 border-b border-[#C5A880]/15 bg-gradient-to-b from-[#FAF9F6] to-[#F5F4EE]">
        {/* Abstract golden lines background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,200 C300,100 600,450 1200,250 C1800,50 2000,300 2400,200" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M-50,250 C400,180 800,380 1400,290" fill="none" stroke="#C5A880" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#B3966D] font-mono text-[11px] uppercase tracking-wider">
                <Sparkles size={12} />
                <span>Hệ điều hành Chăm Sóc Website toàn diện</span>
              </div>
              
              <h1 id="main-h1" className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-black tracking-tight">
                Dịch vụ <span className="font-semibold text-gold-gradient italic">Chăm sóc Website</span> giúp website luôn ổn định, chuẩn SEO và tối ưu chuyển đổi vượt trội.
              </h1>
              
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-sans">
                Đừng để website chết lâm sàng. PGS Agency bảo vệ, cập nhật nội dung, tăng tốc độ di động, bảo mật và cấu hình hệ thống tracking dữ liệu giúp biến website thành cỗ máy sinh Lead tự động.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a 
                  href="#health-checker-tool" 
                  className="px-8 py-4 rounded-full bg-black text-[#C5A880] hover:bg-zinc-900 transition-all duration-300 font-semibold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg"
                >
                  <span>Chạy Thử Health Check</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#pricing" 
                  className="px-8 py-4 rounded-full bg-transparent text-black border border-[#C5A880] hover:bg-[#C5A880]/5 transition-all duration-300 font-semibold text-center text-sm tracking-wider"
                >
                  Xem Bảng Giá Gói
                </a>
              </div>

              {/* Minimal Trust Indicator */}
              <div className="pt-8 border-t border-premium grid grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <div className="text-3xl font-display font-semibold text-black">98<span className="text-[#C5A880]">%</span></div>
                  <div className="text-xs text-gray-500 font-mono mt-1">Cam Kết Uptime & Bảo Mật</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-semibold text-black">1.8<span className="text-[#C5A880]">s</span></div>
                  <div className="text-xs text-gray-500 font-mono mt-1">Tốc Độ Tải Di Động Tối Ưu</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-semibold text-black">7.5x</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">Tăng Trưởng Conversion Lead</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero 3D Health Gauge Visual Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center gap-5 w-full max-w-[420px]">
              {/* Tab Tương Tác */}
              <div className="w-full bg-white border border-[#C5A880]/20 p-1 rounded-2xl flex justify-between gap-1 shadow-sm relative z-20">
                {(['overall', 'speed', 'security', 'seo'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (heroScanning) return;
                      setHeroTab(tab);
                      if (tab === 'overall') setHeroScore(98);
                      else if (tab === 'speed') setHeroScore(96);
                      else if (tab === 'security') setHeroScore(100);
                      else if (tab === 'seo') setHeroScore(95);
                    }}
                    disabled={heroScanning}
                    className={`flex-1 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 ${
                      heroTab === tab
                        ? 'bg-black text-[#C5A880] shadow'
                        : 'text-zinc-500 hover:text-black hover:bg-[#FAF9F6]'
                    }`}
                  >
                    {tab === 'overall' && 'Tổng Thể'}
                    {tab === 'speed' && 'Tốc Độ'}
                    {tab === 'security' && 'Bảo Mật'}
                    {tab === 'seo' && 'SEO'}
                  </button>
                ))}
              </div>

              {/* Card 3D Gauge */}
              <div 
                style={heroTilt}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                onClick={triggerHeroScan}
                className="relative w-full aspect-square rounded-3xl bg-white border border-[#C5A880]/20 p-6 shadow-premium hover:shadow-premium-hover transition-all duration-500 overflow-hidden group select-none cursor-pointer"
                title="Nhấn vào card để giả lập chạy quét sức khỏe"
              >
                {/* Scanning sweep effect */}
                {heroScanning && (
                  <motion.div 
                    initial={{ y: '-100%' }}
                    animate={{ y: '250%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 right-0 h-[120px] bg-gradient-to-b from-transparent via-[#C5A880]/15 to-transparent pointer-events-none border-y border-[#C5A880]/25 z-20"
                  />
                )}

                {/* Visual Glow */}
                <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                  heroTab === 'overall' ? 'bg-[#C5A880]/10 group-hover:bg-[#C5A880]/15' :
                  heroTab === 'speed' ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' :
                  heroTab === 'security' ? 'bg-cyan-500/5 group-hover:bg-cyan-500/10' :
                  'bg-amber-500/5 group-hover:bg-amber-500/10'
                }`} />
                
                <div className="h-full flex flex-col justify-between relative z-10">
                  {/* Gauge Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-premium">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full animate-pulse ${heroScanning ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span className="font-mono text-[10px] text-gray-500 tracking-wider uppercase">
                        {heroScanning ? 'STATUS: SCANNING SYSTEN...' : `WEBSITE CARE OS: ${heroTab}`}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHeroScan();
                      }}
                      disabled={heroScanning}
                      className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-[10px] font-mono text-zinc-600 font-semibold border border-zinc-200 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw size={10} className={heroScanning ? "animate-spin" : ""} />
                      <span>{heroScanning ? 'Scanning' : 'Rescan'}</span>
                    </button>
                  </div>

                  {/* Main Rotating Circle Health Score Gauge */}
                  <div className="my-auto py-6 flex flex-col items-center justify-center">
                    <div className="relative h-44 w-44 flex items-center justify-center">
                      {/* Outer circular indicator trail */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="88" cy="88" r="76" fill="transparent" stroke="#F4F4F1" strokeWidth="10" />
                        <motion.circle 
                          cx="88" 
                          cy="88" 
                          r="76" 
                          fill="transparent" 
                          stroke={
                            heroTab === 'overall' ? "#C5A880" :
                            heroTab === 'speed' ? "#10B981" :
                            heroTab === 'security' ? "#06B6D4" :
                            "#F59E0B"
                          }
                          strokeWidth="10" 
                          strokeDasharray="477"
                          animate={{ strokeDashoffset: 477 - (477 * (heroScore / 100)) }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Counter Text inside */}
                      <div className="text-center">
                        <span className="text-5xl font-display font-semibold text-black block leading-none">
                          {heroScore}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold tracking-widest uppercase block mt-1.5 transition-colors duration-300 ${
                          heroTab === 'overall' ? 'text-[#B3966D]' :
                          heroTab === 'speed' ? 'text-emerald-600' :
                          heroTab === 'security' ? 'text-cyan-600' :
                          'text-amber-600'
                        }`}>
                          {heroScanning ? 'ANALYZING...' : 
                           heroTab === 'overall' ? 'EXCELLENT' :
                           heroTab === 'speed' ? 'ULTRA FAST' :
                           heroTab === 'security' ? 'SECURED' :
                           'SEO READY'}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[11px] text-gray-500 mt-4 text-center font-sans px-2 min-h-[32px] flex items-center justify-center transition-all duration-300">
                      {heroScanning ? 'Đang phân tích sâu mã nguồn và phản hồi máy chủ...' :
                       heroTab === 'overall' ? 'Điểm tối ưu sức khỏe tổng thể của website PGS quản trị' :
                       heroTab === 'speed' ? 'Tốc độ tải trang di động tối ưu vượt trội dưới 1.8s' :
                       heroTab === 'security' ? 'Hệ thống bảo mật đa tầng, tự động quét mã độc định kỳ' :
                       'Cấu trúc chuẩn SEO nâng cao, sẵn sàng phục vụ tìm kiếm AI'}
                    </span>
                  </div>

                  {/* Operational floating board cards 3D feel */}
                  <div className="space-y-2 pt-4 border-t border-premium">
                    {heroTab === 'overall' && (
                      <>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Zap size={14} className="text-[#C5A880]" />
                            PageSpeed Mobile Score
                          </span>
                          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">96+</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Shield size={14} className="text-[#C5A880]" />
                            Auto Cloud Backup
                          </span>
                          <span className="font-mono text-gray-500">Hàng Tuần (Active)</span>
                        </div>
                      </>
                    )}

                    {heroTab === 'speed' && (
                      <>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Zap size={14} className="text-emerald-500" />
                            First Contentful Paint
                          </span>
                          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">0.8s (Tốt)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Zap size={14} className="text-emerald-500" />
                            Time to Interactive
                          </span>
                          <span className="font-mono text-gray-500">1.2s</span>
                        </div>
                      </>
                    )}

                    {heroTab === 'security' && (
                      <>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Shield size={14} className="text-cyan-500" />
                            SSL Certificate
                          </span>
                          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Hợp lệ (HTTPS)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Shield size={14} className="text-cyan-500" />
                            DDoS Firewall WAF
                          </span>
                          <span className="font-mono text-gray-500">Kích hoạt</span>
                        </div>
                      </>
                    )}

                    {heroTab === 'seo' && (
                      <>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Search size={14} className="text-amber-500" />
                            Schema AI Search
                          </span>
                          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Đầy đủ (Valid)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-700 bg-[#FAF9F6] p-2.5 rounded-xl border border-premium">
                          <span className="flex items-center gap-2 font-medium">
                            <Search size={14} className="text-amber-500" />
                            Sitemap.xml
                          </span>
                          <span className="font-mono text-gray-500">Đã index</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: CHĂM SÓC WEBSITE LÀ GÌ? ----------------- */}
      <section id="definition" className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">ĐỊNH NGHĨA DỊCH VỤ</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Chăm Sóc Website Là Gì?</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-sans">
              Dịch vụ chăm sóc website là giải pháp quản lý, cập nhật, tối ưu kỹ thuật và giám sát hiệu suất website một cách định kỳ và có hệ thống. Nó giải phóng chủ doanh nghiệp khỏi áp lực vận hành công nghệ để tập trung vào kinh doanh cốt lõi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-premium shadow-premium hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-black text-[#C5A880] flex items-center justify-center mb-6">
                <Settings size={22} />
              </div>
              <h4 className="font-display text-xl font-semibold mb-3 text-black">Vận Hành & Bảo Trì</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kiểm tra lỗi định kỳ, xử lý plugin/theme xung đột, sửa các liên kết gãy, và tối ưu hệ thống database giúp website vận hành trơn tru 24/7/365.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-premium shadow-premium hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-[#C5A880] text-black flex items-center justify-center mb-6">
                <FileText size={22} />
              </div>
              <h4 className="font-display text-xl font-semibold mb-3 text-black">Nội Dung & Chuẩn SEO</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sản xuất bài viết giá trị cao, cập nhật sản phẩm/dịch vụ liên tục, tối ưu các thẻ chuẩn SEO Onpage và đẩy nhanh tốc độ lập chỉ mục (index) trên Google.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-premium shadow-premium hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center mb-6 border border-zinc-200">
                <BarChart3 size={22} />
              </div>
              <h4 className="font-display text-xl font-semibold mb-3 text-black">Đo Lường & Chuyển Đổi</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thiết lập hệ thống GA4, GTM để theo dõi chính xác từng click Zalo, Hotline, Form gửi đi và đề xuất các phương án tăng lượng chuyển đổi (CRO) khách hàng tiềm năng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: VÌ SAO WEBSITE CẦN CHĂM SÓC ----------------- */}
      <section id="why" className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">NỖI ĐAU DOANH NGHIỆP</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Mối Nguy Âm Thầm Khi Bỏ Bê Website</h3>
            <p className="text-gray-600 text-base">Hơn 85% website doanh nghiệp hiện nay đang ở trạng thái &ldquo;chết lâm sàng&rdquo; hoặc giảm hiệu suất nghiêm trọng do không được chăm sóc thường xuyên.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#C5A880]/10 shadow-premium flex flex-col justify-between">
              <div className="text-rose-600 bg-rose-50 h-10 w-10 rounded-lg flex items-center justify-center mb-6 border border-rose-100">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-black mb-2">Form Liên Hệ Bị Lỗi</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Khách hàng điền form nhận báo giá nhưng hệ thống gặp lỗi cấu hình không gửi về email. Lead bị thất thoát hoàn toàn mà doanh nghiệp không hề hay biết.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#C5A880]/10 shadow-premium flex flex-col justify-between">
              <div className="text-amber-600 bg-amber-50 h-10 w-10 rounded-lg flex items-center justify-center mb-6 border border-amber-100">
                <Zap size={20} className="scale-x-[-1]" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-black mb-2">Tốc Độ Tải Ngày Càng Chậm</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Phình to dữ liệu thừa, cache bị hỏng, plugin không được tối ưu khiến trang mất hơn 5s mới tải xong. 40% khách hàng sẽ rời đi ngay lập tức.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#C5A880]/10 shadow-premium flex flex-col justify-between">
              <div className="text-zinc-600 bg-zinc-50 h-10 w-10 rounded-lg flex items-center justify-center mb-6 border border-zinc-200">
                <Search size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-black mb-2">Bị Rớt Thứ Hạng SEO</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Nội dung cũ kỹ, không cập nhật, Google đánh giá thấp mức độ uy tín (EEAT), dẫn tới việc đối thủ dễ dàng vượt mặt trên bảng tìm kiếm Google.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#C5A880]/10 shadow-premium flex flex-col justify-between">
              <div className="text-red-600 bg-red-50 h-10 w-10 rounded-lg flex items-center justify-center mb-6 border border-red-100">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-black mb-2">Dễ Bị Tấn Công, Hack Sập</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Hệ thống CMS, Plugin phiên bản cũ chứa nhiều lỗ hổng bảo mật chưa được cập nhật bản vá là miếng mồi ngon cho hacker chèn link rác cờ bạc, lừa đảo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 4: SO SÁNH THIẾT KẾ VS CHĂM SÓC ----------------- */}
      <section className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">PHÂN BIỆT RÕ RÀNG</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Thiết Kế Web vs Chăm Sóc Web</h3>
            <p className="text-gray-600 text-base">Rất nhiều doanh nghiệp lầm tưởng mua xong một website là hoàn thành. Thực chất đó mới chỉ là điểm khởi đầu.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b-2 border-black bg-[#FAF9F6]">
                  <th className="py-4 px-6 font-display font-semibold text-black text-base">Hạng Mục So Sánh</th>
                  <th className="py-4 px-6 font-display font-semibold text-[#8B7355] text-base">Thiết Kế Website (Xây Dựng Ban Đầu)</th>
                  <th className="py-4 px-6 font-display font-bold text-black text-base bg-[#C5A880]/10">Chăm Sóc Website (PGS Agency Vận Hành)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="py-4 px-6 font-semibold text-black">Mục tiêu cốt lõi</td>
                  <td className="py-4 px-6 text-gray-600">Xây dựng bộ khung, giao diện, cấu trúc tính năng cơ bản ban đầu của website.</td>
                  <td className="py-4 px-6 text-gray-800 bg-[#C5A880]/5 font-medium">Bảo dưỡng, vận hành, sản xuất nội dung mới, tối ưu hóa tốc độ và đo lường conversion liên tục.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-black">Thời gian thực hiện</td>
                  <td className="py-4 px-6 text-gray-600">Theo dự án ngắn hạn (thường từ 2 - 6 tuần bàn giao).</td>
                  <td className="py-4 px-6 text-gray-800 bg-[#C5A880]/5 font-medium">Định kỳ, duy trì liên tục hàng tháng để tích lũy giá trị tài sản số.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-black">Nội dung dữ liệu</td>
                  <td className="py-4 px-6 text-gray-600">Sử dụng dữ liệu demo mẫu, nội dung khung sơ sài ban đầu.</td>
                  <td className="py-4 px-6 text-gray-800 bg-[#C5A880]/5 font-medium">Viết bài chuẩn SEO, cập nhật sản phẩm thật, tối ưu hóa liên kết nội bộ liên tục.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-black">Bảo mật & Kỹ thuật</td>
                  <td className="py-4 px-6 text-gray-600">Cấu hình bảo mật lúc bàn giao. Lâu ngày sẽ xuất hiện lỗ hổng phần mềm mới.</td>
                  <td className="py-4 px-6 text-gray-800 bg-[#C5A880]/5 font-medium">Auto-scan mã độc, cập nhật bản vá khẩn cấp cho Core & Plugin, Backup cách ly liên tục.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-black">Bản chất ví dụ thực tế</td>
                  <td className="py-4 px-6 text-gray-600">Giống như <strong className="text-black font-semibold">Xây một tòa nhà văn phòng cao cấp</strong>.</td>
                  <td className="py-4 px-6 text-gray-800 bg-[#C5A880]/5 font-bold">Giống như <span className="text-gold-gradient">Quản lý, bảo dưỡng, vận hành tòa nhà, tiếp tân và tìm kiếm khách hàng thuê văn phòng</span>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: KHI NÀO CẦN CHĂM SÓC WEBSITE ----------------- */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">ĐỐI TƯỢNG PHÙ HỢP</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Khi Nào Doanh Nghiệp Cần Thuê Chăm Sóc Web?</h3>
            <p className="text-gray-600 text-base">Hãy tick chọn những vấn đề doanh nghiệp bạn đang gặp phải dưới đây:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { id: "opt1", text: "Website từ lúc thiết kế xong chưa hề được đăng bài viết mới hay cập nhật sản phẩm." },
              { id: "opt2", text: "Không có nhân sự chuyên môn về kỹ thuật Web, code, thiết kế banner hay viết bài chuẩn SEO." },
              { id: "opt3", text: "Muốn đẩy từ khóa lên top Google nhưng không biết cách tối ưu hóa Onpage, sitemap hay Schema." },
              { id: "opt4", text: "Trang web tải cực kỳ chậm, khách hàng thường xuyên phàn nàn và bỏ sang web đối thủ." },
              { id: "opt5", text: "Lo sợ mất dữ liệu quan trọng khi máy chủ lỗi hoặc website bị nhiễm mã độc, ransomware phá hoại." },
              { id: "opt6", text: "Chạy quảng cáo Google Ads, Facebook Ads nhưng không biết đo lường chính xác tỷ lệ điền form, số cuộc gọi." },
              { id: "opt7", text: "Hệ thống gặp lỗi vỡ giao diện di động, link lỗi 404 gãy tùm lum không ai đứng ra khắc phục." },
              { id: "opt8", text: "Cần những báo cáo đo lường traffic và biến động từ khóa rõ ràng, minh bạch hàng tháng." }
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  checkedItems[item.id] 
                    ? "bg-white border-[#C5A880] shadow-sm text-black" 
                    : "bg-white/60 border-gray-200 hover:border-[#C5A880]/40 text-gray-700"
                }`}
              >
                <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  checkedItems[item.id] ? "bg-[#C5A880] border-[#C5A880]" : "border-gray-300"
                }`}>
                  {checkedItems[item.id] && <Check size={12} className="text-black stroke-[3px]" />}
                </div>
                <p className="text-sm font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 mb-4">Nếu bạn chọn từ <strong className="text-black">2 lỗi trở lên</strong>, website của bạn đang cần can thiệp chăm sóc khẩn cấp.</p>
            <a href="#health-checker-tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-[#C5A880] text-sm font-semibold tracking-wider uppercase hover:bg-zinc-900 transition-colors">
              <span>Đo Sức Khỏe Chi Tiết Ngay</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 6: INTERACTIVE HEALTH CHECK TOOL ----------------- */}
      <section id="health-checker-tool" className="py-20 bg-white border-b border-[#C5A880]/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#B3966D] font-mono text-[10px] uppercase tracking-wider">
              <Activity size={12} />
              <span>CÔNG CỤ PHÂN TÍCH ONLINE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-black">Website Health Check Simulator</h2>
            <p className="text-gray-600 text-base">
              Nhập tên miền của doanh nghiệp bạn để giả lập quy trình 10 tiêu chuẩn kiểm tra sức khỏe của PGS Agency và xem kết quả điểm số tối ưu hóa trực quan.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#FAF9F6] border border-[#C5A880]/20 rounded-2xl p-6 sm:p-8 shadow-premium">
            {/* Form Input */}
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <span className="text-sm font-mono font-semibold text-[#C5A880]">URL</span>
                  </div>
                  <input 
                    type="text" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="example.com hoặc https://tendoanhnghiep.vn"
                    className="w-full pl-14 pr-4 py-4 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black placeholder:text-gray-400"
                    disabled={isAnalyzing}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-6 py-4 rounded-xl bg-black text-[#C5A880] hover:bg-zinc-900 transition-colors text-sm font-semibold tracking-wider uppercase disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap min-w-[170px]"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Đang quét...</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      <span>Phân Tích Ngay</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Analysis Loading State */}
            {isAnalyzing && (
              <div className="mt-8 space-y-4 border-t border-[#C5A880]/10 pt-8">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>TIẾN TRÌNH ANALYZER:</span>
                  <span>{Math.round(((analysisStep + 1) / analysisSteps.length) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-black" 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={analysisStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 text-sm text-black font-medium"
                  >
                    <RefreshCw className="animate-spin text-[#C5A880]" size={14} />
                    <span>{analysisSteps[analysisStep]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Analysis Result State */}
            {analysisResults && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 border-t border-[#C5A880]/20 pt-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-white rounded-xl border border-premium">
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-400 tracking-wider">TÊN MIỀN QUÉT:</h4>
                    <span className="font-display font-semibold text-lg text-black">{analysisResults.url}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-xs text-rose-500 font-bold mb-1">Hiện Tại</div>
                      <div className="h-16 w-16 rounded-full border-4 border-rose-100 flex items-center justify-center font-display font-bold text-lg text-rose-600 bg-rose-50">
                        {analysisResults.scoreBefore}
                      </div>
                    </div>
                    <div className="text-zinc-300">➔</div>
                    <div className="text-center">
                      <div className="text-xs text-emerald-600 font-bold mb-1">PGS Chăm Sóc</div>
                      <div className="h-16 w-16 rounded-full border-4 border-emerald-100 flex items-center justify-center font-display font-bold text-lg text-emerald-600 bg-emerald-50">
                        {analysisResults.scoreAfter}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-sm text-black">Các lỗ hổng kỹ thuật phát hiện:</h5>
                  <div className="divide-y divide-zinc-150 border border-premium rounded-xl overflow-hidden bg-white">
                    {analysisResults.issues.map((issue: any) => (
                      <div key={issue.id} className="p-4 flex gap-3 items-start">
                        <span className={`p-1 rounded mt-0.5 ${issue.severity === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                          <AlertTriangle size={14} />
                        </span>
                        <div>
                          <h6 className="font-bold text-xs text-black">{issue.title}</h6>
                          <p className="text-gray-500 text-[11px] mt-0.5">{issue.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro CTA to fix */}
                <div className="p-4 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-zinc-800 font-medium text-center sm:text-left">
                    Nhân viên kỹ thuật PGS Agency sẵn sàng hỗ trợ bạn vá 100% các lỗ hổng trên miễn phí trong đợt audit đầu tiên.
                  </span>
                  <a 
                    href="#lead-form-section" 
                    className="px-4 py-2 rounded-lg bg-black text-[#C5A880] text-xs font-semibold tracking-wider uppercase hover:bg-zinc-900 transition-colors whitespace-nowrap"
                  >
                    Khắc Phục Lỗi Ngay
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 7: NỘI DUNG & SEO ----------------- */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HẠNG MỤC 01</span>
              <h3 className="font-display text-3xl font-semibold text-black leading-tight">Nội Dung Hoạt Động & Tối Ưu SEO On-page Định Kỳ</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Website của doanh nghiệp giống như một cửa hàng mặt phố. Nếu cả năm không bày biện hàng mới hay đổi biển hiệu, khách qua đường sẽ nghĩ cửa hàng đã phá sản.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Sản xuất bài viết định hướng chuyên môn, độc bản chuẩn EEAT (độ tin cậy cao của Google).",
                  "Cập nhật thông tin dịch vụ, chỉnh sửa tối ưu SEO tiêu đề, mô tả (Meta title, Meta description).",
                  "Cấu hình Internal Link (Liên kết nội bộ) khoa học giúp giữ chân người dùng lâu hơn.",
                  "Tối ưu hóa thẻ alt ảnh sản phẩm, nén ảnh định dạng WebP thế hệ mới.",
                  "Khai báo Google Search Console để cập nhật nội dung mới lên Google ngay lập tức."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-[#C5A880]/10 text-[#B3966D] mt-0.5">
                      <Check size={12} className="stroke-[3px]" />
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Board Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#C5A880]/15 rounded-2xl p-6 shadow-premium">
                <div className="flex items-center justify-between pb-4 border-b border-premium mb-4">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-[#C5A880]" />
                    <span className="font-mono text-xs text-black font-bold uppercase">SEO Maintenance Matrix</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Ready for Google AI Search</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-premium grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-bold text-[11px] text-black uppercase">Từ khóa chính</div>
                    <div className="col-span-4 font-mono text-[11px] text-[#C5A880] font-semibold">Tình trạng tối ưu</div>
                    <div className="col-span-4 text-right text-[10px] text-gray-500 font-mono">Index Status</div>
                  </div>

                  {[
                    { kw: "Dịch vụ chăm sóc website", status: "Hoàn hảo (H1, Meta, Schema)", index: "Đã lập chỉ mục 24h trước" },
                    { kw: "Quản trị website doanh nghiệp", status: "Đã tối ưu cấu trúc bài viết", index: "Đã lập chỉ mục" },
                    { kw: "Tối ưu tốc độ website", status: "Đã thêm FAQ Schema chuẩn", index: "Đã lập chỉ mục" }
                  ].map((row, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-zinc-150 grid grid-cols-12 gap-4 items-center hover:border-[#C5A880]/30 transition-colors">
                      <div className="col-span-4 text-xs font-semibold text-black">{row.kw}</div>
                      <div className="col-span-4 text-[11px] text-emerald-600 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 size={12} />
                        {row.status}
                      </div>
                      <div className="col-span-4 text-right text-[10px] font-mono text-zinc-500">{row.index}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 8: TECHNICAL & SPEED ----------------- */}
      <section className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Speed Gauge & Issue Cards */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF9F6] border border-premium p-6 rounded-2xl text-center space-y-4">
                  <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Mobile PageSpeed Score</span>
                  <div className="relative h-28 w-28 mx-auto flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="#E5DFD3" strokeWidth="6" />
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="#C5A880" strokeWidth="6" strokeDasharray="301" strokeDashoffset={301 - (301 * 0.96)} strokeLinecap="round" />
                    </svg>
                    <span className="text-2xl font-display font-semibold text-black">96</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">Đã loại bỏ mã JS thừa, nén CSS và tối ưu hóa bộ nhớ đệm cache server.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white border border-premium rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-black flex items-center gap-1.5">
                        <Zap size={14} className="text-[#C5A880]" />
                        TTFB (Time to First Byte)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-bold">0.18s</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%]" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-premium rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-black flex items-center gap-1.5">
                        <Smartphone size={14} className="text-[#C5A880]" />
                        Mobile Usability Index
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-bold">100%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-premium rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-black flex items-center gap-1.5">
                        <RefreshCw size={14} className="text-[#C5A880]" />
                        Broken Links (404) Solved
                      </span>
                      <span className="text-[11px] font-mono text-[#C5A880] font-bold">Clean</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HẠNG MỤC 02</span>
              <h3 className="font-display text-3xl font-semibold text-black leading-tight">Tối Ưu Kỹ Thuật (Technical) & Siêu Tốc Độ Tải Trang</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Người dùng di động không rảnh rỗi đợi website tải hơn 3 giây. Tốc độ tải trang chậm là con đường ngắn nhất dẫn khách hàng thẳng sang đối thủ cạnh tranh của bạn.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Kiểm tra và sửa chữa triệt để lỗi liên kết gãy, lỗi định dạng hiển thị giao diện di động.",
                  "Tối ưu mã nguồn sạch (Clean HTML/CSS), nén dung lượng tài nguyên phản hồi.",
                  "Quản lý sitemap, cấu trúc robots.txt điều hướng bot Google quét dữ liệu chuẩn xác.",
                  "Dọn dẹp tệp tin rác trong database WordPress/Laravel định kỳ hàng tháng.",
                  "Thiết lập CDN phân phối dữ liệu tải trang cực nhanh trên toàn lãnh thổ Việt Nam."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-[#C5A880]/10 text-[#B3966D] mt-0.5">
                      <Check size={12} className="stroke-[3px]" />
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- SECTION 9: BẢO MẬT & BACKUP ----------------- */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HẠNG MỤC 03</span>
              <h3 className="font-display text-3xl font-semibold text-black leading-tight">An Ninh Bảo Mật Đa Lớp & Sao Lưu (Backup) Cách Ly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mất dữ liệu khách hàng hoặc bị hacker phá hoại có thể xóa sạch công sức và uy tín thương hiệu của doanh nghiệp dày công gầy dựng suốt nhiều năm chỉ trong một đêm.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Tự động sao lưu dữ liệu (database, source code) hàng tuần lên lưu trữ đám mây biệt lập.",
                  "Giám sát an ninh trực quan bảo vệ 24/7, phát hiện sớm nguy cơ virus, trojan.",
                  "Cập nhật liên tục các bản vá bảo mật hạt nhân CMS, Plugin phòng chống SQL Injection.",
                  "Hỗ trợ cấu hình chứng chỉ bảo mật SSL/HTTPS giúp mã hóa thông tin thanh toán, form.",
                  "Bàn giao khôi phục nguyên trạng hoạt động của website dưới 3 tiếng nếu xảy ra sự cố server."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-[#C5A880]/10 text-[#B3966D] mt-0.5">
                      <Check size={12} className="stroke-[3px]" />
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shield and Vault Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#C5A880]/15 rounded-2xl p-6 sm:p-8 shadow-premium text-center space-y-6">
                <div className="h-16 w-16 bg-black text-[#C5A880] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Shield size={32} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display text-lg font-bold text-black">Hệ Thống Vault Cách Ly An Toàn Tuyệt Đối</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Mã nguồn và cơ sở dữ liệu được PGS mã hóa, đóng gói tự động và đồng bộ trực tiếp sang server lưu trữ Amazon S3/Google Cloud Storage riêng biệt.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-left">
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium text-center">
                    <div className="text-xs text-gray-400 font-mono">BACKUP STATUS</div>
                    <div className="font-bold text-sm text-[#C5A880] mt-1">Đồng Bộ Tuần</div>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium text-center">
                    <div className="text-xs text-gray-400 font-mono">MÃ HÓA SSL</div>
                    <div className="font-bold text-sm text-emerald-600 mt-1">Chuẩn 256-bit</div>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium text-center">
                    <div className="text-xs text-gray-400 font-mono">KHÔI PHỤC</div>
                    <div className="font-bold text-sm text-black mt-1">&lt; 3 Giờ SLA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 10: TRACKING & CRO ----------------- */}
      <section className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Tracking Dashboard */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <div className="bg-[#FAF9F6] border border-[#C5A880]/15 rounded-2xl p-6 shadow-premium space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-premium">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-pulse" />
                    <span className="font-mono text-xs text-black font-semibold">GA4 / GTM CONVERSION TRACKING PANEL</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">REALTIME CONVERSIONS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-premium flex flex-col justify-between">
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Click Zalo Chat</span>
                    <span className="text-xl font-display font-bold text-black mt-2">142 click</span>
                    <span className="text-[9px] text-emerald-600 font-mono mt-1 font-semibold">➔ Conversion Rate: 3.2%</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-premium flex flex-col justify-between">
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Click Hotline Call</span>
                    <span className="text-xl font-display font-bold text-black mt-2">89 cuộc gọi</span>
                    <span className="text-[9px] text-emerald-600 font-mono mt-1 font-semibold">➔ Conversion Rate: 2.1%</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-premium flex flex-col justify-between">
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Form Đăng Ký Tư Vấn</span>
                    <span className="text-xl font-display font-bold text-[#C5A880] mt-2">45 gửi thành công</span>
                    <span className="text-[9px] text-emerald-600 font-mono mt-1 font-semibold">➔ Tăng 180% so với trước</span>
                  </div>
                </div>

                {/* Simulated connection path anim */}
                <div className="bg-white rounded-xl p-3 border border-premium flex items-center justify-between text-[11px] font-medium text-gray-600">
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    <Smartphone size={14} className="text-[#C5A880]" />
                    Hành vi click của khách hàng
                  </span>
                  <span className="text-zinc-300">················➔</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-mono font-bold">
                    GA4 Realtime Event
                  </span>
                </div>
              </div>
            </div>

            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HẠNG MỤC 04</span>
              <h3 className="font-display text-3xl font-semibold text-black leading-tight">Cài Đặt Tracking & Tối Ưu Chuyển Đổi (CRO)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nhiều doanh nghiệp đốt hàng chục triệu tiền quảng cáo nhưng không biết chính xác click nào tạo ra khách hàng. Chúng tôi thiết lập hệ thống đo lường minh bạch nhất.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Thiết lập tài khoản và kết nối chính xác Google Analytics 4 (GA4), Google Tag Manager.",
                  "Cài đặt đo lường hành vi chuyển đổi cho nút gọi điện, chat Zalo, chat Facebook, click map.",
                  "Tạo sự kiện theo dõi hành trình điền form, gửi form thành công chuẩn phễu chuyển đổi.",
                  "Phân tích bản đồ nhiệt (Heatmap) phát hiện các điểm nghẽn trải nghiệm người dùng.",
                  "Đề xuất liên tục các phương án cải tiến giao diện trang đích (A/B testing) giúp tối ưu tỷ lệ mua hàng."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-[#C5A880]/10 text-[#B3966D] mt-0.5">
                      <Check size={12} className="stroke-[3px]" />
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- SECTION 11: BÁO CÁO ĐỊNH KỲ ----------------- */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HẠNG MỤC 05</span>
              <h3 className="font-display text-3xl font-semibold text-black leading-tight">Báo Cáo Minh Bạch & Đề Xuất Chiến Lược Tăng Trưởng</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chúng tôi không làm việc trong im lặng. Mỗi tháng, bạn sẽ nhận được một bản báo cáo đầy đủ chỉ số sức khỏe, hành vi của website kèm phân tích sâu từ chuyên gia marketing của PGS.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Báo cáo chi tiết danh sách bài đăng chuẩn SEO, các hạng mục lỗi kỹ thuật đã vá.",
                  "Báo cáo biến động lưu lượng truy cập (Traffic), thứ hạng từ khóa chủ chốt của doanh nghiệp.",
                  "Thống kê chính xác số lượng chuyển đổi (Hotline, Zalo, Form) nhận được trong tháng.",
                  "Họp đánh giá định kỳ 1-1 với Account Manager của PGS đề xuất kế hoạch tối ưu tháng tiếp theo.",
                  "Đưa ra các định hướng cấu trúc website thích ứng tốt nhất với xu hướng tìm kiếm AI Search."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-[#C5A880]/10 text-[#B3966D] mt-0.5">
                      <Check size={12} className="stroke-[3px]" />
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Report Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#C5A880]/15 rounded-2xl p-6 sm:p-8 shadow-premium space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-premium">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-black">Báo Cáo Hiệu Suất Website Định Kỳ</h4>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Mẫu Báo Cáo Tháng Tác Vụ PGS</span>
                  </div>
                  <span className="px-2 py-1 bg-zinc-100 text-[10px] text-zinc-600 font-mono font-semibold rounded border border-zinc-200">PDF REPORT</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">1. Khối lượng bài đăng SEO hoàn thành:</span>
                    <span className="font-bold text-black font-mono">12 bài chuẩn SEO (100% On-Page)</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">2. Sự cố kỹ thuật & Mã độc đã xử lý:</span>
                    <span className="font-bold text-emerald-600 font-mono">03 lỗi Plugin xung đột, 0 mã rác</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-premium flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">3. Tổng lượt Click chuyển đổi thực tế:</span>
                    <span className="font-bold text-black font-mono">276 conversions (Zalo/Hotline/Form)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#C5A880]/20 bg-[#C5A880]/5 text-xs text-gray-600 leading-relaxed">
                  <strong className="text-black font-semibold">Đề xuất tháng tới:</strong> Tập trung tối ưu cấu trúc các trang Landing Page dịch vụ mũi nhọn để đón làn sóng Organic Traffic từ Google Search trước dịp lễ cuối năm.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 12: CASE STUDY THỰC TẾ ----------------- */}
      <section id="case-study" className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">MINH CHỨNG THỰC TẾ</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Khách Hàng Thực Tế Nói Lên Hiệu Quả</h3>
            <p className="text-gray-600 text-base">Dưới đây là số liệu thực tế đo lường của dự án trước và sau khi bàn giao cho đội ngũ PGS Agency chăm sóc và tối ưu hóa hệ thống.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#FAF9F6] border border-[#C5A880]/25 rounded-3xl p-6 sm:p-10 shadow-premium">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#C5A880]/20">
              <div>
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-wider block">Dự án chăm sóc Website thực tế tiêu biểu</span>
                <h4 className="font-display font-semibold text-2xl text-black mt-1">{SAMPLE_PROJECT.name}</h4>
                <span className="text-xs text-gray-500 font-medium mt-0.5 block">Lĩnh vực hoạt động: {SAMPLE_PROJECT.field}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-100">
                ACTIVE SEO & CRO OPTIMIZED
              </div>
            </div>

            {/* Before / After Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {/* Before */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-rose-600 font-bold font-mono uppercase text-xs">
                  <span className="h-2 w-2 rounded-full bg-rose-600" />
                  <span>TRƯỚC KHI PGS CHĂM SÓC</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-zinc-200">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Tốc độ tải trang di động (PageSpeed)</div>
                    <div className="text-base font-bold text-rose-600 mt-1">{SAMPLE_PROJECT.before.speed}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-zinc-200">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Số lượng trang được lập chỉ mục</div>
                    <div className="text-base font-medium text-gray-700 mt-1">{SAMPLE_PROJECT.before.index}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Conversion & Leads hàng tháng</div>
                    <div className="text-base font-bold text-rose-500 mt-1">{SAMPLE_PROJECT.before.leads}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Vấn đề bảo mật & Vận hành</div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{SAMPLE_PROJECT.before.security}</p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#C5A880] font-bold font-mono uppercase text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-pulse" />
                  <span>SAU KHI PGS VẬN HÀNH</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-[#C5A880] shadow-sm">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Tốc độ tải trang di động (PageSpeed)</div>
                    <div className="text-base font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                      {SAMPLE_PROJECT.after.speed}
                      <Sparkles size={14} className="text-[#C5A880]" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-[#C5A880] shadow-sm">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Số lượng trang được lập chỉ mục</div>
                    <div className="text-base font-bold text-black mt-1">{SAMPLE_PROJECT.after.index}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#C5A880] shadow-sm">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Conversion & Leads hàng tháng</div>
                    <div className="text-base font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                      {SAMPLE_PROJECT.after.leads}
                      <TrendingUp size={14} />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#C5A880] shadow-sm">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Vấn đề bảo mật & Vận hành</div>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed font-medium">{SAMPLE_PROJECT.after.security}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center font-mono mt-8 italic">
              [Dự án chăm sóc Website – Kết quả đo lường thực tế bàn giao lưu trữ hệ thống PGS]
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 13: BẢNG GIÁ & CALCULATOR ----------------- */}
      <section id="pricing" className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">GÓI DỊCH VỤ LINH HOẠT</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-black">Bảng Giá Dịch Vụ Chăm Sóc Website</h3>
            <p className="text-gray-600 text-base">Đầu tư xứng đáng, minh bạch, không phát sinh chi phí ẩn. Chọn gói phù hợp nhất với tầm vóc thương hiệu của bạn.</p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {DETAILED_PACKAGES.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-8 border flex flex-col justify-between shadow-premium hover:shadow-premium-hover transition-all duration-300 ${
                  pkg.recommended ? "border-2 border-[#C5A880] scale-102" : "border-[#C5A880]/10"
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full bg-[#C5A880] text-black font-mono text-[9px] font-bold tracking-widest uppercase">
                    ĐƯỢC ĐỀ XUẤT NHIỀU NHẤT
                  </span>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-xl font-bold text-black">{pkg.name}</h4>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed h-12 overflow-hidden">{pkg.desc}</p>
                  </div>

                  <div className="py-4 border-y border-premium flex items-baseline gap-1">
                    <span className="text-3xl font-display font-semibold text-black">{pkg.price}</span>
                    <span className="text-xs text-gray-500 font-mono">VNĐ/{pkg.period}</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-gray-600 font-sans">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-500 mt-0.5">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="#lead-form-section" 
                    onClick={() => setLeadForm(prev => ({ ...prev, package: pkg.id }))}
                    className={`w-full block py-3.5 rounded-xl font-semibold text-center text-xs tracking-wider uppercase transition-all duration-300 ${
                      pkg.recommended 
                        ? "bg-[#C5A880] hover:bg-[#B3966D] text-black shadow-md" 
                        : "bg-black text-[#C5A880] hover:bg-zinc-900"
                    }`}
                  >
                    Đăng Ký Tư Vấn Gói
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Pricing Custom Configurator */}
          <div className="max-w-3xl mx-auto bg-white border border-[#C5A880]/15 rounded-3xl p-6 sm:p-8 shadow-premium">
            <div className="flex items-center gap-2.5 pb-4 border-b border-premium mb-6">
              <Settings size={18} className="text-[#C5A880]" />
              <h4 className="font-display font-semibold text-base text-black">Interactive Cost Calculator</h4>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Tự cấu hình dịch vụ theo nhu cầu riêng của doanh nghiệp để ước lượng chi phí quản trị tối ưu từ PGS.
            </p>

            <div className="space-y-6">
              {/* Slider for Articles */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-black">
                  <span>Số lượng bài viết chuẩn SEO hàng tháng:</span>
                  <span className="font-mono text-[#C5A880]">{calcInputs.articles} bài viết</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={calcInputs.articles}
                  onChange={(e) => setCalcInputs(prev => ({ ...prev, articles: parseInt(e.target.value) }))}
                  className="w-full accent-[#C5A880] bg-zinc-100 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Toggles for extras */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 p-3 bg-[#FAF9F6] border border-premium rounded-xl cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={calcInputs.speedOptimize}
                    onChange={(e) => setCalcInputs(prev => ({ ...prev, speedOptimize: e.target.checked }))}
                    className="accent-[#C5A880] h-4 w-4 rounded"
                  />
                  <span className="text-[11px] font-semibold text-gray-700 leading-none">Tối ưu tốc độ di động (+500k)</span>
                </label>
                
                <label className="flex items-center gap-2 p-3 bg-[#FAF9F6] border border-premium rounded-xl cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={calcInputs.securityHardening}
                    onChange={(e) => setCalcInputs(prev => ({ ...prev, securityHardening: e.target.checked }))}
                    className="accent-[#C5A880] h-4 w-4 rounded"
                  />
                  <span className="text-[11px] font-semibold text-gray-700 leading-none">Bảo mật đa lớp (+500k)</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-[#FAF9F6] border border-premium rounded-xl cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={calcInputs.trackingSetup}
                    onChange={(e) => setCalcInputs(prev => ({ ...prev, trackingSetup: e.target.checked }))}
                    className="accent-[#C5A880] h-4 w-4 rounded"
                  />
                  <span className="text-[11px] font-semibold text-gray-700 leading-none">Setup GTM Tracking (+700k)</span>
                </label>
              </div>

              {/* Backup Frequency Radio */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-black block">Tần suất sao lưu (Backup) cách ly:</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'biweekly', label: '2 lần/tháng', desc: 'Mặc định' },
                    { id: 'weekly', label: 'Hàng tuần (+300k)', desc: 'Khuyên dùng' },
                    { id: 'daily', label: 'Hàng ngày (+800k)', desc: 'E-commerce' }
                  ].map((opt) => (
                    <label key={opt.id} className="p-3 bg-white border border-zinc-200 rounded-xl cursor-pointer block text-center hover:border-[#C5A880]/40">
                      <input 
                        type="radio" 
                        name="backup_freq"
                        value={opt.id}
                        checked={calcInputs.backupFrequency === opt.id}
                        onChange={() => setCalcInputs(prev => ({ ...prev, backupFrequency: opt.id }))}
                        className="sr-only"
                      />
                      <span className={`block text-xs font-semibold ${calcInputs.backupFrequency === opt.id ? 'text-[#C5A880]' : 'text-gray-700'}`}>{opt.label}</span>
                      <span className="block text-[9px] text-gray-400 mt-0.5">{opt.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price output */}
              <div className="pt-6 border-t border-premium flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400 font-mono">ƯỚC TÍNH CHI PHÍ KHUYÊN DÙNG:</span>
                  <div className="text-2xl font-display font-semibold text-black mt-1">
                    {calcPrice.toLocaleString('vi-VN')} <span className="text-xs text-gray-500 font-mono">VNĐ/tháng</span>
                  </div>
                </div>
                
                <a 
                  href="#lead-form-section" 
                  onClick={() => {
                    setLeadForm(prev => ({
                      ...prev,
                      message: `Cần tư vấn gói tự cấu hình: ${calcInputs.articles} bài viết SEO, Tốc độ: ${calcInputs.speedOptimize ? 'Có' : 'Không'}, Bảo mật: ${calcInputs.securityHardening ? 'Có' : 'Không'}, Tracking: ${calcInputs.trackingSetup ? 'Có' : 'Không'}, Backup: ${calcInputs.backupFrequency}.`
                    }));
                  }}
                  className="px-6 py-3 rounded-xl bg-black text-[#C5A880] hover:bg-zinc-900 transition-colors text-xs font-semibold tracking-wider uppercase"
                >
                  Yêu Cầu Báo Giá Này
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 14: FAQ ACCORDION ----------------- */}
      <section className="py-20 bg-white border-b border-[#C5A880]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">GIẢI ĐÁP THẮC MẮC</h2>
            <h3 className="font-display text-3xl font-semibold text-black">Câu Hỏi Thường Gặp</h3>
            <p className="text-gray-600 text-sm">Tổng hợp các băn khoăn phổ biến nhất của doanh nghiệp về dịch vụ quản trị và chăm sóc.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Chăm sóc website tại PGS gồm những tác vụ cụ thể nào?",
                a: "Tác vụ gồm bảo trì kỹ thuật (sửa lỗi code, plugin xung đột, vá lỗ hổng), tối ưu hóa tốc độ di động, nén tài nguyên, sản xuất bài viết chuẩn SEO, đăng sản phẩm, khai báo chỉ mục Google, backup an toàn hàng tuần và đo lường chuyển đổi thông qua Google Tag Manager."
              },
              {
                q: "Bài viết chuẩn SEO của PGS có được viết tự động bằng AI không?",
                a: "Hoàn toàn KHÔNG. Mọi bài viết của PGS Agency đều được sản xuất bởi đội ngũ Content Writer giàu kinh nghiệm, nghiên cứu kỹ từ khóa của đối thủ, lập Outline chuyên sâu, và được tối ưu theo tiêu chí EEAT mới nhất của Google nhằm đảm bảo bài viết có giá trị thực cho người đọc và đạt thứ hạng cao bền vững."
              },
              {
                q: "Nếu hệ thống gặp sự cố mất dữ liệu, PGS khắc phục thế nào?",
                a: "Với quy trình backup cloud cách ly hàng tuần/hàng ngày, chúng tôi luôn lưu trữ ít nhất 3 bản sao lưu website gần nhất. Nếu máy chủ của bạn gặp hỏng hóc vật lý hoặc bị mã độc hack, đội ngũ kỹ sư PGS sẽ khôi phục nguyên vẹn tình trạng hoạt động của website trong vòng tối đa 3 tiếng theo đúng cam kết SLA."
              },
              {
                q: "Tôi có thể tự cập nhật nội dung khi đã giao website cho PGS không?",
                a: "Hoàn toàn có thể. Việc PGS chăm sóc và bảo trì không ảnh hưởng đến quyền quản trị tối cao của bạn. Chúng tôi khuyến khích hai bên cùng đồng bộ để thông tin doanh nghiệp luôn được phản ánh trực quan và sống động nhất."
              },
              {
                q: "Dịch vụ có hỗ trợ sửa chữa các lỗi giao diện bị vỡ trên di động không?",
                a: "Có, tất cả lỗi hiển thị, vỡ layout, lỗi form không hoạt động, liên kết hỏng 404 đều nằm trong phạm vi khắc phục của dịch vụ. Với các lỗi lập trình cấu trúc phức tạp, chúng tôi sẽ đánh giá kỹ lưỡng và đưa ra giải pháp sửa chữa tối ưu nhất."
              },
              {
                q: "Báo cáo định kỳ sẽ được gửi vào thời gian nào?",
                a: "Báo cáo hiệu suất sẽ được gửi tự động qua email định dạng PDF/Dashboard Online vào ngày 05 hàng tháng, tổng hợp đầy đủ số lượng bài viết, lượt truy cập, lượng chuyển đổi, các lỗi đã xử lý và đề xuất chiến lược tăng trưởng chi tiết cho tháng sau."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-[#C5A880]/15 rounded-2xl overflow-hidden bg-[#FAF9F6] transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-display font-semibold text-black text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#C5A880]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="pb-5 px-6 pt-1 text-xs text-gray-600 leading-relaxed border-t border-[#C5A880]/10 bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 15: DỊCH VỤ LIÊN QUAN ----------------- */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-mono text-xs text-[#C5A880] tracking-widest uppercase">HỆ SINH THÁI MARKETING</h2>
            <h3 className="font-display text-3xl font-semibold text-black">Các Giải Pháp Tăng Trưởng Đi Kèm</h3>
            <p className="text-gray-600 text-sm">Kết hợp các dịch vụ mũi nhọn để tối đa hóa hiệu suất chuyển đổi phễu khách hàng số.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Thiết Kế Website Chuẩn SEO", desc: "Xây dựng website chuẩn SEO, UX/UX cao cấp, tốc độ vượt trội ngay từ khâu viết code.", link: "#" },
              { title: "Dịch Vụ SEO Tổng Thể", desc: "Phủ sóng hàng nghìn từ khóa mục tiêu, xây dựng phễu Organic Traffic khổng lồ.", link: "#" },
              { title: "Sản Xuất Content Website", desc: "Cung cấp giải pháp nội dung chuẩn chuyên môn, giúp tăng uy tín thương hiệu sâu sắc.", link: "#" },
              { title: "Thiết Kế Landing Page", desc: "Xây dựng trang đích tối ưu hóa tỷ lệ chuyển đổi cho các chiến dịch quảng cáo trả phí.", link: "#" }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-premium shadow-premium flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                <div>
                  <h4 className="font-display font-semibold text-base text-black mb-2.5">{srv.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6">
                  <a href={srv.link} className="text-xs font-bold text-[#C5A880] flex items-center gap-1 hover:text-[#B3966D]">
                    Tìm hiểu thêm <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 16: CTA CUỐI TRANG & FORM ĐĂNG KÝ ----------------- */}
      <section id="lead-form-section" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CTA Left details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">HÀNH ĐỘNG NGAY</span>
              <h3 className="font-display text-4xl font-normal text-black leading-tight">
                Website của bạn có đang được vận hành như một <span className="font-semibold text-gold-gradient italic">tài sản marketing sống</span> không?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Đừng đợi đến khi website bị mã độc chèn link rác hoặc khách hàng phàn nàn vì form liên hệ bị lỗi mới đi tìm người sửa chữa. Bảo vệ và tối ưu tài sản số ngay hôm nay cùng PGS Agency.
              </p>

              {/* Mini Health Checklist Display */}
              <div className="p-5 bg-[#FAF9F6] border border-premium rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-black uppercase font-mono">
                  <Sparkles size={14} className="text-[#C5A880]" />
                  <span>Cam kết vận hành PGS Agency</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span>Hỗ trợ sự cố kỹ thuật 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span>Nội dung 100% độc quyền chuẩn SEO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span>Báo cáo minh bạch KPI hàng tháng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span>Khôi phục dữ liệu tức thì SLA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Registration Form */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF9F6] border border-[#C5A880]/20 rounded-3xl p-6 sm:p-8 shadow-premium">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="h-16 w-16 bg-[#C5A880]/20 text-[#B3966D] rounded-full flex items-center justify-center mx-auto">
                      <UserCheck size={32} />
                    </div>
                    <h4 className="font-display text-xl font-bold text-black">Đăng Ký Thành Công!</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Cám ơn bạn đã quan tâm. Chuyên viên tư vấn tăng trưởng số của PGS Agency sẽ gọi điện trực tiếp hỗ trợ bạn phân tích sức khỏe website trong vòng 15 phút tới.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-semibold text-[#C5A880] hover:underline"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h4 className="font-display font-semibold text-lg text-black text-center pb-2 border-b border-premium">Đăng Ký Tư Vấn Chăm Sóc Web</h4>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Họ và tên khách hàng *</label>
                      <input 
                        type="text" 
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Số điện thoại liên hệ *</label>
                        <input 
                          type="tel" 
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="0901234567"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Email doanh nghiệp</label>
                        <input 
                          type="email" 
                          value={leadForm.email}
                          onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="co@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Website hiện tại (nếu có)</label>
                      <input 
                        type="text" 
                        value={leadForm.url}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://mywebsite.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Chọn gói giải pháp quan tâm</label>
                      <select 
                        value={leadForm.package}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, package: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black"
                      >
                        <option value="basic">Website Care Basic (2.5tr/tháng)</option>
                        <option value="seo">Website SEO Care (4.5tr/tháng)</option>
                        <option value="growth">Website Growth Care (8.5tr/tháng)</option>
                        <option value="custom">Gói Tự Cấu Hình Tùy Chọn</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Thông tin chi tiết yêu cầu bổ sung</label>
                      <textarea 
                        rows={2}
                        value={leadForm.message}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Hãy cho chúng tôi biết về các lỗi hiện tại hoặc định hướng tăng trưởng bạn mong muốn..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A880]/20 focus:outline-none focus:border-[#C5A880] text-sm text-black resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 rounded-xl bg-black text-[#C5A880] hover:bg-zinc-900 font-semibold text-center text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      <span>Đăng Ký Tư Vấn & Health Check Miễn Phí</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- SECTIONS 17: FOOTER & SEO METADATA ----------------- */}
      

    </div>
  );
}
