'use client';

import React, { useState } from 'react';
import { 
  Newspaper, ShieldCheck, CheckCircle2, ArrowRight, Search, 
  Award, Zap, TrendingUp, Layers, Send, Users, BookOpen, 
  Network, Briefcase, FileText, ChevronDown, Check, ExternalLink, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// DATA CONFIGURATIONS FOR COMPACT INGESTION
// ==========================================

const INDUSTRIES = [
  { id: 'tech', label: 'Công nghệ / SaaS', company: 'FPT Software', founder: 'Nguyễn Văn Hải', hook: 'Ứng dụng AI thế hệ mới giúp tối ưu 40% chi phí vận hành cho doanh nghiệp bán lẻ.' },
  { id: 'fmcg', label: 'FMCG / Bán lẻ', company: 'Organic Foods VN', founder: 'Trần Thị Mai', hook: 'Xu hướng tiêu dùng xanh bùng nổ: Câu chuyện startup Việt đưa nông sản organic đạt chuẩn quốc tế.' },
  { id: 'b2b', label: 'B2B / Logistics', company: 'VinaLogistics', founder: 'Lê Hoàng Long', hook: 'Lời giải cho bài toán đứt gãy chuỗi cung ứng: Hệ sinh thái vận tải liên kết đa phương thức.' },
  { id: 'edu', label: 'Giáo dục / EdTech', company: 'V-Academy', founder: 'Phạm Minh Đức', hook: 'Chuyển đổi số giáo dục: Khi trải nghiệm học tập cá nhân hóa bằng dữ liệu lớn lên ngôi.' }
];

const COMPARISON_DATA = [
  { metric: 'Mục tiêu chính', ads: 'Tạo doanh số tức thì qua lượt click trực tiếp', pr: 'Xây dựng uy tín bền vững & định vị thương hiệu đầu ngành' },
  { metric: 'Chỉ số niềm tin (Trust)', ads: 'Thấp - Khách hàng luôn biết đó là bài quảng cáo tự mua', pr: 'Cực cao - Được bảo chứng bởi bên thứ ba (Báo chí chính thống)' },
  { metric: 'Tác động chuyển đổi', ads: 'Giảm dần khi tắt ngân sách chạy quảng cáo', pr: 'Tăng trưởng lũy tiến nhờ SEO Entity & niềm tin dài hạn' },
  { metric: 'Hiệu quả SEO & Entity', ads: 'Không đóng góp vào chỉ số uy tín SEO kỹ thuật', pr: 'Cực mạnh - Cung cấp backlink chất lượng cao, xác thực Entity' },
  { metric: 'Chi phí dài hạn', ads: 'Tăng liên tục do cạnh tranh thầu quảng cáo', pr: 'Tối ưu - Bài viết tồn tại vĩnh viễn, mang lại lượng truy cập tự nhiên' }
];

const PR_TYPES = [
  {
    id: 'enterprise',
    title: 'PR Doanh Nghiệp',
    desc: 'Khẳng định vị thế thương hiệu thông qua các cột mốc phát triển, giải thưởng, và đóng góp xã hội.',
    sample: 'Góc tin tức toàn cảnh thị trường → Khó khăn chung → Sự đột phá từ giải pháp công nghệ của doanh nghiệp.',
    channel: 'VnExpress, CafeF, VietnamNet'
  },
  {
    id: 'ceo',
    title: 'PR Định Vị CEO / Founder',
    desc: 'Xây dựng hình ảnh chuyên gia, truyền cảm hứng qua câu chuyện khởi nghiệp và quan điểm quản trị tầm nhìn.',
    sample: 'Triết lý kinh doanh xuất phát từ nỗi đau thị trường → Chân dung nhà lãnh đạo tư duy chiến lược.',
    channel: 'CafeBiz, Forbes Vietnam, Brands Vietnam'
  },
  {
    id: 'product',
    title: 'PR Ra Mắt Sản Phẩm/Dịch Vụ',
    desc: 'Thu hút sự chú ý của thị trường, phân tích tính năng vượt trội bằng các góc nhìn khoa học khách quan.',
    sample: 'Vấn đề nhức nhối của người tiêu dùng → Các nghiên cứu hiện tại → Sự xuất hiện của sản phẩm giải quyết triệt để.',
    channel: 'Tuổi Trẻ, Dân Trí, Kênh 14'
  },
  {
    id: 'expert',
    title: 'PR Góc Nhìn Chuyên Gia',
    desc: 'Đưa ý kiến chuyên sâu về xu hướng ngành để khẳng định chuyên môn dẫn đầu của doanh nghiệp.',
    sample: 'Nhận định xu hướng 2026-2027 → Phân tích kỹ thuật của chuyên gia PGS Agency → Khuyến nghị thực thi.',
    channel: 'Đầu Tư, Nhịp Cầu Đầu Tư, Saigon Times'
  }
];

const ANATOMY_STEPS = [
  { id: 'title', label: 'Tiêu đề (Headline)', desc: 'Chứa từ khóa chính, góc tin tức khách quan, giật tít tinh tế không clickbait, độ dài 10-13 từ để tối ưu SEO.', position: 'top' },
  { id: 'sapo', label: 'Đoạn dẫn nhập (Sapo)', desc: 'Tóm tắt thông tin quan trọng nhất, giải quyết câu hỏi 5W1H ngắn gọn, kích thích người đọc cuộn chuột xem tiếp.', position: 'middle' },
  { id: 'body', label: 'Thân bài & Trích dẫn', desc: 'Trình bày giải pháp cốt lõi kết hợp phát ngôn (quote) sắc bén của CEO/Chuyên gia để tăng tính pháp lý và tin cậy.', position: 'middle-low' },
  { id: 'entity', label: 'Liên kết Entity (Backlink)', desc: 'Chèn text link định danh thương hiệu hướng về website chính chủ để Google ghi nhận dòng chảy uy tín.', position: 'low' },
  { id: 'cta', label: 'Kêu gọi hành động (CTA)', desc: 'Thông tin liên hệ minh bạch, địa chỉ, hotline và link đăng ký dùng thử tinh tế ở cuối bài.', position: 'bottom' }
];

const PROCESS_STEPS = [
  { step: '01', title: 'Khảo sát & Nghiên cứu', desc: 'Phân tích thực trạng thương hiệu, đối thủ, tệp độc giả mục tiêu và bộ từ khóa SEO Entity cần phủ sóng.' },
  { step: '02', title: 'Xây dựng Thông điệp chính', desc: 'Xác định Key Message độc bản, chọn góc tiếp cận báo chí (Góc tin tức, Góc chuyên môn, Góc câu chuyện doanh nghiệp).' },
  { step: '03', title: 'Lên Outline & Duyệt Kênh', desc: 'Đề xuất danh sách đầu báo đăng phù hợp nhất (VnExpress, CafeF, Tuổi Trẻ...) và dàn ý chi tiết bài viết.' },
  { step: '04', title: 'Biên soạn Nội dung', desc: 'Copywriter chuẩn báo chí viết bài, chèn link Entity khéo léo, tối ưu hóa từ khóa và cấu trúc đọc lướt chuẩn SEO.' },
  { step: '05', title: 'Kiểm duyệt & Tối ưu EEAT', desc: 'Trình duyệt khách hàng, chỉnh sửa câu chữ chặt chẽ, tối ưu hóa định dạng để đạt chuẩn tin cậy của ban biên tập.' },
  { step: '06', title: 'Xuất bản & Tái sử dụng', desc: 'Đăng bài trên báo chính thống, khai thác làm Sales Kit, chia sẻ mạng xã hội và cập nhật Entity Google Business Profile.' }
];

const CASES = [
  {
    client: 'FinTech Growth Việt Nam',
    type: 'PR Định Vị Founder & Giải Pháp',
    metric1: '+220% Brand Search',
    metric2: 'Top 1 Google Keyword',
    desc: 'Xây dựng loạt bài PR chuyên sâu trên CafeF và VnExpress giúp định danh thương hiệu là đơn vị tiên phong về AI FinTech tại Việt Nam.',
    quote: '"Các bài viết PR từ PGS giúp sales kit của chúng tôi thuyết phục hơn 80% khách hàng doanh nghiệp lớn."',
    logo: 'https://picsum.photos/seed/finance/120/40'
  },
  {
    client: 'Logistics Toàn Cầu V-Ship',
    type: 'PR Doanh Nghiệp & Tăng Trưởng B2B',
    metric1: '+45% B2B Lead Mới',
    metric2: 'Entity Xác Minh Hoàn Toàn',
    desc: 'Triển khai chuỗi bài PR phân tích năng lực vận tải liên kết đa phương thức giúp doanh nghiệp lọt vào tầm ngắm của các tập đoàn xuất nhập khẩu.',
    quote: '"Uy tín doanh nghiệp tăng vọt. Đối tác nước ngoài tìm kiếm chúng tôi trên Google và thấy thông tin phủ rộng khắp."',
    logo: 'https://picsum.photos/seed/logistic/120/40'
  }
];

const PACKAGES = [
  {
    name: 'Gói Uy Tín Khởi Đầu (Starter PR)',
    price: '18.500.000 VNĐ',
    desc: 'Phù hợp doanh nghiệp SME muốn định danh thương hiệu ban đầu và xây dựng Entity SEO nền tảng.',
    features: [
      '02 bài viết PR chuẩn báo chí (800 - 1000 từ)',
      'Đăng tải trên 02 đầu báo uy tín nhóm B (VietnamNet, Đất Việt, Tin Tức)',
      'Tối ưu hóa SEO Entity & chèn 01 link chính danh về website',
      'Hỗ trợ lập chỉ mục Google nhanh (Index bài PR)',
      'Báo cáo đo lường hiệu quả chuyển đổi từ PGS'
    ]
  },
  {
    name: 'Gói Thẩm Quyền Thương Hiệu (Authority)',
    price: '45.000.000 VNĐ',
    desc: 'Lựa chọn tốt nhất để khẳng định uy tín vượt trội, tối ưu hóa EEAT cho SEO và tăng trưởng Lead.',
    features: [
      '04 bài viết PR cao cấp (Enterprise / Chuyên gia)',
      'Đăng tải trên đầu báo hàng đầu nhóm A (VnExpress, CafeF, Tuổi Trẻ)',
      'Phỏng vấn trực tiếp đại diện doanh nghiệp hoặc CEO',
      'Đồng bộ hóa Entity (Website - Báo chí - Mạng xã hội)',
      'Tái thiết kế bài PR thành Sales Kit chuyển đổi cao'
    ],
    popular: true
  },
  {
    name: 'Gói Định Vị CEO & Founder (Elite Profile)',
    price: '72.000.000 VNĐ',
    desc: 'Đặc quyền xây dựng thương hiệu cá nhân đỉnh cao cho Ban lãnh đạo để hỗ trợ các vòng gọi vốn hoặc mở rộng đại lý.',
    features: [
      '05 bài viết chuyên sâu dạng chân dung và nhận định ngành',
      'Đăng tải trên báo Kinh tế & Doanh nhân (CafeBiz, Forbes, Đầu Tư)',
      'Sáng tạo kịch bản định vị thông điệp cốt lõi độc bản',
      'Phủ sóng mạng lưới Mention liên kết chéo CEO - Doanh nghiệp',
      'Tư vấn tối ưu hóa hồ sơ LinkedIn cá nhân đồng bộ'
    ]
  }
];

const FAQS = [
  {
    q: 'Bài PR báo chí có thực sự giúp tăng thứ hạng từ khóa trên Google không?',
    a: 'Có, cực kỳ hiệu quả thông qua cơ chế Entity & Off-page SEO. Bài đăng trên các đầu báo lớn như VnExpress, CafeF có Domain Authority rất cao. Khi Google quét các liên kết tự nhiên (backlink) và tên thương hiệu của bạn được nhắc đến cạnh các từ khóa ngành trên báo lớn, Google sẽ hiểu website của bạn là nguồn thông tin đáng tin cậy (EEAT), từ đó đẩy thứ hạng tìm kiếm tự nhiên lên nhanh chóng.'
  },
  {
    q: 'PGS Agency có cam kết bài viết được đăng tải thành công không?',
    a: 'Chúng tôi cam kết 100% bài viết được duyệt đăng đúng tiến độ và đúng các kênh báo đã thỏa thuận trong hợp đồng. Nhờ quy trình biên tập khắt khe chuẩn báo chí của đội ngũ PGS (hầu hết là các cựu nhà báo và biên tập viên giàu kinh nghiệm), tỷ lệ duyệt bài ngay từ vòng đầu của chúng tôi đạt hơn 95%.'
  },
  {
    q: 'Doanh nghiệp của tôi còn rất mới, có viết bài PR được không?',
    a: 'Hoàn toàn viết được. Điểm mấu chốt của PR không phải là khoe quy mô lớn, mà là chọn "góc tiếp cận" (Angle) khôn ngoan. PGS Agency sẽ giúp startup khai thác các góc độ độc đáo như: Giải pháp giải quyết nỗi đau mới của thị trường, câu chuyện vượt khó của Founder, sự khác biệt trong công nghệ cốt lõi hoặc xu hướng tiêu dùng mới.'
  },
  {
    q: 'Thời gian từ lúc lập kế hoạch đến khi bài lên báo mất bao lâu?',
    a: 'Thông thường quy trình trọn gói từ nghiên cứu, lên outline, viết bài, khách hàng duyệt, ban biên tập báo duyệt đến khi xuất bản chính thức sẽ mất khoảng 7 đến 10 ngày làm việc. Với các chiến dịch khẩn cấp hoặc sự kiện ra mắt, PGS có thể tối ưu tiến độ xuống còn 3 đến 5 ngày.'
  }
];

export default function PRServicePage() {
  // Interactive hooks for Hook Generator
  const [selectedIndustry, setSelectedIndustry] = useState('tech');
  const [companyName, setCompanyName] = useState('PGS SmartTech');
  const [founderName, setFounderName] = useState('Nguyễn Tiến Phát');
  
  // Interactive hooks for Comparison Board
  const [compHighlight, setCompHighlight] = useState<string | null>(null);

  // Interactive hooks for PR Types Outline Model
  const [activeType, setActiveType] = useState('enterprise');

  // Interactive hooks for Anatomy Showcase
  const [selectedAnatomy, setSelectedAnatomy] = useState('title');

  // Interactive hooks for Brand Mention Network
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [networkActive, setNetworkActive] = useState<boolean>(true);

  // Interactive hooks for Package customizer
  const [customArticles, setCustomArticles] = useState(3);
  const [customTier, setCustomTier] = useState<'A' | 'B'>('A');

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form Lead Hook
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    industry: 'tech',
    message: ''
  });

  const getGeneratedHook = () => {
    const ind = INDUSTRIES.find(i => i.id === selectedIndustry) || INDUSTRIES[0];
    return {
      title: `[Góc Báo Chí] Cách ${companyName} Định Hình Lại Thị Trường Bằng Giải Pháp Đột Phá`,
      sapo: `Trong bối cảnh biến động kinh tế mạnh mẽ, sự xuất hiện của những nhà sáng lập trẻ như ông/bà ${founderName} mang lại làn gió mới. ${ind.hook}`,
      channel: `Thích hợp đăng tải trên: ${selectedIndustry === 'tech' ? 'CafeF / VnExpress Số Hóa' : 'VietnamNet / Brands Vietnam'}`
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  const getCustomizedPrice = () => {
    const basePerArticle = customTier === 'A' ? 11500000 : 7500000;
    const baseCost = customArticles * basePerArticle;
    // Add volume discount
    const discount = customArticles >= 5 ? 0.9 : 1.0;
    return Math.round(baseCost * discount).toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <div className="w-full relative overflow-x-hidden text-stone-800 bg-stone-50/40">
      
      {/* HEADER SECTION (Light Premium Navigation) */}
      

      {/* SECTION 1: HERO AUTHORITY WALL */}
      <section className="relative pt-12 pb-20 md:py-28 overflow-hidden bg-gradient-to-b from-stone-100/60 to-white" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copywrite */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Giải Pháp Định Danh Thương Hiệu Số 1 VN</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-stone-900 leading-tight" id="main_hero_title">
                Dịch vụ PR báo chí & truyền thông thương hiệu giúp doanh nghiệp <span className="text-amber-600 relative inline-block">xây dựng uy tín<span className="absolute bottom-1 left-0 w-full h-1 bg-amber-200 -z-10"></span></span> và niềm tin trên môi trường số.
              </h1>
              
              <p className="text-lg text-stone-600 max-w-2xl font-light">
                Không đơn thuần là mua bài viết đăng báo rời rạc. PGS Agency xây dựng hệ sinh thái <strong className="font-semibold text-stone-900">Brand Mention Network</strong> liên kết chặt chẽ giúp xác thực Entity Google, gia tăng đáng kể chỉ số EEAT SEO, nâng tầm uy tín CEO và tối ưu hóa tỷ lệ chuyển đổi Lead thật.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-center rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center space-x-2"
                  id="hero_primary_cta"
                >
                  <span>Tư vấn nội dung PR cho thương hiệu</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#packages" 
                  className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-center rounded-xl border border-stone-200 hover:border-amber-500 transition-all duration-300"
                  id="hero_secondary_cta"
                >
                  Xem bảng giá chi tiết
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-100">
                <div>
                  <span className="block text-2xl font-display font-bold text-stone-900">+50+</span>
                  <span className="text-xs text-stone-500">Đầu báo chính thống</span>
                </div>
                <div>
                  <span className="block text-2xl font-display font-bold text-stone-900">100%</span>
                  <span className="text-xs text-stone-500">Index Google Entity</span>
                </div>
                <div>
                  <span className="block text-2xl font-display font-bold text-stone-900">+250%</span>
                  <span className="text-xs text-stone-500">Tỷ lệ tin tưởng trung bình</span>
                </div>
              </div>
            </div>

            {/* Right Widget: Simulated Interactive "Press Wall 3D" & PR Hook Generator */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div className="flex items-center space-x-2">
                    <Newspaper className="w-5 h-5 text-amber-500" />
                    <span className="font-display font-bold text-stone-950 text-sm">HỘP THỬ NGHIỆM GÓC PR ĐỘC QUYỀN</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">PGS Engine v1</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5">1. CHỌN NGÀNH NGHỀ KINH DOANH</label>
                    <div className="grid grid-cols-2 gap-2">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => setSelectedIndustry(ind.id)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all border ${
                            selectedIndustry === ind.id 
                              ? 'bg-amber-500/10 border-amber-400 text-stone-900 font-bold' 
                              : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">TÊN DOANH NGHIỆP</label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">FOUNDER / ĐẠI DIỆN</label>
                      <input 
                        type="text" 
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-stone-950 text-white rounded-xl space-y-3 shadow-inner relative">
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-amber-400 font-bold block">XUẤT BẢN THỬ NGHIỆM</span>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-amber-300 font-display line-clamp-2 leading-snug">
                        {getGeneratedHook().title}
                      </h4>
                      <p className="text-[10px] text-stone-300 font-light leading-relaxed italic line-clamp-3">
                        &ldquo;{getGeneratedHook().sapo}&rdquo;
                      </p>
                    </div>
                    <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[9px] text-stone-400 font-mono">
                      <span>{getGeneratedHook().channel}</span>
                      <span className="text-amber-400">#PGS_PR</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[11px] text-stone-400">
                    *Mỗi dự án thật tại PGS Agency đều được lên chiến lược góc viết cá nhân hóa chuyên biệt.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Ambient background designs (Authority Wall mesh) */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] opacity-40 -z-10"></div>
      </section>

      {/* SECTION 2: PR BÁO CHÍ LÀ GÌ? */}
      <section className="py-20 bg-white" id="definition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual newspaper mockup */}
            <div className="relative">
              <div className="bg-stone-100 rounded-3xl p-4 sm:p-8 border border-stone-200">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
                  <div className="bg-stone-900 px-4 py-3 text-white flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    </span>
                    <span>TRANG TIN DOANH NHÂN & PHÁT TRIỂN</span>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-[10px] text-stone-400 font-mono">
                      <span>CHUYÊN MỤC: DIỄN ĐÀN KHỞI NGHIỆP</span>
                      <span>•</span>
                      <span>01/07/2026</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 leading-tight">
                      Làn Sóng Số 5.0 Và Chiến Lược Tăng Trưởng Doanh Thu Bằng Thực Thể Entity
                    </h3>

                    <div className="flex items-center space-x-3 py-2 border-y border-stone-100">
                      <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center font-bold text-amber-700 text-xs">
                        PGS
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">PGS Agency Insights</p>
                        <p className="text-[10px] text-stone-400">Đơn vị tư vấn tăng trưởng số</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-serif bg-stone-50 p-3 rounded-lg border-l-2 border-amber-500">
                      Sự tin cậy (Trust) đang trở thành đồng tiền chung đắt giá nhất của doanh nghiệp trên Internet. Đại diện PGS Agency nhận định: &ldquo;Quảng cáo giúp bán được hàng hôm nay, nhưng PR xây dựng dòng chảy doanh thu ổn định cho ngày mai.&rdquo;
                    </p>

                    <div className="h-28 bg-stone-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/5 transition-all"></div>
                      <span className="text-xs text-stone-500 font-mono z-10">[Hình ảnh đại diện thương hiệu chuẩn truyền thông]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Column */}
            <div className="space-y-6">
              <div className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">01. BẢN CHẤT DỊCH VỤ</div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">PR Báo Chí Thực Chất Là Gì?</h2>
              
              <p className="text-stone-600 leading-relaxed font-light">
                PR (Public Relations) báo chí không phải là mua những trang tin quảng cáo rẻ tiền để tự tâng bốc sản phẩm. Đó là nghệ thuật <strong className="font-medium text-stone-900">định hướng thông tin có chiến lược</strong>.
              </p>
              
              <p className="text-stone-600 leading-relaxed font-light">
                Bằng cách khai thác các sự kiện có giá trị tin tức thật sự, PGS Agency giúp thương hiệu của bạn xuất hiện trên các trang báo chính thống danh giá dưới tư cách một <strong className="font-medium text-amber-700">chuyên gia giải quyết vấn đề của xã hội</strong>. Khán giả tiếp nhận thông tin một cách khách quan, tự nhiên và trao trọn niềm tin tuyệt đối cho doanh nghiệp.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-amber-100 text-amber-700 p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-stone-900 block">Nội dung có giá trị tin tức (News Value):</strong>
                    <span className="text-xs text-stone-500">Được biên soạn bởi cựu nhà báo chuyên nghiệp để lọt qua bộ lọc khắt khe của tòa soạn.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-amber-100 text-amber-700 p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-stone-900 block">Sự bảo chứng từ bên thứ ba khách quan:</strong>
                    <span className="text-xs text-stone-500">Giúp biến nghi ngờ của khách hàng thành sự công nhận và tin tưởng hoàn toàn.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: VÌ SAO PR QUAN TRỌNG VỚI TRUST, SEO VÀ ENTITY */}
      <section className="py-20 bg-stone-100/50" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">02. KHÁC BIỆT KỸ THUẬT</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Vì Sao PR Báo Chí Là Xương Sống Của Hệ Thống SEO Entity & EEAT?</h2>
            <p className="text-sm text-stone-600 font-light">
              Google hiện đại không còn chỉ đánh giá backlink đơn giản. Thuật toán tìm kiếm sử dụng EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) để quét xem thương hiệu của bạn có &ldquo;thực sự tồn tại&rdquo; và &ldquo;có tầm ảnh hưởng rộng lớn&rdquo; hay không.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: EEAT Authority */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-900 mb-2">Đạt Điểm EEAT Google</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Google chấm điểm uy tín tối đa cho website của bạn khi liên tục nhận được nhắc nhở thương hiệu (Brand Mentions) từ các tờ báo thuộc cơ quan chính phủ và kinh tế lớn nhất.
              </p>
            </div>

            {/* Box 2: Entity Validation */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-900 mb-2">Xác Thực Entity Số</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Giúp thuật toán của Google định nghĩa rõ ràng: Bạn là ai, thuộc ngành nào, chuyên gia của bạn là ai, kết nối chặt chẽ dữ liệu của doanh nghiệp trên toàn không gian số.
              </p>
            </div>

            {/* Box 3: High-Quality Backlink */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-900 mb-2">Backlink Báo Chí Chất Lượng</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Liên kết đặt trên báo lớn mang dòng chảy sức mạnh (PageRank) khổng lồ về website của bạn, giúp từ khóa cốt lõi nhảy vọt lên trang 1 Google bền vững.
              </p>
            </div>

            {/* Box 4: Sales Kit & Conversion */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-900 mb-2">Tư Liệu Vàng Cho Sales</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Không gì thuyết phục khách hàng B2B hoặc đối tác nhanh hơn việc đính kèm logo và link bài viết của các tờ báo uy tín bậc nhất vào Hồ sơ năng lực (Sales Kit) của bạn.
              </p>
            </div>

          </div>

          {/* Interactive Calculator: Trust Level Estimator */}
          <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
            <h4 className="font-display font-bold text-stone-900 mb-4 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
              <span>Đo Lường Uy Tín Tìm Kiếm: Công cụ Ước Tính Độ Tin Cậy Entity</span>
            </h4>
            
            <p className="text-xs text-stone-500 mb-6">
              Chọn mức độ phủ sóng thương hiệu hiện tại để xem Google và khách hàng nhìn nhận doanh nghiệp của bạn ở cấp độ nào:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-4">
                <span className="text-[11px] font-semibold text-stone-400 block uppercase">1. Trạng thái hiện tại của website</span>
                <div className="space-y-2">
                  <button className="w-full p-3 text-xs text-left rounded-lg border border-amber-500 bg-amber-500/5 font-medium">
                    Chỉ có Web, chưa có bài PR báo chí nào
                  </button>
                  <button className="w-full p-3 text-xs text-left rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50">
                    Đã có bài PR nhỏ lẻ, chưa đồng bộ Entity
                  </button>
                  <button className="w-full p-3 text-xs text-left rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50">
                    Có PR báo lớn và đồng bộ MXH hoàn chỉnh
                  </button>
                </div>
              </div>

              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/60 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-stone-400 block uppercase">2. Đánh giá từ thuật toán PGS</span>
                <div className="space-y-2 py-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">Chỉ số Trust Score (EEAT):</span>
                    <span className="font-bold text-red-500">15/100 (Cực Thấp)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">Khả năng xác minh Entity:</span>
                    <span className="font-bold text-red-500">Khó định danh</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">Khả năng SEO bứt phá từ khóa khó:</span>
                    <span className="font-bold text-stone-600">Dưới 10%</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 leading-normal">
                  *Do thiếu vắng các nguồn tham chiếu uy tín bên thứ ba, website của bạn sẽ bị giới hạn phân phối tìm kiếm tự nhiên.
                </p>
              </div>

              <div className="bg-amber-500/5 p-5 rounded-xl border border-amber-500/20 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-amber-800 block uppercase">3. Đề xuất PGS để cải thiện</span>
                <div className="space-y-2 py-3">
                  <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                    Nên bổ sung ngay tối thiểu 3 bài viết PR Entity chất lượng cao đăng tại CafeF/VnExpress kết nối chặt chẽ Schema Markup.
                  </p>
                  <p className="text-[11px] text-amber-700">
                    Giúp tăng Trust Score lên trên <strong className="font-bold text-amber-800">75/100</strong> trong vòng 30 ngày.
                  </p>
                </div>
                <a href="#contact" className="text-xs font-bold text-amber-700 flex items-center space-x-1 hover:underline">
                  <span>Yêu cầu tư vấn lộ trình</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: PR KHÁC QUẢNG CÁO */}
      <section className="py-20 bg-white" id="comparison">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">03. BÀI TOÁN TỐI ƯU CHI PHÍ</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Sự Khác Biệt Giữa PR Báo Chí Và Chạy Quảng Cáo Đơn Thuần</h2>
            <p className="text-sm text-stone-600 font-light">
              Nhiều doanh nghiệp đốt hàng trăm triệu vào quảng cáo hiển thị nhưng không mang lại niềm tin bền vững. Hãy xem bảng so sánh khoa học dưới đây.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-stone-900 text-white font-display text-sm">
                  <th className="p-4 sm:p-5 font-semibold">Thuộc Tính So Sánh</th>
                  <th className="p-4 sm:p-5 font-semibold bg-stone-800 text-amber-400">Chạy Quảng Cáo (Facebook/Google Ads)</th>
                  <th className="p-4 sm:p-5 font-semibold text-amber-300">PR Báo Chí Thực Thể (PGS Strategy)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {COMPARISON_DATA.map((item, idx) => (
                  <tr 
                    key={idx}
                    onMouseEnter={() => setCompHighlight(item.metric)}
                    onMouseLeave={() => setCompHighlight(null)}
                    className={`transition-colors duration-150 text-xs sm:text-sm ${
                      compHighlight === item.metric ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-stone-900">{item.metric}</td>
                    <td className="p-4 sm:p-5 text-stone-600 bg-stone-50/50">{item.ads}</td>
                    <td className="p-4 sm:p-5 text-stone-900 font-medium">{item.pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <p className="text-xs text-stone-500 leading-relaxed">
              💡 <strong>Kết luận của chuyên gia PGS Agency:</strong> Không nên coi PR và Quảng cáo là đối đầu. Quảng cáo là mũi tên tấn công nhanh, nhưng <strong>PR báo chí chính là tấm khiên vững chắc</strong> đảm bảo mọi lượt truy cập từ quảng cáo đều biến thành chuyển đổi nhờ uy tín thương hiệu vững vàng.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: KHI NÀO NÊN TRIỂN KHAI PR */}
      <section className="py-20 bg-stone-50" id="timing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">04. THỜI ĐIỂM VÀNG</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Khi Nào Thương Hiệu Của Bạn Cần Đột Phá Bằng PR Báo Chí?</h2>
            <p className="text-sm text-stone-600 font-light">
              Mỗi giai đoạn phát triển đòi hỏi cách thức truyền thông khác nhau. Hãy rà soát xem doanh nghiệp của bạn có đang ở các mốc quan trọng này:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all">
              <span className="text-amber-600 font-mono font-bold text-lg block mb-2">Giai đoạn 01</span>
              <h3 className="font-display font-bold text-stone-900 text-base mb-2">Ra Mắt Sản Phẩm / Thương Hiệu Mới</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Doanh nghiệp mới tinh chưa có bất kỳ dữ liệu định danh nào trên mạng. PR báo chí giúp tạo nền móng Entity, giúp khách hàng tìm kiếm tên thương hiệu thấy ngay hàng loạt bài báo uy tín kiểm duyệt.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all">
              <span className="text-amber-600 font-mono font-bold text-lg block mb-2">Giai đoạn 02</span>
              <h3 className="font-display font-bold text-stone-900 text-base mb-2">CEO & Ban Lãnh Đạo Xây Nhân Hiệu</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Khi bán hàng B2B hoặc huy động vốn, đối tác đầu tư luôn tìm kiếm danh tiếng của người đứng đầu. Một bộ hồ sơ PR CEO chuyên sâu trên CafeBiz, Brands Vietnam là tài sản vô giá thúc đẩy thành công.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all">
              <span className="text-amber-600 font-mono font-bold text-lg block mb-2">Giai đoạn 03</span>
              <h3 className="font-display font-bold text-stone-900 text-base mb-2">Bị Giới Hạn Tốc Độ SEO Website</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Khi website SEO của bạn bị chững lại ở trang 2 hoặc trang 3 do thiếu vắng điểm EEAT và tín hiệu tìm kiếm thương hiệu tự nhiên (Brand Search). Bơm thêm thực thể PR giúp Google lập tức tháo gỡ giới hạn.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CÁC LOẠI BÀI PR PGS TRIỂN KHAI */}
      <section className="py-20 bg-white" id="types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">05. GIẢI PHÁP PGS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Các Loại Hình Bài PR Chuyên Biệt Do PGS Agency Thiết Kế</h2>
            <p className="text-sm text-stone-600 font-light">
              Chúng tôi không viết chung chung. Mỗi loại bài được tinh chỉnh cấu trúc riêng biệt để tối đa hóa tỷ lệ đọc hết và chuyển đổi. Click để xem chi tiết từng loại bài.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Buttons list */}
            <div className="lg:col-span-5 space-y-3">
              {PR_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`w-full p-5 text-left rounded-xl transition-all border flex items-center justify-between ${
                    activeType === type.id 
                      ? 'bg-amber-500/10 border-amber-400 shadow-xs' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100/70'
                  }`}
                >
                  <div>
                    <h4 className="font-display font-bold text-stone-900 text-sm">{type.title}</h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">{type.desc}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-amber-600 transition-transform ${activeType === type.id ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Display active card details */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {PR_TYPES.map((type) => type.id === activeType && (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="bg-stone-50 border border-stone-200 p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <span className="text-xs uppercase font-mono tracking-widest text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
                        PHÂN TÍCH CHUYÊN MÔN PGS
                      </span>
                      <h3 className="text-2xl font-display font-bold text-stone-900">{type.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed font-light">{type.desc}</p>
                      
                      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-inner">
                        <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block mb-1">MÔ HÌNH DÀN Ý CHUẨN</span>
                        <p className="text-xs text-stone-700 leading-relaxed italic">
                          &ldquo;{type.sample}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 block">KÊNH ĐẦU BÁO ĐỀ XUẤT</span>
                        <span className="text-xs font-semibold text-stone-800">{type.channel}</span>
                      </div>
                      <a 
                        href="#contact" 
                        className="px-5 py-2.5 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-medium text-xs rounded-lg text-center transition-all"
                      >
                        Yêu cầu lên sườn nội dung mẫu
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: QUY TRÌNH XÂY DỰNG THÔNG ĐIỆP PR */}
      <section className="py-20 bg-stone-50" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">06. QUY TRÌNH THỰC THI</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Quy Trình 6 Bước Xây Dựng & Xuất Bản Thông Điệp PR Đạt Chuẩn</h2>
            <p className="text-sm text-stone-600 font-light">
              Để bảo chứng cho tỷ lệ duyệt đăng cực cao và đem lại giá trị chuyển đổi thật, mọi bài viết tại PGS Agency đều trải qua chu trình nghiêm ngặt:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
                <span className="absolute right-4 top-2 text-6xl font-display font-bold text-stone-100 select-none">
                  {step.step}
                </span>
                <div className="relative z-10 space-y-2 mt-4">
                  <h3 className="font-display font-bold text-stone-900 text-lg">{step.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CẤU TRÚC BÀI PR CHUẨN PGS */}
      <section className="py-20 bg-white" id="anatomy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copywrite left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">07. GIẢI PHẪU THỰC TẾ</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Cấu Trúc Bài PR Chuẩn PGS Tối Ưu Chuyển Đổi</h2>
              <p className="text-stone-600 leading-relaxed font-light">
                Bài PR tệ hại là bài viết nhồi nhét từ khóa thô thiển khiến độc giả lập tức thoát trang sau 5 giây. 
              </p>
              <p className="text-stone-600 leading-relaxed font-light">
                PGS Agency áp dụng kiến trúc bài PR hiện đại, phân tách dòng chảy đọc lướt để giữ chân người xem tối đa và dẫn hướng chuyển đổi cực kỳ mượt mà.
              </p>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-stone-400">CHỌN PHẦN CỦA BÀI VIẾT ĐỂ XEM QUY LUẬT THIẾT KẾ:</p>
                <div className="flex flex-wrap gap-1.5">
                  {ANATOMY_STEPS.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setSelectedAnatomy(step.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        selectedAnatomy === step.id 
                          ? 'bg-stone-900 text-amber-400' 
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Simulated Article layout */}
            <div className="lg:col-span-7">
              <div className="bg-stone-100 p-6 rounded-3xl border border-stone-200/80">
                <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border border-stone-100">
                  
                  {/* Title */}
                  <div 
                    onClick={() => setSelectedAnatomy('title')}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedAnatomy === 'title' ? 'border-amber-500 bg-amber-500/5' : 'border-dashed border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-700 font-bold block mb-1">TIÊU ĐỀ (HEADLINE) - CLICKS QUYẾT ĐỊNH</span>
                    <h4 className="text-base font-bold text-stone-900">Doanh Nghiệp Đột Phá Chuỗi Cung Ứng Bằng Hệ Thống Tự Động Hóa Thực Thể</h4>
                  </div>

                  {/* Sapo */}
                  <div 
                    onClick={() => setSelectedAnatomy('sapo')}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedAnatomy === 'sapo' ? 'border-amber-500 bg-amber-500/5' : 'border-dashed border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-700 font-bold block mb-1">ĐOẠN DẪN NHẬP (SAPO) - KHƠI GỢI NỖI ĐAU</span>
                    <p className="text-xs text-stone-600 italic">Với tốc độ số hóa khốc liệt hiện tại, bài toán phân phối hàng hóa không còn đơn giản là vận tải thô. Đó là cuộc đua tối ưu hóa dữ liệu thực thể mà PGS đang hỗ trợ...</p>
                  </div>

                  {/* Body & Quote */}
                  <div 
                    onClick={() => setSelectedAnatomy('body')}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedAnatomy === 'body' ? 'border-amber-500 bg-amber-500/5' : 'border-dashed border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-700 font-bold block mb-1">THÂN BÀI & TRÍCH DẪN - GIA TĂNG THẨM QUYỀN TRUYỀN THÔNG</span>
                    <p className="text-xs text-stone-500 line-clamp-2">&ldquo;Hệ thống định danh Entity đóng vai trò thiết yếu giúp định vị chính xác vị thế doanh nghiệp...&rdquo; - Ông Nguyễn Tiến Phát chia sẻ chuyên môn.</p>
                  </div>

                  {/* Link Entity */}
                  <div 
                    onClick={() => setSelectedAnatomy('entity')}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      selectedAnatomy === 'entity' ? 'border-amber-500 bg-amber-500/5' : 'border-dashed border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-700 font-bold block mb-1">TEXT LINK CHÈN ENTITY (OFF-PAGE SEO)</span>
                    <span className="text-xs text-amber-600 underline font-medium">dịch vụ marketing tổng thể của PGS Agency</span>
                  </div>

                  {/* CTA */}
                  <div 
                    onClick={() => setSelectedAnatomy('cta')}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedAnatomy === 'cta' ? 'border-amber-500 bg-amber-500/5' : 'border-dashed border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-700 font-bold block mb-1">THÔNG TIN LIÊN HỆ - KÊU GỌI HÀNH ĐỘNG</span>
                    <p className="text-[10px] text-stone-400">Mọi nhu cầu tư vấn doanh nghiệp xin liên hệ: PGS Agency - Hotline: 09xx.xxx.xxx - Website: pgsagency.vn</p>
                  </div>

                </div>

                {/* Live Explainer response box */}
                <div className="mt-4 bg-stone-900 text-white rounded-xl p-4 shadow-md relative">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block mb-1">
                    CÁCH PGS TỐI ƯU HÓA: {ANATOMY_STEPS.find(s => s.id === selectedAnatomy)?.label}
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed font-light">
                    {ANATOMY_STEPS.find(s => s.id === selectedAnatomy)?.desc}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: PR CHO CEO/FOUNDER */}
      <section className="py-20 bg-stone-50" id="ceo-pr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* 3D Founder Presentation Mockup */}
            <div className="relative flex justify-center">
              <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-600"></div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 overflow-hidden relative">
                    {/* Placeholder image */}
                    <img 
                      src="https://picsum.photos/seed/ceo/150/150" 
                      alt="Founder Profile" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-stone-900 text-lg">Hồ Sơ Thương Hiệu CEO</h3>
                    <p className="text-xs text-amber-600 font-medium">Bảo chứng tầm nhìn ban lãnh đạo</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-stone-600 leading-relaxed">
                  <p className="italic bg-stone-50 p-3 rounded-lg border-l-2 border-amber-500">
                    &ldquo;Khách hàng không chỉ mua sản phẩm, họ mua câu chuyện của nhà sáng lập và triết lý hình thành nên sản phẩm đó.&rdquo;
                  </p>
                  <p>
                    Chuỗi bài PR chân dung CEO khai thác sâu về <strong>kinh nghiệm thực chiến, tư tưởng vượt khó, quan điểm điều hành đặc thù</strong> và sứ mệnh vì cộng đồng.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-[10px] font-mono text-stone-400">
                  <span>ỨNG DỤNG CHO: KÊU GỌI VỐN, B2B PARTNERS</span>
                  <span className="text-amber-600">★ ★ ★ ★ ★</span>
                </div>
              </div>
            </div>

            {/* Content copy */}
            <div className="space-y-6">
              <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">08. NHÂN HIỆU CAO CẤP</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">PR Định Vị Thương Hiệu Cá Nhân CEO & Founder</h2>
              <p className="text-stone-600 leading-relaxed font-light">
                Trong kỷ nguyên kết nối đa chiều, thương hiệu cá nhân của người lãnh đạo chính là tài sản vô giá nhất giúp bảo chứng cho độ tin cậy của cả tổ chức.
              </p>
              <p className="text-stone-600 leading-relaxed font-light">
                PGS Agency kiến tạo các tuyến nội dung độc quyền giúp khắc họa rõ nét chân dung nhà lãnh đạo thông minh, có trách nhiệm xã hội và sở hữu năng lực chuyên môn dẫn đầu xu thế.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-stone-200/80">
                  <span className="font-display font-bold text-stone-900 text-sm block mb-1">Gia Tăng Uy Tín Doanh Nghiệp</span>
                  <span className="text-xs text-stone-500 leading-relaxed">Khiến đối tác B2B tin tưởng tuyệt đối ngay từ lần đầu tìm hiểu lý lịch.</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200/80">
                  <span className="font-display font-bold text-stone-900 text-sm block mb-1">Hỗ Trợ Tuyển Dụng & Nhân Sự</span>
                  <span className="text-xs text-stone-500 leading-relaxed">Thu hút nhân tài đầu ngành về đầu quân nhờ danh tiếng tốt của Ban lãnh đạo.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: PR CHO DOANH NGHIỆP B2B */}
      <section className="py-20 bg-white" id="b2b-pr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">09. ĐẶC QUYỀN B2B</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">Giải Pháp PR Cho Doanh Nghiệp B2B: Biến Uy Tín Thành Doanh Số</h2>
                <p className="text-stone-300 leading-relaxed font-light text-sm">
                  Doanh nghiệp B2B bán những giải pháp giá trị cao có chu kỳ mua hàng kéo dài từ vài tháng đến cả năm. Khách hàng B2B không mua hàng theo cảm xúc bộc phát, họ mua vì **NĂNG LỰC TRIỂN KHAI** và **ĐỘ TIN CẬY AN TOÀN**.
                </p>
                <p className="text-stone-300 leading-relaxed font-light text-sm">
                  PGS Agency thiết kế các bài viết PR tập trung khai thác case study thành công vượt trội, quy trình kỹ thuật nghiêm ngặt và giải pháp cắt giảm chi phí hiệu quả giúp kích thích các cuộc gọi đặt lịch tư vấn sâu.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-amber-300 text-base">Hồ Sơ Thẩm Quyền Cho Dự Án B2B</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span><strong>Bài Viết Case Study Chuyên Sâu:</strong> Chứng minh cách bạn đã giải quyết hiệu quả khó khăn của khách hàng cũ.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span><strong>Phỏng Vấn Chuyên Gia PGS & CEO:</strong> Phân tích xu hướng kỹ thuật, khẳng định vai trò tiên phong của doanh nghiệp.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span><strong>Hệ Thống Backlink Entity:</strong> Hướng dòng chảy giá trị về trang liên hệ hoặc trang sản phẩm dịch vụ cốt lõi.</span>
                  </div>
                </div>
                <div className="pt-2">
                  <a href="#contact" className="w-full block text-center px-4 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl transition-all text-xs">
                    TẢI PORTFOLIO PR B2B MẪU TỪ PGS
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: BRAND MENTION NETWORK (INTERACTIVE MAP) */}
      <section className="py-20 bg-stone-50" id="network">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">10. ĐỘC QUYỀN PGS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Brand Mention Network: Bản Đồ Kết Nối Thực Thể Số</h2>
            <p className="text-sm text-stone-600 font-light">
              PGS Agency không làm truyền thông rời rạc. Chúng tôi xây mạng lưới thực thể đồng bộ giúp Google lập tức ghi nhận sự hiện diện uy tín cao cấp của bạn trên toàn không gian số. Rà chuột hoặc chạm vào các node dưới đây để xem cách liên kết.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Interactive SVG graph */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3 flex items-center space-x-2 text-xs font-mono text-stone-400">
                <button 
                  onClick={() => setNetworkActive(!networkActive)}
                  className="flex items-center space-x-1 hover:text-amber-600 transition-colors bg-stone-100 px-2 py-1 rounded"
                >
                  <RefreshCw className={`w-3 h-3 ${networkActive ? 'animate-spin' : ''}`} />
                  <span>{networkActive ? 'Mạng Lưới Hoạt Động' : 'Dừng Mô Phỏng'}</span>
                </button>
              </div>

              {/* Animated Network SVG Graph */}
              <div className="w-full flex-1 flex items-center justify-center p-4 relative min-h-[300px]">
                <svg className="w-full h-64 overflow-visible" viewBox="0 0 400 240">
                  {/* Glowing Connection lines */}
                  {networkActive && (
                    <>
                      <line x1="200" y1="120" x2="80" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                      <line x1="200" y1="120" x2="320" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                      <line x1="200" y1="120" x2="60" y2="180" stroke="#d4982a" strokeWidth="1.5" />
                      <line x1="200" y1="120" x2="160" y2="200" stroke="#d4982a" strokeWidth="1.5" />
                      <line x1="200" y1="120" x2="280" y2="190" stroke="#d4982a" strokeWidth="1.5" />
                      <line x1="80" y1="60" x2="60" y2="180" stroke="#e7e5e4" strokeWidth="1" />
                      <line x1="320" y1="60" x2="280" y2="190" stroke="#e7e5e4" strokeWidth="1" />
                    </>
                  )}

                  {/* Core Web Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('web')}
                    onClick={() => setHoveredNode('web')}
                  >
                    <circle cx="200" cy="120" r="28" fill="#1c1917" stroke="#d4982a" strokeWidth="3" className="transition-all group-hover:scale-110" />
                    <text x="200" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" className="pointer-events-none">WEBSITE</text>
                  </g>

                  {/* PR Articles Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('pr')}
                    onClick={() => setHoveredNode('pr')}
                  >
                    <circle cx="80" cy="60" r="24" fill="#faf9f6" stroke="#d4982a" strokeWidth="2" />
                    <text x="80" y="64" fill="#1c1917" fontSize="9" fontWeight="bold" textAnchor="middle">BÁO PR</text>
                  </g>

                  {/* CEO Profile Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('ceo')}
                    onClick={() => setHoveredNode('ceo')}
                  >
                    <circle cx="320" cy="60" r="24" fill="#faf9f6" stroke="#d4982a" strokeWidth="2" />
                    <text x="320" y="64" fill="#1c1917" fontSize="9" fontWeight="bold" textAnchor="middle">CEO PROFILE</text>
                  </g>

                  {/* GBP Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('gbp')}
                    onClick={() => setHoveredNode('gbp')}
                  >
                    <circle cx="60" cy="180" r="20" fill="#faf9f6" stroke="#a8a29e" strokeWidth="1" />
                    <text x="60" y="183" fill="#1c1917" fontSize="8" textAnchor="middle">GOOGLE MAP</text>
                  </g>

                  {/* Social Profile Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('social')}
                    onClick={() => setHoveredNode('social')}
                  >
                    <circle cx="160" cy="200" r="20" fill="#faf9f6" stroke="#a8a29e" strokeWidth="1" />
                    <text x="160" y="203" fill="#1c1917" fontSize="8" textAnchor="middle">SOCIAL</text>
                  </g>

                  {/* Case Studies Node */}
                  <g 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredNode('case')}
                    onClick={() => setHoveredNode('case')}
                  >
                    <circle cx="280" cy="190" r="20" fill="#faf9f6" stroke="#a8a29e" strokeWidth="1" />
                    <text x="280" y="193" fill="#1c1917" fontSize="8" textAnchor="middle">CASE STUDY</text>
                  </g>
                </svg>
              </div>

              <span className="text-[10px] text-stone-400 text-center font-mono">*Bấm vào các node tròn để mô phỏng sự tương tác của công nghệ truyền thông PGS</span>
            </div>

            {/* Right Explanation detail panel */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <AnimatePresence mode="wait">
                {(!hoveredNode || hoveredNode === 'web') && (
                  <motion.div
                    key="web-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-stone-900 rounded-full border border-amber-500"></span>
                      <span>Trung Tâm: Website Doanh Nghiệp</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Nơi chứa các chuyển đổi chính của bạn (form đăng ký tư vấn, thông tin sản phẩm). Tuy nhiên, website không thể tự tăng uy tín nếu đứng một mình trên Internet. Nó cần nhận tín hiệu công nhận liên tục từ bên ngoài.
                    </p>
                    <p className="text-xs font-medium text-amber-700">Rà chuột vào các node vệ tinh để xem dòng chảy Entity hoạt động.</p>
                  </motion.div>
                )}
                {hoveredNode === 'pr' && (
                  <motion.div
                    key="pr-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                      <span>Báo PR Uy Tín Thẩm Quyền</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Cung cấp các dòng sức mạnh PageRank cao quý hướng thẳng về trang chủ của bạn. Chữ thương hiệu xuất hiện trên báo chính thống được Google lập tức đồng bộ hóa tên gọi trong cơ sở dữ liệu tri thức của hãng.
                    </p>
                  </motion.div>
                )}
                {hoveredNode === 'ceo' && (
                  <motion.div
                    key="ceo-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                      <span>Định Vị CEO Profile</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Kết nối chéo tài khoản LinkedIn của lãnh đạo với thông tin doanh nghiệp đăng tải trên báo kinh tế lớn. Google xác minh ban quản trị uy tín, trực tiếp gia tăng chỉ số EEAT vượt trội cho toàn hệ thống.
                    </p>
                  </motion.div>
                )}
                {hoveredNode === 'gbp' && (
                  <motion.div
                    key="gbp-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-stone-400 rounded-full"></span>
                      <span>Google Business Profile (Bản đồ)</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Đồng bộ địa chỉ, số điện thoại đăng trên báo chí khớp 100% với Google Map để Google Maps xác thực doanh nghiệp có thật trên thực địa vật lý, chống spam đối thủ.
                    </p>
                  </motion.div>
                )}
                {hoveredNode === 'social' && (
                  <motion.div
                    key="social-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-stone-400 rounded-full"></span>
                      <span>Hồ Sơ Mạng Xã Hội (Social Entity)</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Hệ thống liên kết chéo mạng xã hội (Facebook, LinkedIn, YouTube) với trang báo PR. Tạo dòng tin cậy khép kín bao quanh thương hiệu số.
                    </p>
                  </motion.div>
                )}
                {hoveredNode === 'case' && (
                  <motion.div
                    key="case-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-stone-900 text-xl flex items-center space-x-2">
                      <span className="w-3 h-3 bg-stone-400 rounded-full"></span>
                      <span>Hồ Sơ Dự Án Thực Tế (Case Studies)</span>
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Các nghiên cứu sâu thực chứng hiệu quả, đóng vai trò then chốt làm tư liệu cho bài PR báo chí trích dẫn chéo, khép kín hành trình ra quyết định mua hàng của độc giả.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 12: DỰ ÁN THỰC TẾ PR */}
      <section className="py-20 bg-white" id="cases">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">11. MINH CHỨNG THỰC TẾ</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Những Chiến Dịch PR Gặt Hái Thành Công Rực Rỡ Từ PGS</h2>
            <p className="text-sm text-stone-600 font-light">
              Chúng tôi bảo mật thông tin nội bộ của khách hàng nhưng tự hào công bố các chỉ số tăng trưởng đã được khách hàng cho phép chia sẻ:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASES.map((project, idx) => (
              <div key={idx} className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 block mb-1">
                        {project.type}
                      </span>
                      <h3 className="font-display font-bold text-stone-900 text-xl">{project.client}</h3>
                    </div>
                    <img 
                      src={project.logo} 
                      alt="Client Logo" 
                      className="h-8 rounded-md grayscale opacity-60 filter"
                    />
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {project.desc}
                  </p>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center space-x-2">
                    <span className="text-xs italic text-stone-500 leading-relaxed">
                      {project.quote}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-center">
                    <span className="block text-lg font-display font-bold text-amber-800">{project.metric1}</span>
                    <span className="text-[10px] text-stone-500">Tín hiệu tìm kiếm</span>
                  </div>
                  <div className="bg-stone-900 p-3 rounded-xl text-center text-white">
                    <span className="block text-lg font-display font-bold text-amber-400">{project.metric2}</span>
                    <span className="text-[10px] text-stone-400">Độc quyền xếp hạng</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: GÓI DỊCH VỤ / PHẠM VI & CALCULATOR */}
      <section className="py-20 bg-stone-100/50" id="packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">12. BẢNG BÁO GIÁ MINH BẠCH</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Các Gói Giải Pháp Đầu Tư Truyền Thông Bản Quyền</h2>
            <p className="text-sm text-stone-600 font-light">
              Mỗi gói dịch vụ đều bao gồm chi phí biên tập viên chuẩn tòa soạn và cam kết index tự nhiên trên Google. Chọn lộ trình phù hợp với vị thế của bạn:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 relative ${
                  pkg.popular ? 'border-amber-500 ring-2 ring-amber-500/20 scale-105 z-10 shadow-lg' : 'border-stone-200 shadow-xs'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-amber-500 text-stone-950 font-mono text-[9px] uppercase tracking-widest font-bold rounded-full">
                    ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-stone-900 text-lg">{pkg.name}</h3>
                    <p className="text-xs text-stone-500 mt-1">{pkg.desc}</p>
                  </div>

                  <div className="py-3 border-y border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">CHI PHÍ ĐẦU TƯ TRỌN GÓI</span>
                    <span className="text-2xl font-display font-bold text-amber-600">{pkg.price}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-stone-600">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <a 
                    href="#contact" 
                    className={`w-full block text-center py-3.5 rounded-xl font-bold text-xs tracking-wider transition-all uppercase ${
                      pkg.popular 
                        ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-sm' 
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
                    }`}
                  >
                    Đăng Ký Tư Vấn Gói Này
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Dynamic customized PR calculator */}
          <div className="mt-16 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest block">PGS CUSTOM CALCULATOR</span>
                <h3 className="font-display font-bold text-white text-xl">Tự Thiết Kế Chiến Dịch PR Theo Nhu Cầu Riêng</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  Kéo số lượng bài viết và lựa chọn phân cấp đầu báo chính thống của bạn để PGS ước lượng ngay khoản chi phí đầu tư trực tuyến:
                </p>

                <div className="space-y-4 pt-2">
                  {/* Range Slider for articles */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-stone-300">SỐ LƯỢNG BÀI VIẾT PR:</span>
                      <span className="text-amber-400">{customArticles} Bài</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={customArticles}
                      onChange={(e) => setCustomArticles(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                    />
                  </div>

                  {/* Radios for Newspaper tier */}
                  <div>
                    <span className="text-xs font-semibold text-stone-300 block mb-2">PHÂN CẤP ĐẦU BÁO CHỦ CHỐT:</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCustomTier('A')}
                        className={`p-3 text-xs rounded-xl font-medium text-left border transition-all ${
                          customTier === 'A' 
                            ? 'border-amber-400 bg-amber-400/10 text-white font-bold' 
                            : 'border-stone-800 bg-stone-950 text-stone-400'
                        }`}
                      >
                        Báo Nhóm A (VnExpress, CafeF, Tuổi Trẻ)
                        <span className="block text-[10px] font-normal text-stone-400 mt-1">Uy tín tối đa, kiểm duyệt cao nhất</span>
                      </button>
                      <button
                        onClick={() => setCustomTier('B')}
                        className={`p-3 text-xs rounded-xl font-medium text-left border transition-all ${
                          customTier === 'B' 
                            ? 'border-amber-400 bg-amber-400/10 text-white font-bold' 
                            : 'border-stone-800 bg-stone-950 text-stone-400'
                        }`}
                      >
                        Báo Nhóm B (VietnamNet, CafeBiz, Dân Trí)
                        <span className="block text-[10px] font-normal text-stone-400 mt-1">Chi phí hợp lý, Entity chuẩn</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">CHI PHÍ ĐẦU TƯ ƯỚC TÍNH</span>
                <div className="text-3xl sm:text-4xl font-display font-bold text-amber-400">
                  {getCustomizedPrice()}
                </div>
                <p className="text-xs text-stone-300 font-light leading-normal">
                  Đã bao gồm: Lên chiến lược góc bài viết, viết bài nháp, liên hệ tòa soạn và cam kết index chuẩn kỹ thuật Google Entity.
                </p>
                <a 
                  href="#contact"
                  className="w-full block py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Gửi Yêu Cầu Thiết Kế Chi Tiết
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 14: FAQ MỞ RỘNG (ACCORDION) */}
      <section className="py-20 bg-white" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">13. CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Giải Đáp Thắc Mắc Về Dịch Vụ PR Thực Thể Số</h2>
            <p className="text-sm text-stone-600 font-light">
              Chúng tôi luôn minh bạch mọi câu trả lời để giúp bạn ra quyết định đầu tư an toàn và hiệu quả cao nhất.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between font-display font-semibold text-stone-900 text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white border-t border-stone-200"
                      >
                        <div className="p-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 15: DỊCH VỤ LIÊN QUAN */}
      <section className="py-20 bg-stone-50" id="related-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">14. HỆ SINH THÁI TĂNG TRƯỞNG</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">Các Giải Pháp Đồng Bộ Giúp Tăng Trưởng Toàn Diện</h2>
            <p className="text-sm text-stone-600 font-light">
              PGS Agency không tin vào các hành động marketing rời rạc. Chúng tôi kết hợp PR báo chí với các mảng chuyên môn cốt lõi để tạo bứt phá doanh thu bền vững:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-semibold block mb-2">BỨT PHÁ TÌM KIẾM</span>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-2">Dịch Vụ SEO Tổng Thể</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Đẩy hàng ngàn từ khóa lên trang 1 Google bền vững nhờ tối ưu SEO Entity kết hợp PR thẩm quyền cao.
                </p>
              </div>
              <a href="#contact" className="text-xs font-bold text-amber-600 mt-4 flex items-center space-x-1 hover:underline">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-semibold block mb-2">ĐỘC QUYỀN NỘI DUNG</span>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-2">Sáng Tạo Content Website</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Viết bài chuẩn SEO, lập luận chuyển đổi cao biến lượt truy cập báo chí thành khách hàng thực thụ.
                </p>
              </div>
              <a href="#contact" className="text-xs font-bold text-amber-600 mt-4 flex items-center space-x-1 hover:underline">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-semibold block mb-2">PHỦ SÓNG ĐỊA PHƯƠNG</span>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-2">SEO Google Map (GBP)</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Phủ sóng định vị bản đồ cục bộ kết nối chéo với các thực thể bài báo PR tăng uy tín vật lý.
                </p>
              </div>
              <a href="#contact" className="text-xs font-bold text-amber-600 mt-4 flex items-center space-x-1 hover:underline">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-semibold block mb-2">TỐI ƯU CHUYỂN ĐỔI</span>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-2">Thiết Kế Web Thẩm Mỹ</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Xây dựng website mang phong cách hiện đại Light Premium khẳng định vị thế thương hiệu tối ưu UI/UX.
                </p>
              </div>
              <a href="#contact" className="text-xs font-bold text-amber-600 mt-4 flex items-center space-x-1 hover:underline">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 16: CTA CUỐI TRANG & FORM LEADS */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(#d4982a_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copywrite left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
                <span>ĐỒNG HÀNH DÀI HẠN</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                Thương hiệu của bạn đã đủ tin cậy khi khách hàng tìm kiếm chưa?
              </h2>
              
              <p className="text-stone-300 leading-relaxed text-sm font-light">
                Đừng tiếp tục lãng phí ngân sách truyền thông vào các bài viết tự mua rời rạc không mang lại sức mạnh SEO Entity. Hãy để các cựu nhà báo và chuyên gia SEO tại **PGS Agency** thiết kế mạng lưới thẩm quyền thương hiệu vững như bàn thạch cho doanh nghiệp của bạn.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-xs text-stone-300">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    ✓
                  </div>
                  <span>Cam kết xuất bản chuẩn 100% đúng tiến độ đầu báo thỏa thuận.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-stone-300">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    ✓
                  </div>
                  <span>Hỗ trợ kỹ thuật đồng bộ Schema Markup và index Google nhanh nhất.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-stone-300">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    ✓
                  </div>
                  <span>Tặng kèm tư vấn tối ưu hóa giao diện trang đích chuyển đổi.</span>
                </div>
              </div>
            </div>

            {/* High-converting lead form */}
            <div className="lg:col-span-6">
              <div className="bg-white text-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 relative overflow-hidden">
                <span className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></span>
                
                <h3 className="font-display font-bold text-stone-900 text-lg mb-2">Đăng Ký Nhận Lộ Trình PR Thẩm Quyền</h3>
                <p className="text-xs text-stone-500 mb-6">Chuyên viên PGS Agency sẽ phân tích thực trạng thương hiệu số của bạn và phản hồi trong vòng 2 giờ làm việc.</p>

                <AnimatePresence mode="wait">
                  {!leadSubmitted ? (
                    <motion.form 
                      key="lead-form"
                      onSubmit={handleLeadSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">HỌ VÀ TÊN ĐẠI DIỆN *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nguyễn Văn A"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                            className="w-full text-xs px-3.5 py-3 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">SỐ ĐIỆN THOẠI *</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="0912xxxxxx"
                            value={leadForm.phone}
                            onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                            className="w-full text-xs px-3.5 py-3 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">EMAIL DOANH NGHIỆP *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="ceo@company.com"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full text-xs px-3.5 py-3 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">NGÀNH NGHỀ / KHÓ KHĂN HIỆN TẠI</label>
                        <select 
                          value={leadForm.industry}
                          onChange={(e) => setLeadForm({...leadForm, industry: e.target.value})}
                          className="w-full text-xs px-3.5 py-3 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                        >
                          <option value="tech">Công nghệ / SaaS</option>
                          <option value="fmcg">FMCG / Bán lẻ</option>
                          <option value="b2b">Doanh nghiệp B2B / Logistics</option>
                          <option value="edu">Giáo dục / Đào tạo</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">YÊU CẦU CHI TIẾT (TÙY CHỌN)</label>
                        <textarea 
                          rows={3}
                          placeholder="Ví dụ: Muốn đăng bài chân dung CEO trên CafeF và bài giải pháp trên VnExpress..."
                          value={leadForm.message}
                          onChange={(e) => setLeadForm({...leadForm, message: e.target.value})}
                          className="w-full text-xs px-3.5 py-3 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500 bg-stone-50"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center space-x-2"
                        id="submit_lead_form"
                      >
                        <Send className="w-4 h-4" />
                        <span>GỬI YÊU CẦU TƯ VẤN NGAY</span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-lead"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                        ✓
                      </div>
                      <h4 className="font-display font-bold text-stone-900 text-xl">ĐĂNG KÝ THÀNH CÔNG!</h4>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                        Cảm ơn đại diện {leadForm.name || 'doanh nghiệp'}. Yêu cầu lập kế hoạch PR đã được chuyển tiếp đến Chuyên viên Tư vấn Thẩm Quyền Thương Hiệu của PGS Agency. Chúng tôi sẽ liên hệ trong 2 giờ.
                      </p>
                      <button 
                        onClick={() => setLeadSubmitted(false)}
                        className="text-xs text-amber-600 font-bold underline hover:text-amber-700 block mx-auto"
                      >
                        Gửi thêm yêu cầu khác
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER & EEAT/SEO TECHNICAL SCHEMAS METADATA */}
      

    </div>
  );
}
