'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, AppNotification } from '@/services/dbStore';
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Building,
  User,
  ShieldCheck,
  CheckCircle,
  FileText,
  Award,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, currentOrg, userRole, organizations, selectWorkspace, logout, loading, hasPermission } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Periodically fetch notifications
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (user) {
      setNotifications(DbStore.getNotifications(user.id));
    }
  }, [user, loading, router]);

  const handleNotificationClick = (n: AppNotification) => {
    DbStore.markNotificationRead(n.id);
    if (user) {
      setNotifications(DbStore.getNotifications(user.id));
    }
    setNotificationsOpen(false);
    if (n.link_url) {
      router.push(n.link_url);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const navItems = [
    { label: 'Bảng điều khiển', href: '/app', icon: LayoutDashboard, permission: true },
    { label: 'Dự án & Task', href: '/app/projects', icon: FolderKanban, permission: true },
    { label: 'Dự án đã triển khai', href: '/app/portfolio', icon: Award, permission: true },
    { label: 'Tài nguyên PGS', href: '/app/resources', icon: BookOpen, permission: true },
    { label: 'Chấm công', href: '/app/attendance', icon: CalendarCheck, permission: true },
    { label: 'Phiếu lương', href: '/app/payslips', icon: CreditCard, permission: hasPermission('view_own_payroll') },
  ];

  // Mobile Bottom Nav items (Limit to 5)
  const mobileNavItems = navItems.filter(item => item.permission).slice(0, 4);

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Sidebar: Desktop Only */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-border bg-background-cream shrink-0 sticky top-0 h-screen">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-border flex items-center gap-3">
          <img src="/pgs-logo.png" alt="PGS Agency Logo" className="h-10 w-auto max-w-[120px] object-contain" />
          <div className="flex flex-col">
            <span className="font-space font-bold tracking-tight text-sm text-foreground">PGS Hub</span>
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">Agency Operations</span>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="p-4 border-b border-border">
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Không gian làm việc
          </label>
          <div className="relative flex items-center bg-background border border-border rounded-xl px-3 py-2.5 shadow-sm">
            <Building className="h-4 w-4 text-muted-foreground shrink-0 mr-2" />
            <select
              value={currentOrg?.id || ''}
              onChange={(e) => selectWorkspace(e.target.value)}
              className="w-full text-xs font-semibold text-foreground bg-transparent outline-none cursor-pointer pr-4 appearance-none"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.brand_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            if (!item.permission) return null;
            const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-black font-bold shadow-sm'
                    : 'text-muted-foreground hover:bg-background-cream/65 hover:text-foreground'
                }`}
              >
                <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-black' : 'text-muted-foreground'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Admin Panel button (only for Admin/Superadmin) */}
          {hasPermission('view_admin_panel') && (
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname.startsWith('/admin')
                  ? 'bg-foreground text-background font-bold shadow-sm'
                  : 'text-muted-foreground hover:bg-background-cream/65 hover:text-foreground'
              }`}
            >
              <Settings className="h-4.5 w-4.5 shrink-0" />
              <span>Quản trị (Admin)</span>
            </Link>
          )}
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-border flex flex-col gap-3.5 bg-background-cream/50">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg'}
              alt={user.full_name}
              className="h-10 w-10 rounded-xl bg-background border border-border"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-foreground truncate">{user.full_name}</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase">{userRole}</span>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:text-error hover:border-error/30 hover:bg-error/5 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Left: Menu trigger on mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-xl border border-border hover:bg-background-cream md:hidden"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <h2 className="font-space font-bold text-lg md:text-xl text-foreground">
              {currentOrg?.brand_name || 'PGS Hub'}
            </h2>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl border border-border hover:bg-background-cream/50 transition-all relative"
              >
                <Bell className="h-4.5 w-4.5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white font-bold rounded-full text-[9px] h-4 min-w-4 px-1 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-[320px] max-h-[420px] bg-background border border-border rounded-xl shadow-lg z-30 overflow-y-auto flex flex-col">
                  <div className="p-3 border-b border-border flex justify-between items-center bg-background-cream/40">
                    <span className="text-xs font-bold text-foreground font-space">Thông báo mới nhất</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-primary text-black font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} chưa đọc
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-border">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground">
                        Không có thông báo nào.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`w-full text-left p-3 hover:bg-background-cream/30 transition-all flex gap-2.5 ${
                            !n.is_read ? 'bg-background-cream/15 font-medium' : ''
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full shrink-0 mt-2 ${!n.is_read ? 'bg-primary' : 'bg-transparent'}`} />
                          <div className="space-y-1">
                            <p className="text-xs text-foreground font-bold leading-tight">{n.title}</p>
                            <p className="text-[11px] text-muted-foreground leading-snug">{n.content}</p>
                            <p className="text-[9px] text-muted-foreground/60">{new Date(n.created_at).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current user badge on top (Desktop Only) */}
            <div className="hidden sm:flex items-center gap-2 border border-border rounded-xl px-2.5 py-1.5 bg-background-cream/20">
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="h-6 w-6 rounded-lg bg-background border border-border"
              />
              <span className="text-xs font-bold text-foreground max-w-[120px] truncate">{user.full_name}</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1440px] mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Drawer (Sidebar on mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Content */}
          <div className="relative flex flex-col w-[260px] bg-background-cream border-r border-border h-full p-4 z-10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-xl border border-border hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 pb-6 border-b border-border mt-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold text-black font-space">
                P
              </div>
              <span className="font-space font-bold tracking-tight text-sm">PGS Hub</span>
            </div>

            {/* Switcher */}
            <div className="py-4">
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-2">Workspace</label>
              <select
                value={currentOrg?.id || ''}
                onChange={(e) => selectWorkspace(e.target.value)}
                className="w-full text-xs font-semibold text-foreground bg-background border border-border rounded-xl p-2"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.brand_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                if (!item.permission) return null;
                const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive ? 'bg-primary text-black font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {hasPermission('view_admin_panel') && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    pathname.startsWith('/admin') ? 'bg-foreground text-background font-bold' : 'text-muted-foreground'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Quản trị (Admin)</span>
                </Link>
              )}
            </nav>

            <div className="pt-4 border-t border-border flex items-center gap-3">
              <img src={user.avatar_url} alt={user.full_name} className="h-9 w-9 rounded-lg" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate">{user.full_name}</span>
                <span className="text-[9px] text-muted-foreground uppercase">{userRole}</span>
              </div>
            </div>
            
            <button
              onClick={() => logout()}
              className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:text-error hover:border-error"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Limit to 5 items including Profile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-30 flex items-center justify-around px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 transition-all ${
                isActive ? 'text-primary-dark font-semibold' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <span className="text-[9px] uppercase tracking-wider">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
        {/* Profile/Logout shortcut on mobile bottom bar */}
        <button
          onClick={() => {
            if (confirm('Đăng xuất khỏi hệ thống?')) logout();
          }}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1.5 text-muted-foreground"
        >
          <LogOut className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="text-[9px] uppercase tracking-wider">Thoát</span>
        </button>
      </div>
    </div>
  );
}
