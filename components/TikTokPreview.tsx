"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  NICHES, 
  PILLARS, 
  SERIES_PATHS, 
  FAQS, 
  PACKAGES, 
  CASE_STUDIES 
} from '@/lib/tiktok-data';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Zap, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Smartphone, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Video, 
  Layers 
} from "lucide-react";

interface PreviewProps {
  onSelectSection?: (id: number) => void;
  selectedSectionId?: number;
}

export default function TikTokPreview({ onSelectSection, selectedSectionId }: PreviewProps) {
  // 1. Diagnostics State (Section 4)
  const [diagnosticScore, setDiagnosticScore] = useState<number>(40);
  const [checkedSymptoms, setCheckedSymptoms] = useState<Record<string, boolean>>({
    s1: true,
    s2: false,
    s3: true,
    s4: false,
    s5: false,
  });

  const handleSymptomChange = (id: string) => {
    const updated = { ...checkedSymptoms, [id]: !checkedSymptoms[id] };
    setCheckedSymptoms(updated);
    // Recalculate score (base 20% + 15% per check)
    const checkedCount = Object.values(updated).filter(Boolean).length;
    setDiagnosticScore(Math.min(100, 20 + checkedCount * 16));
  };

  // 2. Niche Positioning State (Section 5)
  const [activeNicheId, setActiveNicheId] = useState<string>("tech_ceo");
  const activeNiche = NICHES.find(n => n.id === activeNicheId) || NICHES[0];

  // 3. Content Pillar State (Section 6)
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const activePillar = PILLARS[activePillarIdx];

  // 4. Series Path State (Section 7)
  const [activeSeriesIdx, setActiveSeriesIdx] = useState<number>(0);
  const activeSeries = SERIES_PATHS[activeSeriesIdx];

  // 5. Hook Engine AI Call State (Section 8)
  const [hookTopic, setHookTopic] = useState<string>("");
  const [hookPillar, setHookPillar] = useState<string>("Kiến thức/Giáo dục");
  const [hookLoading, setHookLoading] = useState<boolean>(false);
  const [hookResults, setHookResults] = useState<{
    hooks: Array<{ text: string; formula: string; visual: string }>;
    rationale: string;
    isFallback?: boolean;
  } | null>(null);

  const handleGenerateHooks = async (e: React.FormEvent) => {
    e.preventDefault();
    setHookLoading(true);
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-hooks",
          topic: hookTopic || "Cách tối ưu phễu marketing chuyển đổi",
          pillar: hookPillar,
        }),
      });
      const data = await res.json();
      setHookResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setHookLoading(false);
    }
  };

  // 6. Script Builder AI State (Section 9)
  const [scriptTopic, setScriptTopic] = useState<string>("");
  const [scriptObjective, setScriptObjective] = useState<string>("Thu hút Lead khách hàng tiềm năng");
  const [scriptDuration, setScriptDuration] = useState<string>("60 giây");
  const [scriptLoading, setScriptLoading] = useState<boolean>(false);
  const [scriptResult, setScriptResult] = useState<{
    title: string;
    pillar: string;
    scriptSteps: Array<{ phase: string; duration: string; spokenText: string; visualAction: string; audioSound: string }>;
    tips: string;
    isFallback?: boolean;
  } | null>(null);

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setScriptLoading(true);
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-script",
          topic: scriptTopic || "Tự động hóa vận hành cho SMEs bận rộn",
          objective: scriptObjective,
          duration: scriptDuration,
        }),
      });
      const data = await res.json();
      setScriptResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setScriptLoading(false);
    }
  };

  // 7. Video Calendar State (Section 10)
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(0);
  const calendarDays = [
    { day: "Thứ 2", status: "Đã đăng", title: "Sai lầm đốt tiền khi làm SEO", pillar: "Giáo dục (40%)", views: "14.5K", duration: "60s" },
    { day: "Thứ 3", status: "Lịch quay", title: "Quy trình thiết kế Landing Page", pillar: "Quy trình (20%)", views: "Chờ đăng", duration: "90s" },
    { day: "Thứ 4", status: "Biên tập", title: "Mổ xẻ Case Study Logitech", pillar: "Case Study (25%)", views: "Hậu kỳ", duration: "75s" },
    { day: "Thứ 5", status: "Kịch bản", title: "Một ngày làm việc của PGS Designer", pillar: "Hậu trường (20%)", views: "Duyệt kịch bản", duration: "60s" },
    { day: "Thứ 6", status: "Đã đăng", title: "Tặng vé mini-course TikTok Free", pillar: "Bán hàng (15%)", views: "8.2K", duration: "45s" },
    { day: "Thứ 7", status: "Nghỉ", title: "Nghiên cứu thị trường cuối tuần", pillar: "Nghỉ ngơi", views: "-", duration: "-" },
    { day: "Chủ nhật", status: "Kịch bản", title: "Lên dàn bài Content Pillar tuần mới", pillar: "Giáo dục (40%)", views: "Dàn trang", duration: "90s" },
  ];

  // 8. KPI interactive simulator (Section 11)
  const [simulatedViews, setSimulatedViews] = useState<number>(100000); // 100K Views
  // Conversion formula based on PGS criteria:
  // Avg. click rate = 2.5%, lead generation rate from clicks = 12%
  const simulatedClicks = Math.floor(simulatedViews * 0.025);
  const simulatedLeads = Math.floor(simulatedClicks * 0.12);
  const estimatedRevenue = simulatedLeads * 5000000; // Expected 5,000,000đ per converted client (consultation contract)

  // 9. Case study selector (Section 12)
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const activeCase = CASE_STUDIES[activeCaseIdx];

  // 10. Custom ROI/Estimator (Section 13)
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(1); // default to Channel Builder
  const selectedPlan = PACKAGES[selectedPlanIdx];
  const [calcConversionRate, setCalcConversionRate] = useState<number>(2); // 2% lead to sales rate
  const calcSaleValue = 10000000; // 10 Million VNĐ average contract value
  const estimatedNewClients = Math.max(1, Math.floor(simulatedLeads * (calcConversionRate / 100)));
  const computedReturn = estimatedNewClients * calcSaleValue;
  const computedROI = computedReturn - selectedPlan.priceNum;

  // 11. FAQ Accordion State (Section 14)
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(0);

  // 12. Booking Form State (Section 16)
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingBusiness, setBookingBusiness] = useState<string>("");
  const [bookingNiche, setBookingNiche] = useState<string>("tech_ceo");
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;
    setBookingSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 1: HERO TIKTOK CHANNEL BUILDER */}
      <section id="hero-tiktok-channel-builder" className="relative pt-10 md:pt-16 pb-20 border-b border-[#EEDDAB]/20 bg-radial from-[#FCF9F0]/60 to-[#FCFBFA]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#FCF9F0] border border-[#EEDDAB]/60 rounded-full px-3 py-1 text-xs font-semibold text-[#825D1F] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#C5933A] animate-pulse" />
              CHIẾN LƯỢC ĐỊNH VỊ NỘI DUNG SỐ CAO CẤP
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-medium text-[#1E293B] leading-tight tracking-tight">
              Dịch vụ xây kênh TikTok giúp <span className="text-[#C5933A] font-semibold underline decoration-[#EEDDAB] underline-offset-4">doanh nghiệp và CEO</span> phát triển nội dung video ngắn có định hướng
            </h1>
            
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Xây dựng hệ thống Marketing tổng thể tăng trưởng số, bứt phá thương hiệu, chuyển đổi người xem thành tệp khách hàng tiềm năng chất lượng cao (Leads) nhờ quy trình <b>Pillar - Series - Hook</b> khoa học.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#cta-cuoi-trang" 
                className="bg-[#C5933A] hover:bg-[#A87A2B] text-white px-8 py-4 rounded-lg font-medium text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px]"
              >
                Nhận tư vấn xây kênh TikTok
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#goi-dich-vu" 
                className="border border-[#C5933A] hover:bg-[#FCF9F0]/40 text-[#1E293B] px-8 py-4 rounded-lg font-medium text-center transition-all flex items-center justify-center gap-2"
              >
                Xem các gói báo giá
              </a>
            </div>

            {/* Micro proof figures */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 max-w-lg">
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-[#1E293B]">15M+</span>
                <span className="text-xs text-slate-500">Lượt xem tự nhiên</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-[#C5933A]">3,500+</span>
                <span className="text-xs text-slate-500">Leads chất lượng thu về</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-[#1E293B]">95%</span>
                <span className="text-xs text-slate-500">Khách hàng ở lại gia hạn</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive 3D Mockup Stage */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#EEDDAB]/30 to-amber-100/10 rounded-full blur-3xl z-0" />
            
            {/* Simulated 3D Device Canvas */}
            <div className="relative bg-white border border-[#EEDDAB]/50 rounded-[40px] p-4 shadow-2xl max-w-[310px] w-full z-10 transition-transform duration-500 hover:scale-102 hover:rotate-1">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full" />
              
              {/* Inner TikTok View screen */}
              <div className="bg-slate-900 rounded-[30px] overflow-hidden aspect-[9/16] relative flex flex-col justify-between p-4">
                {/* Upper bar */}
                <div className="flex justify-between items-center text-white text-[10px] pt-1.5 opacity-90 font-mono">
                  <span>PGS Agency Live</span>
                  <div className="flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded-full text-[9px] animate-pulse">
                    <span>RECORDING</span>
                  </div>
                </div>

                {/* Floating graphic overlay - Content pillars */}
                <div className="space-y-2 mt-12">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 text-white border border-white/10 shadow-lg animate-bounce duration-1000">
                    <span className="text-[10px] font-mono text-amber-300 block font-bold uppercase tracking-wider">Pillar 1: Strategy</span>
                    <span className="text-xs font-medium block">CEO Định vị thương hiệu cá nhân</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 text-white border border-white/10 shadow-lg delay-200">
                    <span className="text-[10px] font-mono text-emerald-400 block font-bold uppercase tracking-wider">Series</span>
                    <span className="text-xs font-medium block">30 Ngày Tái Định Cấu Trúc B2B</span>
                  </div>
                </div>

                {/* Video UI details bottom */}
                <div className="text-white space-y-2.5 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-[#C5933A] bg-[#FCF9F0] flex items-center justify-center text-[#C5933A] text-xs font-bold">
                      PGS
                    </div>
                    <div>
                      <p className="text-xs font-semibold">@pgs_agency_growth</p>
                      <p className="text-[10px] text-slate-300">Hệ thống Xây Kênh Định Hướng</p>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-200">
                    Bí quyết viết kịch bản 60 giây thu về 120 leads chất lượng mà không cần nhảy trend... <span className="font-bold text-amber-300">#tiktokb2b</span>
                  </p>
                  
                  {/* Music bar */}
                  <div className="flex justify-between items-center bg-black/40 backdrop-blur-xs p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-[9px]">
                      <Play className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>Âm thanh gốc - PGS Studio 4K</span>
                    </div>
                    <div className="flex gap-0.5 items-end">
                      <div className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                      <div className="w-0.5 h-4 bg-amber-300" />
                      <div className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                      <div className="w-0.5 h-3.5 bg-amber-300" />
                    </div>
                  </div>
                </div>

                {/* Vertical action bar right side */}
                <div className="absolute right-3 bottom-28 flex flex-col gap-4 text-white text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-black/60 cursor-pointer">
                      ❤️
                    </div>
                    <span className="text-[9px] mt-1 font-mono">14.5K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-black/60 cursor-pointer">
                      💬
                    </div>
                    <span className="text-[9px] mt-1 font-mono">1.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-black/60 cursor-pointer">
                      📥
                    </div>
                    <span className="text-[9px] mt-1 font-mono">342</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting Card: Float Live Stats */}
            <div className="absolute bottom-6 right-[-20px] bg-white border border-[#EEDDAB]/55 p-3 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-pulse">
              <div className="bg-emerald-500 text-white rounded-full p-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">RETENTION RATE</span>
                <span className="text-sm font-bold text-emerald-600 font-mono">+82.4% Avg</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 2: XÂY KÊNH TIKTOK LÀ GÌ */}
      <section id="xay-kenh-tiktok-la-gi" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Khái Niệm Cốt Lõi</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Xây kênh TikTok có định hướng là gì?
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Nâng tầm tư duy xây dựng nội dung: Không chỉ dừng lại ở việc quay và đăng video, đó là cả một quy trình đồng hành chiến lược toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tư vấn & Định vị */}
          <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-6 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#FCF9F0] border border-[#EEDDAB]/50 flex items-center justify-center text-[#C5933A]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1E293B] font-display">Tư vấn Chiến lược & Định vị</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nghiên cứu thị trường sâu rộng, bóc tách tệp đối thủ trực tiếp, thiết kế chân dung khán giả độc quyền và lập bộ khuôn tính cách kênh nhất quán cho CEO & thương hiệu.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#C5933A] flex items-center gap-1 font-mono">
              BƯỚC 1: ĐỊNH HÌNH THƯƠNG HIỆU
            </div>
          </div>

          {/* Card 2: Quy hoạch Content Pillar & Series */}
          <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-6 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#FCF9F0] border border-[#EEDDAB]/50 flex items-center justify-center text-[#C5933A]">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1E293B] font-display">Cấu trúc Content Pillar & Series</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quy hoạch nội dung khoa học thành các nhóm chủ đề cụ thể (Pillars) và đóng gói thành từng loạt series dễ xem nhằm thiết lập niềm tin sâu vững, kích thích lướt xem tiếp tập sau.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#C5933A] flex items-center gap-1 font-mono">
              BƯỚC 2: QUY HOẠCH PHÂN LỚP
            </div>
          </div>

          {/* Card 3: Biên kịch, Quay Dựng & Tối ưu */}
          <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-6 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#FCF9F0] border border-[#EEDDAB]/50 flex items-center justify-center text-[#C5933A]">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1E293B] font-display">Sản xuất Hậu kỳ & SEO Phễu Leads</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Viết kịch bản lời thoại 100% tỉ mỉ, đạo diễn chỉ dẫn diễn xuất, ghi hình chuẩn 4K tại studio PGS và biên tập hậu kỳ kịch tính. Sau đó đăng bài chuẩn SEO và tối ưu link sinh phễu thu lead.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#C5933A] flex items-center gap-1 font-mono">
              BƯỚC 3: SẢN XUẤT CHUYỂN ĐỔI
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 3: KHÁC GÌ ĐĂNG VIDEO NGẪU NHIÊN */}
      <section id="khac-gi-dang-video-ngau-nhien" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="bg-white border border-[#EEDDAB]/40 rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Bản Đối Chiếu Thực Tế</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Tại sao bạn tự làm hoài không ra kết quả?
            </h2>
            <p className="text-sm text-slate-500">
              Sự khác biệt cốt tử nằm ở việc đăng bài theo cảm hứng rời rạc và việc xây dựng cả một hệ thống phễu nội dung dài hạn tại PGS Agency.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#EEDDAB]/20 text-xs font-mono font-bold text-slate-500 uppercase">
                  <th className="py-4 px-6 font-semibold">TIÊU CHÍ SO SÁNH</th>
                  <th className="py-4 px-6 font-semibold bg-slate-50 text-slate-600 rounded-t-xl">ĐĂNG TỰ DO / THEO TREND</th>
                  <th className="py-4 px-6 font-semibold bg-[#FCF9F0] text-[#825D1F] rounded-t-xl border-x border-t border-[#EEDDAB]/30">HỆ THỐNG ĐỊNH HƯỚNG PGS AGENCY</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-6 font-semibold font-display text-slate-800">1. Mục tiêu tối thượng</td>
                  <td className="py-4 px-6 bg-slate-50 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Chạy theo view ảo, tim ảo của người xem vãng lai
                  </td>
                  <td className="py-4 px-6 bg-[#FCF9F0]/40 border-x border-[#EEDDAB]/15 font-semibold text-[#1E293B]">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4 text-[#C5933A] shrink-0" />
                      Tập trung chất lượng người xem để chuyển đổi thành Leads thực sự
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold font-display text-slate-800">2. Cơ sở sáng tạo ý tưởng</td>
                  <td className="py-4 px-6 bg-slate-50 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Copy kịch bản ngẫu nhiên hoặc nhảy theo nhạc thịnh hành
                  </td>
                  <td className="py-4 px-6 bg-[#FCF9F0]/40 border-x border-[#EEDDAB]/15 text-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C5933A] shrink-0" />
                      Xây dựng dựa trên 3 Content Pillars độc bản của thương hiệu
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold font-display text-slate-800">3. Thời gian sản xuất</td>
                  <td className="py-4 px-6 bg-slate-50 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Mỗi ngày quay 1 clip, bối rối không biết nói gì, nản sau 2 tuần
                  </td>
                  <td className="py-4 px-6 bg-[#FCF9F0]/40 border-x border-[#EEDDAB]/15 text-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C5933A] shrink-0" />
                      Quy trình hóa: 1 buổi quay duy nhất bọc gọn lịch đăng cả tháng
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold font-display text-slate-800">4. Trải nghiệm người dùng</td>
                  <td className="py-4 px-6 bg-slate-50 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Xem xong 1 clip rồi lướt đi mất tăm, không có ấn tượng gì thêm
                  </td>
                  <td className="py-4 px-6 bg-[#FCF9F0]/40 border-x border-[#EEDDAB]/15 text-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C5933A] shrink-0" />
                      Xem liên tiếp các tập nhờ quy hoạch Series logic như phim truyền hình
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold font-display text-slate-800">5. Hiệu quả chuyển đổi</td>
                  <td className="py-4 px-6 bg-slate-50 text-slate-500 flex items-center gap-2 rounded-b-xl">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Không đo lường được ROI, đốt tiền chạy Ads vô nghĩa
                  </td>
                  <td className="py-4 px-6 bg-[#FCF9F0] border-x border-b border-[#EEDDAB]/30 text-emerald-700 font-bold rounded-b-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Ra số lượng Leads ổn định và tối ưu chi phí CPA sâu sắc
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* SECTION 4: KHI NÀO NÊN XÂY KÊNH TIKTOK */}
      <section id="khi-nao-nen-xay-kenh-tiktok" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section 4 Left: Text and diagnostics calculator */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Tự Đánh Giá Nhu Cầu</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Khi nào doanh nghiệp & CEO bắt buộc phải bắt tay xây kênh?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bạn có đang gặp những vấn đề dưới đây không? Hãy tích chọn những dấu hiệu để hệ thống tự động chẩn đoán mức độ cần kíp việc đầu tư xây kênh TikTok của doanh nghiệp bạn.
            </p>

            {/* Diagnostic Interactive tool */}
            <div className="bg-[#FCF9F0]/50 border border-[#EEDDAB]/30 rounded-xl p-5 space-y-4">
              <span className="text-xs font-mono font-bold text-[#825D1F] block uppercase mb-1">
                Bảng chẩn đoán sức khỏe tiếp thị
              </span>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 hover:text-[#1E293B]">
                  <input 
                    type="checkbox" 
                    checked={checkedSymptoms.s1} 
                    onChange={() => handleSymptomChange("s1")}
                    className="w-4 h-4 mt-0.5 accent-[#C5933A]" 
                  />
                  <span>Doanh nghiệp bế tắc vì giá chạy Ads tăng vọt, tệp khách loãng.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 hover:text-[#1E293B]">
                  <input 
                    type="checkbox" 
                    checked={checkedSymptoms.s2} 
                    onChange={() => handleSymptomChange("s2")}
                    className="w-4 h-4 mt-0.5 accent-[#C5933A]" 
                  />
                  <span>CEO/Founder muốn xây dựng uy tín cá nhân nhưng bận rộn không có thời gian viết kịch bản.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 hover:text-[#1E293B]">
                  <input 
                    type="checkbox" 
                    checked={checkedSymptoms.s3} 
                    onChange={() => handleSymptomChange("s3")}
                    className="w-4 h-4 mt-0.5 accent-[#C5933A]" 
                  />
                  <span>Chuyên gia/KOL chia sẻ kiến thức hữu ích nhưng video thô sơ, ít tương tác, không có tính giữ chân.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 hover:text-[#1E293B]">
                  <input 
                    type="checkbox" 
                    checked={checkedSymptoms.s4} 
                    onChange={() => handleSymptomChange("s4")}
                    className="w-4 h-4 mt-0.5 accent-[#C5933A]" 
                  />
                  <span>Thương hiệu cần tệp pixel dữ liệu video chất lượng để chạy quảng cáo chuẩn chỉnh.</span>
                </label>
              </div>

              {/* Progress bar indicating score */}
              <div className="space-y-1.5 pt-3 border-t border-[#EEDDAB]/20">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Mức độ khẩn thiết triển khai:</span>
                  <span className="font-mono font-bold text-[#C5933A]">{diagnosticScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#D6A951] to-[#C5933A] h-full transition-all duration-500" 
                    style={{ width: `${diagnosticScore}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  {diagnosticScore > 70 
                    ? "👉 Hệ thống đề xuất: Bạn cần thiết lập lộ trình Xây kênh TikTok ngay lập tức trước khi đối thủ thâu tóm toàn bộ tệp leads." 
                    : "👉 PGS đề xuất: Hãy bắt đầu tìm hiểu xây dựng Content Pillar để chuẩn bị tệp nội dung tích lũy dài hạn."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 Right: Premium visual list of target clients */}
          <div className="lg:col-span-6 space-y-4">
            <div className="border border-slate-100 bg-white p-5 rounded-xl shadow-xs space-y-3">
              <span className="bg-amber-100 text-[#825D1F] text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">NHÓM 1: DOANH NGHIỆP SMEs / B2B</span>
              <h3 className="text-sm font-semibold text-[#1E293B] font-display">Tạo phễu thu nạp khách hàng thông minh</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Giúp các công ty có sản phẩm/dịch vụ đặc thù, giá trị cao tiếp cận đúng đối tượng ra quyết định (CEO, Quản lý) bằng kịch bản chuyên sâu, uy tín.
              </p>
            </div>

            <div className="border border-slate-100 bg-white p-5 rounded-xl shadow-xs space-y-3">
              <span className="bg-indigo-100 text-indigo-700 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">NHÓM 2: CEOs / FOUNDERS / CHUYÊN GIA</span>
              <h3 className="text-sm font-semibold text-[#1E293B] font-display">Xây dựng nhân hiệu độc bản, khẳng định vị thế</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đóng gói chuyên môn đồ sộ của bạn thành từng tập video ngắn bóng bẩy, đưa bạn trở thành tiếng nói uy tín số một trong lĩnh vực của mình.
              </p>
            </div>

            <div className="border border-[#EEDDAB]/40 bg-[#FCF9F0]/30 p-5 rounded-xl shadow-xs space-y-3">
              <span className="bg-amber-100 text-[#825D1F] text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">NHÓM 3: NHÃN HÀNG CAO CẤP / LIFESTYLE</span>
              <h3 className="text-sm font-semibold text-[#1E293B] font-display">Duy mỹ và truyền cảm xúc đẳng cấp thương hiệu</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sử dụng hình ảnh đậm chất cinematic nghệ thuật, âm thanh đắt giá để khơi dậy khát vọng sở hữu của tệp khách hàng có thu nhập cao.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 5: ĐỊNH VỊ KÊNH (CHANNELS POSITIONING MATRIX) */}
      <section id="dinh-vi-kenh" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Bản Đồ Ma Trận Định Vị</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Chiến lược định vị kênh độc quyền từng ngành
          </h2>
          <p className="text-sm text-slate-500">
            PGS Agency không áp đặt một mẫu rập khuôn. Hãy chọn lĩnh vực hoạt động của bạn bên dưới để xem thiết kế bản đồ định vị mẫu được PGS dày công nghiên cứu.
          </p>
        </div>

        {/* Dynamic tabs for Niches */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {NICHES.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveNicheId(n.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                activeNicheId === n.id
                  ? "bg-[#C5933A] border-[#C5933A] text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#EEDDAB] hover:text-[#C5933A]"
              }`}
            >
              {n.name}
            </button>
          ))}
        </div>

        {/* Matrix card detail display */}
        <div className="bg-white border border-[#EEDDAB]/30 rounded-2xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-[#825D1F] block uppercase">
              KHUNG ĐỊNH VỊ CHO: <span className="text-[#C5933A]">{activeNiche.name}</span>
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">1. Độc Giả Mục Tiêu (Audience)</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{activeNiche.audience}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">2. Tính Cách Kênh (Brand Persona)</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{activeNiche.persona}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">3. Thông Điệp Cốt Lõi (Core Message)</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium font-display text-[#825D1F]">{activeNiche.coreMessage}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">4. Điểm Khác Biệt (Differentiation)</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{activeNiche.differentiation}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">5. Lời Gọi Hành Động Mềm (CTA)</span>
                <p className="text-xs font-semibold text-slate-800">{activeNiche.cta}</p>
              </div>
              <a 
                href="#cta-cuoi-trang" 
                className="bg-[#FCF9F0] hover:bg-[#F7EFD7] text-[#825D1F] border border-[#EEDDAB]/50 text-xs px-4 py-2 rounded-lg font-medium transition-colors font-mono"
              >
                Nhận Chiến Lược Ngành &gt;
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-100 text-center space-y-4">
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">ĐỀ TÀI VIDEO ĐỀ XUẤT MẪU</span>
            <div className="bg-white border border-[#EEDDAB]/30 p-4 rounded-lg shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C5933A]" />
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                “{activeNiche.exampleTopic}”
              </p>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              *Tập trung phân tích sâu vào số liệu thực địa kết hợp visual whiteboard để bộc lộ rõ uy tín trình độ của chuyên gia.
            </p>
            <div className="flex justify-center gap-1.5 pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5933A]" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 6: CONTENT PILLAR TIKTOK */}
      <section id="content-pillar-tiktok" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Circular Orbit layout - Left */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <span className="text-xs font-mono font-bold text-slate-400 block uppercase mb-6 text-center">SƠ ĐỒ HỆ THỐNG PILLARS TỶ LỆ VÀNG (PGS)</span>
            
            {/* The Visual Circular Orbit Representation */}
            <div className="relative w-64 h-64 border-2 border-dashed border-[#EEDDAB]/40 rounded-full flex items-center justify-center animate-spin duration-30000">
              {/* Inner core */}
              <div className="absolute w-20 h-20 bg-[#FCF9F0] border-2 border-[#C5933A] rounded-full flex items-center justify-center shadow-lg text-[#825D1F] font-bold text-xs text-center z-10 font-display">
                PGS CORES
              </div>
              
              {/* Floating Orbit items (4 Pillars) */}
              {PILLARS.map((p, idx) => {
                const angles = [0, 90, 180, 270];
                const angle = angles[idx];
                const radius = 100; //px
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <button
                    key={idx}
                    onClick={() => setActivePillarIdx(idx)}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border shadow-md transition-all cursor-pointer ${
                      activePillarIdx === idx
                        ? "bg-[#C5933A] text-white border-[#C5933A] scale-110"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#C5933A]"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)`, // cancel rotation for readability
                    }}
                  >
                    {p.ratio}%
                  </button>
                );
              })}
            </div>
            
            <p className="text-[10px] text-slate-400 mt-6 text-center italic max-w-xs">
              *Tỷ lệ vàng đảm bảo sự cân bằng hoàn hảo giữa tính giáo dục, niềm tin, tính nhân văn và năng lực thu về Lead.
            </p>
          </div>

          {/* Details column - Right */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Quy Hoạch Ý Tưởng</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Phân bổ dòng ý tưởng mạch lạc bằng hệ thống Pillar khoa học
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nhấp vào từng nhóm tỷ lệ phần trăm bên trái hoặc danh sách bên dưới để xem chi tiết cách PGS quy hoạch phân lớp chủ đề cho bạn.
            </p>

            {/* List selector */}
            <div className="space-y-3">
              {PILLARS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePillarIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    activePillarIdx === idx
                      ? "bg-[#FCF9F0] border-[#EEDDAB] shadow-xs"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-xs font-semibold text-slate-800">{p.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activePillarIdx === idx ? "rotate-90 text-[#C5933A]" : ""}`} />
                </button>
              ))}
            </div>

            {/* Active Pillar Card details */}
            <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-5 space-y-3 shadow-xs">
              <span className="text-[10px] font-mono text-[#825D1F] block font-bold uppercase">ĐỊNH HƯỚNG FORMAT & SẢN XUẤT:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{activePillar.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-400 block text-[9px] uppercase">Format Quay dựng phù hợp:</span>
                  <span className="text-slate-600">{activePillar.videoFormat}</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-[#C5933A] block text-[9px] uppercase">Đề tài ví dụ:</span>
                  <span className="text-slate-800 font-semibold">“{activePillar.example}”</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 7: FORMAT SERIES */}
      <section id="format-series" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="bg-[#FCF9F0]/30 border border-[#EEDDAB]/30 rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Giải Pháp Quy Hoạch Loạt Bài</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Đóng gói nội dung thành chuỗi Series lôi cuốn
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bí mật để giữ chân người xem cuồng nhiệt lướt xem hết tập này đến tập khác nằm ở cách đóng gói nội dung như phim dài tập. Xem các Series mẫu của PGS:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector col */}
            <div className="lg:col-span-5 space-y-3">
              {SERIES_PATHS.map((path, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSeriesIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    activeSeriesIdx === idx
                      ? "bg-white border-[#C5933A] shadow-md"
                      : "bg-white/40 border-slate-200 hover:border-[#EEDDAB]"
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold text-[#C5933A] block uppercase mb-1">SERIES CONCEPT 0{idx + 1}</span>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">{path.title}</h3>
                  <div className="mt-2.5 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                    <span>⏱️ {path.duration}</span>
                    <span>🎯 {path.hookType}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Flow display col */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 space-y-6 shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">MỤC TIÊU CHIẾN LƯỢC:</span>
                <p className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">{activeSeries.objective}</p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#825D1F] block font-bold uppercase">BẢN ĐỒ CHI TIẾT CÁC TẬP CHỦ CHỐT (SERIES MAP):</span>
                
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-[#EEDDAB]/50">
                  {activeSeries.steps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute left-[-21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5933A] border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {step}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        *Tập trung phân rã nỗi đau hành vi và kêu gọi lead nhẹ nhàng cuối video.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 8: HOOK ENGINE (AI GENERATED HOOKS INTERACTIVE MODULE) */}
      <section id="hook-and-cta" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section 8 Left: Form controller */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Trải Nghiệm Studio Thực Tế</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Trải nghiệm công cụ tạo Hook 3 giây đầu bằng Trí tuệ nhân tạo
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              3 giây đầu tiên quyết định tỷ lệ lướt qua video. Hãy trải nghiệm cách PGS Agency biên soạn nội dung: Nhập đề tài của bạn và chọn Content Pillar phù hợp để Gemini AI tự động viết 3 tiêu đề chuyển đổi cao.
            </p>

            <form onSubmit={handleGenerateHooks} className="space-y-4 bg-white border border-[#EEDDAB]/30 p-6 rounded-2xl shadow-xs">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase block">Chủ đề của bạn (Ví dụ: tuyển dụng nhân sự, bán bất động sản...)</label>
                <input 
                  type="text" 
                  value={hookTopic}
                  onChange={(e) => setHookTopic(e.target.value)}
                  placeholder="Gõ chủ đề của bạn vào đây..." 
                  className="w-full text-xs px-4 py-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5933A] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase block">Content Pillar</label>
                  <select 
                    value={hookPillar}
                    onChange={(e) => setHookPillar(e.target.value)}
                    className="w-full text-xs px-3 py-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5933A] text-slate-700 bg-white"
                  >
                    <option>Kiến thức / Giáo dục</option>
                    <option>Trải nghiệm / Case Study thành công</option>
                    <option>Hậu trường / Văn hóa doanh nghiệp</option>
                    <option>Giới thiệu giải pháp / Bán hàng</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    disabled={hookLoading}
                    className="w-full bg-[#C5933A] hover:bg-[#A87A2B] text-white px-5 py-3 rounded-lg font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {hookLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang khởi tạo Hook...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Tạo 3 Hook Cao Cấp Với AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Section 8 Right: Visual outputs simulation */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#1E293B] text-slate-100 rounded-2xl p-5 border border-[#EEDDAB]/30 shadow-xl space-y-4 max-w-[400px] mx-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-[#C5933A] tracking-wider font-bold">HOOOK GENERATOR PREVIEW</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-mono px-2 py-0.5 rounded-full font-bold">ACTIVE API</span>
              </div>

              {!hookResults && !hookLoading && (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-[#C5933A] opacity-75" />
                  <p className="text-xs font-semibold">Chưa có kết quả sinh Hook</p>
                  <p className="text-[10px] text-slate-500 max-w-[240px] mx-auto">Hãy gõ chủ đề và bấm nút tạo ở bên cạnh để khởi động mô hình AI của PGS Agency.</p>
                </div>
              )}

              {hookLoading && (
                <div className="py-12 text-center text-slate-400 space-y-4">
                  <div className="w-10 h-10 border-4 border-[#C5933A] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono">Đang kết nối Server-Side Gemini...</p>
                </div>
              )}

              {hookResults && (
                <div className="space-y-4 animate-fade-in text-xs max-h-[350px] overflow-y-auto pr-1">
                  {hookResults.isFallback && (
                    <div className="bg-[#FCF9F0] border border-[#EEDDAB]/40 p-2.5 rounded-lg text-slate-800 text-[10px] leading-normal mb-2">
                      💡 <b>Lưu ý:</b> Đang hiển thị các Hook mẫu tối ưu do Gemini API Key chưa được gắn. Kết quả vẫn đạt tiêu chuẩn chất lượng cao của PGS!
                    </div>
                  )}

                  <div className="space-y-3.5">
                    {hookResults.hooks.map((h, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2">
                        <div className="flex justify-between text-[9px] font-mono font-bold">
                          <span className="text-amber-400">HOOOOK #0{i + 1}</span>
                          <span className="text-slate-500">CT: {h.formula}</span>
                        </div>
                        <p className="text-xs font-semibold text-white leading-relaxed">“{h.text}”</p>
                        <div className="text-[10px] text-slate-400 leading-normal bg-slate-950 p-2 rounded-md border border-slate-800">
                          🎬 <span className="font-bold text-slate-300">Góc quay:</span> {h.visual}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                    🎯 <b>Phân tích hành vi:</b> {hookResults.rationale}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 9: KỊCH BẢN VIDEO (AI SCRIPT GENERATOR INTERACTIVE MODULE) */}
      <section id="kich-ban-video" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="bg-white border border-[#EEDDAB]/30 rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Giải Pháp Biên Tập Nội Dung</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Xây dựng kịch bản video ngắn giữ chân khán giả đến giây cuối cùng
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              PGS áp dụng quy trình kịch bản khoa học: <b>Hook → Problem → Insight → Solution → Example → CTA</b>. Thử nghiệm tự xây dựng kịch bản chi tiết dựa trên chủ đề của bạn:
            </p>
          </div>

          <form onSubmit={handleGenerateScript} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-50 p-5 rounded-xl border border-slate-100">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase block">Đề tài cốt lõi muốn biên soạn</label>
              <input 
                type="text" 
                value={scriptTopic}
                onChange={(e) => setScriptTopic(e.target.value)}
                placeholder="Ví dụ: Lợi thế của ERP với doanh nghiệp sản xuất..." 
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5933A] text-slate-800 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase block">Thời lượng</label>
              <select 
                value={scriptDuration}
                onChange={(e) => setScriptDuration(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 text-slate-700 bg-white"
              >
                <option>45 giây</option>
                <option>60 giây</option>
                <option>90 giây</option>
              </select>
            </div>
            <div>
              <button 
                type="submit"
                disabled={scriptLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {scriptLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Biên soạn kịch bản</span>
              </button>
            </div>
          </form>

          {/* Script Results display */}
          {scriptLoading && (
            <div className="py-16 text-center space-y-4 border border-dashed border-slate-200 rounded-xl">
              <div className="w-12 h-12 border-4 border-[#C5933A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Biên kịch PGS đang xử lý cấu trúc kịch bản chuyển đổi...</p>
            </div>
          )}

          {!scriptResult && !scriptLoading && (
            <div className="text-center py-12 border border-dashed border-slate-100 rounded-xl bg-slate-50/40 text-slate-400">
              <AlertCircle className="w-8 h-8 mx-auto text-[#C5933A] mb-2 opacity-75" />
              <p className="text-xs font-semibold">Chưa khởi tạo kịch bản chi tiết</p>
              <p className="text-[10px] text-slate-400 mt-1">Gõ chủ đề và bấm biên soạn để hiển thị cấu trúc Timeline kịch bản.</p>
            </div>
          )}

          {scriptResult && !scriptLoading && (
            <div className="space-y-6 animate-fade-in">
              {scriptResult.isFallback && (
                <div className="bg-[#FCF9F0] border border-[#EEDDAB]/50 p-3 rounded-lg text-slate-800 text-xs">
                  💡 <b>Lưu ý:</b> Đang hiển thị kịch bản tối ưu hóa tiêu chuẩn PGS do Gemini API chưa được kết nối trực tiếp. Bản thảo này đã được kiểm nghiệm tỷ lệ giữ chân thực tế đạt trên 78%!
                </div>
              )}

              <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <span className="text-[9px] font-mono text-[#C5933A] font-bold uppercase block">KỊCH BẢN CHI TIẾT ĐÃ BIÊN SOẠN</span>
                  <h3 className="text-base font-bold text-slate-800">Tiêu đề video: {scriptResult.title}</h3>
                </div>
                <span className="bg-[#FCF9F0] text-[#825D1F] border border-[#EEDDAB]/30 text-[10px] px-3 py-1 rounded-full font-mono font-semibold">
                  Pillar: {scriptResult.pillar}
                </span>
              </div>

              {/* Steps timeline table representation */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-100 min-w-[700px]">
                  <thead>
                    <tr className="text-slate-400 font-mono text-[10px] uppercase font-bold">
                      <th className="py-2.5 px-3">Giai đoạn (Phase)</th>
                      <th className="py-2.5 px-3 w-16">Thời gian</th>
                      <th className="py-2.5 px-4 w-1/3">Lời thoại (Spoken word)</th>
                      <th className="py-2.5 px-4 w-1/3">Hành động visual & text</th>
                      <th className="py-2.5 px-3">Âm thanh & SFX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {scriptResult.scriptSteps.map((step, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 font-semibold font-display text-slate-800">{step.phase}</td>
                        <td className="py-3 px-3 font-mono text-[#825D1F] font-semibold">{step.duration}</td>
                        <td className="py-3 px-4 leading-relaxed font-sans">{step.spokenText}</td>
                        <td className="py-3 px-4 leading-relaxed text-slate-500 italic">{step.visualAction}</td>
                        <td className="py-3 px-3 text-[#C5933A] font-mono text-[10px]">{step.audioSound}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Direct Tips */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 items-start">
                <Sparkles className="w-5 h-5 text-[#C5933A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase mb-0.5">Lời khuyên của chuyên gia sản xuất PGS:</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{scriptResult.tips}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>


      {/* SECTION 10: LỊCH ĐĂNG (VIDEO CALENDAR BOARD) */}
      <section id="lich-dang" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Kỷ Luật Triển Khai</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Hệ thống Video Calendar - Lịch sản xuất đều đặn
          </h2>
          <p className="text-sm text-slate-500">
            Thuật toán TikTok đánh giá cao tính đều đặn (Consistency). PGS thiết lập lịch đăng bài khoa học phân chia theo tuần, kết nối chặt chẽ các Series đã định vị. Nhấp chọn ngày bất kỳ dưới đây để xem chi tiết:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Week grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {calendarDays.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedDayIdx === idx
                    ? "bg-[#FCF9F0] border-[#EEDDAB] shadow-md"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#1E293B] font-mono">{c.day}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    c.status === "Đã đăng" ? "bg-emerald-100 text-emerald-700" :
                    c.status === "Lịch quay" ? "bg-blue-100 text-blue-700" :
                    c.status === "Biên tập" ? "bg-amber-100 text-amber-700" :
                    c.status === "Kịch bản" ? "bg-[#EEDDAB]/50 text-[#825D1F]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight line-clamp-1">{c.title}</h4>
                <div className="mt-2 text-[10px] text-slate-400 font-mono flex gap-3">
                  <span>Pillar: {c.pillar}</span>
                  <span>⏱️ {c.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right day description details */}
          <div className="lg:col-span-5 bg-white border border-[#EEDDAB]/30 rounded-xl p-6 shadow-xs space-y-4">
            {selectedDayIdx !== null ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">BẢN TIN PHÁT SÓNG CHI TIẾT</span>
                    <h3 className="text-sm font-bold text-slate-800 mt-1">Lịch Trình: {calendarDays[selectedDayIdx].day}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C5933A] bg-[#FCF9F0] px-2.5 py-1 rounded">
                    {calendarDays[selectedDayIdx].duration}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase mb-1">Đề tài xuất bản:</span>
                    <p className="font-semibold text-slate-800 leading-relaxed">
                      “{calendarDays[selectedDayIdx].title}”
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase mb-1">Mục tiêu tăng trưởng:</span>
                    <p className="text-slate-600 leading-relaxed">
                      {calendarDays[selectedDayIdx].pillar === "Nghỉ ngơi" 
                        ? "Nghỉ ngơi tái tạo năng lượng sản xuất cho ê-kíp." 
                        : "Phục vụ việc chứng minh năng lực thương hiệu, tháo gỡ nghi ngờ trong tư duy đầu tư của khách hàng mục tiêu."
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase mb-1">Thống kê/Dự báo view:</span>
                    <p className="font-mono font-bold text-emerald-600">
                      {calendarDays[selectedDayIdx].views}
                    </p>
                  </div>
                </div>

                <div className="bg-[#FCF9F0]/40 p-3 rounded-lg border border-[#EEDDAB]/30 text-[10px] text-[#825D1F] leading-normal italic">
                  *Được lập thời gian đăng tự động thông qua phần mềm tối ưu giờ vàng TikTok lúc 11:30 sáng, chuẩn SEO từ khóa chính.
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400">
                Hãy bấm một ngày trong tuần ở danh sách bên cạnh để xem báo cáo chi tiết.
              </div>
            )}
          </div>
        </div>
      </section>


      {/* SECTION 11: KPI TIKTOK CHANNEL (KPI CALCULATOR SIMULATOR) */}
      <section id="kpi-tiktok-channel" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section 11 Left: Text & slider */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Đo Lường Sự Hiệu Quả</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
              Hệ thống KPI tập trung vào kết quả kinh doanh thực tế
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              PGS không đi khoe những con số views triệu view ảo không có tính chuyển đổi. Chúng tôi đo lường số lượt bấm tìm hiểu thông tin doanh nghiệp (Profile Clicks), tỷ lệ giữ chân người xem (Retention Rate) và số lượng Leads thực thu về.
            </p>

            <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-5 space-y-4 shadow-xs">
              <span className="text-xs font-mono font-bold text-slate-500 block uppercase">
                Bảng Giả Lập Tính Toán Chuyển Đổi Doanh Số
              </span>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700">Lượt Xem Mục Tiêu Hàng Tháng:</span>
                  <span className="font-mono font-bold text-[#C5933A] text-sm">
                    {simulatedViews.toLocaleString("vi-VN")} Views
                  </span>
                </div>
                <input 
                  type="range" 
                  min="20000" 
                  max="1000000" 
                  step="20000"
                  value={simulatedViews}
                  onChange={(e) => setSimulatedViews(Number(e.target.value))}
                  className="w-full accent-[#C5933A] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-mono">CLICKS VÀO BIO LINK (2.5%)</span>
                  <span className="text-base font-bold text-slate-800 font-mono">{simulatedClicks} Clicks</span>
                </div>
                <div className="bg-[#FCF9F0] p-2.5 rounded-lg border border-[#EEDDAB]/30">
                  <span className="text-[10px] text-[#825D1F] block font-mono">LEADS CHẤT LƯỢNG (12%)</span>
                  <span className="text-base font-bold text-[#C5933A] font-mono">~{simulatedLeads} Leads</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 11 Right: Visual KPI Stats charts */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">TỶ LỆ GIỮ CHÂN (RETENTION)</span>
              <span className="text-xl font-bold text-[#1E293B] block font-mono">60% - 82%</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Gấp 4 lần so với mức trung bình ngành nhờ cấu trúc kịch bản có cao trào.
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FCF9F0] flex items-center justify-center text-[#C5933A]">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">TỶ LỆ CLICK VÀO BIO</span>
              <span className="text-xl font-bold text-[#C5933A] block font-mono">2.5% - 4.1%</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Điều hướng mượt mà, kêu gọi hành động (CTA) tinh gọn không phản cảm.
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">CHI PHÍ MỖI LEAD (CPA)</span>
              <span className="text-xl font-bold text-slate-800 block font-mono">Giảm 40%</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Sử dụng Spark Ads đẩy từ nội dung hữu ích tự nhiên của kênh.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl shadow-xs space-y-2 border border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 block font-bold uppercase">CAM KẾT CỦA PGS</span>
              <span className="text-base font-bold text-white block font-display">Tăng Trưởng Bền Vững</span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 12: DỰ ÁN THỰC TẾ TIKTOK CHANNEL (CASE STUDIES) */}
      <section id="du-an-thuc-te-tiktok-channel" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Dữ Liệu Khách Hàng Thực Tế</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Những câu chuyện thành công từ đối tác của PGS
          </h2>
          <p className="text-sm text-slate-500">
            Minh bạch hóa kết quả: Xem chi tiết các dự án xây kênh có định hướng do PGS đồng hành trực tiếp biên soạn nội dung và đạo diễn sản xuất:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#EEDDAB]/30 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* Case selector left col */}
          <div className="lg:col-span-4 space-y-3">
            {CASE_STUDIES.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCaseIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                  activeCaseIdx === idx
                    ? "bg-[#FCF9F0] border-[#C5933A] shadow-md"
                    : "bg-white border-slate-100 hover:border-[#EEDDAB]"
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#EEDDAB]/50 relative">
                  <Image 
                    src={c.image} 
                    alt={c.clientName} 
                    width={40}
                    height={40}
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{c.clientName}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{c.niche}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active case detail right col */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
              <div>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">CASE STUDY CHI TIẾT</span>
                <h3 className="text-base font-bold text-slate-800">{activeCase.clientName}</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-mono font-bold">
                Thời gian triển khai: {activeCase.duration}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-4 rounded-xl border border-slate-100">
              {activeCase.story}
            </p>

            {/* KPI grid counts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-[#FCF9F0] p-3 rounded-lg border border-[#EEDDAB]/30">
                <span className="text-[10px] text-slate-500 block font-mono">FOLLOWERS TĂNG</span>
                <span className="text-base font-bold text-[#C5933A] font-mono">{activeCase.followersGained}</span>
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <span className="text-[10px] text-slate-500 block font-mono">TỔNG LƯỢT XEM</span>
                <span className="text-base font-bold text-slate-800 font-mono">{activeCase.viewsTotal}</span>
              </div>
              <div className="bg-[#FCF9F0]/60 p-3 rounded-lg border border-[#EEDDAB]/20">
                <span className="text-[10px] text-[#825D1F] block font-mono">LEADS THU VỀ</span>
                <span className="text-xs font-bold text-[#825D1F] line-clamp-2 leading-tight">{activeCase.leadsGenerated}</span>
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <span className="text-[10px] text-slate-500 block font-mono">DOANH SỐ CHUYỂN ĐỔI</span>
                <span className="text-base font-bold text-emerald-600 font-mono">{activeCase.conversionIncrease}</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 13: GÓI DỊCH VỤ (PACKAGE CARDS & ROI ESTIMATOR) */}
      <section id="goi-dich-vu" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Giải Pháp Toàn Diện</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Bảng báo giá dịch vụ đồng hành xây kênh
          </h2>
          <p className="text-sm text-slate-500">
            PGS cung cấp 3 giải pháp phân cấp rõ ràng theo mục tiêu tăng trưởng và quy mô doanh nghiệp của bạn.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          {PACKAGES.map((pkg, idx) => {
            const isFeatured = idx === 1; // Channel Builder
            return (
              <div 
                key={idx}
                onClick={() => setSelectedPlanIdx(idx)}
                className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all space-y-6 cursor-pointer relative ${
                  isFeatured 
                    ? "border-2 border-[#C5933A] scale-102 lg:translate-y-[-8px] bg-radial from-[#FCF9F0]/10 to-white" 
                    : "border-[#EEDDAB]/30"
                }`}
              >
                {isFeatured && (
                  <span className="absolute top-[-12px] right-6 bg-[#C5933A] text-white text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase shadow-md">
                    Khuyên dùng nhiều nhất
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">{pkg.badge}</span>
                  <h3 className="text-lg font-bold text-slate-800 font-display">{pkg.name}</h3>
                  <p className="text-2xl font-mono font-bold text-[#C5933A]">{pkg.price}</p>
                  <p className="text-[11px] text-slate-500 leading-normal">{pkg.description}</p>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Hạng mục triển khai:</span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5933A] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] space-y-1">
                  <span className="font-mono font-bold text-slate-400 block uppercase">Phù hợp nhất cho:</span>
                  <p className="text-slate-600 leading-relaxed font-medium">{pkg.recommendedFor}</p>
                </div>

                <a 
                  href="#cta-cuoi-trang"
                  className={`w-full block py-3 rounded-lg text-center font-medium text-xs shadow-xs transition-all ${
                    isFeatured 
                      ? "bg-[#C5933A] hover:bg-[#A87A2B] text-white" 
                      : "border border-[#C5933A] hover:bg-[#FCF9F0]/30 text-[#1E293B]"
                  }`}
                >
                  Chọn gói & Nhận tư vấn
                </a>
              </div>
            );
          })}
        </div>

        {/* Dynamic ROI and cost estimator module */}
        <div className="bg-[#FCF9F0]/30 border border-[#EEDDAB]/40 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#EEDDAB]/20 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#825D1F] font-bold uppercase block">BẢNG ƯỚC LƯỢNG LỢI NHUẬN ĐẦU TƯ (ROI)</span>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Phương án dự kiến: <span className="text-[#C5933A]">{selectedPlan.name}</span> ({selectedPlan.price})
              </h3>
            </div>
            <span className="bg-white border border-[#EEDDAB]/40 text-[#825D1F] text-xs font-mono font-bold px-3 py-1 rounded-full">
              PGS Growth Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Khi đầu tư xây kênh, lượng lead tích lũy hàng tháng sẽ là tài sản chuyển đổi. Điều chỉnh tỷ lệ chốt sales từ tệp lead sạch của PGS bên dưới để ước lượng ROI doanh nghiệp của bạn:
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-semibold">Tỷ lệ chốt hợp đồng từ Leads:</span>
                  <span className="font-mono font-bold text-[#C5933A]">{calcConversionRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="1"
                  value={calcConversionRate}
                  onChange={(e) => setCalcConversionRate(Number(e.target.value))}
                  className="w-full accent-[#C5933A] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block italic">*Mức trung bình ngành B2B/Dịch vụ dao động từ 2% - 5%.</span>
              </div>
            </div>

            <div className="bg-white border border-[#EEDDAB]/30 rounded-xl p-5 grid grid-cols-2 gap-4 text-center items-center shadow-xs">
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">DỰ KIẾN HỢP ĐỒNG MỚI (THÁNG)</span>
                <span className="text-lg font-bold text-slate-800 font-mono">~{estimatedNewClients} Hợp đồng</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">ƯỚC LƯỢNG DOANH THU MANG VỀ</span>
                <span className="text-lg font-bold text-[#C5933A] font-mono">{computedReturn.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="col-span-2 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Giá trị ROI ròng (Doanh số - Chi phí):</span>
                <span className={`font-mono font-bold ${computedROI >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {computedROI.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 14: FAQ MỞ RỘNG (ACCORDION FAQ) */}
      <section id="faq-mo-rong" className="max-w-3xl mx-auto px-4 scroll-mt-24">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Giải Đáp Thắc Mắc</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Những câu hỏi thường gặp khi làm việc cùng PGS
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-[#EEDDAB]/30 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setExpandedFaqIdx(isExpanded ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <span className="text-xs font-bold text-[#1E293B] font-display leading-tight">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5933A] shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
                
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 font-sans animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 15: DỊCH VỤ LIÊN QUAN */}
      <section id="dich-vu-lien-quan" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold text-[#C5933A] tracking-widest uppercase font-mono">Hệ Sinh Thái Tiếp Thị</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1E293B]">
            Các giải pháp bổ trợ bứt phá doanh số
          </h2>
          <p className="text-sm text-slate-500">
            Hệ thống marketing đa kênh đồng bộ giúp gia tăng sức mạnh tiếp cận, tối ưu hóa điểm chạm chuyển đổi của khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all">
            <span className="text-[8px] font-mono font-bold bg-[#FCF9F0] text-[#825D1F] px-2 py-0.5 rounded-full uppercase">ADS SYSTEM</span>
            <h3 className="text-xs font-bold text-slate-800 font-display">Dịch vụ TikTok Ads</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Tối ưu chi phí CPA, bùng nổ đơn hàng bằng các chiến dịch quảng cáo Spark Ads, Lead Gen thông minh kết hợp video ngắn.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all">
            <span className="text-[8px] font-mono font-bold bg-[#FCF9F0] text-[#825D1F] px-2 py-0.5 rounded-full uppercase">SEO SYSTEM</span>
            <h3 className="text-xs font-bold text-slate-800 font-display">Dịch vụ SEO tổng thể</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Thống lĩnh thứ hạng tìm kiếm bền vững trên Google, mang lại nguồn truy cập khách hàng tiềm năng tự nhiên khổng lồ.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all">
            <span className="text-[8px] font-mono font-bold bg-[#FCF9F0] text-[#825D1F] px-2 py-0.5 rounded-full uppercase">SOCIAL WRITING</span>
            <h3 className="text-xs font-bold text-slate-800 font-display">Content Social & Media</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Chăm sóc fanpage Facebook, Instagram chuyên sâu. Giữ lửa tương tác, định hình văn phong thương hiệu đẳng cấp.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all">
            <span className="text-[8px] font-mono font-bold bg-[#FCF9F0] text-[#825D1F] px-2 py-0.5 rounded-full uppercase">CROSS PLATFORM</span>
            <h3 className="text-xs font-bold text-slate-800 font-display">Vận hành đa kênh</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Đồng bộ phân phối video ngắn lên Facebook Reels, Instagram, YouTube Shorts, phủ sóng tối đa dấu chân số thương hiệu.
            </p>
          </div>
        </div>
      </section>


      {/* SECTION 16: CTA CUỐI TRANG & BOOKING CONSULTATION PANEL */}
      <section id="cta-cuoi-trang" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="bg-radial from-[#FCF9F0]/80 to-[#FCFBFA] border border-[#EEDDAB]/50 rounded-3xl p-6 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section 16 Left */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-[#825D1F] block uppercase tracking-widest">
              ĐỒNG HÀNH CÙNG PGS AGENCY
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-medium text-[#1E293B] leading-tight">
              Bạn muốn xây kênh TikTok có định hướng thay vì đăng video ngẫu nhiên?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Đừng để đối thủ bỏ xa trên thị trường video ngắn. Đăng ký nhận lịch đặt hẹn 30 phút tư vấn chiến lược xây kênh độc quyền 1-1 cùng Giám đốc Sáng tạo của PGS Agency.
            </p>
            
            <div className="space-y-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5933A]" />
                <span>Hoàn toàn miễn phí & bảo mật thông tin 100%.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5933A]" />
                <span>Bàn giao bản thảo phác thảo Content Pillar ngay tại buổi tư vấn.</span>
              </div>
            </div>
          </div>

          {/* Section 16 Right: Booking Form */}
          <div className="lg:col-span-6 bg-white border border-[#EEDDAB]/30 rounded-2xl p-6 shadow-md">
            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 font-display border-b border-slate-100 pb-2 mb-4">
                  Đăng Ký Đặt Lịch Hẹn Tư Vấn
                </h3>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Họ và tên của bạn *</label>
                  <input 
                    type="text" 
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Nguyễn Văn A" 
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5933A] text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Số điện thoại liên hệ *</label>
                  <input 
                    type="tel" 
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="0901234567" 
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5933A] text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Tên doanh nghiệp</label>
                    <input 
                      type="text" 
                      value={bookingBusiness}
                      onChange={(e) => setBookingBusiness(e.target.value)}
                      placeholder="PGS Agency" 
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Lĩnh vực hoạt động</label>
                    <select 
                      value={bookingNiche}
                      onChange={(e) => setBookingNiche(e.target.value)}
                      className="w-full text-xs px-2.5 py-2.5 rounded-lg border border-slate-200 text-slate-700 bg-white"
                    >
                      <option value="tech_ceo">CEO Công nghệ / SaaS</option>
                      <option value="b2b_consulting">Chuyên gia Tư vấn B2B</option>
                      <option value="luxury_brand">Nhãn hàng Cao cấp / Lifestyle</option>
                      <option value="real_estate">Founder Bất động sản</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#C5933A] hover:bg-[#A87A2B] text-white py-3 rounded-lg font-medium text-xs shadow-md transition-all cursor-pointer text-center block mt-4"
                >
                  Gửi yêu cầu & Đặt lịch ngay
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 font-display">Gửi Yêu Cầu Thành Công!</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Cảm ơn <b>{bookingName}</b>. Chuyên viên tư vấn tăng trưởng số tại <b>PGS Agency</b> sẽ liên hệ trực tiếp qua số điện thoại <b>{bookingPhone}</b> của bạn trong vòng 15 phút để chốt thời gian họp cụ thể.
                </p>
                <button 
                  onClick={() => {
                    setBookingSubmitted(false);
                    setBookingName("");
                    setBookingPhone("");
                    setBookingBusiness("");
                  }}
                  className="text-xs font-mono font-bold text-[#C5933A] hover:underline cursor-pointer"
                >
                  &lt; Đăng ký cuộc hẹn khác
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
