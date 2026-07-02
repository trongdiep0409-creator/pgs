'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Search, 
  ChevronDown, 
  Check, 
  Download, 
  Trash2, 
  ArrowRight, 
  HelpCircle, 
  Send, 
  Sparkles, 
  MessageSquare, 
  X, 
  CheckCircle, 
  FileText, 
  RefreshCw, 
  BookOpen, 
  Database, 
  Users, 
  Server, 
  Globe, 
  Info, 
  ChevronRight,
  User,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// DATA STRUCTURE FOR SEARCH & POLICY SECTIONS
// ==========================================

interface PolicySection {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  content: React.ReactNode;
  tags: string[];
}

export default function PrivacyPolicyPage() {
  // Page states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'policy' | 'dashboard' | 'handover'>('policy');
  const [expandedSection, setExpandedSection] = useState<string | null>('sec-1');
  
  // Cookie states (local persistence)
  const [cookies, setCookies] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
    personalization: false,
  });
  const [cookieSaved, setCookieSaved] = useState(false);

  // Data request state
  const [requestEmail, setRequestEmail] = useState('');
  const [requestName, setRequestName] = useState('');
  const [requestType, setRequestType] = useState<'export' | 'delete'>('export');
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestStep, setRequestStep] = useState<number>(0); // 0: input, 1: processing, 2: completed
  const [simulatedData, setSimulatedData] = useState<any>(null);
  const [requestTicket, setRequestTicket] = useState('');

  // AI Assistant states
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; parts: { text: string }[] }>>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load cookies on mount
  useEffect(() => {
    const savedCookies = localStorage.getItem('pgs_privacy_consent');
    if (savedCookies) {
      try {
        const parsed = JSON.parse(savedCookies);
        setTimeout(() => {
          setCookies(parsed);
        }, 0);
      } catch (e) {
        console.error("Error reading cookies consent:", e);
      }
    }
  }, []);

  // Save cookies to simulated local storage
  const handleSaveCookies = () => {
    localStorage.setItem('pgs_privacy_consent', JSON.stringify(cookies));
    setCookieSaved(true);
    setTimeout(() => setCookieSaved(false), 3000);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, chatLoading]);

  // Handle AI Chat submissions
  const handleSendChat = async (textToSend?: string) => {
    const query = textToSend || chatMessage;
    if (!query.trim() || chatLoading) return;

    // Add user message to history
    const userMessage = { role: 'user' as const, parts: [{ text: query }] };
    setChatHistory(prev => [...prev, userMessage]);
    if (!textToSend) setChatMessage('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/gemini/privacy-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: chatHistory
        }),
      });

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error("Error calling privacy helper API:", error);
      setChatHistory(prev => [...prev, { 
        role: 'model', 
        parts: [{ text: "Rất tiếc, đã xảy ra lỗi kết nối với trung tâm trợ lý AI. Tuy nhiên, bạn hoàn toàn có thể yên tâm rằng PGS Agency lưu trữ bảo mật dữ liệu của bạn trên máy chủ mã hóa TLS/AES-256 an toàn. Vui lòng liên hệ hotline 0968.234.567 để gặp chuyên viên pháp lý của chúng tôi." }] 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Trigger simulated data export / deletion
  const handleDataRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail || !requestName) return;

    setIsRequesting(true);
    setRequestStep(1);

    // Simulate system steps
    setTimeout(() => {
      const ticket = `PGS-${requestType === 'export' ? 'EXP' : 'DEL'}-${Math.floor(100000 + Math.random() * 90000)}`;
      setRequestTicket(ticket);
      
      if (requestType === 'export') {
        setSimulatedData({
          user_profile: {
            full_name: requestName,
            email: requestEmail,
            source: "PGS Privacy Portal",
            simulated_ip: "113.161.45.102 (Hồ Chí Minh, Việt Nam)",
            consent_granted: "Nghị định 13/2023/NĐ-CP"
          },
          tracking_metadata: {
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            cookie_preferences_applied: cookies,
            session_referrer: document.referrer || "Trực tiếp (Direct Access)"
          },
          consulting_history: [
            {
              status: "Đang kiểm nghiệm",
              campaign_source: "Organic Google Search",
              intended_service: "Marketing tổng thể đa nền tảng (SEO & Ads)"
            }
          ]
        });
      }
      setRequestStep(2);
      setIsRequesting(false);
    }, 2500);
  };

  // Suggestion chips for Chat
  const suggestionChips = [
    "PGS có bán SĐT của tôi không?",
    "Làm sao để xóa data của tôi?",
    "Quyền lợi theo Nghị định 13?",
    "Thông tin PGS thu thập là gì?"
  ];

  // Detailed 8 Privacy Policy sections Vietnamese (SEO & EEAT rich)
  const policySections: PolicySection[] = [
    {
      id: 'sec-1',
      number: '01',
      title: 'Cam kết và Triết lý bảo vệ dữ liệu',
      shortDesc: 'Sứ mệnh và triết lý cốt lõi của PGS Agency trong việc thượng tôn pháp luật bảo mật thông tin.',
      tags: ['cam kết', 'nghị định 13', 'triết lý', 'định vị'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            Tại <strong>PGS Agency</strong>, chúng tôi thấu hiểu rằng thông tin cá nhân và dữ liệu kinh doanh của quý khách hàng là những tài sản vô giá. Với triết lý cốt lõi <em>“Sự thịnh vượng của khách hàng gắn liền với thành công của chúng tôi”</em>, PGS Agency cam kết bảo vệ tuyệt đối mọi thông tin mà quý khách hàng đã tin tưởng trao gửi.
          </p>
          <p>
            Chúng tôi luôn thượng tôn pháp luật và bảo đảm tính minh bạch cao nhất. Chính sách bảo mật thông tin này được xây dựng và cập nhật nghiêm ngặt theo các quy định hiện hành của pháp luật Việt Nam, đặc biệt là <strong>Nghị định 13/2023/NĐ-CP</strong> về Bảo vệ dữ liệu cá nhân (được xem là tiêu chuẩn vàng tương đương luật GDPR tại Việt Nam).
          </p>
          <div className="p-4 rounded-xl bg-gold-50/50 border border-gold-200/50 my-3">
            <h4 className="font-display font-semibold text-charcoal mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-600" />
              Tuyên ngôn ba nguyên tắc vàng của PGS:
            </h4>
            <ul className="legal-list space-y-2 text-sm">
              <li><strong>Minh bạch tối đa:</strong> Bạn luôn biết rõ chúng tôi thu thập những gì, sử dụng cho mục đích gì và có quyền kiểm soát toàn bộ.</li>
              <li><strong>Bảo mật tối tân:</strong> Sử dụng hệ thống quản trị dữ liệu đám mây đa lớp với công nghệ mã hóa TLS và AES-256.</li>
              <li><strong>Mục đích duy nhất:</strong> Chỉ dùng thông tin để tối ưu hóa hiệu quả, thiết kế chiến lược Marketing tổng thể giúp doanh nghiệp tăng trưởng, không chia sẻ thương mại trái phép.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-2',
      number: '02',
      title: 'Các loại thông tin PGS thu thập trực tiếp',
      shortDesc: 'Chi tiết danh mục dữ liệu số mà PGS thu thập khi bạn sử dụng dịch vụ hoặc để lại liên hệ.',
      tags: ['thu thập', 'họ tên', 'số điện thoại', 'doanh nghiệp', 'url'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            PGS Agency chỉ thực hiện thu thập thông tin khi khách hàng chủ động tương tác với chúng tôi qua các biểu mẫu (form) trên website, liên hệ qua hotline, email hoặc qua các chiến dịch truyền thông hợp pháp khác. Các loại thông tin chúng tôi thu thập bao gồm:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-platinum bg-white shadow-xs">
              <span className="text-xs font-mono font-bold text-gold-600">DỮ LIỆU CÁ NHÂN LIÊN HỆ</span>
              <ul className="legal-list mt-2 space-y-1 text-sm">
                <li><strong>Họ và tên:</strong> Định danh cá nhân để thuận tiện xưng hô chuyên nghiệp.</li>
                <li><strong>Số điện thoại:</strong> Kênh liên lạc chính để tư vấn trực tiếp nhanh chóng.</li>
                <li><strong>Địa chỉ Email:</strong> Gửi tài liệu phân tích sơ bộ, bảng báo giá và hợp đồng.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-platinum bg-white shadow-xs">
              <span className="text-xs font-mono font-bold text-gold-600">DỮ LIỆU DOANH NGHIỆP & NHU CẦU</span>
              <ul className="legal-list mt-2 space-y-1 text-sm">
                <li><strong>Tên doanh nghiệp:</strong> Nghiên cứu quy mô và lĩnh vực hoạt động trước khi tư vấn.</li>
                <li><strong>Website/Fanpage URL:</strong> Công cụ để đội ngũ chuyên gia của PGS quét audit kỹ thuật và lập chiến lược SEO/Ads.</li>
                <li><strong>Nhu cầu tư vấn:</strong> Để phân bổ đúng chuyên viên cấp cao tương ứng hỗ trợ.</li>
              </ul>
            </div>
          </div>
          <p className="text-sm italic">
            * PGS Agency khẳng định không thu thập bất kỳ thông tin nhạy cảm nào liên quan đến tài chính thẻ tín dụng, tôn giáo, chính trị hoặc hồ sơ sức khỏe cá nhân của người dùng.
          </p>
        </div>
      )
    },
    {
      id: 'sec-3',
      number: '03',
      title: 'Mục đích sử dụng thông tin hợp pháp',
      shortDesc: 'Cam kết minh bạch về cách thức dữ liệu của bạn phục vụ cho sự tăng trưởng của doanh nghiệp.',
      tags: ['mục đích', 'tư vấn', 'báo giá', 'email', 'marketing'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            Mọi thông tin được quý khách hàng cung cấp sẽ được PGS Agency sử dụng hoàn toàn cho các mục đích hợp pháp, thiết thực nhằm nâng cao trải nghiệm dịch vụ và xây dựng hệ thống tăng trưởng số bền vững:
          </p>
          <div className="border border-gold-100 rounded-xl overflow-hidden bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gold-50/50 text-charcoal font-display font-semibold border-b border-gold-100">
                <tr>
                  <th className="p-3">Danh Mục Sử Dụng</th>
                  <th className="p-3">Chi Tiết Hoạt Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-platinum text-slate-gray">
                <tr>
                  <td className="p-3 font-semibold text-charcoal">Tư vấn và Liên hệ</td>
                  <td className="p-3">Đội ngũ chuyên viên liên hệ giải đáp thắc mắc, thiết kế bản kế hoạch đề xuất sơ bộ trong vòng 2 - 24 tiếng sau khi đăng ký.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-charcoal">Gửi báo giá và Đề xuất</td>
                  <td className="p-3">Cung cấp báo giá dịch vụ Website, SEO, Google/Facebook/TikTok Ads và lộ trình tăng trưởng cụ thể.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-charcoal">Quản trị và Cải thiện</td>
                  <td className="p-3">Đo lường nguồn chiến dịch để phân tích hiệu quả kênh marketing, từ đó tối ưu hóa chi phí thu hút khách hàng (CAC) cho PGS.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-charcoal">Chăm sóc khách hàng</td>
                  <td className="p-3">Gửi tài liệu chuyên sâu, cập nhật xu hướng thị trường số và cải tiến kỹ thuật theo chu kỳ nếu được bạn đồng ý.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'sec-4',
      number: '04',
      title: 'Quy trình lưu trữ và bảo vệ dữ liệu',
      shortDesc: 'Khám phá các hàng rào bảo mật kỹ thuật số giúp ngăn chặn các nguy cơ rò rỉ thông tin.',
      tags: ['lưu trữ', 'bảo vệ', 'mã hóa', 'đám mây', 'truy cập'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            Bảo vệ thông tin khách hàng là tôn chỉ hành động tại PGS Agency. Chúng tôi đã thiết lập các hệ thống quản trị dữ liệu nghiêm ngặt kết hợp giữa công nghệ cao và quy trình phân quyền vật lý:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-xl bg-gold-50/30 border border-gold-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-3 font-mono font-bold">1</div>
              <h5 className="font-display font-semibold text-charcoal mb-1 text-sm">Mã hóa đa lớp</h5>
              <p className="text-xs text-slate-gray">Mọi dữ liệu truyền đi đều được mã hóa theo chứng chỉ bảo mật TLS và lưu trữ dưới công nghệ bảo mật AES-256 cao cấp.</p>
            </div>
            <div className="p-4 rounded-xl bg-gold-50/30 border border-gold-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-3 font-mono font-bold">2</div>
              <h5 className="font-display font-semibold text-charcoal mb-1 text-sm">Phân quyền chặt chẽ</h5>
              <p className="text-xs text-slate-gray">Chỉ những Chuyên viên Tư vấn và Giám đốc Chiến dịch được giao trách nhiệm trực tiếp mới có quyền truy cập dữ liệu liên hệ của bạn.</p>
            </div>
            <div className="p-4 rounded-xl bg-gold-50/30 border border-gold-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-3 font-mono font-bold">3</div>
              <h5 className="font-display font-semibold text-charcoal mb-1 text-sm">Zero Physical Copy</h5>
              <p className="text-xs text-slate-gray">Chúng tôi cam kết không in ấn dữ liệu cá nhân ra giấy hay sao chép thủ công, tránh tối đa các lỗ hổng vật lý thất thoát dữ liệu.</p>
            </div>
          </div>
          <p>
            Thời gian lưu trữ dữ liệu là vô hạn kể từ thời điểm tiếp nhận, trừ khi khách hàng thực hiện quyền yêu cầu thu hồi sự đồng ý hoặc xóa dữ liệu thông qua hệ thống quản lý trực tuyến của chúng tôi.
          </p>
        </div>
      )
    },
    {
      id: 'sec-5',
      number: '05',
      title: 'Chia sẻ thông tin với bên thứ ba',
      shortDesc: 'PGS Agency minh bạch hóa ranh giới và cam kết không mua bán dữ liệu thương mại.',
      tags: ['chia sẻ', 'bên thứ ba', 'pháp luật', 'quảng cáo', 'đối tác'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            PGS Agency <strong>cam kết tuyệt đối không bán, cho thuê, trao đổi hoặc tiết lộ thông tin cá nhân của khách hàng</strong> cho bất kỳ bên thứ ba nào vì mục đích thương mại phi pháp.
          </p>
          <p>
            Dữ liệu của quý khách chỉ có thể được chia sẻ trong phạm vi giới hạn cực kỳ nghiêm ngặt dưới đây:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-platinum bg-white">
              <Server className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <h6 className="font-display font-semibold text-sm text-charcoal">Các nhà cung cấp hạ tầng đám mây tin cậy</h6>
                <p className="text-xs text-slate-gray mt-0.5">Lưu trữ thông tin trên các nền tảng server cao cấp hàng đầu thế giới (Google Cloud Platform, Amazon Web Services) có chứng chỉ ISO 27001 để đảm bảo tính an toàn kỹ thuật.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-platinum bg-white">
              <Globe className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <h6 className="font-display font-semibold text-sm text-charcoal">Các công cụ phân tích và đo lường marketing chuyên sâu</h6>
                <p className="text-xs text-slate-gray mt-0.5">Google Analytics và hệ thống Pixel của Facebook/TikTok để ghi nhận hành vi tổng thể dưới dạng dữ liệu ẩn danh (Anonymous Data), hỗ trợ tối ưu hóa quảng cáo đa kênh.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-platinum bg-white">
              <Lock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <h6 className="font-display font-semibold text-sm text-charcoal">Yêu cầu pháp lý của cơ quan quản lý nhà nước</h6>
                <p className="text-xs text-slate-gray mt-0.5">Chúng tôi bắt buộc phải chia sẻ dữ liệu khi nhận được văn bản yêu cầu chính thức từ các cơ quan Tư pháp hoặc cơ quan Công an có thẩm quyền theo quy định của pháp luật Việt Nam.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-6',
      number: '06',
      title: 'Danh sách các quyền năng pháp lý của khách hàng',
      shortDesc: 'Chủ động quản lý dữ liệu cá nhân theo đúng tinh thần và điều khoản Nghị định 13/2023/NĐ-CP.',
      tags: ['quyền', 'chỉnh sửa', 'xuất dữ liệu', 'xóa thông tin', 'quyền lợi'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            PGS Agency luôn tôn trọng triệt để các quyền hợp pháp của bạn đối với dữ liệu cá nhân cá nhân của mình. Cụ thể, quý khách hàng sở hữu 6 quyền cốt lõi sau:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            {[
              { title: "Quyền được biết & đồng ý", desc: "Bạn có quyền được thông báo về loại thông tin thu thập và cách thức PGS xử lý nó." },
              { title: "Quyền truy cập & chỉnh sửa", desc: "Yêu cầu kiểm tra dữ liệu của mình đang lưu trữ và cập nhật nếu có sai sót." },
              { title: "Quyền xóa bỏ dữ liệu (Right to be Forgotten)", desc: "Bạn có quyền yêu cầu PGS xóa sạch hoàn toàn mọi thông tin liên hệ trong hệ thống lưu trữ." },
              { title: "Quyền hạn chế xử lý dữ liệu", desc: "Yêu cầu chúng tôi tạm ngưng xử lý hoặc chỉ sử dụng cho một vài mục đích cụ thể." },
              { title: "Quyền phản đối quảng cáo", desc: "Từ chối nhận các email cập nhật kiến thức, bản tin xu hướng của PGS bất cứ lúc nào." },
              { title: "Quyền khiếu nại & khởi kiện", desc: "Các quyền theo quy định của Luật Bảo vệ quyền lợi người tiêu dùng và Nghị định 13." }
            ].map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-gold-200/20 bg-gold-50/10 hover:bg-gold-50/30 transition-colors">
                <span className="text-xs font-mono font-bold text-gold-600 block mb-1">0{i+1}. {r.title}</span>
                <p className="text-xs text-slate-gray">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm">
            Để thực hiện các quyền trên, khách hàng chỉ cần truy cập vào <strong>Trung tâm quản lý quyền đồng ý</strong> ở thẻ bên cạnh hoặc gửi yêu cầu nhanh qua email <a href="mailto:info@pgs.agency" className="text-gold-600 underline font-semibold">info@pgs.agency</a>, PGS cam kết phản hồi và xử lý hoàn tất trong vòng tối đa 24 giờ.
          </p>
        </div>
      )
    },
    {
      id: 'sec-7',
      number: '07',
      title: 'Công nghệ Cookie và Hệ thống tracking đa nền tảng',
      shortDesc: 'Tìm hiểu cơ chế thu thập dữ liệu tự động nhằm tối ưu hóa phễu chuyển đổi đa nền tảng.',
      tags: ['cookie', 'tracking', 'pixel', 'google analytics', 'facebook pixel', 'tiktok pixel'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            Để mang đến trải nghiệm trực tuyến mượt mà và đo lường chính xác hiệu quả hoạt động marketing, PGS Agency sử dụng công nghệ “Cookie”. Cookie là những tệp văn bản nhỏ được lưu trữ trên trình duyệt hoặc ổ cứng máy tính của bạn khi truy cập website.
          </p>
          <p>
            Các công cụ thu thập và đo lường tự động của PGS bao gồm:
          </p>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-platinum bg-white">
              <div className="flex justify-between items-center">
                <h6 className="font-display font-semibold text-sm text-charcoal">Google Analytics (GA4) & Google Tag Manager</h6>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${cookies.analytics ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {cookies.analytics ? 'ĐANG CHẠY' : 'VÔ HIỆU HÓA'}
                </span>
              </div>
              <p className="text-xs text-slate-gray mt-1">Giúp PGS hiểu rõ cách thức khách hàng tương tác với trang web, thời gian dừng, số trang xem, nhằm cải tiến cấu trúc UX/UI của web.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-platinum bg-white">
              <div className="flex justify-between items-center">
                <h6 className="font-display font-semibold text-sm text-charcoal">Facebook Pixel & TikTok Pixel Tracker</h6>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${cookies.marketing ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {cookies.marketing ? 'ĐANG CHẠY' : 'VÔ HIỆU HÓA'}
                </span>
              </div>
              <p className="text-xs text-slate-gray mt-1">Đo lường nguồn chiến dịch quảng cáo và đề xuất các bài đăng, cẩm nang marketing phù hợp cho bạn khi bạn lướt mạng xã hội.</p>
            </div>
          </div>
          <p className="text-sm">
            Quý khách hoàn toàn có quyền cấu hình lại trình duyệt của mình để từ chối tất cả các cookie hoặc thông báo khi cookie được gửi đi. Việc tắt cookie marketing không ảnh hưởng tới việc truy xuất nội dung, nhưng sẽ làm hạn chế mức độ phù hợp của các tài liệu tư vấn mà PGS cung cấp cho bạn sau này.
          </p>
        </div>
      )
    },
    {
      id: 'sec-8',
      number: '08',
      title: 'Ngày hiệu lực, cập nhật và Thông tin liên hệ chính thức',
      shortDesc: 'Thông tin pháp nhân đại diện chịu trách nhiệm pháp lý cao nhất về an toàn dữ liệu khách hàng.',
      tags: ['ngày hiệu lực', 'liên hệ', 'hotline', 'địa chỉ', 'email'],
      content: (
        <div className="space-y-4 text-slate-gray leading-relaxed">
          <p>
            Chính sách bảo mật này có hiệu lực chính thức từ ngày <strong>01 tháng 07 năm 2026</strong>. PGS Agency bảo lưu quyền cập nhật hoặc thay đổi chính sách này bất kỳ lúc nào để đáp ứng các sửa đổi pháp luật hoặc cải tiến cơ sở hạ tầng. Mọi thay đổi sẽ được công khai minh bạch ngay trên trang này và ghi rõ ngày cập nhật gần nhất.
          </p>
          <div className="p-4 rounded-xl border border-gold-300 bg-white/50 gold-glow">
            <h5 className="font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-600" />
              ĐƠN VỊ CHỊU TRÁCH NHIỆM PHÁP LÝ & AN TOÀN DỮ LIỆU
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <p><strong>Doanh nghiệp:</strong> Công ty Cổ phần Công nghệ & Truyền thông PGS Agency Việt Nam</p>
                <p><strong>Hotline khẩn cấp:</strong> 0968.234.567 (Phím 3 - Ban Pháp chế & Bảo mật)</p>
                <p><strong>Email đầu mối:</strong> <a href="mailto:info@pgs.agency" className="text-gold-600 underline">info@pgs.agency</a></p>
              </div>
              <div className="space-y-2">
                <p><strong>Trụ sở chính:</strong> Tầng 8, Tòa nhà PGS Tower, 128 Nguyễn Cơ Thạch, KĐT Sala, Quận 2, TP. Hồ Chí Minh</p>
                <p><strong>Văn phòng HN:</strong> Tầng 5, Capital Building, 41 Hai Bà Trưng, Quận Hoàn Kiếm, TP. Hà Nội</p>
                <p><strong>Bộ phận xử lý dữ liệu:</strong> Ban quản trị rủi ro & Bảo mật dữ liệu cá nhân PGS</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Search filter
  const filteredSections = policySections.filter(sec => {
    const searchLower = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(searchLower) ||
      sec.shortDesc.toLowerCase().includes(searchLower) ||
      sec.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-gold-200 selection:text-charcoal relative overflow-hidden flex flex-col justify-between">
      
      {/* BACKGROUND DECORATIONS - LIGHT PREMIUM COHESIVE */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-linear-to-b from-gold-50/70 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gold-100/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gold-200/10 blur-3xl pointer-events-none -z-10" />

      {/* HEADER SECTION */}
      

      {/* MOBILE STICKY NAV RAIL */}
      <div className="md:hidden sticky top-20 bg-white border-b border-platinum/60 z-35 flex justify-around py-2.5 px-2">
        {[
          { id: 'policy', label: 'Chính sách' },
          { id: 'dashboard', label: 'Quyền riêng tư' },
          { id: 'handover', label: 'Bàn giao' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-charcoal text-white' 
                : 'text-slate-gray bg-[#FAF9F6] border border-platinum'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* HERO SECTION FOR THE ENTIRE PRIVACY PAGE */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-300 shadow-xs">
                <Shield className="w-4 h-4 text-gold-600 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-700">TIÊU CHUẨN NGHỊ ĐỊNH 13/2023/NĐ-CP</span>
              </div>
              
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-tight">
                Chính sách bảo mật <br className="hidden sm:inline" />
                <span className="relative">
                  thông tin cá nhân
                  <span className="absolute left-0 bottom-2 w-full h-1 bg-gold-300 -z-10 opacity-60" />
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-gray leading-relaxed max-w-xl">
                Tại PGS Agency, chúng tôi xây dựng nền tảng tăng trưởng số bền vững đi kèm tính minh bạch tuyệt đối về pháp lý. Khám phá cách chúng tôi mã hóa, quản trị và tôn trọng 100% quyền dữ liệu cá nhân của quý đối tác.
              </p>

              {/* Legal Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-platinum bg-white shadow-2xs">
                  <Lock className="w-4 h-4 text-gold-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-gray">MÃ HÓA DỮ LIỆU</p>
                    <p className="text-xs font-bold text-charcoal">TLS / AES-256</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-platinum bg-white shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-gray">PHÁP LÝ VIỆT NAM</p>
                    <p className="text-xs font-bold text-charcoal">Đạt chuẩn NĐ 13</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-platinum bg-white shadow-2xs col-span-2 sm:col-span-1">
                  <RefreshCw className="w-4 h-4 text-gold-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-gray">CẬP NHẬT GẦN NHẤT</p>
                    <p className="text-xs font-bold text-charcoal">01/07/2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero 3D Legal Shield Animation Model */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                
                {/* Simulated 3D golden orbits & background rings */}
                <div className="absolute inset-0 rounded-full border border-gold-300/30 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-gold-400/20 animate-[spin_12s_linear_infinite_reverse]" />
                <div className="absolute inset-10 rounded-full bg-gold-50/40 blur-xl animate-pulse-gold" />

                {/* Simulated 3D Glassmorphic Floating Cards */}
                <div className="absolute top-4 left-0 glass-card p-3 rounded-lg border border-gold-200/50 shadow-md rotate-[-6deg] animate-[bounce_4s_infinite] flex items-center gap-2 z-10">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-charcoal">100% GDPR & NĐ 13</span>
                </div>

                <div className="absolute bottom-6 right-0 glass-card p-3 rounded-lg border border-gold-200/50 shadow-md rotate-[8deg] animate-[bounce_5s_infinite_reverse] flex items-center gap-2 z-10">
                  <Lock className="w-3.5 h-3.5 text-gold-600" />
                  <span className="text-[10px] font-mono font-bold text-charcoal">Encrypted TLS 1.3</span>
                </div>

                {/* Center legal shield: Styled using CSS border-radius and gold metallic gradients */}
                <div className="relative w-44 h-52 bg-gradient-to-br from-white to-gold-50 border-4 border-[#C5A880] rounded-t-full rounded-b-3xl shadow-xl flex flex-col items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer group gold-glow">
                  {/* Gold linear shine animation */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000" />
                  
                  {/* Inside Shield Graphics */}
                  <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center border border-gold-300 mb-3 relative">
                    <Shield className="w-8 h-8 text-gold-600 animate-pulse" />
                  </div>
                  <span className="font-display font-extrabold text-xs text-charcoal tracking-widest uppercase">PGS LEGAL</span>
                  <span className="text-[8px] font-mono text-gold-700 mt-1 uppercase tracking-widest">SECURE VAULT</span>

                  {/* Tiny keyhole visual */}
                  <div className="w-3 h-5 bg-charcoal rounded-full mt-3 flex items-center justify-center relative">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-1" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            TAB CONTENT SWITCHER
            ========================================== */}
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: FULL POLICY VIEW (DEFAULT) */}
          {activeTab === 'policy' && (
            <motion.div
              key="policy-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* SEARCH & FILTER CONTROLS */}
              <div className="p-6 rounded-2xl bg-white border border-platinum shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-display font-bold text-charcoal text-base">Tra cứu nhanh chính sách bảo mật</h3>
                  <p className="text-xs text-slate-gray">Nhập từ khóa liên quan như &quot;số điện thoại&quot;, &quot;xóa dữ liệu&quot;, &quot;cookie&quot; để lọc nội dung chính xác.</p>
                </div>
                
                {/* Styled Premium Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm chính sách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FAF9F6] border border-platinum text-xs focus:outline-hidden focus:border-gold-400 focus:bg-white transition-all text-charcoal"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-gray hover:text-charcoal text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH STATS */}
              {searchQuery && (
                <div className="flex items-center gap-2 text-xs text-slate-gray">
                  <span>Tìm thấy <strong>{filteredSections.length}</strong> phần nội dung phù hợp cho từ khóa <strong>&quot;{searchQuery}&quot;</strong></span>
                  <button onClick={() => setSearchQuery('')} className="text-gold-600 hover:underline">Hủy lọc</button>
                </div>
              )}

              {/* 8 SECTION LEGAL LIST */}
              <div className="space-y-4">
                {filteredSections.map((sec, index) => {
                  const isExpanded = expandedSection === sec.id;
                  return (
                    <div 
                      key={sec.id} 
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isExpanded 
                          ? 'border-gold-300 bg-white shadow-sm' 
                          : 'border-platinum bg-white hover:border-gold-200 shadow-2xs'
                      }`}
                    >
                      {/* Section trigger header */}
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                        className="w-full p-5 flex items-start gap-4 text-left transition-colors hover:bg-gold-50/10 cursor-pointer"
                      >
                        {/* Number design badge */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                          isExpanded ? 'bg-charcoal text-white' : 'bg-gold-50 text-gold-600 border border-gold-200/50'
                        }`}>
                          {sec.number}
                        </div>

                        {/* Text and Short info */}
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-display font-bold text-sm sm:text-base text-charcoal tracking-tight">
                              {sec.title}
                            </h3>
                            {sec.id === 'sec-1' && (
                              <span className="px-1.5 py-0.5 rounded-sm bg-gold-500/20 text-gold-800 text-[9px] font-mono font-bold uppercase tracking-wider">CỐT LÕI</span>
                            )}
                            {sec.id === 'sec-6' && (
                              <span className="px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold uppercase tracking-wider">MỚI (NĐ 13)</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-gray line-clamp-1">{sec.shortDesc}</p>
                        </div>

                        {/* Action toggle icon */}
                        <div className={`w-7 h-7 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 bg-charcoal text-white' : ''
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Expandable Body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-platinum"
                          >
                            <div className="p-6 sm:p-8 bg-linear-to-b from-[#FAF9F6]/20 to-white">
                              {sec.content}
                              
                              {/* Metadata indicators inside sections for SEO */}
                              <div className="mt-6 pt-4 border-t border-platinum flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-gray font-mono">
                                <div className="flex items-center gap-1.5">
                                  <Info className="w-3.5 h-3.5 text-gold-500" />
                                  <span>Thẻ liên quan: {sec.tags.join(', ')}</span>
                                </div>
                                <span>Phân khúc: Quyền và Nghĩa vụ PGS Agency</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-platinum">
                    <HelpCircle className="w-12 h-12 text-gold-300 mx-auto mb-3 animate-bounce" />
                    <h3 className="font-display font-semibold text-charcoal text-base">Không tìm thấy phần chính sách phù hợp</h3>
                    <p className="text-xs text-slate-gray max-w-sm mx-auto mt-1">Vui lòng nhập từ khóa khác hoặc liên hệ Trợ lý AI ở góc dưới bên phải để được tư vấn trực tiếp.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 bg-charcoal text-white rounded-full font-display text-xs font-bold"
                    >
                      Quay lại toàn bộ
                    </button>
                  </div>
                )}
              </div>

              {/* QUICK LINKS & CONVERT ENCOURAGEMENT CARD */}
              <div className="rounded-2xl border border-gold-300 bg-white shadow-xs overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs text-gold-600 font-mono font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>HỆ THỐNG AN TOÀN TẬP TRUNG</span>
                    </div>
                    <h3 className="font-display font-bold text-charcoal text-lg sm:text-xl">
                      Bạn muốn kiểm soát sâu hơn dữ liệu của mình?
                    </h3>
                    <p className="text-xs text-slate-gray max-w-xl">
                      Sử dụng Trung tâm Quyền riêng tư của PGS để tự do tùy chỉnh các loại Cookie theo dõi hoặc mô phỏng lệnh kết xuất/xóa dữ liệu cá nhân theo yêu cầu pháp lý.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-3 rounded-full bg-charcoal text-white hover:bg-gold-600 transition-colors text-xs font-bold flex items-center gap-2 group cursor-pointer shrink-0 border border-gold-300"
                  >
                    <span>Truy cập Trung tâm dữ liệu</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: PRIVACY & COOKIE DASHBOARD (CRO & TRUST ENGINE) */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Left Column: Cookie Management Panel */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-platinum shadow-xs space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center text-gold-600">
                        <Database className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-charcoal text-lg">Quản lý Quyền Đồng Ý</h3>
                    </div>
                    <p className="text-xs text-slate-gray">
                      Tùy chỉnh các loại cookie của bên thứ ba mà PGS Agency sử dụng. Tùy chọn của bạn được lưu trữ an toàn trong trình duyệt cục bộ của bạn.
                    </p>
                  </div>

                  {/* Cookie items list */}
                  <div className="space-y-4">
                    
                    {/* Cookie 1 */}
                    <div className="p-4 rounded-xl border border-platinum bg-[#FAF9F6]/50 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                            Cookie Hệ Thống Bắt Buộc
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-gold-100 text-gold-800">LUÔN BẬT</span>
                          </h4>
                          <p className="text-[11px] text-slate-gray">
                            Cần thiết để website hoạt động ổn định, lưu giữ cài đặt ngôn ngữ, cấu hình bảo mật TLS và tùy chọn riêng tư này của bạn.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookies.necessary}
                          disabled
                          className="w-4 h-4 accent-gold-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Cookie 2 */}
                    <div className="p-4 rounded-xl border border-platinum bg-white space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                            Cookie Đo Lường & Hiệu Suất
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${cookies.analytics ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {cookies.analytics ? 'BẬT' : 'TẮT'}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-gray">
                            Sử dụng mã tracking Google Analytics (GA4) và Google Tag Manager ẩn danh để đo lường các trang bạn quan tâm, nhằm tối ưu hóa cấu trúc UX/UI.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookies.analytics}
                          onChange={(e) => setCookies(prev => ({ ...prev, analytics: e.target.checked }))}
                          className="w-4 h-4 accent-gold-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Cookie 3 */}
                    <div className="p-4 rounded-xl border border-platinum bg-white space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                            Cookie Quảng Cáo & Tiếp Thị
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${cookies.marketing ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {cookies.marketing ? 'BẬT' : 'TẮT'}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-gray">
                            Tích hợp Facebook Pixel và TikTok Tracker Pixel để hiển thị các ưu đãi, tài liệu và lộ trình tư vấn hữu ích phù hợp với bạn khi truy cập mạng xã hội.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookies.marketing}
                          onChange={(e) => setCookies(prev => ({ ...prev, marketing: e.target.checked }))}
                          className="w-4 h-4 accent-gold-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Cookie 4 */}
                    <div className="p-4 rounded-xl border border-platinum bg-white space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                            Cookie Cá Nhân Hóa Đọc Bài
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${cookies.personalization ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {cookies.personalization ? 'BẬT' : 'TẮT'}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-gray">
                            Ghi nhớ các biểu mẫu liên hệ bạn từng ghi để gợi ý điền tự động lần sau, giúp bạn tiết kiệm thời gian khi gửi yêu cầu báo giá.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookies.personalization}
                          onChange={(e) => setCookies(prev => ({ ...prev, personalization: e.target.checked }))}
                          className="w-4 h-4 accent-gold-600 cursor-pointer"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-platinum">
                    <p className="text-[10px] text-slate-gray">Tùy chọn sẽ lưu trực tiếp vào LocalStorage trình duyệt của bạn.</p>
                    <button
                      onClick={handleSaveCookies}
                      className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal font-display font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      {cookieSaved ? <CheckCircle className="w-4 h-4 text-emerald-700" /> : <SaveIcon className="w-4 h-4" />}
                      <span>{cookieSaved ? "Đã áp dụng" : "Lưu tùy chọn"}</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Column: Simulated Data Request Center (GDPR / Decree 13 simulation) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-platinum shadow-xs space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center text-gold-600">
                        <Users className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-charcoal text-lg">Trung Tâm Yêu Cầu Dữ Liệu</h3>
                    </div>
                    <p className="text-xs text-slate-gray">
                      Thực hiện quyền tự quyết dữ liệu của bạn. Mô phỏng quy trình kiểm tra, kết xuất dữ liệu hoặc xóa sạch dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.
                    </p>
                  </div>

                  {requestStep === 0 && (
                    <form onSubmit={handleDataRequest} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-charcoal">Họ tên của bạn</label>
                          <input
                            type="text"
                            required
                            placeholder="Nguyễn Văn A"
                            value={requestName}
                            onChange={(e) => setRequestName(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#FAF9F6] border border-platinum text-xs focus:outline-hidden focus:border-gold-400 focus:bg-white text-charcoal"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-charcoal">Địa chỉ Email</label>
                          <input
                            type="email"
                            required
                            placeholder="partner@doanhnghiep.com"
                            value={requestEmail}
                            onChange={(e) => setRequestEmail(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#FAF9F6] border border-platinum text-xs focus:outline-hidden focus:border-gold-400 focus:bg-white text-charcoal"
                          />
                        </div>
                      </div>

                      {/* Request Type selections */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-charcoal">Lựa chọn yêu cầu dữ liệu</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRequestType('export')}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              requestType === 'export'
                                ? 'border-gold-500 bg-gold-50/20'
                                : 'border-platinum bg-white hover:border-gold-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Download className={`w-4 h-4 ${requestType === 'export' ? 'text-gold-600' : 'text-slate-gray'}`} />
                              <span className="text-xs font-bold text-charcoal">Kết xuất dữ liệu</span>
                            </div>
                            <p className="text-[10px] text-slate-gray">Trích xuất mọi dữ liệu PGS ghi nhận của bạn dưới dạng JSON/PDF để tải về.</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRequestType('delete')}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              requestType === 'delete'
                                ? 'border-rose-300 bg-rose-50/15'
                                : 'border-platinum bg-white hover:border-rose-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Trash2 className={`w-4 h-4 ${requestType === 'delete' ? 'text-rose-600' : 'text-slate-gray'}`} />
                              <span className="text-xs font-bold text-charcoal">Xóa vĩnh viễn</span>
                            </div>
                            <p className="text-[10px] text-slate-gray">Hủy đồng ý và xóa toàn bộ dữ liệu lưu trữ khỏi cơ sở dữ liệu đám mây PGS.</p>
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`w-full py-2.5 rounded-lg font-display font-bold text-xs text-white transition-all shadow-xs flex items-center justify-center gap-2 ${
                          requestType === 'export' 
                            ? 'bg-charcoal hover:bg-gold-600 border border-gold-400' 
                            : 'bg-rose-700 hover:bg-rose-800'
                        }`}
                      >
                        {requestType === 'export' ? <Download className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                        <span>{requestType === 'export' ? "Gửi yêu cầu trích xuất dữ liệu" : "Xử lý xóa vĩnh viễn dữ liệu"}</span>
                      </button>
                    </form>
                  )}

                  {/* STEP 1: PROCESSING LOADING */}
                  {requestStep === 1 && (
                    <div className="py-10 text-center space-y-4">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-platinum" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin" />
                        <div className="absolute inset-2 flex items-center justify-center text-gold-600">
                          <Database className="w-5 h-5 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-sm text-charcoal">Hệ thống đang kiểm định an ninh dữ liệu</h4>
                        <div className="text-[11px] text-slate-gray font-mono space-y-1 max-w-sm mx-auto">
                          <p className="animate-pulse">⏳ Kết nối Cloud node: sg-mkt-server-01...</p>
                          <p className="animate-pulse delay-200">🔒 Xác thực khóa pháp lý Nghị định 13...</p>
                          <p className="animate-pulse delay-500">⚙️ Thiết lập biên bản xử lý tự động...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SIMULATED OUTPUT RESULTS */}
                  {requestStep === 2 && (
                    <div className="space-y-5">
                      
                      {/* Success Box Header */}
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-emerald-900">Yêu cầu bảo mật đã được xác thực thành công</h4>
                          <p className="text-[11px] text-emerald-800">
                            Mã số lưu trữ tư pháp: <strong className="font-mono text-charcoal">{requestTicket}</strong>. Bộ phận pháp chế PGS đã xử lý và ghi nhận tự động.
                          </p>
                        </div>
                      </div>

                      {requestType === 'export' ? (
                        <div className="space-y-4">
                          <p className="text-xs text-slate-gray">
                            Dưới đây là mọi trường thông tin ẩn danh mà PGS Agency ghi nhận dựa trên tương tác trong phiên duyệt web hiện tại của bạn:
                          </p>
                          
                          {/* JSON Code Viewer */}
                          <div className="p-4 rounded-xl bg-charcoal text-emerald-400 font-mono text-[10px] overflow-auto max-h-48 shadow-inner border border-platinum/20">
                            <pre>{JSON.stringify(simulatedData, null, 2)}</pre>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(simulatedData, null, 2));
                                const downloadAnchor = document.createElement('a');
                                downloadAnchor.setAttribute("href", dataStr);
                                downloadAnchor.setAttribute("download", `pgs-privacy-data-${requestEmail}.json`);
                                document.body.appendChild(downloadAnchor);
                                downloadAnchor.click();
                                downloadAnchor.remove();
                              }}
                              className="flex-1 py-2 px-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal font-display font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>Tải xuống tệp dữ liệu .json</span>
                            </button>
                            
                            <button
                              onClick={() => setRequestStep(0)}
                              className="py-2 px-4 rounded-lg border border-platinum hover:bg-[#FAF9F6] text-xs font-semibold text-charcoal transition-all"
                            >
                              Nhập lại
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/10 text-center space-y-3">
                            <Trash2 className="w-10 h-10 text-rose-600 mx-auto animate-bounce" />
                            <div className="space-y-1">
                              <h5 className="font-display font-bold text-sm text-charcoal">Biên bản xác nhận xóa thông tin</h5>
                              <p className="text-xs text-slate-gray max-w-sm mx-auto">
                                PGS Agency cam kết đã thu hồi toàn bộ các quyền kết xuất và xóa sạch vĩnh viễn dữ liệu liên quan đến email <strong>{requestEmail}</strong> khỏi mọi hệ thống sao lưu đám mây phụ.
                              </p>
                            </div>
                            <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-mono font-bold tracking-wider">STATUS: DELETED PERMANENTLY</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                alert(`XÁC NHẬN PHÁP LÝ:\nBiên bản điện tử PGS-DEL đã được gửi về email ${requestEmail} dưới dạng tệp điện tử an toàn.`);
                              }}
                              className="flex-1 py-2 px-4 rounded-lg bg-charcoal text-white hover:bg-gold-600 font-display font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Nhận Biên bản điện tử (PDF)</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                setRequestStep(0);
                                setRequestEmail('');
                                setRequestName('');
                              }}
                              className="py-2 px-4 rounded-lg border border-platinum hover:bg-[#FAF9F6] text-xs font-semibold text-charcoal transition-all"
                            >
                              Gửi yêu cầu mới
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: SEO & DEVELOPER DOCUMENTATION DRAWOR (SEO SPECIALIST & EEAT GUIDELINES) */}
          {activeTab === 'handover' && (
            <motion.div
              key="handover-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-platinum shadow-xs space-y-6">
                
                {/* Intro to documentation */}
                <div className="space-y-2 border-b border-platinum pb-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-xs font-mono font-bold text-gold-700">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>SEO, EEAT, CRO & CRO CHUYÊN SÂU</span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-charcoal">Hồ sơ bàn giao thiết kế và Tối ưu hóa SEO</h3>
                  <p className="text-xs text-slate-gray">
                    Tài liệu dành riêng cho Designer dựng UI, Developer lập trình tương tác, và SEO Specialists tối ưu hóa công cụ tìm kiếm & bộ lọc AI Search (SGE/Gemini).
                  </p>
                </div>

                {/* Grid checklist specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* SEO Specification */}
                  <div className="p-5 rounded-xl border border-platinum bg-[#FAF9F6]/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5 border-b border-platinum pb-2">
                      <Globe className="w-4 h-4 text-gold-600" />
                      Cấu hình SEO & AI Search
                    </h4>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="font-bold text-[10px] text-slate-gray uppercase">Meta Title (SEO):</p>
                        <p className="text-charcoal bg-white p-2 rounded-md border border-platinum/50 font-mono mt-1 select-all">
                          Chính sách bảo mật thông tin | PGS Agency - Marketing Tổng Thể
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] text-slate-gray uppercase">Meta Description (SEO):</p>
                        <p className="text-charcoal bg-white p-2 rounded-md border border-platinum/50 font-mono mt-1 leading-relaxed select-all">
                          Cam kết bảo mật dữ liệu khách hàng tuyệt đối và minh bạch. Khám phá chính sách bảo mật, quyền dữ liệu và hệ thống quản trị dữ liệu thông tin số của PGS Agency.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] text-slate-gray uppercase">Heading H1 Duy nhất:</p>
                        <p className="text-charcoal bg-white p-2 rounded-md border border-platinum/50 font-mono mt-1 select-all">
                          Chính sách bảo mật thông tin cá nhân
                        </p>
                      </div>
                      <div className="p-3 bg-gold-50/40 rounded-lg border border-gold-200/30">
                        <p className="font-semibold text-[10px] text-gold-800 uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Tối ưu hóa AI Search (SGE):
                        </p>
                        <p className="text-[11px] text-slate-gray mt-1 leading-relaxed">
                          Sử dụng các bảng so sánh trực quan, danh sách checklist dạng bảng có phân cấp tiêu đề, định nghĩa từ khóa pháp lý chuẩn chỉnh giúp AI dễ dàng lập chỉ mục (index) và trả lời trực tiếp cho người dùng.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Schema LD Spec */}
                  <div className="p-5 rounded-xl border border-platinum bg-[#FAF9F6]/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5 border-b border-platinum pb-2">
                      <FileText className="w-4 h-4 text-gold-600" />
                      Schema Đề Xuất (JSON-LD)
                    </h4>
                    
                    <div className="space-y-3 text-xs">
                      <p className="text-[11px] text-slate-gray">
                        Nhúng mã Schema dưới đây vào đầu trang HTML để định danh cấu trúc dữ liệu pháp lý cho Bot tìm kiếm của Google:
                      </p>
                      
                      <div className="p-3 rounded-lg bg-charcoal text-emerald-400 font-mono text-[9px] overflow-auto max-h-56 select-all border border-platinum/10">
                        <pre>{`{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Chính sách bảo mật thông tin | PGS Agency",
  "description": "Chính sách bảo mật dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP của PGS Agency.",
  "publisher": {
    "@type": "Organization",
    "name": "PGS Agency",
    "logo": "https://pgs.agency/logo.png"
  },
  "datePublished": "2026-07-01",
  "dateModified": "2026-07-01",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://pgs.agency/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chính sách bảo mật",
        "item": "https://pgs.agency/chinh-sach-bao-mat/"
      }
    ]
  }
}`}</pre>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[10px] text-slate-gray uppercase">Internal Links Flow:</p>
                        <div className="p-2 bg-white rounded-md border border-platinum/50 flex flex-wrap gap-2 text-[10px]">
                          <span className="bg-gold-50 text-gold-800 px-1.5 py-0.5 rounded-sm">Link Đi: /lien-he/</span>
                          <span className="bg-gold-50 text-gold-800 px-1.5 py-0.5 rounded-sm">Link Đi: /dieu-khoan-dich-vu/</span>
                          <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-sm">Nhận: Từ các Form footer của trang dịch vụ</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist Section */}
                  <div className="p-5 rounded-xl border border-platinum bg-[#FAF9F6]/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5 border-b border-platinum pb-2">
                      <CheckCircle className="w-4 h-4 text-gold-600" />
                      Checklists Bàn Giao Thiết Kế
                    </h4>
                    
                    <div className="space-y-3 text-xs text-slate-gray">
                      
                      {/* Designer checklist */}
                      <div>
                        <span className="font-bold text-[10px] text-charcoal flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                          HƯỚNG DẪN DESIGNER (UI/UX):
                        </span>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                          <li>Sử dụng cấu trúc Light Premium: nhiều khoảng trắng sang trọng.</li>
                          <li>Giao diện thân thiện không dùng Dark Theme, ưu tiên màu Gold ấm nhạt.</li>
                          <li>Bo tròn các thẻ card tối thiểu 16px để tạo cảm giác mềm mại.</li>
                        </ul>
                      </div>

                      {/* Developer checklist */}
                      <div>
                        <span className="font-bold text-[10px] text-charcoal flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                          HƯỚNG DẪN DEVELOPER (INTERACTION):
                        </span>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                          <li>Cung cấp tính năng tìm kiếm / lọc tự động để rút ngắn thao tác scan của người dùng.</li>
                          <li>Tích hợp cookie switcher tương tác thực tế kết nối với LocalStorage.</li>
                          <li>Mô phỏng chân thực quy trình trích xuất / xóa thông tin dạng JSON.</li>
                        </ul>
                      </div>

                      {/* Content SEO checklist */}
                      <div>
                        <span className="font-bold text-[10px] text-charcoal flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                          HƯỚNG DẪN CONTENT SEO & EEAT:
                        </span>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                          <li>Dẫn chứng đầy đủ thông tư, nghị định hiện hành của pháp luật Việt Nam.</li>
                          <li>Cung cấp rõ ràng thông tin liên hệ pháp nhân của PGS Agency để tăng Trust (EEAT).</li>
                          <li>Sử dụng ngôn từ khẳng định mạnh mẽ tính minh bạch, hạn chế từ ngữ phủ định.</li>
                        </ul>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* ==========================================
          AI ASSISTANT SIDEBAR WIDGET (FLOATING CHATBOT)
          ========================================== */}
      
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsAiOpen(!isAiOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-charcoal hover:bg-gold-600 text-white flex items-center justify-center shadow-2xl relative overflow-hidden cursor-pointer border border-gold-300 group"
          id="ai-privacy-launcher"
        >
          {/* Animated pulsing bg */}
          <span className="absolute inset-0 bg-gradient-to-tr from-gold-500 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <AnimatePresence mode="wait">
            {isAiOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="z-10"
              >
                <X className="w-6 h-6 text-white group-hover:text-charcoal" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="z-10 flex flex-col items-center"
              >
                <Sparkles className="w-5 h-5 text-gold-300 group-hover:text-charcoal animate-pulse" />
                <span className="text-[7px] font-mono font-bold tracking-widest text-white group-hover:text-charcoal uppercase -mt-0.5">ASSIST</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification bubble if not open */}
          {!isAiOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
          )}
        </motion.button>
      </div>

      {/* Chat Widget Panel */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] rounded-2xl bg-white border border-gold-300 shadow-2xl z-50 flex flex-col overflow-hidden gold-glow"
          >
            {/* Widget Header */}
            <div className="bg-charcoal p-4 text-white flex items-center justify-between border-b border-gold-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-charcoal">
                  <Shield className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs flex items-center gap-1.5">
                    Trợ Lý Bảo Mật PGS
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </h4>
                  <p className="text-[9px] font-mono text-gold-300 tracking-wider uppercase">AI Law & Compliance Bot</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsAiOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#FAF9F6]/40 space-y-4">
              
              {/* Welcome message from AI */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-charcoal font-display font-bold text-[9px] shrink-0 mt-0.5">
                  AI
                </div>
                <div className="p-3 rounded-2xl bg-gold-50/50 border border-gold-200/50 text-xs text-charcoal max-w-[80%] space-y-2">
                  <p>
                    Xin chào! Tôi là <strong>Trợ Lý Bảo Mật của PGS Agency</strong>. 🛡️
                  </p>
                  <p>
                    Tôi ở đây để giúp giải đáp mọi thắc mắc của bạn về cách chúng tôi thu thập, lưu trữ dữ liệu, hoặc hỗ trợ bạn thực hiện các quyền bảo vệ dữ liệu theo <strong>Nghị định 13/2023/NĐ-CP</strong>.
                  </p>
                  <p>Bạn muốn hỏi tôi điều gì?</p>
                </div>
              </div>

              {/* Chat Message loop */}
              {chatHistory.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={i} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : ''}`}>
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-charcoal font-display font-bold text-[9px] shrink-0 mt-0.5">
                        AI
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                      isUser 
                        ? 'bg-charcoal text-white rounded-tr-none' 
                        : 'bg-white border border-platinum rounded-tl-none text-slate-gray'
                    }`}>
                      {msg.parts[0].text}
                    </div>
                  </div>
                );
              })}

              {chatLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-charcoal font-display font-bold text-[9px] shrink-0 mt-0.5">
                    AI
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-platinum rounded-tl-none text-xs text-slate-gray flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce delay-200" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2.5 bg-[#FAF9F6] border-t border-platinum/60 flex flex-wrap gap-1.5">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChat(chip)}
                  className="px-2.5 py-1 rounded-full bg-white border border-platinum hover:border-gold-300 text-[10px] text-slate-gray hover:text-charcoal transition-all text-left truncate max-w-[150px] cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-platinum flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi bảo mật..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat();
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-[#FAF9F6] border border-platinum text-xs focus:outline-hidden focus:border-gold-400 focus:bg-white text-charcoal"
              />
              <button
                onClick={() => handleSendChat()}
                className="w-8 h-8 rounded-lg bg-charcoal text-white hover:bg-gold-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER SECTION */}
      

    </div>
  );
}

// ==========================================
// SUB COMPONENTS & ICONS FOR CLEAN SEPARATION
// ==========================================

function SaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
