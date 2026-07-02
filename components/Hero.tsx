'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, CheckCircle2, TrendingUp, Users, Percent, ShieldCheck, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenHandover: (id: number) => void;
}

export default function Hero({ onOpenHandover }: HeroProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Trust Proof Data
  const trustProofs = [
    {
      title: "Lead Chất Lượng",
      desc: "Lọc lead rác, tập trung tối đa khách hàng có ngân sách và nhu cầu thực tế.",
      metric: "Đúng mục tiêu",
      icon: Users
    },
    {
      title: "Tối Ưu Chuyển Đổi",
      desc: "Xây dựng hạ tầng CRO (Tối ưu chuyển đổi) bền vững trên mọi điểm chạm số.",
      metric: "Tỷ lệ CRO vượt trội",
      icon: Percent
    },
    {
      title: "Kiểm Soát Chi Phí",
      desc: "Hệ thống tracking minh bạch báo cáo chi tiết ngân sách, loại bỏ lãng phí.",
      metric: "Tối ưu từng đồng",
      icon: TrendingUp
    },
    {
      title: "Tăng Trưởng Dài Hạn",
      desc: "Không làm chiến dịch chắp vá. Xây dựng tài sản tăng trưởng số bền vững.",
      metric: "Hệ thống tự vận hành",
      icon: ShieldCheck
    }
  ];

  // Pain Points Data
  const painPoints = [
    {
      id: 1,
      problem: "Website đẹp nhưng không có lead",
      issue: "Doanh nghiệp tốn hàng chục triệu dựng web lung linh nhưng không ai đăng ký, thiếu phễu và CRO.",
      solution: "PGS thiết lập cấu trúc phễu chuyển đổi thông minh, tối ưu UI/UX, thêm CTA chuẩn tâm lý và cài tracking chi tiết."
    },
    {
      id: 2,
      problem: "Quảng cáo tốn tiền, CPL quá cao",
      issue: "Facebook Ads, Google Ads tăng giá liên tục, ngân sách đốt nhanh nhưng lead về thưa thớt, rác nhiều.",
      solution: "PGS kiểm toán tài khoản, target chính xác tập khách hàng ngách, phân bổ ngân sách thông minh đa kênh."
    },
    {
      id: 3,
      problem: "SEO có traffic nhưng không ra khách",
      issue: "Từ khóa lên top lẹt đẹt hoặc lên top những từ khóa vô giá trị, không tạo ra tỷ lệ chuyển đổi mua hàng.",
      solution: "PGS xây dựng chiến lược SEO định hướng chuyển đổi (Conversion-Focused SEO) nhắm trực tiếp vào từ khóa mua hàng."
    },
    {
      id: 4,
      problem: "Nội dung Social rời rạc, thiếu chất",
      issue: "Fanpage, TikTok đăng bài hằng ngày cho có nhưng không ai tương tác, thương hiệu mờ nhạt.",
      solution: "PGS xây dựng Content Engine độc quyền, định vị thông điệp sắc sảo và sản xuất nội dung viral có tính định hướng mua hàng."
    },
    {
      id: 5,
      problem: "Không biết kênh tiếp thị nào thực sự hiệu quả",
      issue: "Mơ hồ về hiệu quả tiếp thị, không đo lường được chi tiết lead đến từ nguồn nào, tối ưu theo cảm tính.",
      solution: "PGS triển khai hệ thống Tracking toàn diện (GA4, GTM, Conversion API, CRM) giúp minh bạch hóa 100% dữ liệu."
    },
    {
      id: 6,
      problem: "Marketing cảm tính, thiếu hệ thống",
      issue: "Làm kênh nào biết kênh đó, thiếu sự phối hợp tổng thể khiến các hoạt động dẫm chân lên nhau, lãng phí.",
      solution: "PGS thiết lập PGS Growth System 5 lớp đồng bộ hoàn hảo, kết nối Website - SEO - Ads - Content - Tracking."
    }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24">
      {/* Background decoration */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-gold-100/10 via-transparent to-gold-50/10 rounded-full blur-3xl -z-10" />

      {/* SECTION 2: HERO 3D GROWTH SYSTEM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gold-200 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#1C1C1C] uppercase">
                PGS Growth Agency • Xây hệ thống tăng trưởng số
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-bold text-brand-dark leading-[1.1] tracking-tight">
                Xây dựng hệ thống{' '}
                <span className="relative inline-block text-gold-500 font-extrabold">
                  Marketing tổng thể
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-gold-200/50 -z-10" />
                </span>{' '}
                giúp doanh nghiệp tăng lead chất lượng
              </h1>
              <p className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed">
                PGS Agency kết hợp đột phá giữa Website tối ưu CRO, SEO bền vững, Quảng cáo đa kênh (Google, Facebook, TikTok) và Tracking dữ liệu chuẩn xác để tối ưu chi phí Marketing thực tế.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-8 py-4 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-gold-500/5 flex items-center justify-center gap-2 group border border-brand-dark hover:border-gold-500"
              >
                Nhận tư vấn chiến lược Marketing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
              <a
                href="#services"
                className="px-8 py-4 bg-white hover:bg-gold-50 text-brand-dark rounded-xl text-sm font-semibold transition-all duration-300 border border-gold-200 hover:border-gold-400 shadow-xs flex items-center justify-center gap-2"
              >
                Khám phá hệ sinh thái dịch vụ
              </a>
            </div>

            {/* Mini Trust Indicators */}
            <div className="pt-6 border-t border-gold-200/50 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-500" />
                Kiểm soát ngân sách thực tế
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-500" />
                Báo cáo minh bạch 100%
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-500" />
                Đồng hành tăng trưởng dài hạn
              </span>
            </div>
          </div>

          {/* Right Block: 3D Growth Core Simulation */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Handover Spec Button for Hero */}
            <div className="absolute -top-10 right-0 z-20">
              <button
                onClick={() => onOpenHandover(2)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[10px] font-mono font-bold text-gold-600 bg-white/90 shadow-sm cursor-pointer"
              >
                📄 ĐẶC TẢ HERO 3D
              </button>
            </div>

            {/* 3D Simulation Container */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              
              {/* Spinning Orbit Circles */}
              <div className="absolute w-full h-full border border-dashed border-gold-300/40 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[80%] h-[80%] border border-dashed border-gold-400/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[60%] h-[60%] border border-gold-200/50 rounded-full" />

              {/* Central Core: PGS Growth System */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 bg-white rounded-full border-2 border-gold-400 shadow-2xl flex flex-col items-center justify-center p-4 z-10 glass-panel-gold"
              >
                <span className="text-gold-600 font-mono text-[9px] font-bold tracking-widest uppercase">Core System</span>
                <span className="text-xl font-display font-black text-brand-dark mt-1 tracking-tight">PGS Growth</span>
                <div className="w-6 h-0.5 bg-gold-400 mt-1.5" />
              </motion.div>

              {/* Floating Module Cards (Simulated 3D orbiting node elements) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 left-10 bg-white border border-gold-300 rounded-xl p-3 shadow-md z-20 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-gold-600">WEBSITE CRO</span>
                  <span className="text-[11px] font-bold text-brand-dark">+185% Leads</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-24 -right-12 bg-white border border-gold-300 rounded-xl p-3 shadow-md z-20 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-gold-600">SEO OPTIMAL</span>
                  <span className="text-[11px] font-bold text-brand-dark">Top 1 ngành</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-8 left-16 bg-white border border-gold-300 rounded-xl p-3 shadow-md z-20 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-gold-600">ADS PERFORMANCE</span>
                  <span className="text-[11px] font-bold text-brand-dark">-42% Cost/Lead</span>
                </div>
              </motion.div>

              {/* Connecting Pulse lines (Visual indicator using radial glow effect) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] animate-pulse" />
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: TRUST PROOF MINI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-b border-gold-200/30 bg-white/40 my-10 relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onOpenHandover(3)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ TRUST PROOFS
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustProofs.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-white border border-gold-200/50 rounded-2xl shadow-xs hover:shadow-lg hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                  <IconComponent className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="text-sm font-bold text-brand-dark mb-1 font-display group-hover:text-gold-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-3">
                  {item.desc}
                </p>
                <span className="text-[10px] font-mono font-bold tracking-wider text-gold-600 uppercase bg-gold-50 px-2 py-0.5 rounded">
                  {item.metric}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: VẤN ĐỀ DOANH NGHIỆP ĐANG GẶP (PAIN POINTS WALL) */}
      <div id="pain-points" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(4)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ PROBLEM WALL
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Thực Trạng Doanh Nghiệp
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Có phải chiến dịch Marketing của bạn đang dẫm chân tại chỗ?
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Hầu hết các doanh nghiệp đều vấp phải những khó khăn này trước khi tìm đến giải pháp đồng bộ hệ thống của PGS. Hãy nhấp vào từng thẻ để xem cách PGS tháo gỡ.
          </p>
        </div>

        {/* 3D Flippable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item) => (
            <div
              key={item.id}
              onClick={() => setFlippedCard(flippedCard === item.id ? null : item.id)}
              onMouseEnter={() => setFlippedCard(item.id)}
              onMouseLeave={() => setFlippedCard(null)}
              className="h-[210px] [perspective:1000px] cursor-pointer"
            >
              <div
                className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${
                  flippedCard === item.id ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                
                {/* Front Side: Problem */}
                <div className="absolute inset-0 w-full h-full bg-white border border-red-100 rounded-2xl p-6 shadow-xs [backface-visibility:hidden] flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-wider">Vấn đề {item.id}</span>
                    </div>
                    <h4 className="text-sm font-bold text-brand-dark font-display leading-tight">
                      {item.problem}
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                      {item.issue}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-gold-600 flex items-center gap-1">
                    Xem cách PGS tháo gỡ <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Back Side: PGS Solution */}
                <div className="absolute inset-0 w-full h-full bg-[#FAF0DB]/95 border border-gold-300 rounded-2xl p-6 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gold-100 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-gold-600" />
                      </div>
                      <span className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-wider">Giải pháp của PGS</span>
                    </div>
                    <h4 className="text-xs font-mono font-bold text-brand-dark uppercase">
                      Hệ Thống Hóa & Triển Khai
                    </h4>
                    <p className="text-xs text-brand-dark font-medium leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-brand-dark/80 flex items-center gap-1">
                    Đồng hành trọn gói <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
