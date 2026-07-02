'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronRight, CheckCircle, Target, Sparkles, AlertCircle, RefreshCw, Cpu, Compass } from 'lucide-react';

interface GrowthSystemProps {
  onOpenHandover: (id: number) => void;
}

export default function GrowthSystem({ onOpenHandover }: GrowthSystemProps) {
  const [selectedIssue, setSelectedIssue] = useState<string>('website-lead');
  const [hoveredOrbitNode, setHoveredOrbitNode] = useState<string | null>(null);

  // Section 5: 5-Layer Pyramid Data
  const pyramidLayers = [
    {
      level: 5,
      name: "Social & Content Engine",
      focus: "Viral organic traffic, cộng đồng khách hàng, TikTok & Fanpage.",
      tech: "Xây dựng tệp fan trung thành, tạo phễu nội dung tự nhiên bền bỉ."
    },
    {
      level: 4,
      name: "Performance Marketing",
      focus: "Google Ads, Facebook Ads, TikTok Ads tối ưu hóa chuyển đổi.",
      tech: "Bám đuổi đa kênh, remarketing thông minh tránh bỏ sót lead nóng."
    },
    {
      level: 3,
      name: "SEO & AI Search Optimization",
      focus: "Organic Search, Google Business, AI Search Engine Optimization.",
      tech: "Bao phủ từ khóa ngách định hướng chuyển đổi, củng cố EEAT."
    },
    {
      level: 2,
      name: "Website & Conversion Asset",
      focus: "Trang đích, Website doanh nghiệp tối ưu CRO chuẩn chỉ.",
      tech: "Bố cục phễu thu thập lead, tối ưu tốc độ tải trang, UX mượt mà."
    },
    {
      level: 1,
      name: "Brand & Positioning Strategy",
      focus: "Định vị thương hiệu, nghiên cứu thị trường, chân dung khách hàng.",
      tech: "Xây nền móng vững chắc, xác định rõ thông điệp cốt lõi khác biệt."
    }
  ];

  // Section 6: Diagnostic Issues & Solutions
  const diagnosticData: Record<string, {
    issueLabel: string;
    analysis: string;
    solutions: string[];
    kpi: string;
  }> = {
    'website-lead': {
      issueLabel: 'Website ít lead/đăng ký',
      analysis: 'Website của bạn đang thiếu các cơ chế kêu gọi hành động (CTA) hợp tâm lý học hành vi, tốc độ tải trang chậm, hoặc luồng trải nghiệm khách hàng bị đứt gãy giữa đường.',
      solutions: [
        'Kiểm toán và cấu trúc lại luồng đi của UX/UI theo mô hình phễu chuyển đổi.',
        'Thiết kế và triển khai Landing Page mạ vàng tối ưu CRO cho từng dòng sản phẩm.',
        'Cài đặt các form đăng ký thông minh tự động điền (autofill) và thu hút bằng quà tặng lead magnet.'
      ],
      kpi: 'Tăng tỷ lệ chuyển đổi form (CR) từ 150% - 300% sau 3 tháng.'
    },
    'ads-high-cpl': {
      issueLabel: 'Quảng cáo CPL quá cao',
      analysis: 'Bạn đang tiếp cận sai tệp khách hàng tiềm năng, mẫu quảng cáo bị lặp đi lặp lại gây bão hòa, hoặc thiếu phễu remarketing bám đuổi khiến khách hàng thoát ra không quay lại.',
      solutions: [
        'Tái cấu trúc nhóm mục tiêu (Targeting), nhắm vào các từ khóa ý định mua cao (high-intent).',
        'Thay đổi định dạng sáng tạo nội dung liên tục (video ngắn TikTok, hình ảnh so sánh).',
        'Thiết lập phễu remarketing 3 tầng (Nhận diện -> Cân nhắc -> Chuyển đổi) tối ưu chi phí.'
      ],
      kpi: 'Tối ưu giảm chi phí mỗi lead (CPL) từ 25% - 45%.'
    },
    'seo-no-clients': {
      issueLabel: 'SEO có traffic nhưng không có khách',
      analysis: 'Lượng truy cập hiện tại đang đi vào các từ khóa mang tính chất tìm hiểu chung chung, không có giá trị thương mại hoặc trang đích không giữ chân được khách hàng.',
      solutions: [
        'Chuyển dịch trọng tâm sang chiến lược SEO định hướng mua hàng (Conversion SEO).',
        'Tối ưu hóa các bài viết trụ cột (pillar pages) bằng các nút kêu gọi liên hệ trực tiếp.',
        'Địa phương hóa với Google Business Profile để hút khách hàng có bán kính gần văn phòng.'
      ],
      kpi: 'Tăng tỷ lệ lead từ nguồn tìm kiếm tự nhiên lên gấp đôi.'
    },
    'social-fragmented': {
      issueLabel: 'Mạng xã hội (Social) rời rạc',
      analysis: 'Các kênh truyền thông của bạn chưa có bộ nhận diện thông điệp nhất quán, đăng bài thụ động, không có chiến lược phân bổ phễu nội dung rõ ràng.',
      solutions: [
        'Quy chuẩn hóa tài nguyên định vị thương hiệu trên mọi nền tảng Social.',
        'Triển khai tuyến nội dung chuyên gia (Authority Content) tăng uy tín vượt bậc cho dịch vụ.',
        'Xây dựng kịch bản video ngắn thu hút tương tác tự nhiên, kết nối về phễu Zalo/Website.'
      ],
      kpi: 'Tăng chỉ số tương tác tự nhiên lên 80% và xây dựng tệp cộng đồng trung thành.'
    },
    'lack-tracking': {
      issueLabel: 'Thiếu hệ thống đo lường dữ liệu',
      analysis: 'Doanh nghiệp vận hành như đi trong bóng tối, không biết chính xác đơn hàng hay lead nóng đến từ bài viết nào, từ khóa nào hay quảng cáo nào.',
      solutions: [
        'Thiết lập cài đặt trọn gói Google Analytics 4 (GA4) và Google Tag Manager (GTM).',
        'Tích hợp Conversion API (Meta, TikTok) tránh thất thoát dữ liệu do chặn cookie.',
        'Dựng dashboard trực quan hóa chi phí và hiệu quả chuyển đổi theo thời gian thực.'
      ],
      kpi: 'Kiểm soát chính xác 100% dòng tiền đầu tư tiếp thị số.'
    },
    'need-branding': {
      issueLabel: 'Cần tái định vị thương hiệu',
      analysis: 'Thương hiệu của bạn đang bị đánh đồng với các đối thủ giá rẻ trên thị trường, thiếu sự khác biệt rõ nét, khó bán dịch vụ với biên lợi nhuận cao.',
      solutions: [
        'Tổ chức workshop chuyên sâu để xác định lại Định vị độc bản (USP/ESP).',
        'Thiết kế bộ quy chuẩn nhận diện số cao cấp, tạo cảm giác chuyên nghiệp cao cấp (Premium).',
        'Xây dựng hệ thống bài viết PR trên các tờ báo lớn uy tín hàng đầu củng cố EEAT.'
      ],
      kpi: 'Định hình vị thế chuyên gia đầu ngành, nâng cao giá trị thặng dư sản phẩm.'
    }
  };

  // Section 7: Orbit Node Items
  const orbitNodes = {
    inner: [
      { id: 'web', name: 'Website CRO', desc: 'Thiết kế website tối ưu chuyển đổi', orbit: 'inner', angle: 0 },
      { id: 'lp', name: 'Landing Page', desc: 'Trang đích phễu quảng cáo siêu hiệu quả', orbit: 'inner', angle: 120 },
      { id: 'gbp', name: 'Google Profile', desc: 'SEO địa điểm thu hút khách cục bộ', orbit: 'inner', angle: 240 }
    ],
    middle: [
      { id: 'seo', name: 'SEO Tổng Thể', desc: 'Thống trị kết quả tìm kiếm Google', orbit: 'middle', angle: 45 },
      { id: 'gads', name: 'Google Ads', desc: 'Tiếp cận khách đang tìm mua', orbit: 'middle', angle: 135 },
      { id: 'fads', name: 'Facebook Ads', desc: 'Phễu target khách hàng mục tiêu', orbit: 'middle', angle: 225 },
      { id: 'tads', name: 'TikTok Ads', desc: 'Bùng nổ chiến dịch cùng video ngắn', orbit: 'middle', angle: 315 }
    ],
    outer: [
      { id: 'content', name: 'Content Engine', desc: 'Sáng tạo nội dung chất lượng cao', orbit: 'outer', angle: 30 },
      { id: 'social', name: 'Social Care', desc: 'Vận hành fanpage và kênh TikTok chuyên sâu', orbit: 'outer', angle: 150 },
      { id: 'pr', name: 'PR & Trust', desc: 'Đăng báo lớn củng cố uy tín EEAT', orbit: 'outer', angle: 270 }
    ]
  };

  return (
    <section className="py-24 space-y-32 bg-[#FAF9F6] relative">
      
      {/* SECTION 5: GROWTH SYSTEM 5 LỚP */}
      <div id="growth-system" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(5)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ PYRAMID 5 LỚP
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
              Hệ thống độc quyền
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight">
              Mô hình tăng trưởng tiếp thị 5 lớp bền vững
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              PGS Agency không bao giờ triển khai các hoạt động marketing rời rạc. Chúng tôi xây dựng một hệ thống tăng trưởng khép kín gồm 5 tầng chặt chẽ, lớp dưới làm bệ phóng trợ lực hoàn hảo cho lớp trên, đảm bảo hiệu suất tối đa.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-bold text-[10px] shrink-0 mt-0.5">✓</div>
                <p className="text-xs text-brand-muted"><strong className="text-brand-dark">Đồng bộ tuyệt đối:</strong> Loại bỏ hiện tượng đứt gãy thông tin giữa các kênh tiếp thị khác nhau.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-bold text-[10px] shrink-0 mt-0.5">✓</div>
                <p className="text-xs text-brand-muted"><strong className="text-brand-dark">Tập trung tối ưu phễu:</strong> Dẫn dắt hành vi khách hàng từ lúc biết thương hiệu đến khi hoàn tất đăng ký mua hàng.</p>
              </div>
            </div>
          </div>

          {/* Right: Stacked Pyramid visualization */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {pyramidLayers.map((layer, idx) => (
              <motion.div
                key={layer.level}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative bg-white border border-gold-200/40 rounded-xl p-5 shadow-xs hover:border-gold-400 hover:shadow-md transition-all duration-300"
                style={{
                  marginLeft: `${(5 - layer.level) * 1.5}rem`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-display font-black text-gold-500/30 group-hover:text-gold-500 transition-colors">
                      0{layer.level}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-brand-dark font-display group-hover:text-gold-600 transition-colors">
                        {layer.name}
                      </h4>
                      <p className="text-xs text-brand-muted mt-1">
                        {layer.focus}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded shrink-0 hidden sm:inline">
                    {layer.tech}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* SECTION 6: INTERACTIVE GROWTH DIAGNOSTIC */}
      <div id="diagnostic" className="bg-white py-20 border-t border-b border-gold-200/30 relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onOpenHandover(6)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ DIAGNOSTIC
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
              Chẩn Đoán Trực Tuyến
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
              Chọn vấn đề của bạn – Nhận giải pháp ngay lập tức
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Công cụ tương tác giúp chẩn đoán nhanh &apos;nỗi đau&apos; hệ thống và đề xuất lộ trình hành động được thiết kế riêng bởi chuyên gia PGS.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector buttons */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {Object.entries(diagnosticData).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedIssue(key)}
                  className={`text-left p-4 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between gap-3 cursor-pointer ${
                    selectedIssue === key
                      ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                      : 'bg-[#FAF9F6] text-brand-dark/80 border-gold-200/40 hover:bg-gold-50 hover:border-gold-300'
                  }`}
                >
                  <span>{value.issueLabel}</span>
                  <ChevronRight className={`w-4 h-4 ${selectedIssue === key ? 'text-gold-400' : 'text-brand-muted'}`} />
                </button>
              ))}
            </div>

            {/* Right solution proposal */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-gold-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/30 rounded-full blur-2xl -z-10" />

              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gold-200">
                  <div className="p-2 bg-gold-100 rounded-lg text-gold-600">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gold-600 uppercase">PGS PHÂN TÍCH CHUYÊN SÂU</span>
                    <h3 className="text-sm font-bold text-brand-dark font-display mt-0.5">
                      {diagnosticData[selectedIssue].issueLabel}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-brand-dark uppercase">Thực trạng & Nguyên nhân:</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {diagnosticData[selectedIssue].analysis}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-brand-dark uppercase">Lộ trình giải quyết của PGS:</h4>
                  <ul className="space-y-2">
                    {diagnosticData[selectedIssue].solutions.map((sol, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gold-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-brand-muted">MỤC TIÊU CAM KẾT (EXPECTED KPI)</span>
                  <p className="text-xs font-bold text-gold-600 mt-0.5">
                    {diagnosticData[selectedIssue].kpi}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-lg text-xs font-semibold text-center transition-colors shadow-xs"
                >
                  Nhận lộ trình miễn phí
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 7: HỆ SINH THÁI DỊCH VỤ 3D ORBIT */}
      <div id="services-orbit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={() => onOpenHandover(7)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-gold-400 hover:border-gold-500 rounded-full text-[9px] font-mono font-bold text-gold-600 bg-white cursor-pointer"
          >
            📄 ĐẶC TẢ ORBIT ECOSYSTEM
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
            Ecosystem Visualizer
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark tracking-tight">
            Vũ trụ dịch vụ tiếp thị đa kênh của PGS
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Nhấp chuột vào bất kỳ hành tinh dịch vụ nào trên mô hình để phóng to và xem tóm tắt thông tin dịch vụ chi tiết của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Left panel: Simulated orbit map (3D responsive layout) */}
          <div className="lg:col-span-7 flex justify-center items-center py-8 relative bg-white/40 border border-gold-200/30 rounded-3xl h-[450px]">
            
            {/* Ambient Background Glows */}
            <div className="absolute w-72 h-72 bg-gold-100/20 rounded-full blur-3xl -z-10" />

            {/* Central Core */}
            <div className="w-24 h-24 rounded-full bg-brand-dark border-2 border-gold-400 flex flex-col items-center justify-center p-3 shadow-xl z-20 glass-panel-gold">
              <span className="text-gold-500 font-display font-black text-lg tracking-tighter leading-none">PGS</span>
              <span className="text-[8px] font-mono text-brand-dark font-bold tracking-widest uppercase mt-1">Ecosystem</span>
            </div>

            {/* Simulated Orbit concentric rings */}
            <div className="absolute w-[220px] h-[220px] border border-gold-300/30 rounded-full" />
            <div className="absolute w-[320px] h-[320px] border border-dashed border-gold-400/20 rounded-full" />
            <div className="absolute w-[400px] h-[400px] border border-gold-300/20 rounded-full" />

            {/* Render Node Points inside the map */}
            <div className="absolute inset-0">
              
              {/* Inner Orbit Nodes */}
              {orbitNodes.inner.map((node) => {
                const isHovered = hoveredOrbitNode === node.id;
                // Calculate position based on angles
                const rad = (node.angle * Math.PI) / 180;
                const r = 110; // radius of orbit
                const x = 50 + (r * Math.cos(rad)) / 4.5; // percentage coordinates
                const y = 50 + (r * Math.sin(rad)) / 4.5;

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredOrbitNode(node.id)}
                    onMouseLeave={() => setHoveredOrbitNode(null)}
                    onClick={() => setHoveredOrbitNode(node.id)}
                    className="absolute w-10 h-10 rounded-full bg-white border border-gold-400 flex items-center justify-center shadow-md hover:scale-125 transition-transform z-30 cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <span className="text-[10px] font-mono font-bold text-gold-600">{node.id.toUpperCase()}</span>
                  </button>
                );
              })}

              {/* Middle Orbit Nodes */}
              {orbitNodes.middle.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = 160;
                const x = 50 + (r * Math.cos(rad)) / 4.5;
                const y = 50 + (r * Math.sin(rad)) / 4.5;

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredOrbitNode(node.id)}
                    onMouseLeave={() => setHoveredOrbitNode(null)}
                    onClick={() => setHoveredOrbitNode(node.id)}
                    className="absolute w-12 h-12 rounded-full bg-gold-50 border border-gold-500 flex items-center justify-center shadow-md hover:scale-125 transition-transform z-30 cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <span className="text-[9px] font-mono font-black text-[#1C1C1C]">{node.id.toUpperCase()}</span>
                  </button>
                );
              })}

              {/* Outer Orbit Nodes */}
              {orbitNodes.outer.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = 200;
                const x = 50 + (r * Math.cos(rad)) / 4.5;
                const y = 50 + (r * Math.sin(rad)) / 4.5;

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredOrbitNode(node.id)}
                    onMouseLeave={() => setHoveredOrbitNode(null)}
                    onClick={() => setHoveredOrbitNode(node.id)}
                    className="absolute w-11 h-11 rounded-full bg-brand-dark text-white border border-gold-400 flex items-center justify-center shadow-lg hover:scale-125 transition-transform z-30 cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <span className="text-[9px] font-mono font-bold text-gold-400">{node.id.toUpperCase()}</span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Right panel: Active Node Details */}
          <div className="lg:col-span-5 h-[320px] bg-white border border-gold-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {hoveredOrbitNode ? (
                <motion.div
                  key={hoveredOrbitNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-200 text-[10px] font-mono text-gold-600 font-bold uppercase">
                    Ecosystem Node
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-dark">
                    {
                      [...orbitNodes.inner, ...orbitNodes.middle, ...orbitNodes.outer].find(
                        (n) => n.id === hoveredOrbitNode
                      )?.name
                    }
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {
                      [...orbitNodes.inner, ...orbitNodes.middle, ...orbitNodes.outer].find(
                        (n) => n.id === hoveredOrbitNode
                      )?.desc
                    }
                  </p>
                  <div className="p-3 bg-gold-50/50 rounded-lg border border-gold-200/40 text-[11px] text-brand-muted">
                    <strong className="text-brand-dark block mb-1">Mục tiêu cốt lõi:</strong>
                    Tích hợp dòng chảy dữ liệu trực tiếp về lõi hệ thống PGS Growth, đo lường chi phí trên từng lượt tương tác của khách hàng.
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-500 animate-pulse">
                    <Compass className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <p className="text-xs text-brand-muted max-w-xs leading-relaxed">
                    Di con trỏ chuột (hoặc chạm tay) vào các hành tinh dịch vụ trên bản đồ quỹ đạo để xem mô tả chi tiết của dịch vụ đó.
                  </p>
                </div>
              )}
            </AnimatePresence>

            <div className="border-t border-gold-100 pt-4 flex justify-between items-center text-xs">
              <span className="text-brand-muted">Phục vụ đa kênh:</span>
              <a href="#services" className="font-bold text-gold-600 hover:text-gold-700 flex items-center gap-1">
                Xem tất cả dịch vụ <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
