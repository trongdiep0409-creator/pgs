'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Shield, Sparkles, CheckCircle2, ChevronDown, HelpCircle, 
  ArrowRight, Phone, Mail, Clock, Download, Search, Check, Info, 
  ExternalLink, Copy, AlertTriangle, Users, Calendar, Award, Compass, Eye, BookOpen
} from 'lucide-react';

// Interfaces
interface ServiceScope {
  id: string;
  title: string;
  description: string;
  details: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export default function TermsOfServicePage() {
  // Modes: 'live' (Customer view) or 'handoff' (Specs/Documentation view)
  const [viewMode, setViewMode] = useState<'live' | 'handoff'>('live');
  
  // Search state for terms
  const [searchTerm, setSearchTerm] = useState('');
  
  // Accordion state
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  
  // Copy to clipboard state
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', accept: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accept) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '', accept: false });
    }, 5000);
  };

  // Data for sections
  const serviceScopes: ServiceScope[] = [
    {
      id: 'website',
      title: 'Tối ưu & Phát triển Website',
      description: 'Thiết kế, xây dựng và quản trị hệ thống website chuẩn UX/UI và chuyển đổi cao.',
      details: [
        'Thiết kế giao diện độc quyền chuẩn Light Premium, tối ưu trải nghiệm người dùng (UX) và giao diện trực quan (UI).',
        'Lập trình website tối ưu tốc độ tải trang dưới 2 giây, thân thiện với thiết bị di động.',
        'Thiết lập hệ thống tracking chuyên sâu (Google Analytics 4, GTM, Pixel).'
      ]
    },
    {
      id: 'seo',
      title: 'Dịch vụ SEO Tổng Thể',
      description: 'Đưa website lên top công cụ tìm kiếm một cách bền vững bằng kỹ thuật mũ trắng.',
      details: [
        'Nghiên cứu từ khóa chuyên sâu theo hành trình mua hàng (Search Intent).',
        'Tối ưu hóa On-page, cấu trúc website và sáng tạo nội dung chuẩn EEAT.',
        'Xây dựng thực thể thương hiệu (Entity) và tối ưu hóa SEO kỹ thuật (Technical SEO).'
      ]
    },
    {
      id: 'ads',
      title: 'Quảng Cáo Đa Nền Tảng (Ads)',
      description: 'Lập chiến dịch quảng cáo tối ưu ngân sách trên Google, Facebook và TikTok.',
      details: [
        'Google Ads: Quảng cáo tìm kiếm, tối ưu phễu từ khóa chuyển đổi cao, Remarketing bám đuổi.',
        'Facebook/TikTok Ads: Sáng tạo nội dung quảng cáo thị giác cao, target chuẩn tệp khách hàng mục tiêu.',
        'Theo dõi, đo lường và tối ưu chi phí trên từng lượt chuyển đổi (CPA/CPL).'
      ]
    },
    {
      id: 'content',
      title: 'Content & Social Media',
      description: 'Sáng tạo nội dung đa kênh định hình vị thế thương hiệu hàng đầu.',
      details: [
        'Sáng tạo kịch bản, bài viết fanpage, bài viết chuẩn SEO chuyên sâu.',
        'Thiết kế hình ảnh, video ngắn phục vụ tiếp thị truyền thông xã hội.',
        'Xây dựng kế hoạch nội dung định kỳ tháng/quý theo đúng định vị thương hiệu.'
      ]
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: '01',
      title: 'Tư vấn & Khảo sát',
      description: 'PGS tiếp nhận thông tin sơ bộ về doanh nghiệp, mục tiêu và ngân sách dự kiến.',
      details: ['Họp 1-1 trực tuyến hoặc trực tiếp', 'Khảo sát hiện trạng kênh marketing của doanh nghiệp', 'Phân tích nhanh đối thủ cạnh tranh']
    },
    {
      step: '02',
      title: 'Phân tích & Đề xuất',
      description: 'Đội ngũ chuyên gia PGS lập kế hoạch tổng thể đa kênh giải quyết bài toán tăng trưởng.',
      details: ['Đề xuất chiến lược định vị và thông điệp', 'Đề xuất các kênh triển khai phù hợp nhất', 'Dự báo KPIs và phân bổ ngân sách tối ưu']
    },
    {
      step: '03',
      title: 'Báo giá & Xác nhận',
      description: 'Hai bên thảo luận chi tiết về phạm vi công việc, KPIs cam kết và ngân sách.',
      details: ['Báo giá chi tiết từng hạng mục triển khai', 'Thống nhất KPIs và lộ trình thanh toán', 'Ký kết hợp đồng dịch vụ chính thức']
    },
    {
      step: '04',
      title: 'Triển khai & Tối ưu',
      description: 'Đội ngũ PGS tiến hành triển khai dự án, liên tục đo lường và tối ưu theo thời gian thực.',
      details: ['Set up hệ thống đo lường dữ liệu', 'Triển khai content, kỹ thuật SEO, chạy chiến dịch Ads', 'Gửi báo cáo định kỳ tuần/tháng minh bạch']
    }
  ];

  const pgsResponsibilities = [
    { title: 'Đúng tiến độ & Chất lượng', desc: 'PGS cam kết triển khai đúng các hạng mục đã thỏa thuận trong hợp đồng với chất lượng chuyên môn cao nhất.' },
    { title: 'Minh bạch dữ liệu', desc: 'Cung cấp quyền truy cập đầy đủ vào các tài khoản quảng cáo, hệ thống báo cáo thời gian thực, nói không với giấu số.' },
    { title: 'Tối ưu dựa trên dữ liệu', desc: 'Mọi đề xuất điều chỉnh chiến dịch đều dựa trên số liệu thực tế thu thập từ Google Analytics, CRM, không dựa trên cảm tính.' },
    { title: 'Đồng hành dài hạn', desc: 'Cử nhân sự chuyên trách hỗ trợ xử lý sự cố phát sinh nhanh chóng trong giờ làm việc.' }
  ];

  const clientResponsibilities = [
    { title: 'Cung cấp thông tin kịp thời', desc: 'Doanh nghiệp bàn giao đầy đủ hình ảnh sản phẩm, giấy phép kinh doanh, tài liệu chuyên môn hỗ trợ PGS làm tư liệu.' },
    { title: 'Phê duyệt nội dung đúng hạn', desc: 'Phản hồi và duyệt các kế hoạch nội dung, thiết kế, kịch bản quảng cáo trong vòng 24h-48h để không trễ tiến độ.' },
    { title: 'Thanh toán đúng kỳ hạn', desc: 'Thực hiện thanh toán tạm ứng hoặc thanh toán theo các giai đoạn đã cam kết rõ ràng trong hợp đồng.' },
    { title: 'Đảm bảo năng lực tư vấn sales', desc: 'Doanh nghiệp tối ưu bộ phận tư vấn, chốt sales để chuyển đổi tối đa lượng lead (khách hàng tiềm năng) do PGS đem về.' }
  ];

  const timelinesAndSpas = [
    {
      id: 'timeline-rule',
      title: 'Nguyên tắc thời gian dự án',
      content: 'Mốc thời gian dự án được tính từ ngày PGS nhận đủ tạm ứng giai đoạn 1 và toàn bộ tài liệu đầu vào từ phía Khách hàng. Mọi sự chậm trễ từ phía Khách hàng trong việc cung cấp thông tin hoặc phê duyệt sản phẩm sẽ tự động cộng thêm vào thời gian bàn giao tương ứng.'
    },
    {
      id: 'out-of-scope',
      title: 'Xử lý yêu cầu ngoài phạm vi (Out of Scope)',
      content: 'Mọi yêu cầu chỉnh sửa, bổ sung tính năng website hoặc hạng mục marketing ngoài bảng mô tả công việc (SOW) của hợp đồng sẽ được tính là phát sinh. PGS sẽ gửi báo giá bổ sung cho hạng mục này và chỉ triển khai sau khi nhận được sự đồng ý bằng văn bản/email từ đại diện Khách hàng.'
    },
    {
      id: 'emergency-handling',
      title: 'Sự cố khẩn cấp và trường hợp bất khả kháng',
      content: 'Trong trường hợp máy chủ bên thứ ba gặp sự cố (như Google, Facebook, TikTok quét thuật toán diện rộng), PGS có trách nhiệm nhanh chóng đưa ra giải pháp khắc phục tạm thời và thông báo lộ trình xử lý. Các ngày xảy ra sự cố bất khả kháng này không tính vào chỉ số chậm trễ tiến độ của PGS.'
    }
  ];

  const handoverChecklist = [
    { category: 'Hệ thống Website', items: ['Mã nguồn toàn bộ website', 'Tài khoản quản trị quản lý tên miền & hosting', 'Tài liệu hướng dẫn quản trị & cập nhật sản phẩm'] },
    { category: 'Hệ thống Marketing', items: ['Quyền quản trị Google Tag Manager, Google Analytics 4', 'Danh sách bộ từ khóa SEO đã tối ưu hóa', 'Báo cáo chi tiết chiến dịch Ads và tệp khách hàng đã loại trừ'] },
    { category: 'Tài nguyên thương hiệu', items: ['Toàn bộ thiết kế hình ảnh gốc dạng file Canva/Figma', 'Kịch bản nội dung chi tiết & kho tài liệu sáng tạo'] }
  ];

  // Schema representation for Handoff Mode
  const schemaCode = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pgsagency.vn/dieu-khoan-dich-vu/#webpage",
      "url": "https://pgsagency.vn/dieu-khoan-dich-vu/",
      "name": "Điều khoản dịch vụ | PGS Agency - Hệ thống Marketing tăng trưởng",
      "description": "Xem chi tiết điều khoản dịch vụ của PGS Agency. Cam kết minh bạch, quy trình làm việc chuyên nghiệp, rõ ràng trách nhiệm hai bên nhằm tối ưu hóa hiệu quả.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pgsagency.vn/#website",
        "url": "https://pgsagency.vn/",
        "name": "PGS Agency",
        "description": "Hệ thống Marketing tăng trưởng toàn diện đa nền tảng"
      },
      "inLanguage": "vi"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pgsagency.vn/dieu-khoan-dich-vu/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://pgsagency.vn/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Điều khoản dịch vụ"
        }
      ]
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-charcoal-50 text-charcoal-900 transition-colors duration-300 relative selection:bg-gold-200 selection:text-charcoal-900">
      
      {/* BACKGROUND GRAPHICS & BLUR GEMS */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gold-100/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-gold-200/20 blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#eee_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.4]" />
      </div>

      {/* STICKY TOP HEADER */}
      

      {/* FLOATING ACTION BANNER AT TOP TO REMIND THE USER OF MULTI-MODE VIEW */}
      <div className="bg-gold-50 border-y border-gold-200/50 py-3 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gold-800">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-gold-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Premium Handoff</span>
            <span>Bạn đang xem trang <strong>Điều khoản dịch vụ của PGS Agency</strong> được tối ưu hóa chuẩn SEO & EEAT.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gold-600">Dễ dàng chuyển đổi giữa giao diện khách hàng và tài liệu kỹ thuật:</span>
            <button 
              onClick={() => setViewMode(viewMode === 'live' ? 'handoff' : 'live')}
              className="bg-white border border-gold-300 hover:bg-gold-100 text-gold-800 px-3 py-1 rounded font-medium transition-colors"
            >
              Chuyển sang {viewMode === 'live' ? 'Tài liệu bàn giao' : 'Giao diện Live UI'} →
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-10">
        
        {/* ========================================== */}
        {/* VIEW 1: LIVE WEBSITE UI (DEFAULT)          */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          {viewMode === 'live' && (
            <motion.div
              key="live-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pb-24"
            >
              
              {/* SECTION 1: HERO CONTAINER */}
              <section className="pt-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Left Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gold-100/60 border border-gold-200 px-3.5 py-1 rounded-full text-xs font-semibold text-gold-800 tracking-wide uppercase">
                    <Shield className="w-3.5 h-3.5 text-gold-600" />
                    Cam kết minh bạch & Tăng trưởng bền vững
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 leading-[1.1]">
                    Điều khoản <br className="hidden sm:inline" />
                    <span className="text-gold-500 relative">
                      Dịch vụ PGS Agency
                      <span className="absolute bottom-1.5 left-0 w-full h-[4px] bg-gold-200/50 -z-10" />
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-charcoal-600 max-w-xl leading-relaxed">
                    Chào mừng bạn đến với PGS Agency. Các điều khoản dưới đây quy định phạm vi dịch vụ, quyền lợi và trách nhiệm pháp lý giữa hai bên khi hợp tác triển khai hệ thống marketing tổng thể đa nền tảng.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <a href="#scopes" className="bg-gold-500 hover:bg-gold-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                      Xem phạm vi dịch vụ
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#exceptions" className="bg-white hover:bg-charcoal-50 text-charcoal-900 border border-charcoal-200 font-semibold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2">
                      Xem giới hạn cam kết
                    </a>
                  </div>

                  <div className="flex items-center gap-6 pt-4 text-xs text-charcoal-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Cập nhật lần cuối: Hôm nay, 2026
                    </span>
                    <span>•</span>
                    <span>Phiên bản: 3.5.2 (Premium)</span>
                  </div>
                </div>

                {/* Hero Right: 3D DOCUMENT AGREEMENT CONCEPT (Premium CSS/HTML/SVG 3D) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[380px] aspect-[4/5] perspective-[1000px]">
                    
                    {/* Shadow base */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-charcoal-900/10 rounded-full blur-xl" />

                    {/* Floating gold coin/gem elements */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="absolute -top-4 -left-4 w-12 h-12 bg-gold-200 rounded-full flex items-center justify-center border border-white shadow-md z-20"
                    >
                      <Sparkles className="w-5 h-5 text-gold-600" />
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-8 -right-4 bg-white p-3 rounded-xl border border-charcoal-100 shadow-lg z-20 flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                      <div>
                        <div className="text-[10px] text-charcoal-400 uppercase font-mono">Hợp đồng</div>
                        <div className="text-xs font-bold text-charcoal-800">Đã kích hoạt</div>
                      </div>
                    </motion.div>

                    {/* Document agreement 3D body */}
                    <motion.div 
                      whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full bg-white rounded-3xl border border-charcoal-200/60 shadow-2xl overflow-hidden p-8 flex flex-col justify-between relative transform preserve-3d"
                    >
                      {/* Premium glass header overlay on the document */}
                      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400" />
                      
                      {/* Inner specs document layout */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono tracking-widest text-gold-600 uppercase font-bold">PGS AGREEMENT</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                        </div>
                        
                        {/* Doc lines simulation */}
                        <div className="space-y-3">
                          <div className="h-4 bg-charcoal-100 rounded w-3/4" />
                          <div className="h-3 bg-charcoal-50 rounded w-5/6" />
                          <div className="h-3 bg-charcoal-50 rounded w-full" />
                        </div>

                        <hr className="border-charcoal-100" />

                        {/* Interactive Scope Checklist simulation inside the doc */}
                        <div className="space-y-2.5">
                          {[
                            'Phát triển Website chuẩn UX/UI',
                            'SEO Tổng thể mũ trắng bền vững',
                            'Quảng cáo đa nền tảng tối ưu ngân sách',
                            'Đo lường & Báo cáo dữ liệu thực tế'
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-600">
                              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Sign Block on the document */}
                      <div className="border-t border-charcoal-100 pt-5 flex items-center justify-between">
                        <div>
                          <div className="text-[9px] font-mono text-charcoal-400">ĐẠI DIỆN PGS AGENCY</div>
                          <div className="font-display font-bold text-xs text-charcoal-800 tracking-wide mt-0.5">PGS AGENCY CO., LTD</div>
                        </div>
                        <div className="relative w-16 h-10 border border-dashed border-gold-300 rounded flex items-center justify-center bg-gold-50/50">
                          <span className="text-[10px] font-mono text-gold-500 tracking-wider font-semibold">SIGNED</span>
                          {/* Ink signature overlay simulation */}
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2250%22 viewBox=%220 0 100 50%22><path d=%22M10,25 Q30,10 50,25 T90,25%22 fill=%22none%22 stroke=%22%23b58135%22 stroke-width=%222%22/></svg>')] bg-cover opacity-60 pointer-events-none" />
                        </div>
                      </div>

                    </motion.div>

                  </div>
                </div>

              </section>

              {/* SEARCH BAR FOR QUICK SECTION NAVIGATION */}
              <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 relative">
                <div className="bg-white p-2 rounded-2xl border border-charcoal-200/80 shadow-lg flex items-center gap-2">
                  <div className="pl-3 text-charcoal-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm nhanh điều khoản (ví dụ: SEO, thời gian, nghiệm thu, quảng cáo...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 bg-transparent text-sm focus:outline-none placeholder-charcoal-400 text-charcoal-800"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="px-3 py-1 rounded text-xs bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-600 transition-colors"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              {/* SECTION 2: PHẠM VI ÁP DỤNG */}
              <section id="scopes" className="py-20 bg-white border-y border-charcoal-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 02 / Điều khoản dịch vụ</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Phạm vi áp dụng dịch vụ PGS Agency
                    </h2>
                    <p className="text-charcoal-600">
                      PGS Agency cung cấp giải pháp Marketing tổng thể đa nền tảng được chia nhỏ thành các module linh hoạt, tối ưu theo đúng mục tiêu của từng giai đoạn doanh nghiệp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {serviceScopes
                      .filter(scope => 
                        scope.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        scope.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        scope.details.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map((scope) => (
                        <motion.div
                          key={scope.id}
                          whileHover={{ y: -5 }}
                          className="bg-charcoal-50 rounded-2xl border border-charcoal-200/80 p-8 flex flex-col justify-between transition-shadow hover:shadow-xl group"
                        >
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <span className="w-10 h-10 rounded-xl bg-gold-100/50 text-gold-600 flex items-center justify-center font-bold">
                                {scope.id === 'website' ? '⌨' : scope.id === 'seo' ? '🔍' : scope.id === 'ads' ? '🎯' : '✍'}
                              </span>
                              <span className="text-xs font-mono font-medium tracking-wider text-charcoal-400 group-hover:text-gold-500 transition-colors uppercase">
                                Module: {scope.id}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-display text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                                {scope.title}
                              </h3>
                              <p className="text-sm text-charcoal-600 leading-relaxed">
                                {scope.description}
                              </p>
                            </div>

                            <ul className="space-y-2.5 border-t border-charcoal-200/40 pt-5">
                              {scope.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-2.5 text-xs text-charcoal-600 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-6 mt-6 border-t border-charcoal-200/30 flex items-center justify-between text-xs font-medium text-charcoal-500">
                            <span>Chi tiết áp dụng</span>
                            <span className="text-gold-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Thỏa thuận hợp đồng <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </motion.div>
                    ))}
                  </div>

                </div>
              </section>

              {/* SECTION 3: QUY TRÌNH TIẾP NHẬN YÊU CẦU */}
              <section id="process" className="py-20 bg-charcoal-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 03 / Điều khoản dịch vụ</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Quy trình tiếp nhận & Triển khai yêu cầu
                    </h2>
                    <p className="text-charcoal-600">
                      PGS Agency hoạt động dựa trên quy trình chuyên nghiệp, chặt chẽ để đảm bảo mọi ý tưởng được truyền tải đúng hướng và đạt hiệu quả tối ưu nhất.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    
                    {processSteps.map((stepObj) => (
                      <div 
                        key={stepObj.step}
                        className="bg-white rounded-2xl border border-charcoal-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                      >
                        {/* Huge background number */}
                        <div className="absolute top-2 right-2 text-6xl font-display font-black text-charcoal-100/60 select-none group-hover:text-gold-100/30 transition-colors">
                          {stepObj.step}
                        </div>

                        <div className="space-y-4 relative z-10">
                          <span className="text-xs font-mono font-bold text-gold-500 tracking-wider uppercase block">
                            Bước {stepObj.step}
                          </span>

                          <h3 className="font-display text-lg font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                            {stepObj.title}
                          </h3>

                          <p className="text-xs text-charcoal-600 leading-relaxed">
                            {stepObj.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-charcoal-100 space-y-2 relative z-10">
                          {stepObj.details.map((det, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-charcoal-500">
                              <span className="w-1 h-1 rounded-full bg-gold-400" />
                              <span>{det}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>

                </div>
              </section>

              {/* SECTION 4 & 5: TRÁCH NHIỆM HAI BÊN (PGS VS KHÁCH HÀNG) */}
              <section id="responsibility" className="py-20 bg-white border-y border-charcoal-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase font-bold">Mục 04 & 05 / Điều khoản dịch vụ</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Phân định trách nhiệm của hai bên
                    </h2>
                    <p className="text-charcoal-600">
                      Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi. Việc xác định rõ ranh giới trách nhiệm giúp duy trì mối quan hệ hợp tác công bằng, minh bạch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* TRÁCH NHIỆM PGS */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-charcoal-200 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center font-bold">
                          P
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-charcoal-900">Trách nhiệm của PGS Agency</h3>
                          <p className="text-xs text-charcoal-500 font-mono uppercase">PGS Agency Responsibilities</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {pgsResponsibilities.map((item, idx) => (
                          <div 
                            key={idx}
                            className="p-5 bg-charcoal-50 rounded-xl border border-charcoal-200 flex items-start gap-4 hover:border-gold-300 transition-colors"
                          >
                            <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              0{idx+1}
                            </span>
                            <div className="space-y-1">
                              <h4 className="font-display font-bold text-charcoal-900 text-sm sm:text-base">
                                {item.title}
                              </h4>
                              <p className="text-xs text-charcoal-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TRÁCH NHIỆM KHÁCH HÀNG */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-charcoal-200 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-charcoal-800 text-white flex items-center justify-center font-bold">
                          C
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-charcoal-900">Trách nhiệm của Khách hàng</h3>
                          <p className="text-xs text-charcoal-500 font-mono uppercase">Client Responsibilities</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {clientResponsibilities.map((item, idx) => (
                          <div 
                            key={idx}
                            className="p-5 bg-charcoal-50 rounded-xl border border-charcoal-200 flex items-start gap-4 hover:border-charcoal-400 transition-colors"
                          >
                            <span className="w-6 h-6 rounded-full bg-charcoal-200 text-charcoal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              0{idx+1}
                            </span>
                            <div className="space-y-1">
                              <h4 className="font-display font-bold text-charcoal-900 text-sm sm:text-base">
                                {item.title}
                              </h4>
                              <p className="text-xs text-charcoal-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </section>

              {/* SECTION 6: THỜI GIAN TRIỂN KHAI & PHÁT SINH */}
              <section className="py-20 bg-charcoal-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 06 / Điều khoản dịch vụ</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Thời gian triển khai & Quản trị phát sinh
                    </h2>
                    <p className="text-charcoal-600">
                      Điều khoản thỏa thuận đảm bảo đúng tiến độ dự án, dự trù các trường hợp phát sinh để dự án không gián đoạn.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {timelinesAndSpas.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-charcoal-50/50 transition-colors"
                        >
                          <span className="font-display font-bold text-charcoal-900 text-sm sm:text-base flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                            {item.title}
                          </span>
                          <ChevronDown 
                            className={`w-5 h-5 text-charcoal-400 transition-transform ${
                              expandedAccordion === item.id ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </button>

                        <AnimatePresence>
                          {expandedAccordion === item.id && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-4 bg-charcoal-50/20">
                                {item.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* SECTION 7: NGHIỆM THU & BÀN GIAO */}
              <section className="py-20 bg-white border-y border-charcoal-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 07 / Điều khoản dịch vụ</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Quy trình nghiệm thu & Bàn giao tài nguyên
                    </h2>
                    <p className="text-charcoal-600">
                      Khi hoàn thành dự án hoặc kết thúc hợp đồng, PGS cam kết bàn giao đầy đủ quyền sở hữu tài sản số, tài nguyên thiết kế và dữ liệu cho khách hàng.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {handoverChecklist.map((cat, idx) => (
                      <div 
                        key={idx}
                        className="bg-charcoal-50 rounded-2xl border border-charcoal-200 p-6 flex flex-col justify-between hover:border-gold-300 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
                            <span className="font-display font-bold text-charcoal-900 text-sm sm:text-base">
                              {cat.category}
                            </span>
                            <span className="text-[10px] font-mono bg-white border border-charcoal-200 px-2 py-0.5 rounded text-charcoal-500 uppercase">
                              Bàn giao
                            </span>
                          </div>

                          <ul className="space-y-3">
                            {cat.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-charcoal-600">
                                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-5 mt-5 border-t border-charcoal-200/40 text-[10px] text-charcoal-400 font-mono text-right">
                          Hết thời hạn bảo hành: 30 ngày
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* SECTION 8: GIỚI HẠN CAM KẾT (Transparent commitment box) */}
              <section id="exceptions" className="py-20 bg-charcoal-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center space-y-4 mb-16">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 08 / Giới hạn trách nhiệm</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Giới hạn cam kết & Tính chân thực của dữ liệu
                    </h2>
                    <p className="text-charcoal-600 text-sm">
                      PGS Agency đặt tính minh bạch và trung thực lên hàng đầu. Để đảm bảo uy tín, chúng tôi tuyên bố rõ ràng các giới hạn khách quan trong triển khai Marketing kỹ thuật số.
                    </p>
                  </div>

                  {/* Transparent commitment box with gold gradient highlighting */}
                  <div className="bg-white rounded-3xl border-2 border-gold-200 p-8 sm:p-10 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold-100/40 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 border border-gold-200 shadow-inner">
                        <AlertTriangle className="w-6 h-6" />
                      </div>

                      <div className="space-y-6">
                        <h3 className="font-display text-xl font-bold text-charcoal-900">
                          Tuyên bố không cam kết kết quả ảo hoặc kiểm soát tuyệt đối
                        </h3>

                        <div className="text-xs sm:text-sm text-charcoal-600 space-y-4 leading-relaxed">
                          <p>
                            <strong>Không cam kết top Google 100% vĩnh viễn:</strong> Thuật toán tìm kiếm của Google liên tục cập nhật và chịu ảnh hưởng trực tiếp từ hành động của các đối thủ khác trên thị trường. PGS cam kết thực hiện đúng phương pháp tối ưu SEO bền vững (Whitehat), không cam kết thao túng vị trí top 1 tuyệt đối ngoài quy định của Google.
                          </p>
                          <p>
                            <strong>Về tích hợp AI Overviews & SGE:</strong> PGS liên tục tối ưu hóa nội dung để tối đa hóa tần suất xuất hiện trên bảng trả lời AI thông minh, tuy nhiên tỷ lệ xuất hiện cuối cùng phụ thuộc hoàn toàn vào cơ chế máy học thời gian thực của các công cụ tìm kiếm.
                          </p>
                          <p>
                            <strong>Về số lượng Lead & Doanh thu:</strong> Marketing mang đến cơ hội tiếp cận và tệp data khách hàng tiềm năng chất lượng cao (Leads). Kết quả chuyển đổi thành doanh số cuối cùng phụ thuộc mật thiết vào chất lượng sản phẩm, chính sách giá, năng lực tư vấn và quy trình chốt sales của nhân viên doanh nghiệp.
                          </p>
                        </div>

                        <div className="p-4 bg-gold-50/50 rounded-xl border border-gold-200 text-xs text-gold-800 flex items-center gap-2">
                          <Info className="w-4 h-4 shrink-0" />
                          <span>Mục tiêu của PGS là xây dựng <strong>hệ thống tăng trưởng số bền vững</strong> có dữ liệu minh bạch, nói không với traffic ảo.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* SECTION 9: LIÊN HỆ HỖ TRỢ */}
              <section id="support" className="py-20 bg-white border-t border-charcoal-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">Mục 09 / Hỗ trợ khách hàng</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                      Bạn có thắc mắc về điều khoản?
                    </h2>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      PGS Agency luôn sẵn sàng lắng nghe và giải đáp mọi băn khoăn của bạn trước khi bắt đầu hành trình xây dựng hệ thống tăng trưởng đột phá.
                    </p>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-charcoal-50 border border-charcoal-200 text-charcoal-700 flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-charcoal-400 font-mono">HOTLINE CHĂM SÓC KHÁCH HÀNG</div>
                          <div className="font-display font-bold text-charcoal-800 text-sm">090.123.4567</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-charcoal-50 border border-charcoal-200 text-charcoal-700 flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-charcoal-400 font-mono">EMAIL TIẾP NHẬN YÊU CẦU</div>
                          <div className="font-display font-bold text-charcoal-800 text-sm">legal@pgsagency.vn</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200 text-xs text-charcoal-500">
                      Tất cả mọi giải đáp thắc mắc về điều khoản dịch vụ sẽ được phản hồi bằng văn bản chính thức đóng dấu PGS trong vòng tối đa 24 giờ làm việc.
                    </div>
                  </div>

                  {/* Right Column: Contact form */}
                  <div className="lg:col-span-7">
                    <div className="bg-charcoal-50 rounded-3xl border border-charcoal-200 p-8 shadow-sm">
                      <h3 className="font-display font-bold text-xl text-charcoal-900 mb-6">
                        Gửi câu hỏi / Đăng ký ký hợp tác
                      </h3>

                      {formSubmitted ? (
                        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                          <h4 className="font-display font-bold text-emerald-900">Gửi thông tin thành công!</h4>
                          <p className="text-xs text-emerald-800 leading-relaxed">
                            Cám ơn quý khách đã quan tâm đến điều khoản dịch vụ PGS Agency. Chuyên viên pháp lý và phát triển thị trường của chúng tôi sẽ liên hệ trong 2 tiếng làm việc.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-charcoal-500 uppercase mb-1">Họ và tên *</label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nguyễn Văn A"
                                className="w-full bg-white border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 text-charcoal-800"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-charcoal-500 uppercase mb-1">Số điện thoại *</label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="0901234567"
                                className="w-full bg-white border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 text-charcoal-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-charcoal-500 uppercase mb-1">Địa chỉ Email *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="doanhnghiep@gmail.com"
                              className="w-full bg-white border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 text-charcoal-800"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-charcoal-500 uppercase mb-1">Nội dung thắc mắc / Yêu cầu tư vấn</label>
                            <textarea
                              rows={4}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Mô tả cụ thể thắc mắc của bạn về phạm vi, cam kết hoặc yêu cầu dịch vụ cụ thể..."
                              className="w-full bg-white border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 text-charcoal-800"
                            />
                          </div>

                          <div className="flex items-start gap-2 pt-2">
                            <input
                              type="checkbox"
                              id="accept-terms"
                              required
                              checked={formData.accept}
                              onChange={(e) => setFormData({ ...formData, accept: e.target.checked })}
                              className="mt-1 accent-gold-500 cursor-pointer"
                            />
                            <label htmlFor="accept-terms" className="text-xs text-charcoal-600 leading-snug cursor-pointer select-none">
                              Tôi đã đọc kỹ và đồng ý với toàn bộ các điều khoản dịch vụ mà PGS Agency công bố ở trên.
                            </label>
                          </div>

                          <button
                            type="submit"
                            disabled={!formData.accept}
                            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                              formData.accept 
                                ? 'bg-gold-500 hover:bg-gold-600 text-white cursor-pointer hover:shadow-lg' 
                                : 'bg-charcoal-300 text-charcoal-500 cursor-not-allowed'
                            }`}
                          >
                            Gửi yêu cầu thắc mắc điều khoản
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* VIEW 2: HANDOFF TECHNICAL SPECIFICATION   */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          {viewMode === 'handoff' && (
            <motion.div
              key="handoff-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16"
            >
              
              {/* PAGE MAIN META */}
              <div className="bg-white p-8 rounded-3xl border border-charcoal-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-100 pb-5">
                  <div>
                    <span className="text-[10px] font-mono bg-gold-100 text-gold-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Handoff Document</span>
                    <h2 className="font-display text-2xl font-bold text-charcoal-900 mt-1">Hồ sơ thiết kế chi tiết - Trang Điều khoản dịch vụ</h2>
                  </div>
                  <div className="text-xs text-charcoal-400 font-mono">
                    Mã tài liệu: <strong>SPEC-PGS-TOS-2026</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs leading-relaxed">
                  <div className="p-4 bg-charcoal-50 rounded-xl">
                    <div className="font-bold text-charcoal-700 uppercase font-mono text-[10px] tracking-wider mb-1">Tên trang</div>
                    <div className="text-charcoal-800 font-semibold">Điều khoản dịch vụ (Terms of Service)</div>
                  </div>
                  <div className="p-4 bg-charcoal-50 rounded-xl">
                    <div className="font-bold text-charcoal-700 uppercase font-mono text-[10px] tracking-wider mb-1">URL bàn giao</div>
                    <div className="text-gold-600 font-mono font-semibold">/dieu-khoan-dich-vu/</div>
                  </div>
                  <div className="p-4 bg-charcoal-50 rounded-xl">
                    <div className="font-bold text-charcoal-700 uppercase font-mono text-[10px] tracking-wider mb-1">Search Intent chính</div>
                    <div className="text-charcoal-800">Điều khoản dịch vụ PGS Agency, quy định dịch vụ marketing</div>
                  </div>
                  <div className="p-4 bg-charcoal-50 rounded-xl">
                    <div className="font-bold text-charcoal-700 uppercase font-mono text-[10px] tracking-wider mb-1">Mục tiêu trang</div>
                    <div className="text-charcoal-800">Làm rõ phạm vi, trách nhiệm, quy trình, nghiệm thu, tránh hiểu nhầm.</div>
                  </div>
                </div>

                <div className="p-4 bg-gold-50 rounded-xl border border-gold-200 text-xs text-gold-900">
                  <strong>Khái niệm thiết kế riêng (UI Concept):</strong> <em>Service Agreement Page</em> – trang điều khoản mang phong cách Light Premium Consulting sáng sủa, thoáng đãng, dễ đọc, đáng tin cậy. Kết hợp tinh giản phong chữ để tối đa hóa tính trực quan, tăng độ tin cậy về mặt EEAT cho robot tìm kiếm AI.
                </div>
              </div>

              {/* SECTION: MARKETING SEO SPECIFICATIONS */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-gold-500 rounded-full" />
                  <h3 className="font-display text-xl font-bold text-charcoal-900">1. Cấu hình SEO & EEAT (AI Search Engine Optimization)</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
                      <h4 className="font-display font-semibold text-charcoal-900 text-sm border-b border-charcoal-100 pb-2">Meta Tags Bàn giao</h4>
                      
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-charcoal-600 uppercase font-mono text-[10px]">Meta Title</span>
                            <button 
                              onClick={() => handleCopy('Điều khoản dịch vụ | PGS Agency - Hệ thống Marketing tăng trưởng', 'meta-title')}
                              className="text-gold-600 hover:text-gold-700"
                            >
                              {copiedText === 'meta-title' ? 'Đã copy!' : 'Copy'}
                            </button>
                          </div>
                          <div className="p-2.5 bg-charcoal-50 rounded border border-charcoal-200 text-charcoal-800 font-mono">
                            Điều khoản dịch vụ | PGS Agency - Hệ thống Marketing tăng trưởng
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-charcoal-600 uppercase font-mono text-[10px]">Meta Description</span>
                            <button 
                              onClick={() => handleCopy('Xem chi tiết điều khoản dịch vụ của PGS Agency. Cam kết minh bạch, quy trình làm việc chuyên nghiệp, rõ ràng trách nhiệm hai bên nhằm tối ưu hóa hiệu quả.', 'meta-desc')}
                              className="text-gold-600 hover:text-gold-700"
                            >
                              {copiedText === 'meta-desc' ? 'Đã copy!' : 'Copy'}
                            </button>
                          </div>
                          <div className="p-2.5 bg-charcoal-50 rounded border border-charcoal-200 text-charcoal-800 leading-relaxed">
                            Xem chi tiết điều khoản dịch vụ của PGS Agency. Cam kết minh bạch, quy trình làm việc chuyên nghiệp, rõ ràng trách nhiệm hai bên nhằm tối ưu hóa hiệu quả.
                          </div>
                        </div>

                        <div>
                          <span className="font-bold text-charcoal-600 uppercase font-mono text-[10px] block mb-1">H1 Heading</span>
                          <div className="p-2.5 bg-charcoal-50 rounded border border-charcoal-200 text-charcoal-800 font-semibold font-display">
                            Điều khoản dịch vụ
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
                      <h4 className="font-display font-semibold text-charcoal-900 text-sm border-b border-charcoal-100 pb-2">Đường dẫn liên kết nội bộ (Internal Links)</h4>
                      
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                          <strong>Internal Link Đi (Outgoing):</strong>
                          <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li><code className="bg-white px-1">/lien-he/</code> trong biểu mẫu hỗ trợ và thông tin cuối trang</li>
                            <li><code className="bg-white px-1">/dich-vu-seo/</code> trong phần mô tả chi tiết phạm vi dịch vụ SEO</li>
                            <li><code className="bg-white px-1">/thiet-ke-website/</code> trong phần tối ưu website</li>
                          </ul>
                        </div>

                        <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                          <strong>Internal Link Nhận (Incoming):</strong>
                          <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li>Từ menu chân trang (Footer Navigation) của toàn bộ các trang con khác</li>
                            <li>Từ trang liên hệ và trang báo giá chính của dự án</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CODE SCHEMA MARKUP */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-gold-500 rounded-full" />
                    <h3 className="font-display text-xl font-bold text-charcoal-900">2. Schema Structured Data Đề xuất (JSON-LD)</h3>
                  </div>
                  <button 
                    onClick={() => handleCopy(schemaCode, 'schema')}
                    className="bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 px-3 py-1 rounded text-xs font-mono font-bold border border-charcoal-300 flex items-center gap-1 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === 'schema' ? 'Đã sao chép!' : 'Sao chép JSON-LD'}
                  </button>
                </div>

                <div className="bg-charcoal-900 text-charcoal-200 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                  <pre>{schemaCode}</pre>
                </div>
              </div>

              {/* THREE SPEC CHECKLISTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* DESIGNER CHECKLIST */}
                <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-charcoal-100 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">D</div>
                    <div>
                      <h4 className="font-display font-semibold text-charcoal-900 text-sm">Checklist Cho Designer</h4>
                      <p className="text-[9px] text-charcoal-400 font-mono uppercase">User Interface & Layout</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-charcoal-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Duy trì tỷ lệ khoảng trắng (negative space) rộng để giảm tải mật độ chữ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Thiết kế Hero với Object 3D mang phong cách White Glass/Translucent Gold.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Xác định rõ ràng mã màu vàng gold nhấn đạt độ tương phản tối ưu trên nền sáng.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Sử dụng icon tối giản chuẩn Lucide để người đọc dễ scan từng mốc điều khoản.</span>
                    </li>
                  </ul>
                </div>

                {/* DEVELOPER CHECKLIST */}
                <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-charcoal-100 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">V</div>
                    <div>
                      <h4 className="font-display font-semibold text-charcoal-900 text-sm">Checklist Cho Developer</h4>
                      <p className="text-[9px] text-charcoal-400 font-mono uppercase">Technical Implementation</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-charcoal-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Sử dụng Framer Motion cho hiệu ứng Floating elements và Document Reveal nhẹ nhàng.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Thiết lập Accordion phần phát sinh mượt mà để không làm dịch chuyển bố cục bất thình lình.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Kiểm tra tính phản hồi (responsive) của bảng so sánh và checklist trên màn hình mobile.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Đảm bảo tích hợp đầy đủ thuộc tính <code className="bg-charcoal-100 px-1 font-mono text-[10px]">id</code> cho việc nhảy mốc (Anchor Link) điều khoản nhanh.</span>
                    </li>
                  </ul>
                </div>

                {/* CONTENT SEO CHECKLIST */}
                <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-charcoal-100 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">S</div>
                    <div>
                      <h4 className="font-display font-semibold text-charcoal-900 text-sm">Checklist Cho Content SEO</h4>
                      <p className="text-[9px] text-charcoal-400 font-mono uppercase">EEAT & Conversion Copywriting</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-charcoal-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Mô tả trực diện định nghĩa điều khoản ngay từ 2 dòng đầu tiên (Tối ưu AI Search AI Overviews).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Sử dụng đúng tệp từ ngữ trung thực, rõ ràng trách nhiệm hai bên để nâng tầm uy tín dịch vụ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Tích hợp bảng cảnh báo minh bạch cam kết kết quả khách quan, chuẩn xác theo thuật toán quốc tế.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">☐</span>
                      <span>Đảm bảo không copy sáo rỗng các mẫu điều khoản cũ, cá nhân hóa theo đúng đặc thù PGS Agency.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER AREA WITH CREDENTIALS & INFO */}
      

    </div>
  );
}
