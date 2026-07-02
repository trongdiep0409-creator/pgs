"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import {
  TrendingUp,
  Search,
  Target,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  MousePointer,
  Sparkles,
  BarChart3,
  RefreshCw,
  Layers,
  FileText,
  Clock,
  HelpCircle,
  Menu,
  X,
  Zap,
  PhoneCall,
  ChevronDown,
  Shield,
  Percent,
  Monitor,
  Eye,
  Filter
} from "lucide-react";

export default function GoogleAdsService() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Section 5: Budget Leakage Simulator states
  const [activeLeak, setActiveLeak] = useState<number | null>(null);
  const [patchedLeaks, setPatchedLeaks] = useState<number[]>([]);

  // Section 6: Framework steps states
  const [activeStep, setActiveStep] = useState(0);

  // Section 7: Keyword Intent state
  const [activeKeywordTab, setActiveKeywordTab] = useState("all");

  // Section 8: Landing page hotspot state
  const [activeHotspot, setActiveHotspot] = useState<string>("form");

  // Section 10: KPI Slider states
  const [monthlyBudget, setMonthlyBudget] = useState(20000000); // 20 million VND
  const [avgCPC, setAvgCPC] = useState(8000); // 8,000 VND
  const [landingPageCVR, setLandingPageCVR] = useState(3.5); // 3.5%
  const [ctr, setCtr] = useState(6.0); // 6%

  // Section 11: Case Study active tab
  const [activeCase, setActiveCase] = useState(0);

  // Section 13: FAQ Accordion state
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Section 12: Package tenure toggle (Monthly vs 3-Month with 15% discount)
  const [isQuarterly, setIsQuarterly] = useState(false);

  // AI Auditor Form State
  const [industry, setIndustry] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customCPL, setCustomCPL] = useState("");
  const [mainIssue, setMainIssue] = useState("Lãng phí ngân sách, CPL quá cao");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  // Toggle patch a leakage
  const togglePatchLeak = (id: number) => {
    if (patchedLeaks.includes(id)) {
      setPatchedLeaks(patchedLeaks.filter((item) => item !== id));
    } else {
      setPatchedLeaks([...patchedLeaks, id]);
    }
  };

  // Calculator logic
  const calcMetrics = useMemo(() => {
    const estimatedClicks = Math.floor(monthlyBudget / avgCPC);
    const estimatedImpressions = Math.floor((estimatedClicks / (ctr / 100)));
    const estimatedLeads = Math.floor(estimatedClicks * (landingPageCVR / 100));
    const estimatedCPL = estimatedLeads > 0 ? Math.floor(monthlyBudget / estimatedLeads) : 0;
    
    // Assume average lead close rate is 10%, and average deal value is 5,000,000 VND
    const estimatedSales = Math.floor(estimatedLeads * 0.10);
    const estimatedRevenue = estimatedSales * 5000000;
    const roi = monthlyBudget > 0 ? ((estimatedRevenue - monthlyBudget) / monthlyBudget) * 100 : 0;

    return {
      impressions: estimatedImpressions,
      clicks: estimatedClicks,
      leads: estimatedLeads,
      cpl: estimatedCPL,
      revenue: estimatedRevenue,
      roi: Math.max(0, parseFloat(roi.toFixed(1))),
    };
  }, [monthlyBudget, avgCPC, landingPageCVR, ctr]);

  // Submit AI Audit
  const handleAIAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) {
      alert("Vui lòng nhập ngành nghề của bạn");
      return;
    }
    setAuditLoading(true);
    setAuditReport(null);
    try {
      const res = await fetch("/api/gemini/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          budget: customBudget || monthlyBudget.toLocaleString(),
          cpl: customCPL || "Chưa rõ",
          issue: mainIssue,
          website: websiteUrl || "Chưa có",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAuditReport(data.text);
      } else {
        setAuditReport("Có lỗi xảy ra khi tạo báo cáo: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setAuditReport("Không thể kết nối đến máy chủ AI. Vui lòng thử lại.");
    } finally {
      setAuditLoading(false);
    }
  };

  // Static Data
  const searchIntents = [
    {
      title: "Transactional Intent (Mua Hàng Ngay)",
      keywords: ["giá dịch vụ SEO tốt nhất", "mua căn hộ 2 phòng ngủ quận 2", "lắp camera văn phòng trọn gói"],
      desc: "Người dùng đã sẵn sàng chi tiền, tìm kiếm đơn vị cung cấp ngay lập tức.",
      badge: "Tỷ lệ chuyển đổi cao nhất (10% - 15%)",
      color: "border-[#C5A880] text-[#C5A880] bg-[#C5A880]/5"
    },
    {
      title: "Commercial Intent (So Sánh / Đánh Giá)",
      keywords: ["so sánh CRM Hubspot và Salesforce", "top agency Google Ads uy tín", "báo giá marketing tổng thể"],
      desc: "Người dùng đang cân nhắc các phương án, chuẩn bị đưa ra quyết định mua hàng.",
      badge: "Tăng trưởng nhận diện thương hiệu & Thu lead chất lượng",
      color: "border-slate-300 text-slate-800 bg-slate-50"
    },
    {
      title: "Informational Intent (Tìm Giải Pháp)",
      keywords: ["cách tự tối ưu quảng cáo google", "vì sao không đo được chuyển đổi GA4", "marketing là gì"],
      desc: "Người dùng đang tìm kiếm câu trả lời cho vấn đề của họ. Phù hợp để Remarketing bám đuổi.",
      badge: "Chi phí click rẻ - Xây dựng tệp phễu đầu vào",
      color: "border-slate-200 text-slate-500 bg-slate-100/50"
    }
  ];

  const leaksData = [
    {
      id: 1,
      title: "Sử dụng từ khóa đối sánh rộng bừa bãi",
      leak: "Hệ thống hiển thị quảng cáo cho các tìm kiếm rác hoàn toàn không liên quan, tiêu tốn ngân sách vô ích.",
      fix: "Chuyển sang đối sánh cụm từ (Phrase Match) hoặc đối sánh chính xác (Exact Match) và cập nhật phủ định liên tục.",
      impact: "Lãng phí ~30% ngân sách quảng cáo.",
    },
    {
      id: 2,
      title: "Không thiết lập từ khóa phủ định",
      leak: "Quảng cáo hiện lên cho các từ tìm kiếm chứa 'miễn phí', 'hướng dẫn', 'tự làm', 'tuyển dụng' trong khi bạn bán dịch vụ cao cấp.",
      fix: "Lên bộ 500+ từ khóa phủ định cốt lõi phủ khắp các nhóm quảng cáo trước khi bấm khởi chạy chiến dịch.",
      impact: "Lãng phí ~15% ngân sách quảng cáo.",
    },
    {
      id: 3,
      title: "Mẫu quảng cáo viết sai ý định (Intent)",
      leak: "Khách tìm 'báo giá' nhưng quảng cáo chỉ hiển thị thông tin kỹ thuật suông, click vào rồi thoát ngay vì không thấy giá trị.",
      fix: "Viết mẫu quảng cáo cá nhân hóa theo đúng từ khóa tìm kiếm, cung cấp thông điệp giải quyết trực tiếp nhu cầu.",
      impact: "Làm giảm điểm chất lượng, đẩy giá CPC tăng gấp 2 lần.",
    },
    {
      id: 4,
      title: "Trang đích (Landing Page) tải chậm, thiếu CTA",
      leak: "Khách nhấp vào quảng cáo chờ 5 giây không tải xong hoặc vào trang không thấy nút Liên hệ/Form đăng ký ở đâu.",
      fix: "Thiết kế Landing Page chuẩn UX tối ưu di động, tốc độ tải dưới 2 giây, kêu gọi hành động nổi bật trong 3 giây đầu.",
      impact: "Tỷ lệ thoát (Bounce Rate) lên tới 85%, mất sạch lượt click.",
    },
    {
      id: 5,
      title: "Không cài đặt tracking chuyển đổi chuẩn",
      leak: "Không cài GA4, GTM hoặc cài sai, chạy quảng cáo nhưng không biết lead đổ về từ chiến dịch nào, từ khóa nào.",
      fix: "Thiết lập Conversion Tracking chuẩn chỉ cho các hành động: Gửi form, Click Zalo, Gọi Hotline, Chat Messenger.",
      impact: "Chạy mò mẫm, máy học Google học sai hướng, không thể tối ưu ROAS.",
    },
    {
      id: 6,
      title: "Bỏ bê không đánh giá chất lượng lead",
      leak: "Chỉ nhìn số chuyển đổi ảo trên báo cáo Google Ads nhưng thực tế sale báo lead rác, lead thuê bao, lead nhầm số.",
      fix: "Xây dựng quy trình phản hồi dữ liệu CRM ngược lại tài khoản Ads để dạy cho AI của Google tìm đúng chân dung khách hàng.",
      impact: "Nướng sạch tiền vào các tệp ảo không sinh ra doanh thu.",
    }
  ];

  const pgsSteps = [
    {
      step: "01",
      title: "Phân tích Mục tiêu & Đối tượng",
      desc: "Nghiên cứu kỹ hành vi khách hàng mục tiêu, đối thủ cạnh tranh, xác định bài toán tối ưu lead hay tối ưu doanh thu.",
      details: "PGS thiết lập các thông số cơ sở (Baseline) bao gồm doanh thu kỳ vọng, biên lợi nhuận để tính toán CPL mục tiêu có lời cho doanh nghiệp."
    },
    {
      step: "02",
      title: "Thiết lập Ma trận Từ khóa",
      desc: "Xây dựng danh sách từ khóa bám sát phễu nhu cầu của khách hàng, phân tách rõ ràng nhóm mang lại chuyển đổi ngay.",
      details: "Loại bỏ hoàn toàn các từ khóa chung chung đốt tiền. Tập trung 80% ngân sách ban đầu vào nhóm 'Buyer Intent' để tạo ra lead sớm nhất."
    },
    {
      step: "03",
      title: "Cấu trúc Chiến dịch Chuẩn S.K.A.G",
      desc: "Tổ chức tài khoản quảng cáo khoa học theo cấu trúc nhóm từ khóa đơn lẻ giúp kiểm soát chính xác ngân sách và điểm chất lượng.",
      details: "Mỗi nhóm quảng cáo chỉ chứa các từ khóa đồng nghĩa cao độ, đảm bảo mẫu quảng cáo và trang đích khớp nhau 100%, nâng điểm chất lượng lên 8-10/10."
    },
    {
      step: "04",
      title: "Tối ưu Nội dung Mẫu Quảng cáo",
      desc: "Sáng tạo tiêu đề và mô tả hấp dẫn, đưa các rào cản từ chối lên quảng cáo để lọc trước người dùng không phù hợp.",
      details: "Sử dụng kỹ thuật viết Conversion Copywriting để làm nổi bật USP (Lợi thế cạnh tranh độc quyền) và đưa các ưu đãi giới hạn thời gian kích thích CTR."
    },
    {
      step: "05",
      title: "Xây dựng Landing Page Tối ưu CRO",
      desc: "Tư vấn hoặc trực tiếp thiết kế Landing Page chuyên biệt cho từng chiến dịch để đẩy tỷ lệ chuyển đổi lên tối đa.",
      details: "Tối ưu hóa bố cục thông tin theo phễu tâm lý: Tiêu đề lôi cuốn -> Nỗi đau -> Giải pháp -> Bằng chứng thuyết phục -> Ưu đãi -> Kêu gọi hành động rõ ràng."
    },
    {
      step: "06",
      title: "Cài đặt Đo lường Toàn diện GA4/GTM",
      desc: "Thiết lập hệ thống đo lường chính xác từng click chuột, cuộc gọi, tin nhắn Zalo, hay form đăng ký.",
      details: "Không chỉ đo lường số lượng, PGS cài đặt phễu chất lượng để theo dõi hành trình người dùng sâu sắc, giúp máy học Google tối ưu hóa thông minh."
    },
    {
      step: "07",
      title: "Tối ưu hóa Liên tục & Báo cáo",
      desc: "Theo dõi sát sao từng từ khóa, tinh chỉnh ngân sách hàng ngày, lọc từ khóa rác và tối ưu giá thầu thông minh.",
      details: "Chủ động gửi báo cáo minh bạch định kỳ, tổ chức các cuộc họp cải tiến định hướng tăng trưởng doanh thu thay vì chỉ báo cáo click ảo."
    }
  ];

  const keywordMatrix = [
    { type: "transaction", label: "Mua Hàng (Transaction)", keyword: "dịch vụ thiết kế website chuẩn SEO trọn gói", status: "Chuyển đổi ngay", intent: "Cực kỳ cao", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { type: "transaction", label: "Mua Hàng (Transaction)", keyword: "giá thuê căn hộ Vinhomes 3 phòng ngủ", status: "Chuyển đổi ngay", intent: "Cực kỳ cao", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { type: "transaction", label: "Mua Hàng (Transaction)", keyword: "khoá học tiếng Anh giao tiếp cấp tốc ở TPHCM", status: "Chuyển đổi ngay", intent: "Cực kỳ cao", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { type: "investigation", label: "So Sánh / Hỏi Giá", keyword: "bảng giá dịch vụ Google Ads của agency", status: "Cân nhắc kỹ", intent: "Khá cao", bg: "bg-amber-50 text-amber-700 border-amber-200" },
    { type: "investigation", label: "So Sánh / Hỏi Giá", keyword: "nên thuê ngoài hay tự chạy quảng cáo google", status: "Cân nhắc kỹ", intent: "Trung bình", bg: "bg-amber-50 text-amber-700 border-amber-200" },
    { type: "informational", label: "Thông Tin (Informational)", keyword: "thuật toán xếp hạng từ khóa quảng cáo google", status: "Tìm hiểu kiến thức", intent: "Thấp", bg: "bg-blue-50 text-blue-700 border-blue-200" },
    { type: "informational", label: "Thông Tin (Informational)", keyword: "các bước tự tạo tài khoản google ads", status: "Tự làm, không thuê", intent: "Rất thấp", bg: "bg-blue-50 text-blue-700 border-blue-200" },
    { type: "negative", label: "Phủ Định (Negative Keywords)", keyword: "crack, miễn phí, giá rẻ nhất quả đất, tài liệu pdf", status: "Loại trừ ngay", intent: "Ngăn rò rỉ 100%", bg: "bg-rose-50 text-rose-700 border-rose-200" },
    { type: "negative", label: "Phủ Định (Negative Keywords)", keyword: "tự làm, hack, lừa đảo, tuyển dụng, wiki", status: "Loại trừ ngay", intent: "Ngăn rò rỉ 100%", bg: "bg-rose-50 text-rose-700 border-rose-200" }
  ];

  const filteredKeywords = useMemo(() => {
    if (activeKeywordTab === "all") return keywordMatrix;
    return keywordMatrix.filter((item) => item.type === activeKeywordTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKeywordTab]);

  const caseStudies = [
    {
      title: "Hệ thống Nha khoa Thẩm mỹ Cao cấp",
      industry: "Y tế - Nha khoa",
      issue: "Ngân sách chạy lớn nhưng hơn 60% lead rác, sale liên hệ toàn thuê bao hoặc không có nhu cầu.",
      solution: "Tái cấu trúc tài khoản theo SKAG, cài đặt đo lường phễu chuyển đổi chuẩn xác, phủ định 1,200 từ khóa rác, xây dựng Landing Page phẫu thuật thẩm mỹ tối ưu CRO.",
      results: [
        { label: "Lead chất lượng tăng", value: "+145%" },
        { label: "Chi phí mỗi Lead (CPL) giảm", value: "-42%" },
        { label: "Doanh thu trực tiếp", value: "1.8 Tỷ / Tháng" },
      ],
      comment: "PGS không chỉ tối ưu chỉ số Google Ads, họ giúp chúng tôi kết nối dữ liệu từ Sale để tinh chỉnh chính xác chân dung khách hàng có tiền."
    },
    {
      title: "Sàn Giao dịch Bất động sản Vinhomes",
      industry: "Bất Động Sản",
      issue: "CPC cực kỳ đắt đỏ (lên tới 45k/click), đối thủ click tặc phá hoại liên tục, không thu được lead có thực lực tài chính.",
      solution: "Chuyển sang chạy chiến dịch Search kết hợp chiến lược Giá thầu thông minh (Smart Bidding tCPL), tối ưu hóa Landing Page tăng tốc độ tải, bám đuổi tệp Remarketing phân khúc thượng lưu.",
      results: [
        { label: "Lead thật đăng ký", value: "+80%" },
        { label: "Ngăn chặn click tặc", value: "Tối ưu ~35%" },
        { label: "Giao dịch thành công", value: "12 căn hộ" },
      ],
      comment: "Đội ngũ kỹ thuật của PGS Agency có năng lực phản ứng nhanh, theo dõi đối thủ liên tục và tối ưu giá thầu thông minh vượt trội."
    },
    {
      title: "Học viện Đào tạo Anh ngữ Doanh nghiệp",
      industry: "Giáo dục - B2B",
      issue: "Chạy Ads thương hiệu không ai đăng ký, chạy từ khóa khóa học thông thường thì bị cạnh tranh khốc liệt bởi các trung tâm giá rẻ.",
      solution: "Định vị lại thông điệp Landing Page tập trung vào cam kết đầu ra B2B, áp dụng mô hình phễu Keyword Intent Mapping, chạy Remarketing chuỗi giá trị chia sẻ tài liệu quản trị.",
      results: [
        { label: "Lead doanh nghiệp (HR/CEO)", value: "+210%" },
        { label: "Tỷ lệ chốt hợp đồng", value: "+28%" },
        { label: "ROI chiến dịch", value: "320%" },
      ],
      comment: "PGS Agency am hiểu sâu sắc hành trình mua hàng phức tạp của khối doanh nghiệp B2B."
    }
  ];

  const packages = [
    {
      name: "GOOGLE ADS SETUP",
      subtitle: "Bứt phá khởi đầu chuyên nghiệp",
      price: 15000000,
      monthlyPriceText: "15,000,000 VNĐ",
      quarterlyPriceText: "12,750,000 VNĐ / tháng",
      desc: "Phù hợp cho doanh nghiệp mới bắt đầu hoặc muốn xây dựng lại hệ thống chiến dịch bài bản từ con số 0.",
      features: [
        "Nghiên cứu & Thiết lập bộ từ khóa chuẩn phễu",
        "Xây dựng cấu trúc tài khoản SKAG tối ưu",
        "Thiết lập đo lường chuyển đổi chuẩn GA4, GTM",
        "Viết nội dung 15 mẫu quảng cáo thu hút CTR",
        "Tặng 1 buổi tư vấn thiết kế Landing Page CRO",
        "Hỗ trợ rà soát, loại trừ click tặc trong 7 ngày đầu",
        "Bàn giao 100% tài khoản sau khi hoàn thiện"
      ],
      cta: "Đăng Ký Setup Ngay",
      popular: false
    },
    {
      name: "GOOGLE ADS MANAGEMENT",
      subtitle: "Tối ưu Lead & Duy trì hiệu suất cao",
      price: 25000000,
      monthlyPriceText: "25,000,000 VNĐ",
      quarterlyPriceText: "21,250,000 VNĐ / tháng",
      desc: "Phù hợp cho doanh nghiệp đang chạy ngân sách lớn cần đội ngũ chuyên gia đồng hành, tối ưu CPL hàng ngày.",
      features: [
        "Quản trị & Tối ưu hóa tài khoản hàng ngày",
        "Bao gồm toàn bộ quyền lợi gói Setup",
        "Miễn phí 1 Landing Page thiết kế riêng tối ưu CRO",
        "Chặn click tặc bằng hệ thống chuyên sâu hàng ngày",
        "Lọc từ khóa rác, tối ưu điểm chất lượng liên tục",
        "Phân bổ ngân sách thông minh đa chiến dịch",
        "Báo cáo minh bạch hàng tuần, đề xuất cải tiến",
        "Đồng hành tối ưu chất lượng lead cùng Sale team"
      ],
      cta: "Đăng Ký Quản Trị Toàn Diện",
      popular: true
    },
    {
      name: "PERFORMANCE GROWTH",
      subtitle: "Đột phá doanh thu đa nền tảng",
      price: 45000000,
      monthlyPriceText: "45,000,000 VNĐ",
      quarterlyPriceText: "38,250,000 VNĐ / tháng",
      desc: "Giải pháp tăng trưởng bứt phá kết hợp Google Ads với tối ưu hóa phễu, Remarketing đa kênh, nâng tầm hệ thống.",
      features: [
        "Quản trị không giới hạn ngân sách chiến dịch",
        "Thiết kế 2 Landing Page riêng biệt cho A/B testing",
        "Tối ưu hóa phễu chuyển đổi nâng cao, đa thiết bị",
        "Remarketing liên kết Google, Facebook & TikTok Ads",
        "Cài đặt hệ thống báo cáo Dashboard tự động Looker Studio",
        "Chiến lược SEO bổ trợ chiếm lĩnh vị trí tự nhiên",
        "Tư vấn tối ưu hóa kịch bản Sale tăng tỷ lệ chốt",
        "Họp chiến lược định kỳ trực tiếp với Growth Director"
      ],
      cta: "Liên Hệ Hợp Tác Tăng Trưởng",
      popular: false
    }
  ];

  const faqs = [
    {
      q: "Ngân sách tối thiểu để chạy Google Ads hiệu quả là bao nhiêu?",
      a: "Thực tế, Google không quy định mức ngân sách tối thiểu. Tuy nhiên, để chiến dịch có đủ lượng dữ liệu máy học (Machine Learning) nhận diện hành vi khách hàng và tối ưu hiệu suất, PGS khuyến nghị ngân sách tối thiểu từ 10.000.000 VNĐ - 15.000.000 VNĐ/tháng đối với các ngành hàng ít cạnh tranh, và từ 30.000.000 VNĐ/tháng trở lên với các ngành hot như Bất động sản, Nha khoa, Thẩm mỹ, Giáo dục."
    },
    {
      q: "Sau bao lâu thì quảng cáo Google bắt đầu trả về số liệu và có lead?",
      a: "Sau khi PGS setup và kích hoạt chiến dịch (thường mất từ 3 - 5 ngày làm việc), quảng cáo sẽ xuất hiện trên trang tìm kiếm ngay lập tức. Thông thường khách hàng sẽ nhận được những lượt Lead (đăng ký form, cuộc gọi, chat Zalo) đầu tiên ngay trong vòng 24h - 48h đầu chạy chiến dịch. Tuy nhiên, giai đoạn máy học tối ưu ổn định nhất sẽ rơi vào tuần thứ 2 đến tuần thứ 3 sau khi có khoảng 30 - 50 lượt chuyển đổi cơ sở."
    },
    {
      q: "PGS Agency có cam kết số lượng lead hay cam kết doanh thu không?",
      a: "Chúng tôi làm việc dựa trên tinh thần thực tế và minh bạch dữ liệu. PGS cam kết thực hiện đúng tiến độ, tối ưu các chỉ số hiệu suất quảng cáo cốt lõi (Tăng CTR, nâng Điểm chất lượng quảng cáo từ 8-10/10, giảm CPC trung bình, giảm thiểu tối đa 95% click tặc rác, và tối ưu giảm chi phí trên mỗi Lead chất lượng - CPL). Chúng tôi không cam kết doanh thu ảo vì doanh thu phụ thuộc lớn vào chất lượng sản phẩm, giá cả thị trường và đặc biệt là năng lực tư vấn chốt sale của đội ngũ nội bộ doanh nghiệp của bạn."
    },
    {
      q: "Doanh nghiệp của tôi chưa có Landing Page hay Website thì có chạy được không?",
      a: "Hoàn toàn chạy được! Với các khách hàng ký hợp đồng quản trị từ 3 tháng trở lên, PGS Agency sẽ thiết kế tặng miễn phí Landing Page chuẩn UX/UI tối ưu CRO (trị giá 10.000.000 VNĐ) để đảm bảo tỷ lệ chuyển đổi từ click sang lead ở mức cao nhất. Nếu quý khách tự chạy hoặc dùng Landing Page có sẵn, PGS sẽ tiến hành kiểm tra, tối ưu lại cấu trúc và tốc độ tải trang trước khi chạy Ads."
    },
    {
      q: "Hệ thống báo cáo của PGS Agency được thực hiện như thế nào?",
      a: "PGS cung cấp báo cáo định kỳ hàng tuần qua file Google Sheet chi tiết hoặc dashboard tự động Looker Studio trực quan để quý khách theo dõi ngân sách tiêu hao, lượt click, số lead thực tế, CPL trung bình. Đồng thời, vào cuối tháng, chúng tôi sẽ tổ chức buổi họp trực tuyến hoặc trực tiếp để tổng kết hiệu quả chiến dịch, phân tích sâu chất lượng lead và đưa ra định hướng tối ưu cho tháng tiếp theo."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-950 font-sans selection:bg-[#C5A880]/30 selection:text-slate-950 antialiased overflow-x-hidden">
      
      {/* GLOBAL HEADER */}
      

      {/* SECTION 1: HERO - PERFORMANCE DASHBOARD */}
      <section className="relative py-12 lg:py-24 overflow-hidden border-b border-slate-200/50" id="hero">
        <div className="absolute inset-0 bg-radial-at-t from-[#C5A880]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-full text-xs font-semibold tracking-wider text-[#9E8359] uppercase">
                <Zap className="h-3.5 w-3.5 text-[#C5A880]" />
                Hệ Thống Tăng Trưởng Số Toàn Diện
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12]" id="main-h1">
                Dịch vụ Google Ads giúp doanh nghiệp tiếp cận khách hàng đang <span className="underline decoration-[#C5A880] decoration-wavy underline-offset-8">có nhu cầu</span> và <span className="text-[#9E8359]">tối ưu lead</span> theo dữ liệu.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Không nướng tiền vào các lượt nhấp ảo hay từ khóa chung chung. PGS Agency thiết lập ma trận từ khóa hiệu suất cao, tối ưu trang đích và thiết lập phễu đo lường sâu sát để mỗi đồng ngân sách tạo ra lượt đăng ký thực tế cho doanh nghiệp.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#ai-audit-box"
                  className="px-8 py-4 bg-slate-950 text-white font-medium text-sm rounded-md hover:bg-[#C5A880] hover:text-slate-950 transition-all duration-300 text-center flex items-center justify-center gap-3 border border-[#C5A880]/30 shadow-lg shadow-slate-950/10"
                  id="hero-cta-primary"
                >
                  <Sparkles className="h-4 w-4" />
                  Kiểm Tra Tài Khoản Google Ads Hiện Tại
                </a>
                <a
                  href="#roi-calculator"
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-medium text-sm rounded-md transition-colors text-center border border-slate-200 flex items-center justify-center gap-2 shadow-sm"
                  id="hero-cta-secondary"
                >
                  <BarChart3 className="h-4 w-4 text-slate-500" />
                  Ước Tính Hiệu Suất ROI
                </a>
              </div>

              {/* Key trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                <div>
                  <span className="block text-2xl font-bold text-slate-950">92%</span>
                  <span className="block text-xs text-slate-500 font-medium">Khách hàng giảm CPL</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-950">100%</span>
                  <span className="block text-xs text-slate-500 font-medium">Báo cáo real-time GA4</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-950">8.5+</span>
                  <span className="block text-xs text-slate-500 font-medium">Điểm chất lượng mẫu Ads</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero 3D Performance Dashboard Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Visual Glassmorphic Dashboard Representation */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-rose-500" />
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono font-semibold text-slate-400 ml-2">google_ads_console.xml</span>
                    </div>
                    <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider rounded-full uppercase">
                      ● Chạy ổn định
                    </div>
                  </div>

                  {/* Search box simulation */}
                  <div className="bg-[#FAF9F6] border border-slate-200 rounded-lg p-3.5 mb-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <Search className="h-4 w-4 text-[#C5A880]" />
                      <span className="text-xs font-mono font-medium text-slate-600">bảng giá dịch vụ marketing tổng thể pgs...</span>
                    </div>
                    <span className="text-[10px] bg-[#C5A880]/15 text-[#9E8359] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Phù hợp</span>
                  </div>

                  {/* Simulated funnel graphics */}
                  <div className="space-y-3.5">
                    {/* Step 1 */}
                    <div className="flex items-center justify-between bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded bg-slate-50 flex items-center justify-center border border-slate-200">
                          <Eye className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">1. Search / Hiển thị</span>
                          <span className="text-xs font-bold text-slate-800">125,480 Impressions</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C5A880] font-bold">CTR 8.4%</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center justify-between bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded bg-[#C5A880]/5 flex items-center justify-center border border-[#C5A880]/20">
                          <MousePointer className="h-3.5 w-3.5 text-[#C5A880]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">2. Nhấp chuột chuẩn ý định</span>
                          <span className="text-xs font-bold text-slate-800">10,540 Clicks</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-bold">CPC: 6,400đ</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center justify-between bg-white border border-[#C5A880]/30 p-2.5 rounded-lg shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded bg-slate-950 flex items-center justify-center">
                          <CheckCircle className="h-3.5 w-3.5 text-[#C5A880]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#C5A880] block uppercase tracking-wider font-semibold">3. Tối ưu Landing Page CRO</span>
                          <span className="text-xs font-bold text-slate-950">432 Lead chất lượng cao</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-600 font-bold">CVR 4.1%</span>
                    </div>
                  </div>

                  {/* Bottom metrics badge */}
                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100">
                    <div className="bg-[#FAF9F6] p-3 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-medium">Chi phí mỗi Lead (CPL)</span>
                      <span className="text-base font-bold text-slate-950">156,000đ</span>
                    </div>
                    <div className="bg-[#FAF9F6] p-3 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-medium">Tỷ lệ rác / ảo lọc bỏ</span>
                      <span className="text-base font-bold text-emerald-600">95.4%</span>
                    </div>
                  </div>
                </div>

                {/* Overlap Accent elements */}
                <div className="absolute -top-4 -right-4 h-14 w-14 bg-amber-100 rounded-full blur-2xl opacity-70 -z-10" />
                <div className="absolute -bottom-6 -left-6 h-20 w-20 bg-yellow-100 rounded-full blur-3xl opacity-60 -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: GOOGLE ADS LÀ GÌ */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="definition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Khái niệm cốt lõi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Bản chất thực sự của Quảng cáo Google Ads
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Khác hoàn toàn với việc tiếp cận thụ động của quảng cáo mạng xã hội, Google Ads hiển thị quảng cáo dựa trên <span className="font-semibold text-slate-900">Search Intent (Ý định tìm kiếm)</span>. Khi khách hàng phát sinh nhu cầu mua hàng, họ chủ động gõ từ khóa lên Google. PGS định nghĩa Google Ads là công cụ đánh chặn hành vi nhu cầu chuẩn xác nhất của doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {searchIntents.map((intent, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl border ${intent.color} flex flex-col justify-between transition-all duration-300 hover:shadow-lg`}
              >
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                    {intent.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950">{intent.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{intent.desc}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase mb-2">Ví dụ từ khóa PGS nhắm tới:</span>
                  <div className="flex flex-col gap-1.5">
                    {intent.keywords.map((kw, kIdx) => (
                      <div key={kIdx} className="flex items-center gap-2 text-xs font-mono font-medium text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                        <Search className="h-3 w-3 text-[#C5A880] shrink-0" />
                        <span className="truncate">{kw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VÌ SAO GOOGLE ADS TẠO LEAD NHANH */}
      <section className="py-20 bg-[#FAF9F6] border-b border-slate-200/50" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Ưu thế vượt trội</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
                Vì sao Google Ads là kênh tạo Lead nhanh nhất cho bạn?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Đối với các doanh nghiệp cần có khách hàng ngay để xoay vòng vốn hoặc bứt phá chỉ số kinh doanh, Google Ads là lựa chọn hàng đầu nhờ khả năng nhắm mục tiêu siêu việt.
              </p>
              
              <ul className="space-y-4 pt-2">
                {[
                  "Hiển thị ngay lập tức tới 99% người tìm kiếm có nhu cầu mua sắm.",
                  "Kiểm soát linh hoạt ngân sách hàng ngày, điều chỉnh tăng giảm trong 1 phút.",
                  "Đo lường rõ ràng chi phí thu lead, không mông lung về hiệu quả số liệu.",
                  "remarketing thông minh bám đuổi các khách hàng đã xem trang dịch vụ."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  title: "Nhu Cầu Intent Cao",
                  desc: "Chỉ tiếp cận khách hàng đang chủ động gõ phím tìm kiếm giải pháp cho vấn đề của họ, giảm lãng phí tài nguyên tiếp thị tối đa."
                },
                {
                  icon: DollarSign,
                  title: "Kiểm Soát Ngân Sách",
                  desc: "Bạn có quyền quyết định chi bao nhiêu mỗi ngày và giá click tối đa mong muốn. Không lo ngân sách bị vượt tầm kiểm soát."
                },
                {
                  icon: TrendingUp,
                  title: "Đo Lường Chuyển Đổi",
                  desc: "Mọi cuộc gọi, lượt điền form hay chat zalo đều được cấu trúc ghi nhận chuyển đổi. Bạn biết chính xác bao nhiêu tiền ra được 1 lead."
                },
                {
                  icon: RefreshCw,
                  title: "Tối Ưu Máy Học AI",
                  desc: "Sử dụng thuật toán máy học thế hệ mới của Google để tự động đấu thầu thông minh, giúp CPL càng chạy càng giảm theo thời gian."
                }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-5 w-5 text-[#9E8359]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: GOOGLE ADS KHÁC QUẢNG CÁO HIỂN THỊ THÔNG THƯỜNG */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="comparison">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">So sánh chiến thuật</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Quảng cáo Google Search Ads khác gì Mạng Hiển Thị (GDN/Facebook/TikTok Ads)?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Hiểu đúng bản chất hành vi người dùng sẽ giúp bạn phân bổ ngân sách marketing thông minh, tránh lãng phí tiền của doanh nghiệp.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Tiêu Chí So Sánh</th>
                  <th className="p-5 text-sm font-bold text-[#9E8359] uppercase tracking-wider bg-[#C5A880]/5">Google Search Ads (Tìm Kiếm)</th>
                  <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Quảng Cáo Hiển Thị Thụ Động (Social Ads / GDN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="p-5 font-semibold text-slate-800">Hành vi người dùng</td>
                  <td className="p-5 text-slate-700 font-medium bg-[#C5A880]/5">Chủ động tìm kiếm nhu cầu giải pháp khi đang thực sự cần.</td>
                  <td className="p-5 text-slate-500">Đang lướt mạng xã hội xem giải trí, bị quảng cáo chen ngang ép xem.</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-800">Tỷ lệ chuyển đổi (CVR)</td>
                  <td className="p-5 text-emerald-700 font-bold bg-[#C5A880]/5">Cực kỳ cao (Thường dao động từ 3.5% - 12% tùy ngành).</td>
                  <td className="p-5 text-slate-500">Thấp hơn (Thường dưới 1.5% do tiếp cận tệp thụ động).</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-800">Đo lường & Phân tích</td>
                  <td className="p-5 text-slate-700 font-medium bg-[#C5A880]/5">Sát sao từng từ khóa, nhóm quảng cáo, cấu trúc UTM rõ ràng.</td>
                  <td className="p-5 text-slate-500">Phụ thuộc nhiều vào tệp thuật toán phân phối diện rộng, khó đo chi tiết từ khóa.</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-800">Mục tiêu chiến dịch phù hợp</td>
                  <td className="p-5 text-slate-950 font-bold bg-[#C5A880]/5">Tăng trưởng Lead trực tiếp, đơn hàng gấp, doanh thu trực tiếp.</td>
                  <td className="p-5 text-slate-500">Nhận diện thương hiệu rộng, giáo dục người dùng chưa biết về sản phẩm.</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-800">Chi phí trên mỗi Click (CPC)</td>
                  <td className="p-5 text-slate-700 bg-[#C5A880]/5">Cao hơn, nhưng click chất lượng tuyệt đối không có click ảo.</td>
                  <td className="p-5 text-slate-500">Rẻ hơn, nhưng tỷ lệ click nhầm, click thoát trang rất cao.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: LỖI KHIẾN ADS TỐN TIỀN (INTERACTIVE SIMULATOR) */}
      <section className="py-20 bg-[#FAF9F6] border-b border-slate-200/50" id="leakage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Kiểm soát ngân sách</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              6 Lỗi chí mạng khiến Quảng cáo Google tốn tiền lãng phí
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bạn đang chạy Google Ads nhưng chi phí quá cao mà không có lead? Nhấp vào từng <span className="text-rose-600 font-bold">Lỗ Rò Rỉ Ngân Sách</span> bên dưới để xem chi tiết hậu quả và cách PGS bọc kín tổn thất của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Interactive Tank Visualization */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl w-full max-w-[400px] text-center space-y-6 relative">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase block">Bể chứa ngân sách quảng cáo của bạn</span>
                
                {/* Simulated 3D Tank */}
                <div className="h-64 w-40 border-4 border-slate-950 rounded-2xl mx-auto overflow-hidden relative bg-slate-100 flex flex-col justify-end">
                  {/* Liquid representing budget */}
                  <motion.div
                    animate={{
                      height: `${100 - (patchedLeaks.length * 15)}%`,
                    }}
                    className="w-full bg-amber-500/80 absolute bottom-0 left-0 transition-all duration-500 flex items-center justify-center font-bold text-slate-950 text-xs"
                  >
                    Ngân sách còn {100 - (patchedLeaks.length * 15)}%
                  </motion.div>

                  {/* Leaks indicator particles */}
                  {leaksData.map((leak) => {
                    const isPatched = patchedLeaks.includes(leak.id);
                    return !isPatched ? (
                      <div
                        key={leak.id}
                        className={`absolute w-3 h-3 rounded-full bg-rose-500 animate-ping pointer-events-none`}
                        style={{
                          top: `${leak.id * 15 + 10}%`,
                          left: leak.id % 2 === 0 ? "5px" : "140px",
                        }}
                      />
                    ) : null;
                  })}
                </div>

                {/* Score saving */}
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="text-xs text-slate-500 block">Đã khắc phục</span>
                  <span className="text-xl font-bold text-slate-950">
                    {patchedLeaks.length} / 6 lỗ rò rỉ
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                    Tiết kiệm được ước tính {patchedLeaks.length * 12}% ngân sách chiến dịch!
                  </span>
                </div>
              </div>
            </div>

            {/* List of interactive cards */}
            <div className="lg:col-span-7 space-y-4">
              {leaksData.map((leak) => {
                const isPatched = patchedLeaks.includes(leak.id);
                const isActive = activeLeak === leak.id;

                return (
                  <div
                    key={leak.id}
                    onClick={() => setActiveLeak(isActive ? null : leak.id)}
                    className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isPatched
                        ? "bg-emerald-50/50 border-emerald-200"
                        : isActive
                        ? "bg-white border-[#C5A880] shadow-md"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isPatched
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {leak.id}
                        </div>
                        <h3 className="text-sm font-bold text-slate-950">{leak.title}</h3>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePatchLeak(leak.id);
                        }}
                        className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all ${
                          isPatched
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        }`}
                        id={`patch-btn-${leak.id}`}
                      >
                        {isPatched ? "✓ Đã Vá" : "Vá Lỗ Rò này"}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-slate-100 space-y-3"
                        >
                          <div>
                            <span className="text-xs font-bold text-rose-500 block">Hiện trạng rò rỉ:</span>
                            <p className="text-xs text-slate-600">{leak.leak}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-600 block">Cách PGS Agency tối ưu:</span>
                            <p className="text-xs text-slate-700 font-medium">{leak.fix}</p>
                          </div>
                          <div className="text-[11px] bg-rose-50 text-rose-700 p-2.5 rounded font-mono font-semibold">
                            ⚠️ Tổn thất: {leak.impact}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: FRAMEWORK GOOGLE ADS PGS */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="framework">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Quy trình thực chiến</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              7 Bước Triển Khai Google Ads Toàn Diện Tại PGS Agency
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Chúng tôi không làm việc theo bản năng. Mọi chiến dịch đều phải trải qua 7 bước tối ưu nghiêm ngặt, bọc lót chặt chẽ giữa quảng cáo, trang đích và đo lường.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Steps Left Nav Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              {pgsSteps.map((stepItem, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                    activeStep === idx
                      ? "bg-slate-950 text-[#C5A880] border-slate-950 shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                  id={`framework-step-${idx}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-sm tracking-wider opacity-60">
                      {stepItem.step}
                    </span>
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {stepItem.title}
                    </span>
                  </div>
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${activeStep === idx ? "translate-x-1 text-[#C5A880]" : "text-slate-400"}`} />
                </button>
              ))}
            </div>

            {/* Step Detail Card (Right Side) */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[360px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                  <span className="text-4xl font-mono font-black text-[#C5A880]">
                    {pgsSteps[activeStep].step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    PGS Google Ads Framework
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  {pgsSteps[activeStep].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pgsSteps[activeStep].desc}
                </p>

                <div className="bg-white border border-slate-200 p-4 rounded-lg">
                  <span className="text-[11px] font-bold text-[#9E8359] uppercase block mb-1">
                    Hành động kỹ thuật của PGS:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pgsSteps[activeStep].details}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Shield className="h-4 w-4 text-emerald-600" />
                Đảm bảo minh bạch ngân sách và quyền quản trị cao nhất của bạn.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: KEYWORD INTENT MAPPING */}
      <section className="py-20 bg-[#FAF9F6] border-b border-slate-200/50" id="keywords">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Ma Trận Hiệu Suất</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Bộ Lọc Keyword Intent Matrix độc quyền
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tài khoản Google Ads được PGS cấu trúc chặt chẽ để tách biệt rõ ràng các nhóm từ khóa theo mức độ sẵn sàng mua hàng của khách hàng.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: "all", label: "Tất Cả Từ Khóa" },
              { id: "transaction", label: "Nhóm Mua Hàng (Transaction)" },
              { id: "investigation", label: "Nhóm Hỏi Giá / Cân Nhắc" },
              { id: "informational", label: "Nhóm Tin Tức / Phễu" },
              { id: "negative", label: "Nhóm Phủ Định (Negative)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveKeywordTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeKeywordTab === tab.id
                    ? "bg-slate-950 text-[#C5A880] border-slate-950"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
                id={`keyword-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKeywords.map((item, index) => (
              <div key={index} className={`p-5 rounded-xl border bg-white ${item.bg} flex flex-col justify-between shadow-sm`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.label}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/60 border border-slate-200/50">Intent: {item.intent}</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-slate-950">&ldquo;{item.keyword}&rdquo;</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span>Trạng thái chiến dịch:</span>
                  <span className="underline">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: LANDING PAGE & TRACKING FLOW */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="landing-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Điểm quyết định chuyển đổi</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Landing Page & Tích hợp Tracking Đo Lường GA4/GTM sâu sát
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Quảng cáo chỉ mang khách ghé thăm cửa hàng, còn mua sắm hay không phụ thuộc vào trải nghiệm tại quầy. PGS tối ưu Landing Page tích hợp hệ thống tracking chuyển đổi tuyệt đối không bỏ lọt lượt click có giá trị.
              </p>

              <div className="space-y-4">
                {[
                  { id: "form", label: "Form đăng ký ngắn gọn dưới 3 trường thông tin" },
                  { id: "hotline", label: "Nút hotline & Chat Zalo bám đuổi màn hình mobile" },
                  { id: "speed", label: "Tối ưu tốc độ tải trang di động dưới 2 giây" },
                  { id: "tags", label: "Cài đặt phễu Google Tag Manager cho từng nút bấm" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHotspot(item.id)}
                    className={`w-full p-3 rounded-lg text-left border text-xs font-bold flex items-center justify-between transition-all ${
                      activeHotspot === item.id
                        ? "bg-slate-950 text-white border-slate-950"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                    id={`hotspot-btn-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <Sparkles className={`h-3.5 w-3.5 ${activeHotspot === item.id ? "text-[#C5A880]" : "text-slate-400"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Interactive Phone Frame Mockup for Landing Page */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[480px] bg-[#FAF9F6] border border-slate-200 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-3 uppercase text-center">Tải trang thử nghiệm phễu CRO</span>
                
                {/* Landing page mockup wireframe */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden relative shadow-sm min-h-[360px] flex flex-col justify-between">
                  <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-800">https://landing-page.pgs-agency.vn</span>
                    <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">SSL Secure</span>
                  </div>

                  <div className="p-6 space-y-4 flex-grow">
                    <div className="space-y-1 text-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#9E8359] font-bold">PGS Client Demo</span>
                      <h4 className="text-sm font-extrabold text-slate-950">Nha Khoa Thẩm Mỹ Cao Cấp Quốc Tế</h4>
                    </div>

                    {/* Active Hotspot Content Area */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-[#C5A880]/30 min-h-[140px] flex flex-col justify-between">
                      {activeHotspot === "form" && (
                        <div className="space-y-2.5">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">● Form Đăng Ký Chuẩn CRO</span>
                          <input type="text" placeholder="Họ và tên của bạn..." disabled className="w-full bg-white border border-slate-200 p-1.5 rounded text-[11px] cursor-not-allowed" />
                          <input type="text" placeholder="Số điện thoại..." disabled className="w-full bg-white border border-slate-200 p-1.5 rounded text-[11px] cursor-not-allowed" />
                          <button className="w-full py-1.5 bg-[#C5A880] text-slate-950 text-[11px] font-bold rounded uppercase">Nhận Ưu Đãi Ngay</button>
                        </div>
                      )}
                      {activeHotspot === "hotline" && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">● Sticky Call / Chat Action (Mobile)</span>
                          <p className="text-xs text-slate-600">Nút Hotline gọi điện và nút Chat Zalo luôn xuất hiện cố định ở phía dưới cùng màn hình điện thoại giúp tăng tỷ lệ nhấp liên hệ thêm 28%.</p>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-rose-500 text-white text-[10px] py-1.5 text-center rounded font-bold">Gọi Điện Ngay</div>
                            <div className="flex-1 bg-blue-500 text-white text-[10px] py-1.5 text-center rounded font-bold">Chat Zalo Nhận Báo Giá</div>
                          </div>
                        </div>
                      )}
                      {activeHotspot === "speed" && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">● Tốc độ tải trang di động & Core Web Vitals</span>
                          <p className="text-xs text-slate-600">Chúng tôi loại bỏ hoàn toàn các thư viện thừa, nén ảnh định dạng WebP siêu nhẹ giúp Landing Page tải mượt mà dưới 1.5 giây.</p>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full w-[98%] bg-emerald-500" />
                          </div>
                          <span className="text-[9px] font-mono text-emerald-600 font-bold block text-right">Tốc độ tối ưu: 98/100 Mobile</span>
                        </div>
                      )}
                      {activeHotspot === "tags" && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-[#9E8359] uppercase">● Tích Hợp Thẻ Phễu Đo Lường GA4 / GTM</span>
                          <p className="text-xs text-slate-600">Cài đặt các lớp dữ liệu DataLayer để theo dõi chính xác hành vi gửi form hay click zalo, loại bỏ tình trạng chạy quảng cáo mò mẫm.</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-[8px] font-mono bg-slate-950 text-[#C5A880] px-1.5 py-0.5 rounded">GTM-TAG-SUCCESS</span>
                            <span className="text-[8px] font-mono bg-slate-950 text-[#C5A880] px-1.5 py-0.5 rounded">GA4-CONVERSION-LEAD</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom mockup action footer */}
                  <div className="p-3 bg-slate-100 border-t border-slate-200 text-[10px] font-semibold text-slate-500 text-center flex items-center justify-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    Báo cáo dữ liệu từ Form bọc kín trả ngược về máy học Google Ads!
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: REMARKETING LOOP */}
      <section className="py-20 bg-[#FAF9F6] border-b border-slate-200/50" id="remarketing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Tối đa hóa chuyển đổi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Chiến Lược Remarketing Đa Nền Tảng (Remarketing Loop)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Thực tế 95% người dùng không điền form ngay trong lần đầu tiên vào trang. Hệ thống phễu của PGS lưu vết Cookie hành vi của họ và kích hoạt các chiến dịch remarketing bám đuổi thông minh với chi phí click rẻ gấp 5 lần để kéo họ quay trở lại chuyển đổi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { step: "Tập 01", title: "Khách xem Landing Page", desc: "Người dùng click vào quảng cáo Google Search xem thông tin dịch vụ nhưng chưa thực hiện gửi form hay bấm gọi." },
              { step: "Tập 02", title: "Bám đuổi Google Display Network", desc: "Quảng cáo banner hình ảnh tinh tế xuất hiện trên các trang báo lớn (Dân Trí, VnExpress) nhắc nhở ưu đãi." },
              { step: "Tập 03", title: "Remarketing bám đuổi Facebook", desc: "Mẫu quảng cáo feedback khách hàng, video trải nghiệm chân thực xuất hiện trực tiếp trên bảng tin Facebook/Instagram." },
              { step: "Tập 04", title: "Khách quay lại Chuyển Đổi", desc: "Khách hàng cảm thấy thương hiệu uy tín phủ khắp nơi, bấm quay lại Landing Page và gửi thông tin đăng ký tư vấn." }
            ].map((loop, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 relative overflow-hidden shadow-sm">
                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded">
                  {loop.step}
                </div>
                <h3 className="text-sm font-extrabold text-slate-950 mt-4 mb-2">{loop.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{loop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: DASHBOARD KPI & ROI SLIDER CALCULATOR */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="roi-calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Công cụ hoạch định ngân sách</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Công cụ Ước Tính Hiệu Suất & ROI Chiến Dịch
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Nhập các giả định về ngân sách, chi phí mỗi click để xem ước tính lượng lead, chi phí CPL và hiệu quả doanh số giả định mà hệ thống Google Ads mang lại.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Inputs / Sliders */}
            <div className="lg:col-span-6 bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 space-y-6">
              <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#C5A880]" />
                Tinh chỉnh tham số của bạn
              </h3>

              {/* Slider 1: Monthly Budget */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Ngân sách hàng tháng mong muốn:</span>
                  <span className="text-[#9E8359] font-mono text-sm">{(monthlyBudget / 1000000).toFixed(0)} Triệu VNĐ</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="150000000"
                  step="5000000"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer"
                  id="slider-budget"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                  <span>5Mđ</span>
                  <span>50Mđ</span>
                  <span>100Mđ</span>
                  <span>150Mđ</span>
                </div>
              </div>

              {/* Slider 2: CPC */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Chi phí trung bình mỗi nhấp chuột (CPC):</span>
                  <span className="text-[#9E8359] font-mono text-sm">{avgCPC.toLocaleString()} VNĐ</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="40000"
                  step="1000"
                  value={avgCPC}
                  onChange={(e) => setAvgCPC(Number(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer"
                  id="slider-cpc"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                  <span>2,000đ</span>
                  <span>15,000đ</span>
                  <span>30,000đ</span>
                  <span>40,000đ</span>
                </div>
              </div>

              {/* Slider 3: CVR Landing Page */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Tỷ lệ chuyển đổi trang đích (CVR %):</span>
                  <span className="text-[#9E8359] font-mono text-sm">{landingPageCVR}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={landingPageCVR}
                  onChange={(e) => setLandingPageCVR(Number(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer"
                  id="slider-cvr"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                  <span>1% (Yếu)</span>
                  <span>4% (Chuẩn PGS)</span>
                  <span>10% (Xuất sắc)</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

            {/* Right Output Dashboard display cards */}
            <div className="lg:col-span-6 bg-slate-950 text-white p-8 rounded-2xl border border-[#C5A880]/40 flex flex-col justify-between shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm font-bold text-[#C5A880] uppercase tracking-wider">Ước tính hiệu suất hàng tháng</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Dữ liệu tham khảo</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-400 block font-medium">Lượt nhấp chuột (Clicks)</span>
                    <span className="text-2xl font-black font-mono text-white">{calcMetrics.clicks.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-400 block font-medium">Lượt hiển thị (Impressions)</span>
                    <span className="text-2xl font-black font-mono text-white">{calcMetrics.impressions.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-[#C5A880]/30">
                    <span className="text-xs text-[#C5A880] block font-bold">Ước tính số Lead thu về</span>
                    <span className="text-2xl font-black font-mono text-[#C5A880]">{calcMetrics.leads.toLocaleString()} Lead</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-400 block font-medium">Ước tính CPL trung bình</span>
                    <span className="text-2xl font-black font-mono text-white">{calcMetrics.cpl.toLocaleString()}đ</span>
                  </div>
                </div>

                {/* Simulated ROI metrics */}
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-emerald-400 block font-bold">Doanh Thu Giả Định (Close Rate 10%):</span>
                      <span className="text-lg font-bold font-mono text-white">{calcMetrics.revenue.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 block font-bold">Tỷ lệ ROI kỳ vọng:</span>
                      <span className="text-lg font-black font-mono text-emerald-400">+{calcMetrics.roi}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed">
                * Lưu ý: Đây là số liệu mô phỏng giả định trên thông số chung của ngành hàng. Hiệu quả thực tế có thể cao hơn hoặc thấp hơn phụ thuộc vào độ hấp dẫn của sản phẩm, mùa vụ và quy trình tư vấn khách hàng.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: DỰ ÁN THỰC TẾ GOOGLE ADS (CASE STUDIES) */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Chứng chỉ năng lực</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Các dự án thực tế tối ưu Google Ads xuất sắc của PGS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Minh chứng thuyết phục nhất cho năng lực thực chiến là hiệu quả của những doanh nghiệp đã tin tưởng đồng hành cùng PGS Agency.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {caseStudies.map((cs, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  activeCase === idx
                    ? "bg-[#C5A880] text-slate-950 border-[#C5A880] shadow"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
                id={`case-tab-${idx}`}
              >
                {cs.industry}
              </button>
            ))}
          </div>

          <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#9E8359] uppercase tracking-wider block">PGS CASE STUDY</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">{caseStudies[activeCase].title}</h3>
                </div>

                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">Thách thức ban đầu:</strong>
                    {caseStudies[activeCase].issue}
                  </p>
                  <p>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">Cách PGS giải bài toán:</strong>
                    {caseStudies[activeCase].solution}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-slate-200/60 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Đánh giá từ lãnh đạo đối tác:</span>
                  <p className="text-xs italic text-slate-600">&ldquo;{caseStudies[activeCase].comment}&rdquo;</p>
                </div>
              </div>

              {/* Case Results Metrics cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950 text-white rounded-xl p-6 border border-[#C5A880]/40 space-y-4 shadow-lg">
                  <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider block border-b border-white/10 pb-2">KẾT QUẢ THỰC TẾ ĐẠT ĐƯỢC</span>
                  
                  <div className="space-y-4 divide-y divide-white/10">
                    {caseStudies[activeCase].results.map((res, rIdx) => (
                      <div key={rIdx} className="pt-3 first:pt-0 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">{res.label}</span>
                        <span className="text-xl font-mono font-black text-[#C5A880]">{res.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* AI ADS AUDIT ASSISTANT (CUSTOM EMBEDDED DYNAMIC TOOL) */}
      <section className="py-20 bg-slate-950 text-white border-b border-[#C5A880]/30" id="ai-audit-box">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-full text-xs font-semibold tracking-wider text-[#C5A880] uppercase">
              <Sparkles className="h-3 w-3" />
              Công nghệ độc quyền PGS AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Kiểm Tra & Tối Ưu Chiến Dịch Google Ads Bằng Trí Tuệ Nhân Tạo
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Bạn đang nghi ngờ chiến dịch quảng cáo hiện tại của mình đang bị lãng phí? Nhập thông số chiến dịch thực tế của doanh nghiệp của bạn, AI của PGS kết nối mô hình Gemini sẽ lập tức phân tích và đưa ra giải pháp đột phá hoàn toàn miễn phí.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Form Left Column */}
            <div className="lg:col-span-5 bg-white text-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#C5A880]" />
                Nhập thông số chiến dịch
              </h3>

              <form onSubmit={handleAIAudit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">1. Ngành nghề / Sản phẩm kinh doanh *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nha khoa thẩm mỹ, căn hộ chung cư, thiết bị y tế..."
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 p-3 rounded text-sm focus:outline-none focus:border-[#C5A880]"
                    id="input-industry"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">2. Ngân sách hàng tháng</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 20 triệu..."
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      className="w-full border border-slate-300 bg-slate-50 p-3 rounded text-sm focus:outline-none focus:border-[#C5A880]"
                      id="input-custom-budget"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">3. CPL hiện tại (Nếu có)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 250k/lead..."
                      value={customCPL}
                      onChange={(e) => setCustomCPL(e.target.value)}
                      className="w-full border border-slate-300 bg-slate-50 p-3 rounded text-sm focus:outline-none focus:border-[#C5A880]"
                      id="input-custom-cpl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">4. Vấn đề lớn nhất gặp phải</label>
                  <select
                    value={mainIssue}
                    onChange={(e) => setMainIssue(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 p-3 rounded text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    id="select-issue"
                  >
                    <option value="Chi phí trên lead quá đắt, không thể gánh nổi">Chi phí trên lead quá đắt, không thể gánh nổi</option>
                    <option value="Lead rác quá nhiều, sale phản hồi không đúng nhu cầu">Lead rác quá nhiều, sale phản hồi không đúng nhu cầu</option>
                    <option value="Đối thủ click tặc ảo phá hủy ngân sách liên tục">Đối thủ click tặc ảo phá hủy ngân sách liên tục</option>
                    <option value="Không cài đặt GA4/GTM, chạy ads mò mẫm không số liệu">Không cài đặt GA4/GTM, chạy ads mò mẫm không số liệu</option>
                    <option value="Landing page tải chậm, tỷ lệ thoát trang cực cao">Landing page tải chậm, tỷ lệ thoát trang cực cao</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">5. Website hoặc Landing page hiện có</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: www.doanhnghiep.com..."
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 p-3 rounded text-sm focus:outline-none focus:border-[#C5A880]"
                    id="input-website"
                  />
                </div>

                <button
                  type="submit"
                  disabled={auditLoading}
                  className="w-full py-4 bg-slate-950 text-white hover:bg-[#C5A880] hover:text-slate-950 text-sm font-bold uppercase tracking-wider rounded transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  id="submit-audit-btn"
                >
                  {auditLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      PGS AI Đang Tính Toán & Thiết Kế Báo Cáo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-[#C5A880]" />
                      Nhận Báo Cáo Phân Tích Chuyên Sâu Ngay
                    </>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-slate-400 text-center">
                * Cam kết tuyệt mật toàn bộ thông tin tài khoản quảng cáo và doanh nghiệp của bạn.
              </p>
            </div>

            {/* Response Output Right Column */}
            <div className="lg:col-span-7 bg-[#1E293B]/40 p-6 sm:p-8 rounded-2xl border border-white/10 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">KẾT QUẢ PHÂN TÍCH CHUYÊN GIA DỰA TRÊN AI</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">PGS_AI_ENGINE v3.5</span>
                </div>

                {auditLoading && (
                  <div className="py-20 flex flex-col items-center justify-center space-y-4">
                    <RefreshCw className="h-10 w-10 text-[#C5A880] animate-spin" />
                    <p className="text-slate-300 text-sm text-center max-w-md animate-pulse">
                      PGS AI đang truy xuất dữ liệu ngành, tính toán tỷ lệ lãng phí ngân sách và xây dựng ma trận từ khóa khuyến nghị cho bạn...
                    </p>
                  </div>
                )}

                {!auditLoading && !auditReport && (
                  <div className="py-16 text-center space-y-4">
                    <Sparkles className="h-12 w-12 text-slate-600 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Chưa Có Báo Cáo Phân Tích</h4>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                      Hãy điền thông tin chính xác về doanh nghiệp của bạn ở form bên cạnh, thuật toán AI cao cấp của chúng tôi sẽ lập tức trả về chiến lược tối ưu CPL dành riêng cho bạn.
                    </p>
                  </div>
                )}

                {!auditLoading && auditReport && (
                  <div className="prose prose-invert prose-xs max-w-none text-slate-200 overflow-y-auto max-h-[480px] scrollbar-thin pr-2 text-xs leading-relaxed space-y-4">
                    <ReactMarkdown>{auditReport}</ReactMarkdown>
                  </div>
                )}
              </div>

              {auditReport && (
                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-400">Bạn muốn triển khai bản kế hoạch tối ưu này ngay lập tức?</span>
                  <a
                    href="#pricing"
                    className="px-4 py-2 bg-[#C5A880] hover:bg-[#C5A880]/80 text-slate-950 text-xs font-bold uppercase rounded transition-colors"
                  >
                    Xem Gói Triển Khai PGS
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 12: GÓI TRIỂN KHAI */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Cam kết chất lượng</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Các Gói Triển Khai Dịch Vụ Google Ads Tại PGS Agency
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Chúng tôi cung cấp các tùy chọn dịch vụ minh bạch, đáp ứng quy mô ngân sách và mong muốn tăng trưởng riêng biệt của từng doanh nghiệp.
            </p>

            {/* Monthly / Quarterly Discount toggle */}
            <div className="inline-flex items-center gap-3 bg-[#FAF9F6] border border-slate-200 p-1.5 rounded-full mt-4">
              <button
                onClick={() => setIsQuarterly(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !isQuarterly
                    ? "bg-slate-950 text-white shadow"
                    : "text-slate-600 hover:text-slate-950"
                }`}
                id="toggle-monthly"
              >
                Hợp Đồng Từng Tháng
              </button>
              <button
                onClick={() => setIsQuarterly(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isQuarterly
                    ? "bg-slate-950 text-white shadow"
                    : "text-slate-600 hover:text-slate-950"
                }`}
                id="toggle-quarterly"
              >
                Hợp Đồng 3 Tháng
                <span className="bg-[#C5A880] text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                  -15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => {
              const currentPrice = isQuarterly ? pkg.price * 0.85 : pkg.price;
              const formattedPrice = currentPrice.toLocaleString() + " VNĐ";

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular
                      ? "border-[#C5A880] shadow-xl shadow-slate-200/50 scale-105 z-10"
                      : "border-slate-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 text-[#C5A880] border border-[#C5A880] text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Khuyên Dùng Cho Doanh Nghiệp Cần Lead
                    </span>
                  )}

                  <div className="p-8 border-b border-slate-100">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {pkg.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mb-4">{pkg.name}</h3>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-mono font-black text-slate-950">{formattedPrice}</span>
                      <span className="text-xs text-slate-500 block mt-1">/ chiến dịch tháng</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{pkg.desc}</p>
                  </div>

                  {/* Features list */}
                  <div className="p-8 flex-grow space-y-4">
                    <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">Chi tiết quyền lợi gói:</span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle className="h-4 w-4 text-[#9E8359] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                    <a
                      href={`https://zalo.me/0981923456?text=Tôi muốn nhận tư vấn báo giá gói ${pkg.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 text-center block text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 ${
                        pkg.popular
                          ? "bg-slate-950 text-white hover:bg-[#C5A880] hover:text-slate-950"
                          : "bg-white text-slate-900 border border-slate-200 hover:border-slate-300"
                      }`}
                      id={`pkg-cta-${idx}`}
                    >
                      {pkg.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ ACCORDION */}
      <section className="py-20 bg-[#FAF9F6] border-b border-slate-200/50" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Giải đáp băn khoăn</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Giải đáp thắc mắc thường gặp về Google Ads
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
              Những câu trả lời trung thực, khách quan giúp bạn gỡ bỏ hoàn toàn thắc mắc trước khi đưa ra quyết định hợp tác.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-950 hover:text-[#9E8359] transition-colors"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-[#C5A880] ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-100 p-5 bg-slate-50 text-xs sm:text-sm text-slate-600 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 14: DỊCH VỤ LIÊN QUAN */}
      <section className="py-20 bg-white border-b border-slate-200/50" id="related-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E8359]">Hệ sinh thái dịch vụ</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Các dịch vụ marketing bổ trợ tăng trưởng tại PGS Agency
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              PGS không cung cấp các giải pháp marketing rời rạc. Chúng tôi xây dựng hệ thống cộng hưởng đa nền tảng để tạo lực đẩy doanh số lớn nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Thiết Kế Landing Page", desc: "Tạo lập trang đích tối ưu điểm chuyển đổi CRO nâng tầm doanh số chiến dịch." },
              { title: "Thiết Kế Website Chuẩn SEO", desc: "Xây dựng bệ phóng số vững chắc, uy tín, hiển thị hoàn hảo đa thiết bị." },
              { title: "Quảng Cáo Facebook Ads", desc: "Tiếp cận tệp khách hàng diện rộng theo sở thích hành vi với hình ảnh bắt mắt." },
              { title: "Dịch Vụ SEO Tổng Thể", desc: "Chiếm lĩnh thứ hạng từ khóa tự nhiên bền vững lâu dài, thu hút click miễn phí." },
              { title: "Chăm Sóc & Quản Trị Website", desc: "Đảm bảo website luôn tươi mới, cập nhật tin tức mượt mà, bảo mật 24/7." }
            ].map((related, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-5 rounded-xl border border-slate-200 hover:border-[#C5A880] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 mb-2">{related.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{related.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-[#9E8359]">
                  Khám phá ngay <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: CTA CUỐI TRANG & BUDGET LEAK VISUAL */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden" id="final-cta">
        <div className="absolute inset-0 bg-radial-at-b from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="h-16 w-16 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
            <AlertTriangle className="h-8 w-8 text-[#C5A880]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bạn đang chạy Google Ads nhưng chưa biết tiền của mình đang lãng phí ở đâu?
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Đừng nướng thêm tiền vô ích. Hãy để đội ngũ kỹ thuật của PGS Agency trực tiếp kiểm định tài khoản quảng cáo, bóc tách các điểm rò rỉ ngân sách và tái thiết lập hệ thống tăng trưởng Lead bền vững cho bạn.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="#ai-audit-box"
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#C5A880]/85 text-slate-950 font-bold text-sm rounded uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              id="final-cta-btn-audit"
            >
              <Sparkles className="h-4 w-4" />
              Kiểm Tra Tài Khoản Bằng AI PGS
            </a>
            <a
              href="https://zalo.me/0981923456"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-slate-950 text-white font-bold text-sm rounded uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              id="final-cta-btn-zalo"
            >
              <PhoneCall className="h-4 w-4" />
              Liên hệ Hotline / Zalo Chuyên Gia
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-slate-400 font-medium font-mono">
            <span>● PGS Agency Co., Ltd.</span>
            <span>● Hotline: 098.192.3456</span>
            <span>● Email: contact@pgs-agency.vn</span>
            <span>● Địa chỉ: Tòa nhà PGS, 126 Nguyễn Thị Minh Khai, Quận 3, TPHCM</span>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CONTACT ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 grid grid-cols-2 shadow-2xl">
        <a
          href="https://zalo.me/0981923456"
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 text-center bg-[#C5A880] text-slate-950 font-bold text-xs uppercase flex items-center justify-center gap-2 border-r border-slate-200"
          id="sticky-mobile-zalo"
        >
          <PhoneCall className="h-4 w-4" />
          Chat Zalo Tư Vấn
        </a>
        <a
          href="#ai-audit-box"
          className="py-4 text-center bg-slate-950 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
          id="sticky-mobile-audit"
        >
          <Sparkles className="h-4 w-4 text-[#C5A880]" />
          Kiểm tra Ads AI
        </a>
      </div>

    </div>
  );
}
