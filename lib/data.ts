export interface Author {
  name: string;
  role: string;
  avatar: string;
  verified: boolean;
  credentials: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  author: Author;
  date: string;
  readTime: string;
  views: number;
  isFeatured: boolean;
  tags: string[];
  keyTakeaway: string;
  outline: string[];
  content?: string;
  isPillar?: boolean;
}

export const AUTHORS: Record<string, Author> = {
  pham_gia_sang: {
    name: "Phạm Gia Sáng",
    role: "Founder & Creative Strategy Director @ PGS Agency",
    avatar: "https://picsum.photos/seed/sang/150/150",
    verified: true,
    credentials: [
      "12+ năm kinh nghiệm tư vấn Chiến lược Marketing Tổng thể",
      "Cựu Giám đốc Marketing chuỗi bán lẻ quốc tế",
      "Chứng chỉ chuyên sâu Google Ads Certified & Facebook Blueprint Practitioner"
    ]
  },
  le_hoang_minh: {
    name: "Lê Hoàng Minh",
    role: "SEO Specialist & Technical Leader",
    avatar: "https://picsum.photos/seed/minh/150/150",
    verified: true,
    credentials: [
      "8+ năm chinh chiến các dự án SEO triệu traffic lĩnh vực Bất Động Sản, Dược phẩm",
      "Chuyên gia tối ưu cấu trúc dữ liệu và kỹ thuật Entity SEO",
      "Chuyên gia Tối ưu hóa Tìm kiếm AI (GEO/AIO)"
    ]
  },
  tran_khanh_vy: {
    name: "Trần Khánh Vy",
    role: "Content Director & Brand Strategist",
    avatar: "https://picsum.photos/seed/vy/150/150",
    verified: true,
    credentials: [
      "7+ năm phát triển chiến lược content đa kênh",
      "Từng định vị thương hiệu cho hơn 50+ startup Việt Nam",
      "Giảng viên thỉnh giảng Content Marketing tại các học viện số"
    ]
  }
};

export const ARTICLES: Article[] = [
  // FEATURED PILLAR ARTICLE
  {
    id: "pillar-marketing-tong-the",
    title: "Hướng dẫn xây dựng Hệ thống Marketing Tổng thể toàn diện bứt phá Doanh thu cho Doanh nghiệp vừa và nhỏ",
    slug: "huong-dan-he-thong-marketing-tong-the",
    category: "Marketing tổng thể",
    description: "Marketing không phải là những chiến dịch rời rạc. Bản hướng dẫn thực chiến này giúp CEO thấu hiểu cách liên kết Website, SEO, Quảng cáo đa kênh và CRO thành một cỗ máy tăng trưởng bền vững, tối ưu hóa chi phí thu hút khách hàng tiềm năng.",
    author: AUTHORS.pham_gia_sang,
    date: "12/06/2026",
    readTime: "15 phút đọc",
    views: 4890,
    isFeatured: true,
    isPillar: true,
    tags: ["Marketing Tổng thể", "Chiến lược tăng trưởng", "Tối ưu chi phí", "Hệ thống số"],
    keyTakeaway: "Đừng đốt tiền quảng cáo khi phễu chuyển đổi bị rò rỉ. Xây dựng hệ thống tiếp thị đa kênh có tính nhất quán về mặt thông điệp và đo lường dữ liệu chuẩn xác là con đường duy nhất dẫn tới tăng trưởng lợi nhuận bền vững.",
    outline: [
      "Bản chất cốt lõi của Hệ thống Marketing Tổng thể",
      "Tại sao 80% doanh nghiệp thất bại khi làm tiếp thị rời rạc?",
      "Quy trình 5 bước xây dựng hệ thống tăng trưởng PGS Framework",
      "Tối ưu hóa phễu chuyển đổi & chỉ số CAC, LTV",
      "Kế hoạch phân bổ ngân sách tối ưu theo từng giai đoạn"
    ]
  },
  
  // SEO CLUSTER
  {
    id: "seo-tong-the-la-gi",
    title: "SEO Tổng Thể Là Gì? Tại Sao Nên Chọn SEO Tổng Thể Thay Vì SEO Từ Khóa Ngắn?",
    slug: "seo-tong-the-la-gi",
    category: "SEO tổng thể",
    description: "Khám phá chiến lược SEO phủ toàn thị trường ngách giúp website thu hút hàng trăm nghìn lượt truy cập tự nhiên, tăng uy tín thương hiệu và chuyển đổi khách hàng bền vững nhất.",
    author: AUTHORS.le_hoang_minh,
    date: "18/06/2026",
    readTime: "8 phút đọc",
    views: 2450,
    isFeatured: false,
    tags: ["SEO tổng thể", "Chiến lược SEO", "SEO Website", "Inbound Marketing"],
    keyTakeaway: "SEO tổng thể xây dựng nền móng bền vững cho toàn bộ cấu trúc nội dung, bao phủ trọn vẹn hành trình khách hàng thay vì chỉ tập trung vào một vài từ khóa hot mang tính cạnh tranh cao nhưng chuyển đổi thấp.",
    outline: [
      "Định nghĩa chuẩn về SEO tổng thể",
      "Bảng so sánh: SEO Tổng thể vs SEO Từ khóa ngắn",
      "Lợi ích dài hạn đối với doanh thu doanh nghiệp",
      "Cách xác định bộ từ khóa phủ toàn ngành"
    ]
  },
  {
    id: "quy-trinh-seo",
    title: "Quy Trình SEO 10 Bước Chuẩn Quốc Tế Thúc Đẩy Doanh Số Vượt Bậc",
    slug: "quy-trinh-seo-chuan-quoc-te",
    category: "SEO tổng thể",
    description: "Khám phá quy trình SEO bài bản được áp dụng tại PGS Agency, từ bước nghiên cứu insight khách hàng đến audit kỹ thuật, tối ưu hóa onpage, offpage và cấu trúc Entity.",
    author: AUTHORS.le_hoang_minh,
    date: "14/06/2026",
    readTime: "10 phút đọc",
    views: 1820,
    isFeatured: false,
    tags: ["Quy trình SEO", "Kỹ thuật SEO", "Audit Website", "PGS Framework"],
    keyTakeaway: "Quy trình SEO hiệu quả bắt đầu từ thấu hiểu khách hàng chứ không phải thuật toán công cụ tìm kiếm. Từng bước cần đo lường bằng số liệu cụ thể.",
    outline: [
      "Nghiên cứu đối thủ và hành vi tìm kiếm",
      "Technical Audit và tối ưu tốc độ tải trang",
      "Sáng tạo nội dung hữu ích chuẩn EEAT",
      "Xây dựng mạng lưới liên kết & Entity đồng bộ"
    ]
  },
  {
    id: "chi-phi-seo",
    title: "Bảng Giá SEO Tổng Thể 2026: Đầu Tư Thế Nào Để Tránh Lãng Phí Ngân Sách?",
    slug: "chi-phi-seo-tong-the",
    category: "SEO tổng thể",
    description: "Chi phí làm SEO bao nhiêu là hợp lý? Làm thế nào để tính toán ROI trong SEO và lựa chọn gói dịch vụ tối ưu nhất cho từng mô hình doanh nghiệp B2B và B2C.",
    author: AUTHORS.pham_gia_sang,
    date: "22/05/2026",
    readTime: "7 phút đọc",
    views: 3100,
    isFeatured: false,
    tags: ["Chi phí SEO", "Báo giá SEO", "Đầu tư Marketing", "ROI SEO"],
    keyTakeaway: "Hãy nhìn nhận SEO như một tài sản tích sản tăng giá trị theo thời gian, không phải là chi phí tiêu hao ngắn hạn. ROI của SEO sẽ tăng vọt sau tháng thứ 6-9.",
    outline: [
      "Các yếu tố cấu thành chi phí một dự án SEO",
      "Cách tính toán điểm hòa vốn và ROI của chiến dịch SEO",
      "Tiêu chí lựa chọn Agency SEO uy tín"
    ]
  },
  {
    id: "seo-eeat-framework",
    title: "Ứng dụng Mô hình EEAT của Google để đột phá Thứ hạng Website ngành Tài chính & Y tế",
    slug: "ung-dung-eeat-google",
    category: "SEO tổng thể",
    description: "Tìm hiểu cách tối ưu hóa các tín hiệu về Trải nghiệm (E), Tính Chuyên môn (E), Tính Thẩm quyền (A) và Độ Uy tín (T) để bảo vệ website trước các đợt cập nhật lõi của Google.",
    author: AUTHORS.le_hoang_minh,
    date: "25/06/2026",
    readTime: "9 phút đọc",
    views: 1280,
    isFeatured: false,
    tags: ["EEAT Google", "Helpful Content", "SEO YMYL", "Tối ưu thực thể"],
    keyTakeaway: "Độ tin cậy (Trust) là lõi của EEAT. Hãy minh bạch về tác giả, quy trình kiểm duyệt bài viết và liên kết với các nguồn tham khảo có thẩm quyền cao.",
    outline: [
      "Hiểu đúng về thuật ngữ YMYL và EEAT",
      "Thiết lập hồ sơ tác giả (Author Entity) chuẩn hóa",
      "Quy trình xây dựng tài liệu tham khảo khoa học",
      "Các lỗi EEAT phổ biến làm rớt top website"
    ]
  },

  // WEBSITE CLUSTER
  {
    id: "website-chuan-seo",
    title: "Tiêu Chí Đánh Giá Website Chuẩn SEO & Trải Nghiệm Người Dùng (UX) Đạt Chuẩn 2026",
    slug: "website-chuan-seo-ux",
    category: "Website & CRO",
    description: "Một website đẹp mắt là chưa đủ. Tìm hiểu các tiêu chuẩn kỹ thuật về Core Web Vitals, Responsive Design, cấu trúc Silo và khả năng chuyển đổi người dùng thành Lead thực tế.",
    author: AUTHORS.pham_gia_sang,
    date: "28/06/2026",
    readTime: "9 phút đọc",
    views: 1640,
    isFeatured: false,
    tags: ["Website chuẩn SEO", "UX UI Design", "Core Web Vitals", "Cấu trúc Silo"],
    keyTakeaway: "Thiết kế website là thiết kế phễu bán hàng. Từng nút bấm, khoảng trắng, menu đều phải phục vụ mục tiêu hướng dẫn người dùng thực hiện hành vi chuyển đổi.",
    outline: [
      "Core Web Vitals thế hệ mới (INP, LCP, CLS)",
      "Cấu trúc thư mục chuẩn Silo giúp Google bot lập chỉ mục dễ dàng",
      "Thiết kế thân thiện với thiết bị di động (Mobile-First)",
      "Tích hợp các cổng thanh toán và biểu mẫu liên hệ tối ưu"
    ]
  },
  {
    id: "chi-phi-thiet-ke-web",
    title: "Chi phí Thiết kế Website Doanh nghiệp: Tránh Bẫy Web Giá Rẻ Kém Chất Lượng",
    slug: "chi-phi-thiet-ke-web",
    category: "Website & CRO",
    description: "Phân tích chi tiết ngân sách thiết kế website từ nền tảng WordPress, custom code đến các framework hiện đại. Tại sao web 2-3 triệu thường mang lại rủi ro bảo mật và không thể SEO.",
    author: AUTHORS.pham_gia_sang,
    date: "10/05/2026",
    readTime: "8 phút đọc",
    views: 2200,
    isFeatured: false,
    tags: ["Chi phí Website", "Thiết kế Web", "Bảo mật website", "Đầu tư website"],
    keyTakeaway: "Website giá rẻ thường đi kèm mã nguồn rác, không được tối ưu bảo mật và SEO. Đầu tư đúng mức từ đầu giúp tiết kiệm gấp 5 lần chi phí sửa chữa và tối ưu sau này.",
    outline: [
      "Sự thật về các gói thiết kế web giá rẻ",
      "Các khoản chi phí ẩn cần lưu ý (Hosting, Domain, Security, Maintenance)",
      "Lựa chọn công nghệ thiết kế web phù hợp quy mô doanh nghiệp"
    ]
  },
  {
    id: "landing-page-cro",
    title: "Tối Ưu Tỷ Lệ Chuyển Đổi (CRO) Trên Landing Page: Công Thức Tạo Ra Trang Đích 'Nghìn Đơn'",
    slug: "landing-page-cro",
    category: "Website & CRO",
    description: "Áp dụng tâm lý học hành vi, cấu trúc AIDA, thiết kế visual hierarchy và viết micro-copy bứt phá tỷ lệ đăng ký thông tin khách hàng từ 2% lên 8%.",
    author: AUTHORS.tran_khanh_vy,
    date: "05/06/2026",
    readTime: "7 phút đọc",
    views: 1950,
    isFeatured: false,
    tags: ["Landing Page", "CRO", "A/B Testing", "Tâm lý khách hàng"],
    keyTakeaway: "Landing page thành công là trang giải quyết được 1 nỗi đau duy nhất, đưa ra 1 giải pháp duy nhất và kêu gọi 1 hành động duy nhất.",
    outline: [
      "Mô hình tâm lý học thuyết phục BJ Fogg áp dụng vào CRO",
      "Cấu trúc chuẩn của một Landing Page chuyển đổi cao",
      "Nghệ thuật viết tiêu đề (Hero Headline) giữ chân người đọc trong 3 giây",
      "Thiết kế biểu mẫu đăng ký tối giản, triệt tiêu ma sát"
    ]
  },
  {
    id: "tracking-du-lieu-marketing",
    title: "Tích Hợp Hệ Thống Tracking Đo Lường Dữ Liệu Marketing Đa Kênh Chuẩn Xác",
    slug: "tracking-du-lieu-marketing",
    category: "Website & CRO",
    description: "Hướng dẫn cài đặt Google Analytics 4 (GA4), Google Tag Manager (GTM), Facebook Pixel để theo dõi chính xác nguồn chuyển đổi, tránh lãng phí ngân sách quảng cáo.",
    author: AUTHORS.le_hoang_minh,
    date: "19/06/2026",
    readTime: "11 phút đọc",
    views: 1150,
    isFeatured: false,
    tags: ["Tracking dữ liệu", "GA4", "GTM", "Marketing Analytics"],
    keyTakeaway: "Nếu bạn không thể đo lường nó, bạn không thể tối ưu hóa nó. Thiết lập tracking giúp doanh nghiệp biết rõ 1 đồng quảng cáo chi ra đem về bao nhiêu doanh thu.",
    outline: [
      "Tại sao dữ liệu lệch giữa Facebook Ads và Google Analytics?",
      "Quy trình triển khai Server-side Tracking vượt qua rào cản iOS 14+",
      "Xây dựng Dashboard báo cáo tự động hóa bằng Looker Studio"
    ]
  },

  // ADS CLUSTER
  {
    id: "google-ads-chuyen-sau",
    title: "Tối Ưu Chiến Dịch Google Search & Performance Max (PMax) Bứt Phá Lead Cho Doanh Nghiệp B2B",
    slug: "toi-uu-google-ads-pmax",
    category: "Google Ads",
    description: "Phương pháp nhắm mục tiêu chính xác, loại trừ click ảo tặc, tối ưu hóa điểm chất lượng và thiết lập chiến lược đấu thầu Smart Bidding mang lại hiệu quả cao.",
    author: AUTHORS.pham_gia_sang,
    date: "27/06/2026",
    readTime: "9 phút đọc",
    views: 2750,
    isFeatured: false,
    tags: ["Google Ads", "Performance Max", "Smart Bidding", "B2B Marketing"],
    keyTakeaway: "PMax hoạt động dựa trên dữ liệu. Cung cấp tín hiệu khách hàng chất lượng cao (Customer Match) và tối ưu hóa tài nguyên sáng tạo là chìa khóa chiến thắng.",
    outline: [
      "Nguyên lý hoạt động của chiến dịch Google Performance Max",
      "Cách viết mẫu quảng cáo thích ứng (RSA) thu hút CTR cao",
      "Chiến thuật kiểm soát ngân sách, ngăn chặn lãng phí tiền quảng cáo",
      "Kỹ thuật loại bỏ từ khóa phủ định sát sườn"
    ]
  },
  {
    id: "facebook-ads-vietnam-2026",
    title: "Bí quyết Chạy Quảng Cáo Facebook Ads Vượt Qua Cơn Bão Bão Tài Khoản & Tối Ưu CPL",
    slug: "facebook-ads-toi-uu-cpl",
    category: "Facebook Ads",
    description: "Làm thế nào để xây dựng dàn tài nguyên quảng cáo bền vững, tối ưu hóa tệp đối tượng tùy chỉnh (Custom Audience) và triển khai chiến dịch định dạng Reels hấp dẫn chuyển đổi tốt.",
    author: AUTHORS.pham_gia_sang,
    date: "23/06/2026",
    readTime: "8 phút đọc",
    views: 3400,
    isFeatured: false,
    tags: ["Facebook Ads", "Tối ưu CPL", "Dàn tài nguyên quảng cáo", "Facebook Reels"],
    keyTakeaway: "Thuật toán Facebook ngày càng hướng tới tự động hóa (Advantage+ Shopping). Khâu cốt lõi phân định thắng thua chính là chất lượng kịch bản hình ảnh và video sáng tạo.",
    outline: [
      "Xây dựng hệ thống tài khoản quảng cáo kháng nghị chuyên nghiệp",
      "Thử nghiệm phân tách (A/B Test) kịch bản video ngắn",
      "Tối ưu chi phí trên mỗi Lead (CPL) bằng phễu Messenger Automation"
    ]
  },
  {
    id: "tiktok-ads-xu-huong",
    title: "TikTok Ads 2026: Xây Dựng Kịch Bản Video Triệu View Ra Đơn Trực Tiếp Lập Tức",
    slug: "tiktok-ads-kich-ban-ra-don",
    category: "TikTok Ads",
    description: "Hướng dẫn cấu trúc kịch bản video ngắn 3-15-30 giây thu hút người xem tức thì, ứng dụng Spark Ads thúc đẩy doanh số bán hàng trên TikTok Shop và Landing Page hiệu quả nhất.",
    author: AUTHORS.tran_khanh_vy,
    date: "11/06/2026",
    readTime: "8 phút đọc",
    views: 2980,
    isFeatured: false,
    tags: ["TikTok Ads", "Kịch bản video", "TikTok Shop", "Spark Ads"],
    keyTakeaway: "Trên TikTok, đừng làm quảng cáo, hãy làm những video giải trí hữu ích. Người dùng chỉ mua hàng khi họ bị lôi cuốn bởi nội dung chân thực.",
    outline: [
      "Công thức vàng 3 giây đầu giữ chân người dùng không lướt qua",
      "Tối ưu hóa phễu chuyển đổi từ video sang giỏ hàng/landing page",
      "Hợp tác với KOC/KOL hiệu quả qua TikTok Creator Marketplace"
    ]
  },

  // CONTENT & SOCIAL CLUSTER
  {
    id: "content-seo-chuan-helpful-content",
    title: "Cách Viết Bài Content SEO Chuẩn 'Helpful Content' Google 2026 Không Lo Bị Đánh Phạt",
    slug: "content-seo-helpful-content",
    category: "Content Marketing",
    description: "Google đánh giá cực cao những bài viết mang lại giá trị thực tế cho người đọc. Hãy học cách viết nội dung có chiều sâu, kết hợp nghiên cứu thực tiễn và cấu trúc bài dễ đọc.",
    author: AUTHORS.tran_khanh_vy,
    date: "29/06/2026",
    readTime: "9 phút đọc",
    views: 2100,
    isFeatured: false,
    tags: ["Content SEO", "Helpful Content", "Sáng tạo nội dung", "Copywriting"],
    keyTakeaway: "Hãy viết bài cho con người đọc trước, sau đó tối ưu cho bộ máy tìm kiếm của Google sau. Bài viết càng chi tiết, có dữ liệu phân tích thực tế càng dễ lên top bền vững.",
    outline: [
      "Tiêu chuẩn Helpful Content System mới nhất của Google",
      "Quy trình nghiên cứu ý định tìm kiếm sâu sắc",
      "Cách lồng ghép nghiên cứu tình huống (Case Study) vào bài viết",
      "Sử dụng AI hỗ trợ lên dàn bài nhưng giữ giọng văn con người độc bản"
    ]
  },
  {
    id: "xay-dung-kenh-tiktok-thuong-hieu",
    title: "Chiến Lược Xây Dựng Kênh TikTok Thương Hiệu Từ Con Số 0 Lên Doanh Số Tỷ Đồng",
    slug: "xay-dung-kenh-tiktok-doanh-nghiep",
    category: "Social Media",
    description: "Định vị kênh, lên kế hoạch content pillar, quy trình sản xuất video ngắn tốc độ và chuyển hóa lượng người theo dõi trung thành thành khách hàng mua hàng thực tế.",
    author: AUTHORS.tran_khanh_vy,
    date: "21/06/2026",
    readTime: "10 phút đọc",
    views: 3150,
    isFeatured: false,
    tags: ["Xây kênh TikTok", "Thương hiệu số", "Sản xuất video", "Social Growth"],
    keyTakeaway: "Đừng xây dựng kênh TikTok chỉ để giải trí vô thưởng vô phạt. Hãy định vị rõ chân dung khách hàng mục tiêu để tạo ra các chủ đề nội dung có tính chất chuyển đổi cao.",
    outline: [
      "Lựa chọn 1 trong 4 hình thức định vị thương hiệu trên TikTok",
      "Quy trình sản xuất 15 video ngắn chất lượng cao chỉ trong 1 ngày",
      "Chiến thuật thúc đẩy tương tác và xử lý khủng hoảng truyền thông"
    ]
  },

  // AI SEARCH CLUSTER (AIO / GEO)
  {
    id: "ai-search-optimization-aio",
    title: "AI Search Optimization (GEO) Là Gì? Đón Đầu Xu Hướng Tìm Kiếm Bằng Trí Tuệ Nhân Tạo 2026",
    slug: "ai-search-optimization-geo",
    category: "AI Search",
    description: "Khám phá cách tối ưu hóa nội dung website để xuất hiện trong kết quả trả lời trực tiếp của Google AI Overviews, Gemini, ChatGPT và Perplexity. Chuyển dịch từ SEO truyền thống sang GEO.",
    author: AUTHORS.le_hoang_minh,
    date: "30/06/2026",
    readTime: "12 phút đọc",
    views: 4210,
    isFeatured: false,
    tags: ["AI Search", "GEO", "AI Overviews", "ChatGPT Search", "Entity SEO"],
    keyTakeaway: "AI Search không tìm kiếm từ khóa độc lập, nó tìm kiếm câu trả lời toàn diện nhất từ nguồn uy tín có thực thể (Entity) rõ ràng. GEO là tương lai của SEO.",
    outline: [
      "GEO (Generative Engine Optimization) là gì?",
      "Cách AI trích xuất và tổng hợp thông tin từ website",
      "Chiến thuật tối ưu hóa câu trả lời trực tiếp, định nghĩa cô đọng",
      "Tầm quan trọng của trích dẫn nguồn uy tín và thống kê cụ thể"
    ]
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Bài viết trên PGS Knowledge Hub do ai biên soạn?",
    answer: "Tất cả bài viết được trực tiếp biên soạn, tổng hợp và kiểm duyệt bởi đội ngũ chuyên gia giàu kinh nghiệm của PGS Agency, dẫn đầu bởi các Trưởng bộ phận Chiến lược, SEO Specialist, Content Director. Chúng tôi tuyệt đối nói không với việc sao chép hoặc xào xáo nội dung kém chất lượng."
  },
  {
    question: "Kiến thức trên website được cập nhật tần suất như thế nào?",
    answer: "Hệ thống tri thức được cập nhật liên tục hàng tuần, đặc biệt là các thay đổi về thuật toán Google SEO, cập nhật tính năng quảng cáo Google/Facebook/TikTok và các xu hướng công nghệ mới như AI Search (AIO) để doanh nghiệp luôn đón đầu xu hướng thị trường."
  },
  {
    question: "Các bài viết có đi kèm nguồn tham khảo uy tín không?",
    answer: "Có. Nhằm đảm bảo tính chính xác khoa học và tuân thủ chặt chẽ nguyên lý EEAT của Google, các bài viết của chúng tôi luôn đi kèm số liệu thực tiễn từ các dự án đã triển khai thành công tại PGS Agency, hoặc dẫn link trực tiếp tới các tài liệu chính thống của Google, Meta, TikTok, HubSpot, SEMrush."
  },
  {
    question: "PGS Agency có sử dụng AI (như ChatGPT, Gemini) để viết bài không?",
    answer: "Tại PGS Agency, chúng tôi ứng dụng AI một cách thông minh để hỗ trợ nghiên cứu từ khóa, tối ưu thẻ meta hoặc lên khung sườn (outline) ban đầu. Tuy nhiên, toàn bộ nội dung bài viết chuyên sâu, phân tích case study và văn phong tư vấn đều được viết 100% bằng trí tuệ, kinh nghiệm thực chiến của con người để bảo đảm tính cá nhân hóa cao nhất và chiều sâu trải nghiệm."
  },
  {
    question: "Doanh nghiệp của tôi có thể nhận tư vấn chiến lược dựa trên các kiến thức này không?",
    answer: "Hoàn toàn được. Nếu doanh nghiệp của bạn thấy các kiến thức này phù hợp và muốn áp dụng thực tế vào mô hình kinh doanh của mình, bạn có thể click vào nút 'Nhận Tư Vấn Chiến Lược' ở giữa hoặc cuối trang. Đội ngũ chuyên gia của PGS Agency sẽ tiến hành nghiên cứu sâu sắc về thương hiệu, đối thủ cạnh tranh của bạn và thiết kế một bản chiến lược Marketing tổng thể hoàn toàn miễn phí."
  }
];
