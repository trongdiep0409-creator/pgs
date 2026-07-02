import { 
  PainPoint, 
  TimelineMilestone, 
  ComparisonRow, 
  OrbitNode, 
  CoreValue, 
  ProcessStep, 
  ExpertRole, 
  FAQItem 
} from '@/types';

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "rời-rạc",
    title: "Marketing Rời Rạc & Thiếu Nhất Quán",
    desc: "Doanh nghiệp phải thuê quá nhiều cá nhân hoặc đơn vị nhỏ lẻ làm từng mảng riêng biệt: một bên viết Content, một bên chạy Ads, một bên code Web. Kết quả là thông điệp lệch pha, không có sự phối hợp.",
    consequence: "Hệ quả: Lãng phí 40-50% ngân sách marketing do giẫm chân lên nhau, thiếu một đầu mối chịu trách nhiệm toàn diện.",
    iconName: "Share2"
  },
  {
    id: "web-chet",
    title: "Website Chỉ Làm Cảnh, Không Tạo Ra Lead",
    desc: "Đầu tư hàng chục triệu thiết kế website nhưng trang web chỉ đóng vai trò như một 'brochure chết' trên internet. Không chuẩn SEO, tốc độ tải trang chậm, không có luồng phễu thu thập thông tin khách hàng.",
    consequence: "Hệ quả: Tỷ lệ thoát (Bounce Rate) vượt ngưỡng 85%, lãng phí toàn bộ lượng truy cập tiềm năng.",
    iconName: "Globe"
  },
  {
    id: "ads-mu",
    title: "Chạy Ads 'Mù', Thiếu Đo Lường Dữ Liệu",
    desc: "Đốt tiền vào Google Ads, Facebook Ads hay TikTok Ads nhưng chỉ nhìn vào số lượt Click, lượt Like ảo. Không thiết lập mã theo dõi chuyển đổi (conversion tracking), không biết đơn hàng thực tế đến từ từ khóa nào.",
    consequence: "Hệ quả: Đóng ngân sách thì mất khách, tăng ngân sách thì lỗ vốn nặng vì tối ưu bằng 'cảm giác'.",
    iconName: "TrendingDown"
  },
  {
    id: "content-ao",
    title: "Content Hời Hợt, Không Nuôi Dưỡng Phễu",
    desc: "Bài viết trên Fanpage và Blog rập khuôn, đăng bài chỉ để 'giữ sóng' mà không có chiến lược cụ thể cho từng giai đoạn nhận thức của khách hàng (TOFU - MOFU - BOFU). Thiếu chiều sâu chuyên môn.",
    consequence: "Hệ quả: Khách hàng lướt qua không đọng lại ấn tượng, không xây dựng được uy tín thương hiệu thực tế.",
    iconName: "PenTool"
  },
  {
    id: "social-nhat-nhoa",
    title: "Social Media Nhạt Nhòa & Tự Phát",
    desc: "Xây dựng kênh TikTok, Youtube, Facebook một cách tự phát, bắt trend vô thưởng vô phạt mà không gắn liền với năng lực cốt lõi của doanh nghiệp. Hình ảnh thương hiệu thiếu sự đồng bộ chuyên nghiệp.",
    consequence: "Hệ quả: Có thể có lượt xem nhưng không chuyển đổi thành khách hàng, tốn kém tài nguyên nhân sự.",
    iconName: "Hash"
  },
  {
    id: "gb-bo-hoang",
    title: "Google Business Profile Bị Bỏ Hoang",
    desc: "Địa điểm doanh nghiệp trên Google Maps không chuẩn SEO, không được cập nhật bài viết, hình ảnh văn phòng thực tế hay thiếu các đánh giá (reviews) chất lượng của khách hàng cũ.",
    consequence: "Hệ quả: Đánh mất hoàn toàn 30-40% lượng khách hàng có hành vi tìm kiếm dịch vụ trực tiếp tại địa phương.",
    iconName: "MapPin"
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "2017",
    title: "Khởi Đầu Từ Thực Chiến Kinh Doanh Online",
    subtitle: "Thấu hiểu sâu sắc bài toán dòng tiền & chi phí",
    description: "Những nhà sáng lập PGS khởi nghiệp bằng các dự án kinh doanh thương mại điện tử thực tế. Giai đoạn này giúp chúng tôi thấm thía nỗi đau của việc tự chạy Ads, tự tối ưu Landing Page và quản lý sát sao từng đồng chi phí quảng cáo để đảm bảo có lợi nhuận.",
    achievements: [
      "Vận hành trực tiếp hệ thống bán hàng online đạt mốc 1.000+ đơn hàng/ngày.",
      "Tự thiết kế và tối ưu 50+ Landing Page đạt tỷ lệ chuyển đổi trung bình trên 8%.",
      "Xây dựng tư duy thực chiến: Marketing phải tạo ra doanh thu thực tế."
    ],
    visualType: "online"
  },
  {
    year: "2019",
    title: "Dịch Chuyển Sang Tư Vấn Digital Marketing Độc Lập",
    subtitle: "Tập trung chuẩn hóa phễu chuyển đổi cho SME",
    description: "Nhận thấy hàng trăm doanh nghiệp vừa và nhỏ (SME) đang đốt tiền vô ích vì thiếu chiến lược phễu, đội ngũ sáng lập bắt đầu cung cấp dịch vụ tư vấn độc lập về tối ưu quảng cáo, thiết kế website bán hàng cao cấp và xây dựng hệ thống tracking dữ liệu chuẩn mực.",
    achievements: [
      "Tư vấn tối ưu chiến lược số cho hơn 40 doanh nghiệp vừa và nhỏ tại Hà Nội và TP.HCM.",
      "Tái cấu trúc luồng chuyển đổi website cho các đối tác ngành Bất động sản, Thẩm mỹ và Giáo dục.",
      "Giảm trung bình 30% chi phí trên một lead (CPL) cho các dự án đảm nhiệm."
    ],
    visualType: "digital"
  },
  {
    year: "2022",
    title: "Chính Thức Thành Lập Thương Hiệu PGS Agency",
    subtitle: "Xây dựng chuẩn mực Hệ thống Marketing Tổng thể Đa nền tảng",
    description: "PGS Agency chính thức ra đời với pháp nhân đầy đủ, định vị rõ ràng: Không cung cấp dịch vụ rời rạc mà tập trung kiến tạo Hệ thống tăng trưởng số đồng bộ. Chúng tôi liên kết Website chuẩn CRO, SEO tiêu chuẩn EEAT, Performance Ads đa phễu và Tracking dữ liệu chuẩn xác.",
    achievements: [
      "Chuyển giao thành công 80+ hệ thống marketing tích hợp đa nền tảng.",
      "Phát triển đội ngũ chuyên gia giàu kinh nghiệm, chuyên môn hóa sâu sắc từng vị trí.",
      "Được công nhận là đối tác chính thức (Partner) của Google và Facebook tại Việt Nam."
    ],
    visualType: "agency"
  },
  {
    year: "Tương lai (2026+)",
    title: "Dẫn Đầu Xu Hướng Data Analytics & AI Marketing",
    subtitle: "Đồng hành cùng sự thịnh vượng bền vững của khách hàng",
    description: "PGS Agency tiếp tục nâng cấp hệ thống dịch vụ bằng cách đưa Data Analytics chuyên sâu, Marketing Automation và các giải pháp AI tối ưu nội dung vào quy trình vận hành. Cam kết đồng hành dài hạn và phát triển bền vững cùng doanh nghiệp.",
    achievements: [
      "Ứng dụng 100% Dashboard Realtime tự động hóa báo cáo cho tất cả khách hàng.",
      "Tích hợp AI cá nhân hóa hành trình khách hàng để nâng cao tỷ lệ giữ chân (Retention Rate).",
      "Mục tiêu hỗ trợ 500+ doanh nghiệp Việt Nam xây dựng hệ thống tăng trưởng đạt chuẩn quốc tế."
    ],
    visualType: "future"
  }
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criteria: "Định hướng cốt lõi",
    traditionalAgency: {
      text: "Làm theo task lẻ tẻ (chỉ viết bài, chỉ chạy Ads, chỉ SEO từ khóa đơn lẻ) mà không hiểu bức tranh kinh doanh chung.",
      isPositive: false
    },
    pgsAgency: {
      text: "Xây dựng hệ thống tăng trưởng đồng bộ. Liên kết chặt chẽ mọi mắt xích từ Thương hiệu, Website, SEO, Ads đến Data Tracking.",
      isPositive: true,
      badge: "Tư duy hệ thống"
    }
  },
  {
    criteria: "Tập trung đo lường KPI",
    traditionalAgency: {
      text: "Báo cáo các chỉ số ảo (Vanity Metrics) như Reach, Lượt click, Lượt thích, Lượt xem bài viết... nhưng doanh số vẫn giậm chân tại chỗ.",
      isPositive: false
    },
    pgsAgency: {
      text: "Cam kết chỉ số thực tế: Số Lead chất lượng (CPL), Tỷ lệ chuyển đổi (CR), Doanh thu thực chất và ROI trên ngân sách quảng cáo.",
      isPositive: true,
      badge: "Cam kết hiệu quả"
    }
  },
  {
    criteria: "Minh bạch tài khoản & Ngân sách",
    traditionalAgency: {
      text: "Khách hàng không được giữ tài khoản quảng cáo, chi phí không rõ ràng, báo cáo thủ công qua Excel vào cuối tháng dễ bị xào nấu.",
      isPositive: false
    },
    pgsAgency: {
      text: "Khách hàng sở hữu 100% tài khoản quảng cáo và dữ liệu. Cung cấp Dashboard Realtime xem dữ liệu thực tế trực quan bất kỳ lúc nào.",
      isPositive: true,
      badge: "Minh bạch tuyệt đối"
    }
  },
  {
    criteria: "Phát triển Website",
    traditionalAgency: {
      text: "Chỉ code cho xong giao diện đẹp mắt, bàn giao xong là hết trách nhiệm. Không quan tâm chuẩn SEO, UX/UI nghèo nàn, không tích hợp phễu thu lead.",
      isPositive: false
    },
    pgsAgency: {
      text: "Thiết kế Website chuẩn CRO (Tối ưu tỷ lệ chuyển đổi) cao cấp, chuẩn SEO từ code, tốc độ dưới 2s, tích hợp luồng bắt lead tự động.",
      isPositive: true,
      badge: "Tối ưu CRO"
    }
  },
  {
    criteria: "Chiến lược Content",
    traditionalAgency: {
      text: "Đăng bài rập khuôn theo số lượng cam kết, nội dung copy-paste hời hợt, không đi sâu vào nỗi đau và mong muốn thực tế của khách hàng.",
      isPositive: false
    },
    pgsAgency: {
      text: "Content giá trị cao chuẩn chuyên gia (EEAT). Sáng tạo nội dung bám sát phễu nhận thức của khách hàng, tăng tỷ lệ chuyển đổi tự nhiên.",
      isPositive: true,
      badge: "Content chuyên sâu"
    }
  },
  {
    criteria: "Mối quan hệ hợp tác",
    traditionalAgency: {
      text: "Chỉ là đơn vị gia công dịch vụ (Outsource), hết việc hết giờ là hết trách nhiệm, không chủ động tư vấn cải tiến cho doanh nghiệp.",
      isPositive: false
    },
    pgsAgency: {
      text: "Coi mình là một phòng Marketing thuê ngoài cao cấp. Sẵn sàng ngồi lại cùng CEO bàn chiến lược kinh doanh, tối ưu sản phẩm và vận hành.",
      isPositive: true,
      badge: "Đồng hành dài hạn"
    }
  }
];

export const ORBIT_NODES: OrbitNode[] = [
  {
    id: "website",
    label: "Website CRO",
    description: "Thiết kế Website / Landing Page chuẩn cấu trúc trải nghiệm cao cấp, tối ưu chuyển đổi để giữ chân khách hàng.",
    details: [
      "Thiết kế UX/UI độc bản, sang trọng theo bộ nhận diện.",
      "Tối ưu tốc độ tải trang dưới 2 giây, Mobile-first.",
      "Thiết lập form đăng ký, nút gọi, chat bot trực quan kích thích hành động."
    ],
    icon: "Globe",
    angle: 0,
    color: "#c28b24"
  },
  {
    id: "seo",
    label: "SEO EEAT Comprehensive",
    description: "Đưa website lên top Google bền vững bằng phương pháp SEO tổng thể, tập trung vào trải nghiệm người dùng và uy tín thương hiệu.",
    details: [
      "Nghiên cứu bộ từ khóa phủ toàn bộ phễu nhu cầu khách hàng.",
      "Xây dựng nội dung chuẩn EEAT (Kinh nghiệm, Chuyên môn, Thẩm quyền, Tin cậy).",
      "Tối ưu kỹ thuật SEO On-page và liên kết thực chất."
    ],
    icon: "Search",
    angle: 51.4,
    color: "#b58510"
  },
  {
    id: "ads",
    label: "Performance Ads",
    description: "Quảng cáo đa phễu trên Google, Facebook, TikTok giúp tiếp cận đúng đối tượng khách hàng mục tiêu đang có nhu cầu.",
    details: [
      "Quảng cáo tìm kiếm Google Ads đánh trúng khách hàng có nhu cầu nóng.",
      "Facebook Ads đa dạng định dạng sáng tạo giúp kích thích nhu cầu ẩn giấu.",
      "TikTok Ads dạng video ngắn sáng tạo, bùng nổ tương tác."
    ],
    icon: "Zap",
    angle: 102.8,
    color: "#d4a317"
  },
  {
    id: "content",
    label: "Content Marketing",
    description: "Sáng tạo nội dung chất lượng cao làm gốc rễ cho mọi kênh truyền thông, nâng tầm giá trị thương hiệu.",
    details: [
      "Viết bài PR báo chí, câu chuyện thương hiệu truyền cảm hứng.",
      "Sản xuất bài viết chuyên sâu (Whitepaper, Case Study) tạo uy tín đầu ngành.",
      "Thiết kế hình ảnh banner, infographic trực quan, chuyên nghiệp."
    ],
    icon: "PenTool",
    angle: 154.2,
    color: "#a1701a"
  },
  {
    id: "social",
    label: "Social Media Growth",
    description: "Xây dựng và phát triển cộng đồng thương hiệu trên các nền tảng mạng xã hội lớn nhất.",
    details: [
      "Quản trị Fanpage Facebook, Group cộng đồng chất lượng cao.",
      "Xây dựng kênh TikTok, Reels chuyên nghiệp thu hút hàng triệu lượt xem.",
      "Lập kế hoạch nội dung nhất quán với định vị thương hiệu."
    ],
    icon: "MessageSquare",
    angle: 205.6,
    color: "#c28b24"
  },
  {
    id: "pr",
    label: "PR & Google Business",
    description: "Định vị uy tín doanh nghiệp thông qua báo chí chính thống và tối ưu hóa tìm kiếm địa phương.",
    details: [
      "Booking bài viết PR trên các đầu báo uy tín (VnExpress, Dân Trí, Cafef...).",
      "Tối ưu hóa Google Business Profile (Google Maps) chuẩn SEO địa phương.",
      "Quản lý danh tiếng trực tuyến và seeding thương hiệu tích cực."
    ],
    icon: "Award",
    angle: 257,
    color: "#b58510"
  },
  {
    id: "tracking",
    label: "Advanced Tracking",
    description: "Thiết lập nền tảng đo lường kỹ thuật số chính xác đến từng chuyển đổi nhỏ nhất của khách hàng.",
    details: [
      "Cài đặt Google Analytics 4 (GA4) và Google Tag Manager (GTM).",
      "Thiết lập phễu đo lường hành vi người dùng bằng Heatmap (bản đồ nhiệt).",
      "Kết xuất Dashboard báo cáo Realtime tự động hóa trực quan."
    ],
    icon: "BarChart3",
    angle: 308.4,
    color: "#7a5214"
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: "hieu-qua",
    title: "Hiệu Quả Thực Chất",
    englishTitle: "Business Impact First",
    description: "Chúng tôi loại bỏ các chỉ số ảo vô nghĩa. Mọi nỗ lực, mọi dòng code, mọi bài viết hay chiến dịch quảng cáo đều phải hướng tới kết quả kinh doanh cuối cùng của khách hàng: tăng trưởng lượng lead chất lượng và bứt phá doanh số.",
    manifesto: "Chúng tôi tin rằng: Một chiến dịch marketing đẹp mắt nhưng không mang lại cuộc gọi, không mang lại đơn hàng cho doanh nghiệp thì đó là một chiến dịch thất bại.",
    iconName: "TrendingUp"
  },
  {
    id: "minh-bach",
    title: "Minh Bạch Tuyệt Đối",
    englishTitle: "Absolute Transparency",
    description: "PGS Agency bàn giao và để khách hàng nắm quyền sở hữu 100% tài khoản quảng cáo, mã nguồn website, và dữ liệu đo lường. Chúng tôi báo cáo trung thực số liệu thực tế qua dashboard tự động, không xào nấu hay che giấu lỗi.",
    manifesto: "Sự trung thực tạo nên sự tin tưởng bền vững. Chúng tôi sẵn sàng nhận sai khi chiến dịch gặp sự cố và cùng khách hàng tìm giải pháp khắc phục ngay lập tức.",
    iconName: "Eye"
  },
  {
    id: "he-thong",
    title: "Tính Hệ Thống Đồng Bộ",
    englishTitle: "Systematic Integration",
    description: "Không bao giờ triển khai marketing một cách chắp vá, cô lập. Tại PGS, Website phải bổ trợ cho SEO, SEO phải phối hợp với Ads, Ads phải nuôi dưỡng tệp cho Content, và Dữ liệu tracking phải quay ngược lại tối ưu cho toàn bộ hệ thống.",
    manifesto: "Một cỗ máy chỉ vận hành trơn tru khi tất cả bánh răng khớp với nhau. PGS Agency là người thiết kế và bôi trơn các bánh răng đó một cách khoa học.",
    iconName: "Cpu"
  },
  {
    id: "du-lieu",
    title: "Quyết Định Bằng Dữ Liệu",
    englishTitle: "Data-Driven Strategy",
    description: "Nói không với phán đoán cảm tính hay giả định mơ hồ. PGS thu thập, phân tích hành vi của khách hàng trên website và các kênh quảng cáo để đưa ra các quyết định tối ưu dựa trên những con số biết nói thực tế.",
    manifesto: "Trong dữ liệu có sự thật. Chúng tôi lắng nghe sự thật từ hành vi của người tiêu dùng để liên tục cải tiến hiệu suất hệ thống marketing.",
    iconName: "BarChart2"
  },
  {
    id: "dong-hanh",
    title: "Đồng Hành Dài Hạn",
    englishTitle: "Committed Partnership",
    description: "PGS không coi khách hàng là đối tác ngắn hạn kiếm lời. Chúng tôi coi mình là một bộ phận cốt lõi của doanh nghiệp bạn, cùng vui với niềm vui tăng trưởng, cùng lo với những thách thức thị trường để đồng hành qua nhiều năm tháng.",
    manifesto: "Sự thịnh vượng bền vững của khách hàng chính là thước đo duy nhất cho sự tồn tại và phát triển của thương hiệu PGS Agency.",
    iconName: "HeartHandshake"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Khảo Sát & Lắng Nghe",
    subtitle: "Deep Discovery Session",
    description: "Đội ngũ PGS ngồi lại trực tiếp cùng ban lãnh đạo doanh nghiệp để tìm hiểu sâu về năng lực cốt lõi, sản phẩm, biên lợi nhuận, đối thủ cạnh tranh và hành vi thực tế của tệp khách hàng mục tiêu.",
    deliverable: "Báo cáo phân tích hiện trạng và xác lập mục tiêu doanh số.",
    duration: "2 - 3 ngày",
    checklist: [
      "Khảo sát sản phẩm & lợi thế cạnh tranh độc nhất (USP).",
      "Vẽ chân dung khách hàng mục tiêu chi tiết.",
      "Xác định mục tiêu KPI ngắn hạn & dài hạn rõ ràng."
    ]
  },
  {
    stepNumber: "02",
    title: "Đo Lường & Audit Hệ Thống",
    subtitle: "Systematic Diagnostic Audit",
    description: "Tiến hành quét và phân tích sâu sắc toàn bộ hạ tầng digital hiện tại của doanh nghiệp bao gồm: Website chuẩn CRO chưa, điểm SEO kỹ thuật, lịch sử tài khoản quảng cáo, tính chính xác của tracking.",
    deliverable: "Tài liệu Audit chi tiết chỉ ra các 'điểm rò rỉ ngân sách' hiện tại.",
    duration: "3 - 5 ngày",
    checklist: [
      "Kiểm tra điểm kỹ thuật SEO & trải nghiệm di động của website.",
      "Rà soát hiệu suất và cấu trúc chiến dịch quảng cáo cũ.",
      "Xác minh độ chính xác của các thẻ đo lường Analytics."
    ]
  },
  {
    stepNumber: "03",
    title: "Hoạch Định Bản Đồ Chiến Lược",
    subtitle: "Omnichannel Growth Blueprint",
    description: "Xây dựng bản kế hoạch tổng thể marketing đa kênh chi tiết trong vòng 6-12 tháng. Phân bổ ngân sách tối ưu cho từng kênh (SEO, Ads, Web, Social) kèm theo lộ trình triển khai và KPI cam kết cụ thể.",
    deliverable: "Bản đồ chiến lược tăng trưởng, bảng phân bổ ngân sách & cam kết KPI.",
    duration: "5 - 7 ngày",
    checklist: [
      "Xây dựng kế hoạch nội dung & thông điệp cốt lõi cho thương hiệu.",
      "Phác thảo cấu trúc phễu quảng cáo và kế hoạch từ khóa SEO.",
      "Thống nhất các mốc bàn giao và KPI chuyển đổi chi tiết."
    ]
  },
  {
    stepNumber: "04",
    title: "Vận Hành Đồng Bộ Đa Kênh",
    subtitle: "Symphonic Execution",
    description: "Đội ngũ chuyên gia chuyên môn hóa cao của PGS (Web Dev, SEO Master, Ads Specialist, Copywriter) bắt tay vào triển khai đồng bộ: code web, viết bài chuẩn EEAT, set up quảng cáo đa phễu, cài đặt tracking.",
    deliverable: "Website chuẩn CRO lên sóng, các chiến dịch quảng cáo hoạt động.",
    duration: "Vận hành hàng tháng",
    checklist: [
      "Tối ưu hóa/Thiết kế mới website và landing page bắt lead.",
      "Sản xuất nội dung chất lượng cao chuẩn EEAT lên các kênh.",
      "Kích hoạt và theo dõi sát sao quảng cáo Google, Facebook, TikTok."
    ]
  },
  {
    stepNumber: "05",
    title: "Đo Lường & Phân Tích Realtime",
    subtitle: "Data-Driven Transparency",
    description: "Kết nối toàn bộ dữ liệu về Dashboard trực quan tự động hóa. Hàng tuần/hàng tháng, PGS tổ chức các cuộc họp trực tuyến hoặc trực tiếp để phân tích số liệu thực tế, minh bạch toàn bộ hiệu quả công việc.",
    deliverable: "Dashboard báo cáo Realtime 24/7 và biên bản họp đánh giá hàng tuần.",
    duration: "Đo lường liên tục",
    checklist: [
      "Theo dõi sát sao lượng Lead, tỷ lệ chuyển đổi và chi phí trên mỗi lead.",
      "Phân tích hành vi cuộn, click của người dùng trên website qua Hotjar.",
      "Họp định kỳ để báo cáo thực tế và đề xuất hướng điều chỉnh nhanh."
    ]
  },
  {
    stepNumber: "06",
    title: "Tối Ưu & Growth Hacking",
    subtitle: "Continuous Performance Optimization",
    description: "Dựa trên dữ liệu thực tế thu thập được, PGS tiến hành các thử nghiệm A/B testing (tiêu đề quảng cáo, hình ảnh, màu nút CTA, cấu trúc Landing page) để liên tục hạ thấp chi phí thu Lead và gia tăng tỷ lệ chuyển đổi.",
    deliverable: "Báo cáo tối ưu tỷ lệ chuyển đổi và đề xuất mở rộng quy mô chiến dịch.",
    duration: "Tối ưu hàng ngày",
    checklist: [
      "A/B Testing các mẫu quảng cáo có CTR cao nhất để dồn ngân sách.",
      "Cải thiện điểm chất lượng quảng cáo giúp giảm giá thầu.",
      "Tối ưu hóa trải nghiệm trang đích để nâng cao tỷ lệ chuyển đổi (CRO)."
    ]
  }
];

export const TEAM_EXPERTS: ExpertRole[] = [
  {
    id: "strategy",
    role: "Strategy",
    vietnameseTitle: "Giám đốc Chiến lược Tăng trưởng (Growth Strategy)",
    expertName: "Nguyễn Minh Đức",
    experience: "10+ năm kinh nghiệm kiến tạo phễu marketing SME",
    description: "Chịu trách nhiệm nghiên cứu thị trường, hoạch định bức tranh tổng thể và thiết lập KPI cốt lõi gắn liền với hoạt động kinh doanh của doanh nghiệp.",
    keyMetric: "85%",
    metricLabel: "Dự án đạt & vượt KPI cam kết",
    skills: ["Bản đồ tăng trưởng", "Phân tích đối thủ", "Định vị thương hiệu", "Cơ cấu ngân sách"]
  },
  {
    id: "seo",
    role: "SEO Comprehensive",
    vietnameseTitle: "Trưởng nhóm SEO Tổng thể Chuẩn EEAT",
    expertName: "Lê Hoàng Nam",
    experience: "7+ năm đưa hàng ngàn từ khóa khó lên Top Google",
    description: "Chuyên môn hóa tối ưu cấu trúc website lớn, lập kế hoạch nội dung chuyên sâu chuẩn EEAT giúp mang lại dòng khách hàng tự nhiên bền vững không phụ thuộc quảng cáo.",
    keyMetric: "5M+",
    metricLabel: "Traffic tự nhiên mang về cho khách hàng",
    skills: ["Technical SEO", "EEAT Content Planning", "Entity Building", "Link Audit"]
  },
  {
    id: "website",
    role: "Website CRO",
    vietnameseTitle: "Kỹ sư Trải nghiệm người dùng & Tối ưu chuyển đổi",
    expertName: "Trần Anh Khoa",
    experience: "6+ năm thiết kế giao diện cao cấp & tối ưu Landing Page",
    description: "Thiết kế và phát triển các giao diện website tinh tế, tốc độ tải trang cực nhanh, sắp đặt các nút CTA khoa học để kích thích hành vi chuyển đổi cao nhất.",
    keyMetric: "14%",
    metricLabel: "Tỷ lệ chuyển đổi trang đích trung bình đạt được",
    skills: ["UX/UI Design", "Tailwind CSS / React", "A/B Testing", "Speed Optimization"]
  },
  {
    id: "ads",
    role: "Performance Ads",
    vietnameseTitle: "Chuyên gia Tối ưu Quảng cáo Đa phễu (CPA/ROI)",
    expertName: "Phạm Quốc Hùng",
    experience: "8+ năm quản lý ngân sách quảng cáo hơn 50 tỷ đồng",
    description: "Bậc thầy về phân phối quảng cáo đa phễu trên Google, Facebook và TikTok. Chuyên sâu việc tối ưu giá thầu và hạ thấp chi phí trên mỗi lượt lead chất lượng.",
    keyMetric: "-35%",
    metricLabel: "Giảm chi phí thu Lead (CPL) trung bình",
    skills: ["Google Search/GDN", "Facebook Pixel Funnels", "TikTok Creative Ads", "Audience Targeting"]
  },
  {
    id: "content",
    role: "Content Strategy",
    vietnameseTitle: "Trưởng nhóm Sáng tạo Nội dung chạm cảm xúc",
    expertName: "Nguyễn Thị Mai Anh",
    experience: "6+ năm làm báo và Copywriting thương hiệu cao cấp",
    description: "Chuyển hóa các thông điệp kỹ thuật khô khan thành những câu chuyện thương hiệu chạm đến trái tim khách hàng, viết kịch bản video viral và bài PR báo chí uy tín.",
    keyMetric: "92%",
    metricLabel: "Điểm hài lòng về chất lượng câu chữ",
    skills: ["Brand Storytelling", "Copywriting CRO", "PR Booking Content", "Kịch bản Video"]
  },
  {
    id: "social",
    role: "Social Media Planner",
    vietnameseTitle: "Chuyên viên Hoạch định và Phát triển Kênh Xã hội",
    expertName: "Đỗ Bảo Long",
    experience: "5+ năm xây dựng fanpage triệu tương tác & kênh TikTok",
    description: "Đảm nhiệm việc lên ý tưởng hình ảnh, video ngắn thu hút tương tác tự nhiên, định hướng hình ảnh thương hiệu nhất quán trên mọi điểm chạm mạng xã hội.",
    keyMetric: "10M+",
    metricLabel: "Lượt xem video organic trên TikTok & Reels",
    skills: ["TikTok Video Creator", "Fanpage Management", "Community Seeding", "Graphic Briefing"]
  },
  {
    id: "pr",
    role: "PR & Reputation",
    vietnameseTitle: "Chuyên viên Quản lý Uy tín & Quan hệ Báo chí",
    expertName: "Vũ Thanh Vân",
    experience: "6+ năm thiết lập mạng lưới báo chí và truyền thông",
    description: "Giúp doanh nghiệp xây dựng sự tin cậy tuyệt đối thông qua việc xuất hiện trên các trang báo điện tử chính thống hàng đầu và xử lý khủng hoảng truyền thông.",
    keyMetric: "50+",
    metricLabel: "Đầu báo đối tác chính thức tại Việt Nam",
    skills: ["Press Relations", "Event PR", "Crisis Management", "Maps SEO Setup"]
  },
  {
    id: "tracking",
    role: "Data Tracking",
    vietnameseTitle: "Kỹ sư Đo lường Dữ liệu & Thiết lập Dashboard",
    expertName: "Bùi Tiến Đạt",
    experience: "5+ năm triển khai hệ thống Tracking cho thương mại điện tử",
    description: "Người kết nối toàn bộ hoạt động quảng cáo về một trung tâm dữ liệu thống nhất. Đảm bảo sai số tracking dưới 2% để hỗ trợ quyết định tối ưu ngân sách quảng cáo.",
    keyMetric: "100%",
    metricLabel: "Báo cáo tự động bằng Dashboard Realtime trực quan",
    skills: ["GA4 Advanced Setup", "Google Tag Manager", "Server-Side Tracking", "Looker Studio"]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "pgs-lam-gi",
    category: "Về PGS Agency",
    question: "PGS Agency cung cấp những dịch vụ cụ thể nào cho doanh nghiệp?",
    answer: "PGS Agency cung cấp giải pháp Marketing tổng thể đa nền tảng tích hợp bao gồm: Thiết kế & tối ưu Website chuẩn CRO, SEO tổng thể bền vững chuẩn EEAT, Quảng cáo Performance Ads (Google, Facebook, TikTok), Sáng tạo Content Marketing chuyên sâu, Phát triển Social Media (TikTok, Fanpage), booking PR báo chí, tối ưu Google Maps chuẩn SEO địa phương và thiết lập hệ thống Tracking đo lường dữ liệu cao cấp (GA4, GTM, Dashboard realtime)."
  },
  {
    id: "phu-hop-ai",
    category: "Sự Phù Hợp",
    question: "Dịch vụ của PGS Agency phù hợp nhất với những đối tượng khách hàng nào?",
    answer: "Chúng tôi sinh ra để đồng hành hiệu quả nhất với: (1) Các doanh nghiệp SME muốn xây dựng phòng Marketing thuê ngoài chuyên nghiệp để bứt phá doanh số mà không muốn tốn chi phí xây dựng bộ máy cồng kềnh; (2) Các doanh nghiệp đang chạy quảng cáo nhưng gặp tình trạng chi phí tăng cao, lead ảo nhiều, không đo lường được hiệu quả; (3) Các chủ thương hiệu muốn số hóa, xây dựng website chuẩn chỉnh và phủ sóng thương hiệu uy tín một cách bài bản, đồng bộ lâu dài."
  },
  {
    id: "dich-vu-rieng",
    category: "Hợp Tác",
    question: "PGS có nhận triển khai các dịch vụ đơn lẻ như chỉ chạy Ads hoặc chỉ làm SEO không?",
    answer: "Mặc dù triết lý của chúng tôi là xây dựng hệ thống tổng thể để đạt hiệu quả cao nhất, PGS vẫn sẵn sàng nhận các dự án đơn lẻ (như thiết kế Website cao cấp, SEO tổng thể chuẩn EEAT hoặc chạy quảng cáo tối ưu) NẾU doanh nghiệp của bạn đã có một số mắt xích hoạt động tốt và chỉ cần PGS củng cố mắt xích còn yếu. Tuy nhiên, trước khi nhận, chúng tôi sẽ tiến hành khảo sát và tư vấn xem mắt xích đó có liên kết tốt với phần còn lại của doanh nghiệp hay không để tránh lãng phí ngân sách của bạn."
  },
  {
    id: "quy-trinh-cam-ket",
    category: "Cam Kết & Vận Hành",
    question: "Quy trình cam kết hiệu quả và bàn giao tài khoản tại PGS diễn ra như thế nào?",
    answer: "Chúng tôi cam kết KPI bằng văn bản hợp đồng rõ ràng dựa trên lượng Lead chất lượng, tỷ lệ chuyển đổi hoặc traffic tăng trưởng thực chất tùy theo mục tiêu dự án. Về tài chính và bảo mật, PGS Agency cam kết bàn giao và để khách hàng đứng tên sở hữu 100% tài khoản quảng cáo, tài khoản tracking GA4, mã nguồn website. Bạn có quyền xem số liệu thực tế bất cứ lúc nào qua Dashboard Realtime tự động cập nhật 24/7."
  }
];

export const SYSTEM_SCHEMA = {
  aboutPage: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Giới thiệu PGS Agency - Đối tác xây dựng hệ thống Marketing tổng thể",
    "description": "PGS Agency thiết lập hệ thống marketing số đa nền tảng, tích hợp Web chuẩn CRO, SEO EEAT, Ads hiệu suất cao và tracking minh bạch dữ liệu.",
    "publisher": {
      "@type": "Organization",
      "name": "PGS Agency",
      "logo": "https://pgsagency.vn/assets/logo.png",
      "url": "https://pgsagency.vn"
    }
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PGS Agency",
    "alternateName": "Công ty TNHH Giải pháp Tăng trưởng Số PGS",
    "url": "https://pgsagency.vn",
    "logo": "https://pgsagency.vn/assets/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-90-123-4567",
      "contactType": "sales",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    },
    "sameAs": [
      "https://www.facebook.com/pgsagency",
      "https://www.youtube.com/@pgsagency",
      "https://www.tiktok.com/@pgsagency"
    ]
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://pgsagency.vn/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Giới thiệu",
        "item": "https://pgsagency.vn/gioi-thieu/"
      }
    ]
  }
};
