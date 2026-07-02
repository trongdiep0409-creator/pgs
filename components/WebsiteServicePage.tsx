'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, X, ChevronRight, ChevronDown, ArrowRight, Search, Code, Monitor, 
  Smartphone, Activity, Sparkles, TrendingUp, Layers, Shield, Users, 
  BarChart3, Cpu, Clock, Settings, AlertCircle, ThumbsUp, CheckCircle2, 
  MousePointerClick, Target, FileText, Mail, Phone, MapPin, ExternalLink, 
  Zap, ChevronUp, RefreshCw, Play, Layout, MessageSquare, Award, HelpCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Mock Data for efficient UI rendering
const MOCK_QUESTIONS = [
  {
    q: "1. Bạn là ai?",
    consequence: "Nếu thiếu: Khách hàng hoài nghi, thoát trang ngay lập tức vì không biết website thuộc doanh nghiệp nào hay tổ chức lừa đảo.",
    solution: "PGS định nghĩa: Ngay phần Hero hiển thị logo rõ nét, hình ảnh đội ngũ/văn phòng thực tế, chứng nhận pháp lý và khẩu hiệu ngắn gọn khẳng định uy tín."
  },
  {
    q: "2. Bạn cung cấp dịch vụ/sản phẩm gì?",
    consequence: "Nếu thiếu: Khách hàng bối rối, không hiểu doanh nghiệp bán gì để mua, làm tăng tỷ lệ thoát.",
    solution: "PGS định nghĩa: Danh mục sản phẩm/dịch vụ thiết kế phân loại thông minh, có tóm tắt tính năng và giá trị cụ thể trao cho khách hàng."
  },
  {
    q: "3. Vì sao tôi nên tin và chọn bạn?",
    consequence: "Nếu thiếu: Khách hàng chọn đối thủ vì không tìm thấy lý do thuyết phục hoặc điểm độc bản (USP) của bạn.",
    solution: "PGS định nghĩa: Đưa ra con số biết nói (số năm kinh nghiệm, dự án hoàn thành) và chứng chỉ, giải thưởng, cam kết chất lượng rõ ràng."
  },
  {
    q: "4. Bạn đã làm điều đó cho ai?",
    consequence: "Nếu thiếu: Thiếu tính thực tế. Khách hàng nghĩ bạn chỉ nói suông mà không có năng lực thực thi.",
    solution: "PGS định nghĩa: Showroom case study thực tế, slider Before/After trực quan kèm phản hồi bằng video/văn bản có danh tính thật của khách hàng."
  },
  {
    q: "5. Quy trình hợp tác ra sao?",
    consequence: "Nếu thiếu: Khách cảm thấy mơ hồ, sợ mất thời gian và phát sinh chi phí ngoài tầm kiểm soát.",
    solution: "PGS định nghĩa: Quy trình thiết kế website và bàn giao 12 bước minh bạch, có báo cáo tiến độ theo tuần và mốc nghiệm thu rõ ràng."
  },
  {
    q: "6. Tôi liên hệ với bạn thế nào?",
    consequence: "Nếu thiếu: Đánh mất lead nóng. Khách muốn mua nhưng form lỗi, hotline không ai nghe, hoặc không tìm thấy nút chat.",
    solution: "PGS định nghĩa: Sticky CTA góc màn hình, form tư vấn tối giản 3 trường thông tin, tích hợp call/Zalo click tracking tự động gửi dữ liệu về CRM."
  }
];

const MOCK_PAIN_POINTS = [
  { id: 1, title: "Tốc độ tải chậm (3s+)", desc: "Mất 50% lượng truy cập ngay lập tức. Khách hàng không đủ kiên nhẫn để chờ đợi một website quay đều.", bad: "Bounce rate vọt lên 80%", solve: "PGS tối ưu Core Web Vitals đạt 90+ điểm, nén ảnh thế hệ mới, tối giản code dư thừa." },
  { id: 2, title: "CTA mờ nhạt, thiếu định hướng", desc: "Khách hàng đọc xong nội dung nhưng không biết phải làm gì tiếp theo, âm thầm tắt tab.", bad: "Tỷ lệ chuyển đổi < 0.5%", solve: "Bố trí nút CTA tương phản, kích thước chuẩn ngón cái, xuất hiện đúng điểm chạm tâm lý." },
  { id: 3, title: "Không chuẩn SEO kỹ thuật", desc: "Không được Google index, không thể lên top dù có viết bao nhiêu bài viết chất lượng.", bad: "Mất traffic tự nhiên (Organic)", solve: "Cấu trúc schema chuẩn hóa, tối ưu thẻ heading H1-H3 tự động, robots.txt & sitemap XML hoàn hảo." },
  { id: 4, title: "Giao diện Mobile lỗi font, vỡ khung", desc: "90% người dùng truy cập từ điện thoại nhưng giao diện chỉ tối ưu cho máy tính.", bad: "Đánh mất 90% cơ hội tiếp cận", solve: "Thiết kế Mobile-first responsive chuẩn hóa mọi độ phân giải thiết bị di động." },
  { id: 5, title: "Nội dung nhàm chán, chung chung", desc: "Chỉ copy bài của đối thủ, không tập trung giải quyết nỗi đau thực tế của khách hàng.", bad: "Thời gian ở lại trang < 10 giây", solve: "Xây dựng sườn nội dung chuẩn chỉnh theo cấu trúc phễu chuyển đổi AIDA chuyên sâu." },
  { id: 6, title: "Hệ thống đo lường mù mờ", desc: "Chạy quảng cáo tốn hàng chục triệu nhưng không biết lead đổ về từ nguồn nào hay nút bấm nào.", bad: "Đốt tiền quảng cáo vô ích", solve: "Tích hợp GTM, GA4, pixel đo lường chi tiết từng nút bấm, form gửi để tối ưu Ads." },
  { id: 7, title: "Thiếu Social Proof thực tế", desc: "Quá nhiều lý thuyết suông, không có hình ảnh khách hàng thật, dự án thật để củng cố lòng tin.", bad: "Khách hàng nghi ngờ uy tín", solve: "Tích hợp module đánh giá, slider ảnh trước/sau và feedback chân thực từ khách hàng." }
];

const MOCK_COMPARISON = [
  { criteria: "Mục tiêu cốt lõi", normal: "Chỉ làm đẹp giao diện, giới thiệu thông tin cơ bản.", pgs: "Cỗ máy tạo lead tự động, tối ưu chi phí quảng cáo và tăng trưởng doanh số." },
  { criteria: "Tốc độ PageSpeed", normal: "Chậm chạp (thường 40 - 60 điểm), tải nhiều script thừa.", pgs: "Bứt tốc thần tốc (90+ điểm), trải nghiệm mượt mà, giữ chân khách hàng." },
  { criteria: "Tối ưu hóa SEO", normal: "Chỉ khai báo thẻ cơ bản, không có Schema, sitemap lỗi.", pgs: "Chuẩn SEO Technical từ gốc, cài đặt Schema cấu trúc, cấu hình sitemap tự động." },
  { criteria: "Chiến lược nội dung", normal: "Chữ viết lan man, copy đối thủ, không có bố cục rõ ràng.", pgs: "Nội dung thiết kế theo phễu AIDA, xoáy sâu nỗi đau và đưa ra giải pháp đắt giá." },
  { criteria: "Đo lường & Tracking", normal: "Không cài đặt, hoặc chỉ cài mã GA4 chung chung không có event.", pgs: "Tích hợp đo lường chuyên sâu GTM, bắt sự kiện click Zalo, Hotline, gửi Form chi tiết." },
  { criteria: "Tương thích Mobile", normal: "Co dãn tự động bằng code thô, dễ lỗi bố cục trên máy nhỏ.", pgs: "Thiết kế Mobile-First riêng biệt, trải nghiệm vuốt chạm chuẩn ngón tay siêu mượt." },
  { criteria: "Khả năng tối ưu CRO", normal: "Đặt nút liên hệ lung tung, form quá nhiều trường bắt nhập.", pgs: "Sticky CTA thông minh, form tinh gọn tăng 200% tỷ lệ để lại số điện thoại." }
];

const MOCK_LAYERS = [
  { title: "1. Brand Strategy (Chiến lược thương hiệu)", desc: "Xác định rõ cá tính thương hiệu, định vị khách hàng mục tiêu và thiết lập hệ thống thông điệp cốt lõi truyền tải sự uy tín ngay từ cái nhìn đầu tiên." },
  { title: "2. Sitemap SEO (Sơ đồ website tối ưu)", desc: "Xây dựng sơ đồ phân cấp website chuẩn cấu trúc Silo giúp bot Google dễ dàng quét dữ liệu và phân phối sức mạnh SEO đều cho các trang dịch vụ." },
  { title: "3. Wireframe (Bản vẽ phác thảo cấu trúc)", desc: "Xác lập vị trí các khối nội dung, luồng đi của khách hàng (User Flow) để đảm bảo trải nghiệm logic nhất trước khi thiết kế đồ họa." },
  { title: "4. UI Direction (Thiết kế phong cách đồ họa)", desc: "Áp dụng phong cách Light Premium Consulting sáng sủa, phối hợp màu vàng gold vương giả và khoảng trắng tinh tế tạo cảm giác chuyên nghiệp hàng đầu." },
  { title: "5. Content Architecture (Kiến trúc nội dung)", desc: "Viết nội dung chuẩn phễu chuyển đổi AIDA, biên soạn tiêu đề giật tít hấp dẫn và chuẩn bị đầy đủ chứng cứ Social Proof thuyết phục." },
  { title: "6. CRO (Tối ưu hóa tỉ lệ chuyển đổi)", desc: "Đặt các điểm chạm chuyển đổi chiến lược: Form đăng ký tinh giản, nút liên hệ nổi bật, popup ưu đãi thông minh, sticky bar trên thiết bị di động." },
  { title: "7. Technical SEO (Kỹ thuật chuẩn SEO)", desc: "Tối ưu thẻ heading chuẩn chỉ, định dạng thẻ ALT cho ảnh, khai báo canonical chống trùng lặp, tối ưu Core Web Vitals đạt tốc độ tải trang cực đỉnh." },
  { title: "8. Tracking Integration (Tích hợp đo lường)", desc: "Cài đặt Google Tag Manager và Google Analytics 4 để ghi nhận chính xác mọi hành vi: click hotline, gửi form, đo nguồn traffic để tối ưu ngân sách Ads." }
];

const MOCK_HOMEPAGE_SECTIONS = [
  { id: "header", name: "Header (Thanh điều hướng)", desc: "Gồm Logo định vị thương hiệu, Menu tinh gọn, hotline gọi ngay và nút CTA nổi bật góc phải." },
  { id: "hero", name: "Hero Section (Trang đầu)", desc: "H1 ấn tượng, thông điệp độc bản USP, CTA chính thu hút lead và 3D blueprint đại diện dịch vụ." },
  { id: "proof", name: "Social Proof (Chứng thực nhanh)", desc: "Hiển thị logo các đối tác lớn đã hợp tác và các chứng nhận năng lực uy tín." },
  { id: "pain", name: "Vấn đề của khách (Pain Points)", desc: "Nêu bật các nỗi đau mà khách hàng đang gặp phải với website cũ hoặc hệ thống marketing rời rạc." },
  { id: "solution", name: "Giải pháp từ PGS (Solution)", desc: "Giới thiệu hệ thống Website Tăng Trưởng của PGS giải quyết triệt để các nỗi đau đó như thế nào." },
  { id: "service", name: "Chi tiết Dịch vụ (Core Offers)", desc: "Các hạng mục thiết kế chi tiết phù hợp với từng nhu cầu cụ thể của doanh nghiệp." },
  { id: "why-us", name: "Vì sao chọn PGS (Why Choose)", desc: "Triết lý đồng hành dài hạn, minh bạch dữ liệu và cam kết chuyển đổi thực tế." },
  { id: "process", name: "Quy trình làm việc (Process)", desc: "Trực quan hóa quy trình 12 bước bàn giao sản phẩm từ khảo sát đến bảo hành." },
  { id: "cases", name: "Dự án tiêu biểu (Case Studies)", desc: "Showcase các website thực tế kèm số liệu PageSpeed vượt trội và tăng trưởng lead thực." },
  { id: "team", name: "Đội ngũ chuyên gia (Our Team)", desc: "Giới thiệu nhân sự thực thi giàu kinh nghiệm, tăng tính minh bạch thương hiệu (EEAT)." },
  { id: "blog", name: "Kiến thức chuyên môn (Blog)", desc: "Chia sẻ bài viết giá trị về SEO, Ads, CRO chứng minh năng lực tư vấn chuyên nghiệp." },
  { id: "faq", name: "Câu hỏi thường gặp (FAQ)", desc: "Giải đáp nhanh thắc mắc của khách hàng để phá bỏ rào cản mua hàng cuối cùng." },
  { id: "cta", name: "CTA Panel & Form cuối trang", desc: "Tiêu đề kích thích chuyển đổi mạnh mẽ và form liên hệ tối giản để nhận tư vấn miễn phí." },
  { id: "footer", name: "Footer (Chân trang)", desc: "Thông tin pháp lý rõ ràng, bản đồ đường đi, liên kết mạng xã hội tăng uy tín tìm kiếm Google." }
];

const MOCK_WEB_TYPES = [
  {
    id: "corp",
    name: "Website Doanh Nghiệp",
    kpi: "Nhận diện thương hiệu & Uy tín",
    desc: "Thiết kế trang trọng, giới thiệu hồ sơ năng lực công ty, chứng chỉ pháp lý, và bộ giải pháp cốt lõi để thu hút đối tác, nhà đầu tư lớn.",
    features: ["Giới thiệu doanh nghiệp chuẩn hóa", "Tích hợp hồ sơ năng lực tải về", "Module tuyển dụng tích hợp", "Trang tin tức & thông cáo báo chí"]
  },
  {
    id: "service",
    name: "Website Dịch Vụ / B2B",
    kpi: "Tối đa hóa Lead đăng ký (CPL thấp)",
    desc: "Tập trung sâu vào giải quyết nỗi đau của khách hàng doanh nghiệp, phô diễn các case study thực tế và biểu mẫu đăng ký nhận báo giá mượt mà.",
    features: ["Form thu thập thông tin đa tầng", "Tích hợp chatbot & Zalo OA chat", "Bảng tính chi phí dịch vụ mẫu", "Trang landing page riêng cho từng dịch vụ"]
  },
  {
    id: "expert",
    name: "Website Chuyên Gia / Cá Nhân",
    kpi: "Xây dựng Personal Brand & Đặt lịch tư vấn",
    desc: "Tôn vinh hình ảnh cá nhân chuyên gia, chia sẻ kiến thức chuyên sâu, tích hợp lịch hẹn tự động giúp tối ưu thời gian chốt lịch.",
    features: ["Tích hợp lịch hẹn trực tuyến (Calendly)", "Portfolio dự án đã tư vấn", "Hệ thống video/podcast chia sẻ kiến thức", "Form đăng ký nhận bản tin (Newsletter)"]
  },
  {
    id: "landing",
    name: "Landing Page SEO / Ads",
    kpi: "Tối ưu hóa tỷ lệ chuyển đổi (CR đạt 5-15%)",
    desc: "Trang đơn tập trung duy nhất vào 1 sản phẩm/dịch vụ cụ thể, loại bỏ các link điều hướng thừa để giữ chân khách hàng đi đến bước điền form.",
    features: ["Cấu trúc nội dung chuẩn phễu AIDA", "Nút CTA lặp lại thông minh theo cuộn trang", "Đồng hồ đếm ngược ưu đãi (FOMO)", "Hiệu ứng chuyển động tập trung vào nút bấm"]
  }
];

const MOCK_STEPS = [
  { step: 1, title: "Khảo sát yêu cầu", desc: "PGS tiếp nhận thông tin, gửi bảng câu hỏi nghiên cứu sâu về mô hình kinh doanh, mục tiêu tăng trưởng." },
  { step: 2, title: "Nghiên cứu đối thủ", desc: "Phân tích 3 đối thủ trực tiếp về cấu trúc web, từ khóa SEO đang lên và điểm yếu để thiết lập thế vượt trội." },
  { step: 3, title: "Sơ đồ Sitemap", desc: "Lập cấu trúc sitemap phân tầng chuẩn SEO Silo, đảm bảo bot Google quét thông tin dễ dàng nhất." },
  { step: 4, title: "Phác thảo Wireframe", desc: "Xây dựng bản vẽ bố cục đen trắng, định hình luồng di chuyển của khách hàng và vị trí đặt các nút CTA." },
  { step: 5, title: "Biên tập Content", desc: "Đội ngũ copywriter của PGS biên soạn nội dung chi tiết theo phễu tâm lý, chuẩn bị hình ảnh/video thực tế." },
  { step: 6, title: "Thiết kế giao diện UI", desc: "Phối màu Light Premium Gold, thiết kế chi tiết từng pixel trên Figma để khách hàng duyệt phong cách trực quan." },
  { step: 7, title: "Lập trình Web", desc: "Chuyển đổi thiết kế thành code tối ưu, sử dụng công nghệ Next.js/React đảm bảo tốc độ tải trang cực đại." },
  { step: 8, title: "Tối ưu Technical SEO", desc: "Cấu hình Schema JSON-LD, thẻ Canonical, tối ưu heading H1-H3, chuẩn hóa file sitemap.xml & robots.txt." },
  { step: 9, title: "Thiết lập Tracking", desc: "Cài đặt GTM, GA4 đo lường chính xác các sự kiện: gửi form, gọi điện, chat Zalo, đo lường nguồn chuyển đổi." },
  { step: 10, title: "Kiểm thử tốc độ", desc: "Đo đạc kiểm thử bằng Google PageSpeed Insights, tối ưu Core Web Vitals đạt chuẩn xanh (90+ điểm)." },
  { step: 11, title: "Bàn giao & Đào tạo", desc: "Bàn giao mã nguồn sạch, tài liệu hướng dẫn quản trị trực quan bằng video để khách hàng tự làm chủ dữ liệu." },
  { step: 12, title: "Bảo hành & Đồng hành", desc: "Hỗ trợ kỹ thuật 24/7 trong 12 tháng, tư vấn tối ưu chuyển đổi theo chiến dịch marketing Ads/SEO thực tế." }
];

const MOCK_SEO_CHECKLIST = [
  { label: "Khai báo thẻ H1 độc nhất chứa từ khóa chính", detail: "Mỗi trang chỉ được phép có duy nhất 1 thẻ H1 làm tiêu đề chính giúp Google định vị chủ đề cốt lõi." },
  { label: "Cấu trúc URL thân thiện, không chứa tham số động", detail: "URL dạng không dấu phân tách bằng gạch ngang (VD: /dich-vu/dich-vu-thiet-ke-website/) giúp tăng điểm click-through." },
  { label: "Cài đặt File Sitemap.xml & Robots.txt tự cập nhật", detail: "Dẫn đường cho robot Google lập chỉ mục tự động ngay khi bạn xuất bản bài viết mới." },
  { label: "Khai báo cấu trúc Schema JSON-LD chi tiết", detail: "Schema Service, Organization, FAQ giúp hiển thị Rich Snippets cực đẹp trên kết quả tìm kiếm." },
  { label: "Tối ưu hóa thuộc tính ALT chứa từ khóa cho mọi hình ảnh", detail: "Giúp Google bot hiểu nội dung bức ảnh và đưa ảnh của bạn lên mục tìm kiếm hình ảnh." },
  { label: "Cài đặt thẻ Canonical chống trùng lặp nội dung", detail: "Chỉ định URL gốc chuẩn xác nếu bài viết có nhiều biến thể link tránh bị Google phạt trùng lặp." },
  { label: "Tương thích 100% di động (Mobile-Friendly test đạt chuẩn)", detail: "Yếu tố xếp hạng cực kỳ quan trọng vì Google đã chuyển sang lập chỉ mục ưu tiên di động từ lâu." },
  { label: "Điểm tốc độ Core Web Vitals (PageSpeed) đạt chuẩn xanh (>90)", detail: "Tốc độ tải dưới 2 giây giúp giảm tỷ lệ thoát trang và cải thiện vị thế cạnh tranh từ khóa." }
];

const MOCK_PACKAGES = [
  {
    name: "Website Foundation",
    price: "15,000,000đ",
    priceAds: "12,000,000đ",
    desc: "Phù hợp cho start-up, doanh nghiệp mới cần website chuẩn hóa để làm bệ phóng hình ảnh.",
    features: [
      "Thiết kế giao diện chuẩn độc quyền",
      "Giao diện chuẩn Responsive di động",
      "Tối ưu Technical SEO nền tảng",
      "Tốc độ PageSpeed đạt 85+ điểm",
      "Tích hợp nút Gọi, Chat Zalo nhanh",
      "Bàn giao toàn bộ mã nguồn & tài liệu",
      "Bảo hành kỹ thuật 12 tháng"
    ]
  },
  {
    name: "Website Growth",
    price: "25,000,000đ",
    priceAds: "20,000,000đ",
    desc: "Giải pháp toàn diện tối ưu tỷ lệ chuyển đổi khách hàng dành cho doanh nghiệp đẩy Ads & SEO.",
    isBest: true,
    features: [
      "Toàn bộ tính năng gói Foundation",
      "Thiết kế cấu trúc chuẩn phễu AIDA",
      "Biên soạn nội dung Content chuẩn SEO (5 trang chính)",
      "Thiết lập GTM, GA4 đo lường chuyển đổi thực tế",
      "Tối ưu tốc độ tải trang Core Web Vitals đạt 95+ điểm",
      "Thiết kế Form liên hệ tối ưu CRO",
      "Bản đồ Schema.org nâng cao cho doanh nghiệp",
      "Hỗ trợ cấu hình tên miền, hosting ban đầu"
    ]
  },
  {
    name: "Website Premium SEO-ready",
    price: "45,000,000đ",
    priceAds: "38,000,000đ",
    desc: "Hệ thống website lớn, tối ưu hạ tầng vững chắc phục vụ chiến dịch SEO phủ thị trường quy mô.",
    features: [
      "Toàn bộ tính năng gói Growth",
      "Xây dựng cấu trúc Silo SEO chuyên sâu đa tầng",
      "Nội dung chuẩn SEO cao cấp (15 trang chính)",
      "Tối ưu PageSpeed tuyệt đối đạt 98+ điểm",
      "Tích hợp hệ thống Blog tự động hóa, cấu hình AMP",
      "Bảo mật SSL nâng cao + CDN chống DDoS",
      "Đồng hành tối ưu chuyển đổi theo tuần trong 3 tháng đầu",
      "Ưu tiên hỗ trợ kỹ thuật 24/7 tức thì"
    ]
  }
];

const MOCK_FAQS = [
  { q: "Thiết kế một website tăng trưởng tại PGS mất bao lâu?", a: "Thời gian hoàn thành trung bình dao động từ 15 đến 30 ngày làm việc tùy thuộc vào quy mô dự án và gói dịch vụ lựa chọn. Cụ thể: Gói Foundation từ 10 - 15 ngày, gói Growth từ 20 - 25 ngày và gói Premium từ 30 - 45 ngày bao gồm cả thời gian biên soạn nội dung chi tiết." },
  { q: "PGS Agency có hỗ trợ viết nội dung cho website luôn không?", a: "Có. Điểm khác biệt lớn nhất của PGS là chúng tôi không giao website trống rỗng. Với gói Growth và Premium, đội ngũ chuyên gia nội dung (Copywriter) của chúng tôi sẽ trực tiếp biên soạn nội dung chuẩn SEO, chuẩn phễu bán hàng độc quyền cho doanh nghiệp của bạn trước khi bàn giao." },
  { q: "Website thiết kế xong có thực sự chuẩn SEO không?", a: "Chúng tôi cam kết website chuẩn SEO Technical 100% ngay từ trong code. Tất cả các yếu tố xếp hạng nền tảng như: Thẻ Heading phân cấp chuẩn, khai báo Schema JSON-LD cấu trúc, tốc độ load siêu nhanh, sitemap.xml, robots.txt tự động, URL sạch... đều được tối ưu tỉ mỉ bởi chuyên gia SEO của PGS." },
  { q: "Sau khi bàn giao, chúng tôi có tự quản lý và thay đổi nội dung được không?", a: "Hoàn toàn được. PGS bàn giao 100% mã nguồn và hệ quản trị trực quan. Chúng tôi sẽ cung cấp tài liệu đào tạo chi tiết bằng video ngắn giúp nhân viên của bạn dễ dàng thêm mới sản phẩm, thay đổi banner, viết bài blog mà không cần biết lập trình." },
  { q: "PGS có chính sách bảo trì và bảo hành như thế nào?", a: "Mọi website do PGS Agency thiết kế đều được bảo hành kỹ thuật toàn diện trong vòng 12 tháng. Khi phát sinh lỗi hiển thị, lỗi bảo mật hoặc server không truy cập được, đội ngũ kỹ thuật của chúng tôi sẽ tiến hành khắc phục trong vòng tối đa 2 giờ làm việc." }
];

export default function WebsiteServicePage() {
  // States for interactive components
  const [activeBlueprintLayer, setActiveBlueprintLayer] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [activeLayerSection, setActiveLayerSection] = useState<number>(0);
  const [hoveredHomepageSection, setHoveredHomepageSection] = useState<string>("hero");
  const [activeWebTypeTab, setActiveWebTypeTab] = useState<string>("corp");
  const [activeStepTimeline, setActiveStepTimeline] = useState<number>(1);
  const [seoChecklistStates, setSeoChecklistStates] = useState<boolean[]>(Array(MOCK_SEO_CHECKLIST.length).fill(false));
  const [pricingCycle, setPricingCycle] = useState<'individual' | 'with-ads-seo'>('with-ads-seo');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Slider Before/After state
  const [sliderPos, setSliderPos] = useState<number>(50);
  const isDragging = useRef<boolean>(false);

  // GTM/GA4 Tracking Simulator state
  const [trackingLogs, setTrackingLogs] = useState<Array<{ id: number; event: string; label: string; time: string; source: string }>>([
    { id: 1, event: "page_view", label: "Đã tải trang dịch vụ thiết kế website", time: "Vừa xong", source: "Tự nhiên (SEO)" }
  ]);

  // AI Generator state
  const [aiIndustry, setAiIndustry] = useState<string>("");
  const [aiDetails, setAiDetails] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  // Lead Form state
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [leadService, setLeadService] = useState<string>("Website Growth");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);

  // SEO Score calculation
  const seoCheckedCount = seoChecklistStates.filter(Boolean).length;
  const seoScore = Math.round((seoCheckedCount / MOCK_SEO_CHECKLIST.length) * 100);

  // Before/after slide handler
  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPos(percentage);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, container);
    }
  };

  // Push custom GTM log helper
  const triggerTrackingLog = (event: string, label: string) => {
    const newLog = {
      id: Date.now(),
      event,
      label,
      time: new Date().toLocaleTimeString('vi-VN'),
      source: ["Google Ads", "Facebook Ads", "SEO Google", "Direct"][Math.floor(Math.random() * 4)]
    };
    setTrackingLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  // AI Generation call
  const generateAIBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiIndustry.trim()) {
      setAiError("Vui lòng điền ngành nghề kinh doanh!");
      return;
    }
    setAiError("");
    setIsAiLoading(true);
    setAiResult("");

    try {
      const response = await fetch("/api/gemini/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: aiIndustry, details: aiDetails }),
      });
      const data = await response.json();
      if (response.ok) {
        setAiResult(data.text);
        triggerTrackingLog("ai_blueprint_generated", `Đã tạo blueprint ngành: ${aiIndustry}`);
      } else {
        setAiError(data.error || "Có lỗi xảy ra khi tạo bản thiết kế.");
      }
    } catch (err: any) {
      setAiError("Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Simple Form Submission Handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Vui lòng điền đầy đủ Họ tên và Số điện thoại!");
      return;
    }
    triggerTrackingLog("lead_form_submitted", `Khách đăng ký tư vấn gói: ${leadService}`);
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setLeadName("");
      setLeadPhone("");
      setLeadEmail("");
    }, 5000);
  };

  return (
    <div className="min-h-screen font-sans bg-[#FAF9F5] text-[#1C1C1C] overflow-x-hidden relative">
      
      {/* HEADER SECTION */}
      

      {/* SECTION 1: HERO WEBSITE BLUEPRINT */}
      <section id="hero-blueprint" className="relative pt-10 pb-20 md:py-24 overflow-hidden border-b border-gray-100 bg-gradient-to-b from-[#FCFAF6] to-[#FAF9F5]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold-200/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold-100/30 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                LIGHT PREMIUM CONSULTING STYLE
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-[#1C1C1C] leading-[1.15]">
                Dịch vụ thiết kế <span className="text-amber-700 border-b-2 border-[#C5A880]/30 pb-1">Website chuẩn SEO</span>, chuẩn UX/UI và tối ưu chuyển đổi cho doanh nghiệp tăng trưởng
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Một website thành công không chỉ dừng lại ở giao diện đẹp mắt. Tại PGS Agency, chúng tôi thiết kế những “Cỗ máy bán hàng số” hoàn chỉnh: Tốc độ tải trang tối đa, chuẩn SEO Technical vững chắc, tích hợp đo lường sự kiện và chuẩn phễu CRO giữ chân khách hàng tạo lead bùng nổ.
              </p>

              {/* Floating badges row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["PageSpeed 95+", "SEO-ready từ lõi", "Mobile-first", "Tích hợp GTM & GA4", "Chuẩn phễu CRO"].map((badge, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-white border border-gray-200/60 shadow-xs text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#contact" 
                  onClick={() => triggerTrackingLog("click_hero_cta", "Bấm CTA nhận tư vấn thiết kế website")}
                  className="px-8 py-4 rounded-full bg-[#C5A880] text-white font-medium text-sm text-center shadow-lg hover:shadow-xl hover:bg-[#B19266] transition-all transform hover:-translate-y-0.5"
                >
                  Nhận tư vấn thiết kế website
                </a>
                <a 
                  href="#ai-generator" 
                  className="px-8 py-4 rounded-full bg-white text-gray-700 border border-gray-300 font-medium text-sm text-center hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  Thử Tự Tạo Blueprint Với AI
                </a>
              </div>
            </div>

            {/* Hero Right - Interactive Growth Website Blueprint Simulator */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200/80 relative">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <span className="text-xs font-mono text-gray-400">pgs-growth-blueprint.xml</span>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mô phỏng Blueprint 8 lớp PGS:</div>
                  
                  {/* Miniature simulated webpage container */}
                  <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 space-y-3 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                    
                    {/* Simulated visual elements added based on state */}
                    <div className="space-y-2">
                      <div className="h-6 rounded bg-gray-200 flex items-center px-2 justify-between">
                        <span className="text-[9px] font-bold text-gray-500">PGS Brand Logo</span>
                        <div className="w-12 h-2 rounded bg-gray-300"></div>
                      </div>
                      
                      {activeBlueprintLayer >= 1 && (
                        <div className="p-2 rounded bg-amber-50 border border-amber-200/50 text-[10px] text-amber-950 font-medium">
                          ✨ 1. Định vị thương hiệu: &apos;Đồng hành Tăng Trưởng Bền Vững&apos;
                        </div>
                      )}
                      {activeBlueprintLayer >= 2 && (
                        <div className="p-1.5 rounded bg-blue-50 border border-blue-200/50 text-[9px] text-blue-950 font-mono">
                          🔍 2. Sitemap SEO: Cấu trúc Silo /dich-vu/* đã tối ưu index
                        </div>
                      )}
                      {activeBlueprintLayer >= 3 && (
                        <div className="border border-indigo-300 border-dashed rounded p-1 text-[9px] text-indigo-950 bg-indigo-50/50">
                          📐 3. Wireframe: Luồng cuộn trang trực quan mượt mà
                        </div>
                      )}
                      {activeBlueprintLayer >= 4 && (
                        <div className="h-14 rounded-lg bg-[#FAF9F5] border border-amber-300/40 p-1 flex items-center justify-between shadow-xs">
                          <div className="space-y-1">
                            <div className="w-16 h-2 rounded bg-amber-200"></div>
                            <div className="w-24 h-1.5 rounded bg-gray-200"></div>
                          </div>
                          <span className="text-[10px] text-[#C5A880] font-serif font-bold">Premium UI</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {activeBlueprintLayer >= 5 && (
                        <p className="text-[9px] text-gray-600 font-medium leading-tight italic">
                          ✍️ 5. Copywriting: &apos;Bạn cần một website đẹp hơn hay website ra lead tốt hơn?&apos;
                        </p>
                      )}
                      {activeBlueprintLayer >= 6 && (
                        <div className="w-full py-1.5 rounded bg-amber-500 text-[#1C1C1C] font-bold text-center text-[10px] shadow-sm animate-bounce">
                          🎯 6. CTA Nóng: &apos;Nhận Tư Vấn Miễn Phí&apos;
                        </div>
                      )}
                      {activeBlueprintLayer >= 7 && (
                        <div className="flex items-center justify-between text-[8px] bg-emerald-50 text-emerald-800 p-1 rounded font-mono border border-emerald-200/30">
                          <span>⚡ 7. Technical SEO: JSON-LD Schema OK</span>
                          <span className="font-bold">Google PageSpeed: 100</span>
                        </div>
                      )}
                      {activeBlueprintLayer >= 8 && (
                        <div className="flex items-center gap-1.5 bg-purple-50 text-purple-950 p-1 rounded text-[8px] font-mono animate-pulse">
                          <Activity className="w-3 h-3 text-purple-600" />
                          <span>📊 8. Tracking: GA4 Real-time Event Listener Active (Click Hotline, Form Sent)</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Toggle Controls */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((layerNum) => (
                      <button
                        key={layerNum}
                        onClick={() => {
                          setActiveBlueprintLayer(layerNum);
                          triggerTrackingLog("blueprint_layer_toggle", `Xem lớp mô phỏng số: ${layerNum}`);
                        }}
                        className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                          activeBlueprintLayer >= layerNum 
                            ? 'bg-amber-100 text-amber-900 border-amber-300 border' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                        }`}
                      >
                        Lớp {layerNum}
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => {
                        setActiveBlueprintLayer(8);
                        triggerTrackingLog("blueprint_activate_all", "Kích hoạt đầy đủ 8 lớp Blueprint");
                      }}
                      className="text-xs text-[#C5A880] font-bold underline hover:text-amber-800"
                    >
                      Kích hoạt đầy đủ 8 lớp cùng lúc
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THIẾT KẾ WEBSITE LÀ GÌ */}
      <section id="definition" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Tư Duy Khác Biệt</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Thiết kế Website thực sự là gì?</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600 leading-relaxed">
              Website không chỉ đơn thuần là bộ mặt trực tuyến hay một tấm danh thiếp tĩnh. Một website thực thụ là <strong className="text-[#1C1C1C]">hệ thống hạ tầng kinh doanh số</strong> đa tầng, nơi kết nối giữa giá trị thương hiệu và nhu cầu thực tiễn của khách hàng mục tiêu để tạo ra giá trị thặng dư bền vững.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Code className="w-6 h-6 text-amber-700" />, title: "Cấu trúc & Luồng đi", text: "Thiết lập khung sườn khoa học giúp điều hướng khách hàng tự nhiên từ nhận biết đến quyết định hành động." },
              { icon: <FileText className="w-6 h-6 text-amber-700" />, title: "Nội dung chuẩn phễu", text: "Biên tập từng con chữ đánh trúng nỗi đau, phơi bày năng lực thực thi và đưa ra giải pháp giải quyết dứt điểm." },
              { icon: <Monitor className="w-6 h-6 text-amber-700" />, title: "Trải nghiệm UX/UI", text: "Giao diện tinh tế chuẩn Light Premium sang trọng, tối ưu điểm chạm vuốt và phản hồi nhanh chóng." },
              { icon: <Activity className="w-6 h-6 text-amber-700" />, title: "Tốc độ & Kỹ thuật", text: "Tốc độ tải trang dưới 1.5 giây, mã nguồn sạch hoàn toàn giúp bảo mật vững vàng và thăng hạng từ khóa." }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-[#FAF9F5] border border-gray-200/80 rounded-2xl hover:border-[#C5A880]/50 transition-all shadow-xs hover:shadow-md">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg text-[#1C1C1C] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: WEBSITE DOANH NGHIỆP CẦN TRẢ LỜI ĐIỀU GÌ */}
      <section id="critical-questions" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Triết lý Thiết Kế</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">6 câu hỏi cốt tử website doanh nghiệp phải trả lời</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Nếu truy cập vào website của bạn mà khách hàng không tìm thấy câu trả lời cho những câu hỏi sau trong 5 giây đầu tiên, bạn đang trực tiếp dâng tặng khách hàng cho đối thủ cạnh tranh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {MOCK_QUESTIONS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveQuestion(index);
                    triggerTrackingLog("question_explore", `Khám phá câu hỏi: ${item.q}`);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeQuestion === index 
                      ? 'bg-white border-[#C5A880] shadow-sm text-amber-900 font-medium' 
                      : 'bg-[#FAF9F5] border-gray-200 text-gray-700 hover:bg-white'
                  }`}
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeQuestion === index ? 'rotate-90 text-[#C5A880]' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Right Tab Content Viewer */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-md min-h-[250px] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest block mb-4">Phân tích chi tiết câu hỏi</span>
                <h3 className="text-xl font-serif font-bold text-[#1C1C1C] mb-6">
                  {MOCK_QUESTIONS[activeQuestion].q}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200/50">
                    <span className="text-xs font-bold text-red-700 block mb-2 uppercase tracking-wider">Hậu quả nếu thiếu</span>
                    <p className="text-sm text-red-950 leading-relaxed">{MOCK_QUESTIONS[activeQuestion].consequence}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                    <span className="text-xs font-bold text-amber-800 block mb-2 uppercase tracking-wider">PGS giải quyết thế nào</span>
                    <p className="text-sm text-amber-950 leading-relaxed">{MOCK_QUESTIONS[activeQuestion].solution}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-center text-xs text-gray-500">
                <span>PGS Agency - Tư vấn tăng trưởng số toàn diện</span>
                <a href="#contact" className="text-[#C5A880] font-bold flex items-center gap-1 hover:underline">
                  Nhận tư vấn ngay <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: VÌ SAO WEBSITE ĐẸP THÔI CHƯA ĐỦ */}
      <section id="pain-points" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-red-600 uppercase mb-3">Cảnh báo doanh nghiệp</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Vì sao thiết kế website đẹp thôi là chưa đủ?</p>
            <div className="w-12 h-0.5 bg-red-500 mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Một trang web rực rỡ với các hiệu ứng bay nhảy phức tạp nhưng tải chậm, không tích hợp đo lường, không tối ưu cho thiết bị di động chỉ là một tác phẩm nghệ thuật đắt đỏ - không phải là một công cụ kinh doanh sinh lời.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PAIN_POINTS.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#FAF9F5] border border-gray-200 hover:border-red-300/60 transition-all shadow-xs flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-mono text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded">Conversion Killer</span>
                  </div>
                  <h3 className="font-semibold text-lg text-[#1C1C1C] mb-2 group-hover:text-red-900 transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 mt-2">
                  <div className="text-xs text-red-700 font-semibold">
                    ⚠️ {item.bad}
                  </div>
                  <div className="text-xs text-emerald-800 font-medium bg-emerald-50 p-2 rounded">
                    ✅ PGS sửa: {item.solve}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: WEBSITE TĂNG TRƯỞNG KHÁC WEBSITE GIỚI THIỆU */}
      <section id="comparison" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Bảng So Sánh Trực Quan</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Website Tăng Trưởng PGS khác biệt thế nào?</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200/80 shadow-md">
            <table className="w-full text-left border-collapse bg-white min-w-[700px]">
              <thead>
                <tr className="bg-gray-100 text-gray-800 text-sm font-semibold border-b border-gray-200">
                  <th className="p-5 w-1/4">Tiêu chí so sánh</th>
                  <th className="p-5 w-3/8 text-gray-500 font-medium">Website Giới Thiệu Thông Thường</th>
                  <th className="p-5 w-3/8 text-amber-800 font-semibold bg-amber-500/10">Website Tăng Trưởng PGS Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {MOCK_COMPARISON.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FCFAF6] transition-colors">
                    <td className="p-5 font-semibold text-gray-700">{item.criteria}</td>
                    <td className="p-5 text-gray-500 leading-relaxed">{item.normal}</td>
                    <td className="p-5 text-amber-950 font-medium bg-amber-500/[0.02] leading-relaxed border-l-2 border-[#C5A880]/30">
                      ✨ {item.pgs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* SECTION 6: 8 LỚP THIẾT KẾ WEBSITE PGS */}
      <section id="layers" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Kiến Trúc Đa Tầng</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">8 lớp thiết lập hệ thống Website của PGS</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Nhấn vào từng lớp bên dưới để tìm hiểu cách chúng tôi đồng bộ hóa chiến lược thương hiệu, mã nguồn tối ưu và dữ liệu chuyển đổi vào một sản phẩm hoàn chỉnh duy nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Layers Left Stack Render */}
            <div className="lg:col-span-6 space-y-3">
              {MOCK_LAYERS.map((layer, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setActiveLayerSection(index);
                    triggerTrackingLog("layer_section_view", `Xem chi tiết lớp thiết kế: ${layer.title}`);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeLayerSection === index 
                      ? 'bg-amber-50 border-[#C5A880] translate-x-2' 
                      : 'bg-[#FAF9F5] border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-sm sm:text-base ${activeLayerSection === index ? 'text-amber-950' : 'text-gray-700'}`}>
                      {layer.title}
                    </h3>
                    <span className={`w-2.5 h-2.5 rounded-full ${activeLayerSection === index ? 'bg-amber-500 animate-ping' : 'bg-gray-300'}`}></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Layers Right Details */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FCFAF6] to-[#FAF9F5] p-8 rounded-2xl border border-gray-200/80 shadow-inner">
              <div className="space-y-6">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest block">Thông tin chi tiết lớp kỹ thuật</span>
                <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-amber-800 text-lg font-bold">
                  {activeLayerSection + 1}
                </div>
                <h4 className="text-2xl font-serif font-bold text-[#1C1C1C]">
                  {MOCK_LAYERS[activeLayerSection].title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-base">
                  {MOCK_LAYERS[activeLayerSection].desc}
                </p>
                <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-2">
                  <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">Mục tiêu bàn giao:</div>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc pl-4">
                    <li>Đảm bảo chuẩn kỹ thuật không sai lệch thiết kế</li>
                    <li>Nghiệm thu trực tiếp từng mốc bàn giao dự án</li>
                    <li>Tích hợp tự động dữ liệu vào báo cáo thời gian thực</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CẤU TRÚC TRANG CHỦ CHUẨN PGS */}
      <section id="homepage-structure" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Cấu Trúc Hoàn Hảo</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Khung sườn cấu trúc trang chủ tiêu chuẩn</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Rà chuột hoặc chạm vào các cấu trúc bên dưới để tìm hiểu vai trò của từng phân khúc nội dung trên trang chủ PGS thiết kế.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Wireframe simulated visual column */}
            <div className="lg:col-span-5 bg-gray-900 text-gray-400 p-6 rounded-2xl shadow-xl space-y-3 font-mono text-xs flex flex-col justify-between max-h-[500px] overflow-y-auto">
              <div className="border-b border-gray-800 pb-3 mb-2 text-center text-[10px] text-gray-500 uppercase tracking-widest">
                Interactive Wireframe Navigator
              </div>
              
              {MOCK_HOMEPAGE_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  onMouseEnter={() => setHoveredHomepageSection(sec.id)}
                  onClick={() => setHoveredHomepageSection(sec.id)}
                  className={`p-2.5 rounded border transition-all cursor-pointer ${
                    hoveredHomepageSection === sec.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 translate-x-1.5'
                      : 'bg-gray-950 border-gray-800 hover:border-gray-700 text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span>&lt;section id=&quot;{sec.id}&quot;&gt;</span>
                    {hoveredHomepageSection === sec.id && <span className="text-[9px] bg-amber-500 text-[#1C1C1C] px-1.5 rounded uppercase font-bold font-sans">Active</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Description column */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-gray-200/80 p-8 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest block mb-4">Mô tả thành phần cấu trúc</span>
                <h3 className="text-2xl font-serif font-bold text-[#1C1C1C] mb-4">
                  {MOCK_HOMEPAGE_SECTIONS.find(s => s.id === hoveredHomepageSection)?.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {MOCK_HOMEPAGE_SECTIONS.find(s => s.id === hoveredHomepageSection)?.desc}
                </p>

                <div className="mt-8 p-4 bg-white rounded-xl border border-gray-100 space-y-3">
                  <span className="text-xs font-semibold text-gray-500 block uppercase">Lợi ích CRO thiết thực:</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mỗi khối nội dung được tính toán dựa trên mức độ chú ý và nhiệt lượng cuộn trang (scroll heat-map) trung bình của người dùng, giúp hạn chế tỷ lệ bỏ trang giữa chừng và khơi gợi ham muốn tìm hiểu.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between items-center text-xs text-gray-500">
                <span>Rà chuột lên danh sách để xem từng khối</span>
                <span className="font-semibold text-amber-700">PGS Growth Engine</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: CÁC LOẠI WEBSITE PGS THIẾT KẾ */}
      <section id="website-types" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Sản Phẩm Độc Bản</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Các phân loại website doanh nghiệp cần sở hữu</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MOCK_WEB_TYPES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveWebTypeTab(tab.id);
                  triggerTrackingLog("web_type_tab_change", `Xem phân loại web: ${tab.name}`);
                }}
                className={`px-5 py-3 rounded-full text-xs font-semibold transition-all ${
                  activeWebTypeTab === tab.id
                    ? 'bg-[#C5A880] text-white shadow-md'
                    : 'bg-[#FAF9F5] text-gray-600 hover:bg-gray-100 border border-gray-200/50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="bg-[#FAF9F5] border border-gray-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded text-xs font-bold uppercase">
                  KPI Mục tiêu: {MOCK_WEB_TYPES.find(t => t.id === activeWebTypeTab)?.kpi}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1C1C1C]">
                  {MOCK_WEB_TYPES.find(t => t.id === activeWebTypeTab)?.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {MOCK_WEB_TYPES.find(t => t.id === activeWebTypeTab)?.desc}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Tính năng chủ chốt tích hợp:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MOCK_WEB_TYPES.find(t => t.id === activeWebTypeTab)?.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs text-center space-y-4">
                  <Monitor className="w-10 h-10 text-amber-700 mx-auto" />
                  <div className="font-semibold text-[#1C1C1C] text-sm">Phong cách thiết kế đề xuất</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Phối cảnh Light Premium, giảm tối đa file hình ảnh nặng, tăng tốc độ phản hồi trên nền tảng Next.js standalone.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline">
                    Yêu cầu báo giá riêng <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: QUY TRÌNH THIẾT KẾ WEBSITE 12 BƯỚC */}
      <section id="process" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Lộ trình triển khai</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Quy trình thiết kế chuẩn hóa 12 bước của PGS</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          {/* Step Timeline Controls */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 mb-10 text-center">
            {MOCK_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  setActiveStepTimeline(s.step);
                  triggerTrackingLog("process_step_view", `Xem bước quy trình: Bước ${s.step}`);
                }}
                className={`py-3 rounded-lg text-xs font-bold transition-all border ${
                  activeStepTimeline === s.step
                    ? 'bg-[#C5A880] text-white border-[#C5A880] shadow-sm scale-105'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                B{s.step}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-xl">
                  {activeStepTimeline}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1C1C1C]">
                  {MOCK_STEPS[activeStepTimeline - 1].title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {MOCK_STEPS[activeStepTimeline - 1].desc}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF9F5] border border-gray-100 text-xs text-gray-500 space-y-1 w-full md:w-64">
                <span className="font-bold text-[#1C1C1C] block mb-2 uppercase tracking-wider">Nghiệm thu bước:</span>
                <div>• Khách hàng ký duyệt tiến độ</div>
                <div>• Nhận file phân tích đi kèm</div>
                <div>• PGS chuyển bước kỹ thuật tiếp theo</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: UI/MOTION ĐỀ XUẤT CHO WEBSITE KHÁCH */}
      <section id="motion-preview" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Premium Motion System</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Hiệu ứng & Trải nghiệm thị giác khuyên dùng</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Scroll Reveal (Hiện theo cuộn)", desc: "Nội dung, tiêu đề chuyển động mượt mà từ dưới lên khi người dùng cuộn đến giúp kích thích nhãn quan và tăng độ tập trung." },
              { title: "Card Hover Tilt 3D", desc: "Các hộp nội dung nghiêng nhẹ theo gia tốc chuột, tạo độ sâu ảo diệu và mang tính tương tác vật lý cao cấp." },
              { title: "Counter Up (Đếm số tự động)", desc: "Số liệu năm kinh nghiệm, dự án tự nhảy mốc tăng trưởng từ 0, mang tính trực quan sinh động tối đa." },
              { title: "Accordion FAQ mượt mà", desc: "Các câu hỏi đáp bung mở êm ái bằng thư viện motion, không gây giật lag trải nghiệm người dùng." },
              { title: "Before/After Image Slider", desc: "Thanh trượt so sánh sự biến đổi trực tiếp trước và sau khi sử dụng giải pháp, thúc đẩy niềm tin chuyển đổi tức thì." },
              { title: "Sticky CTA trên Mobile", desc: "Thanh menu thu nhỏ gắn dưới cùng màn hình điện thoại, giúp nút liên hệ, zalo luôn trong tầm bấm ngón tay." }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF9F5] border border-gray-200 hover:border-amber-400 transition-all shadow-xs group">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-sm mb-4 group-hover:bg-amber-500 group-hover:text-[#1C1C1C] transition-all">
                  0{idx + 1}
                </div>
                <h3 className="font-semibold text-base text-[#1C1C1C] mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: SEO TECHNICAL NỀN TẢNG */}
      <section id="seo-technical" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* SEO Left Info & Interactive Score meter */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase">SEO Specialist Standard</h2>
              <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Hạ tầng chuẩn SEO Technical từ trong lõi code</p>
              <div className="w-12 h-0.5 bg-[#C5A880] mb-6"></div>
              <p className="text-[#1C1C1C] text-sm sm:text-base leading-relaxed">
                Chúng tôi cấu trúc mã nguồn tối ưu chuẩn Schema thế hệ mới, loại bỏ hoàn toàn các lỗi xung đột heading, chuẩn hóa URL và nén ảnh nhe tự động.
              </p>

              {/* Dynamic Interactive Score Ring */}
              <div className="p-6 bg-white border border-gray-200 rounded-2xl text-center space-y-4">
                <div className="text-xs font-semibold text-gray-500 uppercase">Điểm SEO Technical Mô Phỏng</div>
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#C5A880]/30 relative">
                  <div className="text-3xl font-bold text-[#1C1C1C]">{seoScore}%</div>
                  {seoScore >= 90 && <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full text-[8px] font-bold">EXCELLENT</span>}
                </div>
                <p className="text-xs text-gray-500">
                  Tích chọn các hạng mục checklist bên phải để kiểm nghiệm điểm tối ưu hóa SEO của PGS Agency.
                </p>
              </div>
            </div>

            {/* SEO Right Interactive Checklist */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-2">Checklist SEO Technical của PGS:</span>
              
              {MOCK_SEO_CHECKLIST.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    const nextStates = [...seoChecklistStates];
                    nextStates[index] = !nextStates[index];
                    setSeoChecklistStates(nextStates);
                    triggerTrackingLog("seo_checklist_toggle", `Chọn checklist SEO: ${item.label} (${nextStates[index] ? "Bật" : "Tắt"})`);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    seoChecklistStates[index] 
                      ? 'bg-amber-50/50 border-[#C5A880] shadow-xs' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-all ${
                    seoChecklistStates[index] 
                      ? 'bg-[#C5A880] border-[#C5A880] text-white' 
                      : 'border-gray-300 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#1C1C1C]">{item.label}</h4>
                    <p className="text-[11px] text-gray-500 leading-tight mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 12: TRACKING & CRO EVENT SIMULATOR */}
      <section id="tracking-analytics" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Tối Ưu Chuyển Đổi Thực Tế</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Cơ chế Tracking Đo Lường & Tối Ưu CRO</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Hãy bấm vào các nút hành động mô phỏng dưới đây để xem hệ thống ghi nhận sự kiện (GTM Event) thời gian thực hiển thị lập tức trên bảng điều khiển đo lường GA4 giả lập của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Simulator Interactive triggers */}
            <div className="lg:col-span-5 bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest block mb-4">Trình Mô Phỏng Hành Vi Khách</span>
                <p className="text-xs text-gray-500 mb-6">
                  Thử tương tác bằng cách click vào các mốc nút chạm phổ biến bên dưới:
                </p>

                <div className="space-y-3">
                  <button 
                    onClick={() => triggerTrackingLog("click_hotline", "Khách hàng bấm gọi Hotline tư vấn")}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-left text-xs font-semibold text-gray-800 flex items-center justify-between"
                  >
                    <span>📞 Bấm Gọi Hotline tư vấn</span>
                    <span className="text-[10px] text-gray-400 font-mono">click_hotline</span>
                  </button>

                  <button 
                    onClick={() => triggerTrackingLog("click_zalo", "Khách hàng bấm chat Zalo với chuyên viên")}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-left text-xs font-semibold text-gray-800 flex items-center justify-between"
                  >
                    <span>💬 Bấm Chat Zalo nhanh</span>
                    <span className="text-[10px] text-gray-400 font-mono">click_zalo</span>
                  </button>

                  <button 
                    onClick={() => triggerTrackingLog("scroll_depth_75", "Khách hàng cuộn trang đạt 75% độ sâu")}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-left text-xs font-semibold text-gray-800 flex items-center justify-between"
                  >
                    <span>📜 Cuộn trang đạt 75% nội dung</span>
                    <span className="text-[10px] text-gray-400 font-mono">scroll_depth_75</span>
                  </button>

                  <button 
                    onClick={() => triggerTrackingLog("download_brochure", "Khách hàng tải xuống bộ báo cáo năng lực PDF")}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-left text-xs font-semibold text-gray-800 flex items-center justify-between"
                  >
                    <span>📥 Tải hồ sơ năng lực (Brochure)</span>
                    <span className="text-[10px] text-gray-400 font-mono">download_brochure</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-6 mt-6 border-t border-gray-200">
                Sử dụng GA4 & Google Tag Manager chuyên sâu để tối ưu hóa ngân sách tiếp thị số.
              </div>
            </div>

            {/* Simulated GA4 Log Terminal */}
            <div className="lg:col-span-7 bg-gray-950 text-emerald-400 p-6 rounded-2xl font-mono text-xs flex flex-col justify-between max-h-[380px]">
              <div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">GA4 Real-time Event Monitor</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Listening port: 3000</span>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin">
                  <AnimatePresence initial={false}>
                    {trackingLogs.map((log) => (
                      <motion.div 
                        key={log.id} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="p-1.5 rounded bg-gray-900 border border-gray-800 text-[10px] leading-tight space-y-1"
                      >
                        <div className="flex items-center justify-between text-gray-400">
                          <span>[EVENT]: <strong className="text-amber-300 font-semibold">{log.event}</strong></span>
                          <span>{log.time}</span>
                        </div>
                        <div className="text-emerald-300 font-bold">&gt; {log.label}</div>
                        <div className="text-[9px] text-gray-500">Nguồn khách: {log.source}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="text-center text-[10px] text-gray-600 pt-3 border-t border-gray-900">
                Nhấp chuột vào panel bên trái để bắn sự kiện giả lập thời gian thực.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 13: DỰ ÁN THỰC TẾ THIẾT KẾ WEBSITE (Before/After Slider) */}
      <section id="case-studies" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Thành Quả Chứng Thực</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Dự án thực tế tiêu biểu & Hiệu năng</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Before/After interactive slider */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                Vuốt/Kéo thanh trượt để so sánh Giao Diện cũ vs mới
              </div>
              
              <div 
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-300 cursor-ew-resize select-none"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseUp}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onTouchMove={onTouchMove}
              >
                {/* AFTER: New design (On top, reveals based on sliderPos) */}
                <div className="absolute inset-0 bg-[#FAF9F5] p-6 flex flex-col justify-between border-2 border-[#C5A880] select-none z-10 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">SAU KHI PGS AGENCY THIẾT KẾ</span>
                    <h4 className="text-lg font-serif font-bold text-[#1C1C1C] mt-2">Nội Thất Thượng Lưu Premium</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">Giao diện sáng rực, nén ảnh thông minh, CTA nổi bật.</p>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-100 shadow-xs">
                    <span className="text-[10px] text-emerald-800 font-bold font-mono">✓ PageSpeed: 98/100</span>
                    <span className="text-[10px] text-[#C5A880] font-bold font-sans">✓ Lead Rate: +320%</span>
                  </div>
                </div>

                {/* BEFORE: Old design (Background, clipped) */}
                <div 
                  className="absolute inset-y-0 right-0 bg-gray-800 text-gray-400 p-6 flex flex-col justify-between select-none z-20 overflow-hidden"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="min-w-[400px]">
                    <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-700 px-2 py-0.5 rounded">GIAO DIỆN CŨ TẢI CHẬM</span>
                    <h4 className="text-lg font-serif font-bold text-white mt-2">Noi That Cu Loi Thoi...</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">Ảnh lỗi, font chữ bị lỗi co dãn, nút đặt hàng bị lỗi.</p>
                  </div>
                  <div className="min-w-[400px] flex justify-between items-center bg-gray-900 p-2.5 rounded-lg border border-gray-800 shadow-xs">
                    <span className="text-[10px] text-red-400 font-bold font-mono">✗ PageSpeed: 32/100</span>
                    <span className="text-[10px] text-gray-500 font-bold font-sans">✗ Lead Rate: Rất thấp</span>
                  </div>
                </div>

                {/* Vertical handle line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-[#C5A880] z-30 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C5A880] shadow-md border-2 border-white flex items-center justify-center text-[#1C1C1C]">
                    ↔
                  </div>
                </div>
              </div>
            </div>

            {/* Right Case study results */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest block">CASE STUDY CHIẾN THẮNG</span>
              <h3 className="text-3xl font-serif font-bold text-[#1C1C1C] leading-snug">
                Nâng cấp website nội thất xa xỉ đạt kỷ lục tạo lead mới
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Đối tác gặp tình trạng chạy ads ngân sách 80 triệu/tháng nhưng chỉ thu về 10 - 15 lead do website tải chậm, vỡ khung mobile. Sau khi PGS Agency tái cấu trúc toàn diện theo blueprint:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <div className="text-2xl font-bold text-amber-700">98/100</div>
                  <div className="text-xs text-gray-500 font-medium">Điểm PageSpeed Mobile</div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <div className="text-2xl font-bold text-emerald-600">x4.2 lần</div>
                  <div className="text-xs text-gray-500 font-medium">Tăng trưởng lead hàng tháng</div>
                </div>
              </div>

              <blockquote className="p-4 border-l-4 border-[#C5A880] bg-[#FAF9F5] text-xs text-gray-600 italic">
                “PGS Agency không chỉ bàn giao web đẹp, họ bàn giao cho tôi một kênh chuyển đổi số có dòng tiền chảy về thực chất. Chúng tôi đo được chính xác từng cuộc gọi đến từ Google Ads.” - Giám đốc vận hành.
              </blockquote>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 14: GÓI DỊCH VỤ */}
      <section id="packages" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Minh Bạch Báo Giá</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Báo giá các gói dịch vụ thiết kế tối ưu</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          {/* Pricing Cycle Controls */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <button
              onClick={() => {
                setPricingCycle('individual');
                triggerTrackingLog("pricing_toggle", "Xem báo giá lẻ thiết kế website");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                pricingCycle === 'individual' ? 'bg-[#1C1C1C] text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Báo Giá Thiết Kế Lẻ
            </button>
            <button
              onClick={() => {
                setPricingCycle('with-ads-seo');
                triggerTrackingLog("pricing_toggle", "Xem báo giá đi kèm dịch vụ Ads/SEO");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                pricingCycle === 'with-ads-seo' ? 'bg-[#C5A880] text-[#1C1C1C] shadow font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⚡ Kèm Chiến Dịch Ads/SEO (Giảm 20%)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MOCK_PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`p-6 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between relative shadow-xs hover:shadow-lg ${
                  pkg.isBest 
                    ? 'border-[#C5A880] bg-[#FCFAF6] lg:scale-105 z-10' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {pkg.isBest && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Bán Chạy Nhất
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#1C1C1C]">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 leading-snug mt-2 min-h-[40px]">{pkg.desc}</p>
                  </div>

                  <div className="py-4 border-y border-gray-100 space-y-1">
                    <span className="text-xs text-gray-400 font-medium block">Chi phí đầu tư chỉ:</span>
                    <div className="text-3xl font-bold text-amber-900 font-display">
                      {pricingCycle === 'with-ads-seo' ? pkg.priceAds : pkg.price}
                    </div>
                    {pricingCycle === 'with-ads-seo' && <span className="text-[10px] text-amber-700 block font-semibold animate-pulse">✓ Đã áp dụng giảm giá 20% khi kèm hợp đồng</span>}
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Hạng mục triển khai:</span>
                    <ul className="text-xs text-gray-600 space-y-2">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <a 
                    href="#contact" 
                    onClick={() => {
                      setLeadService(pkg.name);
                      triggerTrackingLog("pricing_select", `Khách đã chọn gói dịch vụ: ${pkg.name}`);
                    }}
                    className={`w-full py-3.5 rounded-full text-xs font-bold block text-center transition-all ${
                      pkg.isBest 
                        ? 'bg-[#C5A880] text-white hover:bg-[#B19266] shadow' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300/40'
                    }`}
                  >
                    Đăng Ký Tư Vấn Gói Này
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 15: FAQ MỞ RỘNG (Accordions) */}
      <section id="faq" className="py-20 bg-gradient-to-b from-[#FAF9F5] to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Hỏi Đáp Chi Tiết</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Giải đáp thắc mắc về dịch vụ thiết kế website</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="space-y-4">
            {MOCK_FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => {
                    setActiveFaq(activeFaq === index ? null : index);
                    triggerTrackingLog("faq_accordion_toggle", `Xem FAQ số: ${index + 1}`);
                  }}
                  className="w-full p-5 text-left font-semibold text-sm sm:text-base text-[#1C1C1C] flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-[#C5A880]' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="p-5 text-xs sm:text-sm text-gray-500 leading-relaxed bg-[#FAF9F5]/50">
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

      {/* SECTION 16: DỊCH VỤ LIÊN QUAN */}
      <section id="related-services" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">Hệ sinh thái marketing</h2>
            <p className="text-3xl font-serif font-semibold text-[#1C1C1C]">Các giải pháp marketing tổng thể đồng hành</p>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">
              Tại PGS Agency, chúng tôi xây dựng hệ thống tăng trưởng đồng bộ. Tận dụng website làm trung tâm để mở rộng chiến dịch đa nền tảng tối ưu chi phí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "SEO Tổng Thể Đa Kênh", desc: "Đưa hàng ngàn từ khóa ngành lên top Google an toàn, thu về dòng traffic tự nhiên chất lượng không tốn tiền ads." },
              { title: "Chạy Quảng Cáo Đa Nền Tảng", desc: "Tối ưu hóa chiến dịch Google Ads, Facebook Ads, TikTok Ads với chi phí trên mỗi lead cực thấp dựa trên dữ liệu chuẩn." },
              { title: "Landing Page Thiết Kế Độc Quyền", desc: "Xây dựng các trang landing page ngắn hạn, tập trung khuyến mãi phục vụ trực tiếp chiến dịch Ads bùng nổ doanh số." },
              { title: "Chăm Sóc & Tối Ưu Tốc Độ Web", desc: "Dịch vụ bảo trì kỹ thuật định kỳ, tối ưu hóa nội dung chuẩn SEO hàng tuần giúp giữ chân PageSpeed luôn xanh rờn." }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF9F5] border border-gray-100 hover:border-[#C5A880]/40 transition-all shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#1C1C1C]">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-200/50 mt-4">
                  <a href="#contact" className="text-xs text-[#C5A880] font-bold inline-flex items-center gap-1 hover:underline">
                    Tìm hiểu dịch vụ này <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SPECIAL AI BLUEPRINT GENERATOR WORKSPACE */}
      <section id="ai-generator" className="py-20 bg-gradient-to-br from-[#FCFAF6] to-[#FAF9F5] border-b border-gray-100 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C5A880]/30 shadow-xl space-y-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#C5A880] animate-pulse" />
                DÀNH RIÊNG CHO DOANH NGHIỆP TRẢI NGHIỆM
              </div>
              <h2 className="text-3xl font-serif font-semibold text-[#1C1C1C]">AI Tạo Bản Thiết Kế Website (Blueprint) Tức Thì</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Hãy cung cấp ngành nghề hoạt động của bạn. AI của PGS Agency (sử dụng Gemini 3.5 Flash) sẽ thiết lập toàn bộ sơ đồ Sitemap, CRO lead magnet, đề xuất UX/UI và cấu trúc tracking đo lường chuẩn hóa dành riêng cho bạn sau vài giây.
              </p>
            </div>

            <form onSubmit={generateAIBlueprint} className="space-y-4 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Ngành nghề kinh doanh của bạn *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ví dụ: Thiết kế nội thất biệt thự, Thẩm mỹ viện, Bất động sản..."
                    value={aiIndustry}
                    onChange={(e) => setAiIndustry(e.target.value)}
                    className="w-full px-4 h-12 rounded-xl bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Chi tiết thêm về mong muốn (nếu có)</label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Cần nhiều lead đặt lịch tư vấn, muốn phong cách tối giản..."
                    value={aiDetails}
                    onChange={(e) => setAiDetails(e.target.value)}
                    className="w-full px-4 h-12 rounded-xl bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-sm text-gray-800"
                  />
                </div>
              </div>

              {aiError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  ⚠️ {aiError}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isAiLoading}
                  className="px-8 py-3.5 rounded-full bg-[#1C1C1C] text-white font-bold text-xs hover:bg-[#C5A880] transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 disabled:opacity-55"
                >
                  {isAiLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Chuyên gia AI đang lập sơ đồ...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      Tự động xuất Blueprint tăng trưởng
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Generated Result Display */}
            {aiResult && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-6 sm:p-8 rounded-2xl bg-amber-500/[0.02] border border-[#C5A880]/40 space-y-6 max-h-[500px] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    <span className="font-serif font-bold text-lg text-[#1C1C1C]">PGS Growth Website Blueprint Đã Thiết Lập</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C5A880] bg-white border px-2.5 py-1 rounded">Mã số: PGS-AI-82541</span>
                </div>

                <div className="prose prose-sm max-w-none text-[#1C1C1C] leading-relaxed select-text">
                  <ReactMarkdown>{aiResult}</ReactMarkdown>
                </div>

                <div className="border-t border-gray-200 pt-6 text-center space-y-3">
                  <p className="text-xs text-gray-500">
                    Bạn có muốn PGS Agency hiện thực hóa bản thiết kế này thành trang web thực tế?
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#C5A880] text-white font-bold text-xs hover:bg-[#B19266]">
                    Yêu Cầu Hiện Thực Hóa Blueprint Này <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 17: CTA CUỐI TRANG & FORM ĐĂNG KÝ */}
      <section id="contact" className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="bg-[#FAF9F5] border border-gray-200/80 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">Cam Kết Đồng Hành</span>
              <h2 className="text-3xl font-serif font-semibold text-[#1C1C1C] leading-tight">
                Bạn cần một website đẹp hơn hay một website tạo lead tốt hơn?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Hãy để lại thông tin liên hệ. Chuyên viên tư vấn tăng trưởng từ PGS Agency sẽ liên hệ lại trực tiếp trong 15 phút làm việc để gửi phác thảo sitemap mẫu & tư vấn phương hướng hoàn toàn miễn phí.
              </p>
              
              <div className="space-y-2 border-t border-gray-200 pt-6">
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Hotline: 090 123 4567 (Tư vấn 24/7)</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>Email: contact@pgsagency.vn</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Địa chỉ: Tòa nhà PGS Office, Quận 1, TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {isSubmitSuccess ? (
                <div className="bg-amber-100 border border-[#C5A880]/30 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto animate-bounce" />
                  <h3 className="font-serif font-bold text-lg text-[#1C1C1C]">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Chuyên viên của PGS Agency đã tiếp nhận thông tin và sẽ liên hệ trực tiếp cho bạn trong vòng tối đa 15 phút làm việc. Xin chân thành cảm ơn!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-[#1C1C1C] border-b border-gray-100 pb-3 mb-2">
                    Điền Form Đăng Ký Tư Vấn Miễn Phí
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Họ và tên của bạn *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 h-10 rounded-lg bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-xs text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Số điện thoại liên hệ *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ví dụ: 0901234567"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3 h-10 rounded-lg bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-xs text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Email nhận tài liệu mẫu</label>
                    <input 
                      type="email" 
                      placeholder="Ví dụ: email@doanhnghiep.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3 h-10 rounded-lg bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-xs text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Gói dịch vụ quan tâm</label>
                    <select 
                      value={leadService}
                      onChange={(e) => setLeadService(e.target.value)}
                      className="w-full px-3 h-10 rounded-lg bg-[#FAF9F5] border border-gray-300 focus:outline-hidden focus:border-[#C5A880] text-xs text-gray-800"
                    >
                      <option value="Website Foundation">Website Foundation (Bệ phóng doanh nghiệp)</option>
                      <option value="Website Growth">Website Growth (Tối ưu chuyển đổi Ads & SEO)</option>
                      <option value="Website Premium SEO-ready">Website Premium SEO-ready (Thống trị từ khóa)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#C5A880] text-white font-bold text-xs hover:bg-[#B19266] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C5A880]/10"
                  >
                    Gửi Đăng Ký - Nhận Tư Vấn Trực Tiếp
                  </button>

                  <div className="text-center text-[9px] text-gray-400">
                    Bằng việc bấm nút, bạn đồng ý bảo mật dữ liệu khách hàng của PGS.
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* SEO/EEAT & CHECKLIST COMPREHENSIVE CONTROL PANEL PANEL (Toggleable Reviewer Utility) */}
      

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-gray-200 p-3 z-50 flex items-center justify-between shadow-lg">
        <div className="text-left">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">PGS Agency</div>
          <a href="tel:0901234567" className="text-xs font-bold text-amber-800 block">📞 090 123 4567</a>
        </div>
        <a href="#contact" className="px-5 py-2.5 rounded-full bg-[#C5A880] text-white font-bold text-xs shadow-md">
          Nhận Tư Vấn Website
        </a>
      </div>

    </div>
  );
}
