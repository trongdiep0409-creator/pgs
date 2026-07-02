'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Cpu, Code, Paintbrush, BookOpen, Globe, Key } from 'lucide-react';

export interface HandoverData {
  id: number;
  sectionName: string;
  goal: string;
  uxIntent: string;
  motionSpec: string;
  seoOptim: string;
  metaTitle?: string;
  metaDescription?: string;
  headings?: string;
  internalLinks?: { to: string; from: string };
  schemaProposed?: string;
  checklistDesigner: string[];
  checklistDeveloper: string[];
  checklistContent: string[];
}

export const HANDOVER_SECTIONS_DATA: Record<number, HandoverData> = {
  1: {
    id: 1,
    sectionName: "1. Header premium sticky",
    goal: "Định vị thương hiệu ngay lập tức, điều hướng người dùng thông minh, tạo uy tín (trust) và thúc đẩy hành động chuyển đổi chính.",
    uxIntent: "Thiết kế mỏng, tinh tế với nền trắng mờ (glassmorphism) giúp nội dung phía dưới cuộn mượt mà. Mega menu chia nhóm dịch vụ khoa học giúp người dùng tìm thấy giải pháp trong 2 lần nhấp chuột.",
    motionSpec: "Sticky khi cuộn lên, ẩn khi cuộn xuống để tối ưu diện tích. Dropdown mega menu dạng 3D glass panel xuất hiện stagger từ trên xuống, hover menu item có line mạ vàng gold chạy ngang từ giữa ra.",
    seoOptim: "Sử dụng tag <header> chuẩn HTML5. Đảm bảo logo có thuộc tính alt chứa từ khóa thương hiệu 'PGS Agency'. Các link điều hướng là thẻ <a> thật, hỗ trợ bot cào dễ dàng.",
    checklistDesigner: [
      "Sử dụng logo PGS Agency độ phân giải cao, hỗ trợ SVG để hiển thị sắc nét trên màn hình Retina.",
      "Mega menu chia thành 5 nhóm cột rõ ràng: Website & Nền tảng, SEO & Google, Ads & Performance, Content & Social, PR & Trust.",
      "CTA 'Nhận tư vấn' nổi bật với màu vàng gold (#D4AF37), góc bo nhẹ 6px - 8px thể hiện sự vững chãi, cao cấp."
    ],
    checklistDeveloper: [
      "Sử dụng backdrop-filter: blur(16px) và background: rgba(255,255,255,0.75) cho header sticky.",
      "Xử lý bắt sự kiện scroll mượt mà (throttled) để hiển thị/ẩn header tùy theo hướng cuộn trang.",
      "Hỗ trợ đầy đủ phím Tab để di chuyển qua các menu và đóng mở bằng phím Escape để tăng điểm Accessibility (A11y)."
    ],
    checklistContent: [
      "Tên các dịch vụ trong mega menu phải chứa từ khóa chính xác: 'SEO tổng thể', 'Thiết kế Website chuẩn CRO', 'Quảng cáo Google Ads tối ưu', v.v.",
      "Viết mô tả ngắn dưới mỗi dịch vụ lớn trong menu để hướng dẫn người dùng và tối ưu mật độ ngữ nghĩa cho AI Search."
    ]
  },
  2: {
    id: 2,
    sectionName: "2. Hero 3D Growth System",
    goal: "Thu hút sự chú ý tuyệt đối trong 3 giây đầu tiên, tuyên bố giá trị cốt lõi (Value Proposition) và thúc đẩy CTA chuyển đổi cao nhất.",
    uxIntent: "Phân bổ bố cục 60% bên trái cho thông điệp (Headline, Subheadline, CTA) có độ tương phản cao, 40% bên phải dành cho khối mô phỏng 3D PGS Growth System. Tạo cảm giác không gian mở, chuyên nghiệp và có tầm nhìn rộng lớn.",
    motionSpec: "Sử dụng Framer Motion để tạo hiệu ứng mượt mà. Lõi tăng trưởng 3D xoay chậm theo trục Y, các module con (SEO, Ads, Web) liên kết bằng line vàng gold mờ pulse nhẹ. Các floating card thể hiện chỉ số (Lead, CPL) dao động lên xuống ngẫu nhiên. Parallax nhẹ theo tọa độ con trỏ chuột.",
    seoOptim: "Được gắn thẻ <h1> duy nhất trên toàn trang chứa thông điệp chính xác: 'Hệ thống Marketing tổng thể giúp doanh nghiệp tăng lead, tối ưu chi phí và tăng trưởng doanh thu bền vững'.",
    checklistDesigner: [
      "Headline cỡ chữ tối thiểu 48px trên desktop, tracking-tight, sử dụng font chữ 'Space Grotesk' mạ vàng gold tinh tế.",
      "Nút CTA chính sử dụng nền vàng gold (#D4AF37) chữ đen than, nút CTA phụ nền trắng viền gold.",
      "Hiển thị mini trust proof ngay dưới CTA chính (ví dụ: Logo 5 đối tác uy tín hoặc icon huy hiệu chứng nhận)."
    ],
    checklistDeveloper: [
      "Tích hợp CSS 3D hoặc mô phỏng Canvas mượt mà, tối ưu hóa phần cứng bằng cách sử dụng transform3d và will-change.",
      "Thực hiện responsive hoàn hảo cho Hero: Ẩn hoặc chuyển khối 3D xuống dưới dạng slide phẳng trên mobile để tránh che mất headline.",
      "Triển khai prefers-reduced-motion để tắt hiệu ứng xoay 3D nếu người dùng bật chế độ tiết kiệm pin hoặc tắt chuyển động hệ thống."
    ],
    checklistContent: [
      "Headline phải bao hàm trọn vẹn mong muốn lớn nhất của doanh nghiệp: Tăng lead (khách hàng tiềm năng), Tối ưu chi phí và Tăng trưởng doanh thu.",
      "Subheadline mô tả trực diện phương pháp: Kết hợp Website, SEO, Quảng cáo đa kênh và đo lường dữ liệu."
    ]
  },
  3: {
    id: 3,
    sectionName: "3. Trust proof mini",
    goal: "Xóa tan sự hoài nghi ban đầu của khách hàng bằng cách đưa ra 4 cam kết giá trị thực tế đo lường được.",
    uxIntent: "Xếp ngang dưới hero, gồm 4 card sang trọng với icon mạ vàng, thông tin ngắn gọn, dễ đọc lướt nhanh.",
    motionSpec: "Hiệu ứng stagger xuất hiện khi scroll tới. Khi di chuột qua (hover), card có hiệu ứng nâng nhẹ lên (Y-offset -4px) và tăng độ đổ bóng (shadow-lg) mượt mà.",
    seoOptim: "Các con số cam kết hoặc keyword cốt lõi được định dạng in đậm, giúp robot tìm kiếm nhận diện các thực thể chất lượng của dịch vụ PGS.",
    checklistDesigner: [
      "4 Card đại diện: 1. Lead chất lượng, 2. Tối ưu chuyển đổi, 3. Kiểm soát chi phí, 4. Tăng trưởng dài hạn.",
      "Sử dụng icon mạ vàng mỏng mảnh (stroke-width 1.5) từ Lucide, mang cảm giác tinh xảo, không dùng icon 2D đặc thô."
    ],
    checklistDeveloper: [
      "Sử dụng Grid 1 cột trên mobile, 2 cột trên tablet và 4 cột trên desktop.",
      "Áp dụng transition-all duration-300 ease-out cho hiệu ứng hover của card."
    ],
    checklistContent: [
      "Nội dung tập trung vào kết quả thực: 'Lead đúng mục tiêu', 'Tỷ lệ CRO vượt trội', 'Báo cáo minh bạch từng đồng quảng cáo'."
    ]
  },
  4: {
    id: 4,
    sectionName: "4. Vấn đề doanh nghiệp đang gặp",
    goal: "Tạo sự đồng cảm sâu sắc bằng cách gọi tên chính xác các 'nỗi đau' (pain points) mà khách hàng mục tiêu đang chịu đựng trong hoạt động marketing.",
    uxIntent: "Thiết kế dạng '3D Problem Wall' - một mảng tường các vấn đề màu xám xỉn mờ, kích thích sự chú ý trực giác và làm nổi bật giải pháp của PGS khi tương tác.",
    motionSpec: "Khi hover vào từng card vấn đề, card sẽ lật 3D 180 độ (flip-card transition) cực kỳ mượt mà để lộ mặt sau màu vàng gold ấm áp chứa nội dung 'PGS xử lý bằng...' đi kèm giải pháp tương ứng.",
    seoOptim: "Sử dụng các sub-heading <h3> cho mỗi vấn đề. Chứa các từ khóa tìm kiếm dài của người dùng đang đau đầu tìm cách gỡ khó như: 'Quảng cáo tốn tiền nhưng không ra lead', 'SEO có traffic nhưng không có chuyển đổi'.",
    checklistDesigner: [
      "6 Card vấn đề: 1. Website ít lead, 2. Ads đốt ngân sách, 3. SEO không ra khách, 4. Social rời rạc, 5. Thiếu tracking, 6. Marketing cảm tính.",
      "Mặt trước dùng màu xám xỉn sang trọng, icon gãy đổ mờ; mặt sau dùng màu vàng gold sáng, icon tick thành công sắc nét."
    ],
    checklistDeveloper: [
      "Sử dụng thuộc tính CSS backface-visibility: hidden để xử lý lật card 3D không bị giật lag.",
      "Hỗ trợ click-to-flip trên mobile thay vì hover để đảm bảo trải nghiệm cảm ứng hoàn hảo."
    ],
    checklistContent: [
      "Viết nội dung đau đớn, đúng thực trạng của các chủ doanh nghiệp tại Việt Nam hiện nay.",
      "Nội dung giải quyết ở mặt sau phải ngắn gọn, tự tin, nhấn mạnh vào năng lực thiết lập hệ thống thực tế của PGS."
    ]
  },
  5: {
    id: 5,
    sectionName: "5. Growth System 5 lớp",
    goal: "Chứng minh năng lực tư vấn chiến lược bằng việc trình bày mô hình kiến trúc tăng trưởng 5 lớp độc quyền của PGS Agency, định vị PGS là đơn vị làm hệ thống bài bản chứ không làm dịch vụ rời rạc.",
    uxIntent: "Thiết kế dưới dạng Stacked Pyramid (Kim tự tháp 5 lớp xếp tầng 3D) thể hiện sự nâng đỡ vững chắc, từ gốc rễ thương hiệu cho đến ngọn là bộ máy tạo chuyển đổi.",
    motionSpec: "Khi cuộn màn hình đến section, từng tầng kim tự tháp sẽ phát sáng viền vàng gold mạ chrome từ dưới lên trên kèm theo số thứ tự lớn mờ dần ở nền.",
    seoOptim: "Tối ưu hóa AI Search bằng cấu trúc thông tin có thứ bậc rõ ràng. Định nghĩa trực diện của hệ thống 'PGS Growth System' để các công cụ tìm kiếm AI (Gemini, Perplexity) dễ dàng trích xuất làm đoạn nổi bật (featured snippet).",
    checklistDesigner: [
      "5 tầng tương đương: Tầng 1: Brand & Positioning, Tầng 2: Website & Conversion Asset, Tầng 3: SEO & AI Search, Tầng 4: Performance Marketing, Tầng 5: Social & Content Engine.",
      "Tạo hiệu ứng chiều sâu 3D bằng cách xếp chồng các lớp xiên góc nhẹ (isometric perspective)."
    ],
    checklistDeveloper: [
      "Sử dụng Framer Motion `whileInView` với `viewport={{ once: true }}` để kích hoạt animation mượt mà một lần duy nhất khi cuộn qua.",
      "Đảm bảo văn bản trên kim tự tháp vẫn là HTML văn bản thuần để thân thiện với SEO, không dùng ảnh chụp cả khối kim tự tháp."
    ],
    checklistContent: [
      "Giải thích ngắn gọn ý nghĩa của từng tầng. Nhấn mạnh việc tầng dưới làm bệ phóng vững chắc cho các hoạt động tiếp thị ở tầng trên."
    ]
  },
  6: {
    id: 6,
    sectionName: "6. Interactive Growth Diagnostic",
    goal: "Tăng mức độ tương tác (Engagement Rate) của trang web, giữ chân người dùng lâu hơn, thu thập dữ liệu về vấn đề thực tế của khách và tự động đề xuất giải pháp phù hợp ngay lập tức.",
    uxIntent: "Hộp công cụ chẩn đoán tương tác hiện đại. Người dùng click chọn các vấn đề hiện tại của họ thông qua các nút 'Pills' trực quan, hệ thống ngay lập tức lọc và hiển thị danh mục giải pháp đề xuất tương ứng.",
    motionSpec: "Khi người dùng chọn một vấn đề, các card giải pháp đề xuất sẽ xuất hiện bằng hiệu ứng xòe quạt (fan-out 3D) mượt mà kết hợp hiệu ứng trượt nhẹ.",
    seoOptim: "Cung cấp một loạt câu hỏi và câu trả lời chẩn đoán chuẩn hóa giúp tăng khả năng index cho các truy vấn dạng câu hỏi 'Làm thế nào để...', 'Tại sao...'.",
    checklistDesigner: [
      "Sử dụng các pill lựa chọn có kích thước lớn, dễ bấm cả trên desktop lẫn màn hình cảm ứng.",
      "Phần giải pháp đề xuất hiển thị rõ ràng, kèm nút CTA phụ dẫn tới trang dịch vụ chi tiết của giải pháp đó."
    ],
    checklistDeveloper: [
      "Quản lý trạng thái bằng React useState để cập nhật mượt mà danh sách giải pháp mà không cần load lại trang.",
      "Thêm hiệu ứng rung nhẹ (shake) cho các pill chưa được chọn để gợi ý tương tác nếu người dùng dừng cuộn quá 5 giây."
    ],
    checklistContent: [
      "Nội dung giải pháp đề xuất phải mang tính chuyên môn cao, không chung chung. Ví dụ: Nếu chọn 'Ads CPL cao', đề xuất: 'Kiểm toán hệ thống đo lường, tối ưu phễu Landing Page và triển khai phễu remarketing đa tầng'."
    ]
  },
  7: {
    id: 7,
    sectionName: "7. Hệ sinh thái dịch vụ 3D orbit",
    goal: "Hiển thị trọn vẹn toàn bộ dịch vụ của PGS Agency theo một cách ấn tượng nhất, chứng minh năng lực đa kênh toàn diện.",
    uxIntent: "Mô phỏng quỹ đạo vũ trụ (Orbit Simulation) với lõi trung tâm là thương hiệu PGS Agency, các dịch vụ được phân bổ trên các vòng quỹ đạo đồng tâm, biểu thị mối liên kết chặt chẽ.",
    motionSpec: "Các vòng quỹ đạo xoay tròn chậm rãi, ngược chiều nhau. Khi di chuột vào một dịch vụ, quỹ đạo dừng xoay, dịch vụ đó phóng to nhẹ kèm theo một hào quang mạ vàng gold tinh tế và mở ra một bảng preview tóm tắt thông tin dịch vụ.",
    seoOptim: "Cung cấp các thẻ <a> chứa keyword dịch vụ tương ứng với từng node trên orbit, đảm bảo công cụ tìm kiếm vẫn thu thập được liên kết.",
    checklistDesigner: [
      "Lõi trung tâm là PGS mạ vàng nổi bật. Chia thành 3 vòng quỹ đạo: Vòng 1 (Nền tảng kỹ thuật), Vòng 2 (Traffic & Acquisition), Vòng 3 (Content & Social).",
      "Các node dịch vụ sử dụng icon đặc trưng kết hợp text ngắn gọn, dễ đọc."
    ],
    checklistDeveloper: [
      "Sử dụng CSS animation với keyframes xoay hoặc requestAnimationFrame để tối ưu hóa CPU.",
      "Triển khai giao diện danh sách phẳng (grid layout) đơn giản trên thiết bị di động để tránh việc xoay vòng tròn khó bấm trên màn hình nhỏ."
    ],
    checklistContent: [
      "Đặt tên dịch vụ chuẩn xác, đồng bộ với bộ dịch vụ chính của Agency: 'Thiết kế Website CRO', 'SEO Tổng Thể', 'Google Ads Performance', 'Sáng tạo Content'."
    ]
  },
  8: {
    id: 8,
    sectionName: "8. Vì sao PGS khác biệt",
    goal: "Tạo lập niềm tin tuyệt đối thông qua phép so sánh trực diện (Side-by-side comparison), phá vỡ định kiến về các agency thông thường và định vị PGS là đối tác tăng trưởng đích thực.",
    uxIntent: "Bảng so sánh 2 cột có độ tương phản cao. Cột 'Agency thông thường' có màu tối xám chìm, cột 'PGS Growth System' sáng bừng màu vàng gold, có viền mạ vàng bóng bẩy làm nổi bật sự vượt trội.",
    motionSpec: "Khi scroll tới, cột PGS sẽ trượt từ dưới lên kèm hiệu ứng phát sáng mạ vàng quét qua từ đầu đến cuối cột (shimmer effect).",
    seoOptim: "Cấu trúc so sánh rõ ràng dưới dạng bảng <table> giúp robot tìm kiếm dễ dàng đọc cấu trúc dữ liệu so sánh, tăng cơ hội lọt vào 'So sánh dịch vụ' trong AI Search.",
    checklistDesigner: [
      "Thiết kế 6 tiêu chí so sánh cốt lõi: Tiếp cận, Mục tiêu, Đo lường, Đồng hành, Chi phí, Đội ngũ.",
      "Cột PGS có huy hiệu 'Khuyên chọn' hoặc 'Hệ thống tăng trưởng' ở phía trên đầu."
    ],
    checklistDeveloper: [
      "Tận dụng Grid hoặc Table của Tailwind để đảm bảo co giãn mượt mà giữa các kích thước màn hình.",
      "Áp dụng transition-all cho các dòng khi hover để người dùng dễ theo dõi dòng đối chiếu."
    ],
    checklistContent: [
      "Ngôn từ khách quan, sắc bén, đánh trúng các điểm yếu của dịch vụ marketing bên ngoài: báo cáo số ảo, làm việc rời rạc, không cam kết lead."
    ]
  },
  9: {
    id: 9,
    sectionName: "9. Dịch vụ nổi bật",
    goal: "Cung cấp thông tin chi tiết về 6 mũi nhọn dịch vụ chính, giải quyết triệt để từng nhu cầu thực tế của doanh nghiệp.",
    uxIntent: "Bố cục dạng Bento Grid hoặc 6 card lớn đối xứng. Mỗi card hiển thị thông tin rõ ràng về: Dành cho ai, Vấn đề giải quyết, Kết quả kỳ vọng và nút hành động.",
    motionSpec: "Sử dụng hiệu ứng hover dạng 3D card deck, card đang được trỏ chuột sẽ nhấc cao lên, đổ bóng rộng hơn và nút CTA của card đó tự động trượt sang phải nhẹ.",
    seoOptim: "Sử dụng thẻ <h2> cho tiêu đề chính và thẻ <h3> cho từng dịch vụ nổi bật. Đảm bảo chứa các từ khóa tìm kiếm có lượng truy cập lớn như 'Dịch vụ SEO tổng thể uy tín', 'Thiết kế website doanh nghiệp'.",
    checklistDesigner: [
      "6 Card tương ứng: SEO tổng thể, Thiết kế Website CRO, Quảng cáo Google Ads, Thiết kế Landing Page, Content SEO, Vận hành Social.",
      "Sử dụng tone màu nền trắng ngọc trai mịn màng, viền xám rất nhạt và các điểm nhấn mạ vàng tinh tế."
    ],
    checklistDeveloper: [
      "Áp dụng Tailwind transform-gpu để kích hoạt gia tốc đồ họa khi hover card.",
      "Đảm bảo các nút CTA trong card có aria-label rõ ràng, mô tả đúng điểm đến liên kết."
    ],
    checklistContent: [
      "Viết copy tập trung vào Lợi ích (Benefit) thay vì chỉ mô tả Tính năng (Feature). Nêu rõ KPI kỳ vọng (ví dụ: Tăng x3 traffic, cam kết tỷ lệ chuyển đổi)."
    ]
  },
  10: {
    id: 10,
    sectionName: "10. Quy trình triển khai",
    goal: "Minh bạch hóa cách làm việc chuyên nghiệp, loại bỏ rủi ro bất định, giúp khách hàng thấy được lộ trình rõ ràng từ ngày đầu tiên.",
    uxIntent: "Thiết kế dạng đường ống dẫn dầu (3D Pipeline) hoặc dòng chảy tuyến tính ngang (Timeline), mỗi bước là một node công việc cụ thể.",
    motionSpec: "Đường line nối các node sẽ tự động 'nạp đầy' màu vàng gold chảy qua từng node theo tiến trình cuộn trang của người dùng (scroll-bound pipeline animation).",
    seoOptim: "Sử dụng cấu trúc danh sách có thứ tự <ol> hoặc các thẻ heading tuần tự để các công cụ tìm kiếm AI nhận diện được quy trình từng bước (How-to rich snippet).",
    checklistDesigner: [
      "7 bước tiêu chuẩn: 1. Discovery (Nghiên cứu), 2. Audit (Đánh giá), 3. Strategy (Lập chiến lược), 4. Build (Thiết lập), 5. Launch (Triển khai), 6. Measure (Đo lường), 7. Optimize & Scale (Tối ưu & Mở rộng).",
      "Sử dụng số thứ tự lớn bằng font chữ Space Grotesk mỏng, sang trọng ở phía trên mỗi bước."
    ],
    checklistDeveloper: [
      "Sử dụng Framer Motion `useScroll` và `useTransform` để đồng bộ tiến trình vẽ đường dẫn vàng gold theo cuộn chuột thực tế.",
      "Xử lý chuyển đổi timeline dọc trên mobile mượt mà để dễ cuộn bằng ngón tay."
    ],
    checklistContent: [
      "Giải thích ngắn gọn nhiệm vụ then chốt và bàn giao đầu ra của từng bước để thể hiện sự rõ ràng, cam kết."
    ]
  },
  11: {
    id: 11,
    sectionName: "11. Case study 3D gallery",
    goal: "Xây dựng bằng chứng thuyết phục tối thượng (Social Proof) thông qua các số liệu thành công thực tế của các khách hàng đã đồng hành cùng PGS.",
    uxIntent: "Bộ sưu tập 3D Project Wall trưng bày các mockup thực tế của dự án: giao diện website, biểu đồ tăng trưởng từ Search Console, dashboard quảng cáo mượt mà.",
    motionSpec: "Mảng tường gallery hơi nghiêng góc perspective nhẹ và di động mượt mà theo chuyển động chuột của người dùng. Khi hover vào một case study, card đó sẽ mở rộng, làm mờ các card xung quanh.",
    seoOptim: "Tối ưu hóa Schema CaseStudy hoặc Article tương ứng cho từng case. Chứa các từ khóa kết quả như: 'Case study SEO thành công', 'Hiệu quả quảng cáo Facebook Ads'.",
    checklistDesigner: [
      "Trình bày 3 case study lớn nổi bật từ các lĩnh vực khác nhau: Nha khoa thẩm mỹ, Nội thất cao cấp, Giáo dục quốc tế.",
      "Làm nổi bật 3 con số kết quả ấn tượng nhất bằng font chữ cỡ lớn màu vàng gold."
    ],
    checklistDeveloper: [
      "Tối ưu kích thước ảnh bằng Next.js <Image> component với đầy đủ layout responsive và blur placeholder.",
      "Tích hợp slider hoặc lướt mượt mà hỗ trợ cử chỉ vuốt (swipe) trên mobile."
    ],
    checklistContent: [
      "Viết theo cấu trúc kinh điển: Bối cảnh (Context) -> Vấn đề (Challenge) -> Giải pháp PGS (Solution) -> Kết quả thực tế đạt được (Results). Dữ liệu số phải thật và chính xác."
    ]
  },
  12: {
    id: 12,
    sectionName: "12. CEO authority block",
    goal: "Tạo sự kết nối mang tính cá nhân cao, gia tăng chỉ số EEAT (Chuyên môn & Độ tin cậy) bằng hình ảnh và uy tín cá nhân của nhà sáng lập.",
    uxIntent: "Thiết kế khối chân dung nghệ thuật sang trọng. Nền trắng sữa tinh khiết phối khung viền kim loại vàng gold mỏng. Chữ ký số bay bổng.",
    motionSpec: "Hình ảnh chân dung CEO xuất hiện qua một hiệu ứng mặt nạ mượt mà (gold-to-image mask reveal). Các từ khóa thể hiện triết lý quản trị bay nổi xung quanh ảnh chân dung một cách ngẫu nhiên và biến mất nhẹ.",
    seoOptim: "Sử dụng Schema Person cho CEO, liên kết các tài khoản mạng xã hội uy tín (LinkedIn, Facebook) của CEO để định danh thực thể với Google Knowledge Graph.",
    checklistDesigner: [
      "Sử dụng ảnh chân dung CEO chuyên nghiệp (headshot), thần thái tự tin, sang trọng.",
      "Thiết kế chữ ký viết tay số mạ vàng gold ở góc dưới trích dẫn (quote) của CEO."
    ],
    checklistDeveloper: [
      "Đảm bảo ảnh có thuộc tính alt: 'CEO PGS Agency - Chuyên gia chiến lược Marketing tổng thể'.",
      "Sử dụng CSS backdrop-filter tạo hiệu ứng chiều sâu cho khối trích dẫn chồng lên ảnh."
    ],
    checklistContent: [
      "Quote của CEO phải thể hiện triết lý sâu sắc, tập trung vào sự đồng hành: 'Thành công của khách hàng chính là thước đo duy nhất cho giá trị tồn tại của PGS Agency'."
    ]
  },
  13: {
    id: 13,
    sectionName: "13. Đội ngũ chuyên gia",
    goal: "Chứng minh năng lực triển khai thực tế bằng đội ngũ chuyên gia giàu kinh nghiệm ở từng mảng chuyên sâu, củng cố tính chuyên nghiệp của tổ chức.",
    uxIntent: "Thiết kế '3D Command Table' - Bảng điều khiển phân vai trò. Hiển thị danh sách các chuyên gia hàng đầu phụ trách từng vị trí chiến lược.",
    motionSpec: "Khi hover vào từng vị trí nhân sự (SEO Lead, Ads Lead, Tech Lead), hình ảnh và mô tả trách nhiệm chi tiết của họ sẽ xuất hiện stagger mượt mà với hiệu ứng phát sáng mạ vàng viền xung quanh card.",
    seoOptim: "Đưa thông tin tác giả và chuyên gia vào trang để củng cố yếu tố E-E-A-T cho toàn bộ website theo tài liệu hướng dẫn đánh giá chất lượng của Google.",
    checklistDesigner: [
      "Trình bày đủ 9 vai trò: Strategy, SEO, UX/UI, Ads, Content, Social, Tracking, CRO, Account.",
      "Sử dụng ảnh đại diện đồng bộ phong cách, trang phục lịch sự, chuyên nghiệp, phông nền sáng đồng nhất."
    ],
    checklistDeveloper: [
      "Tối ưu hóa hiển thị grid linh hoạt: 2 cột trên mobile, 3 cột trên tablet, 4 hoặc 5 cột trên desktop.",
      "Áp dụng transition delay tăng dần cho từng card để tạo hiệu ứng thác nước (cascade) đẹp mắt khi xuất hiện."
    ],
    checklistContent: [
      "Mỗi vai trò có một câu tóm tắt năng lực cốt lõi cực kỳ uy tín (ví dụ: SEO Specialist - 7 năm kinh nghiệm, thực chiến >100 dự án lớn)."
    ]
  },
  14: {
    id: 14,
    sectionName: "14. Công nghệ & tracking",
    goal: "Khẳng định phương châm làm việc dựa trên dữ liệu thực tế (Data-driven), loại bỏ hoàn toàn việc tối ưu marketing cảm tính bằng hệ thống tracking tối tân.",
    uxIntent: "Bảng điều khiển (Dashboard) giả lập 3D đẹp mắt, trực quan hóa dòng chảy dữ liệu từ các nền tảng lớn (GA4, GTM, Meta Pixel, Tiktok Pixel) hội tụ về phễu báo cáo của doanh nghiệp.",
    motionSpec: "Đồ thị đường cong tăng trưởng (Line Chart) màu vàng gold tự động vẽ một nét uốn lượn mượt mà đi lên khi scroll tới, các chỉ số số liệu KPI nhảy số tự động (number counter animation) tăng dần từ 0.",
    seoOptim: "Các tên công nghệ và chuẩn kết nối được viết chuẩn mực, tăng tính liên kết từ vựng chuyên ngành trong hệ thống ngữ nghĩa của Google Search.",
    checklistDesigner: [
      "Hiển thị logo của các công nghệ lớn: Google Analytics 4, Tag Manager, Facebook Pixel, Tiktok Pixel, CRM Tracking.",
      "Thiết kế biểu đồ line-chart tối giản nhưng sang trọng với nét vẽ mạ vàng mỏng, bóng mờ vàng phía dưới đồ thị."
    ],
    checklistDeveloper: [
      "Tích hợp thư viện Recharts để vẽ biểu đồ tương tác thật, cấu hình responsive đầy đủ cho component biểu đồ.",
      "Sử dụng thư viện đếm số hoặc hàm setInterval viết sạch để tăng số mượt mà từ 0 đến chỉ số mục tiêu trong 1.5 giây."
    ],
    checklistContent: [
      "Nhấn mạnh cam kết: 'Mọi quyết định tối ưu ngân sách quảng cáo của PGS đều dựa trên dữ liệu chuyển đổi thực tế được kiểm chứng qua hệ thống đo lường minh bạch'."
    ]
  },
  15: {
    id: 15,
    sectionName: "15. Knowledge Hub",
    goal: "Thiết lập uy tín chuyên gia trong ngành, thu hút traffic tự nhiên chất lượng thông qua các bài viết phân tích chuyên sâu.",
    uxIntent: "Thiết kế '3D Knowledge Map' - Bản đồ tri thức trực quan. Chia các bài viết theo cụm chủ đề (Cluster) liên kết chặt chẽ với nhau.",
    motionSpec: "Hover vào từng cụm chủ đề sẽ làm sáng các bài viết liên quan trong cụm đó với đường line liên kết chạy sáng lấp lánh màu vàng gold.",
    seoOptim: "Tối ưu hóa cấu trúc Topic Cluster (Trụ cột & Vệ tinh) trực tiếp trên giao diện, hỗ trợ Google bot hiểu cấu trúc liên kết nội bộ (Internal Link) hoàn hảo.",
    checklistDesigner: [
      "Chia bài viết thành các Hub lớn: SEO đột phá, Thiết kế Website CRO, Performance Ads tối ưu, Content & Social Strategy.",
      "Mỗi bài viết hiển thị tiêu đề, ảnh thumbnail tỉ lệ vàng, thời gian đọc và thẻ tag phân loại."
    ],
    checklistDeveloper: [
      "Đảm bảo các thẻ bài viết là liên kết <a> thật dẫn đến bài viết chi tiết để bot SEO dễ dàng cào dữ liệu.",
      "Sử dụng thuộc tính CSS aspect-ratio cho ảnh thumbnail để tránh bị lỗi nhảy bố cục (layout shift - CLS)."
    ],
    checklistContent: [
      "Sản xuất tiêu đề bài viết mang tính học thuật cao kết hợp giật tít định hướng giải quyết vấn đề (ví dụ: 'Xây dựng phễu quảng cáo đa kênh: Hướng dẫn thực chiến tối ưu CPL năm 2026')."
    ]
  },
  16: {
    id: 16,
    sectionName: "16. FAQ",
    goal: "Hóa giải các thắc mắc và rào cản cuối cùng trước khi khách hàng quyết định liên hệ tư vấn.",
    uxIntent: "Thiết kế Accordion đóng mở mượt mà. Tone màu trắng sang trọng, đường viền xám siêu mỏng, có icon vàng gold quay góc chuyển động khi trạng thái thay đổi.",
    motionSpec: "Sử dụng Framer Motion `AnimatePresence` để tính toán chiều cao tự động khi mở/đóng tab FAQ, tạo cảm giác trượt êm ái tự nhiên.",
    seoOptim: "Khai báo Schema FAQPage chuẩn JSON-LD tương ứng để hiển thị trực tiếp các câu hỏi thường gặp ngay trên kết quả tìm kiếm của Google (FAQ Rich Snippet).",
    checklistDesigner: [
      "Thiết kế 10 - 12 câu hỏi thực tế nhất bao phủ toàn bộ các thắc mắc về: Chi phí, Cam kết KPI, Thời gian ra kết quả, Cách thức phối hợp, v.v.",
      "Sử dụng icon cộng/trừ mạ vàng mỏng mảnh tinh tế ở góc phải mỗi câu hỏi."
    ],
    checklistDeveloper: [
      "Sử dụng thẻ <details> và <summary> chuẩn hoặc cấu hình thuộc tính aria-expanded, aria-controls đúng chuẩn WAI-ARIA cho accordion.",
      "Đảm bảo mỗi câu trả lời FAQ có ID duy nhất để hỗ trợ jump-link từ bên ngoài nếu cần."
    ],
    checklistContent: [
      "Câu trả lời đi thẳng vào vấn đề, tự tin, chuyên nghiệp và có chiều sâu thông tin, tránh trả lời nước đôi."
    ]
  },
  17: {
    id: 17,
    sectionName: "17. Final CTA",
    goal: "Cú hích cuối cùng chuyển đổi khách truy cập thành khách hàng tiềm năng thực sự (Hot Lead), thu thập thông tin qua Form đăng ký nhanh.",
    uxIntent: "Thiết kế một Panel lớn tràn viền cực kỳ sang trọng. Phối hợp giữa khoảng trắng rộng lớn, tiêu đề tương phản cao và form đăng ký tối giản mạ vàng gold tinh tế.",
    motionSpec: "Khi người dùng bắt đầu cuộn đến cuối trang, các mảnh ghép biểu trưng cho SEO, Ads, Website sẽ bay từ rìa màn hình vào trung tâm kết hợp với nhau tạo thành một mô hình 'PGS Growth System' hoàn chỉnh mượt mà.",
    seoOptim: "Sử dụng thẻ <h2> mạnh mẽ. Form liên hệ có nhãn (label) rõ ràng và cấu trúc dữ liệu chuẩn để AI Search / Bot dễ đọc thông tin liên hệ.",
    checklistDesigner: [
      "Headline hành động mạnh mẽ: 'Bạn không cần thêm một chiến dịch marketing rời rạc. Bạn cần một hệ thống tạo tăng trưởng thực tế'.",
      "Form đăng ký chỉ thu thập 4 trường cốt lõi nhất: Họ tên, Số điện thoại, Tên công ty, Nhu cầu cần tư vấn."
    ],
    checklistDeveloper: [
      "Tích hợp validation form chặt chẽ (sử dụng React Hook Form + Resolvers nếu cần). Hiển thị thông báo gửi thành công bằng modal glassmorphism mạ vàng sang xịn mịn.",
      "Tích hợp các nút click gọi nhanh (Hotline) và Zalo OA chạy nổi cố định ở góc dưới màn hình khi hiển thị trên mobile."
    ],
    checklistContent: [
      "Viết nội dung thuyết phục, mang tính thúc giục cao nhưng vẫn giữ được vị thế cao cấp của một công ty tư vấn lớn. Tránh dùng từ ngữ giảm giá, khuyến mãi rẻ tiền."
    ]
  },
  18: {
    id: 18,
    sectionName: "18. Footer lớn",
    goal: "Cung cấp đầy đủ thông tin pháp lý, cơ cấu tổ chức, liên kết nội bộ bổ trợ, củng cố uy tín thương hiệu tối đa ở chân trang.",
    uxIntent: "Bố cục chia cột rộng rãi, dễ đọc. Màu xám rất nhạt và đen than xen kẽ sang trọng. Sắp xếp khoa học thông tin liên hệ và các trang chính sách.",
    motionSpec: "Hover vào các liên kết ở chân trang sẽ có hiệu ứng đổi màu sang vàng gold nhẹ nhàng kèm đường gạch chân mờ chạy từ trái qua phải.",
    seoOptim: "Sử dụng tag <footer> chuẩn. Chứa liên kết đến tất cả các trang dịch vụ chính để tạo dòng chảy PageRank tốt cho cấu trúc link nội bộ của website.",
    checklistDesigner: [
      "Gồm 4 cột chính: 1. Giới thiệu & Bản đồ PGS, 2. Hệ sinh thái dịch vụ, 3. Tài nguyên & Kiến thức, 4. Thông tin liên hệ & Mã số thuế.",
      "Hiển thị logo Bộ Công Thương (nếu có) và chứng nhận bảo mật ở cuối chân trang."
    ],
    checklistDeveloper: [
      "Sử dụng thẻ <address> cho phần thông tin địa chỉ văn phòng đại diện để bot Google quét thực thể vị trí chính xác.",
      "Thiết kế responsive footer co cụm thành dạng accordion đóng mở trên màn hình điện thoại để tránh cuộn trang quá dài bất tiện."
    ],
    checklistContent: [
      "Đảm bảo ghi rõ tên pháp lý công ty, địa chỉ trụ sở, mã số doanh nghiệp, số điện thoại liên hệ chính thức và email hỗ trợ."
    ]
  }
};

interface HandoverDrawerProps {
  sectionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HandoverDrawer({ sectionId, isOpen, onClose }: HandoverDrawerProps) {
  const data = sectionId ? HANDOVER_SECTIONS_DATA[sectionId] : null;

  return (
    <AnimatePresence>
      {isOpen && data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[540px] md:w-[650px] bg-[#FAF9F6] border-l border-gold-200 shadow-2xl z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold-200 bg-white sticky top-0 z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-gold-600 uppercase bg-gold-100/50 px-2.5 py-1 rounded-full">
                  Tài Liệu Đặc Tả Bàn Giao
                </span>
                <h3 className="text-xl font-display font-bold text-brand-dark mt-2">
                  {data.sectionName}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gold-100/50 transition-colors text-brand-muted hover:text-gold-600"
                aria-label="Đóng bảng đặc tả"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 flex-1">
              {/* Goal Box */}
              <div className="bg-white p-5 rounded-xl border border-gold-200/50 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-500" />
                <h4 className="font-display font-semibold text-brand-dark flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-gold-500" />
                  Mục tiêu của Section
                </h4>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {data.goal}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 rounded-xl border border-gold-200/30">
                  <h4 className="font-display font-semibold text-brand-dark flex items-center gap-2 mb-2 text-sm">
                    <Paintbrush className="w-4 h-4 text-gold-500" />
                    Ý Đồ UX/UI
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {data.uxIntent}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gold-200/30">
                  <h4 className="font-display font-semibold text-brand-dark flex items-center gap-2 mb-2 text-sm">
                    <Cpu className="w-4 h-4 text-gold-500" />
                    Đặc tả 3D & Animation
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {data.motionSpec}
                  </p>
                </div>
              </div>

              {/* SEO & AI Search Section */}
              <div className="bg-gold-50 p-5 rounded-xl border border-gold-200/60">
                <h4 className="font-display font-semibold text-brand-dark flex items-center gap-2 mb-3 text-sm">
                  <Globe className="w-4 h-4 text-gold-600" />
                  SEO & AI Search Optimization
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed mb-4">
                  {data.seoOptim}
                </p>
                <div className="space-y-2 border-t border-gold-200/50 pt-3">
                  <div className="grid grid-cols-3 text-[11px]">
                    <span className="font-semibold text-brand-dark">URL đề xuất:</span>
                    <span className="col-span-2 font-mono text-gold-700 font-medium">/</span>
                  </div>
                  <div className="grid grid-cols-3 text-[11px]">
                    <span className="font-semibold text-brand-dark">Heading sử dụng:</span>
                    <span className="col-span-2 font-mono text-gold-700 font-medium">H1 hoặc H2, H3 cụ thể</span>
                  </div>
                </div>
              </div>

              {/* Role Checklists */}
              <div className="space-y-6 pt-4 border-t border-gold-200/30">
                <h4 className="font-display font-semibold text-brand-dark text-base">
                  Checklist Bàn Giao Từng Bộ Phận
                </h4>

                {/* Designer */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono font-bold text-brand-dark flex items-center gap-1.5 uppercase tracking-wider text-pink-700 bg-pink-50 px-2 py-0.5 rounded w-fit">
                    <Paintbrush className="w-3.5 h-3.5" /> For UX/UI Designer
                  </h5>
                  <ul className="space-y-2">
                    {data.checklistDesigner.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Developer */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-mono font-bold text-brand-dark flex items-center gap-1.5 uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit">
                    <Code className="w-3.5 h-3.5" /> For Frontend Developer
                  </h5>
                  <ul className="space-y-2">
                    {data.checklistDeveloper.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SEO Content */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-mono font-bold text-brand-dark flex items-center gap-1.5 uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                    <BookOpen className="w-3.5 h-3.5" /> For Content & SEO
                  </h5>
                  <ul className="space-y-2">
                    {data.checklistContent.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-6 border-t border-gold-200 bg-white sticky bottom-0 z-10 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-brand-dark text-white rounded-lg hover:bg-gold-600 transition-colors text-xs font-display font-medium shadow-md text-center"
              >
                Xác nhận đã duyệt thông tin
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
