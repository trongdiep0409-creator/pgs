'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Settings, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, userRole, loading, hasPermission } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (!hasPermission('view_admin_panel')) {
        // Redirection handled if they try to access direct URL
      }
    }
  }, [user, loading, router, hasPermission]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!hasPermission('view_admin_panel')) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-cream font-sans p-6 text-center">
        <ShieldAlert className="h-16 w-16 text-error mb-4" />
        <h1 className="text-xl font-bold font-space text-foreground">Bạn không có quyền truy cập</h1>
        <p className="text-xs text-muted-foreground mt-2 max-w-sm">
          Trang quản trị chỉ dành riêng cho Quản trị viên và Super Admin của PGS Agency.
        </p>
        <button
          onClick={() => router.replace('/app')}
          className="mt-6 flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-black px-5 py-2.5 text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại trang chủ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Admin Sidebar Navigation */}
      <aside className="w-[260px] border-r border-border bg-background-cream shrink-0 sticky top-0 h-screen hidden md:flex flex-col justify-between">
        <div className="flex flex-col flex-1">
          <div className="h-16 px-5 border-b border-border flex items-center gap-3">
            <img src="/pgs-logo.png" alt="PGS Agency Logo" className="h-9 w-auto max-w-[110px] object-contain" />
            <div className="flex flex-col">
              <span className="font-space font-bold tracking-tight text-sm text-foreground">PGS Admin</span>
              <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">Super Control</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold bg-foreground text-background shadow-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Thiết lập chung & Audit Log</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-border bg-background-cream/45">
          <button
            onClick={() => router.push('/app')}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="font-space font-bold text-lg text-foreground">Bảng Quản Trị Hệ Thống</h2>
          </div>
          <button
            onClick={() => router.push('/app')}
            className="md:hidden text-xs font-bold border border-border px-3 py-1.5 rounded-lg"
          >
            Quay lại Portal
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1440px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
