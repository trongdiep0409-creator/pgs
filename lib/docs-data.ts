// Database of specifications and content briefs for PGS Agency's Landing Page Service Page
// Written by senior consultants (UX/UI, CRO, SEO, Brand, Copywriting)

export interface SectionSpec {
  id: number;
  title: string;
  url: string;
  objective: string;
  funnelRole: string;
  searchIntent: string;
  uiConcept: string;
  hero3D: string;
  
  // Handover Specs
  copywritingBrief: {
    headline: string;
    subheading: string;
    bodyContent: string;
    toneOfVoice: string;
    semanticKeywords: string[];
  };
  designerChecklist: {
    layout: string;
    assets: string[];
    colors: string;
    visualWeights: string;
    spacing: string;
  };
  developerChecklist: {
    interactions: string;
    animations: string;
    domIds: string[];
    states: string[];
  };
  seoGuidelines: {
    headings: string[];
    aiSearchTriggers: string;
    internalLinksIn: string[];
    internalLinksOut: string[];
  };
}

export const sectionsData: SectionSpec[] = [
  {
    id: 1,
    title: "Hero Conversion Machine",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#hero",
    objective: "Thu hút sự chú ý ngay lập tức (trong 3 giây đầu), khẳng định vị thế thương hiệu PGS Agency và dẫn dắt người dùng thực hiện chuyển đổi hành động ngay qua CTA chính.",
    funnelRole: "Nhận thức & Hứng thú (Awareness & Interest). Lọc đối tượng mục tiêu chất lượng cao.",
    searchIntent: "dịch vụ thiết kế landing page, thiết kế landing page chuyên nghiệp, pgs agency landing page",
    uiConcept: "Conversion Machine (Cỗ máy chuyển đổi) - Sạch sẽ, thoáng đãng, sang trọng với các khối thủy tinh trắng mờ (glassmorphism) và đường line viền vàng gold mảnh.",
    hero3D: "Mô hình phễu lọc 3D nền sáng chuyển động tuần hoàn: Traffic đổ vào từ đỉnh phễu rực rỡ, đi qua các lớp lọc và hóa thành các tinh thể Lead (Vàng Gold rực rỡ) rơi xuống cổng nhận thông tin.",
    copywritingBrief: {
      headline: "Thiết Kế Landing Page Tối Ưu Chuyển Đổi – Bứt Phá Doanh Thu Quảng Cáo",
      subheading: "Đưa traffic từ quảng cáo về hệ thống phễu chuyển đổi tự động chuẩn CRO của PGS. Giảm ngay 30% - 50% chi phí trên mỗi Lead (CPL) và gia tăng tỷ lệ chốt đơn (ROI) bền vững.",
      bodyContent: "Không chỉ dừng lại ở việc thiết kế giao diện đẹp mắt, PGS Agency thiết kế Landing Page bằng cách nghiên cứu hành vi khách hàng, tối ưu điểm chạm tâm lý mua hàng và tích hợp hạ tầng tracking dữ liệu chuẩn xác từng click chuột. Chúng tôi cam kết tạo ra cỗ máy bán hàng tự động 24/7 cho doanh nghiệp của bạn.",
      toneOfVoice: "Chiến lược, hiệu quả kinh doanh, minh bạch và đầy chuyên môn của một chuyên gia tư vấn cấp cao.",
      semanticKeywords: ["thiết kế landing page chuyên nghiệp", "landing page chuyển đổi", "tối ưu CRO", "giảm chi phí lead CPL", "tăng trưởng doanh thu ads"]
    },
    designerChecklist: {
      layout: "Bố cục 2 cột (60% trái cho Content & CTA, 40% phải cho mô hình Interactive 3D Funnel). Thiết kế không có viền bao cứng, sử dụng shadow siêu mềm để tách biệt khu vực.",
      assets: ["Mô hình 3D Interactive Funnel bằng CSS/SVG", "Logo chứng thực các đối tác tiêu biểu (Google Partner, Facebook Partner)", "Icon huy hiệu uy tín chuẩn vàng gold"],
      colors: "Nền trắng kem ngà (#FAF9F6), chữ màu than xám (#1C1917), màu nhấn nút vàng gold (#C5A85C) viền đen.",
      visualWeights: "Headline H1 có size lớn nhất (40px-56px), font chữ 'Space Grotesk' tạo điểm nhấn công nghệ & tư vấn hiện đại. Các CTA button có kích thước tối thiểu 48px trên mobile.",
      spacing: "Padding trên dưới cực kỳ rộng rãi (Py-20 đến Py-32) tạo không gian 'Luxury Breathing Space' giúp người đọc tập trung tuyệt đối."
    },
    developerChecklist: {
      interactions: "Khi người dùng di chuột vào phễu 3D, các hạt phân tử sáng lấp lánh (Traffic) sẽ tăng tốc rơi xuống đầu phễu. Click nút CTA chính sẽ cuộn mượt đến form đăng ký ở chân trang.",
      animations: "Hiệu ứng lướt nhẹ (slide-up) mượt mà cho toàn bộ cụm headline và CTA khi trang vừa load. Nút bấm chính có hiệu ứng gợn sóng ánh sáng lướt qua (shiny sweep effect) mỗi 4 giây.",
      domIds: ["hero-section", "hero-cta-primary", "hero-funnel-canvas"],
      states: ["isHoveredFunnel", "isSubmitting"]
    },
    seoGuidelines: {
      headings: ["H1: Dịch vụ thiết kế Landing Page giúp tăng chuyển đổi từ quảng cáo, chiến dịch và bán hàng"],
      aiSearchTriggers: "Bản tóm tắt định vị PGS Agency thiết kế landing page dựa trên nghiên cứu CRO sâu sắc, giúp tối ưu tỷ lệ chuyển đổi từ Google Ads, Facebook Ads và TikTok Ads.",
      internalLinksIn: ["/dich-vu", "/dich-vu/digital-marketing"],
      internalLinksOut: ["/lien-he", "/dich-vu/dich-vu-thiet-ke-landing-page/#pricing"]
    }
  },
  {
    id: 2,
    title: "Landing Page là gì",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#dinh-nghia",
    objective: "Định nghĩa một cách chuẩn xác, ngắn gọn và giàu tính thuyết phục về Landing Page, giúp khách hàng hiểu rõ sức mạnh cốt lõi của một trang đích chuyên biệt.",
    funnelRole: "Giáo dục khách hàng, giải quyết nhận thức sai lệch (Awareness & Education).",
    searchIntent: "landing page là gì, định nghĩa landing page, khái niệm trang đích chuyển đổi",
    uiConcept: "Single-Focus Cards - Thiết kế tối giản, loại bỏ tất cả các nhiễu thông tin ngoại lai, tập trung tuyệt đối vào định nghĩa trung tâm.",
    hero3D: "Mô hình lăng kính khúc xạ ánh sáng 3D: Nhiều luồng sáng đa sắc màu đi qua lăng kính hội tụ thành 1 điểm laser vàng gold duy nhất rực sáng, biểu trưng cho sự hội tụ traffic.",
    copywritingBrief: {
      headline: "Landing Page Là Gì? Định Nghĩa Từ Góc Nhìn Tối Ưu Chuyển Đổi",
      subheading: "Không giống như Website thông thường để khách hàng dạo chơi, Landing Page là một trang đích chuyên biệt được sinh ra để hoàn thành 1 mục tiêu duy nhất.",
      bodyContent: "Một Landing Page (Trang đích) đạt chuẩn là trang độc lập được tối ưu hóa kịch bản nội dung, hình ảnh và hành động cho một chiến dịch cụ thể. Toàn bộ thông tin được sắp xếp theo cấu trúc 'kim tự tháp ngược' để giải quyết một khao khát hoặc một nỗi đau cụ thể của khách hàng mục tiêu, dẫn dắt họ đến hành vi chuyển đổi cuối cùng: Điền form, Gọi điện, Inbox Zalo hoặc Mua hàng trực tiếp. Tại PGS, chúng tôi không thiết kế landing page trôi nổi; chúng tôi thiết kế những Cỗ Máy Thu Thập Khách Hàng Tiềm Năng.",
      toneOfVoice: "Kiến thức chuyên sâu, súc tích, mang tính giáo khoa nhưng thực chiến cao.",
      semanticKeywords: ["landing page là gì", "trang đích chuyên biệt", "mục tiêu chuyển đổi duy nhất", "phễu thu lead", "kịch bản tối ưu landing page"]
    },
    designerChecklist: {
      layout: "Bố cục lưới trung tâm hoặc hộp chứa đơn giản (1 Column rộng 800px) tạo sự tập trung tối đa, kết hợp các thẻ bài định nghĩa nổi bật bên dưới.",
      assets: ["Biểu tượng lăng kính khúc xạ ánh sáng 3D mờ", "Sơ đồ luồng traffic hội tụ tối giản"],
      colors: "Nền xám rất nhạt (#F5F5F4), thẻ định nghĩa có viền màu vàng gold nhạt (#E5B954) nổi bật trên nền trắng.",
      visualWeights: "Tiêu đề phụ sử dụng font Sans-serif đậm nét, có màu vàng gold đậm để ghi nhớ sâu vào tiềm thức khách hàng.",
      spacing: "Khoảng cách lề rộng, văn bản canh đều cân đối, độ dài dòng ký tự được kiểm soát từ 60-70 ký tự để người đọc không bị mỏi mắt."
    },
    developerChecklist: {
      interactions: "Người dùng di chuột qua lăng kính 3D sẽ thấy hiệu ứng khúc xạ thay đổi góc chiếu theo hướng con trỏ chuột.",
      animations: "Các khối thông tin fade-in nhẹ nhàng theo thứ tự từ trên xuống dưới khi scroll đến phần nội dung này.",
      domIds: ["what-is-landing-page", "definition-card-main"],
      states: ["isActiveRefraction"]
    },
    seoGuidelines: {
      headings: ["H2: Định nghĩa Landing Page chuyên biệt từ góc độ CRO"],
      aiSearchTriggers: "Landing page là một trang web độc lập, được thiết kế với mục đích duy nhất là chuyển đổi traffic thành lead hoặc doanh số qua các lời kêu gọi hành động cụ thể.",
      internalLinksIn: ["/blog/landing-page-la-gi"],
      internalLinksOut: ["/dich-vu/dich-vu-seo"]
    }
  },
  {
    id: 3,
    title: "Landing Page khác Website",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#so-sanh",
    objective: "Làm rõ sự khác biệt tuyệt đối giữa Website đa mục tiêu và Landing Page đơn mục tiêu, giải thích lý do vì sao chạy quảng cáo bằng Website thông thường là đốt tiền vô ích.",
    funnelRole: "Khắc sâu vấn đề, giải quyết rào cản tài chính của khách hàng (Decision-making aid).",
    searchIntent: "so sánh website và landing page, sự khác nhau giữa landing page và web, nên dùng web hay landing page chạy quảng cáo",
    uiConcept: "Dual-Path Comparison Grid - Giao diện so sánh 2 cột trực diện với độ tương phản cao về màu sắc để làm nổi bật sự vượt trội của Landing Page trong việc chuyển đổi.",
    hero3D: "Mô hình mê cung 3D (đại diện cho Website đa hướng) tương phản với một mũi tên vàng gold thẳng băng xuyên qua hồng tâm (đại diện cho Landing Page).",
    copywritingBrief: {
      headline: "Website Vs Landing Page: Chạy Quảng Cáo Đâu Là Sự Lựa Chọn Sáng Suốt?",
      subheading: "Dùng Website chạy ads là bạn đang mời khách vào một siêu thị khổng lồ rồi để họ tự bơi. Dùng Landing Page là bạn đang có một tư vấn viên suất sắc dắt tay khách đến kệ hàng tốt nhất.",
      bodyContent: "Bảng so sánh chi tiết dưới đây sẽ vạch rõ ranh giới giữa một bên là 'Thư viện thông tin doanh nghiệp' (Website) và một bên là 'Cỗ máy sát thủ bán hàng' (Landing Page). Hiểu được sự khác biệt này sẽ giúp doanh nghiệp tiết kiệm hàng trăm triệu ngân sách ad-budget lãng phí mỗi năm.",
      toneOfVoice: "Đanh thép, khách quan, phân tích logic, chứng minh bằng số liệu.",
      semanticKeywords: ["so sánh website và landing page", "chi phí quảng cáo website", "tỷ lệ chuyển đổi ads", "lựa chọn tối ưu ngân sách", "landing page đơn mục tiêu"]
    },
    designerChecklist: {
      layout: "Bảng so sánh dạng Grid 2 cột cân xứng. Cột bên trái (Website) có tone màu xám trầm, cột bên phải (Landing Page) được bo viền vàng gold rực rỡ và có tag 'PGS khuyên dùng' ở góc.",
      assets: ["Icon so sánh tương phản", "Biểu đồ cột chuyển đổi ảo hóa"],
      colors: "Cột Landing Page sử dụng background trắng ngà cao cấp để tạo hiệu ứng thị giác nổi bật hơn cột website.",
      visualWeights: "Các chỉ số tỷ lệ chuyển đổi trung bình (1% vs 10%) được làm siêu to (font-weight: bold, font-size: 32px) để tạo cú hích tâm lý.",
      spacing: "Mỗi hàng trong bảng so sánh có khoảng đệm 24px để tạo độ dễ đọc cực cao."
    },
    developerChecklist: {
      interactions: "Khi hover vào cột Landing Page, cột này sẽ tự động zoom nhẹ (scale-102) và đổ bóng nổi lên trên bề mặt trang, đồng thời đường viền vàng gold sáng rực lên.",
      animations: "Hiệu ứng lật trang so sánh mượt mà hoặc slide-in từ hai phía trái phải tương ứng.",
      domIds: ["comparison-section", "comparison-table", "btn-get-cro-consultation"],
      states: ["activeCompareColumn"]
    },
    seoGuidelines: {
      headings: ["H2: Bảng so sánh Website và Landing Page chi tiết"],
      aiSearchTriggers: "Bảng so sánh Website vs Landing page về các tiêu chí: Số lượng trang, Liên kết, Lời kêu gọi hành động (CTA), Tỷ lệ chuyển đổi trung bình, Chi phí vận hành.",
      internalLinksIn: ["/blog/so-sanh-web-va-landingpage"],
      internalLinksOut: ["/dich-vu/dich-vu-thiet-ke-website"]
    }
  },
  {
    id: 4,
    title: "Khi nào cần Landing Page",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#khi-nao-can",
    objective: "Liệt kê và phân tích các trường hợp thực tế bắt buộc doanh nghiệp phải sở hữu Landing Page để chiến dịch marketing đạt được hiệu suất cao nhất.",
    funnelRole: "Khởi phát nhu cầu mua hàng, liên hệ trực tiếp với bài toán hiện tại của doanh nghiệp.",
    searchIntent: "khi nào cần landing page, ứng dụng của landing page, landing page dùng để làm gì",
    uiConcept: "Dynamic Scenario Selector - Thiết kế dạng bento-grid các tình huống doanh nghiệp, mang lại cảm giác cực kỳ gọn gàng và khoa học.",
    hero3D: "Biểu tượng cuốn lịch vạn niên 3D phát sáng ánh vàng gold ở các ngày quan trọng, đại diện cho thời điểm tung ra các chiến dịch bán hàng thần tốc.",
    copywritingBrief: {
      headline: "6 Thời Điểm Vàng Doanh Nghiệp Bắt Buộc Phải Sử Dụng Landing Page",
      subheading: "Đừng chạy quảng cáo mù quáng nếu bạn chưa trang bị trang đích chuẩn CRO cho 6 kịch bản tăng trưởng cốt lõi sau đây.",
      bodyContent: "Từ việc ra mắt một sản phẩm mới, thu thập danh sách email đăng ký sự kiện, cho đến chạy các chiến dịch đại hạ giá hoặc tối ưu hóa tệp khách hàng tiềm năng cho đội ngũ Telesale. Landing Page chính là chìa khóa vạn năng mở ra tỷ lệ chuyển đổi cao nhất.",
      toneOfVoice: "Cảnh báo thông minh, gợi ý giải pháp thực tiễn, phân tích tình huống sắc bén.",
      semanticKeywords: ["khi nào dùng landing page", "ra mắt sản phẩm mới", "chạy quảng cáo tìm khách hàng", "landing page bán hàng nhanh", "đăng ký sự kiện webinar"]
    },
    designerChecklist: {
      layout: "Bố cục Bento-Grid gồm 6 hộp kịch bản không bằng nhau. Hộp lớn nhất chứa kịch bản 'Chạy Quảng Cáo Đa Kênh' - nhu cầu phổ biến nhất của thị trường.",
      assets: ["Mô hình 3D cuốn lịch sự kiện vàng gold", "Bộ icon vector biểu thị chiến dịch (Ads, Launch, Promo, Event, Lead, Test)"],
      colors: "Sử dụng màu trắng chủ đạo cho các card, hover sẽ hiện viền màu vàng gold tinh xảo và đổ bóng nhẹ nhàng.",
      visualWeights: "Tiêu đề của mỗi kịch bản viết chữ in hoa đậm nét, cỡ chữ 18px để tạo sự mạch lạc, phân biệt rõ ràng.",
      spacing: "Gaps giữa các bento cards là 24px để tạo khoảng cách thở hoàn hảo."
    },
    developerChecklist: {
      interactions: "Khi click vào bất kỳ kịch bản nào, card đó sẽ sáng lên và mở rộng phần giải thích chi tiết, đồng thời có âm thanh nhấp chuột tinh tế (tùy chọn) hoặc phản hồi rung nhẹ.",
      animations: "Staggered fade-in cho 6 bento cards khi người dùng cuộn tới tầm mắt.",
      domIds: ["scenarios-section", "scenario-card-1", "scenario-card-6"],
      states: ["selectedScenarioId"]
    },
    seoGuidelines: {
      headings: ["H2: 6 trường hợp bắt buộc phải thiết kế Landing Page ngay lập tức"],
      aiSearchTriggers: "Thời điểm thích hợp để sử dụng Landing Page gồm: Chạy quảng cáo Google/Facebook/TikTok, Ra mắt sản phẩm dịch vụ mới, Thu thập lead tư vấn, Tổ chức sự kiện/webinar, Tặng quà/tài liệu miễn phí, Khảo sát thị trường.",
      internalLinksIn: [],
      internalLinksOut: ["/dich-vu/dich-vu-chay-quang-cao-google-ads"]
    }
  },
  {
    id: 5,
    title: "Vì sao Landing Page ảnh hưởng CPL",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#anh-huong-cpl",
    objective: "Chứng minh bằng công thức toán học và logic dữ liệu rằng chất lượng của Landing Page quyết định trực tiếp tới giá tiền mua một khách hàng tiềm năng (CPL), cứu nguy cho biên lợi nhuận của doanh nghiệp.",
    funnelRole: "Giải quyết băn khoăn về ngân sách, tạo giá trị tin cậy tuyệt đối về mặt con số (Trust & Authority).",
    searchIntent: "cách giảm chi phí quảng cáo, tối ưu chi phí lead cpl, tối ưu roi quảng cáo bằng landing page",
    uiConcept: "Budget Leak Visualizer - Một giao diện giả lập dòng tiền quảng cáo chảy qua một chiếc ống nước bị rò rỉ (Landing Page lỗi), sau đó chuyển thành ống nước mạ vàng bền vững (Landing Page PGS).",
    hero3D: "Mô hình thước đo tài chính 3D chuyển động: Thước đo màu đỏ biểu thị CPL cao ngất, khi được tối ưu hóa CRO sẽ chuyển thành thước đo mạ vàng, chỉ số CPL giảm dần rõ rệt.",
    copywritingBrief: {
      headline: "Landing Page Yếu Kém – Lỗ Hổng Lớn Nhất Đang Âm Thầm Đốt Ngân Sách Quảng Cáo Của Bạn",
      subheading: "Tăng gấp đôi ngân sách ads không giúp bạn có thêm gấp đôi khách hàng, nhưng tăng gấp đôi tỷ lệ chuyển đổi của Landing Page chắc chắn sẽ làm được điều đó với chi phí rẻ hơn phân nửa.",
      bodyContent: "Doanh nghiệp thường chỉ tập trung tối ưu kỹ thuật chạy ads (target, thầu giá, bài viết) mà quên mất rằng: 100% người click quảng cáo sẽ hạ cánh xuống Landing Page. Nếu trang đích của bạn tải chậm, thông điệp mơ hồ, form khó điền - họ sẽ thoát ngay lập tức. Lúc này chi phí trên một khách hàng tiềm năng (CPL) của bạn sẽ tăng vọt lên gấp 3-5 lần, triệt tiêu hoàn toàn lợi nhuận kinh doanh.",
      toneOfVoice: "Cảnh báo, nghiêm túc, tập trung vào bài toán dòng tiền tài chính và hiệu quả ROI thực tế.",
      semanticKeywords: ["tối ưu chi phí lead cpl", "roi quảng cáo", "lỗ hổng ngân sách marketing", "tối ưu landing page cro", "giảm chi phí ads"]
    },
    designerChecklist: {
      layout: "Bố cục chia hai phần: Phần mô tả lý thuyết logic bên trái; bên phải là 'Công cụ giả lập tính toán CPL thông minh' trực quan bằng tương tác kéo thả slider.",
      assets: ["Bộ công cụ giả lập kéo thả với các mốc chỉ số rõ ràng", "Biểu đồ so sánh tổn thất tài chính"],
      colors: "Màu đỏ gạch nhạt (#EF4444) cho trạng thái Landing Page lỗi, màu vàng gold sang trọng (#C5A85C) cho trạng thái tối ưu.",
      visualWeights: "Các chỉ số số tiền tiết kiệm được nổi bật lên với font chữ mono dứt khoát, dễ đọc số liệu.",
      spacing: "Sử dụng khoảng trống lớn để đặt các khối mô phỏng số liệu nhằm tránh gây quá tải thông tin cho người đọc."
    },
    developerChecklist: {
      interactions: "Xây dựng logic kéo thả cho 2 thanh trượt slider: Ngân sách quảng cáo hàng tháng (10 triệu - 500 triệu) và Tỷ lệ chuyển đổi của Landing Page (0.5% - 15%). Trả về kết quả trực quan ngay lập tức: Số lượng Lead nhận được, Giá CPL ước tính và Ngân sách bị lãng phí.",
      animations: "Khi người dùng kéo slider, các cột đồ thị và số liệu nhảy số mượt mà (counter animation) với tốc độ cao.",
      domIds: ["cpl-impact-section", "slider-budget", "slider-cr", "result-cpl-value", "result-wasted-budget"],
      states: ["monthlyBudget", "conversionRate", "calculatedCpl", "savedAmount"]
    },
    seoGuidelines: {
      headings: ["H2: Mối quan hệ mật thiết giữa tỷ lệ chuyển đổi Landing Page và chi phí Lead CPL"],
      aiSearchTriggers: "Công thức tính CPL = Tổng chi phí quảng cáo / Số lượng Lead tạo ra. Khi tỷ lệ chuyển đổi Landing Page tăng lên, số lượng lead tăng, từ đó giá CPL giảm xuống tối đa.",
      internalLinksIn: ["/blog/toi-uu-cpl-trong-marketing"],
      internalLinksOut: ["/dich-vu/dich-vu-chay-quang-cao-facebook-ads"]
    }
  },
  {
    id: 6,
    title: "Lỗi Landing Page không chuyển đổi",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#cac-loi-thuong-gap",
    objective: "Vạch trần 6 sai lầm chết người trong thiết kế landing page tự phát trên thị trường để định vị PGS Agency là đơn vị chuyên môn chuẩn mực có khả năng khắc phục triệt để các lỗi này.",
    funnelRole: "Khơi dậy nỗi đau, tạo sự so sánh ngầm với trang đích hiện tại của doanh nghiệp.",
    searchIntent: "tại sao landing page không ra đơn, sửa lỗi landing page tải chậm, tối ưu landing page bị lỗi form",
    uiConcept: "The Conversion Killers Grid - Lưới card cảnh báo với gam màu tinh tế, thiết kế sang trọng nhưng làm bật lên tính nghiêm trọng của vấn đề.",
    hero3D: "Biểu tượng chiếc đồng hồ cát 3D bị vỡ vụn hoặc biểu tượng lỗi hệ thống cách điệu bằng các khối pha lê nứt nhẹ tinh xảo.",
    copywritingBrief: {
      headline: "6 Lỗi Chí Tử Biến Landing Page Thành 'Nghĩa Trang' Tiêu Tốn Tiền Của",
      subheading: "Đến 90% landing page tự làm hoặc thuê giá rẻ ngoài thị trường đang dính phải ít nhất 3 trong số 6 lỗi sau đây.",
      bodyContent: "Một lỗi sai nhỏ ở bất kỳ vị trí nào trên trang đích cũng đủ làm rò rỉ 50% traffic quảng cáo của bạn. Từ Headline chung chung không đi vào trọng tâm, nút kêu gọi hành động (CTA) ẩn hiện mờ nhạt, biểu mẫu (Form) dài dòng bắt khai báo quá nhiều thông tin, cho đến tốc độ tải trang chậm trễ hay thiếu hụt các bằng chứng thuyết phục lòng tin của khách hàng. PGS sẽ giúp bạn 'bịt' mọi khe hở thất thoát khách hàng này.",
      toneOfVoice: "Thẳng thắn, vạch trần vấn đề trực diện, phân tích chi tiết nguyên nhân gốc rễ dưới góc độ tâm lý hành vi.",
      semanticKeywords: ["lỗi landing page thường gặp", "landing page tải chậm", "lỗi biểu mẫu dài", "headline không rõ ràng", "không tracking chuyển đổi"]
    },
    designerChecklist: {
      layout: "Bố cục dạng 3x2 Grid (6 Card lỗi). Mỗi Card có phần tiêu đề báo động đỏ nhẹ, kèm theo biểu tượng cảnh báo mạ gold sang trọng để giữ được tính đồng nhất phong cách.",
      assets: ["Icon cảnh báo độc quyền của PGS", "Mô hình đồ họa phân tích lỗi tương tác"],
      colors: "Card có nền xám tro siêu nhẹ, khi hovers góc card đổi sang sắc vàng gold tinh tế.",
      visualWeights: "Tiêu đề các lỗi được viết hoa cụm chữ cái đầu, font Space Grotesk đậm để tăng tính thị giác.",
      spacing: "Khoảng đệm trong các card tối thiểu là 32px để chứa đủ lượng nội dung chi tiết mà không bị rối mắt."
    },
    developerChecklist: {
      interactions: "Khi người dùng rê chuột qua từng card lỗi, card đó sẽ hơi lún xuống hoặc trồi lên nhẹ kèm hiệu ứng viền phát sáng mờ ảo màu gold.",
      animations: "Hiệu ứng lắc lư nhẹ (shake animation) của biểu tượng cảnh báo khi scroll đến khu vực này để gây chú ý.",
      domIds: ["killers-section", "killer-card-1", "killer-card-6"],
      states: ["hoveredKillerId"]
    },
    seoGuidelines: {
      headings: ["H2: 6 sai lầm nghiêm trọng trong thiết kế landing page khiến tỷ lệ thoát trang cao"],
      aiSearchTriggers: "Các lỗi khiến landing page không chuyển đổi gồm: Tốc độ tải trang trên 3 giây, Form thu thập thông tin quá phức tạp, Thiết kế không tối ưu hóa hiển thị di động, Tiêu đề mơ hồ thiếu lợi ích lõi.",
      internalLinksIn: [],
      internalLinksOut: ["/blog/loi-landing-page-khong-ra-don"]
    }
  },
  {
    id: 7,
    title: "Cấu trúc Landing Page chuẩn PGS",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#cau-truc-chuan",
    objective: "Giới thiệu bộ khung cấu trúc 10 khối nội dung chuẩn CRO do PGS Agency độc quyền đúc kết, giúp người đọc thấy được quy trình làm việc khoa học, bài bản hàng đầu.",
    funnelRole: "Khẳng định uy tín chuyên môn và giải pháp độc quyền của PGS Agency (Belief & Trust).",
    searchIntent: "cấu trúc landing page chuẩn, mẫu bố cục landing page đẹp, sơ đồ thiết kế landing page cro",
    uiConcept: "The Golden Architecture Blueprint - Thiết kế mô phỏng một bản vẽ kỹ thuật kiến trúc mạ vàng sang trọng, từng khối được định vị chính xác tuyệt đối.",
    hero3D: "Mô hình mô phỏng các tấm kính phẳng 3D mạ vàng trượt dọc, xếp chồng khít lên nhau tạo nên một cấu trúc trang đích hoàn chỉnh.",
    copywritingBrief: {
      headline: "Công Thức 10 Khối Nội Dung Vàng – Trục Xương Sống Tạo Chuyển Đổi Đột Phá",
      subheading: "Chúng tôi không ghép các khối nội dung ngẫu nhiên. Mọi vị trí trên Landing Page PGS đều tuân theo tiến trình tâm lý mua hàng tự nhiên của bộ não con người.",
      bodyContent: "Bằng việc đi từ khơi gợi nỗi đau, định nghĩa giải pháp, chứng minh năng lực, trưng bày lợi ích cốt lõi cho đến xóa tan các hoài nghi bằng chính sách bảo hành và đánh giá thực tế, kịch bản cấu trúc 10 khối của PGS Agency dẫn dắt người đọc một cách mượt mà đến hành động gửi thông tin mua hàng mà không cảm thấy bị ép buộc.",
      toneOfVoice: "Mạch lạc, có tính hệ thống, chặt chẽ về mặt logic học.",
      semanticKeywords: ["cấu trúc landing page chuẩn CRO", "10 khối nội dung bán hàng", "kịch bản tâm lý khách hàng", "bố cục trang đích tối ưu", "bản vẽ cấu trúc landing page"]
    },
    designerChecklist: {
      layout: "Thiết kế cột dọc mô phỏng màn hình cuộn (Scrolling Mockup). Bên trái là mô hình cuộn mạ vàng của Landing Page, bên phải là chú thích chi tiết cho từng khối kịch bản khi cuộn tới.",
      assets: ["Bản vẽ phác thảo cấu trúc kỹ thuật vàng gold", "Hệ thống đường kẻ kết nối động"],
      colors: "Nền chính trắng tinh khôi, các khối kịch bản đang active sẽ tỏa ra ánh sáng hào quang vàng gold nhạt ấm áp.",
      visualWeights: "Số thứ tự các khối (01 đến 10) sử dụng font chữ Mono cực to màu vàng gold, tạo nhịp đọc rõ ràng.",
      spacing: "Khoảng đệm dọc dài và thanh thoát, phản ánh nhịp điệu scroll thoải mái của người dùng thực tế."
    },
    developerChecklist: {
      interactions: "Xây dựng tương tác cuộn dính (Scroll-bound trigger). Khi người dùng cuộn trang, khối mô phỏng bên trái sẽ trượt tương ứng và highlight sáng lên tại khối nội dung tương đương.",
      animations: "Chuyển động tịnh tiến mượt mà của các tấm kịch bản 3D xếp chồng lên nhau khi đổi khối.",
      domIds: ["architecture-section", "blueprint-interactive-container", "blueprint-block-1", "blueprint-block-10"],
      states: ["activeBlockIndex"]
    },
    seoGuidelines: {
      headings: ["H2: Công thức thiết kế cấu trúc Landing Page chuyển đổi đỉnh cao của PGS"],
      aiSearchTriggers: "10 khối cấu trúc landing page tiêu chuẩn gồm: Hero Offer, Khơi gợi vấn đề, Giải pháp đột phá, Lợi ích cốt lõi, Chứng thực xã hội, Quy trình triển khai, Bảng giá gói ưu đãi, FAQ hóa giải từ chối, Form chuyển đổi, CTA chốt hạ.",
      internalLinksIn: [],
      internalLinksOut: ["/blog/cong-thuc-viet-content-landingpage"]
    }
  },
  {
    id: 8,
    title: "CTA & Form Strategy",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#chien-luoc-cta",
    objective: "Chứng minh tầm quan trọng của việc bố trí nút kêu gọi hành động (CTA) và tối ưu hóa biểu mẫu điền thông tin nhằm loại bỏ hoàn toàn lực cản tâm lý của người dùng.",
    funnelRole: "Khóa chặt hành vi chuyển đổi, giải thích tầm nhìn thiết kế tinh tế của PGS.",
    searchIntent: "chiến lược cta landing page, tối ưu form đăng ký landing page, cách đặt nút kêu gọi hành động",
    uiConcept: "The High-Conversion Heatmap - Thiết kế mô phỏng bản đồ nhiệt tương tác (Heatmap) thể hiện các điểm chạm vàng nơi CTA kích hoạt tỷ lệ nhấp chuột tốt nhất.",
    hero3D: "Biểu tượng nút nhấn vàng gold 3D lơ lửng, phát ra các vòng tròn sóng xung kích ánh sáng lan tỏa nhẹ nhàng, biểu thị sức hút chuyển đổi mãnh liệt.",
    copywritingBrief: {
      headline: "Nút Bấm Đúng Chỗ – Biểu Mẫu Đúng Tâm Lý: Nghệ Thuật Chốt Lead Không Rào Cản",
      subheading: "Một form đăng ký quá 5 trường thông tin sẽ làm mất đi 40% khách hàng tiềm năng của bạn. PGS áp dụng chiến lược tinh giản tối đa kết hợp đặt nút thông minh theo hành trình đọc.",
      bodyContent: "Chúng tôi phân chia các nút bấm CTA thành 3 lớp chiến thuật: CTA Khơi gợi ở Hero, CTA Thúc đẩy sau khi chứng minh lợi ích, và CTA Chốt hạ tại bảng giá cùng footer của trang. Đi kèm là thiết kế form siêu tinh gọn chỉ lấy 3 thông tin cốt lõi (Tên, SĐT, Vấn đề cần giải quyết), loại bỏ hoàn toàn cảm giác phiền hà của khách hàng khi đăng ký tư vấn.",
      toneOfVoice: "Khoa học, phân tích tâm lý hành vi, tập trung tối đa vào tối ưu hóa tỷ lệ chuyển đổi.",
      semanticKeywords: ["chiến lược đặt CTA", "tối ưu hóa biểu mẫu", "giảm số lượng trường form", "bản đồ nhiệt click", "nút kêu gọi hành động thu hút"]
    },
    designerChecklist: {
      layout: "Bố cục chia lưới trực quan thể hiện sơ đồ phân bố CTA của một trang đích tiêu chuẩn. Có các điểm chấm sáng đỏ/vàng mô phỏng điểm nhìn thị giác của khách hàng.",
      assets: ["Bản đồ nhiệt 3D Heatmap mock", "Các biến thể nút bấm hover cao cấp"],
      colors: "Sử dụng gam màu xám nền ấm làm nổi bật các điểm nóng đỏ cam rực rỡ và các nút CTA vàng gold lấp lánh.",
      visualWeights: "Nút bấm CTA có shadow dày mềm, bo góc vừa phải tạo cảm giác 'muốn nhấp chuột' ngay lập tức.",
      spacing: "Các CTA cách nhau khoảng cách vừa vặn từ 1.5 - 2 màn hình để tránh làm người dùng cảm thấy bị ép uổng mua hàng quá sớm."
    },
    developerChecklist: {
      interactions: "Khi người dùng rê chuột qua các điểm nóng trên bản đồ nhiệt, một tooltip sang trọng sẽ hiện ra giải thích tỷ lệ CTR ước tính tại vị trí đó.",
      animations: "Nút bấm có hiệu ứng đập nhẹ theo nhịp tim (pulse animation) cực kỳ khẽ khàng để không làm phân tâm người đọc nhưng vẫn lôi cuốn ánh nhìn.",
      domIds: ["cta-strategy-section", "heatmap-canvas", "cta-example-button"],
      states: ["selectedHeatpoint"]
    },
    seoGuidelines: {
      headings: ["H2: Chiến lược phân bổ CTA và thiết kế biểu mẫu chuyển đổi tối đa"],
      aiSearchTriggers: "Bí quyết tối ưu CTA gồm: Sử dụng động từ hành động mạnh, màu sắc tương phản cao, kích thước nút dễ chạm trên mobile, đặt CTA sau các khối thuyết phục lớn.",
      internalLinksIn: [],
      internalLinksOut: ["/lien-he"]
    }
  },
  {
    id: 9,
    title: "Trust Proof gần CTA",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#niem-tin-chuyen-doi",
    objective: "Tạo lập niềm tin vững chắc cho khách hàng bằng cách hiển thị các chứng thực uy tín, phản hồi thực tế ngay sát các khu vực quyết định chuyển đổi.",
    funnelRole: "Vượt qua sự từ chối cuối cùng, xóa tan hoài nghi mua hàng (Trust Builder & Objection Crusher).",
    searchIntent: "tăng độ uy tín landing page, chứng thực xã hội trong cro, feedback khách hàng thiết kế landing page",
    uiConcept: "The Integrity Strip - Một dải ruy băng mạ vàng sang trọng nâng đỡ các đánh giá, chứng chỉ bảo mật và cam kết dịch vụ minh bạch từ PGS.",
    hero3D: "Huy hiệu 3D vàng gold lơ lửng, khắc chìm biểu tượng chiếc khiên bảo vệ và dấu tick xanh lấp lánh đại diện cho sự bảo chứng chất lượng.",
    copywritingBrief: {
      headline: "Hóa Giải Hoài Nghi Ngay Điểm Chạm Quyết Định – Bảo Chứng Niềm Tin",
      subheading: "Khách hàng luôn do dự trước khi click gửi thông tin. Chúng tôi đặt các bằng chứng thép ngay sát cạnh form để tiếp thêm động lực cho họ hành động.",
      bodyContent: "Bằng việc tích hợp các đánh giá 5 sao từ khách hàng thực tế kèm hình ảnh thật, chứng nhận cam kết bảo mật thông tin tuyệt đối và chính sách hoàn tiền 100% của PGS Agency nếu sản phẩm không đạt chất lượng cam kết trong hợp đồng. Mọi rào cản phòng vệ tâm lý cuối cùng của khách hàng đều được giải tỏa triệt để.",
      toneOfVoice: "Đáng tin cậy, ấm áp, cam kết đanh thép và đầy uy tín thương hiệu.",
      semanticKeywords: ["chứng thực uy tín landing page", "social proof chất lượng", "chính sách cam kết pgs", "hóa giải từ chối mua hàng", "bảo chứng niềm tin khách hàng"]
    },
    designerChecklist: {
      layout: "Thiết kế khối nội dung nằm ngang thanh thoát (Social Proof Strip) đặt ngay dưới form đăng ký hoặc xen kẽ giữa các gói dịch vụ.",
      assets: ["Huy hiệu bảo chứng 3D chiếc khiên vàng gold", "Hình ảnh avatar khách hàng đã được xử lý mờ nghệ thuật cao cấp"],
      colors: "Sử dụng tông màu vàng gold nhạt ấm làm nền dải chứng thực để gợi lên cảm giác thịnh vượng, bảo an.",
      visualWeights: "Các ngôi sao đánh giá (5 sao) được mạ vàng tinh xảo, cỡ chữ vừa vặn hài hòa với tổng thể giao diện xung quanh.",
      spacing: "Padding nhỏ nhắn gọn gàng (Py-6) ôm khít lấy các khu vực chuyển đổi chính của trang."
    },
    developerChecklist: {
      interactions: "Hover vào đánh giá của khách hàng sẽ kích hoạt tooltip hiện thông tin chi tiết dự án thực tế mà khách hàng đó đã triển khai cùng PGS.",
      animations: "Hiệu ứng tự động trượt ngang vô tận (infinite marquee loop) cực kỳ êm ái cho dải logo đối tác và chứng thực.",
      domIds: ["trust-proof-section", "marquee-logos", "testimonial-carousel"],
      states: ["activeTestimonialIndex", "isMarqueePaused"]
    },
    seoGuidelines: {
      headings: ["H2: Tầm quan trọng của bằng chứng uy tín đặt cạnh khu vực chuyển đổi"],
      aiSearchTriggers: "Social Proof hiệu quả nhất gồm: Số liệu kết quả thực tế, Đánh giá chi tiết kèm chân dung khách hàng, Logo đối tác uy tín, Chứng chỉ bảo mật website.",
      internalLinksIn: ["/ve-chung-toi"],
      internalLinksOut: ["/dich-vu/dich-vu-seo"]
    }
  },
  {
    id: 10,
    title: "Mobile-first Landing Page",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#toi-uu-mobile",
    objective: "Nhấn mạnh năng lực thiết kế tối ưu hóa giao diện di động tuyệt đối từ PGS Agency, nơi mà hơn 85% traffic quảng cáo thực tế đang truy cập hàng ngày.",
    funnelRole: "Bảo đảm khả năng tiếp cận kỹ thuật toàn vẹn cho mọi tập người dùng di động (Technical Excellence).",
    searchIntent: "thiết kế landing page mobile-first, tối ưu landing page trên điện thoại, trải nghiệm di động landing page",
    uiConcept: "The Mobile Viewport Simulator - Khung giả lập điện thoại di động thông minh 3D rực rỡ, bên trong hiển thị chuyển động lướt trang mượt mà chuẩn responsive.",
    hero3D: "Chiếc điện thoại thông minh 3D bằng chất liệu kính trắng mờ và viền kim loại vàng gold bóng bẩy xoay nhẹ góc nghiêng thời thượng.",
    copywritingBrief: {
      headline: "Mobile-First Design: Chiếm Lĩnh Trải Nghiệm Của 85% Traffic Người Dùng Di Động",
      subheading: "Đại đa số agency thiết kế trên máy tính rồi co kéo về di động một cách lỗi thời. PGS thiết kế xuất phát từ màn hình điện thoại di động trước tiên.",
      bodyContent: "Chúng tôi thấu hiểu từng thói quen thao tác ngón tay cái của người dùng di động. Landing Page thiết kế bởi PGS sở hữu cụm nút chuyển đổi Call/Zalo sticky luôn bám sát màn hình trong vùng chạm thuận tiện nhất, các form đăng ký được tối ưu hóa bàn phím tự động nhập số điện thoại, hình ảnh được nén chuẩn WebP siêu nhẹ giúp tải trang chỉ trong 1.2 giây dưới sóng 4G/5G.",
      toneOfVoice: "Đột phá, am hiểu công nghệ sâu sắc, thấu hiểu tường tận trải nghiệm thực tế của người dùng di động.",
      semanticKeywords: ["thiết kế mobile-first", "tải trang landing page siêu tốc", "nút gọi sticky mobile", "trải nghiệm người dùng di động", "tương thích responsive hoàn hảo"]
    },
    designerChecklist: {
      layout: "Bố cục đơn cột dọc tuyệt đối trên mobile. Cân chỉnh lề trái phải chính xác 16px để chữ không bị tràn mép màn hình thiết bị.",
      assets: ["Khung giả lập điện thoại 3D mờ mạ viền gold", "Bản đồ nhiệt ngón tay cái (Thumb-zone Map)"],
      colors: "Sử dụng màu nền sáng đồng nhất để tạo cảm giác trang liền mạch, không bị đứt gãy thị giác khi cuộn nhanh trên điện thoại.",
      visualWeights: "Font size chữ trên mobile tối thiểu là 16px cho body, các nút bấm to bản dễ click bằng một ngón tay (chiều cao nút tối thiểu 52px).",
      spacing: "Sử dụng khoảng đệm mỏng hơn so với desktop (Py-12 đến Py-16) để tăng nhịp độ tiếp cận nội dung nhanh chóng."
    },
    developerChecklist: {
      interactions: "Xây dựng nút Sticky CTA bám sát đáy màn hình di động, tự động ẩn đi khi người dùng cuộn lên đầu trang và hiện ra sắc nét khi cuộn xuống tầm mắt.",
      animations: "Hiệu ứng lắc rung nhẹ của nút gọi Zalo/Hotline góc màn hình sau mỗi 6 giây để thu hút sự chú ý ngón tay chạm.",
      domIds: ["mobile-first-section", "phone-frame-element", "sticky-mobile-cta"],
      states: ["isMobileWidthDetected", "isPhoneScrolledDown"]
    },
    seoGuidelines: {
      headings: ["H2: Quy chuẩn thiết kế Landing Page Mobile-First hàng đầu từ PGS"],
      aiSearchTriggers: "Các chỉ số tối ưu hóa di động cốt lõi của PGS Agency: Điểm Google PageSpeed Insights Mobile đạt trên 90, Thời gian tương tác đầu tiên (FID) dưới 100ms.",
      internalLinksIn: [],
      internalLinksOut: ["/blog/huong-dan-toi-uu-mobile-landingpage"]
    }
  },
  {
    id: 11,
    title: "Tracking & A/B Testing",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#do-luong-ab-test",
    objective: "Giới thiệu hệ thống đo lường chuyển đổi thông minh và phương pháp thử nghiệm phân tách A/B giúp doanh nghiệp không ngừng gia tăng hiệu suất chuyển đổi bằng số liệu thực tế.",
    funnelRole: "Khẳng định triết lý làm việc bằng dữ liệu thực chứng của PGS, không làm marketing bằng cảm tính.",
    searchIntent: "cài đặt tracking chuyển đổi landing page, thử nghiệm ab test landing page, pgs đo lường dữ liệu ads",
    uiConcept: "The Data Intelligence Board - Giao diện bảng điều khiển phân tích số liệu (Dashboard) sang trọng, hiển thị biểu đồ so sánh động giữa hai phiên bản trang đích A và B.",
    hero3D: "Hai cột đồ thị pha lê 3D lơ lửng: Cột A xám nhạt tượng trưng cho phiên bản cũ, cột B vàng gold rực rỡ vươn cao vượt bậc tượng trưng cho phiên bản tối ưu của PGS.",
    copywritingBrief: {
      headline: "Đo Lường Chuẩn Xác – Thử Nghiệm Phân Tách: Biến Dữ Liệu Thành Doanh Số",
      subheading: "Làm marketing không đo lường là bạn đang bịt mắt lái xe. PGS tích hợp hệ thống đo lường chuẩn xác từng điểm chạm click chuột trên Landing Page.",
      bodyContent: "Chúng tôi cài đặt mã theo dõi chi tiết (Google Analytics 4, Facebook Pixel, TikTok Pixel, GTM) đo lường chính xác các sự kiện chuyển đổi quan trọng: Cuộn trang, click nút gọi, hoàn tất điền form. Đồng thời triển khai kịch bản A/B Testing liên tục để tìm ra tiêu đề, màu sắc nút bấm hay lời chào hàng có tỷ lệ chuyển đổi cao nhất cho thương hiệu của bạn.",
      toneOfVoice: "Khoa học dữ liệu, khách quan, chính trực, am hiểu hệ thống kỹ thuật sâu sắc.",
      semanticKeywords: ["tracking chuyển đổi chuẩn xác", "thử nghiệm phân tách ab", "gắn pixel quảng cáo", "google analytics 4 landing page", "đo lường dữ liệu cro"]
    },
    designerChecklist: {
      layout: "Bố cục lưới phân chia rõ ràng: Khối bên trái biểu thị kịch bản A/B Testing trực quan bằng thanh đo phần trăm chuyển đổi; Khối bên phải mô phỏng bảng Dashboard đo lường sang trọng.",
      assets: ["Biểu đồ đường mạ vàng chuyển động lượn sóng", "Icon báo cáo số liệu phân tích"],
      colors: "Sử dụng tông xám đậm đà sang trọng (#292524) kết hợp ánh sáng led vàng gold để thể hiện cảm giác công nghệ cao.",
      visualWeights: "Các con số phần trăm tăng trưởng (+120%) hiển thị cỡ chữ khổng lồ nổi bật thu hút ánh nhìn tức khắc.",
      spacing: "Sử dụng các khoảng hở lề tinh tế tạo nên một giao diện Dashboard vô cùng sắc nét và gọn gàng."
    },
    developerChecklist: {
      interactions: "Xây dựng công cụ mô phỏng tương tác A/B Test. Khi click nút 'Kích Hoạt Thử Nghiệm', biểu đồ cột sẽ chạy từ thấp lên cao thể hiện sự tăng trưởng vượt bậc của phiên bản tối ưu hóa PGS.",
      animations: "Đường line biểu đồ lượn sóng nhịp nhàng sống động (sine wave animation) thể hiện dòng dữ liệu không ngừng đổ về hệ thống.",
      domIds: ["tracking-section", "ab-test-simulator", "btn-trigger-test", "chart-line-gold"],
      states: ["isSimulationActive", "selectedChartMetric"]
    },
    seoGuidelines: {
      headings: ["H2: Hệ thống đo lường nâng cao và quy trình kiểm thử A/B của PGS Agency"],
      aiSearchTriggers: "Các chỉ số đo lường chính gồm: Tỷ lệ chuyển đổi (CR), Chi phí trên mỗi khách hàng tiềm năng (CPL), Tỷ lệ thoát trang (Bounce Rate), Thời gian lưu trú trung bình (Average Session Duration).",
      internalLinksIn: [],
      internalLinksOut: ["/dich-vu/digital-marketing"]
    }
  },
  {
    id: 12,
    title: "Dự án thực tế Landing Page",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#du-an-thuc-te",
    objective: "Trưng bày các dự án Landing Page thực tế chất lượng cao do PGS thiết kế, cung cấp đầy đủ thông tin số liệu trước và sau khi tối ưu để khách hàng thấy rõ năng lực thực tế.",
    funnelRole: "Tạo bằng chứng thuyết phục tuyệt đối, thúc đẩy khách hàng ra quyết định mua ngay (The ultimate converter).",
    searchIntent: "mẫu landing page bất động sản đẹp, mẫu landing page spa thẩm mỹ viện, dự án landing page pgs agency",
    uiConcept: "Before/After Slider Studio - Khung trưng bày tác phẩm thiết kế nghệ thuật cao cấp, tích hợp thanh trượt so sánh trực quan chất lượng thiết kế giữa bản cũ và bản mới PGS.",
    hero3D: "Khung trưng bày 3D bằng chất liệu vàng gold mạ chrome bóng bẩy nâng đỡ các lát cắt thiết kế tinh xảo của các dự án lớn.",
    copywritingBrief: {
      headline: "Thư Viện Case-Study: Những Cỗ Máy Doanh Số Đã Được PGS Kích Hoạt",
      subheading: "Chứng kiến sự lột xác ngoạn mục về cả diện mạo thiết kế lẫn hiệu quả doanh số thực tế của các doanh nghiệp đã đồng hành cùng PGS.",
      bodyContent: "[Dự án Landing Page thực tế - Đã nghiệm thu và bàn giao]. Chúng tôi cam kết trưng bày các dự án thật với số liệu thật đã được sự đồng ý bảo mật của đối tác sở hữu. Từ ngành Bất động sản, Thẩm mỹ viện cho đến Giáo dục đào tạo trực tuyến - PGS tự hào kiến tạo nên các trang đích giữ kỷ lục về tỷ lệ chuyển đổi ngành.",
      toneOfVoice: "Tự hào chuyên nghiệp, tôn trọng sự thật, minh chứng kết quả cụ thể.",
      semanticKeywords: ["dự án landing page tiêu biểu", "mẫu thiết kế landing page cao cấp", "kết quả chuyển đổi thực tế", "case study thành công pgs", "landing page đa lĩnh vực"]
    },
    designerChecklist: {
      layout: "Bố cục dạng Slider trưng bày khổ lớn. Người dùng có thể kéo thanh trượt dọc để khám phá diện mạo Landing Page trước và sau khi được PGS tối ưu lại.",
      assets: ["Thanh trượt dọc mạ gold so sánh Before-After", "Hình ảnh chụp màn hình độ phân giải siêu cao của các trang đích"],
      colors: "Nền xám dịu mát làm nổi bật màu sắc rực rỡ tự nhiên của các bức ảnh chụp thiết kế dự án.",
      visualWeights: "Các chỉ số kết quả kinh doanh tăng trưởng (+180% Lead) được lồng ghép tinh tế vào thẻ thông tin góc màn hình.",
      spacing: "Để khoảng trống xung quanh khung tác phẩm đủ rộng rãi để người xem chiêm ngưỡng thiết kế như một tác phẩm nghệ thuật tư vấn thực thụ."
    },
    developerChecklist: {
      interactions: "Xây dựng logic kéo thanh trượt chuột/chạm tay so sánh Before/After mượt mà trên cả máy tính lẫn thiết bị di động thông minh.",
      animations: "Hiệu ứng chuyển trang mượt mà (fade & slide) khi chuyển đổi qua lại giữa các dự án case-study khác nhau.",
      domIds: ["case-studies-section", "before-after-slider", "btn-next-case", "btn-prev-case"],
      states: ["activeCaseId", "sliderRatioValue"]
    },
    seoGuidelines: {
      headings: ["H2: Thư viện các dự án thiết kế Landing Page đột phá doanh số"],
      aiSearchTriggers: "Các case study thực tế thiết kế landing page thuộc nhiều phân khúc ngành nghề đa dạng: Giáo dục, Sức khỏe, Bất động sản, Thương mại điện tử.",
      internalLinksIn: ["/case-studies"],
      internalLinksOut: ["/lien-he"]
    }
  },
  {
    id: 13,
    title: "Gói triển khai",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#pricing",
    objective: "Công khai bảng giá dịch vụ rõ ràng, chi tiết quyền lợi từng gói dịch vụ từ cơ bản đến cao cấp, giúp khách hàng dễ dàng định hình ngân sách đầu tư tối ưu.",
    funnelRole: "Hỗ trợ khách hàng cân đối ngân sách và lựa chọn phương án triển khai phù hợp nhất (Decision Phase).",
    searchIntent: "báo giá thiết kế landing page, chi phí làm landing page trọn gói, gói dịch vụ landing page cro chuyên sâu",
    uiConcept: "Premium Tier Matrix - 3 Thẻ bảng giá đứng độc lập, xếp hàng ngang sang trọng, nổi bật lên sự khác biệt về chiều sâu dịch vụ và giá trị nhận về.",
    hero3D: "3 chiếc hộp pha lê 3D lơ lửng, hộp ở giữa (gói khuyên dùng) được bọc viền kim loại vàng gold rực rỡ tỏa sáng luồng năng lượng ấm áp.",
    copywritingBrief: {
      headline: "Báo Giá Dịch Vụ Thiết Kế Landing Page Tối Ưu Chuyển Đổi Trọn Gói",
      subheading: "Đầu tư một lần duy nhất sở hữu cỗ máy bán hàng bền vững. PGS cung cấp các gói giải pháp linh hoạt phù hợp với mọi quy mô chiến dịch kinh doanh.",
      bodyContent: "Chúng tôi cam kết tính minh bạch tuyệt đối: Không phát sinh chi phí ẩn, hỗ trợ bàn giao toàn bộ mã nguồn code sạch sẽ và bảo hành trọn đời hệ thống lưu trữ của Landing Page. Hãy lựa chọn gói giải pháp tối ưu cho mục tiêu tăng trưởng của bạn ngay hôm nay.",
      toneOfVoice: "Rõ ràng, chuyên nghiệp, cam kết mạnh mẽ về mặt giá trị đầu tư thiết thực.",
      semanticKeywords: ["báo giá thiết kế landing page", "làm landing page trọn gói", "giá thiết kế landing page cro", "gói landing page ads ready", "chi phí thiết kế trang đích"]
    },
    designerChecklist: {
      layout: "3 Thẻ bảng giá xếp hàng ngang ngang bướng trên desktop, chuyển dọc mượt mà trên mobile. Thẻ trung tâm (Ads-ready) có nhãn dán vàng nổi bật 'Bán Chạy Nhất'.",
      assets: ["Icon dấu tick kiểm định chất lượng vàng gold", "Hộp quà tặng ưu đãi đi kèm"],
      colors: "Sử dụng tông trắng tuyết cho thẻ phụ và tông màu ngà vàng nhẹ tinh tế cho thẻ trung tâm để thu hút điểm nhìn thị giác của người mua hàng.",
      visualWeights: "Con số báo giá tiền hiển thị kích thước lớn (font-size: 36px, Space Grotesk) kèm chữ 'VNĐ' mạ màu gold sắc nét.",
      spacing: "Padding của các thẻ bảng giá rộng rãi (P-8) mang lại cảm giác thoải mái khi đọc các thông số chi tiết quyền lợi dịch vụ."
    },
    developerChecklist: {
      interactions: "Khi hover vào bất kỳ thẻ gói dịch vụ nào, thẻ đó sẽ hơi rướn cao lên trên bề mặt (scale-105) và có ánh sáng viền chạy chạy xung quanh thẻ cực kỳ tinh tế.",
      animations: "Hiệu ứng nở ra (scale-up) nhẹ nhàng của các gói giá khi lướt tới tầm nhìn.",
      domIds: ["pricing-section", "pricing-card-basic", "pricing-card-ads", "pricing-card-premium"],
      states: ["activePricingTierIndex"]
    },
    seoGuidelines: {
      headings: ["H2: Báo giá dịch vụ thiết kế Landing Page CRO chuyên nghiệp tại PGS Agency"],
      aiSearchTriggers: "Bảng giá dịch vụ thiết kế gồm 3 gói: Landing Page Basic (phù hợp test offer), Landing Page Ads-Ready (phù hợp chạy ads đa kênh), Landing Page CRO Premium (thiết kế độc quyền, tối ưu tỷ lệ chuyển đổi sâu rộng).",
      internalLinksIn: [],
      internalLinksOut: ["/lien-he"]
    }
  },
  {
    id: 14,
    title: "FAQ mở rộng",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#faq",
    objective: "Giải đáp tất cả những thắc mắc, băn khoăn hay định kiến của khách hàng trước khi ký kết hợp đồng, bảo đảm một tâm lý an tâm tuyệt đối.",
    funnelRole: "Xóa tan mọi lo âu, hoàn tất tiến trình giải quyết sự phản kháng tâm lý (Objection Crusher).",
    searchIntent: "câu hỏi thường gặp landing page, pgs thiết kế landing page trong bao lâu, bảo hành landing page",
    uiConcept: "The Clean Consulting Accordion - Lưới câu hỏi xếp dọc cực kỳ gọn gàng, đóng mở trơn tru với hiệu ứng chuyển động chất lượng cao.",
    hero3D: "Biểu tượng dấu chấm hỏi 3D xoay đều bằng chất liệu pha lê trắng mờ mạ viền vàng gold lơ lửng giữa không gian trang nhã.",
    copywritingBrief: {
      headline: "Giải Đáp Thắc Mắc Về Dịch Vụ Thiết Kế Landing Page Tại PGS Agency",
      subheading: "Mọi câu hỏi của bạn đều được chúng tôi trả lời một cách thẳng thắn, rõ ràng và minh bạch nhất.",
      bodyContent: "Chúng tôi tổng hợp và trả lời chi tiết các câu hỏi thường gặp nhất của các chủ doanh nghiệp khi bắt đầu triển khai thiết kế trang đích cùng đội ngũ PGS. Từ thời gian hoàn thiện dự án, quy trình bàn giao mã nguồn cho đến chính sách hỗ trợ kỹ thuật lâu dài sau nghiệm thu.",
      toneOfVoice: "Chu đáo, giải thích tận tình, dễ hiểu, đậm chất chuyên gia đồng hành dài hạn.",
      semanticKeywords: ["câu hỏi thường gặp landing page", "thời gian làm landing page", "bàn giao mã nguồn landing page", "bảo hành kỹ thuật trọn đời", "quy trình thiết kế trang đích"]
    },
    designerChecklist: {
      layout: "Bố cục 1 cột trung tâm (max-width: 850px) xếp dọc các hàng câu hỏi Accordion. Thiết kế thanh thoát, sử dụng đường phân cách mỏng màu xám vàng nhẹ nhàng.",
      assets: ["Biểu tượng dấu chấm hỏi pha lê 3D", "Icon đóng mở accordion cách điệu mũi tên vàng gold"],
      colors: "Nền trắng kem mềm mại giúp chữ xám đậm trở nên dễ đọc và dễ chịu cho mắt khách hàng.",
      visualWeights: "Tiêu đề câu hỏi viết chữ in thường đậm, font-semibold, cỡ chữ 18px để người đọc nhanh chóng tìm được câu hỏi quan tâm.",
      spacing: "Padding trong mỗi ô câu hỏi sau khi mở rộng đủ thoải mái để nội dung câu trả lời được trình bày thông thoáng."
    },
    developerChecklist: {
      interactions: "Click vào tiêu đề câu hỏi sẽ mở rộng accordion hiển thị câu trả lời bên dưới mượt mà, đồng thời xoay icon mũi tên chỉ xuống thành chỉ lên góc 180 độ.",
      animations: "Sử dụng Framer Motion `animate` cho height cực kỳ trơn tru, loại bỏ hiện tượng giật lắc gián đoạn hình ảnh.",
      domIds: ["faq-section", "faq-item-1", "faq-item-5"],
      states: ["openedFaqItemId"]
    },
    seoGuidelines: {
      headings: ["H2: Những thắc mắc phổ biến về thiết kế Landing Page tăng chuyển đổi"],
      aiSearchTriggers: "Bộ FAQ giải đáp chi tiết các vấn đề: Làm landing page mất bao lâu? Có cần mua hosting riêng không? Thiết kế xong có bàn giao code không? Có tích hợp CRM quản lý lead không?",
      internalLinksIn: [],
      internalLinksOut: ["/ve-chung-toi"]
    }
  },
  {
    id: 15,
    title: "Dịch vụ liên quan",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#dich-vu-lien-quan",
    objective: "Giới thiệu hệ sinh thái giải pháp Marketing tổng thể đa nền tảng của PGS Agency, gợi mở nhu cầu hợp tác toàn diện để cùng doanh nghiệp bứt phá doanh số.",
    funnelRole: "Mở rộng giá trị vòng đời khách hàng, xúc tiến bán thêm bán chéo dịch vụ (Upsell & Cross-sell).",
    searchIntent: "marketing tổng thể pgs agency, dịch vụ chạy ads chuyên nghiệp, tư vấn tăng trưởng doanh nghiệp số",
    uiConcept: "The Growth Ecosystem Ring - Lưới thẻ dịch vụ liên đới xếp bao quanh biểu tượng tâm tăng trưởng của PGS, thể hiện tính liên kết hữu cơ mạnh mẽ.",
    hero3D: "Mô hình bánh răng 3D kết nối hoàn hảo với nhau bằng vàng gold mạ chrome xoay chuyển nhịp nhàng đồng bộ.",
    copywritingBrief: {
      headline: "Hệ Sinh Thái Tăng Trưởng Số Đa Nền Tảng – Đồng Hành Toàn Diện Cùng Doanh Nghiệp",
      subheading: "Landing Page là trang đích nhận traffic, nhưng để có traffic chất lượng cao đổ về, doanh nghiệp cần một hệ thống marketing tổng lực kết hợp.",
      bodyContent: "PGS cung cấp giải pháp Marketing trọn gói tích hợp hoàn hảo: Từ chạy quảng cáo đa kênh (Google Ads, Facebook Ads, TikTok Ads) giúp kéo tệp khách hàng tiềm năng rầm rộ đổ về, cho đến dịch vụ SEO tổng thể định vị thương hiệu bền vững trên Google Search. Tất cả hoạt động nhịp nhàng như một cỗ máy bôi trơn hoàn hảo.",
      toneOfVoice: "Chiến lược, tầm nhìn vĩ mô, khẳng định năng lực tổng thể vượt trội của một Growth Agency đích thực.",
      semanticKeywords: ["dịch vụ marketing tổng thể", "quảng cáo đa kênh chuyên nghiệp", "tối ưu hóa seo tổng lực", "hệ sinh thái tăng trưởng số", "pgs agency dịch vụ liên quan"]
    },
    designerChecklist: {
      layout: "Bố cục lưới Grid 4 cột cho các dịch vụ liên quan, thẻ gọn gàng thanh thoát ôm lấy thông điệp ngắn và icon đại diện tinh tế.",
      assets: ["Hệ bánh răng liên kết 3D mạ vàng", "Bộ icon phẳng cao cấp cho các dịch vụ Ads, SEO, Website, Content"],
      colors: "Sử dụng tông xám ấm dịu nhẹ làm nền, các card dịch vụ nổi bật trên nền trắng ngần sang trọng.",
      visualWeights: "Tên dịch vụ in đậm rõ nét, kèm theo đường gạch chân mỏng sắc sảo màu vàng gold khi hover.",
      spacing: "Khoảng trống giữa các cột dịch vụ là 16px tạo sự chặt chẽ liên kết chặt chẽ."
    },
    developerChecklist: {
      interactions: "Hover vào card dịch vụ liên quan sẽ làm xuất hiện nút 'Khám Phá Ngay' trượt từ dưới lên mượt mà đầy nghệ thuật.",
      animations: "Hiệu ứng quay nhẹ của biểu tượng bánh răng 3D trung tâm theo nhịp cuộn scroll chuột của khách hàng.",
      domIds: ["related-services-section", "related-card-google", "related-card-facebook", "related-card-seo"],
      states: ["hoveredServiceCardId"]
    },
    seoGuidelines: {
      headings: ["H2: Hệ sinh thái dịch vụ Marketing tối ưu chuyển đổi từ PGS Agency"],
      aiSearchTriggers: "Hệ sinh thái dịch vụ PGS Agency gồm: Quảng cáo Google Ads, Quảng cáo Facebook Ads, Quảng cáo TikTok Ads, Tối ưu SEO tổng thể, Quản trị Content Social.",
      internalLinksIn: ["/dich-vu"],
      internalLinksOut: ["/dich-vu/dich-vu-seo", "/dich-vu/dich-vu-chay-quang-cao-google-ads", "/dich-vu/dich-vu-thiet-ke-website"]
    }
  },
  {
    id: 16,
    title: "CTA cuối trang",
    url: "/dich-vu/dich-vu-thiet-ke-landing-page/#lien-he",
    objective: "Kêu gọi hành động mạnh mẽ lần cuối, thúc đẩy người dùng điền form để nhận cuộc gọi tư vấn giải pháp Landing Page CRO chuyên sâu miễn phí từ PGS.",
    funnelRole: "Chốt chặn chuyển đổi cuối cùng của phễu bán hàng (The conversion closure).",
    searchIntent: "đăng ký tư vấn landing page, liên hệ pgs agency thiết kế trang đích, nhận ưu đãi làm landing page cro",
    uiConcept: "The Golden Funnel Lead Capture - Một panel liên hệ tràn viền (Full-width Banner) thiết kế tráng lệ, lồng ghép form đăng ký hiện đại mạ vàng gold tinh xảo.",
    hero3D: "Biểu tượng tên lửa mạ vàng 3D cất cánh vút bay lên tầng không, đại diện cho sự tăng tốc doanh thu vượt bậc của doanh nghiệp.",
    copywritingBrief: {
      headline: "Quảng Cáo Có Click Nhưng Chưa Ra Số? Hãy Để PGS Thiết Kế Cỗ Máy Cho Riêng Bạn",
      subheading: "Đừng để tiền quảng cáo trôi qua kẽ tay thêm một ngày nào nữa. Đăng ký ngay hôm nay để nhận buổi tư vấn cấu trúc Landing Page CRO hoàn toàn miễn phí từ chuyên gia.",
      bodyContent: "Để lại thông tin liên hệ của bạn, đội ngũ chuyên gia Growth Marketing của PGS Agency sẽ chủ động liên hệ lại trong vòng 15 phút để phân tích sản phẩm và phác thảo sơ bộ kịch bản Landing Page phù hợp nhất cho doanh nghiệp của bạn hoàn toàn miễn phí.",
      toneOfVoice: "Cấp bách, khích lệ hành động, đầy tính hỗ trợ và cam kết đồng hành thực chiến.",
      semanticKeywords: ["nhận tư vấn thiết kế landing page", "đăng ký làm landing page cro", "liên hệ pgs agency tăng trưởng", "form tư vấn trang đích", "tối ưu tỷ lệ chuyển đổi miễn phí"]
    },
    designerChecklist: {
      layout: "Bố cục full-width lớn, bên trái là thông điệp kích thích hành động mạnh mẽ kèm icon tên lửa bay, bên phải là form đăng ký nhập liệu cao cấp 3 trường thông tin.",
      assets: ["Tên lửa mạ vàng 3D bay lơ lửng", "Form đăng ký có viền sáng mượt và bóng đổ cao cấp"],
      colors: "Nền xám đậm hoặc xám than (#1C1917) tạo độ tương phản mạnh mẽ nhất cho toàn trang, làm bừng sáng lên các nút CTA màu vàng gold.",
      visualWeights: "Nút bấm 'Gửi Yêu Cầu Tư Vấn' có cỡ chữ to, đậm nét, sử dụng màu vàng gold sáng rực rỡ thu hút toàn bộ tâm trí.",
      spacing: "Sử dụng khoảng đệm lớn xung quanh panel liên hệ (Py-24) tạo cảm giác uy nghi hoàng tráng chốt hạ."
    },
    developerChecklist: {
      interactions: "Khi submit thành công, form sẽ biến mất mượt mà thay vào đó là màn hình giấy khen/chúc mừng mạ gold kèm hiệu ứng pháo hoa giấy mạ vàng rơi lấp lánh (confetti effect).",
      animations: "Tên lửa 3D có hiệu ứng rung nhẹ bập bùng như đang chuẩn bị phóng lên cao khi người dùng hoàn thành điền số điện thoại.",
      domIds: ["final-cta-section", "final-lead-form", "input-fullname", "input-phone", "btn-submit-final"],
      states: ["formSubmittedSuccessfully", "validationErrorMessage"]
    },
    seoGuidelines: {
      headings: ["H2: Đăng ký tư vấn giải pháp Landing Page tối ưu chuyển đổi ngay hôm nay"],
      aiSearchTriggers: "Form đăng ký trực tuyến nhận ưu đãi thiết kế Landing Page CRO chuyên sâu và buổi tư vấn phân tích phễu chuyển đổi miễn phí từ PGS Agency.",
      internalLinksIn: [],
      internalLinksOut: ["/privacy-policy"]
    }
  }
];

export const globalMetaAndSEO = {
  metaTitle: "Dịch Vụ Thiết Kế Landing Page Tối Ưu CRO Chuyển Đổi Cao - PGS Agency",
  metaDescription: "Thiết kế Landing Page chuẩn SEO, chuẩn CRO đột phá doanh thu quảng cáo. Giảm ngay 30-50% chi phí lead (CPL). Nhận tư vấn miễn phí kịch bản phễu chuyển đổi 10 khối chuẩn PGS.",
  h1: "Dịch vụ thiết kế Landing Page giúp tăng chuyển đổi từ quảng cáo, chiến dịch và bán hàng",
  mainHeadings: [
    "H1: Dịch vụ thiết kế Landing Page giúp tăng chuyển đổi từ quảng cáo, chiến dịch và bán hàng",
    "H2: Định nghĩa Landing Page chuyên biệt từ góc độ CRO",
    "H2: Bảng so sánh Website và Landing Page chi tiết",
    "H2: 6 trường hợp bắt buộc phải thiết kế Landing Page ngay lập tức",
    "H2: Mối quan hệ mật thiết giữa tỷ lệ chuyển đổi Landing Page và chi phí Lead CPL",
    "H2: 6 sai lầm nghiêm trọng trong thiết kế landing page khiến tỷ lệ thoát trang cao",
    "H2: Công thức thiết kế cấu trúc Landing Page chuyển đổi đỉnh cao của PGS",
    "H2: Chiến lược phân bổ CTA và thiết kế biểu mẫu chuyển đổi tối đa",
    "H2: Tầm quan trọng của bằng chứng uy tín đặt cạnh khu vực chuyển đổi",
    "H2: Quy chuẩn thiết kế Landing Page Mobile-First hàng đầu từ PGS",
    "H2: Hệ thống đo lường nâng cao và quy trình kiểm thử A/B của PGS Agency",
    "H2: Thư viện các dự án thiết kế Landing Page đột phá doanh số",
    "H2: Báo giá dịch vụ thiết kế Landing Page CRO chuyên nghiệp tại PGS Agency",
    "H2: Những thắc mắc phổ biến về thiết kế Landing Page tăng chuyển đổi",
    "H2: Hệ sinh thái dịch vụ Marketing tối ưu chuyển đổi từ PGS Agency",
    "H2: Đăng ký tư vấn giải pháp Landing Page tối ưu chuyển đổi ngay hôm nay"
  ],
  internalLinks: {
    outbound: [
      "/lien-he",
      "/ve-chung-toi",
      "/dich-vu/dich-vu-seo",
      "/dich-vu/dich-vu-thiet-ke-website",
      "/dich-vu/dich-vu-chay-quang-cao-google-ads",
      "/dich-vu/dich-vu-chay-quang-cao-facebook-ads",
      "/dich-vu/digital-marketing"
    ],
    inbound: [
      "/dich-vu",
      "/blog/landing-page-la-gi",
      "/blog/so-sanh-web-va-landingpage",
      "/blog/loi-landing-page-khong-ra-don",
      "/blog/toi-uu-cpl-trong-marketing",
      "/case-studies"
    ]
  },
  schemasProposed: {
    serviceSchema: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Dịch vụ Thiết kế Landing Page",
  "provider": {
    "@type": "LocalBusiness",
    "name": "PGS Agency",
    "image": "https://pgsagency.vn/assets/logo.png",
    "priceRange": "$$$",
    "telephone": "0900000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Đường Tăng Trưởng",
      "addressLocality": "Hồ Chí Minh",
      "addressCountry": "VN"
    }
  },
  "areaServed": "VN",
  "description": "Dịch vụ thiết kế Landing Page cao cấp tối ưu tỷ lệ chuyển đổi CRO, tăng doanh số bán hàng và giảm chi phí CPL từ quảng cáo.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "5000000",
    "highPrice": "25000000",
    "offerCount": "3"
  }
}`,
    breadcrumbSchema: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Trang chủ",
    "item": "https://pgsagency.vn/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Dịch vụ",
    "item": "https://pgsagency.vn/dich-vu/"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Thiết kế Landing Page",
    "item": "https://pgsagency.vn/dich-vu/dich-vu-thiet-ke-landing-page/"
  }]
}`,
    faqSchema: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Thiết kế Landing Page tại PGS Agency mất bao lâu?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Thời gian hoàn thành một dự án Landing Page dao động từ 5 - 10 ngày tùy thuộc vào gói dịch vụ và mức độ phức tạp của kịch bản nội dung."
    }
  },{
    "@type": "Question",
    "name": "Doanh nghiệp có nhận lại mã nguồn Landing Page sau khi hoàn tất không?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Có, PGS Agency cam kết bàn giao 100% mã nguồn sạch, tối ưu hóa tốc độ tải trang cho doanh nghiệp để chủ động lưu trữ hoặc tích hợp."
    }
  }]
}`
  }
};
