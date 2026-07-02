'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, Instagram, Linkedin, Globe, Calendar, TrendingUp, Sparkles, 
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp, FileText, BarChart3, 
  MessageSquare, Sliders, ShieldCheck, PhoneCall, ExternalLink, Briefcase, 
  Code, Copy, Check, Eye, HelpCircle, Layers, Award, Target, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ==========================================
// DATA DEFINITIONS (Optimized for rendering)
// ==========================================

const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    role: 'Xây dựng uy tín thương hiệu (Trust-building), quản trị tin nhắn khách hàng (Inbox/CRM) & xây dựng cộng đồng.',
    kpi: 'Tỷ lệ phản hồi inbox < 5 phút, Tương tác (Engagement), Lượt bình luận chất lượng.',
    sync: 'Kết nối trực tiếp chatbox với website, đồng bộ pixel quảng cáo chuyển đổi.',
    metric: '+142% Lượt Inbox'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.94 1.05 2.25 1.7 3.66 1.86v3.83c-1.35-.11-2.67-.62-3.74-1.49-.63-.52-1.14-1.18-1.51-1.92v6.14c0 1.25-.33 2.48-.95 3.57-.65 1.09-1.63 1.93-2.78 2.39-1.21.49-2.54.58-3.8.27-1.25-.32-2.38-1.07-3.21-2.11-.9-1.14-1.37-2.59-1.33-4.04.03-1.46.54-2.88 1.48-3.99.98-1.13 2.37-1.84 3.86-2 .24-.03.49-.03.73-.02v3.87c-.6-.05-1.21.13-1.7.5-.47.37-.77.92-.83 1.52-.08.77.24 1.52.83 2.01.54.44 1.25.62 1.94.48.65-.13 1.22-.55 1.54-1.13.19-.38.28-.8.27-1.22V.02z"/>
      </svg>
    ),
    color: '#000000',
    role: 'Khai thác độ phủ lớn (Mass Coverage), thu hút tệp khách hàng trẻ thông qua video ngắn sáng tạo, viral.',
    kpi: 'Lượt xem video (Views), Số video lên xu hướng, Tỷ lệ xem hết video.',
    sync: 'Dẫn link bio về Landing Page/Website của chiến dịch bán hàng.',
    metric: '+350% Tải App/Click'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E1306C',
    role: 'Nâng tầm định vị thẩm mỹ (Visual Brand Identity), truyền tải câu chuyện thương hiệu qua ảnh & story.',
    kpi: 'Lượt lưu bài viết, Lượt ghé thăm trang cá nhân, Tỷ lệ nhấp link bio.',
    sync: 'Đồng bộ danh mục sản phẩm từ website lên Instagram Shop.',
    metric: '9.4% Engagement'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: '#0077B5',
    role: 'Khẳng định vị thế chuyên gia đầu ngành, kết nối đối tác B2B và tuyển dụng nhân sự chất lượng cao.',
    kpi: 'Lượt nhấp liên kết, Lượt theo dõi từ nhân sự cấp cao, Tương tác bài viết chuyên ngành.',
    sync: 'Dẫn dắt traffic chất lượng về Blog/Trang giải pháp chính của doanh nghiệp.',
    metric: '+88% Lead B2B'
  },
  {
    id: 'website',
    name: 'Website',
    icon: Globe,
    color: '#D4AF37',
    role: 'Trung tâm chuyển đổi cốt lõi (Conversion Hub). Lưu trữ dữ liệu, phễu thu lead và thanh toán.',
    kpi: 'Tỷ lệ chuyển đổi (CR), Thời gian onsite, Số lượng Lead/Đơn hàng hoàn tất.',
    sync: 'Nơi tiếp nhận toàn bộ traffic chất lượng cao từ tất cả mạng xã hội đổ về.',
    metric: '4.8% Conv. Rate'
  }
];

const AUDIT_QUESTIONS = [
  { id: 'q1', text: 'Hình ảnh đại diện và ảnh bìa đồng bộ kích thước & nhận diện trên mọi kênh?', weight: 15 },
  { id: 'q2', text: 'Có mô tả giới thiệu (Bio/About) rõ ràng, chứa từ khóa chính và liên kết về Website?', weight: 15 },
  { id: 'q3', text: 'Tần suất đăng bài đều đặn (ít nhất 3-5 bài/tuần) có lịch đăng cụ thể?', weight: 20 },
  { id: 'q4', text: 'Nội dung chia theo nhóm pillar chiến lược, tránh việc chỉ đăng bài bán hàng liên tục?', weight: 15 },
  { id: 'q5', text: 'Hình ảnh thiết kế riêng theo hệ thống màu thương hiệu (không dùng template có sẵn đại trà)?', weight: 15 },
  { id: 'q6', text: 'Có đo lường, phân tích báo cáo định kỳ và phản hồi inbox của khách hàng dưới 15 phút?', weight: 20 }
];

const CONTENT_COLUMN_PILOT = [
  { id: 'draft', name: 'Ý tưởng / Dự thảo', color: 'bg-gray-100 text-gray-700' },
  { id: 'review', name: 'Đang phê duyệt', color: 'bg-amber-50 text-amber-800 border border-amber-200' },
  { id: 'scheduled', name: 'Đã lên lịch', color: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
  { id: 'published', name: 'Đã xuất bản', color: 'bg-blue-50 text-blue-800 border border-blue-200' }
];

const INITIAL_CALENDAR_POSTS = [
  { id: 'p1', title: 'Bài viết chuyên sâu: 5 Sai lầm phổ biến khi vận hành Marketing đa kênh', pillar: 'Authority', channel: 'Facebook/LinkedIn', status: 'draft' },
  { id: 'p2', title: 'Video ngắn: Khám phá văn phòng PGS Agency cực kỳ năng động', pillar: 'Culture', channel: 'TikTok/Instagram', status: 'review' },
  { id: 'p3', title: 'Bài viết Case Study: Cách PGS giúp thương hiệu X tăng 180% lead', pillar: 'Proof', channel: 'Website/Facebook', status: 'scheduled' },
  { id: 'p4', title: 'Infographic: Quy trình Social Audit chuẩn hóa 12 bước của PGS', pillar: 'Value', channel: 'Instagram/LinkedIn', status: 'published' }
];

const INTERACTION_LOGS = [
  { time: '09:12', user: 'Hoàng Minh (CEO TechStart)', platform: 'facebook', msg: 'Mình quan tâm gói Omni Social. Có báo cáo KPI cụ thể không PGS?', reply: 'Chào anh Minh! PGS luôn cam kết KPI cụ thể về tiếp cận, inbox chất lượng và tỷ lệ chuyển đổi. Bạn chuyên viên đã gửi tài liệu chi tiết qua Messenger cho anh ạ!' },
  { time: '10:45', user: 'Lan Phương (Founder Cosmetics)', platform: 'instagram', msg: 'Bên mình có hỗ trợ định hướng layout ảnh sang trọng cho Insta không?', reply: 'Dạ chào chị Phương! Gói Social Growth của PGS sẽ thiết kế Grid & Story đồng bộ theo phong cách Light Premium cao cấp của chị ạ.' },
  { time: '11:20', user: 'Đăng Khoa (Digital Manager)', platform: 'tiktok', msg: 'Gói Basic bên mình có quay dựng video trực tiếp không?', reply: 'Chào Khoa! Gói Basic tập trung tối ưu vận hành và kịch bản. Nếu bạn cần trọn gói quay dựng thực tế, gói Social Growth sẽ bao gồm sản xuất video chuyên nghiệp!' }
];

const CASE_STUDIES = [
  {
    title: 'Thương hiệu Thời trang Premium "Gilded"',
    channels: 'Facebook + Instagram + TikTok',
    metrics: { before: 'Nội dung rời rạc, thiết kế Canva đại trà, tỷ lệ chuyển đổi ads thấp.', after: 'Đồng bộ visual gold-white, xây dựng lịch nội dung 30 ngày, tăng 240% tin nhắn mua hàng.' },
    leadGrowth: '+180%',
    costSaved: '30%'
  },
  {
    title: 'Giải pháp Công nghệ B2B "SaaS Platform"',
    channels: 'LinkedIn + Website + Facebook',
    metrics: { before: 'Kênh trống trải, không có khách hỏi, nội dung quá kỹ thuật khô khan.', after: 'Xây dựng tuyến bài viết vị thế chuyên gia, kết nối SEO bài viết website, đạt 4.8% CR.' },
    leadGrowth: '+125%',
    costSaved: '25%'
  }
];

const SERVICE_PACKAGES = [
  {
    name: 'Social Operation Basic',
    desc: 'Giải pháp tinh gọn tối ưu cho doanh nghiệp bắt đầu chuyên nghiệp hóa kênh truyền thông.',
    price: '15.000.000đ',
    period: '/tháng',
    features: [
      'Quản trị 2 nền tảng chính (Facebook + Instagram)',
      'Lên kế hoạch và đăng tải 12 bài viết/tháng',
      'Thiết kế visual cơ bản theo thương hiệu',
      'Tối ưu chuẩn hóa thông tin Bio/SEO Profile',
      'Báo cáo hiệu suất cơ bản mỗi cuối tháng',
      'Phù hợp doanh nghiệp SME muốn duy trì sự hiện diện nhất quán'
    ],
    popular: false
  },
  {
    name: 'Social Growth Pro',
    desc: 'Bứt phá doanh thu nhờ tối ưu nội dung đa nền tảng kết hợp video ngắn xu hướng.',
    price: '30.000.000đ',
    period: '/tháng',
    features: [
      'Quản trị 3 nền tảng chính (Facebook + TikTok + Instagram)',
      'Lên lịch đăng 18 bài viết + 4 video ngắn/tháng',
      'Thiết kế giao diện Grid sang trọng, chuyên sâu',
      'Biên tập kịch bản video ngắn bắt trend',
      'Audit tối ưu kết nối dẫn luồng về Website',
      'Báo cáo phân tích KPI sâu & tối ưu ngân sách Ads',
      'Đội ngũ Creative Director đồng hành trực tiếp'
    ],
    popular: true
  },
  {
    name: 'Omni Social System',
    desc: 'Hệ điều hành Social hoàn hảo, đồng bộ 100% phễu nội dung, Ads và Website chuyển đổi.',
    price: '55.000.000đ',
    period: '/tháng',
    features: [
      'Vận hành toàn diện: Facebook, TikTok, Instagram, LinkedIn & Website Blog',
      '24 bài viết + 8 video ngắn + 4 bài phân tích chuyên sâu trên website',
      'Tạo phễu Chatbot tự động kết nối Website CRM',
      'Đồng bộ hệ thống dữ liệu Tracking Pixel & GA4',
      'Tổ chức chiến dịch Mini-game, tương tác trực tuyến',
      'Cam kết KPI tăng trưởng Lead & chi phí Marketing tối ưu',
      'Đại diện xử lý khủng hoảng truyền thông mức độ cơ bản'
    ],
    popular: false
  }
];

const FAQS = [
  {
    q: 'PGS Agency có trực tiếp viết bài và thiết kế hình ảnh không?',
    a: 'Có. Toàn bộ nội dung (bài viết, kịch bản video) và hình ảnh thiết kế đều do đội ngũ Content Creator và Designer chuyên nghiệp của PGS thực hiện, đảm bảo tuân thủ 100% Brand Guidelines của quý doanh nghiệp.'
  },
  {
    q: 'Tại sao việc vận hành Social cần phải liên kết với Website?',
    a: 'Mạng xã hội đóng vai trò thu hút độ phủ và tương tác, nhưng Website mới là "cửa hàng trưởng" chốt chuyển đổi, lưu trữ tệp data khách hàng lâu dài. Sự kết hợp chặt chẽ giúp tránh tình trạng mất khách khi thuật toán MXH thay đổi.'
  },
  {
    q: 'PGS có cam kết KPI cụ thể nào khi nhận dự án không?',
    a: 'Chúng tôi cam kết rõ ràng bằng hợp đồng pháp lý các chỉ số cốt lõi: số lượng nội dung, lượt tiếp cận tự nhiên (Reach), tỷ lệ tương tác (Engagement), số lượng lead/inbox thu được và tính minh bạch trong báo cáo dữ liệu.'
  },
  {
    q: 'Doanh nghiệp có được duyệt bài trước khi đăng tải không?',
    a: 'Tất nhiên. PGS cung cấp bảng "Content Calendar" trực tuyến hiển thị toàn bộ nội dung, hình ảnh trước 7-10 ngày đăng. Bài viết chỉ được lên lịch xuất bản khi có sự phê duyệt chính thức từ đại diện phía doanh nghiệp.'
  },
  {
    q: 'Gói dịch vụ vận hành Social đã bao gồm ngân sách quảng cáo chưa?',
    a: 'Phí dịch vụ trên là phí vận hành chiến lược, sáng tạo nội dung và quản lý. Ngân sách chạy quảng cáo (Ads Spend) sẽ do doanh nghiệp chi trả riêng dựa trên đề xuất tối ưu ngân sách từ đội ngũ kỹ thuật PGS.'
  }
];

export default function Home() {
  // Navigation tabs between Live UI View and Written Specs View
  const [activeTab, setActiveTab] = useState<'prototype' | 'specs'>('prototype');

  // Specs sub-tabs
  const [activeSpecsTab, setActiveSpecsTab] = useState<'seo' | 'visual' | 'code' | 'copy'>('seo');

  // State for Section 4: Platform orbit
  const [activeOrbitId, setActiveOrbitId] = useState<string>('facebook');

  // State for Section 5: Audit checklist
  const [auditAnswers, setAuditAnswers] = useState<Record<string, boolean>>({});

  // Direct render-phase calculation (No useEffect, prevents cascading renders)
  const auditScore = AUDIT_QUESTIONS.reduce((acc, q) => {
    return acc + (auditAnswers[q.id] ? q.weight : 0);
  }, 0);

  // State for Section 7: Calendar posts
  const [posts, setPosts] = useState(INITIAL_CALENDAR_POSTS);

  // State for Section 10: Sliders ROI Simulator
  const [socialBudget, setSocialBudget] = useState<number>(20); // Triệu VNĐ
  const [onsiteConversion, setOnsiteConversion] = useState<number>(2.5); // %

  // State for Section 14: FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // State for Consultation Form
  const [formInput, setFormInput] = useState({ companyName: '', phone: '', currentKênh: 'Chưa có', goal: 'Tăng Lead' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState<Record<string, boolean>>({});

  const toggleAudit = (id: string) => {
    setAuditAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const cyclePostStatus = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const statuses = ['draft', 'review', 'scheduled', 'published'];
        const currentIdx = statuses.indexOf(p.status);
        const nextIdx = (currentIdx + 1) % statuses.length;
        return { ...p, status: statuses[nextIdx] };
      }
      return p;
    }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setClipboardStatus(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setClipboardStatus(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const calculatedROI = {
    reach: Math.round(socialBudget * 4500),
    estimatedLeads: Math.round((socialBudget * 4500 * (onsiteConversion / 100) * 0.15)),
    costPerLead: socialBudget > 0 ? Math.round((socialBudget * 1000000) / ((socialBudget * 4500 * (onsiteConversion / 100) * 0.15) || 1)) : 0
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormInput({ companyName: '', phone: '', currentKênh: 'Chưa có', goal: 'Tăng Lead' });
    }, 5000);
  };

  return (
    <div className="min-h-screen font-sans bg-[#FAF9F6] text-[#1A1A1A] selection:bg-[#D4AF37]/20 relative">
      
      {/* ==========================================
          HEADER / MODE TOGGLER
         ========================================== */}
      

      {/* ==========================================
          MAIN VIEW CONTAINER
         ========================================== */}
      <main className="pb-24">
        
        {activeTab === 'prototype' ? (
          /* ==========================================
              MODE 1: HIGH FIDELITY PROTOTYPE (16 SECTIONS)
             ========================================== */
          <div className="space-y-24 md:space-y-36">

            {/* SECTION 1: HERO OMNI SOCIAL OS */}
            <section className="relative pt-12 md:pt-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#FCF9F2] border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] tracking-widest font-mono text-[#AA762F] uppercase">Light Premium Consulting</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] tracking-tight leading-tight">
                    Dịch vụ vận hành <span className="text-[#D4AF37] italic font-medium">Social</span> giúp thương hiệu hiện diện nhất quán trên nhiều nền tảng
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
                    Xây dựng hệ thống vận hành Social Media đa kênh hoàn chỉnh, đồng bộ chặt chẽ với Website, Ads và dữ liệu CRM giúp doanh nghiệp tăng trưởng lead sạch, tối ưu chi phí và bứt phá doanh thu.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a 
                      href="#dang-ky-tu-van" 
                      className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black text-sm font-bold tracking-widest uppercase hover:shadow-lg transition-all rounded text-center flex items-center justify-center gap-2"
                    >
                      Nhận tư vấn vận hành Social
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a 
                      href="#kpi-dashboard" 
                      className="px-8 py-4 border border-[#D4AF37] text-[#1A1A1A] bg-white text-sm font-bold tracking-widest uppercase hover:bg-[#FCF9F2] transition-all rounded text-center"
                    >
                      Giả lập kết quả KPI
                    </a>
                  </div>
                </div>

                {/* 3D-like Platform Orbit Simulator */}
                <div className="lg:col-span-5 flex justify-center relative">
                  <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-[#D4AF37]/15 flex items-center justify-center relative bg-gradient-to-b from-white to-[#F7F0DF]/20">
                    
                    {/* Inner Orbit Line */}
                    <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[#D4AF37]/25 animate-[spin_40s_linear_infinite]"></div>

                    {/* Central Brand Message Card */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="z-10 w-32 h-32 rounded-full gold-glass flex flex-col items-center justify-center p-3 text-center shadow-lg cursor-pointer"
                    >
                      <span className="text-[9px] uppercase tracking-widest text-[#AA762F] font-mono">Brand Core</span>
                      <span className="font-serif text-sm font-bold mt-1">Thông Điệp Nhất Quán</span>
                    </motion.div>

                    {/* Orbiting Platform Icons */}
                    {PLATFORMS.map((plat, idx) => {
                      const angle = (idx * 2 * Math.PI) / PLATFORMS.length;
                      const radius = 130; // Orbit radius
                      const x = Math.round(radius * Math.cos(angle));
                      const y = Math.round(radius * Math.sin(angle));
                      const Icon = plat.icon;

                      return (
                        <motion.button
                          key={plat.id}
                          onClick={() => setActiveOrbitId(plat.id)}
                          style={{ x, y }}
                          className={cn(
                            "absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                            activeOrbitId === plat.id 
                              ? "bg-[#1A1A1A] text-[#D4AF37] border-2 border-[#D4AF37] scale-110" 
                              : "bg-white text-gray-700 hover:border-[#D4AF37]/50 border border-gray-200"
                          )}
                          whileHover={{ scale: 1.15 }}
                          title={plat.name}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.button>
                      );
                    })}

                    {/* Dynamic Label for Selected Orbit Platform */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs text-center">
                      <div className="bg-white px-3 py-1.5 rounded-full border border-[#D4AF37]/20 shadow-sm text-[11px] font-mono font-medium text-[#AA762F] flex items-center justify-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Đang xoay quanh: {PLATFORMS.find(p => p.id === activeOrbitId)?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbit Content Showcase card (Linked to Section 4 as well) */}
              <div className="mt-16 bg-white border border-[#D4AF37]/25 rounded-xl p-6 md:p-8 max-w-4xl mx-auto premium-shadow">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="space-y-3 max-w-lg">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">Ứng Dụng Thực Tế</span>
                    <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
                      Vận hành Social {PLATFORMS.find(p => p.id === activeOrbitId)?.name} của doanh nghiệp bạn
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {PLATFORMS.find(p => p.id === activeOrbitId)?.role}
                    </p>
                    <div className="pt-2 text-xs text-gray-500">
                      <strong>Tương thích kỹ thuật:</strong> {PLATFORMS.find(p => p.id === activeOrbitId)?.sync}
                    </div>
                  </div>
                  <div className="w-full md:w-auto text-center md:text-right bg-[#FCF9F2] p-4 rounded-lg border border-[#D4AF37]/20">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Cam Kết Tăng Trưởng</span>
                    <span className="text-3xl font-serif font-bold text-[#D4AF37] block mt-1">
                      {PLATFORMS.find(p => p.id === activeOrbitId)?.metric}
                    </span>
                    <span className="text-[11px] text-[#1A1A1A] font-semibold mt-1 block">Tối ưu chi phí</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: VẬN HÀNH SOCIAL LÀ GÌ */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Định Nghĩa Chuẩn SEO</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">
                  Vận hành Social Media toàn diện là gì?
                </h2>
                <div className="w-12 h-1 bg-[#D4AF37] mx-auto"></div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Vận hành Social không đơn thuần là đăng bài lên mạng xã hội. Đó là quá trình quản trị nội dung thông minh, lên kế hoạch xuất bản nhất quán, thiết kế bộ nhận diện thương hiệu sang trọng, đo lường dữ liệu chuyển đổi và chăm sóc tệp khách hàng tự động để tạo ra phễu chuyển đổi lead sạch cho doanh nghiệp.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Tối Ưu Profile Social', desc: 'Thiết kế bố cục Grid, đồng bộ Bio chứa keyword, tối ưu SEO profile trên TikTok, Facebook để tăng điểm uy tín với thuật toán tìm kiếm của AI.', num: '01' },
                  { title: 'Sản Xuất Nội Dung Pillar', desc: 'Thiết lập 4 tuyến nội dung giá trị: Expert Authority, Social Proof, Brand Value, và Interactive Engagement. Đăng tải đúng lịch biểu tối ưu.', num: '02' },
                  { title: 'Thiết Kế Visual Độc Quyền', desc: 'Tạm biệt mẫu Canva có sẵn. PGS thiết kế bộ layout riêng áp dụng đúng hệ màu thương hiệu để tạo ấn tượng thị giác Premium đẳng cấp.', num: '03' },
                  { title: 'Phễu CRM & Website', desc: 'Cài đặt liên kết phễu tự động hóa từ tin nhắn chuyển tiếp sang biểu mẫu Website để lưu trữ và phân loại data khách hàng tiềm năng.', num: '04' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#D4AF37]/10 p-6 rounded-lg premium-shadow-hover relative overflow-hidden group">
                    <span className="absolute right-4 top-2 text-6xl font-serif font-black text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-all">
                      {item.num}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mt-4 mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: VÌ SAO CẦN VẬN HÀNH ĐA KÊNH */}
            <section className="bg-[#FCF9F2]/60 py-20 border-y border-[#D4AF37]/10 px-4 md:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Thực Trạng Doanh Nghiệp</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] leading-tight">
                    Tại sao việc hiện diện đa kênh là bắt buộc trong kỷ nguyên mới?
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Khách hàng thời đại số không mua hàng ngay lần đầu tiếp cận. Họ sẽ tìm kiếm thương hiệu của bạn trên Facebook để xem uy tín, kiểm tra Instagram để xem phong cách, tra cứu TikTok để xem review thực tế và đọc Website để kiểm chứng sự chuyên nghiệp trước khi bấm nút liên hệ.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nội dung rời rạc, không đồng bộ giữa các kênh chính là lý do khiến bạn &quot;rơi rụng&quot; tới 65% tổng số lượng Lead tiềm năng mà bạn đã trả tiền để quảng cáo mang lại.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Tăng Uy Tín Đa Chiều', desc: 'Xuất hiện nhất quán với chung một bộ visual và thông điệp giúp ghi dấu ấn vững chắc trong tâm trí khách hàng.' },
                    { title: 'Bổ Trợ Đắc Lực Cho Ads', desc: 'Trang social đầy đặn, hoạt động tích cực giúp giảm tới 35% chi phí CPM khi chạy quảng cáo Facebook/TikTok.' },
                    { title: 'Bắt Trọn Hành Trình Khách', desc: 'Mọi điểm chạm từ tiếp cận (TikTok), cân nhắc (Insta), kiểm chứng (Facebook) đến hành động (Website) được khép kín.' },
                    { title: 'Tối Ưu Chi Phí Dài Hạn', desc: 'Hệ thống vận hành chuyên nghiệp tiết kiệm chi phí tuyển dụng, quản lý và đào tạo nhân sự nội bộ cồng kềnh.' }
                  ].map((benefit, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#FCF9F2] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#1A1A1A]">{benefit.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: VAI TRÒ TỪNG NỀN TẢNG (Interactive platform role table) */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Phân Phối Ma Trận Kênh</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Hệ Thống Phân Vai Kênh Tuyến Nội Bộ</h2>
                <p className="text-gray-500 text-sm">
                  PGS Agency không phân bổ nội dung mù quáng. Mỗi mạng xã hội giữ một mắt xích riêng trong phễu chuyển đổi bán hàng.
                </p>
              </div>

              <div className="overflow-x-auto bg-white border border-[#D4AF37]/15 rounded-xl premium-shadow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#D4AF37]/10">
                      <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-600">Nền Tảng</th>
                      <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-600">Vai Trò Chiến Lược</th>
                      <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-600">KPI Trọng Tâm</th>
                      <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-600">Liên Kết Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/10 text-xs">
                    {PLATFORMS.map((plat) => {
                      const Icon = plat.icon;
                      return (
                        <tr 
                          key={plat.id} 
                          onClick={() => setActiveOrbitId(plat.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-[#FCF9F2]/30",
                            activeOrbitId === plat.id ? "bg-[#FCF9F2]/50 font-medium" : ""
                          )}
                        >
                          <td className="p-4 flex items-center gap-3">
                            <span 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white" 
                              style={{ backgroundColor: plat.color }}
                            >
                              <Icon className="w-4 h-4" />
                            </span>
                            <span className="font-bold">{plat.name}</span>
                          </td>
                          <td className="p-4 max-w-xs text-gray-600">{plat.role}</td>
                          <td className="p-4 font-mono text-[#AA762F] font-semibold">{plat.kpi}</td>
                          <td className="p-4 text-gray-500">{plat.sync}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: SOCIAL AUDIT (Interactive Diagnostic Dashboard) */}
            <section className="bg-white border-y border-[#D4AF37]/10 py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#FCF9F2] px-3 py-1 rounded border border-[#D4AF37]/30">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-[10px] font-mono font-bold text-[#AA762F] uppercase">Chẩn đoán Sức khỏe Kênh</span>
                  </div>
                  <h2 className="text-3xl font-serif text-[#1A1A1A]">
                    Tự đánh giá &quot;Sức Khỏe&quot; mạng xã hội của bạn
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Hãy bấm chọn các tiêu chí doanh nghiệp bạn ĐÃ ĐẠT ĐƯỢC bên dưới. Hệ thống AI chẩn đoán của PGS Agency sẽ tính toán ngay điểm sức khỏe social hiện tại của bạn.
                  </p>

                  <div className="bg-[#FAF9F6] p-6 rounded-lg border border-[#D4AF37]/15">
                    <span className="text-xs uppercase font-mono tracking-wider text-gray-500">Điểm Sức Khỏe Hiện Tại:</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-serif font-black text-[#D4AF37]">{auditScore}</span>
                      <span className="text-xl text-gray-400">/ 100 Điểm</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] h-full transition-all duration-500"
                        style={{ width: `${auditScore}%` }}
                      ></div>
                    </div>

                    {/* Feedback advice */}
                    <div className="mt-4 text-xs text-gray-600 italic">
                      {auditScore === 0 && '👉 Vui lòng tích chọn checklist để bắt đầu chẩn đoán.'}
                      {auditScore > 0 && auditScore <= 40 && '❌ Nguy cấp! Các kênh mạng xã hội của bạn đang bị bỏ hoang, không có phễu điều hướng, khiến khách hàng nghi ngờ chất lượng thương hiệu.'}
                      {auditScore > 40 && auditScore <= 75 && '⚠️ Trung bình. Bạn đã hoạt động nhưng thiếu đồng bộ, chưa có Content Pillar rõ ràng và chưa liên kết dữ liệu thu Lead về Website.'}
                      {auditScore > 75 && '✅ Tuyệt vời! Hệ thống của bạn tương đối ổn định. Liên hệ PGS để tối ưu chuyển đổi sâu hơn nữa.'}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#FAF9F6] p-6 rounded-xl border border-gray-100 space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">Checklist Social Audit chuẩn PGS:</h3>
                    {AUDIT_QUESTIONS.map((question) => (
                      <div 
                        key={question.id} 
                        onClick={() => toggleAudit(question.id)}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all duration-300",
                          auditAnswers[question.id] 
                            ? "bg-white border-[#D4AF37]/50 shadow-sm" 
                            : "bg-[#FAF9F6]/50 border-gray-200 opacity-80"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center border transition-all",
                            auditAnswers[question.id] 
                              ? "bg-[#D4AF37] border-[#D4AF37] text-black" 
                              : "border-gray-300 bg-white"
                          )}>
                            {auditAnswers[question.id] && <Check className="w-3.5 h-3.5 font-bold" />}
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{question.text}</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">+{question.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SOCIAL STRATEGY CANVAS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Mô Hình Tư Vấn</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Hệ Thống Sáng Tạo Kế Hoạch 6 Trụ Cột</h2>
                <p className="text-gray-500 text-sm">
                  Trước khi thực thi, PGS xây dựng mô hình Canvas toàn diện để đảm bảo chiến lược kinh doanh khớp hoàn hảo với nội dung mạng xã hội.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: '1. Xác Định Mục Tiêu (Objective)', desc: 'Xác định cụ thể mục tiêu theo mô hình SMART: Tăng độ phủ thương hiệu, thu lead sạch B2B/B2C, hay gia tăng lòng trung thành.', icon: Target },
                  { title: '2. Kênh Ưu Tiên (Channels)', desc: 'Lựa chọn đúng rổ kênh phù hợp với hành vi tìm kiếm và tương tác của tệp khách hàng mục tiêu lý tưởng.', icon: Layers },
                  { title: '3. Tuyến Nội Dung (Content Pillar)', desc: 'Phân loại bài đăng theo tỷ lệ vàng (60% Giá trị/Expertise, 20% Minh chứng/Proof, 10% Tương tác, 10% Bán hàng trực tiếp).', icon: Briefcase },
                  { title: '4. Giọng Văn Brand Voice', desc: 'Thiết lập tone giọng nhất quán (Ví dụ: Chuyên nghiệp, Gần gũi, Tri thức hay Đẳng cấp) đồng điệu với định vị thương hiệu.', icon: Sparkles },
                  { title: '5. Lịch Trình Lên Bài (Calendar)', desc: 'Lịch xuất bản chi tiết cố định khung giờ vàng tương tác tốt nhất của từng nền tảng mxh khác nhau.', icon: Calendar },
                  { title: '6. Bộ Chỉ Số Đánh Giá (KPI)', desc: 'Cam kết bằng con số định lượng cụ thể về lượt xem, số tin nhắn inbox mới, và lượng click truy cập website.', icon: BarChart3 }
                ].map((pillar, idx) => {
                  const IconComp = pillar.icon;
                  return (
                    <div key={idx} className="bg-white border border-[#D4AF37]/15 p-6 rounded-lg premium-shadow flex gap-4">
                      <div className="w-10 h-10 rounded bg-[#FCF9F2] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/25">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#1A1A1A] font-serif">{pillar.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE CONTENT CALENDAR BOARD */}
            <section className="bg-[#FCF9F2]/30 border-y border-[#D4AF37]/10 py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Trực Quan Hóa Quy Trình</span>
                  <h2 className="text-3xl font-serif text-[#1A1A1A]">Hệ Thống Lịch Nội Dung Trực Tuyến 3D</h2>
                  <p className="text-gray-500 text-sm">
                    Theo dõi quy trình phối hợp phê duyệt nội dung minh bạch giữa PGS và doanh nghiệp. Bấm vào bài viết bất kỳ bên dưới để chuyển đổi trạng thái phê duyệt trực quan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CONTENT_COLUMN_PILOT.map((col) => (
                    <div key={col.id} className="bg-white/80 p-4 rounded-xl border border-[#D4AF37]/15 min-h-[300px] flex flex-col space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className={cn("text-xs font-bold px-2 py-1 rounded-full", col.color)}>
                          {col.name}
                        </span>
                        <span className="text-xs text-gray-400 font-bold">
                          ({posts.filter(p => p.status === col.id).length})
                        </span>
                      </div>

                      <div className="flex-1 space-y-3">
                        <AnimatePresence>
                          {posts.filter(p => p.status === col.id).map((post) => (
                            <motion.div
                              key={post.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              onClick={() => cyclePostStatus(post.id)}
                              className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:border-[#D4AF37] hover:shadow transition-all group relative"
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className="text-[9px] uppercase font-mono tracking-wider text-[#AA762F] bg-[#FCF9F2] px-1.5 py-0.5 rounded border border-[#D4AF37]/10">
                                  {post.pillar}
                                </span>
                                <span className="text-[8px] text-gray-400 font-bold uppercase">{post.channel}</span>
                              </div>
                              <h4 className="text-xs font-bold text-[#1A1A1A] mt-2 group-hover:text-[#D4AF37] transition-colors leading-relaxed">
                                {post.title}
                              </h4>
                              <div className="mt-3 flex justify-between items-center text-[9px] text-gray-400 pt-2 border-t border-gray-50">
                                <span>Chạm để duyệt tiếp</span>
                                <ArrowRight className="w-2.5 h-2.5 text-[#D4AF37] animate-pulse" />
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {posts.filter(p => p.status === col.id).length === 0 && (
                          <div className="flex items-center justify-center h-48 border border-dashed border-gray-200 rounded-lg text-gray-400 text-xs italic">
                            Trống
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 8: QUY TRÌNH THIẾT KẾ & ĐĂNG TẢI (Production Timeline) */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Thời gian biểu</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Luồng Sản Xuất & Tải Lên Tiêu Chuẩn</h2>
                <p className="text-gray-500 text-sm">
                  Từng bước thực hiện đồng bộ hóa nội dung chuẩn chỉnh, không sai lệch, đảm bảo uy tín tuyệt đối của thương hiệu.
                </p>
              </div>

              <div className="relative max-w-3xl mx-auto">
                {/* Center vertical gold line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D4AF37]/20 -translate-x-1/2"></div>

                {[
                  { step: '01', title: 'Xây dựng Lịch Nội Dung (1-5 hàng tháng)', desc: 'Dựa trên Social Strategy Canvas để thiết kế lịch đăng, nhóm bài viết, và đề tài chính cho cả tháng.' },
                  { step: '02', title: 'Creative Production (5-15 hàng tháng)', desc: 'Đội ngũ copywriter viết lời; designer thiết kế layout visual độc quyền; editor lên kịch bản dựng video ngắn.' },
                  { step: '03', title: 'Phê duyệt & Chỉnh sửa (15-20 hàng tháng)', desc: 'Gửi khách hàng duyệt Calendar thông minh, tinh chỉnh đến khi thương hiệu ưng ý hoàn hảo nhất.' },
                  { step: '04', title: 'Đăng tải & Tự Động Hóa (Hàng ngày)', desc: 'Hệ thống tự động hóa đăng bài chuẩn khung giờ vàng, kiểm tra hiển thị kỹ lưỡng trên đa thiết bị di động.' },
                  { step: '05', title: 'Tương Tác & Đo Lường (Hàng tuần/tháng)', desc: 'Theo dõi lượng inbox phản hồi, đo lường điểm chạm, gửi báo cáo dữ liệu định kỳ cho khách hàng.' }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex flex-col md:flex-row items-start md:justify-between gap-4 md:gap-0 mb-12">
                    {/* Circle Indicator */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37] flex items-center justify-center -translate-x-1/2 z-10 text-xs font-mono font-bold text-[#D4AF37] shadow-sm">
                      {item.step}
                    </div>

                    {/* Content Left or Right */}
                    <div className={cn(
                      "w-full md:w-[45%] pl-10 md:pl-0",
                      idx % 2 === 0 ? "md:text-right md:pr-8" : "md:order-last md:pl-8"
                    )}>
                      <h3 className="text-base font-bold text-[#1A1A1A] font-serif">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.desc}</p>
                    </div>

                    {/* Spacer for other side layout alignment */}
                    <div className="hidden md:block w-[45%]"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: THEO DÕI TƯƠNG TÁC (Customer Message Dashboard Simulator) */}
            <section className="bg-white border-y border-[#D4AF37]/10 py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Trải Nghiệm Khách Hàng</span>
                  <h2 className="text-3xl font-serif text-[#1A1A1A]">
                    Phản hồi thần tốc & Tối ưu tương tác tự động
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Không chỉ sản xuất nội dung, PGS Agency đồng hành tối ưu hóa quy trình trực chat chăm sóc tệp tin nhắn khách hàng (Inbox/Comment) thời gian thực.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Hỗ trợ cấu hình tích hợp Chatbot thông minh đẩy thẳng tệp khách hàng tiềm năng về hệ thống quản lý Website CRM, tăng 40% tỷ lệ chốt đơn của đội ngũ telesale.
                  </p>
                </div>

                <div className="lg:col-span-7 bg-[#FAF9F6] p-4 md:p-6 rounded-xl border border-gray-100 shadow-inner">
                  <div className="bg-white rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                    <div className="bg-[#1A1A1A] p-3 text-white flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">Trình giả lập Social CRM</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">Đồng bộ đa kênh</span>
                    </div>

                    <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
                      {INTERACTION_LOGS.map((log, idx) => (
                        <div key={idx} className="space-y-3">
                          {/* Customer message */}
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                              <Users className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                            <div className="bg-[#FAF9F6] p-3 rounded-lg max-w-[80%]">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-gray-700">{log.user}</span>
                                <span className="text-[8px] bg-blue-100 text-blue-800 px-1 py-0.2 rounded uppercase font-mono">{log.platform}</span>
                                <span className="text-[8px] text-gray-400">{log.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{log.msg}</p>
                            </div>
                          </div>

                          {/* Agent reply */}
                          <div className="flex items-start gap-3 justify-end">
                            <div className="bg-[#FCF9F2] p-3 rounded-lg max-w-[80%] border border-[#D4AF37]/15">
                              <div className="flex items-center gap-2 justify-end mb-1">
                                <span className="text-[8px] text-gray-400">Ngay lập tức</span>
                                <span className="text-[10px] font-bold text-[#AA762F]">PGS Agency (Support)</span>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed text-right">{log.reply}</p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                              <span className="text-[9px] font-serif font-bold">P</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: BÁO CÁO HIỆU SUẤT (Interactive KPI Simulator) */}
            <section id="kpi-dashboard" className="px-4 md:px-8 max-w-7xl mx-auto scroll-mt-24">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">ROI Calculator</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Mô Phỏng Doanh Thu & Lead Tăng Trưởng</h2>
                <p className="text-gray-500 text-sm">
                  Kéo thanh trượt điều chỉnh ngân sách Social Media mong muốn và Tỷ lệ chuyển đổi của Website để dự toán hiệu quả đầu ra từ hệ thống vận hành của PGS Agency.
                </p>
              </div>

              <div className="bg-white border border-[#D4AF37]/15 rounded-2xl p-6 md:p-10 premium-shadow max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side Sliders */}
                <div className="lg:col-span-6 space-y-8">
                  {/* Slider 1: Budget */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Ngân sách Social / tháng:</label>
                      <span className="text-xl font-serif font-black text-[#D4AF37]">{socialBudget} Triệu VNĐ</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="150" 
                      value={socialBudget} 
                      onChange={(e) => setSocialBudget(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer h-2 bg-gray-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>5 Triệu</span>
                      <span>150 Triệu VNĐ / Tháng</span>
                    </div>
                  </div>

                  {/* Slider 2: Conv Rate */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Tỷ lệ Chốt trên Website (CR):</label>
                      <span className="text-xl font-serif font-black text-[#D4AF37]">{onsiteConversion}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="10" 
                      step="0.5" 
                      value={onsiteConversion} 
                      onChange={(e) => setOnsiteConversion(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer h-2 bg-gray-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>0.5% (Tối thiểu)</span>
                      <span>10% (Rất cao)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FCF9F2] rounded-lg border border-[#D4AF37]/25 text-xs text-gray-600 leading-relaxed">
                    💡 <strong>Gợi ý PGS:</strong> Gói <strong>Social Growth Pro (30M)</strong> kết hợp tỷ lệ chuyển đổi Website tầm <strong>2.5%</strong> thường đem về hiệu suất sinh lead sạch tối ưu chi phí cực tốt cho ngành dịch vụ & bán lẻ cao cấp.
                  </div>
                </div>

                {/* Right Side Outcomes */}
                <div className="lg:col-span-6 bg-[#FAF9F6] p-6 rounded-xl border border-gray-100 flex flex-col justify-between gap-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-500 block">Ước tính hiệu suất đầu ra:</span>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Tiếp Cận (Reach)</span>
                      <span className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1 block">
                        ~{calculatedROI.reach.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-emerald-600 font-semibold">Tự nhiên + quảng cáo</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Lead Sạch Ước Tính</span>
                      <span className="text-2xl font-serif font-bold text-[#D4AF37] mt-1 block">
                        ~{calculatedROI.estimatedLeads} Lead
                      </span>
                      <span className="text-[9px] text-[#1A1A1A] font-semibold">Quan tâm mua hàng</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Chi Phí Bình Quân Trên Một Lead (CPL)</span>
                    <span className="text-3xl font-serif font-black text-[#1A1A1A] mt-1 block">
                      {calculatedROI.costPerLead.toLocaleString()}đ
                    </span>
                    <span className="text-[9px] text-gray-500">Giảm 35% so với vận hành rời rạc tự phát</span>
                  </div>

                  <p className="text-[10px] text-gray-400 italic text-center leading-relaxed">
                    *Các chỉ số ước tính dựa trên dữ liệu trung bình 45+ dự án thực tế do PGS vận hành. Chỉ số thực tế sẽ biến thiên tùy thuộc phân khúc sản phẩm & thị trường.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: BRAND CONSISTENCY SYSTEM (Visual Connection Line) */}
            <section className="bg-[#FCF9F2]/40 py-20 border-y border-[#D4AF37]/10 px-4 md:px-8 overflow-hidden">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Tính Đồng Bộ Tuyệt Đối</span>
                  <h2 className="text-3xl font-serif text-[#1A1A1A]">Hệ Thống Nhận Diện Nhất Quán Đa Điểm</h2>
                  <p className="text-gray-500 text-sm">
                    Khách hàng nhìn thấy bạn ở bất kỳ đâu cũng nhận ra ngay lập tức nhờ sự thống nhất 100% về ngôn ngữ thiết kế và triết lý thương hiệu.
                  </p>
                </div>

                <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
                  {/* Floating Golden Connecting Line in Desktop */}
                  <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent -translate-y-1/2 hidden lg:block"></div>

                  {[
                    { title: 'Nhất Quán Màu Sắc', desc: 'PGS cam kết thiết kế áp dụng đúng chuẩn mã màu HEX thương hiệu, không pha trộn tạp màu.' },
                    { title: 'Nhất Quán Giọng Văn', desc: 'Quy chuẩn ngôn từ (Brand Voice Guide) giúp mọi câu chữ, bài đăng đều mang phong thái chung.' },
                    { title: 'Nhất Quán Thiết Kế', desc: 'Hệ thống lưới Grid, tỷ lệ vàng font chữ áp dụng chung trên Facebook, Website, Insta.' },
                    { title: 'Nhất Quán Kêu Gọi (CTA)', desc: 'Mọi phễu điều hướng đều có cấu trúc nút bấm CTA nhất quán dẫn về landing page chuyển đổi.' }
                  ].map((consist, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-[#D4AF37]/15 max-w-sm w-full relative z-10 text-center shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-xs font-mono font-bold">
                        0{idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1A1A] font-serif mb-1">{consist.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{consist.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 12: DỰ ÁN THỰC TẾ SOCIAL OPERATION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Case Studies</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Dự Án Vận Hành Thực Tế Tiêu Biểu</h2>
                <p className="text-gray-500 text-sm">
                  Chứng thực hiệu quả vận hành thực tế thông qua các con số tăng trưởng minh bạch từ khách hàng đồng hành của PGS.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {CASE_STUDIES.map((cs, idx) => (
                  <div key={idx} className="bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden premium-shadow flex flex-col justify-between">
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-widest text-[#AA762F] uppercase bg-[#FCF9F2] px-2 py-1 rounded border border-[#D4AF37]/10">
                          {cs.channels}
                        </span>
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Đã tối ưu 100%
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">{cs.title}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-gray-400">Trước khi PGS vận hành:</span>
                          <p className="text-xs text-gray-500 leading-relaxed">{cs.metrics.before}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-[#D4AF37]">Sau khi PGS tối ưu hóa:</span>
                          <p className="text-xs text-gray-700 leading-relaxed font-medium">{cs.metrics.after}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FAF9F6] p-4 border-t border-[#D4AF37]/10 flex justify-around text-center">
                      <div>
                        <span className="text-2xl font-serif font-black text-[#D4AF37] block">{cs.leadGrowth}</span>
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">Tăng Trưởng Lead</span>
                      </div>
                      <div className="border-r border-[#D4AF37]/10"></div>
                      <div>
                        <span className="text-2xl font-serif font-black text-[#1A1A1A] block">Giảm {cs.costSaved}</span>
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">Chi phí vận hành</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: GÓI DỊCH VỤ */}
            <section className="bg-white border-y border-[#D4AF37]/10 py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Bảng Giá Minh Bạch</span>
                  <h2 className="text-3xl font-serif text-[#1A1A1A]">Các Gói Giải Pháp Vận Hành Social</h2>
                  <p className="text-gray-500 text-sm">
                    Lựa chọn gói giải pháp phù hợp với quy mô ngân sách và lộ trình tăng trưởng kinh doanh của doanh nghiệp bạn.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {SERVICE_PACKAGES.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative bg-white border",
                        pkg.popular 
                          ? "border-[#D4AF37] shadow-xl lg:scale-105 z-10" 
                          : "border-[#D4AF37]/15 shadow-sm hover:border-[#D4AF37]/40"
                      )}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black text-[9px] font-black uppercase tracking-widest py-1 px-3 rounded-full border border-[#FAF9F6]">
                          Đăng ký nhiều nhất
                        </span>
                      )}

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{pkg.name}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed mt-2 min-h-[40px]">{pkg.desc}</p>
                        </div>

                        <div className="flex items-baseline gap-1 py-4 border-y border-[#D4AF37]/10">
                          <span className="text-3xl font-serif font-black text-[#1A1A1A]">{pkg.price}</span>
                          <span className="text-xs text-gray-400 font-medium">{pkg.period}</span>
                        </div>

                        <ul className="space-y-3">
                          {pkg.features.map((feat, fidx) => (
                            <li key={fidx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8">
                        <a 
                          href="#dang-ky-tu-van"
                          className={cn(
                            "w-full py-3.5 rounded text-xs font-bold uppercase tracking-widest text-center block transition-all duration-300",
                            pkg.popular 
                              ? "bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shadow" 
                              : "border border-[#D4AF37] text-black hover:bg-[#FCF9F2]"
                          )}
                        >
                          Chọn Gói Tư Vấn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQ MỞ RỘNG (Accordion System) */}
            <section className="px-4 md:px-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Giải đáp thắc mắc</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Câu Hỏi Thường Gặp (FAQ)</h2>
                <div className="w-12 h-1 bg-[#D4AF37] mx-auto"></div>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#D4AF37]/15 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex justify-between items-center hover:bg-[#FCF9F2]/20 transition-all"
                      >
                        <span className="text-xs md:text-sm font-bold text-[#1A1A1A] pr-4">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-0 border-t border-gray-50 text-xs text-gray-500 leading-relaxed bg-[#FCF9F2]/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: DỊCH VỤ LIÊN QUAN (Pathways strategy) */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37]">Hệ Sinh Thái Marketing</span>
                <h2 className="text-3xl font-serif text-[#1A1A1A]">Giải Pháp Marketing Tăng Trưởng Khác</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Tối ưu SEO Website', desc: 'Xây dựng từ khóa ngách bền vững, đưa website lên top kết quả tìm kiếm của Google và AI Search.' },
                  { title: 'Quảng Cáo Google Ads', desc: 'Nhắm trúng mục tiêu từ khóa chuyển đổi, mang về tập data khách hàng nóng ngay lập tức.' },
                  { title: 'Quảng Cáo Facebook/TikTok', desc: 'Triển khai chiến dịch video, hình ảnh sáng tạo tối đa hiệu quả chuyển đổi lead mua hàng.' },
                  { title: 'Tối ưu Website / Landing Page', desc: 'Thiết kế giao diện UX/UI Premium đẳng cấp nâng cao tỷ lệ giữ chân khách hàng tại website.' }
                ].map((rel, idx) => (
                  <div key={idx} className="bg-white border border-[#D4AF37]/10 p-5 rounded-lg premium-shadow flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-[#1A1A1A] font-serif">{rel.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{rel.desc}</p>
                    </div>
                    <div className="pt-4">
                      <a href="#dang-ky-tu-van" className="text-[10px] text-[#AA762F] hover:text-[#1A1A1A] font-bold flex items-center gap-1 transition-colors uppercase tracking-wider">
                        Xem chi tiết
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 16: CTA CUỐI TRANG & INTERACTIVE CONTACT FORM */}
            <section id="dang-ky-tu-van" className="px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
              <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 md:p-12 border-2 border-[#D4AF37] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Visual Background Accent */}
                <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none"></div>

                <div className="lg:col-span-6 space-y-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">Let&apos;s Growth Together</span>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
                    Các kênh social của bạn có đang nói cùng một thông điệp không?
                  </h2>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Đừng để khách hàng rơi rụng vì sự thiếu nhất quán. Hãy đồng bộ hóa toàn bộ hệ thống kênh, kết nối phễu dẫn traffic về website chuyển đổi để nhận luồng lead sạch bền vững cùng PGS Agency ngay hôm nay.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-800 text-xs text-gray-300">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                      Đội ngũ Planner có kinh nghiệm trên 5 năm trực tiếp tư vấn
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                      Báo cáo đo lường KPI hàng tuần minh bạch số liệu
                    </p>
                  </div>
                </div>

                {/* Interactive Consultation Form */}
                <div className="lg:col-span-6 bg-white text-[#1A1A1A] p-6 rounded-xl border border-[#D4AF37]/30 z-10 shadow-lg">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#1A1A1A]">Đăng Ký Khảo Sát Social Miễn Phí</h3>
                  
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded text-center space-y-3"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-sm">Gửi yêu cầu thành công!</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        Cảm ơn {formInput.companyName || 'quý khách'}. Đội ngũ Senior Planner của PGS sẽ tiến hành audit sơ bộ kênh của bạn và gọi lại tư vấn trong vòng 2 giờ làm việc.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Tên doanh nghiệp / thương hiệu:</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Ví dụ: Công ty TechStart" 
                          value={formInput.companyName}
                          onChange={(e) => setFormInput(prev => ({ ...prev, companyName: e.target.value }))}
                          className="w-full text-xs p-3 border border-gray-200 rounded focus:border-[#D4AF37] focus:outline-none bg-[#FAF9F6]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Số điện thoại liên hệ (Zalo):</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="Ví dụ: 0912 345 678" 
                          value={formInput.phone}
                          onChange={(e) => setFormInput(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full text-xs p-3 border border-gray-200 rounded focus:border-[#D4AF37] focus:outline-none bg-[#FAF9F6]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Social đang chạy chính:</label>
                          <select 
                            value={formInput.currentKênh}
                            onChange={(e) => setFormInput(prev => ({ ...prev, currentKênh: e.target.value }))}
                            className="w-full text-xs p-3 border border-gray-200 rounded bg-[#FAF9F6] focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Chưa có">Chưa có kênh</option>
                            <option value="Facebook">Facebook</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Đa kênh">Đã chạy đa kênh</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Mục tiêu trọng tâm:</label>
                          <select 
                            value={formInput.goal}
                            onChange={(e) => setFormInput(prev => ({ ...prev, goal: e.target.value }))}
                            className="w-full text-xs p-3 border border-gray-200 rounded bg-[#FAF9F6] focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Tăng Lead">Thu Thập Lead</option>
                            <option value="Brand Identity">Đồng Bộ Nhận Diện</option>
                            <option value="Tối Ưu Ads">Tối Ưu Ads Spend</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-3.5 bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold uppercase text-xs tracking-widest transition-all rounded"
                      >
                        Gửi yêu cầu & Audit sơ bộ
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* ==========================================
              MODE 2: SPECIFICATION & HANDOVER DOCS
             ========================================== */
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">
            
            {/* Intro Spec Header */}
            <div className="bg-white border border-[#D4AF37]/20 rounded-xl p-6 md:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FCF9F2] px-3 py-1 rounded border border-[#D4AF37]/30">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] font-mono font-bold text-[#AA762F] uppercase">Bàn giao Kỹ thuật (Vietnamese Brief)</span>
              </div>
              <h2 className="text-3xl font-serif text-[#1A1A1A]">Hồ Sơ Kỹ Thuật Đa Vai Trò PGS Agency</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tài liệu đặc tả chi tiết phục vụ cho các bộ phận Thiết kế (Designer), Lập trình (Developer), Biên tập viên (Content SEO) và tối ưu hóa hệ thống tìm kiếm mới (AI Search Engine Optimization).
              </p>
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-[#D4AF37]/10 pb-1">
              {[
                { id: 'seo', name: 'SEO & Meta Tags', icon: Globe },
                { id: 'visual', name: 'Brief Thiết Kế UI/UX', icon: Layers },
                { id: 'code', name: 'Đặc Tả Lập Trình & Schema', icon: Code },
                { id: 'copy', name: 'Brief Viết Bài & Tone', icon: Sparkles }
              ].map((sTab) => {
                const IconComp = sTab.icon;
                return (
                  <button
                    key={sTab.id}
                    onClick={() => setActiveSpecsTab(sTab.id as any)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all",
                      activeSpecsTab === sTab.id 
                        ? "border-[#D4AF37] text-[#D4AF37] bg-[#FCF9F2]/40" 
                        : "border-transparent text-gray-500 hover:text-[#1A1A1A]"
                    )}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {sTab.name}
                  </button>
                );
              })}
            </div>

            {/* Spec Content Render */}
            <div className="bg-white border border-[#D4AF37]/15 rounded-xl p-6 md:p-8 premium-shadow">
              
              {activeSpecsTab === 'seo' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Bàn giao Checklist cho Chuyên viên Content SEO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-lg border border-gray-100">
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">Meta Config</span>
                      <p className="text-xs text-gray-700"><strong>H1 Tiêu đề chính:</strong> Dịch vụ vận hành Social giúp thương hiệu hiện diện nhất quán trên nhiều nền tảng</p>
                      <p className="text-xs text-gray-700"><strong>URL:</strong> <code>/dich-vu/dich-vu-van-hanh-social/</code></p>
                      <p className="text-xs text-gray-700"><strong>Meta Title:</strong> PGS Agency - Dịch Vụ Vận Hành Social Media Chuyên Nghiệp Đa Nền Tảng</p>
                      <p className="text-xs text-gray-700"><strong>Meta Description:</strong> Giải pháp vận hành mạng xã hội đa kênh (Facebook, TikTok, Instagram, LinkedIn), đồng bộ thương hiệu, phễu dẫn lead về website và tối ưu chi phí quảng cáo cùng PGS Agency.</p>
                      <p className="text-xs text-gray-700"><strong>Từ khóa chính (Focus Keywords):</strong> dịch vụ vận hành social, quản lý mạng xã hội, vận hành social media, quản lý Facebook TikTok Instagram.</p>
                    </div>

                    <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-lg border border-gray-100">
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">Internal Linking Map</span>
                      <div className="space-y-2 text-xs text-gray-600">
                        <p><strong>🔗 Link Nhận (Incoming Links):</strong> Từ Trang chủ, Trang giải pháp tổng thể, Trang SEO, Trang Web Design, Blog chia sẻ kiến thức social.</p>
                        <p><strong>🔗 Link Đi (Outgoing Links):</strong> Đi tới Trang Báo Giá, Trang Liên Hệ, Trang dịch vụ SEO, Trang quảng cáo Facebook/TikTok Ads.</p>
                        <p><strong>💡 AI Search Optimization:</strong> Định nghĩa trực quan ngay tại Section 2, bảng so sánh KPI rạch ròi tại Section 4 giúp máy quét Bing/Google AI dễ dàng thu nạp thông tin để trả lời truy vấn.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Checklist SEO Content:</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <p className="flex items-center gap-2">🟢 Đảm bảo từ khóa chính xuất hiện trong 100 từ đầu tiên của trang dịch vụ.</p>
                      <p className="flex items-center gap-2">🟢 Viết thẻ Alt mô tả từ khóa cho toàn bộ ảnh, schema định dạng.</p>
                      <p className="flex items-center gap-2">🟢 Tối ưu mật độ từ khóa ở mức 1.5% - 2% toàn bộ bài đăng.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSpecsTab === 'visual' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Brief Thiết Kế Giao Diện UI/UX cho Designer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] uppercase font-mono text-[10px]">🎨 Color Palette:</h4>
                        <p className="mt-1">Nền chính: màu off-white (#FAF9F6) và trắng sữa sạch sẽ, tạo không gian sáng sang trọng.</p>
                        <p>Màu nhấn: Vàng Gold hoàng gia (#D4AF37) và vàng gold tối để tạo chiều sâu và độ tin cậy.</p>
                        <p>Typography chính: Đen than (#1A1A1A) giúp giữ tương tác tương phản rõ ràng (Accessibility AAA).</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#1A1A1A] uppercase font-mono text-[10px]">✨ Visual Elements:</h4>
                        <p className="mt-1">White-glass, gold lines tinh tế, không bóng bẩy hay sử dụng gradient gắt.</p>
                        <p>Sử dụng iconography đồng bộ nhập khẩu từ Lucide-react.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] uppercase font-mono text-[10px]">🚀 3D & Motion Guidance:</h4>
                        <p className="mt-1"><strong>Hero orbit:</strong> Cấu hình 5 hành tinh social quay quanh Brand Core, có tương tác di chuột.</p>
                        <p><strong>Grid alignment:</strong> Chia cột bento cân bằng, tận dụng Negative Space (khoảng trắng lớn) để nâng tầm định vị &quot;Light Premium Consulting&quot;.</p>
                      </div>

                      <div className="p-3 bg-[#FAF9F6] border border-gray-100 rounded">
                        <strong>Checklist Designer:</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          <li>Kiểm tra tương phản độ sáng chữ trên nền sáng ngà.</li>
                          <li>Tối ưu độ giãn cách biên (padding) tối thiểu 24px trên thiết bị di động.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSpecsTab === 'code' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Đặc Tả Lập Trình Lớp Trực Quan & Schema SEO</h3>
                    <button 
                      onClick={() => copyToClipboard(JSON.stringify(SCHEMA_STRUCTURE, null, 2), 'schema')}
                      className="px-3 py-1 bg-[#1A1A1A] text-[#D4AF37] rounded text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      {clipboardStatus['schema'] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {clipboardStatus['schema'] ? 'Đã sao chép!' : 'Sao chép Schema JSON'}
                    </button>
                  </div>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-[350px] text-[11px] font-mono leading-relaxed">
                    <pre>{JSON.stringify(SCHEMA_STRUCTURE, null, 2)}</pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] uppercase font-mono text-[10px] mb-2">Tương Tác Lập Trình (Developer instructions):</h4>
                      <p>1. <strong>Pre-reduced-motion:</strong> Lắng nghe cài đặt hệ thống của người dùng để bật/tắt toàn bộ hiệu ứng quay, tăng điểm số đo đạc Core Web Vitals (LCP, CLS).</p>
                      <p>2. <strong>Sticky mobile CTA:</strong> Tự động hiển thị nút bấm gọi/zalo tại chân màn hình điện thoại khi trượt qua vùng Hero Section.</p>
                    </div>

                    <div className="p-3 bg-[#FAF9F6] border border-gray-100 rounded">
                      <strong>Checklist Developer:</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li>Sử dụng hoàn toàn các dynamic components từ Next.js App Router.</li>
                        <li>Lazy-load các block ảnh minh họa & module CRM giả lập.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeSpecsTab === 'copy' && (
                <div className="space-y-4 text-xs text-gray-600">
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Tài Liệu Brief Viết Bài & Quy Chuẩn Ngôn Từ</h3>
                  <p>
                    Phong cách hành văn của website PGS Agency tuân theo nguyên lý <strong>&quot;Humility in Expertise&quot;</strong> (Khiêm nhường trong chuyên môn). Tránh xa các từ sáo rỗng hoặc khoe mẽ như &quot;bậc thầy&quot;, &quot;hoàn mỹ&quot;, &quot;đỉnh cao&quot;. Tập trung biểu thị các số liệu cụ thể, trung thực và cấu trúc so sánh rõ ràng.
                  </p>

                  <div className="bg-[#FAF9F6] p-4 rounded-lg border border-gray-100 space-y-3">
                    <h4 className="font-bold text-[#1A1A1A] uppercase font-mono text-[10px]">Tuyến Trụ Cột Nội Dung (Content Pillar Outline):</h4>
                    <p>👉 <strong>Expertise (Chuyên môn):</strong> Định nghĩa mạch lạc vận hành social là gì, vai trò rạch ròi của từng kênh mxh, cách thiết lập luồng vận hành.</p>
                    <p>👉 <strong>Social Proof (Bằng chứng):</strong> Đưa ra dữ liệu so sánh trước & sau khi PGS can thiệp của các doanh nghiệp thực tế.</p>
                    <p>👉 <strong>Interactivity (Tương tác):</strong> Chẩn đoán sức khỏe social qua bảng biểu điểm số giúp tăng CRO, lôi kéo người dùng lưu lại lâu hơn (Onsite time).</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* ==========================================
          STICKY MOBILE CTA PANEL
         ========================================== */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <div className="bg-[#1A1A1A] border-2 border-[#D4AF37] px-4 py-3 rounded-xl flex justify-between items-center shadow-2xl">
          <div className="text-left">
            <span className="text-[8px] uppercase tracking-widest text-[#D4AF37] block font-mono">Dịch vụ vận hành Social</span>
            <span className="text-xs font-serif font-bold text-white block mt-0.5">Đồng bộ đa nền tảng</span>
          </div>
          <a 
            href="#dang-ky-tu-van"
            className="px-4 py-2 rounded bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-wider"
          >
            Đăng Ký Khảo Sát
          </a>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// SCHEMAS (JSON-LD STRUCTURE DEFINITION)
// ==========================================
const SCHEMA_STRUCTURE = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://pgs.agency/dich-vu/dich-vu-van-hanh-social/#service",
      "name": "Dịch Vụ Vận Hành Social Media Đa Kênh Chuyên Nghiệp",
      "serviceType": "Social Media Management",
      "provider": {
        "@type": "Organization",
        "name": "PGS Agency",
        "url": "https://pgs.agency"
      },
      "description": "Giải pháp vận hành mạng xã hội đa kênh (Facebook, TikTok, Instagram, LinkedIn), đồng bộ thương hiệu, phễu dẫn lead về website và tối ưu chi phí quảng cáo.",
      "areaServed": "VN",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Gói Vận Hành Social",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Social Operation Basic",
              "price": "15000000",
              "priceCurrency": "VND"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Social Growth Pro",
              "price": "30000000",
              "priceCurrency": "VND"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Omni Social System",
              "price": "55000000",
              "priceCurrency": "VND"
            }
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
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
          "name": "Dịch vụ",
          "item": "https://pgs.agency/dich-vu/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Vận hành Social",
          "item": "https://pgs.agency/dich-vu/dich-vu-van-hanh-social/"
        }
      ]
    }
  ]
};
