"use client";

import React, { useState } from "react";
import { FileText, Code, CheckSquare, Layers, Shield, Sparkles, Copy, Check } from "lucide-react";

export default function HandoffDoc() {
  const [activeTab, setActiveTab] = useState<string>("seo");
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ PGS Agency",
    "description": "Trang liên hệ và nhận tư vấn chiến lược tăng trưởng tổng thể đa nền tảng từ PGS Agency",
    "url": "https://pgsagency.vn/lien-he/",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "PGS Agency (Công ty TNHH Công Nghệ Số PGS)",
      "image": "https://pgsagency.vn/assets/logo.png",
      "telephone": "0931119999",
      "email": "growth@pgsagency.vn",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tầng 12, Viettel Tower, 285 Cách Mạng Tháng Tám, Phường 12",
        "addressLocality": "Quận 10",
        "addressRegion": "TP. Hồ Chí Minh",
        "postalCode": "70000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.7788",
        "longitude": "106.6789"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:30",
        "closes": "18:00"
      }
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(contactSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <section className="py-20 bg-charcoal-900 text-white border-t border-gold-500/20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold-900/40 border border-gold-500/30 text-gold-500 text-xs font-bold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PGS Agency Project Handover Documentation</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">
              Hồ Sơ Bàn Giao Kỹ Thuật (UX/UI, Dev, SEO & AI Search)
            </h2>
            <p className="text-xs text-charcoal-300 max-w-2xl leading-relaxed">
              Tài liệu hướng dẫn triển khai sản xuất thực tế dành cho UI/UX Designer, Front-End Developer và Đội ngũ Content SEO dựa trên triết lý tối ưu chuyển đổi và EEAT của PGS.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-charcoal-800 p-1.5 rounded-lg border border-white/5 self-start">
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "seo" ? "bg-gold-500 text-charcoal-900" : "text-charcoal-300 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>SEO, Metas & Heading</span>
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "schema" ? "bg-gold-500 text-charcoal-900" : "text-charcoal-300 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>JSON-LD Schemas</span>
            </button>
            <button
              onClick={() => setActiveTab("checklists")}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "checklists" ? "bg-gold-500 text-charcoal-900" : "text-charcoal-300 hover:text-white"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Bàn Giao Team</span>
            </button>
            <button
              onClick={() => setActiveTab("ai-search")}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "ai-search" ? "bg-gold-500 text-charcoal-900" : "text-charcoal-300 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>AI Search Optimization</span>
            </button>
          </div>
        </div>

        {/* Tab 1: SEO, Metas, Headings */}
        {activeTab === "seo" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-gold-500 border-b border-white/5 pb-2">1. Siêu dữ liệu SEO (Metadata)</h3>
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 font-bold text-charcoal-300 w-1/3">Meta Title:</td>
                    <td className="py-3 text-white">Liên hệ PGS Agency | Tư vấn Hệ thống Marketing Tổng thể Tăng Trưởng</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 font-bold text-charcoal-300">Meta Description:</td>
                    <td className="py-3 text-white leading-relaxed">
                      Liên hệ PGS Agency để xây dựng hệ thống Marketing tổng thể tối ưu chuyển đổi, tăng trưởng lead và doanh thu bền vững. Nhận bản rà soát sơ bộ website trong 2 giờ.
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 font-bold text-charcoal-300">Target URL:</td>
                    <td className="py-3 text-gold-500 font-mono">/lien-he/</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 font-bold text-charcoal-300">Primary Keyword:</td>
                    <td className="py-3 text-white">Liên hệ PGS Agency, tư vấn marketing PGS, báo giá dịch vụ marketing</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-charcoal-800 p-5 rounded-lg border border-white/5 space-y-3">
                <h4 className="font-bold text-xs text-gold-500 uppercase tracking-wider flex items-center space-x-1.5">
                  <Shield className="w-4 h-4" />
                  <span>Cấu Trúc Headings (H1 - H2 - H3)</span>
                </h4>
                <div className="space-y-2 text-xs text-charcoal-300 leading-relaxed font-mono">
                  <p className="text-white font-bold">&lt;H1&gt; Trao đổi với PGS Agency về hệ thống Marketing phù hợp với doanh nghiệp của bạn</p>
                  <p className="pl-4">&lt;H2&gt; Bước 0: Chọn mục tiêu tăng trưởng chính của bạn</p>
                  <p className="pl-4">&lt;H2&gt; Kết nối trực tiếp với chuyên gia PGS</p>
                  <p className="pl-4">&lt;H2&gt; Quy trình xử lý yêu cầu tư vấn tại PGS</p>
                  <p className="pl-4">&lt;H2&gt; PGS sẽ rà soát và phân tích những yếu tố nào?</p>
                  <p className="pl-4">&lt;H2&gt; Văn phòng làm việc của PGS</p>
                  <p className="pl-4">&lt;H2&gt; Doanh nghiệp hoàn toàn an tâm khi chọn PGS</p>
                  <p className="pl-4">&lt;H2&gt; Giải đáp thắc mắc trước khi liên hệ</p>
                  <p className="pl-4">&lt;H2&gt; Sẵn sàng bứt phá doanh số cùng hệ thống Marketing chuẩn hóa?</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-gold-500 border-b border-white/5 pb-2">2. Cấu Trúc Internal Links</h3>
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-charcoal-800 rounded-lg border border-white/5">
                  <h4 className="font-bold text-gold-500 mb-2">Internal Link Đi (Outbound Link):</h4>
                  <p className="text-charcoal-300 leading-relaxed mb-3">
                    Để gia tăng độ phủ authority và hỗ trợ bot Google thu thập thông tin, trang liên hệ đặt anchor link trực tiếp đến:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-charcoal-300">
                    <li><span className="text-gold-500 font-bold">Trang chủ:</span> Trỏ về `/` để khẳng định định vị thương hiệu PGS.</li>
                    <li><span className="text-gold-500 font-bold">Dịch vụ SEO:</span> Trỏ về `/dich-vu/seo-tong-the/` trong phần phân tích SEO.</li>
                    <li><span className="text-gold-500 font-bold">Thiết kế Web:</span> Trỏ về `/dich-vu/thiet-ke-website/` trong phần phân tích CRO.</li>
                    <li><span className="text-gold-500 font-bold">Quảng cáo Ads:</span> Trỏ về `/dich-vu/quang-cao-ads/` trong phần phân tích Ads.</li>
                  </ul>
                </div>

                <div className="p-4 bg-charcoal-800 rounded-lg border border-white/5">
                  <h4 className="font-bold text-gold-500 mb-2">Internal Link Nhận (Inbound Link):</h4>
                  <p className="text-charcoal-300 leading-relaxed mb-2">
                    Các trang vệ tinh bắt buộc trỏ link về trang `/lien-he/` để dồn sức mạnh chuyển đổi:
                  </p>
                  <p className="text-charcoal-300 leading-relaxed">
                    - Nút CTA nổi bật tại Header & Footer của tất cả các trang con.  
                    - Cuối mỗi bài viết Blog/Case-study, sử dụng banner CTA cuốn hút dẫn về `/lien-he/` chốt lead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Schema */}
        {activeTab === "schema" && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-gold-500">Đề xuất Schema JSON-LD Chuẩn cấu trúc</h3>
              <button
                onClick={handleCopySchema}
                className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-bold text-xs rounded transition-all flex items-center space-x-1 cursor-pointer"
              >
                {copiedSchema ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSchema ? "Đã sao chép!" : "Sao chép Schema JSON-LD"}</span>
              </button>
            </div>

            <p className="text-xs text-charcoal-300 max-w-3xl leading-relaxed">
              Bot tìm kiếm của Google và các mô hình AI Search (Perplexity, SearchGPT, Gemini Search) cực kỳ ưa chuộng các trang web được khai báo dữ liệu có cấu trúc minh bạch. Đoạn mã Schema sau khai báo thực thể **ContactPage** lồng ghép **ProfessionalService** giúp gia tăng điểm tín nhiệm thực thể (Entity) cho PGS Agency.
            </p>

            <pre className="bg-charcoal-800 border border-white/5 p-6 rounded-lg text-xs text-emerald-400 font-mono overflow-x-auto shadow-inner max-h-[350px]">
              {JSON.stringify(contactSchema, null, 2)}
            </pre>
          </div>
        )}

        {/* Tab 3: Detailed Job Checklists */}
        {activeTab === "checklists" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-[fadeIn_0.3s_ease-out]">
            {/* UI/UX Designer Checklist */}
            <div className="bg-charcoal-800 border border-white/5 p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-2 text-gold-500">
                <span className="font-display font-bold text-lg">🎨 DESIGNER</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-charcoal-300">Yêu cầu giao diện</h4>
              <ul className="text-xs text-charcoal-400 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Sử dụng phong cách **Light Premium Consulting**, tạo cảm giác sáng sạch, uy tín, đĩnh đạc của doanh nghiệp tư vấn chiến lược.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Màu vàng Gold làm điểm nhấn chủ đạo thương hiệu, xám ngà/trắng kem làm background để tránh chói mắt và tối ưu hóa khoảng trắng (negative space).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Thiết kế **Form 2 bước** với kích thước nút lớn hơn 44px trên mobile để tối ưu hóa thao tác chạm (Touch Target).</span>
                </li>
              </ul>
            </div>

            {/* Frontend Developer Checklist */}
            <div className="bg-charcoal-800 border border-white/5 p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-2 text-gold-500">
                <span className="font-display font-bold text-lg">💻 DEVELOPER</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-charcoal-300">Yêu cầu tương tác</h4>
              <ul className="text-xs text-charcoal-400 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Cài đặt **HMR=true** (tại môi trường sản xuất) và tối ưu hóa file tĩnh, cam kết điểm Core Web Vitals đạt **LCP &lt; 2.5 giây**.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Sử dụng **React Hooks** và xử lý form bất đồng bộ hoàn chỉnh, tích hợp hiệu ứng chuyển động mượt mà (slide-transition) giữa Step 1 và Step 2.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Thiết lập **Sticky Mobile Actions Panel** luôn ghim dưới màn hình điện thoại giúp người dùng chạm nhanh để Gọi/Zalo/Gửi callback.</span>
                </li>
              </ul>
            </div>

            {/* SEO Content Specialist Checklist */}
            <div className="bg-charcoal-800 border border-white/5 p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-2 text-gold-500">
                <span className="font-display font-bold text-lg">📝 CONTENT SEO</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-charcoal-300">Yêu cầu nội dung</h4>
              <ul className="text-xs text-charcoal-400 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Đảm bảo H1 là duy nhất, tích hợp từ khóa khóa chính ở mật độ 1.5% - 2.5% một cách tự nhiên, đúng giọng điệu tư vấn tăng trưởng.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Viết nội dung các phần Accordion giải đáp thắc mắc (FAQ) thấu hiểu nỗi đau rò rỉ lead, thuyết phục khách hàng tin cậy PGS.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Cung cấp tài liệu chứng minh pháp lý, giấy chứng nhận năng lực (Google Partner) để bot tìm kiếm đánh giá cao chất lượng EEAT.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: AI Search Optimization */}
        {activeTab === "ai-search" && (
          <div className="bg-charcoal-800 border border-white/5 p-8 rounded-xl space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="font-display font-bold text-lg text-gold-500 flex items-center space-x-2">
              <span>Định Hướng Tối Ưu Hóa AI Search (SearchGPT, Perplexity & Gemini)</span>
            </h3>
            
            <p className="text-xs text-charcoal-300 leading-relaxed">
              Các công cụ tìm kiếm thế hệ mới (AI Search Engine) không chỉ crawl keyword mà còn đọc hiểu sâu toàn bộ ngữ nghĩa website. Để PGS Agency xuất hiện nổi bật khi người dùng hỏi các AI Agent như: &ldquo;Agency nào uy tín chạy ads và seo tổng thể cam kết KPI tại TP.HCM?&rdquo;, website cần cấu hình:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-charcoal-400">
              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                  <span>Định nghĩa thực thể rõ ràng</span>
                </h4>
                <p className="leading-relaxed">
                  Cung cấp thông tin địa chỉ văn phòng, mã số thuế, giờ làm việc rõ ràng cùng chứng nhận đối tác Google/Facebook để AI Agent thu thập làm bằng chứng tin cậy (Trust Signals).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                  <span>Cấu trúc FAQ dạng hỏi-đáp trực tiếp</span>
                </h4>
                <p className="leading-relaxed">
                  Cách viết ngắn gọn, trực diện, đi thẳng vào câu trả lời trong FAQ giúp các LLM dễ dàng trích dẫn nguyên văn (Direct Citation) làm câu trả lời cho người dùng AI Search.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
