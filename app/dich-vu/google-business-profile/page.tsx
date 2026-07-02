'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Search, Compass, Phone, ExternalLink, Star, Award, 
  CheckCircle2, XCircle, AlertCircle, ArrowRight, ChevronDown, 
  ChevronUp, Layout, MessageSquare, Image as ImageIcon, BarChart3, 
  TrendingUp, Sparkles, Code, FileText, Layers, Settings, 
  ShieldCheck, Briefcase, Map, Copy, Check
} from 'lucide-react';

// Define the 16 sections configuration for data-driven premium rendering
interface SectionItem {
  id: number;
  title: string;
  badge: string;
  description: string;
}

export default function Home() {
  // Navigation & Interactive Tabs
  const [activeTab, setActiveTab] = useState<'demo' | 'ai-auditor' | 'docs'>('demo');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // SECTION 5: Industry Selection
  const [selectedIndustry, setSelectedIndustry] = useState<string>('spa');

  // SECTION 9: Review simulator
  const [simulatedRating, setSimulatedRating] = useState<number>(5);
  const [simulatedReviewText, setSimulatedReviewText] = useState<string>('Dịch vụ rất chu đáo, nhân viên hỗ trợ nhiệt tình, vị trí showroom dễ tìm và có chỗ đỗ xe thoải mái!');
  const [simulatedResponse, setSimulatedResponse] = useState<string>(
    'PGS Agency xin cảm ơn đánh giá tuyệt vời của bạn! Sự hài lòng của quý khách về không gian và dịch vụ là động lực lớn để chúng tôi liên tục nâng cao trải nghiệm khách hàng.'
  );

  // SECTION 11: KPI Dashboard Slider
  const [kpiScale, setKpiScale] = useState<number>(1.5); // Simulation of growth

  // SECTION 12: Before/After case studies
  const [activeCase, setActiveCase] = useState<string>('clinic');

  // SECTION 13: Pricing Calculator
  const [selectedPackages, setSelectedPackages] = useState<string[]>(['setup', 'optimize']);
  const [includeCitations, setIncludeCitations] = useState<boolean>(true);

  // SECTION 14: FAQ Open States
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // AI Auditor Form State
  const [auditForm, setAuditForm] = useState({
    businessName: '',
    category: 'Spa & Thẩm mỹ viện',
    address: '',
    currentStatus: 'Chưa có Google Maps'
  });
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Utility to handle copy indicators
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Trigger Local SEO AI Analysis
  const runAiAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuditLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditForm)
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-charcoal-900 selection:bg-gold-100 selection:text-gold-700">
      
      {/* BRAND HEADER & NAVIGATION CONTAINER */}
      

      {/* CORE WRAPPER */}
      <main className="pb-24">
        
        {/* =========================================
            TAB 1: LIVE WEBSITE DEMO PREVIEW
            ========================================= */}
        {activeTab === 'demo' && (
          <div className="animate-fadeIn">
            
            {/* SECTION 1: HERO LOCAL VISIBILITY MAP */}
            <section className="relative overflow-hidden pt-10 pb-16 px-6 bg-gradient-to-b from-white to-stone-50">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                    <MapPin className="w-3.5 h-3.5 text-gold-500" />
                    Giải pháp Local Marketing Tổng thể
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-display font-bold leading-[1.15] text-stone-950 tracking-tight">
                    Dịch vụ <span className="text-gold-600 underline decoration-gold-200 decoration-4">Google Business Profile</span> giúp doanh nghiệp xuất hiện chuyên nghiệp trên Google Search và Google Maps
                  </h1>
                  
                  <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
                    PGS Agency xây dựng hệ thống định vị địa phương vững chắc, tăng trưởng uy tín, tối ưu từ khóa Local SEO giúp tăng 300% lượng cuộc gọi, chỉ đường và lượt ghé thăm website tự nhiên.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    <button 
                      onClick={() => setActiveTab('ai-auditor')}
                      className="bg-stone-950 text-white font-semibold rounded-xl text-sm px-6 py-3.5 hover:bg-stone-900 border border-stone-950 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      Tối ưu Google Business Profile ngay
                    </button>
                    <button 
                      onClick={() => {
                        const target = document.getElementById('pricing-section');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white hover:bg-stone-50 text-stone-950 border border-stone-200 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      Xem bảng giá dịch vụ
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gold-100 font-display">
                    <div>
                      <div className="text-3xl font-bold text-charcoal-900">100%</div>
                      <p className="text-xs text-charcoal-400 mt-1">Xác minh chính chủ</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gold-600">+300%</div>
                      <p className="text-xs text-charcoal-400 mt-1">Tăng trưởng Hotline & Map</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-charcoal-900">TOP 3</div>
                      <p className="text-xs text-charcoal-400 mt-1">Local SEO Search Pack</p>
                    </div>
                  </div>
                </div>

                {/* Hero 3D Concept Block: Map pin falling onto shiny white glass viewport */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-[420px] aspect-square rounded-3xl glass-gold p-6 flex flex-col justify-between overflow-hidden">
                    
                    {/* Animated grid overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                    {/* Top Row: Google Search Mockup Panel */}
                    <div className="relative bg-white/95 rounded-2xl p-4 shadow-sm border border-gold-100 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center text-gold-500">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-32 bg-charcoal-100 rounded" />
                        <div className="h-2 w-24 bg-charcoal-50 rounded mt-1.5" />
                      </div>
                      <span className="text-xs font-mono text-gold-600 font-medium bg-gold-100 px-2 py-0.5 rounded">#1 Local</span>
                    </div>

                    {/* Central 3D Interactive Core Map Simulation */}
                    <div className="relative my-4 flex-1 bg-white/40 rounded-2xl border border-gold-50 p-4 flex flex-col items-center justify-center">
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center cursor-pointer"
                      >
                        <MapPin className="w-16 h-16 text-gold-500 filter drop-shadow-[0_8px_16px_rgba(197,168,92,0.4)]" />
                        <div className="absolute top-14 w-8 h-2 bg-charcoal-900/10 rounded-full blur-[2px]" />
                      </motion.div>
                      
                      <div className="text-center mt-3 relative z-10">
                        <p className="font-display font-medium text-sm text-charcoal-900">PGS Agency HQ</p>
                        <p className="text-[10px] text-charcoal-400">Google Business Profile Active</p>
                      </div>
                    </div>

                    {/* Bottom Row: NAP consistency rating & dynamic reviews counts */}
                    <div className="relative bg-white/95 rounded-2xl p-3 shadow-md border border-gold-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-500">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />)}
                        </div>
                        <span className="text-xs font-bold text-charcoal-900">4.9/5</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">✓ Verified</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 2: GOOGLE BUSINESS PROFILE LÀ GÌ */}
            <section className="py-16 px-6 bg-white border-y border-gold-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 relative">
                  {/* Local Mobile Profile Mockup */}
                  <div className="w-full max-w-[340px] mx-auto bg-white rounded-[32px] border-[8px] border-charcoal-900 shadow-2xl p-4 space-y-3 font-sans text-xs">
                    
                    {/* Top Status Bar */}
                    <div className="flex justify-between text-[10px] text-charcoal-400 px-1">
                      <span>09:41</span>
                      <div className="flex gap-1 items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                        <span>Google Search</span>
                      </div>
                    </div>

                    {/* Search Result Header Card */}
                    <div className="bg-charcoal-50 p-2.5 rounded-xl space-y-2 border border-charcoal-100">
                      <div className="flex items-center gap-1.5 text-[9px] text-charcoal-400">
                        <MapPin className="w-2.5 h-2.5 text-gold-500" />
                        <span>Hà Nội · Gần bạn</span>
                      </div>
                      <div className="font-bold text-charcoal-900 text-sm">Nội Thất Luxury PGS</div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span className="font-semibold text-charcoal-800 text-[10px]">4.9</span>
                        <div className="flex">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-charcoal-400 text-[9px]">(186 đánh giá)</span>
                      </div>
                    </div>

                    {/* Interactive Highlights inside GBP Mockup */}
                    <div className="space-y-2">
                      <div className="border-l-2 border-gold-500 pl-2 py-1 bg-gold-50/50 rounded-r">
                        <div className="font-semibold text-charcoal-800 text-[10px]">📍 Địa chỉ (NAP)</div>
                        <p className="text-[9px] text-charcoal-400">123 Đường Láng, Đống Đa, Hà Nội</p>
                      </div>

                      <div className="border-l-2 border-gold-500 pl-2 py-1 bg-gold-50/50 rounded-r">
                        <div className="font-semibold text-charcoal-800 text-[10px]">🕒 Giờ làm việc</div>
                        <p className="text-[9px] text-charcoal-400">Mở cửa cả ngày (08:00 - 21:00)</p>
                      </div>

                      <div className="border-l-2 border-gold-500 pl-2 py-1 bg-gold-50/50 rounded-r">
                        <div className="font-semibold text-charcoal-800 text-[10px]">📞 Hotline liên hệ</div>
                        <p className="text-[9px] text-charcoal-400">098.xxx.xxxx</p>
                      </div>
                    </div>

                    {/* Action buttons preview */}
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-gold-500 text-white rounded-lg py-1.5 text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                        <Phone className="w-3 h-3" />
                        Gọi ngay
                      </div>
                      <div className="bg-gold-50 border border-gold-200 text-charcoal-800 rounded-lg py-1.5 text-[10px] flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                        <Compass className="w-3 h-3 text-gold-500" />
                        Chỉ đường
                      </div>
                      <div className="bg-gold-50 border border-gold-200 text-charcoal-800 rounded-lg py-1.5 text-[10px] flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                        <ExternalLink className="w-3 h-3 text-gold-500" />
                        Website
                      </div>
                    </div>

                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-gold-100 text-gold-700 px-3 py-1 rounded-md text-xs font-semibold w-fit">
                    Khái niệm & Bản chất
                  </div>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">
                    Google Business Profile (GBP) là gì?
                  </h2>
                  <p className="text-charcoal-800 leading-relaxed text-sm md:text-base">
                    Google Business Profile (trước đây là Google My Business) là <strong>hồ sơ doanh nghiệp chính chủ</strong> được cung cấp miễn phí bởi Google. Hồ sơ này cho phép doanh nghiệp hiển thị trực tiếp tất cả các thông tin quan trọng như tên thương hiệu, địa chỉ, hotline, giờ hoạt động, hình ảnh sản phẩm/không gian, khu vực phục vụ và nhận phản hồi (review) trực tiếp từ người tiêu dùng trên cả Google Search và Google Maps.
                  </p>
                  <p className="text-charcoal-400 text-xs italic bg-charcoal-50 p-3 rounded-lg border-l-4 border-gold-500">
                    *Mẹo từ PGS Agency: Sở hữu một GBP tối ưu chuẩn SEO là công cụ quan trọng bậc nhất để chiếm lĩnh tệp khách hàng có hành vi tìm kiếm cục bộ (Local Search) xung quanh địa bàn của bạn.
                  </p>
                </div>

              </div>
            </section>

            {/* SECTION 3: GOOGLE BUSINESS PROFILE KHÁC GOOGLE MAPS */}
            <section className="py-16 px-6 bg-gold-50/20">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="text-xs font-mono text-gold-600 font-semibold bg-gold-100/50 px-2.5 py-1 rounded-full w-fit mx-auto">Sự Khác Biệt Cốt Lõi</div>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Phân biệt Google Business Profile & Google Maps</h2>
                  <p className="text-charcoal-400 text-xs">Nhiều doanh nghiệp thường nhầm lẫn hai khái niệm này, dẫn đến tối ưu sai lệch.</p>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-gold-100 shadow-sm bg-white">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gold-50/50 border-b border-gold-100">
                        <th className="p-4 font-display font-semibold text-charcoal-900">Tiêu chí so sánh</th>
                        <th className="p-4 font-display font-semibold text-gold-700 bg-gold-50/30">Google Business Profile (GBP)</th>
                        <th className="p-4 font-display font-semibold text-charcoal-800">Google Maps</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-100/50">
                      <tr>
                        <td className="p-4 font-medium text-charcoal-900">Bản chất</td>
                        <td className="p-4 text-charcoal-800 bg-gold-50/10">Trang quản trị thông tin chính thức của doanh nghiệp.</td>
                        <td className="p-4 text-charcoal-400">Ứng dụng bản đồ hiển thị vị trí địa lý & chỉ đường.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-charcoal-900">Quyền sở hữu</td>
                        <td className="p-4 text-charcoal-800 bg-gold-50/10 font-medium text-gold-600">Doanh nghiệp đăng ký, xác minh và toàn quyền sở hữu.</td>
                        <td className="p-4 text-charcoal-400">Google nắm giữ; bất kỳ ai cũng có thể đóng góp địa điểm.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-charcoal-900">Tính năng chính</td>
                        <td className="p-4 text-charcoal-800 bg-gold-50/10">Đăng bài viết, trả lời review, đăng sản phẩm, chạy Ads.</td>
                        <td className="p-4 text-charcoal-400">Xem lộ trình, tìm đường đi, đo đạc khoảng cách.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-charcoal-900">Mục tiêu tối ưu</td>
                        <td className="p-4 text-charcoal-800 bg-gold-50/10 font-semibold text-charcoal-900">Chinh phục TOP 3 Local Search Pack trên Google.</td>
                        <td className="p-4 text-charcoal-400">Định vị điểm đến chính xác cho xe máy, ô tô.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: VÌ SAO DOANH NGHIỆP CẦN GBP */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Vì sao doanh nghiệp của bạn bắt buộc phải có GBP?</h2>
                  <p className="text-charcoal-400 text-xs mt-2">Hơn 85% người dùng tìm kiếm địa điểm bán hàng cục bộ trước khi quyết định ghé trực tiếp.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gold-50/20 p-6 rounded-2xl border border-gold-100 hover:border-gold-500 transition-gold">
                    <div className="h-10 w-10 bg-gold-500 text-white rounded-xl flex items-center justify-center mb-4">
                      <Star className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2 text-charcoal-900">Tăng Local Trust mạnh mẽ</h3>
                    <p className="text-xs text-charcoal-800 leading-relaxed">
                      Được Google xác minh chính chủ mang lại sự yên tâm tuyệt đối cho khách hàng khi tìm kiếm.
                    </p>
                  </div>

                  <div className="bg-gold-50/20 p-6 rounded-2xl border border-gold-100 hover:border-gold-500 transition-gold">
                    <div className="h-10 w-10 bg-gold-500 text-white rounded-xl flex items-center justify-center mb-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2 text-charcoal-900">Gợi ý cuộc gọi & Chỉ đường</h3>
                    <p className="text-xs text-charcoal-800 leading-relaxed">
                      Khách hàng có thể gọi trực tiếp hoặc nhấn nút chỉ đường bằng 1 chạm cực kỳ thuận tiện trên di động.
                    </p>
                  </div>

                  <div className="bg-gold-50/20 p-6 rounded-2xl border border-gold-100 hover:border-gold-500 transition-gold">
                    <div className="h-10 w-10 bg-gold-500 text-white rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2 text-charcoal-900">Hỗ trợ đắc lực cho Local SEO</h3>
                    <p className="text-xs text-charcoal-800 leading-relaxed">
                      GBP là lõi trung tâm giúp trang web của bạn đạt thứ hạng tìm kiếm địa phương cực tốt.
                    </p>
                  </div>

                  <div className="bg-gold-50/20 p-6 rounded-2xl border border-gold-100 hover:border-gold-500 transition-gold">
                    <div className="h-10 w-10 bg-gold-500 text-white rounded-xl flex items-center justify-center mb-4">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2 text-charcoal-900">Đòn bẩy uy tín khi chạy Ads</h3>
                    <p className="text-xs text-charcoal-800 leading-relaxed">
                      Kết nối Google Business với Google Ads giúp hiển thị địa chỉ trực tiếp trên mẫu quảng cáo tìm kiếm.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AI CẦN DỊCH VỤ NÀY (INTERACTIVE SELECTOR) */}
            <section className="py-16 px-6 bg-gold-50/10 border-t border-gold-100">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs bg-gold-100 text-gold-700 px-3 py-1 rounded font-semibold uppercase">Đối tượng phục vụ</span>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Doanh nghiệp nào cần tạo và tối ưu Google Maps?</h2>
                  <p className="text-charcoal-400 text-xs">Bấm chọn từng ngành để xem phương pháp và lợi ích tối ưu hóa tương ứng từ PGS Agency.</p>
                </div>

                {/* Industry Selector Grid */}
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { id: 'spa', name: 'Spa, Salon & Thẩm mỹ viện', icon: '🌸' },
                    { id: 'dental', name: 'Phòng khám & Nha khoa', icon: '🩺' },
                    { id: 'showroom', name: 'Showroom & Cửa hàng nội thất', icon: '🛋️' },
                    { id: 'restaurant', name: 'Nhà hàng & Quán Cà phê', icon: '☕' },
                    { id: 'edu', name: 'Trung tâm đào tạo & Trường học', icon: '🎓' },
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`px-5 py-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        selectedIndustry === ind.id
                          ? 'bg-gold-500 text-white shadow-md'
                          : 'bg-white hover:bg-gold-50 text-charcoal-800 border border-gold-100'
                      }`}
                    >
                      <span>{ind.icon}</span>
                      {ind.name}
                    </button>
                  ))}
                </div>

                {/* Selected Industry Card Dynamic Preview */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gold-100 shadow-sm max-w-4xl mx-auto">
                  <AnimatePresence mode="wait">
                    {selectedIndustry === 'spa' && (
                      <motion.div
                        key="spa"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🌸</span>
                          <h3 className="font-display font-semibold text-lg text-charcoal-900">Giải pháp cho Spa, Salon & Thẩm mỹ viện</h3>
                        </div>
                        <p className="text-charcoal-800 text-sm leading-relaxed">
                          Khách hàng làm đẹp thường tìm kiếm dựa trên vị trí địa lý rất cao (ví dụ: &ldquo;spa gần đây&rdquo;, &ldquo;thẩm mỹ viện Đống Đa&rdquo;). Tối ưu hóa GBP giúp spa hiển thị ảnh không gian sang trọng, bảng giá dịch vụ làm đẹp rõ ràng, và liên kết trực tiếp nút &ldquo;Đặt lịch hẹn&rdquo;.
                        </p>
                        <div className="bg-gold-50/50 p-4 rounded-xl text-xs text-gold-700 font-semibold grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>✓ Đặt lịch hẹn trực tiếp qua Google Business</div>
                          <div>✓ Tải lên ảnh Before/After chất lượng cao</div>
                          <div>✓ Thu hút review vàng khẳng định uy tín</div>
                          <div>✓ Thúc đẩy cuộc gọi nhờ chỉ đường ngắn nhất</div>
                        </div>
                      </motion.div>
                    )}
                    {selectedIndustry === 'dental' && (
                      <motion.div
                        key="dental"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🩺</span>
                          <h3 className="font-display font-semibold text-lg text-charcoal-900">Giải pháp cho Phòng khám & Nha khoa</h3>
                        </div>
                        <p className="text-charcoal-800 text-sm leading-relaxed">
                          Uy tín y khoa và sự thuận tiện địa điểm là yếu tố tiên quyết. Tối ưu GBP nha khoa tập trung vào hiển thị đội ngũ bác sĩ chuyên khoa, giấy phép hoạt động, thông tin NAP chính xác 100% để tăng lòng tin ban đầu cho bệnh nhân.
                        </p>
                        <div className="bg-gold-50/50 p-4 rounded-xl text-xs text-gold-700 font-semibold grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>✓ Đồng bộ thông tin giờ mở cửa và cấp cứu khẩn cấp</div>
                          <div>✓ Tối ưu hóa từ khóa chuyên sâu Nha Khoa Cục Bộ</div>
                          <div>✓ Hiển thị đánh giá của bệnh nhân cũ chân thực</div>
                          <div>✓ Trả lời thắc mắc trực tuyến 24/7</div>
                        </div>
                      </motion.div>
                    )}
                    {selectedIndustry === 'showroom' && (
                      <motion.div
                        key="showroom"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🛋️</span>
                          <h3 className="font-display font-semibold text-lg text-charcoal-900">Giải pháp cho Showroom & Cửa hàng nội thất</h3>
                        </div>
                        <p className="text-charcoal-800 text-sm leading-relaxed">
                          Nhu cầu trải nghiệm thực tế sản phẩm nội thất là rất lớn. PGS Agency giúp showroom nội thất cấu hình Tab Sản Phẩm hiển thị bắt mắt, điều hướng khách hàng trực tiếp đến xem showroom bằng Google Maps chỉ đường.
                        </p>
                        <div className="bg-gold-50/50 p-4 rounded-xl text-xs text-gold-700 font-semibold grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>✓ Tải lên ảnh không gian trưng bày 360 độ góc rộng</div>
                          <div>✓ Cấu hình tab Sản phẩm nổi bật kèm báo giá trực quan</div>
                          <div>✓ Tối ưu Maps để chỉ đường đỗ ô tô dễ dàng</div>
                          <div>✓ Tận dụng bài đăng giới thiệu bộ sưu tập mới liên tục</div>
                        </div>
                      </motion.div>
                    )}
                    {selectedIndustry === 'restaurant' && (
                      <motion.div
                        key="restaurant"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">☕</span>
                          <h3 className="font-display font-semibold text-lg text-charcoal-900">Giải pháp cho Nhà hàng & Quán Cà phê</h3>
                        </div>
                        <p className="text-charcoal-800 text-sm leading-relaxed">
                          Tối ưu menu thực đơn điện tử ngay trên Maps, đăng tải hình ảnh các món ăn hấp dẫn, cập nhật nhanh chóng các chương trình ưu đãi hàng tuần để kích thích tệp khách hàng xung quanh ghé thăm ăn uống.
                        </p>
                        <div className="bg-gold-50/50 p-4 rounded-xl text-xs text-gold-700 font-semibold grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>✓ Trưng bày Menu điện tử trực quan có kèm báo giá</div>
                          <div>✓ Thêm nút Gọi món hoặc Đặt bàn thuận tiện</div>
                          <div>✓ Đăng hình ảnh đồ ăn uống có độ nét cao</div>
                          <div>✓ Trả lời review nhanh chóng thúc đẩy tương tác</div>
                        </div>
                      </motion.div>
                    )}
                    {selectedIndustry === 'edu' && (
                      <motion.div
                        key="edu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🎓</span>
                          <h3 className="font-display font-semibold text-lg text-charcoal-900">Giải pháp cho Trung tâm đào tạo & Trường học</h3>
                        </div>
                        <p className="text-charcoal-800 text-sm leading-relaxed">
                          Phụ huynh và học viên thường ưu ái chọn các cơ sở giáo dục gần nhà hoặc thuận tiện đưa đón. GBP được tối ưu giúp đưa ra thông tin khóa học, học phí, hình ảnh cơ sở vật chất phòng học sạch sẽ, hiện đại nhằm gia tăng uy tín tuyển sinh.
                        </p>
                        <div className="bg-gold-50/50 p-4 rounded-xl text-xs text-gold-700 font-semibold grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>✓ Giới thiệu chi tiết lộ trình khóa học nổi bật</div>
                          <div>✓ Tải lên ảnh phòng học, trang thiết bị học tập</div>
                          <div>✓ Nhận đánh giá chất lượng từ cựu học viên thực tế</div>
                          <div>✓ Định vị chính xác cổng trường, hướng dẫn đỗ xe đưa đón</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* SECTION 6 & 7: HẠNG MỤC TỐI ƯU & QUY TRÌNH DANH MỤC */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Hạng mục tối ưu & Kỹ thuật Thiết lập GBP chuẩn SEO</h2>
                  <p className="text-charcoal-800 text-sm leading-relaxed">
                    PGS Agency không chỉ tạo tài khoản đơn thuần, chúng tôi thực hiện cấu trúc tối ưu hóa nâng cao hơn 30 tiêu chuẩn khắt khe nhất của Google để hồ sơ đạt điểm uy tín tuyệt đối (Local SEO Signals):
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 bg-gold-50/30 p-3 rounded-lg border border-gold-100/50">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-charcoal-900">Cấu hình Danh mục chính & phụ</h4>
                        <p className="text-[11px] text-charcoal-400 mt-0.5">Đặt chính xác ngành hoạt động và tối đa 3 danh mục bổ trợ.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gold-50/30 p-3 rounded-lg border border-gold-100/50">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-charcoal-900">Mô tả chứa từ khóa địa phương</h4>
                        <p className="text-[11px] text-charcoal-400 mt-0.5">Viết văn bản 750 từ giới thiệu chuẩn văn phong, chứa từ khóa SEO.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gold-50/30 p-3 rounded-lg border border-gold-100/50">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-charcoal-900">Đồng bộ hóa NAP tuyệt đối</h4>
                        <p className="text-[11px] text-charcoal-400 mt-0.5">Nhất quán Tên, Địa chỉ, Số điện thoại trên mọi nền tảng số.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gold-50/30 p-3 rounded-lg border border-gold-100/50">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-charcoal-900">Xác minh Google chính thức</h4>
                        <p className="text-[11px] text-charcoal-400 mt-0.5">Hỗ trợ xác minh qua video, gửi thư hoặc gọi điện nhanh gọn.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  {/* Category editor mockup visual */}
                  <div className="bg-charcoal-900 rounded-2xl p-5 text-white font-mono text-[11px] space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                      </div>
                      <span className="text-gold-500 text-[10px]">GBP_SEO_OPTIMIZER v1.0</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-charcoal-400">{"// Khai báo Danh mục chính & phụ tối ưu"}</p>
                      <p><span className="text-amber-400">const</span> gbpConfig = &#123;</p>
                      <p className="pl-4">business_name: <span className="text-emerald-300">&quot;PGS Agency - Marketing Agency&quot;</span>,</p>
                      <p className="pl-4">category_primary: <span className="text-emerald-300">&quot;Dịch vụ tiếp thị internet&quot;</span>,</p>
                      <p className="pl-4">categories_secondary: [</p>
                      <p className="pl-8"><span className="text-emerald-300">&quot;Công ty quảng cáo&quot;</span>,</p>
                      <p className="pl-8"><span className="text-emerald-300">&quot;Dịch vụ thiết kế trang web&quot;</span></p>
                      <p className="pl-4">],</p>
                      <p className="pl-4">description: <span className="text-emerald-300">&quot;Marketing tổng thể đa nền tảng...&quot;</span></p>
                      <p>&#125;;</p>
                    </div>

                    <div className="bg-charcoal-800/80 p-3 rounded border border-charcoal-700 text-amber-500 text-[10px]">
                      ⚡ PHÂN TÍCH: Danh mục chính xác chiếm tới 48% trọng số xếp hạng của Google Maps Pack!
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 8: HÌNH ẢNH & BÀI ĐĂNG TRÊN GBP */}
            <section className="py-16 px-6 bg-gold-50/10 border-y border-gold-100">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Quản trị Hình ảnh & Bài đăng đều đặn chuẩn SEO</h2>
                  <p className="text-charcoal-800 text-sm">Hình ảnh chân thực và bài đăng cập nhật đều đặn giúp giữ hồ sơ luôn hoạt động, tăng tương tác với thuật toán Google.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm space-y-3">
                    <div className="h-40 bg-gold-50 rounded-lg flex items-center justify-center text-gold-500 relative overflow-hidden group">
                      <span className="text-4xl">🏢</span>
                    </div>
                    <h4 className="font-semibold text-sm text-charcoal-900">Ảnh thực tế ngoại cảnh & nội thất</h4>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Chụp rõ nét biển hiệu mặt tiền ban ngày, bãi đỗ xe và không gian quầy lễ tân bên trong giúp khách dễ nhận diện khi ghé thăm.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm space-y-3">
                    <div className="h-40 bg-gold-50 rounded-lg flex items-center justify-center text-gold-500 relative overflow-hidden group">
                      <span className="text-4xl">👥</span>
                    </div>
                    <h4 className="font-semibold text-sm text-charcoal-900">Ảnh nhân sự & Quy trình làm việc</h4>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Đăng tải ảnh chụp đội ngũ nhân sự, hoạt động chăm sóc thực tế để xây dựng tính nhân văn và uy tín vững vàng (E-E-A-T).
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm space-y-3">
                    <div className="h-40 bg-gold-50 rounded-lg flex items-center justify-center text-gold-500 relative overflow-hidden group">
                      <span className="text-4xl">📢</span>
                    </div>
                    <h4 className="font-semibold text-sm text-charcoal-900">Bài viết cập nhật ưu đãi & tin tức</h4>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Bài đăng dạng &ldquo;Ưu đãi&rdquo; hoặc &ldquo;Cập nhật&rdquo; hiển thị trực tiếp trên kết quả tìm kiếm, chuyển đổi khách vãng lai cực tốt.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: REVIEW & TRUST (INTERACTIVE REVIEW SIMULATOR) */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded font-semibold">Tín hiệu tương tác cao</span>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Chiến lược Quản trị Đánh giá & Xây dựng Lòng tin</h2>
                  <p className="text-charcoal-800 text-sm">Review thật, tự nhiên từ khách hàng có sức nặng gấp 10 lần quảng cáo. Hãy thử công cụ mô phỏng phản hồi chuyên nghiệp của PGS Agency.</p>
                </div>

                {/* Review Simulator UI */}
                <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gold-200 shadow-sm space-y-4">
                  <div className="font-display font-semibold text-sm text-charcoal-900 border-b border-gold-100 pb-2">
                    💬 Trình mô phỏng trả lời đánh giá PGS Agency GBP
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-charcoal-800">1. Chọn số sao đánh giá:</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setSimulatedRating(star);
                            if (star >= 4) {
                              setSimulatedReviewText('Showroom rất đẹp, dịch vụ tốt, nhân viên tư vấn nhiệt tình đúng chuẩn PGS Agency tư vấn.');
                              setSimulatedResponse('Cảm ơn bạn đã tin tưởng lựa chọn PGS Agency! Sự hài lòng của bạn là niềm hạnh phúc lớn nhất của toàn thể đội ngũ.');
                            } else {
                              setSimulatedReviewText('Maps định vị hơi lệch một đoạn ngắn ở ngõ hẻm và hotline bận lúc giờ cao điểm.');
                              setSimulatedResponse('Thành thật xin lỗi quý khách về bất tiện trên! PGS Agency đã ngay lập tức cập nhật lại tọa độ lối đi và bổ sung thêm tổng đài hỗ trợ 24/7 để phục vụ bạn tốt hơn.');
                            }
                          }}
                          className={`p-2 rounded-lg border text-sm transition-all flex items-center gap-1 ${
                            simulatedRating === star 
                              ? 'bg-amber-500 text-white border-amber-600' 
                              : 'bg-white text-amber-500 border-gold-100'
                          }`}
                        >
                          {star} <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-charcoal-800">2. Nội dung khách viết đánh giá:</label>
                    <textarea
                      value={simulatedReviewText}
                      onChange={(e) => setSimulatedReviewText(e.target.value)}
                      className="w-full bg-white p-3 rounded-xl border border-gold-100 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                      rows={3}
                    />
                  </div>

                  {/* Generated response section representing PGS professionalism */}
                  <div className="bg-gold-50/50 p-4 rounded-xl border border-gold-200/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gold-700 uppercase tracking-wider">★ Phản hồi gợi ý của PGS Agency:</span>
                      <span className="text-[9px] text-charcoal-400 font-mono">Cách ứng xử chuẩn E-E-A-T</span>
                    </div>
                    <p className="text-xs text-charcoal-800 leading-relaxed italic">
                      &ldquo;{simulatedResponse}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: LOCAL SEO & CÁC MỐI LIÊN KẾT */}
            <section className="py-16 px-6 bg-gold-50/10 border-t border-gold-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <div className="text-xs font-mono text-gold-600 font-semibold bg-gold-100 px-2 py-1 rounded w-fit">Tín hiệu xếp hạng nâng cao</div>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Chiến lược Local SEO phủ rộng toàn diện</h2>
                  <p className="text-charcoal-800 text-sm leading-relaxed">
                    Một hồ sơ GBP không thể tự đứng một mình để đạt TOP 1. PGS Agency xây dựng <strong>Mạng lưới tín hiệu Local SEO đồng bộ</strong>, liên kết chặt chẽ tài khoản bản đồ của bạn với toàn bộ tài sản số:
                  </p>

                  <ul className="space-y-3.5 text-xs text-charcoal-800">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold-500" />
                      <strong>Kết nối Website Schema:</strong> Chèn mã Schema LocalBusiness chuẩn cấu trúc JSON-LD vào website chính.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold-500" />
                      <strong>Xây dựng Directory & Citations:</strong> Đăng tải định danh đồng nhất trên hơn 50 danh bạ doanh nghiệp lớn Việt Nam.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold-500" />
                      <strong>Đồng bộ Social Profiles:</strong> Khai báo địa chỉ chính xác trên Fanpage, YouTube, LinkedIn, Pinterest...
                    </li>
                  </ul>
                </div>

                {/* Local SEO Network Visual Mockup */}
                <div className="lg:col-span-6 relative bg-white rounded-2xl p-6 border border-gold-100 shadow-sm">
                  <div className="text-center font-display font-semibold text-xs mb-6 text-charcoal-900">
                    Sơ đồ Mạng lưới liên kết tín hiệu Local SEO (PGS Core)
                  </div>
                  
                  {/* Visual nodes */}
                  <div className="grid grid-cols-3 gap-4 text-center font-mono text-[10px]">
                    <div className="bg-charcoal-50 p-3 rounded-lg border border-charcoal-100 text-charcoal-400">Social Profiles</div>
                    <div className="bg-charcoal-50 p-3 rounded-lg border border-charcoal-100 text-charcoal-400">Citations & Maps</div>
                    <div className="bg-charcoal-50 p-3 rounded-lg border border-charcoal-100 text-charcoal-400">Local Directories</div>

                    <div className="col-span-3 flex justify-center py-2">
                      <div className="h-8 w-0.5 bg-gradient-to-b from-charcoal-200 to-gold-500" />
                    </div>

                    <div className="col-span-3 bg-gold-500 text-white font-sans font-bold p-4 rounded-xl shadow-md border border-gold-600">
                      📍 Google Business Profile (Core NAP Hub)
                    </div>

                    <div className="col-span-3 flex justify-center py-2">
                      <div className="h-8 w-0.5 bg-gradient-to-b from-gold-500 to-charcoal-200" />
                    </div>

                    <div className="col-span-3 bg-charcoal-900 text-white p-3 rounded-lg border border-charcoal-800">
                      🌐 Official Website (Embedded LocalBusiness JSON-LD)
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 11: DASHBOARD KPI GBP (INTERACTIVE METRIC) */}
            <section className="py-16 px-6 bg-white border-y border-gold-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Hệ thống báo cáo đo lường KPI minh bạch</h2>
                  <p className="text-charcoal-800 text-sm leading-relaxed">
                    Bạn không mơ hồ về hiệu quả. Định kỳ hàng tháng, PGS Agency cung cấp báo cáo chi tiết xuất trực tiếp từ trang thống kê hiệu suất chính thống của Google Business Profile:
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-semibold text-charcoal-800">
                      <span>Tỉ lệ tăng trưởng dự kiến:</span>
                      <span className="text-gold-600">x{(kpiScale * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={kpiScale}
                      onChange={(e) => setKpiScale(parseFloat(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <p className="text-[10px] text-charcoal-400 italic">
                      *Kéo thanh trượt để xem lượng khách gọi và tìm đường tăng trưởng sau khi PGS Agency tối ưu hóa.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {/* Simulated interactive KPI Dashboard chart container */}
                  <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gold-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b border-gold-100 pb-3">
                      <div>
                        <span className="text-[10px] text-charcoal-400 font-mono">GOOGLE INSIGHTS REPORT</span>
                        <h4 className="font-display font-semibold text-sm text-charcoal-900">Số lượng tương tác hồ sơ (Hàng tháng)</h4>
                      </div>
                      <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded font-mono font-bold">Live Graph</span>
                    </div>

                    <div className="space-y-4 font-sans">
                      {/* Metric 1: Views */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-charcoal-800">👁️ Lượt xem hồ sơ (Tự nhiên)</span>
                          <span className="font-bold text-charcoal-900">{(1200 * kpiScale).toFixed(0)} lượt</span>
                        </div>
                        <div className="h-3 w-full bg-charcoal-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gold-500 transition-all duration-300"
                            style={{ width: `${Math.min(100, 30 * kpiScale)}%` }}
                          />
                        </div>
                      </div>

                      {/* Metric 2: Directions */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-charcoal-800">🧭 Số yêu cầu Chỉ đường</span>
                          <span className="font-bold text-charcoal-900">{(350 * kpiScale).toFixed(0)} người</span>
                        </div>
                        <div className="h-3 w-full bg-charcoal-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-600 transition-all duration-300"
                            style={{ width: `${Math.min(100, 45 * kpiScale)}%` }}
                          />
                        </div>
                      </div>

                      {/* Metric 3: Calls */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-charcoal-800">📞 Số cuộc gọi Hotline</span>
                          <span className="font-bold text-charcoal-900">{(180 * kpiScale).toFixed(0)} cuộc gọi</span>
                        </div>
                        <div className="h-3 w-full bg-charcoal-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-charcoal-900 transition-all duration-300"
                            style={{ width: `${Math.min(100, 55 * kpiScale)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 12: DỰ ÁN THỰC TẾ GBP (BEFORE / AFTER CASE) */}
            <section className="py-16 px-6 bg-gold-50/10">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs bg-gold-100 text-gold-700 px-3 py-1 rounded font-semibold uppercase font-mono">Case Studies</span>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Dự án Google Business Profile thực tế đã triển khai</h2>
                  <p className="text-charcoal-800 text-sm">Xem kết quả lột xác của các doanh nghiệp đối tác sau khi được PGS Agency tiếp quản tối ưu.</p>
                </div>

                {/* Case Selector Tabs */}
                <div className="flex justify-center gap-2 border-b border-gold-200 max-w-md mx-auto pb-2">
                  <button 
                    onClick={() => setActiveCase('clinic')}
                    className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
                      activeCase === 'clinic' ? 'border-gold-500 text-gold-700' : 'border-transparent text-charcoal-400'
                    }`}
                  >
                    Nha Khoa Smile Care
                  </button>
                  <button 
                    onClick={() => setActiveCase('furniture')}
                    className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
                      activeCase === 'furniture' ? 'border-gold-500 text-gold-700' : 'border-transparent text-charcoal-400'
                    }`}
                  >
                    Nội Thất Cozy Homes
                  </button>
                </div>

                {/* Case details Before/After display */}
                <div className="bg-white rounded-2xl border border-gold-100 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                  
                  {/* Before state column */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded">TRƯỚC KHI PGS AGENCY TỐI ƯU</span>
                    <div className="bg-red-50/20 p-4 rounded-xl border border-red-100 space-y-2">
                      <div className="text-charcoal-900 font-display font-semibold text-sm">
                        {activeCase === 'clinic' ? 'Nha khoa Smile Care HN (Chưa xác minh)' : 'Cửa hàng nội thất Cozy Homes Đống Đa'}
                      </div>
                      <p className="text-xs text-charcoal-800 leading-relaxed">
                        - Thông tin địa chỉ mập mờ, thiếu hotline và giờ mở cửa.<br />
                        - Không xuất hiện trong Top 10 khi tìm kiếm từ khóa cục bộ.<br />
                        - Điểm đánh giá trung bình thấp (3.2 sao) do không quản lý phản hồi tiêu cực.
                      </p>
                    </div>
                  </div>

                  {/* After state column */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">SAU KHI PGS AGENCY TỐI ƯU</span>
                    <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100 space-y-2">
                      <div className="text-charcoal-900 font-display font-semibold text-sm flex items-center gap-1.5">
                        {activeCase === 'clinic' ? 'Nha Khoa Thẩm Mỹ Smile Care' : 'Nội Thất Cao Cấp Cozy Homes'}
                        <span className="text-[10px] text-white bg-gold-500 px-1.5 py-0.5 rounded font-mono">Verified✓</span>
                      </div>
                      <p className="text-xs text-charcoal-800 leading-relaxed">
                        - Đồng bộ NAP 100%, bổ sung hơn 20 ảnh phòng dịch vụ chuẩn Geotag.<br />
                        - <strong className="text-emerald-700">TOP 3 Bản đồ</strong> chỉ sau 21 ngày triển khai chiến dịch SEO.<br />
                        - Lượng cuộc gọi tư vấn <strong className="text-emerald-700">tăng gấp 3.4 lần</strong>.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 13: GÓI DỊCH VỤ (INTERACTIVE CALCULATOR) */}
            <section id="pricing-section" className="py-16 px-6 bg-white border-t border-gold-100">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs bg-gold-100 text-gold-700 px-3 py-1 rounded font-semibold uppercase">Bảng giá minh bạch</span>
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Các gói dịch vụ Google Business Profile tại PGS Agency</h2>
                  <p className="text-charcoal-800 text-sm">Lựa chọn gói thầu phù hợp với quy mô và chiến lược tăng trưởng của doanh nghiệp bạn.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Package 1 */}
                  <div className={`p-6 rounded-2xl border transition-gold flex flex-col justify-between ${
                    selectedPackages.includes('setup') ? 'border-gold-500 bg-gold-50/10' : 'border-gold-100 bg-white'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-charcoal-400 font-mono">GÓI KHỞI ĐẦU</span>
                        <input 
                          type="checkbox"
                          checked={selectedPackages.includes('setup')}
                          onChange={() => {
                            if (selectedPackages.includes('setup')) {
                              setSelectedPackages(selectedPackages.filter(p => p !== 'setup'));
                            } else {
                              setSelectedPackages([...selectedPackages, 'setup']);
                            }
                          }}
                          className="h-4 w-4 accent-gold-500 cursor-pointer"
                        />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-charcoal-900">GBP Setup</h3>
                      <div className="text-2xl font-bold text-charcoal-900">2,500,000 VND</div>
                      <p className="text-xs text-charcoal-400">Khởi tạo &amp; Xác minh cơ bản chính chủ với Google</p>
                      
                      <ul className="text-xs text-charcoal-800 space-y-2 pt-4 border-t border-gold-100">
                        <li>• Tạo hồ sơ doanh nghiệp chuẩn chỉnh</li>
                        <li>• Hướng dẫn &amp; xử lý xác minh chính chủ</li>
                        <li>• Thiết lập NAP đồng bộ, giờ hoạt động</li>
                        <li>• Thiết kế ảnh Cover &amp; Logo chuẩn size</li>
                      </ul>
                    </div>
                  </div>

                  {/* Package 2 */}
                  <div className={`p-6 rounded-2xl border transition-gold relative overflow-hidden flex flex-col justify-between ${
                    selectedPackages.includes('optimize') ? 'border-gold-500 bg-gold-50/20' : 'border-gold-200 bg-white'
                  }`}>
                    <span className="absolute top-0 right-0 bg-gold-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl">RECOMMENDED</span>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gold-600 font-mono">BÁN CHẠY NHẤT</span>
                        <input 
                          type="checkbox"
                          checked={selectedPackages.includes('optimize')}
                          onChange={() => {
                            if (selectedPackages.includes('optimize')) {
                              setSelectedPackages(selectedPackages.filter(p => p !== 'optimize'));
                            } else {
                              setSelectedPackages([...selectedPackages, 'optimize']);
                            }
                          }}
                          className="h-4 w-4 accent-gold-500 cursor-pointer"
                        />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-charcoal-900">GBP Optimization</h3>
                      <div className="text-2xl font-bold text-gold-600">4,500,000 VND</div>
                      <p className="text-xs text-charcoal-400">Tối ưu hóa sâu chuẩn SEO nâng cao vượt đối thủ</p>
                      
                      <ul className="text-xs text-charcoal-800 space-y-2 pt-4 border-t border-gold-100">
                        <li>• Gồm tất cả quyền lợi của gói Setup</li>
                        <li>• Nghiên cứu bộ từ khóa Local SEO độc quyền</li>
                        <li>• Viết phần mô tả 750 từ chuẩn SEO</li>
                        <li>• Geotag tọa độ GPS cho 30 ảnh thực tế</li>
                        <li>• Tạo danh mục dịch vụ &amp; menu sản phẩm</li>
                      </ul>
                    </div>
                  </div>

                  {/* Package 3 */}
                  <div className={`p-6 rounded-2xl border transition-gold flex flex-col justify-between ${
                    selectedPackages.includes('care') ? 'border-gold-500 bg-gold-50/10' : 'border-gold-100 bg-white'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-charcoal-400 font-mono">GIÁ TRỊ LÂU DÀI</span>
                        <input 
                          type="checkbox"
                          checked={selectedPackages.includes('care')}
                          onChange={() => {
                            if (selectedPackages.includes('care')) {
                              setSelectedPackages(selectedPackages.filter(p => p !== 'care'));
                            } else {
                              setSelectedPackages([...selectedPackages, 'care']);
                            }
                          }}
                          className="h-4 w-4 accent-gold-500 cursor-pointer"
                        />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-charcoal-900">Local Visibility Care</h3>
                      <div className="text-2xl font-bold text-charcoal-900">3,000,000 VND <span className="text-xs font-normal">/tháng</span></div>
                      <p className="text-xs text-charcoal-400">Chăm sóc, duy trì vị thế TOP Maps và báo cáo định kỳ</p>
                      
                      <ul className="text-xs text-charcoal-800 space-y-2 pt-4 border-t border-gold-100">
                        <li>• Đăng 2 bài viết chuẩn SEO đều đặn mỗi tuần</li>
                        <li>• Đăng tải ảnh thực tế hoạt động liên tục</li>
                        <li>• Theo dõi, tối ưu phản hồi review &amp; báo cáo</li>
                        <li>• Xử lý spam map đối thủ chơi xấu</li>
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Live Estimator Cost Panel */}
                <div className="bg-charcoal-900 text-white rounded-3xl p-6 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-500/30">
                  <div>
                    <h4 className="font-display font-semibold text-base text-gold-500">Trình dự toán ngân sách đầu tư Local Maps</h4>
                    <p className="text-xs text-charcoal-100 mt-1">Lựa chọn các gói ở trên để nhận báo giá chiết khấu đặc quyền từ PGS Agency.</p>
                    
                    <div className="flex items-center gap-2 mt-3 text-xs">
                      <input 
                        type="checkbox"
                        id="citations"
                        checked={includeCitations}
                        onChange={(e) => setIncludeCitations(e.target.checked)}
                        className="h-3.5 w-3.5 accent-gold-500"
                      />
                      <label htmlFor="citations" className="cursor-pointer text-charcoal-50">Tích hợp gói phủ 50 danh bạ doanh nghiệp (+1,500,000 VND)</label>
                    </div>
                  </div>

                  <div className="text-center md:text-right shrink-0">
                    <span className="text-[10px] text-charcoal-400 block font-mono">TỔNG CHI PHÍ ƯỚC TÍNH:</span>
                    <span className="text-2xl font-bold text-gold-500">
                      {((selectedPackages.includes('setup') ? 2500000 : 0) +
                        (selectedPackages.includes('optimize') ? 4500000 : 0) +
                        (selectedPackages.includes('care') ? 3000000 : 0) +
                        (includeCitations ? 1500000 : 0)).toLocaleString('vi-VN')}{' '}
                      VND
                    </span>
                    <button 
                      onClick={() => {
                        const target = document.getElementById('section-cta');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-2 block w-full md:w-auto bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
                    >
                      Nhận ưu đãi ngay
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 14: FAQ ACCORDION */}
            <section className="py-16 px-6 bg-gold-50/10">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-display font-medium text-charcoal-900">Hỏi đáp mở rộng về Google Business Profile</h2>
                  <p className="text-charcoal-800 text-sm">Lời khuyên trực tiếp từ Chuyên gia Tư vấn PGS Agency giải đáp những thắc mắc phổ biến nhất.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { id: 1, q: "Dịch vụ Google Business Profile có bao gồm tạo tài khoản Google Maps không?", a: "Có, khi PGS tạo và xác minh Google Business Profile cho bạn, địa điểm của bạn sẽ tự động hiển thị công khai trên ứng dụng Google Maps cho tất cả mọi người cùng tìm kiếm." },
                    { id: 2, q: "Mất bao lâu để Google xác minh thành công hồ sơ của tôi?", a: "Thông thường quy trình xác minh qua thư từ 7-14 ngày. Tuy nhiên, với tư cách là đối tác chuyên nghiệp của Google, PGS Agency có các giải pháp kỹ thuật xác minh trực tiếp qua video hoặc email doanh nghiệp chỉ trong vòng 24 đến 48 giờ làm việc." },
                    { id: 3, q: "Doanh nghiệp của tôi không có văn phòng vật lý thật có tạo Maps được không?", a: "Vẫn được. Google cho phép cấu hình loại hình 'Khu vực phục vụ' (Service Area Business) cho các dịch vụ tận nơi như sửa chữa điện nước, vận chuyển mà không cần hiển thị công khai địa chỉ nhà riêng của bạn." },
                    { id: 4, q: "PGS Agency có hỗ trợ xử lý đánh giá xấu (1 sao) trên Maps không?", a: "PGS hỗ trợ tư vấn xử lý pháp lý & kĩ thuật: thiết lập báo cáo vi phạm nội dung chống lại chính sách của Google đối với các review giả, spam cố ý dìm hàng của đối thủ cạnh tranh để Google tiến hành gỡ bỏ." }
                  ].map((faq) => (
                    <div 
                      key={faq.id} 
                      className="bg-white rounded-xl border border-gold-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                        className="w-full p-4 flex justify-between items-center text-left text-xs md:text-sm font-semibold text-charcoal-900 hover:bg-gold-50/30 transition-all"
                      >
                        <span>{faq.q}</span>
                        {openFaqId === faq.id ? <ChevronUp className="w-4 h-4 text-gold-500" /> : <ChevronDown className="w-4 h-4 text-gold-500" />}
                      </button>
                      <AnimatePresence>
                        {openFaqId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-xs text-charcoal-800 leading-relaxed border-t border-gold-50/50 bg-[#FCFAF5]">
                              {faq.a}
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
            <section className="py-16 px-6 bg-white border-t border-gold-100">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-2xl font-display font-medium text-charcoal-900">Giải pháp tiếp thị tổng thể từ PGS Agency</h2>
                  <p className="text-charcoal-800 text-xs mt-2">Chúng tôi xây dựng hệ sinh thái truyền thông tăng trưởng hợp nhất giúp doanh nghiệp chuyển đổi số bứt phá.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
                  <div className="p-5 rounded-2xl border border-gold-100 bg-[#FAF9F6] space-y-2">
                    <span className="text-2xl">📈</span>
                    <h4 className="font-display font-semibold text-xs text-charcoal-900">SEO Tổng Thể Đa Nền Tảng</h4>
                    <p className="text-[11px] text-charcoal-400">Đưa từ khóa website của bạn lên TOP 1 Google bền vững.</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-gold-100 bg-[#FAF9F6] space-y-2">
                    <span className="text-2xl">💻</span>
                    <h4 className="font-display font-semibold text-xs text-charcoal-900">Thiết Kế Website Cao Cấp</h4>
                    <p className="text-[11px] text-charcoal-400">Xây dựng giao diện UX/UI đỉnh cao, tối ưu CRO tăng tỷ lệ mua hàng.</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-gold-100 bg-[#FAF9F6] space-y-2">
                    <span className="text-2xl">📰</span>
                    <h4 className="font-display font-semibold text-xs text-charcoal-900">PR Báo Chí & Thương Hiệu</h4>
                    <p className="text-[11px] text-charcoal-400">Phủ sóng thương hiệu trên các trang báo uy tín nhất Việt Nam.</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-gold-100 bg-[#FAF9F6] space-y-2">
                    <span className="text-2xl">🛡️</span>
                    <h4 className="font-display font-semibold text-xs text-charcoal-900">Chăm Sóc & Tối Ưu Website</h4>
                    <p className="text-[11px] text-charcoal-400">Vận hành kỹ thuật, viết bài đăng chuẩn SEO định kỳ ổn định.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 16: CTA CUỐI TRANG */}
            <section id="section-cta" className="py-16 px-6 bg-gradient-to-t from-gold-50 to-white border-t border-gold-100">
              <div className="max-w-3xl mx-auto bg-charcoal-900 rounded-[32px] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
                
                <div className="relative z-10 space-y-6">
                  <div className="mx-auto w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    P
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-gold-500">
                    Khách hàng tìm kiếm bạn trên Google đã nhìn thấy đủ thông tin đáng tin chưa?
                  </h2>
                  <p className="text-xs text-charcoal-100 leading-relaxed max-w-xl mx-auto">
                    Để đối thủ cướp mất hàng nghìn cuộc gọi địa phương mỗi tháng là tổn thất khổng lồ. Hãy để PGS Agency kiến tạo một hồ sơ định vị chuyên nghiệp chuẩn SEO ngay hôm nay.
                  </p>

                  <div className="pt-4">
                    <button 
                      onClick={() => setActiveTab('ai-auditor')}
                      className="bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      Bắt đầu tạo &amp; tối ưu hóa ngay
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* =========================================
            TAB 2: AI-POWERED SEO AUDITOR INTERACTION
            ========================================= */}
        {activeTab === 'ai-auditor' && (
          <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8 animate-fadeIn">
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gold-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold text-charcoal-900">Công cụ Kiểm tra SEO Google Business Profile bằng AI</h2>
                  <p className="text-xs text-charcoal-400">Điền thông tin doanh nghiệp để AI phân tích đối thủ, gợi ý danh mục và viết mô tả chuẩn SEO độc quyền.</p>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={runAiAudit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-charcoal-800">Tên doanh nghiệp của bạn:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nha Khoa Smile Care HN"
                      value={auditForm.businessName}
                      onChange={(e) => setAuditForm({ ...auditForm, businessName: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-3 rounded-xl border border-gold-100 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-charcoal-800">Ngành nghề hoặc Sản phẩm dịch vụ chính:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Thiết kế nội thất, Spa làm đẹp, Phòng khám nha khoa"
                      value={auditForm.category}
                      onChange={(e) => setAuditForm({ ...auditForm, category: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-3 rounded-xl border border-gold-100 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-charcoal-800">Địa chỉ hoạt động cụ thể (để định vị cục bộ):</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội"
                      value={auditForm.address}
                      onChange={(e) => setAuditForm({ ...auditForm, address: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-3 rounded-xl border border-gold-100 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-charcoal-800">Trạng thái Maps hiện tại của bạn:</label>
                    <select
                      value={auditForm.currentStatus}
                      onChange={(e) => setAuditForm({ ...auditForm, currentStatus: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-3 rounded-xl border border-gold-100 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    >
                      <option value="Chưa có Google Maps">Chưa có vị trí trên Google Maps</option>
                      <option value="Đã có nhưng chưa xác minh">Đã có trên bản đồ nhưng chưa xác minh chính chủ</option>
                      <option value="Đã xác minh nhưng chưa có thứ hạng tốt">Đã xác minh nhưng không hiển thị trong Top tìm kiếm</option>
                      <option value="Cần tối ưu bài viết & review">Đã có thứ hạng ổn định, cần quản trị tối ưu đều đặn</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={auditLoading}
                  className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-charcoal-400 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  {auditLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Hệ thống AI đang thực hiện phân tích SEO địa lý...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      Tiến hành phân tích bằng AI ngay (Miễn Phí)
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* AI Result Card Display */}
            {auditResult && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gold-200 shadow-md space-y-6 animate-fadeIn">
                
                {/* Score Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-gold-100 pb-6">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] text-charcoal-400 block font-mono">ĐIỂM HIỂN THỊ ĐỊA PHƯƠNG KHUYẾN NGHỊ</span>
                    <div className="text-5xl font-extrabold text-gold-600 font-display mt-1">
                      {auditResult.visibilityScore}/100
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200 inline-block mt-2">
                      Hồ sơ ở mức trung bình - Cần Tối Ưu Hóa Sâu
                    </span>
                  </div>

                  <div className="col-span-2 space-y-3">
                    <h3 className="font-display font-semibold text-xs text-charcoal-900 uppercase tracking-wider">Lỗi & Điểm Yếu Cần Khắc Phục Ngay:</h3>
                    <ul className="space-y-2 text-xs text-charcoal-800">
                      {auditResult.currentIssues.map((issue: string, index: number) => (
                        <li key={index} className="flex items-start gap-1.5 text-red-600">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* NAP & Category suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Category Suggestion Card */}
                  <div className="bg-[#FCFAF5] p-5 rounded-2xl border border-gold-100 space-y-3">
                    <h4 className="font-display font-semibold text-xs text-charcoal-900 flex items-center gap-1.5 uppercase">
                      📂 Phân bổ Danh Mục Google Gợi ý:
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-gold-100">
                        <span className="text-[10px] text-charcoal-400 block font-mono">DANH MỤC CHÍNH (Chiếm 48% điểm SEO):</span>
                        <strong className="text-gold-700">{auditResult.optimizedCategoryPrimary}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-gold-100">
                        <span className="text-[10px] text-charcoal-400 block font-mono">DANH MỤC PHỤ đề xuất (Gia tăng phủ từ khóa):</span>
                        <ul className="list-disc pl-4 space-y-1 mt-1 font-medium text-charcoal-800">
                          {auditResult.optimizedCategoriesSecondary.map((sec: string, i: number) => (
                            <li key={i}>{sec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* NAP Consistency Analysis */}
                  <div className="bg-[#FCFAF5] p-5 rounded-2xl border border-gold-100 space-y-3">
                    <h4 className="font-display font-semibold text-xs text-charcoal-900 flex items-center gap-1.5 uppercase">
                      🔗 Đánh giá nhất quán định danh (NAP Score):
                    </h4>
                    <div className="text-center md:text-left space-y-2">
                      <div className="text-3xl font-bold text-amber-600 font-mono">
                        {auditResult.napConsistency.score}/100
                      </div>
                      <p className="text-xs text-charcoal-800 leading-relaxed font-sans">
                        {auditResult.napConsistency.analysis}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Optimized SEO Description */}
                <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-gold-100 space-y-2 relative">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-display font-semibold text-xs text-charcoal-900 uppercase">
                      ✍️ Bản thảo đoạn giới thiệu doanh nghiệp (750 từ chuẩn SEO):
                    </h4>
                    <button
                      onClick={() => handleCopy(auditResult.optimizedDescription, 'desc')}
                      className="text-gold-600 hover:text-gold-700 flex items-center gap-1 text-[10px]"
                    >
                      {copiedText === 'desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedText === 'desc' ? 'Đã sao chép' : 'Sao chép văn bản'}
                    </button>
                  </div>
                  <p className="text-xs text-charcoal-800 leading-relaxed italic bg-white p-4 rounded-xl border border-gold-100">
                    &ldquo;{auditResult.optimizedDescription}&rdquo;
                  </p>
                </div>

                {/* Action steps & recommended media types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Action plans */}
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-xs text-charcoal-900 uppercase tracking-wider">📋 Kế hoạch hành động trong 30 ngày tới:</h4>
                    <ul className="space-y-2 text-xs text-charcoal-800 font-sans">
                      {auditResult.tailoredActionPlan.map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Bước {i + 1}:</strong> {act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Photo checklist */}
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-xs text-charcoal-900 uppercase tracking-wider">📸 Danh sách ảnh cần chụp tải lên GBP:</h4>
                    <ul className="space-y-2 text-xs text-charcoal-800 font-sans">
                      {auditResult.recommendedPhotos.map((photo: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <div className="h-4 w-4 rounded bg-gold-100 text-gold-700 flex items-center justify-center font-mono text-[9px] font-semibold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{photo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Contact Offer footer */}
                <div className="bg-charcoal-900 text-white p-6 rounded-2xl text-center space-y-3 border border-gold-500/30">
                  <h4 className="font-display font-semibold text-gold-500 text-sm">Hồ sơ của bạn đã sẵn sàng để phủ sóng?</h4>
                  <p className="text-xs text-charcoal-100 max-w-xl mx-auto leading-relaxed">
                    Đây chỉ là bước chuẩn bị ban đầu. PGS Agency hỗ trợ đồng bộ, xác minh nhanh chính chủ, chụp ảnh chuẩn Geotag và xử lý SEO nâng cao giúp bạn thâu tóm toàn diện bản đồ địa phương.
                  </p>
                  <button
                    onClick={() => {
                      const element = document.getElementById('section-cta');
                      if (element) {
                        setActiveTab('demo');
                        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
                      }
                    }}
                    className="bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs px-6 py-2.5 rounded-lg transition-all"
                  >
                    Đăng ký giải pháp trọn gói ngay
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* =========================================
            TAB 3: DOCUMENT BLUEPRINT & SEO SPECS
            ========================================= */}
        {activeTab === 'docs' && (
          <div className="max-w-5xl mx-auto px-6 pt-8 space-y-12 animate-fadeIn text-xs text-charcoal-800 font-sans">
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gold-100 shadow-sm space-y-6">
              
              <div className="border-b border-gold-200 pb-4">
                <span className="text-[10px] text-gold-600 bg-gold-100 px-2.5 py-1 rounded font-mono font-bold uppercase">Senior Strategy Deliverables</span>
                <h2 className="text-2xl font-display font-semibold text-charcoal-900 mt-2">Tài Liệu Đặc Tả Bàn Giao &amp; SEO Blueprint</h2>
                <p className="text-xs text-charcoal-400 mt-1">
                  Đầy đủ các thông số kĩ thuật, cấu trúc SEO, meta tag, internal link, schema mẫu dành cho các bộ phận thiết kế (Designer), lập trình (Developer) và nội dung (Content SEO) kế thừa phát triển.
                </p>
              </div>

              {/* Page Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF9F6] p-4 rounded-xl border border-gold-100">
                <div className="space-y-2">
                  <p><strong>URL đích:</strong> <code className="bg-white px-2 py-0.5 rounded border text-gold-600">/dich-vu/dich-vu-google-business-profile/</code></p>
                  <p><strong>Thẻ H1 duy nhất:</strong> <code className="bg-white px-2 py-0.5 rounded border text-charcoal-900">Dịch vụ Google Business Profile giúp doanh nghiệp xuất hiện chuyên nghiệp trên Google Search và Google Maps</code></p>
                  <p><strong>Mục tiêu trang:</strong> Tạo và tối ưu GBP, chiếm lĩnh Local Maps TOP 3, gia tăng cuộc gọi và chỉ đường thực tế.</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Thẻ Meta Title:</strong> <code className="bg-white px-2 py-0.5 rounded border text-gold-600">Dịch Vụ Google Business Profile Chuẩn SEO Toàn Diện - PGS Agency</code></p>
                  <p><strong>Thẻ Meta Description:</strong> <code className="bg-white px-2 py-0.5 rounded border text-charcoal-900">Dịch vụ tạo, xác minh, tối ưu Google Maps (GBP) trọn gói chuyên nghiệp. Tăng 300% cuộc gọi, chỉ đường và niềm tin thương hiệu địa phương. Nhận tư vấn ngay!</code></p>
                  <p><strong>Hành trình khách hàng:</strong> Giai đoạn Tìm kiếm giải pháp (Consideration) &amp; Ra quyết định (Decision) của tệp khách hàng sở hữu địa điểm kinh doanh vật lý.</p>
                </div>
              </div>

              {/* 1. Schema Markup Generatings */}
              <div className="space-y-4">
                <h3 className="text-sm font-display font-semibold text-charcoal-900 border-b border-gold-100 pb-1 uppercase">1. Đề xuất Schema cấu trúc JSON-LD (Đính kèm Code mẫu)</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">
                  Lập trình viên bắt buộc phải nhúng các đoạn mã Schema này trực tiếp vào mã nguồn của trang dịch vụ để Googlebot và AI Search Engine dễ dàng giải mã thực thể PGS Agency.
                </p>

                {/* LocalBusiness Schema Copy Block */}
                <div className="bg-charcoal-900 rounded-xl p-4 text-white font-mono text-[11px] space-y-2 relative">
                  <div className="flex justify-between items-center border-b border-charcoal-800 pb-2 mb-2">
                    <span className="text-emerald-400"># Schema LocalBusiness JSON-LD</span>
                    <button 
                      onClick={() => handleCopy(JSON.stringify(localBusinessSchema, null, 2), 'schema-local')}
                      className="text-gold-500 hover:text-gold-600 flex items-center gap-1 text-[10px]"
                    >
                      {copiedText === 'schema-local' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Sao chép
                    </button>
                  </div>
                  <pre className="overflow-x-auto max-h-48 text-charcoal-100">
                    {JSON.stringify(localBusinessSchema, null, 2)}
                  </pre>
                </div>

                {/* Service Schema Copy Block */}
                <div className="bg-charcoal-900 rounded-xl p-4 text-white font-mono text-[11px] space-y-2 relative">
                  <div className="flex justify-between items-center border-b border-charcoal-800 pb-2 mb-2">
                    <span className="text-emerald-400"># Schema Service JSON-LD</span>
                    <button 
                      onClick={() => handleCopy(JSON.stringify(serviceSchema, null, 2), 'schema-serv')}
                      className="text-gold-500 hover:text-gold-600 flex items-center gap-1 text-[10px]"
                    >
                      {copiedText === 'schema-serv' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Sao chép
                    </button>
                  </div>
                  <pre className="overflow-x-auto max-h-48 text-charcoal-100">
                    {JSON.stringify(serviceSchema, null, 2)}
                  </pre>
                </div>
              </div>

              {/* 2. Internal Links Map */}
              <div className="space-y-4">
                <h3 className="text-sm font-display font-semibold text-charcoal-900 border-b border-gold-100 pb-1 uppercase">2. Bản đồ Internal Link (Liên kết nội bộ)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100 space-y-2">
                    <span className="font-semibold text-emerald-800 text-xs block">⚓ Link nhận về trang (Inbound Links):</span>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-charcoal-800">
                      <li>Từ bài viết blog hướng dẫn: <code className="bg-white px-1">/huong-dan-tao-google-maps/</code></li>
                      <li>Từ trang chủ PGS Agency giới thiệu hệ sinh thái: <code className="bg-white px-1">/</code></li>
                      <li>Từ trang dịch vụ bổ trợ: <code className="bg-white px-1">/dich-vu/seo-tong-the/</code></li>
                    </ul>
                  </div>

                  <div className="bg-amber-50/20 p-4 rounded-xl border border-amber-100 space-y-2">
                    <span className="font-semibold text-amber-800 text-xs block">🔗 Link trỏ đi của trang này (Outbound Links):</span>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-charcoal-800">
                      <li>Trỏ về bài phân tích case study: <code className="bg-white px-1">/case-study/gmaps-smile-care/</code></li>
                      <li>Trỏ sang các dịch vụ liên đới: <code className="bg-white px-1">/dich-vu/thiet-ke-website/</code></li>
                      <li>Trỏ sang chính sách giải quyết sự cố: <code className="bg-white px-1">/tro-giup/chinh-sach-maps/</code></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Team Checklists */}
              <div className="space-y-4">
                <h3 className="text-sm font-display font-semibold text-charcoal-900 border-b border-gold-100 pb-1 uppercase">3. Checklist Hướng dẫn triển khai cho từng Bộ Phận</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Designer */}
                  <div className="bg-white p-4 rounded-xl border border-gold-100 space-y-2.5 shadow-sm">
                    <div className="flex items-center gap-2 text-gold-700 font-display font-semibold text-xs border-b pb-1">
                      <Layout className="w-4 h-4 text-gold-500" />
                      DESIGNER CHECKLIST
                    </div>
                    <ul className="space-y-2 text-[11px] text-charcoal-800">
                      <li>☐ Tone &amp; Mood: Đảm bảo phong cách **Light Premium Consulting** thanh lịch, tối giản.</li>
                      <li>☐ Sử dụng gam màu vàng gold cao cấp làm điểm nhấn, tuyệt đối không dùng màu neon gắt.</li>
                      <li>☐ Thiết kế Mockup giao diện di động Google Business Profile chi tiết sắc nét.</li>
                      <li>☐ Bố trí khoảng trắng rộng rãi tối thiểu 80px giữa các section lớn.</li>
                    </ul>
                  </div>

                  {/* Developer */}
                  <div className="bg-white p-4 rounded-xl border border-gold-100 space-y-2.5 shadow-sm">
                    <div className="flex items-center gap-2 text-charcoal-900 font-display font-semibold text-xs border-b pb-1">
                      <Code className="w-4 h-4 text-gold-500" />
                      DEVELOPER CHECKLIST
                    </div>
                    <ul className="space-y-2 text-[11px] text-charcoal-800">
                      <li>☐ Tối ưu điểm hiệu suất Core Web Vitals (LCP dưới 2.5s) cho thiết bị di động.</li>
                      <li>☐ Nhúng đầy đủ cấu trúc Schema JSON-LD (Service &amp; LocalBusiness) vào mã nguồn.</li>
                      <li>☐ Code mượt các chuyển động Scroll Reveal, FAQ Accordion bằng thư viện **motion/react**.</li>
                      <li>☐ Đảm bảo cấu trúc thẻ Heading chuẩn SEO (1 thẻ H1 duy nhất, các thẻ H2/H3 chia đúng cấp bậc).</li>
                    </ul>
                  </div>

                  {/* Content SEO */}
                  <div className="bg-white p-4 rounded-xl border border-gold-100 space-y-2.5 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-700 font-display font-semibold text-xs border-b pb-1">
                      <FileText className="w-4 h-4 text-gold-500" />
                      CONTENT SEO CHECKLIST
                    </div>
                    <ul className="space-y-2 text-[11px] text-charcoal-800">
                      <li>☐ Tránh nhồi nhét từ khóa; phân bổ từ khóa tự nhiên với mật độ khoảng 1.5 - 2%.</li>
                      <li>☐ Thể hiện các tiêu chí uy tín thương hiệu E-E-A-T (trải nghiệm thực tế, lời khuyên chuyên gia).</li>
                      <li>☐ Sử dụng văn phong tư vấn kinh doanh (Growth Consulting), thúc đẩy chuyển đổi.</li>
                      <li>☐ Viết chính xác danh sách các FAQ kèm từ khóa câu hỏi của người dùng.</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      

      {/* STICKY MOBILE CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gold-100 p-3 flex md:hidden items-center justify-between gap-4">
        <div className="text-left">
          <span className="text-[9px] text-charcoal-400 block font-mono">TƯ VẤN TRỰC TIẾP</span>
          <span className="text-xs font-bold text-charcoal-900">PGS Agency Maps Pro</span>
        </div>
        <button 
          onClick={() => setActiveTab('ai-auditor')}
          className="bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Tối ưu ngay
        </button>
      </div>

    </div>
  );
}

// Hardcoded Schema details for static display in Tab 3 (SEO Docs)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PGS Agency",
  "image": "https://picsum.photos/seed/pgs/800/600",
  "url": "https://dich-vu-google-business.example.com",
  "telephone": "098.xxx.xxxx",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Đường Láng",
    "addressLocality": "Đống Đa",
    "addressRegion": "Hà Nội",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "08:00",
    "closes": "21:00"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Google Business Profile Optimization Service",
  "provider": {
    "@type": "LocalBusiness",
    "name": "PGS Agency"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Google Maps Marketing Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Business Profile Setup"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Business Profile Optimization"
        }
      }
    ]
  }
};
