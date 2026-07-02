'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Layers,
  MessageSquare,
  Clock,
  Target,
  Award,
  HelpCircle,
  ArrowRight,
  Settings,
  Palette,
  FileText,
  BarChart2,
  User,
  Users,
  Flame,
  Zap,
  Briefcase,
  Copy,
  Code,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  Share2,
  Heart,
  Calendar,
  DollarSign,
  LineChart,
  RefreshCw,
  Lock
} from 'lucide-react';
import {
  CONTENT_PILLARS,
  TONE_OF_VOICES,
  FORMATS,
  PACKAGES,
  FAQS,
  RELATED_SERVICES,
  PillarData,
  ToneOfVoiceData,
  FormatData,
  PackageData
} from '@/lib/content-social-data';

export default function ContentSocialServicePage() {
  // 1. Core Interactive States
  const [activePillar, setActivePillar] = useState<string>('giao-duc');
  const [activeTone, setActiveTone] = useState<string>('chuyen-gia');
  const [activeToneIndustry, setActiveToneIndustry] = useState<string>('cong-nghe');
  const [activeFormat, setActiveFormat] = useState<string>('carousel');
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);
  const [activePackage, setActivePackage] = useState<string>('growth');
  const [activeSchemaType, setActiveSchemaType] = useState<string>('service');

  // 2. Audit/Checklist Calculator State
  const [auditChecklist, setAuditChecklist] = useState({
    noTeam: false,
    inconsistent: false,
    badVisuals: false,
    lowAdsConvert: false,
    noStrategy: false,
    noInboxes: false,
  });
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // 3. Before/After visual slider
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 4. FAQ active accordions
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({
    0: true, // open first by default
  });

  // 5. Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessType: '',
    packageInterest: 'growth',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Helper calculation for brand audit urgency score
  const getUrgencyScore = () => {
    let score = 0;
    if (auditChecklist.noTeam) score += 15;
    if (auditChecklist.inconsistent) score += 15;
    if (auditChecklist.badVisuals) score += 20;
    if (auditChecklist.lowAdsConvert) score += 20;
    if (auditChecklist.noStrategy) score += 15;
    if (auditChecklist.noInboxes) score += 15;
    return score;
  };

  const getUrgencyRecommendation = (score: number) => {
    if (score === 0) return 'Hãy tích chọn các vấn đề để chúng tôi chẩn đoán sức khỏe Fanpage của bạn.';
    if (score <= 30) return 'Mức độ nhẹ: Kênh của bạn hoạt động ổn nhưng cần một bộ khung kế hoạch bài bản hơn để tối ưu chi phí vận hành.';
    if (score <= 60) return 'Mức độ trung bình: Thương hiệu đang xuất hiện thiếu nhất quán và lãng phí điểm chạm. Bạn nên chuẩn hóa Content Pillars & Guidelines thiết kế để tránh mất tệp khách hàng tiềm năng.';
    return 'Mức độ báo động đỏ (Khẩn cấp): Kênh của bạn đang bị bỏ hoang hoặc phân phối nội dung sai tệp nghiêm trọng, làm giảm uy tín thương hiệu và lãng phí ngân sách quảng cáo. Cần tái định vị nội dung ngay lập tức!';
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(label);
    setTimeout(() => setIsCopied(null), 2500);
  };

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };

  const currentPillar = CONTENT_PILLARS.find((p) => p.id === activePillar) || CONTENT_PILLARS[0];
  const currentTone = TONE_OF_VOICES.find((t) => t.id === activeTone) || TONE_OF_VOICES[0];
  const currentToneExample = currentTone.examples[activeToneIndustry] || currentTone.examples['cong-nghe'];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      {/* HEADER / NAVIGATION BAR */}
      

      {/* STICKY MOBILE BOTTOM CTA FOOTER */}
      <div className="md:hidden fixed bottom-4 right-4 left-4 z-40">
        <a
          href="#tu-van"
          className="w-full bg-gold-500 hover:bg-gold-600 active:scale-95 text-neutral-950 font-bold py-3.5 px-4 rounded-full shadow-lg shadow-gold-600/30 flex items-center justify-center space-x-2 text-sm text-center transition-all"
        >
          <Sparkles className="w-4.5 h-4.5 text-neutral-950 animate-pulse" />
          <span>NHẬN TƯ VẤN CONTENT SOCIAL MIỄN PHÍ</span>
        </a>
      </div>

      {/* SECTION 1: HERO - SOCIAL CONVERSATION STUDIO */}
      <section className="relative pt-10 pb-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold-200/20 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Content Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-gold-50 border border-gold-200 text-gold-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Social Conversation Studio</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
            Dịch vụ Content Social giúp thương hiệu hiện diện <span className="text-gold-500 underline decoration-gold-300 decoration-wavy underline-offset-8">chuyên nghiệp</span>, nhất quán và có mục tiêu trên MXH
          </h1>

          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Sản xuất nội dung sáng tạo, thiết kế bộ nhận diện đồng bộ, định hướng đúng Tone of Voice, tăng trưởng tự nhiên (Organic Reach) và tối ưu hóa tỷ lệ chuyển đổi Lead từ Facebook, Instagram, TikTok đến Thương hiệu cá nhân.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#tu-van"
              className="bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center space-x-3 text-center group"
            >
              <span>Nhận tư vấn Content Social</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#pillars"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 hover:border-gold-300 font-semibold px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center space-x-2 text-center"
            >
              <span>Xem các Content Pillars</span>
            </a>
          </div>

          {/* Quick core metrics / USP */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200/60 max-w-xl">
            <div>
              <span className="block font-display text-2xl md:text-3xl font-extrabold text-neutral-900">100%</span>
              <span className="text-xs text-neutral-500 font-medium">Hình ảnh thiết kế riêng</span>
            </div>
            <div>
              <span className="block font-display text-2xl md:text-3xl font-extrabold text-neutral-900">8+</span>
              <span className="text-xs text-neutral-500 font-medium">Ngành hàng chuyên sâu</span>
            </div>
            <div>
              <span className="block font-display text-2xl md:text-3xl font-extrabold text-neutral-900">+150%</span>
              <span className="text-xs text-neutral-500 font-medium">Tương tác tự nhiên trung bình</span>
            </div>
          </div>
        </div>

        {/* 3D Social Feed Wall Mockup (Visual Side) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] bg-gradient-to-b from-white to-gold-50/50 rounded-3xl border border-gold-200/50 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
            {/* Ambient lighting effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/30 rounded-full blur-2xl pointer-events-none" />

            {/* Header Feed Mock */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 z-10">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center font-display text-xs text-white font-black">P</div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">PGS Agency</h4>
                  <p className="text-[9px] text-neutral-400">Được đề xuất • Vừa xong</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-gold-500 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            {/* Simulated 3D elements inside card */}
            <div className="my-auto space-y-4 relative py-2">
              {/* Floating Instagram/Facebook style UI Card */}
              <motion.div
                className="bg-white/95 border border-gold-200 p-4 rounded-xl shadow-lg relative transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded">CAROUSEL GUIDE</span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-neutral-800 leading-tight mb-2">
                  Xây dựng phễu nội dung mạng xã hội chuẩn PGS: Tăng tỷ lệ nhấp chuột 240%
                </p>
                <div className="w-full h-24 rounded bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://picsum.photos/seed/agency/400/200')" }} />
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  <span className="font-display text-[10px] font-bold text-white z-10 bg-black/60 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <span>Trượt để xem giải pháp</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>

              {/* Floating micro brand-voice-tag */}
              <motion.div
                className="absolute -right-8 -top-10 bg-neutral-900 text-white p-3 rounded-xl shadow-2xl flex items-center space-x-2.5 border border-neutral-700/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <TrendingUp className="w-4 h-4 text-gold-400" />
                <div>
                  <p className="text-[8px] text-neutral-400 uppercase font-black">Engagement Rate</p>
                  <p className="text-xs font-bold text-gold-400">+124.5% tăng trưởng</p>
                </div>
              </motion.div>

              {/* Float micro caption card */}
              <motion.div
                className="bg-neutral-50/90 backdrop-blur-sm border border-neutral-200/50 p-3.5 rounded-xl text-[11px] text-neutral-600 space-y-1.5 shadow-md"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-1.5 text-neutral-800 font-bold text-[10px]">
                  <MessageSquare className="w-3 h-3 text-gold-500" />
                  <span>CẤU TRÚC HOOK ĐẮT GIÁ:</span>
                </div>
                <p className="italic text-neutral-700">{"\"Nếu bạn đang đốt tiền cho Facebook Ads mà bỏ quên việc chuẩn hóa Content, bạn đang tự thả trôi cơ hội...\""}</p>
              </motion.div>
            </div>

            {/* Mock Action Panel */}
            <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-neutral-500 z-10">
              <div className="flex space-x-4 text-xs font-semibold">
                <span className="flex items-center space-x-1.5 hover:text-red-500 cursor-pointer"><Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> <span className="text-[10px]">1.2K</span></span>
                <span className="flex items-center space-x-1.5 hover:text-gold-600 cursor-pointer"><MessageSquare className="w-3.5 h-3.5" /> <span className="text-[10px]">354</span></span>
                <span className="flex items-center space-x-1.5 hover:text-blue-500 cursor-pointer"><Share2 className="w-3.5 h-3.5" /> <span className="text-[10px]">189</span></span>
              </div>
              <span className="text-[10px] text-gold-600 bg-gold-50 font-bold px-2 py-0.5 rounded border border-gold-200">PGS Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT SOCIAL LÀ GÌ */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-neutral-100" id="dinh-nghia">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gold-50 border border-gold-200 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-200/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs text-neutral-400 font-mono">DEFINITION CARD</span>
              </div>
              <div className="space-y-3 z-10">
                <h4 className="font-display text-lg font-bold text-neutral-900">Hệ Thống Sáng Tạo Đa Điểm</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Content Social không đơn thuần là những bài đăng đơn lẻ. Đó là quy trình khép kín từ Nghiên cứu tệp khách hàng, Xác lập bộ Content Pillars bài bản, Thiết lập Tone of Voice nhất quán, Thiết kế Visual đồng bộ, đến Quản trị dữ liệu liên tục để tăng tỷ lệ phản hồi tự nhiên.
                </p>
              </div>
              <div className="border-t border-neutral-200/50 pt-4 flex justify-between items-center text-[10px] text-neutral-400 font-bold font-mono">
                <span>PGS AGENCY GROUP</span>
                <span>VERIFIED SYSTEM</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Định nghĩa trực quan</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Dịch vụ Content Social là gì?</h2>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
              Dịch vụ Content Social tại PGS Agency là giải pháp <strong>thuê ngoài chuyên nghiệp toàn diện</strong>. Chúng tôi phụ trách toàn bộ các khâu từ lên ý tưởng sáng tạo, lập kế hoạch lịch đăng bài định kỳ (Content Calendar), biên soạn nội dung caption cuốn hút, thiết kế hình ảnh độc bản đồng nhất màu sắc nhận diện thương hiệu, đến việc xuất bản định kỳ trên các kênh xã hội chính của doanh nghiệp.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-950">Lập kế hoạch đa kênh</h4>
                  <p className="text-xs text-neutral-500">Đồng bộ lịch đăng bài trên Facebook Fanpage, Instagram, TikTok và kênh Founder.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-950">Visual độc quyền 100%</h4>
                  <p className="text-xs text-neutral-500">Nói không với thiết kế kéo thả hàng loạt hay ảnh mạng mờ nhạt, kém sang trọng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VÌ SAO CONTENT SOCIAL QUAN TRỌNG */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="vai-tro">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Tầm quan trọng cốt lõi</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Vì sao Content Social là sinh mệnh của thương hiệu trên mạng xã hội?</h2>
          <p className="text-neutral-500 text-sm md:text-base">Mạng xã hội di chuyển với tốc độ nano giây. Nếu nội dung không đủ đắt, thương hiệu của bạn sẽ lập tức bị chìm vào quên lãng.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 group-hover:bg-gold-100 flex items-center justify-center text-gold-600 transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-950 group-hover:text-gold-600 transition-colors">Hiện Diện Đều Đặn</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Giữ tần suất xuất hiện thường xuyên để lọt vào tiềm thức khách hàng. Thuật toán phân phối của các nền tảng luôn ưu tiên các kênh có lịch đăng bài đặn, đều đặn hàng tuần.
              </p>
            </div>
            <div className="border-t border-neutral-100 pt-4 mt-6 text-xs text-neutral-400 font-medium">Bảo chứng lưu lượng truy cập</div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 group-hover:bg-gold-100 flex items-center justify-center text-gold-600 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-950 group-hover:text-gold-600 transition-colors">Xây Dựng Niềm Tin (E-E-A-T)</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Một trang Fanpage sạch sẽ, hình ảnh đồng bộ cao cấp, nội dung cập nhật liên tục giúp tăng uy tín thương hiệu gấp nhiều lần trong mắt khách hàng mới trước khi họ quyết định liên hệ.
              </p>
            </div>
            <div className="border-t border-neutral-100 pt-4 mt-6 text-xs text-neutral-400 font-medium">Chiến lược tối ưu uy tín</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 group-hover:bg-gold-100 flex items-center justify-center text-gold-600 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-950 group-hover:text-gold-600 transition-colors">Bệ Phóng Chiến Dịch Ads</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Quảng cáo chỉ kéo người dùng đến. Nội dung, hình ảnh mới chính là thứ giữ chân và chuyển đổi họ thành inbox mua hàng. Content tốt giúp giảm 30-50% CPM và tăng mạnh tỷ lệ CRO.
              </p>
            </div>
            <div className="border-t border-neutral-100 pt-4 mt-6 text-xs text-neutral-400 font-medium">Động cơ chuyển đổi tối ưu</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTENT SOCIAL KHÁC CONTENT WEBSITE (COMPARISON BOARD) */}
      <section className="bg-neutral-50 py-20 px-6 md:px-12 border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Góc phân tích chuyên môn</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">So sánh rạch ròi: Content Social vs Content Website</h2>
            <p className="text-neutral-500 text-sm">Hiểu đúng mục tiêu của từng kênh để phân bổ ngân sách sản xuất nội dung một cách tối ưu, tránh lẫn lộn hành vi người dùng.</p>
          </div>

          {/* Comparison Board Interactive Card */}
          <div className="bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-neutral-900 text-white font-display text-sm font-bold text-center py-4 px-6 border-b border-neutral-800">
              <div className="text-left">Tiêu Chí Đánh Giá</div>
              <div className="text-gold-400 mt-2 md:mt-0">Content Social (Mạng xã hội)</div>
              <div className="text-neutral-300 mt-2 md:mt-0">Content Website (SEO Website)</div>
            </div>

            <div className="divide-y divide-neutral-100">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 hover:bg-neutral-50/50 transition-colors">
                <div className="font-bold text-sm text-neutral-900 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>Hành vi người dùng</span>
                </div>
                <div className="text-xs md:text-sm text-neutral-600 bg-gold-50/50 p-3 rounded-lg border border-gold-100">
                  Lướt nhanh, dễ mất tập trung, tìm kiếm sự giải trí, cảm xúc kích thích nhất thời, quyết định mua hàng bộc phát dựa trên niềm tin nhanh.
                </div>
                <div className="text-xs md:text-sm text-neutral-600 p-3">
                  Tìm kiếm thông tin sâu sắc, có chủ đích giải quyết vấn đề, đọc chậm, muốn nghiên cứu thấu đáo trước khi mua hàng giá trị cao.
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 hover:bg-neutral-50/50 transition-colors">
                <div className="font-bold text-sm text-neutral-900 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>Yếu tố quyết định (Visual)</span>
                </div>
                <div className="text-xs md:text-sm text-neutral-600 bg-gold-50/50 p-3 rounded-lg border border-gold-100 font-medium">
                  Trang bìa thu hút trong 3 giây đầu, ảnh vuông, carousel quẹt, video dọc (9:16), màu sắc tương phản nổi bật.
                </div>
                <div className="text-xs md:text-sm text-neutral-600 p-3">
                  Infographic mô hình, ảnh mô tả chi tiết, sơ đồ, giao diện UX tối giản, dễ cuộn đọc, tốc độ load trang tối đa.
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 hover:bg-neutral-50/50 transition-colors">
                <div className="font-bold text-sm text-neutral-900 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>Độ dài & Định dạng</span>
                </div>
                <div className="text-xs md:text-sm text-neutral-600 bg-gold-50/50 p-3 rounded-lg border border-gold-100">
                  Ngắn gọn (150 - 400 từ), sử dụng hook kích thích, emoji sinh động, kịch bản video ngắn và các bài viết mini case ngắn gọn.
                </div>
                <div className="text-xs md:text-sm text-neutral-600 p-3">
                  Dài hơi (1000 - 3000 từ), cấu trúc H1/H2/H3 chặt chẽ, thông tin chi tiết từng góc cạnh, định dạng chuẩn tài liệu học thuật.
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 hover:bg-neutral-50/50 transition-colors">
                <div className="font-bold text-sm text-neutral-900 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>Cơ chế tiếp cận khách</span>
                </div>
                <div className="text-xs md:text-sm text-neutral-600 bg-gold-50/50 p-3 rounded-lg border border-gold-100">
                  Chủ động phân phối dựa trên thuật toán đề xuất của nền tảng và chạy ads trực tiếp đến hành vi, sở thích.
                </div>
                <div className="text-xs md:text-sm text-neutral-600 p-3">
                  Thụ động đón khách hàng tìm kiếm từ khóa trên Google Search và tối ưu hóa bài viết thông qua SEO dài hạn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: KHI NÀO NÊN THUÊ CONTENT SOCIAL (CHECKLIST INTERACTIVE AUDIT) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Khám bệnh kênh truyền thông</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Doanh nghiệp của bạn có đang thuộc nhóm báo động đỏ?</h2>
            <p className="text-neutral-600 text-base">
              Hãy đánh dấu vào các vấn đề thực tế dưới đây. Công cụ tự động của PGS Agency sẽ phân tích mức độ cần thiết cải tổ nội dung Social của bạn ngay lập tức.
            </p>

            {/* Checklist options */}
            <div className="space-y-3.5 pt-2">
              <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                <input
                  type="checkbox"
                  checked={auditChecklist.noTeam}
                  onChange={(e) => setAuditChecklist({ ...auditChecklist, noTeam: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-500 border-neutral-300 focus:ring-gold-500 mt-0.5"
                />
                <div>
                  <span className="block font-bold text-sm text-neutral-900">Không có đội ngũ sản xuất nội dung nội bộ</span>
                  <p className="text-xs text-neutral-500">Thiếu copywriter viết bài hoặc thiếu designer thiết kế hình ảnh bài bản.</p>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                <input
                  type="checkbox"
                  checked={auditChecklist.inconsistent}
                  onChange={(e) => setAuditChecklist({ ...auditChecklist, inconsistent: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-500 border-neutral-300 focus:ring-gold-500 mt-0.5"
                />
                <div>
                  <span className="block font-bold text-sm text-neutral-900">Bài đăng Fanpage không đều, trồi sụt thất thường</span>
                  <p className="text-xs text-neutral-500">Cả tuần không có bài mới, thỉnh thoảng mới hứng lên viết một bài bán hàng.</p>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                <input
                  type="checkbox"
                  checked={auditChecklist.badVisuals}
                  onChange={(e) => setAuditChecklist({ ...auditChecklist, badVisuals: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-500 border-neutral-300 focus:ring-gold-500 mt-0.5"
                />
                <div>
                  <span className="block font-bold text-sm text-neutral-900">Hình ảnh thiết kế thiếu đồng bộ, mất định vị nhận diện</span>
                  <p className="text-xs text-neutral-500">Mỗi ảnh một màu, dùng ảnh copy mờ nhòe làm thương hiệu trông cực kỳ kém sang.</p>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                <input
                  type="checkbox"
                  checked={auditChecklist.lowAdsConvert}
                  onChange={(e) => setAuditChecklist({ ...auditChecklist, lowAdsConvert: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-500 border-neutral-300 focus:ring-gold-500 mt-0.5"
                />
                <div>
                  <span className="block font-bold text-sm text-neutral-900">Chi tiền chạy quảng cáo nhưng không ra đơn/inbox</span>
                  <p className="text-xs text-neutral-500">Nội dung quảng cáo quá nghèo nàn, lặp đi lặp lại khiến tệp khách chán nản lướt qua.</p>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                <input
                  type="checkbox"
                  checked={auditChecklist.noStrategy}
                  onChange={(e) => setAuditChecklist({ ...auditChecklist, noStrategy: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-500 border-neutral-300 focus:ring-gold-500 mt-0.5"
                />
                <div>
                  <span className="block font-bold text-sm text-neutral-900">Không có chiến lược Content Pillars rõ ràng</span>
                  <p className="text-xs text-neutral-500">Chỉ chăm chăm đăng bài bán hàng, làm loãng kênh và bóp nghẹt tương tác tự nhiên.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Audit Result Display Side */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[460px] bg-white border border-neutral-200/80 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/40 rounded-full blur-2xl pointer-events-none" />

              <h4 className="font-display text-lg font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
                <span>Chẩn Đoán Sức Khỏe Kênh</span>
                <span className="text-xs text-neutral-400 font-mono">AUTOMATED AUDIT</span>
              </h4>

              {/* Urgency Gauge */}
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#F4F4F5"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#C5A059"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="377"
                      strokeDashoffset={377 - (377 * getUrgencyScore()) / 100}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-display text-4xl font-black text-neutral-900">{getUrgencyScore()}%</span>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Chỉ số khẩn cấp</span>
                  </div>
                </div>

                <div className="text-center px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${
                    getUrgencyScore() > 60 ? 'bg-red-50 text-red-600 border border-red-200' :
                    getUrgencyScore() > 0 ? 'bg-gold-50 text-gold-700 border border-gold-200' :
                    'bg-neutral-100 text-neutral-500'
                  }`}>
                    {getUrgencyScore() > 60 ? '⚠️ BÁO ĐỘNG ĐỎ' : getUrgencyScore() > 0 ? '📊 CẦN TỐI ƯU NGAY' : '💤 CHƯA ĐÁNH GIÁ'}
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                    {getUrgencyRecommendation(getUrgencyScore())}
                  </p>
                </div>
              </div>

              {/* Urgent CTA inside Result Box */}
              {getUrgencyScore() > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-neutral-100"
                >
                  <a
                    href="#tu-van"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold py-3.5 px-4 rounded-xl text-center text-sm shadow-md block transition-all"
                  >
                    Đăng ký nhận Audit & Lộ trình miễn phí
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTENT PILLAR (PILLAR WHEEL INTERACTIVE) */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-neutral-100" id="pillars">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Cấu trúc khoa học</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Hệ Thống Content Pillars Đa Chiều</h2>
            <p className="text-neutral-500 text-sm">Chúng tôi không sáng tạo tự phát. Mọi bài viết đều được phân bổ chính xác theo 8 cột trụ nội dung cốt lõi để nuôi dưỡng phễu tâm lý khách hàng từ Lạ thành Quen, từ Quen thành Tin, từ Tin thành Mua.</p>
          </div>

          {/* Interactive Wheel & Display board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4">
            {/* Selector list of Pillars */}
            <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-center">
              {CONTENT_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                    activePillar === pillar.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white hover:border-gold-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full ${activePillar === pillar.id ? 'bg-gold-400' : 'bg-neutral-400'}`} />
                    <span className="font-bold text-sm">{pillar.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activePillar === pillar.id ? 'text-gold-400 translate-x-1' : 'text-neutral-400 group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>

            {/* Display detail board */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-8 h-full flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold-200/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 text-gold-600 bg-gold-100/50 border border-gold-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentPillar.name}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-neutral-950 leading-snug">
                      {currentPillar.title}
                    </h3>

                    <p className="text-neutral-600 text-base leading-relaxed">
                      {currentPillar.description}
                    </p>

                    {/* Example Box */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center space-x-2 font-display text-xs font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">
                        <FileText className="w-3.5 h-3.5 text-gold-500" />
                        <span>Ý tưởng & Bài viết mẫu khuyên dùng</span>
                      </div>
                      <h5 className="font-bold text-sm text-neutral-900">{currentPillar.exampleTitle}</h5>
                      <p className="text-xs text-neutral-600 leading-relaxed italic bg-neutral-50 p-3.5 rounded-lg border border-neutral-100">
                        {currentPillar.exampleContent}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>PGS CONTENT BLUEPRINT v1.2</span>
                    <span>PILLAR CORE</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FORMAT BÀI VIẾT */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="formats">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Format sản xuất</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Đa Dạng Format Nội Dung Chuẩn Thuật Toán</h2>
          <p className="text-neutral-500 text-sm">Không nhàm chán một màu. PGS Agency liên tục thay đổi kết cấu bài đăng để tăng điểm phân phối, kích thích giữ chân người dùng lâu nhất.</p>
        </div>

        {/* Format Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFormat(f.id)}
              className={`p-5 rounded-xl border text-left transition-all h-full flex flex-col justify-between ${
                activeFormat === f.id
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl scale-102'
                  : 'bg-white text-neutral-800 border-neutral-200/60 hover:bg-neutral-50'
              }`}
            >
              <div className="space-y-2">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  activeFormat === f.id ? 'bg-gold-500 text-neutral-950' : 'bg-gold-50 text-gold-700'
                }`}>
                  {f.ratio}
                </span>
                <h4 className="font-display font-bold text-sm">{f.name}</h4>
              </div>
              <span className={`text-[11px] font-semibold mt-4 flex items-center space-x-1.5 ${
                activeFormat === f.id ? 'text-gold-400' : 'text-neutral-400'
              }`}>
                <span>Chi tiết định cấu trúc</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Format Configuration Card */}
        <div className="mt-8">
          {FORMATS.map((f) => {
            if (f.id !== activeFormat) return null;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-inner"
              >
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs text-gold-600 bg-gold-100 border border-gold-200 px-3 py-1 rounded-full font-bold uppercase">Format blueprint</span>
                  <h3 className="font-display text-2xl font-bold text-neutral-900">{f.name}</h3>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p><strong>🎯 Phù hợp nhất cho:</strong> {f.bestFor}</p>
                    <p><strong>⚙️ Tỷ lệ chuẩn khuyên dùng:</strong> {f.ratio}</p>
                    <p><strong>💡 Cách PGS áp dụng:</strong> {f.usage}</p>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
                  <span className="font-display text-[10px] text-neutral-400 font-bold uppercase tracking-widest block border-b border-neutral-100 pb-2">
                    Cấu trúc giải phẫu bài viết chuẩn chuyển đổi (Conversion Copywriting)
                  </span>
                  <ul className="space-y-3">
                    {f.structure.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-neutral-700">
                        <span className="w-6 h-6 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: TONE OF VOICE (INTERACTIVE CAPTION GENERATOR) */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-neutral-100" id="tone-of-voice">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Giọng điệu nhất quán</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Xác Lập Tone of Voice Độc Bản</h2>
            <p className="text-neutral-500 text-sm">Chúng tôi không viết bằng một giọng văn đại trà. PGS Agency phác họa cá tính thương hiệu rõ ràng thông qua hệ thống Tone of Voice độc lập.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Controls: Select Tone & Industry */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider block">1. Chọn Giọng Điệu Thương Hiệu (Tone)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {TONE_OF_VOICES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTone(t.id)}
                      className={`text-left p-4 rounded-xl border text-xs md:text-sm transition-all font-semibold ${
                        activeTone === t.id
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider block">2. Chọn Ngành Hàng Minh Họa</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cong-nghe', name: '📱 Công nghệ' },
                    { id: 'spa', name: '🌸 Spa/Làm đẹp' },
                    { id: 'bds', name: '🏢 Địa ốc/BĐS' }
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setActiveToneIndustry(ind.id)}
                      className={`py-3 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        activeToneIndustry === ind.id
                          ? 'bg-gold-500 text-neutral-950 border-gold-500'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                      }`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Display: Automated Text Generator Screen */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-8 h-full flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">SOCIAL POST GENERATOR</span>
                    <span className="text-[10px] text-neutral-400 font-bold font-mono">SYSTEM READY</span>
                  </div>

                  <div className="space-y-4">
                    {/* Visual Headline Mock */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">Tiêu đề bài viết (Headline):</span>
                      <h4 className="font-display text-lg md:text-xl font-bold text-neutral-950 leading-snug">
                        {currentToneExample.headline}
                      </h4>
                    </div>

                    {/* Visual Caption Mock */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">Nội dung bài viết (Caption):</span>
                      <p className="text-xs md:text-sm text-neutral-600 leading-relaxed bg-white p-4 rounded-xl border border-neutral-200/60 shadow-inner">
                        {currentToneExample.caption}
                      </p>
                    </div>

                    {/* Visual Design Mock */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">Ý tưởng thiết kế hình ảnh (Visual Art Direction):</span>
                      <p className="text-xs text-gold-700 bg-gold-50 p-3 rounded-lg border border-gold-200/50 font-medium italic">
                        💡 {currentToneExample.visualIdea}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-500">Giọng điệu: {currentTone.name}</span>
                  <button
                    onClick={() => copyToClipboard(currentToneExample.caption, 'caption')}
                    className="flex items-center space-x-1 hover:text-gold-600 transition-colors cursor-pointer font-bold font-mono"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isCopied === 'caption' ? 'ĐÃ COPY CAPTION!' : 'COPY CAPTION'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: THIẾT KẾ HÌNH ẢNH */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="thiet-ke">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Visual Identity Guideline</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Chuẩn Hóa Thiết Kế Visual Cao Cấp</h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Một bài đăng có nội dung xuất sắc nhưng hình ảnh tạm bợ sẽ lập tức giết chết uy tín của thương hiệu. Tại PGS, hình ảnh xã hội được thiết kế theo quy chuẩn chặt chẽ như một bộ nhận diện thu nhỏ của doanh nghiệp trên không gian mạng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-gold-500 font-bold text-sm block">1. Color & Typography Palette</span>
                <p className="text-xs text-neutral-500">Quy hoạch 03 mã màu chính phụ thống nhất và 02 font chữ cố định cho toàn bộ các ấn phẩm hình ảnh.</p>
              </div>
              <div className="space-y-2">
                <span className="text-gold-500 font-bold text-sm block">2. Grid & Ratio Consistency</span>
                <p className="text-xs text-neutral-500">Layout ảnh được định vị theo tỷ lệ vàng (60% không gian trống, 30% chữ key message, 10% logo/CTA).</p>
              </div>
              <div className="space-y-2">
                <span className="text-gold-500 font-bold text-sm block">3. Custom Premium Assets</span>
                <p className="text-xs text-neutral-500">Ứng dụng phong cách thiết kế White Glass (Kính mờ) và Gold Metallic (Kim loại mạ vàng) sang xịn mịn.</p>
              </div>
              <div className="space-y-2">
                <span className="text-gold-500 font-bold text-sm block">4. Call-to-Action Visualizer</span>
                <p className="text-xs text-neutral-500">Trang bìa carousel hoặc slide cuối luôn có visual điều hướng hành động quẹt, thả tim, gửi tin nhắn.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Design grid mesh blueprint */}
            <div className="w-full max-w-[380px] aspect-[4/5] bg-neutral-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden border border-neutral-800 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono font-bold">
                  <span>BLUEPRINT MATRIX v4</span>
                  <span>GRID: 1200x1200PX</span>
                </div>

                {/* Grid Overlay Graphic */}
                <div className="my-auto border border-dashed border-gold-500/30 rounded-lg p-4 relative bg-black/40">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gold-500/20" />
                  <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-gold-500/20" />

                  <div className="text-center space-y-3 py-6 relative z-10">
                    <span className="text-[9px] text-gold-400 uppercase font-black tracking-widest block bg-gold-500/10 py-1 px-3.5 rounded-full border border-gold-500/30 w-fit mx-auto">SAFE ZONE (60% AREA)</span>
                    <h5 className="font-display font-black text-sm tracking-tight text-white uppercase">Headline goes here</h5>
                    <p className="text-[10px] text-neutral-400 max-w-[200px] mx-auto">Hình ảnh minh họa sản phẩm chất lượng cao nằm gọn trong khung lưới tối giản.</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono font-bold">
                  <span>LOGO PGS EMBEDDED</span>
                  <span>CTA TRIGGER AT CORNER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: QUY TRÌNH PGS (PROCESS PIPELINE) */}
      <section className="bg-neutral-50 py-20 px-6 md:px-12 border-y border-neutral-200/50" id="quy-trinh">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Phương thức làm việc</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Quy Trình Triển Khai Bài Bản 8 Bước</h2>
            <p className="text-neutral-500 text-sm">Chúng tôi thiết lập quy trình pipeline minh bạch để đảm bảo chất lượng kiểm duyệt tối đa, đúng lịch hẹn bàn giao, không trễ giờ.</p>
          </div>

          {/* Interactive Steps Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {[
              { step: 1, title: "1. Nhận Brief & Research", desc: "PGS tiếp nhận thông tin từ bạn, tiến hành nghiên cứu sâu sắc đối thủ và hành vi chân dung khách hàng." },
              { step: 2, title: "2. Xây Content Pillars", desc: "Phác thảo bộ khung nội dung chính, thống nhất các mảng đề tài chính phụ và định hướng dòng chảy phễu." },
              { step: 3, title: "3. Content Calendar", desc: "Lập lịch biên tập chi tiết trong tháng, thống nhất ngày giờ đăng bài và chủ đề cụ thể của từng ngày." },
              { step: 4, title: "4. Biên Soạn Copywriting", desc: "Viết chi tiết các dòng tiêu đề giật tít, caption cuốn hút bám sát phác đồ Tone of Voice thỏa thuận." },
              { step: 5, title: "5. Thiết Kế Visual Art", desc: "Thiết kế độc quyền hình ảnh chuẩn lưới Blueprint hoặc hỗ trợ sản xuất kịch bản và hiệu ứng video ngắn." },
              { step: 6, title: "6. Kiểm Duyệt Nội Bộ", desc: "Đội ngũ biên tập viên cao cấp duyệt lại chính tả, bản quyền hình ảnh trước khi gửi sang cho doanh nghiệp duyệt." },
              { step: 7, title: "7. Xuất Bản & Tối Ưu", desc: "Hỗ trợ lập lịch tự động, tối ưu hóa thuật toán đề xuất kênh và theo dõi chỉ số phản hồi của khách hàng." },
              { step: 8, title: "8. Đo Lường Báo Cáo", desc: "Xuất dữ liệu tracking báo cáo chi tiết về tỷ lệ chuyển đổi, mức tăng trưởng tương tác và số lượng lead mới." }
            ].map((p) => (
              <div
                key={p.step}
                onClick={() => setActiveProcessStep(p.step)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  activeProcessStep === p.step
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                    : 'bg-white text-neutral-800 border-neutral-200/60 hover:bg-neutral-50/50'
                }`}
              >
                <span className={`text-[10px] font-bold block uppercase tracking-wider mb-2 ${
                  activeProcessStep === p.step ? 'text-gold-400' : 'text-neutral-400'
                }`}>
                  BƯỚC {p.step}
                </span>
                <h4 className="font-display font-bold text-sm mb-2">{p.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: KPI SOCIAL CONTENT */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="kpi">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Cam kết hiệu năng</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Cam Kết KPI Minh Bạch, Đo Lường Được</h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Chúng tôi không làm việc dựa trên cảm tính hay hứa hẹn mơ hồ. PGS Agency cam kết chất lượng thông qua hệ thống đo lường dữ liệu cụ thể và rõ ràng nhất.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-neutral-900">Cam kết số lượng bàn giao</span>
                  <p className="text-xs text-neutral-500">Đảm bảo bàn giao 100% đúng số lượng bài viết, hình ảnh thiết kế chuẩn chỉnh theo hợp đồng.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-neutral-900">Cam kết chỉ số tương tác tự nhiên</span>
                  <p className="text-xs text-neutral-500">Cải thiện tỷ lệ Organic Reach và Engagement Rate từ 50% đến 150% sau 3 tháng đầu.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-neutral-900">Tracking lead chính xác</span>
                  <p className="text-xs text-neutral-500">Lập hệ thống theo dõi số inbox, số nhấp chuột, số form đăng ký đổ về từ Social.</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Display board (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <BarChart2 className="w-8 h-8 text-gold-500 mb-4" />
              <h4 className="font-display font-bold text-base text-neutral-900 mb-2">Reach & Impressions</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Đo lường số lượng người dùng độc nhất tiếp cận được bài đăng tự nhiên để phủ sóng thương hiệu rộng rãi nhất.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <MessageSquare className="w-8 h-8 text-gold-500 mb-4" />
              <h4 className="font-display font-bold text-base text-neutral-900 mb-2">Engagement Rate (ER)</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Tỷ lệ người dùng tương tác (thích, bình luận, chia sẻ, lưu trữ) trên tổng tiếp cận bài viết chứng minh sức hút nội dung.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <Target className="w-8 h-8 text-gold-500 mb-4" />
              <h4 className="font-display font-bold text-base text-neutral-900 mb-2">Inbound Lead / Inbox</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Chỉ số chuyển đổi quan trọng nhất: Số lượng khách hàng chủ động gửi tin nhắn hỏi mua hàng, đăng ký tư vấn dịch vụ.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <LineChart className="w-8 h-8 text-gold-500 mb-4" />
              <h4 className="font-display font-bold text-base text-neutral-900 mb-2">Dwell Time (Thời gian dừng)</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Đo lường thời gian người dùng dừng chân đọc bài viết để đánh giá độ giữ chân sâu sắc của nội dung.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: DỰ ÁN THỰC TẾ (BEFORE / AFTER INTERACTIVE SLIDER) */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-neutral-100" id="case-studies">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Chứng minh thực tế</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Hiệu Quả Dự Án Thực Tế</h2>
            <p className="text-neutral-500 text-sm">Cùng chiêm ngưỡng sự lột xác ngoạn mục của các thương hiệu đồng hành cùng PGS Agency từ thiết kế hình ảnh đến tương tác.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Before/After Visual Slider */}
            <div className="lg:col-span-6 space-y-4 flex flex-col items-center">
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider block font-mono text-center">Rê chuột hoặc kéo thanh trượt để so sánh Visual</span>

              {/* Slider Container */}
              <div
                className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 select-none cursor-ew-resize"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                {/* BEFORE IMAGE / CARD (Under) */}
                <div className="absolute inset-0 bg-[#E5E5E5] flex flex-col justify-between p-8 text-[#777] z-10">
                  <div className="flex justify-between items-center">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">TRƯỚC KHI PGS TỐI ƯU</span>
                    <span className="text-xs font-mono">DÙNG TEMPLATE CÓ SẴN</span>
                  </div>
                  <div className="my-auto text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-neutral-300 mx-auto flex items-center justify-center font-bold text-2xl text-neutral-400">?</div>
                    <h5 className="font-bold text-base text-neutral-700 uppercase">Banner thông tin bán hàng đại trà</h5>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">Chữ nhồi nhét, màu sắc lộn xộn, bố cục chật hẹp, không đồng màu thương hiệu và thiếu hoàn toàn tính thẩm mỹ.</p>
                  </div>
                  <div className="border-t border-neutral-300 pt-3 text-[10px] font-mono text-center">HÌNH ẢNH MỜ, KÉM SANG TRỌNG</div>
                </div>

                {/* AFTER IMAGE / CARD (Over, Clipped) */}
                <div
                  className="absolute inset-0 bg-[#FAF9F6] flex flex-col justify-between p-8 text-neutral-900 z-20 overflow-hidden"
                  style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                  {/* Direct replica of premium design with exact widths for overlay */}
                  <div className="w-[414px] h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="bg-gold-500 text-neutral-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase">THIẾT KẾ CỦA PGS</span>
                      <span className="text-xs font-bold text-gold-600 font-mono">STANDALONE BLUEPRINT</span>
                    </div>
                    <div className="my-auto text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white mx-auto flex items-center justify-center font-display font-black text-2xl border border-gold-500 shadow-md">P</div>
                      <h5 className="font-display font-bold text-lg text-neutral-950 tracking-tight uppercase">Đột phá Visual Nhất Quán</h5>
                      <p className="text-xs text-neutral-600 max-w-xs mx-auto">Ứng dụng tỷ lệ vàng tối giản, sử dụng bộ nhận diện màu gold tinh tế, khoảng trắng rộng lớn, tạo cảm giác cực kỳ sang trọng và uy tín chuyên gia.</p>
                    </div>
                    <div className="border-t border-gold-200/50 pt-3 text-[10px] text-gold-600 font-bold font-mono text-center">LIGHT PREMIUM CONSULTING THEME</div>
                  </div>
                </div>

                {/* SLIDER HANDLER LINE */}
                <div
                  className="absolute inset-y-0 w-1 bg-gold-500 z-30"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold-500 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                    <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Performance stats */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs text-gold-600 bg-gold-100 border border-gold-200 px-3 py-1 rounded-full font-bold uppercase">Case Study điển hình</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-neutral-950 leading-tight">Thương hiệu Spa & Thẩm Mỹ Viện Thùy Anh</h3>
              <p className="text-neutral-600 text-base leading-relaxed">
                Sau 3 tháng ứng dụng dịch vụ Content Social và tối ưu hóa nhận diện bởi PGS Agency, Fanpage Spa Thùy Anh đã chuyển đổi hoàn toàn từ một trang kém uy tín thành kênh tư vấn khách hàng cao cấp đắt giá nhất khu vực.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200/50">
                  <span className="block font-display text-3xl font-extrabold text-neutral-900">+180%</span>
                  <span className="text-xs text-neutral-500 font-medium">Lượt inbox nhận báo giá</span>
                </div>
                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200/50">
                  <span className="block font-display text-3xl font-extrabold text-neutral-900">22.4K</span>
                  <span className="text-xs text-neutral-500 font-medium">Organic Reach tự nhiên</span>
                </div>
                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200/50">
                  <span className="block font-display text-3xl font-extrabold text-neutral-900">-42%</span>
                  <span className="text-xs text-neutral-500 font-medium">Chi phí tiếp cận (CPM)</span>
                </div>
                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200/50">
                  <span className="block font-display text-3xl font-extrabold text-neutral-900">4.8/5</span>
                  <span className="text-xs text-neutral-500 font-medium">Điểm hài lòng từ chủ doanh nghiệp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: GÓI DỊCH VỤ (PRICING & PACKAGE CARDS) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="bao-gia">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Bảng giá minh bạch</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Các Gói Dịch Vụ Content Social</h2>
          <p className="text-neutral-500 text-sm">Chúng tôi thiết kế các gói dịch vụ linh hoạt phù hợp với quy mô tài chính và tốc độ tăng trưởng của từng giai đoạn doanh nghiệp.</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border p-8 flex flex-col justify-between relative transition-all ${
                pkg.isPopular
                  ? 'border-gold-500 shadow-2xl scale-102 lg:-translate-y-2'
                  : 'border-neutral-200/60 shadow-md hover:shadow-xl'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gold-500 text-neutral-950 text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full border border-gold-400 shadow-sm">
                  ĐƯỢC CHỌN NHIỀU NHẤT
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-neutral-900">{pkg.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{pkg.tagline}</p>
                </div>

                <div className="flex items-baseline space-x-1.5 border-y border-neutral-100 py-4">
                  <span className="font-display text-3xl md:text-4xl font-black text-neutral-900">{pkg.price}</span>
                  <span className="text-xs text-neutral-400 font-bold uppercase">VND / Tháng</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-neutral-600">
                      <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-100 mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-neutral-400 font-mono">
                  <div>📊 BÀI VIẾT: {pkg.deliverables.posts}</div>
                  <div>🎨 THIẾT KẾ: {pkg.deliverables.designs}</div>
                </div>
                <a
                  href="#tu-van"
                  onClick={() => setFormData({ ...formData, packageInterest: pkg.id })}
                  className={`w-full text-center py-3.5 px-4 rounded-xl text-xs font-bold block transition-all ${
                    pkg.isPopular
                      ? 'bg-gold-500 hover:bg-gold-600 text-neutral-950 shadow-md shadow-gold-500/10'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  Chọn gói {pkg.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 14: FAQ (ACCORDION SYSTEM) */}
      <section className="bg-neutral-50 py-20 px-6 md:px-12 border-y border-neutral-200/50" id="faqs">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Giải đáp nhanh</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Câu Hỏi Thường Gặp (FAQs)</h2>
            <p className="text-neutral-500 text-sm">Tổng hợp các thắc mắc phổ biến của đối tác doanh nghiệp khi lần đầu tìm hiểu và cộng tác cùng PGS Agency.</p>
          </div>

          {/* Accordion system */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm md:text-base text-neutral-900 hover:bg-neutral-50/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${openFaqs[idx] ? 'rotate-180 text-gold-500' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqs[idx] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pt-0 border-t border-neutral-100 text-xs md:text-sm text-neutral-500 leading-relaxed bg-neutral-50/20">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: DỊCH VỤ LIÊN QUAN */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" id="dich-vu-khac">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Hệ sinh thái</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Các Giải Pháp Marketing Tích Hợp Khác</h2>
          <p className="text-neutral-500 text-sm">Để tăng trưởng số bền vững, hãy kết hợp Content Social với các động cơ Marketing đa nền tảng cốt lõi của PGS Agency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELATED_SERVICES.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200/60 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gold-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="inline-block text-[10px] text-gold-600 bg-gold-50 font-bold px-2.5 py-0.5 rounded border border-gold-200">INTEGRATED MODULE</span>
                <h4 className="font-display font-bold text-sm text-neutral-950 group-hover:text-gold-600 transition-colors">{s.name}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
              </div>
              <a
                href="#tu-van"
                className="text-xs font-bold text-neutral-800 flex items-center space-x-1 mt-6 group-hover:text-gold-600 transition-colors"
              >
                <span>Nhận thông tin giải pháp</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 16: CTA CUỐI TRANG (INTERACTIVE CONTACT FORM) */}
      <section className="bg-neutral-900 text-white py-20 px-6 md:px-12 border-t border-neutral-800" id="tu-van">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Form left description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block bg-gold-500/10 border border-gold-500/30 text-gold-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Đồng hành bứt phá</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Thương hiệu của bạn có đang xuất hiện đều và đúng cách trên Social?
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
              Đừng để Fanpage bị bỏ hoang hoặc phát sinh những bài viết thiếu định vị làm loãng lòng tin của khách hàng. Hãy điền thông tin để đội ngũ Biên tập viên & Creative Director của PGS liên hệ, chẩn đoán kênh hoàn toàn miễn phí và đề xuất Lịch biên tập sơ bộ trong vòng 24h làm việc.
            </p>
            <div className="flex items-center space-x-4 text-xs font-bold font-mono text-neutral-500">
              <span className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-gold-500" /> <span>Cam kết bảo mật dữ liệu</span></span>
              <span className="flex items-center space-x-1.5"><Clock className="w-4 h-4 text-gold-500" /> <span>Hỗ trợ phản hồi trong 4h</span></span>
            </div>
          </div>

          {/* Contact form display block */}
          <div className="lg:col-span-6">
            <div className="bg-white text-neutral-900 border border-neutral-200 rounded-2xl p-8 shadow-2xl relative">
              <span className="absolute top-4 right-4 text-[10px] text-neutral-400 font-bold font-mono uppercase">SECURE REQUEST</span>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-600 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-neutral-950">Gửi Yêu Cầu Thành Công!</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Cảm ơn bạn đã tin tưởng liên hệ PGS Agency. Chuyên gia tư vấn tăng trưởng nội dung của chúng tôi sẽ gọi lại hỗ trợ bạn trong vòng tối đa 4 tiếng đồng hồ làm việc.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-gold-600 font-bold underline mt-2"
                  >
                    Gửi lại biểu mẫu khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h4 className="font-display font-bold text-lg text-neutral-900 mb-2">Đăng Ký Tư Vấn Miễn Phí</h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0901234567"
                          className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Email liên hệ *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="a@gmail.com"
                        className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Loại hình kinh doanh / Ngành hàng</label>
                      <input
                        type="text"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        placeholder="Spa, Thời trang, Công nghệ, BĐS, v.v."
                        className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Gói dịch vụ quan tâm</label>
                      <select
                        value={formData.packageInterest}
                        onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                        className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none bg-white"
                      >
                        <option value="basic">Social Content Basic - 7.5 triệu</option>
                        <option value="growth">Social Content Growth - 15 triệu</option>
                        <option value="brand-system">Social Content Brand System - 28 triệu</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Lời nhắn của bạn (Ví dụ: Link Fanpage cần Audit)</label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hãy ghi link page của bạn tại đây..."
                        className="w-full p-3 rounded-lg border border-neutral-200 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold py-3.5 px-4 rounded-xl text-sm shadow-md shadow-gold-500/10 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION BÀN GIAO CHUYÊN MÔN KỸ THUẬT (EEAT / CRO / SEO) */}
      {/* ======================================================== */}
      <section className="bg-white border-t border-neutral-200/60 py-20 px-6 md:px-12" id="technical-sheets">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section heading */}
          <div className="border-b border-neutral-100 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono block">DELIVERY MANUALS & DOCUMENTATION</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight">
                Tài Liệu Bàn Giao Chuyên Môn
              </h2>
              <p className="text-xs md:text-sm text-neutral-500">
                Chi tiết bộ quy chuẩn SEO, các chỉ số EEAT tối ưu tìm kiếm, Schema cấu trúc Json-LD trực quan, cùng bảng checklist kiểm duyệt nghiệm thu dự án bàn giao cho Designer, Developer và Content SEO của PGS Agency.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <span className="text-[10px] text-neutral-400 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full font-bold font-mono">
                SECURE AUTHENTICATED ACCESS
              </span>
            </div>
          </div>

          {/* Interactive Document Grid Tab */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Index sidebar */}
            <div className="lg:col-span-3 space-y-2">
              <button
                onClick={() => setActiveSchemaType('seo')}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold block ${
                  activeSchemaType === 'seo' ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                }`}
              >
                1. Cấu hình SEO & EEAT Meta
              </button>
              <button
                onClick={() => setActiveSchemaType('schema')}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold block ${
                  activeSchemaType === 'schema' ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                }`}
              >
                2. Sơ đồ Schema JSON-LD Đề Xuất
              </button>
              <button
                onClick={() => setActiveSchemaType('designer')}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold block ${
                  activeSchemaType === 'designer' ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                }`}
              >
                3. Checklist cho Designer UI/UX
              </button>
              <button
                onClick={() => setActiveSchemaType('developer')}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold block ${
                  activeSchemaType === 'developer' ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                }`}
              >
                4. Checklist cho Frontend Developer
              </button>
              <button
                onClick={() => setActiveSchemaType('content')}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold block ${
                  activeSchemaType === 'content' ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-neutral-50 text-neutral-700 border-neutral-200/60 hover:bg-white'
                }`}
              >
                5. Checklist cho Content SEO
              </button>
            </div>

            {/* Content Display pane */}
            <div className="lg:col-span-9 bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 min-h-[400px] shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-200/10 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {activeSchemaType === 'seo' && (
                  <motion.div
                    key="seo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">1. Cấu hình SEO & EEAT Meta</span>
                      <span className="text-[10px] text-neutral-400 font-mono">ACTIVE PROTOCOL</span>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm text-neutral-600">
                      <div>
                        <strong className="text-neutral-900 block font-display text-sm mb-1">Meta Title (Tiêu đề SEO):</strong>
                        <div className="bg-white p-3.5 rounded-lg border border-neutral-200 font-mono text-xs text-neutral-800 relative group">
                          Dịch vụ Content Social Chuyên Nghiệp | PGS Agency - Tăng Trưởng Đa Kênh
                          <button
                            onClick={() => copyToClipboard('Dịch vụ Content Social Chuyên Nghiệp | PGS Agency - Tăng Trưởng Đa Kênh', 'titleSeo')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-700 font-bold font-mono"
                          >
                            {isCopied === 'titleSeo' ? 'ĐÃ COPY' : 'COPY'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <strong className="text-neutral-900 block font-display text-sm mb-1">Meta Description (Mô tả SEO):</strong>
                        <div className="bg-white p-3.5 rounded-lg border border-neutral-200 font-mono text-xs text-neutral-800 relative">
                          Dịch vụ Content Social giúp thương hiệu hiện diện chuyên nghiệp, nhất quán và bứt phá doanh số trên mạng xã hội. PGS Agency xây dựng hệ thống nội dung toàn diện.
                          <button
                            onClick={() => copyToClipboard('Dịch vụ Content Social giúp thương hiệu hiện diện chuyên nghiệp, nhất quán và bứt phá doanh số trên mạng xã hội. PGS Agency xây dựng hệ thống nội dung toàn diện.', 'descSeo')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-700 font-bold font-mono"
                          >
                            {isCopied === 'descSeo' ? 'ĐÃ COPY' : 'COPY'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <strong className="text-neutral-900 block font-display text-sm mb-1">H1 Tag duy nhất:</strong>
                        <p className="bg-white p-3 rounded-lg border border-neutral-100 font-sans text-neutral-800 italic">
                          {"\"Dịch vụ Content Social giúp thương hiệu hiện diện chuyên nghiệp, nhất quán và có mục tiêu trên mạng xã hội\""}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-white p-4 rounded-xl border border-neutral-200/50">
                          <strong className="text-neutral-900 text-xs uppercase font-bold tracking-wider block mb-2 text-gold-600">Internal Link Đi:</strong>
                          <ul className="space-y-1 text-xs">
                            <li>🔗 <code>/dich-vu/quan-ly-fanpage/</code> (Quản lý Fanpage)</li>
                            <li>🔗 <code>/dich-vu/van-hanh-instagram/</code> (Vận hành Instagram)</li>
                            <li>🔗 <code>/dich-vu/xay-dung-kenh-tiktok/</code> (Kênh TikTok)</li>
                            <li>🔗 <code>/dich-vu/facebook-ads/</code> (Quảng cáo Facebook)</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200/50">
                          <strong className="text-neutral-900 text-xs uppercase font-bold tracking-wider block mb-2 text-neutral-400">Internal Link Nhận:</strong>
                          <ul className="space-y-1 text-xs">
                            <li>🔗 <code>/</code> (Trang chủ chính PGS)</li>
                            <li>🔗 <code>/dich-vu/seo-tong-the/</code> (Dịch vụ SEO tổng thể)</li>
                            <li>🔗 <code>/dich-vu/marketing-tron-goi/</code> (Marketing trọn gói)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSchemaType === 'schema' && (
                  <motion.div
                    key="schema"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">2. Sơ đồ Schema JSON-LD Đề Xuất</span>
                      <span className="text-[10px] text-neutral-400 font-mono">STANDARDIZED INTEGRATION</span>
                    </div>

                    <div className="space-y-4">
                      <span className="text-xs text-neutral-500 block leading-relaxed">
                        Nhúng mã Schema này vào thẻ <code>&lt;head&gt;</code> của trang dịch vụ để Googlebot định danh cấu trúc dịch vụ, sơ đồ breadcrumb và các câu hỏi thường gặp mượt mà nhất.
                      </span>

                      {/* Code Block display */}
                      <div className="relative">
                        <pre className="bg-neutral-900 text-gold-300 p-5 rounded-xl text-[10px] md:text-xs font-mono overflow-x-auto max-h-[250px] leading-relaxed shadow-lg">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Dịch vụ Content Social Chuyên Nghiệp",
      "provider": {
        "@type": "Organization",
        "name": "PGS Agency",
        "url": "https://pgsagency.vn"
      },
      "description": "Dịch vụ lên ý tưởng, viết bài, thiết kế hình ảnh, video ngắn cho Fanpage, Instagram, TikTok.",
      "areaServed": "VN"
    },
    {
      "@type": "BreadcrumbList",
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
          "name": "Dịch vụ Content Social",
          "item": "https://pgsagency.vn/dich-vu/dich-vu-content-social/"
        }
      ]
    }
  ]
}`}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Dịch vụ Content Social Chuyên Nghiệp",
      "provider": {
        "@type": "Organization",
        "name": "PGS Agency",
        "url": "https://pgsagency.vn"
      },
      "description": "Dịch vụ lên ý tưởng, viết bài, thiết kế hình ảnh, video ngắn cho Fanpage, Instagram, TikTok.",
      "areaServed": "VN"
    },
    {
      "@type": "BreadcrumbList",
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
          "name": "Dịch vụ Content Social",
          "item": "https://pgsagency.vn/dich-vu/dich-vu-content-social/"
        }
      ]
    }
  ]
}`, 'schemaCode')}
                          className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold font-mono py-1 px-3 rounded border border-white/20 transition-all"
                        >
                          {isCopied === 'schemaCode' ? 'ĐÃ COPY' : 'COPY CODE'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSchemaType === 'designer' && (
                  <motion.div
                    key="designer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">3. Checklist cho Designer UI/UX</span>
                      <span className="text-[10px] text-neutral-400 font-mono">UI/UX MANUAL</span>
                    </div>

                    <ul className="space-y-4 text-xs md:text-sm text-neutral-600">
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Phong cách Light Premium Consulting:</strong> Sử dụng hệ màu trắng ngà làm chủ đạo, tuyệt đối không được chuyển thành sẫm tối (dark theme) ngoại trừ footer và phần tài liệu bàn giao.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Khoảng trống mắt rộng lớn (Generous Neg Spacing):</strong> Khoảng cách giữa các section tối thiểu 120px trên desktop để người dùng không cảm thấy ngột ngạt khi đọc tài liệu dài.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Thiết lập Micro-interactive:</strong> Đảm bảo tất cả nút bấm, khối trượt (slider Before/After) và tab tương tác đều có phản hồi bóng mềm, mịn màng.
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeSchemaType === 'developer' && (
                  <motion.div
                    key="developer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">4. Checklist cho Frontend Developer</span>
                      <span className="text-[10px] text-neutral-400 font-mono">DEVELOPER MANUAL</span>
                    </div>

                    <ul className="space-y-4 text-xs md:text-sm text-neutral-600">
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Performance & Asset Optimization:</strong> Tối ưu hóa dung lượng hình ảnh, đảm bảo tất cả các icon từ <code>lucide-react</code> được import riêng lẻ để tránh lãng phí dung lượng bundle.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Thiết kế thích ứng cao (Responsive Design):</strong> Tối ưu touch targets đạt tối thiểu 44px trên giao diện thiết bị di động.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Hỗ trợ Prefers-Reduced-Motion:</strong> Đảm bảo các thuộc tính chuyển động từ <code>motion</code> tự động tắt hoặc giảm thiểu nếu trình duyệt của người dùng cấu hình không muốn hiệu ứng.
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeSchemaType === 'content' && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="text-xs text-gold-600 font-bold uppercase tracking-widest font-mono">5. Checklist cho Content SEO</span>
                      <span className="text-[10px] text-neutral-400 font-mono">CONTENT SEO GUIDELINE</span>
                    </div>

                    <ul className="space-y-4 text-xs md:text-sm text-neutral-600">
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Tuân thủ quy tắc EEAT sâu sắc:</strong> Luôn trình bày thông tin định nghĩa rạch ròi, bảng biểu so sánh chuẩn mực, checklist chẩn đoán và quy trình xử lý thực tế để thuật toán Google Search đánh giá cao độ sâu sắc chuyên môn.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Keyword Mapping:</strong> Đảm bảo mật độ xuất hiện các từ khóa phụ (viết bài fanpage, viết bài facebook, content instagram) được phân bổ rải rác đều và tự nhiên nhất trong bài, không được nhồi nhét từ khóa.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3.5">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <strong>Tối ưu hóa Tìm kiếm bằng AI (AI Search Optimization):</strong> Sử dụng định dạng bảng biểu, FAQ accordion và các danh sách gạch đầu dòng rõ ràng để Bing AI, ChatGPT và Gemini dễ dàng trích xuất thông tin đề xuất tốt nhất.
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      
    </div>
  );
}
