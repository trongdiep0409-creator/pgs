'use client';

import React, { useState, useRef } from "react";
import { 
  specificationsData, 
  HandoffSpec 
} from "./components/specifications-data";
import { 
  GscSimulator, 
  BeforeAfterSlider, 
  AdsDashboard, 
  FaqAccordion 
} from "./components/interactive-tools";
import { 
  Sparkles, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  ChevronRight, 
  FileCode, 
  Flame, 
  Cpu, 
  Terminal, 
  Send, 
  Loader2, 
  AlertCircle, 
  Check, 
  Monitor, 
  FileText, 
  ExternalLink, 
  Volume2, 
  TrendingUp 
} from "lucide-react";

// Filterable project types
interface CaseStudyItem {
  id: number;
  title: string;
  service: "SEO" | "Website" | "Ads" | "Social" | "PR";
  industry: "B2B" | "E-commerce" | "Retail" | "SaaS" | "F&B" | "Education";
  goal: "Lead" | "Traffic" | "Revenue" | "CRO";
  scale: "SMBs" | "Enterprise" | "Startups";
  results: string;
  context: string;
  challenge: string;
  solution: string;
  metrics: string[];
}

const mockCaseStudies: CaseStudyItem[] = [
  {
    id: 1,
    title: "Bứt phá Organic Traffic cho Thương hiệu Gia dụng Thông minh [Cần bổ sung dữ liệu thật]",
    service: "SEO",
    industry: "Retail",
    goal: "Traffic",
    scale: "SMBs",
    results: "+320% Organic Traffic, 2,500+ từ khóa lọt Top 3 tìm kiếm",
    context: "Doanh nghiệp phân phối robot hút bụi và thiết bị gia dụng thông minh sở hữu website có cấu trúc SEO bị phân mảnh, nội dung sơ sài và tỷ lệ chuyển đổi tự nhiên cực kỳ thấp.",
    challenge: "Cạnh tranh gay gắt từ các sàn thương mại điện tử lớn; ngân sách quảng cáo hạn hẹp, cần nguồn traffic bền vững.",
    solution: "Tái cấu trúc website theo mô hình Silo bền vững, tập trung tối ưu chỉ số tín nhiệm EEAT và tối ưu ý định tìm kiếm của người dùng trung niên.",
    metrics: ["+320% Khách truy cập hữu cơ", "2,500+ Từ khóa đứng Top 3 Google", "X2.8 Lượng lead đăng ký mua sắm tự nhiên"]
  },
  {
    id: 2,
    title: "Tái Thiết Kế Website Chuẩn CRO & Tối Ưu Hệ Thống Bán Hàng Đào Tạo [Cần bổ sung]",
    service: "Website",
    industry: "Education",
    goal: "CRO",
    scale: "Enterprise",
    results: "Tỷ lệ chuyển đổi tăng vọt từ 0.75% lên 2.1%, tăng X3 đơn hàng",
    context: "Nền tảng đào tạo kỹ năng doanh nghiệp trực tuyến có giao diện lỗi thời, quy trình thanh toán phức tạp dẫn đến việc thất thoát 70% số lượng giỏ hàng tại bước cuối.",
    challenge: "Giao diện trên mobile bị lỗi hiển thị phông chữ, người dùng khó tìm kiếm khóa học phù hợp, tốc độ load trang chậm (>4.5 giây).",
    solution: "Áp dụng cấu trúc lưới Bento mượt mà chuẩn Light Premium Consulting, tinh gọn phễu đăng ký 1 chạm, tối ưu tốc độ load còn 1.1 giây.",
    metrics: ["CR tăng từ 0.75% lên 2.1%", "-80% Tỷ lệ gián đoạn giỏ hàng", "Điểm Core Web Vitals đạt 98%"]
  },
  {
    id: 3,
    title: "Tối Ưu Chi Phí Phễu Ads Đa Kênh Cho Chuỗi Nhà Hàng Cao Cấp [Cần bổ sung]",
    service: "Ads",
    industry: "F&B",
    goal: "Lead",
    scale: "Startups",
    results: "Giảm 45% giá trị CPL (Cost per Lead), tăng 2.5 lần lượng đặt bàn trước",
    context: "Chuỗi nhà hàng nướng phong cách Nhật Bản muốn mở rộng chi nhánh nhưng chi phí quảng cáo Facebook Ads tăng vọt, lượng đặt bàn thực tế không tương xứng.",
    challenge: "Thiếu dữ liệu đo lường hành vi, không định nghĩa được tệp khách hàng tiềm năng có thu nhập cao.",
    solution: "Thiết lập tracking đa chiều (GA4, Meta Pixel, TikTok Pixel), chia phễu target đối tượng sâu kết hợp tiếp thị lại (Re-targeting) bằng thông điệp độc quyền.",
    metrics: ["-45% Chi phí thu thập Lead (CPL)", "X2.5 Lượng đặt chỗ trước cuối tuần", "Đo lường ROI đa kênh chính xác đạt 100%"]
  },
  {
    id: 4,
    title: "Chiến dịch Content Viral TikTok Tăng Doanh Thu Sàn E-Commerce [Cần bổ sung]",
    service: "Social",
    industry: "E-commerce",
    goal: "Revenue",
    scale: "SMBs",
    results: "4.2M lượt tiếp cận tự nhiên, doanh số TikTok Shop bứt tốc 180%",
    context: "Nhãn hàng thời trang thiết kế nội địa gặp bế tắc khi phân phối nội dung trên Fanpage truyền thống, chi phí quảng cáo ngày một đắt đỏ.",
    challenge: "Thuật toán video ngắn thay đổi liên tục, các video tự sản xuất đạt lượng view lẹt đẹt (<500 views).",
    solution: "Lên lịch Content Calendar 30 ngày tập trung giải quyết nỗi đau phối đồ của giới trẻ, sản xuất chuỗi video giải trí ngắn chất lượng cao.",
    metrics: ["4.2M Lượt hiển thị tự nhiên", "+180% Doanh thu qua giỏ hàng TikTok Shop", "Tăng 65K người theo dõi mới trong 1 tháng"]
  },
  {
    id: 5,
    title: "Bảo Trợ PR Báo Chí Hạng A & Nâng Cao Tín Nhiệm EEAT Bất Động Sản [Cần bổ sung]",
    service: "PR",
    industry: "B2B",
    goal: "CRO",
    scale: "Enterprise",
    results: "Xuất hiện trên 15+ đầu báo kinh doanh, tăng 240% chỉ số uy tín thương hiệu",
    context: "Đơn vị phát triển dự án bất động sản nghỉ dưỡng cần tăng cường tính pháp lý và lòng tin khách hàng trước thềm mở bán chính thức.",
    challenge: "Khách hàng hoài nghi về năng lực chủ đầu tư, thông tin lan man không được kiểm chứng trên internet.",
    solution: "Lên kế hoạch bảo trợ truyền thông PR trên các đầu báo uy tín hàng đầu (VnExpress, CafeF, Forbes VN), khẳng định năng lực qua hồ sơ chuyên gia tư vấn cấp cao.",
    metrics: ["15+ Bài báo chất lượng hạng A", "+240% Lượng tìm kiếm thương hiệu tự nhiên", "Xác thực tín nhiệm Google Knowledge Panel"]
  }
];

export default function CaseStudyPageClient() {
  const [handoffMode, setHandoffMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1); // Active tab for handoff modal / inline view

  // Filters state
  const [filterService, setFilterService] = useState<string>("all");
  const [filterIndustry, setFilterIndustry] = useState<string>("all");
  const [filterGoal, setFilterGoal] = useState<string>("all");
  const [filterScale, setFilterScale] = useState<string>("all");

  // AI Auditor Form State
  const [formData, setFormData] = useState({
    domain: "",
    industry: "E-commerce",
    budget: "10-20 triệu / tháng",
    goal: "Tăng lượng lead đăng ký dịch vụ",
    painPoint: "Chi phí Ads quá cao nhưng không chuyển đổi ra doanh thu thực tế"
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Mouse tilt positioning for 3D Hero Project Wall
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroWallRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroWallRef.current) return;
    const rect = heroWallRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Filter projects handler
  const filteredProjects = mockCaseStudies.filter((item) => {
    if (filterService !== "all" && item.service !== filterService) return false;
    if (filterIndustry !== "all" && item.industry !== filterIndustry) return false;
    if (filterGoal !== "all" && item.goal !== filterGoal) return false;
    if (filterScale !== "all" && item.scale !== filterScale) return false;
    return true;
  });

  // Reset filters
  const handleResetFilters = () => {
    setFilterService("all");
    setFilterIndustry("all");
    setFilterGoal("all");
    setFilterScale("all");
  };

  // Submit AI growth auditor form
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResult(null);
    setApiError(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setAiResult(data.analysis);
      } else {
        setApiError(data.error || "Có lỗi xảy ra khi phân tích dữ liệu.");
      }
    } catch (err: any) {
      setApiError("Không thể kết nối dịch vụ AI. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render a specific technical handoff spec sheet for a section
  const renderSpecSheet = (sectionId: number) => {
    const spec = specificationsData[sectionId];
    if (!spec) return null;

    return (
      <div className="mt-4 border-2 border-dashed border-[#D4AF37]/50 rounded-xl bg-amber-50/25 p-5 md:p-6 transition-all shadow-inner animate-fadeIn">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#C5A880]/20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
              <FileCode className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold">
              Tài liệu kỹ thuật bàn giao • Section {sectionId}
            </span>
          </div>
          <div className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded font-mono font-bold uppercase">
            STATUS: READY TO BUILD
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Metadata & SEO */}
          <div className="lg:col-span-4 space-y-3.5 bg-white p-4 rounded-lg border border-[#C5A880]/10 shadow-sm text-xs">
            <div>
              <span className="font-semibold text-neutral-800 block mb-0.5">Mục tiêu Section:</span>
              <p className="text-neutral-600 leading-relaxed">{spec.role}</p>
            </div>
            <div>
              <span className="font-semibold text-neutral-800 block mb-0.5">Search Intent đích:</span>
              <p className="text-neutral-600 font-mono italic">{spec.searchIntent}</p>
            </div>
            {spec.h1 && (
              <div>
                <span className="font-semibold text-neutral-800 block mb-0.5">Thẻ H1 Bắt buộc:</span>
                <p className="text-red-600 font-semibold leading-relaxed bg-red-50 p-1.5 rounded border border-red-100">{spec.h1}</p>
              </div>
            )}
            <div>
              <span className="font-semibold text-neutral-800 block mb-0.5">Cấu trúc headings gợi ý:</span>
              <ul className="list-disc list-inside space-y-0.5 text-neutral-600 font-mono">
                {spec.headings.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-neutral-800 block mb-0.5">Đề xuất Schema:</span>
              <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 font-mono rounded text-[10px]">{spec.schema}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
              <div>
                <span className="font-semibold text-neutral-800 block mb-0.5 text-[10px]">Internal Link Đi:</span>
                <div className="space-y-0.5">
                  {spec.internalLinkOut.map((link, i) => (
                    <span key={i} className="block text-[10px] bg-amber-50 text-[#D4AF37] px-1 rounded truncate">{link}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-neutral-800 block mb-0.5 text-[10px]">Internal Link Nhận:</span>
                <div className="space-y-0.5">
                  {spec.internalLinkIn.map((link, i) => (
                    <span key={i} className="block text-[10px] bg-neutral-50 text-neutral-500 px-1 rounded truncate">{link}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tri-Checklists for Roles */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DESIGNER */}
            <div className="bg-white border-t-2 border-blue-500 rounded-lg p-4 shadow-sm text-xs">
              <div className="flex items-center gap-1.5 mb-2 text-blue-600 font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>CHÚ Ý DESIGNER</span>
              </div>
              <ul className="space-y-2 text-neutral-600 leading-relaxed">
                {spec.designerChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DEVELOPER */}
            <div className="bg-white border-t-2 border-emerald-500 rounded-lg p-4 shadow-sm text-xs">
              <div className="flex items-center gap-1.5 mb-2 text-emerald-600 font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>CHÚ Ý DEVELOPER</span>
              </div>
              <ul className="space-y-2 text-neutral-600 leading-relaxed">
                {spec.developerChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTENT SEO */}
            <div className="bg-white border-t-2 border-amber-500 rounded-lg p-4 shadow-sm text-xs">
              <div className="flex items-center gap-1.5 mb-2 text-amber-600 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>CHÚ Ý CONTENT SEO</span>
              </div>
              <ul className="space-y-2 text-neutral-600 leading-relaxed">
                {spec.contentChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Technical Output Card */}
        <div className="bg-[#1A1A1A] text-[#FDFBF7] rounded-lg p-4 mt-4 text-xs font-mono space-y-1 relative overflow-hidden">
          <div className="absolute right-2 top-2 text-[8px] border border-neutral-700 text-neutral-500 px-1 rounded uppercase tracking-widest font-sans font-bold">
            XML Header Snippet
          </div>
          <p className="text-neutral-400">&lt;!-- SEO Meta Tag Configurations --&gt;</p>
          <p><span className="text-[#D4AF37]">&lt;title&gt;</span>{spec.metaTitle}<span className="text-[#D4AF37]">&lt;/title&gt;</span></p>
          <p><span className="text-[#D4AF37]">&lt;meta</span> name=&quot;description&quot; content=&quot;{spec.metaDescription}&quot; <span className="text-[#D4AF37] font-semibold">/&gt;</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#D4AF37]/20 flex flex-col justify-between">
      
      {/* ========================================================
          1. HEADER NAVIGATION & HANDOFF TOGGLE
         ======================================================== */}
      

      {/* Floating notification bar when handoff mode is active */}
      {handoffMode && (
        <div className="bg-[#1A1A1A] text-[#FDFBF7] py-2 px-4 text-center text-[11px] font-mono tracking-tight sticky top-[64px] z-40 shadow animate-slideDown flex items-center justify-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Bạn đang xem giao diện ở <strong>Chế độ Bàn giao Kỹ thuật</strong>. Mỗi Section hiện thị đầy đủ tài liệu SEO, Thiết kế và Developer.</span>
        </div>
      )}

      {/* ========================================================
          SECTION 1: HERO PROJECT WALL (HERO 3D)
         ======================================================== */}
      <section 
        id="section-hero"
        className="relative py-16 lg:py-24 overflow-hidden border-b border-neutral-100"
        ref={heroWallRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2.5 py-1 rounded">
              PGS Agency • Case Studies Library
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight text-[#1A1A1A] leading-[1.12]">
              Những dự án tăng trưởng được triển khai bằng <span className="italic font-serif text-[#D4AF37]">chiến lược</span>, dữ liệu và tối ưu liên tục
            </h1>
            <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-xl">
              Chúng tôi không làm marketing rời rạc. PGS xây dựng hệ thống tăng trưởng số toàn diện bằng sự kết hợp chặt chẽ giữa Website chuẩn CRO, SEO cấu trúc bền vững, Ads tối ưu CPA và tối ưu hóa chuyển đổi liên tục.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#section-auditor"
                className="bg-[#D4AF37] text-neutral-950 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#C59B27] transition-all shadow-md shadow-amber-500/10 flex items-center gap-2"
              >
                <span>Nhận phân tích dự án</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setHandoffMode(!handoffMode)}
                className="bg-white text-neutral-900 border border-neutral-300 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 transition-all flex items-center gap-2"
              >
                <span>Tài liệu Handoff</span>
                <span className="px-1.5 py-0.5 bg-neutral-100 text-[10px] rounded border font-mono">Specs</span>
              </button>
            </div>
            {/* Minimal trust signals */}
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-6 text-[#7A7A7A]">
              <div>
                <span className="text-xl font-display font-bold text-neutral-800">100%</span>
                <span className="text-[10px] block font-mono">Dữ liệu thực nghiệm</span>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div>
                <span className="text-xl font-display font-bold text-neutral-800">&lt;1.2s</span>
                <span className="text-[10px] block font-mono">Thời gian phản hồi</span>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div>
                <span className="text-xl font-display font-bold text-neutral-800">A+ Grade</span>
                <span className="text-[10px] block font-mono">Xếp hạng uy tín</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals: Interactive 3D Project Wall */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[320px] md:h-[400px]">
            {/* Behind Ambient Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-[80px]" />

            {/* Dynamic CSS 3D Tilt Wall */}
            <div 
              className="relative w-full max-w-[450px] aspect-square transition-transform duration-200 ease-out preserve-3d"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 25}deg) rotateX(${-mousePos.y * 25}deg)`
              }}
            >
              {/* Card 1: GSC Traffic Simulator */}
              <div className="absolute top-[5%] left-[5%] w-[60%] bg-white/95 backdrop-blur-md border border-[#C5A880]/30 rounded-xl p-4 shadow-xl shadow-neutral-900/[0.04] z-10 translate-z-10 hover:border-[#D4AF37] transition-all">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D4AF37] mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Google Search Console</span>
                </div>
                <div className="text-xs font-semibold text-neutral-900">Organic Clicks</div>
                <div className="text-lg font-display font-bold text-neutral-900 mt-1">284.5K <span className="text-[10px] text-emerald-600 font-bold font-sans">+320%</span></div>
                <div className="w-full h-8 bg-amber-500/5 border-t border-dashed border-[#D4AF37]/20 rounded mt-2 overflow-hidden flex items-end">
                  {/* Miniature wave */}
                  <svg viewBox="0 0 100 30" className="w-full h-6 stroke-[#D4AF37] fill-transparent">
                    <path d="M0,25 Q15,5 30,22 T60,5 T90,15 T100,5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Conversions Ads ROI */}
              <div className="absolute bottom-[8%] right-[5%] w-[55%] bg-[#1A1A1A] border border-neutral-800 rounded-xl p-4 shadow-2xl z-20 translate-z-20 hover:border-[#D4AF37] transition-all">
                <div className="flex justify-between items-center text-[8px] font-mono text-[#7A7A7A] mb-1.5">
                  <span>METRICS PERFORMANCE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-white">
                  <div>
                    <span className="text-[9px] text-[#A0A0A0]">ROAS</span>
                    <div className="text-base font-display font-bold text-[#D4AF37]">4.8x</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#A0A0A0]">CR (CRO)</span>
                    <div className="text-base font-display font-bold text-white">2.4%</div>
                  </div>
                </div>
                <div className="h-1 bg-neutral-800 rounded-full mt-2.5 overflow-hidden">
                  <div className="w-[85%] h-full bg-[#D4AF37]" />
                </div>
              </div>

              {/* Card 3: Mobile TikTok Mockup */}
              <div className="absolute top-[35%] right-[8%] w-[35%] bg-white border border-[#C5A880]/20 rounded-xl p-3.5 shadow-lg z-30 translate-z-30 text-center hover:border-[#D4AF37] transition-all">
                <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-2 border border-neutral-200">
                  <span className="text-[10px] font-bold font-mono">📱</span>
                </div>
                <div className="text-[10px] font-semibold text-[#1A1A1A]">TikTok Ads Feed</div>
                <div className="text-[9px] text-[#7A7A7A] mt-0.5">4.2M views</div>
                <div className="mt-2 text-[8px] bg-emerald-50 text-emerald-600 font-bold px-1 py-0.5 rounded inline-block">
                  CPA: 65K
                </div>
              </div>

              {/* Decorative gold lines */}
              <div className="absolute inset-0 border border-[#D4AF37]/10 rounded-full scale-105 -z-10 pointer-events-none border-dashed" />
              <div className="absolute inset-0 border border-[#D4AF37]/5 rounded-full scale-125 -z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(1)}</div>}
      </section>

      {/* ========================================================
          SECTION 2: BỘ LỌC CASE (FILTER CHIPS)
         ======================================================== */}
      <section id="section-filters" className="py-12 bg-[#FAF9F6] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Thư viện dự án lọc thông minh
              </span>
              <h2 className="text-2xl font-display font-medium text-neutral-900 mt-1">
                Tìm giải pháp phù hợp với doanh nghiệp của bạn
              </h2>
            </div>
            
            {/* Clear filters button */}
            {(filterService !== "all" || filterIndustry !== "all" || filterGoal !== "all" || filterScale !== "all") && (
              <button 
                onClick={handleResetFilters}
                className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-all"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>

          {/* Filtering Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-white border border-[#C5A880]/15 rounded-xl shadow-sm mb-8">
            
            {/* Filter by Service */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1.5">Theo Dịch vụ</label>
              <select 
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full text-xs font-semibold bg-[#FAF9F6] border border-neutral-200 rounded p-2 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">Tất cả dịch vụ</option>
                <option value="SEO">SEO Tổng Thể</option>
                <option value="Website">Thiết Kế Website chuẩn CRO</option>
                <option value="Ads">Quảng Cáo Đa Kênh (Ads)</option>
                <option value="Social">Content & Social Media</option>
                <option value="PR">PR Báo Chí & Tín Nhiệm</option>
              </select>
            </div>

            {/* Filter by Industry */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1.5">Theo Ngành hàng</label>
              <select 
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="w-full text-xs font-semibold bg-[#FAF9F6] border border-neutral-200 rounded p-2 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">Tất cả ngành hàng</option>
                <option value="Retail">Retail / Gia dụng</option>
                <option value="Education">Education / Đào tạo</option>
                <option value="F&B">F&B / Nhà hàng</option>
                <option value="E-commerce">E-commerce / Thương mại điện tử</option>
                <option value="B2B">B2B / Bất động sản / Doanh nghiệp</option>
              </select>
            </div>

            {/* Filter by Goal */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1.5">Theo Mục tiêu</label>
              <select 
                value={filterGoal}
                onChange={(e) => setFilterGoal(e.target.value)}
                className="w-full text-xs font-semibold bg-[#FAF9F6] border border-neutral-200 rounded p-2 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">Tất cả mục tiêu</option>
                <option value="Traffic">Tăng Organic Traffic</option>
                <option value="CRO">Tối ưu tỷ lệ chuyển đổi (CRO)</option>
                <option value="Lead">Tăng Lead chất lượng</option>
                <option value="Revenue">Thúc đẩy Doanh số E-com</option>
              </select>
            </div>

            {/* Filter by Scale */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1.5">Theo Quy mô</label>
              <select 
                value={filterScale}
                onChange={(e) => setFilterScale(e.target.value)}
                className="w-full text-xs font-semibold bg-[#FAF9F6] border border-neutral-200 rounded p-2 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">Tất cả quy mô</option>
                <option value="Startups">Startups / Khởi nghiệp</option>
                <option value="SMBs">SMBs / Doanh nghiệp vừa & nhỏ</option>
                <option value="Enterprise">Enterprise / Tập đoàn lớn</option>
              </select>
            </div>

          </div>

          {/* Filtered Results Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-neutral-200">
              <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-500">Không tìm thấy dự án nào khớp với bộ lọc đã chọn.</p>
              <button 
                onClick={handleResetFilters}
                className="text-xs text-[#D4AF37] font-bold mt-2 hover:underline"
              >
                Nhấp để thiết lập lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-neutral-200 rounded-xl p-5 hover:border-[#D4AF37] transition-all hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded font-mono font-semibold">
                        {item.service} Ads
                      </span>
                      <span className="text-[10px] text-[#7A7A7A] font-mono">
                        Quy mô: {item.scale}
                      </span>
                    </div>
                    <h3 className="text-sm font-display font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#666666] line-clamp-3 mt-2 mb-4 leading-relaxed">
                      {item.context}
                    </p>

                    <div className="bg-[#FAF9F6] border border-neutral-100 p-3 rounded-lg mb-4">
                      <span className="text-[10px] font-mono text-[#D4AF37] block font-bold mb-1">KẾT QUẢ ĐẠT ĐƯỢC:</span>
                      <p className="text-xs font-semibold text-[#1A1A1A]">{item.results}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-[#7A7A7A] font-medium">Ngành: {item.industry}</span>
                    <a 
                      href="#section-auditor" 
                      className="text-[#D4AF37] font-bold flex items-center gap-0.5 hover:text-black transition-colors"
                    >
                      <span>Xem chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(2)}</div>}
      </section>

      {/* ========================================================
          SECTION 3: FEATURED CASE LỚN (FEATURED CASE)
         ======================================================== */}
      <section id="section-featured" className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              CASE STUDY TIÊU BIỂU NHẤT
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mt-1">
              Dự án Tăng Trưởng Hệ Thống Số Toàn Diện Doanh Nghiệp [Cần bổ sung dữ liệu thật]
            </h2>
            <p className="text-xs md:text-sm text-[#666666] mt-2">
              Khảo sát sâu bối cảnh và quá trình phá bỏ nút thắt chuyển đổi để nhân 3 doanh thu cùng PGS Agency.
            </p>
          </div>

          <div className="border border-[#C5A880]/15 rounded-xl bg-[#FAF9F6] p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            {/* STAR Content Left */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded font-bold uppercase">
                Ngành: E-commerce / B2B [Cần bổ sung]
              </span>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-mono uppercase text-neutral-800 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Bối cảnh & Vấn đề thách thức:
                  </h4>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    Doanh nghiệp có lượng truy cập rải rác nhưng tỷ lệ chuyển đổi website chỉ đạt dưới 0.8%. Chi phí chạy quảng cáo Facebook/Google tăng phi mã tạo gánh nặng lớn lên doanh thu ròng.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-neutral-800 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    Giải pháp tích hợp PGS:
                  </h4>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    Thiết kế lại toàn bộ giao diện website theo phong cách Light Premium chuẩn CRO tối giản, dẹp bỏ menu thừa. Đẩy mạnh SEO cấu trúc và đồng bộ hóa các kênh Ads mượt mà.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-neutral-800 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Kết quả đột phá đạt được:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                    <li className="bg-emerald-50 border border-emerald-100 p-2 rounded text-center">
                      <span className="text-[9px] text-[#7A7A7A] block">Lead chất lượng</span>
                      <span className="text-sm font-bold text-emerald-600 font-mono">+250%</span>
                    </li>
                    <li className="bg-emerald-50 border border-emerald-100 p-2 rounded text-center">
                      <span className="text-[9px] text-[#7A7A7A] block">Chi phí CPA</span>
                      <span className="text-sm font-bold text-emerald-600 font-mono">-40%</span>
                    </li>
                    <li className="bg-emerald-50 border border-emerald-100 p-2 rounded text-center">
                      <span className="text-[9px] text-[#7A7A7A] block">Doanh số thu về</span>
                      <span className="text-sm font-bold text-emerald-600 font-mono">Gấp 3 lần</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <a 
                  href="#section-auditor" 
                  className="bg-[#D4AF37] text-neutral-950 font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-[#C59B27] transition-all flex items-center gap-1.5"
                >
                  <span>Phân tích chiến dịch tương tự</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Visual Panel Right: Dynamic Growth Diagram */}
            <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-lg p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-[10px] font-mono text-[#7A7A7A] uppercase font-bold">Biểu đồ chuyển đổi CRO</span>
                <span className="text-[10px] text-[#D4AF37] font-mono font-bold">TẦNG CHUYỂN ĐỔI</span>
              </div>
              
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#1A1A1A] mb-1">
                    <span>Website cũ (Chưa tối ưu)</span>
                    <span className="font-mono">CR: 0.8%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="w-[33%] h-full bg-red-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#1A1A1A] mb-1">
                    <span>Website PGS thiết kế mới</span>
                    <span className="font-mono text-[#D4AF37] font-bold">CR: 2.4% (+300%)</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#D4AF37] animate-pulse" />
                  </div>
                </div>

                <div className="bg-[#FAF9F6] border border-neutral-100 rounded p-3 text-center text-[10px] text-neutral-600">
                  ⚡ <strong>Chứng minh:</strong> Thiết kế chuẩn Light Premium kết hợp tối giản phễu điền form giúp tiết kiệm 40% chi phí lãng phí Ads.
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(3)}</div>}
      </section>

      {/* ========================================================
          SECTION 4: CASE SEO (GSC SIMULATOR)
         ======================================================== */}
      <section id="section-seo" className="py-16 bg-[#FAF9F6] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Case Study SEO thực chiến
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 leading-tight">
                Chiến dịch SEO cấu trúc phủ sóng mọi ngóc ngách ngành
              </h2>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                Chúng tôi không tập trung vào traffic ảo hay spam từ khóa vô nghĩa. Phương pháp SEO của PGS tập trung tối ưu cấu trúc hạ tầng, xây dựng các bài viết chuyên môn cao đạt tiêu chí EEAT của Google, giúp khách tìm đến bạn tự nhiên.
              </p>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Xác thực từ khóa đứng Top 3 Google Search Console</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Cải thiện đáng kể độ tin cậy EEAT cho thương hiệu</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Interactive GSC Simulator */}
              <GscSimulator />
            </div>
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(4)}</div>}
      </section>

      {/* ========================================================
          SECTION 5: CASE WEBSITE / LANDING PAGE (BEFORE/AFTER SLIDER)
         ======================================================== */}
      <section id="section-website" className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-7">
              {/* Before/After Drag Slider */}
              <BeforeAfterSlider />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Case Study Tối ưu CRO Website
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 leading-tight">
                Tái tạo trải nghiệm người dùng & Thúc đẩy CRO tối đa
              </h2>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                Một website không chỉ cần phải đẹp, nó phải là cỗ máy bán hàng tự động hiệu suất cao. PGS phân tích sâu bản đồ nhiệt hành vi (heatmap), dẹp bỏ các điểm cản trở để khách đi đến nút đăng ký nhanh nhất.
              </p>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Bố cục Bento Grid sang trọng chuẩn Light Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tốc độ load trang cực đại &lt;1.2s bứt phá Core Web Vitals</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(5)}</div>}
      </section>

      {/* ========================================================
          SECTION 6: CASE ADS (ADS DASHBOARD)
         ======================================================== */}
      <section id="section-ads" className="py-16 bg-[#FAF9F6] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Case Study Quảng Cáo Đa Kênh
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 leading-tight">
                Tối ưu chi phí Phễu Ads đa kênh (Google, Facebook, TikTok)
              </h2>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                Nói KHÔNG với việc chạy quảng cáo theo bản năng hoang dã. PGS Agency kiểm soát CPA ráo riết dựa trên dữ liệu thật thu được từ phễu tracking đa chiều. Chúng tôi phân bổ ngân sách thông minh để tối ưu tỷ lệ ROAS cuối cùng.
              </p>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tương tác phễu 3 tầng loại bỏ chi phí lãng phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tiếp cận đúng tệp đối tượng mua hàng có thu nhập cao</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Interactive Ads Dashboard */}
              <AdsDashboard />
            </div>
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(6)}</div>}
      </section>

      {/* ========================================================
          SECTION 7: CASE SOCIAL / CONTENT
         ======================================================== */}
      <section id="section-social" className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-neutral-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">MOCKUP CONTENT PLANNER</span>
                <span className="text-[10px] text-[#7A7A7A]">Lên lịch 30 ngày tự động hóa</span>
              </div>

              {/* Grid representation of content calendar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Bài đăng Insight Chạm Nỗi Đau", date: "Thứ Hai (Tuần 1)", platform: "Facebook Fanpage", reach: "12.4K tiếp cận" },
                  { title: "Video Ngắn Phối Đồ Sáng Tạo", date: "Thứ Tư (Tuần 1)", platform: "TikTok Video", reach: "320K xem" },
                  { title: "Hồ Sơ CEO & Triết Lý Thương Hiệu", date: "Thứ Sáu (Tuần 1)", platform: "Linkedin / PR", reach: "4.5K tương tác" }
                ].map((post, i) => (
                  <div key={i} className="bg-white border border-neutral-100 p-3.5 rounded shadow-sm">
                    <span className="text-[9px] text-[#7A7A7A] block">{post.date}</span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded font-bold font-mono inline-block my-1">{post.platform}</span>
                    <p className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 mt-1 leading-snug">{post.title}</p>
                    <div className="pt-2 mt-2 border-t border-neutral-100 text-[10px] text-emerald-600 font-bold">
                      🔥 {post.reach}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Case Study Sáng Tạo Nội Dung
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 leading-tight">
                Sáng tạo nội dung đa kênh định hình bản sắc thương hiệu
              </h2>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                Chúng tôi tạo ra những bài viết chuyên sâu và kịch bản video ngắn cực kỳ hấp dẫn. Nội dung không chỉ để giải trí lan tỏa, mà còn phải gieo lòng tin và thúc đẩy khách điền form chốt đơn trực tiếp.
              </p>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sản xuất video ngắn TikTok & Reels chuẩn SEO từ khóa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Xây dựng Content Calendar 30 ngày đồng bộ hóa tối đa</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(7)}</div>}
      </section>

      {/* ========================================================
          SECTION 8: CASE PR / AUTHORITY (BRAND GRAPH & ARTICLES)
         ======================================================== */}
      <section id="section-pr" className="py-16 bg-[#FAF9F6] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Case Study PR & BẢO TRỢ UY TÍN
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 leading-tight">
                Xây dựng uy tín tối đa qua mạng lưới PR báo chí hạng A
              </h2>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                Bảo trợ truyền thông chuyên nghiệp bằng các bài báo chất lượng cao trên các đầu báo uy tín (VnExpress, CafeF, Forbes VN...). Giúp thương hiệu của bạn sở hữu các tín hiệu uy tín vững vàng, thúc đẩy chỉ số EEAT tối đa.
              </p>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tăng cường lòng tin cậy tuyệt đối cho khách khó tính</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Xác thực Google Knowledge Graph định danh thực thể</span>
                </div>
              </div>
            </div>

            {/* Simulated Press Mentions Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Gia tăng vượt trội doanh thu nhờ giải pháp tăng trưởng số toàn diện", outlet: "CafeF • Kinh Doanh", link: "cafe-f" },
                { title: "Cách PGS Agency tái định nghĩa phễu chuyển đổi cho SMBs Việt Nam", outlet: "VnExpress • Doanh Nghiệp", link: "vnexpress" }
              ].map((article, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5 hover:border-[#D4AF37] transition-all group">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37] mb-2">
                    <span className="font-bold">{article.outlet}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <h4 className="text-xs font-display font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-3">
                    &ldquo;{article.title}&rdquo;
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-2 leading-relaxed">
                    Sức hút truyền thông từ các nội dung chân thực giúp tạo thiện cảm vững bền...
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(8)}</div>}
      </section>

      {/* ========================================================
          SECTION 9: CẤU TRÚC CASE STUDY CHUẨN (10 CORE STEPS)
         ======================================================== */}
      <section id="section-template" className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              QUY CHUẨN PGS AGENCY
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mt-1">
              Cấu trúc trình bày Case Study chuẩn 10 hạng mục cốt lõi
            </h2>
            <p className="text-xs md:text-sm text-[#666666] mt-2">
              Mọi dự án tại PGS đều được bám sát theo bộ khung minh bạch để bàn giao kết quả rõ ràng nhất cho đối tác.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { num: "01", name: "Tổng quan dự án", desc: "Giới thiệu chung phân khúc" },
              { num: "02", name: "Bối cảnh doanh nghiệp", desc: "Thực trạng vận hành hiện thời" },
              { num: "03", name: "Thách thức nút thắt", desc: "Rào cản cản trở chuyển đổi" },
              { num: "04", name: "Mục tiêu hướng tới", desc: "KPIs số lượng cụ thể cam kết" },
              { num: "05", name: "Chiến lược tích hợp", desc: "Kết hợp website, seo, ads" },
              { num: "06", name: "Hạng mục thực thi", desc: "Kế hoạch hành động chi tiết" },
              { num: "07", name: "Kết quả đo lường", desc: "Lượng lead, doanh thu tăng" },
              { num: "08", name: "Bằng chứng xác thực", desc: "Dữ liệu Analytics, GSC" },
              { num: "09", name: "Bài học kinh nghiệm", desc: "Đúc rút cho tương lai" },
              { num: "10", name: "CTA Chuyển đổi", desc: "Mở phễu tư vấn tiếp theo" }
            ].map((step, i) => (
              <div key={i} className="bg-[#FAF9F6] border border-[#C5A880]/15 rounded-lg p-4 text-center hover:border-[#D4AF37] transition-all">
                <span className="text-xs font-mono font-bold text-[#D4AF37] block mb-1">{step.num}</span>
                <h4 className="text-xs font-display font-bold text-[#1A1A1A] leading-tight">{step.name}</h4>
                <p className="text-[9px] text-[#7A7A7A] mt-1 leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(9)}</div>}
      </section>

      {/* ========================================================
          SECTION 10: QUY TRÌNH TRIỂN KHAI DỰ ÁN (7 STAGES PIPELINE)
         ======================================================== */}
      <section id="section-pipeline" className="py-16 bg-[#FAF9F6] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              PGS PROJECT TIMELINE
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mt-1">
              Quy trình 7 bước xây dựng Hệ thống Tăng Trưởng Số
            </h2>
            <p className="text-xs md:text-sm text-[#666666] mt-2">
              Lộ trình đồng hành chiến lược minh bạch giúp xóa bỏ mọi lo lắng mơ hồ của chủ doanh nghiệp.
            </p>
          </div>

          {/* Interactive Steps Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
            {[
              { step: "1", title: "Discovery", sub: "Khảo sát sâu rộng", desc: "Tìm hiểu cấu trúc vận hành, rà soát đối thủ cùng ngành hàng." },
              { step: "2", title: "Audit", sub: "Đánh giá chi tiết", desc: "Kiểm toán hạ tầng website, kỹ thuật SEO và chi phí Ads cũ." },
              { step: "3", title: "Strategy", sub: "Lập chiến lược", desc: "Xây dựng sơ đồ phễu tăng trưởng đa kênh tối ưu CPA mục tiêu." },
              { step: "4", title: "Build", sub: "Tái cấu trúc", desc: "Thiết kế website CRO, viết content SEO, thiết lập phễu tracking." },
              { step: "5", title: "Launch", sub: "Kích hoạt đa kênh", desc: "Chạy chiến dịch Ads, phủ sóng bài viết, khởi động truyền thông." },
              { step: "6", title: "Measure", sub: "Đo lường ráo riết", desc: "Giám sát số liệu Analytics, GSC, kiểm soát CPA hàng ngày." },
              { step: "7", title: "Optimize", sub: "Tối ưu liên tục", desc: "A/B testing giao diện, tối ưu giá thầu Ads, nâng cao EEAT." }
            ].map((p, i) => (
              <div 
                key={i} 
                className="bg-white border border-neutral-200 rounded-xl p-4 text-center hover:shadow-md transition-all group relative"
              >
                {/* Visual Step bubble */}
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-mono font-bold text-xs mx-auto mb-3 border-2 border-[#D4AF37]/50 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  {p.step}
                </div>
                <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wide">{p.title}</h4>
                <span className="text-[10px] text-[#D4AF37] font-semibold block mt-0.5">{p.sub}</span>
                <p className="text-[10px] text-neutral-500 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(10)}</div>}
      </section>

      {/* ========================================================
          SECTION 11: FAQ CASE STUDY (ACCORDIONS)
         ======================================================== */}
      <section id="section-faq" className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              GIẢI ĐÁP THẮC MẮC
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mt-1">
              Câu hỏi thường gặp về các dự án tăng trưởng số
            </h2>
            <p className="text-xs md:text-sm text-[#666666] mt-2">
              Chúng tôi luôn giải đáp thẳng thắn, trung thực về mọi quy trình hợp tác bảo mật dữ liệu.
            </p>
          </div>

          <FaqAccordion />

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(11)}</div>}
      </section>

      {/* ========================================================
          SECTION 12: CTA - INTERACTIVE AI MARKETING AUDITOR
         ======================================================== */}
      <section id="section-auditor" className="py-16 bg-[#FAF9F6] relative overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              PGS AI Growth Auditor Engine
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1A1A1A] tracking-tight mt-1">
              Muốn PGS phân tích cơ hội tăng trưởng cho doanh nghiệp của bạn?
            </h2>
            <p className="text-xs text-[#666666] mt-2">
              Điền hồ sơ nhanh bên dưới. Máy chủ AI của chúng tôi sẽ phân tích mô hình dự án của bạn và đề xuất Kế hoạch hành động tăng trưởng số hóa ngay lập tức.
            </p>
          </div>

          <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 md:p-8 shadow-xl shadow-amber-500/[0.02]">
            <form onSubmit={handleAuditSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Domain input */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                    Website/Domain hiện tại (Nếu có)
                  </label>
                  <input 
                    type="text" 
                    placeholder="E.g. pgsagency.vn"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* Industry selector */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                    Lĩnh vực kinh doanh *
                  </label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#D4AF37] focus:outline-none transition-colors font-semibold"
                  >
                    <option value="Bán lẻ / Gia dụng thông minh">Bán lẻ / Gia dụng thông minh</option>
                    <option value="Đào tạo trực tuyến / Giáo dục">Đào tạo trực tuyến / Giáo dục</option>
                    <option value="F&B / Nhà hàng ẩm thực">F&B / Nhà hàng ẩm thực</option>
                    <option value="Thương mại điện tử E-commerce">Thương mại điện tử E-commerce</option>
                    <option value="Bất động sản / B2B Services">Bất động sản / B2B Services</option>
                    <option value="Công nghệ phần mềm SaaS">Công nghệ phần mềm SaaS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Budget selector */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                    Ngân sách Marketing hàng tháng ước tính
                  </label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#D4AF37] focus:outline-none transition-colors font-semibold"
                  >
                    <option value="Dưới 10 triệu / tháng">Dưới 10 triệu / tháng</option>
                    <option value="10-20 triệu / tháng">10-20 triệu / tháng</option>
                    <option value="20-50 triệu / tháng">20-50 triệu / tháng</option>
                    <option value="Trên 50 triệu / tháng">Trên 50 triệu / tháng</option>
                  </select>
                </div>

                {/* Growth Goal */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                    Mục tiêu chính tăng trưởng *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Pain Point */}
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                  Nỗi đau/Khó khăn lớn nhất hiện nay *
                </label>
                <textarea 
                  rows={2}
                  required
                  value={formData.painPoint}
                  onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="E.g. Khách truy cập web nhiều nhưng không điền form, chi phí CPA quá đắt đỏ..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4AF37] hover:bg-[#C59B27] disabled:bg-neutral-300 disabled:cursor-not-allowed text-neutral-950 font-bold uppercase tracking-wider py-3.5 rounded-lg text-xs transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>Hệ thống AI đang phân tích dữ liệu...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-neutral-950" />
                    <span>Nhận đề xuất kế hoạch từ PGS AI Auditor</span>
                  </>
                )}
              </button>

            </form>

            {/* Error view */}
            {apiError && (
              <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-600 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Không thể kết xuất dữ liệu tự động:</p>
                  <p>{apiError}</p>
                </div>
              </div>
            )}

            {/* Success AI Output Result Card */}
            {aiResult && (
              <div className="mt-6 border border-[#C5A880]/30 rounded-xl bg-[#FAF9F6]/80 p-5 md:p-6 shadow-inner animate-fadeIn relative">
                <div className="absolute right-4 top-4 text-[9px] font-mono font-bold text-[#D4AF37] bg-white px-2 py-0.5 border border-[#C5A880]/20 rounded uppercase">
                  AI AUDIT SCHEDULER: OK
                </div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-display font-bold text-neutral-900 text-sm">
                    Kế hoạch tăng trưởng đề xuất từ PGS AI Auditor:
                  </h4>
                </div>
                
                {/* Generated response layout container */}
                <div className="text-xs text-neutral-700 leading-relaxed space-y-4 whitespace-pre-wrap max-h-[400px] overflow-y-auto pr-2 scrollbar">
                  {aiResult}
                </div>

                <div className="mt-4 pt-3.5 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-[10px] text-neutral-500 font-mono">Bản phân tích có giá trị tư vấn chiến lược sơ bộ.</span>
                  <button 
                    onClick={() => alert("PGS Agency đã ghi nhận yêu cầu của bạn. Chuyên viên tư vấn cấp cao sẽ liên hệ trực tiếp trong thời gian sớm nhất!")}
                    className="bg-[#1A1A1A] hover:bg-black text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg transition-all"
                  >
                    Đăng ký làm việc trực tiếp với chuyên gia PGS
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Inline Handoff Spec View */}
        {handoffMode && <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">{renderSpecSheet(12)}</div>}
      </section>

      {/* ========================================================
          13. FOOTER
         ======================================================== */}
      

    </div>
  );
}
