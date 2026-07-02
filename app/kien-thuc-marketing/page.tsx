"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Compass, BookOpen, TrendingUp, Target, Cpu, 
  Layers, ShieldCheck, CheckCircle, ArrowRight, ChevronDown, 
  ChevronUp, Bookmark, Sparkles, Share2, FileText, Code, 
  Palette, Eye, User, Calendar, Clock, ExternalLink, 
  AlertTriangle, ThumbsUp, Check, RotateCcw, Copy, Info, Award
} from "lucide-react";
import Image from "next/image";
import { ARTICLES, FAQS, AUTHORS, Article } from "@/lib/data";

export default function KnowledgeHubPage() {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [activeClusterNode, setActiveClusterNode] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Custom consulting advisor states
  const [bizType, setBizType] = useState("B2B");
  const [budget, setBudget] = useState("20M-50M");
  
  // Checklist states
  const [designerChecklist, setDesignerChecklist] = useState<Record<string, boolean>>({
    "1. Layout Light Premium": true,
    "2. Tone màu Vàng Gold (#D4AF37) làm điểm nhấn": false,
    "3. Typography phối hợp Space Grotesk/Inter": false,
    "4. Các nút CTA có kích thước ít nhất 44px": false,
    "5. Bản đồ hành tinh/Topic cluster 3D nổi bật": false,
    "6. Đầy đủ Editorial Trust Box với hình ảnh tác giả chính quy": false,
    "7. Mobile Responsive: Giao diện thích ứng hoàn hảo trên smartphone": false
  });
  
  const [developerChecklist, setDeveloperChecklist] = useState<Record<string, boolean>>({
    "1. Lập trình Responsive chuẩn cấu trúc Semantic HTML": false,
    "2. Tương tác bản đồ Cluster Map động bằng CSS/Motion": false,
    "3. Tìm kiếm và lọc bài viết tức thì bằng Client-side State": false,
    "4. Tích hợp các thẻ Accordion mượt mà cho FAQ": false,
    "5. Hệ thống tư vấn kênh Marketing thông minh tự tính toán tỉ lệ": false,
    "6. Thêm ID duy nhất cho tất cả CTA, input và card": false,
    "7. Bật chế độ prefers-reduced-motion bảo vệ hiệu năng": false
  });

  const [seoChecklist, setSeoChecklist] = useState<Record<string, boolean>>({
    "1. Tiêu đề H1 độc nhất chứa từ khóa chính": false,
    "2. Đầy đủ meta title, meta description tối ưu CTR": false,
    "3. Viết bài chuẩn Helpful Content, tránh từ ngữ sáo rỗng": false,
    "4. Trích dẫn tác giả uy tín (EEAT) kèm nguồn tham khảo chất lượng": false,
    "5. Không cam kết thứ hạng tuyệt đối trên AI Overviews": false,
    "6. Cấu hình Schema JSON-LD (Blog, Breadcrumb, FAQ) chính xác": false,
    "7. Điền đầy đủ alt text cho tất cả hình ảnh đại diện": false
  });

  // Schema state viewer
  const [activeSchemaTab, setActiveSchemaTab] = useState("BlogPosting");
  const [copiedSchema, setCopiedSchema] = useState(false);

  // --- Article Filtering ---
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "Tất cả" || 
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Featured Pillar and Sub Articles
  const pillarArticle = useMemo(() => {
    return ARTICLES.find(a => a.isPillar) || ARTICLES[0];
  }, []);

  const subFeaturedArticles = useMemo(() => {
    return ARTICLES.filter(a => !a.isPillar).slice(0, 3);
  }, []);

  // Filter Categories list
  const categories = ["Tất cả", "Marketing tổng thể", "SEO tổng thể", "Website & CRO", "Google Ads", "Facebook Ads", "TikTok Ads", "Content Marketing", "Social Media", "AI Search"];

  // Handle Bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // --- Dynamic Consulting Logic ---
  const calculatedStrategy = useMemo(() => {
    let seoShare = 30;
    let adsShare = 40;
    let socialShare = 20;
    let webShare = 10;
    let keyChannel = "Google & Facebook Ads";
    let priorityTip = "";

    if (bizType === "B2B") {
      if (budget === "Under 20M") {
        seoShare = 20; adsShare = 30; socialShare = 20; webShare = 30;
        keyChannel = "Website chuẩn SEO & LinkedIn Outbound";
        priorityTip = "Ưu tiên hoàn thiện Website tối ưu chuyển đổi và bắt đầu viết content hữu ích giải quyết nỗi đau của khách hàng để tối ưu chi phí.";
      } else if (budget === "20M-50M") {
        seoShare = 40; adsShare = 30; socialShare = 15; webShare = 15;
        keyChannel = "Google Search Ads & SEO On-page";
        priorityTip = "Kết hợp chạy quảng cáo từ khóa có chuyển đổi cao (Google Search) kết hợp với SEO bài viết dạng Pillar Content để giữ top lâu dài.";
      } else {
        seoShare = 50; adsShare = 30; socialShare = 10; webShare = 10;
        keyChannel = "SEO Tổng thể đa kênh & Google Ads chuyên sâu";
        priorityTip = "Đầu tư mạnh mẽ vào SEO Tổng Thể chuẩn EEAT để bao phủ thị trường ngách, kết hợp chạy quảng cáo Performance Max tiếp cận trọn vẹn đối tác.";
      }
    } else if (bizType === "E-commerce" || bizType === "Retail") {
      if (budget === "Under 20M") {
        seoShare = 10; adsShare = 50; socialShare = 30; webShare = 10;
        keyChannel = "TikTok Shop & Facebook Ads (Reels)";
        priorityTip = "Tập trung 80% lực lượng vào sản xuất video ngắn TikTok/Facebook Reels và đẩy quảng cáo chuyển đổi trực tiếp về giỏ hàng.";
      } else if (budget === "20M-50M") {
        seoShare = 20; adsShare = 50; socialShare = 20; webShare = 10;
        keyChannel = "Quảng cáo đa kênh (FB + TikTok) & Landing Page tối ưu CRO";
        priorityTip = "Xây dựng các Landing Page bán hàng chuyên biệt cho từng dòng sản phẩm và tối ưu hóa trải nghiệm checkout để nâng cao tỷ lệ chốt đơn.";
      } else {
        seoShare = 30; adsShare = 40; socialShare = 20; webShare = 10;
        keyChannel = "Hệ thống phễu đa kênh & SEO TMĐT bền vững";
        priorityTip = "Sử dụng quảng cáo PMax kéo traffic nóng, đồng thời làm SEO tổng thể cho danh mục sản phẩm và tích hợp hệ thống tracking GA4 để đo lường ROI chi tiết.";
      }
    } else { // Services / Education
      if (budget === "Under 20M") {
        seoShare = 25; adsShare = 35; socialShare = 30; webShare = 10;
        keyChannel = "Xây dựng thương hiệu cá nhân trên Social & Facebook Ads";
        priorityTip = "Tận dụng content miễn phí trên Fanpage, Group cộng đồng kết hợp ngân sách Ads nhỏ để thu thập Lead đăng ký tư vấn.";
      } else if (budget === "20M-50M") {
        seoShare = 35; adsShare = 35; socialShare = 20; webShare = 10;
        keyChannel = "SEO Onpage chuẩn EEAT & Quảng cáo Google Search";
        priorityTip = "Tạo các trang bài viết chứng minh chuyên môn sâu sắc chuẩn EEAT để tăng độ tin cậy, kết hợp với phễu webinar hoặc tài liệu miễn phí.";
      } else {
        seoShare = 40; adsShare = 30; socialShare = 20; webShare = 10;
        keyChannel = "Marketing tổng thể đa kênh phủ thương hiệu chuyên nghiệp";
        priorityTip = "Hệ thống hóa phễu tư vấn tự động: Website chuẩn UX/UI + Quảng cáo đa kênh phủ phễu + Hệ thống Email Marketing chăm sóc tự động.";
      }
    }

    return {
      seoShare,
      adsShare,
      socialShare,
      webShare,
      keyChannel,
      priorityTip
    };
  }, [bizType, budget]);

  // --- Schemas Data generator ---
  const schemas: Record<string, string> = {
    BlogPosting: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://pgsagency.vn/tin-tuc/"
      },
      "headline": "Kiến thức Marketing, SEO, Website và tăng trưởng số cho doanh nghiệp",
      "description": "Hệ thống bản đồ kiến thức Marketing tổng thể, SEO, Website, Google/FB/TikTok Ads và Tối ưu chuyển đổi chuyên sâu từ PGS Agency.",
      "image": "https://picsum.photos/seed/vibrant/1920/1080",  
      "author": {
        "@type": "Organization",
        "name": "PGS Agency",
        "url": "https://pgsagency.vn/"
      },  
      "publisher": {
        "@type": "Organization",
        "name": "PGS Agency",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pgsagency.vn/logo.png"
        }
      },
      "datePublished": "2026-06-01T08:00:00+07:00",
      "dateModified": "2026-07-01T02:18:00+07:00"
    }, null, 2),
    CollectionPage: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "PGS Knowledge Hub - Bản đồ Kiến thức Tăng trưởng Marketing Số",
      "url": "https://pgsagency.vn/tin-tuc/",
      "description": "Kho tài nguyên lưu trữ và phân loại các kiến thức Marketing thực chiến từ đội ngũ chuyên gia của PGS Agency.",
      "about": {
        "@type": "Thing",
        "name": "Digital Marketing Strategy"
      }
    }, null, 2),
    BreadcrumbList: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://pgsagency.vn/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Tin tức & Kiến thức Hub",
        "item": "https://pgsagency.vn/tin-tuc/"
      }]
    }, null, 2),
    FAQPage: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }, null, 2)
  };

  const handleCopySchema = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const toggleChecklist = (type: "designer" | "developer" | "seo", item: string) => {
    if (type === "designer") {
      setDesignerChecklist(prev => ({ ...prev, [item]: !prev[item] }));
    } else if (type === "developer") {
      setDeveloperChecklist(prev => ({ ...prev, [item]: !prev[item] }));
    } else {
      setSeoChecklist(prev => ({ ...prev, [item]: !prev[item] }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#D4AF37]/20 selection:text-[#1A1A1A]">
      
      {/* HEADER SECTION */}
      

      {/* SECTION 1: HERO KNOWLEDGE HUB */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-32 px-4 bg-gradient-to-b from-[#FFFDF9] to-[#FAF9F6]" id="hero-knowledge-hub">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8 z-10 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-xs font-semibold text-amber-800 tracking-wide border border-[#D4AF37]/20 uppercase">
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              <span>Hệ tri thức tăng trưởng doanh nghiệp 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-tight md:leading-[1.1]">
              Kiến thức <span className="text-[#D4AF37]">Marketing</span>, SEO, Website và tăng trưởng số cho doanh nghiệp
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              PGS Agency xây dựng một Knowledge Hub bài bản giúp các Founder, CEO và Marketer thấu hiểu tư duy xây dựng <strong>hệ thống tiếp thị tổng thể đa nền tảng</strong>. Không làm rời rạc, chúng tôi kiến tạo các trụ cột tăng trưởng bền vững bằng dữ liệu thực chiến và tính minh bạch tuyệt đối.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="#cluster-map" 
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] shadow-md shadow-[#D4AF37]/10"
                id="cta-hero-explore"
              >
                Khám phá chủ đề 3D <Compass className="ml-2 h-4 w-4 animate-spin-slow" />
              </a>
              <a 
                href="#advisor-calculator" 
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                id="cta-hero-advisor"
              >
                Nhận Kế hoạch Phân bổ Ngân sách
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/60 max-w-lg">
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-[#1A1A1A]">100%</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">Nội dung thực chiến</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-[#1A1A1A]">15+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">Chủ đề chuyên sâu</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-bold text-[#1A1A1A]">500k+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">Người đọc tin cậy</span>
              </div>
            </div>
          </div>

          {/* Galaxy Interactive 3D Mock Preview representation */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[380px] md:h-[450px]">
            <div className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border border-dashed border-[#D4AF37]/20 animate-spin-slow"></div>
            <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#D4AF37]/30 animate-spin-reverse"></div>
            
            {/* Center Core Node */}
            <motion.div 
              className="absolute z-20 w-24 h-24 rounded-full bg-white border-2 border-[#D4AF37] shadow-xl flex flex-col justify-center items-center text-center p-2 cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              onClick={() => {
                setSelectedCategory("Marketing tổng thể");
                document.getElementById("article-list")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/10 blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Layers className="h-5 w-5 text-[#D4AF37] mb-1 relative" />
              <span className="text-[10px] font-bold tracking-tight uppercase leading-none relative">Marketing</span>
              <span className="text-[8px] text-[#D4AF37] font-semibold relative">TỔNG THỂ</span>
            </motion.div>

            {/* Orbiting Satellite nodes with labels */}
            {[
              { label: "SEO tổng thể", cat: "SEO tổng thể", icon: <TrendingUp className="h-4 w-4" />, x: -130, y: -90, delay: 0 },
              { label: "Website & CRO", cat: "Website & CRO", icon: <Compass className="h-4 w-4" />, x: 130, y: -70, delay: 1 },
              { label: "Google Ads", cat: "Google Ads", icon: <Target className="h-4 w-4" />, x: -120, y: 80, delay: 2 },
              { label: "TikTok Ads", cat: "TikTok Ads", icon: <Sparkles className="h-4 w-4" />, x: 120, y: 70, delay: 3 },
              { label: "AI Search", cat: "AI Search", icon: <Cpu className="h-4 w-4" />, x: 0, y: -140, delay: 4 },
              { label: "Social Growth", cat: "Social Media", icon: <BookOpen className="h-4 w-4" />, x: 0, y: 150, delay: 5 },
            ].map((node, idx) => (
              <motion.div
                key={idx}
                className="absolute z-10 cursor-pointer flex flex-col items-center"
                style={{ x: node.x, y: node.y }}
                whileHover={{ scale: 1.15 }}
                animate={{
                  y: [node.y, node.y - 10, node.y]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + (idx % 3),
                  delay: node.delay * 0.3,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  setSelectedCategory(node.cat);
                  document.getElementById("article-list")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E0] shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:border-[#D4AF37] transition-all">
                  {node.icon}
                </div>
                <span className="mt-1.5 text-[9px] font-mono tracking-tight font-bold text-gray-600 bg-[#FAF9F6] px-1.5 py-0.5 rounded border border-gray-100 whitespace-nowrap shadow-sm uppercase">
                  {node.label}
                </span>
              </motion.div>
            ))}

            {/* Connecting SVG lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 400">
              <line x1="200" y1="200" x2="70" y2="110" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2="330" y2="130" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2="80" y2="280" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2="320" y2="270" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2="200" y2="60" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2="200" y2="350" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 2: SEARCH BOX LỚN */}
      <section className="relative -mt-10 z-30 px-4" id="search-box-section">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/60 shadow-gray-200/50">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm kiến thức: SEO tổng thể, Landing Page, Google PMax, TikTok Ads..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E5E0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all text-sm font-medium text-[#1A1A1A]"
                  id="search-input-knowledge"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-semibold uppercase font-mono tracking-wider"
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-3 w-full md:w-auto shrink-0 justify-between md:justify-start">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Lọc nhanh:</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => { setSelectedCategory("Tất cả"); setSearchQuery(""); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    Reset
                  </button>
                  {bookmarkedIds.length > 0 && (
                    <button 
                      onClick={() => {
                        // Search for only bookmarked articles
                        setSearchQuery("đã lưu");
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 flex items-center space-x-1 hover:bg-amber-100 transition-colors"
                    >
                      <Bookmark className="h-3 w-3 fill-amber-800" />
                      <span>Đã Lưu ({bookmarkedIds.length})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick search suggestions tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
              <span className="font-medium text-gray-400 uppercase tracking-wider font-mono">Xu hướng tìm kiếm:</span>
              {["EEAT", "AIO", "PMax", "CRO", "Landing Page", "Website chuẩn SEO"].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded bg-[#FAF9F6] hover:bg-[#D4AF37]/10 hover:text-amber-800 border border-gray-200/60 transition-colors text-gray-600 font-mono text-[11px]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TOPIC CLUSTER MAP */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="cluster-map">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-[#D4AF37]/20 text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
            <span>Visual Knowledge Infrastructure</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A]">
            Bản Đồ Cụm Chủ Đề Tri Thức – PGS Knowledge Galaxy
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Hệ thống hóa kiến thức giúp bạn thoát khỏi cái bẫy &ldquo;marketing chắp vá&rdquo;. Click vào bất kỳ cụm chủ đề 3D bên dưới để lọc ngay danh mục tài liệu nghiên cứu chuyên sâu tương ứng.
          </p>
        </div>

        {/* Dynamic 3D cluster selector with details preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: the selector grid */}
          <div className="lg:col-span-12 bg-white p-6 md:p-8 rounded-3xl border border-[#E5E5E0] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-4">Click một thực thể để kích hoạt bộ lọc</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Marketing tổng thể", count: 1, desc: "Xây dựng hệ thống phễu tăng trưởng tổng hợp", icon: <Layers className="h-5 w-5" /> },
                  { name: "SEO tổng thể", count: 4, desc: "Bao phủ thị trường ngách, tối ưu Entity uy tín", icon: <TrendingUp className="h-5 w-5" /> },
                  { name: "Website & CRO", count: 4, desc: "Tối ưu hóa phễu và tỷ lệ chuyển đổi Lead", icon: <Compass className="h-5 w-5" /> },
                  { name: "Google Ads", count: 1, desc: "Smart Bidding, Performance Max chuyên sâu", icon: <Target className="h-5 w-5" /> },
                  { name: "Facebook Ads", count: 1, desc: "Dàn tài nguyên, video Reels sáng tạo bứt phá", icon: <Target className="h-5 w-5" /> },
                  { name: "TikTok Ads", count: 1, desc: "Kịch bản video triệu view, Spark Ads ra đơn", icon: <Sparkles className="h-5 w-5" /> },
                  { name: "Content Marketing", count: 1, desc: "Sáng tạo nội dung hữu ích chuẩn Helpful Content", icon: <BookOpen className="h-5 w-5" /> },
                  { name: "Social Media", count: 1, desc: "Xây dựng kênh phân phối thương hiệu triệu follow", icon: <User className="h-5 w-5" /> },
                  { name: "AI Search", count: 1, desc: "Tối ưu hóa GEO, đón đầu Google AI Overviews", icon: <Cpu className="h-5 w-5" /> },
                ].map((cluster, idx) => {
                  const isSelected = selectedCategory.toLowerCase() === cluster.name.toLowerCase();
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cluster.name);
                        setActiveClusterNode(cluster.name);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[130px] group ${
                        isSelected 
                        ? "bg-[#D4AF37]/5 border-[#D4AF37] ring-2 ring-[#D4AF37]/10" 
                        : "bg-[#FAF9F6] border-gray-200 hover:border-gray-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className={`p-2 rounded-lg transition-colors ${isSelected ? "bg-[#D4AF37] text-black" : "bg-gray-100 text-gray-600 group-hover:bg-white border group-hover:border-[#D4AF37]/40"}`}>
                          {cluster.icon}
                        </div>
                        <span className="text-[10px] font-mono bg-white border px-1.5 py-0.5 rounded text-gray-500 font-semibold">{cluster.count} bài</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">{cluster.name}</h4>
                        <p className="text-[10px] text-gray-400 line-clamp-2 mt-0.5 leading-normal">{cluster.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center"><Info className="h-3.5 w-3.5 text-[#D4AF37] mr-1.5" /> Bộ lọc đồng bộ ngay lập tức với danh sách bài viết bên dưới</span>
              <button 
                onClick={() => { setSelectedCategory("Tất cả"); setActiveClusterNode(null); }}
                className="text-amber-800 hover:underline font-bold"
              >
                Xem tất cả các cụm ({ARTICLES.length} bài)
              </button>
            </div>
          </div>

          {/* Right panel: Active Cluster detailed preview */}
          
        </div>
      </section>

      {/* SECTION 4: BÀI NỔI BẬT (Pillar + 3 Sub-featured) */}
      <section className="py-20 bg-white border-y border-[#E5E5E0] px-4" id="featured-pillar">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Featured Pillar Contents</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A]">Bài Viết Trụ Cột Đột Phá Doanh Số</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md">
              Những phân tích sâu sắc từ CEO & các Trưởng phòng chiến lược tại PGS Agency giúp bạn thay đổi hoàn toàn tư duy marketing số.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Big Pillar Article layout (Col 1-7) */}
            <div className="lg:col-span-7 bg-[#FAF9F6] rounded-3xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-[#D4AF37]"></div>
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase">
                  Bài Trụ Cột Pillar Content
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" /> {pillarArticle.date}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-snug group-hover:text-[#D4AF37] transition-colors">
                <a href={`#article-${pillarArticle.id}`}>{pillarArticle.title}</a>
              </h3>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {pillarArticle.description}
              </p>

              {/* Takeaway Highlight box */}
              <div className="bg-amber-50/70 border-l-4 border-[#D4AF37] p-4 rounded-r-xl">
                <span className="text-xs font-bold text-amber-900 tracking-wider uppercase block mb-1">Key Takeaway thực chiến:</span>
                <p className="text-xs text-gray-700 italic leading-relaxed">{pillarArticle.keyTakeaway}</p>
              </div>

              {/* Outline snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">Khung nội dung chi tiết:</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                  {pillarArticle.outline.map((o, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] text-amber-700 font-bold shrink-0">{i+1}</span>
                      <span className="truncate">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author signature & tags */}
              <div className="pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/50">
                    <img src={pillarArticle.author.avatar} alt={pillarArticle.author.name} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1A1A1A]">{pillarArticle.author.name}</span>
                    <span className="block text-[10px] text-gray-500">{pillarArticle.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleBookmark(pillarArticle.id)}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-[#D4AF37] transition-all"
                    title="Lưu bài viết"
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.includes(pillarArticle.id) ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                  </button>
                  <button 
                    onClick={() => {
                      alert(`Chia sẻ thành công bài viết: "${pillarArticle.title}"`);
                    }}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-black transition-all"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <a 
                    href={`#article-${pillarArticle.id}`} 
                    className="px-4 py-2 bg-black hover:bg-[#D4AF37] text-white hover:text-black text-xs font-bold rounded-lg transition-colors inline-flex items-center"
                  >
                    Đọc Ngay <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Sub-featured articles (Col 8-12) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">Kiến thức chuyên sâu mới cập nhật</span>
              {subFeaturedArticles.map((art, idx) => (
                <div 
                  key={idx}
                  className="bg-[#FAF9F6] p-5 rounded-2xl border border-gray-200/80 hover:border-[#D4AF37]/50 transition-all hover:bg-white group"
                >
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono mb-2">
                    <span className="text-[#D4AF37] font-bold uppercase">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] line-clamp-2 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    <a href={`#article-${art.id}`}>{art.title}</a>
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {art.description}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[11px] text-gray-600 font-medium">{art.author.name}</span>
                    <a href={`#article-${art.id}`} className="text-xs text-[#D4AF37] font-bold hover:underline flex items-center">
                      Đọc thêm <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ARTICLES LIST ACCORDING TO USER'S THEMATIC REQUEST (SEO, WEBSITE, ADS, CONTENT, AI SEARCH) */}
      <section className="py-20 bg-[#FAF9F6] px-4" id="article-list">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section heading & Quick cluster tabs */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Khám Phá Tài Nguyên Theo Từng Trụ Cột</h2>
            <p className="text-xs md:text-sm text-gray-500">
              Chọn một trong các danh mục bên dưới để lọc bài viết chuyên ngành. Hệ thống lọc nhanh giúp bạn giải quyết từng nỗi đau cụ thể của doanh nghiệp.
            </p>
            
            {/* Scrollable horizontal tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-[#D4AF37] text-black shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Search/Category feedback bar */}
          {(searchQuery || selectedCategory !== "Tất cả") && (
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center space-x-2">
                <Compass className="h-4 w-4 text-[#D4AF37]" />
                <span>
                  Đang lọc theo: 
                  {selectedCategory !== "Tất cả" && <strong className="ml-1 uppercase text-[11px] bg-white border border-amber-200 px-1.5 py-0.5 rounded text-amber-800">{selectedCategory}</strong>}
                  {searchQuery && <span className="ml-1">Từ khóa: &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>}
                </span>
              </div>
              <button 
                onClick={() => { setSelectedCategory("Tất cả"); setSearchQuery(""); }}
                className="text-amber-800 font-bold hover:underline font-mono"
              >
                XÓA BỘ LỌC [X]
              </button>
            </div>
          )}

          {/* Grid dynamic content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((art) => (
                <motion.article 
                  key={art.id}
                  id={`article-${art.id}`}
                  className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-4 hover:shadow-lg hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#D4AF37] font-bold uppercase tracking-wider">{art.category}</span>
                      <span className="text-gray-400 flex items-center"><Clock className="h-3 w-3 mr-1" /> {art.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {art.description}
                    </p>

                    {/* Show key takeaway if searched or focused */}
                    <div className="bg-gray-50/80 border-l-2 border-gray-300 p-2.5 rounded-r-lg text-[11px] text-gray-600">
                      <span className="font-bold text-gray-700">Giá trị cốt lõi: </span>
                      {art.keyTakeaway}
                    </div>

                    {/* AI Overviews notice on AI Search posts */}
                    {art.category === "AI Search" && (
                      <div className="bg-amber-50/50 border border-amber-200/60 rounded p-2.5 flex items-start space-x-1.5 text-[10px] text-amber-800">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="leading-normal">
                          <strong className="font-semibold">Lưu ý quan trọng:</strong> PGS Agency cam kết tối ưu hóa tối đa thực thể (Entity SEO) chuẩn GEO, tuy nhiên tuyệt đối không cam kết xuất hiện 100% trong AI Overviews do biến động thuật toán động của Google.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <img src={art.author.avatar} alt={art.author.name} className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]/30" />
                      <span className="text-[11px] font-medium text-gray-600">{art.author.name}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button 
                        onClick={() => toggleBookmark(art.id)}
                        className={`p-1.5 rounded bg-gray-50 border border-gray-200 text-gray-400 hover:text-[#D4AF37] transition-colors ${bookmarkedIds.includes(art.id) ? "text-[#D4AF37]" : ""}`}
                        title="Lưu bài viết"
                      >
                        <Bookmark className={`h-3.5 w-3.5 ${bookmarkedIds.includes(art.id) ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                      </button>
                      <button 
                        className="px-3 py-1.5 bg-black hover:bg-[#D4AF37] text-white hover:text-black text-[10px] font-bold rounded transition-colors"
                        onClick={() => {
                          alert(`Mở chế độ đọc bài viết: "${art.title}"\n\nNội dung chi tiết:\n- Tác giả: ${art.author.name}\n- Mô tả: ${art.description}\n\nTài liệu PDF chi tiết của bài viết này sẽ được gửi tới bạn khi đăng ký tư vấn.`);
                        }}
                      >
                        Đọc bài
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredArticles.length === 0 && (
              <div className="col-span-full bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center space-y-4">
                <Search className="h-10 w-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-gray-700">Không tìm thấy bài viết nào phù hợp</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Hãy thử thay đổi từ khóa tìm kiếm (ví dụ: &ldquo;SEO&rdquo;, &ldquo;PMax&rdquo;, &ldquo;UX&rdquo;) hoặc bấm chọn các tab danh mục để khám phá.</p>
                <button 
                  onClick={() => { setSelectedCategory("Tất cả"); setSearchQuery(""); }}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Reset bộ lọc và xem lại tất cả bài viết
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 10: EDITORIAL POLICY (Chính sách biên tập chính quy EEAT) */}
      <section className="py-20 bg-white border-y border-[#E5E5E0] px-4" id="editorial-policy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono tracking-widest text-emerald-800 uppercase">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Cam kết minh bạch thông tin EEAT</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Chính Sách Biên Tập & Kiểm Duyệt Nội Dung Nghiêm Ngặt</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nhằm đảm bảo lợi ích cao nhất của quý độc giả và tuân thủ chặt chẽ nguyên lý <strong>Google Helpful Content & EEAT (Experience - Expertise - Authoritativeness - Trustworthiness)</strong>, PGS Agency áp dụng quy trình kiểm định chất lượng 3 cấp trước khi xuất bản bất kỳ bài viết nào:
            </p>

            {/* Editorial checklist */}
            <div className="space-y-3.5 text-sm text-gray-700">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">1. 100% Nội dung viết bởi Chuyên gia thực chiến:</strong>
                  <span className="text-xs text-gray-500">Mỗi bài viết đều gắn liền với tên tuổi của một tác giả cụ thể có tối thiểu 5-10 năm kinh nghiệm trong ngành, chịu trách nhiệm pháp lý trước bài viết.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">2. Đính kèm Tài liệu tham khảo & Dữ liệu chính ngạch:</strong>
                  <span className="text-xs text-gray-500">Chúng tôi trích dẫn trực tiếp nguồn chính thống (Google, Meta, TikTok) và dẫn link nội bộ tới các Case Study thực tế do PGS trực tiếp tối ưu doanh số thành công.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">3. Cập nhật tuần tự liên tục theo thời gian thực:</strong>
                  <span className="text-xs text-gray-500">Hàng tháng, đội ngũ kỹ thuật sẽ audit lại toàn bộ bài viết để cập nhật thuật toán mới nhất, triệt tiêu thông tin cũ lỗi thời gây lãng phí ngân sách doanh nghiệp.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FAF9F6] p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">Đội ngũ Chuyên gia Kiểm duyệt cốt lõi</span>
            
            <div className="space-y-4">
              {Object.values(AUTHORS).map((author, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-start space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]/50">
                    <img src={author.avatar} alt={author.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-[#1A1A1A]">{author.name}</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-800 border border-emerald-200">
                        Đã xác minh
                      </span>
                    </div>
                    <span className="block text-[11px] text-gray-500 font-medium">{author.role}</span>
                    <ul className="text-[10px] text-gray-400 space-y-0.5 list-disc pl-4">
                      {author.credentials.map((cred, i) => <li key={i}>{cred}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50/50 p-4 rounded-xl border border-[#D4AF37]/20 flex items-start space-x-3">
              <Info className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900 leading-normal">
                Nếu phát hiện bất kỳ sai sót kỹ thuật hoặc nội dung cần bổ sung, quý độc giả vui lòng gửi email về ban biên tập: <strong>banbientap@pgsagency.vn</strong>. Chúng tôi chân thành phản hồi trong vòng 24 giờ làm việc.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 11: CTA GIỮA TRANG (Interactive Consulting Advisor Blueprint) */}
      <section className="py-20 bg-[#1A1A1A] text-white relative overflow-hidden px-4" id="advisor-calculator">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Inputs */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-xs font-semibold text-[#D4AF37] tracking-wider border border-[#D4AF37]/20 uppercase">
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              <span>Interactive Consulting Module</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Tự Thiết Kế Sơ Đồ Phân Bổ Kênh Marketing Số Cho Doanh Nghiệp
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Bạn băn khoăn không biết nên đổ tiền vào SEO, Google Ads, Facebook Ads hay xây dựng Website chuẩn chỉnh trước? Hãy cung cấp 2 tham số dưới đây, thuật toán tư vấn độc quyền của PGS Agency sẽ tính toán ngay tỷ lệ phân bổ ngân sách tối ưu nhất cho bạn.
            </p>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-5">
              {/* Parameter 1 */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider font-bold block">
                  1. Lĩnh vực hoạt động doanh nghiệp:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["B2B", "E-commerce", "Retail", "Services"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBizType(type)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                        bizType === type
                          ? "bg-[#D4AF37] text-black"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {type === "B2B" ? "B2B Doanh Nghiệp" : 
                       type === "E-commerce" ? "Thương mại Điện tử" : 
                       type === "Retail" ? "Bán lẻ / Chuỗi" : "Dịch vụ / Giáo dục"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2 */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider font-bold block">
                  2. Ngân sách Marketing / Tháng dự kiến:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {[
                    { label: "Dưới 20 Triệu", val: "Under 20M" },
                    { label: "20M - 50 Triệu", val: "20M-50M" },
                    { label: "50M - 100 Triệu", val: "50M-100M" },
                    { label: "Trên 100 Triệu", val: "Above 100M" }
                  ].map((b) => (
                    <button
                      key={b.val}
                      onClick={() => setBudget(b.val)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                        budget === b.val
                          ? "bg-[#D4AF37] text-black"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <span className="text-xs text-gray-400">Thay đổi lựa chọn để tự động cập nhật sơ đồ ngay tức thì.</span>
            </div>
          </div>

          {/* Right panel: dynamic charts & recommendation card */}
          <div className="lg:col-span-6 bg-white text-black p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl border border-[#D4AF37]/30 relative">
            <div className="absolute top-4 right-4 bg-amber-50 border border-[#D4AF37]/40 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase text-amber-800">
              BluePrint Khuyên Dùng
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block">Kết quả phân tích cho:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold bg-[#FAF9F6] border px-2 py-1 rounded text-amber-900">
                  {bizType === "B2B" ? "B2B" : bizType === "E-commerce" ? "Thương mại Điện tử" : bizType === "Retail" ? "Bán lẻ" : "Dịch vụ"}
                </span>
                <span className="text-sm font-bold bg-[#FAF9F6] border px-2 py-1 rounded text-amber-900">
                  {budget === "Under 20M" ? "Ngân sách nhỏ (<20M)" : 
                   budget === "20M-50M" ? "Ngân sách vừa (20M-50M)" : 
                   budget === "50M-100M" ? "Ngân sách lớn (50M-100M)" : "Ngân sách cao (>100M)"}
                </span>
              </div>
            </div>

            {calculatedStrategy ? (
              <div className="space-y-6">
                
                {/* Visual Bar chart ratio mapping */}
                <div className="space-y-3.5">
                  <span className="text-xs font-bold text-gray-700 block">Tỷ lệ phân bổ ngân sách khuyên dùng:</span>
                  <div className="space-y-3">
                    
                    {/* SEO share */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">SEO Tổng Thể (On-page + Entity)</span>
                        <span className="font-bold text-[#D4AF37]">{calculatedStrategy.seoShare}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculatedStrategy.seoShare}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Ads share */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">Paid Ads (Google / Facebook / TikTok)</span>
                        <span className="font-bold text-[#D4AF37]">{calculatedStrategy.adsShare}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculatedStrategy.adsShare}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Social Share */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">Social Media & Video ngắn (KOC/TikTok)</span>
                        <span className="font-bold text-[#D4AF37]">{calculatedStrategy.socialShare}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculatedStrategy.socialShare}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Website design */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">Website & Tối ưu chuyển đổi (CRO)</span>
                        <span className="font-bold text-[#D4AF37]">{calculatedStrategy.webShare}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculatedStrategy.webShare}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Key takeaway */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1.5 text-xs font-bold text-[#D4AF37]">
                    <Award className="h-4 w-4" />
                    <span>Kênh ưu tiên trọng tâm: {calculatedStrategy.keyChannel}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {calculatedStrategy.priorityTip}
                  </p>
                </div>

                {/* Lead-gen triggers */}
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      alert(`Đã đăng ký nhận bản phân tích chi tiết cho doanh nghiệp dạng "${bizType}" với ngân sách "${budget}".\n\nChuyên viên tư vấn của PGS Agency sẽ chủ động liên hệ gửi File tài liệu PDF và đặt lịch hẹn Zoom 30 phút phân tích chuyên sâu cho quý khách hàng qua email.`);
                    }}
                    className="w-full py-3.5 bg-black hover:bg-[#D4AF37] text-white hover:text-black font-bold text-sm rounded-xl transition-colors shadow-lg flex items-center justify-center space-x-2"
                    id="cta-advisor-get-full"
                  >
                    <span>Nhận Chi Tiết Bản Kế Hoạch 30 Ngày</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="block text-center text-[10px] text-gray-400 mt-2">Đồng hành dài hạn - Cam kết tối ưu chi phí tối đa.</span>
                </div>

              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 font-mono text-xs">Đang tính toán sơ đồ tối ưu...</div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 12: FAQ BLOG */}
      <section className="py-20 bg-white px-4" id="faq-section">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Frequently Asked Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Hỏi Đáp Thường Gặp Về Kiến Thức PGS</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto">
              Giải đáp chi tiết các thắc mắc của độc giả về cơ chế kiểm chứng thông tin, tác quyền và cách áp dụng kiến thức vào thực tế doanh nghiệp.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#FAF9F6] border border-gray-200/60 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center space-x-4 hover:bg-gray-50/60 transition-colors"
                  >
                    <span className="font-bold text-sm md:text-base text-[#1A1A1A]">{faq.question}</span>
                    <span className="shrink-0">
                      {isOpen ? <ChevronUp className="h-5 w-5 text-[#D4AF37]" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-5 pt-0 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed bg-white">
                          {faq.answer}
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

      {/* INTERACTIVE COMPONENT: PROPOSED SCHEMA GENERATOR VIEWER */}
      <section className="py-16 bg-[#FAF9F6] border-t border-gray-200 px-4" id="schema-viewer">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold block">Google SEO Schema Validation</span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A]">Hệ Thống Đề Xuất Cấu Trúc Dữ Liệu Schema JSON-LD</h3>
            <p className="text-xs text-gray-500">
              Để bot của Google, Gemini hay AI Search hiểu rõ nhất cấu trúc thực thể, trang này đề xuất nhúng 4 loại Schema chuẩn hóa dưới đây. Bấm sao chép trực tiếp để tích hợp cho code của bạn.
            </p>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            
            {/* Schema tabs header */}
            <div className="flex bg-[#121212] border-b border-white/5 overflow-x-auto">
              {Object.keys(schemas).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSchemaTab(tab)}
                  className={`px-4 py-3 text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    activeSchemaTab === tab 
                      ? "text-[#D4AF37] bg-[#1A1A1A] border-b-2 border-[#D4AF37]" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {tab} Schema
                </button>
              ))}
            </div>

            {/* Schema Code display area */}
            <div className="p-5 relative">
              <button 
                onClick={() => handleCopySchema(schemas[activeSchemaTab])}
                className="absolute right-4 top-4 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white hover:text-[#D4AF37] text-xs font-mono font-bold flex items-center space-x-1 transition-all"
              >
                {copiedSchema ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Sao chép Code</span>
                  </>
                )}
              </button>

              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto max-h-[300px] leading-relaxed select-all">
                <code>{schemas[activeSchemaTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLISTS COLLABORATIVE PANEL FOR DESIGNER, DEVELOPER, CONTENT SEO */}
      <section className="py-16 bg-white border-t border-gray-200 px-4" id="checklists-section">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">PGS Workflow Checklist</span>
            <h3 className="text-2xl font-bold tracking-tight">Bảng Kiểm Định Bàn Giao Kỹ Thuật (Interactive Checklist)</h3>
            <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto">
              Hãy đánh dấu các đầu việc để kiểm tra mức độ sẵn sàng của giao diện, mã nguồn và nội dung bài viết trước khi bấm xuất bản trang.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Designer checklist */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-[#D4AF37] border-b pb-3 border-gray-200">
                <Palette className="h-5 w-5" />
                <h4 className="font-bold text-sm uppercase tracking-wider text-black">1. Checklist Cho Designer</h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">Đảm bảo các quy chuẩn thiết kế Light Premium, khoảng trắng và phân cấp độ thị giác cao cấp đạt chuẩn xuất bản.</p>
              <div className="space-y-2.5">
                {Object.entries(designerChecklist).map(([item, checked]) => (
                  <label key={item} className="flex items-start space-x-2.5 cursor-pointer text-xs select-none">
                    <input 
                      type="checkbox" 
                      checked={checked} 
                      onChange={() => toggleChecklist("designer", item)}
                      className="mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]/50"
                    />
                    <span className={checked ? "text-gray-400 line-through" : "text-gray-700 font-medium"}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Developer checklist */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-[#D4AF37] border-b pb-3 border-gray-200">
                <Code className="h-5 w-5" />
                <h4 className="font-bold text-sm uppercase tracking-wider text-black">2. Checklist Cho Developer</h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">Bảo đảm tối ưu hiệu năng tải trang nhanh dưới 1.5s, mobile-first, và các trạng thái animation chuyển động tinh tế.</p>
              <div className="space-y-2.5">
                {Object.entries(developerChecklist).map(([item, checked]) => (
                  <label key={item} className="flex items-start space-x-2.5 cursor-pointer text-xs select-none">
                    <input 
                      type="checkbox" 
                      checked={checked} 
                      onChange={() => toggleChecklist("developer", item)}
                      className="mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]/50"
                    />
                    <span className={checked ? "text-gray-400 line-through" : "text-gray-700 font-medium"}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SEO Checklist */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-[#D4AF37] border-b pb-3 border-gray-200">
                <FileText className="h-5 w-5" />
                <h4 className="font-bold text-sm uppercase tracking-wider text-black">3. Checklist Cho SEO Content</h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">Tập trung tối ưu thực thể Entity SEO, Helpful content chuẩn khoa học, độ tin cậy của dữ liệu trích dẫn chính gốc.</p>
              <div className="space-y-2.5">
                {Object.entries(seoChecklist).map(([item, checked]) => (
                  <label key={item} className="flex items-start space-x-2.5 cursor-pointer text-xs select-none">
                    <input 
                      type="checkbox" 
                      checked={checked} 
                      onChange={() => toggleChecklist("seo", item)}
                      className="mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]/50"
                    />
                    <span className={checked ? "text-gray-400 line-through" : "text-gray-700 font-medium"}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13: FOOTER CATEGORY LINKS */}
      


<div id="seo-specs-modal" className="hidden absolute bottom-14 right-0 w-[320px] md:w-[480px] bg-white text-black p-5 md:p-6 rounded-2xl border border-gray-200 shadow-2xl space-y-4 text-left max-h-[80vh] overflow-y-auto">

        
          <div className="flex justify-between items-center border-b pb-3 border-gray-200">
            <h4 className="font-bold text-sm text-[#1A1A1A] flex items-center uppercase tracking-wider font-mono">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37] mr-1.5" /> PGS SEO, EEAT & CRO Specs
            </h4>
            <button 
              onClick={() => document.getElementById("seo-specs-modal")?.classList.add("hidden")}
              className="text-xs text-gray-400 hover:text-black font-mono font-bold"
            >
              [X] ĐÓNG
            </button>
          </div>

          <div className="space-y-3.5 text-xs text-gray-600">
            
            {/* Meta tags details */}
            <div className="space-y-1">
              <span className="block font-bold text-[#1A1A1A] uppercase tracking-wider font-mono text-[10px]">Meta Title Tag:</span>
              <p className="bg-gray-50 border p-2 rounded text-gray-700 font-medium">
                PGS Agency Knowledge Hub - Kiến thức Marketing & Tăng Trưởng Số
              </p>
            </div>

            <div className="space-y-1">
              <span className="block font-bold text-[#1A1A1A] uppercase tracking-wider font-mono text-[10px]">Meta Description Tag:</span>
              <p className="bg-gray-50 border p-2 rounded text-gray-700 leading-normal">
                Hệ thống bản đồ kiến thức Marketing tổng thể, SEO, Website, Google/FB/TikTok Ads và Tối ưu chuyển đổi chuyên sâu từ PGS Agency.
              </p>
            </div>

            <div className="space-y-1">
              <span className="block font-bold text-[#1A1A1A] uppercase tracking-wider font-mono text-[10px]">H1 Tag chính duy nhất:</span>
              <p className="bg-gray-50 border p-2 rounded text-[#D4AF37] font-bold">
                “Kiến thức Marketing, SEO, Website và tăng trưởng số cho doanh nghiệp”
              </p>
            </div>

            {/* Key Headings outline */}
            <div className="space-y-1">
              <span className="block font-bold text-[#1A1A1A] uppercase tracking-wider font-mono text-[10px]">Dàn cấu trúc Heading H2/H3 chủ đạo:</span>
              <ul className="list-decimal pl-4 space-y-1 text-gray-500 font-medium">
                <li>H2: Bản Đồ Cụm Chủ Đề Tri Thức – PGS Knowledge Galaxy</li>
                <li>H2: Bài Viết Trụ Cột Đột Phá Doanh Số</li>
                <li>H2: Khám Phá Tài Nguyên Theo Từng Trụ Cột</li>
                <li>H2: Chính Sách Biên Tập & Kiểm Duyệt Nội Dung Nghiêm Ngặt</li>
                <li>H2: Tự Thiết Kế Sơ Đồ Phân Bổ Kênh Marketing Số Cho Doanh Nghiệp</li>
                <li>H2: Hỏi Đáp Thường Gặp Về Kiến Thức PGS</li>
              </ul>
            </div>

            {/* Internal link mapping details */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
              <div className="space-y-1">
                <span className="block font-bold text-emerald-800 uppercase tracking-wider font-mono text-[9px]">Internal Links Đi (Outbound):</span>
                <ul className="list-disc pl-3 text-[10px] text-gray-500 space-y-0.5">
                  <li>/dich-vu-marketing-tong-the</li>
                  <li>/dich-vu-seo-tong-the</li>
                  <li>/thiet-ke-website</li>
                  <li>/quang-cao-google-ads</li>
                  <li>/quang-cao-facebook-ads</li>
                  <li>/quang-cao-tiktok-ads</li>
                </ul>
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-blue-800 uppercase tracking-wider font-mono text-[9px]">Internal Links Nhận (Inbound):</span>
                <ul className="list-disc pl-3 text-[10px] text-gray-500 space-y-0.5">
                  <li>/ (Trang chủ)</li>
                  <li>/gioi-thieu</li>
                  <li>/case-studies</li>
                  <li>/lien-he</li>
                  <li>/chinh-sach-bao-mat</li>
                </ul>
              </div>
            </div>

            {/* Schema checklist confirmation */}
            <div className="bg-emerald-50 text-emerald-900 p-3 rounded-lg border border-emerald-200">
              <span className="font-bold block mb-1">Cấu hình Schema khuyên dùng:</span>
              <p className="leading-normal text-[11px]">
                Đã nhúng sẵn trình tạo schema trực tuyến cho 4 thực thể chính: <strong>BlogPosting</strong>, <strong>CollectionPage</strong>, <strong>BreadcrumbList</strong>, và <strong>FAQPage</strong> giúp bot lập chỉ mục hoàn hảo tức thời.
              </p>
            </div>
          </div>
        </div>
      </div>


  );
}
