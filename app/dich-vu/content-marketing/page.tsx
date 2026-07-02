"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Search,
  Compass,
  Shuffle,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Database,
  BarChart3,
  BookOpen,
  Settings,
  Users,
  ShieldCheck,
  Check,
  ChevronRight,
  Clock,
  Sparkles,
  Link as LinkIcon,
  MessageSquare,
  DollarSign
} from "lucide-react";

// Types for AI Topical Map Response
interface ClusterNode {
  id: string;
  label: string;
  role: string;
  description: string;
  x: number;
  y: number;
}

interface ArticleOutline {
  title: string;
  keyword: string;
  intent: string;
  type: string;
  outline: string[];
  directAnswer: string;
  eeatFactor: string;
}

interface EeatProfile {
  authorName: string;
  authorRole: string;
  credentials: string;
}

interface AiResponse {
  topic: string;
  clusterNodes: ClusterNode[];
  articles: ArticleOutline[];
  eeatProfile: EeatProfile;
}

export default function ContentServicePage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("artikel-seo");
  
  // Interactive Calculator State
  const [calcTier, setCalcTier] = useState<"foundation" | "growth" | "authority">("growth");
  const [calcQuantity, setCalcQuantity] = useState<number>(20);

  // Active FAQ Accordion State
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // AI Generator States
  const [aiKeyword, setAiKeyword] = useState<string>("niềng răng thẩm mỹ");
  const [aiIndustry, setAiIndustry] = useState<string>("Y khoa / Nha khoa");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AiResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Selected Article for Outline detail
  const [selectedArticleIdx, setSelectedArticleIdx] = useState<number>(0);

  // Default initial static Topical Map data to display before user generates their own
  const defaultTopicalMap: AiResponse = {
    topic: "Niềng Răng Thẩm Mỹ",
    clusterNodes: [
      { id: "pillar", label: "Cẩm Nang Niềng Răng Toàn Diện Từ A-Z", role: "Trang trụ cột", description: "Bao quát toàn bộ chủ đề, đóng vai trò hub liên kết.", x: 0, y: 0 },
      { id: "sub1", label: "Niềng răng giá bao nhiêu? Bảng giá chi tiết mới nhất", role: "Bài chi phí", description: "Tập trung giải quyết rào cản tài chính của khách hàng.", x: -80, y: -40 },
      { id: "sub2", label: "So sánh niềng răng Invisalign và niềng răng mắc cài", role: "Bảng so sánh", description: "Giúp người dùng lựa chọn phương pháp phù hợp.", x: 80, y: -30 },
      { id: "sub3", label: "Quy trình niềng răng chuẩn y khoa gồm mấy bước?", role: "Bài quy trình", description: "Xây dựng lòng tin bằng quy trình chuyên nghiệp minh bạch.", x: -60, y: 70 },
      { id: "sub4", label: "Niềng răng có đau không? Kinh nghiệm thực tế từ khách hàng", role: "Bài FAQ", description: "Giải quyết lo sợ, lo âu tâm lý trực tiếp.", x: 60, y: 60 },
      { id: "sub5", label: "Hành trình niềng răng hô 18 tháng thành công - Case study chị Minh", role: "Bài Case Study", description: "Bằng chứng thực tế thuyết phục nhất.", x: 0, y: -90 },
      { id: "sub6", label: "Checklist 7 thứ cần chuẩn bị trước ngày gắn mắc cài", role: "Bài Checklist", description: "Cung cấp giá trị thực tế cao, dễ viral.", x: -110, y: 20 },
    ],
    articles: [
      {
        title: "Niềng Răng Giá Bao Nhiêu? Bảng Giá Mới Nhất & Trả Góp 0%",
        keyword: "chi phí niềng răng",
        intent: "Tìm hiểu thương mại (Commercial)",
        type: "Bài phân tích chi phí",
        outline: [
          "H2: Tổng quan chi phí niềng răng trung bình hiện nay",
          "H3: Chi phí niềng răng mắc cài kim loại",
          "H3: Chi phí niềng răng mắc cài sứ/pha lê",
          "H3: Chi phí niềng răng suốt trong suốt Invisalign",
          "H2: 5 Yếu tố chính quyết định đến giá niềng răng của bạn",
          "H2: Bảng giá niềng răng chi tiết tại Nha khoa PGS",
          "H2: Quy trình niềng răng trả góp 0% lãi suất cực kỳ an toàn"
        ],
        directAnswer: "Chi phí niềng răng dao động từ 25.000.000đ đến 120.000.000đ tùy thuộc vào phương pháp lựa chọn (mắc cài kim loại, mắc cài sứ hay khay trong suốt Invisalign) và mức độ lệch lạc của răng.",
        eeatFactor: "Bảng giá phải minh bạch có dấu mộc, tư vấn bởi Bác sĩ Chuyên khoa Răng Hàm Mặt, cam kết không phát sinh chi phí."
      },
      {
        title: "So Sánh Niềng Răng Invisalign & Mắc Cài: Lựa Chọn Nào Tối Ưu?",
        keyword: "so sánh niềng răng invisalign và mắc cài",
        intent: "Tìm kiếm thông tin (Informational)",
        type: "Bảng so sánh chi tiết",
        outline: [
          "H2: Tổng quan 2 công nghệ niềng răng phổ biến nhất",
          "H2: Bảng so sánh chi tiết Invisalign và Mắc cài (Thẩm mỹ, Hiệu quả, Chi phí)",
          "H2: Khi nào nên chọn Invisalign? Khi nào bắt buộc chọn mắc cài?",
          "H2: Lời khuyên trực tiếp từ Chuyên gia Chỉnh nha PGS"
        ],
        directAnswer: "Niềng răng Invisalign vượt trội về mặt thẩm mỹ và tiện lợi khi ăn nhai, vệ sinh nhưng chi phí cao gấp 2-3 lần. Mắc cài truyền thống tối ưu về chi phí và xử lý cực tốt các ca lệch lạc nặng, phức tạp.",
        eeatFactor: "Ảnh thực tế khay Invisalign cầm trên tay, bảng so sánh trực quan, trích dẫn nghiên cứu khoa học về hiệu lực dịch chuyển răng."
      },
      {
        title: "Quy Trình Niềng Răng Chuẩn Y Khoa 6 Bước An Toàn Tuyệt Đối",
        keyword: "quy trình niềng răng",
        intent: "Tìm kiếm thông tin (Informational)",
        type: "Quy trình thực tế",
        outline: [
          "H2: Vì sao quy trình niềng răng cần đạt chuẩn Y Khoa?",
          "H2: 6 Bước trong quy trình chỉnh nha khép kín tại PGS Agency",
          "H3: Bước 1: Thăm khám, chụp X-quang và scan răng 3D",
          "H3: Bước 2: Thiết lập phác đồ điều trị Clincheck",
          "H3: Bước 3: Điều trị tổng quát trước khi niềng (sâu răng, cao răng)",
          "H3: Bước 4: Tiến hành gắn mắc cài hoặc bàn giao khay Invisalign",
          "H3: Bước 5: Tái khám định kỳ tinh chỉnh răng hàng tháng",
          "H3: Bước 6: Tháo niềng và đeo hàm duy trì bảo vệ kết quả",
          "H2: 3 Lưu ý sống còn trong suốt quá trình thực hiện"
        ],
        directAnswer: "Quy trình niềng răng chuẩn y khoa gồm 6 bước khép kín từ thăm khám, scan 3D, lập phác đồ Clincheck, gắn khí cụ, tái khám định kỳ đến tháo niềng đeo hàm duy trì.",
        eeatFactor: "Có video bác sĩ thực hiện gắn mắc cài tại phòng khám, chứng thực vô trùng đạt chuẩn Bộ Y Tế."
      }
    ],
    eeatProfile: {
      authorName: "Bác Sĩ Nguyễn Minh Đức",
      authorRole: "Trưởng khoa Chỉnh nha thẩm mỹ, Thạc sĩ Răng Hàm Mặt ĐH Y Dược",
      credentials: "15 năm kinh nghiệm chỉnh nha lâm sàng, thực hiện thành công hơn 2,500 ca Invisalign, chứng chỉ Chuyên sâu Chỉnh nha Invisalign Hoa Kỳ."
    }
  };

  // Run initial default loading or setup
  const currentMapData = aiResult || defaultTopicalMap;

  // Handle AI generator submit
  const handleGenerateTopicalMap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiKeyword.trim()) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/gemini/topical-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: aiKeyword, industry: aiIndustry }),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau.");
      }

      const data: AiResponse = await response.json();
      if (data && data.topic && data.clusterNodes) {
        setAiResult(data);
        setSelectedArticleIdx(0);
      } else {
        throw new Error("Dữ liệu phản hồi từ AI không đúng định dạng.");
      }
    } catch (err: any) {
      setAiError(err.message || "Đã xảy ra lỗi không xác định");
    } finally {
      setAiLoading(false);
    }
  };

  // Calculate pricing
  const calculatePrice = () => {
    let perWordPrice = 1200; // default for foundation
    if (calcTier === "growth") perWordPrice = 1800;
    if (calcTier === "authority") perWordPrice = 2500;

    const basePricePerArticle = 1000 * perWordPrice; // 1000 words average
    const totalCost = calcQuantity * basePricePerArticle;
    
    // Estimate organic traffic growth based on quantity
    const estTraffic = calcQuantity * 450; 
    const estKeywords = calcQuantity * 8;

    return {
      totalCost,
      estTraffic,
      estKeywords,
    };
  };

  const calcResults = calculatePrice();

  return (
    <div className="relative min-h-screen selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* HEADER SECTION */}
      

      {/* SECTION 1: HERO TOPICAL AUTHORITY ENGINE */}
      <div className="bg-gradient-to-b from-white to-stone-50 border-b border-stone-200/80">
        <section id="hero" className="relative py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gold-50 border border-gold-200 text-gold-600 text-xs px-3 py-1.5 rounded-full font-semibold max-w-max">
              <Award className="w-3.5 h-3.5" />
              <span>TOPICAL AUTHORITY CONSULTING</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.15] text-stone-950 tracking-tight">
              Dịch vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-500">Content Marketing Website</span> giúp thống trị Google
            </h1>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl leading-relaxed">
              PGS Agency xây dựng hệ thống nội dung phủ kín chủ đề theo mô hình Topic Cluster chuẩn EEAT. Giúp website tăng hàng ngàn Organic Traffic, tối ưu hóa điểm chuyển đổi tự nhiên và bứt phá thứ hạng trên kết quả tìm kiếm AI Search.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#topical-map"
                className="bg-stone-950 text-white font-semibold rounded-xl text-sm px-6 py-3.5 hover:bg-stone-900 border border-stone-950 transition-all flex items-center justify-center gap-2"
              >
                <span>Thử Demo Topical Engine</span>
                <Sparkles className="w-4 h-4 text-gold-400" />
              </a>
              <a
                href="#pricing"
                className="bg-white hover:bg-stone-50 text-stone-950 border border-stone-200 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Xem bảng báo giá</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-stone-950">450%+</span>
                <span className="text-xs text-stone-500">Tăng trưởng traffic trung bình</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-stone-950">100%</span>
                <span className="text-xs text-stone-500">Chuẩn chỉ EEAT & Tác giả thật</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-stone-950">&lt;3s</span>
                <span className="text-xs text-stone-500">Sẵn sàng cho AI Search</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Area: Quick SVG Orbit Node Visualizer */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] md:h-[450px] bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden gold-glow">
            <div className="absolute inset-0 bg-radial from-gold-50 via-transparent to-transparent opacity-60"></div>
            
            {/* Animated Orbit Background */}
            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-gold-300/60 animate-spin" style={{ animationDuration: "25s" }}></div>
            <div className="absolute w-[180px] h-[180px] rounded-full border border-stone-200/80 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}></div>
            
            {/* Core Central Node */}
            <div className="absolute z-10 w-24 h-24 rounded-full bg-stone-950 text-white flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-gold-400">
              <Database className="w-5 h-5 text-gold-400 mb-1" />
              <span className="text-[10px] font-bold font-mono tracking-tight text-gold-400">CORE HUB</span>
              <span className="text-[9px] leading-tight">Trang Trụ Cột</span>
            </div>

            {/* Orbiting Satellite Nodes */}
            <div className="absolute top-[18%] left-[24%] z-10 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-gold-200 shadow-md text-[11px] font-medium flex items-center space-x-1.5 animate-bounce" style={{ animationDuration: "4s" }}>
              <FileText className="w-3 h-3 text-gold-600" />
              <span>Bài Định Nghĩa</span>
            </div>

            <div className="absolute bottom-[20%] right-[15%] z-10 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-gold-200 shadow-md text-[11px] font-medium flex items-center space-x-1.5 animate-bounce" style={{ animationDuration: "6s", animationDelay: "1s" }}>
              <Zap className="w-3 h-3 text-gold-600" />
              <span>Bài Chi Phí</span>
            </div>

            <div className="absolute top-[40%] right-[10%] z-10 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-gold-200 shadow-md text-[11px] font-medium flex items-center space-x-1.5">
              <Shuffle className="w-3 h-3 text-gold-600" />
              <span>Bài So Sánh</span>
            </div>

            <div className="absolute bottom-[24%] left-[10%] z-10 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-gold-200 shadow-md text-[11px] font-medium flex items-center space-x-1.5">
              <Award className="w-3 h-3 text-gold-600" />
              <span>Case Study</span>
            </div>

            <div className="absolute top-[12%] right-[25%] z-10 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-gold-200 shadow-md text-[11px] font-medium flex items-center space-x-1.5">
              <HelpCircle className="w-3 h-3 text-gold-600" />
              <span>Bài FAQ</span>
            </div>

            {/* Ambient Lighting effects */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-400 uppercase tracking-widest bg-stone-50 px-2 py-1 rounded-md border border-stone-200/60">Topical Map Active</div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gold-600 bg-gold-50 px-2.5 py-1 rounded-md border border-gold-200">PGS Agency © 2026</div>
          </div>
        </section>
      </div>

      {/* SECTION 2: CONTENT WEBSITE LÀ GÌ */}
      <section id="definition" className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Định nghĩa dịch vụ</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Content Marketing Website là gì?
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Content Website không đơn thuần là những bài viết blog thông thường. Đó là một <strong>hệ thống nội dung đa dạng</strong> được thiết kế khoa học, giải quyết triệt để ý định tìm kiếm của người dùng tại từng chặng trong hành trình mua hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Blog & Bài viết SEO</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Sản xuất các bài viết chuẩn chỉnh kỹ thuật SEO, bám sát các Keyword Cluster giúp bao phủ thị trường ngách và thu về tệp khách hàng tiềm năng lớn.
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Đột phá Traffic</span>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bài Dịch vụ / Sản phẩm</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Tối ưu trang bán hàng, lột tả sâu sắc lợi ích sản phẩm, ứng dụng nghệ thuật viết thuyết phục (Copywriting) giúp chuyển đổi trực tiếp traffic thành cuộc gọi hoặc đăng ký tư vấn.
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Bứt phá Conversion Rate</span>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bài viết CEO / Founder</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Xây dựng thương hiệu cá nhân của nhà sáng lập trên website thông qua những bài chia sẻ góc nhìn chuyên môn, triết lý kinh doanh giúp gia tăng mạnh mẽ yếu tố Trust (Lòng tin).
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Đạt chuẩn EEAT khắt khe</span>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Case Study thực tế</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Nội dung kể lại chi tiết hành trình giải quyết khó khăn của khách hàng kèm các con số trực quan. Đây là loại nội dung có khả năng chốt sale cao nhất trên website.
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Proof-of-Concept thuyết phục</span>
            </div>

            {/* Card 5 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bài PR Báo chí chuyên nghiệp</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Soạn thảo thông cáo báo chí, bài phỏng vấn đặt trên các trang báo lớn kết nối tự nhiên về Website nhằm thu hút sự chú ý cộng đồng và gia tăng sức mạnh backlink.
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Tối ưu hoá Domain Authority</span>
            </div>

            {/* Card 6 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tối ưu hóa nội dung cũ</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Kiểm toán (Audit) toàn bộ các bài viết cũ đang bị tụt hạng, cập nhật thông tin mới nhất, cải tổ cấu trúc chuẩn Onpage để nhanh chóng lấy lại vị thế trên kết quả tìm kiếm.
              </p>
              <span className="text-xs font-mono text-gold-600 font-semibold uppercase tracking-wider">Mục tiêu: Giữ vững vị thế Top 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VÌ SAO CONTENT WEBSITE QUAN TRỌNG */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Giá trị cốt lõi</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Vì sao doanh nghiệp của bạn bắt buộc phải đầu tư Content Website bài bản?
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Quảng cáo trả phí (Google Ads, Facebook Ads) ngày càng đắt đỏ và dừng chạy là dừng khách. Content Marketing Website chính là <strong>&quot;Bất động sản số&quot;</strong> sinh lời dài hạn, mang đến lưu lượng khách hàng ổn định hoàn toàn miễn phí.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">Xây dựng Topical Authority tuyệt đối</h4>
                  <p className="text-slate-600 text-sm">Giúp thuật toán Google đánh giá website của bạn là một &quot;Thẩm quyền chủ đề&quot; tin cậy trong ngành.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">Nuôi dưỡng khách hàng ở mọi điểm chạm</h4>
                  <p className="text-slate-600 text-sm">Tiếp cận khách hàng từ khi họ còn đang tìm hiểu chung chung (Awareness) cho đến khi ra quyết định mua hàng (Action).</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">Sẵn sàng tuyệt đối cho kỷ nguyên AI Search</h4>
                  <p className="text-slate-600 text-sm">Sản xuất nội dung chứa câu trả lời trực tiếp sắc bén giúp hiển thị nổi bật trên kết quả AI Search (Gemini, SGE).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full blur-2xl -z-10"></div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gold-500" />
              <span>Giá trị cộng dồn tích lũy của Content SEO</span>
            </h3>

            {/* Custom SVG organic compound visual chart */}
            <div className="w-full h-64 relative bg-[#FAF9F6] rounded-xl border border-slate-200/60 p-4 mb-4 flex items-end">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Paid Ads Cost Line (Flat/High) */}
                <path d="M 0 120 Q 200 125 400 130" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="5 5" />
                
                {/* SEO Organic compounding line */}
                <path d="M 0 190 Q 80 180 150 130 T 300 60 T 400 15" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
                
                {/* Fill Area for compounding */}
                <path d="M 0 190 Q 80 180 150 130 T 300 60 T 400 15 L 400 200 L 0 200 Z" fill="url(#goldGrad)" opacity="0.1" />

                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#FAF9F6" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded border border-slate-200 text-[10px] font-mono shadow-sm flex flex-col space-y-1">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-0.5 bg-gold-500 inline-block"></span>
                  <span className="text-slate-700">SEO Traffic (Cộng dồn)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-0.5 bg-rose-500 inline-block stroke-dasharray"></span>
                  <span className="text-slate-500">Chi phí Ads (Tăng dần)</span>
                </span>
              </div>
              
              <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 px-2 z-10">
                <span>Tháng 1</span>
                <span>Tháng 4</span>
                <span>Tháng 8</span>
                <span>Tháng 12</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed italic text-center">
              Sau 6-12 tháng xây dựng Topical Map, chi phí thu hút một khách hàng của SEO giảm từ 5 - 10 lần so với chạy Ads thông thường.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTENT WEBSITE KHÁC CONTENT SOCIAL */}
      <section id="different" className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">So sánh trực quan</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">Content Website khác gì Content Social?</h2>
            <p className="text-slate-600 text-sm">Đừng nhầm lẫn giữa hai kênh truyền thông, hãy phân bổ ngân sách đúng cách.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-[#FAF9F6]">
              <thead>
                <tr className="bg-slate-900 text-white text-sm font-semibold uppercase font-display border-b border-slate-800">
                  <th className="p-5 md:p-6">Tiêu chí so sánh</th>
                  <th className="p-5 md:p-6 text-gold-400">Content Website (SEO)</th>
                  <th className="p-5 md:p-6 text-slate-400">Content Social (Facebook / TikTok)</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-200/80 bg-white">
                <tr>
                  <td className="p-5 md:p-6 font-semibold text-slate-900">Vòng đời bài viết</td>
                  <td className="p-5 md:p-6 text-slate-700 bg-gold-50/20"><strong>Trường tồn (Nhiều năm)</strong>, liên tục mang về traffic miễn phí nếu giữ vững thứ hạng.</td>
                  <td className="p-5 md:p-6 text-slate-600"><strong>Cực ngắn (24h - 48h)</strong>, nhanh chóng bị trôi bài trên dòng thời gian.</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-6 font-semibold text-slate-900">Tâm thế người đọc</td>
                  <td className="p-5 md:p-6 text-slate-700 bg-gold-50/20"><strong>Chủ động tìm kiếm</strong> giải pháp cho vấn đề của họ (Intent cực cao).</td>
                  <td className="p-5 md:p-6 text-slate-600"><strong>Bị động lướt giải trí</strong>, ngắt quãng trải nghiệm (Intent trung bình/thấp).</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-6 font-semibold text-slate-900">Định dạng & Độ sâu</td>
                  <td className="p-5 md:p-6 text-slate-700 bg-gold-50/20">Bài viết dài, sâu sắc, có cấu trúc H2/H3 chặt chẽ, tối ưu dữ liệu, bảng biểu, FAQ.</td>
                  <td className="p-5 md:p-6 text-slate-600">Bài viết ngắn, hình ảnh bắt mắt, video giật gân, chủ yếu kích thích cảm xúc tức thời.</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-6 font-semibold text-slate-900">Tính tích lũy tài sản</td>
                  <td className="p-5 md:p-6 text-slate-700 bg-gold-50/20"><strong>Có tính tích lũy cao</strong>. Càng nhiều bài viết chất lượng, uy tín website càng lớn.</td>
                  <td className="p-5 md:p-6 text-slate-600"><strong>Không tích lũy</strong>. Dừng đăng bài, lượng tiếp cận và tương tác gần như về không.</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-6 font-semibold text-slate-900">Tính năng đo lường</td>
                  <td className="p-5 md:p-6 text-slate-700 bg-gold-50/20">Theo dõi chuẩn xác: Impression, Click, Time on Page, tỉ lệ nhấp CTA của từng bài.</td>
                  <td className="p-5 md:p-6 text-slate-600">Chủ yếu đo lường: Like, Share, Comment, View (dễ ảo, khó quy đổi ra doanh thu trực tiếp).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: CÁC LOẠI CONTENT PGS TRIỂN KHAI */}
      <section id="services" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Hệ sinh thái dịch vụ</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
            Các loại nội dung chuẩn mực PGS xây dựng cho bạn
          </h2>
          <p className="text-slate-600 text-sm">
            Từng dòng nội dung đều được viết bởi các biên tập viên chuyên môn sâu, có kiểm chứng y khoa hoặc nghiệp vụ chuyên ngành.
          </p>
        </div>

        {/* Categories navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "artikel-seo", label: "Bài SEO Topic Cluster" },
            { id: "landingpage", label: "Bài Dịch vụ / Landing Page" },
            { id: "case-study", label: "Case Study Dự Án" },
            { id: "authoritative", label: "Bài EEAT / Founder" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-slate-950 text-gold-400 border border-slate-950 shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents showcase */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 md:p-12">
          {activeTab === "artikel-seo" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="font-mono text-xs text-gold-600 font-bold tracking-widest uppercase">Phân khúc nền tảng</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">Bài viết SEO theo cấu trúc Topic Cluster</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Thay vì viết bài đơn lẻ bám đuôi từ khóa riêng biệt, PGS Agency nghiên cứu lập một sơ đồ mạng lưới từ khóa bao gồm <strong>Trang trụ cột (Pillar Page)</strong> và các <strong>Bài viết vệ tinh (Sub-topic cluster)</strong>.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Nghiên cứu Intent sâu sắc của người dùng ngách</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Cấu trúc thẻ heading H1, H2, H3 chặt chẽ không trùng lặp</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Độ dài chuẩn SEO 1500 - 3000 từ tùy theo đối thủ cạnh tranh</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200/80 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Mã hóa bài viết: #SEO-CLUSTER</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px]">Đang SEO Top 1</span>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-800 font-bold">[Keyword]: niềng răng trong suốt bao nhiêu tiền</p>
                  <p className="text-slate-500">→ Cấu trúc phân phối link nội bộ:</p>
                  <div className="p-3 bg-white rounded border border-slate-150 space-y-1">
                    <div className="text-slate-800 font-bold flex items-center space-x-1">
                      <LinkIcon className="w-3.5 h-3.5 text-gold-500" />
                      <span>Anchor text: bảng giá niềng răng Invisalign</span>
                    </div>
                    <p className="text-slate-400">Trỏ về: /dich-vu/nieng-rang-invisalign (Trang dịch vụ)</p>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 italic">Đã đo lường: Thời gian đọc trung bình đạt 4 phút 15 giây.</div>
              </div>
            </div>
          )}

          {activeTab === "landingpage" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="font-mono text-xs text-gold-600 font-bold tracking-widest uppercase">Phân khúc chuyển đổi</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">Bài Dịch Vụ / Landing Page chốt Sales</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Trang đích được thiết kế bằng ngôn từ thôi miên (Conversion Copywriting), xoáy sâu nỗi đau thầm kín của khách hàng, vẽ ra viễn cảnh tốt đẹp và cam kết uy tín tuyệt đối để kích hoạt đăng ký tư vấn lập tức.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Áp dụng công thức kinh điển: PAS, AIDA, FAB</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Bố trí nút kêu gọi hành động (CTA) tại đúng &quot;điểm nóng&quot; thị giác</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Hài hòa giữa text thuyết phục và mockup hình ảnh dịch vụ trực quan</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="text-xs font-mono text-slate-500 border-b border-slate-200 pb-2">CHIẾN THUẬT PAS (Pain - Agitate - Solve)</div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
                  <strong>Pain (Nỗi đau):</strong> Răng khấp khểnh khiến bạn tự ti không dám cười khi chụp ảnh chung với đồng nghiệp?
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded text-xs text-orange-950 leading-relaxed">
                  <strong>Agitate (Kích thích):</strong> Để lâu ngày, khớp cắn lệch gây mỏi quai hàm, mòn men răng và thậm chí rụng răng sớm ở tuổi 40.
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950 leading-relaxed">
                  <strong>Solve (Giải quyết):</strong> Công nghệ niềng răng thẩm mỹ PGS - trả lại nụ cười rạng rỡ chỉ sau 18 tháng với chi phí siêu tiết kiệm.
                </div>
              </div>
            </div>
          )}

          {activeTab === "case-study" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="font-mono text-xs text-gold-600 font-bold tracking-widest uppercase">Phân khúc lòng tin</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">Nội dung Case Study thực tiễn người thật việc thật</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Khách hàng hiện đại không tin vào quảng cáo hoa mỹ. Họ tin vào các câu chuyện thành công có thật. PGS thiết kế các bài viết Case Study chuyên sâu, kể lại chi tiết quá trình giải cứu vấn đề của khách hàng cũ.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Sử dụng cấu trúc: Bối cảnh → Thách thức → Giải pháp → Con số kết quả</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Lồng ghép phỏng vấn trực tiếp cảm nghĩ chân thực nhất</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Có ảnh thực tế chụp trước-sau vô cùng trực quan và thuyết phục</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] font-mono">
                  <span className="text-slate-400">CASE STUDY METRICS</span>
                  <span className="text-gold-400">PGS AGENCY EXCLUSIVE</span>
                </div>
                <div className="text-sm font-bold text-slate-200">Dự án niềng răng Invisalign khớp cắn ngược của chị Vy (Hà Nội):</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-slate-400 block">THỜI GIAN ĐIỀU TRỊ</span>
                    <span className="text-lg font-bold text-gold-400">14 Tháng</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-slate-400 block">KẾT QUẢ ĐẠT</span>
                    <span className="text-lg font-bold text-emerald-400">Chuẩn Khớp Cắn 100%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &quot;Tôi từng sợ bị hóp má khi niềng, nhưng nhờ phác đồ Clincheck định kỳ của bác sĩ, răng đều tăm tắp mà mặt gọn gàng xinh đẹp hơn nhiều!&quot;
                </p>
              </div>
            </div>
          )}

          {activeTab === "authoritative" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="font-mono text-xs text-gold-600 font-bold tracking-widest uppercase">Phân khúc quyền lực</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">Bài viết EEAT của chuyên gia & Nhà sáng lập</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Để vượt qua thuật toán Google Core Update khốc liệt, website của bạn bắt buộc phải thể hiện được yếu tố EEAT (Kinh nghiệm, Chuyên môn, Thẩm quyền, Uy tín). PGS xây dựng những bài viết bày tỏ góc nhìn chuyên gia chất lượng cao.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Nội dung được cố vấn hoặc trực tiếp ký tên bởi các chuyên gia trong ngành</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Lồng ghép sâu sắc hồ sơ tác giả (Author Profile Schema) và liên kết mạng xã hội uy tín</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span>Đạt tiêu chuẩn tuyệt đối về nguồn trích dẫn nghiên cứu y học / báo cáo chính phủ</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold-200 flex items-center justify-center font-display font-bold text-slate-800 border border-gold-300 text-sm">BS</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Bác sĩ Trần Quốc Trung</h4>
                    <p className="text-[11px] text-slate-500">Thạc sĩ Y khoa - Chuyên gia Răng Hàm Mặt ĐH Y Hà Nội</p>
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-150 rounded text-[11px] text-slate-600 leading-relaxed mb-4">
                  <strong>Thông điệp kiểm duyệt EEAT:</strong> &quot;Tất cả bài viết về nha khoa tại PGS đều trải qua quá trình phản biện khoa học gắt gao của tôi để bảo đảm an toàn sức khỏe độc giả.&quot;
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Author Schema: Verified</span>
                  <span className="text-gold-600">Google Trusted ✔</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: QUY TRÌNH NGHIÊN CỨU KEYWORD & PIPELINE */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Phương pháp kỹ thuật</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Quy trình nghiên cứu từ khóa khoa học tại PGS Agency
            </h2>
            <p className="text-slate-600 text-sm">
              Chúng tôi không phỏng đoán, chúng tôi phân tích hành vi người dùng bằng các công cụ hàng đầu như Ahrefs, SEMrush để phân bổ Search Intent chính xác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">1</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Keyword Gốc (Seed)</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Tìm kiếm các từ khóa gốc có lưu lượng tìm kiếm lớn nhất ngành của bạn.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">2</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Phân Tích Intent</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Xác định khách hàng đang cần thông tin (Info) hay muốn so sánh giá để mua (Commercial).</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">3</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Tìm Câu Hỏi Phụ</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Khai thác câu hỏi phụ tại Google Autocomplete và &quot;People Also Ask&quot; để phủ thông tin.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">4</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Thiết lập Topic Cluster</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Gộp nhóm các từ khóa liên quan thành một khối nội dung duy nhất tránh cạnh tranh nội bộ.</p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">5</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Dựng Topical Map</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Liên kết tất cả các cụm từ khóa bằng sơ đồ liên kết nội bộ khoa học truyền dòng sức mạnh.</p>
            </div>

            {/* Step 6 */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 relative group">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center font-mono font-bold text-xs border border-gold-400">6</div>
              <h4 className="font-bold text-slate-900 mb-2 mt-2">Ưu tiên chuyển đổi</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Lên lịch triển khai các từ khóa đem lại leads trực tiếp trước nhằm tạo doanh thu nhanh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7, 8 & 9: INTERACTIVE TOPICAL AUTHORITY ENGINE (REAL GEMINI INTEGRATION) */}
      <section id="topical-map" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-slate-950 rounded-3xl text-white p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span>TOPICAL AUTHORITY ENGINE (REAL AI ENGINE)</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Công cụ thử nghiệm lập bản đồ chủ đề bằng AI
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              PGS Agency tiên phong ứng dụng trí tuệ nhân tạo Gemini để mô phỏng và xây dựng Topical Map thần tốc. Hãy nhập từ khóa lĩnh vực của bạn để xem cỗ máy lập kế hoạch ngay lập tức.
            </p>
          </div>

          <form onSubmit={handleGenerateTopicalMap} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white/5 p-6 rounded-2xl border border-white/10 mb-10">
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Nhập Từ Khóa Mục Tiêu</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={aiKeyword}
                  onChange={(e) => setAiKeyword(e.target.value)}
                  placeholder="Ví dụ: niềng răng Invisalign, thiết kế nhà phố..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Lĩnh Vực Kinh Doanh</label>
              <input
                type="text"
                value={aiIndustry}
                onChange={(e) => setAiIndustry(e.target.value)}
                placeholder="Ví dụ: Nha khoa, Nội thất, Đào tạo..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={aiLoading}
                className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-slate-800 text-slate-950 font-semibold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 border border-gold-400"
              >
                {aiLoading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Đang tính toán...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-slate-950" />
                    <span>Lập Bản Đồ Ngay</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {aiError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-200 p-4 rounded-xl text-xs mb-6">
              Lỗi: {aiError}. Chúng tôi đã tải dữ liệu mô phỏng chất lượng cao bên dưới để bạn tiếp tục trải nghiệm.
            </div>
          )}

          {/* DYNAMIC RESULTS CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/10">
            
            {/* Visual Cluster Map representation (SVG graph nodes) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold font-mono tracking-wider text-gold-400 uppercase">
                1. Sơ đồ Topic Cluster: &quot;{currentMapData.topic}&quot;
              </h3>
              
              <div className="h-[280px] md:h-[320px] bg-slate-900 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                {/* Visual grid inside */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                  {currentMapData.clusterNodes.map((node) => {
                    if (node.id === "pillar") return null;
                    return (
                      <line
                        key={node.id}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (node.x / 2.5)}%`}
                        y2={`${50 + (node.y / 2.5)}%`}
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                    );
                  })}
                </svg>

                {/* Central Node */}
                <div className="absolute z-20 w-24 h-24 rounded-full bg-gold-500 text-slate-950 font-bold text-center text-[10px] leading-tight flex flex-col items-center justify-center p-2.5 shadow-lg border border-white">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-800">Trụ Cột</span>
                  <span className="line-clamp-2 mt-0.5">{currentMapData.topic}</span>
                </div>

                {/* Satellite Nodes */}
                {currentMapData.clusterNodes.map((node) => {
                  if (node.id === "pillar") return null;
                  return (
                    <div
                      key={node.id}
                      className="absolute z-10 bg-slate-950 border border-gold-500/40 hover:border-gold-400 text-white rounded-lg p-2 text-[9px] font-medium max-w-[120px] shadow-lg cursor-pointer transition-all hover:scale-105"
                      style={{
                        transform: "translate(-50%, -50%)",
                        left: `${50 + (node.x / 2.5)}%`,
                        top: `${50 + (node.y / 2.5)}%`,
                      }}
                      title={`${node.role}: ${node.description}`}
                    >
                      <span className="block text-gold-400 text-[8px] font-bold font-mono tracking-wider">{node.role}</span>
                      <span className="line-clamp-2 text-slate-200">{node.label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 italic text-center">
                Mẹo: Hover vào các nút vệ tinh để hiểu vai trò của chúng trong việc nâng đỡ bài trụ cột chính.
              </p>
            </div>

            {/* Generated Articles & Detailed Outlines */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold font-mono tracking-wider text-gold-400 uppercase">
                2. Kế hoạch Outlines viết bài chi tiết chuẩn SEO / AI Search
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {currentMapData.articles.map((art, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedArticleIdx(idx)}
                    className={`p-2.5 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                      selectedArticleIdx === idx
                        ? "bg-gold-500 text-slate-950 border-gold-400 shadow-md"
                        : "bg-slate-900 text-slate-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="block opacity-60 text-[8px] uppercase font-mono tracking-wider">Bài {idx + 1}</span>
                    <span className="line-clamp-1">{art.title}</span>
                  </button>
                ))}
              </div>

              {currentMapData.articles[selectedArticleIdx] && (
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/10 space-y-4">
                  <div>
                    <span className="inline-block bg-gold-500/10 text-gold-400 border border-gold-500/30 font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase mb-2">
                      {currentMapData.articles[selectedArticleIdx].type}
                    </span>
                    <h4 className="text-lg font-display font-bold text-white leading-snug">
                      {currentMapData.articles[selectedArticleIdx].title}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                      <span>🔑 Từ khóa mục tiêu: <strong>{currentMapData.articles[selectedArticleIdx].keyword}</strong></span>
                      <span>🎯 Intent: <strong>{currentMapData.articles[selectedArticleIdx].intent}</strong></span>
                    </div>
                  </div>

                  {/* Direct Answer Box Section 8 */}
                  <div className="bg-gold-500/5 p-4 rounded-xl border border-gold-500/20 space-y-1.5">
                    <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Tối ưu Featured Snippet (AI Search Response)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;{currentMapData.articles[selectedArticleIdx].directAnswer}&quot;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">Cấu trúc đề mục (Heads outline):</span>
                    <ul className="text-xs space-y-1.5 bg-slate-950/60 p-4 rounded-xl border border-white/5 font-mono text-slate-300">
                      {currentMapData.articles[selectedArticleIdx].outline.map((head, hIdx) => (
                        <li key={hIdx} className={head.startsWith("H3") ? "pl-4 text-slate-400" : "text-slate-200"}>
                          {head}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* EEAT factor */}
                  <div className="flex items-start space-x-2 text-xs bg-slate-950/40 p-3 rounded-lg border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono">Yếu tố xác minh độ tin cậy (E-E-A-T):</span>
                      <p className="text-slate-300 mt-0.5 text-[11px]">{currentMapData.articles[selectedArticleIdx].eeatFactor}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Author box for EEAT */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-gold-400 flex items-center justify-center font-display font-bold text-gold-400 text-sm shrink-0">
                  {currentMapData.eeatProfile.authorName.split(" ").slice(-1)[0][0]}
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block font-bold">PGS Verified Author (Đề xuất tối ưu EEAT)</span>
                  <h4 className="text-sm font-bold text-white">{currentMapData.eeatProfile.authorName}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{currentMapData.eeatProfile.authorRole}</p>
                  <p className="text-xs text-slate-400 italic font-mono leading-relaxed">{currentMapData.eeatProfile.credentials}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: INTERNAL LINK & CTA FLOW */}
      <section className="bg-[#FAF9F6] py-20 px-6 md:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Chiến lược phễu</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">Luồng phân bổ liên kết nội bộ & Tối ưu chuyển đổi</h2>
            <p className="text-slate-600 text-sm">Chúng tôi thiết kế luồng di chuyển của độc giả từ khi đọc thông tin chung cho đến khi ký hợp đồng dịch vụ.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center relative">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-xs">A</div>
              <h4 className="font-bold text-slate-900 mb-2">1. Thu hút Độc giả</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Độc giả truy cập thông qua các bài Blog SEO hữu ích giải đáp nỗi lo lắng.</p>
              <div className="mt-4 text-[10px] font-mono bg-slate-50 py-1 rounded text-slate-400 border border-slate-150">Topical map cluster items</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center">
              <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-xs">B</div>
              <h4 className="font-bold text-slate-900 mb-2">2. Định hướng chuyên môn</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Link nội bộ tự nhiên dẫn dắt độc giả sang các trang Trụ cột và dịch vụ chi tiết.</p>
              <div className="mt-4 text-[10px] font-mono bg-gold-50 py-1 rounded text-gold-600 border border-gold-150 font-bold">Anchor text tối ưu Sức Mạnh</div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-gold-400 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-xs">C</div>
              <h4 className="font-bold text-slate-900 mb-2">3. Chứng thực lòng tin</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Giới thiệu các Case Study thực tế để giải quyết triệt để rào cản phòng vệ tâm lý.</p>
              <div className="mt-4 text-[10px] font-mono bg-slate-50 py-1 rounded text-slate-400 border border-slate-150">Real case studies proof</div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 relative text-center shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-xs">D</div>
              <h4 className="font-bold text-gold-400 mb-2">4. Đăng ký tư vấn</h4>
              <p className="text-slate-300 text-xs leading-relaxed">Form thu lead tối giản, kích hoạt các ưu đãi giảm giá độc quyền chốt đơn nhanh.</p>
              <div className="mt-4 text-[10px] font-mono bg-gold-500/10 py-1 rounded text-gold-400 border border-gold-500/20 animate-pulse font-bold">KÊU GỌI HÀNH ĐỘNG (CTA)</div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: DASHBOARD KPI CONTENT WEBSITE */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Đo lường khoa học</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              PGS kiểm soát hiệu quả thông qua Dashboard KPI minh bạch
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Chúng tôi không làm báo cáo sơ sài bằng file Word. Khách hàng của PGS sẽ được cấp một tài khoản Dashboard thời gian thực, kết nối chuẩn xác với Google Analytics, Google Search Console để theo dõi hiệu quả đầu tư từng đồng.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-mono block">CLICK & IMPRESSIONS</span>
                <span className="text-lg font-bold text-slate-900">Thời gian thực</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-mono block">THỜI GIAN ĐỌC BÀI</span>
                <span className="text-lg font-bold text-slate-900">Theo dõi chuẩn xác</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-mono block">SỐ LƯỢNG LEADS</span>
                <span className="text-lg font-bold text-slate-900">Quy đổi trực tiếp</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-mono block">VỊ TRÍ TỪ KHÓA</span>
                <span className="text-lg font-bold text-slate-900">Cập nhật mỗi ngày</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base">Mô hình theo dõi KPI của PGS Agency</h3>
                <p className="text-xs text-slate-500">Mẫu thống kê tăng trưởng organic traffic của 1 dự án thực tế</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">ONLINE DỮ LIỆU</span>
            </div>

            {/* Interactive representation of metrics */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Tỷ lệ bài viết được Google Index (Lập chỉ mục)</span>
                  <span className="text-gold-600 font-bold">100%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Độ bao phủ Topical Map mục tiêu</span>
                  <span className="text-gold-600 font-bold">95%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Thời gian On-page trung bình của độc giả</span>
                  <span className="text-gold-600 font-bold">4 phút 30 giây</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Tỷ lệ cải thiện chi phí thu hút lead (CAC)</span>
                  <span className="text-emerald-600 font-bold">-65% chi phí</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 12: DỰ ÁN THỰC TẾ CONTENT WEBSITE */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Kết quả chứng thực</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Dự án thực tế Content Website do PGS Agency vận hành
            </h2>
            <p className="text-slate-600 text-sm">
              Xem cách chúng tôi biến đổi toàn diện các hệ thống website của khách hàng bằng phương pháp Topical Authority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Case 1 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-gold-100 text-gold-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">Lĩnh vực: Nha khoa Thẩm Mỹ</span>
                <h4 className="text-xl font-bold text-slate-900 leading-snug">Hệ Thống Nha Khoa Quốc Tế Hà Nội</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Thách thức:</strong> Thương hiệu mới mở, độ uy tín website bằng 0, giá chạy ads Invisalign cực kỳ đắt đỏ (800K - 1M/lead).
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Giải pháp PGS:</strong> Xây dựng Topical Map gồm 150 bài viết xoay quanh chuyên sâu các bệnh lý chỉnh nha, răng sứ, có bác sĩ chuyên môn cố vấn y khoa.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">ORGANIC LEADS</span>
                  <span className="text-base font-bold text-emerald-600">+350/Tháng</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">TRAFFIC TĂNG</span>
                  <span className="text-base font-bold text-gold-600">450% sau 6T</span>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-gold-100 text-gold-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">Lĩnh vực: Đào Tạo Anh Ngữ</span>
                <h4 className="text-xl font-bold text-slate-900 leading-snug">Học Viện Anh Ngữ Quốc Tế chuẩn Cambridge</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Thách thức:</strong> Độ cạnh tranh từ khóa cực lớn từ các ông lớn, website cũ kỹ nội dung nghèo nàn, tỷ lệ thoát trang đạt 85%.
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Giải pháp PGS:</strong> Tối ưu hóa lại toàn bộ bài viết cũ, tạo 80 cụm Keyword Cluster ngách (Ví dụ: học IELTS cho học sinh cấp 2, tiếng Anh giao tiếp đi làm).
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">BOUNCE RATE</span>
                  <span className="text-base font-bold text-emerald-600">Giảm còn 42%</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">TOP 3 KEYWORDS</span>
                  <span className="text-base font-bold text-gold-600">+120 Từ khóa</span>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-gold-100 text-gold-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">Lĩnh vực: Nội Thất Cao Cấp</span>
                <h4 className="text-xl font-bold text-slate-900 leading-snug">Nội Thất Gỗ Óc Chó Royal Design</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Thách thức:</strong> Giá trị sản phẩm rất lớn (hàng trăm triệu/đơn), khách hàng cực kỳ khó tính và cần tìm hiểu rất kỹ, website thiếu tính thuyết phục.
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>Giải pháp PGS:</strong> Xây dựng các trang cẩm nang hướng dẫn thi công kèm hình ảnh sắc nét, viết 15 bài Case Study bàn giao biệt thự thực tế chi tiết từng góc cạnh.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">TỶ LỆ CHUYỂN ĐỔI</span>
                  <span className="text-base font-bold text-emerald-600">Tăng gấp 3.2 lần</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">DOANH THU SEO</span>
                  <span className="text-base font-bold text-gold-600">+1.5 Tỷ/Tháng</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13: GÓI CONTENT & BÁO GIÁ + CALCULATOR */}
      <section id="pricing" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Báo giá minh bạch</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
            Các gói dịch vụ Content Marketing Website tại PGS Agency
          </h2>
          <p className="text-slate-600 text-sm">
            Chúng tôi cam kết chất lượng nội dung tốt nhất thị trường, bồi thường 200% nếu phát hiện copy hoặc bài tự động bằng AI kém chất lượng.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Tier 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between relative shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">CƠ BẢN</span>
                <h4 className="text-2xl font-display font-bold text-slate-900">Content SEO Foundation</h4>
                <p className="text-slate-500 text-xs mt-1">Phù hợp cho doanh nghiệp nhỏ muốn đặt nền móng SEO ban đầu.</p>
              </div>
              <div className="py-4 border-y border-slate-100">
                <span className="text-3xl font-bold text-slate-900">12.000.000đ</span>
                <span className="text-xs text-slate-500"> / Tháng (10 bài viết)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Nghiên cứu 1 cụm Keyword Cluster nhỏ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Bài viết đạt độ dài 1000 - 1200 từ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Tối ưu hóa hình ảnh chuẩn On-page</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Báo cáo vị trí từ khóa hàng tháng</span>
                </li>
              </ul>
            </div>
            <a href="#contact" className="mt-8 w-full py-3 rounded-xl border border-slate-300 text-slate-900 text-center font-bold text-xs hover:bg-slate-50 transition-colors">
              Đăng ký Gói Foundation
            </a>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-950 text-white p-8 rounded-3xl border border-gold-400 flex flex-col justify-between relative shadow-xl gold-glow transform -translate-y-2">
            <div className="absolute -top-3.5 right-6 bg-gold-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full border border-white">
              GÓI ĐỀ XUẤT NHIỀU NHẤT
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">TĂNG TRƯỞNG</span>
                <h4 className="text-2xl font-display font-bold text-gold-400">Content Growth Master</h4>
                <p className="text-slate-400 text-xs mt-1">Phù hợp cho các doanh nghiệp vừa muốn bứt phá lưu lượng truy cập.</p>
              </div>
              <div className="py-4 border-y border-white/10">
                <span className="text-3xl font-bold text-gold-400">22.000.000đ</span>
                <span className="text-xs text-slate-400"> / Tháng (20 bài viết)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-400 stroke-[3]" />
                  <span>Thiết lập Bản đồ chủ đề (Topical Map) hoàn chỉnh</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-400 stroke-[3]" />
                  <span>Hỗ trợ tối ưu hóa bài viết cũ miễn phí</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-400 stroke-[3]" />
                  <span>Bài viết chuyên sâu 1200 - 1500 từ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-400 stroke-[3]" />
                  <span>Xây dựng sơ đồ liên kết nội bộ (Internal Links Flow)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-400 stroke-[3]" />
                  <span>Tài khoản Google Analytics / Search Console KPI Dashboard</span>
                </li>
              </ul>
            </div>
            <a href="#contact" className="mt-8 w-full py-3 rounded-xl bg-gold-500 text-slate-950 text-center font-bold text-xs hover:bg-gold-600 transition-colors border border-gold-400 shadow-md">
              Đăng ký Gói Growth
            </a>
          </div>

          {/* Tier 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between relative shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">THẨM QUYỀN TUYỆT ĐỐI</span>
                <h4 className="text-2xl font-display font-bold text-slate-900">Content Authority Hub</h4>
                <p className="text-slate-500 text-xs mt-1">Dành cho thương hiệu đầu ngành muốn thống trị hoàn toàn tìm kiếm.</p>
              </div>
              <div className="py-4 border-y border-slate-100">
                <span className="text-3xl font-bold text-slate-900">38.000.000đ</span>
                <span className="text-xs text-slate-500"> / Tháng (30 bài viết)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Triển khai Topic Cluster phủ 100% ngành ngách</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Ký chứng thực tác giả chuyên môn đạt chuẩn EEAT cao nhất</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Tối ưu hóa Featured Snippet / Trả lời AI Search</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Cung cấp 3 bài Case Study độc quyền thiết kế riêng</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-gold-500 stroke-[3]" />
                  <span>Tặng kèm 2 bài viết PR báo điện tử lớn hàng tháng</span>
                </li>
              </ul>
            </div>
            <a href="#contact" className="mt-8 w-full py-3 rounded-xl border border-slate-300 text-slate-900 text-center font-bold text-xs hover:bg-slate-50 transition-colors">
              Đăng ký Gói Authority
            </a>
          </div>

        </div>

        {/* Interactive KPI & Price Cost Calculator */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 max-w-4xl mx-auto">
          <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center space-x-2 justify-center">
            <DollarSign className="w-5 h-5 text-gold-500" />
            <span>Công cụ tính ngân sách & Dự báo hiệu quả của PGS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">1. Chọn Phân Khúc Chất Lượng Bài Viết</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcTier("foundation")}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      calcTier === "foundation" ? "bg-slate-950 text-gold-400 border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Foundation
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcTier("growth")}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      calcTier === "growth" ? "bg-slate-950 text-gold-400 border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Growth Master
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcTier("authority")}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      calcTier === "authority" ? "bg-slate-950 text-gold-400 border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Authority Hub
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">2. Số Lượng Bài Viết Cần Triển Khai: <span className="text-gold-600 font-bold text-sm">{calcQuantity} bài</span></label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>5 bài</span>
                  <span>50 bài</span>
                  <span>100 bài</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider text-center">Ước tính hiệu quả & Chi phí đầu tư</span>
              
              <div className="text-center py-4 border-b border-slate-100">
                <span className="text-xs text-slate-500 block">TỔNG CHI PHÍ ƯỚC TÍNH</span>
                <span className="text-2xl md:text-3xl font-display font-bold text-slate-900">
                  {calcResults.totalCost.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">DỰ KIẾN KEYWORDS TOP</span>
                  <span className="text-sm font-bold text-gold-600">~{calcResults.estKeywords} từ khóa</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">DỰ KIẾN LƯỢT CLICK / THÁNG</span>
                  <span className="text-sm font-bold text-gold-600">~{calcResults.estTraffic.toLocaleString("vi-VN")} click</span>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-400 leading-relaxed text-center italic">
                * Dự báo mang tính chất tham khảo dựa trên kết quả trung bình của 120 dự án cũ cùng phân khúc.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 14: FAQ MỞ RỘNG (ACCORDION) */}
      <section id="faq" className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Hỗ trợ độc giả</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">Câu hỏi thường gặp về dịch vụ</h2>
            <p className="text-slate-600 text-sm">Giải đáp nhanh những băn khoăn phổ biến nhất trước khi tiến hành ký kết hợp đồng.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Một bài viết chuẩn SEO của PGS Agency dài trung bình bao nhiêu từ?",
                a: "Độ dài trung bình dao động từ 1500 - 3000 từ. PGS không cố định số lượng từ một cách rập khuôn, mà tiến hành nghiên cứu khối lượng thông tin cần thiết từ Top 5 đối thủ cạnh tranh trên Google để lập độ dài tối ưu, bảo đảm bao phủ đầy đủ chủ đề tốt nhất."
              },
              {
                q: "PGS Agency có bảo đảm tối ưu hóa bài viết sẵn sàng cho AI Search (Google Gemini, SGE) không?",
                a: "Chắc chắn có. PGS thiết kế bài viết có các khối câu trả lời trực tiếp sắc bén (Direct Answers Block), cấu trúc hóa bảng biểu so sánh, FAQ schema để thuật toán AI Search dễ dàng trích xuất thông tin hiển thị ưu tiên hàng đầu."
              },
              {
                q: "Doanh nghiệp có cần tự cung cấp chuyên gia để PGS thực hiện yếu tố EEAT không?",
                a: "Nếu doanh nghiệp có sẵn chuyên gia, PGS sẽ tiến hành phỏng vấn chuyên gia để lấy tư liệu thô. Nếu doanh nghiệp không có, PGS sẽ kết nối cố vấn với các chuyên gia y tế, kỹ sư, thạc sĩ có tiếng trong mạng lưới của chúng tôi để hiệu đính nội dung và bảo đảm độ tin cậy tuyệt đối với Google."
              },
              {
                q: "PGS Agency đo lường hiệu quả bài viết bằng những chỉ số nào?",
                a: "Chúng tôi cam kết đo lường dựa trên các con số thực tế: Thứ hạng từ khóa tăng, tỷ lệ Index của Google đạt 100%, tỷ lệ On-page trung bình trên 3 phút, số lượt click từ tìm kiếm tự nhiên và quan trọng nhất là số lượng đăng ký lead đổ về."
              },
              {
                q: "PGS có nhận viết tối ưu lại các bài viết cũ đang bị mất thứ hạng không?",
                a: "Có, đây là một dịch vụ cực kỳ hiệu quả thuộc phân mục Content Audit. Chúng tôi sẽ rà soát các bài cũ đang tụt thứ hạng, nghiên cứu lại intent mới nhất, cấu trúc lại bài, bổ sung thông tin cập nhật năm 2026 và khai báo Google để lấy lại thứ hạng nhanh chóng."
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-[#FAF9F6] shadow-sm">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full py-5 px-6 text-left font-bold text-slate-950 flex justify-between items-center text-sm md:text-base hover:bg-slate-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpen === idx ? "transform rotate-180 text-gold-600" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white border-t border-slate-100"
                    >
                      <div className="p-6 text-xs md:text-sm text-slate-600 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: DỊCH VỤ LIÊN QUAN */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Hệ sinh thái liên kết</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">Các giải pháp tăng trưởng bổ trợ từ PGS</h2>
          <p className="text-slate-600 text-sm">Để tăng tốc hiệu quả chuyển đổi toàn diện cho hệ thống doanh nghiệp số.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group cursor-pointer">
            <TrendingUp className="w-8 h-8 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-900 mb-2">Dịch vụ SEO Tổng Thể</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Tối ưu toàn diện từ cấu trúc kỹ thuật on-page, off-page đến bao phủ hàng ngàn từ khóa.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group cursor-pointer">
            <BookOpen className="w-8 h-8 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-900 mb-2">PR Báo chí & Backlinks</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Đăng bài thương hiệu trên các báo điện tử lớn nhất Việt Nam để tăng lực uy tín.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group cursor-pointer">
            <Database className="w-8 h-8 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-900 mb-2">Thiết Kế Website Premium</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Xây dựng website sang trọng chuẩn Light Premium UX/UI nâng tầm định vị thương hiệu.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold-400 transition-all group cursor-pointer">
            <Settings className="w-8 h-8 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-900 mb-2">Chăm Sóc Website Toàn Diện</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Vận hành kỹ thuật, bảo vệ máy chủ, cập nhật thông tin định kỳ giúp hoạt động trơn tru.</p>
          </div>
        </div>
      </section>

      {/* SECTION 16: CTA CUỐI TRANG & FORM ĐĂNG KÝ */}
      <section id="contact" className="bg-slate-950 text-white py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest block">PGS AGENCY PARTNERSHIP</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Website của bạn đã có đủ nội dung để Google và khách hàng hiểu chưa?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Đừng tiếp tục đổ tiền vào quảng cáo khi phễu nội dung website chưa hoàn thiện. Hãy đăng ký ngay hôm nay để nhận được một buổi tư vấn trực tiếp 1-1 cùng Senior SEO Director của PGS, đi kèm một Bản phác thảo kế hoạch Topical Map hoàn toàn miễn phí trị giá 5.000.000đ.
            </p>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-lg font-bold text-gold-400">100%</span>
                <span className="text-[10px] text-slate-400 block font-mono">BÀI VIẾT TÁC GIẢ THẬT</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-lg font-bold text-gold-400">Cam kết KPI</span>
                <span className="text-[10px] text-slate-400 block font-mono">HOÀN TIỀN NẾU SAI PHẠM</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white text-slate-900 p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 relative">
            <h3 className="text-xl font-display font-bold text-slate-950 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span>Đăng Ký Nhận Kế Hoạch Content SEO</span>
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn bạn đã gửi thông tin! Chuyên viên PGS Agency sẽ liên hệ tư vấn trong 15 phút."); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Họ và Tên *</label>
                  <input required type="text" placeholder="Nguyễn Văn A" className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl py-2.5 px-3 text-xs md:text-sm focus:outline-none focus:border-gold-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Số Điện Thoại *</label>
                  <input required type="tel" placeholder="0901234567" className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl py-2.5 px-3 text-xs md:text-sm focus:outline-none focus:border-gold-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Doanh Nghiệp *</label>
                <input required type="email" placeholder="ceo@company.com" className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl py-2.5 px-3 text-xs md:text-sm focus:outline-none focus:border-gold-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Website Hiện Tại (Nếu có)</label>
                <input type="text" placeholder="https://yourcompany.com" className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl py-2.5 px-3 text-xs md:text-sm focus:outline-none focus:border-gold-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Lĩnh vực hoạt động</label>
                <select className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl py-2.5 px-3 text-xs md:text-sm focus:outline-none focus:border-gold-500">
                  <option>Nha khoa / Y khoa thẩm mỹ</option>
                  <option>Thiết kế nội thất / Xây dựng</option>
                  <option>Đào tạo giáo dục / IELTS</option>
                  <option>Thương mại điện tử / Bán lẻ</option>
                  <option>Dịch vụ B2B / Khác</option>
                </select>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold rounded-xl text-xs md:text-sm shadow-md border border-gold-400 transition-colors">
                Gửi Đăng Ký Đọc Bản Đồ & Tư Vấn Miễn Phí
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* SEO/EEAT DETAILED DOCUMENTATION FOOTER (REQUIRED IN OUTPUT) */}
      

      {/* Sticky Mobile Call-to-Action */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-950/95 backdrop-blur-md border border-gold-400/50 p-3 rounded-2xl flex items-center justify-between shadow-2xl">
        <div className="flex flex-col text-white pl-2">
          <span className="text-[9px] uppercase font-mono text-gold-400">Topical Map</span>
          <span className="text-xs font-bold">Content Website PGS</span>
        </div>
        <a href="#contact" className="bg-gold-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs border border-gold-400">
          Nhận Tư Vấn
        </a>
      </div>

    </div>
  );
}
