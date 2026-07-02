'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Sparkles, Building, Phone, Mail, User, Globe2, HelpCircle } from 'lucide-react';

interface GrowthFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrowthFormModal: React.FC<GrowthFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    websiteUrl: '',
    monthlyBudget: 'SME (< 20M / tháng)',
    biggestPain: 'marketing-roi-rac',
    needsAudit: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to PGS server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      websiteUrl: '',
      monthlyBudget: 'SME (< 20M / tháng)',
      biggestPain: 'marketing-roi-rac',
      needsAudit: true
    });
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white border border-gold-300 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(194,139,36,0.25)] z-10 max-h-[90vh] flex flex-col"
          >
            
            {/* Header */}
            <div className="p-6 md:p-8 bg-gold-50 border-b border-gold-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-widest block mb-1">
                  Đăng Ký Khảo Sát & Tư Vấn
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-charcoal-900">
                  Thiết Kế Hệ Thống Tăng Trưởng PGS
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-gold-200 bg-white flex items-center justify-center text-charcoal-600 hover:text-gold-600 transition-colors cursor-pointer shadow-sm hover:border-gold-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-xs text-charcoal-500 italic">
                    * Mọi dữ liệu bạn cung cấp đều được PGS Agency cam kết bảo mật tuyệt đối theo Quy chế Pháp lý An toàn Thông tin của Công ty.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold-500" />
                        Họ và Tên người đăng ký <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-gold-500" />
                        Tên Doanh nghiệp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Công ty TNHH dịch vụ ABC"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        Số Điện Thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gold-500" />
                        Địa chỉ Email nhận báo cáo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ceo@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Website URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-gold-500" />
                        Website / Landing Page hiện tại
                      </label>
                      <input
                        type="url"
                        placeholder="https://mywebsite.com (nếu có)"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50"
                      />
                    </div>

                    {/* Budget Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
                        Ngân sách Marketing hàng tháng
                      </label>
                      <select
                        value={formData.monthlyBudget}
                        onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-charcoal-50 cursor-pointer"
                      >
                        <option value="SME (< 20M / tháng)">SME (&lt; 20M / tháng)</option>
                        <option value="Medium (20M - 100M / tháng)">Medium (20M - 100M / tháng)</option>
                        <option value="Growth (&gt; 100M / tháng)">Growth (&gt; 100M / tháng)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Pain Point */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-charcoal-700 uppercase block">
                      Vấn đề lớn nhất doanh nghiệp đang gặp phải
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        { val: 'marketing-roi-rac', label: 'Marketing rời rạc, không đồng bộ' },
                        { val: 'web-khong-lead', label: 'Website không mang về số điện thoại' },
                        { val: 'ads-kiem-tra', label: 'Quảng cáo tốn kém, không đo được hiệu quả' },
                        { val: 'content-thieu', label: 'Thiếu định hướng nội dung bài viết sâu sắc' }
                      ].map((item) => (
                        <label 
                          key={item.val} 
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                            formData.biggestPain === item.val
                              ? 'bg-gold-50 border-gold-400 text-gold-900 font-medium'
                              : 'bg-white border-charcoal-200 hover:bg-charcoal-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="biggestPain"
                            value={item.val}
                            checked={formData.biggestPain === item.val}
                            onChange={() => setFormData({ ...formData, biggestPain: item.val })}
                            className="text-gold-500 focus:ring-gold-500"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Audit Checkbox */}
                  <label className="flex items-start gap-2 p-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsAudit}
                      onChange={(e) => setFormData({ ...formData, needsAudit: e.target.checked })}
                      className="mt-0.5 rounded text-gold-500 focus:ring-gold-500"
                    />
                    <span className="text-xs text-charcoal-600 leading-tight">
                      Tôi muốn PGS Agency thực hiện <strong>Audit, đánh giá rò rỉ ngân sách quảng cáo hiện tại</strong> miễn phí cho doanh nghiệp của tôi.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 border border-gold-400 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang kết nối hệ thống...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gửi Yêu Cầu Thiết Kế Hệ Thống Tăng Trưởng
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-200 flex items-center justify-center mx-auto text-gold-600 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <h4 className="text-lg font-display font-bold text-charcoal-900">
                    Gửi Thông Tin Thành Công!
                  </h4>
                  
                  <p className="text-xs md:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                    Chào anh/chị <strong>{formData.fullName}</strong>. PGS Agency đã tiếp nhận hồ sơ khảo sát thương hiệu <strong>{formData.companyName}</strong>. 
                    Chúng tôi sẽ nghiên cứu sơ bộ trong vòng 24h làm việc và liên hệ trực tiếp qua số <strong>{formData.phone}</strong> để xác nhận lịch họp khảo sát chi tiết.
                  </p>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-gold-300 text-xs font-semibold text-gold-700 bg-white rounded-lg hover:bg-gold-50 cursor-pointer"
                    >
                      Đăng ký cho dự án khác
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-charcoal-900 text-white text-xs font-semibold rounded-lg hover:bg-charcoal-800 cursor-pointer"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
