'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground font-space">Cài đặt ứng dụng</h1>
        <p className="text-xs text-muted-foreground">Tùy chỉnh thông báo, bảo mật và thiết lập kết nối API PGS Hub.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-4 max-w-xl">
        <div className="p-4 rounded-xl bg-background-cream/45 border border-border">
          <p className="text-xs font-bold text-foreground mb-1">Môi trường ứng dụng</p>
          <p className="text-[10px] text-muted-foreground leading-normal">
            Ứng dụng hiện đang chạy chế độ Local Development. Toàn bộ cơ sở dữ liệu Postgres được lưu cục bộ trên trình duyệt để hỗ trợ thử nghiệm hoàn chỉnh không cần kết nối internet.
          </p>
        </div>
      </div>
    </div>
  );
}
