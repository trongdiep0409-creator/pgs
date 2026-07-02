export interface HandoffSpec {
  title: string;
  role: string;
  searchIntent: string;
  h1?: string;
  headings: string[];
  metaTitle: string;
  metaDescription: string;
  schema: string;
  internalLinkOut: string[];
  internalLinkIn: string[];
  designerChecklist: string[];
  developerChecklist: string[];
  contentChecklist: string[];
}

export const specificationsData: Record<number, HandoffSpec> = {
  1: {
    title: "1. Hero Project Wall",
    role: "Gây ấn tượng thị giác mạnh mẽ ngay khi truy cập, định vị PGS Agency là công ty tư vấn tăng trưởng đẳng cấp cao.",
    searchIntent: "case study pgs agency, dự án tăng trưởng số pgs agency",
    h1: "“Case Study PGS Agency – Những dự án tăng trưởng được triển khai bằng chiến lược, dữ liệu và tối ưu liên tục”",
    headings: ["H1: Tiêu đề chính định vị dự án", "H2: Tổng quan chiến dịch và triết lý dữ liệu"],
    metaTitle: "Case Study PGS Agency - Thư Viện Dự Án Tăng Trưởng Thực Tế",
    metaDescription: "Khám phá các case study tăng trưởng số thành công của PGS Agency. Dự án SEO, Ads, Website và Marketing tổng thể thực chiến bằng số liệu minh bạch.",
    schema: "CollectionPage, BreadcrumbList, WebSite",
    internalLinkOut: ["/lien-he", "/dich-vu", "/case-study/seo-tong-the"],
    internalLinkIn: ["/trang-chu", "/ve-chung-toi"],
    designerChecklist: [
      "Sử dụng phong cách Light Premium Consulting: Nền sáng xám nhạt (#FDFBF7), khoảng trắng rộng rãi (>120px padding).",
      "Thiết kế 3D Project Wall gồm mockups điện thoại, bảng biểu Ads, kết quả SEO lơ lửng bằng các card kính mờ viền gold.",
      "Sử dụng tone màu chủ đạo vàng gold sang trọng kết hợp chữ xám tro đậm để tạo chiều sâu thị giác.",
      "CTA chính màu vàng gold cao cấp, bo góc mượt, tỷ lệ tương phản cao đối với người dùng khi scan trang."
    ],
    developerChecklist: [
      "Xây dựng hiệu ứng nghiêng 3D (3D tilt) cho Project Wall bám theo tọa độ di chuyển của chuột người dùng.",
      "Tối ưu tải tài nguyên ảnh sử dụng Next.js Image với refererPolicy và thuộc tính sizes chính xác.",
      "Tích hợp prefers-reduced-motion để tự động tắt hiệu ứng chuyển động nếu hệ điều hành của khách yêu cầu.",
      "Đảm bảo nút CTA phản hồi click dưới 50ms và có trạng thái hover mượt mà bằng CSS transitions."
    ],
    contentChecklist: [
      "Sử dụng thông điệp chính đắt giá: Tập trung vào chiến lược tổng thể kết hợp đa kênh thay vì làm nhỏ lẻ rời rạc.",
      "Không bịa đặt số liệu hoặc thương hiệu, đặt placeholder [Cần bổ sung dữ liệu thật] cho những mục chưa bàn giao.",
      "Lồng ghép triết lý: 'Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi'."
    ]
  },
  2: {
    title: "2. Bộ lọc case (Filters)",
    role: "Giúp người dùng phân loại nhanh dự án theo đúng nhu cầu, rút ngắn hành trình tìm kiếm giải pháp phù hợp.",
    searchIntent: "dự án seo theo ngành, quảng cáo ads theo quy mô",
    headings: ["H2: Bộ lọc giải pháp tăng trưởng chuyên biệt", "H3: Phân loại theo Ngành & Quy mô doanh nghiệp"],
    metaTitle: "Phân Loại Dự Án Marketing Thực Chiến - PGS Agency",
    metaDescription: "Lọc các case study của PGS Agency theo từng dịch vụ SEO, Ads, Website chuẩn CRO, hay theo ngành kinh doanh của bạn.",
    schema: "ItemList",
    internalLinkOut: ["/case-study/seo", "/case-study/ads"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế filter dưới dạng chip hiện đại, viền mỏng tinh tế, bo góc tròn 999px.",
      "Trạng thái active của chip: Nền vàng gold, chữ đen than đậm, có bóng đổ nhẹ sang trọng.",
      "Khoảng cách giữa các chip tối thiểu 12px để thao tác touch trên mobile không bị chạm nhầm."
    ],
    developerChecklist: [
      "Xây dựng cơ chế lọc client-side mượt mà, cập nhật danh sách hiển thị bằng CSS Grid & AnimatePresence từ motion.",
      "Lưu trạng thái bộ lọc vào URL query parameters để người dùng dễ dàng chia sẻ kết quả lọc cụ thể.",
      "Đảm bảo touch target của mỗi chip tối thiểu đạt kích thước 44px * 44px chuẩn khả dụng WCAG."
    ],
    contentChecklist: [
      "Đặt tên các phân mục rõ ràng, chuyên nghiệp: Dịch vụ, Ngành kinh doanh, Mục tiêu, Quy mô (SMBs, Enterprise).",
      "Mô tả ngắn gọn tác dụng của bộ lọc đối với việc tìm kiếm cơ hội tối ưu chuyển đổi tối đa."
    ]
  },
  3: {
    title: "3. Featured case lớn",
    role: "Trưng bày dự án xuất sắc nhất của agency, tạo ra bằng chứng xã hội (Social Proof) vững chắc nhất để CRO.",
    searchIntent: "case study marketing tổng thể tốt nhất, chiến dịch pgs agency",
    headings: ["H2: Dự án tăng trưởng số toàn diện tiêu biểu", "H3: Bối cảnh, Giải pháp & Kết quả đột phá [Cần bổ sung]"],
    metaTitle: "Dự Án Tăng Trưởng Hệ Thống Số Toàn Diện Doanh Nghiệp - PGS Agency",
    metaDescription: "Chi tiết dự án marketing tổng thể xuất sắc nhất: Bối cảnh, nút thắt chuyển đổi, giải pháp tái cấu trúc và kết quả đo lường thực tế.",
    schema: "CaseStudy, CreativeWork",
    internalLinkOut: ["/lien-he", "/case-study/he-thong-so-toan-dien"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế panel lớn dạng bento grid chia tỷ lệ 60/40 giữa nội dung văn bản và biểu đồ kết quả.",
      "Vẽ biểu đồ tăng trưởng số liệu dạng trực quan với đường kẻ vàng gold mịn màng, phủ bóng mờ tinh tế.",
      "Dùng thẻ Badge nhỏ xinh ghi 'Ngành: [Cần bổ sung]' để phân biệt nhanh phân khúc dự án."
    ],
    developerChecklist: [
      "Sử dụng Recharts hoặc SVG vẽ biểu đồ tương tác, cho phép hover xem chỉ số chi tiết qua tooltip.",
      "Thiết kế giao diện tab mượt (Bối cảnh, Vấn đề, Giải pháp, Kết quả) dùng Framer Motion layoutId.",
      "Tối ưu lazy loading cho phần biểu đồ phức tạp để giữ điểm hiệu năng Lighthouse trang đạt >95."
    ],
    contentChecklist: [
      "Trình bày theo công thức STAR (Situation, Task, Action, Result) chuẩn tư vấn kinh doanh cao cấp.",
      "Làm nổi bật số liệu: +250% Lead, -40% CPL, X3 Doanh thu để người đọc scan nhanh được giá trị thực tế."
    ]
  },
  4: {
    title: "4. Case SEO",
    role: "Chứng minh năng lực tối ưu kỹ thuật SEO chuyên sâu và khả năng tăng trưởng Organic Traffic bền vững, nâng tầm EEAT.",
    searchIntent: "case study seo thành công, chiến dịch seo tổng thể pgs agency",
    headings: ["H2: Chiến dịch SEO tổng thể phủ sóng ngành", "H3: Chỉ số Google Search Console thực tế [Cần bổ sung]"],
    metaTitle: "Case Study SEO Tổng Thể Thực Chiến - PGS Agency",
    metaDescription: "Xem các kết quả chiến dịch SEO tăng trưởng traffic đột phá, phủ sóng hàng ngàn từ khóa ngành bằng phương pháp SEO cấu trúc bền vững.",
    schema: "TechArticle",
    internalLinkOut: ["/dich-vu/seo-tong-the", "/audit-seo-mien-phi"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Mô phỏng bảng điều khiển Google Search Console tinh gọn với các gam màu quen thuộc nhưng được làm sang trọng hóa.",
      "Thiết kế các khối KPI nổi bật: Clicks, Impressions, CTR, Vị trí trung bình trong khung viền bo nhẹ thanh nhã.",
      "Tạo tương phản tốt cho các đường đồ thị biểu thị lượng traffic hữu cơ đi lên dốc đứng đầy thuyết phục."
    ],
    developerChecklist: [
      "Xây dựng simulator GSC cho phép chuyển đổi mốc thời gian (3 tháng, 6 tháng, 12 tháng) và cập nhật số liệu trực tiếp.",
      "Làm hiệu ứng vẽ đồ thị mượt mà khi load cấu trúc dữ liệu mới.",
      "Đảm bảo các thẻ dữ liệu cấu trúc (JSON-LD) cho TechArticle được hiển thị đúng định dạng."
    ],
    contentChecklist: [
      "Định nghĩa rõ phương pháp SEO cấu trúc bền vững và tối ưu hóa hệ thống EEAT cốt lõi.",
      "Phân tích cách PGS lựa chọn từ khóa ngách tạo tỷ lệ chuyển đổi cao thay vì chỉ chạy theo traffic ảo."
    ]
  },
  5: {
    title: "5. Case Website / Landing Page (CRO)",
    role: "Minh họa năng lực thiết kế UX/UI đỉnh cao và triết lý tối ưu chuyển đổi (CRO) trực quan.",
    searchIntent: "thiết kế website chuẩn cro, case study tối ưu ux ui",
    headings: ["H2: Tối ưu hóa trải nghiệm người dùng & Tỷ lệ chuyển đổi", "H3: So sánh giao diện Before & After chuẩn CRO"],
    metaTitle: "Tối Ưu Website Chuẩn CRO Thực Tế - PGS Agency",
    metaDescription: "Minh chứng sức mạnh thiết kế giao diện cao cấp kết hợp kỹ thuật CRO. Tăng tỷ lệ chuyển đổi website từ 0.8% lên 2.4% thực tế.",
    schema: "ProductModel",
    internalLinkOut: ["/dich-vu/thiet-ke-website", "/cro-audit"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Tạo layout slider chia đôi màn hình trực quan cho thấy sự khác biệt giữa phiên bản cũ lỗi thời và phiên bản mới CRO.",
      "Đặt các điểm chú giải (annotations) màu vàng gold dạng dấu cộng nhấp nháy để chỉ rõ các cải tiến UX/UI đắt giá.",
      "Cân bằng bố cục để hai ảnh so sánh luôn khớp trục ngang với nhau một cách hoàn hảo."
    ],
    developerChecklist: [
      "Xây dựng thanh trượt Before/After tương tác hoàn chỉnh cho phép drag bằng chuột hoặc swipe cảm ứng trên điện thoại.",
      "Cài đặt bounding box hợp lý để thanh trượt không bị tràn ra ngoài khung ảnh.",
      "Tối ưu hóa hình ảnh trước và sau để không gây giật lag trang khi thực hiện thao tác trượt liên tục."
    ],
    contentChecklist: [
      "Phân tích cụ thể các lỗi UX phổ biến: CTA mờ nhạt, tốc độ load chậm, thiếu yếu tố tạo dựng lòng tin khách hàng.",
      "Trình bày giải pháp: Tối giản phễu điền form, tăng tốc độ load trang, bổ sung các điểm chứng minh năng lực EEAT."
    ]
  },
  6: {
    title: "6. Case Ads",
    role: "Chứng minh năng lực phân bổ ngân sách, tối ưu chi phí quảng cáo và cam kết hiệu quả chuyển đổi cuối cùng cho doanh nghiệp.",
    searchIntent: "case study chay quang cao ads hieu qua, toi uu chi phi ads",
    headings: ["H2: Chiến dịch quảng cáo đa kênh tối ưu chi phí", "H3: Chỉ số CTR, CPA và ROAS thực tế đo lường"],
    metaTitle: "Chiến Dịch Quảng Cáo Ads Tối Ưu Chuyển Đổi - PGS Agency",
    metaDescription: "Khám phá cách PGS Agency triển khai phễu Ads đa nền tảng Google, Facebook, TikTok giúp tối ưu chi phí và tăng tỷ lệ chuyển đổi.",
    schema: "PerformanceReport",
    internalLinkOut: ["/dich-vu/quang-cao-ads", "/nhan-ke-hoach-ads"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế dashboard số liệu Ads với các chỉ số quan trọng (CTR, CPC, CPA, ROAS) có kích thước lớn, dễ scan.",
      "Tạo icon đại diện cho 3 nền tảng lớn Google, Facebook, TikTok theo thiết kế tối giản tiệp màu sắc tổng thể.",
      "Sử dụng các thanh tiến trình (progress bar) thể hiện việc phân bổ nguồn lực thông minh."
    ],
    developerChecklist: [
      "Cho phép người dùng click đổi tab giữa Google Ads, Facebook Ads và TikTok Ads để xem chiến lược cụ thể.",
      "Xây dựng hiệu ứng đếm số (counter) từ 0 chạy lên mốc chỉ số thật khi cuộn trang đến khu vực này.",
      "Tạo liên kết tương tác giúp người dùng gửi yêu cầu tư vấn quảng cáo nhanh chỉ bằng một chạm."
    ],
    contentChecklist: [
      "Giải thích cách xây dựng phễu Ads 3 tầng: Nhận diện thương hiệu, Cân nhắc lựa chọn và Thúc đẩy chuyển đổi hành vi.",
      "Làm rõ khái niệm tối ưu CPA (Cost Per Acquisition) dựa trên việc phân tích hành vi dữ liệu thật."
    ]
  },
  7: {
    title: "7. Case Social / Content",
    role: "Chứng minh kỹ năng sáng tạo nội dung định hướng thương hiệu, lên kế hoạch truyền thông đồng bộ để giữ chân tệp khách hàng.",
    searchIntent: "case study content marketing, xay dung social media pgs agency",
    headings: ["H2: Sáng tạo nội dung đa nền tảng & Quản trị thương hiệu", "H3: Kế hoạch phân phối nội dung và các chỉ số tương tác"],
    metaTitle: "Xây Dựng Thương Hiệu Qua Content Thực Chiến - PGS Agency",
    metaDescription: "Các dự án xây dựng thương hiệu, quản trị fanpage, sản xuất video ngắn TikTok đạt kết quả lan tỏa tự nhiên xuất sắc từ PGS.",
    schema: "SocialMediaPosting",
    internalLinkOut: ["/dich-vu/content-marketing", "/lien-he"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Mô phỏng một bảng kế hoạch nội dung (Content Calendar) gọn gàng bằng lưới ô vuông hiện đại, thoáng đãng.",
      "Thiết kế các mẫu bài đăng Facebook/TikTok mockup với hình ảnh sắc nét, viền sang trọng, tỉ lệ tương phản cao.",
      "Sử dụng các icon tim, share, comment có hiệu ứng nhấp nháy mờ dịu mắt."
    ],
    developerChecklist: [
      "Xây dựng slider lướt ngang các bài viết mockup mượt mà trên cả thiết bị di động (swipe) và máy tính (drag/buttons).",
      "Đảm bảo các khối chữ dài được thiết kế rút gọn thông minh, bung ra đầy đủ khi người xem click 'Xem thêm'.",
      "Tích hợp các tương tác thả tim ảo để tăng tính thú vị cho người dùng trải nghiệm."
    ],
    contentChecklist: [
      "Mô tả quy trình nghiên cứu insight sâu sắc của tệp khách hàng mục tiêu để tạo ra thông điệp chạm đúng nỗi đau.",
      "Chia sẻ triết lý: Content không chỉ để giải trí, Content phải định vị thương hiệu và hỗ trợ tạo ra chuyển đổi."
    ]
  },
  8: {
    title: "8. Case PR / Authority",
    role: "Xây dựng uy tín tối đa cho thương hiệu khách hàng thông qua báo chí chính thống và hồ sơ ban lãnh đạo chuyên sâu (EEAT).",
    searchIntent: "dịch vụ pr báo chí uy tín, bảo trợ truyền thông pgs agency",
    headings: ["H2: Chiến dịch PR báo chí & Gia tăng uy tín doanh nghiệp", "H3: Mạng lưới phủ sóng báo chí và chỉ số tiếp cận độc giả"],
    metaTitle: "Chiến Dịch PR Báo Chí Nâng Tầm Uy Tín - PGS Agency",
    metaDescription: "Xem các dự án PR báo chí bảo trợ truyền thông giúp doanh nghiệp gia tăng uy tín tối đa trên các đầu báo lớn như VnExpress, CafeF.",
    schema: "NewsArticle",
    internalLinkOut: ["/dich-vu/pr-bao-chi", "/nhan-tu-van"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế logo các đầu báo lớn (VnExpress, CafeF, Forbes...) dưới dạng xám đơn sắc để giữ sự sang trọng nhất quán.",
      "Tạo layout mô phỏng trang báo điện tử chất lượng cao với tiêu đề giật tít thu hút và đoạn trích dẫn đắt giá.",
      "Sử dụng biểu đồ mạng lưới kết nối (mention network) biểu thị sức lan tỏa của thương hiệu khách hàng."
    ],
    developerChecklist: [
      "Tối ưu hiệu ứng hover làm nổi bật các bài báo mockup bằng cách phóng to nhẹ và tăng độ sáng đường viền gold.",
      "Đảm bảo các liên kết báo chí bên ngoài được mở an toàn trong tab mới sử dụng rel='noopener noreferrer'.",
      "Xây dựng cấu trúc tương tác hiển thị tóm tắt nội dung bài viết PR ngay trong popup mượt mà."
    ],
    contentChecklist: [
      "Nêu bật tầm quan trọng của PR báo chí chính thống trong việc xây dựng lòng tin tuyệt đối với người tiêu dùng.",
      "Phân tích cách định vị CEO hoặc chuyên gia của doanh nghiệp trở thành tiếng nói đầu ngành (Thought Leadership)."
    ]
  },
  9: {
    title: "9. Cấu trúc case study chuẩn",
    role: "Đóng vai trò giáo dục khách hàng về sự minh bạch, quy chuẩn làm việc chuyên nghiệp, giúp họ dễ hình dung chất lượng PGS bàn giao.",
    searchIntent: "mẫu case study chuẩn marketing, cấu trúc dự án pgs agency",
    headings: ["H2: Quy chuẩn cấu trúc trình bày dự án tại PGS Agency", "H3: 10 hạng mục cốt lõi tạo nên một Case Study hoàn chỉnh"],
    metaTitle: "Mẫu Cấu Trúc Trình Bày Case Study Chuẩn - PGS Agency",
    metaDescription: "Khám phá quy chuẩn 10 bước viết case study tăng trưởng của PGS Agency: Từ bối cảnh, thách thức đến giải pháp thực thi và bằng chứng số liệu.",
    schema: "CreativeWorkSeries",
    internalLinkOut: ["/case-study", "/tai-tai-lieu-huong-dan"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế cấu trúc bento grid hoặc timeline 10 hạng mục với các con số lớn 01 - 10 viết bằng phông chữ Mono cá tính.",
      "Sử dụng hiệu ứng màu sắc tương phản cao giữa tiêu đề hạng mục và phần mô tả nội dung.",
      "Tạo một biểu tượng rương tài nguyên nhỏ gọn tượng trưng cho tài sản trí tuệ và bằng chứng số liệu minh bạch."
    ],
    developerChecklist: [
      "Xây dựng accordion hoặc tab lưới nhấp chuột để người dùng click xem định nghĩa và yêu cầu chi tiết từng bước.",
      "Tạo chuyển động mượt mà khi người dùng khám phá các mục kế tiếp nhau.",
      "Hỗ trợ tính năng copy nhanh cấu trúc này hoặc tải về dưới dạng khung dàn ý mẫu cho marketing team doanh nghiệp."
    ],
    contentChecklist: [
      "Định nghĩa rõ nội dung bắt buộc của 10 bước: Tổng quan, Bối cảnh, Thách thức, Mục tiêu, Chiến lược, Hạng mục, Kết quả, Bằng chứng, Bài học, CTA.",
      "Nhấn mạnh tính minh bạch: Mọi case study đều phải có bằng chứng từ Google Search Console, Analytics hoặc hóa đơn Ads."
    ]
  },
  10: {
    title: "10. Quy trình triển khai dự án",
    role: "Loại bỏ nỗi sợ mơ hồ của khách hàng mới, cho họ thấy một lộ trình đồng hành chi tiết từ bước khảo sát đến lúc ra quả ngọt.",
    searchIntent: "quy trình triển khai dự án marketing, các bước hợp tác pgs agency",
    headings: ["H2: Quy trình triển khai hệ thống tăng trưởng số", "H3: Lộ trình 7 giai đoạn đồng hành chiến lược bền vững"],
    metaTitle: "Quy Trình Triển Khai Dự Án Marketing 7 Bước - PGS Agency",
    metaDescription: "Khám phá lộ trình 7 bước tối ưu tăng trưởng số của PGS: Khảo sát, Đánh giá, Lên chiến lược, Thiết lập, Vận hành, Đo lường và Tối ưu liên tục.",
    schema: "HowTo",
    internalLinkOut: ["/dang-ky-tu-van", "/quy-trinh-lam-viec"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Vẽ một đường dẫn quy trình (pipeline) hiện đại nối liền 7 giai đoạn chạy dọc hoặc ngang màn hình tinh tế.",
      "Thiết kế mỗi bước như một trạm dừng chân chứa các icon tối giản bọc trong vòng tròn vàng gold sang trọng.",
      "Tạo độ giãn cách rộng rãi giữa các bước để quy trình trông thật thông thoáng, dễ nắm bắt."
    ],
    developerChecklist: [
      "Lập trình tương tác hover làm sáng trạm hiện tại và hiển thị bong bóng thông tin chi tiết (KPIs, nhân sự phụ trách).",
      "Sử dụng SVG stroke-dasharray để làm hiệu ứng đường vẽ chạy dọc quy trình khi người dùng cuộn chuột (scroll draw).",
      "Đảm bảo hiển thị quy trình co giãn tốt thành dạng timeline dọc hoàn hảo trên thiết bị di động."
    ],
    contentChecklist: [
      "Tóm tắt ngắn gọn nhưng đắt giá nhiệm vụ của 7 bước: Discovery, Audit, Strategy, Build, Launch, Measure, Optimize.",
      "Sử dụng các động từ hành động mạnh mẽ thể hiện tinh thần làm việc chủ động, chuyên nghiệp cao độ của PGS."
    ]
  },
  11: {
    title: "11. FAQ case study",
    role: "Chủ động giải quyết các rào cản tâm lý cuối cùng của khách hàng (hoài nghi số liệu, tính bảo mật, tính ứng dụng theo ngành).",
    searchIntent: "faq case study pgs agency, bao mat thong tin khach hang pgs",
    headings: ["H2: Câu hỏi thường gặp về các dự án tăng trưởng", "H3: Giải đáp chi tiết các hoài nghi của chủ doanh nghiệp"],
    metaTitle: "Câu Hỏi Thường Gặp Về Case Study - PGS Agency",
    metaDescription: "Giải đáp các thắc mắc về tính xác thực của dự án, chính sách bảo mật thông tin NDA, số liệu thực tế và tính ứng dụng của các case study.",
    schema: "FAQPage",
    internalLinkOut: ["/lien-he", "/chinh-sach-bao-mat"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Sử dụng bố cục một cột trung tâm thanh lịch, độ rộng tối đa khoảng 800px để người dùng tập trung tuyệt đối.",
      "Thiết kế các dòng FAQ dạng đóng/mở (accordion) phân tách bằng đường kẻ chỉ mảnh xám nhạt vô cùng tinh xảo.",
      "Sử dụng icon cộng/trừ nhỏ màu vàng gold để chỉ báo trạng thái tương tác trực quan."
    ],
    developerChecklist: [
      "Xây dựng component FAQ đóng mở mượt mà bằng CSS height transition hoặc Framer Motion AnimatePresence.",
      "Đảm bảo các FAQ được lồng thẻ Schema FAQPage chuẩn cấu trúc để hiển thị dạng rich snippets trên Google Search.",
      "Tối ưu hỗ trợ điều hướng FAQ bằng bàn phím (đạt chuẩn accessibility WCAG)."
    ],
    contentChecklist: [
      "Viết câu hỏi trực diện, đánh thẳng vào tâm lý lo lắng của CEO: 'PGS có cam kết số liệu thật không?', 'Làm sao tôi biết ngành của mình áp dụng được?'...",
      "Trả lời mạch lạc, thẳng thắn, khẳng định tính trung thực tuyệt đối là giá trị cốt lõi của PGS Agency."
    ]
  },
  12: {
    title: "12. CTA nhận phân tích",
    role: "Phễu chuyển đổi chính của trang (Conversion Hook). Chuyển hóa người đọc đang tò mò thành khách hàng tiềm năng thực sự.",
    searchIntent: "nhận audit marketing miễn phí, đăng ký tư vấn pgs agency",
    headings: ["H2: Khởi đầu hành trình tăng trưởng số bền vững cùng PGS", "H3: Đăng ký nhận phân tích chuyên sâu dự án từ chuyên gia"],
    metaTitle: "Đăng Ký Phân Tích Cơ Hội Tăng Trưởng Miễn Phí - PGS Agency",
    metaDescription: "Điền thông tin doanh nghiệp của bạn để nhận kế hoạch phân tích tăng trưởng số hóa chuyên biệt từ chuyên gia tư vấn cấp cao tại PGS Agency.",
    schema: "ContactPage",
    internalLinkOut: ["/gui-thong-tin-thành-cong"],
    internalLinkIn: ["/case-study"],
    designerChecklist: [
      "Thiết kế một form đăng ký cao cấp nằm trong card lớn được bo góc mềm mại, phủ lớp nền mờ ảo nhẹ nhàng.",
      "Các ô input nhập liệu có label rõ ràng bên trên, thiết kế border mảnh xám nhạt, đổi màu vàng gold khi focus.",
      "Nút CTA to, nổi bật nhất trên trang với hiệu ứng hover tạo luồng sáng chạy qua nút sang trọng."
    ],
    developerChecklist: [
      "Tích hợp form với API route `/api/audit` để kích hoạt máy chủ AI Gemini phân tích thật và trả về kết quả thời gian thực.",
      "Hiển thị trạng thái loading chuyên nghiệp (lời nhắn động viên đổi liên tục) trong lúc AI đang suy nghĩ.",
      "Lưu trữ tạm thông tin khách gửi vào local storage để tránh mất dữ liệu nếu xảy ra sự cố rớt mạng đột xuất."
    ],
    contentChecklist: [
      "Headline thôi thúc hành động mạnh mẽ: 'Muốn PGS phân tích cơ hội tăng trưởng cho doanh nghiệp của bạn?'",
      "Các nhãn hướng dẫn trực quan, tạo cảm giác yên tâm khi chia sẻ thông tin: 'Bảo mật tuyệt đối thông tin kinh doanh'."
    ]
  }
};
