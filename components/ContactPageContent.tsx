"use client";

import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Users, 
  Award, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  ExternalLink,
  Laptop,
  Search,
  TrendingUp,
  BarChart3,
  Share2,
  FileText,
  User,
  Building,
  Target,
  DollarSign,
  Activity,
  Heart,
  Smartphone,
  Navigation
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// Types
interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  website: string;
  services: string[];
  goals: string[];
  budget: string;
  message: string;
}

const GOALS_LIST = [
  { id: "lead", label: "Tăng trưởng Leads & Khách hàng", icon: TrendingUp },
  { id: "website", label: "Thiết kế & Tối ưu Website CRO", icon: Laptop },
  { id: "seo", label: "SEO Tổng thể Thống lĩnh Tìm kiếm", icon: Search },
  { id: "ads", label: "Quảng cáo Đa kênh Tối ưu Chi phí", icon: BarChart3 },
  { id: "social", label: "Thương hiệu & Phủ sóng Social", icon: Share2 },
  { id: "content", label: "Phát triển Content Marketing", icon: FileText },
  { id: "tracking", label: "Setup Hệ thống Tracking & GA4", icon: Activity },
];

const SERVICES_LIST = [
  { id: "Website CRO", label: "Thiết kế Website chuẩn CRO & Tốc độ" },
  { id: "SEO", label: "Dịch vụ SEO Tổng thể bền vững" },
  { id: "Google Ads", label: "Quảng cáo Google Search & Performance Max" },
  { id: "Facebook TikTok Ads", label: "Quảng cáo chuyển đổi Facebook, TikTok" },
  { id: "Content Marketing", label: "Sáng tạo nội dung & Chăm sóc Fanpage" },
  { id: "Social PR", label: "PR báo chí & Phủ sóng mạng xã hội" },
  { id: "Data Tracking", label: "Tích hợp GA4, GTM & Tracking dữ liệu chuẩn" },
  { id: "Marketing Consulting", label: "Tư vấn & Đồng hành Chiến lược trọn gói" }
];

const BUDGET_OPTIONS = [
  "Dưới 15 triệu / tháng",
  "15 - 30 triệu / tháng",
  "30 - 60 triệu / tháng",
  "60 - 150 triệu / tháng",
  "Trên 150 triệu / tháng"
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tiếp nhận thông tin",
    time: "Ngay lập tức",
    desc: "PGS ghi nhận dữ liệu form và phân công Chuyên viên Chiến lược liên hệ xác nhận trong vòng 15-30 phút."
  },
  {
    step: "02",
    title: "Phân tích sơ bộ",
    time: "Trong vòng 2 giờ",
    desc: "Đội ngũ kỹ thuật rà soát tổng thể website, SEO và các quảng cáo hiện tại của doanh nghiệp để tìm ra lỗ hổng chuyển đổi."
  },
  {
    step: "03",
    title: "Tư vấn trực tiếp 1:1",
    time: "Trong vòng 24 giờ",
    desc: "Họp trực tuyến qua Zoom/Zalo Meet hoặc gặp mặt trực tiếp. PGS trình bày bức tranh phân tích thực trạng và giải pháp khắc phục."
  },
  {
    step: "04",
    title: "Gửi đề xuất chiến lược",
    time: "Trong vòng 48 giờ",
    desc: "Bản kế hoạch hành động chi tiết bao gồm KPI cam kết, lộ trình phân bổ ngân sách và báo giá chi tiết được gửi tới hòm thư của bạn."
  }
];

const DIAGNOSTICS = [
  {
    id: "cro",
    title: "Tối ưu hóa chuyển đổi (CRO)",
    desc: "PGS rà soát UI/UX, tốc độ tải trang di động, và bố cục các nút CTA. 90% website doanh nghiệp hiện nay đang bị rò rỉ khách hàng tại khâu này.",
    metricName: "Tốc độ phản hồi CTA",
    metricVal: "Trung bình kém (35%)",
    auditItems: ["Rà soát nút kêu gọi hành động", "Phân tích bản đồ nhiệt click", "Kiểm tra tốc độ load trên mobile (<2s)", "Đơn giản hóa form đăng ký"]
  },
  {
    id: "seo",
    title: "Sức khỏe SEO & Tìm kiếm",
    desc: "Đánh giá thứ hạng từ khóa chủ lực mang lại doanh thu thực tế, chất lượng backlink, và các lỗi kỹ thuật on-page cản trở Google lập chỉ mục.",
    metricName: "Điểm tối ưu On-page",
    metricVal: "42 / 100",
    auditItems: ["Rà soát tối ưu thẻ Title/Meta", "Kiểm tra trùng lặp nội dung", "Phân tích hồ sơ liên kết (Backlinks)", "Độ phủ từ khóa thương mại"]
  },
  {
    id: "ads",
    title: "Quảng cáo & Chi phí rác",
    desc: "Rà soát lịch sử tài khoản Google Ads, Facebook Ads để phát hiện các cài đặt lãng phí ngân sách, nhắm sai đối tượng hoặc click ảo.",
    metricName: "Chi phí rác tối thiểu",
    metricVal: "Thường chiếm 25% - 40%",
    auditItems: ["Phân tích từ khóa phủ định", "Đánh giá chất lượng điểm điểm quảng cáo", "Kiểm tra vị trí hiển thị quảng cáo", "Tối ưu hóa tần suất hiển thị"]
  },
  {
    id: "tracking",
    title: "Đo lường dữ liệu (Tracking)",
    desc: "Xác minh các sự kiện chuyển đổi (click sđt, gửi form, mua hàng) có được đo lường chính xác và đồng bộ về Google Analytics 4 hay chưa.",
    metricName: "Tỉ lệ sai sót đo lường",
    metricVal: "Cao (~50% doanh nghiệp cài sai)",
    auditItems: ["Kiểm tra cài đặt GA4 & GTM", "Rà soát tracking sự kiện nút bấm", "Đồng bộ phễu chuyển đổi", "Cấu hình Google Signal bảo mật"]
  },
  {
    id: "content",
    title: "Khoảng trống nội dung (Content Gap)",
    desc: "Phân tích đối thủ cạnh tranh đang thu hút khách hàng bằng những chủ đề nào mà website của bạn đang bỏ lỡ hoàn toàn.",
    metricName: "Độ phủ nội dung ngành",
    metricVal: "Hạn chế",
    auditItems: ["Đối chiếu cấu trúc từ khóa đối thủ", "Đánh giá trải nghiệm đọc nội dung", "Rà soát tính thuyết phục của kịch bản viết", "Tần suất phân phối thông điệp"]
  }
];

const FAQS = [
  {
    q: "Buổi tư vấn chiến lược ban đầu tại PGS có mất phí không?",
    a: "Hoàn toàn MIỄN PHÍ. PGS Agency cung cấp buổi họp tư vấn 1:1 dài 45 phút trị giá 3.000.000 VNĐ hoàn toàn miễn phí cho các doanh nghiệp nghiêm túc muốn cải thiện hệ thống Marketing số. Chúng tôi tin tưởng vào năng lực chứng minh trực quan thay vì những lời hứa hẹn suông."
  },
  {
    q: "Doanh nghiệp tôi cần chuẩn bị những thông tin gì trước cuộc gặp?",
    a: "Để buổi tư vấn đạt hiệu quả cao nhất, bạn nên chuẩn bị: link Website/Fanpage hiện tại, danh sách 3 đối thủ lớn nhất bạn muốn vượt mặt, ngân sách dự kiến ước lượng, và số liệu sơ bộ về số lượng lead/doanh số hiện tại của doanh nghiệp."
  },
  {
    q: "Bao lâu tôi sẽ nhận được phản hồi sau khi gửi form liên hệ này?",
    a: "PGS cam kết phản hồi xác nhận qua Zalo/Điện thoại trong vòng 15-30 phút trong giờ làm việc. Kế hoạch sơ bộ bằng văn bản hoặc slide phác thảo giải pháp ban đầu sẽ được chuyển giao trong vòng 2 giờ làm việc tiếp theo."
  },
  {
    q: "PGS Agency có cung cấp bảng báo giá chi tiết và cam kết KPI không?",
    a: "Có. Sau buổi họp 1:1 làm rõ nhu cầu, PGS sẽ gửi bảng Đề xuất Kế hoạch chi tiết kèm theo báo giá rõ ràng từng hạng mục và các chỉ số KPI cam kết định lượng (như số lượng lead, thứ hạng từ khóa, chi phí trên mỗi lead - CPL, doanh số kỳ vọng)."
  },
  {
    q: "Tôi có thể thuê PGS làm từng dịch vụ riêng lẻ (như chỉ làm SEO hoặc chỉ chạy Ads) không?",
    a: "Được. Mặc dù PGS luôn khuyến nghị giải pháp Marketing Tổng thể để các kênh bổ trợ lẫn nhau tạo thành một hệ thống tăng trưởng khép kín, chúng tôi vẫn sẵn sàng đồng hành cùng bạn từ những dịch vụ riêng lẻ cốt lõi (như Tối ưu Website, Triển khai chiến dịch SEO bền vững, hay Tối ưu hóa tài khoản quảng cáo Ads)."
  }
];

export default function ContactPageContent() {
  // Step tracker
  const [formStep, setFormStep] = useState<number>(1);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  // Interactive diagnostic tab
  const [activeDiagnostic, setActiveDiagnostic] = useState<string>("cro");
  
  // Interactive office maps tab
  const [activeOffice, setActiveOffice] = useState<string>("hcm");

  // Accordion FAQs state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    website: "",
    services: [],
    goals: [],
    budget: "",
    message: ""
  });

  // Goal suggestion logic
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  // API Call state
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [proposalMarkdown, setProposalMarkdown] = useState<string>("");
  const [submittedLeadId, setSubmittedLeadId] = useState<string>("");

  // Check prefers reduced motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    const timer = setTimeout(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    }, 0);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timer);
    };
  }, []);

  // Sync Goal Selector with Recommended Services
  const handleSelectGoal = (goalId: string, goalLabel: string) => {
    setSelectedGoalId(goalId);
    
    // Toggle goal in state
    let newGoals = [...formData.goals];
    if (newGoals.includes(goalLabel)) {
      newGoals = newGoals.filter(g => g !== goalLabel);
    } else {
      newGoals.push(goalLabel);
    }

    // Auto-suggested services map
    let suggestedServices: string[] = [...formData.services];
    
    if (goalId === "lead") {
      const servicesToAdd = ["Google Ads", "Facebook TikTok Ads", "Marketing Consulting"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "website") {
      const servicesToAdd = ["Website CRO", "Marketing Consulting"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "seo") {
      const servicesToAdd = ["SEO", "Content Marketing"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "ads") {
      const servicesToAdd = ["Google Ads", "Facebook TikTok Ads"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "social") {
      const servicesToAdd = ["Social PR", "Content Marketing"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "content") {
      const servicesToAdd = ["Content Marketing"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    } else if (goalId === "tracking") {
      const servicesToAdd = ["Data Tracking"];
      servicesToAdd.forEach(s => { if (!suggestedServices.includes(s)) suggestedServices.push(s); });
    }

    setFormData(prev => ({
      ...prev,
      goals: newGoals,
      services: suggestedServices
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (serviceLabel: string) => {
    setFormData(prev => {
      const current = prev.services;
      const updated = current.includes(serviceLabel)
        ? current.filter(s => s !== serviceLabel)
        : [...current, serviceLabel];
      return { ...prev, services: updated };
    });
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) return "Vui lòng nhập Họ và tên";
    if (!formData.phone.trim()) return "Vui lòng nhập Số điện thoại";
    // basic phone validation
    if (!/^[0-9+() -]{9,15}$/.test(formData.phone.trim())) return "Số điện thoại không đúng định dạng";
    if (!formData.email.trim()) return "Vui lòng nhập Email";
    if (!/\S+@\S+\.\S+/.test(formData.email.trim())) return "Email không đúng định dạng";
    if (!formData.company.trim()) return "Vui lòng nhập Tên doanh nghiệp";
    return null;
  };

  const handleNextStep = () => {
    const error = validateStep1();
    if (error) {
      alert(error);
      return;
    }
    setFormStep(2);
    // Smooth scroll to form container top
    const formEl = document.getElementById("pgs-contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep1();
    if (error) {
      setFormStep(1);
      alert(error);
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus("success");
        setSubmittedLeadId(result.leadId);
        setProposalMarkdown(result.proposal);
        
        // Scroll to proposal response
        setTimeout(() => {
          const successEl = document.getElementById("pgs-success-panel");
          if (successEl) {
            successEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
          }
        }, 100);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Có lỗi xảy ra trong quá trình gửi. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
    }
  };

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalMarkdown);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Scroll smooth anchor
  const scrollToForm = () => {
    const formEl = document.getElementById("pgs-contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden w-full">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-[#FAF9F6] border-b border-gold-200/30 overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full text-gold-300/10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="100" y2="70" stroke="currentColor" strokeWidth="0.1" />
            <line x1="10" y1="0" x2="90" y2="100" stroke="currentColor" strokeWidth="0.1" />
            <line x1="0" y1="80" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full">
          {/* Left: Headline & Strategy Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-100 border border-gold-300/40 text-gold-800 text-xs font-semibold rounded-full tracking-wide w-fit uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Light Premium Growth Consulting</span>
            </div>
            
            <h1 id="main-hero-title" className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-500 tracking-tight leading-[1.1] text-glow">
              Trao đổi với <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700">PGS Agency</span> về hệ thống Marketing phù hợp với doanh nghiệp của bạn
            </h1>

            <p className="text-base sm:text-lg text-charcoal-400 leading-relaxed max-w-xl">
              Đừng làm Marketing rời rạc. Hãy xây dựng **hệ thống tăng trưởng số đồng bộ** giúp tối ưu tỷ lệ chuyển đổi, bứt phá lượng lead tự nhiên và tiết kiệm tối đa chi phí quảng cáo rác.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={scrollToForm}
                className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Nhận Tư Vấn Miễn Phí</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="tel:0931119999"
                className="px-8 py-4 bg-white hover:bg-gold-50 text-charcoal-500 font-bold border border-gold-300/50 hover:border-gold-500 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Phone className="w-5 h-5 text-gold-500" />
                <span>Call Hotline: 093 111 9999</span>
              </a>
            </div>

            <div className="flex items-center space-x-6 text-xs text-charcoal-400 pt-4 border-t border-gold-200/30 w-fit">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-gold-500" />
                <span>Phân tích sơ bộ trong 2h</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-gold-500" />
                <span>Cam kết KPI số rõ ràng</span>
              </div>
            </div>
          </div>

          {/* Right: Floating 3D-inspired Consultation Panel */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Backglow element */}
              <div className="absolute inset-0 rounded-full bg-gold-300/10 blur-3xl animate-pulse duration-[8000ms]"></div>
              
              {/* Outer decorative orbit line */}
              <div className="absolute inset-2 border border-dashed border-gold-300/20 rounded-full animate-[spin_60s_linear_infinite]"></div>

              {/* Central Premium 3D-like Panel Card */}
              <div className="absolute w-[80%] bg-white/80 backdrop-blur-xl border border-premium rounded-2xl p-6 shadow-2xl z-10 flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-500">
                <div className="flex justify-between items-center pb-4 border-b border-gold-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                    <span className="font-display font-bold text-sm tracking-wide uppercase text-charcoal-500">PGS GROWTH ENGINE</span>
                  </div>
                  <span className="text-[10px] font-mono text-gold-600 bg-gold-100 px-2 py-0.5 rounded-full font-bold">LIVE METRIC</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-charcoal-400">Hiệu suất chuyển đổi trung bình</p>
                    <p className="text-2xl font-display font-bold text-charcoal-500 flex items-baseline">
                      +35.4% <span className="text-xs text-emerald-500 ml-2 font-sans font-normal">▲ sau tối ưu hóa</span>
                    </p>
                  </div>

                  <div className="w-full bg-gold-100/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gold-500 h-full rounded-full w-[78%] animate-pulse"></div>
                  </div>

                  <p className="text-[11px] text-charcoal-400 italic">
                    &ldquo;Tổ hợp Website, SEO và Ads kết nối chặt chẽ giúp tối thiểu hóa chi phí click ảo và bùng nổ chuyển đổi khách hàng tiềm năng.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-100 flex items-center justify-between text-[11px]">
                  <span className="text-charcoal-400">Đại diện tăng trưởng:</span>
                  <span className="font-bold text-gold-800">PGS Consulting Director</span>
                </div>
              </div>

              {/* Floating Service Glass Orb-Icons with descriptions on hover */}
              <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white border border-premium shadow-lg flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite] z-20 hover:border-gold-500 transition-colors group cursor-help">
                <Search className="w-5 h-5 text-gold-500" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal-500 text-white text-[10px] py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow font-medium">SEO Audit</span>
              </div>

              <div className="absolute top-12 right-0 w-12 h-12 rounded-xl bg-white border border-premium shadow-lg flex items-center justify-center animate-[bounce_5s_ease-in-out_1s_infinite] z-20 hover:border-gold-500 transition-colors group cursor-help">
                <BarChart3 className="w-5 h-5 text-gold-500" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal-500 text-white text-[10px] py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow font-medium">Ads Funnel</span>
              </div>

              <div className="absolute bottom-12 left-0 w-12 h-12 rounded-xl bg-white border border-premium shadow-lg flex items-center justify-center animate-[bounce_4.5s_ease-in-out_0.5s_infinite] z-20 hover:border-gold-500 transition-colors group cursor-help">
                <Laptop className="w-5 h-5 text-gold-500" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal-500 text-white text-[10px] py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow font-medium">Web CRO</span>
              </div>

              <div className="absolute bottom-6 right-8 w-12 h-12 rounded-xl bg-white border border-premium shadow-lg flex items-center justify-center animate-[bounce_5.5s_ease-in-out_1.5s_infinite] z-20 hover:border-gold-500 transition-colors group cursor-help">
                <Activity className="w-5 h-5 text-gold-500" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal-500 text-white text-[10px] py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow font-medium">Data Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHỌN MỤC TIÊU CẦN TƯ VẤN (SELECTOR) */}
      <section id="goals-selector" className="py-16 bg-white border-b border-gold-200/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Interactive CRO Experience</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight">Bước 0: Chọn mục tiêu tăng trưởng chính của bạn</h2>
            <p className="text-sm text-charcoal-400">
              Chọn mục tiêu chính dưới đây, hệ thống thông minh của PGS sẽ tự động thiết lập biểu mẫu tư vấn phù hợp nhất và gợi ý lộ trình dịch vụ phù hợp ở bước tiếp theo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {GOALS_LIST.map((goal) => {
              const Icon = goal.icon;
              const isSelected = formData.goals.includes(goal.label);
              return (
                <button
                  key={goal.id}
                  onClick={() => handleSelectGoal(goal.id, goal.label)}
                  className={`p-5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                    isSelected 
                      ? "bg-gold-50 border-gold-500 shadow-md ring-1 ring-gold-500/30" 
                      : "bg-[#FAF9F6] border-gold-200/40 hover:border-gold-400 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? "bg-gold-500 text-charcoal-900" : "bg-gold-100 text-gold-600 group-hover:bg-gold-200"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-charcoal-500 line-clamp-2">{goal.label}</h3>
                    <p className="text-[11px] text-charcoal-400 mt-1">
                      {isSelected ? "✓ Đã áp dụng cấu hình" : "Nhấp để tối ưu hóa form"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={scrollToForm}
              className="px-6 py-3 bg-charcoal-500 hover:bg-charcoal-600 text-white font-semibold text-xs rounded-lg flex items-center space-x-2 transition-all cursor-pointer"
            >
              <span>Tiếp tục điền chi tiết biểu mẫu yêu cầu tư vấn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. FORM TƯ VẤN 2 BƯỚC & GEMINI SUBMIT RESPONSE */}
      <section id="pgs-contact-form" className="py-20 bg-gradient-to-b from-white to-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-6">
          
          {submitStatus !== "success" ? (
            <div className="bg-white border border-premium rounded-2xl shadow-xl overflow-hidden">
              {/* Form Header Progress Indicator */}
              <div className="bg-[#FAF9F6] border-b border-gold-200/30 p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal-500">Gửi Yêu Cầu Tư Vấn Tăng Trưởng</h3>
                  <p className="text-xs text-charcoal-400 mt-0.5">Thời gian PGS lập phương án chiến lược sơ bộ là 2 giờ làm việc.</p>
                </div>
                
                {/* Visual Step Indicator */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className={`flex items-center space-x-1.5 font-bold ${formStep === 1 ? "text-gold-600" : "text-charcoal-300"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${formStep === 1 ? "bg-gold-500 text-charcoal-900" : "bg-charcoal-100"}`}>1</span>
                    <span>Liên hệ</span>
                  </div>
                  <div className="w-6 h-px bg-gold-200"></div>
                  <div className={`flex items-center space-x-1.5 font-bold ${formStep === 2 ? "text-gold-600" : "text-charcoal-300"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${formStep === 2 ? "bg-gold-500 text-charcoal-900" : "bg-charcoal-100"}`}>2</span>
                    <span>Chi tiết yêu cầu</span>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmitForm} className="p-8 space-y-6">
                
                {/* STEP 1: CONTACT INFORMATION */}
                {formStep === 1 && (
                  <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="bg-gold-50/50 p-4 border border-gold-200/20 rounded-lg text-xs text-gold-800 leading-relaxed flex items-start space-x-3">
                      <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Cam kết bảo mật tuyệt đối:</strong> Mọi thông tin, website, dữ liệu ngân sách và nội dung ý tưởng trao đổi của bạn đều được PGS bảo vệ nghiêm ngặt theo điều khoản bảo mật thông tin (NDA) và cam kết không tiết lộ cho bên thứ ba.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-gold-500" />
                          <span>Họ và tên *</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Ví dụ: Nguyễn Văn A"
                          required
                          className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-gold-500" />
                          <span>Số điện thoại *</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Ví dụ: 0931119999"
                          required
                          className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-gold-500" />
                          <span>Email liên hệ *</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Ví dụ: ceo@doanhnghiep.com"
                          required
                          className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                          <Building className="w-3.5 h-3.5 text-gold-500" />
                          <span>Tên công ty / doanh nghiệp *</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Ví dụ: Công ty CP Công nghệ ABC"
                          required
                          className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-bold rounded-lg transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
                      >
                        <span>Tiếp Tục Bước 2</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CAMPAIGN DETAILS & REQUIREMENTS */}
                {formStep === 2 && (
                  <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                        <Laptop className="w-3.5 h-3.5 text-gold-500" />
                        <span>Website / Fanpage hiện tại</span>
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="Ví dụ: https://mybusiness.vn (Nếu có)"
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all"
                      />
                    </div>

                    {/* Checkboxes: Dịch vụ quan tâm */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                        <Target className="w-3.5 h-3.5 text-gold-500" />
                        <span>Dịch vụ bạn đang quan tâm (Có thể chọn nhiều)</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#FAF9F6] p-4 border border-gold-200/20 rounded-lg">
                        {SERVICES_LIST.map((srv) => {
                          const isChecked = formData.services.includes(srv.id);
                          return (
                            <label key={srv.id} className="flex items-center space-x-3 text-xs text-charcoal-500 cursor-pointer py-1 select-none">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(srv.id)}
                                className="w-4 h-4 accent-gold-500 rounded border-gold-300 text-gold-500"
                              />
                              <span className={isChecked ? "font-semibold text-gold-800" : ""}>{srv.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ngân sách dự kiến */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-gold-500" />
                        <span>Ngân sách đầu tư ước tính hàng tháng</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {BUDGET_OPTIONS.map((opt) => {
                          const isSelected = formData.budget === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, budget: opt }))}
                              className={`p-2.5 text-center text-xs rounded border transition-all cursor-pointer ${
                                isSelected 
                                  ? "bg-gold-500 border-gold-600 font-bold text-charcoal-900" 
                                  : "bg-[#FAF9F6] border-gold-200/30 hover:border-gold-400 text-charcoal-400"
                              }`}
                            >
                              {opt.replace(" / tháng", "")}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Nội dung tư vấn cụ thể */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block flex items-center space-x-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-gold-500" />
                        <span>Nêu mục tiêu cụ thể, vấn đề đang gặp hoặc câu hỏi của bạn</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Hãy chia sẻ thêm về nỗi đau hiện tại của doanh nghiệp: Quảng cáo đắt đỏ không ra lead? SEO đứng im không lên top? Website lỗi giao diện?..."
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-gold-200/40 focus:border-gold-500 focus:bg-white rounded-lg text-sm text-charcoal-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gold-100">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="px-6 py-3 bg-white hover:bg-gold-50 text-charcoal-400 font-bold border border-gold-200 rounded-lg transition-all cursor-pointer"
                      >
                        Quay lại Bước 1
                      </button>

                      <button
                        type="submit"
                        disabled={submitStatus === "submitting"}
                        className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 disabled:bg-gold-300 text-charcoal-900 font-bold rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                      >
                        {submitStatus === "submitting" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-charcoal-900 border-t-transparent rounded-full animate-spin"></span>
                            <span>Đang Lập Kế Hoạch AI...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Gửi Đăng Ký & Tạo Chiến Lược Sơ Bộ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    <strong>Đã xảy ra lỗi:</strong> {errorMessage}
                  </div>
                )}
              </form>
            </div>
          ) : (
            
            /* SUCCESS PANEL: AI GENERATED GROWTH PROPOSAL (CRO-DRIVEN) */
            <div id="pgs-success-panel" className="bg-white border-2 border-gold-500 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out]">
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-8 text-charcoal-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white/20 text-xs font-bold rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>HỆ THỐNG AI PHÂN TÍCH TIẾP NHẬN THÀNH CÔNG</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl tracking-tight">Cảm ơn bạn! Yêu cầu tư vấn của bạn đã được tiếp nhận.</h3>
                  <p className="text-xs text-charcoal-800 font-medium">
                    Mã hồ sơ: <span className="font-mono font-bold bg-white/30 px-2 py-0.5 rounded text-charcoal-900">{submittedLeadId}</span> | Trạng thái: **Đã lập hồ sơ phân tích**
                  </p>
                </div>
                
                <div className="shrink-0 flex gap-3">
                  <button
                    onClick={handleCopyProposal}
                    className="px-4 py-2 bg-charcoal-500 hover:bg-charcoal-600 text-white font-bold text-xs rounded-lg flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-gold-500" />
                        <span>Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Sao chép đề xuất</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSubmitStatus("idle");
                      setFormStep(1);
                      setFormData({
                        fullName: "",
                        phone: "",
                        email: "",
                        company: "",
                        website: "",
                        services: [],
                        goals: [],
                        budget: "",
                        message: ""
                      });
                    }}
                    className="px-4 py-2 bg-white text-charcoal-500 font-bold text-xs rounded-lg flex items-center space-x-1 transition-all border border-charcoal-100 cursor-pointer"
                  >
                    <span>Gửi biểu mẫu mới</span>
                  </button>
                </div>
              </div>

              {/* Instant Proposal Content Area */}
              <div className="p-8 space-y-6">
                <div className="bg-[#FAF9F6] border border-gold-200 p-4 rounded-xl flex items-start space-x-3.5">
                  <div className="p-2 bg-gold-500 text-charcoal-900 rounded-lg shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal-500">PGS Growth Team đang phân tích sâu dữ liệu website của bạn...</h4>
                    <p className="text-xs text-charcoal-400 mt-1 leading-relaxed">
                      Dựa trên thông tin biểu mẫu bạn vừa cung cấp, hệ thống tư vấn PGS đã khởi tạo **Phương án Tư vấn & Phân bổ Ngân sách thông minh** do mô hình AI của PGS biên soạn chi tiết dưới đây. Hãy tham khảo giải pháp tư vấn sơ bộ này trước khi PGS liên hệ trực tiếp đặt lịch họp 1:1.
                    </p>
                  </div>
                </div>

                {/* Gemini Markdown Response Container */}
                <div className="border border-gold-200/50 rounded-xl p-6 md:p-8 bg-white max-h-[500px] overflow-y-auto shadow-inner prose prose-slate prose-xs max-w-none">
                  <div className="markdown-body text-xs leading-relaxed space-y-4">
                    <ReactMarkdown>{proposalMarkdown}</ReactMarkdown>
                  </div>
                </div>

                <div className="bg-gold-50/70 p-4 border border-premium rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-2 text-gold-800">
                    <Clock className="w-4 h-4 text-gold-500 animate-pulse" />
                    <span>Chuyên viên PGS sẽ gọi điện hoặc gửi kết quả phân tích website chuyên sâu qua Zalo trong vòng 2 giờ.</span>
                  </div>
                  <a
                    href="https://zalo.me/0931119999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#0068FF] hover:bg-[#005AE0] text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-1.5 transition-all self-start sm:self-auto"
                  >
                    <span>Trao đổi nhanh qua Zalo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. LIÊN HỆ NHANH (CONTACT CARDS) */}
      <section id="fast-contact" className="py-16 bg-white border-t border-b border-gold-200/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Direct Communications</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">Kết nối trực tiếp với chuyên gia PGS</h2>
            <p className="text-sm text-charcoal-400">
              Chọn kênh liên hệ nhanh nhất để nhận hỗ trợ tư vấn tức thì không cần điền form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Phone/Hotline */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gold-100 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-900 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Hotline Tư Vấn 24/7</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">Bộ phận tiếp nhận yêu cầu, giải đáp thắc mắc và hỗ trợ xử lý khẩn cấp.</p>
              </div>
              <a href="tel:0931119999" className="text-base font-display font-bold text-gold-800 mt-6 hover:underline flex items-center space-x-1">
                <span>093 111 9999</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Zalo */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gold-100 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-900 transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Zalo Official Account</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">Nhắn tin trực tiếp với chuyên gia chiến lược để nhận tư vấn tài liệu sơ bộ.</p>
              </div>
              <a href="https://zalo.me/0931119999" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-gold-800 mt-6 hover:underline flex items-center space-x-1">
                <span>PGS Growth Team</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gold-100 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-900 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Email Nhận Brief</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">Gửi các file tài liệu thiết kế, tài liệu thầu hoặc yêu cầu báo giá chính thức.</p>
              </div>
              <a href="mailto:growth@pgsagency.vn" className="text-sm font-mono font-bold text-gold-800 mt-6 hover:underline break-all">
                growth@pgsagency.vn
              </a>
            </div>

            {/* Office Time */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gold-100 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-900 transition-all">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Giờ Làm Việc</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">Đội ngũ PGS sẵn sàng hỗ trợ bạn theo khung giờ hành chính quốc gia.</p>
              </div>
              <div className="text-xs font-bold text-charcoal-500 mt-6">
                <p>Thứ 2 - Thứ 6: 08:30 - 18:00</p>
                <p>Thứ 7: 08:30 - 12:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SAU KHI GỬI FORM SẼ XẢY RA GÌ (TIMELINE) */}
      <section id="what-happens-next" className="py-20 bg-[#FAF9F6] border-b border-gold-200/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Operational Clarity</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">Quy trình xử lý yêu cầu tư vấn tại PGS</h2>
            <p className="text-sm text-charcoal-400">
              Minh bạch và cam kết tốc độ phản hồi tối đa. Chúng tôi tôn trọng thời gian của doanh nghiệp của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Horizontal Line connector (for md and up) */}
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold-300/30 via-gold-500 to-gold-300/30 z-0"></div>

            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white border border-premium p-6 rounded-xl relative z-10 hover:border-gold-500 transition-all shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-extrabold text-3xl text-gold-500">{step.step}</span>
                  <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2 py-1 rounded-full">{step.time}</span>
                </div>
                <h3 className="font-bold text-charcoal-500 text-base">{step.title}</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PGS SẼ PHÂN TÍCH GÌ (INTERACTIVE DIAGNOSTICS) */}
      <section id="analysis-preview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Strategic Audit Preview</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">PGS sẽ rà soát và phân tích những yếu tố nào?</h2>
            <p className="text-sm text-charcoal-400">
              Trước khi đưa ra bất kỳ đề xuất chiến dịch nào, PGS sẽ rà soát kỹ lưỡng hệ thống dữ liệu số của bạn để phát hiện các kẽ hở chuyển đổi gây lãng phí ngân sách.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Left selector menu */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {DIAGNOSTICS.map((diag) => (
                <button
                  key={diag.id}
                  onClick={() => setActiveDiagnostic(diag.id)}
                  className={`p-4 rounded-lg border text-left transition-all flex items-center justify-between group cursor-pointer ${
                    activeDiagnostic === diag.id
                      ? "bg-gold-500 border-gold-600 text-charcoal-900 font-bold"
                      : "bg-[#FAF9F6] border-gold-200/40 hover:border-gold-400 text-charcoal-400 hover:bg-white"
                  }`}
                >
                  <span className="text-xs">{diag.title}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${activeDiagnostic === diag.id ? "translate-x-1 text-charcoal-900" : "text-gold-500 group-hover:translate-x-1"}`} />
                </button>
              ))}
            </div>

            {/* Right diagnostic detailed preview card */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-premium p-8 rounded-xl space-y-6">
              {DIAGNOSTICS.map((diag) => {
                if (diag.id !== activeDiagnostic) return null;
                return (
                  <div key={diag.id} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-charcoal-500">{diag.title}</h3>
                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase">Lỗi phổ biến nhất</span>
                      </div>
                      <p className="text-xs text-charcoal-400 leading-relaxed">{diag.desc}</p>
                    </div>

                    {/* Diagnostic metric mockup */}
                    <div className="p-4 bg-white border border-gold-200/40 rounded-lg flex justify-between items-center text-xs">
                      <span className="text-charcoal-400 font-medium">Chỉ số rà soát: **{diag.metricName}**</span>
                      <span className="font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200">{diag.metricVal}</span>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-charcoal-500 uppercase tracking-wider">Hạng mục kiểm tra chi tiết:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {diag.auditItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-charcoal-400">
                            <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BẢN ĐỒ / ĐỊA CHỈ TRỰC QUAN */}
      <section id="office-location" className="py-20 bg-[#FAF9F6] border-t border-b border-gold-200/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Geographical Presence</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">Văn phòng làm việc của PGS</h2>
            <p className="text-sm text-charcoal-400">
              Hãy ghé thăm trực tiếp văn phòng của chúng tôi để trao đổi chuyên sâu cùng đội ngũ C-level.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Left: Interactive Address Tabs */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveOffice("hcm")}
                  className={`flex-1 py-3 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    activeOffice === "hcm"
                      ? "bg-gold-500 border-gold-600 text-charcoal-900"
                      : "bg-white border-gold-200/40 hover:border-gold-300 text-charcoal-400"
                  }`}
                >
                  Trụ sở TP. HCM
                </button>
                <button
                  onClick={() => setActiveOffice("hn")}
                  className={`flex-1 py-3 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    activeOffice === "hn"
                      ? "bg-gold-500 border-gold-600 text-charcoal-900"
                      : "bg-white border-gold-200/40 hover:border-gold-300 text-charcoal-400"
                  }`}
                >
                  Chi nhánh Hà Nội
                </button>
              </div>

              {activeOffice === "hcm" ? (
                <div className="bg-white border border-premium p-6 rounded-xl space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-base text-charcoal-500">Trụ sở PGS Agency - Hồ Chí Minh</h3>
                    <div className="space-y-3 text-xs text-charcoal-400 leading-relaxed">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>Tầng 12, Viettel Tower, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP. Hồ Chí Minh.</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>093 111 9999 (Hotline HCM)</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>Giờ mở cửa: 08:30 - 18:00 (Thứ 2 - Thứ 6)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold-100 flex items-center justify-between text-xs gap-4">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("10.7788, 106.6789");
                        alert("Đã sao chép tọa độ Trụ sở HCM!");
                      }}
                      className="px-4 py-2 bg-[#FAF9F6] border border-gold-200 rounded text-charcoal-400 hover:text-charcoal-500 font-medium cursor-pointer"
                    >
                      Sao chép tọa độ
                    </button>
                    <a 
                      href="https://maps.google.com/?q=Viettel+Tower+285+Cach+Mang+Thang+Tam+Quan+10+HCMC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-charcoal-500 text-white hover:bg-charcoal-600 rounded flex items-center space-x-1 font-bold"
                    >
                      <span>Xem đường đi</span>
                      <Navigation className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-premium p-6 rounded-xl space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-base text-charcoal-500">Chi nhánh PGS Agency - Hà Nội</h3>
                    <div className="space-y-3 text-xs text-charcoal-400 leading-relaxed">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>Tầng 6, Keangnam Landmark 72, Đường Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội.</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>093 111 9999 (Hotline HN)</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>Giờ mở cửa: 08:30 - 18:00 (Thứ 2 - Thứ 6)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold-100 flex items-center justify-between text-xs gap-4">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("21.0165, 105.7836");
                        alert("Đã sao chép tọa độ Chi nhánh HN!");
                      }}
                      className="px-4 py-2 bg-[#FAF9F6] border border-gold-200 rounded text-charcoal-400 hover:text-charcoal-500 font-medium cursor-pointer"
                    >
                      Sao chép tọa độ
                    </button>
                    <a 
                      href="https://maps.google.com/?q=Keangnam+Landmark+72+Ha+Noi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-charcoal-500 text-white hover:bg-charcoal-600 rounded flex items-center space-x-1 font-bold"
                    >
                      <span>Xem đường đi</span>
                      <Navigation className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Map Embed Visual mockup (interactive, premium and simulated) */}
            <div className="lg:col-span-7 bg-white border border-premium rounded-xl overflow-hidden shadow-lg min-h-[300px] relative flex flex-col">
              {/* Fake Interactive map controls */}
              <div className="bg-[#FAF9F6] border-b border-gold-100 px-4 py-2.5 flex items-center justify-between text-xs text-charcoal-400">
                <span className="font-semibold">Bản đồ vệ tinh (Simulated Interactive View)</span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-medium text-[10px]">Tín hiệu GPS: Ổn định</span>
                </span>
              </div>
              
              {/* Map Canvas Background Vector design */}
              <div className="relative flex-1 bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 opacity-15">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Simulated Google Map visual */}
                <div className="relative z-10 w-full h-full max-h-[320px] rounded border border-gold-200 bg-[#E8ECE9] flex flex-col justify-between p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                  {/* Simulated streets lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-full h-1 bg-white/60 top-1/3 transform -rotate-12"></div>
                    <div className="absolute w-full h-1 bg-white/60 top-2/3 transform rotate-6"></div>
                    <div className="absolute h-full w-1 bg-white/60 left-1/4 transform rotate-12"></div>
                    <div className="absolute h-full w-1 bg-white/60 left-3/4 transform -rotate-6"></div>
                  </div>

                  <div className="flex justify-between items-start z-10">
                    <div className="bg-white/90 backdrop-blur border border-gold-200 p-2.5 rounded shadow max-w-[200px] text-[10px] text-charcoal-400 space-y-1">
                      <p className="font-bold text-charcoal-500">PGS Agency Office</p>
                      <p className="line-clamp-2">
                        {activeOffice === "hcm" 
                          ? "Viettel Tower, 285 CMT8, Quận 10, TP. HCM"
                          : "Keangnam Landmark 72, Nam Từ Liêm, Hà Nội"
                        }
                      </p>
                    </div>
                  </div>

                  {/* Map Pin Animated Indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                    <div className="relative">
                      <span className="absolute -inset-2 bg-gold-500/40 rounded-full animate-ping"></span>
                      <MapPin className="w-8 h-8 text-gold-600 filter drop-shadow relative z-10" />
                    </div>
                    <span className="bg-charcoal-500 text-white text-[9px] py-0.5 px-2 rounded mt-1.5 font-bold shadow uppercase tracking-wider">PGS {activeOffice === "hcm" ? "HQ" : "Hà Nội"}</span>
                  </div>

                  <div className="flex justify-end items-end z-10 text-[9px] text-charcoal-400 font-semibold bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-gold-100 self-end">
                    Map Data © 2026 PGS Digital Tech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRUST SIGNALS (CREDENTIALS) */}
      <section id="trust-signals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Corporate Credentials</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">Doanh nghiệp hoàn toàn an tâm khi chọn PGS</h2>
            <p className="text-sm text-charcoal-400">
              Minh bạch pháp lý, đội ngũ chứng chỉ quốc tế và triết lý làm việc dựa trên dữ liệu tăng trưởng thật.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Legal compliance */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-8 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Pháp nhân minh bạch</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed">
                Đơn vị chủ quản: **Công ty TNHH Công Nghệ Số PGS**  
                Giấy phép ĐKKD số **0317894562** do Sở Kế hoạch và Đầu tư cấp. Hợp đồng dịch vụ rõ ràng, xuất hóa đơn VAT đầy đủ theo quy định của pháp luật.
              </p>
            </div>

            {/* Team Expertise */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-8 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-500">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Chuyên gia thực chiến</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed">
                Đội ngũ PGS bao gồm cựu chuyên viên tư vấn tại các tập đoàn lớn (Ex-Googlers, Meta Experts) có hơn 7 năm kinh nghiệm thực tế. Trực tiếp lên chiến lược và giám sát vận hành tối ưu, không giao phó cho CTV học việc.
              </p>
            </div>

            {/* Industry Partners */}
            <div className="bg-[#FAF9F6] border border-gold-200/40 p-8 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-500">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-charcoal-500 text-sm uppercase tracking-wide">Đối tác được chứng nhận</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed">
                PGS Agency tự hào là **Google Premier Partner**, **Meta Business Partner**, và sở hữu đầy đủ chứng chỉ chuyên môn nâng cao về Google Analytics 4 (GA4), HubSpot Inbound Marketing, và tối ưu CRO chuẩn quốc tế.
              </p>
            </div>
          </div>
          
          {/* Logo Trust Partner indicators */}
          <div className="mt-12 pt-10 border-t border-gold-200/30 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50 select-none">
            <span className="text-xs font-mono font-bold tracking-widest text-charcoal-400">GOOGLE PREMIER PARTNER</span>
            <span className="text-xs font-mono font-bold tracking-widest text-charcoal-400">META BUSINESS PARTNER</span>
            <span className="text-xs font-mono font-bold tracking-widest text-charcoal-400">TIKTOK MARKETING AGENCY</span>
            <span className="text-xs font-mono font-bold tracking-widest text-charcoal-400">HUBSPOT CERTIFIED</span>
          </div>
        </div>
      </section>

      {/* 9. FAQ LIÊN HỆ (ACCORDION) */}
      <section id="faq-contact" className="py-20 bg-[#FAF9F6] border-t border-b border-gold-200/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Common Concerns</span>
            <h2 className="font-display text-3xl font-bold text-charcoal-500 tracking-tight text-glow">Giải đáp thắc mắc trước khi liên hệ</h2>
            <p className="text-sm text-charcoal-400">
              Tổng hợp những câu hỏi phổ biến giúp bạn hiểu rõ hơn về quy trình hợp tác ban đầu cùng PGS.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="bg-white border border-premium rounded-xl overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center text-charcoal-500 hover:text-gold-800 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base flex items-center space-x-2.5">
                      <HelpCircle className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gold-500 shrink-0 ml-4" /> : <ChevronDown className="w-5 h-5 text-gold-500 shrink-0 ml-4" />}
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[300px] border-t border-gold-100" : "max-h-0"}`}>
                    <p className="p-6 text-xs text-charcoal-400 leading-relaxed bg-[#FAF9F6]/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION & MOBILE STICKY BOTTOM BAR */}
      <section id="final-cta" className="py-24 bg-white relative overflow-hidden">
        {/* Background mesh glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Ready to grow?</span>
          <h2 className="font-display text-4xl font-bold text-charcoal-500 tracking-tight leading-tight">
            Sẵn sàng bứt phá doanh số cùng hệ thống Marketing chuẩn hóa?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-400 max-w-xl mx-auto leading-relaxed">
            Nhận ngay bản rà soát lỗi website sơ bộ và buổi họp tư vấn 1:1 trực tiếp cùng Trưởng bộ phận Chiến lược PGS Agency trong 2 giờ tới.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Điền biểu mẫu tư vấn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:0931119999"
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF9F6] border border-gold-300/40 hover:border-gold-500 text-charcoal-500 font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-gold-500" />
              <span>Gọi hotline ngay</span>
            </a>
          </div>

          <p className="text-xs text-charcoal-400">Không ràng buộc hợp đồng ban đầu • Hỗ trợ thiết lập KPI tăng trưởng rõ ràng</p>
        </div>
      </section>

      {/* STICKY BOTTOM ACTIONS FOR MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gold-200/40 py-2.5 px-4 z-50 flex items-center justify-between gap-3 shadow-lg">
        <a
          href="tel:0931119999"
          className="flex-1 py-3 bg-white text-charcoal-500 border border-gold-300/50 rounded-lg flex items-center justify-center space-x-2 text-xs font-bold"
        >
          <Phone className="w-4 h-4 text-gold-500" />
          <span>Gọi điện</span>
        </a>
        <a
          href="https://zalo.me/0931119999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-[#0068FF] text-white rounded-lg flex items-center justify-center space-x-1.5 text-xs font-bold"
        >
          <span>Chat Zalo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={scrollToForm}
          className="flex-1 py-3 bg-gold-500 text-charcoal-900 rounded-lg flex items-center justify-center space-x-1 text-xs font-bold cursor-pointer"
        >
          <span>Đặt lịch tư vấn</span>
        </button>
      </div>

    </div>
  );
}
