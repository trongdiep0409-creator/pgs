'use client';

import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2, Star, ArrowRight, Award, Layout, Search, TrendingUp, Sparkles, BookOpen, MessageSquare, Play } from 'lucide-react';

interface ServicesProps {
  onOpenHandover: (id: number) => void;
}

export default function Services({ onOpenHandover }: ServicesProps) {

  const comparisonRows = [
    {
      title: 'Tiếp cận chiến lược',
      traditional: 'Chắp vá, thiếu đồng bộ. Thuê nhiều bên làm website, SEO, Ads riêng rẽ dẫn đến chồng chéo, xung đột.',
      pgs: 'Xây dựng hệ thống PGS Growth System 5 lớp đồng bộ, Website tối ưu phễu, Ads kéo traffic nóng, SEO giữ chân tệp khách bền bỉ.'
    },
    {
      title: 'Mục tiêu cam kết',
      traditional: 'Báo cáo số ảo (Click, Reach, Impression) nhưng không tạo ra khách hàng, tỷ lệ chuyển đổi đơn hàng gần như bằng không.',
      pgs: 'Tập trung tuyệt đối vào Lead chất lượng cao, tối ưu tỷ lệ chuyển đổi (CRO) và kiểm soát chi phí thực tế trên từng lead.'
    },
    {
      title: 'Hệ thống đo lường',
      traditional: 'Không cài đặt tracking hoặc cài đặt sơ sài, tối ưu ngân sách theo cảm tính cá nhân, không rõ lead đến từ đâu.',
      pgs: 'Thiết lập hạ tầng đo lường cao cấp (GA4, GTM, Conversion API), minh bạch hóa 100% điểm chạm số của khách hàng.'
    },
    {
      title: 'Trách nhiệm đồng hành',
      traditional: 'Làm việc theo kiểu khoán việc, hết giờ hành chính là ngắt kết nối, không chủ động đưa ra giải pháp cải tiến tối ưu.',
      pgs: 'Là đối tác chiến lược đồng hành dài hạn. Sẵn sàng họp kiểm toán, tối ưu liên tục và đề xuất cải tiến chiến lược hàng tuần.'
    },
    {
      title: 'Hiệu quả chi phí',
      traditional: 'Lãng phí ngân sách quảng cáo vì spam từ khóa rộng, thu hút tệp click tò mò hoặc lead ảo do bot.',
      pgs: 'Tối ưu hóa phễu, chỉ target từ khóa có ý định mua hàng cao (high-intent), giảm chi phí mỗi lead (CPL) thực tế.'
    }
  ];

  const coreServices = [
    {
      title: 'SEO Tổng Thể Đa Kênh',
      icon: Search,
      target: 'Doanh nghiệp muốn xây dựng dòng traffic tự nhiên bền vững, không phụ thuộc hoàn toàn vào quảng cáo trả phí.',
      problem: 'Website không có thứ hạng, traffic lẹt đẹt, viết bài không chuẩn SEO hoặc SEO lên top nhưng không có chuyển đổi.',
      expectation: 'Bao phủ hàng ngàn từ khóa ngách định hướng chuyển đổi, đạt vị trí Top 1-5 tìm kiếm, tăng x3 traffic sau 6 tháng.',
      bgGlow: 'from-gold-100/10'
    },
    {
      title: 'Thiết Kế Website Chuẩn CRO',
      icon: Layout,
      target: 'Doanh nghiệp cần website chuyên nghiệp, nâng tầm vị thế thương hiệu và hoạt động như một cỗ máy tạo lead tự động.',
      problem: 'Website cũ kỹ, giao diện lỗi thời, không tối ưu di động, tốc độ tải trang quá 5 giây khiến khách thoát sạch.',
      expectation: 'Sở hữu website phong cách Light Premium độc quyền, tối ưu tốc độ <2 giây, tỷ lệ chuyển đổi form tăng 200%.',
      bgGlow: 'from-amber-100/10'
    },
    {
      title: 'Quảng Cáo Google Ads',
      icon: TrendingUp,
      target: 'Doanh nghiệp muốn tiếp cận ngay lập tức tệp khách hàng đang chủ động tìm kiếm giải pháp/sản phẩm.',
      problem: 'Tự chạy Ads bị đối thủ click tặc, CPL quá cao, không biết tối ưu điểm chất lượng trang đích để giảm giá thầu.',
      expectation: 'Kiểm toán tài khoản, tối ưu điểm chất lượng trang đích, setup phễu remarketing bám đuổi khép kín, giảm 30% chi phí Ads.',
      bgGlow: 'from-yellow-100/10'
    },
    {
      title: 'Thiết Kế Landing Page',
      icon: Sparkles,
      target: 'Doanh nghiệp chuẩn bị tung chiến dịch quảng cáo, cần trang đích tập trung cao độ vào một sản phẩm/dịch vụ cụ thể.',
      problem: 'Dùng Landing Page mẫu đại trà, nội dung thiếu thuyết phục, bố cục lộn xộn khiến tỷ lệ thoát trang đạt 95%.',
      expectation: 'Sở hữu Landing Page thiết kế Light Premium độc bản, tích hợp sẵn hệ thống tracking chuyển đổi và form thông minh.',
      bgGlow: 'from-gold-100/10'
    },
    {
      title: 'Content Marketing Website',
      icon: BookOpen,
      target: 'Doanh nghiệp muốn thiết lập vị thế chuyên gia đầu ngành thông qua hệ thống nội dung phân tích học thuật sâu sắc.',
      problem: 'Thiếu nhân sự viết bài chất lượng, nội dung xào nấu sơ sài từ mạng, không có cấu trúc Topic Cluster dẫn dắt bot Google.',
      expectation: 'Sản xuất bài viết chuẩn mực, củng cố triệt để chỉ số EEAT của Google, tăng tính thuyết phục của website đối với khách hàng.',
      bgGlow: 'from-amber-100/10'
    },
    {
      title: 'Vận Hành Kênh Social & TikTok',
      icon: MessageSquare,
      target: 'Doanh nghiệp cần xây dựng sự hiện diện thương hiệu sôi nổi trên mạng xã hội, tiếp cận tệp khách hàng trẻ trung, năng động.',
      problem: 'Kênh Social bỏ hoang, không có ý tưởng kịch bản video ngắn, không biết cách kéo tương tác tự nhiên.',
      expectation: 'Sở hữu tuyến bài định vị sắc sảo, kịch bản video ngắn bắt trend sáng tạo, tăng trưởng lượt theo dõi và tương tác tự nhiên.',
      bgGlow: 'from-yellow-100/10'
    }
  ];

  return (
    <section id="services" className="py-24 space-y-32 bg-white/60 relative">
      
      {/* SECTION 8: VÌ SAO PGS KHÁC BIỆT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(8)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ SỰ KHÁC BIỆT
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Đối Chiếu Thực Tế
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Vì sao 90% doanh nghiệp chọn PGS Growth System thay vì thuê ngoài rời rạc?
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Sự khác biệt căn bản nằm ở tư duy xây dựng hệ thống tài sản số bền vững, minh bạch hóa dữ liệu thay vì các chiến dịch chắp vá.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gold-200/60 shadow-xs bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gold-200/60">
                <th className="p-5 text-xs font-mono font-bold text-brand-dark uppercase tracking-wider w-[20%]">
                  Tiêu chí so sánh
                </th>
                <th className="p-5 text-xs font-mono font-bold text-brand-muted uppercase tracking-wider w-[40%]">
                  Dịch vụ thuê ngoài rời rạc
                </th>
                <th className="p-5 text-xs font-mono font-bold text-gold-600 uppercase tracking-wider w-[40%] bg-gold-50/30">
                  ⚡️ PGS Growth System
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-gold-50/20 transition-colors">
                  <td className="p-5 text-xs font-bold text-brand-dark font-display">
                    {row.title}
                  </td>
                  <td className="p-5 text-xs text-brand-muted leading-relaxed">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="p-5 text-xs text-brand-dark font-medium leading-relaxed bg-gold-50/10">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{row.pgs}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 9: DỊCH VỤ NỔI BẬT (6 CARD BENTO) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(9)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ DỊCH VỤ MŨI NHỌN
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Hệ sinh thái dịch vụ
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            6 Giải pháp tiếp thị mũi nhọn tối ưu tăng trưởng
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Được thiết kế tinh xảo, thực thi bởi các chuyên gia giàu kinh nghiệm thực chiến đa kênh của PGS Agency.
          </p>
        </div>

        {/* 6 Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative bg-white border border-gold-200/40 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-gold-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                {/* Decorative background glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.bgGlow} to-transparent rounded-full blur-2xl -z-10`} />

                <div className="space-y-6">
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-gold-50 rounded-xl text-gold-600 group-hover:bg-gold-100 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-100/30 px-2 py-0.5 rounded-full">
                      Service 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-dark font-display group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Core Content */}
                  <div className="space-y-4 pt-2 border-t border-gold-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-muted block uppercase">Phù hợp với ai:</span>
                      <p className="text-xs text-brand-dark font-medium leading-relaxed mt-1">
                        {service.target}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-muted block uppercase">Giải quyết vấn đề:</span>
                      <p className="text-xs text-brand-muted leading-relaxed mt-1">
                        {service.problem}
                      </p>
                    </div>

                    <div className="p-3 bg-gold-50/50 rounded-lg border border-gold-200/30">
                      <span className="text-[10px] font-mono font-bold text-gold-600 block uppercase">Kết quả kỳ vọng:</span>
                      <p className="text-xs text-brand-dark font-semibold leading-relaxed mt-1">
                        {service.expectation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-8 pt-4 border-t border-gold-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-muted">Đồng hành trọn gói</span>
                  <a
                    href="#contact"
                    className="text-xs font-bold text-gold-600 group-hover:text-gold-700 flex items-center gap-1.5 transition-colors"
                  >
                    Đăng ký tư vấn ngay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
