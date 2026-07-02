'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Layers, Terminal, Globe, BookOpen, 
  Menu, Info, CheckCircle, Smartphone, Eye, FileText
} from 'lucide-react';
import LivePreview from '@/components/LivePreview';
import { sectionsData } from '@/lib/docs-data';

export default function Page() {
  const [activeSectionId, setActiveSectionId] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSectionSelect = (id: number) => {
    setActiveSectionId(id);
    const targetEl = document.getElementById(`section-${id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLivePreviewSectionClick = (id: number) => {
    setActiveSectionId(id);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans relative selection:bg-gold-200 selection:text-gold-950">
      
      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-stone-900 text-white border border-stone-800 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-gold-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Translucent Header */}
      

      {/* Main Workspace Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* Dynamic Multi-Pane Layout */}
        <div className="flex-1 grid grid-cols-1 gap-6 items-start">
          
          {/* Left Pane: The Interactive Live Preview (Adaptive columns) */}
          <div className="col-span-12">
            <div className="space-y-4">
              <LivePreview 
                activeSectionId={activeSectionId} 
                onSectionClick={handleLivePreviewSectionClick} 
                showSpecToast={(title) => showToast(`Đã chọn khối: ${title}`)} 
              />
            </div>
          </div>

        </div>
      </main>

      {/* Premium Footer */}
      

    </div>
  );
}
