'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, ChevronRight, Users, Code, Activity, ShieldCheck, Cpu, Smartphone, Database } from 'lucide-react';

interface TeamProps {
  onOpenHandover: (id: number) => void;
}

export default function Team({ onOpenHandover }: TeamProps) {
  const [activeRole, setActiveRole] = useState<number>(0);
  const [leadCount, setLeadCount] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(0);

  // Auto-counter simulation
  useEffect(() => {
    const leadInterval = setInterval(() => {
      setLeadCount((prev) => {
        if (prev >= 14850) {
          clearInterval(leadInterval);
          return 14850;
        }
        return prev + 150;
      });
    }, 15);

    const crInterval = setInterval(() => {
      setConversionRate((prev) => {
        if (prev >= 4.8) {
          clearInterval(crInterval);
          return 4.8;
        }
        return Math.round((prev + 0.1) * 10) / 10;
      });
    }, 30);

    return () => {
      clearInterval(leadInterval);
      clearInterval(crInterval);
    };
  }, []);

  const roles = [
    {
      id: 0,
      role: 'Strategy Lead',
      expert: 'Phạm Gia Sơn',
      exp: '10+ năm kinh nghiệm',
      task: 'Thiết lập bản đồ tăng trưởng số cốt lõi, tư vấn mô hình phễu chuyển đổi độc quyền cho từng doanh nghiệp.'
    },
    {
      id: 1,
      role: 'SEO Specialist',
      expert: 'Trần Minh Quân',
      exp: '8 năm kinh nghiệm',
      task: 'Xây dựng kế hoạch Topic Cluster, tối ưu hóa on-page/off-page, củng cố chỉ số EEAT giúp phủ top Google bền vững.'
    },
    {
      id: 2,
      role: 'UI/UX Designer',
      expert: 'Lê Hoàng Nam',
      exp: '6 năm kinh nghiệm',
      task: 'Kiến tạo trải nghiệm giao diện Light Premium, tối ưu hóa điểm chạm CRO trên mọi thiết bị di động.'
    },
    {
      id: 3,
      role: 'Google Ads Lead',
      expert: 'Nguyễn Tiến Đạt',
      exp: '7 năm kinh nghiệm',
      task: 'Kiểm soát ngân sách quảng cáo thầu Google Search/GDN, tối ưu hóa điểm chất lượng trang đích thắt chặt chi phí.'
    },
    {
      id: 4,
      role: 'Content Creator',
      expert: 'Đặng Thảo Vy',
      exp: '5 năm kinh nghiệm',
      task: 'Sản xuất kịch bản video viral đa nền tảng, kiến tạo các phễu nội dung thu hút tương tác tự nhiên.'
    },
    {
      id: 5,
      role: 'Tracking Specialist',
      expert: 'Vũ Đức Trọng',
      exp: '6 năm kinh nghiệm',
      task: 'Cài đặt hệ thống đo lường chuyển đổi nâng cao (GTM, GA4, Conversion API), kết nối CRM minh bạch hóa dữ liệu.'
    }
  ];

  return (
    <section className="py-24 space-y-32 bg-white/60 relative">
      
      {/* SECTION 12: CEO AUTHORITY BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(12)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ CEO AUTHORITY
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Portrait Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-[380px] sm:w-80 sm:h-[420px] rounded-3xl border border-gold-300 shadow-2xl p-3 bg-white">
              
              {/* Gold border shine layer */}
              <div className="absolute inset-2 border-2 border-gold-100 rounded-2xl -z-10" />

              {/* Real profile image */}
              <div className="w-full h-full rounded-2xl flex flex-col justify-end p-6 relative overflow-hidden bg-brand-dark">
                <img
                  src="/ceo_pham_gia_son.jpg"
                  alt="CEO Phạm Gia Sơn"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark gradient shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Info Overlay */}
                <div className="relative z-10 bg-white/90 backdrop-blur-md border border-gold-200 p-4 rounded-xl shadow-md text-center">
                  <h4 className="font-display font-extrabold text-brand-dark text-base">Phạm Gia Sơn</h4>
                  <p className="text-[10px] font-mono font-bold text-gold-600 tracking-wider uppercase mt-1">Founder & CEO PGS Agency</p>
                  <span className="text-[9px] text-brand-muted mt-0.5 block">10+ năm kinh nghiệm chiến lược số</span>
                </div>
              </div>

              {/* Decorative keyword badges floating around */}
              <div className="absolute -top-4 -left-6 bg-white border border-gold-200 px-3 py-1.5 rounded-full shadow-md text-[10px] font-mono font-bold text-gold-600">
                🚀 GROWTH LEADER
              </div>
              <div className="absolute bottom-16 -right-8 bg-brand-dark text-white border border-gold-400 px-3 py-1.5 rounded-full shadow-md text-[10px] font-mono font-bold text-gold-400">
                📊 DATA-DRIVEN
              </div>
            </div>
          </div>

          {/* Right: Quote & Journey */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-2 bg-gold-50 rounded-full w-12 h-12 flex items-center justify-center text-gold-600">
              <Quote className="w-6 h-6 transform rotate-180" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-dark leading-snug">
                &quot;Thành công và sự thịnh vượng bền vững của quý khách hàng chính là thước đo duy nhất cho giá trị tồn tại của PGS Agency.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Khi thành lập PGS Agency, tôi cùng các cộng sự cam kết phá bỏ lối mòn tiếp thị manh mún, rời rạc. Chúng tôi không bao giờ bán những chiến dịch quảng cáo vô hồn, không cam kết lead. PGS kiến tạo PGS Growth System - một hệ sinh thái tăng trưởng khép kín dựa trên sự kết nối đồng bộ giữa Website chuẩn CRO, SEO thương hiệu bền bỉ và Ads tối ưu hóa dữ liệu.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-gold-400 pl-4 py-1 text-xs">
              <strong className="text-brand-dark block">Lộ trình đồng hành:</strong>
              <p className="text-brand-muted">PGS cam kết đồng hành, báo cáo minh bạch từng đồng chi phí quảng cáo, hỗ trợ chủ doanh nghiệp kiểm soát tuyệt đối hiệu quả kinh doanh.</p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-xl text-xs font-semibold transition-colors shadow-md border border-brand-dark hover:border-gold-500"
              >
                Đặt lịch tham vấn 1-1 cùng CEO
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 13: ĐỘI NGŨ CHUYÊN GIA (COMMAND TABLE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(13)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ ĐỘI NGŨ CHUYÊN GIA
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Đội Ngũ Thực Chiến
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Ban điều hành chiến dịch của PGS Agency
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Mỗi nhân sự phụ trách đều là chuyên gia có thâm niên thực chiến dày dặn, cam kết mang lại hiệu quả vượt trội cho doanh nghiệp của bạn.
          </p>
        </div>

        {/* Command Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveRole(item.id)}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[220px] relative overflow-hidden ${
                activeRole === item.id
                  ? 'bg-white border-gold-400 shadow-lg scale-102 ring-1 ring-gold-200'
                  : 'bg-white/40 border-gold-200/40 hover:bg-white hover:border-gold-300'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-widest">Expert 0{idx + 1}</span>
                  <span className="text-[9px] font-mono font-bold text-brand-muted bg-gold-100/30 px-2 py-0.5 rounded-full">{item.exp}</span>
                </div>
                
                <div>
                  <h4 className="text-xs font-mono font-bold text-brand-muted uppercase">{item.role}</h4>
                  <h3 className="text-base font-bold text-brand-dark font-display mt-1">
                    {item.expert}
                  </h3>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                  {item.task}
                </p>
              </div>

              {/* Bottom detail action line */}
              <div className="border-t border-gold-100 pt-3 flex justify-between items-center text-[10px] font-mono text-brand-muted">
                <span>PGS Core Team member</span>
                <span className="text-gold-500 font-bold flex items-center gap-1">ACTIVE NOW ●</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 14: CÔNG NGHỆ & TRACKING (DASHBOARD 3D SIMULATION) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(14)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ TRACKING & TECH
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Data-Driven Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Minh bạch hóa 100% dữ liệu tăng trưởng phễu
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            PGS triệt tiêu hoàn toàn tối ưu marketing cảm tính. Hệ thống đo lường cao cấp ghi nhận chi tiết dòng tiền đầu tư mang về bao nhiêu lượt lead chất lượng.
          </p>
        </div>

        {/* Dashboard visual container */}
        <div className="bg-white border border-gold-200 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left info & metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Real-time Analytics</span>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark font-display">
                Đồng bộ hạ tầng phân tích đa kênh
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Tất cả nguồn traffic nóng từ Google Ads, Facebook Ads, TikTok Ads và SEO được dẫn phễu mượt mà về hệ thống đo lường GA4, tự động phân phối ngân sách về kênh mang lại chuyển đổi cao nhất.
              </p>
            </div>

            {/* Simulated Live KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gold-50/50 rounded-xl border border-gold-200/40 text-center">
                <span className="text-2xl font-display font-black text-gold-600 block leading-none">
                  {leadCount.toLocaleString()}+
                </span>
                <span className="text-[10px] text-brand-muted font-mono mt-1.5 block">HOT LEADS GENERATED</span>
              </div>
              <div className="p-4 bg-gold-50/50 rounded-xl border border-gold-200/40 text-center">
                <span className="text-2xl font-display font-black text-brand-dark block leading-none">
                  {conversionRate}%
                </span>
                <span className="text-[10px] text-brand-muted font-mono mt-1.5 block">AVERAGE CRO RATE</span>
              </div>
            </div>
          </div>

          {/* Right simulated 3D Chart & Logs */}
          <div className="lg:col-span-8 bg-[#FAF9F6] border border-gold-200/70 rounded-2xl p-6 h-[300px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>

            <div className="flex items-center gap-2 border-b border-gold-200/50 pb-3 text-xs font-mono font-bold text-brand-dark">
              <Activity className="w-4 h-4 text-gold-500 animate-pulse" />
              <span>PGS-GROWTH-TRACKER-V2.LOG</span>
            </div>

            {/* Custom SVG Line Chart with Motion effects */}
            <div className="flex-1 w-full flex items-end justify-between px-2 pt-6 relative h-40">
              {/* Grid Lines */}
              <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-gold-200/40" />
              <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-gold-200/40" />
              <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-gold-200/40" />

              {/* Chart Line Path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.path
                  d="M 0 120 Q 80 110, 160 80 T 320 40 T 480 20"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <motion.path
                  d="M 0 120 Q 80 110, 160 80 T 320 40 T 480 20 L 480 160 L 0 160 Z"
                  fill="url(#chartGradient)"
                  opacity="0.08"
                />
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Chart Label nodes */}
              <span className="text-[10px] font-mono text-brand-muted">Phase 1</span>
              <span className="text-[10px] font-mono text-brand-muted">Phase 2</span>
              <span className="text-[10px] font-mono text-brand-muted">Phase 3 (Optimization)</span>
              <span className="text-[10px] font-mono text-gold-600 font-bold">Goal achieved ⚡️</span>
            </div>

            <div className="border-t border-gold-200/50 pt-3 flex flex-wrap items-center gap-6 text-[10px] font-mono text-brand-muted">
              <span>TECH STACK INTEGRATED:</span>
              <span className="text-brand-dark font-bold">● Google Analytics 4 (GA4)</span>
              <span className="text-brand-dark font-bold">● Conversion API</span>
              <span className="text-brand-dark font-bold">● CRM Integration</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
