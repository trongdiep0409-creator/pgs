'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Layers, 
  Zap, 
  Users, 
  Database, 
  Layout, 
  Globe, 
  BarChart3,
  ChevronDown,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  MousePointer2,
  FileText,
  Workflow,
  Share2
} from 'lucide-react';
import Link from 'next/link';

// --- Components ---

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      className={`h-1 bg-gold w-20 mt-4 ${centered ? 'mx-auto' : ''}`}
    />
  </div>
);

// --- Sections ---

const Hero = () => {
  const nodes = [
    { icon: Search, label: "Technical", x: 25, y: 25, z: 80, delay: 0.1 },
    { icon: FileText, label: "Content Hub", x: 75, y: 25, z: -40, delay: 0.3 },
    { icon: Globe, label: "Global Entity", x: 20, y: 70, z: 60, delay: 0.5 },
    { icon: Zap, label: "Conversion", x: 80, y: 75, z: 100, delay: 0.7 },
    { icon: Database, label: "E-E-A-T", x: 82, y: 48, z: -20, delay: 0.2 },
    { icon: MousePointer2, label: "Lead Logic", x: 45, y: 80, z: 120, delay: 0.4 },
    { icon: Share2, label: "Authority", x: 62, y: 20, z: 40, delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-linear-to-bl from-gold/[0.08] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-linear-to-t from-offwhite to-transparent" />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-gold/40 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Bold Editorial Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 px-6 py-2.5 bg-charcoal text-white rounded-full mb-10 shadow-2xl"
            >
              <span className="w-2 h-2 bg-gold rounded-full relative">
                <span className="absolute inset-0 bg-gold rounded-full animate-ping" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold/80">
                Data-Driven SEO Agency
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl xl:text-9xl font-display font-black leading-[0.9] mb-10 tracking-tighter text-charcoal"
            >
              THỐNG TRỊ <br />
              <span className="text-gold italic relative inline-block">
                TẦNG THỨ 1
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-4 bg-gold/10 -z-10" 
                />
              </span> <br />
              GOOGLE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-xl md:text-2xl mb-14 leading-relaxed max-w-2xl font-medium"
            >
              Chúng tôi không chỉ SEO từ khóa. Chúng tôi kiến tạo <span className="text-charcoal font-black border-b-2 border-gold/40">vị thế dẫn đầu ngành</span> cho doanh nghiệp thông qua hệ thống tăng trưởng 6 chiều.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="bg-gold text-white px-12 py-6 rounded-sm font-black text-lg hover:bg-charcoal transition-all duration-500 flex items-center justify-center gap-4 group shadow-[0_30px_60px_-15px_rgba(212,175,55,0.4)]">
                NHẬN AUDIT MIỄN PHÍ <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white border-2 border-charcoal/5 text-charcoal px-12 py-6 rounded-sm font-bold text-lg hover:border-gold hover:text-gold transition-all duration-500 group">
                XEM BÁO GIÁ <span className="text-gray-300 group-hover:text-gold/50 ml-2">2024</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Cinematic 3D Scene */}
          <div className="lg:col-span-5 relative h-[700px] hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
              style={{ perspective: '3000px' }}
            >
              <motion.div 
                animate={{ 
                  rotateY: [-4, 4, -4],
                  rotateX: [-3, 3, -3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative transform-style-3d"
              >
                {/* Orbital Geometric Forms */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/10 rounded-full animate-spin-slow opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/20 rounded-full rotate-45 opacity-20" />
                
                {/* SVG Connections with Glow Effects */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {nodes.map((node, i) => (
                    <motion.line
                      key={i}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2="50%"
                      y2="50%"
                      stroke="#D4AF37"
                      strokeWidth="0.25"
                      strokeDasharray="4 4"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ delay: node.delay + 1, duration: 2 }}
                    />
                  ))}
                </svg>

                {/* The "Golden Nucleus" Hub */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.2, type: "spring", damping: 15 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ transform: 'translateZ(150px)' }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gold/50 blur-[100px] group-hover:blur-[120px] transition-all rounded-full" />
                    <div className="relative bg-charcoal border-2 border-gold/50 p-14 rounded-[3rem] shadow-[0_60px_120px_-20px_rgba(212,175,55,0.4)] flex flex-col items-center gap-6 min-w-[320px] transform-style-3d group-hover:scale-105 transition-all duration-700">
                      <div className="w-24 h-24 bg-gold text-white rounded-3xl flex items-center justify-center shadow-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-40 animate-pulse" />
                        <Globe size={56} className="relative z-10" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-display font-black text-3xl uppercase tracking-[0.2em] text-white">PGS PRO</h3>
                        <p className="text-[10px] text-gold font-black uppercase mt-4 tracking-[0.5em] opacity-80">Holistic Architecture</p>
                      </div>
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map(dot => (
                          <motion.div 
                            key={dot}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: dot * 0.2 }}
                            className="w-2 h-2 bg-gold rounded-full" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Dimension Cards */}
                {nodes.map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      left: `${node.x}%`,
                      top: `${node.y}%`
                    }}
                    transition={{ delay: node.delay + 1, duration: 1 }}
                    className="absolute z-10"
                    style={{ transform: `translateZ(${node.z}px) translate(-50%, -50%)` }}
                  >
                    <motion.div 
                      animate={{ 
                        y: [0, -30, 0],
                        rotate: [node.delay * 10, node.delay * 10 + 10, node.delay * 10]
                      }}
                      transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white/90 backdrop-blur-3xl border border-white/60 p-5 rounded-2xl shadow-3xl flex flex-col items-center gap-3 min-w-[140px] group-hover:bg-gold group-hover:text-white transition-all duration-500">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-white/20 group-hover:text-white transition-colors">
                          <node.icon size={28} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{node.label}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const StrategyBento = () => {
  return (
    <section className="py-32 bg-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-charcoal rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gold/10 blur-[100px] group-hover:bg-gold/20 transition-all" />
            <div className="relative z-10 max-w-2xl">
              <div className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-8">Holistic Approach</div>
              <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[1.1] tracking-tight">
                Không chỉ là traffic, <br /> mà là <span className="text-gold italic">Thống trị</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-12">
                Hệ thống SEO tại PGS Agency tập trung vào việc bao phủ mọi điểm chạm (touchpoints) trên hành trình tìm kiếm của khách hàng, từ nhận thức đến chuyển đổi.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-display font-black text-gold mb-2">1,000+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Từ khóa bao phủ ngành</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-black text-gold mb-2">85%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Tăng trưởng lead tự nhiên</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vertical Strategy Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-white rounded-[3rem] p-12 border border-gray-100 flex flex-col justify-between group hover:shadow-2xl transition-all"
          >
            <div>
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-display font-black text-charcoal mb-6 uppercase tracking-tight">AI Search Readiness</h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Tối ưu hóa website sẵn sàng cho kỷ nguyên SGE (Search Generative Experience) của Google, giúp thương hiệu xuất hiện ngay trong câu trả lời AI.
              </p>
            </div>
            <div className="flex items-center gap-4 text-gold font-bold text-sm tracking-widest uppercase">
              Khám phá thêm <ArrowRight size={20} />
            </div>
          </motion.div>

          {/* Bottom Small Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 bg-white rounded-[3rem] p-12 border border-gray-100 group hover:border-gold transition-all"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-12 h-12 bg-charcoal text-gold rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <h4 className="font-display font-black text-charcoal uppercase tracking-widest text-sm">Technical 360</h4>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">Audit và tối ưu hóa 150+ tiêu chí kỹ thuật để đảm bảo Google Bot yêu thích website của bạn nhất.</p>
          </motion.div>

          {/* Bottom Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-8 bg-gold rounded-[3rem] p-12 text-white flex items-center justify-between overflow-hidden relative"
          >
            <div className="relative z-10 max-w-lg">
              <h3 className="text-4xl font-display font-black mb-6 uppercase tracking-tight">Content Authority Hub</h3>
              <p className="text-white/80 font-medium leading-relaxed">Xây dựng hệ thống Topical Authority thông qua các cụm nội dung (Topic Clusters) chuyên sâu và chuẩn E-E-A-T.</p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
              <FileText size={400} className="translate-x-1/2 translate-y-1/4" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const rows = [
    { label: "Mục tiêu", keyword: "Đẩy top vài từ khóa volume cao", total: "Phủ sóng toàn bộ tệp từ khóa ngành" },
    { label: "Traffic", keyword: "Bị giới hạn, dễ tụt khi đổi thuật toán", total: "Tăng trưởng đều, bền vững và rộng khắp" },
    { label: "Nội dung", keyword: "Viết bài máy móc để chèn từ khóa", total: "Xây dựng cụm chủ đề (Topic Cluster) chuyên sâu" },
    { label: "Chuyển đổi", keyword: "Traffic nhiều nhưng không ra lead", total: "Tối ưu Lead Conversion cho từng trang" },
    { label: "Kỹ thuật", keyword: "Chỉ tối ưu cơ bản (Onpage)", total: "Audit Technical SEO 150+ tiêu chí" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">Competitive Edge</div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-charcoal leading-[1.05] tracking-tight mb-10">
              Khác biệt giữa <span className="text-gold italic">SEO Lối Cũ</span> và <span className="text-charcoal border-b-4 border-gold">SEO PGS</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-12">
              Chúng tôi không đuổi theo những con số ảo. Hệ thống SEO Tổng Thể của PGS tập trung vào việc bao phủ thị trường và chuyển đổi thực tế.
            </p>
            <div className="space-y-4">
              {rows.map((row, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center justify-between p-6 bg-offwhite rounded-2xl hover:bg-charcoal transition-all duration-500"
                >
                  <span className="font-bold text-charcoal group-hover:text-gold transition-colors">{row.label}</span>
                  <div className="flex items-center gap-3 text-gold group-hover:text-white transition-colors">
                    <span className="text-sm font-bold uppercase tracking-widest">PGS Excellence</span>
                    <ArrowRight size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gold/10 blur-[120px] rounded-full" />
            <div className="relative bg-charcoal p-12 rounded-[3rem] shadow-3xl text-white border border-white/10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 bg-gold text-white rounded-2xl flex items-center justify-center">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight">Thống trị tệp từ khóa</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-gold">SEO Cũ (Keyword)</div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '25%' }} className="h-full bg-white/40" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-gold">SEO PGS (Holistic)</div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1 border border-white/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} className="h-full bg-gold rounded-full" />
                  </div>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                <div>
                  <div className="text-3xl font-display font-black text-gold">8.5x</div>
                  <div className="text-[9px] uppercase font-bold text-white/50 tracking-widest mt-2">Conversion Lift</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-white">4.2x</div>
                  <div className="text-[9px] uppercase font-bold text-white/50 tracking-widest mt-2">Lower CPC Cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pillars = () => {
  const pillars = [
    { title: "Technical Excellence", desc: "Audit 150+ tiêu chí kỹ thuật, Core Web Vitals và Mobile-First architecture.", icon: Database },
    { icon: Target, title: "Intent Blueprint", desc: "Phân tích Intent người dùng để xây dựng chiến lược Topic Authority vượt trội." },
    { icon: FileText, title: "Content Mastery", desc: "Hệ thống nội dung Hub-Spoke chuyên sâu, tối ưu E-E-A-T đa tầng." },
    { icon: ShieldCheck, title: "Entity Authority", desc: "Xác thực danh tính doanh nghiệp (Entity) và Schema Markup chuyên sâu." },
    { icon: Globe, title: "Authority Pulse", desc: "Phủ sóng thương hiệu qua hệ thống PR báo chí và Social Signals uy tín." },
    { icon: Zap, title: "Growth Funnel", desc: "Tối ưu Conversion Rate Optimization (CRO) để biến traffic thành doanh thu." },
  ];

  return (
    <section className="py-32 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">The Core Framework</div>
            <h2 className="text-5xl md:text-6xl font-display font-black leading-tight tracking-tight">6 Trụ cột SEO <br /> <span className="text-gold italic">Thế Hệ Mới</span></h2>
          </div>
          <p className="text-gray-400 text-lg max-w-sm mb-4 leading-relaxed">
            Chúng tôi không làm SEO rời rạc. PGS xây dựng một hệ thống tăng trưởng hữu cơ, bao phủ toàn diện hệ sinh thái số.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] hover:bg-white/10 hover:border-gold/50 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-9xl font-black italic text-white/5 group-hover:text-gold/5 transition-colors">0{i+1}</div>
              <div className="w-16 h-16 bg-gold text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-2xl">
                <pillar.icon size={32} />
              </div>
              <h3 className="text-xl font-display font-black uppercase tracking-widest mb-6 group-hover:text-gold transition-colors">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-medium">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  const steps = [
    { t: "Deep Audit", d: "Kiểm định sức khỏe website và phân tích tệp đối thủ cạnh tranh trực tiếp." },
    { t: "Intent Blueprint", d: "Quy hoạch tệp từ khóa bao phủ 100% hành trình tìm kiếm khách hàng." },
    { t: "Technical Fix", d: "Tối ưu hạ tầng kỹ thuật, tốc độ tải trang và khả năng thu thập dữ liệu." },
    { t: "Topic Hubs", d: "Xây dựng hệ thống Pillar Pages và Topic Clusters chuẩn Authority." },
    { t: "Entity Growth", d: "Định danh thương hiệu và xác thực uy tín doanh nghiệp với Google." },
    { t: "Lead Conversion", d: "Tối ưu điểm chạm, CTA và trải nghiệm người dùng để bứt phá doanh số." }
  ];

  return (
    <section className="py-32 bg-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <div className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-6">The Process</div>
            <h2 className="text-5xl font-display font-black text-charcoal tracking-tight leading-tight">Lộ trình <span className="text-gold italic">Triển khai</span> Chuyên sâu</h2>
          </div>
          <button className="bg-charcoal text-white px-10 py-5 rounded-full font-black text-[10px] tracking-[0.3em] hover:bg-gold transition-all shadow-xl shadow-charcoal/10">
            NHẬN LỘ TRÌNH 2024
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-[3rem] overflow-hidden shadow-2xl">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-16 group hover:bg-offwhite transition-all duration-500 relative overflow-hidden"
            >
              <div className="text-7xl font-display font-black text-gray-100 group-hover:text-gold/10 transition-colors mb-10">0{i+1}</div>
              <h3 className="text-xl font-display font-black uppercase tracking-widest text-charcoal mb-6 border-l-4 border-gold pl-6 group-hover:translate-x-2 transition-transform">{step.t}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{step.d}</p>
              <div className="absolute top-12 right-12 text-gray-200 group-hover:text-gold transition-colors duration-500">
                <Workflow size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section className="py-32 bg-white relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <div className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-6">Pricing Plans</div>
        <h2 className="text-5xl md:text-6xl font-display font-black text-charcoal tracking-tight leading-none">Investment <br /> for <span className="text-gold italic">Growth</span></h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {[
          { name: "Foundation", price: "15M", sub: "/mo", features: ["Full Technical Audit", "Keyword Coverage: 100+", "20 Standard Articles", "Monthly Progress Report"] },
          { name: "Growth Architecture", price: "35M", sub: "/mo", features: ["Topic Cluster Strategy", "Keyword Coverage: 300+", "50 Premium Articles", "Entity Authority Setup", "Conversion Optimization"], featured: true },
          { name: "Market Authority", price: "Custom", sub: "/mo", features: ["Sector Domination", "Keyword Coverage: 1000+", "PR & High-DA Backlinks", "AI Search Readiness", "1-on-1 SEO Director"] }
        ].map((pkg, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -20 }}
            className={`p-16 rounded-[4rem] border-2 transition-all duration-700 relative overflow-hidden flex flex-col justify-between ${pkg.featured ? 'bg-charcoal text-white border-gold shadow-[0_50px_100px_-20px_rgba(212,175,55,0.3)]' : 'bg-offwhite border-transparent hover:border-gold hover:bg-white'}`}
          >
            {pkg.featured && (
              <div className="absolute top-0 right-0 bg-gold text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-bl-3xl">
                Best Choice
              </div>
            )}
            <div>
              <h3 className={`text-2xl font-display font-black mb-10 uppercase tracking-[0.2em] ${pkg.featured ? 'text-gold' : 'text-charcoal'}`}>{pkg.name}</h3>
              <div className="flex items-baseline gap-2 mb-16">
                <span className={`text-6xl font-display font-black ${pkg.featured ? 'text-white' : 'text-charcoal'}`}>{pkg.price}</span>
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">{pkg.sub}</span>
              </div>
              <ul className="space-y-6 mb-20">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 ${pkg.featured ? 'bg-gold text-charcoal' : 'bg-gold/20 text-gold'}`}>
                      <CheckCircle2 size={12} />
                    </div>
                    <span className={`text-[13px] font-bold ${pkg.featured ? 'text-gray-300' : 'text-gray-500'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className={`w-full py-7 font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all duration-500 ${pkg.featured ? 'bg-gold text-white hover:bg-white hover:text-charcoal' : 'bg-charcoal text-white hover:bg-gold'}`}>
              SELECT PLAN
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Làm SEO tổng thể mất bao lâu để thấy kết quả?", a: "Thông thường, SEO tổng thể cần từ 3-6 tháng để bắt đầu thấy sự tăng trưởng về traffic và 6-9 tháng để đạt được vị trí bền vững. Tuy nhiên, các lỗi kỹ thuật lớn được fix có thể mang lại kết quả sớm hơn." },
    { q: "PGS có cam kết Top 1 không?", a: "Chúng tôi cam kết về KPI tăng trưởng Traffic, thứ hạng nhóm từ khóa mục tiêu và đặc biệt là số lượng Lead/Chuyển đổi. Việc cam kết Top 1 tuyệt đối là phi thực tế vì thuật toán Google luôn thay đổi, nhưng chúng tôi cam kết nỗ lực tối đa để chiếm lĩnh vị trí cao nhất." },
    { q: "Tại sao nên chọn SEO thay vì chạy Ads?", a: "Ads mang lại kết quả ngay lập tức nhưng chi phí tăng dần theo thời gian. SEO là tài sản dài hạn, giúp giảm chi phí marketing trung bình trên mỗi khách hàng (CAC) và xây dựng niềm tin tự nhiên mà Ads không làm được." },
    { q: "PGS Agency có tối ưu cho AI Search (SGE) không?", a: "Có. Chúng tôi tối ưu cấu trúc dữ liệu, Schema và nội dung trả lời trực diện câu hỏi của người dùng để tăng khả năng xuất hiện trong các kết quả trả lời của AI và Featured Snippets." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4">FAQ</div>
          <h2 className="text-4xl font-display font-black text-charcoal tracking-tight">Giải đáp <span className="text-gold italic">Thắc mắc</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors"
              >
                <span className="font-bold text-lg text-charcoal pr-8">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-gold text-white border-gold' : 'text-gold'}`}>
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-gray-500 leading-relaxed text-lg">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTAFinal = () => (
  <section className="py-32 bg-charcoal text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[40%] h-full bg-gold/10 blur-[120px] rounded-full translate-x-1/2" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-6">Partner with us</div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[1.1] tracking-tight">
            Kiến tạo hệ thống <br /> <span className="text-gold italic">Tăng trưởng</span> thực
          </h2>
          <p className="text-gray-400 text-xl mb-12 leading-relaxed border-l-2 border-gold/30 pl-8">
            Đừng để lãng phí ngân sách cho những traffic không chuyển đổi. Hãy bắt đầu hành trình thống trị ngành cùng PGS Agency.
          </p>
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-display font-black text-white">24h</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Phản hồi Audit</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-display font-black text-gold">Free</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Consulting</div>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl p-12 rounded-3xl border border-white/10 shadow-3xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Họ và tên" className="bg-white/5 border border-white/10 p-5 rounded-xl focus:border-gold outline-none w-full text-sm transition-all" />
              <input type="text" placeholder="Số điện thoại" className="bg-white/5 border border-white/10 p-5 rounded-xl focus:border-gold outline-none w-full text-sm transition-all" />
            </div>
            <input type="email" placeholder="Email doanh nghiệp" className="bg-white/5 border border-white/10 p-5 rounded-xl focus:border-gold outline-none w-full text-sm transition-all" />
            <input type="text" placeholder="Website của bạn" className="bg-white/5 border border-white/10 p-5 rounded-xl focus:border-gold outline-none w-full text-sm transition-all" />
            <textarea placeholder="Nhu cầu cụ thể của bạn..." rows={3} className="bg-white/5 border border-white/10 p-5 rounded-xl focus:border-gold outline-none w-full text-sm transition-all" />
            <button className="w-full bg-gold text-white py-5 rounded-xl font-black text-sm tracking-[0.2em] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] transition-all">
              GỬI YÊU CẦU TƯ VẤN
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function SEOServicePage() {
  return (
    <main className="font-sans antialiased selection:bg-gold/20 bg-white">
      
      <Hero />
      <StrategyBento />
      
      {/* Quick Context Section */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-4">When to act</div>
            <h2 className="text-4xl font-display font-black text-charcoal">Dấu hiệu website cần <span className="text-gold italic">SEO Tổng Thể</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "Website mới thành lập", "Phụ thuộc quá nhiều Ads", "Traffic không chuyển đổi",
              "Đối thủ đang chiếm Top", "Thiếu Topical Authority", "Muốn tăng AI Readiness"
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center gap-4 transition-all hover:shadow-xl hover:shadow-gold/5"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold"><ShieldCheck size={24} /></div>
                <span className="text-[10px] font-black uppercase tracking-wider leading-tight text-charcoal">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Comparison />
      <Pillars />
      <Steps />
      <PricingSection />
      <FAQ />
      <CTAFinal />
      

      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Dịch vụ SEO tổng thể PGS Agency",
        "description": "Giải pháp SEO tổng thể giúp doanh nghiệp tăng trưởng traffic và lead bền vững qua hệ thống 6 trụ cột.",
        "provider": {
          "@type": "Organization",
          "name": "PGS Agency",
          "logo": "https://pgsagency.vn/logo.png"
        },
        "areaServed": "VN",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SEO Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Foundation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Growth" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Authority" } }
          ]
        }
      })}} />
    </main>
  );
}
