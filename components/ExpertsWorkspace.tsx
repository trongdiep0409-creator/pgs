'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Target, LineChart, Search, Code, PenTool, Share2, 
  Database, UserCheck, ShieldCheck, Layers, Settings, Check, 
  ArrowRight, ChevronRight, Sparkles, Clock, ChevronDown, 
  Building, Award, FileText, CheckCircle, TrendingUp, BarChart2, 
  Briefcase, MessageSquare, Copy, ExternalLink, RefreshCw, Eye, FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// CORE DATA FOR PGS AGENCY EXPERTS TEAM
// ==========================================

const ROLE_CARDS = [
  {
    id: 'strategy',
    title: 'Strategy Lead',
    short: 'Kiến trúc sư hệ thống tăng trưởng, hoạch định phân bổ ngân sách.',
    desc: 'Định hình chiến lược tổng thể, nghiên cứu đối thủ, phân bổ ngân sách tối ưu và thiết lập KPI cho toàn chiến dịch.',
    output: 'Bản đồ chiến lược Marketing tổng thể (Growth Map) & Dashboard báo cáo tích hợp.',
    kpi: 'ROI (Tỷ suất lợi nhuận), Cost Per Lead (CPL) mục tiêu, Số lượng Lead chất lượng.',
    icon: Target,
    color: 'border-amber-400 bg-amber-50/50 text-amber-700'
  },
  {
    id: 'seo',
    title: 'SEO Specialist',
    short: 'Xây dựng phễu lưu lượng tự nhiên bền vững thông qua Google.',
    desc: 'Nghiên cứu từ khóa phễu mua hàng, tối ưu SEO Onpage/Technical, xây dựng cấu trúc content silo và tối ưu thực thể thương hiệu.',
    output: 'Kế hoạch SEO tổng thể, Sơ đồ cấu trúc Silo website, Bản đồ từ khóa 1000+ cụm từ.',
    kpi: 'Organic Traffic (Lượng truy cập tự nhiên), Vị trí từ khóa (Top 3/10/30), Lead từ SEO.',
    icon: Search,
    color: 'border-blue-400 bg-blue-50/50 text-blue-700'
  },
  {
    id: 'uxui',
    title: 'UX/UI Designer',
    short: 'Kiến tạo trải nghiệm thị giác cao cấp, tối ưu hóa tỷ lệ chuyển đổi.',
    desc: 'Thiết kế giao diện theo phong cách Premium Light Consulting, tối ưu hóa điểm chạm người dùng, sắp xếp bố cục tăng tỷ lệ click (CTR).',
    output: 'Bản vẽ Wireframe, thiết kế giao diện Figma độ phân giải cao, hệ thống Design System.',
    kpi: 'Time on Page, Conversion Rate (CR) của Landing Page, Tỷ lệ thoát trang (Bounce Rate).',
    icon: Layers,
    color: 'border-purple-400 bg-purple-50/50 text-purple-700'
  },
  {
    id: 'ads',
    title: 'Ads Specialist (Google/FB/TikTok)',
    short: 'Đội ngũ đấu thầu & khai thác quảng cáo đa nền tảng tối ưu chi phí.',
    desc: 'Cấu trúc tài khoản quảng cáo, phân nhóm đối tượng mục tiêu, tối ưu hóa giá thầu tự động và triển khai phễu remarketing.',
    output: 'Sơ đồ phễu quảng cáo, kế hoạch phân bổ ngân sách tuần/tháng, báo cáo hiệu quả kỹ thuật.',
    kpi: 'CPA/CPL (Chi phí mỗi chuyển đổi), ROAS (Tỷ suất doanh thu trên chi phí QC), Reach.',
    icon: LineChart,
    color: 'border-emerald-400 bg-emerald-50/50 text-emerald-700'
  },
  {
    id: 'content',
    title: 'Content Strategist',
    short: 'Sản xuất nội dung chuẩn EEAT, dẫn dắt tâm lý người đọc.',
    desc: 'Lên chiến lược nội dung phễu nhận thức, viết nội dung chuẩn SEO kết hợp kỹ thuật thôi miên câu chữ tăng chuyển đổi (CRO).',
    output: 'Content Calendar chi tiết, Kịch bản video ngắn, Bài viết blog chuẩn SEO chuyên sâu.',
    kpi: 'Tỷ lệ đọc hết bài, Tỷ lệ nhấp CTA, Điểm chuẩn SEO Content & EEAT.',
    icon: PenTool,
    color: 'border-rose-400 bg-rose-50/50 text-rose-700'
  },
  {
    id: 'social',
    title: 'Social Executive',
    short: 'Phát triển cộng đồng thương hiệu, tăng độ phủ và lan tỏa.',
    desc: 'Quản trị các kênh Fanpage, TikTok, Group cộng đồng; thiết kế ấn phẩm truyền thông sáng tạo phù hợp với nhận diện thương hiệu.',
    output: 'Ấn phẩm thiết kế social, bộ feed định dạng thương hiệu, báo cáo chỉ số tương tác.',
    kpi: 'Engagement Rate (Tỷ lệ tương tác), Lượt xem video, Lượt tin nhắn tự nhiên.',
    icon: Share2,
    color: 'border-indigo-400 bg-indigo-50/50 text-indigo-700'
  },
  {
    id: 'tracking',
    title: 'Tracking & Data Analyst',
    short: 'Thiết lập hệ thống đo lường dữ liệu chuẩn xác, loại bỏ điểm mù.',
    desc: 'Cài đặt Google Tag Manager, GA4, Pixel quảng cáo; cấu trúc phễu đo lường hành vi, loại bỏ sai sót số liệu để tối ưu ngân sách.',
    output: 'Sơ đồ luồng tracking (Measurement Plan), Dashboard đo lường chuyển đổi Real-time.',
    kpi: 'Độ khớp dữ liệu giữa các nền tảng >95%, Không lỗi tracking phễu chuyển đổi.',
    icon: Database,
    color: 'border-cyan-400 bg-cyan-50/50 text-cyan-700'
  },
  {
    id: 'cro',
    title: 'CRO Expert',
    short: 'Liên tục thực nghiệm A/B Testing để gia tăng đơn hàng từ lượng truy cập.',
    desc: 'Phân tích bản đồ nhiệt (Heatmap), phân tích biểu mẫu đăng ký, thực nghiệm thay đổi tiêu đề/màu sắc nút bấm để tối ưu chuyển đổi.',
    output: 'Bản phân tích rào cản chuyển đổi, Kế hoạch thử nghiệm A/B Testing và kết quả thực nghiệm.',
    kpi: 'Tăng trưởng tỷ lệ chuyển đổi trung bình %, Tỷ lệ hoàn thành biểu mẫu (Form Fill Rate).',
    icon: Sparkles,
    color: 'border-teal-400 bg-teal-50/50 text-teal-700'
  },
  {
    id: 'account',
    title: 'Account Manager',
    short: 'Cầu nối liên lạc tin cậy, quản lý tiến độ và báo cáo minh bạch.',
    desc: 'Quản trị rủi ro dự án, điều phối công việc giữa PGS và khách hàng, tổ chức các buổi báo cáo tuần/tháng minh bạch số liệu.',
    output: 'Biên bản làm việc, báo cáo tiến độ tuần/tháng, bảng đánh giá sức khỏe dự án (Project Health).',
    kpi: 'NPS (Chỉ số hài lòng khách hàng), Đúng hạn bàn giao (SLA), Tốc độ phản hồi yêu cầu (<15 phút).',
    icon: UserCheck,
    color: 'border-orange-400 bg-orange-50/50 text-orange-700'
  }
];

const COLLABORATION_FLOW = [
  {
    step: '01',
    phase: 'Strategy Development',
    expert: 'Strategy Lead',
    action: 'Nghiên cứu thị trường sâu rộng, thiết lập KPI và bản thiết kế tăng trưởng (Growth Map).',
    receives: 'Yêu cầu & Dữ liệu lịch sử từ Khách hàng',
    delivers: 'Bản đồ chiến lược Marketing Tổng thể'
  },
  {
    step: '02',
    phase: 'UX/UI & CRO Mapping',
    expert: 'UX/UI & CRO Expert',
    action: 'Thiết kế khung sườn trải nghiệm (Wireframe) tối ưu bố cục phễu và tiêu điểm chuyển đổi dựa trên chiến lược.',
    receives: 'Chiến lược tăng trưởng & Chân dung khách hàng',
    delivers: 'Thiết kế Figma & Cấu trúc chuyển đổi trang'
  },
  {
    step: '03',
    phase: 'SEO & Technical Foundation',
    expert: 'SEO Specialist',
    action: 'Nghiên cứu từ khóa, thiết kế sơ đồ Silo, tối ưu technical chuẩn SEO ngay trong mã nguồn thiết kế.',
    receives: 'Thiết kế Wireframe từ UX/UI Team',
    delivers: 'Sơ đồ cấu trúc nội dung & Checklist tối ưu SEO Onpage'
  },
  {
    step: '04',
    phase: 'EEAT Content Creation',
    expert: 'Content Strategist',
    action: 'Sản xuất nội dung sâu sắc chuẩn chuyên gia, thu hút ý định tìm kiếm, lồng ghép thông điệp thương hiệu tinh tế.',
    receives: 'Bản đồ từ khóa SEO & Bản thiết kế UX/UI',
    delivers: 'Bộ nội dung hoàn thiện cho Website & Quảng cáo'
  },
  {
    step: '05',
    phase: 'Ads Launch & Social Amplification',
    expert: 'Ads & Social Specialist',
    action: 'Cấu trúc tài khoản quảng cáo đa kênh, thiết lập target, lên lịch phân phối nội dung cộng đồng để cộng hưởng độ phủ.',
    receives: 'Tài nguyên nội dung & Thiết kế đồ họa hoàn chỉnh',
    delivers: 'Hệ thống chiến dịch quảng cáo hoạt động đa nền tảng'
  },
  {
    step: '06',
    phase: 'Tracking Integration',
    expert: 'Tracking & Data Analyst',
    action: 'Cài đặt mã theo dõi hành vi, phễu GA4 và liên kết các kênh quảng cáo về Dashboard tổng hợp số liệu.',
    receives: 'Cấu trúc các trang đích & Phễu đăng ký nhận tin',
    delivers: 'Dashboard báo cáo tự động đa kênh Google Looker Studio'
  },
  {
    step: '07',
    phase: 'CRO A/B Testing & Optimization',
    expert: 'CRO Expert & Account Manager',
    action: 'Liên tục đọc dữ liệu bản đồ nhiệt, thực hiện A/B test tiêu đề, vị trí nút bấm và điều phối cải tiến hàng tuần.',
    receives: 'Báo cáo dữ liệu thực tế sau 15-30 ngày vận hành',
    delivers: 'Bản đề xuất tối ưu hóa chuyển đổi liên tục'
  }
];

const EXPERTS_PROFILE = [
  {
    name: 'Phạm Gia Sơn',
    role: 'Founder & Strategy Director',
    experience: '12+ năm kinh nghiệm',
    specialty: 'Hoạch định chiến lược Marketing tổng thể đa kênh, Tối ưu hóa mô hình tăng trưởng số (Growth Hacking) & Phân bổ ngân sách tối ưu cho doanh nghiệp vừa và lớn.',
    projects: 'Đã trực tiếp tư vấn chiến lược cho hơn 150+ doanh nghiệp trong các ngành Bất động sản, Tài chính, Giáo dục và TMĐT.',
    bio: 'Phạm Gia Sơn khởi đầu sự nghiệp từ các tập đoàn Marketing quốc tế trước khi thành lập PGS Agency với tôn chỉ "Đưa dữ liệu thực chứng vào lõi chiến lược". Ông tin rằng sự thịnh vượng của khách hàng là thước đo duy nhất cho năng lực của Agency.',
    avatar: 'https://picsum.photos/seed/son/400/400',
    articles: [
      { title: 'Chiến lược phân bổ ngân sách Marketing tổng thể năm 2026 cho doanh nghiệp SME', url: '#blog-ngansach' },
      { title: 'Tối ưu phễu chuyển đổi: Cách PGS tăng 140% số lượng lead chất lượng cao cho BĐS', url: '#blog-bds' }
    ]
  },
  {
    name: 'Nguyễn Minh Đức',
    role: 'Head of SEO Strategy',
    experience: '8+ năm kinh nghiệm',
    specialty: 'SEO Tổng thể (Silo Architecture), SEO Technical phức tạp, Khôi phục website bị phạt bởi thuật toán Google, Định hình thực thể thương hiệu (Entity SEO).',
    projects: 'Đưa 40+ dự án từ khóa khó thuộc ngành Tài chính, Y tế, Thẩm mỹ viện lên Top 3 công cụ tìm kiếm.',
    bio: 'Đức nổi tiếng với phương pháp SEO thực chiến bền vững, nói không với thủ thuật đen. Ông chú trọng tối ưu trải nghiệm người dùng cuối cùng và liên kết chặt chẽ SEO với mục tiêu kinh doanh của doanh nghiệp.',
    avatar: 'https://picsum.photos/seed/duc/400/400',
    articles: [
      { title: 'Cấu trúc Silo hiện đại: Giải pháp SEO bền vững vượt qua mọi bão thuật toán Google', url: '#blog-silo' },
      { title: 'Tối ưu hóa EEAT cho website dịch vụ: Bản hướng dẫn thực tế từ PGS', url: '#blog-eeat' }
    ]
  },
  {
    name: 'Lê Thùy Chi',
    role: 'UX/UI & CRO Design Lead',
    experience: '6+ năm kinh nghiệm',
    specialty: 'Thiết kế giao diện tối ưu hóa tỷ lệ chuyển đổi (CRO Design), Xây dựng hệ thống thiết kế đồng bộ (Design System), Tâm lý học màu sắc trong hành vi tiêu dùng.',
    projects: 'Thiết kế giao diện cho 80+ Landing Page/Website doanh nghiệp với tỷ lệ chuyển đổi trung bình đạt trên 5.8%.',
    bio: 'Theo đuổi triết lý "Thiết kế không chỉ để ngắm, thiết kế là để chuyển đổi", Thùy Chi kết hợp tư duy thẩm mỹ sang trọng với phân tích dữ liệu hành vi để loại bỏ tối đa rào cản trên hành trình mua hàng của người dùng.',
    avatar: 'https://picsum.photos/seed/chi/400/400',
    articles: [
      { title: 'Tâm lý học khoảng trắng: Sắp xếp bố cục Landing Page kích thích click chuyển đổi', url: '#blog-whitespace' },
      { title: 'Quy trình thiết kế giao diện chuẩn CRO tại PGS Agency', url: '#blog-crodesign' }
    ]
  },
  {
    name: 'Trần Hoàng Long',
    role: 'Head of Performance Ads',
    experience: '7+ năm kinh nghiệm',
    specialty: 'Tối ưu quảng cáo Google Ads Search/Shopping, Facebook Custom Audience Phễu 3 tầng, Thiết lập chiến lược đấu thầu thông minh Smart Bidding.',
    projects: 'Tối ưu hóa tài khoản quảng cáo với ngân sách tích lũy vượt 50 tỷ đồng, giảm trung bình 25% CPA cho khách hàng.',
    bio: 'Hoàng Long là chuyên gia quảng cáo định hướng số liệu. Mọi chiến dịch của ông đều được quản trị nghiêm ngặt thông qua dữ liệu chuyển đổi cuối cùng, liên tục thử nghiệm mẫu quảng cáo để tìm ra công thức sinh lời tốt nhất.',
    avatar: 'https://picsum.photos/seed/long/400/400',
    articles: [
      { title: 'Hướng dẫn thiết lập phễu quảng cáo Remarketing đa kênh không chồng chéo đối tượng', url: '#blog-adsfunnel' },
      { title: 'Làm sao để tránh lãng phí ngân sách Google Ads: 5 sai lầm phổ biến', url: '#blog-wasteads' }
    ]
  }
];

const BEHIND_SCENES = [
  {
    title: 'Họp chiến lược đa chuyên môn tuần',
    desc: 'Nơi Account, Strategy, SEO, Ads cùng ngồi lại thảo luận dữ liệu thực tế và điều chỉnh phân bổ nguồn lực tức thời.',
    image: 'https://picsum.photos/seed/meeting/600/400'
  },
  {
    title: 'Kiểm thử A/B Giao diện Landing Page',
    desc: 'Đội ngũ thiết kế UX/UI cùng CRO Expert phân tích bản đồ nhiệt (Hotjar) để cải tiến nút kêu gọi hành động.',
    image: 'https://picsum.photos/seed/uiux/600/400'
  },
  {
    title: 'Audit kỹ thuật SEO Technical hệ thống',
    desc: 'Chuyên gia SEO thực hiện rà soát chuyên sâu các lỗi Core Web Vitals, cấu trúc Schema và tốc độ phản hồi máy chủ.',
    image: 'https://picsum.photos/seed/seoaudit/600/400'
  },
  {
    title: 'Báo cáo minh bạch dữ liệu thực tế',
    desc: 'Hệ thống Dashboard đo lường tự động đồng bộ hóa kết quả từ GA4, CRM và quảng cáo hàng ngày.',
    image: 'https://picsum.photos/seed/dashboard/600/400'
  }
];

const CASE_COLLABORATION = {
  clientName: 'Doanh nghiệp X (Thương hiệu Giáo dục & Đào tạo trực tuyến)',
  challenge: 'Chi phí quảng cáo tăng cao gấp 2 lần, tỷ lệ đăng ký học thử giảm mạnh, website cũ tải chậm và không chuẩn SEO, thông điệp truyền thông rời rạc.',
  solution: 'Triển khai hệ thống Marketing tổng thể đồng bộ bởi đội ngũ PGS trong 90 ngày:',
  contributions: [
    { expert: 'Strategy Lead', input: 'Hoạch định phễu nội dung 3 giai đoạn, tái cấu trúc gói sản phẩm mồi thu hút.' },
    { expert: 'UX/UI Designer', input: 'Thiết kế lại toàn bộ Landing Page chuẩn phong cách Light Premium, tăng tốc độ tải trang lên <1.5s.' },
    { expert: 'SEO Specialist', input: 'Xây dựng cấu trúc Silo bao phủ 120+ cụm từ khóa tư vấn khóa học phễu giữa.' },
    { expert: 'Content Strategist', input: 'Viết lại toàn bộ bài viết và mẫu quảng cáo theo kỹ thuật Storytelling thuyết phục.' },
    { expert: 'Ads Specialist', input: 'Cài đặt chiến dịch Smart Bidding Google, tối ưu phễu tệp đối tượng tương tự (Lookalike).' },
    { expert: 'Tracking & CRO', input: 'Cài đặt tracking phễu GA4 đo lường từng click điền form, thực hiện A/B test tiêu đề chính.' }
  ],
  results: [
    { label: 'Tăng trưởng Organic Traffic', value: '+180%' },
    { label: 'Giảm chi phí Cost Per Lead (CPL)', value: '-42%' },
    { label: 'Tăng tỷ lệ chuyển đổi Landing Page', value: 'Từ 1.8% lên 4.6%' },
    { label: 'Doanh thu khóa học quý', value: '+125%' }
  ]
};

const TIEU_CHUAN_LAM_VIEC = [
  {
    title: 'Minh bạch dữ liệu 100%',
    desc: 'Khách hàng sở hữu toàn bộ tài khoản quảng cáo, tài khoản analytics, mã nguồn website. Không giữ bí mật số liệu, báo cáo tự động cập nhật thời gian thực.'
  },
  {
    title: 'Nói không với cam kết ảo',
    desc: 'Chúng tôi không hứa hẹn các cam kết phi thực tế như "Top 1 SEO sau 2 tuần" hay "X10 doanh thu ngay lập tức". PGS cam kết vào tiến trình chuẩn, chỉ số thực chứng và hiệu quả đo lường được.'
  },
  {
    title: 'Làm việc theo quy chuẩn phối hợp',
    desc: 'Mỗi đầu việc lớn đều có ít nhất 3 chuyên gia cùng tham gia kiểm duyệt chéo: Chuyên gia chiến lược định hướng, Chuyên gia triển khai thực thi và Chuyên gia đo lường giám sát.'
  },
  {
    title: 'Cải tiến và tối ưu liên tục',
    desc: 'Chiến dịch Marketing không bao giờ đứng yên. Toàn bộ các kênh liên tục được A/B testing hàng tuần dưới sự giám sát chặt chẽ của CRO Expert.'
  }
];

const FAQS = [
  {
    q: 'Dự án của tôi khi triển khai tại PGS sẽ do ai phụ trách chính?',
    a: 'Mỗi dự án tại PGS sẽ được điều phối trực tiếp bởi 1 Account Manager (quản lý tiến độ, liên lạc 24/7) và được dẫn dắt chuyên môn bởi Strategy Lead cùng đội ngũ chuyên gia giàu kinh nghiệm (SEO Specialist, Ads Specialist, UX/UI Designer...). Khách hàng sẽ làm việc trực tiếp với những người thực thi thực tế, không thông qua trung gian trung chuyển thông tin kém hiệu quả.'
  },
  {
    q: 'PGS Agency có cam kết doanh số không?',
    a: 'Chúng tôi cam kết về các chỉ số dẫn dắt tăng trưởng thực tế như: Số lượng Lead chất lượng cao, Organic Traffic chuẩn mục tiêu, Chỉ số CPA/CPL tối ưu và Tỷ lệ chuyển đổi trang đích (CR). PGS không cam kết doanh số bán hàng cuối cùng vì doanh số phụ thuộc rất lớn vào các yếu tố nội tại của doanh nghiệp như: Chất lượng sản phẩm, Năng lực chốt sale của đội ngũ telesale, chính sách giá và dịch vụ chăm sóc khách hàng. Tuy nhiên, chúng tôi cam kết đồng hành sâu sát để tối ưu phễu đổ về cho đội sale hoạt động hiệu quả nhất.'
  },
  {
    q: 'Nội dung bài viết chuẩn SEO và quảng cáo do ai chịu trách nhiệm sản xuất?',
    a: 'Toàn bộ nội dung của quý khách sẽ được lên định hướng bởi Content Strategist am hiểu ngành hàng, viết bởi các Copywriter chuyên nghiệp và bắt buộc có khâu kiểm duyệt chéo về tính chính xác thông tin (chuẩn EEAT) từ đại diện thương hiệu hoặc chuyên gia cố vấn của dự án trước khi xuất bản.'
  },
  {
    q: 'Tần suất báo cáo kết quả chiến dịch của PGS như thế nào?',
    a: 'PGS cung cấp hệ thống báo cáo real-time tự động thông qua Google Looker Studio đồng bộ dữ liệu trực tiếp từ Google Ads, Facebook Ads, Google Analytics 4 và CRM của doanh nghiệp. Bên cạnh đó, chúng tôi có các buổi họp báo cáo tiến độ chi tiết hàng tuần (Online/Offline) và báo cáo chiến lược tổng quan hàng tháng để đánh giá hiệu suất và đề xuất tối ưu cho giai đoạn tiếp theo.'
  },
  {
    q: 'Tôi muốn bắt đầu thì quy trình tư vấn ban đầu của PGS ra sao?',
    a: 'Đội ngũ chuyên gia PGS sẽ tiến hành khảo sát và đánh giá sơ bộ hệ thống Marketing hiện tại của doanh nghiệp hoàn toàn miễn phí. Sau đó, chúng tôi sẽ có buổi làm việc trực tiếp để đề xuất khung giải pháp chiến lược tăng trưởng tổng thể (Growth Audit Outline) trước khi ký hợp đồng chính thức triển khai.'
  }
];

export default function ExpertsWorkspace() {
  const [activeTab, setActiveTab] = useState<'live' | 'handoff'>('live');
  const [activeHandoffSubTab, setActiveHandoffSubTab] = useState<'seo' | 'design' | 'dev'>('seo');

  // Interactive state for Live Production page
  const [selectedRole, setSelectedRole] = useState<string>('strategy');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [copiedSchema, setCopiedSchema] = useState<string | null>(null);

  // Form submission simulated state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSchema(id);
    setTimeout(() => setCopiedSchema(null), 2000);
  };

  const currentRoleDetails = ROLE_CARDS.find(r => r.id === selectedRole) || ROLE_CARDS[0];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] flex flex-col antialiased">
      
      {/* GLOBAL SYSTEM BAR & NAVIGATION */}
      

      {/* MAIN CONTAINER */}
      <main className="flex-1">
        
        {/* ========================================================
            TAB 1: LIVE INTERACTIVE PRODUCTION WEBSITE
            ======================================================== */}
        <AnimatePresence mode="wait">
          {activeTab === 'live' && (
            <motion.div
              key="live-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              
              {/* SECTION 1: BREADCRUMB + PAGE HEADER */}
              <section className="bg-gradient-to-b from-[#F5F3EC]/50 to-transparent pt-8 pb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Breadcrumb */}
                  <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4" aria-label="Breadcrumb">
                    <span className="hover:text-amber-600 cursor-pointer transition-colors">Trang chủ</span>
                    <ChevronRight size={10} />
                    <span className="hover:text-amber-600 cursor-pointer transition-colors">Giới thiệu</span>
                    <ChevronRight size={10} />
                    <span className="text-amber-700 font-medium">Đội ngũ chuyên gia</span>
                  </nav>
                </div>
              </section>

              {/* SECTION 2: HERO SECTION WITH THE DYNAMIC 3D COMMAND TABLE */}
              <section className="relative overflow-hidden pb-16 md:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Copy block */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold-700 text-xs font-semibold border border-gold/20">
                        <Award size={12} className="text-gold-600" />
                        Tăng Trưởng Bền Vững Bằng Hệ Thống Đồng Bộ
                      </div>
                      
                      {/* REQUIRED H1 */}
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-stone-900 leading-tight">
                        Đội ngũ chuyên gia <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 font-extrabold text-glow-gold">
                          PGS Agency
                        </span>
                      </h1>
                      
                      <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
                        Không làm marketing rời rạc, chúng tôi xây dựng hệ thống tăng trưởng số bền vững. Đội ngũ PGS kết hợp chặt chẽ 9 mũi nhọn: Chiến lược, SEO, UX/UI, Ads, Content, Social, Tracking, CRO và Account Management.
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <a 
                          href="#consult-form" 
                          className="bg-gold-500 hover:bg-gold-600 text-brand-dark font-semibold px-6 py-3 rounded-lg shadow-lg shadow-gold-500/20 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 text-sm"
                        >
                          Nhận Phân Tích Hệ Thống Free
                          <ArrowRight size={16} />
                        </a>
                        <a 
                          href="#expert-grid" 
                          className="bg-white hover:bg-stone-50 text-stone-800 font-semibold px-6 py-3 rounded-lg border border-stone-300 transition-all duration-300 text-sm"
                        >
                          Gặp Gỡ Chuyên Gia
                        </a>
                      </div>

                      {/* Brand Promises Bar */}
                      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-300/40">
                        <div>
                          <div className="font-display font-bold text-2xl text-gold-600">12+ Năm</div>
                          <p className="text-xs text-stone-500 font-sans mt-1">Kinh nghiệm thực chiến</p>
                        </div>
                        <div>
                          <div className="font-display font-bold text-2xl text-gold-600">150+ Doanh nghiệp</div>
                          <p className="text-xs text-stone-500 font-sans mt-1">Đã đồng hành tăng trưởng</p>
                        </div>
                        <div>
                          <div className="font-display font-bold text-2xl text-gold-600">9 Chuyên môn</div>
                          <p className="text-xs text-stone-500 font-sans mt-1">Kết hợp đồng bộ</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Dynamic Widget: GROWTH EXPERT COMMAND TABLE (Simulated 3D orbiting controls) */}
                    <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
                      <div className="text-center mb-4 lg:hidden">
                        <span className="text-xs font-mono text-stone-400">Chạm vào một vai trò bên dưới để tương tác</span>
                      </div>
                      
                      {/* Virtual Command Table Stage */}
                      <div className="relative w-full aspect-square max-w-[480px] bg-gradient-to-b from-[#F2EFE5] to-[#EBE7D9] rounded-full border border-stone-300 shadow-2xl flex items-center justify-center p-8 overflow-hidden">
                        
                        {/* Radial grid line design elements */}
                        <div className="absolute inset-4 rounded-full border border-stone-400/20 animate-spin" style={{ animationDuration: '60s' }}></div>
                        <div className="absolute inset-16 rounded-full border border-dashed border-amber-500/20 animate-spin" style={{ animationDuration: '40s' }}></div>
                        <div className="absolute inset-28 rounded-full border border-stone-400/35"></div>

                        {/* Central Hub: "Growth Strategy" */}
                        <div className="absolute w-28 h-28 rounded-full bg-white border-2 border-amber-500 flex flex-col items-center justify-center p-3 text-center z-20 shadow-xl card-glow">
                          <Sparkles className="text-amber-500 mb-1 animate-pulse" size={20} />
                          <div className="font-display font-bold text-xs leading-tight text-stone-900">SYSTEMATIC</div>
                          <div className="font-display font-extrabold text-[10px] text-amber-600 uppercase tracking-widest mt-0.5">GROWTH</div>
                        </div>

                        {/* Floating orbiting node representations */}
                        {ROLE_CARDS.map((role, idx) => {
                          const angle = (idx * 360) / ROLE_CARDS.length;
                          const radius = 145; //px distance from center
                          const x = Math.cos((angle * Math.PI) / 180) * radius;
                          const y = Math.sin((angle * Math.PI) / 180) * radius;
                          const RoleIcon = role.icon;
                          const isSelected = selectedRole === role.id;

                          return (
                            <motion.button
                              key={role.id}
                              onClick={() => setSelectedRole(role.id)}
                              className={`absolute w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer z-30 ${
                                isSelected 
                                  ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20 border-2 border-white scale-110' 
                                  : 'bg-white text-stone-600 hover:bg-amber-50 hover:text-amber-600 border border-stone-300/60'
                              }`}
                              style={{
                                transform: `translate(${x}px, ${y}px)`,
                              }}
                              whileHover={{ scale: 1.15 }}
                              title={role.title}
                            >
                              <RoleIcon size={18} />
                            </motion.button>
                          );
                        })}

                        {/* Orbit trails drawing */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="33" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
                        </svg>

                        {/* Aesthetic gold energy line pulsing */}
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                      </div>

                      {/* Info Panel under simulated 3D Table */}
                      <div className="w-full mt-6 bg-white rounded-xl p-5 border border-amber-500/10 shadow-lg relative">
                        <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] font-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <Settings size={10} className="animate-spin" style={{ animationDuration: '6s' }} />
                          Interactive Node
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 mt-1">
                            {React.createElement(currentRoleDetails.icon, { size: 20 })}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Growth Expert Node Focus:</span>
                            <h3 className="font-display font-bold text-base text-stone-900 mt-0.5">{currentRoleDetails.title}</h3>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed italic">“{currentRoleDetails.short}”</p>
                            
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-3 border-t border-stone-100">
                              <div>
                                <span className="font-semibold text-stone-700 block">Sản phẩm bàn giao:</span>
                                <span className="text-stone-600">{currentRoleDetails.output}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-stone-700 block">KPI quản lý:</span>
                                <span className="text-amber-700 font-medium">{currentRoleDetails.kpi}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: VÌ SAO ĐỘI NGŨ ĐA CHUYÊN MÔN QUAN TRỌNG (SPLIT COMPARE) */}
              <section className="py-16 bg-[#F5F3EC]/40 border-y border-stone-300/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Phân Tích Khách Quan</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Tại sao doanh nghiệp cần Đội ngũ đồng bộ thay vì làm Marketing rời rạc?
                    </h2>
                    <p className="text-sm text-stone-500">
                      Marketing đa kênh ngày nay cực kỳ phức tạp. Việc thuê một cá nhân “đa năng” (All-in-one) hoặc làm việc với các freelancer riêng lẻ dẫn đến tình trạng gãy luồng dữ liệu và lãng phí ngân sách.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Siloed Approach */}
                    <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                          <h3 className="font-display font-bold text-stone-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                            Ủy thác Marketing rời rạc
                          </h3>
                          <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full uppercase font-mono">Hiệu suất thấp</span>
                        </div>
                        <ul className="space-y-4 text-xs text-stone-600">
                          <li className="flex items-start gap-2.5">
                            <span className="text-rose-500 font-bold mt-0.5">✕</span>
                            <span><strong>Đứt gãy dữ liệu:</strong> Ads chạy một đường, website thiết kế một nẻo, không cài đặt tracking khiến không rõ nguồn lead đến từ đâu.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-rose-500 font-bold mt-0.5">✕</span>
                            <span><strong>Nội dung nghèo nàn:</strong> Bài viết chuẩn SEO máy móc không có tư duy CRO dẫn đến lượng traffic lớn nhưng tỷ lệ chuyển đổi bằng 0.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-rose-500 font-bold mt-0.5">✕</span>
                            <span><strong>Chi phí lẩn khuất:</strong> Thuê nhiều bên lẻ tẻ tốn thời gian quản lý, giao tiếp chồng chéo và các bên đổ lỗi cho nhau khi không ra kết quả.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-rose-500 font-bold mt-0.5">✕</span>
                            <span><strong>Thiếu chiến lược lõi:</strong> Quảng cáo không bám sát phễu tâm lý, đốt tiền ngân sách vào tệp rộng không đem lại chuyển đổi sâu.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-8 pt-4 border-t border-stone-100 text-xs text-stone-400 italic">
                        Kết quả: Tốn 80% thời gian quản lý nhưng hiệu quả mang lại không đồng đều.
                      </div>
                    </div>

                    {/* Middle Graphic Connector */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center py-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-bold text-sm">
                        VS
                      </div>
                      <div className="h-full w-px bg-gradient-to-b from-stone-300 via-amber-500/30 to-stone-300 my-4 hidden lg:block"></div>
                    </div>

                    {/* Right Unified PGS Team approach */}
                    <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-xl p-6 border border-amber-500/20 shadow-xl flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-amber-500/5 blur-xl pointer-events-none"></div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
                          <h3 className="font-display font-bold text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            Hệ thống Đồng Bộ PGS
                          </h3>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full uppercase font-mono">Giải pháp tối ưu</span>
                        </div>
                        <ul className="space-y-4 text-xs text-stone-300">
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-400 font-bold mt-0.5">✓</span>
                            <span><strong>Hội tụ đa chuyên môn:</strong> 9 chuyên gia cùng thống nhất một chiến lược. Dữ liệu từ Ads được chia sẻ tức thì để SEO và Content tối ưu hóa trang đích.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-400 font-bold mt-0.5">✓</span>
                            <span><strong>Đo lường đầu cuối (End-to-End):</strong> Tracking chuẩn xác 100% từng hành vi trên website. Dashboard tự động giúp doanh nghiệp nắm rõ từng đồng ngân sách.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-400 font-bold mt-0.5">✓</span>
                            <span><strong>Nội dung thuyết phục cao:</strong> Đội ngũ SEO định vị từ khóa phễu mua hàng kết hợp Copywriter viết bài theo tâm lý học CRO nâng tầm thương hiệu.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-400 font-bold mt-0.5">✓</span>
                            <span><strong>Nhất quán & Tiết kiệm:</strong> Không mất thời gian trung gian. Một đầu mối báo cáo minh bạch, cam kết đúng hạn và liên tục cải tiến hiệu suất.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-8 pt-4 border-t border-stone-800 text-xs text-amber-400 font-medium">
                        Kết quả: Xây dựng tài sản số tăng trưởng tự nhiên bền vững lâu dài.
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* SECTION 4: CẤU TRÚC ĐỘI NGŨ (3D ROLE GRID) */}
              <section id="expert-grid" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Sơ Đồ Tổ Chức</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Cấu trúc đội ngũ chuẩn 9 mũi nhọn tăng trưởng
                    </h2>
                    <p className="text-sm text-stone-500">
                      Hệ thống nhân sự chuyên môn hóa cao của PGS phối hợp liên phòng ban nhằm loại bỏ hoàn toàn các điểm mù vận hành trong doanh nghiệp.
                    </p>
                  </div>

                  {/* Role Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ROLE_CARDS.map((role) => {
                      const IconComp = role.icon;
                      return (
                        <div 
                          key={role.id} 
                          onClick={() => setSelectedRole(role.id)}
                          className={`group p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                            selectedRole === role.id 
                              ? 'bg-white border-amber-500 shadow-lg ring-2 ring-amber-500/10' 
                              : 'bg-white border-stone-200 hover:border-amber-500/50 hover:shadow-md'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-2.5 rounded-lg border ${role.color}`}>
                                <IconComp size={20} />
                              </div>
                              <span className="text-[10px] text-stone-400 font-mono">Role ID: #{role.id}</span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
                              {role.title}
                            </h3>
                            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                              {role.short}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-xs">
                            <div className="flex justify-between gap-2">
                              <span className="text-stone-400 font-medium">Bàn giao:</span>
                              <span className="text-stone-700 text-right font-mono truncate max-w-[180px]">{role.output}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-stone-400 font-medium">KPI cốt lõi:</span>
                              <span className="text-amber-700 font-semibold text-right">{role.kpi}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SECTION 5: QUY TRÌNH PHỐI HỢP NỘI BỘ (INTERACTIVE FLOW NODE) */}
              <section className="py-16 bg-[#F5F3EC]/20 border-t border-stone-300/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Quy Trình Chuẩn Hóa</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Quy trình phối hợp khép kín không điểm mù
                    </h2>
                    <p className="text-sm text-stone-500">
                      Xem cách thức 9 chuyên gia của PGS bàn giao, phản hồi và tối ưu hóa liên tục để biến lưu lượng truy cập thành khách hàng tiềm năng thực tế.
                    </p>
                  </div>

                  {/* Horizontal/Vertical Step Flow Widget */}
                  <div className="bg-white rounded-xl border border-stone-200/80 p-6 md:p-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left: Steps list */}
                      <div className="lg:col-span-5 space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                        {COLLABORATION_FLOW.map((flow, idx) => (
                          <div 
                            key={flow.step}
                            className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                              idx === 3 // Active step simulation as standard
                                ? 'bg-amber-500/10 border-amber-500 shadow-xs' 
                                : 'bg-stone-50/50 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-amber-600">{flow.step} / Phase</span>
                              <span className="text-[10px] bg-stone-200/60 text-stone-600 px-2 py-0.5 rounded-full font-medium">{flow.expert}</span>
                            </div>
                            <h4 className="font-display font-bold text-sm text-stone-900 mt-1">{flow.phase}</h4>
                          </div>
                        ))}
                      </div>

                      {/* Right: Deep detail of the selected flow node */}
                      <div className="lg:col-span-7 bg-[#FAF9F5] rounded-xl p-6 border border-amber-500/10 shadow-inner flex flex-col justify-between min-h-[360px]">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-display font-bold text-amber-500">04</span>
                              <div>
                                <h4 className="font-display font-bold text-lg text-stone-900">EEAT Content Creation</h4>
                                <p className="text-[10px] text-stone-400 font-mono">Bởi: Content Strategist</p>
                              </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-medium">Bắt buộc & Quan trọng</span>
                          </div>

                          <div className="mt-6 space-y-4 text-xs">
                            <div>
                              <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px] mb-1">Mô tả hành động phối hợp:</span>
                              <p className="text-stone-700 leading-relaxed text-sm">
                                “Sản xuất nội dung sâu sắc chuẩn chuyên gia, thu hút ý định tìm kiếm của khách hàng, giải quyết triệt để nỗi đau (Pain Point), đồng thời lồng ghép thông điệp định vị PGS để gia tăng uy tín, thúc đẩy điền thông tin tư vấn.”
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              <div className="p-3 bg-stone-100/80 rounded-lg border border-stone-200">
                                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Đầu vào nhận từ trước:</span>
                                <span className="text-stone-700 font-medium">Bản đồ từ khóa SEO & Bản vẽ Wireframe layout của UX/UI Team.</span>
                              </div>
                              <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                                <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest block mb-1">Đầu ra bàn giao bước sau:</span>
                                <span className="text-amber-800 font-medium">Bộ nội dung chuẩn SEO hoàn chỉnh & Mẫu copy kịch bản tiếp cận truyền thông.</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
                          <span className="flex items-center gap-1.5"><Clock size={13} className="text-amber-500" /> Bàn giao chuẩn chất lượng SLA</span>
                          <span className="font-mono text-[11px] text-amber-700">Dữ liệu thông suốt 100%</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 6: PROFILE CHUYÊN GIA (EXPERT DETAIL CARDS) */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Hồ Sơ Chuyên Gia</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Đội ngũ nhân sự nòng cốt thực thi dự án của bạn
                    </h2>
                    <p className="text-sm text-stone-500">
                      PGS quy tụ những chuyên gia thực chiến hàng đầu, sở hữu chứng chỉ chuyên môn quốc tế và kinh nghiệm dày dặn qua hàng trăm chiến dịch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {EXPERTS_PROFILE.map((expert, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all duration-300 card-glow-hover">
                        
                        {/* Left: Avatar & Contact simulation */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-500/20 p-1 mb-3">
                            <img 
                              src={expert.avatar} 
                              alt={expert.name} 
                              className="w-full h-full object-cover rounded-full bg-stone-100"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h4 className="font-display font-bold text-base text-stone-900">{expert.name}</h4>
                          <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 mt-1">
                            {expert.role}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono mt-1.5">{expert.experience}</span>
                        </div>

                        {/* Right: Expertise detail and authored articles */}
                        <div className="flex-1 space-y-3">
                          <div className="text-xs space-y-2">
                            <div>
                              <span className="font-semibold text-stone-800 block">Chuyên môn mũi nhọn:</span>
                              <p className="text-stone-600 leading-relaxed">{expert.specialty}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-stone-800 block">Dự án tiêu biểu:</span>
                              <p className="text-stone-600 leading-relaxed">{expert.projects}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-stone-800 block">Về chuyên gia:</span>
                              <p className="text-stone-500 italic leading-relaxed">{expert.bio}</p>
                            </div>
                          </div>

                          {/* Authored Articles - SATISFIES EEAT AUTHOR REQUIREMENT */}
                          <div className="pt-3 border-t border-stone-100">
                            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">Bài viết chuyên sâu đã viết:</span>
                            <div className="space-y-1.5">
                              {expert.articles.map((art, aIdx) => (
                                <a 
                                  key={aIdx} 
                                  href={art.url}
                                  className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-amber-700 transition-colors group/link"
                                >
                                  <FileText size={12} className="text-amber-500 shrink-0" />
                                  <span className="underline decoration-stone-200 group-hover/link:decoration-amber-500 truncate max-w-xs">{art.title}</span>
                                  <ExternalLink size={10} className="text-stone-400 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-10">
                    <p className="text-xs text-stone-500 italic">
                      [Hồ sơ nội bộ PGS đang liên tục bổ sung và đồng bộ hóa lý lịch thực chứng của 15+ chuyên gia vệ tinh]
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7: AUTHOR SYSTEM SHOWCASE (FOR BLOG EEAT ENHANCEMENT) */}
              <section className="py-16 bg-[#F5F3EC]/40 border-y border-stone-300/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Text explanation of why this system exists */}
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Hệ Thống Tác Giả (EEAT Compliance)</span>
                      <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                        Chuẩn hóa hệ thống Author để tăng điểm chất lượng SEO (Google EEAT)
                      </h2>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Google đánh giá cực kỳ cao tính <strong>Experience (Kinh nghiệm), Expertise (Chuyên môn), Authoritativeness (Uy tín), và Trust (Tin cậy)</strong>.
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Mỗi bài viết kiến thức chuyên môn trên blog PGS đều được liên kết trực tiếp với hồ sơ thực tế của chuyên gia phụ trách, giúp Google hiểu rõ “ai đứng sau nội dung” này, từ đó đẩy thứ hạng từ khóa bền vững và tăng điểm tín nhiệm thực tế.
                      </p>
                      <div className="p-4 bg-white/80 rounded-lg border border-stone-200 text-xs space-y-1">
                        <span className="font-semibold text-stone-800">Cấu trúc Schema Author tự động chèn:</span>
                        <p className="text-stone-500 font-mono text-[10px]">Schema.org/Person & Schema.org/Organization liên kết thực thể.</p>
                      </div>
                    </div>

                    {/* Right: Real Interactive Author Box Preview */}
                    <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-stone-200 shadow-lg relative">
                      <div className="absolute top-3 right-4 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1">
                        <ShieldCheck size={12} />
                        Live EEAT Box Preview
                      </div>
                      
                      <span className="text-xs font-mono text-stone-400 block mb-3 uppercase tracking-wider">Hiển thị ở cuối mỗi bài viết Blog:</span>
                      
                      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <img 
                            src="https://picsum.photos/seed/son/150/150" 
                            alt="Phạm Gia Sơn" 
                            className="w-16 h-16 rounded-full object-cover border border-amber-500/30 bg-white"
                          />
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-display font-bold text-sm text-stone-900">Tác giả: Phạm Gia Sơn</h5>
                              <span className="bg-amber-500/10 text-amber-800 text-[9px] px-2 py-0.5 rounded-full font-sans font-semibold border border-amber-500/20">
                                Verified Strategy Expert
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 font-mono">Founder & Strategy Director tại PGS Agency | 12+ năm thực chiến</p>
                            <p className="text-xs text-stone-600 leading-relaxed pt-1">
                              “Người chịu trách nhiệm chính thiết lập khung sườn tăng trưởng cho các dự án tại PGS. Đã trực tiếp viết và kiểm duyệt hơn 100+ bài viết phân tích ngành Marketing số thực chứng.”
                            </p>
                          </div>
                        </div>

                        {/* Social verification connections */}
                        <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-400">
                          <div className="flex items-center gap-3">
                            <span className="hover:text-amber-600 cursor-pointer">LinkedIN Profile ↗</span>
                            <span className="hover:text-amber-600 cursor-pointer">Facebook ↗</span>
                            <span className="hover:text-amber-600 cursor-pointer">Bài viết liên quan (48)</span>
                          </div>
                          <span className="font-mono text-stone-400">ID: pgs-son-01</span>
                        </div>
                      </div>

                      {/* Editorial review indicator */}
                      <div className="mt-4 p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-start gap-2 text-xs">
                        <CheckCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-amber-900">Khâu kiểm duyệt nội dung biên tập tại PGS:</p>
                          <p className="text-stone-600 text-[11px] mt-0.5">Mọi thông tin xuất bản thuộc lĩnh vực kỹ thuật phức tạp đều được kiểm duyệt chéo bởi đại diện thương hiệu hoặc Trưởng phòng kỹ thuật của PGS trước khi public.</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 8: HẬU TRƯỜNG TRIỂN KHAI (BTS MASONRY) */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Behind the Scenes</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Hậu trường triển khai thực tế của đội ngũ PGS
                    </h2>
                    <p className="text-sm text-stone-500">
                      Chúng tôi tự hào về văn hóa làm việc nghiêm túc, tập trung vào số liệu thực tế thông qua các buổi họp sprint kỹ thuật và rà soát sâu sát.
                    </p>
                  </div>

                  {/* Behind the scenes grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BEHIND_SCENES.map((bts, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                        <div className="relative aspect-video bg-stone-100 overflow-hidden">
                          <img 
                            src={bts.image} 
                            alt={bts.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-4 space-y-1.5">
                          <h4 className="font-display font-bold text-sm text-stone-950">{bts.title}</h4>
                          <p className="text-xs text-stone-500 leading-relaxed">{bts.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 9: CASE PHỐI HỢP ĐA CHUYÊN MÔN (INTERACTIVE CASE STUDY BOARD) */}
              <section className="py-16 bg-stone-900 text-stone-100 border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Project Challenge & Results */}
                    <div className="lg:col-span-5 space-y-6">
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Case Study Thực Tế</span>
                      <h2 className="text-3xl font-display font-bold text-white tracking-tight leading-tight">
                        Chứng minh hiệu quả khi 9 chuyên môn cùng hội tụ phối hợp
                      </h2>
                      <div className="space-y-4 text-xs text-stone-300">
                        <div>
                          <span className="text-amber-400 font-semibold block uppercase text-[10px] tracking-wider mb-1">Khách hàng:</span>
                          <p className="text-stone-100 font-medium">{CASE_COLLABORATION.clientName}</p>
                        </div>
                        <div>
                          <span className="text-rose-400 font-semibold block uppercase text-[10px] tracking-wider mb-1">Thử thách ban đầu:</span>
                          <p className="leading-relaxed text-stone-400">{CASE_COLLABORATION.challenge}</p>
                        </div>
                        <div>
                          <span className="text-emerald-400 font-semibold block uppercase text-[10px] tracking-wider mb-1">Giải pháp PGS:</span>
                          <p className="leading-relaxed text-stone-400">{CASE_COLLABORATION.solution}</p>
                        </div>
                      </div>

                      {/* Hard Numbers block */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-800">
                        {CASE_COLLABORATION.results.map((res, rIdx) => (
                          <div key={rIdx} className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/60">
                            <div className="text-xs text-stone-400 font-sans">{res.label}</div>
                            <div className="font-display font-extrabold text-2xl text-amber-400 mt-1">{res.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Interactive Collaboration Matrix */}
                    <div className="lg:col-span-7 bg-stone-800/80 rounded-xl p-6 border border-stone-700 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Hội đồng phối hợp nội bộ PGS</span>
                        <span className="text-[10px] bg-stone-700 text-stone-300 px-2.5 py-0.5 rounded-full">SLA bàn giao đồng thời</span>
                      </div>

                      <div className="space-y-3">
                        {CASE_COLLABORATION.contributions.map((con, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 bg-stone-900/60 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                              <span className="font-semibold text-white min-w-[120px]">{con.expert}</span>
                            </div>
                            <p className="text-stone-400 text-left sm:text-right flex-1 leading-relaxed">
                              {con.input}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="text-[10px] text-stone-500 text-center italic pt-2">
                        [Lưu ý: Mọi số liệu và chi tiết chiến dịch trên đều được lược dịch để bảo vệ thông tin bảo mật NDA của khách hàng]
                      </p>
                    </div>

                  </div>
                </div>
              </section>

              {/* SECTION 10: TIÊU CHUẨN LÀM VIỆC (QUALITY STANDARDS CHECKLIST) */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Cam Kết Dịch Vụ</span>
                    <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
                      Tiêu chuẩn làm việc cam kết tại PGS Agency
                    </h2>
                    <p className="text-sm text-stone-500">
                      Chúng tôi hiểu rằng ngân sách Marketing là dòng máu của doanh nghiệp. PGS tuân thủ nghiêm ngặt các quy chuẩn hợp tác để tối đa hóa hiệu quả đầu tư.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TIEU_CHUAN_LAM_VIEC.map((std, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-xs hover:border-amber-500/40 transition-colors duration-300 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-1">
                          <CheckCircle size={18} />
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="font-display font-bold text-base text-stone-950">{std.title}</h4>
                          <p className="text-xs text-stone-600 leading-relaxed">{std.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 11: FAQ + INTAKE CTA FORM */}
              <section id="consult-form" className="py-16 bg-[#F5F3EC]/50 border-t border-stone-300/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Interactive FAQ Accordion */}
                    <div className="lg:col-span-6 space-y-6">
                      <div>
                        <span className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold block">Giải Đáp Thắc Mắc</span>
                        <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight mt-1">
                          Giải đáp nhanh thắc mắc về năng lực đội ngũ
                        </h2>
                      </div>

                      <div className="space-y-3">
                        {FAQS.map((faq, idx) => {
                          const isOpen = faqOpenIndex === idx;
                          return (
                            <div 
                              key={idx} 
                              className="bg-white rounded-lg border border-stone-200 overflow-hidden transition-all duration-300"
                            >
                              <button
                                onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                              >
                                <span className="font-display font-bold text-sm text-stone-900 pr-4">{faq.q}</span>
                                <ChevronDown 
                                  size={16} 
                                  className={`text-stone-500 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} 
                                />
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-5 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
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

                    {/* Right: Clean, high-conversion Lead Form panel */}
                    <div className="lg:col-span-6 bg-white rounded-xl p-6 md:p-8 border border-stone-200 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
                      
                      <div className="mb-6">
                        <h3 className="font-display font-extrabold text-xl text-stone-900">Yêu cầu phân tích hệ thống</h3>
                        <p className="text-xs text-stone-500 mt-1">
                          Đội ngũ chuyên gia PGS sẽ tiến hành audit rà soát và gửi bản tóm tắt chiến lược ban đầu cho bạn sau 48 giờ làm việc.
                        </p>
                      </div>

                      {formSubmitted ? (
                        <div className="text-center py-8 space-y-4">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20">
                            <Check size={24} />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-lg text-stone-900">Gửi yêu cầu thành công!</h4>
                            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                              Cảm ơn quý khách. Đội ngũ PGS (bao gồm Strategy Lead và Account Manager) sẽ chủ động liên hệ khảo sát thực trạng trong vòng 15 phút.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              setFormSubmitted(false);
                              setFormData({ name: '', phone: '', email: '', company: '', message: '' });
                            }}
                            className="text-xs text-amber-700 font-semibold underline hover:text-amber-800 block mx-auto"
                          >
                            Tạo yêu cầu mới
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-stone-700 font-medium mb-1">Họ tên của bạn *</label>
                              <input 
                                type="text" 
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Nguyễn Văn A" 
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder-stone-400"
                              />
                            </div>
                            <div>
                              <label className="block text-stone-700 font-medium mb-1">Số điện thoại liên hệ *</label>
                              <input 
                                type="tel" 
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="0901234567" 
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder-stone-400"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-stone-700 font-medium mb-1">Email công việc</label>
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="partner@company.com" 
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder-stone-400"
                              />
                            </div>
                            <div>
                              <label className="block text-stone-700 font-medium mb-1">Tên doanh nghiệp / Website</label>
                              <input 
                                type="text" 
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Công ty TNHH PGS" 
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder-stone-400"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-stone-700 font-medium mb-1">Thực trạng hoặc kỳ vọng mong muốn</label>
                            <textarea 
                              rows={3}
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Mô tả ngắn về sản phẩm, đối thủ hoặc điểm nghẽn chuyển đổi hiện tại..." 
                              className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder-stone-400"
                            ></textarea>
                          </div>

                          <div className="pt-2">
                            <button 
                              type="submit"
                              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 rounded-lg shadow-lg shadow-amber-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                            >
                              Gửi yêu cầu đến Hội đồng chuyên gia
                              <ArrowRight size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 justify-center text-[10px] text-stone-400 pt-1">
                            <ShieldCheck size={12} className="text-emerald-500" />
                            <span>Mọi thông tin của quý doanh nghiệp được bảo mật tuyệt đối theo NDA</span>
                          </div>
                        </form>
                      )}

                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ========================================================
              TAB 2: HANDOFF & BLUEPRINT DOCUMENTATION WORKSPACE
              ======================================================== */}
          {activeTab === 'handoff' && (
            <motion.div
              key="handoff-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              
              {/* Internal Subtabs for different departments */}
              <div className="flex flex-wrap border-b border-stone-200 mb-8 gap-2">
                <button
                  onClick={() => setActiveHandoffSubTab('seo')}
                  className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeHandoffSubTab === 'seo'
                      ? 'border-amber-500 text-amber-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Search size={14} />
                  SEO, Metadata & Schema Handoff
                </button>
                <button
                  onClick={() => setActiveHandoffSubTab('design')}
                  className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeHandoffSubTab === 'design'
                      ? 'border-amber-500 text-amber-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Layers size={14} />
                  Designer UI/UX Specs
                </button>
                <button
                  onClick={() => setActiveHandoffSubTab('dev')}
                  className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeHandoffSubTab === 'dev'
                      ? 'border-amber-500 text-amber-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Code size={14} />
                  Developer Interaction Specs
                </button>
              </div>

              {/* SUBTAB CONTENT 1: SEO */}
              {activeHandoffSubTab === 'seo' && (
                <div className="space-y-8 bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
                  
                  {/* SEO Headers summary cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                      <span className="text-[10px] text-stone-400 uppercase font-mono tracking-widest block">Meta Title (SEO & AI Search)</span>
                      <p className="font-sans font-bold text-stone-900 mt-1 text-sm">
                        Đội Ngũ Chuyên Gia PGS Agency - Chuyên Gia Marketing Tổng Thể
                      </p>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                      <span className="text-[10px] text-stone-400 uppercase font-mono tracking-widest block">Meta Description</span>
                      <p className="font-sans text-stone-600 mt-1 text-xs">
                        Gặp gỡ đội ngũ chuyên gia nòng cốt tại PGS Agency. Giải quyết triệt để sự đứt gãy trong marketing bằng sự phối hợp đồng bộ 9 chuyên môn: Strategy, SEO, Ads, UX/UI, CRO...
                      </p>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                      <span className="text-[10px] text-stone-400 uppercase font-mono tracking-widest block">H1 Target Tag</span>
                      <p className="font-sans font-mono font-bold text-amber-700 mt-1 text-sm">
                        &lt;h1&gt;Đội ngũ chuyên gia PGS Agency&lt;/h1&gt;
                      </p>
                    </div>
                  </div>

                  {/* Core H2/H3 Layout Outline */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-amber-500" />
                      Cấu trúc Heading H2 / H3 phục vụ lập dàn bài SEO Content
                    </h3>
                    <div className="bg-stone-950 text-stone-300 font-mono text-xs rounded-lg p-5 overflow-x-auto space-y-1.5 leading-relaxed">
                      <p className="text-amber-400">&lt;h1&gt; Đội ngũ chuyên gia PGS Agency &lt;/h1&gt;</p>
                      <p className="text-stone-500 pl-4">{"// Section 2: Mô tả sứ mệnh và định vị đội ngũ"}</p>
                      
                      <p className="text-amber-400 pl-4">&lt;h2&gt; Tại sao doanh nghiệp cần Đội ngũ đồng bộ thay vì làm Marketing rời rạc? &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 3: Phân tích thực trạng, so sánh ủy thác rời rạc vs PGS"}</p>
                      
                      <p className="text-amber-400 pl-4">&lt;h2&gt; Cấu trúc đội ngũ chuẩn 9 mũi nhọn tăng trưởng &lt;/h2&gt;</p>
                      <p className="text-amber-500 pl-8">&lt;h3&gt; Strategy Lead &lt;/h3&gt;</p>
                      <p className="text-amber-500 pl-8">&lt;h3&gt; SEO Specialist &lt;/h3&gt;</p>
                      <p className="text-amber-500 pl-8">&lt;h3&gt; UX/UI & CRO Design Specialist &lt;/h3&gt;</p>
                      <p className="text-stone-500 pl-8">{"... [Bao phủ đầy đủ 9 vai trò chính]"}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Quy trình phối hợp khép kín không điểm mù &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 5: Thể hiện chuỗi luân chuyển công việc nội bộ"}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Đội ngũ nhân sự nòng cốt thực thi dự án của bạn &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 6: Chi tiết hồ sơ thực chứng của Phạm Gia Sơn, Nguyễn Minh Đức..."}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Chuẩn hóa hệ thống Author để tăng điểm chất lượng SEO (Google EEAT) &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 7: Giải thích triết lý cấu trúc Author box chuẩn mực"}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Chứng minh hiệu quả khi 9 chuyên môn cùng hội tụ phối hợp &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 9: Case study liên phòng ban"}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Tiêu chuẩn làm việc cam kết tại PGS Agency &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 10: 4 trụ cột văn hóa làm việc"}</p>

                      <p className="text-amber-400 pl-4">&lt;h2&gt; Giải đáp nhanh thắc mắc về năng lực đội ngũ &lt;/h2&gt;</p>
                      <p className="text-stone-500 pl-8">{"// Section 11: Tổ hợp câu hỏi thường gặp FAQ"}</p>
                    </div>
                  </div>

                  {/* Schema implementation recommendations */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
                        <Database size={16} className="text-amber-500" />
                        Đề xuất các Schema định dạng LD+JSON bắt buộc
                      </h3>
                      <span className="text-xs text-stone-500 font-mono">Click nút bên dưới để copy code mẫu</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Person / Profiles Schema */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-stone-100 p-2 rounded-t-lg border-x border-t border-stone-200">
                          <span className="text-[10px] font-mono font-bold text-stone-600">1. Schema Profile Tác Giả (Person)</span>
                          <button 
                            onClick={() => copyToClipboard(JSON.stringify(personSchemaSample, null, 2), 'person')}
                            className="text-[10px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Copy size={10} />
                            {copiedSchema === 'person' ? 'Copied!' : 'Copy JSON'}
                          </button>
                        </div>
                        <pre className="bg-stone-50 p-4 rounded-b-lg border border-stone-200 font-mono text-[10px] text-stone-600 max-h-60 overflow-y-auto">
                          {JSON.stringify(personSchemaSample, null, 2)}
                        </pre>
                      </div>

                      {/* FAQ Page Schema */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-stone-100 p-2 rounded-t-lg border-x border-t border-stone-200">
                          <span className="text-[10px] font-mono font-bold text-stone-600">2. Schema Hỏi Đáp (FAQPage)</span>
                          <button 
                            onClick={() => copyToClipboard(JSON.stringify(faqSchemaSample, null, 2), 'faq')}
                            className="text-[10px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Copy size={10} />
                            {copiedSchema === 'faq' ? 'Copied!' : 'Copy JSON'}
                          </button>
                        </div>
                        <pre className="bg-stone-50 p-4 rounded-b-lg border border-stone-200 font-mono text-[10px] text-stone-600 max-h-60 overflow-y-auto">
                          {JSON.stringify(faqSchemaSample, null, 2)}
                        </pre>
                      </div>

                    </div>
                  </div>

                  {/* INTERNAL LINKS GRID */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                      <ExternalLink size={16} className="text-amber-500" />
                      Quy hoạch Bản đồ Liên kết nội bộ (Internal Links)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/10 space-y-2">
                        <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider">Internal Link Đi (Từ trang Đội ngũ đến các trang khác):</h4>
                        <ul className="text-xs space-y-1.5 text-stone-600 list-disc list-inside">
                          <li>Đến trang <strong>Dịch vụ SEO tổng thể</strong> (Từ khóa: <span className="underline italic">dịch vụ SEO</span>)</li>
                          <li>Đến trang <strong>Dịch vụ Thiết kế Web chuẩn CRO</strong> (Từ khóa: <span className="underline italic">thiết kế website</span>)</li>
                          <li>Đến trang <strong>Dịch vụ Quảng cáo đa nền tảng</strong> (Từ khóa: <span className="underline italic">quảng cáo Google</span>)</li>
                          <li>Đến các bài viết chuyên sâu của từng tác giả để củng cố tín hiệu thực chứng.</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 space-y-2">
                        <h4 className="font-bold text-xs text-stone-700 uppercase tracking-wider">Internal Link Nhận (Từ các trang khác trỏ về trang Đội ngũ):</h4>
                        <ul className="text-xs space-y-1.5 text-stone-600 list-disc list-inside">
                          <li>Trỏ về từ <strong>Trang chủ</strong> ở phần giới thiệu nhân sự.</li>
                          <li>Trỏ về từ chân trang (Footer) của toàn bộ hệ thống website.</li>
                          <li>Trỏ về từ cuối mỗi bài viết tin tức/kiến thức thông qua hộp Author Box.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT TEAM CHECKLIST */}
                  <div className="p-5 bg-stone-50 rounded-lg border border-stone-200">
                    <h4 className="font-display font-bold text-sm text-stone-900 mb-3 flex items-center gap-1.5 text-amber-700">
                      <CheckCircle size={16} />
                      SEO Content Editor Checklist:
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Đảm bảo 100% hồ sơ chuyên gia là thật, kèm ảnh văn phòng chụp thực tế tại PGS Agency (tránh dùng ảnh stock quá đại trà).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Mỗi chuyên gia bắt buộc phải được dẫn link tới tối thiểu 2 bài viết phân tích sâu do chính họ chắp bút hoặc đóng vai trò đồng biên soạn.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Tối ưu hóa thẻ Alt của toàn bộ ảnh chân dung chuyên gia theo cấu trúc: <code>[Họ tên] - [Chức vụ] PGS Agency</code>.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              )}

              {/* SUBTAB CONTENT 2: DESIGNER SPECS */}
              {activeHandoffSubTab === 'design' && (
                <div className="space-y-8 bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
                  
                  {/* Style Guide Definitions */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-4">Hệ thống Thẩm mỹ (Light Premium Consulting Design System)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                      
                      <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                        <span className="font-bold text-stone-800 uppercase tracking-widest text-[10px] block">Màu Nền Chính (Backgrounds)</span>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#FAF9F5] border border-stone-200"></span>
                            <span>Ivory Light: <code>#FAF9F5</code> (90%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-white border border-stone-200"></span>
                            <span>Pure White: <code>#FFFFFF</code> (Thẻ/Cards)</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                        <span className="font-bold text-stone-800 uppercase tracking-widest text-[10px] block">Màu Nhấn (Accents)</span>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#D4AF37]"></span>
                            <span>Premium Gold: <code>#D4AF37</code></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#bd972a]"></span>
                            <span>Gold Deep: <code>#BD972A</code></span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                        <span className="font-bold text-stone-800 uppercase tracking-widest text-[10px] block">Typography pairing</span>
                        <div className="space-y-1">
                          <p><strong>Display Font:</strong> Space Grotesk</p>
                          <p className="text-stone-500">Dùng cho tiêu đề lớn, chỉ số dữ liệu tăng tính độc bản.</p>
                          <p><strong>Body Font:</strong> Inter</p>
                          <p className="text-stone-500">Dùng cho khối văn bản nội dung, dễ đọc, dễ scan.</p>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                        <span className="font-bold text-stone-800 uppercase tracking-widest text-[10px] block">Định vị hình ảnh (3D Style)</span>
                        <div className="space-y-1 text-stone-500">
                          <p>• Object 3D sáng: White glass, Gold Metallic, Chrome mờ.</p>
                          <p>• Card tilt 3D nhẹ khi di chuột.</p>
                          <p>• Tránh dùng ảnh mờ, tối hoặc gradient neon rực rỡ.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* UI Layout Specifications */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-4">Hướng dẫn bố cục Wireframe & Grid (Figma specs)</h3>
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-200 text-xs space-y-4">
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-stone-800">1. Hero Section Layout</h4>
                          <p className="text-stone-500 mt-1 leading-relaxed">
                            Cấu trúc chia cột 5:7 trên màn hình Desktop. 5 phần bên trái chứa cụm text H1 + Sub + CTA, 7 phần bên phải chứa khu vực “Strategy Command Table” mô phỏng 3D rực rỡ nhưng nền sáng tinh tế.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-800">2. Grid Đội Ngũ</h4>
                          <p className="text-stone-500 mt-1 leading-relaxed">
                            Grid 3 cột chuẩn mực. Khoảng cách (gap) tối ưu 24px. Khi xuống thiết bị máy tính bảng co về 2 cột, thiết bị di động xếp chồng 1 cột. Tỷ lệ thẻ chân dung chuyên gia đạt 1:1 đối xứng.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-800">3. FAQ & Form Chuyển Đổi</h4>
                          <p className="text-stone-500 mt-1 leading-relaxed">
                            Cấu trúc chia đều 50/50 ở chân trang. Bên trái là bộ Accordion thanh lịch tựa sách, bên phải là form đăng ký hộp nổi (Card Elevation 4dp) viền chỉ nhạt màu Gold.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* DESIGNER ACTION CHECKLIST */}
                  <div className="p-5 bg-amber-500/5 rounded-lg border border-amber-500/10">
                    <h4 className="font-display font-bold text-sm text-amber-800 mb-3 flex items-center gap-1.5">
                      <CheckCircle size={16} />
                      UX/UI Designer Action Checklist:
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Sử dụng bóng đổ mềm mại (mờ 30px, độ đậm shadow chỉ 2-3%) cho các khối trắng để tạo cảm giác sang trọng nổi lên từ nền ngà.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Đảm bảo tỷ lệ tương phản màu chữ chính (Deep Charcoal #1C1917) và nền tối thiểu đạt chuẩn WCAG AA (&gt; 4.5:1).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Thiết kế riêng trạng thái Hover trạng thái nổi của nút (Scale lên 102%, tỏa nhẹ viền vàng gold rực).</span>
                      </li>
                    </ul>
                  </div>

                </div>
              )}

              {/* SUBTAB CONTENT 3: DEVELOPER SPECIFICATIONS */}
              {activeHandoffSubTab === 'dev' && (
                <div className="space-y-8 bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
                  
                  {/* Framework and tech stack details */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-4">Thông số kỹ thuật phía lập trình (Frontend Developer Guidelines)</h3>
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-200 text-xs space-y-3">
                      <p><strong>Cơ chế Render:</strong> Next.js App Router (Hỗ trợ Server Components làm mặc định cho SEO và Client Components ở các nút bấm tương tác).</p>
                      <p><strong>Thư viện chuyển động:</strong> Framer Motion (Import từ <code>motion/react</code>). Thiết lập cơ chế chống giật lag và prefers-reduced-motion.</p>
                      <p><strong>Thư viện Icon:</strong> <code>lucide-react</code> (Không tự ý vẽ SVG tùy tiện, tối ưu hóa kích thước bundle).</p>
                    </div>
                  </div>

                  {/* Code Block detailing the Motion Config */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 mb-3 flex items-center gap-2">
                      <FileCode size={16} className="text-amber-500" />
                      Mẫu code cấu hình chuyển động mượt mà (Framer Motion specs)
                    </h3>
                    <pre className="bg-stone-950 text-stone-300 font-mono text-[10px] rounded-lg p-5 overflow-x-auto leading-relaxed">
{`import { motion } from 'motion/react';

// Cấu hình giảm hiệu ứng chuyển động cho người dùng nhạy cảm
const userPrefersReduced = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

const transitionSetting = userPrefersReduced 
  ? { duration: 0 } 
  : { type: "spring", stiffness: 100, damping: 15 };

export function PremiumCard({ children }) {
  return (
    <motion.div
      whileHover={userPrefersReduced ? {} : { 
        y: -6, 
        scale: 1.01,
        boxShadow: "0 20px 40px -15px rgba(212, 175, 55, 0.15)"
      }}
      transition={transitionSetting}
      className="bg-white border border-stone-200 rounded-xl p-6"
    >
      {children}
    </motion.div>
  );
}`}
                    </pre>
                  </div>

                  {/* DEVELOPER ACTION CHECKLIST */}
                  <div className="p-5 bg-amber-500/5 rounded-lg border border-amber-500/10">
                    <h4 className="font-display font-bold text-sm text-amber-800 mb-3 flex items-center gap-1.5">
                      <CheckCircle size={16} />
                      Developer Implementation Checklist:
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Cài đặt Lazy loading cho toàn bộ cụm ảnh hậu trường ở phía cuối trang để tối ưu chỉ số Core Web Vitals (LCP).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Thiết lập thuộc tính <code>aria-expanded</code> cho accordion FAQ để hỗ trợ trình đọc màn hình tốt hơn cho người khiếm thị (A11y compliance).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">✔</span>
                        <span>Đảm bảo form intake có gắn tracking Google Analytics event <code>generate_lead</code> khi điền thành công để Account theo dõi.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER OF WORKSPACE */}
      

    </div>
  );
}

// ==========================================
// STATIC SCHEMAS MOCKS FOR HANDOFF COPYING
// ==========================================

const personSchemaSample = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://pgs.agency/authors/son-pham",
  "name": "Phạm Gia Sơn",
  "jobTitle": "Founder & Strategy Director",
  "worksFor": {
    "@type": "Organization",
    "name": "PGS Agency",
    "url": "https://pgs.agency"
  },
  "url": "https://pgs.agency/gioi-thieu/doi-ngu-chuyen-gia/",
  "image": "https://pgs.agency/assets/images/son-pham.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/sonpham-pgs",
    "https://www.facebook.com/sonpham.pgs"
  ],
  "knowsAbout": [
    "Digital Marketing Strategy",
    "Conversion Rate Optimization",
    "Growth Hacking",
    "Business Scaling"
  ],
  "description": "Chuyên gia với 12+ năm kinh nghiệm hoạch định phân bổ chiến dịch marketing tổng thể đa nền tảng cho SME."
};

const faqSchemaSample = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Dự án của tôi khi triển khai tại PGS sẽ do ai phụ trách chính?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mỗi dự án tại PGS sẽ được điều phối trực tiếp bởi 1 Account Manager (quản lý tiến độ, liên lạc 24/7) và được dẫn dắt chuyên môn bởi Strategy Lead cùng đội ngũ chuyên gia giàu kinh nghiệm (SEO Specialist, Ads Specialist, UX/UI Designer...)."
      }
    },
    {
      "@type": "Question",
      "name": "PGS Agency có cam kết doanh số không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PGS cam kết về các chỉ số dẫn dắt tăng trưởng thực tế như: Số lượng Lead chất lượng cao, Organic Traffic, Chỉ số CPA/CPL tối ưu và Tỷ lệ chuyển đổi trang đích (CR). Chúng tôi không cam kết doanh số bán hàng cuối vì phụ thuộc vào chất lượng sale, chăm sóc khách hàng của doanh nghiệp."
      }
    }
  ]
};
