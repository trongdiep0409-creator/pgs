'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { User, Mail, Shield, Phone } from 'lucide-react';

export default function ProfilePage() {
  const { user, userRole, currentOrg, loading } = useAuth();

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground">Hồ sơ cá nhân</h1>
        <p className="text-xs text-muted-foreground">Thông tin cá nhân và vai trò công tác của bạn tại PGS Agency.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-6 max-w-xl shadow-xs">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <img
            src={user.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg'}
            alt={user.full_name}
            className="h-16 w-16 rounded-2xl bg-background-cream border border-border"
          />
          <div>
            <h3 className="text-sm font-bold text-foreground">{user.full_name}</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 border border-primary/20 bg-primary/10 text-primary-dark rounded-md uppercase tracking-wider mt-1 inline-block">
              {userRole}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <Mail className="h-4.5 w-4.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Email liên hệ</p>
              <p className="text-xs text-foreground font-medium mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Phone className="h-4.5 w-4.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Số điện thoại</p>
              <p className="text-xs text-foreground font-medium mt-0.5">{user.phone || 'Chưa cập nhật'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Shield className="h-4.5 w-4.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Không gian làm việc đang chọn</p>
              <p className="text-xs text-foreground font-bold mt-0.5">{currentOrg?.brand_name || 'Không có'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
