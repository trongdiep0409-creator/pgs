'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layout, Grid, Image, Type, Palette, Eye, HelpCircle, Layers, Check, ChevronRight } from 'lucide-react';

export default function GridLayoutSection() {
  const [activeGuideline, setActiveGuideline] = useState<string>('grid-style');
  const [selectedLayout, setSelectedLayout] = useState<'checker' | 'row' | 'minimal' | 'mix'>('checker');

  // Guidelines details data
  const guidelines = [
    {
      id: 'grid-style',
      title: 'Quy hoạch Grid Layout',
      icon: <Grid className="w-5 h-5" />,
      tagline: 'Quy hoạch chuỗi 9 ô đồng nhất',
      desc: 'Thiết lập nhịp điệu thị giác từ trước khi khách hàng cuộn trang. Mỗi bức ảnh đơn lẻ đều là một phần của tổng thể bức tranh nghệ thuật lớn.',
      details: [
        'Quy hoạch cấu trúc xen kẽ giúp mắt người đọc dễ chịu',
        'Đặt các điểm nhấn visual ở các góc 1/3 để dẫn dắt hành vi',
        'Đảm bảo sự chuyển tiếp màu sắc mượt mà giữa các hàng'
      ]
    },
    {
      id: 'colors',
      title: 'Hệ bảng màu thương hiệu',
      icon: <Palette className="w-5 h-5" />,
      tagline: 'Hệ màu Light Premium Consulting',
      desc: 'Sử dụng hệ màu thanh lịch làm nổi bật tính chuyên nghiệp: màu trắng ngà làm nền, màu vàng gold làm điểm nhấn đắt giá, màu than đen làm xương sống cấu trúc.',
      details: [
        'Tỷ lệ phân bổ vàng: 60% Nền Sáng, 30% Đen than cấu trúc, 10% Vàng Gold lấp lánh',
        'Sử dụng các gam màu bổ trợ dịu mát (stone gray, warm beige) làm dịu mắt',
        'Độ tương phản đạt tiêu chuẩn WCAG giúp tăng trải nghiệm đọc'
      ]
    },
    {
      id: 'typography',
      title: 'Quy chuẩn Typography',
      icon: <Type className="w-5 h-5" />,
      tagline: 'Sự kết hợp giữa Serif cổ điển và Sans-serif',
      desc: 'Phối hợp font chữ một cách tinh tế. Font Serif thể hiện tính uy tín và đẳng cấp học thuật của đơn vị tư vấn. Font Sans-serif mang lại sự hiện đại, rõ nét và dễ tiếp nhận.',
      details: [
        'Tiêu đề chính: Font Serif cổ điển, khoảng cách ký tự hẹp, sang trọng',
        'Nội dung bổ trợ: Font Sans-serif (Inter/SF Pro), kích thước tối thiểu 12px trên mobile',
        'Chỉ số kỹ thuật: Font Mono (JetBrains/Fira) mang tính chính xác và dữ liệu'
      ]
    },
    {
      id: 'templates',
      title: 'Mẫu thiết kế (Templates)',
      icon: <Layers className="w-5 h-5" />,
      tagline: 'Tính tiện dụng và nhất quán lâu dài',
      desc: 'Hệ thống template được thiết kế đo ni đóng giày trên Figma để quá trình vận hành luôn diễn ra trơn tru, nhanh chóng mà không làm mất đi tính thẩm mỹ cốt lõi.',
      details: [
        'Template cho bài viết Carousel chia sẻ kiến thức chuẩn 5 slide',
        'Template bìa Cover Reels chuẩn kích thước hiển thị trên Grid và Reels Tab',
        'Hệ thống UI kit, icon gold và frame viền mảnh đồng bộ'
      ]
    }
  ];

  // Grid layout styles representation
  const gridLayoutSpecs = {
    checker: {
      title: "Checkerboard (Bàn cờ Caro)",
      desc: "Xen kẽ hoàn hảo giữa 1 bài viết hình ảnh sản phẩm/lifestyle và 1 bài viết trích dẫn (quote) hoặc kiến thức có nền sáng tối giản. Tạo nhịp điệu thị giác cân đối, tránh cảm giác nhồi nhét nội dung.",
      pros: "Phù hợp nhất với các thương hiệu Mỹ phẩm, Lifestyle, Spa hoặc thời trang có nhiều nội dung chia sẻ.",
      layout: [
        { type: "image", label: "Sản Phẩm" }, { type: "text", label: "Trích Dẫn" }, { type: "image", label: "Sản Phẩm" },
        { type: "text", label: "Kiến Thức" }, { type: "image", label: "Sản Phẩm" }, { type: "text", label: "Ưu Đãi" },
        { type: "image", label: "Sản Phẩm" }, { type: "text", label: "Feedback" }, { type: "image", label: "Sản Phẩm" }
      ]
    },
    row: {
      title: "Row by Topic (Hàng ngang chủ đề)",
      desc: "Mỗi hàng ngang gồm 3 bài viết được thiết kế đồng điệu hoàn toàn về màu sắc hoặc giải quyết một chủ đề duy nhất (ví dụ hàng 1 ra mắt BST, hàng 2 chia sẻ feedback khách hàng, hàng 3 hướng dẫn sử dụng).",
      pros: "Giúp trang cá nhân cực kỳ gọn gàng khi nhìn tổng quan, dẫn dắt khách hàng đọc từ trái qua phải theo câu chuyện.",
      layout: [
        { type: "row1", label: "BST Mới - Trái" }, { type: "row1", label: "BST Mới - Giữa" }, { type: "row1", label: "BST Mới - Phải" },
        { type: "row2", label: "Kiến Thức - Trái" }, { type: "row2", label: "Kiến Thức - Giữa" }, { type: "row2", label: "Kiến Thức - Phải" },
        { type: "row3", label: "Feedback #1" }, { type: "row3", label: "Feedback #2" }, { type: "row3", label: "Feedback #3" }
      ]
    },
    minimal: {
      title: "Minimal Luxury (Tối giản cao cấp)",
      desc: "Trọng tâm là các khoảng trắng mênh mông, những line vàng gold siêu mảnh và ảnh lifestyle có chiều sâu nghệ thuật cực cao. Rất ít chữ trên ảnh, toàn bộ thông tin chi tiết được dồn vào caption.",
      pros: "Tạo cảm giác đẳng cấp, xa xỉ bậc nhất. Thích hợp cho các thương hiệu Nội thất cao cấp, Nha khoa thẩm mỹ, Trang sức vàng bạc.",
      layout: [
        { type: "min1", label: "White Space" }, { type: "min2", label: "Gold Accent" }, { type: "min1", label: "White Space" },
        { type: "min2", label: "Gold Accent" }, { type: "min3", label: "High Key Photo" }, { type: "min2", label: "Gold Accent" },
        { type: "min1", label: "White Space" }, { type: "min2", label: "Gold Accent" }, { type: "min1", label: "White Space" }
      ]
    },
    mix: {
      title: "Product/Service Mix (Đa dạng hóa)",
      desc: "Bố cục bất đối xứng tinh tế, đan xen góc chéo giữa video Reels, bài viết Carousel chia sẻ giải pháp sâu và ảnh sản phẩm cận cảnh sắc nét. Phá vỡ sự rập khuôn nhưng vẫn giữ sự sang trọng nhất quán.",
      pros: "Phù hợp với các công ty dịch vụ, agency, hoặc startup có dải sản phẩm rộng cần giới thiệu đa góc độ.",
      layout: [
        { type: "reel", label: "🎬 Reels Viral" }, { type: "image", label: "Ảnh Đơn" }, { type: "carousel", label: "📚 Carousel" },
        { type: "image", label: "Ảnh Đơn" }, { type: "carousel", label: "📚 Carousel" }, { type: "reel", label: "🎬 Reels Viral" },
        { type: "carousel", label: "📚 Carousel" }, { type: "reel", label: "🎬 Reels Viral" }, { type: "image", label: "Ảnh Đơn" }
      ]
    }
  };

  const currentGuideline = guidelines.find(g => g.id === activeGuideline) || guidelines[0];

  return (
    <div className="space-y-24 bg-white py-16">
      
      {/* SECTION 6: Visual Identity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5" /> Brand Identity
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Thiết lập Quy chuẩn Định dạng Thị giác (Visual Identity)
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base animate-fade-in">
            Không làm việc theo cảm tính. PGS Agency chuẩn hóa mọi điểm chạm thị giác trên Instagram của bạn thành bộ Visual Guidelines nhất quán, nâng tầm vị thế thương hiệu trong tâm trí khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Guideline Tabs selector */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {guidelines.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGuideline(g.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                    activeGuideline === g.id
                      ? 'bg-amber-500/10 border-amber-500 text-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100/50'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${activeGuideline === g.id ? 'bg-amber-500 text-stone-950' : 'bg-stone-200 text-stone-600'}`}>
                    {g.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm md:text-base text-stone-900 truncate">{g.title}</h4>
                    <p className="text-[11px] text-stone-500 truncate">{g.tagline}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition duration-300 ${activeGuideline === g.id ? 'text-amber-600 translate-x-1' : 'text-stone-400'}`} />
                </button>
              ))}
            </div>

            {/* Micro warning */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 flex gap-2">
              <span className="text-amber-500">💡</span>
              <p>Mỗi thương hiệu sẽ có một bảng quy chuẩn Visual Guidelines riêng biệt lưu trong tài liệu bàn giao để doanh nghiệp tiện lưu trữ và tự vận hành về sau.</p>
            </div>
          </div>

          {/* Right Column: Visual Preview Panel */}
          <div className="lg:col-span-7 bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGuideline.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentGuideline.title}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-medium mt-4">
                    {currentGuideline.tagline}
                  </h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-2">
                    {currentGuideline.desc}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Quy chuẩn kỹ thuật áp dụng:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentGuideline.details.map((detail, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white border border-stone-200/50 flex items-start gap-2 text-xs text-stone-600 leading-normal">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mock abstract visual placeholder representational art */}
            <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-stone-900"></span>
                <span className="w-3 h-3 rounded-full bg-stone-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-200"></span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">PGS VISUAL DESIGN STANDARD v2.5</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: Grid Layout Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Spec and Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider">
              <Layout className="w-3.5 h-3.5" /> Grid Architect
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              4 Phương Pháp Quy Hoạch <br />Bố Cục Lưới (Grid Layout)
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Lưới 3x3 chính là trang bìa tạp chí của thương hiệu. PGS Agency giúp bạn xây dựng bố cục lưới có chủ đích rõ ràng. Nhấp chọn các phương pháp bên dưới để so sánh trực quan bố cục:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'checker', label: "Checkerboard" },
                { id: 'row', label: "Row by Topic" },
                { id: 'minimal', label: "Minimal Luxury" },
                { id: 'mix', label: "Product Mix" }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedLayout(btn.id as any)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition duration-300 ${
                    selectedLayout === btn.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                📌 {gridLayoutSpecs[selectedLayout].title}
              </h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                {gridLayoutSpecs[selectedLayout].desc}
              </p>
              <p className="text-stone-500 text-[11px] italic pt-1 border-t border-amber-200/30">
                <strong>Ứng dụng:</strong> {gridLayoutSpecs[selectedLayout].pros}
              </p>
            </div>
          </div>

          {/* Right Column: Visual Interactive Grid representation */}
          <div className="lg:col-span-7 bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-200/60 shadow-sm flex items-center justify-center">
            <div className="w-full max-w-[360px] aspect-square bg-white rounded-2xl border border-stone-200 p-4 shadow-md grid grid-cols-3 gap-2">
              {gridLayoutSpecs[selectedLayout].layout.map((cell: any, index: number) => {
                
                // Color codes for layouts representational styling
                let cellClass = "bg-stone-100 border-stone-200";
                let textClass = "text-stone-600";
                
                if (selectedLayout === 'checker') {
                  if (cell.type === 'text') {
                    cellClass = "bg-amber-100/50 border-amber-300 text-amber-900";
                    textClass = "text-amber-900 font-bold font-serif";
                  } else {
                    cellClass = "bg-stone-100 border-stone-200";
                    textClass = "text-stone-500";
                  }
                } else if (selectedLayout === 'row') {
                  if (cell.type === 'row1') {
                    cellClass = "bg-amber-100/75 border-amber-300";
                    textClass = "text-amber-950 font-semibold";
                  } else if (cell.type === 'row2') {
                    cellClass = "bg-stone-100 border-stone-200";
                    textClass = "text-stone-600";
                  } else {
                    cellClass = "bg-stone-200/40 border-stone-300";
                    textClass = "text-stone-500";
                  }
                } else if (selectedLayout === 'minimal') {
                  if (cell.type === 'min1') {
                    cellClass = "bg-stone-50 border-stone-100/60 opacity-60";
                    textClass = "text-stone-400 italic";
                  } else if (cell.type === 'min2') {
                    cellClass = "bg-white border-amber-400/50";
                    textClass = "text-amber-800 font-serif font-bold";
                  } else {
                    cellClass = "bg-amber-50 border-amber-200";
                    textClass = "text-stone-800";
                  }
                } else if (selectedLayout === 'mix') {
                  if (cell.type === 'reel') {
                    cellClass = "bg-amber-100/40 border-amber-400";
                    textClass = "text-amber-900 font-bold";
                  } else if (cell.type === 'carousel') {
                    cellClass = "bg-stone-100 border-stone-300";
                    textClass = "text-stone-700";
                  } else {
                    cellClass = "bg-white border-stone-200";
                    textClass = "text-stone-500";
                  }
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 shadow-sm relative overflow-hidden group hover:scale-[1.03] ${cellClass}`}
                  >
                    {/* Gold metallic thin line accent inside high items */}
                    {(selectedLayout === 'minimal' && cell.type === 'min2') && (
                      <div className="absolute inset-x-2 top-2 h-[1px] bg-amber-400"></div>
                    )}
                    
                    <span className={`text-[10px] md:text-xs font-sans tracking-tight leading-tight ${textClass}`}>
                      {cell.label}
                    </span>
                    
                    <span className="text-[7px] text-stone-400 block mt-1 font-mono uppercase">
                      #{index + 1}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
