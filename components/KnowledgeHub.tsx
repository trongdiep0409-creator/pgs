'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus, Search, ArrowRight, BookOpen, Star, HelpCircle, Layers } from 'lucide-react';

interface KnowledgeHubProps {
  onOpenHandover: (id: number) => void;
}

export default function KnowledgeHub({ onOpenHandover }: KnowledgeHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>('seo');

  const clusters = {
    'seo': {
      title: 'SEO Tổng Thể Đột Phá',
      desc: 'Bao phủ hàng ngàn từ khóa ngách, thu hút traffic tự nhiên có tỷ lệ mua hàng cao nhất.',
      articles: [
        { title: 'Chiến lược Topic Cluster: Thống trị thứ hạng Google năm 2026', read: '5 phút đọc' },
        { title: 'Tối ưu hóa chỉ số E-E-A-T: Chìa khóa vàng nâng tầm trust website', read: '7 phút đọc' },
        { title: 'Phân tích từ khóa Ý Định Mua Cao (High-Intent Keywords) thực chiến', read: '6 phút đọc' }
      ]
    },
    'web': {
      title: 'Thiết Kế Website & CRO',
      desc: 'Thiết kế giao diện Light Premium, tối ưu trải nghiệm người dùng tăng tối đa tỷ lệ điền form.',
      articles: [
        { title: 'Tâm lý học hành vi người dùng trên Landing Page chuyển đổi', read: '4 phút đọc' },
        { title: 'Tối ưu hóa tốc độ tải trang Core Web Vitals dưới 2 giây', read: '6 phút đọc' },
        { title: 'Cấu trúc phễu thu thập lead tự động dành cho doanh nghiệp B2B', read: '8 phút đọc' }
      ]
    },
    'ads': {
      title: 'Performance Marketing',
      desc: 'Triển khai phễu quảng cáo đa kênh bám đuổi, kiểm soát chi phí thực tế trên từng lead.',
      articles: [
        { title: 'Tái cấu trúc nhóm mục tiêu (Targeting) thắt chặt ngân sách Ads', read: '6 phút đọc' },
        { title: 'Xây dựng phễu remarketing 3 tầng bám đuổi khép kín đa nền tảng', read: '5 phút đọc' },
        { title: 'Sự thật về Click ảo: Cách ngăn chặn click tặc Google Ads hiệu quả', read: '7 phút đọc' }
      ]
    }
  };

  const faqs = [
    {
      q: 'PGS Agency có cam kết số lượng lead thực tế không?',
      a: 'Có. Sau giai đoạn nghiên cứu (Discovery) và kiểm toán hệ thống (Audit), PGS sẽ cùng doanh nghiệp thống nhất bảng KPI cam kết rõ ràng về số lượng lead chất lượng cao định hướng chuyển đổi thực tế hàng tháng, được đo lường trực tiếp qua form đăng ký, cuộc gọi hotline hoặc click Zalo thật, tuyệt đối không báo cáo số ảo.'
    },
    {
      q: 'Chi phí triển khai dịch vụ tại PGS Agency tối thiểu là bao nhiêu?',
      a: 'Vì PGS Agency thiết kế giải pháp theo mô hình PGS Growth System đồng bộ (bao gồm Website CRO, SEO, Ads đa kênh và Hệ thống đo lường), chi phí sẽ được thiết kế may đo riêng biệt dựa trên quy mô doanh nghiệp và mức độ khốc liệt của thị trường ngách. Hãy đăng ký tham vấn nhanh để PGS phân tích ngân sách tối ưu nhất cho bạn.'
    },
    {
      q: 'Sau bao lâu thì doanh nghiệp bắt đầu thấy có kết quả tăng trưởng rõ rệt?',
      a: 'Với các kênh quảng cáo Performance (Google, Facebook, TikTok), khách hàng sẽ bắt đầu thấy lead nóng đổ về ngay từ tuần đầu tiên sau khi kích hoạt chiến dịch. Với kênh SEO tổng thể bền vững, dòng traffic tự nhiên chất lượng và lead hữu cơ sẽ bộc lộ tăng trưởng đột phá rõ rệt từ tháng thứ 3 đến tháng thứ 6.'
    },
    {
      q: 'PGS Agency quản lý và báo cáo ngân sách quảng cáo của khách hàng như thế nào?',
      a: 'PGS Agency cam kết sự minh bạch tối đa. Khách hàng sẽ sở hữu trực tiếp các tài khoản quảng cáo của mình hoặc được cấp quyền truy cập toàn phần vào hệ thống báo cáo thời gian thực (Real-time Dashboard). Mọi chi phí quảng cáo, giá thầu và chi phí trên từng lead (CPL) đều hiển thị rõ ràng, trực quan từng đồng, loại bỏ hoàn toàn việc mập mờ chi phí.'
    },
    {
      q: 'Doanh nghiệp cần chuẩn bị và phối hợp những gì khi triển khai hệ thống cùng PGS?',
      a: 'Doanh nghiệp cần phối hợp cung cấp tài liệu sản phẩm, thông điệp cốt lõi, cử nhân sự phụ trách (AM hoặc Marketing nội bộ) để trao đổi thông tin định kỳ, và đặc biệt là hệ thống Sales/Tư vấn của doanh nghiệp cần sẵn sàng tiếp nhận xử lý lead nóng từ phễu chuyển đổi để đảm bảo hiệu suất chốt đơn hàng tốt nhất.'
    },
    {
      q: 'Tại sao PGS đề xuất thiết kế lại Website hoặc xây dựng Landing Page mới?',
      a: 'Bởi vì Website và Landing Page chính là “Cửa hàng số” - nơi trực tiếp thuyết phục khách hàng đưa ra quyết định điền form liên hệ hoặc gọi điện mua hàng. Nếu chạy Ads tốn tiền kéo traffic vào một website cũ kỹ, tải trang chậm quá 5 giây và luồng UX/UI bị đứt gãy, khách hàng sẽ thoát ngay lập tức, gây lãng phí 95% ngân sách Ads.'
    }
  ];

  return (
    <section className="py-24 space-y-32 bg-[#FAF9F6] relative">
      
      {/* SECTION 15: KNOWLEDGE HUB (KNOWLEDGE MAP) */}
      <div id="knowledge" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(15)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ KNOWLEDGE HUB
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Knowledge Map
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Trung tâm chia sẻ tri thức tăng trưởng số của PGS
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Nơi phân tích sâu sắc các chiến lược thiết kế website CRO, tối ưu SEO on-page bền vững và bứt phá quảng cáo đa kênh từ các chuyên gia PGS.
          </p>
        </div>

        {/* Cluster Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Topic pills */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {Object.entries(clusters).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveCluster(key)}
                className={`text-left p-5 rounded-2xl border transition-all h-[110px] flex flex-col justify-between cursor-pointer ${
                  activeCluster === key
                    ? 'bg-white border-gold-400 shadow-md ring-1 ring-gold-200'
                    : 'bg-white/40 border-gold-200/40 hover:bg-white hover:border-gold-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-wider">Cluster Hub</span>
                  <h3 className="text-xs font-bold text-brand-dark font-display leading-tight mt-1">
                    {value.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between w-full text-[11px] font-mono text-brand-muted">
                  <span>3 bài viết trụ cột</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                </div>
              </button>
            ))}
          </div>

          {/* Right Pillar Articles List */}
          <div className="lg:col-span-8 bg-white border border-gold-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-50 rounded-full blur-3xl -z-10" />

            <div className="space-y-6">
              <div className="border-b border-gold-100 pb-4">
                <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">Active Hub Cluster</span>
                <h3 className="text-lg font-bold text-brand-dark font-display mt-1">
                  {clusters[activeCluster as keyof typeof clusters].title}
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {clusters[activeCluster as keyof typeof clusters].desc}
                </p>
              </div>

              {/* Articles rows */}
              <div className="space-y-4">
                {clusters[activeCluster as keyof typeof clusters].articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="group/art p-4 bg-[#FAF9F6] rounded-xl border border-gold-200/30 hover:border-gold-400/50 hover:bg-white hover:shadow-xs transition-all flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold-50 rounded-lg text-gold-600 group-hover/art:bg-gold-100 transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-brand-dark group-hover/art:text-gold-600 transition-colors">
                          {art.title}
                        </h4>
                        <span className="text-[10px] text-brand-muted font-mono mt-0.5 block">{art.read}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover/art:translate-x-1 group-hover/art:text-gold-500 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-[11px] text-brand-muted">Cập nhật xu hướng tiếp thị số liên tục</span>
              <a href="#contact" className="text-xs font-bold text-gold-600 hover:text-gold-700 flex items-center gap-1">
                Xem toàn bộ bài phân tích <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 16: FAQ (ACCORDION) */}
      <div id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(16)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ ACCORDION FAQ
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Câu hỏi thường gặp về PGS Growth System
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Hóa giải những băn khoăn và thắc mắc cuối cùng giúp bạn hoàn toàn an tâm khi bắt đầu hợp tác lâu dài cùng PGS.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gold-200/50 rounded-xl overflow-hidden transition-shadow hover:shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-brand-dark font-display">
                  {faq.q}
                </span>
                <span className="p-1 rounded-full bg-gold-50 text-gold-600 shrink-0 transition-transform">
                  {activeFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-5 pt-0 border-t border-gold-100 text-xs text-brand-muted leading-relaxed">
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
}
