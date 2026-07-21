'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Clock, LogOut, Mail, CheckCircle2 } from 'lucide-react';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <main className="min-h-screen bg-background-cream flex items-center justify-center p-6 font-sans">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-8 space-y-6 shadow-sm text-center">
        <img
          src="/pgs-logo.png"
          alt="PGS Agency Logo"
          className="h-16 w-auto mx-auto object-contain drop-shadow-xs mb-2"
        />

        <div className="h-16 w-16 bg-warning/10 border border-warning/20 rounded-2xl flex items-center justify-center mx-auto text-warning">
          <Clock className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold font-space text-foreground">Tài khoản đang chờ phân quyền</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tài khoản của bạn đã được khởi tạo và xác minh danh tính thành công. Vui lòng chờ Super Admin của PGS Agency duyệt và gán tổ chức/vai trò trước khi truy cập hệ thống.
          </p>
        </div>

        {user && (
          <div className="bg-background-cream/45 border border-border p-4 rounded-xl text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Email tài khoản:</span>
              <span className="font-bold text-foreground flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-primary-dark" />
                {user.email}
              </span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Trạng thái hồ sơ:</span>
              <span className="bg-warning/10 text-warning border border-warning/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                {user.account_status || 'pending_approval'}
              </span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Xác minh danh tính:</span>
              <span className="text-success font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Đã xác minh
              </span>
            </div>
          </div>
        )}

        <div className="p-3 bg-error/5 border border-error/10 rounded-xl text-[11px] text-error font-medium italic">
          * Đảm bảo an toàn bảo mật: Dữ liệu dự án, khách hàng và phòng ban sẽ chỉ hiển thị sau khi Super Admin hoàn tất phê duyệt.
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-background border border-border hover:bg-background-cream text-foreground font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>
    </main>
  );
}
