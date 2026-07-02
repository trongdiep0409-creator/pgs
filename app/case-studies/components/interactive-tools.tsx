'use client';

import React, { useState, useRef, useEffect } from "react";
import { 
  TrendingUp, 
  Search, 
  Percent, 
  BarChart3, 
  MousePointerClick, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Lock, 
  Chrome, 
  Eye, 
  MessageSquare, 
  PlayCircle 
} from "lucide-react";

// ==========================================
// 1. GOOGLE SEARCH CONSOLE SIMULATOR
// ==========================================
type Period = "3m" | "6m" | "12m";

const gscData: Record<Period, {
  clicks: string;
  clicksVal: number;
  impressions: string;
  impressionsVal: number;
  ctr: string;
  ctrVal: number;
  position: string;
  points: number[];
}> = {
  "3m": {
    clicks: "45.2K",
    clicksVal: 45200,
    impressions: "1.2M",
    impressionsVal: 1200000,
    ctr: "3.76%",
    ctrVal: 3.76,
    position: "12.4",
    points: [20, 25, 23, 30, 42, 55, 68, 62, 75, 88, 95, 110]
  },
  "6m": {
    clicks: "112.8K",
    clicksVal: 112800,
    impressions: "3.1M",
    impressionsVal: 3100000,
    ctr: "3.64%",
    ctrVal: 3.64,
    position: "11.1",
    points: [15, 18, 24, 32, 40, 48, 55, 64, 78, 92, 115, 140]
  },
  "12m": {
    clicks: "284.5K",
    clicksVal: 284500,
    impressions: "8.4M",
    impressionsVal: 8400000,
    ctr: "3.39%",
    ctrVal: 3.39,
    position: "9.8",
    points: [10, 14, 20, 28, 42, 50, 68, 85, 110, 145, 180, 220]
  }
};

export function GscSimulator() {
  const [period, setPeriod] = useState<Period>("6m");
  const [activeMetric, setActiveMetric] = useState<"clicks" | "impressions" | "ctr" | "position">("clicks");
  const data = gscData[period];

  const chartPoints = data.points;
  const maxVal = Math.max(...chartPoints);
  const minVal = Math.min(...chartPoints);
  
  // Create beautiful SVG Path
  const width = 800;
  const height = 180;
  const padding = 20;
  
  const pointsString = chartPoints.map((val, index) => {
    const x = padding + (index * (width - padding * 2)) / (chartPoints.length - 1);
    const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  const fillString = `${padding},${height - padding} ${pointsString} ${width - padding},${height - padding}`;

  return (
    <div className="bg-[#FAF9F6] border border-[#C5A880]/20 rounded-xl p-5 md:p-6 shadow-md shadow-amber-500/[0.01]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/5 px-2 py-1 rounded">
            Google Search Console Live Simulation
          </span>
          <h4 className="text-lg font-display text-[#1A1A1A] font-medium mt-1">Đo lường Traffic hữu cơ thực tế</h4>
        </div>
        <div className="flex gap-1.5 bg-[#1A1A1A]/5 p-1 rounded-lg">
          {(["3m", "6m", "12m"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                period === p 
                  ? "bg-white text-[#1A1A1A] shadow-sm font-semibold" 
                  : "text-[#666666] hover:text-[#1A1A1A]"
              }`}
            >
              {p === "3m" ? "3 tháng qua" : p === "6m" ? "6 tháng qua" : "12 tháng qua"}
            </button>
          ))}
        </div>
      </div>

      {/* GSC Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { key: "clicks", label: "Tổng số lượt nhấp", val: data.clicks, icon: MousePointerClick, color: "border-blue-500", textCol: "text-blue-600", bgCol: "bg-blue-500/5" },
          { key: "impressions", label: "Tổng số lượt hiển thị", val: data.impressions, icon: Eye, color: "border-purple-500", textCol: "text-purple-600", bgCol: "bg-purple-500/5" },
          { key: "ctr", label: "CTR trung bình", val: data.ctr, icon: Percent, color: "border-[#D4AF37]", textCol: "text-[#D4AF37]", bgCol: "bg-amber-500/5" },
          { key: "position", label: "Vị trí trung bình", val: data.position, icon: TrendingUp, color: "border-emerald-500", textCol: "text-emerald-600", bgCol: "bg-emerald-500/5" }
        ].map((m) => {
          const Icon = m.icon;
          const isActive = activeMetric === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key as any)}
              className={`text-left p-3.5 rounded-lg border transition-all ${
                isActive 
                  ? `bg-white border-[#D4AF37] shadow-md shadow-amber-500/[0.04]` 
                  : `bg-[#FDFBF7]/60 border-neutral-200 hover:border-neutral-300`
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-[#7A7A7A] font-medium leading-tight">{m.label}</span>
                <Icon className={`w-3.5 h-3.5 ${m.textCol}`} />
              </div>
              <div className={`text-xl font-display font-semibold ${isActive ? "text-[#1A1A1A]" : "text-neutral-700"}`}>
                {m.val}
              </div>
              {isActive && (
                <div className="w-full h-1 bg-[#D4AF37] rounded-full mt-2 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* SVG Chart Panel */}
      <div className="bg-white border border-neutral-100 rounded-lg p-3 md:p-5 relative overflow-hidden">
        <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-[#7A7A7A] bg-white/80 p-1 rounded border border-neutral-100">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span>Thời gian thực (Đồ thị tăng trưởng)</span>
        </div>
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
            {/* Grid Lines */}
            <line x1="20" y1="20" x2={width - 20} y2="20" stroke="#f1f1f1" strokeDasharray="3,3" />
            <line x1="20" y1="65" x2={width - 20} y2="65" stroke="#f1f1f1" strokeDasharray="3,3" />
            <line x1="20" y1="110" x2={width - 20} y2="110" stroke="#f1f1f1" strokeDasharray="3,3" />
            <line x1="20" y1="160" x2={width - 20} y2="160" stroke="#e5e5e5" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Shaded Area under the path */}
            <polygon points={fillString} fill="url(#chartGrad)" />

            {/* Main Path */}
            <polyline
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsString}
            />

            {/* Data Dots */}
            {chartPoints.map((val, index) => {
              const x = padding + (index * (width - padding * 2)) / (chartPoints.length - 1);
              const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);
              return (
                <g key={index} className="group cursor-pointer">
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-[#D4AF37] stroke-white stroke-2 hover:r-6 transition-all"
                  />
                  <circle cx={x} cy={y} r="10" className="fill-transparent group-hover:fill-[#D4AF37]/10" />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-[#7A7A7A] mt-2 px-1">
          <span>Tháng 1 (Bắt đầu dự án)</span>
          <span>Tháng 4 (Tối ưu hạ tầng)</span>
          <span>Tháng 8 (Tăng trưởng bứt phá)</span>
          <span>Tháng 12 (Đạt KPI đỉnh)</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. BEFORE/AFTER IMAGE SLIDER (CRO WEBSITE)
// ==========================================
export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  return (
    <div className="bg-[#FAF9F6] border border-[#C5A880]/20 rounded-xl p-5 md:p-6 shadow-md">
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/5 px-2 py-1 rounded">
          CRO UI/UX Before & After Slider
        </span>
        <h4 className="text-lg font-display text-[#1A1A1A] font-medium mt-1">So sánh trực quan website tối ưu CRO</h4>
        <p className="text-xs text-[#666666] mt-1">Hãy kéo thanh trượt ở giữa để cảm nhận sự nâng cấp từ phễu chuyển đổi cũ lên thiết kế cao cấp của PGS.</p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[280px] sm:h-[340px] w-full rounded-lg overflow-hidden select-none cursor-ew-resize border border-neutral-200"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => handleMove(e.clientX)}
      >
        {/* BEFORE SIDE (Left or Background) */}
        <div className="absolute inset-0 bg-[#EAE8E3] p-6 flex flex-col justify-between">
          <div className="max-w-[80%] opacity-90">
            <span className="bg-red-500/10 text-red-600 border border-red-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
              GIAO DIỆN CŨ (CR = 0.8%)
            </span>
            <h5 className="text-lg font-serif text-[#333] mt-2 font-bold leading-tight line-clamp-2">Công ty Phân phối Giải pháp Doanh nghiệp Việt Nam</h5>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-3">Chào mừng bạn đến với trang web của chúng tôi. Chúng tôi cung cấp các dịch vụ chất lượng cao, uy tín hàng đầu thị trường với kinh nghiệm nhiều năm trong ngành...</p>
          </div>
          <div className="space-y-2 max-w-[85%]">
            <div className="h-8 bg-neutral-300 rounded animate-pulse flex items-center px-3">
              <span className="text-[10px] text-neutral-500">Menu rườm rà, rối mắt người dùng</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-9 bg-neutral-400 rounded flex items-center justify-center text-[10px] text-white font-medium">
                Nút liên hệ mờ nhạt
              </div>
              <div className="flex-1 h-9 bg-neutral-300 rounded flex items-center justify-center text-[10px] text-neutral-600">
                Tìm hiểu thêm
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow">
            Nút thắt thâm hụt: Giảm 60% lead do bố cục rối
          </div>
        </div>

        {/* AFTER SIDE (Right Overlaid Side) */}
        <div 
          className="absolute inset-y-0 right-0 bg-[#FDFBF7] p-6 flex flex-col justify-between border-l-2 border-[#D4AF37]/50"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* We wrap elements with min-w-xx to make sure it doesn't compress as the slider moves */}
          <div className="min-w-[280px] sm:min-w-[450px] max-w-full">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                PGS PREMIUM UX (CR = 2.4%)
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50/80 border border-emerald-200 px-1.5 py-0.5 rounded">
                +300% Tăng Lead
              </span>
            </div>
            <h5 className="text-xl font-display text-[#1A1A1A] mt-2 font-semibold tracking-tight leading-snug">
              Kiến Tạo Hệ Thống Bán Hàng Tự Động Cao Cấp
            </h5>
            <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
              Thiết kế bento grid hiện đại tối ưu hóa trải nghiệm lướt. Tốc độ tải trang dưới 1.2s giúp giảm 80% tỷ lệ thoát (Bounce Rate) ngay lập tức.
            </p>
          </div>

          <div className="min-w-[280px] sm:min-w-[450px] space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-[#C5A880]/20 p-2 rounded text-center">
                <div className="text-xs font-bold text-[#D4AF37]">98%</div>
                <div className="text-[9px] text-[#7A7A7A]">Tin cậy (Trust)</div>
              </div>
              <div className="bg-white border border-[#C5A880]/20 p-2 rounded text-center">
                <div className="text-xs font-bold text-[#D4AF37]">&lt;1.2s</div>
                <div className="text-[9px] text-[#7A7A7A]">Tốc độ tải</div>
              </div>
              <div className="bg-white border border-[#C5A880]/20 p-2 rounded text-center">
                <div className="text-xs font-bold text-[#D4AF37]">Lớp A+</div>
                <div className="text-[9px] text-[#7A7A7A]">Điểm SEO</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#D4AF37] text-black font-semibold text-xs py-2 rounded-lg hover:bg-[#C59B27] transition-all flex items-center justify-center gap-1">
                <span>Nhận Tư Vấn Ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Tối ưu hóa: Form đăng ký 1 chạm tiện dụng</span>
          </div>
        </div>

        {/* HANDLE BAR */}
        <div 
          className="absolute inset-y-0 w-1 bg-[#D4AF37] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] border-4 border-[#FDFBF7] flex items-center justify-center shadow-lg text-black font-bold text-xs">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ADS PERFORMANCE DASHBOARD
// ==========================================
type Channel = "google" | "facebook" | "tiktok";

interface CampaignData {
  platformName: string;
  budget: string;
  ctr: string;
  cpc: string;
  cpa: string;
  roas: string;
  metrics: { name: string; value: string; desc: string }[];
  strategy: string[];
}

const adsCampaigns: Record<Channel, CampaignData> = {
  google: {
    platformName: "Google Search & Performance Max",
    budget: "45,000,000đ / tháng",
    ctr: "8.45%",
    cpc: "4,200đ",
    cpa: "120,000đ",
    roas: "4.8x",
    metrics: [
      { name: "Lượt Hiển Thị", value: "340K+", desc: "Phủ sóng đúng nhu cầu mua sắm" },
      { name: "Lượt Chuyển Đổi", value: "315 Lead", desc: "Form đăng ký và cuộc gọi trực tiếp" },
      { name: "Doanh Thu Ước Tính", value: "216M+", desc: "Giá trị đơn hàng thu về thực tế" }
    ],
    strategy: [
      "Target từ khóa sát ý định mua hàng (High-Intent Keywords).",
      "Triển khai chiến dịch PMax kết hợp tài sản hình ảnh/video cao cấp từ PGS.",
      "Tối ưu hóa phễu điền form thu hồi lead có tính bảo mật cao."
    ]
  },
  facebook: {
    platformName: "Facebook Meta Retargeting & Lookalike",
    budget: "35,000,000đ / tháng",
    ctr: "3.12%",
    cpc: "2,800đ",
    cpa: "85,000đ",
    roas: "4.2x",
    metrics: [
      { name: "Lượt Tiếp Cận (Reach)", value: "520K+", desc: "Phủ sóng tệp khách hàng tiềm năng" },
      { name: "Lượt Tin Nhắn", value: "410 Chat", desc: "Tương tác và chốt đơn trực tiếp" },
      { name: "Doanh Thu Ước Tính", value: "147M+", desc: "Thu về qua phễu tư vấn tin nhắn" }
    ],
    strategy: [
      "Phân nhóm tệp khách hàng sâu: Re-targeting khách đã ghé thăm website nhưng chưa mua.",
      "Sản xuất hàng loạt định dạng ảnh bento sang trọng và thông điệp chạm đúng nỗi đau.",
      "Tự động hóa kịch bản chatbox để phản hồi khách dưới 10 giây."
    ]
  },
  tiktok: {
    platformName: "TikTok Short-Video Shoppable Ads",
    budget: "20,000,000đ / tháng",
    ctr: "1.85%",
    cpc: "1,900đ",
    cpa: "65,000đ",
    roas: "5.5x",
    metrics: [
      { name: "Lượt Xem Video", value: "1.2M+", desc: "Lan tỏa tự nhiên cực kỳ mạnh mẽ" },
      { name: "Lượt Click Bio", value: "18.5K", desc: "Chuyển đổi khách sang Landing Page" },
      { name: "Đơn hàng TikTok Shop", value: "480 Đơn", desc: "Bán hàng qua video ngắn sáng tạo" }
    ],
    strategy: [
      "Hợp tác sản xuất video ngắn dạng giải trí kết hợp giới thiệu tính năng thực chất.",
      "Chạy quảng cáo Spark Ads trực tiếp bằng tài khoản chuyên gia để tạo lòng tin cao nhất.",
      "Tập trung thúc đẩy chương trình ưu đãi độc quyền giới hạn thời gian (Scarcity)."
    ]
  }
};

export function AdsDashboard() {
  const [channel, setChannel] = useState<Channel>("google");
  const data = adsCampaigns[channel];

  return (
    <div className="bg-[#FAF9F6] border border-[#C5A880]/20 rounded-xl p-5 md:p-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/5 px-2 py-1 rounded">
            Multi-Channel Paid Ads Dashboard
          </span>
          <h4 className="text-lg font-display text-[#1A1A1A] font-medium mt-1">Hệ thống phễu Ads tối ưu liên tục</h4>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-[#1A1A1A]/5 p-1 rounded-lg w-full md:w-auto">
          {(["google", "facebook", "tiktok"] as Channel[]).map((c) => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all uppercase ${
                channel === c 
                  ? "bg-[#D4AF37] text-[#1A1A1A] shadow-sm" 
                  : "text-[#666666] hover:text-[#1A1A1A]"
              }`}
            >
              {c} Ads
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PRIMARY KPI HIGHLIGHTS */}
        <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
            <span className="text-xs text-[#1A1A1A] font-bold tracking-tight uppercase flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              {data.platformName}
            </span>
            <span className="text-xs text-[#7A7A7A] font-mono">Ngân sách: {data.budget}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "CTR trung bình", val: data.ctr, sub: "Tỷ lệ nhấp chuột" },
              { label: "CPC trung bình", val: data.cpc, sub: "Giá mỗi click" },
              { label: "CPA mục tiêu", val: data.cpa, sub: "Giá mỗi chuyển đổi" },
              { label: "ROAS thực tế", val: data.roas, sub: "Tỷ suất lợi nhuận", highlight: true }
            ].map((metric, i) => (
              <div key={i} className="p-3 bg-[#FDFBF7] border border-[#C5A880]/10 rounded text-center">
                <span className="text-[10px] text-[#7A7A7A] block mb-0.5">{metric.label}</span>
                <span className={`text-base font-display font-bold ${metric.highlight ? "text-[#D4AF37]" : "text-[#1A1A1A]"}`}>
                  {metric.val}
                </span>
                <span className="text-[9px] text-[#A0A0A0] block mt-0.5">{metric.sub}</span>
              </div>
            ))}
          </div>

          {/* Core sub-KPI blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {data.metrics.map((kpi, i) => (
              <div key={i} className="p-3 border border-neutral-100 rounded bg-[#FAF9F6]">
                <span className="text-[10px] text-neutral-500 block">{kpi.name}</span>
                <span className="text-lg font-display font-semibold text-neutral-800 block mt-0.5">{kpi.value}</span>
                <span className="text-[9px] text-[#7A7A7A] block mt-0.5 leading-tight">{kpi.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CORE PGS STRATEGIC TACTICS */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-neutral-100 rounded-lg p-4">
          <div>
            <h5 className="text-sm font-display font-bold text-neutral-800 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Hành động Tối ưu từ PGS Agency:
            </h5>
            <ul className="space-y-3">
              {data.strategy.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[10px] text-[#7A7A7A] font-mono">Dữ liệu thật, minh bạch 100%</span>
            <button className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 hover:text-black transition-colors">
              <span>Đăng ký tối ưu quảng cáo</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. FAQ ACCORDION
// ==========================================
interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Chúng tôi có được xem báo cáo chiến dịch của các dự án thật không?",
    a: "PGS Agency cam kết sự minh bạch tối đa đối với khách hàng. Tuy nhiên, theo thỏa thuận bảo mật NDA (Non-Disclosure Agreement) ký kết với từng đối tác, các thông tin định danh cụ thể, tên thương hiệu nhạy cảm hoặc hóa đơn tài chính chi tiết của một số khách hàng sẽ được viết tắt [Cần bổ sung dữ liệu thật] hoặc ẩn bớt đi. Tuy vậy, các số liệu về tỷ lệ tăng trưởng phần trăm, biểu đồ kỹ thuật GSC và Analytics vẫn là dữ liệu thực 100% thu được trong quá trình chạy thực tế."
  },
  {
    q: "PGS Agency có kinh nghiệm thực thi các dự án thuộc ngành của tôi chưa?",
    a: "Với đội ngũ chuyên môn dày dạn kinh nghiệm, PGS đã triển khai thành công hàng trăm dự án thuộc nhiều nhóm lĩnh vực đa dạng từ B2B, Bán lẻ, Thương mại điện tử (E-commerce), Giáo dục (Education), Công nghệ SaaS cho đến ngành hàng F&B đầy thử thách. Bạn có thể sử dụng công cụ 'Bộ lọc dự án' ở đầu trang để tìm kiếm nhanh các dự án tương đồng nhất trong phân khúc của mình."
  },
  {
    q: "Chính sách bảo mật dữ liệu kinh doanh của khách hàng tại PGS như thế nào?",
    a: "PGS tuyệt đối tuân thủ chính sách bảo mật NDA nghiêm ngặt nhất. Mọi dữ liệu kinh doanh từ doanh thu, danh sách khách hàng, kế hoạch ra mắt sản phẩm cho đến hạ tầng công nghệ của đối tác đều được bảo vệ đa tầng và không bao giờ chia sẻ cho bên thứ ba dưới bất kỳ hình thức nào khi chưa được văn bản đồng ý chính thức từ phía khách hàng."
  },
  {
    q: "Dự án sau khi bàn giao thì việc bảo hành, đồng hành tối ưu tiếp theo sẽ ra sao?",
    a: "PGS không làm marketing rời rạc mà xây hệ thống tăng trưởng dài hạn. Mọi hợp đồng triển khai đều bao gồm giai đoạn đồng hành tối ưu hóa liên tục ít nhất từ 3 đến 6 tháng sau khi bàn giao để giám sát kỹ lưỡng hệ thống tracking, tối ưu hóa tệp đối tượng Ads và liên tục nâng cấp chất lượng content SEO bắt nhịp với xu hướng biến động thực tế."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div 
            key={i} 
            className="border border-[#C5A880]/15 rounded-lg bg-white overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center p-4 text-left transition-colors hover:bg-[#FAF9F6]"
            >
              <span className="text-sm font-display font-semibold text-[#1A1A1A] pr-4">
                {faq.q}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
              />
            </button>
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[300px] border-t border-neutral-100" : "max-h-0"
              }`}
            >
              <div className="p-4 text-xs text-[#666666] leading-relaxed bg-[#FAF9F6]/40">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
