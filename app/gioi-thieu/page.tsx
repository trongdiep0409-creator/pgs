'use client';
import React, { useState } from 'react';
import { 
  Share2, 
  Globe, 
  TrendingDown, 
  PenTool, 
  Hash, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Cpu, 
  BarChart2, 
  HeartHandshake, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  Activity, 
  FileCode, 
  Info,
  ExternalLink,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom modular component imports
import { GrowthFormModal } from '@/components/GrowthFormModal';
import { FAQSection } from '@/components/FAQSection';
import { 
  Hero3DVisual, 
  ServiceOrbit3D, 
  ProcessPipeline, 
  Card3DTilt, 
  IconRenderer 
} from '@/components/ThreeDVisuals';

// Data imports
import { 
  PAIN_POINTS, 
  TIMELINE_MILESTONES, 
  COMPARISON_ROWS, 
  ORBIT_NODES, 
  CORE_VALUES, 
  PROCESS_STEPS, 
  TEAM_EXPERTS, 
  FAQ_ITEMS,
  SYSTEM_SCHEMA 
} from '@/data/aboutData';

export default function App() {
  // Global modal triggers for CRO lead capture
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [activeOrbitNode, setActiveOrbitNode] = useState(ORBIT_NODES[0]);
  
  // States for SEO copy clipboard status
  const [copiedText, setCopiedText] = useState<'title' | 'desc' | 'schema' | null>(null);

  // States for interactive checklists (CRO/Audit/Deliverables engagement)
  const [checkedDesigner, setCheckedDesigner] = useState<Record<number, boolean>>({});
  const [checkedDeveloper, setCheckedDeveloper] = useState<Record<number, boolean>>({});
  const [checkedContent, setCheckedContent] = useState<Record<number, boolean>>({});

  const handleCopy = (text: string, type: 'title' | 'desc' | 'schema') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleOpenAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  const toggleCheckbox = (category: 'designer' | 'developer' | 'content', index: number) => {
    if (category === 'designer') {
      setCheckedDesigner(prev => ({ ...prev, [index]: !prev[index] }));
    } else if (category === 'developer') {
      setCheckedDeveloper(prev => ({ ...prev, [index]: !prev[index] }));
    } else {
      setCheckedContent(prev => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-charcoal-800 selection:bg-gold-100 selection:text-gold-900 overflow-x-hidden antialiased">
      
      {/* Premium Navigation Header */}
      

      {/* 1. Breadcrumb + Header giới thiệu */}
      <section className="bg-white pt-6 pb-2 border-b border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-charcoal-400">
            <a href="#" className="hover:text-gold-500 transition-colors">Trang chủ</a>
            <ChevronRight className="w-3 h-3 text-gold-300" />
            <span className="text-gold-600 font-semibold">Giới thiệu PGS Agency</span>
          </nav>
        </div>
      </section>

      {/* 2. Hero Giới thiệu */}
      <section id="gioi-thieu" className="relative py-12 md:py-20 bg-gradient-to-b from-white to-stone-50 overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(#e2d3b2_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy & CTAs Column */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span className="text-[10px] md:text-xs font-mono font-bold text-gold-700 uppercase tracking-wider">
                  ĐỐI TÁC TĂNG TRƯỞNG SỐ TOÀN DIỆN
                </span>
              </div>

              {/* H1 Primary Header */}
              <h1 className="text-3xl md:text-5xl font-display font-bold text-stone-950 leading-[1.15] tracking-tight">
                PGS Agency – Đối tác xây dựng hệ thống <span className="text-gold-600 relative inline-block">Marketing tổng thể<span className="absolute left-0 bottom-1 w-full h-1 bg-gold-200/60 -z-10" /></span> lấy hiệu quả kinh doanh làm trọng tâm.
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl">
                Chúng tôi không cung cấp những gói Marketing chắp vá hay chạy quảng cáo tăng tương tác ảo. PGS Agency đồng hành thiết kế, vận hành và tối ưu hóa hệ thống tăng trưởng số đa kênh tích hợp — giúp doanh nghiệp của bạn tăng Lead chất lượng, tối ưu hóa chi phí quảng cáo thực tế và bứt phá doanh thu bền vững.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleOpenAuditModal}
                  className="bg-stone-950 text-white font-semibold rounded-xl text-sm px-6 py-3.5 hover:bg-stone-900 border border-stone-950 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Trao đổi chiến lược với PGS</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a
                  href="#he-sinh-thai"
                  className="bg-white hover:bg-stone-50 text-stone-950 border border-stone-200 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Xem hệ sinh thái dịch vụ</span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </a>
              </div>

              {/* Subtle Trust Badges below Hero */}
              <div className="pt-6 border-t border-gold-100 flex flex-wrap items-center gap-6 text-xs text-stone-600 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Dữ Liệu Minh Bạch 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Cam Kết Lead & CRO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Sở Hữu Trọn Đời Tài Khoản</span>
                </div>
              </div>

            </div>

            {/* 3D Visual Column */}
            <div className="lg:col-span-5 relative">
              <Hero3DVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 3. PGS ra đời để giải quyết vấn đề gì */}
      <section className="py-20 bg-white border-y border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Thực Trạng Doanh Nghiệp Việt Nam
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Có phải doanh nghiệp của bạn đang lãng phí hàng trăm triệu vì các lỗi Marketing kinh điển?
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Phần lớn doanh nghiệp SME gặp thất bại trong việc tăng trưởng số không phải vì sản phẩm tệ, mà bởi vì các mắt xích Marketing vận hành hoàn toàn rời rạc và thiếu sự theo dõi chặt chẽ bằng dữ liệu.
            </p>
          </div>

          {/* 6 Pain Cards - 3D Wall styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PAIN_POINTS.map((pain) => (
              <Card3DTilt 
                key={pain.id}
                className="bg-charcoal-50/50 hover:bg-white p-6 md:p-8 rounded-2xl border border-charcoal-150 hover:border-gold-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-lg transition-all relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200/50 flex items-center justify-center">
                    <IconRenderer name={pain.iconName} className="w-5 h-5 text-gold-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-display font-semibold text-charcoal-900 tracking-tight leading-snug">
                    {pain.title}
                  </h3>
                  <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
                    {pain.desc}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-dashed border-gold-200/40 text-xs text-gold-700 italic font-medium">
                  {pain.consequence}
                </div>
              </Card3DTilt>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleOpenAuditModal}
              className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-white font-semibold text-xs md:text-sm rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Bạn nghi ngờ hệ thống cũ đang rò rỉ chi phí? Hãy để PGS Audit miễn phí</span>
              <ArrowRight className="w-4 h-4 text-gold-500" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Triết lý hoạt động */}
      <section className="py-20 bg-gradient-to-r from-gold-50/50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gold-200 p-8 md:p-14 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-gold-500" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Main quote area */}
              <div className="lg:col-span-8 space-y-6">
                <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest block">
                  TRIẾT LÝ SỐNG CỦA PGS AGENCY
                </span>
                
                {/* Big Quote */}
                <blockquote className="text-xl md:text-3xl font-display font-bold text-charcoal-900 leading-tight italic">
                  “Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi.”
                </blockquote>
                
                <p className="text-xs md:text-sm text-charcoal-600 leading-relaxed">
                  Chúng tôi tin rằng: Marketing không phải là một khoản chi phí tiêu hao, mà là một khoản đầu tư sinh lời có hệ thống. PGS Agency không nhận dự án để hoàn thành các KPI bề nổi như lượt thích, lượt tiếp cận ảo. Chúng tôi đo lường thành công của mình bằng lượng Lead thực chất, Doanh thu thực tế và Chi phí tối ưu nhất trên từng chuyển đổi của đối tác.
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-300 bg-gold-50 flex items-center justify-center text-gold-700 font-bold text-sm">
                    CEO
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-charcoal-900">Phùng Quốc Bảo</h5>
                    <p className="text-[10px] font-mono text-charcoal-400">FOUNDER & CEO PGS AGENCY</p>
                  </div>
                </div>
              </div>

              {/* Graphic stats */}
              <div className="lg:col-span-4 p-6 bg-gold-50/70 border border-gold-200/50 rounded-2xl text-center space-y-4">
                <p className="text-xs font-mono font-semibold text-gold-700 uppercase tracking-wider">
                  THƯỚC ĐO HIỆU QUẢ CỦA PGS
                </p>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-display font-extrabold text-charcoal-900">
                    100%
                  </p>
                  <p className="text-xs text-charcoal-600 font-medium">
                    Ngân sách được quản trị minh bạch bởi chính tài khoản của khách hàng.
                  </p>
                </div>
                <div className="border-t border-gold-200/50 pt-3">
                  <p className="text-sm font-mono text-gold-700 font-bold">
                    ROI THỰC CHẤT &gt; SỐ ẢO
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Hành trình phát triển */}
      <section className="py-20 bg-white border-b border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Hành Trình Kiến Tạo
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Lịch sử phát triển & Định hướng PGS Agency
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Đi lên từ thực chiến bán hàng trực tuyến, PGS thấu hiểu từng giọt nước mắt của chủ doanh nghiệp khi đổ ngân sách vào quảng cáo mà không mang lại doanh số.
            </p>
          </div>

          {/* Timeline Milestones layout */}
          <div className="relative border-l border-gold-300 max-w-4xl mx-auto pl-6 md:pl-10 space-y-12">
            {TIMELINE_MILESTONES.map((milestone, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Bullet Dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 md:w-6 md:h-6 rounded-full bg-white border-2 border-gold-500 flex items-center justify-center group-hover:bg-gold-500 transition-colors shadow">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold-500 rounded-full group-hover:bg-white" />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-lg md:text-2xl font-display font-extrabold text-gold-600 font-mono">
                      {milestone.year}
                    </span>
                    <span className="text-xs font-mono text-charcoal-400 bg-charcoal-100 px-2 py-0.5 rounded uppercase font-medium">
                      {milestone.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-display font-bold text-charcoal-950">
                    {milestone.title}
                  </h3>

                  <p className="text-xs md:text-sm text-charcoal-600 leading-relaxed max-w-3xl">
                    {milestone.description}
                  </p>

                  <div className="bg-gold-50/50 border border-gold-150 rounded-xl p-4 mt-3 max-w-2xl">
                    <p className="text-xs font-mono font-bold text-gold-700 uppercase tracking-wider mb-2">
                      Thành quả tiêu biểu:
                    </p>
                    <ul className="space-y-1.5">
                      {milestone.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs text-charcoal-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PGS khác agency thông thường thế nào */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Khác Biệt Thực Chất
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Bảng so sánh: Agency Làm Task Rời Rạc vs PGS Xây Hệ Thống Tăng Trưởng
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Hãy so sánh để thấy lý do hàng loạt doanh nghiệp SME chuyển từ thuê freelancer và các bên dịch vụ lẻ tẻ sang đồng hành cùng PGS Agency.
            </p>
          </div>

          {/* Table Comparison Board */}
          <div className="bg-white border border-gold-200 rounded-3xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-900 text-white text-xs font-mono uppercase tracking-wider">
                    <th className="p-4 md:p-6 w-1/4">Tiêu Chí So Sánh</th>
                    <th className="p-4 md:p-6 w-3/8 text-charcoal-400">Agency Làm Task Rời Rạc (Outsource thông thường)</th>
                    <th className="p-4 md:p-6 w-3/8 text-gold-400 bg-charcoal-950 border-l border-gold-900">PGS Growth System (Hệ thống PGS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-100 text-xs md:text-sm">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gold-50/20 transition-colors">
                      {/* Criteria */}
                      <td className="p-4 md:p-6 font-semibold text-charcoal-900 border-b border-gold-100">
                        {row.criteria}
                      </td>
                      
                      {/* Traditional */}
                      <td className="p-4 md:p-6 text-charcoal-500 border-b border-gold-100 italic">
                        {row.traditionalAgency.text}
                      </td>
                      
                      {/* PGS Agency */}
                      <td className="p-4 md:p-6 text-charcoal-900 bg-gold-50/30 border-l border-gold-200/50 border-b font-medium">
                        {row.pgsAgency.badge && (
                          <span className="inline-block text-[9px] font-mono font-bold text-gold-700 bg-gold-100 border border-gold-200 px-2 py-0.5 rounded mb-2 uppercase">
                            {row.pgsAgency.badge}
                          </span>
                        )}
                        <p className="text-charcoal-900 leading-relaxed">
                          {row.pgsAgency.text}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 bg-white border border-gold-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-gold-500 shrink-0" />
              <p className="text-xs text-charcoal-600">
                <strong>Cam kết minh bạch:</strong> PGS không thu phí gián tiếp qua tài khoản trung gian. Bạn nạp tiền quảng cáo trực tiếp từ thẻ của bạn, PGS hỗ trợ giám sát tối ưu và lấy công làm mục tiêu thúc đẩy.
              </p>
            </div>
            <button
              onClick={handleOpenAuditModal}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg border border-gold-400 shrink-0 transition-colors cursor-pointer"
            >
              Xem Demo Dashboard của PGS
            </button>
          </div>

        </div>
      </section>

      {/* 7. Hệ sinh thái năng lực */}
      <section id="he-sinh-thai" className="py-20 bg-white border-y border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Hệ Sinh Thái Toàn Diện
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Năng lực chuyên môn tích hợp của PGS Agency
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Chúng tôi sở hữu đội ngũ chuyên môn hóa cao bám sát 7 trụ cột cốt lõi của hệ thống marketing chuyển đổi số, đảm bảo không có vết đứt gãy nào trong luồng trải nghiệm khách hàng.
            </p>
          </div>

          {/* Interactive Circle Orbit Showcase */}
          <ServiceOrbit3D 
            nodes={ORBIT_NODES} 
            activeNode={activeOrbitNode} 
            setActiveNode={setActiveOrbitNode} 
          />

        </div>
      </section>

      {/* 8. Giá trị cốt lõi */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Hệ Giá Trị Cốt Lõi
                </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              5 Nguyên Tắc Bất Di Bất Dịch Tại PGS Agency
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Những chuẩn mực đạo đức và cam kết hiệu suất giúp chúng tôi luôn kiên trì bảo vệ lợi ích thực tế của khách hàng trong suốt thời gian đồng hành.
            </p>
          </div>

          {/* Value cards with 3D tilt effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CORE_VALUES.map((value, vIdx) => (
              <Card3DTilt
                key={value.id}
                className="bg-white border border-gold-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gold-500 font-bold uppercase tracking-wider">
                      {value.englishTitle}
                    </span>
                    <span className="text-xs font-mono font-bold text-gold-300">
                      0{vIdx + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-display font-bold text-charcoal-900">
                    {value.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-100">
                  <p className="text-[11px] text-charcoal-700 font-medium italic">
                    Tuyên ngôn PGS: "{value.manifesto}"
                  </p>
                </div>
              </Card3DTilt>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Quy trình đồng hành */}
      <section id="quy-trinh" className="py-20 bg-white border-y border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Quy Trình Khoa Học
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Chi tiết quy trình đồng hành bứt phá tăng trưởng số
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Mọi bước đi đều được PGS thiết kế bài bản, có số liệu minh chứng, thời gian bàn giao rõ ràng để loại bỏ hoàn toàn các rủi ro vận hành.
            </p>
          </div>

          {/* Stepper progress view */}
          <ProcessPipeline steps={PROCESS_STEPS} />

        </div>
      </section>

      {/* 10. Đội ngũ & chuyên môn */}
      <section id="doi-ngu" className="py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
              Hệ Thống Nhân Sự Cao Cấp
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
              Đội ngũ chuyên gia chuyên môn hóa từng vị trí của PGS
            </h2>
            <p className="text-xs md:text-sm text-charcoal-500 leading-relaxed">
              Tại PGS, mỗi nhân sự là một chuyên gia thực chiến tối thiểu 5 năm kinh nghiệm. Chúng tôi không giao dự án của bạn cho thực tập sinh hay nhân viên tập sự tự quản lý.
            </p>
          </div>

          {/* Grid of Expert Role Cards with hover specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_EXPERTS.map((expert) => (
              <div 
                key={expert.id}
                className="bg-white border border-gold-100 rounded-2xl p-5 hover:border-gold-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                      {expert.role}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-charcoal-900 font-display">
                      {expert.expertName}
                    </h3>
                    <p className="text-[10.5px] text-charcoal-500 font-medium font-mono leading-tight mt-0.5">
                      {expert.vietnameseTitle}
                    </p>
                    <p className="text-[10px] text-gold-700 font-medium italic mt-1">
                      {expert.experience}
                    </p>
                  </div>

                  <p className="text-xs text-charcoal-600 leading-relaxed pt-2 border-t border-gold-50">
                    {expert.description}
                  </p>
                </div>

                <div className="mt-5 space-y-3 pt-3 border-t border-dashed border-gold-100 bg-gold-50/20 p-2.5 rounded-lg">
                  <div className="flex items-center justify-between text-left">
                    <span className="text-[9px] font-mono text-charcoal-400 uppercase">Chỉ số cam kết:</span>
                    <span className="text-sm font-bold text-charcoal-900 font-mono text-right">{expert.keyMetric}</span>
                  </div>
                  <p className="text-[10px] text-charcoal-600 leading-none text-right font-medium">
                    {expert.metricLabel}
                  </p>
                  
                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {expert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[8.5px] font-mono text-charcoal-600 bg-white border border-charcoal-200 px-1.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-charcoal-500">
              Bạn muốn tìm hiểu chi tiết về từng thành viên? Truy cập trang chi tiết tại: <a href="#doi-ngu" className="text-gold-600 hover:underline font-semibold">/gioi-thieu/doi-ngu-chuyen-gia/</a>
            </p>
          </div>

        </div>
      </section>

      {/* 11. CEO/Founder Section */}
      <section id="ceo-section" className="py-20 bg-white border-b border-gold-100 relative">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gold-50/30 -z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CEO Avatar 3D Mockup Card */}
            <div className="lg:col-span-4 flex justify-center">
              <Card3DTilt className="relative bg-[#1D1C21] text-white p-8 rounded-3xl border border-gold-500/30 max-w-sm overflow-hidden shadow-2xl">
                {/* Visual Glass highlights */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl" />
                
                <div className="space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 text-[9px] font-mono">
                    <Award className="w-3.5 h-3.5" />
                    <span>8+ Years Growth Hacker</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-mono text-gold-400">FOUNDER & CEO</p>
                    <h3 className="text-2xl font-display font-bold text-white">Phùng Quốc Bảo</h3>
                    <p className="text-xs text-charcoal-400 italic">"Xây hệ thống bền vững để nâng cao giá trị thực trị thương hiệu Việt"</p>
                  </div>

                  <div className="pt-4 border-t border-charcoal-800 space-y-3 text-xs text-charcoal-300 font-sans">
                    <div className="flex items-center justify-between">
                      <span>Dự án thực tế:</span>
                      <strong className="text-white">150+ SME</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ngân sách tối ưu:</span>
                      <strong className="text-gold-400">&gt; 50 tỷ VNĐ</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phương châm chính:</span>
                      <strong className="text-white">No Lead, No Fee</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-charcoal-900 rounded-xl border border-charcoal-800 text-[10px] text-charcoal-400 leading-relaxed font-mono">
                    Cựu kỹ sư lập trình, chuyên sâu phễu chuyển đổi CRO & thiết kế hệ thống dữ liệu tự động GA4/GTM.
                  </div>
                </div>

                {/* Grid decorative overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(194,139,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(194,139,36,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              </Card3DTilt>
            </div>

            {/* CEO Narrative bio copy */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
                Nhà Sáng Lập PGS
              </span>
              
              <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
                Gặp gỡ CEO Phùng Quốc Bảo - Người định hình tư duy "Marketing Hệ Thống"
              </h2>

              <p className="text-xs md:text-sm text-charcoal-600 leading-relaxed">
                Khởi đầu là một kỹ sư phát triển phần mềm bận rộn với thuật toán và dữ liệu, ông <strong>Phùng Quốc Bảo</strong> nhận thấy khoảng cách cực kỳ lớn giữa các lập trình viên làm Website và những chuyên viên chạy quảng cáo. Người làm web thì không hiểu về CRO thu lead; người chạy ads thì không thể chỉnh sửa web để tối ưu điểm chất lượng; còn người làm content thì viết bài theo bản năng.
              </p>

              <blockquote className="p-4 bg-gold-50 border-l-4 border-gold-500 rounded-r-xl text-xs md:text-sm font-medium text-charcoal-800 italic leading-relaxed">
                "Tôi thành lập PGS Agency không phải để tạo thêm một đơn vị chạy quảng cáo thông thường. PGS ra đời để tái cấu trúc lại toàn bộ các kênh Digital của doanh nghiệp thành một thực thể chuyển đổi tự động hóa thống nhất. Chúng tôi chịu trách nhiệm toàn vẹn từ hạ tầng kĩ thuật đến chiến lược kinh doanh."
              </blockquote>

              <p className="text-xs text-charcoal-500 leading-relaxed">
                Dưới sự chèo lái của CEO Phùng Quốc Bảo, PGS Agency đã xây dựng bộ tài liệu chuẩn hóa gồm 300+ chỉ mục tối ưu, chuyển giao thành công cho hơn 150 doanh nghiệp SME thuộc các ngành Giáo dục, Nội thất, Bán lẻ và Bất động sản tại Việt Nam.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={handleOpenAuditModal}
                  className="px-5 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs rounded-xl shadow transition-colors border border-gold-400 cursor-pointer"
                >
                  Đặt lịch trao đổi trực tiếp với CEO
                </button>
                <a
                  href="#ceo-section"
                  className="px-5 py-3 border border-gold-300 text-xs font-semibold text-charcoal-700 rounded-xl hover:bg-gold-50 transition-colors flex items-center gap-1.5"
                >
                  <span>Tìm hiểu hành trình của CEO tại /ceo-phung-quoc-bao/</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-500" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 12. Trust signals cần bổ sung */}
      <section className="py-20 bg-[#FAF9F5] border-b border-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-gold-200/80 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-gold-100 text-gold-800 text-[10px] font-mono font-bold uppercase rounded-bl-xl border-l border-b border-gold-200">
              Chờ Bổ Sung Thực Tế
            </div>

            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center gap-2 text-gold-600">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <h3 className="text-lg md:text-xl font-display font-bold text-charcoal-900">
                  Trust Signals - Hồ sơ năng lực & Xác minh pháp nhân chính thức
                </h3>
              </div>

              <p className="text-xs md:text-sm text-charcoal-500 italic">
                [Lưu ý: Dưới đây là các đầu mục tài liệu, giấy chứng nhận thực tế của PGS Agency đang trong quá trình bổ sung tệp file thật và chuẩn hóa dữ liệu lưu trữ trực tuyến để đảm bảo EEAT tuyệt đối của Google Search]
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                
                <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-2">
                  <span className="text-[10px] font-mono text-gold-600 font-bold block">01 / CHỨNG CHỈ GOOGLE PARTNER</span>
                  <p className="text-xs font-semibold text-charcoal-900">Google Ads Search & Measurement Certification</p>
                  <p className="text-[10px] text-charcoal-400">[Cần bổ sung mã số đối tác thực tế từ tài khoản MCC Google Ads]</p>
                </div>

                <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-2">
                  <span className="text-[10px] font-mono text-gold-600 font-bold block">02 / CHỨNG CHỈ META AGENCY</span>
                  <p className="text-xs font-semibold text-charcoal-900">Meta Certified Creative & Buying Professional</p>
                  <p className="text-[10px] text-charcoal-400">[Cần bổ sung mã số Partner của Business Manager sở hữu PGS]</p>
                </div>

                <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-2">
                  <span className="text-[10px] font-mono text-gold-600 font-bold block">03 / KHÁCH HÀNG & CASE STUDY</span>
                  <p className="text-xs font-semibold text-charcoal-900">Danh sách 150+ doanh nghiệp đã chuyển giao hệ thống</p>
                  <p className="text-[10px] text-charcoal-400">[Đang xử lý xin phép bảo mật thông tin doanh số với khách hàng]</p>
                </div>

                <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-2">
                  <span className="text-[10px] font-mono text-gold-600 font-bold block">04 / HÌNH ẢNH VĂN PHÒNG</span>
                  <p className="text-xs font-semibold text-charcoal-900">Ảnh thực tế hoạt động và đội ngũ PGS tại Cầu Giấy, HN</p>
                  <p className="text-[10px] text-charcoal-400">[Chờ bộ phận Media bàn giao gói ảnh đã chỉnh sửa hậu kỳ]</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 13. FAQ + CTA cuối trang */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* FAQ Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-50 border border-gold-100 px-3 py-1 rounded-full">
                  Giải Đáp Thắc Mắc FAQ
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900 tracking-tight">
                  Khách hàng thường hỏi gì về Hệ thống PGS?
                </h2>
                <p className="text-xs md:text-sm text-charcoal-500">
                  Nếu bạn vẫn băn khoăn về quy chế vận hành hoặc khả năng tương thích của PGS Agency đối với mô hình kinh doanh đặc thù của bạn, hãy xem qua các câu trả lời chi tiết bên dưới.
                </p>
              </div>

              {/* Accordion list */}
              <FAQSection items={FAQ_ITEMS} />
            </div>

            {/* Bottom CTA Right Column */}
            <div id="leads-form" className="lg:col-span-5 bg-[#121214] text-white p-8 md:p-10 rounded-3xl border border-gold-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider block">
                  Đăng ký Nhận Tư Vấn Chuyên Sâu
                </span>
                
                <h3 className="text-2xl font-display font-bold text-white tracking-tight leading-tight">
                  Doanh nghiệp của bạn cần một chiến dịch rời rạc hay một Hệ thống tăng trưởng bền vững?
                </h3>
                
                <p className="text-xs text-charcoal-400 leading-relaxed">
                  Hãy điền nhanh thông tin liên hệ. Đội ngũ PGS sẽ cử chuyên viên tư vấn cao cấp liên hệ khảo sát thực tế và lên báo cáo Audit sơ bộ miễn phí cho doanh nghiệp của bạn trong vòng 24 giờ.
                </p>

                {/* Inline form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOpenAuditModal();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="Số điện thoại của bạn *"
                      className="w-full text-xs px-4 py-3.5 rounded-xl border border-charcoal-800 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-850 text-white placeholder-charcoal-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-gold-400 shadow"
                  >
                    <Sparkles className="w-4 h-4 animate-spin text-charcoal-950" />
                    Đăng Ký Đặt Lịch Hẹn Ngay
                  </button>
                </form>

                <div className="pt-4 border-t border-charcoal-800 text-[10px] text-charcoal-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>PGS Cam kết bảo mật thông tin & Nói không với Spam số điện thoại.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SPECIAL DELIVERY DOCUMENTATION SECTION FOR SEARCH ENGINES & DESIGNERS */}
      <section className="py-16 bg-charcoal-50 border-t border-gold-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="border-b border-gold-200/60 pb-6">
            <div className="flex items-center gap-2 text-gold-600 mb-2">
              <Terminal className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">
                PGS Delivery Documentation & Audit Checklist
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-charcoal-900">
              Tài Liệu Chuyển Giao: SEO, UI/UX Designer & Developer Checklists
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Trang web này được tối ưu hóa toàn diện cho SEO, EEAT và thuật toán AI Search (Gemini, Copilot, Search Generative Experience). Dưới đây là thông số kỹ thuật bàn giao của PGS.
            </p>
          </div>

          {/* Interactive Meta & Schema Copy Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Meta Specifications Box */}
            <div className="bg-white rounded-2xl border border-gold-200 p-6 space-y-4">
              <h4 className="text-sm font-mono font-bold text-gold-700 uppercase tracking-wider flex items-center justify-between">
                <span>Thông Số Meta SEO & Headings</span>
                <span className="text-[10px] text-charcoal-400 lowercase font-normal">Copy-paste an toàn</span>
              </h4>

              <div className="space-y-3.5 text-xs">
                
                {/* Meta Title */}
                <div className="p-3.5 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <strong className="text-charcoal-800 font-mono text-[10px] uppercase">Meta Title (SEO):</strong>
                    <button
                      onClick={() => handleCopy("PGS Agency - Đối tác xây dựng hệ thống Marketing tổng thể hiệu quả", 'title')}
                      className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1 cursor-pointer scale-90"
                    >
                      {copiedText === 'title' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'title' ? 'Đã copy' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-charcoal-700 font-medium">
                    PGS Agency - Đối tác xây dựng hệ thống Marketing tổng thể hiệu quả
                  </p>
                </div>

                {/* Meta Description */}
                <div className="p-3.5 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <strong className="text-charcoal-800 font-mono text-[10px] uppercase">Meta Description:</strong>
                    <button
                      onClick={() => handleCopy("PGS Agency thiết lập hệ thống marketing số đa nền tảng, tích hợp Web chuẩn CRO, SEO EEAT, Ads hiệu suất cao và tracking minh bạch dữ liệu.", 'desc')}
                      className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1 cursor-pointer scale-90"
                    >
                      {copiedText === 'desc' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'desc' ? 'Đã copy' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-charcoal-600 leading-relaxed">
                    PGS Agency thiết lập hệ thống marketing số đa nền tảng, tích hợp Web chuẩn CRO, SEO EEAT, Ads hiệu suất cao và tracking minh bạch dữ liệu giúp tối ưu doanh số SME bền vững.
                  </p>
                </div>

                {/* Primary Headings Audit */}
                <div className="p-3.5 bg-charcoal-50 rounded-xl border border-charcoal-200 space-y-1.5">
                  <strong className="text-charcoal-800 font-mono text-[10px] uppercase block">Heading Structure (SEO Audit):</strong>
                  <div className="space-y-1 font-mono text-[11px] text-charcoal-600">
                    <p className="text-charcoal-900 font-bold"><span className="text-gold-600">[H1]</span> PGS Agency – Đối tác xây dựng hệ thống Marketing tổng thể lấy hiệu quả kinh doanh làm trọng tâm.</p>
                    <p><span className="text-gold-600">[H2]</span> Có phải doanh nghiệp của bạn đang lãng phí hàng trăm triệu vì các lỗi Marketing kinh điển?</p>
                    <p><span className="text-gold-600">[H2]</span> Lịch sử phát triển & Định hướng PGS Agency</p>
                    <p><span className="text-gold-600">[H2]</span> Bảng so sánh: Agency Làm Task Rời Rạc vs PGS Xây Hệ Thống Tăng Trưởng</p>
                    <p><span className="text-gold-600">[H2]</span> Năng lực chuyên môn tích hợp của PGS Agency</p>
                    <p><span className="text-gold-600">[H2]</span> 5 Nguyên Tắc Bất Di Bất Dịch Tại PGS Agency</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Schema Structured Data Box */}
            <div className="bg-white rounded-2xl border border-gold-200 p-6 space-y-4">
              <h4 className="text-sm font-mono font-bold text-gold-700 uppercase tracking-wider flex items-center justify-between">
                <span>Schema JSON-LD Đề Xuất (AboutPage / Organization)</span>
                <button
                  onClick={() => handleCopy(JSON.stringify(SYSTEM_SCHEMA, null, 2), 'schema')}
                  className="text-gold-600 hover:text-gold-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === 'schema' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'schema' ? 'Đã copy toàn bộ Schema' : 'Copy'}</span>
                </button>
              </h4>

              <div className="bg-[#121214] text-green-400 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-[295px] border border-gold-900/40">
                <pre>{JSON.stringify(SYSTEM_SCHEMA, null, 2)}</pre>
              </div>
            </div>

          </div>

          {/* Interactive Checklists For Verification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Checklist 1: UI/UX Designer */}
            <div className="bg-white rounded-2xl border border-gold-200 p-5 space-y-4">
              <div className="flex items-center gap-2 text-gold-600 border-b border-gold-100 pb-2">
                <Info className="w-4 h-4" />
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                  UX/UI Designer Checklist
                </h5>
              </div>
              <p className="text-[11px] text-charcoal-500">Nhấp chọn để xác nhận khi duyệt layout thiết kế:</p>
              
              <ul className="space-y-2.5 text-xs">
                {[
                  "Tone chủ đạo là Light Premium Consulting (Nền sáng ngà #FAF9F5, viền vàng gold #c28b24).",
                  "Mật độ khoảng trắng (White-space) đạt tỉ lệ tối thiểu 35% giúp giao diện thoáng mát.",
                  "Sử dụng font chữ Space Grotesk cho headings và Inter cho đoạn văn chính xác.",
                  "Có visual 3D ở phần Hero hiển thị rõ mô hình đồng hành tích hợp của PGS.",
                  "Responsive Grid hiển thị gọn gàng từ Mobile-first đến màn hình Desktop siêu rộng."
                ].map((task, index) => {
                  const isChecked = !!checkedDesigner[index];
                  return (
                    <li 
                      key={index} 
                      onClick={() => toggleCheckbox('designer', index)}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        isChecked ? 'bg-gold-50/50 text-charcoal-400 line-through' : 'bg-charcoal-50 hover:bg-gold-50/20'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        className="mt-0.5 rounded text-gold-500 focus:ring-gold-500" 
                      />
                      <span>{task}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Checklist 2: Developer */}
            <div className="bg-white rounded-2xl border border-gold-200 p-5 space-y-4">
              <div className="flex items-center gap-2 text-gold-600 border-b border-gold-100 pb-2">
                <FileCode className="w-4 h-4" />
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                  Web Developer Checklist
                </h5>
              </div>
              <p className="text-[11px] text-charcoal-500">Nhấp chọn để kiểm tra chất lượng code và tương tác:</p>
              
              <ul className="space-y-2.5 text-xs">
                {[
                  "Ứng dụng chuyển động motion/react mượt mà tại timeline và quy trình tiến trình bứt phá.",
                  "Tích hợp phễu thu thập Lead (CRO) và mở modal Audit thành công tại các vị trí CTA.",
                  "Không sử dụng các thư viện hoạt họa quá nặng làm suy giảm điểm Lighthouse Mobile.",
                  "Đảm bảo website chuẩn hóa cấu trúc DOM, thuộc tính ID duy nhất cho các phần tử cốt lõi.",
                  "Tất cả các tệp hình ảnh SVG/Placeholder có referrerPolicy='no-referrer' chuẩn chỉ."
                ].map((task, index) => {
                  const isChecked = !!checkedDeveloper[index];
                  return (
                    <li 
                      key={index} 
                      onClick={() => toggleCheckbox('developer', index)}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        isChecked ? 'bg-gold-50/50 text-charcoal-400 line-through' : 'bg-charcoal-50 hover:bg-gold-50/20'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        className="mt-0.5 rounded text-gold-500 focus:ring-gold-500" 
                      />
                      <span>{task}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Checklist 3: Content SEO */}
            <div className="bg-white rounded-2xl border border-gold-200 p-5 space-y-4">
              <div className="flex items-center gap-2 text-gold-600 border-b border-gold-100 pb-2">
                <Activity className="w-4 h-4" />
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                  Content SEO Checklist
                </h5>
              </div>
              <p className="text-[11px] text-charcoal-500">Nhấp chọn để duyệt nội dung và định hướng EEAT:</p>
              
              <ul className="space-y-2.5 text-xs">
                {[
                  "Headline và đoạn văn đã tích hợp cụm từ khóa 'marketing tổng thể', 'PGS Agency là ai'.",
                  "Các câu trả lời FAQ bám sát phễu nhận thức của khách hàng SME để tăng CRO.",
                  "Phát biểu triết lý và sơ yếu lý lịch CEO Phùng Quốc Bảo làm nổi bật tiêu chuẩn EEAT.",
                  "Thêm chú thích placeholder [Cần bổ sung dữ liệu thật] cho các thông tin đang cập nhật.",
                  "Internal Link nội bộ bám sát dòng hành trình khách hàng rõ ràng chuẩn AI Search."
                ].map((task, index) => {
                  const isChecked = !!checkedContent[index];
                  return (
                    <li 
                      key={index} 
                      onClick={() => toggleCheckbox('content', index)}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        isChecked ? 'bg-gold-50/50 text-charcoal-400 line-through' : 'bg-charcoal-50 hover:bg-gold-50/20'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        className="mt-0.5 rounded text-gold-500 focus:ring-gold-500" 
                      />
                      <span>{task}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Footer component */}
      

      {/* Global CRO Lead Generation Popup Modal */}
      <GrowthFormModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />

    </div>
  );
}
