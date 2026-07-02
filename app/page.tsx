'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import GrowthSystem from '@/components/GrowthSystem';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Team from '@/components/Team';
import KnowledgeHub from '@/components/KnowledgeHub';
import HandoverDrawer, { HANDOVER_SECTIONS_DATA } from '@/components/HandoverDrawer';
import { Layers, CheckCircle, Code, Paintbrush, BookOpen, FileCode, Search, Award, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const [activeHandoverSection, setActiveHandoverSection] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'prototype' | 'spec'>('prototype');

  const openHandover = (sectionId: number) => {
    setActiveHandoverSection(sectionId);
    setDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      
      {/* RENDER MOCKUP PORTFOLIO INTERACTIVE WEB */}
      {viewMode === 'prototype' ? (
        <div className="animate-in fade-in-50 duration-500">
          
          
          <main>
            {/* H1 hidden for SEO compliance on main container */}
            <h1 className="sr-only">Xây dựng hệ thống Marketing tổng thể giúp doanh nghiệp tăng lead, tối ưu chi phí và tăng trưởng doanh thu bền vững</h1>

            <Hero onOpenHandover={openHandover} />
            <GrowthSystem onOpenHandover={openHandover} />
            <Services onOpenHandover={openHandover} />
            <Process onOpenHandover={openHandover} />
            <Team onOpenHandover={openHandover} />
            <KnowledgeHub onOpenHandover={openHandover} />
          </main>

          
        </div>
      ) : (
        /* RENDER SYSTEM SPEC DASHBOARD */
        <div className="animate-in fade-in-50 duration-500 bg-[#FAF9F6] min-h-screen pb-32">
          
          {/* Header Dashboard Spec */}
          <div className="bg-brand-dark text-white border-b border-gold-400/30 py-12 px-6 sm:px-12 text-center space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gold-400 bg-gold-900/50 px-3 py-1.5 rounded-full uppercase">
              Bảng Điều Phối Bản Thiết Kế Dự Án • PGS Growth System
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gold-500">
              TÀI LIỆU BÀN GIAO CHI TIẾT TRANG CHỦ WEBSITE PGS AGENCY
            </h2>
            <p className="text-sm text-brand-light/70 max-w-3xl mx-auto leading-relaxed">
              Tài liệu được thiết kế, tối ưu bởi Senior UX/UI Designer, SEO Specialist, EEAT Consultant và CRO Specialist dành riêng cho đội phát triển và sáng tạo nội dung PGS Agency.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white border border-gold-200 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono text-brand-muted uppercase">Meta Title trang chủ</span>
                <p className="text-xs font-bold text-brand-dark mt-1 line-clamp-2">
                  PGS Agency - Hệ Thống Marketing Tổng Thể Tăng Trưởng Doanh Thu Bền Vững
                </p>
              </div>
              <div className="bg-white border border-gold-200 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono text-brand-muted uppercase">Meta Description</span>
                <p className="text-xs text-brand-muted mt-1 line-clamp-2">
                  PGS Agency xây dựng hệ thống Marketing tổng thể kết hợp Website, SEO, Google Ads, Facebook Ads, TikTok Ads, Content, Social Media giúp doanh nghiệp tăng lead, tối ưu chi phí.
                </p>
              </div>
              <div className="bg-white border border-gold-200 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono text-brand-muted uppercase">Từ khóa chính tối ưu</span>
                <p className="text-xs font-bold text-gold-600 mt-1">
                  PGS Agency, agency marketing tổng thể, hệ thống tăng trưởng số, thiết kế website CRO, SEO bền vững.
                </p>
              </div>
              <div className="bg-white border border-gold-200 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono text-brand-muted uppercase">Định vị thương hiệu</span>
                <p className="text-xs font-bold text-brand-dark mt-1">
                  Xây dựng hệ thống Marketing giúp tăng lead, tối ưu chi phí, tăng trưởng doanh thu bền vững.
                </p>
              </div>
            </div>

            {/* List 18 sections for fast spec review */}
            <h3 className="text-lg font-bold text-brand-dark font-display mb-6 flex items-center gap-2 border-b border-gold-200 pb-2">
              <Layers className="w-5 h-5 text-gold-500" />
              Xem nhanh Đặc tả cho 18 Section chính
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {Object.entries(HANDOVER_SECTIONS_DATA).map(([id, data]) => (
                <div
                  key={id}
                  onClick={() => openHandover(Number(id))}
                  className="bg-white border border-gold-200 hover:border-gold-400 p-5 rounded-xl cursor-pointer shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-brand-dark group-hover:text-gold-600 transition-colors">
                      {data.sectionName}
                    </h4>
                    <p className="text-[10px] text-brand-muted line-clamp-1 mt-1">{data.goal}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>

            {/* Total Handover checklists combined */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 pt-8 border-t border-gold-200/50">
              
              {/* Designer Board */}
              <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-pink-100 pb-4">
                  <div className="p-2.5 bg-pink-50 rounded-xl text-pink-600">
                    <Paintbrush className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-pink-600 uppercase">Tổng hợp</span>
                    <h4 className="font-display font-bold text-brand-dark text-sm">DESIGNER CHECKLIST</h4>
                  </div>
                </div>
                <ul className="space-y-3.5 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>Áp dụng chuẩn phong cách <strong className="text-brand-dark">Light Premium Consulting</strong>: trắng sữa, vàng gold mạ chrome cao cấp.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>Duy trì tối đa khoảng trắng (White space), tạo nhịp điệu thị giác thông thoáng, giúp thông tin dễ scan nhanh.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>Thiết kế 3D Orbit Ecosystem, Stacked Pyramid 5 lớp, Problem Wall lật 3D phải có độ sâu perspective tốt.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>Đảm bảo tất cả các nút kêu gọi hành động (CTA) chính dùng nền vàng gold, chữ đen than có shadow mềm.</span>
                  </li>
                </ul>
              </div>

              {/* Developer Board */}
              <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-blue-100 pb-4">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-blue-600 uppercase">Tổng hợp</span>
                    <h4 className="font-display font-bold text-brand-dark text-sm">DEVELOPER CHECKLIST</h4>
                  </div>
                </div>
                <ul className="space-y-3.5 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Tận dụng <strong className="text-brand-dark">motion/react</strong> để tạo mượt mà hiệu ứng cuộn trang scroll-bound pipeline và lật card 3D.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Bảo toàn 100% thuộc tính Accessibility (A11y), các liên kết là thẻ {"<a>"} thật thân thiện tuyệt đối với Googlebot.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Responsive hoàn hảo cho cả thiết bị di động, chuyển đổi Orbit 3D xoay vòng thành danh sách Grid phẳng dễ bấm.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Kiểm soát triệt để tốc độ tải trang dưới 2 giây trên desktop, tối ưu hóa kích thước ảnh bằng Next.js Image.</span>
                  </li>
                </ul>
              </div>

              {/* Content SEO Board */}
              <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase">Tổng hợp</span>
                    <h4 className="font-display font-bold text-brand-dark text-sm">CONTENT SEO CHECKLIST</h4>
                  </div>
                </div>
                <ul className="space-y-3.5 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Phân bổ từ khóa chính xác trong thẻ heading <strong className="text-brand-dark">H1, H2, H3</strong>, giữ mật độ từ khóa tự nhiên.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Củng cố tối đa chỉ số <strong className="text-brand-dark">EEAT</strong> bằng cách đưa thông tin tác giả, chuyên gia và case study có số liệu cụ thể.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Xây dựng mạng lưới Topic Cluster liên kết chặt chẽ trong nội dung của Knowledge Hub dẫn dắt bot Google.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Sử dụng văn phong tư vấn khách quan, chuyên nghiệp, thể hiện chiều sâu chuyên môn cao, tăng tỷ lệ CTR và giữ chân.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Proposed Schema Markup Board */}
            <div className="bg-white border border-gold-300 rounded-3xl p-6 sm:p-10 shadow-md space-y-6">
              <div className="flex items-center gap-2 border-b border-gold-200 pb-4">
                <div className="p-2.5 bg-gold-50 rounded-xl text-gold-600">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-gold-600 uppercase">Cấu trúc dữ liệu SEO</span>
                  <h4 className="font-display font-bold text-brand-dark text-base">ĐỀ XUẤT CODE SCHEMA MARKUP (Khai báo thực tế)</h4>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-brand-muted leading-relaxed">
                  Để tăng cường tối đa khả năng tối ưu hóa tìm kiếm tự nhiên và AI Search (Gemini, Perplexity, OpenAI Search), lập trình viên cần tích hợp trực tiếp đoạn mã cấu trúc dữ liệu Schema sau vào mã nguồn trang chủ:
                </p>

                {/* Simulated copyable code block */}
                <pre className="bg-brand-dark text-gold-300 p-5 rounded-2xl text-[10px] font-mono overflow-x-auto leading-relaxed max-h-[350px]">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pgsagency.vn/#organization",
      "name": "PGS Agency",
      "url": "https://pgsagency.vn/",
      "logo": "https://pgsagency.vn/logo.png",
      "sameAs": [
        "https://www.facebook.com/pgsagency",
        "https://www.linkedin.com/company/pgsagency"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84-901234567",
        "contactType": "sales",
        "areaServed": "VN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://pgsagency.vn/#website",
      "url": "https://pgsagency.vn/",
      "name": "PGS Agency - Hệ Thống Marketing Tổng Thể Tăng Trưởng",
      "publisher": { "@id": "https://pgsagency.vn/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://pgsagency.vn/#localbusiness",
      "name": "PGS Agency",
      "image": "https://pgsagency.vn/cover.jpg",
      "telephone": "+84-901234567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tầng 12, Tòa nhà Sông Đà, Phạm Hùng",
        "addressLocality": "Mỹ Đình, Nam Từ Liêm",
        "addressRegion": "Hà Nội",
        "addressCountry": "VN"
      }
    }
  ]
}`}
                </pre>
              </div>
            </div>

            {/* Internal Links spec */}
            <div className="mt-12 bg-gold-50/50 border border-gold-200/60 rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
              <h4 className="font-display font-bold text-brand-dark text-sm flex items-center gap-2">
                <Search className="w-4 h-4 text-gold-500" />
                MẠNG LƯỚI LIÊN KẾT NỘI BỘ (INTERNAL LINKS MAP)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-brand-muted leading-relaxed">
                <div>
                  <strong className="text-brand-dark block mb-1">Internal Link ĐI (Outbound from Home):</strong>
                  <p>Từ trang chủ, phân phối dòng sức mạnh PageRank thông qua các nút CTA và menu điều hướng đến các trang dịch vụ ngách: <code>/seo-tong-the</code>, <code>/thiet-ke-website</code>, <code>/quang-cao-google-ads</code>, <code>/thiet-ke-landing-page</code>, <code>/case-studies</code>.</p>
                </div>
                <div>
                  <strong className="text-brand-dark block mb-1">Internal Link NHẬN (Inbound to Home):</strong>
                  <p>Từ tất cả các bài viết tri thức (Knowledge Hub) và trang dịch vụ chi tiết, luôn có link mỏ neo (Anchor Text) chứa từ khóa thương hiệu <code>PGS Agency</code> hoặc <code>Marketing tổng thể</code> trỏ ngược về trang chủ <code>/</code> để củng cố uy quyền của tên miền gốc.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DETAIL HANDOVER SPEC DRAWER */}
      <HandoverDrawer
        sectionId={activeHandoverSection}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

    </div>
  );
}
