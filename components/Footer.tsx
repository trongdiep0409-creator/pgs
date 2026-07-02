'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, MessageSquare, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    need: 'marketing-tongthe'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      company: '',
      need: 'marketing-tongthe'
    });
  };

  const servicesLinks = [
    { name: 'Thiết Kế Website CRO', href: '/dich-vu/thiet-ke-website' },
    { name: 'SEO Tổng Thể Đa Kênh', href: '/dich-vu/seo-tong-the' },
    { name: 'Quảng Cáo Google Ads', href: '/dich-vu/quang-cao-google-ads' },
    { name: 'Quảng Cáo Facebook Ads', href: '/dich-vu/quang-cao-facebook-ads' },
    { name: 'Quảng Cáo TikTok Ads', href: '/dich-vu/quang-cao-tiktok-ads' },
    { name: 'Thiết Kế Landing Page', href: '/dich-vu/thiet-ke-landing-page' },
    { name: 'Content Marketing', href: '/dich-vu/content-marketing' },
    { name: 'Vận Hành Social', href: '/dich-vu/van-hanh-social' }
  ];

  const trustLinks = [
    { name: 'Về PGS Agency', href: '/gioi-thieu' },
    { name: 'Hệ Thống 5 Lớp', href: '/#growth-system' },
    { name: 'Case Study Thực Chiến', href: '/case-studies' },
    { name: 'Kiến Thức Marketing', href: '/kien-thuc-marketing' },
    { name: 'Điều Khoản Dịch Vụ', href: '/dieu-khoan-dich-vu' },
    { name: 'Chính Sách Bảo Mật', href: '/chinh-sach-bao-mat' }
  ];

  return (
    <footer id="contact" className="site-footer bg-[#FAF9F6] border-t border-gold-200/50 pt-24 pb-12 relative overflow-hidden">
      
      {/* SECTION: FINAL CTA (FORM ĐĂNG KÝ) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative">
        <div className="absolute -top-12 left-10 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl -z-10" />

        <div className="bg-white border border-gold-300 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          
          {/* Decorative gold shimmer strip */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

          {/* Left Block: Message */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full">
              Khởi động tăng trưởng ngay
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              Bạn không cần thêm một chiến dịch tiếp thị rời rạc.{' '}
              <span className="text-gold-500 font-extrabold relative inline-block">
                Bạn cần một hệ thống
                <span className="absolute left-0 bottom-1 w-full h-1 bg-gold-200 -z-10" />
              </span>{' '}
              tạo tăng trưởng thực.
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Hãy đặt lịch chẩn đoán hệ thống miễn phí cùng PGS Agency. Các chuyên gia của chúng tôi sẽ phân tích hiện trạng website, tài khoản quảng cáo và gửi tặng bạn lộ trình cải tiến tối ưu cam kết ra lead nóng chất lượng.
            </p>

            {/* Quick Contacts inside CTA */}
            <div className="space-y-4 pt-4 border-t border-gold-100 text-xs text-brand-dark font-medium">
              <a href="tel:0901234567" className="flex items-center gap-3 hover:text-gold-600 transition-colors">
                <div className="p-2 bg-gold-50 rounded-lg text-gold-600">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Hotline Tư Vấn Lộ Trình: 090 123 4567</span>
              </a>
              <a href="https://zalo.me" className="flex items-center gap-3 hover:text-gold-600 transition-colors">
                <div className="p-2 bg-gold-50 rounded-lg text-gold-600">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span>Zalo OA: PGS Agency Growth System</span>
              </a>
            </div>
          </div>

          {/* Right Block: Conversion Form */}
          <div className="lg:col-span-6 bg-[#FAF9F6] border border-gold-200/80 rounded-2xl p-6 sm:p-8 shadow-inner relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-brand-muted uppercase">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full p-3 bg-white border border-gold-200 rounded-lg text-xs text-brand-dark focus:border-gold-500 focus:outline-hidden transition-all shadow-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-brand-muted uppercase">Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0901234567"
                        className="w-full p-3 bg-white border border-gold-200 rounded-lg text-xs text-brand-dark focus:border-gold-500 focus:outline-hidden transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-brand-muted uppercase">Tên công ty / Doanh nghiệp</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Công ty TNHH PGS"
                      className="w-full p-3 bg-white border border-gold-200 rounded-lg text-xs text-brand-dark focus:border-gold-500 focus:outline-hidden transition-all shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-brand-muted uppercase">Giải pháp cần tư vấn</label>
                    <select
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full p-3 bg-white border border-gold-200 rounded-lg text-xs text-brand-dark focus:border-gold-500 focus:outline-hidden transition-all cursor-pointer shadow-xs"
                    >
                      <option value="marketing-tongthe">Marketing Tổng Thể (PGS Growth System)</option>
                      <option value="seo">SEO Tổng Thể & Thương Hiệu</option>
                      <option value="web">Thiết Kế Website & CRO</option>
                      <option value="ads">Performance Ads (Google, Facebook, TikTok)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    Gửi yêu cầu chẩn đoán hệ thống
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] text-brand-muted block text-center">
                    PGS cam kết bảo mật 100% thông tin đăng ký của doanh nghiệp
                  </span>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center text-gold-500 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-brand-dark text-lg">Gửi yêu cầu thành công!</h3>
                    <p className="text-xs text-brand-muted max-w-xs leading-relaxed">
                      Cảm ơn bạn đã tin tưởng PGS Agency. Chuyên gia tư vấn chiến lược sẽ gọi điện chẩn đoán lộ trình cho bạn trong vòng 2 giờ làm việc tới.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Quay lại form đăng ký
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* FOOTER LỚN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-gold-200/40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs text-brand-muted leading-relaxed">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center border border-gold-300 overflow-hidden shadow-sm">
                <span className="font-display font-bold text-brand-dark text-lg">PGS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-brand-dark tracking-wide leading-none">
                  PGS AGENCY
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gold-600 font-bold uppercase leading-none mt-1">
                  Growth System
                </span>
              </div>
            </div>

            <p>
              PGS Agency là agency Marketing tổng thể đa nền tảng, giúp doanh nghiệp xây dựng hệ thống tăng trưởng số bền vững bằng việc kết nối Website CRO, SEO, Ads đa kênh và dữ liệu đo lường chuẩn xác.
            </p>

            <div className="space-y-1 text-[11px] border-t border-gold-200/30 pt-4">
              <p><strong className="text-brand-dark">Công Ty TNHH Giải Pháp Tăng Trưởng PGS</strong></p>
              <p>Mã số doanh nghiệp: 0102345678 do Sở KH&ĐT cấp</p>
              <p>Trụ sở chính: Tầng 12, Tòa nhà Sông Đà, Phạm Hùng, Nam Từ Liêm, Hà Nội</p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold text-brand-dark uppercase tracking-widest border-b border-gold-200/30 pb-2">
              Hệ sinh thái dịch vụ
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-gold-600 hover:underline flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Trust & Resources */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold text-brand-dark uppercase tracking-widest border-b border-gold-200/30 pb-2">
              Kiến thức & Tài nguyên
            </h4>
            <ul className="space-y-3">
              {trustLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-gold-600 hover:underline flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts & Address */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold text-brand-dark uppercase tracking-widest border-b border-gold-200/30 pb-2">
              Thông tin liên hệ
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <p>Tòa nhà Sông Đà, Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p>Hotline: 090 123 4567</p>
                  <p>Hỗ trợ: 024 7300 1234</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <p>contact@pgsagency.vn</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gold-200/30 flex items-center gap-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-lg text-[10px] font-semibold text-emerald-700 border border-emerald-100">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Bảo mật SSL 256-bit</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright footer bar */}
        <div className="mt-16 pt-8 border-t border-gold-200/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-muted">
          <p>© 2026 PGS Agency Growth System. All rights reserved. Designed by Senior UI/UX Consultant.</p>
          <div className="flex gap-6">
            <Link href="/dieu-khoan-dich-vu" className="hover:text-gold-600 transition-colors">Điều khoản dịch vụ</Link>
            <Link href="/chinh-sach-bao-mat" className="hover:text-gold-600 transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}