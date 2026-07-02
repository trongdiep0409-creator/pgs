'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Play, Clipboard, Check, Share2, TrendingUp, Users, Link as LinkIcon, BarChart2, Eye, ShieldAlert } from 'lucide-react';

export default function InteractiveTools() {
  const [captionType, setCaptionType] = useState<'selling' | 'edu' | 'viral'>('selling');
  const [copiedText, setCopiedText] = useState(false);
  const [kpiTab, setKpiTab] = useState<'reach' | 'visit' | 'follower' | 'clicks'>('reach');

  // Caption templates
  const captionTemplates = {
    selling: {
      title: "Storyselling (Kể chuyện bán hàng)",
      text: `⚜️ ĐẰNG SAU MỘT THƯƠNG HIỆU TRIỆU ĐÔ LÀ GÌ?

Hôm qua, tôi có buổi tư vấn 1-1 với một chủ thương hiệu thời trang. Chị ấy nói: "Mỗi tháng chị chi gần 100 triệu tiền ads nhưng tỷ lệ giữ chân khách cũ chỉ dưới 5%. Khách vào xem grid rồi đi ra không để lại dấu vết."

Tôi mở xem Instagram của chị. Hình ảnh chụp thô sơ, đăng không đồng bộ, kịch bản Reels hời hợt. Thương hiệu của chị đang bị mất đi 90% "trust" (lòng tin) thị giác ngay khi khách ghé thăm profile.

PGS Agency đã vào cuộc:
1️⃣ Quy hoạch lại toàn bộ Grid Layout 3x3 theo style Light Luxury.
2️⃣ Sản xuất chuỗi Reels giải quyết trực tiếp nỗi đau phối đồ cho khách.
3️⃣ Viết Caption truyền tải định vị tinh hoa thay vì chỉ liệt kê thông số.

Kết quả? Sau 30 ngày vận hành, lượng profile visit tăng 180%, chi phí quảng cáo giảm 35% nhờ lượng organic lead chất lượng từ Reels tăng đột biến!

👉 Instagram của bạn đã thể hiện đúng đẳng cấp thương hiệu chưa? Đừng để mất khách hàng tiềm năng chỉ vì một trang cá nhân thiếu đồng bộ.

📥 Nhấp ngay liên kết ở Bio để nhận bản AUDIT KÊNH miễn phí trị giá 5.000.000đ từ PGS Agency ngày hôm nay!

#pgsagency #marketingtongthe #branding #vanhanhinstagram #storytelling #growthmarketing #doanhnghiep`,
    },
    edu: {
      title: "Educational (Chia sẻ kiến thức)",
      text: `📋 CHECKLIST 5 BƯỚC TỐI ƯU PROFILE INSTAGRAM TĂNG GẤP 3 LẦN LEAD

Nhiều doanh nghiệp đổ hàng triệu đồng kéo traffic về trang cá nhân nhưng tỷ lệ chuyển đổi bằng 0. Lý do nằm ở chỗ bạn chưa tối ưu hóa Profile thành "Phễu bán hàng tự động".

Lưu ngay 5 bước chuẩn chỉnh dưới đây từ PGS Agency:

1️⃣ Avatar Nhận Diện Sắc Nét: Sử dụng logo thương hiệu trên nền tương phản cao, căn giữa chính xác. Đối với thương hiệu cá nhân, dùng ảnh chân dung chụp cận cảnh phong cách chuyên nghiệp.
2️⃣ Tên Hiển Thị Chứa Từ Khóa: Thay vì chỉ viết tên thương hiệu, hãy thêm từ khóa ngành hàng (Vd: "PGS Agency | Marketing Tổng Thể" thay vì chỉ "PGS Agency"). Giúp SEO Instagram nhận diện bạn ngay lập tức!
3️⃣ 3 Dòng Bio Định Vị USP:
   - Dòng 1: Bạn giải quyết vấn đề gì cho ai?
   - Dòng 2: Chứng minh năng lực / Điểm khác biệt độc bản (USP).
   - Dòng 3: Quà tặng miễn phí / Lời kêu gọi hành động (Call To Action).
4️⃣ Quy hoạch Story Highlight (Tin Nổi Bật): Đồng bộ icon bìa cover. Chỉ tập trung lưu trữ các nội dung: Bảng giá, Quy trình, Feedback khách hàng, Hoạt động thực tế.
5️⃣ Bio Link Đích Rõ Ràng: Sử dụng Linktree hoặc Landing Page được tối ưu di động, dẫn thẳng về Form tư vấn hoặc Zalo chat.

👉 Bạn đã làm được bao nhiêu bước trong checklist này? Để lại bình luận bên dưới, PGS Agency sẽ ghé thăm và góp ý trực tiếp cho profile của bạn!

#pgsagency #seoinstagram #marketingtips #toiuuprofile #conversionrate #cro #chiasekienthuc #luxurylifestyle`,
    },
    viral: {
      title: "Viral Reel (Hỗ trợ kịch bản Reels ngắn)",
      text: `🎬 BÍ QUYẾT GIỮ CHÂN NGƯỜI XEM TRONG 3 GIÂY ĐẦU TIÊN!

(Đừng bỏ lỡ dòng kịch bản cực kỳ quan trọng ở phần cuối caption này)

Hầu hết mọi người thất bại làm Reels vì dành quá nhiều thời gian giới thiệu bản thân ở đầu video. Thuật toán Instagram sẽ quét hành vi bỏ qua của người dùng và bóp tương tác của bạn ngay lập tức.

PGS Agency bật mí công thức Hook 3 Giây Vàng giúp video Reels của chúng tôi liên tục đạt mốc trăm ngàn lượt xem tự nhiên:

✔️ Đưa trực tiếp nỗi đau hoặc kết quả ấn tượng nhất lên giây đầu tiên.
✔️ Sử dụng text tiêu đề tương phản cao, chuyển động nhẹ kích thích thị giác.
✔️ Kết hợp âm thanh xu hướng có nhịp điệu dứt khoát khớp với cut dựng.

Nhưng đó mới chỉ là 50% chặng đường. 50% còn lại nằm ở cách bạn dẫn dắt người xem hành động thông qua Caption.

Chi tiết kịch bản chuyển đổi của video Reels này:
👉 Bạn muốn sở hữu trọn bộ 30 mẫu Hook kịch bản Reels viral đa ngành hàng từ chuyên gia PGS?

💬 Đóng góp một bình luận dưới video này với từ khóa "REELS", hệ thống của PGS Agency sẽ tự động gửi link tải tài liệu độc quyền qua DM của bạn trong 5 giây!

#pgsagency #reelsviral #growthmarketing #hookscripts #toiuutươngtác #instagramreels #contentstrategy #viralvideo`,
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // KPI chart data structures
  const kpiData = {
    reach: {
      title: "Lượt Tiếp Cận (Organic Reach)",
      number: "145,200",
      growth: "+245%",
      desc: "Lượt hiển thị tự nhiên tăng vọt nhờ tối ưu thuật toán Reels và bộ Hashtag chuẩn hóa.",
      points: [20, 35, 45, 60, 95, 145] // SVG path representation coordinates
    },
    visit: {
      title: "Lượt Ghé Thăm Profile (Profile Visits)",
      number: "12,840",
      growth: "+180%",
      desc: "Tỷ lệ tò mò và chuyển đổi từ người xem Reels sang ghé thăm trang cá nhân tăng vượt bậc.",
      points: [15, 25, 30, 48, 75, 128]
    },
    follower: {
      title: "Followers Tự Nhiên (Organic Followers)",
      number: "3,420",
      growth: "+310%",
      desc: "Lượng người theo dõi chất lượng, đúng đối tượng mục tiêu, có khả năng mua hàng cao.",
      points: [10, 18, 32, 50, 80, 115]
    },
    clicks: {
      title: "Lượt Nhấp Bio Link (Bio CTA Clicks)",
      number: "1,840",
      growth: "+195%",
      desc: "Chỉ số quan trọng nhất phản ánh doanh số. Người dùng click vào link bio để đăng ký nhận tư vấn.",
      points: [5, 12, 18, 35, 55, 98]
    }
  };

  const currentKpi = kpiData[kpiTab];

  return (
    <div className="space-y-24 bg-stone-50 py-16">
      
      {/* SECTION 8: Reels Strategy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider">
              <Play className="w-3.5 h-3.5" /> Reels Master
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              Chiến lược Reels Ngắn <br />Đột phá Tiếp cận Tự nhiên
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Video Reels ngắn là động cơ mạnh mẽ nhất giúp tăng trưởng tài khoản tự nhiên không đồng quảng cáo. PGS Agency xây dựng chiến lược Reels bài bản với 3 định dạng nội dung then chốt:
            </p>

            <div className="space-y-4">
              {[
                { type: "Kích hoạt tò mò (The Curiosity Hook)", desc: "Video dưới 15 giây tập trung giải quyết 1 nỗi đau nhức nhối cực nhanh kèm tiêu đề giật gân, điều hướng người xem đọc chi tiết ở caption.", icon: "⚡" },
                { type: "Chuyên gia chia sẻ (Expert Authority)", desc: "Video 30-45 giây phô diễn kiến thức sâu sắc, chứng minh năng lực chuyên môn cao giúp xây dựng lòng tin EEAT vững chắc.", icon: "🎓" },
                { type: "Hậu trường & Quy trình (Behind The Scenes)", desc: "Video cận cảnh khâu sản xuất đóng gói tỉ mỉ, phỏng vấn ngắn đội ngũ, tạo sự gần gũi và tính chân thực tuyệt đối.", icon: "⚜️" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-stone-200/50 hover:border-amber-500/30 hover:shadow-sm transition duration-300">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{item.type}</h4>
                    <p className="text-stone-500 text-xs mt-1 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            {/* Reels Stack 3D visualization using custom CSS */}
            <div className="relative w-full max-w-[280px] aspect-[9/16] bg-stone-900 rounded-[32px] border-4 border-stone-800 shadow-2xl p-3 overflow-hidden flex flex-col justify-between">
              
              {/* Reels header overlay */}
              <div className="flex justify-between items-center text-white text-[9px] z-10 pt-2 px-1">
                <span className="font-bold flex items-center gap-1">🎥 Reels</span>
                <span className="opacity-75">Âm thanh gốc</span>
              </div>

              {/* Centered Play button mockup */}
              <div className="my-auto flex flex-col items-center justify-center z-10 gap-2">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center cursor-pointer hover:scale-115 transition duration-300">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-[10px] text-white/90 font-mono tracking-widest uppercase font-bold bg-stone-950/40 px-2 py-0.5 rounded">
                  Reels Strategy Mẫu
                </span>
              </div>

              {/* Reels interaction sidebar mockup overlay */}
              <div className="absolute right-3 bottom-12 flex flex-col items-center gap-4 text-white z-10">
                <div className="flex flex-col items-center">
                  <span className="text-lg">❤️</span>
                  <span className="text-[8px]">1.8K</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg">💬</span>
                  <span className="text-[8px]">245</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg">📥</span>
                  <span className="text-[8px]">190</span>
                </div>
              </div>

              {/* Bottom bio overlay */}
              <div className="text-white text-[10px] z-10 space-y-1 pb-2">
                <p className="font-bold flex items-center gap-1">@pgs_agency <span className="bg-amber-500 text-stone-950 text-[7px] px-1 rounded font-sans uppercase font-bold">Follow</span></p>
                <p className="opacity-90 font-sans line-clamp-2">Bí quyết đột phá 100k views Reels chỉ với 1 thay đổi nhỏ ở tiêu đề...</p>
              </div>

              {/* Translucent overlay representational art gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 -z-10"></div>
              
              {/* Stack effect behind card */}
              <div className="absolute -right-4 -bottom-4 w-full h-full border border-amber-500/20 bg-stone-800 rounded-[32px] -z-20 rotate-3 transform translate-x-3 translate-y-3"></div>
              <div className="absolute -right-8 -bottom-8 w-full h-full border border-amber-500/10 bg-stone-700 rounded-[32px] -z-30 rotate-6 transform translate-x-6 translate-y-6"></div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: Caption & Hashtag Builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Caption Engineer
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Công nghệ Caption & Hashtag 3 Tầng
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base">
            Hình ảnh thu hút người xem dừng lại, nhưng Caption và Hashtag mới chính là nơi kích hoạt hành vi mua hàng và gia tăng tiếp cận. Trải nghiệm thử công cụ Caption Builder mẫu dưới đây:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Builder Selectors */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Chọn loại cấu trúc bài viết:</p>
              {[
                { id: 'selling', title: "Kể Chuyện Bán Hàng", desc: "Xây dựng trust bằng câu chuyện khách hàng thực tế và lồng ghép khéo léo giải pháp." },
                { id: 'edu', title: "Chia Sẻ Kiến Thức", desc: "Nội dung giá trị cao dạng Listicle khiến người dùng lưu lại ngay lập tức." },
                { id: 'viral', title: "Tối Ưu Kịch Bản Reels", desc: "Giữ chân tối đa người xem và thúc đẩy kêu gọi bình luận để tự động gửi tài liệu qua DM." }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setCaptionType(btn.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition duration-300 ${
                    captionType === btn.id
                      ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <h4 className="font-serif font-bold text-sm">{btn.title}</h4>
                  <p className={`text-[10px] mt-1 leading-normal ${captionType === btn.id ? 'text-stone-300' : 'text-stone-400'}`}>{btn.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => copyToClipboard(captionTemplates[captionType].text)}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedText ? 'Đã sao chép thành công!' : 'Sao chép đoạn Caption này'} <Clipboard className="w-4 h-4" />
            </button>
          </div>

          {/* Right Preview Output box */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-white border border-stone-200/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded uppercase tracking-wider">
                  Cấu trúc {captionTemplates[captionType].title}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">Đồng bộ chuẩn PGS Content Guidelines</span>
              </div>
              <div className="font-sans text-xs md:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap h-[320px] overflow-y-auto pr-2 scrollbar-thin bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                {captionTemplates[captionType].text}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: Sơ đồ phễu chuyển đổi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <Share2 className="w-3.5 h-3.5" /> CRO Funnel
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Sơ Đồ Phễu Chuyển Đổi Về Website/Landing Page
          </h2>
          <p className="mt-4 text-stone-500 text-sm md:text-base">
            PGS Agency không làm marketing rời rạc để lấy lượt tương tác ảo. Chúng tôi kết nối tài khoản Instagram của bạn trực tiếp với hệ thống kinh doanh cốt lõi để tạo ra doanh thu thực tế thông qua phễu chuyển đổi:
          </p>
        </div>

        {/* Dynamic Vector Sơ đồ phễu chuyển đổi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Sơ đồ mũi tên mờ chạy ngang ẩn trên màn hình lớn */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-amber-200/40 -translate-y-1/2 -z-10 hidden md:block">
            <div className="w-full h-full bg-amber-500 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
          </div>

          {[
            { step: "01", name: "Thu hút (Traffic Hub)", desc: "Video Reels lọt xu hướng kết hợp chuỗi ảnh Carousel chuẩn SEO tiếp cận hàng chục ngàn người dùng tự nhiên.", icon: "📣" },
            { step: "02", name: "Định vị (Bio Profile)", desc: "Khách hàng ấn tượng nhấp ghé thăm Profile. Avatar, Bio 3 dòng và Story Highlight giữ chân và kích hoạt lòng tin.", icon: "⚜️" },
            { step: "03", name: "Chinh phục (Landing Page)", desc: "Người dùng nhấp vào link Bio Link dẫn về Landing Page cung cấp giá trị chuyên sâu, tài liệu độc quyền.", icon: "🔗" },
            { step: "04", name: "Chuyển đổi (Lead Form / Zalo)", desc: "Khách hàng để lại thông tin đăng ký tư vấn trực tiếp hoặc chat với sale tạo ra cơ hội kinh doanh thực tế.", icon: "📈" }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-stone-200/60 shadow-sm flex flex-col justify-between relative group hover:border-amber-500/40 hover:shadow-lg transition duration-300">
              <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200 flex items-center justify-center font-bold text-xs">
                {item.step}
              </span>
              <div>
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">{item.name}</h4>
                <p className="text-stone-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400">Phase {i+1}</span>
                <span className="text-amber-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">PGS CRO →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: KPI Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider">
              <BarChart2 className="w-3.5 h-3.5" /> Data Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              Báo cáo KPI Minh Bạch, <br />Đo lường bằng Dữ liệu
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              PGS Agency mang triết lý <strong>đề cao hiệu quả kinh doanh thực tế</strong>. Chúng tôi không báo cáo số lượt thích hời hợt mà đo lường sâu các chỉ số KPI quyết định tăng trưởng thương hiệu. Hãy nhấp chọn từng chỉ số để xem thống kê tiến độ:
            </p>

            <div className="space-y-2">
              {[
                { id: 'reach', label: "Lượt Tiếp Cận (Reach)", icon: <Eye className="w-4 h-4" /> },
                { id: 'visit', label: "Lượt ghé thăm Profile", icon: <Users className="w-4 h-4" /> },
                { id: 'follower', label: "Lượng Followers tự nhiên", icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'clicks', label: "Lượt click Bio Link", icon: <LinkIcon className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setKpiTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition duration-300 ${
                    kpiTab === tab.id
                      ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-2">{tab.icon} {tab.label}</span>
                  <span className={kpiTab === tab.id ? "text-amber-400" : "text-stone-400"}>→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-stone-200/60 shadow-sm">
            <div className="flex justify-between items-start border-b border-stone-100 pb-4 mb-6">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">Chỉ số báo cáo định kỳ</p>
                <h3 className="font-serif font-bold text-stone-900 text-lg md:text-xl mt-1">
                  {currentKpi.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl md:text-3xl font-serif font-bold text-amber-500 block">
                  {currentKpi.number}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {currentKpi.growth} so với tháng trước
                </span>
              </div>
            </div>

            <p className="text-stone-500 text-xs md:text-sm leading-relaxed mb-6">
              {currentKpi.desc}
            </p>

            {/* Simulated Dynamic SVG Graph representing index growth */}
            <div className="h-48 w-full bg-stone-50 rounded-xl border border-stone-100 p-4 relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 bottom-8 h-[1px] bg-stone-200/50"></div>
              <div className="absolute inset-x-0 bottom-20 h-[1px] bg-stone-200/30"></div>
              <div className="absolute inset-x-0 bottom-32 h-[1px] bg-stone-200/20"></div>

              {/* Dynamic SVG Sparkline */}
              <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* SVG Curve Path connected to points dynamic scaling */}
                <path
                  d={`M 0,${40 - (currentKpi.points[0]/150)*35} 
                     C 20,${40 - (currentKpi.points[1]/150)*35} 
                       40,${40 - (currentKpi.points[2]/150)*35} 
                       60,${40 - (currentKpi.points[3]/150)*35} 
                       80,${40 - (currentKpi.points[4]/150)*35} 
                       100,${40 - (currentKpi.points[5]/150)*35}`}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Shimmer gradient fill under path */}
                <path
                  d={`M 0,${40 - (currentKpi.points[0]/150)*35} 
                     C 20,${40 - (currentKpi.points[1]/150)*35} 
                       40,${40 - (currentKpi.points[2]/150)*35} 
                       60,${40 - (currentKpi.points[3]/150)*35} 
                       80,${40 - (currentKpi.points[4]/150)*35} 
                       100,${40 - (currentKpi.points[5]/150)*35}
                     L 100,40 L 0,40 Z`}
                  fill="url(#chartGradient)"
                />
              </svg>

              {/* Chart labels representation */}
              <div className="flex justify-between text-[8px] md:text-[10px] text-stone-400 mt-auto pt-2 z-20">
                <span>Tuần 1</span>
                <span>Tuần 2</span>
                <span>Tuần 3</span>
                <span>Tuần 4</span>
                <span>Hiện tại</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-[10px] text-stone-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Dữ liệu đo lường trực tiếp</span>
              <span>Cập nhật ngày 01/07/2026</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
