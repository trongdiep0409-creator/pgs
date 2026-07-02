"use client";

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatModal from '@/components/ChatModal';

// Floating action panel with ChatGPT modal and quick contact icons
const ChatGPTButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Chat button with hoverable contact icons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

        {/* Zalo */}
        <a
          href="https://zalo.me/"
          target="_blank"
          rel="noopener noreferrer"
          title="Zalo"
          aria-label="Zalo"
          className="group/btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(135deg,#0068FF 0%,#00C4FF 100%)' }}
        >
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="24" cy="24" rx="24" ry="24" fill="url(#zalo-bg)" />
            <defs>
              <linearGradient id="zalo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0068FF"/>
                <stop offset="1" stopColor="#00C4FF"/>
              </linearGradient>
            </defs>
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">Zalo</text>
          </svg>
          <span className="absolute right-16 bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">Nhắn qua Zalo</span>
        </a>

        {/* Facebook Messenger */}
        <a
          href="https://m.me/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          title="Messenger"
          aria-label="Facebook Messenger"
          className="group/btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(135deg,#0099FF 0%,#A033FF 100%)' }}
        >
          {/* Messenger logo */}
          <svg viewBox="0 0 36 36" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2C9.163 2 2 8.71 2 17c0 4.55 1.978 8.637 5.145 11.5L7 31.5l2.795-1.549A16.07 16.07 0 0018 32c8.837 0 16-6.71 16-15S26.837 2 18 2zm1.633 20.213-4.066-4.336-7.938 4.336 8.738-9.277 4.168 4.336 7.836-4.336-8.738 9.277z"/>
          </svg>
          <span className="absolute right-16 bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">Nhắn qua Messenger</span>
        </a>

        {/* Facebook Page */}
        <a
          href="https://www.facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          aria-label="Facebook"
          className="group/btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(135deg,#1877F2 0%,#0C5FD4 100%)' }}
        >
          {/* Facebook "f" logo */}
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
          </svg>
          <span className="absolute right-16 bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">Facebook PGS</span>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          title="TikTok"
          aria-label="TikTok"
          className="group/btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(135deg,#010101 0%,#2c2c2c 100%)' }}
        >
          {/* TikTok logo */}
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/>
          </svg>
          <span className="absolute right-16 bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">TikTok PGS</span>
        </a>

        {/* Main Chat Button */}
        <button
          onClick={openModal}
          className="flex items-center justify-center w-14 h-14 bg-[#4F46E5] text-white rounded-full shadow-xl hover:bg-[#4338CA] hover:scale-110 transition-all duration-200"
          aria-label="Chat với trợ lý AI"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Modal for ChatGPT interaction */}
      <ChatModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default ChatGPTButton;
