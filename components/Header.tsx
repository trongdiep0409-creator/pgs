'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown, Users, UserCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const navigationItems = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Về Chúng Tôi', href: '/gioi-thieu' },
    {
      name: 'Dịch Vụ',
      href: '/#services',
      hasMegaMenu: true,
      megaMenuType: 'dichvu'
    },
    { name: 'Case Study', href: '/case-studies' },
    { name: 'Tin Tức', href: '/kien-thuc-marketing' },
    { name: 'Liên Hệ', href: '/lien-he' },
    { name: 'Chính Sách', href: '/chinh-sach-bao-mat' }
  ];

  // Left 20%: About links
  const aboutLinks = [
    { name: 'Về PGS Agency', desc: 'Hành trình phát triển & Sứ mệnh', href: '/gioi-thieu', icon: ShieldCheck },
    { name: 'Về CEO', desc: 'Gặp gỡ người sáng lập & tầm nhìn', href: '/gioi-thieu/ceo-phung-quoc-bao', icon: UserCircle },
    { name: 'Đội Ngũ Nhân Sự', desc: 'Đội ngũ chuyên gia thực chiến', href: '/gioi-thieu/doi-ngu-chuyen-gia', icon: Users }
  ];

  // Right 80%: Services grouped by category
  const serviceCategories = [
    {
      title: 'Website & Nền tảng',
      services: [
        { name: 'Thiết Kế Website CRO', desc: 'Xây dựng website tỷ lệ chuyển đổi cao, chuẩn SEO', href: '/dich-vu/thiet-ke-website' },
        { name: 'Thiết Kế Landing Page', desc: 'Tối ưu phễu quảng cáo, tăng lead đăng ký', href: '/dich-vu/thiet-ke-landing-page' },
        { name: 'Chăm Sóc Website', desc: 'Vận hành kỹ thuật, cập nhật nội dung định kỳ', href: '/dich-vu/cham-soc-website' }
      ]
    },
    {
      title: 'SEO & Google Search',
      services: [
        { name: 'SEO Tổng Thể Đa Kênh', desc: 'Phủ top tìm kiếm Google, thu traffic tự nhiên', href: '/dich-vu/seo-tong-the' },
        { name: 'Google Business Profile', desc: 'Địa phương hóa thương hiệu, tăng khách vãng lai', href: '/dich-vu/google-business-profile' }
      ]
    },
    {
      title: 'Ads & Performance',
      services: [
        { name: 'Quảng Cáo Google Ads', desc: 'Tiếp cận khách có nhu cầu mua ngay lập tức', href: '/dich-vu/quang-cao-google-ads' },
        { name: 'Quảng Cáo Facebook Ads', desc: 'Sáng tạo phễu thu hút lead đa tầng', href: '/dich-vu/quang-cao-facebook-ads' },
        { name: 'Quảng Cáo TikTok Ads', desc: 'Bùng nổ chiến dịch cùng video ngắn', href: '/dich-vu/quang-cao-tiktok-ads' }
      ]
    },
    {
      title: 'Content & Social Engine',
      services: [
        { name: 'Content Marketing Website', desc: 'Xây dựng topic cluster chuyên sâu, uy tín', href: '/dich-vu/content-marketing' },
        { name: 'Content Social', desc: 'Sáng tạo nội dung xu hướng thu hút fan', href: '/dich-vu/content-social' },
        { name: 'Vận Hành Social', desc: 'Quản lý fanpage, kênh TikTok chuyên nghiệp', href: '/dich-vu/van-hanh-social' }
      ]
    },
    {
      title: 'PR & Trust Building',
      services: [
        { name: 'PR Báo Chí Chính Thống', desc: 'Xây dựng uy tín, củng cố chỉ số EEAT', href: '/dich-vu/pr-bao-chi' },
        { name: 'Xây Kênh TikTok', desc: 'Chiến lược nội dung TikTok chuyên sâu', href: '/dich-vu/xay-dung-kenh-tiktok' },
        { name: 'Vận Hành Instagram', desc: 'Xây dựng thương hiệu trên Instagram', href: '/dich-vu/van-hanh-instagram' }
      ]
    }
  ];

  return (
    <header className="site-header sticky top-0 z-40 w-full bg-[#FAF9F6]/85 backdrop-blur-md border-b border-gold-200/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center border border-gold-300 group-hover:border-gold-500 transition-all overflow-hidden shadow-sm">
                <span className="font-display font-bold text-brand-dark text-lg">PGS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-brand-dark tracking-wide leading-none group-hover:text-gold-600 transition-colors">
                  PGS AGENCY
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gold-600 font-bold uppercase leading-none mt-1">
                  Growth System
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasMegaMenu) setActiveMegaMenu(item.megaMenuType!);
                }}
                onMouseLeave={() => {
                  if (item.hasMegaMenu) setActiveMegaMenu(null);
                }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                    item.hasMegaMenu && activeMegaMenu === item.megaMenuType
                      ? 'text-gold-600'
                      : 'text-brand-dark/80 hover:text-gold-600'
                  }`}
                >
                  {item.name}
                  {item.hasMegaMenu && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMegaMenu === item.megaMenuType ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Mega Menu Dropdown - Chỉ hiển thị cho Dịch Vụ */}
                {item.hasMegaMenu && activeMegaMenu === item.megaMenuType && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[920px] bg-white border border-gold-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200 z-50"
                    onMouseEnter={() => setActiveMegaMenu('dichvu')}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <div className="flex min-h-[380px]">
                      
                      {/* LEFT 20% - About Links */}
                      <div className="w-[20%] bg-[#1C1C1C] p-5 flex flex-col gap-4">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gold-400 uppercase">
                          Về PGS
                        </span>
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                          {aboutLinks.map((link) => {
                            const IconComp = link.icon;
                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="group/about block p-3 rounded-lg bg-white/5 hover:bg-gold-500/15 transition-all border border-transparent hover:border-gold-500/30"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover/about:bg-gold-500/20">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <span className="text-xs font-bold text-white group-hover/about:text-gold-400 transition-colors">
                                    {link.name}
                                  </span>
                                </div>
                                <p className="text-[10px] text-white/50 mt-1.5 leading-relaxed line-clamp-2">
                                  {link.desc}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="pt-3 border-t border-white/10">
                          <Link
                            href="/gioi-thieu"
                            className="text-[10px] font-mono font-bold text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1"
                          >
                            Xem tất cả <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* RIGHT 80% - Services */}
                      <div className="w-[80%] p-6 grid grid-cols-5 gap-5">
                        {serviceCategories.map((cat) => (
                          <div key={cat.title} className="space-y-3">
                            <h4 className="text-[10px] font-mono font-bold tracking-wider text-gold-600 uppercase border-b border-gold-200/50 pb-1.5">
                              {cat.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {cat.services.map((ser) => (
                                <li key={ser.name}>
                                  <Link
                                    href={ser.href}
                                    className="block p-2 rounded-lg hover:bg-gold-50/70 transition-colors group/item"
                                  >
                                    <span className="block text-xs font-semibold text-brand-dark group-hover/item:text-gold-600 transition-colors leading-tight">
                                      {ser.name}
                                    </span>
                                    <span className="block text-[10px] text-brand-muted mt-0.5 line-clamp-2 leading-relaxed">
                                      {ser.desc}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/lien-he"
              className="px-5 py-2.5 bg-brand-dark hover:bg-gold-500 text-white hover:text-brand-dark rounded-lg text-xs font-semibold transition-all duration-300 shadow-md flex items-center gap-2 group border border-brand-dark hover:border-gold-500"
            >
              Nhận tư vấn
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-dark hover:bg-gold-100/50 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold-200 bg-white overflow-y-auto max-h-[80vh]"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-brand-dark hover:bg-gold-50 hover:text-gold-600 transition-all"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile - Dịch vụ sub links */}
              <div className="pl-4 border-l-2 border-gold-200 space-y-2 mt-2">
                <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-wider px-3">
                  Danh mục dịch vụ
                </span>
                {serviceCategories.map((cat) => (
                  <div key={cat.title} className="space-y-1">
                    <span className="block text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider px-3 pt-2">
                      {cat.title}
                    </span>
                    {cat.services.map((ser) => (
                      <Link
                        key={ser.name}
                        href={ser.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-xs text-brand-muted hover:bg-gold-50 hover:text-gold-600 transition-all"
                      >
                        {ser.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mobile - About sub links */}
              <div className="pl-4 border-l-2 border-gold-200 space-y-2 mt-2">
                <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-wider px-3">
                  Về PGS
                </span>
                {aboutLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs text-brand-muted hover:bg-gold-50 hover:text-gold-600 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-gold-100 flex flex-col gap-3">
                <Link
                  href="/lien-he"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-brand-dark text-white rounded-lg text-center text-xs font-semibold hover:bg-gold-500 hover:text-brand-dark transition-colors"
                >
                  Nhận tư vấn ngay
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}