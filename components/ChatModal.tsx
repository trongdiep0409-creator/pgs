"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Maximize2, Minimize2, MessageSquare } from 'lucide-react';

const ChatModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string; time: string }>>([
    {
      role: 'bot',
      text: '👋 Em chào anh/chị! Em là nhân viên tư vấn của PGS Agency. Anh/chị đang quan tâm dịch vụ nào để em tư vấn cụ thể hơn ạ?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { keywords: ['dịch vụ', 'service', 'seo'], answer: '🔍 PGS Agency cung cấp dịch vụ SEO tổng thể, quảng cáo Google Ads, Facebook Ads, TikTok Ads và xây dựng kênh TikTok để tăng trưởng bền vững.' },
    { keywords: ['giá', 'price', 'chi phí', 'bao nhiêu'], answer: '💰 Gói dịch vụ của PGS Agency linh hoạt từ 5 triệu/tháng. Anh/chị để lại SĐT hoặc liên hệ Zalo để được báo giá chi tiết nhé!' },
    { keywords: ['liên hệ', 'contact', 'zalo', 'số điện thoại', 'sđt'], answer: '📞 Anh/chị có thể liên hệ qua Zalo, Messenger, TikTok hoặc gọi điện trực tiếp bằng các biểu tượng ở góc dưới bên phải màn hình ạ.' },
    { keywords: ['đội ngũ', 'team', 'ceo', 'nhân viên'], answer: '👨‍💼 Đội ngũ PGS Agency gồm các chuyên gia Digital Marketing, SEO, và Growth Hacking với kinh nghiệm nhiều năm trong ngành.' },
    { keywords: ['tư vấn', 'consultation', 'advice', 'tư vấn miễn phí'], answer: '🎯 PGS Agency cung cấp buổi tư vấn miễn phí để lên chiến lược marketing phù hợp với doanh nghiệp của anh/chị!' },
    { keywords: ['tiktok', 'quảng cáo tiktok', 'tik tok'], answer: '🎵 Dịch vụ TikTok Ads của PGS Agency giúp tiếp cận khách hàng trẻ, tăng lượt xem và chuyển đổi nhanh chóng với chi phí tối ưu.' },
    { keywords: ['facebook', 'fb', 'facebook ads'], answer: '📘 Dịch vụ Facebook Ads giúp anh/chị target đúng đối tượng, tối ưu chi phí và tăng doanh số hiệu quả.' },
    { keywords: ['google', 'google ads', 'gg ads'], answer: '🟢 Google Ads của PGS Agency đảm bảo ROI cao với chiến lược đấu thầu thông minh và tối ưu landing page.' },
  ];

  const getResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    for (const faq of faqs) {
      for (const kw of faq.keywords) {
        if (lower.includes(kw)) return faq.answer;
      }
    }
    return '😊 Xin lỗi, em chưa có câu trả lời cho vấn đề này. Anh/chị có thể để lại số điện thoại hoặc Zalo, chuyên viên của PGS Agency sẽ liên hệ lại trong thời gian sớm nhất!';
  };

  const now = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const botReply = getResponse(userMsg);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userMsg, time: now() },
      { role: 'bot', text: botReply, time: now() },
    ]);
    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop on mobile only */}
      <div
        className="fixed inset-0 z-40 bg-black/20 md:hidden"
        onClick={onClose}
      />

      {/* Side panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 flex flex-col bg-white shadow-2xl transition-all duration-300
          w-full md:w-[380px]
          ${isMinimized ? 'h-[56px]' : 'h-[85vh] md:h-[620px]'}
          md:bottom-6 md:right-24 md:rounded-2xl overflow-hidden border border-gray-200`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0 cursor-pointer"
          style={{ background: 'linear-gradient(90deg,#1877F2 0%,#0C5FD4 100%)' }}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">PGS Agency</p>
              <p className="text-white/80 text-[11px]">● Đang trực tuyến</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="p-1.5 rounded-full hover:bg-white/20 transition text-white"
              aria-label="Thu nhỏ"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-1.5 rounded-full hover:bg-white/20 transition text-white"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${msg.role === 'user'
                          ? 'bg-[#1877F2] text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply chips */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
              {['Tư vấn miễn phí', 'Báo giá dịch vụ', 'Google Ads', 'TikTok Ads'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setInput(chip);
                    setTimeout(() => {
                      const botReply = getResponse(chip);
                      setMessages((prev) => [
                        ...prev,
                        { role: 'user', text: chip, time: now() },
                        { role: 'bot', text: botReply, time: now() },
                      ]);
                      setInput('');
                    }, 100);
                  }}
                  className="whitespace-nowrap text-xs border border-[#1877F2] text-[#1877F2] rounded-full px-3 py-1 hover:bg-[#1877F2] hover:text-white transition flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-3 flex-shrink-0">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1877F2]/40 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#0C5FD4] transition shadow-md"
                aria-label="Gửi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatModal;
