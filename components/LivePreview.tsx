'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Calculator, Check, CheckCircle, 
  ChevronDown, Layers, Zap, BarChart, Activity, Smartphone, 
  HelpCircle, Send, RefreshCw, Eye, ShieldCheck, AlertTriangle, 
  Users, Building, TrendingUp, DollarSign, Award, Target
} from 'lucide-react';
import { sectionsData } from '@/lib/docs-data';

interface LivePreviewProps {
  activeSectionId: number;
  onSectionClick: (id: number) => void;
  showSpecToast: (title: string) => void;
}

export default function LivePreview({ activeSectionId, onSectionClick, showSpecToast }: LivePreviewProps) {
  // Section 5: CPL Calculator State
  const [budget, setBudget] = useState(50000000); // 50M VND default
  const [currentCr, setCurrentCr] = useState(1); // 1% CR
  const [pgsCr, setPgsCr] = useState(5); // 5% CR with PGS

  // Calculations
  const costPerClick = 10000; // 10k VND per click
  const clicks = budget / costPerClick;
  const currentLeads = Math.round(clicks * (currentCr / 100));
  const pgsLeads = Math.round(clicks * (pgsCr / 100));
  const currentCpl = currentLeads > 0 ? Math.round(budget / currentLeads) : budget;
  const pgsCpl = pgsLeads > 0 ? Math.round(budget / pgsLeads) : budget;
  const wastedBudget = Math.round(budget * (1 - (currentCr / pgsCr)));

  // Section 8: Heatmap State
  const [selectedHeatpoint, setSelectedHeatpoint] = useState<string>('hero');

  // Section 11: A/B Testing Simulator State
  const [isTesting, setIsTesting] = useState(false);
  const [progressA, setProgressA] = useState(0);
  const [progressB, setProgressB] = useState(0);
  const [leadsA, setLeadsA] = useState(0);
  const [leadsB, setLeadsB] = useState(0);

  const startABTest = () => {
    setIsTesting(true);
    setProgressA(0);
    setProgressB(0);
    setLeadsA(0);
    setLeadsB(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTesting) {
      interval = setInterval(() => {
        setProgressA(prev => {
          if (prev >= 100) return 100;
          return prev + 2.5;
        });
        setProgressB(prev => {
          if (prev >= 100) {
            setIsTesting(false);
            return 100;
          }
          return prev + 2.5;
        });
        setLeadsA(prev => {
          if (progressA >= 100) return prev;
          return Math.round(progressA * 0.12 * 1.5);
        });
        setLeadsB(prev => {
          if (progressB >= 100) return prev;
          return Math.round(progressB * 0.55 * 1.5);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTesting, progressA, progressB]);

  // Section 12: Case Study Slider
  const [activeCase, setActiveCase] = useState(0);
  const cases = [
    {
      industry: "Bất Động Sản",
      client: "Vinhomes Premium Agent",
      before: "Web dự án giới thiệu chung chung, load chậm, mẫu form dài 8 trường.",
      after: "Landing page PGS 10 khối tối ưu CRO di động, form 3 trường, nén ảnh thông minh.",
      metrics: { crIncrease: "+280%", cplDrop: "-62%", leads: "450+ leads/tháng" },
      color: "from-amber-500 to-amber-700"
    },
    {
      industry: "Thẩm Mỹ Viện & Spa",
      client: "Seoul Luxury Clinic",
      before: "Dùng chung trang chủ website nhiều dịch vụ chạy ads trị nám.",
      after: "Landing page ngách đặc trị nám mụn chuẩn y khoa, feedback thật đặt cạnh CTA.",
      metrics: { crIncrease: "+340%", cplDrop: "-55%", leads: "820+ leads/tháng" },
      color: "from-rose-500 to-rose-700"
    },
    {
      industry: "Giáo Dục Trực Tuyến",
      client: "EduAcademy",
      before: "Landing page thô sơ tự kéo thả bằng công cụ miễn phí, không tracking.",
      after: "Gói Premium PGS tích hợp A/B testing tiêu đề và đồng hồ đếm ngược kích thích.",
      metrics: { crIncrease: "+195%", cplDrop: "-45%", leads: "1,200+ đăng ký" },
      color: "from-indigo-500 to-indigo-700"
    }
  ];

  // Section 14: Accordion FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Section 16: Contact Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', business: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 2: LANDING PAGE LÀ GÌ */}
      <section 
        id="section-2" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF5] to-[#FFF9E6] ${
          activeSectionId === 2 ? 'border-gold-500 shadow-xl glow-gold' : 'border-gold-200/60'
        }`}
        onClick={() => onSectionClick(2)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(2); showSpecToast(sectionsData[1].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-white hover:bg-gold-50 rounded-full transition-all border border-gold-200"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 2
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 pt-6">
          <div className="text-gold-600 font-mono text-xs font-bold tracking-wider uppercase">ĐỊNH NGHĨA TRỰC QUAN</div>
          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-display font-bold text-stone-950 leading-[1.15] tracking-tight">
            Landing Page Là Gì? <br className="hidden sm:inline"/>
            <span className="text-gold-600 font-extrabold relative inline-block">
              Lăng kính hội tụ
              <span className="absolute left-0 bottom-1 w-full h-[6px] bg-gold-200/50 -z-10" />
            </span>{' '}
            tất cả lưu lượng truy cập
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full" />
          <p className="text-stone-800 leading-relaxed text-base sm:text-lg">
            Khác với Website phổ thông có nhiều phân nhánh phân tâm, <strong className="text-stone-950 font-bold">Landing Page (Trang đích)</strong> là một trang web độc lập, được nghiên cứu kịch bản nội dung tinh vi với mục đích tối hậu: <strong className="text-gold-600 font-extrabold">Dẫn dắt khách hàng đi đến duy nhất 1 hành động chuyển đổi mong muốn.</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <div className="p-5 bg-white/95 rounded-2xl border border-gold-100 hover:border-gold-300 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 mb-4 font-bold font-mono">01</div>
              <h3 className="font-bold text-stone-950 mb-2 font-display">Thông điệp cốt lõi</h3>
              <p className="text-xs text-stone-600 leading-snug">Chỉ tập trung giải quyết đúng một nỗi đau hoặc nhu cầu nóng bỏng nhất của tệp khách hàng tiềm năng cụ thể.</p>
            </div>
            <div className="p-5 bg-white/95 rounded-2xl border border-gold-100 hover:border-gold-300 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 mb-4 font-bold font-mono">02</div>
              <h3 className="font-bold text-stone-950 mb-2 font-display">Loại bỏ nhiễu thoát</h3>
              <p className="text-xs text-stone-600 leading-snug">Không chứa menu linh tinh hay link quảng cáo khác, giữ chân người dùng tập trung hoàn toàn vào nội dung chào hàng.</p>
            </div>
            <div className="p-5 bg-white/95 rounded-2xl border border-gold-100 hover:border-gold-300 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 mb-4 font-bold font-mono">03</div>
              <h3 className="font-bold text-stone-950 mb-2 font-display">CTA hành động rõ ràng</h3>
              <p className="text-xs text-stone-600 leading-snug">Kêu gọi hành động mạnh mẽ tại các điểm cảm xúc chín muồi: Đăng ký tư vấn, điền form nhận ưu đãi, nhận báo giá.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LANDING PAGE KHÁC WEBSITE */}
      <section 
        id="section-3" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-stone-50 ${
          activeSectionId === 3 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(3)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(3); showSpecToast(sectionsData[2].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 3
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">BẢNG ĐỐI CHIẾU KỸ THUẬT</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Website vs Landing Page: Đâu Là Sự Lựa Chọn Sáng Suốt?</h2>
          </div>

          <div className="overflow-hidden border border-stone-200 rounded-2xl bg-white shadow-sm">
            <div className="grid grid-cols-12 bg-stone-800 text-white p-4 font-semibold text-sm">
              <div className="col-span-4">Tiêu chí đối sánh</div>
              <div className="col-span-4 border-l border-stone-700 pl-4">Website Đa Mục Tiêu</div>
              <div className="col-span-4 border-l border-stone-700 pl-4 text-gold-300">Landing Page (Chuẩn CRO)</div>
            </div>

            <div className="divide-y divide-stone-100 text-sm">
              <div className="grid grid-cols-12 p-4">
                <div className="col-span-4 font-medium text-stone-700">Mục tiêu chính</div>
                <div className="col-span-4 text-stone-500">Giới thiệu tổng quan doanh nghiệp, trưng bày thư viện thông tin.</div>
                <div className="col-span-4 font-semibold text-stone-900 pl-4 border-l border-gold-100 bg-gold-50/20">Chốt hạ 1 hành động duy nhất (Thu lead, Bán hàng, Booking).</div>
              </div>

              <div className="grid grid-cols-12 p-4">
                <div className="col-span-4 font-medium text-stone-700">Đường thoát thoát</div>
                <div className="col-span-4 text-stone-500">Rất nhiều (Menu điều hướng, bài viết liên quan, links ngoài, MXH...)</div>
                <div className="col-span-4 font-semibold text-stone-900 pl-4 border-l border-gold-100 bg-gold-50/20">Gần như bằng 0 (Khách chỉ có thể cuộn đọc tiếp hoặc điền form/out).</div>
              </div>

              <div className="grid grid-cols-12 p-4">
                <div className="col-span-4 font-medium text-stone-700">Tỉ lệ chuyển đổi trung bình</div>
                <div className="col-span-4 text-stone-500">Thấp (Thường chỉ từ 0.5% - 1.5%)</div>
                <div className="col-span-4 font-bold text-gold-600 pl-4 border-l border-gold-100 bg-gold-50/40">Vượt trội (Thường đạt từ 4.5% - 12%+)</div>
              </div>

              <div className="grid grid-cols-12 p-4">
                <div className="col-span-4 font-medium text-stone-700">Mức độ phù hợp chạy Ads</div>
                <div className="col-span-4 text-stone-500">Kém phù hợp (Làm khách phân tâm, lãng phí chi phí click chuột)</div>
                <div className="col-span-4 font-semibold text-stone-900 pl-4 border-l border-gold-100 bg-gold-50/20">Là bắt buộc (Tăng điểm chất lượng quảng cáo, hạ tối đa giá bid)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KHI NÀO CẦN LANDING PAGE */}
      <section 
        id="section-4" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 4 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(4)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(4); showSpecToast(sectionsData[3].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 4
          </button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">ỨNG DỤNG THỰC CHIẾN</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Khi Nào Doanh Nghiệp Cần Thiết Kế Landing Page?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Chạy chiến dịch Quảng cáo đa kênh", desc: "Khi chạy Google Ads, FB Ads, TikTok Ads, doanh nghiệp cần trang đích chuẩn CRO để chuyển đổi lượt click thành số điện thoại thay vì đưa về trang chủ website rườm rà." },
              { id: 2, title: "Ra mắt sản phẩm / dịch vụ mới", desc: "Cần một trang tập trung nói sâu về tính năng, công dụng độc đáo của sản phẩm mới ra lò, kích thích tò mò và gom danh sách khách hàng đặt trước." },
              { id: 3, title: "Tổ chức sự kiện, Webinar, Khóa học", desc: "Thu thập danh sách đăng ký vé tham dự trực tuyến/trực tiếp. Nội dung tập trung làm rõ lợi ích diễn giả, lịch trình chương trình và đếm ngược thời gian." },
              { id: 4, title: "Chiến dịch tặng quà, ưu đãi đặc biệt", desc: "Phễu tặng sách, tài liệu PDF, voucher để thu thập thông tin khách hàng tiềm năng. Mồi nhử có giá trị cao giúp tăng 300% lượng lead tự nguyện." },
              { id: 5, title: "Bán hàng nhanh một sản phẩm chủ lực", desc: "Tập trung giải quyết nhanh 1 offer độc nhất, thanh toán nhanh gọn trong một trang, kích hoạt tâm lý sợ bỏ lỡ cơ hội." },
              { id: 6, title: "Thử nghiệm phân tách ý tưởng kinh doanh", desc: "Cần test phản hồi của thị trường về một sản phẩm mới trước khi đổ tiền sản xuất hàng loạt. Tiết kiệm tối đa rủi ro nguồn vốn." }
            ].map((item) => (
              <div key={item.id} className="p-6 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-gold-300 hover:shadow-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gold-50 text-gold-700 mb-4">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: VÌ SAO LANDING PAGE ẢNH HƯỞNG CPL */}
      <section 
        id="section-5" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 5 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(5)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(5); showSpecToast(sectionsData[4].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 5
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">CÔNG CỤ GIẢ LẬP TÀI CHÍNH</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
              Tỷ Lệ Chuyển Đổi Landing Page Khống Chế Trực Tiếp Giá Lead (CPL)
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Bạn có thể đổ hàng trăm triệu đồng chạy Ads, nhưng nếu trang đích có tỷ lệ chuyển đổi kém (chỉ 1%), bạn đang lãng phí hàng núi tiền. Hãy di chuyển thanh trượt của công cụ bên phải để xem chất lượng Landing Page giải quyết bài toán dòng tiền thông minh như thế nào.
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Cảnh báo lãng phí ngân sách:</strong> Ở tỷ lệ chuyển đổi hiện tại của bạn ({currentCr}%), doanh nghiệp đang đánh rơi khoảng <strong>{wastedBudget.toLocaleString()} VNĐ</strong> chi phí tiếp cận khách hàng tiềm năng mỗi tháng.
              </div>
            </div>
          </div>

          {/* Interactive CPL Slider Calculator */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Ngân sách chạy ads hàng tháng</label>
                <span className="text-sm font-mono font-bold text-stone-900">{(budget / 1000000).toFixed(0)} triệu VNĐ</span>
              </div>
              <input 
                type="range" 
                min="10000000" 
                max="300000000" 
                step="10000000"
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-stone-600 uppercase">Tỉ lệ chuyển đổi cũ</label>
                  <span className="text-sm font-mono font-bold text-stone-800">{currentCr}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.5"
                  value={currentCr} 
                  onChange={(e) => setCurrentCr(Number(e.target.value))}
                  className="w-full accent-stone-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-gold-700 uppercase">Tỉ lệ tối ưu của PGS</label>
                  <span className="text-sm font-mono font-bold text-gold-700">{pgsCr}%</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="15" 
                  step="1"
                  value={pgsCr} 
                  onChange={(e) => setPgsCr(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold block uppercase">Trạng thái cũ</span>
                <p className="text-lg font-mono font-bold text-stone-600">{currentLeads} Leads</p>
                <p className="text-[10px] text-stone-500">CPL: {currentCpl.toLocaleString()} đ</p>
              </div>

              <div className="p-3 bg-gold-50 rounded-xl border border-gold-200">
                <span className="text-[10px] text-gold-500 font-bold block uppercase">PGS Tối Ưu</span>
                <p className="text-lg font-mono font-bold text-gold-700">{pgsLeads} Leads</p>
                <p className="text-[10px] text-gold-600">CPL: {pgsCpl.toLocaleString()} đ</p>
              </div>
            </div>

            <div className="p-4 bg-stone-900 text-white rounded-xl text-center space-y-1">
              <span className="text-[10px] text-gold-300 font-mono uppercase tracking-wider">Hiệu quả đột phá mang lại</span>
              <p className="text-xl font-display font-bold text-gold-400">Tăng thêm {pgsLeads - currentLeads} Lead chất lượng</p>
              <p className="text-xs text-stone-400">Giảm giá tiền sắm mỗi khách hàng tiềm năng xuống ~ {Math.round((1 - pgsCpl/currentCpl) * 100)}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LỖI LANDING PAGE KHÔNG CHUYỂN ĐỔI */}
      <section 
        id="section-6" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 6 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(6)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(6); showSpecToast(sectionsData[5].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 6
          </button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">RÒ RỈ CHUYỂN ĐỔI</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">6 Lỗi Chí Tử Biến Landing Page Thành &quot;Nghĩa Trang&quot; Đốt Ngân Sách</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Headline Mơ Hồ Chung Chung", desc: "Không chạm đúng nỗi đau của khách hàng trong 3 giây đầu tiên làm họ chán nản thoát ngay.", fix: "PGS viết Headline chuẩn AIDA đi thẳng vào giải pháp cốt lõi." },
              { title: "CTA Mờ Nhạt, Đặt Sai Vị Trí", desc: "Các nút kêu gọi hành động bị chìm nghỉm, màu sắc tiệp màu nền hoặc đòi hỏi mua hàng quá sớm.", fix: "Đặt CTA vàng gold nổi bật sau khi đã giải tỏa nỗi nghi ngại của khách." },
              { title: "Biểu Mẫu Form Dài Dòng", desc: "Form đăng ký bắt khách hàng khai báo quá nhiều thứ linh tinh (địa chỉ, MST, ghi chú...).", fix: "Rút gọn form chỉ còn 3 trường cốt lõi nhất: Tên, SĐT, Vấn đề cần hỗ trợ." },
              { title: "Thiếu Thư Chứng Thực Niềm Tin", desc: "Toàn tự khen mình tốt mà không có feedback của khách cũ, logo khách hàng hợp tác thật.", fix: "Bố trí dải Trust Proof đanh thép bằng quote thật, số liệu tăng trưởng minh bạch." },
              { title: "Tốc Độ Tải Trang &quot;Rùa Bò&quot;", desc: "Nhồi nhét ảnh quá nặng khiến trang load trên 5 giây, rớt sạch khách hàng tiềm năng có mạng yếu.", fix: "Nén tối đa chuẩn WebP thế hệ mới, tối ưu hóa code sạch load dưới 1.5 giây." },
              { title: "Bỏ Quên Cài Đặt Tracking", desc: "Chạy ads rầm rộ mà không đo lường được lượt nhấp nút, cuộc gọi hay gửi form xuất phát từ đâu.", fix: "Gắn đầy đủ mã pixel tracking chuẩn nâng cao, hỗ trợ dữ liệu tối ưu tệp ads." }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl border border-stone-200 bg-stone-50/20 hover:bg-white hover:border-rose-300 transition-all">
                <div className="flex items-center gap-2 text-rose-500 mb-3">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-stone-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">{item.desc}</p>
                <div className="p-3 rounded-xl bg-gold-50/50 border border-gold-100 text-xs text-stone-700">
                  <strong className="text-gold-700">Cách PGS khắc phục:</strong> {item.fix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CẤU TRÚC LANDING PAGE CHUẨN PGS */}
      <section 
        id="section-7" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-stone-50 ${
          activeSectionId === 7 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(7)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(7); showSpecToast(sectionsData[6].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 7
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">CẤU TRÚC KỊCH BẢN ĐỘC QUYỀN</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
              Công Thức Xương Sống 10 Khối Chuyển Đổi Vàng
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Chúng tôi không sắp đặt các khối thông tin một cách tùy hứng ngẫu nhiên. Mọi vị trí đặt để trên Landing Page thiết kế bởi PGS Agency đều nương theo sự vận động tâm lý nhận thức và thuyết phục tự nhiên của bộ não khách hàng.
            </p>
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-stone-800 block uppercase">Tiến trình tâm lý chuyển đổi:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-500">Chú ý (Attention)</span>
                <span className="text-stone-300">→</span>
                <span className="px-2 py-0.5 bg-gold-50 rounded text-gold-700">Tò mò (Interest)</span>
                <span className="text-stone-300">→</span>
                <span className="px-2 py-0.5 bg-gold-100 rounded text-gold-800">Mong muốn (Desire)</span>
                <span className="text-stone-300">→</span>
                <span className="px-2 py-0.5 bg-gold-500 text-white rounded font-bold">Hành động (Action)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[360px] overflow-y-auto pr-2 border border-stone-200 rounded-2xl bg-white p-6 space-y-3 shadow-inner scrollbar-thin">
            {[
              { id: "01", title: "Hero Offer", desc: "Headline thu hút lập tức kèm CTA chốt nhanh và hình ảnh/3D đại diện cao cấp." },
              { id: "02", title: "Khơi gợi Vấn Đề (Problem Pain)", desc: "Điểm mặt những lo âu, thất thoát tài chính hay lỗi kĩ thuật mà doanh nghiệp đang gặp phải." },
              { id: "03", title: "Giải Pháp Đột Phá (Solution)", desc: "Giới thiệu bộ giải pháp thiết kế, chiến lược của PGS gạt phăng mọi vấn đề đau đầu." },
              { id: "04", title: "Lợi Ích Cốt Lõi (Key Benefits)", desc: "Mổ xẻ cụ thể khách hàng sẽ nhận được gì về tiền bạc, thời gian hay năng suất quản trị." },
              { id: "05", title: "Chứng Thực Xã Hội (Social Proof)", desc: "Trưng bày đánh giá từ khách hàng thật, logo đối tác cùng các chỉ số tăng trưởng đã chứng minh." },
              { id: "06", title: "Quy Trình Triển Khai (Workflow)", desc: "Công khai quy trình làm việc 5 bước khoa học, tốc độ, minh bạch thông tin." },
              { id: "07", title: "Gói Dịch Vụ & Ưu Đãi (Pricing)", desc: "Các gói triển khai đa dạng kèm quà tặng thiết thực thúc đẩy quyết định nhanh." },
              { id: "08", title: "Xóa Tan Nghi Ngờ (FAQ Accordion)", desc: "Hóa giải các thắc mắc về thời gian, bảo hành, bàn giao code sạch." },
              { id: "09", title: "Biểu Mẫu Chuyển Đổi (Form Lead)", desc: "Biểu mẫu thu thập siêu ngắn, bảo mật tuyệt đối đặt tại điểm rơi tâm lý chín muồi." },
              { id: "10", title: "CTA Cuối Trang (The Closing)", desc: "Lời cam kết bảo chứng đồng hành và thúc đẩy gửi đăng ký cuối cùng." }
            ].map((block) => (
              <div key={block.id} className="p-3 rounded-xl border border-stone-100 bg-stone-50 hover:border-gold-300 hover:bg-gold-50/10 transition-all flex gap-3">
                <span className="font-mono text-xs font-bold text-gold-500 self-start">{block.id}</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{block.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-normal mt-0.5">{block.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA & FORM STRATEGY */}
      <section 
        id="section-8" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 8 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(8)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(8); showSpecToast(sectionsData[7].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 8
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">BẢN ĐỒ NHIỆT CHUYỂN ĐỔI</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
              Chiến Lược CTA Đa Tầng Loại Bỏ Rào Cản Đăng Ký
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              PGS Agency phân rã các nút kêu gọi hành động (CTA) thành các phân lớp rõ rệt dọc trang đích. Chúng tôi không ép khách hàng mua hàng ngay khi họ chưa hiểu giá trị, mà đón đầu tại các điểm nóng thị giác chín muồi. Click xem thông số chuyển đổi tại mỗi tầng nóng:
            </p>

            <div className="space-y-2">
              <button 
                onClick={() => setSelectedHeatpoint('hero')}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedHeatpoint === 'hero' ? 'bg-gold-50 border-gold-300 font-bold' : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>Tầng 1: CTA Hero (Khơi Gợi Tò Mò)</span>
                <span className="font-mono text-gold-700">Tỷ lệ Click ~ 22.4%</span>
              </button>
              <button 
                onClick={() => setSelectedHeatpoint('mid')}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedHeatpoint === 'mid' ? 'bg-gold-50 border-gold-300 font-bold' : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>Tầng 2: CTA Giữa Trang (Đón Đầu Cảm Xúc Lợi Ích)</span>
                <span className="font-mono text-gold-700">Tỷ lệ Click ~ 45.1%</span>
              </button>
              <button 
                onClick={() => setSelectedHeatpoint('final')}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedHeatpoint === 'final' ? 'bg-gold-50 border-gold-300 font-bold' : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>Tầng 3: CTA Form Cuối Trang (Chốt Hạ Gửi Tin)</span>
                <span className="font-mono text-gold-700">Tỷ lệ Gửi Form ~ 32.5%</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-stone-950 p-6 rounded-2xl border border-stone-800 text-stone-400 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-2 left-2 text-[10px] font-mono text-stone-600">HEATMAP EYE-TRACKING SIMULATION</div>
            <div className="absolute -right-16 -top-16 w-36 h-36 bg-gold-500/10 rounded-full blur-3xl" />
            
            <div className="space-y-4 pt-4">
              <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">Chi tiết chuyển đổi:</span>
              
              <AnimatePresence mode="wait">
                {selectedHeatpoint === 'hero' && (
                  <motion.div key="hero" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-bold text-white">Nút CTA Đầu Trang (Hero Offer)</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">Nút kêu gọi đăng ký nhanh đặt trên nền mờ ngà hoặc mạ vàng, chỉ yêu cầu gửi số điện thoại. Đón đầu tệp khách nóng vội có sẵn nhu cầu cháy bỏng.</p>
                    <div className="inline-block px-2 py-1 bg-stone-800 rounded font-mono text-[10px] text-amber-400 border border-stone-700">CTR trung bình đạt 2.5% - 3.8% tổng traffic</div>
                  </motion.div>
                )}
                {selectedHeatpoint === 'mid' && (
                  <motion.div key="mid" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-bold text-white">Nút CTA Lợi Ích &amp; Proof (Giữa Trang)</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">Xuất hiện ngay sau khi khách hàng đã đọc xong 4 khối lợi ích cốt lõi và xem video feedback của đối tác. Đúc kết độ tin cậy rực rỡ để kích nút nhảy.</p>
                    <div className="inline-block px-2 py-1 bg-stone-800 rounded font-mono text-[10px] text-amber-400 border border-stone-700">Gia tăng tỉ lệ chốt lead gián tiếp thêm 45%</div>
                  </motion.div>
                )}
                {selectedHeatpoint === 'final' && (
                  <motion.div key="final" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-bold text-white">Biểu Mẫu Chân Trang (Final Lead Form)</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">Mặt bằng form chỉ có 3 ô trống nhập liệu tinh gọn tối thiểu, đặt sát dải bảo hành cam kết hoàn tiền. Rút ngắn tối đa thời gian cân nhắc của khách hàng.</p>
                    <div className="inline-block px-2 py-1 bg-stone-800 rounded font-mono text-[10px] text-amber-400 border border-stone-700">Conversion Rate đột phá lên tới 8% - 15%</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Heatmap Visualizer Grid */}
            <div className="mt-8 border-t border-stone-800 pt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded border transition-all ${selectedHeatpoint === 'hero' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>HERO ZONE</div>
              <div className={`p-2 rounded border transition-all ${selectedHeatpoint === 'mid' ? 'bg-orange-500/20 text-orange-300 border-orange-500' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>MID PROOF</div>
              <div className="p-2 rounded border border-stone-800 bg-stone-900 text-stone-500">PRICING</div>
              <div className={`p-2 rounded border transition-all ${selectedHeatpoint === 'final' ? 'bg-red-500/20 text-red-300 border-red-500' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>FOOTER FORM</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TRUST PROOF GẦN CTA */}
      <section 
        id="section-9" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 9 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(9)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(9); showSpecToast(sectionsData[8].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 9
          </button>
        </div>

        <div className="space-y-4 pt-6 text-center">
          <div className="space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">BẢO CHỨNG NIỀM TIN</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Bịt Mọi Lỗ Rò Phòng Vệ Tâm Lý Cuối Cùng Của Khách Hàng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl flex gap-3 items-start">
              <ShieldCheck className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Chính sách cam kết vàng</h4>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">PGS Agency cam kết hoàn tiền 100% nếu Landing Page bàn giao không đúng thiết kế kịch bản thỏa thuận.</p>
              </div>
            </div>
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl flex gap-3 items-start">
              <Award className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Chứng thực chất lượng thật</h4>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">100% đánh giá là dự án thật có tên tuổi thương hiệu, nói không với feedback giả mạo hoặc bóp méo số liệu.</p>
              </div>
            </div>
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl flex gap-3 items-start">
              <Target className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Bảo hành kĩ thuật trọn đời</h4>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">Hỗ trợ backup dữ liệu hệ thống, sửa lỗi kĩ thuật, hosting lưu trữ hoàn toàn miễn phí trọn đời vận hành.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: MOBILE-FIRST LANDING PAGE */}
      <section 
        id="section-10" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-stone-50 ${
          activeSectionId === 10 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(10)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(10); showSpecToast(sectionsData[9].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 10
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">MOBILE FIRST ERGONOMICS</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
              Tối Ưu Giao Diện Ngón Cái Trên 85% Thiết Bị Di Động
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Phần lớn agency thiết kế Landing Page trên máy tính rồi chỉ co kéo responsive tự động rất cẩu thả. Tại PGS Agency, chúng tôi thiết kế xuất phát từ màn hình điện thoại di động trước tiên, căn chỉnh hoàn hảo từng pixel cho thói quen cầm nắm một tay của người dùng thực tế.
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-600 shrink-0" /> Nút Sticky CTA bám dính đáy màn hình di động tăng 35% click.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-600 shrink-0" /> Thiết kế bàn phím tự động điền số giúp điền biểu mẫu nhanh chóng.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-600 shrink-0" /> Hình ảnh nén WebP siêu tốc giúp tải trang chỉ trong 1.2 giây dưới sóng 4G/5G.</li>
            </ul>
          </div>

          {/* Interactive Mobile Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[280px] h-[500px] border-[10px] border-stone-800 rounded-[36px] bg-white shadow-2xl relative overflow-hidden flex flex-col">
              {/* Speaker and Camera notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-800 rounded-full z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-stone-700 rounded-full mr-2" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
              </div>

              {/* Status bar */}
              <div className="bg-stone-50 pt-7 px-4 pb-1 text-[9px] font-mono flex justify-between text-stone-400 border-b border-stone-100 shrink-0">
                <span>09:41 AM</span>
                <span>📶 4G • 🔋 100%</span>
              </div>

              {/* Mobile Content (Scrollable Mock) */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none">
                <div className="p-2 bg-gold-50 border border-gold-100 rounded-xl text-center">
                  <span className="text-[7px] font-bold text-gold-700 uppercase block">PGS GROWTH DEMO</span>
                  <p className="text-[10px] font-bold text-stone-900 mt-0.5">Sách Trắng CRO Landing Page 2026</p>
                  <p className="text-[8px] text-stone-500 mt-1">Cẩm nang đột phá doanh thu quảng cáo.</p>
                </div>

                <div className="space-y-1.5">
                  <div className="w-full h-20 bg-stone-100 rounded-lg flex items-center justify-center text-[10px] text-stone-400 font-bold border border-stone-200">
                    Sản phẩm độc quyền 3D
                  </div>
                  <p className="text-[9px] text-stone-500 leading-relaxed text-center">Chỉ mất 30 giây đăng ký nhận toàn bộ tài liệu tối mật.</p>
                </div>

                {/* Simulated form on mobile */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <input type="text" placeholder="Họ và tên..." disabled className="w-full p-1.5 bg-white border border-stone-200 rounded text-[9px] cursor-not-allowed" />
                  <input type="text" placeholder="Số điện thoại..." disabled className="w-full p-1.5 bg-white border border-stone-200 rounded text-[9px] cursor-not-allowed" />
                  <button disabled className="w-full py-2 bg-gold-500 text-white rounded font-bold text-[9px] uppercase cursor-not-allowed">Gửi Yêu Cầu Tư Vấn</button>
                </div>

                <div className="h-20" /> {/* spacer */}
              </div>

              {/* Floating Mobile Sticky CTA */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2.5 border-t border-stone-100 z-20 flex gap-2">
                <a href="tel:090000000" className="flex-1 py-2 bg-stone-900 text-white font-bold text-[9px] rounded-lg text-center flex items-center justify-center gap-1">
                  📞 GỌI HOTLINE
                </a>
                <a href="#section-16" onClick={(e) => { e.preventDefault(); document.getElementById('section-16')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex-1 py-2 bg-gold-500 text-stone-950 font-bold text-[9px] rounded-lg text-center flex items-center justify-center gap-1 shadow-lg shadow-gold-500/20">
                  ⚡ ĐĂNG KÝ NGAY
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: TRACKING & A/B TESTING */}
      <section 
        id="section-11" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 11 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(11)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(11); showSpecToast(sectionsData[10].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 11
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">DỮ LIỆU THỰC CHỨNG</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
              Kiểm Thử Phân Tách A/B – Sàng Lọc Ra Sự Thật Tối Ưu
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Đừng làm marketing dựa vào phỏng đoán hay cảm tính cá nhân. PGS Agency tích hợp mã pixel đo lường chuẩn xác từng chuyển động click chuột và thiết lập hạ tầng A/B Testing so sánh kịch bản nội dung trực diện để tìm ra công thức chiến thắng vang dội nhất cho thương hiệu.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={startABTest} 
                disabled={isTesting}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 disabled:bg-stone-300 transition-all shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} /> Kích hoạt A/B Testing Mock
              </button>
            </div>
          </div>

          {/* Interactive A/B Testing Simulator Dashboard */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-6">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">PGS REAL-TIME TESTING CONSOLE</span>
            
            <div className="space-y-4">
              {/* Variant A */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-600">Trang Đích A (Website Thường/Tự Làm)</span>
                  <span className="font-mono text-stone-600">CR: 1.2%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progressA}%` }} 
                    className="bg-stone-500 h-full rounded-full" 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Mô phỏng 1000 Click</span>
                  <span className="font-bold text-stone-700">{leadsA} Leads tạo ra</span>
                </div>
              </div>

              {/* Variant B */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gold-700">Trang Đích B (Chuẩn CRO từ PGS)</span>
                  <span className="font-mono text-gold-700">CR: 5.8% (Tối Ưu Gấp 5 Lần)</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progressB}%` }} 
                    className="bg-gold-500 h-full rounded-full" 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Mô phỏng 1000 Click</span>
                  <span className="font-bold text-gold-700">{leadsB} Leads tạo ra</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-900 text-white rounded-xl text-center text-xs space-y-1">
              {isTesting ? (
                <span className="text-amber-400 animate-pulse font-mono font-bold">Dữ liệu đang chảy về máy chủ...</span>
              ) : progressA === 100 ? (
                <div>
                  <span className="text-gold-400 font-bold block uppercase">KẾT QUẢ THỬ NGHIỆM THÀNH CÔNG!</span>
                  <p className="mt-1 text-stone-300">Phương án tối ưu của PGS Agency mang lại lượng khách hàng tiềm năng <strong>gấp ~ {Math.round(leadsB / (leadsA || 1))} lần</strong>.</p>
                </div>
              ) : (
                <span className="text-stone-400">Nhấp vào nút kích hoạt phía bên trái để xem đo lường.</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: DỰ ÁN THỰC TẾ LANDING PAGE */}
      <section 
        id="section-12" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 12 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(12)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(12); showSpecToast(sectionsData[11].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 12
          </button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">THƯ VIỆN KẾT QUẢ THẬT</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Các Dự Án Đột Phá Đã Được Kiểm Nghiệm Thực Tế</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Sidebar select */}
            <div className="lg:col-span-4 space-y-2">
              {cases.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCase(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs transition-all ${
                    activeCase === idx ? 'bg-stone-900 border-stone-900 text-white font-bold' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="block opacity-60 text-[10px] uppercase font-mono">{c.industry}</span>
                  <span className="text-sm mt-1 block">{c.client}</span>
                </button>
              ))}
            </div>

            {/* Case details panel */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-6">
              <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-gold-600 uppercase">CASE STUDY TRỌNG TÂM</span>
                  <h3 className="text-lg font-bold text-stone-950 mt-1">{cases[activeCase].client}</h3>
                </div>
                <span className="px-3 py-1 bg-gold-100 text-gold-800 text-xs font-semibold rounded-full uppercase">{cases[activeCase].industry}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] font-bold text-rose-500 uppercase block">Trạng thái trước tối ưu (Before)</span>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{cases[activeCase].before}</p>
                </div>
                <div className="p-4 bg-gold-50/50 border border-gold-200 rounded-xl">
                  <span className="text-[10px] font-bold text-gold-700 uppercase block">PGS Tối Ưu Hóa (After)</span>
                  <p className="text-xs text-stone-800 mt-2 leading-relaxed">{cases[activeCase].after}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-stone-900 text-white rounded-xl">
                  <span className="text-[9px] text-stone-400 font-mono uppercase block">Tăng trưởng CR</span>
                  <p className="text-lg font-display font-bold text-gold-400 mt-1">{cases[activeCase].metrics.crIncrease}</p>
                </div>
                <div className="p-3 bg-stone-900 text-white rounded-xl">
                  <span className="text-[9px] text-stone-400 font-mono uppercase block">Cắt giảm CPL</span>
                  <p className="text-lg font-display font-bold text-green-400 mt-1">{cases[activeCase].metrics.cplDrop}</p>
                </div>
                <div className="p-3 bg-stone-900 text-white rounded-xl">
                  <span className="text-[9px] text-stone-400 font-mono uppercase block">Lead thực tế đạt</span>
                  <p className="text-lg font-display font-bold text-amber-400 mt-1">{cases[activeCase].metrics.leads}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: GÓI TRIỂN KHAI */}
      <section 
        id="section-13" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-stone-50 ${
          activeSectionId === 13 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(13)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(13); showSpecToast(sectionsData[12].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 13
          </button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">BÁO GIÁ MINH BẠCH</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Các Gói Triển Khai Landing Page Chuẩn CRO</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                name: "Landing Page Basic", 
                price: "5.000.000 đ", 
                desc: "Thích hợp kiểm nghiệm thị trường, thử nghiệm mô hình kinh doanh nhỏ lẻ.",
                features: ["Thiết kế layout theo template có sẵn", "Thời gian hoàn thiện 3 - 5 ngày", "Tối ưu hóa mobile chuẩn cơ bản", "Bảo hành kĩ thuật 1 năm", "Tặng tên miền .click miễn phí"]
              },
              { 
                name: "Landing Page Ads-Ready", 
                price: "12.000.000 đ", 
                desc: "Gói chuẩn mực cho các chiến dịch Google/Facebook/TikTok Ads chuyên sâu.",
                features: ["Thiết kế kịch bản 10 khối chuẩn PGS độc quyền", "Nghiên cứu CRO sâu sắc từ đối thủ cạnh tranh", "Thời gian hoàn thiện 5 - 7 ngày", "Cài đặt mã pixel tracking chuẩn nâng cao", "Bảo hành kĩ thuật trọn đời", "Bàn giao 100% mã nguồn code"],
                popular: true
              },
              { 
                name: "Landing Page CRO Premium", 
                price: "25.000.000 đ", 
                desc: "Đo ni đóng giày hoàn mỹ cho các thương hiệu lớn cần hiệu suất tối đa.",
                features: ["Toàn bộ tính năng gói Ads-Ready", "Hỗ trợ viết 100% content kịch bản tối ưu", "Thử nghiệm phân tách A/B Testing tiêu đề", "Tích hợp đồng bộ CRM quản lý lead tức thì", "Thời gian hoàn thiện 10 ngày", "Cam kết chỉ số Conversion Rate tối ưu"]
              }
            ].map((pkg, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-3xl border transition-all duration-300 relative ${
                  pkg.popular ? 'bg-white border-gold-500 shadow-xl scale-102 ring-1 ring-gold-400' : 'bg-white border-stone-200'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-stone-950 font-bold text-[10px] rounded-full uppercase tracking-wider">PGS Khuyên Dùng</span>
                )}
                
                <h3 className="font-display font-bold text-stone-900 text-base">{pkg.name}</h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed min-h-[40px]">{pkg.desc}</p>
                
                <div className="my-6 border-y border-stone-100 py-4">
                  <span className="text-xs text-stone-400 block font-mono">Chi phí đầu tư trọn gói</span>
                  <span className="text-2xl font-display font-bold text-gold-600">{pkg.price}</span>
                </div>

                <ul className="space-y-2 text-xs text-stone-600 min-h-[220px]">
                  {pkg.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    onSectionClick(16);
                    document.getElementById('section-16')?.scrollIntoView({ behavior: 'smooth' });
                    setFormData(prev => ({ ...prev, business: `Quan tâm gói: ${pkg.name}` }));
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all ${
                    pkg.popular ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-md' : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  Đăng ký tư vấn gói này
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: FAQ ACCORDION */}
      <section 
        id="section-14" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-white ${
          activeSectionId === 14 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(14)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(14); showSpecToast(sectionsData[13].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 14
          </button>
        </div>

        <div className="space-y-4 pt-6 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">GIẢI ĐÁP THẮC MẮC</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Câu Hỏi Thường Gặp Về Landing Page Chuẩn CRO</h2>
          </div>

          <div className="space-y-4 divide-y divide-stone-100">
            {[
              { q: "Thiết kế Landing Page tại PGS Agency mất bao lâu?", a: "Thông thường thời gian hoàn thiện một dự án thiết kế Landing Page dao động từ 5 - 10 ngày làm việc tùy thuộc hoàn toàn vào gói dịch vụ lựa chọn và mức độ phức tạp của kịch bản nội dung ngành nghề đặc thù." },
              { q: "Chúng tôi có nhận được toàn bộ mã nguồn bàn giao không?", a: "Có, PGS Agency cam kết bàn giao 100% mã nguồn code sạch sẽ tối ưu cho doanh nghiệp đối với gói Ads-Ready và CRO Premium. Bạn hoàn toàn có thể tự tải và lưu trữ trên bất kì hosting máy chủ nào tự do." },
              { q: "PGS Agency có hỗ trợ viết kịch bản nội dung (Content Copywriting) không?", a: "Có, ở các gói từ Ads-Ready trở lên, chúng tôi hỗ trợ tư vấn dàn bài kịch bản tâm lý chuẩn chỉnh. Riêng đối với gói CRO Premium, đội ngũ copywriter chuyên nghiệp của chúng tôi sẽ trực tiếp viết 100% nội dung kịch bản chữ đạt tiêu chuẩn tối ưu CRO cho doanh nghiệp." },
              { q: "Tên miền và hosting có đi kèm trọn gói không?", a: "Ở tất cả các gói dịch vụ, chúng tôi đều hỗ trợ trọn đời phí hosting lưu trữ hệ thống an toàn và tặng kèm tên miền phụ hoặc các tên miền cơ bản trong năm đầu tiên sử dụng để quý doanh nghiệp tối ưu chi phí khởi tạo ban đầu." }
            ].map((faq, idx) => (
              <div key={idx} className="pt-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left text-sm sm:text-base font-bold text-stone-900 focus:outline-none py-2"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold-600 transition-transform duration-300 ${openFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2 pb-4 pr-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: DỊCH VỤ LIÊN QUAN */}
      <section 
        id="section-15" 
        className={`p-4 rounded-3xl border transition-all duration-300 bg-stone-50 ${
          activeSectionId === 15 ? 'border-gold-500 shadow-xl glow-gold' : 'border-stone-200'
        }`}
        onClick={() => onSectionClick(15)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(15); showSpecToast(sectionsData[14].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-100 hover:bg-gold-200 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 15
          </button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="text-center space-y-3">
            <span className="text-gold-600 font-mono text-xs font-semibold tracking-wider uppercase">HỆ SINH THÁI TĂNG TRƯỞNG</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">Các Giải Pháp Marketing Tổng Lực Từ PGS Agency</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Quảng cáo Google Ads", desc: "Đưa Landing Page lên vị trí số 1 công cụ tìm kiếm Google Search và Google Display Network ngay lập tức." },
              { title: "Quảng cáo Facebook Ads", desc: "Tiếp cận tệp khách hàng tiềm năng qua hành vi sở thích chi tiết trên MXH lớn nhất Việt Nam." },
              { title: "Dịch vụ SEO Tổng Thể", desc: "Xây dựng nền móng bền vững định vị thương hiệu, thống lĩnh vị trí tìm kiếm không mất phí click." },
              { title: "Thiết kế Website Doanh Nghiệp", desc: "Giải pháp thiết kế cổng thông tin toàn diện, nhận diện thương hiệu chuẩn cao cấp." }
            ].map((service, index) => (
              <div key={index} className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-gold-400 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gold-50 text-gold-600 mb-4">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <h4 className="font-bold text-stone-950 text-xs mb-2">{service.title}</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: CTA CUỐI TRANG */}
      <section 
        id="section-16" 
        className={`p-4 rounded-3xl border transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 text-white ${
          activeSectionId === 16 ? 'border-gold-500 shadow-2xl' : 'border-stone-800'
        }`}
        onClick={() => onSectionClick(16)}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onSectionClick(16); showSpecToast(sectionsData[15].title); }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gold-300 bg-stone-800 hover:bg-stone-700 rounded-full transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Specs Section 16
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-gold-400 font-mono text-xs font-semibold tracking-wider uppercase">CAM KẾT ĐỒNG HÀNH</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold leading-tight">
              Quảng Cáo Có Lượt Click Nhưng Landing Page Chưa Ra Số?
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              Đừng để chi phí quảng cáo trôi đi vô ích thêm một ngày nào nữa. Để lại thông tin, đội ngũ chuyên gia tối ưu hóa CRO của PGS Agency sẽ gọi lại tư vấn phân tích phễu chuyển đổi miễn phí cho bạn chỉ trong 15 phút.
            </p>
            <div className="border-t border-stone-800 pt-6 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-gold-400 shrink-0" />
              <p className="text-[11px] text-stone-400">
                PGS Agency cam kết bảo mật 100% dữ liệu thông tin và nội dung chiến dịch của đối tác theo tiêu chuẩn NDA.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            {formSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-gold-500/20">
                  <Check className="w-8 h-8 text-stone-950 stroke-[3]" />
                </div>
                <h3 className="text-xl font-display font-bold text-gold-400">Gửi Đăng Ký Thành Công!</h3>
                <p className="text-xs text-stone-300 leading-relaxed px-4">
                  Chuyên gia tư vấn CRO của PGS Agency đã nhận được thông tin từ bạn và đang thiết lập tài liệu sơ đồ phân tích phễu chuyển đổi phù hợp nhất cho <strong>{formData.name}</strong>. Chúng tôi sẽ liên hệ lại qua hotline <strong>{formData.phone}</strong> trong vòng 15 phút.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', phone: '', email: '', business: '' }); }}
                    className="text-xs text-gold-300 hover:underline flex items-center gap-1.5 mx-auto"
                  >
                    <RefreshCw className="w-3 h-3" /> Gửi lại biểu mẫu khác
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">BIỂU MẪU ĐĂNG KÝ NHANH</span>
                
                <div>
                  <label className="text-[10px] font-bold text-stone-300 block uppercase mb-1">Họ và tên của bạn *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-stone-300 block uppercase mb-1">Số điện thoại liên hệ *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Ví dụ: 0912345678" 
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-300 block uppercase mb-1">Địa chỉ Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Ví dụ: name@company.vn" 
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-300 block uppercase mb-1">Gói dịch vụ quan tâm hoặc sản phẩm cần bán</label>
                  <input 
                    type="text" 
                    value={formData.business}
                    onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                    placeholder="Ví dụ: Bất động sản Vinhomes / Gói Ads-Ready..." 
                    className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-600 disabled:bg-stone-700 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Đang gửi yêu cầu...
                    </>
                  ) : (
                    <>
                      Gửi yêu cầu tư vấn CRO <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
