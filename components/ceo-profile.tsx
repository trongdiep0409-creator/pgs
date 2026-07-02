'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, TrendingUp, Target, LineChart, Compass, Users, BookOpen, 
  ArrowRight, ChevronRight, Quote, FileText, CheckCircle2, MessageSquare, 
  Search, Code, Share2, Briefcase, Calendar, Play, Lightbulb, Check, 
  Settings, Layers, Globe, HelpCircle, Activity, Sparkles, MapPin, 
  Mail, Linkedin, ArrowUpRight, Eye, ClipboardList, RefreshCw
} from 'lucide-react';

export default function CeoProfileComponent() {
  const [activeTab] = useState<'preview' | 'blueprint'>('preview');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredExpertise, setHoveredExpertise] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Monitor scroll progress & sticky CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
      
      // Show sticky CTA after scrolling past hero section (approx 600px)
      if (window.scrollY > 600) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    // Check motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Standard animation variants respecting reduced motion
  const fUp = prefersReducedMotion 
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      };

  const fIn = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8 } }
      };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Expertise details for interactive orbit & summary section
  const expertises = [
    {
      id: 1,
      title: "SEO Tổng Thể (Omni SEO)",
      desc: "Định hướng tư duy SEO lấy chuyển đổi làm gốc. Tập trung nghiên cứu intent người dùng sâu sắc, tối ưu cấu trúc thông tin (Information Architecture) chuẩn EEAT và thống trị thứ hạng tìm kiếm tự nhiên bền vững.",
      icon: Search,
      metric: "Tăng 300%+ Traffic tự nhiên",
      tag: "Organic Growth",
      details: ["Nghiên cứu Intent sâu sắc", "Cấu trúc Semantic Silo", "Tối ưu hóa EEAT Entity", "SEO bền vững không trick-lỏ"]
    },
    {
      id: 2,
      title: "Thiết Kế Website Chuẩn CRO",
      desc: "Xây dựng trải nghiệm số cao cấp, kết hợp nhịp nhàng giữa mỹ thuật đỉnh cao (Visual Arts) và cấu trúc tối ưu chuyển đổi (Conversion Rate Optimization). Website là một cỗ máy bán hàng tự động 24/7.",
      icon: Code,
      metric: "X2 Tỷ lệ chuyển đổi (CR)",
      tag: "High-end Design",
      details: ["Mỹ thuật Premium độc bản", "UI/UX tối ưu hành trình", "Tốc độ tải trang < 1.5s", "Mobile-first & Touch Target 44px"]
    },
    {
      id: 3,
      title: "Multi-channel Paid Ads",
      desc: "Vận hành hệ thống quảng cáo đa kênh thông minh (Google, Facebook, TikTok Ads). Không đốt tiền vô ích, tập trung tối ưu chỉ số quan trọng nhất: CPA (Chi phí mỗi chuyển đổi) và ROAS (Doanh thu trên chi phí quảng cáo).",
      icon: TrendingUp,
      metric: "Tối ưu 30-50% Chi phí quảng cáo",
      tag: "Performance Marketing",
      details: ["A/B Testing liên tục", "Phễu quảng cáo đa tầng", "Tối ưu hóa phễu chuyển đổi", "Báo cáo minh bạch realtime"]
    },
    {
      id: 4,
      title: "Content Marketing & Social",
      desc: "Sản xuất nội dung chuẩn SEO & Viral có chiều sâu tư duy cao, chạm đúng nỗi đau (pain point) và khao khát của khách hàng mục tiêu. Định hình tiếng nói thương hiệu nhất quán và chuyên nghiệp.",
      icon: BookOpen,
      metric: "85% Khách hàng quay lại đọc",
      tag: "Brand Authority",
      details: ["Định vị giọng nói thương hiệu", "Content phễu nhận diện", "Viral Content đa nền tảng", "Tài liệu chuyên môn chiều sâu"]
    },
    {
      id: 5,
      title: "Tracking Dữ Liệu Toàn Diện",
      desc: "Cài đặt hệ thống đo lường, theo dõi chuẩn xác từng hành vi của người dùng (GA4, GTM, Pixel). Đưa ra quyết định tối ưu hóa dựa hoàn toàn trên số liệu thực tế, loại bỏ hoàn toàn việc phỏng đoán cảm tính.",
      icon: LineChart,
      metric: "Minh bạch 100% Điểm chạm dữ liệu",
      tag: "Data-Driven Strategy",
      details: ["Thiết lập Event GA4 nâng cao", "Hệ thống phễu phán đoán", "Dashboard đo lường Realtime", "Phân tích Heatmap chi tiết"]
    },
    {
      id: 6,
      title: "Growth Marketing System",
      desc: "Kết nối tất cả các kênh marketing rời rạc thành một hệ thống tăng trưởng khép kín, bền vững. Giúp doanh nghiệp B2B và dịch vụ cao cấp xây dựng phễu thu hút khách hàng tiềm năng liên tục (Lead Generation).",
      icon: Target,
      metric: "Tăng trưởng doanh thu 40%+ YoY",
      tag: "Growth Engineering",
      details: ["Xây phễu Lead Generation tự động", "Lead Nurturing qua Email/CRM", "Tối ưu hóa LTV khách hàng", "Đồng hành tư vấn chiến lược"]
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      year: "2017",
      title: "Khởi đầu thực chiến - Trải nghiệm gốc rễ",
      desc: "CEO Phùng Quốc Bảo bước chân vào thị trường kinh doanh online thực tế. Trực tiếp đảm nhận tất cả các khâu từ lên ý tưởng sản phẩm, viết Content, thiết lập quảng cáo, trực tiếp tư vấn khách hàng và chốt đơn. Giai đoạn này định hình tư duy thực chiến sâu sắc nhất của anh: marketing phải đem lại hiệu quả kinh doanh thực sự, từng đồng ngân sách chi ra phải mang lại giá trị đo lường được.",
      highlights: ["Trực tiếp vận hành phễu bán hàng khép kín", "Xây dựng tư duy lấy doanh thu làm gốc", "Thấu hiểu hành vi khách hàng qua hàng ngàn cuộc tư vấn"]
    },
    {
      year: "2019",
      title: "Bước ngoặt chiều sâu - Làm chủ công nghệ số",
      desc: "Nhận thấy sự rời rạc của thị trường khi nhiều doanh nghiệp chỉ chạy ads đơn thuần mà bỏ qua gốc rễ là Website, SEO và Tracking dữ liệu. CEO Phùng Quốc Bảo quyết định đi sâu nghiên cứu chuyên sâu về SEO tổng thể, lập trình thiết kế website chuẩn CRO, kỹ thuật tracking dữ liệu nâng cao và tối ưu hóa chuyển đổi. Anh bắt đầu tư vấn chiến lược marketing tổng thể cho các doanh nghiệp vừa và nhỏ.",
      highlights: ["Làm chủ hệ thống SEO Entity & Semantic Web", "Xây dựng tư duy tối ưu hóa chuyển đổi CRO", "Thiết lập hệ thống đo lường dữ liệu nâng cao"]
    },
    {
      year: "2021",
      title: "Thành lập PGS Agency - Khẳng định triết lý",
      desc: "Thành lập PGS Agency với sứ mệnh giải quyết nỗi đau của doanh nghiệp: 'Tiền mất tật mang vì làm marketing rời rạc'. Anh quy tụ đội ngũ chuyên gia tài năng, định hình PGS thành một Agency Marketing tổng thể lấy hiệu quả kinh doanh làm trung tâm. Mọi giải pháp từ PGS - dù là SEO, Ads, Website hay Content - đều phải được thiết kế như một phần của hệ thống tăng trưởng đồng bộ.",
      highlights: ["Chuẩn hóa quy trình Marketing tổng thể đa kênh", "Đồng hành cùng hơn 150+ doanh nghiệp bứt phá doanh thu", "Khẳng định triết lý: Sự thịnh vượng của khách hàng gắn liền với thành công của PGS"]
    }
  ];

  // Role details
  const roles = [
    {
      title: "Định Hướng Chiến Lược",
      desc: "Trực tiếp nghiên cứu thị trường, phân tích đối thủ cạnh tranh và phác thảo sơ đồ hệ thống Marketing tổng thể cho từng khách hàng của PGS. Không dùng một công thức chung cho mọi doanh nghiệp.",
      details: "Thiết kế kiến trúc hệ thống tăng trưởng độc bản cho từng khách hàng."
    },
    {
      title: "Chuẩn Hóa & Kiểm Duyệt Quy Trình",
      desc: "Đảm bảo mọi chiến dịch SEO, Ads hay Website của PGS đều tuân thủ các tiêu chuẩn kỹ thuật khắt khe nhất thế giới, tối ưu hóa triệt để trải nghiệm người dùng và tỷ lệ chuyển đổi.",
      details: "Áp dụng bộ tiêu chuẩn 45 chỉ số vàng của PGS trước khi bàn giao dự án."
    },
    {
      title: "Đào Tạo Đội Ngũ Tinh Nhuệ",
      desc: "Trực tiếp đứng lớp, truyền đạt tư duy thực chiến và cập nhật những công nghệ Marketing mới nhất (bao gồm tối ưu hóa AI Search - AIO, ứng dụng AI thông minh) cho đội ngũ nhân sự PGS.",
      details: "Tổ chức chuyên đề chuyên môn định kỳ hàng tuần nâng cao năng lực."
    },
    {
      title: "Đồng Hành Dự Án Trọng Điểm",
      desc: "Đóng vai trò là cố vấn chiến lược cấp cao trong các dự án lớn, đồng hành cùng chủ doanh nghiệp để tháo gỡ các nút thắt về tăng trưởng, chuyển đổi dữ liệu và tối ưu chi phí.",
      details: "Trực tiếp họp chiến lược cùng các đối tác VIP định kỳ."
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "CEO Phùng Quốc Bảo là ai và vai trò định hướng của anh tại PGS Agency thế nào?",
      a: "Anh Phùng Quốc Bảo là Founder & CEO của PGS Agency. Với hơn 8 năm kinh nghiệm thực chiến từ bán hàng trực tiếp đến xây dựng hệ thống Digital Marketing toàn diện, anh Bảo định hướng PGS Agency theo triết lý độc bản: 'Marketing tổng thể lấy hiệu quả kinh doanh làm trọng tâm'. Anh chịu trách nhiệm thiết lập chiến lược vĩ mô, kiểm duyệt chất lượng kỹ thuật hàng tuần và trực tiếp cố vấn cho các dự án tăng trưởng trọng điểm của khách hàng tại PGS."
    },
    {
      q: "CEO Phùng Quốc Bảo có chuyên môn sâu trong các mảng nào?",
      a: "CEO Phùng Quốc Bảo sở hữu hệ sinh thái chuyên môn đa nền tảng và có tính liên kết chặt chẽ bao gồm: Định hướng kiến trúc SEO tổng thể (Omni SEO), thiết kế trải nghiệm người dùng tối ưu chuyển đổi (UX/UI & CRO Web), thiết lập phễu quảng cáo đa tầng (Performance Paid Ads), và kiến tạo hệ thống theo dõi đo lường dữ liệu chuẩn xác (GA4/GTM Tracking). Sự đa năng này giúp anh có cái nhìn toàn cảnh để thiết kế các hệ thống marketing không bị đứt gãy."
    },
    {
      q: "Khách hàng của PGS Agency có được làm việc trực tiếp với CEO không?",
      a: "Tất cả các dự án Marketing tổng thể và thiết kế website thương hiệu tại PGS đều được CEO Phùng Quốc Bảo trực tiếp thẩm định, đóng góp ý kiến chiến lược ở giai đoạn phác thảo sơ đồ phễu. Đối với các dự án trọng điểm hoặc doanh nghiệp đăng ký gói tư vấn chiến lược tăng trưởng dài hạn, CEO Phùng Quốc Bảo sẽ trực tiếp đồng hành họp chiến lược cùng ban giám đốc khách hàng định kỳ để tối ưu hiệu quả tối đa."
    },
    {
      q: "Tư duy khác biệt nhất của CEO Phùng Quốc Bảo trong marketing là gì?",
      a: "Đó là tư duy 'Chống marketing rời rạc - Xây hệ thống tăng trưởng số'. Anh luôn nhấn mạnh rằng việc chỉ chạy Ads đơn thuần mà không tối ưu Website, thiếu đo lường dữ liệu hay không có SEO thương hiệu giống như đổ nước vào một chiếc xô thủng. Marketing thực sự phải bắt đầu từ việc thấu hiểu hành trình khách hàng, xây dựng điểm chạm uy tín bền vững, đo lường từng con số và liên tục tối ưu hóa tỷ lệ chuyển đổi."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1E] font-sans relative selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-amber-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />



      {/* STICKY CTA MOBILE */}
      <AnimatePresence>
        {showStickyCta && activeTab === 'preview' && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 py-3.5 px-6 flex md:hidden items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
            id="sticky-cta-mobile"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600">CEO Phùng Quốc Bảo</span>
              <span className="text-xs font-bold text-stone-900 truncate max-w-[180px]">Tư vấn marketing tổng thể</span>
            </div>
            <a 
              href="#lien-he"
              className="bg-[#B89047] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm hover:bg-[#a17c3b] transition-colors"
            >
              Liên hệ ngay
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER / NAVIGATION BAR */}
      

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* BREADCRUMB */}
        <div className="py-2 mb-6" id="breadcrumb-section">
          <nav className="flex items-center gap-2 text-xs font-medium text-stone-500">
            <Link href="/" className="hover:text-stone-900 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-400">Giới thiệu</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-[#B89047] font-semibold">CEO Phùng Quốc Bảo</span>
          </nav>
        </div>

        {/* --------------------------------------------------------------------------------- */}
        {/* TAB 1: PREVIEW - THE ACTUAL HIGH-END INTERACTIVE WEBSITE */}
        {/* --------------------------------------------------------------------------------- */}
        {activeTab === 'preview' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-24 pb-20"
          >
            {/* DEFINITION BLOCK FOR AI SEARCH GROUNDING (Tối ưu hóa tìm kiếm thực thể ngay đầu trang) */}
            <section className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-6 md:p-8" id="ai-search-anchor">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 text-amber-800 text-xs font-bold tracking-wide uppercase">
                    <Sparkles className="w-3 h-3" /> AI-Search & EEAT Entity Definition
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">CEO Phùng Quốc Bảo là ai?</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    <strong>Phùng Quốc Bảo (CEO Phùng Quốc Bảo)</strong> là chuyên gia tư vấn chiến lược Marketing tổng thể, đồng thời là <strong>Founder & CEO của PGS Agency</strong> - đơn vị đi đầu trong việc xây dựng hệ sinh thái tăng trưởng số bền vững tại Việt Nam. Anh có hơn 8 năm kinh nghiệm thực chiến đa kênh từ SEO, CRO Website, Performance Ads, đến dữ liệu đo lường hành vi người dùng, giúp doanh nghiệp thoát khỏi tư duy làm marketing rời rạc để tiến đến xây hệ thống tăng trưởng có chiều sâu dựa trên dữ liệu chuẩn xác.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900 uppercase">Entity Verified</h4>
                    <p className="text-[11px] text-stone-500">PGS Agency Founder & CEO</p>
                  </div>
                </div>
              </div>
            </section>

            {/* HERO SECTION WITH 3D GLASSMOPRHISM FRAME & FLOATING CARDS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4" id="hero-section">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block">FOUNDER & CEO PGS AGENCY</span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
                  CEO Phùng Quốc Bảo – Người xây dựng hệ thống Marketing tổng thể lấy hiệu quả kinh doanh làm trọng tâm
                </h1>
                <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
                  Thay vì đốt tiền vào các chiến dịch quảng cáo rời rạc mang lại lượt tương tác ảo, chúng tôi đồng hành cùng doanh nghiệp thiết kế hệ sinh thái tiếp thị số khép kín, bền vững, lấy đo lường dữ liệu chuẩn xác làm cơ sở và chuyển đổi doanh thu làm thước đo thành công tối thượng.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a 
                    href="#lien-he" 
                    className="bg-[#B89047] hover:bg-[#a17c3b] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-md shadow-amber-900/10 transition-all flex items-center gap-2 group"
                  >
                    <span>Trao đổi cùng PGS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#expertise" 
                    className="border border-[#B89047] text-stone-900 text-sm font-bold px-7 py-3.5 rounded-full hover:bg-amber-50/50 transition-colors"
                  >
                    Tìm hiểu chuyên môn của tôi
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative flex justify-center">
                {/* 3D PORTRAIT FRAME */}
                <div className="w-80 h-96 relative">
                  {/* Decorative background gradients */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-amber-200/40 rounded-3xl -rotate-6 scale-95 opacity-80 blur-xl -z-10" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 to-amber-100/30 rounded-3xl rotate-3 scale-100 -z-10 border border-amber-300/30" />
                  
                  {/* Glassmorphism Outer Frame */}
                  <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-3xl p-4 border border-white/60 shadow-xl flex flex-col relative overflow-hidden group">
                    {/* Simulator Image Placeholder with vector details */}
                    <div className="w-full h-full bg-gradient-to-b from-stone-100 to-stone-200 rounded-2xl overflow-hidden relative flex flex-col items-center justify-end">
                      
                      {/* Subtle gold line pattern on background */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b89047_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {/* Stylized vector representation of CEO */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] bg-white/80 px-2 py-1 rounded-full text-stone-800 font-bold border border-stone-200">PORTRAIT INTERACTIVE</span>
                          <Award className="w-5 h-5 text-amber-600" />
                        </div>
                        
                        {/* Abstract portrait art of a leader */}
                        <div className="w-32 h-32 bg-white/90 rounded-full border-4 border-[#B89047] mx-auto shadow-md relative overflow-hidden flex items-center justify-center">
                          <Users className="w-16 h-16 text-stone-400" />
                          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-[#B89047] to-amber-500 flex items-center justify-center">
                            <span className="text-[9px] text-white font-extrabold tracking-widest">FOUNDER</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-center bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-stone-100 shadow-lg">
                          <h4 className="text-sm font-black text-stone-900">CEO Phùng Quốc Bảo</h4>
                          <p className="text-[11px] text-stone-500">8+ năm kinh nghiệm thực chiến</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING CARD 1: SEO */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-6 -left-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-2 max-w-[150px]"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-[#B89047]">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-900">Omni SEO</span>
                      <span className="text-[9px] text-stone-500 font-medium">Bền vững, tăng CR</span>
                    </div>
                  </motion.div>

                  {/* FLOATING CARD 2: GROWTH SYSTEM */}
                  <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 -right-12 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-2 max-w-[160px]"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-900">Growth System</span>
                      <span className="text-[9px] text-stone-500 font-medium">Xây hệ thống bền vững</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* TÓM TẮT CHUYÊN MÔN (EXPERTISE SUMMARY) */}
            <section className="space-y-12 scroll-mt-24" id="expertise">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase">HỆ SINH THÁI KHĂNG KHÍT</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                  Tóm Tắt Chuyên Môn Sâu Của CEO Phùng Quốc Bảo
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Với tư duy Marketing tổng thể, CEO Phùng Quốc Bảo thiết lập tiêu chuẩn chuyên môn cao cấp đa nền tảng, đảm bảo không có bất kỳ điểm gãy nào trong hành trình trải nghiệm và chuyển đổi của khách hàng.
                </p>
              </div>

              {/* EXPERTISE CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertises.map((exp, i) => {
                  const IconComp = exp.icon;
                  return (
                    <motion.div 
                      key={exp.id}
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-white rounded-2xl p-6 border border-stone-200/80 hover:border-amber-400/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                      onClick={() => setHoveredExpertise(i)}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100/70 flex items-center justify-center text-[#B89047] transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold text-stone-400">#0{exp.id}</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-stone-900 group-hover:text-[#B89047] transition-colors">{exp.title}</h3>
                          <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{exp.tag}</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{exp.desc}</p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                          {exp.metric}
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* TIMELINE HÀNH TRÌNH PHÁT TRIỂN (EXPERIENCE & HISTORY) */}
            <section className="bg-stone-50 border border-stone-200/60 rounded-3xl p-8 md:p-12 space-y-12 scroll-mt-24" id="journey">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-4">
                  <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase block">CON ĐƯỜNG PHÁT TRIỂN</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 leading-snug">
                    Hành Trình Kiến Tạo & Tích Lũy Kinh Nghiệm Thực Chiến
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Không đi lên từ lý thuyết suông, sự nghiệp của CEO Phùng Quốc Bảo được mài giũa bằng hàng ngàn ngày lăn lộn thực tế ngoài thị trường kinh doanh online, thấu hiểu tường tận từng ngóc ngách của tiếp thị và hành vi người tiêu dùng.
                  </p>
                  
                  {/* Visual 3D style accent element */}
                  <div className="hidden lg:block pt-8">
                    <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Mantra phát triển</span>
                      <p className="text-xs italic text-[#B89047] font-medium leading-relaxed">
                        &quot;Trải nghiệm thực tế mang lại sự thấu cảm khách hàng, kiến thức công nghệ mang lại hiệu quả vượt trội.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* TIMELINE ELEMENTS */}
                <div className="lg:col-span-8 relative space-y-8 pl-6 md:pl-10 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-[2px] before:bg-amber-200">
                  {timelineEvents.map((evt, idx) => (
                    <div key={evt.year} className="relative group space-y-3">
                      {/* Circle indicator on timeline */}
                      <div className="absolute -left-[28px] md:-left-[44px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#B89047] group-hover:bg-[#B89047] transition-colors flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B89047] group-hover:bg-white transition-colors" />
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 hover:border-amber-300 shadow-sm transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-[#B89047]">{evt.year}</span>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider bg-stone-50 px-2 py-0.5 rounded">Milestone 0{idx + 1}</span>
                        </div>
                        <h3 className="text-base font-bold text-stone-900">{evt.title}</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">{evt.desc}</p>
                        
                        <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2">
                          {evt.highlights.map((hl, hIdx) => (
                            <span key={hIdx} className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-700 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full">
                              <Check className="w-3 h-3 text-amber-600" />
                              {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THÀNH LẬP PGS AGENCY - LOGO ASSEMBLE ANIMATION SIMULATOR */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="milestone-pgs">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase block">SỨ MỆNH KHỞI TẠO</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
                  Thành Lập PGS Agency: Mảnh Ghép Hoàn Chỉnh Về Tiếp Thị Số
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  PGS Agency ra đời không chỉ như một công ty quảng cáo đơn thuần. CEO Phùng Quốc Bảo kiến tạo PGS như một giải pháp cứu cánh cho các doanh nghiệp đang chật vật với các hoạt động tiếp thị rời rạc.
                </p>
                <div className="space-y-3.5">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      <strong>Tích hợp chiều sâu:</strong> Đồng nhất Website, SEO, Paid Ads và Content trong một sợi chỉ đỏ chiến lược thống nhất.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      <strong>Đo lường trung thực:</strong> Không có thông số ảo. Mọi quyết định đều dựa trên hành vi khách hàng được theo dõi rõ ràng bằng kỹ thuật số.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-amber-50/30 border border-amber-200/40 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Interactive Simulator</span>
                  <h3 className="text-sm font-bold text-stone-900">Mô phỏng Triết Lý PGS System Assembly</h3>
                  <p className="text-[11px] text-stone-500">Click chọn từng mảnh ghép để thấy triết lý xây dựng hệ sinh thái tiếp thị của CEO Phùng Quốc Bảo</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Website Chuẩn CRO", "SEO Entity Tổng Thể", "Multi-channel Paid Ads", "Tracking Dữ Liệu"].map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-50 mx-auto flex items-center justify-center text-[#B89047] mb-2 group-hover:bg-[#B89047] group-hover:text-white transition-colors">
                        {idx === 0 && <Code className="w-4 h-4" />}
                        {idx === 1 && <Search className="w-4 h-4" />}
                        {idx === 2 && <TrendingUp className="w-4 h-4" />}
                        {idx === 3 && <LineChart className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold text-stone-800 group-hover:text-[#B89047] transition-colors block">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 text-center">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block mb-1">KẾT QUẢ HỘI TỤ</span>
                  <p className="text-xs text-stone-700 font-extrabold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    HỆ THỐNG TĂNG TRƯỞNG SỐ BỀN VỮNG PGS AGENCY
                  </p>
                </div>
              </div>
            </section>

            {/* TƯ DUY MARKETING CỦA CEO (EDITORIAL QUOTE BLOCK) */}
            <section className="py-12 border-y border-stone-200/80 scroll-mt-24" id="philosophy">
              <div className="max-w-4xl mx-auto space-y-8 text-center relative px-4">
                <Quote className="w-14 h-14 text-amber-200/80 mx-auto absolute -top-8 left-1/2 -translate-x-1/2 -z-10" />
                
                <h2 className="text-xl md:text-3xl font-black text-stone-900 leading-snug italic tracking-tight pt-4">
                  &quot;Marketing hiệu quả không nằm ở việc cố gắng chạy nhiều quảng cáo hơn mỗi ngày, mà nằm ở việc xây dựng một hệ thống tăng trưởng đồng bộ có chiều sâu.&quot;
                </h2>
                
                <div className="space-y-1">
                  <span className="text-sm font-bold text-stone-900 block">CEO Phùng Quốc Bảo</span>
                  <span className="text-xs text-stone-500 uppercase tracking-widest font-medium">Founder & CEO PGS Agency</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
                  <div className="bg-white p-6 rounded-2xl border border-stone-150 shadow-sm space-y-2">
                    <h3 className="text-xs font-bold text-[#B89047] uppercase tracking-wider">01. Không traffic ảo</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">Tránh xa các số liệu viển vông như click, like hay impression ảo. Mọi chiến dịch của chúng tôi đều hướng thẳng đến số lượng Lead chất lượng cao và cơ hội bán hàng thực tế.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-stone-150 shadow-sm space-y-2">
                    <h3 className="text-xs font-bold text-[#B89047] uppercase tracking-wider">02. Không rời rạc</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">Không bao giờ làm SEO cô lập hay Ads độc lập. PGS kết nối tất cả các kênh lại thành một phễu tiếp thị khép kín, tối ưu hóa triệt để tỷ lệ chuyển đổi CRO.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-stone-150 shadow-sm space-y-2">
                    <h3 className="text-xs font-bold text-[#B89047] uppercase tracking-wider">03. Dữ liệu trung thực</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">Đo lường trung thực mọi điểm chạm của người dùng trên web. Điều này giúp loại bỏ hoàn toàn phán đoán cảm tính, tối ưu chính xác từng đồng chi phí marketing.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* VAI TRÒ CỦA CEO TRONG PGS (ROLE CARDS) */}
            <section className="space-y-12 scroll-mt-24" id="role">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase">ẢNH HƯỞNG CHIẾN LƯỢC</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                  Vai Trò Hành Động Của CEO Phùng Quốc Bảo Tại PGS Agency
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Tại PGS Agency, CEO Phùng Quốc Bảo không chỉ đứng ở vị trí quản lý vĩ mô. Anh tham gia trực tiếp vào việc định hình chiến lược và giám sát chất lượng kỹ thuật hàng tuần.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((r, i) => (
                  <div 
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-stone-200/80 hover:border-amber-400/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#B89047] font-bold text-xs">
                        0{i+1}
                      </div>
                      <h3 className="text-sm font-bold text-stone-950 group-hover:text-[#B89047] transition-colors">{r.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed">{r.desc}</p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-stone-100">
                      <p className="text-[11px] text-stone-500 italic leading-relaxed">
                        <strong>Trách nhiệm:</strong> {r.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HỆ THỐNG CHUYÊN MÔN CEO ĐỊNH HƯỚNG (EXPERTISE ORBIT - INTERACTIVE COMPONENT) */}
            <section className="bg-stone-50 border border-stone-200/60 rounded-3xl p-8 md:p-12 space-y-12" id="orbit-section">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase block">KIẾN TRÚC VỮNG CHẮC</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 leading-snug">
                    Hệ Thống Chuyên Môn Phối Hợp Nhịp Nhàng
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Sự tinh thông đa lĩnh vực của CEO Phùng Quốc Bảo được sơ đồ hóa thành một vòng tròn quỹ đạo khép kín. Nhấp vào các chuyên đề bên cạnh hoặc vòng tròn mô phỏng để xem chi tiết ứng dụng thực tế.
                  </p>
                  
                  {/* Detailed Explanation of Selected Expertise */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200/60 shadow-sm space-y-3">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase inline-block">
                      {expertises[hoveredExpertise].tag}
                    </span>
                    <h3 className="text-base font-bold text-stone-900">{expertises[hoveredExpertise].title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{expertises[hoveredExpertise].desc}</p>
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">Các đầu việc cốt lõi:</span>
                      <ul className="space-y-1">
                        {expertises[hoveredExpertise].details.map((item, idx) => (
                          <li key={idx} className="text-xs text-stone-700 flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#B89047]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ORBIT SIMULATOR UI */}
                <div className="lg:col-span-7 flex justify-center items-center h-96 relative">
                  <div className="w-80 h-80 rounded-full border border-stone-200/80 flex items-center justify-center relative">
                    
                    {/* Inner Orbit Line */}
                    <div className="w-56 h-56 rounded-full border border-stone-200/60 flex items-center justify-center absolute" />
                    
                    {/* Center Core Logo */}
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-[#B89047] shadow-lg flex flex-col items-center justify-center z-10 text-center p-2">
                      <span className="text-xs font-black text-stone-900">PGS</span>
                      <span className="text-[8px] text-amber-700 font-bold uppercase tracking-wider">CEO Core</span>
                    </div>

                    {/* Orbiting Nodes */}
                    {expertises.map((exp, idx) => {
                      const angle = (idx * 360) / expertises.length;
                      const rad = (angle * Math.PI) / 180;
                      // Calculate position on a 140px radius circle
                      const x = Math.cos(rad) * 140;
                      const y = Math.sin(rad) * 140;
                      const IconComp = exp.icon;
                      const isSelected = hoveredExpertise === idx;

                      return (
                        <button
                          key={exp.id}
                          onClick={() => setHoveredExpertise(idx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center absolute shadow-md transition-all duration-350 cursor-pointer ${
                            isSelected 
                              ? 'bg-[#B89047] text-white scale-125 border-2 border-white z-20' 
                              : 'bg-white text-stone-500 hover:text-stone-900 hover:border-[#B89047] border border-stone-200 hover:scale-110 z-10'
                          }`}
                          style={{
                            transform: `translate(${x}px, ${y}px)`
                          }}
                          title={exp.title}
                        >
                          <IconComp className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* BÀI VIẾT / TÀI LIỆU CHUYÊN MÔN (PREMIUM BLOG CARDS) */}
            <section className="space-y-12 scroll-mt-24" id="articles">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase">CHIA SẺ TRI THỨC</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                  Bài Viết & Tài Liệu Chuyên Môn Xuất Bản
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Tổng hợp các bài phân tích sâu sắc, cẩm nang chiến lược do chính CEO Phùng Quốc Bảo biên soạn độc quyền cho ban quản trị và các chủ doanh nghiệp đối tác.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Bản đồ kiến trúc SEO Entity 2026: Đưa website lên Top tìm kiếm bằng Uy Tín thực thể",
                    desc: "Hướng dẫn xây dựng cấu trúc Semantic Web và khai báo Entity đồng bộ, giúp công cụ tìm kiếm hiểu sâu về doanh nghiệp của bạn một cách rõ ràng nhất, tối ưu EEAT tuyệt đối.",
                    date: "15/05/2026",
                    category: "SEO Strategy"
                  },
                  {
                    title: "Bí quyết thiết kế website tỷ lệ chuyển đổi cao (CRO): Biến traffic thành dòng tiền thực tế",
                    desc: "Phân tích 12 điểm chạm quyết định hành vi mua hàng trên giao diện web di động. Cách sắp xếp cấu trúc nội dung và tinh chỉnh Touch Target chuẩn xác giúp tăng 200% CR.",
                    date: "28/04/2026",
                    category: "Conversion Optimization"
                  },
                  {
                    title: "Hệ thống phễu quảng cáo đa tầng: Tối ưu 40% chi phí và gia tăng giá trị trọn đời LTV",
                    desc: "Phương pháp kết hợp nhịp nhàng giữa Google Ads, Facebook Ads và TikTok Ads dựa trên dữ liệu đo lường hành vi realtime để tối ưu hóa phễu chuyển đổi bền vững.",
                    date: "10/04/2026",
                    category: "Performance Ads"
                  }
                ].map((art, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200/80 hover:border-amber-400/40 shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-bold">
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">{art.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {art.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B89047] transition-colors leading-snug">{art.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed">{art.desc}</p>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-500">Tác giả: Phùng Quốc Bảo</span>
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1 hover:text-amber-700">
                        Đọc tài liệu <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HÌNH ẢNH & BẰNG CHỨNG THỰC TẾ (PROOF GALLERY) */}
            <section className="bg-stone-50 border border-stone-200/60 rounded-3xl p-8 md:p-12 space-y-8 scroll-mt-24" id="proof">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase block">HÌNH ẢNH THỰC TẾ</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                    Kho Tư Liệu Hoạt Động & Sự Kiện Thực Tế
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Minh bạch tuyệt đối trong mọi hoạt động. Những hình ảnh thật từ các buổi chia sẻ, huấn luyện chiến lược nội bộ và họp bàn phương hướng tăng trưởng cùng khách hàng.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur border border-stone-200 px-3.5 py-2.5 rounded-xl text-stone-500 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Dữ liệu xác thực thực tế [Placeholder]</span>
                </div>
              </div>

              {/* GRID OF PLACEHOLDER GALLERY */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Huấn luyện chiến lược SEO Entity", desc: "CEO Phùng Quốc Bảo trực tiếp đứng lớp đào tạo chuyên môn nội bộ cho đội ngũ PGS." },
                  { title: "Họp chiến lược cùng ban giám đốc đối tác", desc: "Thống nhất sơ đồ phễu marketing tổng thể và kế hoạch triển khai CRO Web." },
                  { title: "CEO chia sẻ tại hội thảo tăng trưởng số", desc: "Lan tỏa tư duy marketing có chiều sâu lấy hiệu quả kinh doanh làm thước đo." },
                  { title: "Đánh giá chất lượng kỹ thuật dự án hàng tuần", desc: "Kiểm duyệt nghiêm ngặt từng chỉ số đo lường trước khi bàn giao dự án." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group">
                    <div className="h-44 bg-gradient-to-br from-stone-100 to-stone-200/70 p-4 relative flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] bg-white/90 border border-stone-200 px-2 py-0.5 rounded-full font-bold text-stone-700">GALLERY {idx+1}</span>
                        <Play className="w-4 h-4 text-[#B89047]" />
                      </div>
                      
                      <div className="mx-auto my-auto w-10 h-10 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">[Ảnh Thực Tế PGS Agency]</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#B89047] transition-colors leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ + CTA CUỐI TRANG */}
            <section className="space-y-16 scroll-mt-24" id="faqs">
              {/* FAQ */}
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-xs font-extrabold text-amber-600 tracking-widest uppercase">GIẢI ĐÁP THẮC MẮC</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                    Câu Hỏi Thường Gặp Về CEO Phùng Quốc Bảo
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm transition-all"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-amber-800 transition-colors"
                        >
                          <span className="text-xs md:text-sm">{faq.q}</span>
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-50 text-[#B89047]' : ''}`}>
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
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

              {/* PREMIUM CTA PANEL */}
              <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-stone-800" id="lien-he">
                {/* Decorative golden patterns */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-[radial-gradient(#b89047_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#B89047] rounded-full filter blur-3xl opacity-10" />
                
                <div className="relative z-10 max-w-3xl space-y-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-[10px] font-extrabold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> LIÊN HỆ ĐỒNG HÀNH CHIẾN LƯỢC
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Trao Đổi Với PGS Về Hệ Thống Marketing Phù Hợp Cho Doanh Nghiệp Bạn
                  </h2>
                  <p className="text-xs md:text-sm text-stone-400 leading-relaxed max-w-2xl">
                    Hãy để chúng tôi lắng nghe bài toán kinh doanh thực tế, tháo gỡ những bế tắc và cùng bạn vẽ nên tấm bản đồ tăng trưởng số khép kín, bền vững nhất.
                  </p>
                  
                  {/* Interactive form inside CTA */}
                  <div className="bg-stone-900/80 backdrop-blur-md p-6 rounded-2xl border border-stone-800 space-y-4 max-w-xl">
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest">ĐĂNG KÝ TƯ VẤN SƠ BỘ (MIỄN PHÍ)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Họ và tên của bạn" 
                        className="bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                      <input 
                        type="email" 
                        placeholder="Email liên hệ" 
                        className="bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Số điện thoại" 
                        className="bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                      <input 
                        type="text" 
                        placeholder="Tên doanh nghiệp / Website" 
                        className="bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>
                    <textarea 
                      placeholder="Bài toán tăng trưởng hiện tại của doanh nghiệp bạn..." 
                      rows={3}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89047] transition-colors"
                    />
                    <button 
                      onClick={() => alert("Cảm ơn bạn đã đăng ký! PGS Agency sẽ liên hệ lại trong vòng 24h làm việc.")}
                      className="w-full bg-[#B89047] hover:bg-[#a17c3b] text-stone-950 font-bold py-3 rounded-lg text-xs tracking-wider uppercase transition-colors"
                    >
                      Gửi yêu cầu trao đổi cùng CEO Phùng Quốc Bảo
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* --------------------------------------------------------------------------------- */}
        {/* TAB 2: BLUEPRINT - THE SYSTEM DOCUMENTATION FOR DEV, DESIGN, SEO */}
        {/* --------------------------------------------------------------------------------- */}
        {activeTab === 'blueprint' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 pb-20"
          >
            {/* DOCUMENT OVERVIEW */}
            <section className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-2 text-amber-800">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Tài Liệu Bàn Giao Thiết Kế & Kỹ Thuật</span>
              </div>
              <h1 className="text-2xl font-extrabold text-stone-900">
                HỒ SƠ BÀN GIAO CHI TIẾT: TRANG GIỚI THIỆU CEO PHÙNG QUỐC BẢO
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tài liệu này đóng vai trò là kim chỉ nam tối thượng cho <strong>UI Designer</strong>, <strong>Frontend Developer</strong>, và <strong>SEO Specialist</strong> tại PGS Agency để dựng dựng, lập trình, cấu trúc hóa dữ liệu Entity và viết nội dung tối ưu EEAT của CEO Phùng Quốc Bảo một cách chuẩn mực nhất.
              </p>
            </section>

            {/* TECHNICAL BLUEPRINT FOR SPECIFIC ROLES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* DESIGNER BLUEPRINT */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2 text-[#B89047] pb-3 border-b border-stone-100">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-stone-900 uppercase text-sm">1. UI Designer Checklist</h3>
                </div>
                
                <div className="space-y-4 text-xs text-stone-600">
                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Hệ màu sắc thiết kế (Light Premium):</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Nền chính: Trắng tinh khiết (`#FFFFFF`) kết hợp trắng ngà (`#FAF9F6`) tạo chiều sâu thị giác.</li>
                      <li>Màu nhấn vàng gold cổ điển (`#B89047`, `#D4AF37`) thể hiện tính bền vững, cao cấp.</li>
                      <li>Chữ chính: Đen than (`#1C1C1E`) tránh dùng đen tuyền tuyệt đối để bảo vệ mắt và tăng tính thẩm mỹ.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Typography & Hierarchy:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Font chính: <strong>Inter</strong> hoặc <strong>Space Grotesk</strong> cho headings, tạo cảm giác chuyên nghiệp, gọn gàng của một chuyên gia tư vấn tăng trưởng.</li>
                      <li>Nghiêm cấm lạm dụng font serif uốn lượn rườm rà. Giữ tính tối giản và cân bằng tốt.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Khoảng trắng & Lưới:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Sử dụng lưới 12 cột chuẩn desktop. Khoảng cách cột (gap) khuyên dùng là 24px - 32px.</li>
                      <li>Tận dụng tối đa khoảng trắng (Negative Space) xung quanh ảnh chân dung CEO và Quote block để tạo vẻ thanh nhã.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/40">
                  <span className="text-[10px] font-bold text-amber-800 block mb-1">Mantra của Designer:</span>
                  <p className="text-[11px] italic text-stone-700 leading-relaxed">
                    &quot;Thanh lịch, uy tín, phản ánh trực giác của một trí tuệ sắc sảo, không làm màu gắt, tập trung vào chiều sâu nội dung.&quot;
                  </p>
                </div>
              </div>

              {/* DEVELOPER BLUEPRINT */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2 text-[#B89047] pb-3 border-b border-stone-100">
                  <Code className="w-5 h-5" />
                  <h3 className="font-bold text-stone-900 uppercase text-sm">2. Developer Checklist</h3>
                </div>

                <div className="space-y-4 text-xs text-stone-600">
                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Kịch bản Motion & Animations:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Sử dụng <strong>Framer Motion (motion/react)</strong> làm thư viện chính.</li>
                      <li><strong>Scroll Reveal:</strong> Các section xuất hiện mượt mà bằng cách trượt nhẹ lên (y: 25 &rarr; 0, opacity: 0 &rarr; 1).</li>
                      <li><strong>3D Tilt Effect:</strong> Thêm hiệu ứng nghiêng 3D nhẹ khi di chuột qua các expertise cards.</li>
                      <li><strong>Orbit System:</strong> Trục xoay nhẹ liên tục ở tâm của sơ đồ chuyên môn, các hành tinh vệ tinh giữ góc quay ổn định khi xoay.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Responsive & HTML IDs:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Đảm bảo touch targets trên mobile tối thiểu là 44px x 44px.</li>
                      <li>Gắn đầy đủ thuộc tính `id` định danh cho từng section (`#hero-section`, `#expertise`, `#journey`, etc.) để phục vụ SEO link neo và đo lường hành vi bằng Google Tag Manager.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Performance tối ưu:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Không load thừa asset nặng. Tối ưu ảnh chân dung về định dạng WebP, nén dưới 100KB.</li>
                      <li>Kiểm soát kịch bản re-render vô tận trong `useEffect` và tối ưu hóa CSS Tailind v4.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/40">
                  <span className="text-[10px] font-bold text-amber-800 block mb-1">Mantra của Developer:</span>
                  <p className="text-[11px] italic text-stone-700 leading-relaxed">
                    &quot;Mượt mà như nhung, phản hồi lập tức, mã nguồn sạch sẽ không thừa, tối ưu hóa điểm số Core Web Vitals tuyệt đối.&quot;
                  </p>
                </div>
              </div>

              {/* SEO SPECIALIST BLUEPRINT */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2 text-[#B89047] pb-3 border-b border-stone-100">
                  <Search className="w-5 h-5" />
                  <h3 className="font-bold text-stone-900 uppercase text-sm">3. SEO & Content Checklist</h3>
                </div>

                <div className="space-y-4 text-xs text-stone-600">
                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Entity & EEAT Setup:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Đồng nhất thông tin cá nhân của CEO: Tên (Phùng Quốc Bảo), vai trò (Founder & CEO PGS Agency), chuyên môn cốt lõi.</li>
                      <li>Khai báo cấu trúc thực thể Person rõ ràng, tham chiếu chéo tới thực thể Organization (PGS Agency).</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Cấu trúc Heading & Lên Bài:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Có duy nhất 1 thẻ H1 chứa từ khóa chính.</li>
                      <li>Các thẻ H2 phân định rõ ràng các chủ đề (Tóm tắt chuyên môn, Hành trình thực chiến, Vai trò tại PGS, Câu hỏi thường gặp).</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-black text-stone-800 uppercase block">Tối ưu hóa AI Search (AIO):</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Sử dụng định nghĩa trực diện &quot;CEO Phùng Quốc Bảo là ai?&quot; ở ngay phần đầu trang để Gemini, Perplexity dễ dàng trích xuất thông tin chuẩn xác.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/40">
                  <span className="text-[10px] font-bold text-amber-800 block mb-1">Mantra của SEOer:</span>
                  <p className="text-[11px] italic text-stone-700 leading-relaxed">
                    &quot;Dữ liệu liên kết chặt chẽ, cấu trúc thông tin rành mạch, khẳng định EEAT và chiếm trọn vị trí cao nhất trên AI Search.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* SEO META INFORMATION TABLE */}
            <section className="bg-white border border-stone-200 rounded-3xl p-8 space-y-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B89047]" /> SEO Meta Tags & Header Hierarchy
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-stone-600 border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <th className="py-3 px-4 text-left font-black text-stone-800 uppercase w-1/4">Thẻ / Chỉ số</th>
                      <th className="py-3 px-4 text-left font-black text-stone-800 uppercase w-3/4">Nội dung đề xuất chính xác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">Meta Title</td>
                      <td className="py-3 px-4 text-stone-700 font-mono">CEO Phùng Quốc Bảo – Founder PGS Agency | Chiến Lược Marketing Tổng Thể</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">Meta Description</td>
                      <td className="py-3 px-4 text-stone-700">Khám phá hành trình, chuyên môn sâu và triết lý tiếp thị lấy hiệu quả kinh doanh làm trung tâm của CEO Phùng Quốc Bảo - người đứng sau sự tăng trưởng đột phá của PGS Agency.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">H1 Header</td>
                      <td className="py-3 px-4 text-stone-700 italic">CEO Phùng Quốc Bảo – Người xây dựng hệ thống Marketing tổng thể lấy hiệu quả kinh doanh làm trọng tâm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">H2 / H3 Headers</td>
                      <td className="py-3 px-4 text-stone-700 space-y-1">
                        <p>• H2: Tóm Tắt Chuyên Môn Sâu Của CEO Phùng Quốc Bảo</p>
                        <p>• H2: Hành Trình Kiến Tạo & Tích Lũy Kinh Nghiệm Thực Chiến</p>
                        <p>• H2: Thành Lập PGS Agency: Mảnh Ghép Hoàn Chỉnh Về Tiếp Thị Số</p>
                        <p>• H2: Vai Trò Hành Động Của CEO Phùng Quốc Bảo Tại PGS Agency</p>
                        <p>• H2: Hệ Thống Chuyên Môn Phối Hợp Nhịp Nhàng</p>
                        <p>• H2: Bài Viết & Tài Liệu Chuyên Môn Xuất Bản</p>
                        <p>• H2: Câu Hỏi Thường Gặp Về CEO Phùng Quốc Bảo</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">Internal Links Đi</td>
                      <td className="py-3 px-4 text-stone-700 space-y-1">
                        <p>• Đến các trang dịch vụ lõi của PGS Agency: `/dich-vu/seo-tong-the/`, `/dich-vu/thiet-ke-website/`, `/dich-vu/quang-cao-da-kenh/`</p>
                        <p>• Đến trang giới thiệu chung: `/gioi-thieu/`</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-stone-900">Internal Links Nhận</td>
                      <td className="py-3 px-4 text-stone-700">
                        Nhận liên kết ngược từ chân trang (Footer), từ trang giới thiệu chung `/gioi-thieu/` và từ các bài viết blog chuyên mục về đội ngũ quản trị.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SCHEMA MARKUP CODEBLOCK GENERATOR */}
            <section className="bg-stone-900 text-white rounded-3xl p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B89047] uppercase tracking-widest block">SCHEMA STACK DEPLOYMENT (JSON-LD)</span>
                <span className="text-[10px] bg-stone-800 px-2 py-1 rounded text-stone-400">JSON-LD Auto-injected in production</span>
              </div>
              <h3 className="text-base font-bold">Cấu trúc Schema Person, Organization, FAQ, Breadcrumb đồng bộ</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Đoạn mã JSON-LD dưới đây được lập trình tự động chèn vào thẻ Head của trang để các công cụ tìm kiếm và mô hình ngôn ngữ lớn (AI Search) định danh rõ ràng thực thể Phùng Quốc Bảo và PGS Agency.
              </p>

              <pre className="bg-stone-950 p-6 rounded-2xl border border-stone-850 text-xs font-mono text-stone-300 overflow-x-auto max-h-96">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pgs.agency/gioi-thieu/ceo-phung-quoc-bao/#person",
      "name": "Phùng Quốc Bảo",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://pgs.agency/#organization",
        "name": "PGS Agency",
        "url": "https://pgs.agency/"
      },
      "url": "https://pgs.agency/gioi-thieu/ceo-phung-quoc-bao/",
      "image": "https://pgs.agency/images/ceo-phung-quoc-bao.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/phungquocbao-pgs/"
      ],
      "knowsAbout": [
        "Search Engine Optimization",
        "Conversion Rate Optimization",
        "Digital Marketing Strategy",
        "Performance Advertising"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pgs.agency/gioi-thieu/ceo-phung-quoc-bao/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://pgs.agency/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Giới thiệu",
          "item": "https://pgs.agency/gioi-thieu/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "CEO Phùng Quốc Bảo",
          "item": "https://pgs.agency/gioi-thieu/ceo-phung-quoc-bao/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://pgs.agency/gioi-thieu/ceo-phung-quoc-bao/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "CEO Phùng Quốc Bảo là ai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Phùng Quốc Bảo là Founder & CEO của PGS Agency, chuyên gia tư vấn chiến lược Marketing tổng thể với hơn 8 năm kinh nghiệm thực chiến."
          }
        },
        {
          "@type": "Question",
          "name": "CEO Phùng Quốc Bảo có chuyên môn sâu trong các mảng nào?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CEO Phùng Quốc Bảo sở hữu chuyên môn đa lĩnh vực bao gồm SEO tổng thể, Thiết kế website chuẩn CRO, Performance Ads và kỹ thuật Tracking đo lường."
          }
        }
      ]
    }
  ]
}`}
              </pre>
            </section>
          </motion.div>
        )}

      </main>

      {/* GLOBAL FOOTER */}
      

    </div>
  );
}
