'use client';

import React, { useState } from 'react';
import { Clipboard, CheckCircle, Code, FileText, Layout, Search, Layers } from 'lucide-react';

export default function TechDeliverables() {
  const [activeTab, setActiveTab] = useState<'all' | 'designer' | 'developer' | 'seo'>('all');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const schemaCode = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://pgsagency.vn/dich-vu/dich-vu-van-hanh-instagram/#service",
      "name": "Dịch vụ Vận hành Instagram Chuyên nghiệp",
      "serviceType": "Social Media Management",
      "provider": {
        "@type": "ProfessionalService",
        "name": "PGS Agency",
        "url": "https://pgsagency.vn",
        "logo": "https://pgsagency.vn/assets/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hồ Chí Minh",
          "addressCountry": "VN"
        }
      },
      "description": "Dịch vụ vận hành Instagram toàn diện từ PGS Agency giúp thương hiệu thiết kế hệ thống hình ảnh đồng bộ, tối ưu Reels, bio, hashtag và tăng trưởng chuyển đổi số bền vững.",
      "areaServed": "VN",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "VND",
        "lowPrice": "5000000",
        "highPrice": "20000000",
        "offerCount": "3"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pgsagency.vn/dich-vu/dich-vu-van-hanh-instagram/#breadcrumb",
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
          "name": "Dịch vụ",
          "item": "https://pgsagency.vn/dich-vu/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Vận hành Instagram",
          "item": "https://pgsagency.vn/dich-vu/dich-vu-van-hanh-instagram/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://pgsagency.vn/dich-vu/dich-vu-van-hanh-instagram/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "PGS Agency có bao gồm thiết kế hình ảnh và dựng video Reels trong gói vận hành không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có. Tất cả các gói dịch vụ vận hành Instagram của chúng tôi đều bao gồm việc thiết kế hình ảnh theo visual guideline chuẩn và sản xuất video Reels (từ kịch bản, dựng video đến chọn âm thanh xu hướng)."
          }
        },
        {
          "@type": "Question",
          "name": "Dịch vụ có cam kết số lượng người theo dõi (Followers) tăng lên không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chúng tôi tập trung vào việc tăng trưởng lượng người theo dõi tự nhiên chất lượng (Organic Followers) - những khách hàng tiềm năng thực sự của bạn, thông qua chiến lược Reels viral và tối ưu hóa SEO Instagram, chứ không dùng các thủ thuật hack/buff follow ảo gây hại cho tài khoản."
          }
        },
        {
          "@type": "Question",
          "name": "Bao lâu thì tôi nhận được báo cáo hiệu quả vận hành?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PGS Agency thực hiện báo cáo hiệu suất chi tiết định kỳ hàng tháng, bao gồm các chỉ số quan trọng như: Lượt tiếp cận (Reach), Lượt ghé thăm profile, Số lượng bio clicks dẫn về website, lượng tương tác và phân tích sâu về các bài viết/Reels hiệu quả nhất."
          }
        }
      ]
    }
  ]
}`;

  return (
    <section id="tech-handoff-spec" className="py-20 bg-stone-900 text-stone-100 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Handoff Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium tracking-wider uppercase mb-4">
            <Code className="w-3.5 h-3.5" /> Workspace tài liệu bàn giao kĩ thuật
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white font-medium">
            Tài Liệu Handoff Cho Các Bộ Phận & SEO
          </h2>
          <p className="mt-4 text-stone-400 max-w-2xl mx-auto text-sm md:text-base">
            Dành riêng cho Designer, Web Developer và SEO Content Writer. Đảm bảo tính đồng bộ, tối ưu chuyển đổi và chuẩn SEO tối đa cho chiến dịch.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-stone-800 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Tất cả bộ phận
          </button>
          <button
            onClick={() => setActiveTab('designer')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'designer'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
            }`}
          >
            <Layout className="w-4 h-4" /> UI/UX Designer
          </button>
          <button
            onClick={() => setActiveTab('developer')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'developer'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
            }`}
          >
            <Code className="w-4 h-4" /> Frontend Dev
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'seo'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
            }`}
          >
            <Search className="w-4 h-4" /> Content SEO
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Designer / Spec */}
          {(activeTab === 'all' || activeTab === 'designer') && (
            <div className={`p-6 rounded-xl bg-stone-950 border border-stone-800 ${activeTab === 'designer' ? 'lg:col-span-3' : ''}`}>
              <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-semibold mb-4 border-b border-stone-800 pb-3">
                <Layout className="w-5 h-5" /> UI/UX Design Guideline
              </div>
              <ul className="space-y-4 text-stone-300 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Visual Theme</strong>: Light Premium Consulting. Sử dụng nền sáng trắng ngà (<code className="text-amber-300 text-xs">#FAF9F6</code>), chữ đen than hoặc xám đậm (<code className="text-amber-300 text-xs">#1C1917</code>). Không sử dụng phong cách Cyberpunk hay Dark Theme gắt.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Màu nhấn (Accent)</strong>: Vàng Gold cao cấp (<code className="text-amber-300 text-xs">#D4AF37</code>, <code className="text-amber-300 text-xs">#F59E0B</code>) cho các thành phần quan trọng, icon, border mỏng và CTA chính.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Typography</strong>: Sử dụng font Serif sang trọng cho tiêu đề lớn (H1, H2) để tạo cảm giác tư vấn chuyên nghiệp, kết hợp font Sans-serif (Inter) cho phần text mô tả và JetBrains Mono cho các thông số kỹ thuật.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>3D Objects</strong>: Mô phỏng vật liệu kính mờ (Translucent Glass), kim loại vàng (Gold Metallic) sáng bóng, giúp tạo chiều sâu thị giác.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>UX Focus</strong>: Đặt CTA rõ ràng ở giữa trang (kết nối trực tiếp với Form AI hoặc Form Tư vấn) và cuối trang. Thiết kế sticky CTA mượt mà trên Mobile cho phép khách gọi ngay.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Column 2: Web Developer / Interaction */}
          {(activeTab === 'all' || activeTab === 'developer') && (
            <div className={`p-6 rounded-xl bg-stone-950 border border-stone-800 ${activeTab === 'developer' ? 'lg:col-span-3' : ''}`}>
              <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-semibold mb-4 border-b border-stone-800 pb-3">
                <Code className="w-5 h-5" /> Front-End Developer Spec
              </div>
              <ul className="space-y-4 text-stone-300 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Motion System</strong>: Sử dụng <code className="text-amber-300 text-xs">framer-motion</code> cho các chuyển động: Instagram Grid Load Stagger, Reels Stack Hover Tilt, Line Gold chạy mượt qua Sơ đồ chuyển đổi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Interactive Elements</strong>: State đầy đủ cho Grid Layout Selector (Checkerboard, Minimal, Row Topic) - khi click đổi layout tức thì. Custom Caption Builder có tính toán thêm hashtag tự động.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>AI Integration</strong>: Tích hợp nút gọi API server-side <code className="text-amber-300 text-xs">/api/instagram-ideas</code> với các tham số Brand, Niche, và Target Audience. Cập nhật trực tiếp kết quả vào UI Mockup.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Performance & Accessibility</strong>: Đảm bảo độ tương phản cao, tất cả các ảnh đều có <code className="text-amber-300 text-xs">alt</code> đầy đủ. Sử dụng <code className="text-amber-300 text-xs">prefers-reduced-motion</code> để tối ưu hóa khả năng truy cập của người dùng nhạy cảm với chuyển động.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Column 3: SEO Specialists */}
          {(activeTab === 'all' || activeTab === 'seo') && (
            <div className={`p-6 rounded-xl bg-stone-950 border border-stone-800 ${activeTab === 'seo' ? 'lg:col-span-3' : ''}`}>
              <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-semibold mb-4 border-b border-stone-800 pb-3">
                <Search className="w-5 h-5" /> Content SEO & EEAT Strategy
              </div>
              <ul className="space-y-4 text-stone-300 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Meta Tags</strong>:
                    <br />• Title: <span className="text-white">Dịch vụ Vận hành Instagram Chuyên Nghiệp | PGS Agency</span>
                    <br />• Desc: <span className="text-white">Dịch vụ quản lý, vận hành Instagram toàn diện của PGS Agency giúp nâng tầm hình ảnh thương hiệu, bứt phá Reels, tăng lead và chuyển đổi tối đa.</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Heading Structure</strong>: Đảm bảo duy nhất 1 thẻ <code className="text-amber-300 text-xs">H1</code> ở tiêu đề trang chính. Các phần con sử dụng đúng cấp độ <code className="text-amber-300 text-xs">H2</code> cho tên Section và <code className="text-amber-300 text-xs">H3</code> cho các nội dung phân nhỏ bên trong.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Internal Links</strong>:
                    <br />• Nhận link từ: Trang chủ, Trang dịch vụ tổng, Bài viết kinh nghiệm quản lý social.
                    <br />• Trỏ đi đến: <code className="text-amber-300 text-xs">/dich-vu/content-social</code>, <code className="text-amber-300 text-xs">/dich-vu/facebook-ads</code>, <code className="text-amber-300 text-xs">/dich-vu/xay-kenh-tiktok</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>EEAT Consultant Notes</strong>: Nội dung định nghĩa rõ ràng, minh bạch thông tin năng lực dự án thực tế, các gói dịch vụ phân cấp chi tiết đi kèm bảng so sánh trực quan, có chuyên mục câu hỏi thường gặp FAQ rõ ràng.</span>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* Schema Code Blocks */}
        <div className="mt-12 p-6 rounded-xl bg-stone-950 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="font-serif text-white font-semibold">Mã Schema JSON-LD đề xuất (Service, Breadcrumb & FAQPage)</span>
            </div>
            <button
              onClick={() => copyToClipboard(schemaCode, 'schema')}
              className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs transition duration-300 flex items-center gap-2 self-start sm:self-auto"
            >
              {copied === 'schema' ? 'Đã sao chép!' : 'Sao chép Schema'} <Clipboard className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="relative">
            <pre className="text-xs text-stone-300 bg-stone-900 p-4 rounded-lg overflow-x-auto max-h-96 font-mono border border-stone-800/60 leading-relaxed scrollbar-thin">
              {schemaCode}
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
