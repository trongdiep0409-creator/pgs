'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQItem } from '@/types';

interface FAQSectionProps {
  items: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>("pgs-lam-gi");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const categories = ["Tất cả", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = selectedCategory === "Tất cả" 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Category selector chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gold-500 border-gold-400 text-white shadow-sm'
                : 'bg-white border-gold-100 text-charcoal-600 hover:border-gold-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isExpanded 
                  ? 'bg-white border-gold-400 shadow-sm shadow-gold-100' 
                  : 'bg-white/60 border-gold-100 hover:border-gold-300'
              }`}
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isExpanded ? 'text-gold-500' : 'text-charcoal-400'}`} />
                  <div>
                    <span className="text-[9px] font-mono font-bold text-gold-600 uppercase tracking-widest block mb-0.5">
                      {item.category}
                    </span>
                    <h4 className="text-sm md:text-base font-display font-semibold text-charcoal-950 tracking-tight leading-snug">
                      {item.question}
                    </h4>
                  </div>
                </div>
                
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isExpanded ? 'border-gold-400 text-gold-600 bg-gold-50' : 'border-gold-100 text-charcoal-400'
                }`}>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-charcoal-600 border-t border-dashed border-gold-100 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
