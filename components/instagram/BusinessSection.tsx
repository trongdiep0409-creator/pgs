'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, CheckCircle2, ChevronDown, HelpCircle, PhoneCall, ArrowRight, Star, Heart, Bookmark, Eye, Mail, Briefcase, FileText } from 'lucide-react';

interface BusinessSectionProps {
  formRef: React.RefObject<HTMLFormElement | null>;
}

export default function BusinessSection({ formRef }: BusinessSectionProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', note: '' });

  // Handle slide movement for Before/After mock
  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  // Faq expanded entries
  const faqs = [
    { q: "PGS Agency có bao gồm thiết kế hình ảnh và dựng video Reels trong gói vận hành không?", a: "Có. Tất cả các gói dịch vụ vận hành Instagram của chúng tôi đều bao gồm trọn gói từ khâu lên kịch bản chi tiết, thiết kế ấn phẩm hình ảnh chuẩn visual guideline của thương hiệu, sản xuất video Reels chuyên nghiệp (dựng phim, thêm phụ đề chuyển động, chèn âm thanh xu hướng) và phân phối bài viết chuẩn SEO." },
    { q: "Dịch vụ vận hành của PGS Agency có giúp tài khoản tăng Followers nhanh không?", a: "Chúng tôi cam kết tăng trưởng lượng Followers tự nhiên và chất lượng (Organic Followers). Tệp follow này là những khách hàng thực sự quan tâm đến sản phẩm, dịch vụ của bạn chứ không phải là lượt follow ảo (bot/hack/buff) vô giá trị. Việc phát triển bền vững dựa trên chất lượng Reels và tối ưu công cụ SEO Instagram sẽ mang lại tỷ lệ chuyển đổi đơn hàng vượt trội." },
    { q: "Tôi có được phê duyệt nội dung, kịch bản trước khi PGS đăng bài lên Instagram không?", a: "Chắc chắn rồi. PGS Agency làm việc theo quy trình chuẩn hóa và minh bạch. Hàng tháng/hàng tuần, đội ngũ của chúng tôi sẽ biên soạn trước toàn bộ kịch bản Reels và kế hoạch hình ảnh, gửi cho bạn duyệt trên bảng kế hoạch chung (Content Calendar). Sau khi bạn đồng ý hoàn toàn, chúng tôi mới tiến hành thiết kế hoàn thiện và đăng tải bài viết đúng khung giờ vàng." },
    { q: "Bao lâu thì tôi nhận được báo cáo hiệu quả vận hành kênh?", a: "PGS Agency gửi báo cáo hiệu suất chi tiết định kỳ hàng tháng. Bản báo cáo sẽ liệt kê chi tiết các con số thực tế: Lượt tiếp cận tự nhiên (Reach), Lượt ghé thăm Profile, Lượt nhấp vào Bio Link hướng về Website/Zalo, Lượng Followers mới thu nạp và phân tích sâu về các bài viết/Reels đạt hiệu quả tốt nhất để làm tiền đề tối ưu cho các tháng tiếp theo." },
    { q: "Tôi có thể kết hợp chạy quảng cáo Instagram Ads song song với vận hành không?", a: "Hoàn toàn nên kết hợp. Khi trang Instagram đã được PGS Agency vận hành đẹp mắt và đồng bộ, tỷ lệ chuyển đổi từ quảng cáo (Instagram Ads) sẽ tăng vọt vì khách hàng click vào quảng cáo sẽ thấy trang cá nhân cực kỳ uy tín, chuyên nghiệp. Chúng tôi cung cấp thêm dịch vụ chạy quảng cáo tối ưu chuyển đổi để đồng hành toàn diện cùng sự bứt phá doanh số của bạn." }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setContactSubmitted(true);
  };

  return (
    <div className="space-y-24 bg-white py-16">
      
      {/* SECTION 12: Dự án thực tế (Interactive Before/After Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5" /> Case Studies
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Sự Khác Biệt Thực Tế: Trước & Sau Khi Vận Hành
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base">
            Hãy rê chuột hoặc kéo thanh trượt ở giữa bảng thiết kế dưới đây để chứng kiến sự lột xác thần kỳ của một kênh Instagram khi được quy hoạch chuẩn chỉnh bởi PGS Agency:
          </p>
        </div>

        {/* Before/After Slider Container */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-[650px] aspect-[16/10] bg-stone-100 rounded-3xl border border-stone-200 shadow-xl overflow-hidden relative select-none cursor-ew-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            
            {/* RIGHT SIDE: AFTER (PREMIUM LUXURY GRID) */}
            <div className="absolute inset-0 bg-stone-50 p-6 md:p-10 flex flex-col justify-between">
              
              {/* After profile top */}
              <div className="flex items-center gap-4 border-b border-stone-200/60 pb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif font-bold text-amber-600 text-xs">PGS</div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1">⚜️ pgs_agency_premium</h4>
                  <p className="text-[10px] text-stone-500">Đã quy hoạch: Grid, Reels, Bio, Highlight</p>
                </div>
              </div>

              {/* After grid feed */}
              <div className="grid grid-cols-3 gap-2 mt-4 flex-1">
                {[
                  { title: "Brand Vision", type: "post", bg: "bg-amber-100/40 border-amber-300" },
                  { title: "🎬 Reels: 3 Steps", type: "reel", bg: "bg-white border-stone-200" },
                  { title: "USP Slides", type: "carousel", bg: "bg-stone-50 border-stone-200" },
                  { title: "Client Feedback", type: "carousel", bg: "bg-white border-amber-200" },
                  { title: "Team Grid", type: "post", bg: "bg-stone-100 border-stone-200" },
                  { title: "🎬 Reels: SEO Guide", type: "reel", bg: "bg-amber-100/30 border-amber-300/60" }
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl border p-2 flex flex-col justify-between text-center aspect-[4/3] relative overflow-hidden ${item.bg}`}>
                    <span className="text-[7px] text-stone-400 font-mono uppercase block text-left">Post {i+1}</span>
                    <span className="text-[9px] font-serif font-bold text-stone-900 my-auto">{item.title}</span>
                    <span className="text-[7px] text-amber-800 text-right font-semibold">Standard OK</span>
                  </div>
                ))}
              </div>

              {/* After tag label */}
              <div className="absolute bottom-4 right-4 bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow z-10">
                Sau khi vận hành (Premium Grid)
              </div>
            </div>

            {/* LEFT SIDE: BEFORE (UNOPTIMIZED MESSY GRID) */}
            <div
              className="absolute inset-y-0 left-0 bg-stone-300/90 border-r-2 border-amber-500 p-6 md:p-10 flex flex-col justify-between overflow-hidden z-20"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Force inner contents to stay full width to prevent squishing on resize */}
              <div className="w-[650px] h-full flex flex-col justify-between" style={{ width: '100%', minWidth: '550px' }}>
                
                {/* Before profile top */}
                <div className="flex items-center gap-4 border-b border-stone-400/40 pb-4">
                  <div className="w-14 h-14 rounded-full bg-stone-400 flex items-center justify-center text-white font-bold text-xs">?</div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">unoptimized_account_102</h4>
                    <p className="text-[10px] text-stone-500">Hình ảnh lộn xộn, Bio trống rỗng, không có Reels</p>
                  </div>
                </div>

                {/* Before grid feed */}
                <div className="grid grid-cols-3 gap-2 mt-4 flex-1">
                  {[
                    { title: "ảnh sản phẩm tối màu", bg: "bg-stone-400/40 text-stone-600 border-stone-400" },
                    { title: "ảnh mạng tải về méo", bg: "bg-stone-400/50 text-stone-600 border-stone-400" },
                    { title: "ảnh chụp thô thiếu sáng", bg: "bg-stone-400/30 text-stone-600 border-stone-400" },
                    { title: "ảnh spam chữ dày đặc", bg: "bg-stone-400/60 text-stone-600 border-stone-400" },
                    { title: "ảnh sản phẩm dính logo", bg: "bg-stone-400/40 text-stone-600 border-stone-400" },
                    { title: "bài viết không đều màu", bg: "bg-stone-400/50 text-stone-600 border-stone-400" }
                  ].map((item, i) => (
                    <div key={i} className={`rounded-xl border border-dashed p-2 flex flex-col justify-between text-center aspect-[4/3] line-through ${item.bg}`}>
                      <span className="text-[7px] text-stone-500 text-left">Post {i+1}</span>
                      <span className="text-[9px] font-sans text-stone-700 my-auto">{item.title}</span>
                      <span className="text-[7px] text-red-700 text-right font-medium">No Style</span>
                    </div>
                  ))}
                </div>

                {/* Before tag label */}
                <div className="absolute bottom-4 left-4 bg-stone-800 text-stone-300 font-bold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow">
                  Trước khi vận hành (Lộn xộn)
                </div>

              </div>
            </div>

            {/* Slider bar line handles overlay */}
            <div
              className="absolute inset-y-0 w-1 bg-amber-500 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shadow-lg border border-white">
                ↔
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13: Gói dịch vụ (Package Table) */}
      <section id="packages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Service Packages
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Gói Dịch Vụ Vận Hành Instagram Premium
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base">
            Chúng tôi thiết kế các gói dịch vụ may đo phù hợp với từng giai đoạn phát triển và năng lực tài chính của doanh nghiệp của bạn, cam kết đồng hành dài hạn vì sự tăng trưởng thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Package 1: Instagram Care */}
          <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/60 shadow-sm flex flex-col justify-between relative hover:border-amber-500/30 transition duration-300">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-xl">Instagram Care</h3>
              <p className="text-stone-500 text-xs mt-1.5 leading-normal">Khởi tạo và chăm sóc kênh chuyên nghiệp, thích hợp cho các shop mới hoặc thương hiệu nhỏ cần xây dựng uy tín visual cơ bản.</p>
              
              <div className="my-6 border-y border-stone-200/60 py-4">
                <span className="text-xs text-stone-400 uppercase tracking-widest block font-bold">Chi phí chỉ từ</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-stone-950 mt-1 inline-block">5.000.000đ</span>
                <span className="text-xs text-stone-400"> / Tháng</span>
              </div>

              <ul className="space-y-3.5 text-stone-600 text-xs md:text-sm">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Tối ưu profile chuẩn SEO (Avatar, Bio, CTA)</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Thiết kế 9-Grid Layout cơ bản theo Brand Book</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Đăng 12 bài viết (Hình đơn/Carousel) hàng tháng</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Lên 3 kịch bản Reels ngắn</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Nghiên cứu bộ Hashtag 3 tầng</li>
                <li className="text-stone-300 flex items-center gap-2.5 line-through"><Check className="w-4 h-4" /> Báo cáo phân tích KPI nâng cao hàng tuần</li>
              </ul>
            </div>

            <button
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                setFormData(prev => ({ ...prev, note: 'Tư vấn gói Instagram Care' }));
              }}
              className="mt-8 w-full py-3 px-4 rounded-xl border border-amber-500/50 hover:bg-stone-100 text-stone-950 text-xs font-bold transition duration-300 text-center cursor-pointer"
            >
              Chọn gói Instagram Care
            </button>
          </div>

          {/* Package 2: Instagram Visual Growth (HOT) */}
          <div className="p-8 rounded-3xl bg-white border-2 border-amber-500 shadow-md flex flex-col justify-between relative transform lg:-translate-y-2">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-stone-950 text-[9px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow">
              PHỔ BIẾN NHẤT
            </div>
            
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-2xl flex items-center gap-2">
                Visual Growth <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </h3>
              <p className="text-stone-500 text-xs mt-1.5 leading-normal">Bứt phá tiếp cận tự nhiên với chiến lược Reels chuyên sâu, quy hoạch Visual đẳng cấp, tăng tỷ lệ nhấp bio link lên gấp đôi.</p>
              
              <div className="my-6 border-y border-stone-200/60 py-4">
                <span className="text-xs text-stone-400 uppercase tracking-widest block font-bold">Chi phí chỉ từ</span>
                <span className="text-3xl md:text-4xl font-serif font-bold text-amber-600 mt-1 inline-block">10.000.000đ</span>
                <span className="text-xs text-stone-400"> / Tháng</span>
              </div>

              <ul className="space-y-3.5 text-stone-700 text-xs md:text-sm">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Trọn gói Tối ưu Profile + Story Highlight Icons</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Quy hoạch Grid Layout (Checkerboard / Row topic)</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Đăng 18 bài viết (Thiết kế đồ họa cao cấp)</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Sản xuất 6 video Reels chuẩn chỉnh (Kịch bản, lồng nhạc)</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Tối ưu Bio Link phễu chuyển đổi CRO về Zalo/Website</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Báo cáo phân tích KPI đo lường sâu hàng tháng</li>
              </ul>
            </div>

            <button
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                setFormData(prev => ({ ...prev, note: 'Tư vấn gói Instagram Visual Growth' }));
              }}
              className="mt-8 w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition duration-300 text-center shadow shadow-amber-500/10 cursor-pointer"
            >
              Chọn gói Visual Growth
            </button>
          </div>

          {/* Package 3: Instagram Brand Studio */}
          <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/60 shadow-sm flex flex-col justify-between relative hover:border-amber-500/30 transition duration-300">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-xl">Brand Studio</h3>
              <p className="text-stone-500 text-xs mt-1.5 leading-normal">Giải pháp May đo tối cao dành cho tập đoàn, thương hiệu lớn cần đầu tư hình ảnh độc bản, bao gồm cả dịch vụ quay chụp thật tại studio.</p>
              
              <div className="my-6 border-y border-stone-200/60 py-4">
                <span className="text-xs text-stone-400 uppercase tracking-widest block font-bold">Chi phí chỉ từ</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-stone-950 mt-1 inline-block">20.000.000đ</span>
                <span className="text-xs text-stone-400"> / Tháng</span>
              </div>

              <ul className="space-y-3.5 text-stone-600 text-xs md:text-sm">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Toàn quyền chuẩn hóa nhận diện Visual độc bản</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Đăng 24-30 bài viết (Hình ảnh chụp sản phẩm thật)</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> 1 buổi chụp hình thật & quay Reels trực tiếp tại studio</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Sản xuất 10-12 video Reels cao cấp</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Quản trị và phản hồi bình luận, tin nhắn 24/7</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-amber-500" /> Báo cáo chuyên sâu và cố vấn chiến lược Ads tích hợp</li>
              </ul>
            </div>

            <button
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                setFormData(prev => ({ ...prev, note: 'Tư vấn gói Instagram Brand Studio' }));
              }}
              className="mt-8 w-full py-3 px-4 rounded-xl border border-amber-500/50 hover:bg-stone-100 text-stone-950 text-xs font-bold transition duration-300 text-center cursor-pointer"
            >
              Chọn gói Brand Studio
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 14: FAQ mở rộng (Accordions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Câu Hỏi Thường Gặp FAQ
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base">
            Giải đáp nhanh chóng các thắc mắc cốt lõi giúp doanh nghiệp yên tâm hoàn toàn trước khi cùng PGS Agency đồng hành lâu dài trên con đường số hóa.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-stone-200/80 overflow-hidden bg-stone-50/50">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm md:text-base transition duration-300 hover:bg-stone-50 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-600 transition duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 pt-0 border-t border-stone-200/40 text-stone-600 text-xs md:text-sm leading-relaxed font-sans bg-white">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 15: Dịch vụ liên quan (Internal cross-linking module) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs text-amber-800 uppercase tracking-widest font-bold">Hệ thống giải pháp tiếp theo</p>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-medium mt-2">
            Đồng bộ marketing đa nền tảng với PGS Agency
          </h2>
          <p className="mt-4 text-stone-500 text-sm">
            Instagram là một mảnh ghép của bức tranh tổng thể. Để tối ưu hóa hiệu quả, hãy tham khảo thêm các giải pháp đồng bộ khác của chúng tôi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Content Social Premium", link: "/dich-vu/content-social", desc: "Xây dựng chiến lược nội dung sắc bén cho Facebook, Fanpage, thúc đẩy tương tác và giữ chân khách hàng.", icon: "✍️" },
            { name: "Facebook Ads Tối Ưu Chuyển Đổi", link: "/dich-vu/facebook-ads", desc: "Tối ưu hóa ngân sách ads, tiếp cận chuẩn xác tệp khách hàng tiềm năng, chuyển hóa lượt click thành đơn hàng thực tế.", icon: "📊" },
            { name: "Xây Dựng Kênh TikTok Bứt Phá", link: "/dich-vu/xay-kenh-tiktok", desc: "Sản xuất video ngắn lọt top thịnh hành, thiết lập giỏ hàng TikTok Shop, tiếp cận hàng triệu người dùng thế hệ mới.", icon: "🎬" }
          ].map((srv, i) => (
            <a
              key={i}
              href={srv.link}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/60 hover:border-amber-500/40 hover:shadow-lg transition duration-300 block group"
            >
              <span className="text-2xl mb-3 block">{srv.icon}</span>
              <h4 className="font-serif font-bold text-stone-900 group-hover:text-amber-600 transition text-sm md:text-base">{srv.name}</h4>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">{srv.desc}</p>
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block mt-4 group-hover:translate-x-1.5 transition-transform duration-300">Khám phá →</span>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 16: CTA cuối trang (Contact Form) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="bg-stone-950 rounded-3xl p-8 md:p-14 border border-stone-800 relative overflow-hidden text-white shadow-2xl">
          
          {/* Subtle design elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl -z-10"></div>
          <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" /> Đồng hành tăng trưởng
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight font-medium">
                Instagram của bạn đã thể hiện đúng hình ảnh thương hiệu chưa?
              </h2>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-sans max-w-xl">
                Đừng nhượng bộ cho một trang cá nhân hời hợt, lộn xộn làm đánh mất cơ hội tiếp cận khách hàng VIP mỗi ngày. Hãy gửi ngay thông tin đăng ký, đội ngũ chuyên gia PGS Agency sẽ liên hệ để tư vấn trực tiếp và gửi bản <strong>Audit Kênh miễn phí</strong> cho bạn trong 24 giờ.
              </p>

              {/* Direct visual grid mini decorative */}
              <div className="pt-4 border-t border-stone-800 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-[8px] text-amber-500">P</span>
                  <span className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-[8px] text-amber-500">G</span>
                  <span className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-[8px] text-amber-500">S</span>
                </div>
                <p className="text-[10px] text-stone-500">Hơn 50+ thương hiệu cao cấp đã tin tưởng đồng hành cùng PGS Agency.</p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-6">
              <form ref={formRef} onSubmit={handleContactSubmit} className="p-6 md:p-8 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                
                <AnimatePresence mode="wait">
                  {contactSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto text-2xl">
                        ✓
                      </div>
                      <h3 className="font-serif font-bold text-xl">Đăng Ký Thành Công!</h3>
                      <p className="text-stone-400 text-xs leading-relaxed max-w-sm mx-auto">
                        Cảm ơn bạn đã lựa chọn PGS Agency. Chuyên gia tư vấn vận hành Instagram sẽ liên hệ lại với bạn qua số điện thoại để trao đổi trực tiếp trong vòng 24 giờ tới.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Tên của bạn / Tên thương hiệu *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nhập tên của bạn hoặc thương hiệu..."
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-200 text-xs md:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Số điện thoại liên hệ *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Nhập số điện thoại (Zalo)..."
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-200 text-xs md:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Dịch vụ quan tâm / Ghi chú</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Lĩnh vực kinh doanh hoặc gói dịch vụ chọn..."
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-200 text-xs md:text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Gửi yêu cầu & Nhận tư vấn ngay <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
