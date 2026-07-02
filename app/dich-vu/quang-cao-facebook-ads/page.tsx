"use client";

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  Cpu, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  BarChart3, 
  DollarSign, 
  Layers, 
  FileText, 
  Laptop, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Mail, 
  ArrowRight,
  Database,
  ExternalLink,
  Code2,
  FileCheck,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type ActiveAngle = 'pain' | 'benefit' | 'offer' | 'testimonial' | 'founder' | 'beforeAfter';
type ActivePackage = 'setup' | 'management' | 'growth';

export default function PGSFacebookAdsPage() {
  // Navigation & View State
  const [currentMode, setCurrentMode] = useState<'app' | 'handover'>('app');
  
  // Interactive Simulator State
  const [monthlyBudget, setMonthlyBudget] = useState<number>(30000000); // Default 30M VNĐ
  const [estimatedCPC, setEstimatedCPC] = useState<number>(3500); // Cost Per Click
  const [clickToInboxRate, setClickToInboxRate] = useState<number>(12); // Click-to-Inbox %
  const [inboxToLeadRate, setInboxToLeadRate] = useState<number>(25); // Inbox-to-Hot-Lead %
  const [averageOrderValue, setAverageOrderValue] = useState<number>(1200000); // 1.2M VNĐ
  
  // Angle Switcher State
  const [activeAngle, setActiveAngle] = useState<ActiveAngle>('pain');
  
  // Package Selector State
  const [activePkg, setActivePkg] = useState<ActivePackage>('management');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Funnel Calculations
  const metrics = useMemo(() => {
    const totalClicks = Math.floor(monthlyBudget / estimatedCPC);
    const totalInbox = Math.floor(totalClicks * (clickToInboxRate / 100));
    const totalHotLeads = Math.floor(totalInbox * (inboxToLeadRate / 100));
    const costPerLead = totalHotLeads > 0 ? Math.floor(monthlyBudget / totalHotLeads) : 0;
    
    // Assume conservative close rate of 15% from Hot Lead to customer
    const payingCustomers = Math.floor(totalHotLeads * 0.18);
    const estimatedRevenue = payingCustomers * averageOrderValue;
    const netProfit = estimatedRevenue - monthlyBudget;
    const estimatedROI = monthlyBudget > 0 ? ((estimatedRevenue - monthlyBudget) / monthlyBudget) * 100 : 0;

    return {
      totalClicks,
      totalInbox,
      totalHotLeads,
      costPerLead,
      payingCustomers,
      estimatedRevenue,
      netProfit,
      estimatedROI
    };
  }, [monthlyBudget, estimatedCPC, clickToInboxRate, inboxToLeadRate, averageOrderValue]);

  // Format currency helper
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace('₫', 'đ');
  };

  const creativeAngles = {
    pain: {
      title: "Pain Angle (Nỗi Đau)",
      focus: "Lãng phí ngân sách quảng cáo & Lead ảo",
      badge: "Đánh trúng tâm lý",
      headline: "Mệt mỏi vì Fanpage nổ inbox ảo, click nhiều nhưng không ra đơn?",
      body: "Bạn đổ hàng chục triệu mỗi tháng vào Facebook Ads nhưng chỉ nhận lại tương tác ảo và tin nhắn rác? Đã đến lúc chấm dứt tình trạng lãng phí ngân sách. PGS Agency tối ưu hóa Pixel nâng cao, lọc sâu đối tượng để mang về những khách hàng thực sự có nhu cầu mua sắm.",
      ctaText: "Nhận Kiểm Tra Tài Khoản Miễn Phí",
      ctrEstimate: "3.2% - 4.5%",
      bg: "bg-amber-50/70 border-amber-200"
    },
    benefit: {
      title: "Benefit Angle (Lợi Ích)",
      focus: "Xây dựng hệ thống Lead tự động chuyển thẳng CRM",
      badge: "Cam kết hiệu quả",
      headline: "Đón dòng khách hàng tiềm năng chất lượng cao đổ bộ mỗi ngày",
      body: "Không còn cảnh nhân viên sales ngồi chờ đợi. Quy trình Meta Lead Engine của chúng tôi thiết lập phễu lọc thông minh, tự động đẩy lead nóng có số điện thoại về Google Sheets hoặc CRM trong 3 giây. Tăng tỷ lệ chốt sales lên đến 40%.",
      ctaText: "Đăng Ký Tư Vấn Giải Pháp",
      ctrEstimate: "4.1% - 5.8%",
      bg: "bg-emerald-50/70 border-emerald-200"
    },
    offer: {
      title: "Offer Angle (Ưu Đãi Đặc Biệt)",
      focus: "Audit tài khoản 0đ + Lập kế hoạch 30 ngày",
      badge: "Rủi ro bằng 0",
      headline: "Tặng gói Audit tài khoản quảng cáo 5.000.000đ từ PGS Experts",
      body: "Chúng tôi sẽ trực tiếp phân tích sâu tài khoản hiện tại của bạn, chỉ rõ 3 điểm rò rỉ ngân sách lớn nhất và phác thảo chiến lược tối ưu CPL (Cost per Lead) trong 30 ngày tới. Hoàn toàn miễn phí, không ràng buộc hợp đồng.",
      ctaText: "Nhận Gói Audit 0đ Ngay",
      ctrEstimate: "5.0% - 7.2%",
      bg: "bg-blue-50/70 border-blue-200"
    },
    testimonial: {
      title: "Testimonial Angle (Chứng Thực)",
      focus: "Case study thực tế từ thương hiệu B2B & Retail",
      badge: "Uy tín tuyệt đối",
      headline: "Hành trình giảm 45% CPL và tăng gấp đôi số lượng Lead thực cho Nội thất Việt",
      body: "“Trước khi làm việc với PGS, chúng tôi chạy inbox rất rẻ nhưng sales gọi điện ai cũng từ chối. Sau khi PGS tái cấu trúc chiến dịch bằng Custom Audience và phễu Form lọc sâu, CPL của chúng tôi có tăng nhẹ nhưng doanh số thực tế đã tăng trưởng 120% sau 2 tháng.” - Mr. Minh, CEO.",
      ctaText: "Xem Toàn Bộ Case Studies",
      ctrEstimate: "3.8% - 5.1%",
      bg: "bg-purple-50/70 border-purple-200"
    },
    founder: {
      title: "Founder Angle (Người Sáng Lập)",
      focus: "Chia sẻ minh bạch về dữ liệu tiếp thị số",
      badge: "Minh bạch 100%",
      headline: "“Làm Marketing không làm rời rạc, hãy làm hệ thống tăng trưởng”",
      body: "Chào bạn, tôi là Founder của PGS Agency. Trong kỷ nguyên AI của Meta, việc chạy ads không đơn thuần là bấm nút 'Boost Post'. Nó đòi hỏi sự liên kết chặt chẽ giữa Content Insight, Pixel Tracking và quy trình xử lý Inbox phía sau. Tôi cam kết đồng hành cùng sự thịnh vượng của doanh nghiệp bạn.",
      ctaText: "Đặt Lịch Chat Với Founder",
      ctrEstimate: "2.9% - 3.8%",
      bg: "bg-rose-50/70 border-rose-200"
    },
    beforeAfter: {
      title: "Before / After (Trước & Sau)",
      focus: "Chuyển đổi từ quảng cáo bản năng sang hệ thống PGS",
      badge: "Sự khác biệt trực quan",
      headline: "Đập tan phễu quảng cáo lỗi thời để chuyển mình sang Meta Lead Engine",
      body: "Trước đây: Đo lường thủ công, tắt bật ads liên tục, nội dung copy nhạt nhòa, pixel lỗi. Sau khi bàn giao cho PGS: Dashboard báo cáo real-time tự động, 6 góc độ nội dung phủ sóng liên tục, Pixel thu thập hành vi chuẩn xác, remarketing bám đuổi đến khi ra đơn.",
      ctaText: "Nâng Cấp Chiến Dịch Ngay",
      ctrEstimate: "4.8% - 6.5%",
      bg: "bg-cyan-50/70 border-cyan-200"
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#FCFBFA] text-[#1C1B19] selection:bg-[#C5A880]/30 selection:text-[#1C1B19]">
      
      {/* PERSISTENT HEADER WITH VIEW MODE TOGGLER */}
      

      {/* MODE 1: THE FULL PREMIUM LANDING PAGE EXPERIENCE */}
      <AnimatePresence mode="wait">
        {currentMode === 'app' ? (
          <motion.main
            key="landing-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="pb-24"
          >
            
            {/* SECTION 1: HERO - META LEAD ENGINE */}
            <section id="hero" className="relative pt-12 pb-20 md:py-28 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FCFBFA] to-white border-b border-[#EBE9E4]">
              {/* Decorative Subtle Grid lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#C5A880_1px,transparent_1px),linear-gradient(to_bottom,#C5A880_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
              
              <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Text content */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#B59469] text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Hệ Thống Meta Lead Engine 2026
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-[#1C1B19] leading-tight md:leading-[1.15]">
                    Dịch vụ <span className="text-[#B59469]">Facebook Ads</span> giúp doanh nghiệp tăng lead, inbox và remarketing khách hàng tiềm năng
                  </h1>
                  
                  <p className="text-base md:text-lg text-[#5E5D59] font-normal leading-relaxed max-w-2xl">
                    PGS Agency xây dựng phễu tiếp thị số toàn diện trên hệ sinh thái Meta (Facebook, Instagram, Messenger). Chúng tôi tối ưu hóa chuẩn xác nguồn cấp dữ liệu, pixel tracking nâng cao và thông điệp đa góc độ giúp bứt phá đơn hàng chất lượng, kiểm soát tối đa chi phí quảng cáo rò rỉ.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    <a 
                      href="#simulator" 
                      className="inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#1C1B19] text-[#1C1B19] hover:text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-md shadow-[#C5A880]/20 hover:shadow-lg"
                    >
                      <Zap className="w-4 h-4" />
                      Kiểm Tra Chiến Dịch Facebook Ads Hiện Tại
                    </a>
                    <a 
                      href="#packages" 
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5F4F0] text-[#1C1B19] border-2 border-[#C5A880]/40 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300"
                    >
                      Xem Bảng Báo Giá Gói
                    </a>
                  </div>

                  {/* Trust Factors */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#EBE9E4] text-left">
                    <div>
                      <div className="font-heading font-black text-2xl md:text-3xl text-[#1C1B19]">100%</div>
                      <div className="text-xs text-[#7A7974] font-medium">Báo cáo Data Real-time</div>
                    </div>
                    <div>
                      <div className="font-heading font-black text-2xl md:text-3xl text-[#B59469]">-45%</div>
                      <div className="text-xs text-[#7A7974] font-medium">Tối ưu Chi phí CPL trung bình</div>
                    </div>
                    <div>
                      <div className="font-heading font-black text-2xl md:text-3xl text-[#1C1B19]">50+</div>
                      <div className="text-xs text-[#7A7974] font-medium">Dự án Tăng trưởng Thành công</div>
                    </div>
                  </div>

                </div>

                {/* Right Interactive Funnel Visualization */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EBE9E4] shadow-xl relative">
                  <div className="absolute -top-3 -right-3 bg-[#1C1B19] text-white text-[10px] tracking-wider uppercase font-extrabold px-3 py-1 rounded-full shadow-sm z-20">
                    Sơ Đồ Phễu 3D
                  </div>
                  
                  <div className="text-xs font-bold text-[#7A7974] uppercase tracking-wider mb-4 border-b border-[#F5F4F0] pb-2 flex justify-between items-center">
                    <span>Mô Phỏng Meta Lead Engine Flow</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  {/* Interactive Funnel Animation Blocks */}
                  <div className="space-y-3 relative">
                    
                    {/* Node 1 */}
                    <div className="p-3 bg-gradient-to-r from-[#FAF9F5] to-white border border-[#EBE9E4] rounded-xl flex items-center justify-between transition-all duration-300 hover:border-[#C5A880] group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center text-[#B59469]">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1B19]">1. Target & Audience</div>
                          <div className="text-[10px] text-[#7A7974]">Custom, Lookalike, AI Broad</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-600">CPC Thấp</div>
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <div className="h-4 w-0.5 bg-gradient-to-b from-[#C5A880] to-[#1C1B19] animate-pulse"></div>
                    </div>

                    {/* Node 2 */}
                    <div className="p-3 bg-gradient-to-r from-white to-[#FAF9F5] border border-[#EBE9E4] rounded-xl flex items-center justify-between transition-all duration-300 hover:border-[#C5A880] group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C1B19]/10 flex items-center justify-center text-[#1C1B19]">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1B19]">2. Creative Angles</div>
                          <div className="text-[10px] text-[#7A7974]">6 Concept Nội dung Độc quyền</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-[#B59469]">CTR Cao</div>
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <div className="h-4 w-0.5 bg-gradient-to-b from-[#1C1B19] to-[#C5A880] animate-pulse"></div>
                    </div>

                    {/* Node 3 */}
                    <div className="p-3 bg-gradient-to-r from-[#FAF9F5] to-white border border-[#EBE9E4] rounded-xl flex items-center justify-between transition-all duration-300 hover:border-[#C5A880] group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center text-[#B59469]">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1B19]">3. Inbox/Form Automation</div>
                          <div className="text-[10px] text-[#7A7974]">Auto-responder & Lọc sâu rác</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-600">+40% Lead</div>
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <div className="h-4 w-0.5 bg-gradient-to-b from-[#C5A880] to-[#1C1B19] animate-pulse"></div>
                    </div>

                    {/* Node 4 */}
                    <div className="p-3 bg-gradient-to-r from-white to-[#FAF9F5] border border-[#EBE9E4] rounded-xl flex items-center justify-between transition-all duration-300 hover:border-[#C5A880] group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C1B19]/10 flex items-center justify-center text-[#1C1B19]">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1B19]">4. CRM / Sales Pipeline</div>
                          <div className="text-[10px] text-[#7A7974]">Bàn giao leads chuẩn real-time</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-600">Tối ưu CPL</div>
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <div className="h-4 w-0.5 bg-gradient-to-b from-[#1C1B19] to-[#C5A880] animate-pulse"></div>
                    </div>

                    {/* Node 5 */}
                    <div className="p-3 bg-gradient-to-r from-[#C5A880]/10 to-[#C5A880]/5 border border-[#C5A880]/30 rounded-xl flex items-center justify-between transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A880] flex items-center justify-center text-[#1C1B19]">
                          <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1B19]">5. Smart Remarketing</div>
                          <div className="text-[10px] text-[#7A7974]">Đeo bám tệp Pixel đa tầng</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-[#1C1B19]">X2 Doanh Thu</div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* SECTION 2: WHAT IS FACEBOOK ADS */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
              <div className="max-w-3xl mx-auto space-y-4 mb-12">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Tìm hiểu cơ bản</div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Quảng Cáo Facebook Ads Chuyên Nghiệp Là Gì?</h2>
                <p className="text-sm md:text-base text-[#5E5D59] leading-relaxed">
                  Quảng cáo Meta Ads không đơn giản là bấm nút đẩy bài viết trên Trang (Fanpage). Đó là việc khai thác có hệ thống sức mạnh dữ liệu của <strong>Facebook, Instagram, Messenger</strong> để tìm kiếm, dẫn dắt và chuyển đổi khách hàng một cách thông minh nhất.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-white border border-[#EBE9E4] rounded-2xl text-left space-y-3 transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold text-lg">f</div>
                  <h3 className="font-bold text-base text-[#1C1B19]">Facebook Feed & Reels</h3>
                  <p className="text-xs text-[#5E5D59] leading-relaxed">
                    Xuất hiện tự nhiên trên dòng thời gian và video ngắn của người dùng với thiết kế hình ảnh và thông điệp tương thích cao.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#EBE9E4] rounded-2xl text-left space-y-3 transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#1C1B19]">Instagram Ads</h3>
                  <p className="text-xs text-[#5E5D59] leading-relaxed">
                    Đột phá doanh thu nhờ tệp khách hàng trẻ, ưa chuộng hình ảnh bắt mắt, tính thẩm mỹ sang trọng, và thói quen mua sắm nhanh.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#EBE9E4] rounded-2xl text-left space-y-3 transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B59469] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#1C1B19]">Messenger Click-to-Chat</h3>
                  <p className="text-xs text-[#5E5D59] leading-relaxed">
                    Kết nối trực tiếp khách hàng vào khung chat Messenger riêng tư, thúc đẩy tư vấn 1-1 và kích hoạt kịch bản chốt sales tự động.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#EBE9E4] rounded-2xl text-left space-y-3 transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]">
                  <div className="w-10 h-10 rounded-xl bg-[#1C1B19]/5 text-[#1C1B19] flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#1C1B19]">Meta Lead Forms</h3>
                  <p className="text-xs text-[#5E5D59] leading-relaxed">
                    Thu thập trực tiếp thông tin tên, số điện thoại, email ngay trên ứng dụng Meta, tối ưu hóa 1-click không cần thoát trang.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: FB ADS VS BOOST ARTICLE */}
            <section className="py-16 px-4 md:px-8 bg-[#F5F4F0] border-y border-[#EBE9E4]">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Phân tích chiến thuật</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Phân Biệt Boost Bài Viết Thường & Facebook Ads Chuyên Nghiệp</h2>
                  <p className="text-sm text-[#5E5D59]">
                    Nhiều chủ doanh nghiệp nhầm tưởng việc nhấn nút màu xanh "Quảng cáo bài viết" (Boost Post) là đã tự chạy ads. Thực tế, đó là con đường nhanh nhất dẫn đến lãng phí ngân sách.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#EBE9E4] bg-white shadow-md">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#1C1B19] text-white">
                        <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider">Tiêu chí so sánh</th>
                        <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider bg-gray-800 text-gray-300">Boost Post bài viết thường</th>
                        <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider text-[#C5A880] bg-black">Hệ Thống Facebook Ads PGS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE9E4] text-xs">
                      <tr>
                        <td className="p-4 font-bold text-[#1C1B19]">Mục tiêu chiến dịch</td>
                        <td className="p-4 text-[#7A7974] bg-gray-50/50">Chỉ tập trung tăng lượt Like, Share, Comment ảo.</td>
                        <td className="p-4 font-semibold text-emerald-700 bg-amber-50/20">Tối ưu chuyển đổi: Ra Inbox, Số điện thoại (Lead), Doanh số thực.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-[#1C1B19]">Target & Tệp đối tượng</td>
                        <td className="p-4 text-[#7A7974] bg-gray-50/50">Chỉ chọn theo Sở thích & Địa điểm cơ bản, rất dễ loãng.</td>
                        <td className="p-4 font-semibold text-[#1C1B19] bg-amber-50/20">Sử dụng Pixel nâng cao, Custom Audience (đã xem video, đã vào web), Lookalike chính xác.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-[#1C1B19]">Thử nghiệm A/B Testing</td>
                        <td className="p-4 text-[#7A7974] bg-gray-50/50">Không thể kiểm tra chéo nhiều biến thể hình ảnh và chữ.</td>
                        <td className="p-4 font-semibold text-[#1C1B19] bg-amber-50/20">A/B Testing liên tục 6 định dạng content khác nhau để tìm ra mẫu ads rẻ nhất.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-[#1C1B19]">Đo lường & Tối ưu</td>
                        <td className="p-4 text-[#7A7974] bg-gray-50/50">Chỉ xem số lượng hiển thị cơ bản, không biết chính xác đơn hàng từ đâu.</td>
                        <td className="p-4 font-semibold text-[#1C1B19] bg-amber-50/20">Đo lường CPL (Cost per Lead), ROI cụ thể qua Dashboard tự động cập nhật mỗi 1 giờ.</td>
                      </tr>
                      <tr className="bg-amber-50/10">
                        <td className="p-4 font-bold text-[#1C1B19]">Hiệu quả lâu dài</td>
                        <td className="p-4 text-[#7A7974] bg-gray-50/50 font-medium">Ngừng chạy là mất tương tác, tệp rác không tái sử dụng được.</td>
                        <td className="p-4 font-bold text-[#B59469] bg-amber-50/40">Tích lũy tệp data pixel chất lượng cao để chạy remarketing bám đuổi trọn đời.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: WHEN SHOULD YOU RUN FB ADS */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Dấu hiệu nhận biết</div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Khi Nào Doanh Nghiệp Bạn Cần Triển Khai Facebook Ads Chuyên Nghiệp?</h2>
                <p className="text-sm text-[#5E5D59]">
                  Nếu doanh nghiệp của bạn đang gặp phải một trong các tình huống dưới đây, việc tái thiết kế hệ thống quảng cáo Facebook Ads là vô cùng cấp bách.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-[#EBE9E4] rounded-xl flex gap-4 text-left transition-all duration-300 hover:border-[#C5A880]">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-[#B59469] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1C1B19] mb-2">Muốn tăng nhanh Inbox & Số điện thoại chất lượng</h3>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Sản phẩm có chu kỳ mua hàng nhanh, cần dòng khách hàng mới liên lạc qua tin nhắn để đội tư vấn chốt sales ngay lập tức.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#EBE9E4] rounded-xl flex gap-4 text-left transition-all duration-300 hover:border-[#C5A880]">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-[#B59469] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1C1B19] mb-2">Đo lường chiến dịch đang mơ hồ, thiếu chính xác</h3>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Đang tốn tiền chạy ads nhưng không rõ có bao nhiêu data thật được tạo ra, chi phí thực tế cho một khách hàng mua hàng là bao nhiêu.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#EBE9E4] rounded-xl flex gap-4 text-left transition-all duration-300 hover:border-[#C5A880]">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-[#B59469] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1C1B19] mb-2">Khai phá tệp khách hàng Remarketing bám đuổi</h3>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Sản phẩm giá trị lớn cần bám sát khách hàng qua nhiều ngày để thuyết phục họ dần dần bằng các thông điệp khác nhau.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMMON PROBLEMS */}
            <section className="py-16 px-4 md:px-8 bg-white border-y border-[#EBE9E4]">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-red-500">Thực trạng thị trường</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Nhiều Doanh Nghiệp Đang Đốt Tiền Vô Ích Cho Ads Vì Đâu?</h2>
                  <p className="text-sm text-[#5E5D59] leading-relaxed">
                    Theo báo cáo kiểm toán hơn 100 tài khoản quảng cáo tại Việt Nam, PGS nhận thấy có tới 85% doanh nghiệp đang mắc phải những sai lầm cốt tử này làm gia tăng chi phí quảng cáo không đáng có.
                  </p>
                  
                  <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                    <div className="text-xs font-bold text-red-800">CẢNH BÁO</div>
                    <div className="text-xs text-red-700 mt-1">Đừng tiếp tục chạy ads nếu bạn chưa giải quyết triệt để vấn đề Pixel tracking bị đứt quãng hoặc nội dung sao chép một màu!</div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2 transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-lg font-black text-[#C5A880]">01</div>
                    <h4 className="font-bold text-sm text-[#1C1B19]">Inbox Ảo Thất Thoát Ngân Sách</h4>
                    <p className="text-xs text-[#5E5D59]">
                      Click nhầm rất nhiều từ đối tượng không phù hợp, dẫn đến chi phí tăng cao nhưng cuộc trò chuyện không hồi đáp.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2 transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-lg font-black text-[#C5A880]">02</div>
                    <h4 className="font-bold text-sm text-[#1C1B19]">Nội Dung Quá Nhạt Nhòa</h4>
                    <p className="text-xs text-[#5E5D59]">
                      Quảng cáo sao chép ý tưởng, chỉ tập trung bán hàng cứng nhắc mà không giải quyết nỗi đau hay lợi ích thực cho người xem.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2 transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-lg font-black text-[#C5A880]">03</div>
                    <h4 className="font-bold text-sm text-[#1C1B19]">Không Cài Đặt Pixel & CAPI</h4>
                    <p className="text-xs text-[#5E5D59]">
                      Không thể gom tệp khách truy cập để bám đuổi quảng cáo khiến chi phí tiếp cận khách hàng mới liên tục leo thang.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2 transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-lg font-black text-[#C5A880]">04</div>
                    <h4 className="font-bold text-sm text-[#1C1B19]">Thiếu Kịch Bản Chốt Sales</h4>
                    <p className="text-xs text-[#5E5D59]">
                      Lead đổ về dồi dào nhưng tốc độ phản hồi quá chậm, quy trình tư vấn thiếu chuyên nghiệp làm rơi rớt tỷ lệ chuyển đổi.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 6: PGS EXECUTION FRAMEWORK */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
              <div className="max-w-3xl mx-auto space-y-4 mb-12">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Quy trình chuẩn mực</div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Framework 6 Bước Triển Khai Meta Lead Engine Tại PGS</h2>
                <p className="text-sm text-[#5E5D59]">
                  Chúng tôi không làm quảng cáo tự phát theo cảm tính. Mọi chiến dịch đều tuân thủ chặt chẽ framework khoa học để kiểm soát chi phí tối đa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
                
                {/* Step 1 */}
                <div className="p-5 bg-white border border-[#EBE9E4] rounded-xl text-left space-y-3 relative group hover:border-[#C5A880] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 flex items-center justify-center font-heading font-bold text-sm text-[#B59469]">
                    01
                  </div>
                  <h4 className="font-bold text-xs text-[#1C1B19] uppercase tracking-wider">Nghiên Cứu Đề Xuất</h4>
                  <p className="text-[11px] text-[#5E5D59] leading-relaxed">
                    Phân tích chân dung khách hàng lý tưởng, phân khúc thị trường và rà soát đối thủ.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 bg-white border border-[#EBE9E4] rounded-xl text-left space-y-3 relative group hover:border-[#C5A880] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 flex items-center justify-center font-heading font-bold text-sm text-[#B59469]">
                    02
                  </div>
                  <h4 className="font-bold text-xs text-[#1C1B19] uppercase tracking-wider">Sản Xuất Creative</h4>
                  <p className="text-[11px] text-[#5E5D59] leading-relaxed">
                    Xây dựng kịch bản nội dung, thiết kế banner và sản xuất video ngắn kích thích click.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 bg-white border border-[#EBE9E4] rounded-xl text-left space-y-3 relative group hover:border-[#C5A880] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 flex items-center justify-center font-heading font-bold text-sm text-[#B59469]">
                    03
                  </div>
                  <h4 className="font-bold text-xs text-[#1C1B19] uppercase tracking-wider">Setup Hệ Thống</h4>
                  <p className="text-[11px] text-[#5E5D59] leading-relaxed">
                    Cài đặt Meta Pixel, CAPI chống rò rỉ dữ liệu, kết nối API phễu Form tự động.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 bg-white border border-[#EBE9E4] rounded-xl text-left space-y-3 relative group hover:border-[#C5A880] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 flex items-center justify-center font-heading font-bold text-sm text-[#B59469]">
                    04
                  </div>
                  <h4 className="font-bold text-xs text-[#1C1B19] uppercase tracking-wider">Tối Ưu Quảng Cáo</h4>
                  <p className="text-[11px] text-[#5E5D59] leading-relaxed">
                    Thử nghiệm A/B kiểm tra chéo nhóm, loại bỏ các nhóm ads đắt đỏ, dồn tiền ads rẻ.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-5 bg-white border border-[#EBE9E4] rounded-xl text-left space-y-3 relative group hover:border-[#C5A880] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 flex items-center justify-center font-heading font-bold text-sm text-[#B59469]">
                    05
                  </div>
                  <h4 className="font-bold text-xs text-[#1C1B19] uppercase tracking-wider">Bám Đuổi Tệp Sâu</h4>
                  <p className="text-[11px] text-[#5E5D59] leading-relaxed">
                    Remarketing đa điểm chạm bằng các ưu đãi sâu kích thích chốt đơn hàng nhanh chóng.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="p-5 bg-[#1C1B19] border border-[#1C1B19] rounded-xl text-left space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880] flex items-center justify-center font-heading font-bold text-sm text-[#1C1B19]">
                    06
                  </div>
                  <h4 className="font-bold text-xs text-[#C5A880] uppercase tracking-wider">Báo Cáo Thực</h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    Cung cấp dashboard tự động báo cáo số liệu minh bạch, cam kết không làm ảo báo cáo.
                  </p>
                </div>

              </div>
            </section>

            {/* SECTION 7: CREATIVE ANGLE SYSTEM (INTERACTIVE) */}
            <section className="py-16 px-4 md:px-8 bg-[#F5F4F0] border-y border-[#EBE9E4]">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left controls */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Bí quyết chuyển đổi</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">6 Góc Độ Nội Dung Quảng Cáo Kích Hoạt Quyết Định Mua Hàng</h2>
                  <p className="text-sm text-[#5E5D59] leading-relaxed">
                    Một quảng cáo không thể hướng đến tất cả mọi người. PGS chia nhóm nội dung thành 6 góc độ cốt lõi (Creative Angles) để bám sát từng trạng thái tâm lý khách hàng.
                  </p>
                  
                  {/* Angle Button list */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {Object.keys(creativeAngles).map((key) => {
                      const angleKey = key as ActiveAngle;
                      return (
                        <button
                          key={angleKey}
                          onClick={() => setActiveAngle(angleKey)}
                          className={`p-3 text-left rounded-xl border text-xs font-bold transition-all duration-300 ${
                            activeAngle === angleKey
                              ? 'bg-[#1C1B19] border-[#1C1B19] text-white shadow-md'
                              : 'bg-white border-[#EBE9E4] text-[#5E5D59] hover:border-[#C5A880] hover:text-[#1C1B19]'
                          }`}
                        >
                          {creativeAngles[angleKey].title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Preview Ad Card */}
                <div className="lg:col-span-7">
                  <div className="bg-white rounded-2xl border border-[#EBE9E4] shadow-xl overflow-hidden">
                    <div className="bg-[#1C1B19] p-4 text-white flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-[10px] tracking-widest uppercase font-mono text-gray-400">Meta Ad Live Preview Simulator</span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2">
                          <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#C5A880]/15 text-[#B59469] uppercase tracking-wider">
                            {creativeAngles[activeAngle].badge}
                          </span>
                          <span className="text-xs text-[#7A7974] font-medium">Góc độ: {creativeAngles[activeAngle].focus}</span>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">CTR dự kiến: {creativeAngles[activeAngle].ctrEstimate}</span>
                      </div>

                      {/* Mock Social Ad Box */}
                      <div className={`p-5 rounded-xl border-2 ${creativeAngles[activeAngle].bg} space-y-3`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1C1B19] text-[#C5A880] flex items-center justify-center font-heading font-black text-xs">PGS</div>
                          <div>
                            <div className="text-xs font-bold text-[#1C1B19]">PGS Agency - Growth Marketing</div>
                            <div className="text-[9px] text-[#7A7974]">Sponsored · Paid Advertisement</div>
                          </div>
                        </div>

                        <h4 className="font-heading font-black text-base text-[#1C1B19] tracking-tight leading-snug">
                          {creativeAngles[activeAngle].headline}
                        </h4>

                        <p className="text-xs text-[#5E5D59] leading-relaxed">
                          {creativeAngles[activeAngle].body}
                        </p>

                        <div className="pt-3 border-t border-[#EBE9E4] flex justify-between items-center">
                          <div>
                            <div className="text-[9px] text-[#7A7974] uppercase tracking-wider">Đăng Ký Tại</div>
                            <div className="text-xs font-bold text-[#1C1B19]">pgsagency.vn/facebook-ads</div>
                          </div>
                          <button className="px-4 py-2 bg-[#1C1B19] text-[#C5A880] text-xs font-bold rounded-lg hover:bg-black transition-all">
                            {creativeAngles[activeAngle].ctaText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 8: INBOX/FORM STRATEGY */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Strategy */}
                <div className="space-y-6 text-left">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Cải thiện chuyển đổi</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Chiến Lược Tối Ưu Tỷ Lệ Đòn Bẩy Inbox & Form Không Thất Thoát</h2>
                  <p className="text-sm text-[#5E5D59] leading-relaxed">
                    Có data đổ về chưa đủ, điều quan trọng là tốc độ xử lý tin nhắn và chất lượng kịch bản chốt đơn. PGS tích hợp kịch bản tự động lọc rác và đẩy thẳng thông tin số điện thoại khách hàng tiềm năng về hệ thống quản lý bán hàng của bạn trong vòng 3 giây.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 text-[#B59469] flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1C1B19]">Phản Hồi Siêu Tốc &lt; 1 Phút</h4>
                        <p className="text-xs text-[#5E5D59]">Kích hoạt chatbot mở lời chuyên nghiệp ngay khi khách hàng tương tác với quảng cáo.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 text-[#B59469] flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1C1B19]">Form Sàng Lọc Sâu Đối Tượng</h4>
                        <p className="text-xs text-[#5E5D59]">Hệ thống câu hỏi trắc nghiệm thông minh loại bỏ tệp spam, nhầm số, tệp trẻ em nghịch phá.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 text-[#B59469] flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1C1B19]">Tích Hợp API Chuyển Lead Tự Động</h4>
                        <p className="text-xs text-[#5E5D59]">Đồng bộ dữ liệu trực tiếp về Google Sheets hoặc CRM giúp Sales gọi điện chốt đơn ngay lập tức.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Chat Simulation */}
                <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#EBE9E4] space-y-4 shadow-inner">
                  <div className="text-xs font-bold text-[#7A7974] uppercase tracking-wider pb-2 border-b border-[#EBE9E4] flex justify-between items-center">
                    <span>Quy trình xử lý chat tự động</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Kịch bản PGS</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    
                    {/* Customer */}
                    <div className="flex justify-end">
                      <div className="bg-[#1C1B19] text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-left">
                        <p>Tôi đang tìm hiểu giải pháp chạy quảng cáo Facebook hiệu quả cho công ty. Tư vấn giúp tôi với!</p>
                      </div>
                    </div>

                    {/* Agent (Auto response) */}
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#EBE9E4] p-3 rounded-2xl rounded-tl-none max-w-[80%] text-left space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-[#C5A880]">
                          <Zap className="w-3.5 h-3.5" />
                          <span>PGS Auto-Bot</span>
                        </div>
                        <p>Chào Anh/Chị! PGS Agency cam kết giúp doanh nghiệp thiết lập hệ thống tăng lead chất lượng. Xin hỏi doanh nghiệp của mình đang hoạt động trong lĩnh vực nào ạ?</p>
                      </div>
                    </div>

                    {/* Customer click pre-selection */}
                    <div className="flex justify-end gap-2 pt-1 flex-wrap">
                      <span className="px-3 py-1.5 bg-amber-50 border border-[#C5A880] text-[#B59469] rounded-full font-bold cursor-pointer hover:bg-amber-100 transition-all">
                        Khởi Nghiệp / Retail
                      </span>
                      <span className="px-3 py-1.5 bg-amber-50 border border-[#C5A880] text-[#B59469] rounded-full font-bold cursor-pointer hover:bg-amber-100 transition-all">
                        Doanh nghiệp B2B / Xuất khẩu
                      </span>
                    </div>

                    {/* Auto validation CRM step */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between text-[11px] font-semibold">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-600" />
                        <span>Hệ thống ghi nhận: Lọc sâu thành công & Đẩy về CRM tự động</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-300">0.8 Giây</span>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 9: PIXEL & REMARKETING BEAM */}
            <section className="py-16 px-4 md:px-8 bg-white border-y border-[#EBE9E4] overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual beam graphic */}
                <div className="lg:col-span-6 relative flex justify-center">
                  <div className="relative w-full max-w-md p-6 bg-[#FCFBFA] border border-[#EBE9E4] rounded-2xl shadow-xl">
                    <div className="absolute top-2 left-2 text-[9px] font-mono font-bold text-[#C5A880] uppercase">Advanced pixel integration</div>
                    
                    <div className="flex flex-col items-center gap-6 my-4">
                      
                      {/* Node A */}
                      <div className="px-4 py-2 bg-white border border-[#EBE9E4] rounded-lg text-xs font-bold text-[#1C1B19] shadow-sm flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                        Khách truy cập Website PGS
                      </div>

                      {/* Direction Beam */}
                      <div className="h-8 w-1 bg-gradient-to-b from-[#C5A880] to-[#1C1B19] animate-pulse"></div>

                      {/* Node B */}
                      <div className="px-4 py-3 bg-[#1C1B19] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-3">
                        <Cpu className="w-4 h-4 text-[#C5A880] animate-spin" style={{ animationDuration: '4s' }} />
                        Hệ Thống Meta Pixel & Conversions API
                      </div>

                      {/* Direction Beam */}
                      <div className="h-8 w-1 bg-gradient-to-b from-[#1C1B19] to-[#C5A880] animate-pulse"></div>

                      {/* Node C */}
                      <div className="px-4 py-2 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-lg text-xs font-bold text-[#B59469] shadow-sm flex items-center gap-2">
                        Tệp Smart Remarketing 15 Ngày
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right text explanation */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Cứu vớt tệp rớt</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Chống Rò Rỉ Dữ Liệu Bằng Meta Conversions API (CAPI) Nâng Cao</h2>
                  <p className="text-sm text-[#5E5D59] leading-relaxed">
                    Kể từ bản cập nhật iOS 14+, việc bám đuổi hành vi khách hàng qua Pixel thông thường đã bị sụt giảm hơn 50% hiệu suất. PGS giải quyết tận gốc vấn đề này bằng cách tích hợp <strong>Conversions API (CAPI)</strong> - đồng bộ hóa dữ liệu trực tiếp từ máy chủ server sang Meta.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#EBE9E4]">
                      <div className="text-sm font-bold text-[#1C1B19]">Tỉ lệ khớp tệp +35%</div>
                      <p className="text-[11px] text-[#7A7974] mt-1">Đảm bảo Meta nhận diện chuẩn xác khách hàng tiềm năng đã vào giỏ hàng hoặc xem sản phẩm.</p>
                    </div>
                    <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#EBE9E4]">
                      <div className="text-sm font-bold text-[#1C1B19]">Bám đuổi cá nhân hóa</div>
                      <p className="text-[11px] text-[#7A7974] mt-1">Chỉ bám sát những người chưa hoàn tất mua hàng thay vì tiếp tục spam những người đã mua.</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 10: INTERACTIVE KPI CALCULATOR (THE META LEAD ENGINE SIMULATOR) */}
            <section id="simulator" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-[#FAF9F5]">
              <div className="max-w-7xl mx-auto">
                
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Công cụ tính toán</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1C1A]">Công Cụ Mô Phỏng Đo Lường Chuyển Đổi Doanh Thu Meta Ads</h2>
                  <p className="text-sm text-[#5E5D59]">
                    Kéo các thanh trượt dưới đây để tự mình kiểm tra dòng tiền chi tiêu quảng cáo và ước tính doanh thu đạt được dựa trên số liệu tối ưu thực tế từ PGS.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Sliders */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EBE9E4] shadow-md space-y-6">
                    <h3 className="font-heading font-bold text-lg text-[#1C1B19] flex items-center gap-2 border-b border-[#F5F4F0] pb-3">
                      <Cpu className="w-5 h-5 text-[#C5A880]" />
                      Điều Chỉnh Chỉ Số Chiến Dịch
                    </h3>

                    {/* Slider 1: Budget */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#1C1B19]">Ngân sách quảng cáo hàng tháng:</span>
                        <span className="text-[#B59469] font-mono text-sm">{formatVND(monthlyBudget)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5000000" 
                        max="200000000" 
                        step="5000000"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                        className="w-full accent-[#C5A880] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#7A7974] font-mono">
                        <span>5,000,000đ</span>
                        <span>100,000,000đ</span>
                        <span>200,000,000đ</span>
                      </div>
                    </div>

                    {/* Slider 2: CPC */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#1C1B19]">Giá click trung bình (CPC):</span>
                        <span className="text-[#B59469] font-mono text-sm">{estimatedCPC.toLocaleString('vi-VN')} đ/click</span>
                      </div>
                      <input 
                        type="range" 
                        min="1500" 
                        max="12000" 
                        step="500"
                        value={estimatedCPC}
                        onChange={(e) => setEstimatedCPC(Number(e.target.value))}
                        className="w-full accent-[#C5A880] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#7A7974] font-mono">
                        <span>1,500đ (Tối ưu)</span>
                        <span>6,000đ (Trung bình)</span>
                        <span>12,000đ (Đắt đỏ)</span>
                      </div>
                    </div>

                    {/* Slider 3: Click-to-Inbox */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#1C1B19]">Tỉ lệ Click chuyển thành Inbox/Form:</span>
                        <span className="text-emerald-600 font-mono text-sm">{clickToInboxRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="3" 
                        max="25" 
                        step="1"
                        value={clickToInboxRate}
                        onChange={(e) => setClickToInboxRate(Number(e.target.value))}
                        className="w-full accent-[#C5A880] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#7A7974] font-mono">
                        <span>3% (Yếu)</span>
                        <span>12% (PGS Chuẩn)</span>
                        <span>25% (Đột phá)</span>
                      </div>
                    </div>

                    {/* Slider 4: Inbox-to-Lead */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#1C1B19]">Tỉ lệ Inbox ra Lead Nóng chất lượng:</span>
                        <span className="text-emerald-600 font-mono text-sm">{inboxToLeadRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="50" 
                        step="1"
                        value={inboxToLeadRate}
                        onChange={(e) => setInboxToLeadRate(Number(e.target.value))}
                        className="w-full accent-[#C5A880] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#7A7974] font-mono">
                        <span>5% (Chưa lọc)</span>
                        <span>25% (PGS Lọc)</span>
                        <span>50% (Sàng lọc cao)</span>
                      </div>
                    </div>

                    {/* Slider 5: Average Order Value */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#1C1B19]">Giá trị trung bình 1 đơn hàng (AOV):</span>
                        <span className="text-[#B59469] font-mono text-sm">{formatVND(averageOrderValue)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="200000" 
                        max="10000000" 
                        step="100000"
                        value={averageOrderValue}
                        onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                        className="w-full accent-[#C5A880] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#7A7974] font-mono">
                        <span>200.000đ</span>
                        <span>5.000.000đ</span>
                        <span>10.000.000đ</span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Outcomes */}
                  <div className="lg:col-span-5 bg-[#1C1B19] text-white p-6 rounded-2xl border border-gray-800 space-y-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#C5A880] flex items-center gap-2 border-b border-gray-800 pb-3">
                        <BarChart3 className="w-5 h-5" />
                        Dự Kiến Hiệu Quả Đạt Được
                      </h3>

                      <div className="grid grid-cols-2 gap-4 pt-4 text-left">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Tổng lượt Click</div>
                          <div className="text-lg font-mono font-black text-white mt-1">{metrics.totalClicks.toLocaleString()}</div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Số lượng Inbox nhận</div>
                          <div className="text-lg font-mono font-black text-[#C5A880] mt-1">{metrics.totalInbox.toLocaleString()}</div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Hot Leads chất lượng</div>
                          <div className="text-lg font-mono font-black text-emerald-400 mt-1">{metrics.totalHotLeads.toLocaleString()}</div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Chi phí mỗi Lead (CPL)</div>
                          <div className="text-sm font-mono font-black text-[#C5A880] mt-1.5">{formatVND(metrics.costPerLead)}</div>
                        </div>
                      </div>

                      {/* Revenue calculation bottom */}
                      <div className="mt-6 p-4 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-xl text-left">
                        <div className="text-[10px] text-[#C5A880] uppercase tracking-widest font-bold">Tiềm Năng Doanh Thu Ước Tính (Chốt Sale 18%)</div>
                        <div className="text-2xl font-heading font-black text-white mt-1">{formatVND(metrics.estimatedRevenue)}</div>
                        <div className="flex justify-between items-center text-[10px] text-gray-300 mt-2 font-mono">
                          <span>Chi phí quảng cáo: -{formatVND(monthlyBudget)}</span>
                          <span className="text-emerald-400 font-bold">ROI Ước Tính: {metrics.estimatedROI.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-400 italic text-left border-t border-gray-800 pt-4">
                      *Lưu ý: Bảng tính mang tính chất tham khảo chiến dịch tiêu chuẩn, hiệu quả cụ thể phụ thuộc vào lĩnh vực kinh doanh, kịch bản chốt sales và chính sách chăm sóc khách hàng của bạn.
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* SECTION 11: CASE STUDY PROJECT */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="bg-[#1C1B19] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden text-left border border-gray-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs font-bold uppercase tracking-wider">
                    Dự án thực tế thành công
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white leading-tight">
                    Cách PGS Giúp Chuỗi Nha Khoa Premium Giảm 48% Chi Phí Lead Trong 60 Ngày
                  </h3>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    <strong>Bối cảnh:</strong> Nha khoa Thẩm mỹ quốc tế đang tiêu hao 80M VNĐ/tháng chạy inbox tự phát nhưng tỷ lệ số điện thoại rác chiếm tới 60%, Sales không thể chốt lịch hẹn.
                    <br /><br />
                    <strong>Giải pháp PGS:</strong> Tái cấu trúc bằng Custom Form loại bỏ đối tượng ảo dưới 22 tuổi, triển khai 6 góc độ video ngắn (Angle Bác sĩ giải đáp nỗi sợ ê buốt), và cài đặt Meta CAPI đồng bộ danh sách khách đã đặt lịch thành công để huấn luyện AI của Meta bám đuổi chuẩn xác.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800">
                    <div>
                      <div className="text-[11px] text-gray-400">Ngân sách hàng tháng</div>
                      <div className="text-base font-bold text-white mt-1">90.000.000đ</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400">Chi phí mỗi Lead (CPL)</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">-48% Thấp hơn</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400">Số lượng Hot Leads thực</div>
                      <div className="text-base font-bold text-[#C5A880] mt-1">+120% Tăng</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400">Doanh số tăng trưởng</div>
                      <div className="text-base font-bold text-white mt-1">X2.5 Lần</div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 12: MARKETING PACKAGES (INTERACTIVE) */}
            <section id="packages" className="py-16 px-4 md:px-8 bg-[#F5F4F0] border-y border-[#EBE9E4]">
              <div className="max-w-7xl mx-auto text-center">
                
                <div className="max-w-3xl mx-auto space-y-4 mb-12">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Bảng báo giá dịch vụ</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Gói Triển Khai Facebook Ads Linh Hoạt Cho Doanh Nghiệp</h2>
                  <p className="text-sm text-[#5E5D59]">
                    Lựa chọn gói dịch vụ tối ưu ngân sách phù hợp nhất với giai đoạn tăng trưởng của doanh nghiệp bạn.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  
                  {/* Package 1 */}
                  <div className={`p-8 rounded-2xl border bg-white flex flex-col justify-between text-left transition-all duration-300 ${
                    activePkg === 'setup' ? 'border-[#C5A880] ring-2 ring-[#C5A880]/20 scale-[1.02]' : 'border-[#EBE9E4]'
                  }`} onClick={() => setActivePkg('setup')}>
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-[#B59469] uppercase tracking-widest">Gói Cơ Bản</div>
                      <h3 className="text-xl font-heading font-black text-[#1C1B19]">Facebook Ads Setup</h3>
                      <p className="text-xs text-[#7A7974] leading-relaxed">
                        Thiết lập nền tảng quảng cáo chuẩn chỉnh, tối ưu tài khoản doanh nghiệp cho doanh nghiệp vừa khởi nghiệp.
                      </p>
                      
                      <div className="py-4 border-y border-[#F5F4F0]">
                        <div className="text-xs text-[#7A7974]">Ngân sách khuyên dùng</div>
                        <div className="text-lg font-bold text-[#1C1B19] mt-1">Dưới 15 Triệu/tháng</div>
                      </div>

                      <ul className="space-y-2.5 text-xs text-[#5E5D59]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Cài đặt Tài khoản Business (BM)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Cài đặt Meta Pixel cơ bản
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Thiết kế 3 Mẫu Banner Ads
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Viết 3 Kịch bản Nội dung Quảng cáo
                        </li>
                      </ul>
                    </div>

                    <button className="w-full mt-8 py-3 rounded-lg border-2 border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white text-xs font-bold transition-all">
                      Đăng Ký Tư Vấn Gói
                    </button>
                  </div>

                  {/* Package 2 */}
                  <div className={`p-8 rounded-2xl border bg-white flex flex-col justify-between text-left relative transition-all duration-300 ${
                    activePkg === 'management' ? 'border-[#C5A880] ring-2 ring-[#C5A880]/20 scale-[1.04]' : 'border-[#EBE9E4]'
                  }`} onClick={() => setActivePkg('management')}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1C1B19] text-[#C5A880] text-[9px] tracking-widest uppercase font-extrabold px-3 py-1 rounded-full shadow-sm">
                      Doanh Nghiệp Lựa Chọn Nhiều Nhất
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-[#B59469] uppercase tracking-widest">Gói Tăng Trưởng</div>
                      <h3 className="text-xl font-heading font-black text-[#1C1B19]">Facebook Ads Management</h3>
                      <p className="text-xs text-[#7A7974] leading-relaxed">
                        Phù hợp cho các doanh nghiệp Retail, B2B cần duy trì dòng khách hàng đều đặn mỗi ngày một cách bền vững.
                      </p>
                      
                      <div className="py-4 border-y border-[#F5F4F0]">
                        <div className="text-xs text-[#7A7974]">Ngân sách khuyên dùng</div>
                        <div className="text-lg font-bold text-[#1C1B19] mt-1">15M - 80M /tháng</div>
                      </div>

                      <ul className="space-y-2.5 text-xs text-[#5E5D59]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Quản lý & Tối ưu quảng cáo hàng ngày
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Cài đặt Conversions API (CAPI) máy chủ
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Thiết kế 6-8 Banner Ads/tháng
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Sản xuất 2-4 Video ngắn Reels/TikTok Ads
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Báo cáo Real-time qua Dashboard PGS
                        </li>
                      </ul>
                    </div>

                    <button className="w-full mt-8 py-3 rounded-lg bg-[#C5A880] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white text-xs font-bold transition-all shadow-md">
                      Đăng Ký Tư Vấn Gói
                    </button>
                  </div>

                  {/* Package 3 */}
                  <div className={`p-8 rounded-2xl border bg-white flex flex-col justify-between text-left transition-all duration-300 ${
                    activePkg === 'growth' ? 'border-[#C5A880] ring-2 ring-[#C5A880]/20 scale-[1.02]' : 'border-[#EBE9E4]'
                  }`} onClick={() => setActivePkg('growth')}>
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-[#B59469] uppercase tracking-widest">Gói Đột Phá</div>
                      <h3 className="text-xl font-heading font-black text-[#1C1B19]">Meta Lead Growth</h3>
                      <p className="text-xs text-[#7A7974] leading-relaxed">
                        Hệ thống phễu tăng trưởng đỉnh cao, bám đuổi đa điểm chạm và tích hợp sâu hệ thống CRM bán hàng lớn.
                      </p>
                      
                      <div className="py-4 border-y border-[#F5F4F0]">
                        <div className="text-xs text-[#7A7974]">Ngân sách khuyên dùng</div>
                        <div className="text-lg font-bold text-[#1C1B19] mt-1">Trên 80 Triệu/tháng</div>
                      </div>

                      <ul className="space-y-2.5 text-xs text-[#5E5D59]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Tối ưu phễu landing page chốt sales riêng
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Remarketing bám bổi đa kênh (Meta + Google)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Sản xuất Video & Viết content đa góc độ liên tục
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Tích hợp CRM phân tích lead & đo lường chất lượng
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          Cố vấn kịch bản chốt sales trực tiếp cho Sales team
                        </li>
                      </ul>
                    </div>

                    <button className="w-full mt-8 py-3 rounded-lg border-2 border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white text-xs font-bold transition-all">
                      Liên Hệ Trực Tiếp CEO
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* SECTION 13: EXTENDED FAQ (ACCORDION) */}
            <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-left">
              <div className="text-center space-y-4 mb-12">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Giải đáp băn khoăn</div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Những Câu Hỏi Thường Gặp Về Dịch Vụ Facebook Ads</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Facebook Ads có thực sự phù hợp với các doanh nghiệp B2B không?",
                    a: "Hoàn toàn phù hợp! Trái với suy nghĩ rằng Facebook chỉ bán hàng giá trị nhỏ, tệp người dùng Facebook bao gồm cả các chủ doanh nghiệp, trưởng phòng thu mua. Bằng cách sử dụng Meta Lead Forms kết hợp kịch bản lọc sâu (về quy mô công ty, chức vụ), chúng tôi dễ dàng thu về những leads B2B chất lượng cao mà chi phí tối ưu hơn LinkedIn Ads rất nhiều."
                  },
                  {
                    q: "Chúng tôi nên chạy chiến dịch quảng cáo tin nhắn (Inbox) hay thu thập Form?",
                    a: "Phụ thuộc vào mức độ sẵn sàng chốt đơn của Sales. Chiến dịch Inbox phù hợp với sản phẩm bán lẻ chu kỳ ngắn. Chiến dịch Lead Form phù hợp với ngành dịch vụ, giáo dục, tài chính, bất động sản cần xác nhận số điện thoại và thông tin cụ thể trước khi gọi tư vấn."
                  },
                  {
                    q: "Doanh nghiệp có cần xây dựng riêng Landing Page để chạy quảng cáo không?",
                    a: "Với các gói lớn hoặc ngành hàng cao cấp, Landing Page là bắt buộc để tăng tối đa điểm chất lượng chuyển đổi. Tuy nhiên với tệp ngân sách trung bình, PGS hoàn toàn có thể thiết lập hệ thống phễu Instant Form và Chatbot mượt mà ngay trên ứng dụng Facebook mà không tốn chi phí xây dựng website phức tạp."
                  },
                  {
                    q: "Mất bao lâu để chiến dịch quảng cáo Facebook tối ưu hóa và mang lại hiệu quả?",
                    a: "Giai đoạn máy học của Meta thường kéo dài 50 chuyển đổi đầu tiên (khoảng 3-7 ngày đầu). PGS sẽ tối ưu liên tục và bắt đầu bàn giao dòng lead ổn định sau tuần đầu tiên triển khai. Sau 30 ngày, hệ thống sẽ đi vào quỹ đạo tối ưu nhất."
                  },
                  {
                    q: "PGS có cam kết số lượng số điện thoại (Lead) chất lượng không?",
                    a: "Chúng tôi cam kết về KPI đầu vào (Reach, Click, lượt đăng ký Form thật) và đồng hành tư vấn tối ưu kịch bản chuyển đổi thực tế. PGS không cam kết 'lead rác giá siêu rẻ', chúng tôi tập trung mang lại leads nóng có tỷ lệ chuyển đổi chốt đơn thật cao để giúp bạn gia tăng lợi nhuận thực tế."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-[#EBE9E4] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-5 text-left font-bold text-sm text-[#1C1B19] flex justify-between items-center transition-all hover:bg-amber-50/20"
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#C5A880] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-5 border-t border-[#EBE9E4] text-xs text-[#5E5D59] leading-relaxed bg-[#FCFBFA]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: RELATED SERVICES */}
            <section className="py-16 px-4 md:px-8 bg-white border-t border-[#EBE9E4] text-center">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#B59469]">Hệ sinh thái PGS</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-[#1C1B19]">Giải Pháp Marketing Tổng Thể Đồng Hành Cùng Sự Thịnh Vượng</h2>
                  <p className="text-sm text-[#5E5D59]">
                    Marketing không hoạt động độc lập. Để tối ưu hóa hiệu quả gia tăng tệp khách hàng tiềm năng, PGS cung cấp các dịch vụ bổ trợ hoàn hảo.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 transition-all duration-300 hover:border-[#C5A880]">
                    <div className="text-xs font-bold text-[#B59469] uppercase tracking-wider">01. Content Social & Fanpage</div>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Sản xuất bài viết nuôi dưỡng Fanpage, thiết lập hình ảnh đồng bộ tăng uy tín thương hiệu trong mắt khách hàng.
                    </p>
                  </div>
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 transition-all duration-300 hover:border-[#C5A880]">
                    <div className="text-xs font-bold text-[#B59469] uppercase tracking-wider">02. Thiết Kế Landing Page</div>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Xây dựng các trang đích giới thiệu sản phẩm tối ưu trải nghiệm người dùng, đẩy tỷ lệ chuyển đổi form lên gấp đôi.
                    </p>
                  </div>
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 transition-all duration-300 hover:border-[#C5A880]">
                    <div className="text-xs font-bold text-[#B59469] uppercase tracking-wider">03. Quảng Cáo Google Ads</div>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Đón đầu nhu cầu tìm kiếm chủ động của khách hàng trên Google Search & Youtube, phối hợp remarketing hoàn hảo.
                    </p>
                  </div>
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 transition-all duration-300 hover:border-[#C5A880]">
                    <div className="text-xs font-bold text-[#B59469] uppercase tracking-wider">04. SEO Tổng Thể Từ Khóa</div>
                    <p className="text-xs text-[#5E5D59] leading-relaxed">
                      Xây dựng website chuẩn SEO vững vàng vị trí top Google bền vững, thu hút hàng ngàn lượt truy cập tự nhiên 0đ.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 15: FINAL CTA PANEL */}
            <section id="quote-form" className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#FCFBFA] to-[#F5F4F0] border-t border-[#EBE9E4]">
              <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-[#EBE9E4] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-2xl"></div>
                
                <div className="space-y-4 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-[#1C1B19]">
                    Bạn Đang Có Tương Tác Nhưng Chưa Có Lead Chất Lượng?
                  </h2>
                  <p className="text-sm text-[#5E5D59] max-w-xl mx-auto leading-relaxed">
                    Đừng tiếp tục ném ngân sách qua cửa sổ quảng cáo tự phát. Hãy để chuyên gia PGS Agency rà soát và hoạch định lộ trình tăng trưởng bứt phá doanh thu cho doanh nghiệp bạn.
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã gửi thông tin. Chuyên viên PGS Agency sẽ liên lạc hỗ trợ bạn trong vòng 15 phút!'); }}>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1C1B19] uppercase tracking-wider">Tên của bạn*</label>
                    <input required type="text" placeholder="Nguyễn Văn A" className="w-full p-3 bg-[#FCFBFA] border border-[#EBE9E4] rounded-lg text-xs focus:border-[#C5A880] focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1C1B19] uppercase tracking-wider">Số điện thoại chốt sales*</label>
                    <input required type="tel" placeholder="0901 234 567" className="w-full p-3 bg-[#FCFBFA] border border-[#EBE9E4] rounded-lg text-xs focus:border-[#C5A880] focus:outline-none" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[11px] font-bold text-[#1C1B19] uppercase tracking-wider">Tên doanh nghiệp & Lĩnh vực*</label>
                    <input required type="text" placeholder="Công ty Bất Động Sản X" className="w-full p-3 bg-[#FCFBFA] border border-[#EBE9E4] rounded-lg text-xs focus:border-[#C5A880] focus:outline-none" />
                  </div>
                  <button type="submit" className="w-full md:col-span-2 py-4 bg-[#C5A880] hover:bg-[#1C1B19] text-[#1C1B19] hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md">
                    Kiểm Tra Chiến Dịch Facebook Ads Hiện Tại Ngay
                  </button>
                </form>

                <div className="flex justify-center items-center gap-6 text-[10px] text-[#7A7974] font-semibold pt-4">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Bảo mật thông tin 100%
                  </span>
                  <span>·</span>
                  <span>Tư vấn trực tiếp 1-1 cùng Founder</span>
                </div>
              </div>
            </section>

          </motion.main>
        ) : (
          
          /* MODE 2: THE DETAILED TECHNICAL HANDOVER DOCUMENTS VIEW */
          <motion.main
            key="handover-docs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left"
          >
            <div className="space-y-8 bg-white border border-[#EBE9E4] rounded-3xl p-6 md:p-12 shadow-md">
              
              {/* Cover Banner */}
              <div className="border-b border-[#EBE9E4] pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A880] uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-[#C5A880]/30">
                  <Code2 className="w-3.5 h-3.5" />
                  Tài Liệu Đặc Tả Kỹ Thuật Bàn Giao
                </div>
                <h1 className="text-3xl font-heading font-black text-[#1C1B19]">
                  Hồ Sơ Thiết Kế & SEO/CRO Dịch Vụ Facebook Ads — PGS Agency
                </h1>
                <p className="text-xs text-[#5E5D59] leading-relaxed">
                  Tài liệu chuẩn mực dùng để bàn giao trực tiếp cho nhóm Thiết Kế (UI/UX Designer), Lập Trình (Developer) và Tối Ưu Hóa Tìm Kiếm (Content SEO/EEAT Specialist) triển khai đồng bộ.
                </p>
              </div>

              {/* SEO Specifications Block */}
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-black text-[#1C1B19] border-l-4 border-[#C5A880] pl-3">
                  1. Cấu Hình SEO & Meta Tags
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-[#B59469] font-bold">Meta Title (Tiêu đề SEO)</div>
                    <div className="p-3 bg-white border border-[#EBE9E4] rounded font-mono text-xs text-[#1C1B19] break-words">
                      PGS Agency | Dịch Vụ Facebook Ads Tăng Trưởng Đột Phá Doanh Thu
                    </div>
                  </div>

                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-[#B59469] font-bold">Meta Description (Mô tả SEO)</div>
                    <div className="p-3 bg-white border border-[#EBE9E4] rounded font-mono text-xs text-[#1C1B19] break-words leading-relaxed">
                      Hệ thống Facebook Ads kết hợp Pixel nâng cao, Conversions API máy chủ, và kịch bản chốt sales tự động tối ưu CPL giúp bứt phá đơn hàng thực tế của PGS Agency.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-xl space-y-1.5 text-xs text-emerald-800">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    SEO Search Intent Phủ Sóng (Từ Khóa Chính)
                  </div>
                  <p>
                    Dịch vụ Facebook Ads, chạy quảng cáo Facebook, quảng cáo Facebook ra lead, tối ưu Facebook Ads, quản lý quảng cáo Meta, CAPI Facebook.
                  </p>
                </div>
              </div>

              {/* Heading Structure Outline */}
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-black text-[#1C1B19] border-l-4 border-[#C5A880] pl-3">
                  2. Cấu Trúc Headings (H1 - H2 - H3) Bản Đồ Trang
                </h2>

                <div className="p-6 bg-[#FCFBFA] border border-[#EBE9E4] rounded-2xl font-mono text-xs text-[#5E5D59] space-y-4">
                  <div>
                    <span className="text-[#1C1B19] font-bold">[H1]</span> Dịch vụ Facebook Ads giúp doanh nghiệp tăng lead, inbox và remarketing khách hàng tiềm năng
                  </div>
                  
                  <div className="pl-4 border-l border-[#C5A880] space-y-3">
                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Quảng Cáo Facebook Ads Chuyên Nghiệp Là Gì?
                    </div>
                    <div className="pl-4 text-[11px] text-gray-500">
                      [H3] Facebook Feed & Reels Ads | [H3] Instagram Ads | [H3] Messenger Click-to-Chat | [H3] Meta Lead Forms
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Phân Biệt Boost Bài Viết Thường & Facebook Ads Chuyên Nghiệp
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Khi Nào Doanh Nghiệp Bạn Cần Triển Khai Facebook Ads Chuyên Nghiệp?
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Nhiều Doanh Nghiệp Đang Đốt Tiền Vô Ích Cho Ads Vì Đâu?
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Framework 6 Bước Triển Khai Meta Lead Engine Tại PGS
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> 6 Góc Độ Nội Dung Quảng Cáo Kích Hoạt Quyết Định Mua Hàng
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Chiến Lược Tối Ưu Tỷ Lệ Đòn Bẩy Inbox & Form Không Thất Thoát
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Chống Rò Rỉ Dữ Liệu Bằng Meta Conversions API (CAPI) Nâng Cao
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Công Cụ Mô Phỏng Đo Lường Chuyển Đổi Doanh Thu Meta Ads
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Gói Triển Khai Facebook Ads Linh Hoạt Cho Doanh Nghiệp
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Những Câu Hỏi Thường Gặp Về Dịch Vụ Facebook Ads
                    </div>

                    <div>
                      <span className="text-[#1C1B19] font-bold">[H2]</span> Bạn Đang Có Tương Tác Nhưng Chưa Có Lead Chất Lượng?
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Linking Matrix */}
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-black text-[#1C1B19] border-l-4 border-[#C5A880] pl-3">
                  3. Ma Trận Internal Links (Liên kết nội bộ)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 bg-amber-50/20 border border-[#C5A880]/30 rounded-xl space-y-2">
                    <div className="font-bold text-[#1C1B19] flex items-center gap-1.5">
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      Internal Links Đi (Outbound)
                    </div>
                    <ul className="space-y-1.5 list-disc pl-4 text-[#5E5D59]">
                      <li>Trang chủ PGS Agency: <span className="font-mono text-[10px] font-bold text-blue-600">/</span></li>
                      <li>Dịch vụ viết bài Content Fanpage: <span className="font-mono text-[10px] font-bold text-blue-600">/content-social/</span></li>
                      <li>Thiết kế Landing Page chuyển đổi: <span className="font-mono text-[10px] font-bold text-blue-600">/thiet-ke-landing-page/</span></li>
                      <li>Dịch vụ Google Ads: <span className="font-mono text-[10px] font-bold text-blue-600">/dich-vu-google-ads/</span></li>
                    </ul>
                  </div>

                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-2">
                    <div className="font-bold text-[#1C1B19] flex items-center gap-1.5">
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                      Internal Links Nhận (Inbound)
                    </div>
                    <ul className="space-y-1.5 list-disc pl-4 text-[#5E5D59]">
                      <li>Trang chủ dẫn link sang: <span className="font-mono text-[10px] text-gray-500">/dich-vu-facebook-ads/</span></li>
                      <li>Trang dịch vụ Marketing tổng thể: <span className="font-mono text-[10px] text-gray-500">/marketing-tong-the/</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Schema Markup Spec */}
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-black text-[#1C1B19] border-l-4 border-[#C5A880] pl-3">
                  4. Schema.org Microdata JSON-LD Đề Xuất
                </h2>

                <div className="p-4 bg-gray-900 rounded-2xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-72 overflow-y-auto">
                  <pre>{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Dịch vụ Facebook Ads",
      "provider": {
        "@type": "Organization",
        "name": "PGS Agency",
        "url": "https://pgsagency.vn"
      },
      "serviceType": "Marketing Ads Platform",
      "description": "Dịch vụ quảng cáo Facebook, Instagram, Messenger tối ưu hóa CPL bứt phá chuyển đổi doanh thu cho doanh nghiệp.",
      "areaServed": "VN"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://pgsagency.vn"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Dịch vụ Facebook Ads",
          "item": "https://pgsagency.vn/dich-vu-facebook-ads"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Facebook Ads có phù hợp B2B không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hoàn toàn phù hợp bằng cách thiết lập Meta Lead Forms lọc sâu tệp người dùng."
          }
        }
      ]
    }
  ]
}`}</pre>
                </div>
              </div>

              {/* Handover Checklists */}
              <div className="space-y-6 pt-6 border-t border-[#EBE9E4]">
                <h2 className="text-xl font-heading font-black text-[#1C1B19] border-l-4 border-[#C5A880] pl-3">
                  5. Danh Sách Kiểm Tra Bàn Giao Bộ Phận
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Designer */}
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 text-xs">
                    <div className="font-bold text-[#1C1B19] flex items-center gap-1.5 border-b border-[#EBE9E4] pb-2">
                      <Compass className="w-4 h-4 text-[#C5A880]" />
                      UI/UX Designer Checklist
                    </div>
                    <ul className="space-y-2 text-[#5E5D59]">
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Sử dụng chuẩn màu Light Premium Consulting (Nền ngà, chữ charcoal, vàng gold làm điểm nhấn).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Thiết kế phễu Meta Lead Engine trực quan, sáng sủa, tạo cảm giác chuyên nghiệp cao cấp.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Chừa các khoảng trống lớn (Negative space) xung quanh các block chữ chính.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Developer */}
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 text-xs">
                    <div className="font-bold text-[#1C1B19] flex items-center gap-1.5 border-b border-[#EBE9E4] pb-2">
                      <Code2 className="w-4 h-4 text-[#C5A880]" />
                      Web Developer Checklist
                    </div>
                    <ul className="space-y-2 text-[#5E5D59]">
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Tải đúng bộ font Google Fonts (Plus Jakarta Sans cho Heading, Inter cho Body) tránh giật lag.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Tối ưu hóa các tương tác động của Slider trong công cụ tính KPI để tránh giật lag layout.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Tích hợp Schema JSON-LD đúng vào phần đầu trang và nén file CSS cho tải trang dưới 1.5 giây.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Content SEO */}
                  <div className="p-5 bg-[#FCFBFA] border border-[#EBE9E4] rounded-xl space-y-3 text-xs">
                    <div className="font-bold text-[#1C1B19] flex items-center gap-1.5 border-b border-[#EBE9E4] pb-2">
                      <FileCheck className="w-4 h-4 text-[#C5A880]" />
                      Content SEO Checklist
                    </div>
                    <ul className="space-y-2 text-[#5E5D59]">
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Viết các từ khóa chính và phụ một cách tự nhiên vào đầu mỗi đoạn và trong các thẻ Heading.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Tập trung viết sâu sắc, có đầy đủ dẫn chứng và triết lý thương hiệu để vượt qua tiêu chí Google EEAT.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded border-[#C5A880] text-[#C5A880] focus:ring-0" />
                        <span>Tận dụng bảng so sánh (Sự khác biệt) và mục FAQ mở rộng để tối ưu hóa xuất hiện trên AI Search.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      

    </div>
  );
}
