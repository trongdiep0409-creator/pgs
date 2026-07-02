'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Search, Megaphone, PenTool, Sparkles, TrendingUp, 
  ArrowRight, HelpCircle, PhoneCall, Award, Zap, Users, 
  Target, Compass, Briefcase, Clock, Settings, ChevronDown, 
  Check, FileText, CheckCircle2, ChevronRight, MapPin, MessageSquare, ExternalLink
} from 'lucide-react';

// Interfaces
interface Service {
  id: string;
  title: string;
  desc: string;
  category: 'platform' | 'traffic' | 'content';
  fitFor: string;
  tags: string[];
}

interface Combo {
  id: string;
  name: string;
  badge: string;
  price: string;
  desc: string;
  services: string[];
  features: string[];
}

interface FAQItem {
  q: string;
  a: string;
}

export default function ServicesHub() {
  const [activeTab, setActiveTab] = useState<'preview' | 'spec'>('preview');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 15 Services defined elegantly
  const services: Service[] = [
    { id: 'web', title: 'Thiết kế Website Cao Cấp', desc: 'Chuẩn UX/UI, tối ưu hóa tỷ lệ chuyển đổi (CRO) và chuẩn SEO ngay từ khi lập trình.', category: 'platform', fitFor: 'Doanh nghiệp muốn định hình thương hiệu chuyên nghiệp và tăng trưởng số tự nhiên.', tags: ['UX/UI Design', 'Next.js/React', 'CRO', 'Core Web Vitals'] },
    { id: 'landing', title: 'Thiết kế Landing Page Tối Ưu', desc: 'Thiết kế đo ni đóng giày cho từng chiến dịch quảng cáo, thúc đẩy hành động đăng ký của khách hàng.', category: 'platform', fitFor: 'Các shop, thương hiệu chạy ad chuyển đổi, ra mắt sản phẩm mới.', tags: ['High-converting', 'A/B Testing', 'Copywriting'] },
    { id: 'webcare', title: 'Chăm Sóc & Tối Ưu Website', desc: 'Bảo trì hệ thống, tối ưu tốc độ load, cập nhật nội dung định kỳ và xử lý lỗi kỹ thuật 24/7.', category: 'platform', fitFor: 'Doanh nghiệp bận rộn không có phòng kỹ thuật hoặc content in-house.', tags: ['Security', 'Backup', 'PageSpeed'] },
    { id: 'gmb', title: 'Tối Ưu Google Business Profile', desc: 'Đưa doanh nghiệp lên Google Maps, tối ưu SEO Local giúp thu hút nguồn khách hàng tự nhiên quanh khu vực.', category: 'platform', fitFor: 'Cửa hàng, showroom, phòng khám, nhà hàng kinh doanh địa phương.', tags: ['Local SEO', 'Google Maps', 'Review Audit'] },
    
    { id: 'seo', title: 'SEO Tổng Thể Đột Phá', desc: 'Xây dựng cấu trúc website vững chắc, phủ hàng ngàn từ khóa phủ rộng hành trình mua sắm của khách hàng.', category: 'traffic', fitFor: 'Doanh nghiệp muốn sở hữu dòng khách hàng bền vững, không phụ thuộc Ads.', tags: ['Keyword Research', 'Entity SEO', 'Link Building'] },
    { id: 'ggads', title: 'Quảng Cáo Google Ads', desc: 'Tiếp cận khách hàng ngay khi họ phát sinh nhu cầu tìm kiếm, tối ưu phễu chuyển đổi và chi phí CPA.', category: 'traffic', fitFor: 'Doanh nghiệp muốn có lead/doanh thu ngay lập tức từ khách hàng mục tiêu.', tags: ['Search Ads', 'Shopping Ads', 'Remarketing'] },
    { id: 'fbads', title: 'Quảng Cáo Facebook Ads', desc: 'Sáng tạo phễu nội dung, nhắm mục tiêu chuẩn xác để thu hút khách hàng tiềm năng trên mạng xã hội.', category: 'traffic', fitFor: 'Thương hiệu bán lẻ, dịch vụ, sản phẩm cần giáo dục thị trường.', tags: ['Lead Generation', 'Pixel Setup', 'Retargeting'] },
    { id: 'tkads', title: 'Quảng Cáo TikTok Ads', desc: 'Bùng nổ doanh số thông qua video ngắn sáng tạo, tối ưu ngân sách và nắm bắt hành vi giới trẻ.', category: 'traffic', fitFor: 'Doanh nghiệp F&B, thời trang, mỹ phẩm, công nghệ hướng tới gen Z & Y.', tags: ['Short Video Ads', 'Creator Hook', 'Spark Ads'] },
    { id: 'pr', title: 'PR Báo Chí & Định Hình Uy Tín', desc: 'Lên kế hoạch phủ sóng báo chí uy tín, định vị chuyên gia và nâng tầm giá trị thương hiệu trong mắt công chúng.', category: 'traffic', fitFor: 'Doanh nghiệp cần tăng uy tín xã hội, chuẩn bị gọi vốn hoặc xử lý khủng hoảng.', tags: ['Media Relations', 'Editorial Write-ups', 'Brand Authority'] },
    
    { id: 'contentweb', title: 'Content Website chuẩn E-E-A-T', desc: 'Viết nội dung có chiều sâu, chuẩn kỹ thuật SEO giúp chứng minh năng lực chuyên môn và xây dựng lòng tin.', category: 'content', fitFor: 'Trang tin, doanh nghiệp B2B, y tế, tài chính cần khẳng định uy tín cao.', tags: ['EEAT Framework', 'In-depth Article', 'SEO Copywriting'] },
    { id: 'contentsocial', title: 'Content Social Sáng Tạo', desc: 'Sản xuất hình ảnh, bài viết bắt trend, giữ chân người dùng và tạo thảo luận tự nhiên về sản phẩm.', category: 'content', fitFor: 'Nhãn hàng muốn trang trí fanpage đẹp mắt, tương tác liên tục.', tags: ['Visual Design', 'Trend Catching', 'Engagement Boost'] },
    { id: 'fanpage', title: 'Quản Trị Fanpage Chuyên Nghiệp', desc: 'Lên kế hoạch nội dung tháng, thiết kế banner đồng bộ, quản lý tin nhắn và tối ưu hóa diện mạo fanpage.', category: 'content', fitFor: 'Thương hiệu không có team trực page bài bản, muốn xây dựng cộng đồng.', tags: ['Monthly Calendar', 'Inbox Setup', 'Analytics'] },
    { id: 'tiktok', title: 'Xây Kênh TikTok Triệu View', desc: 'Sáng tạo kịch bản, sản xuất video ngắn, tối ưu thuật toán giúp xây dựng nhân hiệu và bán hàng.', category: 'content', fitFor: 'KOLs, chủ doanh nghiệp, startup muốn bứt phá nhanh trên kênh video ngắn.', tags: ['Script Writing', 'Video Editing', 'Algorithm Hack'] },
    { id: 'instagram', title: 'Quản Trị Kênh Instagram', desc: 'Xây dựng feed ảnh nghệ thuật, đồng bộ phong cách thiết kế thời thượng để thu hút phân khúc cao cấp.', category: 'content', fitFor: 'Thương hiệu thời trang, thẩm mỹ, phong cách sống sang trọng.', tags: ['Aesthetic Feed', 'Stories Strategy', 'Hashtags Grid'] },
    { id: 'socialmedia', title: 'Vận Hành Hệ Thống Social', desc: 'Quản lý đa kênh đồng nhất (FB, TikTok, IG, Youtube), đồng bộ thông điệp truyền thông.', category: 'content', fitFor: 'Tập đoàn, chuỗi hệ thống muốn có sự phủ sóng diện rộng, chuyên nghiệp.', tags: ['Omnichannel', 'Brand Strategy', 'Unified Voice'] },
  ];

  // 7 Goals for Interactive Selector
  const goals = [
    { id: 'all', name: 'Tất cả dịch vụ', icon: Sparkles },
    { id: 'lead', name: 'Tăng Lead & Doanh Thu', icon: Target, services: ['landing', 'ggads', 'fbads', 'tkads', 'seo'] },
    { id: 'web-upgrade', name: 'Nâng Cấp Website', icon: Globe, services: ['web', 'landing', 'webcare'] },
    { id: 'seo-longterm', name: 'SEO Bền Vững', icon: Search, services: ['seo', 'contentweb', 'gmb'] },
    { id: 'run-ads', name: 'Chạy Ads Tối Ưu', icon: Megaphone, services: ['ggads', 'fbads', 'tkads'] },
    { id: 'branding', name: 'Xây Thương Hiệu', icon: Award, services: ['web', 'pr', 'contentsocial', 'instagram'] },
    { id: 'social-run', name: 'Vận Hành Social', icon: Users, services: ['fanpage', 'tiktok', 'instagram', 'contentsocial', 'socialmedia'] },
    { id: 'web-care', name: 'Chăm Sóc Kỹ Thuật', icon: Settings, services: ['webcare', 'gmb'] },
  ];

  // Combos
  const combos: Combo[] = [
    {
      id: 'combo1',
      name: 'Website + SEO Foundation',
      badge: 'Bền vững & Uy tín',
      price: 'Chỉ từ 15tr/tháng',
      desc: 'Thiết kế website chuẩn UX/UI cùng kế hoạch SEO phủ từ khóa ngách chất lượng cao trong 6 tháng.',
      services: ['Thiết kế Website Cao Cấp', 'SEO Tổng Thể Đột Phá', 'Content Website chuẩn E-E-A-T'],
      features: ['Miễn phí hosting 1 năm', 'Tối ưu Core Web Vitals tối đa', 'Cam kết lọt top từ khóa ngách trong 3-4 tháng']
    },
    {
      id: 'combo2',
      name: 'Landing Page + Performance Ads',
      badge: 'Bứt phá doanh số nhanh',
      price: 'Chỉ từ 12tr/tháng',
      desc: 'Thiết kế 1 Landing Page siêu chuyển đổi cùng chiến dịch Google/Facebook Ads thực chiến bám đuổi.',
      services: ['Thiết kế Landing Page Tối Ưu', 'Quảng Cáo Google Ads', 'Quảng Cáo Facebook Ads'],
      features: ['Cài đặt tracking chuyển đổi nâng cao', 'A/B Testing tiêu đề/hình ảnh miễn phí', 'Tối ưu CPA giảm tối thiểu 15-20%']
    },
    {
      id: 'combo3',
      name: 'Omnichannel Social Presence',
      badge: 'Phủ sóng đa kênh',
      price: 'Chỉ từ 18tr/tháng',
      desc: 'Quản trị đồng bộ Fanpage, Instagram và kênh TikTok giúp xây dựng cộng đồng, tăng độ phủ.',
      services: ['Quản Trị Fanpage Chuyên Nghiệp', 'Xây Kênh TikTok Triệu View', 'Content Social Sáng Tạo'],
      features: ['Sản xuất 12 video ngắn/tháng', 'Xây dựng bộ nhận diện hình ảnh social riêng', 'Lên kịch bản viral bám sát sản phẩm']
    },
    {
      id: 'combo4',
      name: 'Hệ Sinh Thái Tăng Trưởng Toàn Diện',
      badge: 'Phòng Marketing Thuê Ngoài',
      price: 'Báo giá theo quy mô',
      desc: 'Giải pháp trọn gói hoạt động như một phòng Marketing thực thụ của doanh nghiệp, cam kết hiệu quả.',
      services: ['Website + SEO', 'Trọn bộ Performance Ads', 'Hệ thống Content & Social Media', 'Phân tích & Tối ưu chuyển đổi'],
      features: ['Giám đốc chiến lược đồng hành sát sao', 'Họp báo cáo hiệu quả định kỳ hàng tuần', 'Cam kết KPI rõ ràng theo lượng lead & doanh số']
    }
  ];

  const faqs: FAQItem[] = [
    {
      q: 'Doanh nghiệp nên bắt đầu triển khai dịch vụ nào trước?',
      a: 'PGS khuyên bạn nên đi từ "Nền tảng". Một Website hoặc Landing Page chỉn chu là điểm đón traffic cực kỳ quan trọng. Khi đã có nền tảng tốt, chúng ta sẽ bắt đầu kéo traffic bằng Ads (ngắn hạn ra đơn nhanh) kết hợp SEO & Content (dài hạn, tiết kiệm chi phí).'
    },
    {
      q: 'PGS Agency có cung cấp dịch vụ riêng lẻ không hay bắt buộc dùng combo?',
      a: 'Chúng tôi hoàn toàn hỗ trợ triển khai riêng lẻ từng dịch vụ như Thiết kế Website, Chạy Google Ads hay Viết bài SEO để giải quyết nhu cầu tức thời của bạn. Tuy nhiên, việc kết hợp các dịch vụ thành hệ sinh thái sẽ mang lại hiệu quả cộng hưởng tối đa và chi phí tối ưu nhất.'
    },
    {
      q: 'Chi phí triển khai dịch vụ phụ thuộc vào những yếu tố nào?',
      a: 'Ngân sách phụ thuộc vào quy mô dự án, mức độ cạnh tranh của ngành hàng, mục tiêu KPI (số lượng lead, thứ hạng từ khóa mong muốn) và thời gian triển khai. Chúng tôi luôn thiết lập bảng báo giá minh bạch, bóc tách chi tiết từng hạng mục để doanh nghiệp dễ kiểm soát.'
    },
    {
      q: 'Thời gian bao lâu thì doanh nghiệp thấy được hiệu quả thực tế?',
      a: 'Với dịch vụ Ads, hiệu quả chuyển đổi (lead/message) sẽ xuất hiện ngay trong tuần đầu tiên tối ưu phễu. Với dịch vụ SEO và xây dựng thương hiệu, thời gian tối thiểu để Google ghi nhận thực tế và bắt đầu tạo lượng truy cập tự nhiên ổn định là từ 3 - 6 tháng.'
    }
  ];

  // Helper to filter services based on goal selector
  const getFilteredServices = () => {
    if (selectedGoal === 'all') return services;
    const goalObj = goals.find(g => g.id === selectedGoal);
    if (!goalObj || !goalObj.services) return services;
    return services.filter(s => goalObj.services?.includes(s.id));
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1E1E1E]">
      {/* Top Banner & Mode Switcher */}
      <div className="sticky top-0 z-50 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#C5A880]/15 px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-[#1E1E1E] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A4865E] to-[#D8C3A5] flex items-center justify-center text-white text-sm font-semibold">
                P
              </span>
              PGS <span className="text-[#C5A880]">Agency</span>
            </span>
            <div className="h-4 w-[1px] bg-gray-300 hidden sm:block"></div>
            <span className="text-xs text-gray-500 font-mono tracking-wider uppercase hidden sm:block">Light Premium Hub</span>
          </div>

          <div className="flex bg-[#F2EFE9] p-1 rounded-full border border-gray-200/50">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-[#1E1E1E] shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              🎯 Giao diện demo thực tế
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'spec'
                  ? 'bg-[#C5A880] text-white shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              📄 Tài liệu bàn giao & SEO
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'preview' ? (
          <motion.div
            key="preview-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* 1. Breadcrumb + Header hub dịch vụ */}
            <section className="pt-8 pb-4 px-4 bg-gradient-to-b from-[#FAF8F2] to-transparent" id="breadcrumb">
              <div className="max-w-7xl mx-auto">
                <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 mb-4 font-mono">
                  <Link href="/" className="hover:text-[#C5A880] transition-colors">Trang chủ</Link>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-[#1E1E1E] font-medium">Dịch vụ</span>
                </nav>
              </div>
            </section>

            {/* 2. Hero dịch vụ */}
            <section className="relative overflow-hidden pt-10 pb-16 px-4 bg-gradient-to-b from-white to-stone-50" id="hero">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/70 border border-gold-500/20 text-xs text-gold-600 font-mono tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> Hệ sinh thái tăng trưởng 360°
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.15] text-stone-950">
                    Hệ sinh thái dịch vụ <br className="hidden md:inline" />
                    <span className="text-gold-600 font-bold">Marketing tổng thể</span> của PGS
                  </h1>
                  <p className="text-base md:text-lg text-stone-600 max-w-xl leading-relaxed">
                    Xóa bỏ sự rời rạc. Chúng tôi kết hợp Website, SEO, Google/Facebook Ads, Content và Social Media để kiến tạo một cỗ máy tăng trưởng khách hàng tự động, tối ưu chi phí tối đa.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#selector" className="bg-stone-950 text-white font-semibold rounded-xl text-sm px-6 py-3.5 hover:bg-stone-900 border border-stone-950 transition-all flex items-center justify-center gap-2">
                      Khám phá giải pháp <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#combo" className="bg-white hover:bg-stone-50 text-stone-950 border border-stone-200 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2">
                      Xem bảng giá Combo
                    </a>
                  </div>
                </div>

                {/* Service orbit ecosystem 3D visual */}
                <div className="lg:col-span-5 relative flex justify-center items-center py-8">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                    {/* Orbit lines background */}
                    <div className="absolute w-full h-full rounded-full border border-dashed border-[#C5A880]/20 animate-[spin_100s_linear_infinite]"></div>
                    <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-[#C5A880]/30 animate-[spin_60s_linear_infinite_reverse]"></div>
                    <div className="absolute w-1/2 h-1/2 rounded-full border border-[#C5A880]/15"></div>

                    {/* Central Core */}
                    <motion.div 
                      className="absolute z-10 w-24 h-24 rounded-full bg-[#1E1E1E] border-2 border-[#C5A880] flex flex-col items-center justify-center text-white text-center shadow-2xl shadow-[#C5A880]/20"
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-xs font-mono tracking-widest text-[#C5A880]">PGS</span>
                      <span className="text-sm font-bold">AGENCY</span>
                    </motion.div>

                    {/* Orbit Nodes */}
                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ top: '2%', left: '42%' }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Globe className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -top-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">PLATFORM</span>
                    </motion.div>

                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ top: '24%', left: '4%' }}
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                      <Search className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -top-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">SEO</span>
                    </motion.div>

                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ top: '24%', right: '4%' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                      <Users className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -top-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">SOCIAL</span>
                    </motion.div>

                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ bottom: '18%', right: '6%' }}
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                    >
                      <Megaphone className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -bottom-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">ADS</span>
                    </motion.div>

                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ bottom: '18%', left: '6%' }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    >
                      <PenTool className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -bottom-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">CONTENT</span>
                    </motion.div>

                    <motion.div 
                      className="absolute w-12 h-12 rounded-full bg-white border border-[#C5A880] shadow-md flex items-center justify-center text-[#1E1E1E] hover:border-[#A4865E] hover:scale-110 transition-transform cursor-pointer"
                      style={{ bottom: '2%', left: '42%' }}
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    >
                      <TrendingUp className="w-5 h-5 text-[#A4865E]" />
                      <span className="absolute -bottom-6 bg-[#FCFBF7] border border-[#C5A880]/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">DATA & CRO</span>
                    </motion.div>

                    {/* Decorative gold elements floating */}
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#C5A880] blur-[1px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-[#A4865E] animate-bounce"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Chọn mục tiêu của bạn (Interactive Selector) */}
            <section className="py-16 px-4 bg-[#FAF8F2] border-y border-[#C5A880]/15" id="selector">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <h2 className="text-3xl font-display font-medium tracking-tight">Thiết kế giải pháp theo mục tiêu kinh doanh</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Chọn rào cản hoặc mục tiêu cốt lõi của bạn hiện tại. Chúng tôi sẽ gợi ý bộ công cụ tăng trưởng tương thích nhất.
                  </p>
                </div>

                {/* Selector Pills */}
                <div className="flex flex-wrap justify-center gap-2.5">
                  {goals.map((g) => {
                    const IconComponent = g.icon;
                    const isActive = selectedGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGoal(g.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-[#1E1E1E] text-white shadow-md shadow-black/15 scale-[1.03]'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-gray-400'}`} />
                        {g.name}
                      </button>
                    );
                  })}
                </div>

                {/* Animated suggested services cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  <AnimatePresence mode="popLayout">
                    {getFilteredServices().map((s) => (
                      <motion.div
                        layout
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 group relative flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#FAF3E3] text-[#A4865E]">
                              {s.category === 'platform' ? 'Nền tảng' : s.category === 'traffic' ? 'Kéo Traffic' : 'Nội dung'}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                          </div>
                          <h3 className="text-lg font-display font-medium text-[#1E1E1E] group-hover:text-[#A4865E] transition-colors">{s.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                          <div className="text-[11px] text-gray-500">
                            <strong className="text-gray-700 font-semibold">Phù hợp: </strong>{s.fitFor}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {s.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 font-mono">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* 4, 5, 6. Nhóm Dịch Vụ Phân Loại Chi Tiết */}
            <section className="py-20 px-4" id="categories">
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* 4. Nhóm Dịch Vụ Nền Tảng */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#1E1E1E] text-white flex items-center justify-center font-bold text-lg font-mono">01</span>
                    <div>
                      <h3 className="text-2xl font-display font-medium">Nhóm Dịch Vụ Nền Tảng Kỹ Thuật Số</h3>
                      <p className="text-xs md:text-sm text-gray-500">Xây móng nhà online kiên cố, chuẩn chỉ tối ưu để chuẩn bị đón tiếp khách hàng tiềm năng</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.filter(s => s.category === 'platform').map(s => (
                      <div key={s.id} className="bg-white p-6 rounded-xl border border-gray-200/50 hover:border-[#C5A880]/60 transition-premium shadow-premium group">
                        <Globe className="w-8 h-8 text-[#C5A880] mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-base font-semibold font-display text-gray-900 mb-2">{s.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                        <div className="text-[11px] bg-amber-50/50 p-2.5 rounded border border-amber-100/50 text-gray-600">
                          <span className="font-bold text-[#A4865E]">Thích hợp: </span>{s.fitFor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Nhóm Dịch Vụ Thu Hút Khách Hàng */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#1E1E1E] text-white flex items-center justify-center font-bold text-lg font-mono">02</span>
                    <div>
                      <h3 className="text-2xl font-display font-medium">Nhóm Thu Hút Khách Hàng (Growth & Traffic)</h3>
                      <p className="text-xs md:text-sm text-gray-500">Bứt phá lưu lượng truy cập chất lượng cao thông qua các kênh tìm kiếm và mạng xã hội lớn</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.filter(s => s.category === 'traffic').map(s => (
                      <div key={s.id} className="bg-white p-6 rounded-xl border border-gray-200/50 hover:border-[#C5A880]/60 transition-premium shadow-premium group">
                        <TrendingUp className="w-8 h-8 text-[#C5A880] mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-base font-semibold font-display text-gray-900 mb-2">{s.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                        <div className="text-[11px] bg-[#FAF8F2] p-2.5 rounded border border-[#C5A880]/15 text-gray-600">
                          <span className="font-bold text-[#A4865E]">Thích hợp: </span>{s.fitFor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Nhóm Nội Dung & Social */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#1E1E1E] text-white flex items-center justify-center font-bold text-lg font-mono">03</span>
                    <div>
                      <h3 className="text-2xl font-display font-medium">Nhóm Sáng Tạo Nội Dung & Quản Trị Social</h3>
                      <p className="text-xs md:text-sm text-gray-500">Thổi hồn cho thương hiệu, giữ chân và gia tăng thiện cảm của khách hàng trung thành</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.filter(s => s.category === 'content').map(s => (
                      <div key={s.id} className="bg-white p-6 rounded-xl border border-gray-200/50 hover:border-[#C5A880]/60 transition-premium shadow-premium group">
                        <PenTool className="w-8 h-8 text-[#C5A880] mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-base font-semibold font-display text-gray-900 mb-2">{s.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                        <div className="text-[11px] bg-gray-50 p-2.5 rounded border border-gray-200/30 text-gray-600">
                          <span className="font-bold text-gray-700">Thích hợp: </span>{s.fitFor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* 7. Bản đồ dịch vụ theo hành trình khách hàng */}
            <section className="py-20 px-4 bg-[#FAF8F2] border-t border-[#C5A880]/15 relative overflow-hidden" id="journey">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">CUSTOMER JOURNEY MATCHING</span>
                  <h2 className="text-3xl font-display font-medium text-[#1E1E1E]">Bản đồ dịch vụ theo hành trình khách hàng</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Chúng tôi không làm Marketing rời rạc. Mỗi điểm chạm của khách hàng đều được thiết lập dịch vụ chuẩn xác để chuyển đổi tối ưu nhất.
                  </p>
                </div>

                {/* Pipeline Journey Map */}
                <div className="relative pt-6 pb-2">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#C5A880]/20 -translate-y-1/2 hidden lg:block" />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
                    {[
                      { step: '01', name: 'Nhận biết (Awareness)', desc: 'Xây kênh TikTok, Instagram, chạy Ads diện rộng tăng độ phủ.', services: ['TikTok Triệu View', 'FB Ads', 'Social Content'] },
                      { step: '02', name: 'Tìm hiểu (Interest)', desc: 'Tiếp cận đúng lúc khách hàng tìm kiếm giải pháp trên Google.', services: ['Google Ads', 'SEO Tổng Thể', 'Google Maps'] },
                      { step: '03', name: 'Cân nhắc (Evaluation)', desc: 'Bằng chứng uy tín qua báo chí, bài viết sâu chuẩn E-E-A-T.', services: ['PR Báo Chí', 'In-depth Content', 'Website Uy Tín'] },
                      { step: '04', name: 'Liên hệ (Conversion)', desc: 'Dẫn dắt khách đăng ký thông qua Landing Page tối ưu CRO.', services: ['Landing Page', 'Performance Ads', 'CRO Audit'] },
                      { step: '05', name: 'Chăm sóc (Loyalty)', desc: 'Giữ kết nối thông tin trên Social, bảo trì hệ thống website.', services: ['Fanpage Chuyên Nghiệp', 'Chăm Sóc Website'] },
                      { step: '06', name: 'Mở rộng (Scale)', desc: 'Đồng bộ phễu đa kênh, thúc đẩy mua lại & truyền miệng.', services: ['Vận Hành Hệ Social', 'SEO Entity Phủ Rộng'] },
                    ].map((j, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative group hover:border-[#C5A880] transition-premium">
                        <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center text-xs font-bold font-mono mb-3 group-hover:bg-[#C5A880] transition-colors">
                          {j.step}
                        </div>
                        <h4 className="text-sm font-semibold font-display text-gray-900 mb-1">{j.name}</h4>
                        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{j.desc}</p>
                        <div className="space-y-1 pt-2.5 border-t border-gray-50">
                          {j.services.map((js, sidx) => (
                            <span key={sidx} className="block text-[10px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100/50 truncate">
                              • {js}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Combo giải pháp theo nhu cầu */}
            <section className="py-20 px-4" id="combo">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">EFFICIENT COMBOS</span>
                  <h2 className="text-3xl font-display font-medium">Gói giải pháp Combo hiệu quả & tiết kiệm</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Tối ưu chi phí từ 15% - 25% khi tích hợp các dịch vụ thành giải pháp tổng thể, định vị trọn gói theo sát mục tiêu tăng trưởng của doanh nghiệp.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {combos.map((combo) => (
                    <div key={combo.id} className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#C5A880] transition-premium shadow-premium relative group">
                      <div className="space-y-5">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#FAF3E3] text-[#A4865E] font-semibold">
                            {combo.badge}
                          </span>
                          <span className="text-sm font-mono font-bold text-gray-800 bg-gray-50 border border-gray-200/50 px-2.5 py-1 rounded">
                            {combo.price}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-medium text-gray-900 group-hover:text-[#A4865E] transition-colors">{combo.name}</h3>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{combo.desc}</p>
                        
                        <div className="space-y-2 pt-4">
                          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Các dịch vụ thành phần:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {combo.services.map((cs, idx) => (
                              <span key={idx} className="text-[11px] bg-gray-50 text-gray-700 px-2.5 py-1 rounded border border-gray-100 font-medium">
                                ✓ {cs}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Đặc quyền tích hợp:</span>
                          <ul className="space-y-1">
                            {combo.features.map((cf, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                                {cf}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-gray-50">
                        <a href="#cta-section" className="w-full text-center py-2.5 block bg-gray-50 hover:bg-[#1E1E1E] hover:text-white text-gray-900 rounded-lg text-xs md:text-sm font-medium transition-all">
                          Nhận báo giá chi tiết Combo
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. Dịch vụ trọng tâm của PGS */}
            <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[#FAF8F2]" id="featured">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">CORE EXPERTISES</span>
                  <h2 className="text-3xl font-display font-medium">4 Dịch vụ trọng tâm cốt lõi của PGS Agency</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Sản phẩm được đầu tư chuyên môn hóa cao nhất, giúp doanh nghiệp thiết lập nhanh cấu trúc số vững mạnh.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'SEO Tổng Thể', icon: Search, desc: 'SEO bền vững dựa trên cấu trúc Topic Cluster chuyên sâu và tối ưu tín hiệu E-E-A-T uy tín.' },
                    { title: 'Thiết Kế Website', icon: Globe, desc: 'Lập trình website cao cấp, độc bản, chuẩn UI/UX hiện đại giúp tăng hiệu suất chuyển đổi tự nhiên.' },
                    { title: 'Google Ads Tối Ưu', icon: Megaphone, desc: 'Tiếp cận khách hàng chất lượng đúng thời điểm vàng, tối ưu tối đa chi phí bỏ ra trên mỗi lượt chuyển đổi.' },
                    { title: 'Landing Page High-CRO', icon: Zap, desc: 'Phục vụ đo lường chuyển đổi nhanh, thiết kế bám đuổi nội dung sáng tạo, tối đa hóa đơn hàng đăng ký.' }
                  ].map((feat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A880]/20 shadow-premium hover:border-[#C5A880] transition-premium flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[#FAF3E3] flex items-center justify-center text-[#A4865E]">
                          <feat.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-display font-semibold text-gray-900">{feat.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                      </div>
                      <div className="pt-6">
                        <a href="#cta-section" className="text-xs font-semibold font-mono text-[#A4865E] hover:text-black flex items-center gap-1">
                          Đăng ký tư vấn chuyên sâu <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. Quy trình tư vấn dịch vụ */}
            <section className="py-20 px-4" id="process">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">OUR PROCESS</span>
                  <h2 className="text-3xl font-display font-medium">Quy trình tư vấn & triển khai minh bạch</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Chúng tôi đồng hành chặt chẽ cùng khách hàng qua 6 bước khép kín để đảm bảo từng đồng ngân sách được chi tiêu thông minh.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
                  {[
                    { step: '01', name: 'Khảo sát nhu cầu', desc: 'Lắng nghe mô hình kinh doanh, mục tiêu và khó khăn hiện tại.' },
                    { step: '02', name: 'Audit & Nghiên cứu', desc: 'Đánh giá website hiện tại, phân tích đối thủ và thị trường ngách.' },
                    { step: '03', name: 'Đề xuất giải pháp', desc: 'Xây dựng kế hoạch dịch vụ chi tiết bám sát ngân sách của doanh nghiệp.' },
                    { step: '04', name: 'Báo giá & Ký kết', desc: 'Thống nhất bảng báo giá minh bạch, cam kết KPI rõ ràng trong hợp đồng.' },
                    { step: '05', name: 'Triển khai thực tế', desc: 'Bắt tay thiết kế, viết content, tối ưu SEO hoặc chạy Ads hàng tuần.' },
                    { step: '06', name: 'Báo cáo & Tối ưu', desc: 'Gửi báo cáo dữ liệu trực quan định kỳ, cải tiến liên tục để tăng ROI.' },
                  ].map((p, idx) => (
                    <div key={idx} className="bg-[#FAF8F2] p-5 rounded-xl border border-[#C5A880]/10 hover:border-[#C5A880]/30 transition-all flex flex-col justify-between">
                      <span className="text-4xl font-mono font-bold text-[#C5A880]/40 block mb-3">{p.step}</span>
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold font-display text-gray-900">{p.name}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 11. Dự án thực tế theo nhóm dịch vụ */}
            <section className="py-20 px-4 bg-white" id="cases">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">PROVED CASES</span>
                  <h2 className="text-3xl font-display font-medium">Dự án thực tế & Kết quả thực tế</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Nói bằng dữ liệu. Minh bạch hiệu quả kinh doanh của khách hàng là kim chỉ nam hàng đầu của PGS Agency.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'SEO & Content',
                      client: 'Chuỗi Nha Khoa Uy Tín TP.HCM',
                      result: 'Tăng 250% Organic Traffic',
                      desc: 'Xây dựng cấu trúc E-E-A-T chuẩn y khoa, phủ 500+ từ khóa dịch vụ vào top 3 Google sau 5 tháng.',
                      tags: ['SEO Y khoa', 'Entity Setup', 'CRO Audit']
                    },
                    {
                      cat: 'Website & Ads',
                      client: 'Thương Hiệu Thời Trang Thiết Kế',
                      result: 'Giảm 30% Chi Phí Lead',
                      desc: 'Thiết kế lại Landing Page siêu nhẹ, tối ưu hình ảnh sản phẩm và bám đuổi Ads thông qua phễu video ngắn.',
                      tags: ['Next.js Landing', 'FB Pixel SDK', 'TikTok Spark Ads']
                    },
                    {
                      cat: 'Social & Brand Presence',
                      client: 'Học Viện Thẩm Mỹ Quốc Tế',
                      result: 'Xây kênh TikTok đạt 500k Followers',
                      desc: 'Sản xuất kịch bản bài bản, đào tạo chủ thương hiệu quay video ngắn tạo phễu thu hút học viên đăng ký học nghề.',
                      tags: ['TikTok Production', 'Scripting Engine', 'Instagram Grid']
                    }
                  ].map((c, idx) => (
                    <div key={idx} className="bg-[#FAF8F2]/50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between hover:scale-[1.01] transition-transform">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-mono">{c.cat}</span>
                          <span className="text-[#A4865E] font-bold font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{c.result}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900">{c.client}</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-1">
                        {c.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-white text-gray-500 px-2.5 py-0.5 rounded border border-gray-200/50 font-mono">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center text-xs text-gray-400 italic">
                  [Cần bổ sung thêm dữ liệu dự án thật từ tệp khách hàng thực tế của PGS Agency]
                </div>
              </div>
            </section>

            {/* 12. FAQ + CTA tư vấn chọn giải pháp */}
            <section className="py-20 px-4 bg-[#FAF8F2] border-t border-[#C5A880]/15" id="faq">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* FAQ Block */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#A4865E] font-bold tracking-widest uppercase">ANSWERS FOR YOU</span>
                    <h2 className="text-3xl font-display font-medium text-gray-900">Giải đáp câu hỏi thường gặp</h2>
                    <p className="text-gray-600 text-sm">Hiểu rõ hơn về dịch vụ và cách PGS Agency giúp bạn kiến tạo dòng doanh thu vững chắc.</p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
                        <button
                          onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                          className="w-full text-left p-4 flex justify-between items-center gap-4 hover:bg-gray-50/50 transition-colors"
                        >
                          <span className="text-sm md:text-base font-semibold text-gray-900">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${faqOpen === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {faqOpen === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="p-4 bg-[#FCFBF7] text-xs md:text-sm text-gray-600 border-t border-gray-50 leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium CTA Panel */}
                <div className="lg:col-span-5" id="cta-section">
                  <div className="bg-white border border-[#C5A880]/35 rounded-2xl p-6 md:p-8 space-y-6 shadow-premium hover:shadow-premium-hover transition-premium">
                    <div className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center text-white">
                      <PhoneCall className="w-6 h-6 text-[#C5A880]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-display font-medium text-gray-900">Chưa rõ nên bắt đầu từ dịch vụ nào?</h3>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        Đăng ký nhanh thông tin bên dưới để đặt lịch tư vấn cùng giám đốc chiến lược của PGS. Chúng tôi sẽ audit sơ bộ tình trạng website/ads hiện tại hoàn toàn miễn phí.
                      </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã gửi thông tin. Chuyên viên PGS sẽ liên hệ hỗ trợ trong vòng 1-2h làm việc.'); }} className="space-y-3.5 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-gray-500 mb-1">TÊN DOANH NGHIỆP / CÁ NHÂN *</label>
                        <input type="text" required className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C5A880]" placeholder="Nha khoa Quốc Tế PGS, Shop thời trang..." />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-gray-500 mb-1">SỐ ĐIỆN THOẠI (ZALO) *</label>
                        <input type="tel" required className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C5A880]" placeholder="0901 234 567" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-gray-500 mb-1">DỊCH VỤ QUAN TÂM</label>
                        <select className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C5A880] text-gray-600">
                          <option>Tư vấn hệ sinh thái Marketing Tổng Thể</option>
                          <option>Thiết kế Website cao cấp / Landing Page</option>
                          <option>SEO Tổng Thể Đột Phá</option>
                          <option>Dịch vụ chạy Ads (FB, Google, TikTok)</option>
                          <option>Sáng tạo Content & Vận hành Social</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#1E1E1E] hover:bg-black text-[#FCFBF7] rounded-lg text-xs md:text-sm font-semibold transition-all shadow-md">
                        Gửi Đăng Ký - Nhận Tư Vấn Miễn Phí
                      </button>
                    </form>

                    <div className="flex justify-around pt-2 text-center text-[10px] text-gray-400 font-mono">
                      <span>✓ Bảo mật tuyệt đối</span>
                      <span>✓ Tư vấn miễn phí 1:1</span>
                      <span>✓ Audit web 0đ</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Premium Corporate Footer */}
            
          </motion.div>
        ) : (
          <motion.div
            key="spec-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 py-8 space-y-10"
          >
            {/* SEO & Brand Meta Info Header */}
            <div className="bg-[#FAF8F2] border border-[#C5A880]/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#A4865E]">
                <FileText className="w-5 h-5" />
                <h2 className="text-xl font-display font-bold">Tài Liệu Bàn Giao Thiết Kế & SEO Tiêu Chuẩn</h2>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Tài liệu này được biên soạn bởi các chuyên gia Senior UX/UI, SEO, CRO, EEAT và AI Search. Dùng để bàn giao trực tiếp cho Designer dựng Photoshop/Figma, Lập trình viên thiết lập mã và Content Team triển khai viết bài tối ưu công cụ tìm kiếm thế hệ mới.
              </p>
            </div>

            {/* Technical SEO Metadata Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-display text-[#1E1E1E] border-b pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                1. THÔNG TIN SEO METADATA TOÀN TRANG
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                <div className="space-y-2">
                  <span className="font-mono font-bold text-gray-400 block uppercase">Meta Title (Dưới 65 ký tự)</span>
                  <div className="bg-gray-50 p-3 rounded border border-gray-100 font-medium text-gray-900">
                    PGS Agency | Hệ Sinh Thái Marketing Tổng Thể Tăng Trưởng Số
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="font-mono font-bold text-gray-400 block uppercase">Meta Description (Dưới 160 ký tự)</span>
                  <div className="bg-gray-50 p-3 rounded border border-gray-100 text-gray-600 leading-relaxed">
                    Hệ sinh thái giải pháp Marketing tổng thể kết hợp Website, SEO, Ads, Content & Social Media tại PGS Agency giúp tăng lead, tối ưu chi phí và bứt phá doanh thu bền vững.
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono font-bold text-gray-400 block uppercase">H1 Chính của trang</span>
                  <div className="bg-gray-50 p-2.5 rounded border border-gray-100 font-semibold text-gray-800">
                    Hệ sinh thái dịch vụ Marketing tổng thể của PGS Agency
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono font-bold text-gray-400 block uppercase">Cấu Trúc Heading H2 / H3 chính</span>
                  <div className="bg-gray-50 p-2.5 rounded border border-gray-100 text-gray-500 space-y-1 font-mono text-[11px]">
                    <div>H2: Thiết kế giải pháp theo mục tiêu kinh doanh</div>
                    <div>H2: Nhóm Dịch Vụ Nền Tảng Kỹ Thuật Số (H3: chi tiết website, landing page...)</div>
                    <div>H2: Nhóm Thu Hút Khách Hàng (Growth & Traffic)</div>
                    <div>H2: Nhóm Sáng Tạo Nội Dung & Quản Trị Social</div>
                    <div>H2: Bản đồ dịch vụ theo hành trình khách hàng</div>
                    <div>H2: Gói giải pháp Combo hiệu quả & tiết kiệm</div>
                    <div>H2: 4 Dịch vụ trọng tâm cốt lõi của PGS Agency</div>
                    <div>H2: Quy trình tư vấn & triển khai minh bạch</div>
                    <div>H2: Giải đáp câu hỏi thường gặp (FAQ)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links mapping */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-display text-[#1E1E1E] border-b pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                2. SƠ ĐỒ INTERNAL LINKS (LIÊN KẾT NỘI BỘ)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                <div className="space-y-2 bg-[#FAF8F2] p-4 rounded border border-[#C5A880]/20">
                  <span className="font-semibold text-[#A4865E] block">Internal Link ĐI (Từ trang Hub sang trang con):</span>
                  <ul className="space-y-1 text-gray-600 list-disc pl-4">
                    <li>Trang chi tiết: <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">/dich-vu/thiet-ke-website/</code></li>
                    <li>Trang chi tiết: <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">/dich-vu/seo-tong-the/</code></li>
                    <li>Trang chi tiết: <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">/dich-vu/quang-cao-google-ads/</code></li>
                    <li>Trang chi tiết: <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">/dich-vu/thiet-ke-landing-page/</code></li>
                    <li>Đọc case study chi tiết: <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">/du-an-thuc-te/</code></li>
                  </ul>
                </div>
                <div className="space-y-2 bg-gray-50 p-4 rounded border border-gray-200/50">
                  <span className="font-semibold text-gray-700 block">Internal Link NHẬN (Từ trang ngoài trỏ về):</span>
                  <ul className="space-y-1 text-gray-500 list-disc pl-4">
                    <li>Từ Menu chính Header & Footer trên toàn trang.</li>
                    <li>Từ trang chủ: Anchor text: <code className="bg-white px-1.5 py-0.5 rounded text-[11px] text-gray-600">&quot;dịch vụ marketing tổng thể&quot;</code> hoặc <code className="bg-white px-1.5 py-0.5 rounded text-[11px] text-gray-600">&quot;giải pháp tăng trưởng số&quot;</code></li>
                    <li>Từ bài viết blog phân tích kiến thức: Trỏ về Hub dịch vụ để hướng khách hàng đăng ký giải pháp.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Schema markup proposals */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-display text-[#1E1E1E] border-b pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                3. ĐỀ XUẤT CẤU TRÚC DỮ LIỆU CÓ CẤU TRÚC (SCHEMA MARKUP)
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nhúng mã JSON-LD Schema này vào mã nguồn của trang dịch vụ `/dich-vu/` để giúp Googlebot, Bingbot và các công cụ tìm kiếm thế hệ mới (AI Search Generative Experience - SGE) quét lập chỉ mục hệ sinh thái dịch vụ nhanh nhất.
              </p>
              <div className="bg-gray-900 text-gray-300 p-4 rounded-lg text-[10px] font-mono overflow-x-auto max-h-80 whitespace-pre">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pgsagency.vn/dich-vu/#webpage",
      "url": "https://pgsagency.vn/dich-vu/",
      "name": "Hệ sinh thái dịch vụ Marketing tổng thể - PGS Agency",
      "description": "Tập hợp 15 dịch vụ cốt lõi từ Website, SEO, Performance Ads đến Content Social."
    },
    {
      "@type": "Service",
      "name": "SEO Tổng Thể Đột Phá",
      "provider": {
        "@type": "LocalBusiness",
        "name": "PGS Agency",
        "image": "https://pgsagency.vn/logo.png",
        "priceRange": "$$"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Doanh nghiệp nên bắt đầu triển khai dịch vụ nào trước?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PGS khuyên bạn nên bắt đầu bằng việc chuẩn hóa Website và Landing Page trước khi thực hiện các chiến dịch Ads diện rộng."
          }
        }
      ]
    }
  ]
}`}
              </div>
            </div>

            {/* Department hand-off checklists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Designer Hand-off */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b pb-2 text-[#A4865E]">
                  <Compass className="w-5 h-5" />
                  <h4 className="font-semibold font-display">Checklist cho Designer</h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Màu sắc chính xác:</strong> Đảm bảo sử dụng mã màu gold champagne nhẹ nhàng, không dùng vàng chóe hay neon gắt.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Spacing phóng khoáng:</strong> Mỗi section cách nhau tối thiểu 120px - 140px tạo khoảng thở cho Light Premium style.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Đồng bộ Icons:</strong> Sử dụng bộ vector tối giản mảnh (stroke 1.5 - 2px) mượt mà, không dùng icon 3D lòe loẹt.</span>
                  </li>
                </ul>
              </div>

              {/* Developer Hand-off */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b pb-2 text-[#A4865E]">
                  <FileText className="w-5 h-5" />
                  <h4 className="font-semibold font-display">Checklist cho Developer</h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Phân tách Class mượt:</strong> Cài đặt thư viện motion hoạt động mượt mà, tối ưu FPS trên thiết bị di động.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Lazy Loading & Speed:</strong> Tốc độ load tối thiểu phải đạt 90+ điểm Mobile trên Google PageSpeed Insights.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Semantic HTML:</strong> Phải có đầy đủ thẻ semantic (header, nav, main, section, footer) cùng ID rõ ràng cho tracking.</span>
                  </li>
                </ul>
              </div>

              {/* Content SEO Hand-off */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b pb-2 text-[#A4865E]">
                  <PenTool className="w-5 h-5" />
                  <h4 className="font-semibold font-display">Checklist cho Content SEO</h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>E-E-A-T Framework:</strong> Mỗi dịch vụ phải chỉ ra rõ giá trị thật, tệp khách hàng phù hợp và kết quả đo lường thật.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Tối Ưu AI Search:</strong> Cung cấp trực tiếp các định nghĩa ngắn gọn, danh sách so sánh và quy trình rõ để AI dễ crawl.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span><strong>Conversion Copywriting:</strong> Văn phong chuyên nghiệp, tin cậy, thúc đẩy hành vi đăng ký nhận phân tích audit miễn phí.</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
