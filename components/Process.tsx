'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, TrendingUp, Compass, Search, Terminal, Database, PlayCircle, Eye, Users, FileText } from 'lucide-react';

interface ProcessProps {
  onOpenHandover: (id: number) => void;
}

export default function Process({ onOpenHandover }: ProcessProps) {
  const [activeCaseStudy, setActiveCaseStudy] = useState<number>(1);

  const processSteps = [
    {
      step: '01',
      name: 'Discovery',
      sub: 'Nghiên cứu & Định vị',
      desc: 'PGS nghiên cứu sâu sắc đối thủ cạnh tranh, phân tích hành vi khách hàng mục tiêu và tìm ra Điểm Định Vị Độc Bản (USP) của doanh nghiệp.'
    },
    {
      step: '02',
      name: 'Audit',
      sub: 'Kiểm toán hệ thống',
      desc: 'Đánh giá toàn diện website hiện tại, tài khoản quảng cáo, hệ thống SEO và đo lường dữ liệu để tìm ra các điểm đứt gãy gây lãng phí ngân sách.'
    },
    {
      step: '03',
      name: 'Strategy',
      sub: 'Bản đồ tăng trưởng',
      desc: 'Thiết lập bản kế hoạch hành động tổng thể, phân bổ ngân sách tối ưu cho từng kênh và xác định rõ ràng các chỉ số KPI cam kết thực tế.'
    },
    {
      step: '04',
      name: 'Build',
      sub: 'Thiết lập hạ tầng',
      desc: 'Thiết kế website/Landing Page tối ưu hóa tỷ lệ chuyển đổi (CRO), cài đặt trọn gói hệ thống đo lường cao cấp (GA4, GTM, Conversion API).'
    },
    {
      step: '05',
      name: 'Launch',
      sub: 'Triển khai đa kênh',
      desc: 'Bắt đầu chạy quảng cáo Performance (Google, Facebook, TikTok), tối ưu SEO tổng thể và kích hoạt bộ máy Content sáng tạo thu hút lead tự nhiên.'
    },
    {
      step: '06',
      name: 'Measure',
      sub: 'Đo lường & Báo cáo',
      desc: 'Minh bạch hóa 100% dữ liệu. Gửi báo cáo định kỳ theo tuần/tháng thể hiện rõ chi phí đầu tư và số lượng lead thực tế tạo ra.'
    },
    {
      step: '07',
      name: 'Optimize & Scale',
      sub: 'Tối ưu & Mở rộng',
      desc: 'Liên tục audit mẫu quảng cáo, tối ưu trang đích và nhân bản các chiến dịch có ROI cao để mở rộng quy mô tăng trưởng vượt trội cho doanh nghiệp.'
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'Tăng Trưởng Tốc Lực Cho Chuỗi Nha Khoa Thẩm Mỹ Quốc Tế',
      industry: 'Y tế & Chăm sóc sức khỏe',
      metric1: '+185%',
      label1: 'Tăng trưởng Lead nóng',
      metric2: '-42%',
      label2: 'Giảm chi phí CPL',
      context: 'Chuỗi nha khoa thẩm mỹ cao cấp sở hữu website đẹp mắt nhưng không thu hút được lead đăng ký tư vấn. Chi phí quảng cáo tự vận hành quá đắt đỏ và thu về nhiều lead rác.',
      challenge: 'Giao diện trang đích cũ thiếu các điểm thuyết phục khách hàng, không đo lường được chi tiết nguồn quảng cáo nào mang lại lead chất lượng để phân bổ ngân sách tối ưu.',
      solution: 'PGS tái thiết kế lại toàn bộ Landing Page CRO, target chính xác tập khách hàng ngách có thu nhập cao, cài đặt đo lường phễu GA4 và tích hợp phễu remarketing 3 tầng bám đuổi thông minh.',
      results: 'Tỷ lệ chuyển đổi trang đích tăng từ 1.2% lên 4.8%. Thu về hơn 1,200 lead chất lượng cao đăng ký làm răng sứ trong 3 tháng, tối ưu giảm 42% chi phí trên mỗi lượt lead thực tế.'
    },
    {
      id: 2,
      title: 'Chiến Lược Thống Trị SEO Cho Thương Hiệu Nội Thất Xuất Khẩu',
      industry: 'Sản xuất & Nội thất B2B/B2C',
      metric1: '300%',
      label1: 'Organic Traffic tăng',
      metric2: 'Top 1-3',
      label2: 'Từ khóa lớn ngành',
      context: 'Thương hiệu nội thất gỗ xuất khẩu cao cấp phụ thuộc 100% vào quảng cáo trả phí (Ads). Website không có thứ hạng trên Google, lượng traffic tự nhiên gần như bằng không.',
      challenge: 'Ngành hàng nội thất có độ cạnh tranh SEO cực kỳ khốc liệt từ các ông lớn. Khách hàng B2B thường tìm kiếm thông tin rất kỹ trước khi liên hệ hợp tác xuất khẩu.',
      solution: 'PGS triển khai chiến lược Conversion SEO tập trung vào bộ từ khóa ngách định hướng mua hàng, thiết lập cấu trúc Topic Cluster chuyên sâu chuẩn E-E-A-T và đăng tải bài viết PR trên các trang báo uy tín.',
      results: 'Đưa hơn 450 từ khóa chiến lược phủ sóng Top 1-3 Google chỉ sau 5 tháng. Lượng truy cập tự nhiên tăng vọt 300%, tạo ra dòng lead B2B chất lượng cao tự tìm đến đề xuất hợp tác xuất khẩu.'
    },
    {
      id: 3,
      title: 'Chiến Dịch Tăng Trưởng Số Cho Hệ Thống Giáo Dục Quốc Tế',
      industry: 'Giáo dục & Đào tạo',
      metric1: '95%',
      label1: 'Chỉ tiêu tuyển sinh đạt',
      metric2: 'Trước 2 tháng',
      label2: 'Hoàn thành sớm hạn',
      context: 'Hệ thống trường liên cấp quốc tế cần lấp đầy chỉ tiêu tuyển sinh cho năm học mới nhưng các kênh marketing cũ đã bão hòa, thương hiệu mờ nhạt giữa hàng loạt đối thủ cạnh tranh.',
      challenge: 'Khách hàng phân khúc giáo dục (phụ huynh học sinh) có hành trình cân nhắc cực kỳ dài và kỹ lưỡng, yêu cầu niềm tin thương hiệu vững chắc.',
      solution: 'PGS xây dựng chuỗi nội dung video ngắn định vị chuyên môn sắc sảo trên Facebook/TikTok, phối hợp với phễu Google Ads bám đuổi bền bỉ và Landing Page tổ chức Hội thảo tuyển sinh chuyên nghiệp.',
      results: 'Thu hút hơn 800 phụ huynh đăng ký tham gia hội thảo trực tiếp. Hoàn thành sớm 95% chỉ tiêu tuyển sinh toàn hệ thống trước thời hạn kết thúc tuyển sinh 2 tháng.'
    }
  ];

  return (
    <section className="py-24 space-y-32 bg-[#FAF9F6] relative">
      
      {/* SECTION 10: QUY TRÌNH TRIỂN KHAI (PIPELINE) */}
      <div id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(10)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ PIPELINE QUY TRÌNH
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Lộ Trình Triển Khai
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Quy trình 7 bước đưa doanh nghiệp bứt phá doanh thu số
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Mỗi giai đoạn đều được thực thi chặt chẽ, kiểm soát chất lượng kỹ lưỡng bởi đội ngũ Account và chuyên gia kỹ thuật chuyên sâu của PGS.
          </p>
        </div>

        {/* Pipeline horizontal/vertical scroll timeline */}
        <div className="relative border-l-2 md:border-l-0 md:border-t-2 border-gold-200/50 pl-6 md:pl-0 md:pt-8 grid grid-cols-1 md:grid-cols-7 gap-10 md:gap-4">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Node indicator */}
              <div className="absolute -left-[31px] md:left-1/2 md:-translate-x-1/2 -top-[2px] md:-top-[41px] w-[10px] h-[10px] rounded-full bg-gold-500 ring-4 ring-gold-100 group-hover:bg-brand-dark group-hover:ring-gold-200 transition-all duration-300" />
              
              <div className="space-y-3 md:text-center">
                <span className="text-3xl sm:text-4xl font-display font-black text-gold-500/30 group-hover:text-gold-500 transition-colors">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark font-display leading-none">
                    {step.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-wider block mt-1.5">
                    {step.sub}
                  </span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed md:max-w-[150px] md:mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 11: CASE STUDY 3D GALLERY */}
      <div id="cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(11)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ CASE STUDIES
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Chứng Minh Kết Quả Thực
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Case Studies thành công đồng hành cùng PGS Agency
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Khám phá những dự án bứt phá tăng trưởng số ngoạn mục, biến chi phí marketing thành dòng lợi nhuận ròng thực tế cho doanh nghiệp.
          </p>
        </div>

        {/* Dynamic Case Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Project Selector Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {caseStudies.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseStudy(cs.id)}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between h-[110px] cursor-pointer ${
                  activeCaseStudy === cs.id
                    ? 'bg-white border-gold-400 shadow-md ring-1 ring-gold-200'
                    : 'bg-white/40 border-gold-200/40 hover:bg-white hover:border-gold-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-wider">{cs.industry}</span>
                  <h3 className="text-xs font-bold text-brand-dark font-display leading-tight line-clamp-2 mt-1">
                    {cs.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between w-full text-[11px] font-mono font-bold text-brand-dark">
                  <span>Kết quả: {cs.metric1}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeCaseStudy === cs.id ? 'text-gold-500' : 'text-brand-muted'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right: Active Project Showcase (Responsive mock template) */}
          <div className="lg:col-span-8 bg-white border border-gold-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-50 rounded-full blur-3xl -z-10" />

            {caseStudies.map((cs) => {
              if (cs.id !== activeCaseStudy) return null;
              return (
                <div key={cs.id} className="space-y-8 animate-in fade-in-50 duration-300">
                  
                  {/* Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-100 pb-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">{cs.industry}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark font-display mt-1 leading-tight">
                        {cs.title}
                      </h3>
                    </div>
                    {/* Big Metrics */}
                    <div className="flex gap-4 shrink-0">
                      <div className="text-center">
                        <span className="text-2xl font-display font-black text-gold-500 block leading-none">{cs.metric1}</span>
                        <span className="text-[10px] text-brand-muted mt-1 block">{cs.label1}</span>
                      </div>
                      <div className="border-l border-gold-200 h-10 self-center" />
                      <div className="text-center">
                        <span className="text-2xl font-display font-black text-brand-dark block leading-none">{cs.metric2}</span>
                        <span className="text-[10px] text-brand-muted mt-1 block">{cs.label2}</span>
                      </div>
                    </div>
                  </div>

                  {/* Context Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-xs text-brand-muted leading-relaxed">
                    <div className="space-y-4">
                      <div>
                        <strong className="text-brand-dark block mb-1">Bối cảnh & Vấn đề:</strong>
                        <p>{cs.context}</p>
                      </div>
                      <div>
                        <strong className="text-brand-dark block mb-1">Thử thách cốt lõi:</strong>
                        <p>{cs.challenge}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <strong className="text-gold-600 block mb-1">Giải pháp từ PGS:</strong>
                        <p className="font-medium text-brand-dark">{cs.solution}</p>
                      </div>
                      <div className="p-4 bg-gold-50 rounded-xl border border-gold-200/40 text-brand-dark">
                        <strong className="block mb-1 font-display font-bold">Kết quả thực tế vượt mong đợi:</strong>
                        <p className="text-xs text-brand-muted">{cs.results}</p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

            <div className="mt-8 pt-6 border-t border-gold-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-[11px] text-brand-muted font-mono">Dữ liệu kết quả thực nghiệm chuẩn xác</span>
              <a
                href="#contact"
                className="px-6 py-3 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-xl text-xs font-semibold text-center transition-colors shadow-xs"
              >
                Nhận tư vấn chiến dịch tương tự
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
