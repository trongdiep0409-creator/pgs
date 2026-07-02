// Data for Content Social Service Page of PGS Agency

export interface PillarData {
  id: string;
  name: string;
  title: string;
  description: string;
  exampleTitle: string;
  exampleContent: string;
}

export interface ToneOfVoiceData {
  id: string;
  name: string;
  description: string;
  examples: {
    [industry: string]: {
      headline: string;
      caption: string;
      visualIdea: string;
    }
  };
}

export interface FormatData {
  id: string;
  name: string;
  usage: string;
  ratio: string;
  bestFor: string;
  structure: string[];
}

export interface PackageData {
  id: string;
  name: string;
  tagline: string;
  price: string;
  isPopular: boolean;
  features: string[];
  deliverables: {
    posts: number;
    designs: number;
    reels?: number;
    reporting: string;
    setup: string;
  };
}

export interface FAQData {
  question: string;
  answer: string;
}

// 1. Content Pillars
export const CONTENT_PILLARS: PillarData[] = [
  {
    id: "giao-duc",
    name: "Giáo Dục Khách Hàng",
    title: "Giải quyết nỗi đau qua kiến thức giá trị",
    description: "Cung cấp kiến thức chuyên sâu, mẹo thực tế, và giải mã hiểu lầm trong ngành để định vị thương hiệu như một chuyên gia đáng tin cậy.",
    exampleTitle: "Bài viết: 3 Sai lầm khiến Fanpage của bạn không có tương tác",
    exampleContent: "💡 Thay vì chỉ đăng bài bán hàng, hãy chia sẻ quy tắc 80/20 trong phân phối nội dung. Bài viết phân tích chi tiết cách thuật toán Facebook đánh giá cao các nội dung giữ chân người dùng..."
  },
  {
    id: "gioi-thieu",
    name: "Giới Thiệu Dịch Vụ",
    title: "Trình bày giải pháp một cách tự nhiên nhất",
    description: "Giới thiệu chi tiết tính năng, lợi ích vượt trội của sản phẩm/dịch vụ của doanh nghiệp một cách khéo léo, không mang tính ép buộc mua hàng.",
    exampleTitle: "Bài viết: Giải pháp xây dựng hệ thống Marketing tổng thể từ PGS",
    exampleContent: "📈 Bạn có biết vì sao quảng cáo của bạn đắt đỏ nhưng không ra đơn? Hệ thống Marketing rời rạc chính là nguyên nhân. PGS Agency mang đến giải pháp tích hợp đa nền tảng tối ưu chi phí..."
  },
  {
    id: "case-study",
    name: "Case Study / Dự Án",
    title: "Chứng minh hiệu quả bằng số liệu thực tế",
    description: "Kể lại hành trình PGS giải quyết vấn đề cho một khách hàng cụ thể từ trạng thái ban đầu, giải pháp áp dụng đến kết quả số liệu đột phá.",
    exampleTitle: "Bài viết: Case Study tăng 180% Lead cho thương hiệu Spa thẩm mỹ",
    exampleContent: "🏆 Hành trình lột xác Fanpage Spa trong 45 ngày: Từ một trang trống không có lượt tiếp cận đến việc thu về 250+ inbox khách hàng tiềm năng chất lượng cao nhờ tái định vị tệp nội dung..."
  },
  {
    id: "behind-scenes",
    name: "Behind The Scenes",
    title: "Tạo sự kết nối chân thực từ hậu trường",
    description: "Kể câu chuyện về quy trình làm việc, hậu trường thiết kế hình ảnh, họp bàn chiến dịch hoặc văn hóa công ty để xây dựng lòng tin tuyệt đối.",
    exampleTitle: "Bài viết: Một ngày sản xuất 100 mẫu content sáng tạo tại PGS",
    exampleContent: "🎬 Hãy cùng đột nhập vào phòng Creative Studio của PGS để xem cách chúng mình lên ý tưởng, phác thảo layout hình ảnh và viết những dòng tiêu đề thu hút triệu view..."
  },
  {
    id: "founder-thought",
    name: "Founder Thought",
    title: "Xây dựng uy tín từ tư duy người dẫn đầu",
    description: "Chia sẻ quan điểm cá nhân, triết lý kinh doanh hoặc bài học đắt giá của Founder/Ban quản trị để xây dựng uy tín cá nhân và đại diện cho tầm nhìn thương hiệu.",
    exampleTitle: "Bài viết: 'Đừng đốt tiền vào Ads nếu Content của bạn rỗng tuếch'",
    exampleContent: "✍️ Chia sẻ từ Founder PGS: Nhiều doanh nghiệp tìm đến tôi hỏi vì sao CPM ngày càng cao. Câu trả lời không nằm ở kỹ thuật tối ưu quảng cáo mà nằm ở sợi dây kết nối nội dung..."
  },
  {
    id: "testimonial",
    name: "Testimonial",
    title: "Đánh giá chân thực từ khách hàng cũ",
    description: "Trích dẫn lời khen, feedback qua tin nhắn hoặc video phỏng vấn của khách hàng để tạo hiệu ứng tâm lý đám đông vững chắc (Social Proof).",
    exampleTitle: "Bài viết: Khách hàng nói gì về đội ngũ sản xuất nội dung PGS",
    exampleContent: "💬 'Nhờ PGS tối ưu lại toàn bộ Content Social và thiết kế hình ảnh đồng bộ mà tỷ lệ phản hồi tin nhắn của chúng tôi tăng gấp đôi, khách hàng khen Fanpage trông rất chuyên nghiệp!'"
  },
  {
    id: "offer",
    name: "Ưu Đãi / Kêu Gọi",
    title: "Ưu đãi giới hạn kích thích chuyển đổi ngay",
    description: "Đưa ra lời đề nghị bán hàng hấp dẫn, chương trình quà tặng, dùng thử hoặc ưu đãi số lượng giới hạn kèm theo CTA mạnh mẽ để thu lead nhanh.",
    exampleTitle: "Bài viết: Tặng bản Audit Content Social miễn phí cho 15 doanh nghiệp",
    exampleContent: "🔥 Chỉ trong tuần này, PGS Agency dành tặng 15 suất khám kênh Social, phân tích điểm yếu nội dung và đề xuất bộ Content Outline tùy chỉnh trị giá 5.000.000đ hoàn toàn miễn phí..."
  },
  {
    id: "trend",
    name: "Bắt Trend Phù Hợp",
    title: "Tăng tiếp cận tự nhiên nhờ xu hướng",
    description: "Lồng ghép khéo léo các xu hướng xã hội, meme thịnh hành hoặc tin tức thời sự vào sản phẩm/dịch vụ một cách thông minh, lịch sự và không phản cảm.",
    exampleTitle: "Bài viết: Đón đầu làn sóng số hóa - PGS bắt nhịp xu hướng",
    exampleContent: "⚡️ Bắt trend thông minh: PGS chia sẻ góc nhìn hài hước nhưng cực kỳ thực tế về cách áp dụng các xu hướng thiết kế hình ảnh mới nhất vào bài đăng thương hiệu trên mạng xã hội..."
  }
];

// 2. Tone of Voices
export const TONE_OF_VOICES: ToneOfVoiceData[] = [
  {
    id: "chuyen-gia",
    name: "Chuyên Gia (Expert)",
    description: "Ngôn từ sắc bén, sử dụng số liệu chứng minh, cấu trúc chặt chẽ, khẳng định uy tín tuyệt đối và tầm vóc dẫn đầu.",
    examples: {
      "cong-nghe": {
        headline: "Tối ưu hóa phễu chuyển đổi số bằng dữ liệu thời gian thực",
        caption: "Trong kỷ nguyên số, quyết định marketing dựa trên trực giác là một canh bạc đắt đỏ. PGS Agency xây dựng mô hình tracking dữ liệu đa điểm, giúp doanh nghiệp cắt giảm 35% chi phí lãng phí ngân sách quảng cáo nhờ thấu hiểu chính xác hành vi khách hàng trên từng điểm chạm.",
        visualIdea: "Infographic 3D với biểu đồ cột và dòng dữ liệu chảy màu vàng gold sang trọng."
      },
      spa: {
        headline: "Cơ sở khoa học của liệu trình trẻ hóa da đa tầng công nghệ sinh học",
        caption: "Chúng tôi không hứa hẹn những phép màu cấp tốc. Tại thẩm mỹ viện của chúng tôi, mỗi liệu trình trẻ hóa đều dựa trên phác đồ cá nhân hóa được kiểm chứng lâm sàng, giúp phục hồi tế bào gốc tự nhiên và tăng sinh collagen từ sâu bên trong lớp biểu bì.",
        visualIdea: "Hình ảnh mặt cắt cấu trúc da 3D dạng tinh thể thủy tinh sáng bóng, tinh tế."
      },
      bds: {
        headline: "Phân tích biên độ lợi nhuận bất động sản ven đô giai đoạn 2026 - 2028",
        caption: "Với quy hoạch hạ tầng giao thông đồng bộ vừa được phê duyệt, phân khúc đất nền và biệt thự sinh thái phía Đông đang sở hữu tỷ suất sinh lời kỳ vọng đạt 18-22%/năm. Đây là thời điểm vàng để các nhà đầu tư trung và dài hạn cơ cấu lại danh mục tài sản.",
        visualIdea: "Bản đồ quy hoạch 3D dạng mockup kính mờ phối màu gold óng ánh."
      }
    }
  },
  {
    id: "gan-gui",
    name: "Gần Gũi (Friendly)",
    description: "Sử dụng ngôn từ tự nhiên như một người bạn, xưng hô thân mật, dùng từ ngữ đời thường dễ hiểu, tạo thiện cảm lớn.",
    examples: {
      "cong-nghe": {
        headline: "App chậm, web lag? Đừng lo, tụi mình có bí kíp này siêu dễ áp dụng!",
        caption: "Bạn có bao giờ bực mình vì khách vừa click vào web đã thoát ra ngay lập tức chưa? Có khi chỉ vì tốc độ load chậm hơn 3 giây thui đó. Inbox cho PGS ngay để tụi mình quét và sửa lỗi website miễn phí từ A đến Z cho bạn nha! 😉",
        visualIdea: "Hình ảnh nhân viên PGS cười rạng rỡ cầm điện thoại, có icon chat bay xung quanh."
      },
      spa: {
        headline: "Da dạo này biểu tình mụn ẩn hoài, phải làm sao đây các nàng ơi?",
        caption: "Bận rộn công việc, thức khuya chạy deadline làm da sạm đi trông thấy đúng không nè? Cuối tuần này gác lại âu lo, ghé nhà tụi mình để làn da được 'thở' với liệu trình massage thải độc thảo dược dịu nhẹ nhé. Da mướt mịn tự tin đón tuần mới luôn!",
        visualIdea: "Layout carousel 3 bước chăm da tối giản, tone màu pastel ấm áp kết hợp gold nhạt."
      },
      bds: {
        headline: "Có nên mua nhà trả góp trước tuổi 30? Chia sẻ thật lòng từ người đi trước",
        caption: "Nhiều người bảo cố mua nhà sớm để an cư, nhưng cũng có người sợ gánh nặng nợ nần mỗi tháng. Thực ra không có câu trả lời đúng hoàn hảo, chỉ có phương án phù hợp nhất với tài chính của bạn thôi. Cùng mình ngồi xuống tính toán thử nhé!",
        visualIdea: "Mockup chiếc chìa khóa nhà bằng đồng xinh xắn nằm cạnh tách cà phê ấm áp."
      }
    }
  },
  {
    id: "tu-van",
    name: "Tư Vấn (Consultative)",
    description: "Lắng nghe, đặt câu hỏi khơi gợi nhu cầu, phân tích đa chiều và đưa ra giải pháp từng bước một cách khách quan.",
    examples: {
      "cong-nghe": {
        headline: "Làm thế nào để xây dựng hệ thống CRM hoạt động trơn tru cho phòng Sales?",
        caption: "Vấn đề của 90% doanh nghiệp không nằm ở phần mềm CRM đắt hay rẻ, mà nằm ở việc quy trình vận hành chưa đồng bộ với thói quen của nhân viên. Hãy cùng PGS phân tích 3 bước chuẩn hóa quy trình trước khi tiến hành cài đặt bất kỳ công cụ số hóa nào.",
        visualIdea: "Sơ đồ luồng công việc (flowchart) tinh gọn, trực quan sắc nét."
      },
      spa: {
        headline: "Phân biệt sạm da do nội tiết tố và sạm da do tác động của ánh nắng mặt trời",
        caption: "Điều trị sạm da sai cách không chỉ tốn kém mà còn khiến hàng rào bảo vệ da bị tổn thương nghiêm trọng. Trước khi quyết định laser hay peel da, bạn cần xác định rõ nguyên nhân gốc rễ. Hãy trả lời 4 câu hỏi dưới đây để chuyên gia hỗ trợ bạn.",
        visualIdea: "Bảng so sánh 2 cột với thiết kế tối giản, sạch sẽ như trang y khoa cao cấp."
      },
      bds: {
        headline: "Bộ tiêu chí 5 điểm đánh giá tính pháp lý của một dự án căn hộ hình thành trong tương lai",
        caption: "Để tránh những tranh chấp pháp lý đáng tiếc về sau, nhà đầu tư cần chủ động kiểm tra kỹ 5 loại giấy tờ cốt lõi của chủ đầu tư. PGS xin cung cấp checklist kiểm duyệt chi tiết giúp bạn an tâm tuyệt đối trước khi xuống tiền đặt cọc.",
        visualIdea: "Checklist 3D sang trọng với các dấu tick màu vàng gold nổi bật."
      }
    }
  },
  {
    id: "truyen-cam-hung",
    name: "Truyền Cảm Hứng (Inspirational)",
    description: "Ngôn từ giàu cảm xúc, hướng tới tương lai, khai phá tiềm năng, thúc đẩy hành động mạnh mẽ và khao khát vươn xa.",
    examples: {
      "cong-nghe": {
        headline: "Dẫn đầu cuộc đua số - Đừng chỉ tồn tại, hãy bứt phá giới hạn",
        caption: "Mỗi công nghệ mới ra đời không phải là rào cản, mà là một đôi cánh. Doanh nghiệp của bạn xứng đáng được vươn xa hơn thế nhờ sức mạnh của tự động hóa và dữ liệu thông minh. Hãy cùng PGS bắt đầu hành trình chuyển đổi số kiến tạo tương lai thịnh vượng ngay hôm nay!",
        visualIdea: "Hình ảnh một chiếc phi thuyền hoặc mũi tên ánh sáng hướng thẳng lên cao bứt phá."
      },
      spa: {
        headline: "Yêu chiều bản thân là khoản đầu tư không bao giờ thua lỗ",
        caption: "Vẻ đẹp rạng rỡ nhất của người phụ nữ chính là khi họ biết trân trọng và yêu thương chính mình. Dành ra 60 phút mỗi tuần để chăm sóc cơ thể không chỉ là làm đẹp da, đó là cách bạn tái tạo năng lượng tích cực và khẳng định giá trị bản thân.",
        visualIdea: "Hình ảnh một đóa hoa sen mờ ảo đang nở rộ dưới ánh nắng ban mai rực rỡ."
      },
      bds: {
        headline: "Kiến tạo tổ ấm an yên - Nơi lưu giữ những khoảnh khắc hạnh phúc nhất đời người",
        caption: "Nhà không chỉ là bốn bức tường gạch, nhà là nơi bão dừng sau cánh cửa, là nụ cười của con trẻ và cái ôm ấm áp sau một ngày dài mỏi mệt. Hãy để chúng tôi đồng hành cùng bạn trên hành trình dựng xây một không gian sống xứng tầm, nơi trọn vẹn yêu thương.",
        visualIdea: "Mockup ngôi nhà kính mờ lung linh dưới ánh hoàng hôn vàng nhẹ."
      }
    }
  },
  {
    id: "ban-hang-mem",
    name: "Bán Hàng Mềm (Soft Sell)",
    description: "Không thúc ép, tập trung vào giá trị nhận được, khơi gợi khát khao sở hữu một cách tự nhiên và đầy thuyết phục.",
    examples: {
      "cong-nghe": {
        headline: "Bạn tập trung kinh doanh, việc vận hành hệ thống Marketing cứ để PGS lo",
        caption: "Thay vì đau đầu tuyển dụng, đào tạo và quản lý một phòng marketing cồng kềnh, bạn hoàn toàn có thể sở hữu ngay một đội ngũ chuyên gia thiện chiến từ PGS Agency với chi phí tối ưu hơn rất nhiều. Hãy để chúng tôi làm bệ phóng vững chắc sau lưng bạn.",
        visualIdea: "Hình ảnh hai bàn tay bắt chặt lấy nhau biểu thị sự đồng hành và tin tưởng."
      },
      spa: {
        headline: "Món quà tuyệt vời nhất cho làn da thiếu sức sống sau những ngày bận rộn",
        caption: "Chỉ sau một liệu trình thanh lọc da chuyên sâu bằng oxy tươi tại Spa, bạn sẽ cảm nhận ngay sự mướt mát, căng mọng đầy sức sống của làn da. Đặt lịch hôm nay để nhận ngay bộ quà tặng chăm sóc da tại nhà độc quyền từ chúng tôi nhé.",
        visualIdea: "Chai tinh chất serum thủy tinh trong suốt lấp lánh hạt vàng 24k lơ lửng."
      },
      bds: {
        headline: "Chỉ còn 3 căn hộ tháp mặt sông đẹp nhất dự án sở hữu tầm nhìn panorama triệu đô",
        caption: "Buổi sáng thức giấc ngắm trọn bình minh trên sông Sài Gòn thơ mộng ngay từ ban công phòng ngủ. Một đặc quyền sống thượng lưu chỉ dành riêng cho 3 chủ nhân cuối cùng sở hữu căn hộ ven sông đắt giá này. Inbox ngay để nhận báo giá chi tiết.",
        visualIdea: "Góc ban công ngập tràn ánh nắng ấm áp nhìn ra dòng sông hiền hòa."
      }
    }
  }
];

// 3. Formats
export const FORMATS: FormatData[] = [
  {
    id: "single-post",
    name: "Single Post (Bài đơn)",
    usage: "Thích hợp cho thông báo nhanh, bài chia sẻ ngắn, tin tức hot hoặc bài viết bán hàng trực tiếp tập trung vào 1 thông điệp chính.",
    ratio: "1:1 (Square) hoặc 4:5 (Portrait)",
    bestFor: "Độ tiếp cận nhanh, dễ chia sẻ, sản xuất tốc độ.",
    structure: ["Tiêu đề giật tít (Hook) hoành tráng", "Nội dung giải quyết vấn đề nhanh trong 150 - 250 từ", "Hình ảnh visual cực mạnh chứa text key", "Call to Action (CTA) đăng ký/inbox ở cuối"]
  },
  {
    id: "carousel",
    name: "Carousel (Nhiều ảnh)",
    usage: "Thích hợp cho bài giáo dục chuyên sâu, cẩm nang hướng dẫn từng bước, hoặc liệt kê tính năng sản phẩm một cách trực quan sinh động.",
    ratio: "1:1 (Square) đồng bộ từ 4 đến 10 ảnh liên tục",
    bestFor: "Tăng thời gian dừng (Dwell time) của người dùng trên bài viết, tăng tương tác quẹt ảnh.",
    structure: ["Trang bìa (Slide 1): Tiêu đề cực cuốn + Visual ấn tượng nhất", "Trang nội dung (Slide 2-N): Chia nhỏ kiến thức, mỗi trang chứa 1 ý chính kèm icon", "Trang kết (Slide cuối): Tổng kết giá trị + Kêu gọi hành động rõ ràng"]
  },
  {
    id: "story-format",
    name: "Story / Story Ads",
    usage: "Chia sẻ khoảnh khắc hậu trường tức thì, feedback nhanh của khách hàng, mini game trúng thưởng hoạt động trong 24h.",
    ratio: "9:16 (Vertical)",
    bestFor: "Kết nối mật thiết với người theo dõi trung thành, kích thích phản hồi nhanh qua tin nhắn.",
    structure: ["Visual chiếm 90% diện tích màn hình", "Text ngắn gọn dưới 15 từ, sử dụng sticker hỏi đáp hoặc bình chọn", "Hiệu ứng chuyển động mượt mà kích thích bấm giữ hoặc quẹt lên link"]
  },
  {
    id: "reel-caption",
    name: "Reel / Short Video Caption",
    usage: "Kịch bản và chú thích đi kèm cho video ngắn dưới 60 giây (TikTok, Reels, Shorts) kể chuyện, hài hước hoặc biến hình.",
    ratio: "9:16 (Video gốc) + Caption ngắn",
    bestFor: "Bứt phá lượt tiếp cận tự nhiên đến hàng triệu người dùng mới ngoài tệp follower.",
    structure: ["Tiêu đề bài viết đồng bộ với hook 3 giây đầu của video", "Nội dung tóm tắt giá trị chính bằng các gạch đầu dòng siêu ngắn", "Thẻ hashtag thịnh hành được chọn lọc đúng tệp khách hàng mục tiêu", "Lời kêu gọi xem hết video hoặc lưu lại bài viết"]
  },
  {
    id: "pr-social",
    name: "PR Social (Bài viết PR cộng đồng)",
    usage: "Đăng tải trên các group cộng đồng lớn, fanpage vệ tinh để tạo làn sóng thảo luận tự nhiên về thương hiệu hoặc sản phẩm.",
    ratio: "Tùy biến hình ảnh đời thường chân thực",
    bestFor: "Tạo niềm tin tự nhiên, điều hướng thảo luận tích cực, thu thập phản hồi khách quan từ thị trường.",
    structure: ["Khởi đầu bằng câu chuyện cá nhân chân thực mang tính tự sự", "Lồng ghép sản phẩm/thương hiệu như một giải pháp được khuyên dùng", "Kích thích tranh luận văn minh dưới phần bình luận của cộng đồng", "Dẫn link hoặc từ khóa tìm kiếm thương hiệu một cách khéo léo"]
  }
];

// 4. Gói dịch vụ
export const PACKAGES: PackageData[] = [
  {
    id: "basic",
    name: "Social Content Basic",
    tagline: "Duy trì sự hiện diện chuyên nghiệp cơ bản trên mạng xã hội.",
    price: "7.500.000",
    isPopular: false,
    features: [
      "Xây dựng 03 Content Pillars cốt lõi phù hợp ngành hàng",
      "Lập lịch biên tập nội dung (Content Calendar) hàng tháng",
      "Sản xuất 12 bài viết chuẩn SEO Social & Định hướng thương hiệu",
      "Thiết kế 12 hình ảnh đồng bộ nhận diện thương hiệu độc quyền",
      "Hỗ trợ viết 02 bài viết dạng Carousel giáo dục chuyên sâu",
      "Tối ưu hóa thông tin mô tả Fanpage chuẩn SEO ban đầu",
      "Báo cáo hiệu quả tương tác (Reach, Engagement) cuối tháng"
    ],
    deliverables: {
      posts: 12,
      designs: 12,
      reporting: "Báo cáo định kỳ cuối tháng",
      setup: "3 - 5 ngày làm việc"
    }
  },
  {
    id: "growth",
    name: "Social Content Growth",
    tagline: "Bứt phá tương tác, thu hút khách hàng tiềm năng và tăng trưởng lead.",
    price: "15.000.000",
    isPopular: true,
    features: [
      "Xây dựng 05 Content Pillars toàn diện kèm phác đồ Tone of Voice",
      "Lập lịch biên tập nội dung chi tiết trước 10 ngày mỗi tháng",
      "Sản xuất 24 bài viết đa dạng định dạng (Bài lẻ, Carousel, PR)",
      "Thiết kế 24 hình ảnh chất lượng cao kèm 03 mẫu template độc quyền",
      "Sản xuất 04 kịch bản video ngắn (Reels/TikTok) thu hút triệu view",
      "Hỗ trợ lên ý tưởng và thiết kế bộ ảnh Cover, Avatar chuyên nghiệp",
      "Theo dõi, đo lường tỷ lệ chuyển đổi (Inbound Lead, Click-to-Messenger)",
      "Tối ưu bài đăng theo giờ vàng của thuật toán phân phối",
      "Họp đánh giá chiến lược và báo cáo chi tiết 2 tuần/lần"
    ],
    deliverables: {
      posts: 24,
      designs: 24,
      reels: 4,
      reporting: "Báo cáo & Họp chiến lược 2 tuần/lần",
      setup: "5 - 7 ngày làm việc"
    }
  },
  {
    id: "brand-system",
    name: "Social Content Brand System",
    tagline: "Xây dựng hệ thống nội dung thương hiệu dẫn đầu phân khúc.",
    price: "28.000.000",
    isPopular: false,
    features: [
      "Chiến lược định vị thương hiệu trên Social chuyên sâu từ Creative Director",
      "Phác thảo Brand Voice Guideline độc bản cho doanh nghiệp",
      "Sản xuất 30 bài viết độc quyền (bao gồm cả bài viết cho Founder cá nhân)",
      "Thiết kế 30 bộ hình ảnh Premium, ứng dụng hiệu ứng White Glass & Gold Metallic",
      "Sản xuất 08 kịch bản và hỗ trợ biên tập 08 video ngắn hoàn thiện",
      "Quản trị và vận hành đăng bài đa kênh (Facebook, Instagram, LinkedIn)",
      "Xây dựng phịch bản Chatbot tự động đồng bộ tone giọng thương hiệu",
      "Tracking dữ liệu phễu chuyển đổi từ Social về Website/Landing Page",
      "Đặc quyền ưu tiên phản hồi và điều chỉnh gấp trong vòng 4 tiếng",
      "Báo cáo Dashboard trực tuyến thời gian thực & Họp chiến lược hàng tuần"
    ],
    deliverables: {
      posts: 30,
      designs: 30,
      reels: 8,
      reporting: "Realtime Dashboard + Họp chiến lược hàng tuần",
      setup: "7 - 10 ngày làm việc"
    }
  }
];

// 5. FAQ
export const FAQS: FAQData[] = [
  {
    question: "Một tháng PGS Agency sẽ bàn giao bao nhiêu bài viết và hình ảnh?",
    answer: "Số lượng bài viết và thiết kế hình ảnh sẽ phụ thuộc hoàn toàn vào gói dịch vụ doanh nghiệp lựa chọn. Gói Basic cung cấp 12 bài viết/hình ảnh mỗi tháng (thích hợp duy trì), gói Growth cung cấp 24 bài viết/hình ảnh kèm 4 kịch bản video ngắn (thích hợp tăng trưởng mạnh mẽ), và gói Brand System cung cấp 30 bài viết/hình ảnh cao cấp kèm 8 video hoàn thiện và vận hành đa kênh."
  },
  {
    question: "PGS Agency có hỗ trợ thiết kế hình ảnh và video đi kèm bài viết không?",
    answer: "Có, 100% các bài viết của PGS Agency đều đi kèm hình ảnh được thiết kế độc quyền, đồng bộ với bộ nhận diện thương hiệu của bạn (không dùng ảnh mạng, không dùng template có sẵn đại trà). Đối với video ngắn (Reels, TikTok), chúng tôi sẽ lên kịch bản chi tiết, hỗ trợ hướng dẫn quay dựng và biên tập hiệu ứng chuyển động hoàn chỉnh."
  },
  {
    question: "Đội ngũ PGS Agency có đăng bài trực tiếp lên các kênh của chúng tôi không?",
    answer: "Với gói Growth và Brand System, chúng tôi hỗ trợ lập lịch đăng bài tự động hoặc đăng bài thủ công trực tiếp lên Fanpage, Instagram, Group theo khung giờ vàng tối ưu tương tác của ngành hàng. Bạn hoàn toàn có quyền duyệt trước toàn bộ nội dung và lịch đăng thông qua bảng kế hoạch chung trước khi bài viết lên sóng."
  },
  {
    question: "Doanh nghiệp của tôi hoạt động trong ngành đặc thù/kỹ thuật khó, PGS có viết được không?",
    answer: "PGS Agency sở hữu quy trình nghiên cứu thị trường (Research) và thấu hiểu chân dung khách hàng sâu sắc trước khi đặt bút viết. Chúng tôi sẽ làm việc với chuyên gia nội bộ của bạn qua buổi Brief để chuẩn hóa thuật ngữ chuyên ngành, tìm kiếm tài liệu chuẩn và xây dựng bộ từ điển thương hiệu riêng. Nhờ đó, bài viết luôn đảm bảo tính chính xác cao và có chiều sâu chuyên môn."
  },
  {
    question: "Dịch vụ Content Social của PGS có cam kết doanh số bán hàng trực tiếp không?",
    answer: "Nhiệm vụ cốt lõi của Content Social là xây dựng điểm chạm, gia tăng uy tín thương hiệu, thu hút tệp khách hàng tiềm năng chất lượng cao và chuyển đổi họ thành Lead (Inbox, Form đăng ký, Click). PGS cam kết các chỉ số đo lường được như: Lượt tiếp cận (Reach), Lượt tương tác (Engagement), Số lượng Lead/Inbox đổ về. Doanh thu cuối cùng còn phụ thuộc vào quy trình tư vấn/chốt sale của doanh nghiệp bạn, tuy nhiên PGS sẽ hỗ trợ tối đa bằng cách tối ưu kịch bản phễu chuyển đổi."
  }
];

// 6. Dịch vụ liên quan
export const RELATED_SERVICES = [
  {
    name: "Quản lý & Chăm sóc Fanpage",
    desc: "Vận hành Fanpage toàn diện, trực tin nhắn, quản lý bình luận và xây dựng cộng đồng gắn kết.",
    link: "/dich-vu/quan-ly-fanpage/",
    icon: "Layers"
  },
  {
    name: "Vận hành Instagram Business",
    desc: "Thiết kế lưới ảnh Grid nghệ thuật, tối ưu hóa Story và thu hút tệp khách hàng trẻ sành điệu.",
    link: "/dich-vu/van-hanh-instagram/",
    icon: "Palette"
  },
  {
    name: "Xây dựng kênh TikTok Triệu View",
    desc: "Lên kịch bản, sản xuất video ngắn, bắt trend thông minh giúp thương hiệu phủ sóng rộng rãi.",
    link: "/dich-vu/xay-dung-kenh-tiktok/",
    icon: "Flame"
  },
  {
    name: "Quảng cáo Facebook Ads Chuyển Đổi",
    desc: "Tối ưu hóa ngân sách quảng cáo, nhắm mục tiêu chính xác, bứt phá lead và doanh thu thực tế.",
    link: "/dich-vu/facebook-ads/",
    icon: "Target"
  }
];
