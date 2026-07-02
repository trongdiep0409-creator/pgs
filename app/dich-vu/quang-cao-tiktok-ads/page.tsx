'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCcw, Check, Sparkles, AlertTriangle, 
  HelpCircle, ChevronDown, PhoneCall, TrendingUp, Users, 
  BarChart3, Award, Clock, ArrowRight, Layers, FileText, 
  MessageSquare, Video, ShieldCheck, Mail, Send, ChevronRight,
  Zap, Copy, Eye, ThumbsUp, Compass
} from 'lucide-react';

// Dữ liệu cho các phần của trang web
const PROBLEMS = [
  {
    id: 'p1',
    title: "Video nhiều lượt xem (view) nhưng không chuyển đổi ra Lead",
    desc: "Thuật toán TikTok phân phối video rộng rãi nhưng không nhắm đúng đối tượng mục tiêu có nhu cầu thực tế, dẫn đến lãng phí ngân sách.",
    fix: "Xây dựng chân dung khách hàng chi tiết và tối ưu hóa tệp Custom Audience, kết hợp phễu nội dung định hướng hành động rõ ràng."
  },
  {
    id: 'p2',
    title: "Nội dung quảng cáo quá thô, mang tính bán hàng trực diện",
    desc: "Người dùng TikTok lướt qua ngay lập tức vì họ tìm kiếm nội dung giải trí hoặc chia sẻ giá trị cá nhân, không thích xem quảng cáo truyền thống.",
    fix: "Triển khai định dạng UGC (User Generated Content) tự nhiên, bắt đầu bằng hook đánh trúng nỗi đau rồi khéo léo lồng ghép giải pháp."
  },
  {
    id: 'p3',
    title: "Tỷ lệ giữ chân 3 giây đầu (Hook Rate) quá thấp",
    desc: "Mở đầu video bằng logo công ty hoặc phần giới thiệu dài dòng khiến người dùng vuốt qua trước khi kịp hiểu thông điệp cốt lõi.",
    fix: "Sử dụng 'Hook Library' với tiêu đề gây tò mò, hiệu ứng trực quan mạnh và giải quyết trực tiếp câu hỏi cốt lõi của khách hàng trong 2 giây đầu."
  },
  {
    id: 'p4',
    title: "Không thiết lập hệ thống đo lường (Tracking) & phân tích dữ liệu",
    desc: "Chạy quảng cáo dựa trên cảm tính, không biết chính xác chi phí trên một Lead (CPL) từ video nào, phân khúc nào hiệu quả nhất.",
    fix: "Cài đặt TikTok Pixel nâng cao, thiết lập Standard Events và Custom Conversion kết hợp UTM Tracking để đo lường chuẩn xác từng lượt click."
  }
];

const CREATIVE_MATRIX = [
  {
    id: 'c1',
    type: "UGC (User Generated Content)",
    goal: "Xây dựng lòng tin, tạo sự gần gũi thân thuộc",
    when: "Thích hợp cho giai đoạn đầu phễu nhận diện và giữa phễu tạo sự cân nhắc.",
    desc: "Khách hàng thực tế chia sẻ trải nghiệm chân thực, unboxing sản phẩm hoặc review không qua dàn dựng cầu kỳ.",
    example: "Một bạn trẻ quay video bằng điện thoại tự nhiên nói về việc giải quyết khó khăn nhờ dịch vụ, lồng ghép feedback thật."
  },
  {
    id: 'c2',
    type: "Problem - Solution",
    goal: "Đánh trúng nỗi đau, giới thiệu giải pháp tức thì",
    when: "Sử dụng trực tiếp cho nhóm khách hàng đang tìm kiếm giải pháp cấp bách.",
    desc: "Mô tả một rắc rối thường gặp một cách trực quan, sau đó đưa sản phẩm/dịch vụ của doanh nghiệp ra như câu trả lời hoàn hảo.",
    example: "Nêu cảnh doanh nghiệp đau đầu vì chi phí marketing tăng vọt, sau đó giới thiệu hệ thống Marketing tổng thể của PGS."
  },
  {
    id: 'c3',
    type: "Product Demo / Tutorial",
    goal: "Chứng minh tính năng, hướng dẫn trực quan",
    when: "Nhắm tới tệp khách hàng đã quan tâm, cần hiểu rõ cách thức hoạt động.",
    desc: "Trực quan hóa quy trình sử dụng sản phẩm hoặc dịch vụ theo từng bước đơn giản, trực quan trên màn hình.",
    example: "Video màn hình quay cận cảnh quy trình setup campaign TikTok tối ưu, hiển thị kết quả thực tế tăng trưởng trong dashboard."
  },
  {
    id: 'c4',
    type: "Social Proof / Testimonial",
    goal: "Tận dụng uy tín chuyên gia, khẳng định chất lượng",
    when: "Chốt sale cuối phễu, loại bỏ hoàn toàn các rào cản do dự của khách hàng.",
    desc: "Chia sẻ từ các đối tác lớn, chuyên gia đầu ngành hoặc trích xuất số liệu từ các case study tăng trưởng thực tế.",
    example: "Phỏng vấn ngắn một CEO chia sẻ về việc doanh thu tăng 250% sau khi đồng hành cùng chiến dịch TikTok Ads của PGS Agency."
  },
  {
    id: 'c5',
    type: "Founder Talking",
    goal: "Chia sẻ triết lý, định vị chuyên gia bền vững",
    when: "Xây dựng thương hiệu cá nhân kết hợp quảng cáo dịch vụ cao cấp, B2B.",
    desc: "Người sáng lập nói trực tiếp trước camera về một bài học kinh nghiệm xương máu, triết lý kinh doanh hoặc giải mã xu hướng ngành.",
    example: "Founder PGS Agency chia sẻ: 'Ngừng đốt tiền quảng cáo rời rạc, hãy tập trung xây dựng hệ thống Marketing tăng trưởng bền vững'."
  },
  {
    id: 'c6',
    type: "Irresistible Offer Video",
    goal: "Kích thích chuyển đổi khẩn cấp, đẩy số lượng đăng ký",
    when: "Chạy chiến dịch retargeting hoặc các dịp khuyến mãi, ưu đãi đặc biệt.",
    desc: "Tập trung hoàn toàn vào một ưu đãi không thể từ chối đi kèm giới hạn thời gian hoặc số lượng cụ thể.",
    example: "Ưu đãi tài trợ 100% chi phí viết Creative Brief và Setup tài khoản TikTok Agency cho 5 doanh nghiệp đăng ký sớm nhất tuần này."
  }
];

const HOOKS = [
  { text: "3 lỗi khiến quảng cáo TikTok bị lướt qua trong 2 giây.", type: "Cảnh báo" },
  { text: "Vì sao video của bạn có view nhưng tuyệt đối không ra đơn?", type: "Nỗi đau" },
  { text: "Nếu bạn đang bán dịch vụ B2B, hãy test ngay angle quảng cáo này.", type: "Giải pháp" },
  { text: "Khách hàng không mua sản phẩm của bạn vì họ chưa hiểu điều này...", type: "Tò mò" },
  { text: "Case study: Tăng 180% Lead chất lượng từ TikTok Ads chỉ với ngân sách tối giản.", type: "Thực tế" }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Nghiên cứu & Định vị",
    desc: "Phân tích sâu thuộc tính sản phẩm, xác định tệp khách hàng tiềm năng và phân tích các đối thủ cạnh tranh trực tiếp trên nền tảng TikTok."
  },
  {
    step: "02",
    title: "Xây dựng Creative Brief & Angle",
    desc: "Lên ý tưởng kịch bản chi tiết, thiết lập ma trận góc tiếp cận (angles) độc đáo và viết tiêu đề thu hút (hooks) cho 3 giây đầu tiên."
  },
  {
    step: "03",
    title: "Sản xuất / Biên tập Video",
    desc: "Tư vấn quay dựng hoặc trực tiếp xử lý hậu kỳ video dạng dọc chuẩn nhịp điệu TikTok, tối ưu hóa âm thanh xu hướng và hiệu ứng chữ nổi bật."
  },
  {
    step: "04",
    title: "Cấu hình Campaign & Target",
    desc: "Setup chiến dịch thông qua tài khoản Agency cao cấp, lựa chọn hình thức tối ưu Lead Form/TikTok Shop/Landing Page và target tệp chuẩn xác."
  },
  {
    step: "05",
    title: "Đo lường & Tối ưu A/B Testing",
    desc: "Liên tục theo dõi các chỉ số CTR, Hook Rate, CPL. Tiến hành thử nghiệm phân tách kịch bản để phân bổ ngân sách vào các mẫu video chuyển đổi tốt nhất."
  },
  {
    step: "06",
    title: "Báo cáo dữ liệu & Scale-up",
    desc: "Cung cấp báo cáo minh bạch định kỳ, tư vấn mở rộng quy mô (scale-up) ngân sách hoặc nhân bản các tệp khách hàng tương tự (Lookalike)."
  }
];

const KPI_METRICS = [
  { id: 'm1', label: "Hook Rate (3s)", value: "35% - 48%", desc: "Tỷ lệ giữ chân người dùng trong 3 giây đầu tiên. PGS tối ưu hóa bằng các kịch bản tiêu đề gây tò mò, hành động mạnh để giảm thiểu tỷ lệ lướt qua nhanh." },
  { id: 'm2', label: "CTR (Click-Through Rate)", value: "1.8% - 3.2%", desc: "Tỷ lệ nhấp chuột vào nút CTA mua hàng hoặc đăng ký. Đạt mức vượt trội so với trung bình thị trường (thường chỉ 0.8% - 1.2%)." },
  { id: 'm3', label: "CPL (Cost Per Lead)", value: "Tiết kiệm 25-40%", desc: "Tối ưu hóa tối đa chi phí thu về một Lead chất lượng bằng cách nhắm mục tiêu chính xác, tránh tệp ảo và tối ưu hóa trải nghiệm điền form." },
  { id: 'm4', label: "Watch Time Average", value: "8.5s - 12s", desc: "Thời gian xem video trung bình của người dùng. Video ngắn được biên tập cuốn hút, giữ chân khách hàng lâu hơn để truyền tải trọn vẹn thông điệp sản phẩm." }
];

const PACKAGES = [
  {
    name: "TikTok Ads Setup",
    price: "Khởi động nhanh",
    desc: "Phù hợp cho doanh nghiệp mới bắt đầu tiếp cận kênh TikTok Ads, muốn chuẩn hóa tài khoản và kiểm thử thị trường.",
    features: [
      "Khởi tạo & Xác minh Tài khoản TikTok Agency",
      "Nghiên cứu đối thủ & Đề xuất 3 Góc Tiếp Cận (Angles)",
      "Biên kịch 5 kịch bản Video chi tiết với Hook mạnh",
      "Setup 2 Chiến dịch mẫu tối ưu chuyển đổi",
      "Cài đặt TikTok Pixel & Hệ thống đo lường cơ bản",
      "Báo cáo bàn giao chi tiết sau khi hoàn thành thiết lập"
    ],
    popular: false
  },
  {
    name: "TikTok Ads Management",
    price: "Tăng trưởng đột phá",
    desc: "Giải pháp toàn diện tối ưu doanh thu, PGS trực tiếp vận hành, đo lường và tối ưu hóa ngân sách quảng cáo hàng tháng.",
    features: [
      "Bao gồm toàn bộ quyền lợi của gói Setup",
      "Quản lý & Tối ưu chiến dịch quảng cáo hàng ngày",
      "Lên kịch bản & Biên tập video định kỳ hàng tuần",
      "A/B Testing liên tục (Góc quay, Hook, Target)",
      "Tối ưu hóa Lead Form / Landing Page chuyển đổi",
      "Báo cáo số liệu thời gian thực qua Dashboard chuyên nghiệp",
      "Hỗ trợ kỹ thuật 24/7 từ chuyên viên cấp cao"
    ],
    popular: true
  },
  {
    name: "TikTok Creative Testing",
    price: "Thống trị nội dung",
    desc: "Chuyên sâu về tối ưu sáng tạo video quảng cáo. Phù hợp với doanh nghiệp tự vận hành ads nhưng thiếu video chuyển đổi tốt.",
    features: [
      "Phân tích chuyên sâu hiệu suất video cũ",
      "Xây dựng Ma Trận Sáng Tạo (Creative Matrix) 12 mẫu",
      "Sản xuất kịch bản UGC & Định vị chuyên gia",
      "Biên tập hậu kỳ 10 video quảng cáo chuyên biệt",
      "Tối ưu 15 mẫu Hooks giật gân, độc đáo",
      "Hướng dẫn tối ưu hóa CTR & Giữ chân người xem"
    ],
    popular: false
  }
];

const FAQS = [
  {
    q: "Doanh nghiệp của tôi có cần chuẩn bị sẵn video để chạy quảng cáo không?",
    a: "Không bắt buộc. PGS Agency sẽ tư vấn kịch bản chi tiết dựa trên Creative Brief. Nếu doanh nghiệp có sẵn tư liệu thô, PGS sẽ biên tập chuẩn hóa nhịp điệu TikTok. Nếu chưa có, chúng tôi có gói hỗ trợ kết nối KOL/UGC Creator để sản xuất video từ A-Z một cách tự nhiên nhất."
  },
  {
    q: "Ngân sách tối thiểu để bắt đầu chạy quảng cáo TikTok là bao nhiêu?",
    a: "Theo quy định của TikTok, ngân sách tối thiểu cho mỗi nhóm quảng cáo là 200,000 VND/ngày. Tuy nhiên, để thuật toán học dữ liệu hiệu quả và cho ra kết luận chính xác, PGS khuyên nghị ngân sách khởi điểm tối thiểu từ 5,000,000 VND đến 10,000,000 VND cho chiến dịch thử nghiệm ban đầu."
  },
  {
    q: "TikTok Ads phù hợp với những ngành nghề nào nhất?",
    a: "TikTok đặc biệt hiệu quả với các ngành hàng có tính trực quan cao: Mỹ phẩm, Thời trang, Đồ gia dụng thông minh, Ẩm thực, Giáo dục/Khóa học, Dịch vụ tuyển dụng, Tài chính cá nhân, Bất động sản tầm trung và Ứng dụng công nghệ. Bất cứ sản phẩm nào có thể trình bày thông qua câu chuyện giải quyết vấn đề bằng video đều có thể khai thác tốt trên TikTok."
  },
  {
    q: "Bao lâu thì chiến dịch quảng cáo TikTok Ads bắt đầu trả về số liệu hiệu quả?",
    a: "Thông thường thuật toán TikTok cần khoảng 24h - 48h (Giai đoạn Học máy - Learning Phase) sau khi được duyệt để phân phối ổn định. PGS sẽ liên tục cập nhật và tối ưu các chỉ số ban đầu như CTR và Hook Rate ngay trong 3 ngày đầu tiên để kịp thời điều chỉnh kịch bản kém hiệu quả."
  },
  {
    q: "Quảng cáo TikTok có cần thiết phải sử dụng Landing Page không?",
    a: "Tùy thuộc vào mục tiêu chiến dịch. Đối với thu thập dữ liệu khách hàng (Lead Generation), chúng ta có thể sử dụng trực tiếp Instant Form ngay trên TikTok (tải cực nhanh). Tuy nhiên, đối với sản phẩm cần cung cấp nhiều thông tin chi tiết hoặc dịch vụ tư vấn cao cấp, việc kết hợp một Landing Page tối ưu trải nghiệm di động là vô cùng quan trọng để tăng tỷ lệ chuyển đổi."
  }
];

const RELATED_SERVICES = [
  { name: "Xây dựng kênh TikTok từ con số 0", desc: "Sản xuất chuỗi video organic, định hình phong cách kênh, kéo traffic tự nhiên bền vững." },
  { name: "Thiết kế Landing Page Tối Ưu Chuyển Đổi", desc: "Thiết kế giao diện di động siêu tốc, bố cục mượt mà giúp giữ chân và chốt Lead hiệu quả." },
  { name: "Dịch vụ Facebook Ads Toàn Diện", desc: "Xây dựng phễu quảng cáo đa kênh, kết hợp nhịp nhàng giữa Facebook và TikTok Ads." },
  { name: "Tối ưu hóa Content Social & Vận hành", desc: "Chăm sóc và phát triển nội dung đa nền tảng, tạo điểm chạm thương hiệu uy tín." }
];

export default function TikTokAdsPage() {
  // States cho các phần tương tác
  const [activeProblem, setActiveProblem] = useState<string>('p1');
  const [activeCreative, setActiveCreative] = useState<string>('c1');
  const [activeKpi, setActiveKpi] = useState<string>('m1');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  
  // States cho 3-Second Hook Timer
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // States cho Form liên hệ
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', business: '', budget: '10-30tr' });

  // Tải tùy chọn Reduced Motion nếu có
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setTimeout(() => {
        setReducedMotion(true);
      }, 0);
    }
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Điều khiển 3-Second Hook Timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerCount(0);
    setTimerRunning(true);
    setTimerFinished(false);
    
    timerRef.current = setInterval(() => {
      setTimerCount((prev) => {
        if (prev >= 3.0) {
          clearInterval(timerRef.current!);
          setTimerRunning(false);
          setTimerFinished(true);
          return 3.0;
        }
        return Number((prev + 0.1).toFixed(1));
      });
    }, 100);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerCount(0);
    setTimerRunning(false);
    setTimerFinished(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-black antialiased overflow-x-hidden">
      
      {/* HEADER / NAVIGATION BAR */}
      

      {/* SECTION 1: HERO VERTICAL VIDEO LAB */}
      <section className="relative py-12 md:py-24 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-white via-[#FAF9F6] to-white" id="hero">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1 w-fit">
              <Sparkles className="w-4 h-4 text-[#B89047] animate-pulse" />
              <span className="text-xs font-semibold text-[#B89047] tracking-wider uppercase font-mono">LIGHT PREMIUM CONSULTING</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]" id="main-title">
              Dịch vụ TikTok Ads giúp thương hiệu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89047] to-[#D4AF37]">mở rộng độ phủ</span>, tăng tương tác và tạo chuyển đổi từ <span className="underline decoration-[#D4AF37] decoration-wavy underline-offset-4">video ngắn</span>.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              PGS Agency xây dựng hệ thống Marketing tổng thể tối ưu, biến video dọc thành cỗ máy tạo Lead tự động. Chúng tôi kết hợp kịch bản sáng tạo đột phá với phân tích dữ liệu chuyên sâu để tối đa hóa lợi nhuận kinh doanh của bạn.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a 
                href="#contact-form" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[#B89047] to-[#D4AF37] hover:from-[#A37E3B] hover:to-[#C5A028] text-white transition-all shadow-md hover:shadow-lg text-center"
                id="hero-primary-cta"
              >
                Tư vấn chiến dịch TikTok Ads
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#definition" 
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium rounded-full bg-white border border-[#B89047]/40 hover:border-[#B89047] text-gray-800 hover:bg-gray-50 transition-all text-center"
                id="hero-secondary-cta"
              >
                Khám phá năng lực
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">45%+</div>
                <div className="text-xs text-gray-500 font-medium">Hook Rate tối ưu</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#B89047]">3.2%</div>
                <div className="text-xs text-gray-500 font-medium">CTR Trung bình đạt</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">-30%</div>
                <div className="text-xs text-gray-500 font-medium">Chi phí CPL giảm</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            {/* Visual Phone Mockup 3D Stack */}
            <div className="relative w-[280px] sm:w-[320px] h-[560px] bg-white rounded-[40px] shadow-2xl border-[12px] border-gray-900 overflow-hidden z-10">
              <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center items-center z-30">
                <div className="w-20 h-4 bg-black rounded-b-xl"></div>
              </div>
              
              {/* Nội dung màn hình điện thoại */}
              <div className="absolute inset-0 bg-gray-100 flex flex-col justify-between p-4 pt-8 text-xs relative">
                {/* Background mô phỏng video */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0"></div>
                <Image 
                  src="https://picsum.photos/seed/tiktokads/360/640" 
                  alt="TikTok Video Demo" 
                  fill
                  className="object-cover z-[-1]"
                  referrerPolicy="no-referrer"
                />

                {/* Phần header trên điện thoại */}
                <div className="z-10 flex justify-between items-center text-white font-semibold">
                  <span>LIVE</span>
                  <div className="flex space-x-4 text-[10px]">
                    <span className="border-b-2 border-white pb-0.5">Dành cho bạn</span>
                    <span className="opacity-70">Đang theo dõi</span>
                  </div>
                  <Users className="w-4 h-4" />
                </div>

                {/* Phía dưới: Video caption và Tương tác chạy chữ */}
                <div className="z-10 text-white mt-auto space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#B89047] border border-white flex items-center justify-center font-bold text-[9px] text-white">
                      PGS
                    </div>
                    <div>
                      <p className="font-bold">@pgsagency.vn</p>
                      <p className="text-[10px] text-gray-300">Nhà tư vấn Tăng Trưởng Số</p>
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed">
                    Đừng chỉ đốt tiền vào view ảo! Hãy tối ưu hóa 3 giây đầu để biến lượt lướt qua thành Lead chất lượng. 🚀 <span className="font-bold text-[#D4AF37]">#tiktokads</span> <span className="font-bold text-[#D4AF37]">#marketinghethong</span>
                  </p>

                  {/* Thanh tiến trình giả */}
                  <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#D4AF37] h-full w-[65%] animate-pulse"></div>
                  </div>

                  {/* Nút Call-to-action giả lập trên app */}
                  <div className="bg-[#D4AF37] text-black font-bold text-center py-2.5 rounded-lg shadow-md hover:bg-[#C5A028] transition-colors cursor-pointer text-xs uppercase tracking-wider">
                    Nhận tư vấn miễn phí
                  </div>
                </div>

                {/* Các nút tương tác bên hông */}
                <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center space-y-4 text-white text-[10px]">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-115 transition-transform cursor-pointer">
                      <ThumbsUp className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <span className="mt-1 font-mono">12.5K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-115 transition-transform cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="mt-1 font-mono">1.8K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-115 transition-transform cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </div>
                    <span className="mt-1 font-mono">98K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Các thẻ bay lơ lửng xung quanh điện thoại */}
            <div className="absolute top-10 -left-6 bg-white/90 backdrop-blur-md border border-amber-200 p-3 rounded-xl shadow-lg max-w-[140px] z-20 animate-bounce hidden sm:block" style={{ animationDuration: '6s' }}>
              <p className="text-[10px] font-mono text-[#B89047] font-bold">HOOK #01</p>
              <p className="text-xs font-semibold text-gray-900 mt-1">{"\"Bí quyết cắt giảm 40% chi phí MKT...\""}</p>
            </div>

            <div className="absolute bottom-20 -right-6 bg-white/90 backdrop-blur-md border border-amber-200 p-3 rounded-xl shadow-lg max-w-[150px] z-20 animate-bounce hidden sm:block" style={{ animationDuration: '8s' }}>
              <p className="text-[10px] font-mono text-emerald-600 font-bold">UGC CREATIVE</p>
              <p className="text-xs font-semibold text-gray-900 mt-1">Review thực tế không diễn xuất.</p>
            </div>
            
            {/* Vòng tròn trang trí màu Gold phía sau */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full filter blur-3xl -z-10 scale-90"></div>
          </div>

        </div>
      </section>

      {/* SECTION 2: TIKTOK ADS LÀ GÌ */}
      <section className="py-16 px-4 sm:px-8 bg-white border-y border-gray-100" id="definition">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Khái Niệm Cốt Lõi</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Bản chất thực sự của TikTok Ads là gì?</p>
            <p className="text-gray-500 mt-3">Quảng cáo TikTok không phải là bài đăng bán hàng truyền thống được đẩy tiền, mà là một trải nghiệm nội dung video dọc thông minh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-gray-100 hover:border-[#D4AF37]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#B89047] mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sáng tạo dựa trên Nội dung</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trên TikTok, {"\"Quảng cáo tốt là quảng cáo trông không giống quảng cáo\""}. TikTok Ads vận hành dựa trên định dạng video dọc ngắn đầy sáng tạo, lôi cuốn người dùng xem hết kịch bản nhờ tính giải trí hoặc cung cấp giải pháp hữu ích.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-gray-100 hover:border-[#D4AF37]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#B89047] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hành vi xem nhanh & sâu</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Người dùng TikTok lướt màn hình vô tận và đưa ra quyết định ở lại hay bỏ qua chỉ trong vòng vài giây đầu. Điều này đòi hỏi video quảng cáo phải có cấu trúc đặc biệt: không có phần dạo đầu rườm rà mà đi trực tiếp vào vấn đề.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-gray-100 hover:border-[#D4AF37]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#B89047] mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Điểm chuyển đổi trực diện</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tích hợp mượt mà các nút kêu gọi hành động (CTA), liên kết Instant Form, TikTok Shop hoặc điều hướng về Landing Page thiết kế riêng. Giúp giảm thiểu số bước chuyển tiếp, nâng cao hiệu suất ra Lead tức thì.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HÀNH VI NGƯỜI DÙNG TIKTOK (INTERACTIVE TIMER) */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]" id="behavior">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Tâm Lý & Hành Vi Người Xem</h2>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Thử thách 3 Giây đầu quyết định sự sống còn của chiến dịch quảng cáo
              </p>
              <p className="text-gray-600 leading-relaxed">
                Người dùng TikTok lướt nhanh với tốc độ cực lớn. Nếu trong 3 giây đầu tiên video của bạn không có một {"\"Hook\""} (tiêu đề/hình ảnh neo giữ cảm xúc) đủ mạnh, họ sẽ vuốt qua không thương tiếc. Đó chính là lý do vì sao nhiều chiến dịch ads có hàng triệu lượt tiếp cận nhưng tỉ lệ chuyển đổi gần như bằng 0.
              </p>
              <p className="text-gray-600 leading-relaxed font-semibold">
                👉 Trải nghiệm trực quan dưới đây để thấy 3 giây trôi qua nhanh như thế nào đối với một người lướt TikTok:
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              {/* Interactive Timer Box */}
              <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#D4AF37]"></div>
                
                <h3 className="text-base font-bold text-gray-800 text-center mb-6">Mô phỏng: 3-Second Hook Challenge</h3>

                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* Circular Timer Visual */}
                  <div className="relative w-40 h-40 rounded-full border-4 border-gray-100 flex items-center justify-center bg-[#FAF9F6]">
                    <div className="text-center">
                      <span className="text-4xl font-mono font-bold text-gray-900">{timerCount}s</span>
                      <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">Giới hạn chú ý</p>
                    </div>

                    {/* Animated Border */}
                    {timerRunning && (
                      <div className="absolute inset-0 rounded-full border-4 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="text-center h-12">
                    {!timerRunning && !timerFinished && (
                      <p className="text-sm text-gray-500">Ấn bắt đầu để trải nghiệm thời gian xem trung bình của khách hàng.</p>
                    )}
                    {timerRunning && (
                      <p className="text-sm text-amber-600 font-medium animate-pulse">Khách hàng đang nhìn chằm chằm... Có gì cuốn hút họ không?</p>
                    )}
                    {timerFinished && (
                      <div className="space-y-1">
                        <p className="text-sm text-red-600 font-bold flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 mr-1.5" /> HẾT GIỜ! KHÁCH HÀNG ĐÃ VUỐT QUA!
                        </p>
                        <p className="text-xs text-gray-500">Nếu 3 giây qua bạn không có Hook tốt, ngân sách quảng cáo của bạn đã bị lãng phí.</p>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3 w-full">
                    <button
                      onClick={startTimer}
                      disabled={timerRunning}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-900 text-white font-semibold text-xs hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 mr-2" />
                      {timerCount > 0 ? "Thử lại thách thức" : "Bắt đầu 3 giây"}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-100 text-gray-600 font-semibold text-xs hover:bg-gray-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: KHI NÀO NÊN CHẠY TIKTOK ADS */}
      <section className="py-16 px-4 sm:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Đối Tượng Phù Hợp</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Doanh nghiệp của bạn khi nào nên chạy TikTok Ads?</p>
            <p className="text-gray-500 mt-2">Dưới đây là bảng khảo sát các tín hiệu cho thấy kênh TikTok chính là mảnh đất màu mỡ tiếp theo của bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cần tăng độ phủ thương hiệu thần tốc",
                desc: "Thuật toán đề xuất video của TikTok cho phép một ý tưởng sáng tạo đột phá tiếp cận hàng triệu người xem nhanh gấp nhiều lần Facebook."
              },
              {
                title: "Sản phẩm có thể trình bày bằng video",
                desc: "Sản phẩm có tính trải nghiệm cao, giải quyết vấn đề thực tế, dễ quay dựng, unbox hoặc hướng dẫn sử dụng trực quan."
              },
              {
                title: "Muốn kiểm thử (test) sản phẩm mới",
                desc: "Cần phản hồi thị trường cực kỳ nhanh chóng. Đo lường chỉ số đón nhận thông qua số lượng đăng ký form hoặc click liên kết chỉ trong 3-5 ngày."
              },
              {
                title: "Kéo traffic chất lượng về landing page",
                desc: "Xây dựng phễu thu thập thông tin khách hàng, kéo tệp người dùng trẻ trung, có khả năng tương tác cao vào trang bán hàng chính."
              },
              {
                title: "Chạy kênh quảng cáo khác bị bão hòa",
                desc: "Chi phí CPM, CPC tại các nền tảng truyền thống tăng vọt. Cần một kênh phân phối mới với mức giá cạnh tranh và tệp khách hàng tiềm năng chưa khai phá hết."
              },
              {
                title: "Tối ưu hóa phễu tăng trưởng tổng thể",
                desc: "Kết hợp TikTok Ads với SEO, Google Ads để tạo điểm chạm đa kênh, không bỏ sót bất kỳ giai đoạn nào trong hành trình mua sắm của khách hàng."
              }
            ].map((item, index) => (
              <div key={index} className="flex p-5 rounded-xl bg-[#FAF9F6] border border-gray-200/40 hover:border-[#D4AF37]/40 hover:bg-white transition-all">
                <div className="mr-4 mt-1 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[#B89047]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TIKTOK ADS KHÁC QUẢNG CÁO TRUYỀN THỐNG */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">So Sánh Trực Quan</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Sự khác biệt đột phá của TikTok Ads</p>
            <p className="text-gray-500 mt-2">Hiểu rõ bản chất để phân bổ ngân sách tiếp thị thông minh, tránh áp dụng sai mô hình tư duy cũ vào nền tảng mới.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 font-mono text-xs uppercase text-gray-500 font-semibold">
                  <th className="p-4 sm:p-5">Tiêu chí so sánh</th>
                  <th className="p-4 sm:p-5 text-[#B89047]">TikTok Ads (Thế hệ mới)</th>
                  <th className="p-4 sm:p-5">Quảng cáo truyền thống (Cũ)</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 divide-y divide-gray-100">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-gray-900">Định dạng chính</td>
                  <td className="p-4 sm:p-5 text-[#B89047] font-semibold">Video dọc ngắn (9:16), âm thanh sống động, chú trọng nhịp điệu nhanh.</td>
                  <td className="p-4 sm:p-5">Hình ảnh tĩnh, bài viết chữ dài (Copywriting) hoặc banner quảng cáo khô khan.</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-gray-900">Tâm lý người xem</td>
                  <td className="p-4 sm:p-5 text-[#B89047] font-semibold">Chủ động khám phá, đón nhận nội dung sáng tạo, chấp nhận tương tác tự nhiên.</td>
                  <td className="p-4 sm:p-5">Bị động nhận tin, thường cảm thấy phiền và có xu hướng lờ quảng cáo đi.</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-gray-900">Cách thức thu hút</td>
                  <td className="p-4 sm:p-5 text-[#B89047] font-semibold">Đánh thẳng bằng Hook trong 3 giây đầu, lồng ghép sản phẩm vào câu chuyện cụ thể.</td>
                  <td className="p-4 sm:p-5">Giới thiệu logo, tên thương hiệu dài dòng ở đầu, rồi mới liệt kê tính năng.</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-gray-900">Phân phối & Tối ưu</td>
                  <td className="p-4 sm:p-5 text-[#B89047] font-semibold">Dựa trên hành vi xem thực tế và sở thích sâu của người dùng để phân phối chuẩn xác.</td>
                  <td className="p-4 sm:p-5">Dựa nhiều vào nhân khẩu học (Tuổi tác, Giới tính, Địa lý) thô sơ, dễ bị trùng lặp.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: VẤN ĐỀ THƯỜNG GẶP (PROBLEM CARDS) */}
      <section className="py-16 px-4 sm:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">Nỗi Đau & Thách Thức</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Những cái bẫy đốt tiền khi tự chạy TikTok Ads</p>
            <p className="text-gray-500 mt-2">Dưới đây là các sai lầm phổ biến mà PGS thường xuyên tiếp nhận từ khách hàng tự vận hành quảng cáo trước đó.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List of problems */}
            <div className="lg:col-span-5 space-y-3">
              {PROBLEMS.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => setActiveProblem(prob.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                    activeProblem === prob.id 
                    ? 'bg-amber-50/50 border-[#D4AF37] shadow-sm' 
                    : 'bg-[#FAF9F6] border-gray-200/60 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${activeProblem === prob.id ? 'bg-[#D4AF37] text-black' : 'bg-gray-200 text-gray-500'}`}>
                    <span className="text-[10px] font-bold">!</span>
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${activeProblem === prob.id ? 'text-gray-900' : 'text-gray-700'}`}>{prob.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Problem Detailed View Card */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-gray-200/80 rounded-2xl p-6 sm:p-8 relative min-h-[280px] flex flex-col justify-between">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-red-500/80 bg-red-50 border border-red-200/60 rounded px-2 py-0.5 uppercase">
                Bẫy đốt tiền
              </div>

              <AnimatePresence mode="wait">
                {PROBLEMS.map((prob) => prob.id === activeProblem && (
                  <motion.div
                    key={prob.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{prob.title}</h3>
                    
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Tác hại thực tế:</span>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{prob.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200/60">
                      <span className="text-xs font-bold text-[#B89047] uppercase tracking-wider font-mono flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Giải pháp từ PGS Agency:
                      </span>
                      <p className="text-sm text-gray-800 font-semibold mt-1 leading-relaxed">{prob.fix}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-6 flex justify-end">
                <a href="#contact-form" className="text-xs font-bold text-[#B89047] hover:text-[#A37E3B] flex items-center">
                  Khắc phục lỗi quảng cáo của bạn ngay <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CREATIVE MATRIX (3D INTERACTIVE GRID) */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]" id="matrix">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Xương Sống Sáng Tạo</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Ma Trận Sáng Tạo Video Quảng Cáo của PGS</p>
            <p className="text-gray-500 mt-2">Không sản xuất video theo cảm tính. Chúng tôi áp dụng ma trận 6 định dạng chuẩn hóa để phủ kín hành trình mua sắm của khách hàng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATIVE_MATRIX.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveCreative(item.id)}
                className={`p-6 rounded-2xl bg-white border transition-all cursor-pointer relative group ${
                  activeCreative === item.id 
                  ? 'border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50' 
                  : 'border-gray-200/60 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono font-bold text-gray-400">FORMAT</span>
                  <div className={`w-2.5 h-2.5 rounded-full ${activeCreative === item.id ? 'bg-[#D4AF37]' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.type}</h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase font-mono">Mục tiêu:</span>
                    <p className="text-xs text-gray-600 font-semibold mt-0.5">{item.goal}</p>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                    {item.desc}
                  </p>

                  <div className="pt-2.5 border-t border-gray-100 mt-2">
                    <span className="text-[10px] font-bold text-[#B89047] uppercase font-mono">Kịch bản thực tế:</span>
                    <p className="text-xs text-gray-700 italic mt-0.5">{"\""}{item.example}{"\""}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: HOOK LIBRARY (ANIMATED TICKER) */}
      <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Thư Viện Tiêu Đề</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Mẫu Hook Thử Nghiệm Tỉ Lệ Giữ Chân</p>
            <p className="text-gray-500 mt-2">Cách PGS viết tiêu đề đập thẳng vào tâm trí người xem trong 2 giây đầu tiên để đảm bảo họ dừng tay.</p>
          </div>
        </div>

        {/* Endless Ticker Animation */}
        <div className="w-full flex flex-col space-y-4">
          <div className="flex space-x-6 whitespace-nowrap overflow-x-auto py-2 scrollbar-none scroll-smooth">
            <div className="flex space-x-6 animate-pulse">
              {HOOKS.concat(HOOKS).map((hook, idx) => (
                <div key={idx} className="inline-flex items-center space-x-3 bg-[#FAF9F6] border border-gray-200 px-5 py-3 rounded-full shadow-sm">
                  <span className="text-[10px] font-mono font-bold bg-[#D4AF37]/10 text-[#B89047] px-2.5 py-0.5 rounded-full uppercase">
                    {hook.type}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 font-mono">{"\""}{hook.text}{"\""}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 text-center">
          <p className="text-xs text-gray-400">
            *PGS Agency sở hữu kho thư viện hơn 1000+ mẫu Hooks chuyển đổi cao cho mọi lĩnh vực kinh doanh.
          </p>
        </div>
      </section>

      {/* SECTION 9: QUY TRÌNH TRIỂN KHAI TIKTOK ADS CỦA PGS (PROCESS PIPELINE) */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]" id="process">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Phương Pháp Khoa Học</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Quy trình 6 bước Vận hành Chiến dịch Hiệu suất</p>
            <p className="text-gray-500 mt-2">Chúng tôi không đoán mò. PGS vận hành chiến dịch bằng phương pháp luận dữ liệu và tối ưu hóa sáng tạo có hệ thống.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-all">
                <div className="absolute -top-4 left-6 bg-gradient-to-r from-[#B89047] to-[#D4AF37] text-black font-mono font-bold text-xs px-3 py-1 rounded-full shadow">
                  BƯỚC {step.step}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: TRACKING & KPI (KPI DASHBOARD) */}
      <section className="py-16 px-4 sm:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Đo Lường Chuẩn Xác</h2>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Chỉ số KPI cam kết thực tế, loại bỏ số liệu ảo
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi không báo cáo số lượt xem (views) hay lượt tim (likes) vô nghĩa. PGS Agency tập trung hoàn toàn vào các số liệu chuyển đổi cốt lõi thúc đẩy trực tiếp hoạt động kinh doanh của bạn. Nhấp vào từng chỉ số để xem phương thức PGS tối ưu hóa.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {KPI_METRICS.map((kpi) => (
                  <button
                    key={kpi.id}
                    onClick={() => setActiveKpi(kpi.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      activeKpi === kpi.id 
                      ? 'bg-amber-50/50 border-[#D4AF37] shadow-sm' 
                      : 'bg-[#FAF9F6] border-gray-100 hover:bg-white hover:border-gray-200'
                    }`}
                  >
                    <p className="text-xs text-gray-500 font-medium font-mono">{kpi.label}</p>
                    <p className="text-lg font-bold text-[#B89047] mt-1">{kpi.value}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF9F6] border border-gray-200/80 rounded-2xl p-6 sm:p-8 relative min-h-[320px] flex flex-col justify-between">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-green-600 bg-green-50 border border-green-200/60 rounded px-2 py-0.5 uppercase">
                Tiêu chuẩn PGS
              </div>

              <AnimatePresence mode="wait">
                {KPI_METRICS.map((kpi) => kpi.id === activeKpi && (
                  <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-xs font-bold text-[#B89047] uppercase tracking-wider font-mono">Phân tích chuyên sâu:</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{kpi.label} Đạt {kpi.value}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2">{kpi.desc}</p>
                    
                    <div className="pt-4 border-t border-gray-200/60 flex items-center space-x-6 text-xs text-gray-500 font-mono">
                      <div>
                        <span>PHƯƠNG PHÁP ĐO LƯỜNG</span>
                        <p className="font-semibold text-gray-700 mt-0.5">TikTok Pixel API + UTM Tracking</p>
                      </div>
                      <div>
                        <span>TẦN SUẤT BÁO CÁO</span>
                        <p className="font-semibold text-gray-700 mt-0.5">Thời gian thực (Real-time)</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-6 flex justify-end">
                <a href="#contact-form" className="inline-flex items-center text-xs font-bold text-[#B89047] hover:text-[#A37E3B]">
                  Nhận kịch bản demo tối ưu chỉ số <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: DỰ ÁN THỰC TẾ TIKTOK ADS */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Kết Quả Minh Bạch</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Dự Án Tăng Trưởng Thực Tế Từ Đối Tác</p>
            <p className="text-gray-500 mt-2">PGS Agency đồng hành cùng doanh nghiệp đo lường hiệu quả bằng con số tăng trưởng thực tế, nói không với báo cáo ảo.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0 relative h-[240px] md:h-auto rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                <Image 
                  src="https://picsum.photos/seed/case1/200/300" 
                  alt="Case Study 1" 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                  B2B SERVICE
                </div>
              </div>
              <div className="flex flex-col justify-between md:w-2/3">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Dịch vụ Tư vấn Tài chính & Đào tạo Doanh nghiệp</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Xây dựng phễu TikTok Ads nhắm vào tệp chủ doanh nghiệp vừa và nhỏ, kết hợp định dạng video chuyên gia (Founder Talking) và Instant Form siêu tốc.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 my-4 py-3 border-y border-gray-100">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400">CHI PHÍ TRÊN LEAD</span>
                    <p className="text-base font-bold text-[#B89047]">-35% CPL</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400">SỐ LƯỢNG ĐĂNG KÝ</span>
                    <p className="text-base font-bold text-gray-900">1,250+ Leads/Tháng</p>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 italic">
                  *PGS Agency thực hiện trọn gói kịch bản, quay dựng và quản lý tài khoản ads.
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0 relative h-[240px] md:h-auto rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                <Image 
                  src="https://picsum.photos/seed/case2/200/300" 
                  alt="Case Study 2" 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                  ECOMMERCE
                </div>
              </div>
              <div className="flex flex-col justify-between md:w-2/3">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Học Viện Thẩm Mỹ & Đào Tạo Spa Cao Cấp</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Triển khai ma trận Creative dạng UGC review trải nghiệm thực tế học viên kết hợp giải quyết bài toán việc làm ngay sau khi học xong.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4 py-3 border-y border-gray-100">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400">CHI PHÍ AD SPEND</span>
                    <p className="text-base font-bold text-gray-900">Tối ưu hóa 100%</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400">TỶ LỆ CHỐT LEAD</span>
                    <p className="text-base font-bold text-[#B89047]">Tăng 18% CR</p>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 italic">
                  *Hợp tác toàn diện 6 tháng liên tiếp giúp thương hiệu bao phủ tệp học viên toàn quốc.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: GÓI DỊCH VỤ (PACKAGE CARDS) */}
      <section className="py-16 px-4 sm:px-8 bg-white" id="packages">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Bảng Giá Minh Bạch</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Lựa chọn giải pháp phù hợp với doanh nghiệp</p>
            <p className="text-gray-500 mt-2">Dù bạn mới bắt đầu khám phá kênh hay muốn tăng tốc quy mô doanh thu, PGS Agency đều có gói giải pháp được thiết kế tối ưu nhất.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between relative transition-all ${
                  pkg.popular 
                  ? 'border-[#D4AF37] bg-white shadow-lg ring-1 ring-[#D4AF37]/50 lg:-translate-y-2' 
                  : 'border-gray-200/80 bg-[#FAF9F6] shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black font-bold font-mono text-[10px] px-3.5 py-1 rounded-full uppercase tracking-widest shadow">
                    Đề xuất nhiều nhất
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="border-b border-gray-200/60 pb-4">
                    <p className="text-2xl font-bold text-[#B89047]">{pkg.price}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#B89047] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="#contact-form" 
                    className={`w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold transition-all ${
                      pkg.popular 
                      ? 'bg-[#B89047] text-white hover:bg-[#A37E3B]' 
                      : 'bg-white border border-[#B89047]/60 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Đăng ký nhận báo giá chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ MỞ RỘNG (ACCORDION) */}
      <section className="py-16 px-4 sm:px-8 bg-[#FAF9F6]" id="faqs">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Giải Đáp Thắc Mắc</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Hỏi đáp chi tiết về dịch vụ TikTok Ads</p>
            <p className="text-gray-500 mt-2">Các câu hỏi thường gặp nhất giúp đối tác có cái nhìn tường tận trước khi kích hoạt chiến dịch.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200/60 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base pr-4">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${faqOpen === idx ? 'rotate-180 text-[#B89047]' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
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

      {/* SECTION 14: DỊCH VỤ LIÊN QUAN */}
      <section className="py-16 px-4 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#B89047] uppercase tracking-widest font-mono">Hệ Sinh Thái Tăng Trưởng</h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">Các Dịch Vụ Hỗ Trợ Đắc Lực Khác</p>
            <p className="text-gray-500 mt-2">PGS Agency cung cấp giải pháp Marketing tổng thể đa kênh, phối hợp nhuần nhuyễn để tối ưu hiệu quả doanh số cao nhất.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_SERVICES.map((srv, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF9F6] border border-gray-200/40 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">{srv.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-4 flex justify-end">
                  <span className="text-[10px] font-bold text-[#B89047] group-hover:text-amber-700 flex items-center cursor-pointer font-mono">
                    Tìm hiểu thêm <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: CTA CUỐI TRANG & FORM LIÊN HỆ */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-[#FAF9F6] to-white" id="contact-form">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full filter blur-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1 w-fit">
                <Sparkles className="w-4 h-4 text-[#B89047]" />
                <span className="text-[10px] font-bold text-[#B89047] tracking-wider uppercase font-mono">ĐỒNG HÀNH DÀI HẠN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                Bạn muốn bứt phá doanh số kênh TikTok bằng một chiến dịch có chiến lược và đo lường rõ?
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Đội ngũ chuyên gia cấp cao của PGS Agency đã sẵn sàng phân tích sản phẩm, đề xuất kịch bản Hooks đột phá và thiết lập hệ thống đo lường hiệu quả chuẩn xác dành riêng cho doanh nghiệp của bạn.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#B89047]" />
                  <span>Cam kết minh bạch 100% số liệu quảng cáo</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-[#B89047]" />
                  <span>Thời gian phản hồi đề xuất trong vòng 2h làm việc</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {formSubmitted ? (
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#B89047] text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Gửi thông tin thành công!</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Cảm ơn bạn đã quan tâm đến dịch vụ TikTok Ads của PGS Agency. Chuyên gia tư vấn của chúng tôi sẽ liên hệ lại trực tiếp qua số điện thoại của bạn trong vòng 2h làm việc.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-bold text-[#B89047] underline hover:text-[#A37E3B]"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-gray-800 mb-4">Đăng ký nhận tư vấn trực tiếp</h3>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Họ và tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        required
                        placeholder="0912345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Email liên hệ</label>
                      <input
                        type="email"
                        required
                        placeholder="company@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Lĩnh vực kinh doanh</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Mỹ phẩm, Giáo dục, B2B Service..."
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Ngân sách dự kiến mỗi tháng</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm transition-all text-gray-700"
                    >
                      <option value="Dưới 10tr">Dưới 10,000,000 VND</option>
                      <option value="10-30tr">10,000,000 - 30,000,000 VND</option>
                      <option value="30-100tr">30,000,000 - 100,000,000 VND</option>
                      <option value="Trên 100tr">Trên 100,000,000 VND</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold bg-[#B89047] text-white hover:bg-[#A37E3B] transition-all shadow-md hover:shadow-lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Đăng ký nhận phân tích sản phẩm ngay
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SEO & TECHNICAL ASSIGNMENT HUB */}
      

    </div>
  );
}
