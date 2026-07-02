'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, AlertCircle, CheckCircle, Info, ChevronRight, User, Compass, Star, ArrowRight, Loader2, Heart, MessageCircle, RefreshCw } from 'lucide-react';

interface ProfileProps {
  onDataGenerated: (data: any) => void;
  generatedData: any;
}

export default function ProfileSection({ onDataGenerated, generatedData }: ProfileProps) {
  // AI Form inputs
  const [brandName, setBrandName] = useState('');
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGridItem, setSelectedGridItem] = useState<any>(null);

  // Default Fallback Data if AI is not called yet
  const defaultData = {
    bio: {
      line1: "⚜️ Kiến tạo hình ảnh thương hiệu độc bản",
      line2: "🚀 Đơn vị vận hành Instagram Premium hàng đầu",
      line3: "📞 Nhấp vào liên kết bên dưới để nhận tài liệu miễn phí",
      ctaText: "Nhận Tư Vấn Miễn Phí"
    },
    gridTheme: "Light Editorial Luxury Style (Trắng, xám ngà, nhạt, vàng gold)",
    gridItems: [
      { id: 1, type: "post", title: "Câu Chuyện Thương Hiệu", likes: 142, comments: 12, caption: "⚜️ Hành trình kiến tạo PGS Agency - Chúng tôi không chỉ làm marketing rời rạc, chúng tôi xây dựng hệ thống tăng trưởng số đồng bộ và tối ưu hóa chuyển đổi bền vững. Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi.", tags: ["pgsagency", "branding", "growth"] },
      { id: 2, type: "carousel", title: "3 Sai Lầm Khi Quản Lý Instagram", likes: 235, comments: 24, caption: "❌ Bạn có đang mắc phải 3 sai lầm kinh điển này trên Instagram? 1. Đăng bài không đều, thiếu quy hoạch. 2. Hình ảnh không đồng bộ thương hiệu. 3. Chỉ tập trung đăng bài mà bỏ qua định dạng Reels tiếp cận tự nhiên. Lưu ngay bài viết này để tối ưu lại kênh!", tags: ["pgsagency", "marketingtips", "instagramguide"] },
      { id: 3, type: "reel", title: "Reels: Quy trình thiết kế Grid 9 ô", likes: 1205, comments: 94, caption: "🎬 Cận cảnh quy trình thiết kế Grid layout 9 ô đồng bộ chuẩn PGS Agency. Biến trang cá nhân của bạn thành một phòng trưng bày nghệ thuật thực thụ để thu hút khách hàng từ cái nhìn đầu tiên.", tags: ["pgsagency", "reels", "gridlayout"] },
      { id: 4, type: "post", title: "Giải Pháp Xây Kênh Tự Nhiên", likes: 110, comments: 9, caption: "📈 Bạn muốn tăng lượng tiếp cận tự nhiên mà không cần chi tiền tấn cho quảng cáo? Chìa khóa chính là xây dựng nội dung nhất quán dựa trên giá trị của khách hàng và thuật toán Reels tối ưu.", tags: ["pgsagency", "organic", "instagramgrow"] },
      { id: 5, type: "carousel", title: "Quy Chuẩn Visual Guidelines", likes: 189, comments: 18, caption: "📐 Quy chuẩn Visual Guidelines là bắt buộc nếu muốn thương hiệu chuyên nghiệp. PGS Agency cung cấp bộ quy tắc về màu sắc, typography và template riêng biệt cho từng doanh nghiệp.", tags: ["pgsagency", "visualidentity", "designstyle"] },
      { id: 6, type: "reel", title: "Reels: Cách viết Caption giữ chân", likes: 2140, comments: 115, caption: "✍️ Viết caption trên Instagram không chỉ là mô tả sản phẩm. Hãy bắt đầu bằng Hook giữ chân 3 giây đầu, chia sẻ Insight sâu sắc, và luôn luôn có một Lời kêu gọi hành động (CTA) rõ ràng.", tags: ["pgsagency", "contentmarketing", "instagramtips"] },
      { id: 7, type: "post", title: "Giới Thiệu Đội Ngũ Chuyên Gia", likes: 156, comments: 15, caption: "👥 Gặp gỡ những con người đứng sau hệ thống vận hành Instagram cao cấp của PGS Agency. Những chuyên viên thiết kế, chuyên gia kịch bản Reels và cố vấn SEO luôn sẵn sàng đồng hành cùng sự thịnh vượng của bạn.", tags: ["pgsagency", "ourteam", "experts"] },
      { id: 8, type: "carousel", title: "Checklist 5 Bước Tối Ưu Profile", likes: 204, comments: 22, caption: "📋 Lưu lại ngay checklist 5 bước tối ưu hóa Profile Instagram để tăng tỷ lệ click bio lên gấp 3 lần: 1. Avatar sắc nét. 2. Tên thương hiệu chứa từ khóa. 3. Bio định vị rõ ràng. 4. Highlight được quy hoạch. 5. Link bio thu hút.", tags: ["pgsagency", "checklist", "profileoptimization"] },
      { id: 9, type: "reel", title: "Reels: Tại sao doanh nghiệp cần SEO Instagram?", likes: 1850, comments: 130, caption: "🔍 SEO Instagram là vũ khí bí mật giúp khách hàng tự tìm thấy bạn thông qua thanh tìm kiếm. Tận dụng từ khóa mục tiêu trong Bio, Caption và tối ưu thẻ Alt ảnh ngay hôm nay!", tags: ["pgsagency", "seo", "instagramseo"] }
    ],
    reelsIdeas: [],
    hashtagStrategy: []
  };

  const activeData = generatedData || defaultData;

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !niche) {
      setError("Vui lòng nhập đầy đủ Tên thương hiệu và Ngành hàng/Lĩnh vực kinh doanh.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/instagram-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName,
          niche,
          targetAudience,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Không thể gọi API Gemini.");
      }

      onDataGenerated(data);
      setSelectedGridItem(null); // Reset detail modal
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Đã xảy ra lỗi khi tạo ý tưởng bằng AI. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      
      {/* SECTION 2: Vận hành Instagram là gì */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" /> Khái niệm dịch vụ
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
                Vận hành Instagram <br />toàn diện là gì?
              </h2>
              <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                Vận hành Instagram không đơn thuần là đăng bài khi rảnh rỗi. Đó là quá trình quản trị và phát triển kênh có chiến lược, phối hợp chặt chẽ giữa <strong>Định vị thương hiệu, Thiết kế hình ảnh, Sản xuất video Reels, Viết caption kích hoạt hành động, Quản lý hashtag và Tối ưu hóa chuyển đổi (Bio Link)</strong> nhằm thu hút đúng đối tượng mục tiêu và biến họ thành khách hàng thực tế.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Thiết kế visual đồng bộ", desc: "Quy hoạch lưới grid 3x3 sang trọng, nhất quán về bảng màu, phong cách font chữ và mood chung của thương hiệu.", icon: "⚜️" },
                { title: "Chiến lược Reels viral", desc: "Sản xuất video Reels chuẩn dọc, lên kịch bản thu hút, chèn nhạc xu hướng và căn chỉnh khung giờ vàng.", icon: "🎬" },
                { title: "SEO Instagram & Hashtag", desc: "Nghiên cứu từ khóa ngành để tối ưu thanh tìm kiếm, xây dựng bộ hashtag 3 tầng tăng tiếp cận tự nhiên.", icon: "🔍" },
                { title: "CRO & Tracking dữ liệu", desc: "Tối ưu bio thu hút, dẫn dắt phễu chuyển đổi về Website, Landing Page, Zalo và lập báo cáo KPI minh bạch.", icon: "📈" }
              ].map((card, i) => (
                <div key={i} className="p-6 rounded-xl bg-stone-50 border border-stone-200/60 hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <span className="text-2xl mb-3 block">{card.icon}</span>
                  <h3 className="font-serif font-bold text-stone-900 mb-2 text-base">{card.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Vì sao Instagram quan trọng & SECTION 4: Khi nào nên sử dụng */}
      <section className="py-12 bg-stone-50 border-y border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 3 */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5" /> Giá trị thương hiệu
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              Tại sao doanh nghiệp không thể bỏ qua Instagram?
            </h2>
            <p className="mt-4 text-stone-500 text-sm md:text-base">
              Instagram là vùng đất vàng của hình ảnh, thẩm mỹ và những câu chuyện truyền cảm hứng. Nơi đây sở hữu tệp khách hàng văn minh, có gu thẩm mỹ cao và tỷ lệ sẵn sàng chi trả cực kỳ tốt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Mạnh về Visual & Thẩm mỹ", desc: "Instagram là nơi khách hàng nhìn vào để đánh giá sự uy tín, đẳng cấp và chất lượng hoàn thiện của thương hiệu. Hình ảnh đẹp = Niềm tin lớn.", icon: "✨" },
              { title: "Tiếp cận tự nhiên qua Reels", desc: "Video Reels ngắn của Instagram hiện có tỷ lệ phân phối tự nhiên tốt nhất, giúp tài khoản mới dễ dàng tiếp cận hàng ngàn người xem không tốn phí.", icon: "📲" },
              { title: "Nuôi dưỡng & Thúc đẩy chuyển đổi", desc: "Hệ thống Story Highlight giúp lưu trữ feedback, quy trình sản xuất, thông tin mua hàng gọn gàng, tăng gấp đôi niềm tin và hiệu quả CRO.", icon: "💸" }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-stone-200/60 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">{benefit.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 4: Chẩn đoán dấu hiệu cần vận hành */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200/60 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" /> Dấu hiệu chẩn đoán
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 font-medium">
                  Doanh nghiệp của bạn có đang lãng phí Instagram?
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Nếu thương hiệu của bạn thuộc các lĩnh vực như <strong>Thời trang, Mỹ phẩm, F&B, Spa, Thẩm mỹ viện, Du lịch, Kiến trúc - Nội thất, Lifestyle hoặc Thương hiệu cá nhân</strong>, và bạn đang gặp những dấu hiệu bên cạnh, đây chính là lúc bạn cần PGS Agency hỗ trợ!
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Hình ảnh đăng tải thiếu đồng bộ, mất cân đối bố cục",
                  "Đăng bài không đều đặn, lúc có bài lúc không",
                  "Lượt tương tác và tiếp cận tự nhiên dậm chân tại chỗ",
                  "Video Reels không có kịch bản, không dùng nhạc xu hướng",
                  "Thông tin Bio sơ sài, thiếu Bio Link chuyển đổi",
                  "Chưa từng lập báo cáo hiệu suất KPI chi tiết"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">!</span>
                    <span className="text-stone-700 text-xs md:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: Tối ưu Profile & AI Brand Assistant */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Tối ưu chuyển đổi AI
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              Thiết Kế Ý Tưởng Thương Hiệu Của Riêng Bạn
            </h2>
            <p className="mt-4 text-stone-500 text-sm md:text-base">
              Hãy nhập thông tin thương hiệu của bạn ở form bên trái, trợ lý AI thông minh của PGS Agency sẽ thiết kế demo ngay Profile, Bio CTA và cấu trúc Grid Instagram chuẩn Premium tương tác được ở bên phải!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: AI Brand Form */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-stone-50 border border-stone-200/60 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-stone-900 text-xl border-b border-stone-200 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" /> Trợ lý thiết kế PGS AI
              </h3>

              <form onSubmit={handleGenerateAI} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Tên thương hiệu *</label>
                  <input
                    type="text"
                    required
                    placeholder="Vd: Paris Chic, Spa Sen Vàng, Nội Thất Zen..."
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Lĩnh vực / Ngành hàng kinh doanh *</label>
                  <input
                    type="text"
                    required
                    placeholder="Vd: Mỹ phẩm organic, Thời trang thiết kế, Nha khoa thẩm mỹ..."
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Khách hàng mục tiêu (Tùy chọn)</label>
                  <input
                    type="text"
                    placeholder="Vd: Nữ văn phòng 25-35 tuổi, thích lifestyle tối giản..."
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 text-sm transition"
                  />
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm transition duration-300 flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:text-stone-500 shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Đang thiết kế ý tưởng...
                    </>
                  ) : (
                    <>
                      Phân tích & Thiết kế bằng AI <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 space-y-1">
                <p>💡 <em>Mẹo:</em> Sau khi AI thiết kế xong, hãy nhấp vào các ô lưới 3x3 ở mockup bên cạnh để mở xem chi tiết **Mẫu Caption có Hook và Bộ Hashtag tối ưu** được sáng tạo riêng cho thương hiệu của bạn!</p>
              </div>
            </div>

            {/* Right Column: Premium Interactive IG Mockup */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-4 rounded-3xl bg-stone-50 border border-stone-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 text-[9px] font-bold uppercase tracking-wider border border-amber-300/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span> Live Preview
                </div>

                <div className="max-w-[350px] mx-auto bg-white rounded-[32px] border-4 border-stone-900 p-2.5 shadow-lg flex flex-col min-h-[460px]">
                  
                  {/* IG Top Nav */}
                  <div className="flex items-center justify-between px-2 pt-4 pb-2 border-b border-stone-100">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" /> {brandName ? brandName.toLowerCase().replace(/\s+/g, '_') : 'your_brand'}
                    </span>
                    <span className="text-[10px] text-stone-400">● ● ●</span>
                  </div>

                  {/* Profile Info */}
                  <div className="px-2.5 py-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-[2px] shrink-0">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white font-serif font-bold text-amber-600 text-sm">
                        {brandName ? brandName.slice(0, 3).toUpperCase() : "IG"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-around text-center">
                        <div>
                          <p className="font-bold text-stone-900 text-xs">9</p>
                          <p className="text-[8px] text-stone-400">Bài viết</p>
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-xs">2.8K</p>
                          <p className="text-[8px] text-stone-400">Follower</p>
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-xs">150</p>
                          <p className="text-[8px] text-stone-400">Đang theo dõi</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BIO Dynamic content from AI */}
                  <div className="px-2.5 pb-2 text-[9px] space-y-0.5 text-stone-800 border-b border-stone-100">
                    <p className="font-bold">{brandName || "Tên Thương Hiệu Của Bạn"}</p>
                    <p className="text-stone-600 font-sans">{activeData.bio.line1}</p>
                    <p className="text-stone-600 font-sans">{activeData.bio.line2}</p>
                    <p className="text-stone-600 font-sans">{activeData.bio.line3}</p>
                    <div className="mt-2 inline-block px-3 py-1 rounded bg-stone-100 border border-amber-500/20 text-[8px] text-amber-800 font-bold tracking-wider uppercase">
                      🔗 {activeData.bio.ctaText}
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="px-2.5 py-2 flex gap-2 border-b border-stone-50 overflow-x-auto scrollbar-none">
                    {['Bộ sưu tập', 'Đánh giá', 'Ưu đãi', 'Về AI'].map((hl, i) => (
                      <div key={i} className="flex flex-col items-center shrink-0">
                        <div className="w-8 h-8 rounded-full border border-amber-300 p-[1px] mb-0.5">
                          <div className="w-full h-full rounded-full bg-stone-50 border border-white flex items-center justify-center font-serif text-[7px] text-stone-500 uppercase">
                            {hl[0]}
                          </div>
                        </div>
                        <span className="text-[7px] text-stone-400">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Feed Grid 3x3 Dynamic */}
                  <div className="flex-1 bg-stone-50/50 p-1 grid grid-cols-3 gap-1 mt-2">
                    {activeData.gridItems.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedGridItem(item)}
                        className={`aspect-square rounded border p-1 relative flex flex-col justify-between overflow-hidden group cursor-pointer transition duration-300 hover:scale-[1.04] hover:shadow-sm ${
                          selectedGridItem?.id === item.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-stone-200 bg-white hover:border-amber-400/60'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[6px] font-mono text-stone-400">
                          <span className="font-bold uppercase text-amber-800 shrink-0">{item.type}</span>
                          {item.type === 'reel' && <span className="text-amber-500 font-bold">🎬</span>}
                        </div>
                        
                        <div className="my-auto text-center px-0.5">
                          <p className="text-[7px] font-serif font-semibold text-stone-900 leading-tight line-clamp-2">
                            {item.title}
                          </p>
                        </div>

                        <div className="flex justify-between items-center text-[5.5px] text-stone-400 pt-0.5 border-t border-stone-100">
                          <span className="flex items-center gap-0.5">❤️ {item.likes}</span>
                          <span className="flex items-center gap-0.5">💬 {item.comments}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Grid Item Expanded Detail View */}
              <AnimatePresence mode="wait">
                {selectedGridItem && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="p-5 rounded-2xl bg-amber-50/60 border border-amber-300/40 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-amber-200/50 pb-2">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100">
                        Chi tiết Bài Đăng {selectedGridItem.id} ({selectedGridItem.type})
                      </span>
                      <button
                        onClick={() => setSelectedGridItem(null)}
                        className="text-stone-400 hover:text-stone-600 text-xs font-bold"
                      >
                        Đóng ×
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                      {selectedGridItem.title}
                    </h4>

                    <div className="space-y-2">
                      <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Mẫu Caption Đề Xuất:</p>
                      <div className="bg-white p-3 rounded-xl border border-stone-200 text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-sans max-h-40 overflow-y-auto">
                        {selectedGridItem.caption}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedGridItem.tags.map((tag: string, index: number) => (
                        <span key={index} className="text-[10px] text-amber-800 bg-amber-100/60 px-2.5 py-1 rounded-full font-medium font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
