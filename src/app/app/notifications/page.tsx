'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, AppNotification } from '@/services/dbStore';
import { Bell, Check, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (user) {
      setNotifications(DbStore.getNotifications(user.id));
    }
  }, [user]);

  const handleMarkRead = (id: string, url?: string) => {
    DbStore.markNotificationRead(id);
    if (user) {
      setNotifications(DbStore.getNotifications(user.id));
    }
    if (url) {
      router.push(url);
    }
  };

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.is_read) {
        DbStore.markNotificationRead(n.id);
      }
    });
    if (user) {
      setNotifications(DbStore.getNotifications(user.id));
    }
  };

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  const unread = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-space text-foreground">Trung tâm thông báo</h1>
          <p className="text-xs text-muted-foreground">Theo dõi và cập nhật tất cả hoạt động, phê duyệt trong PGS Hub.</p>
        </div>
        {unread > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-primary-dark hover:underline flex items-center gap-1"
          >
            <Check className="h-4 w-4" />
            <span>Đánh dấu đã đọc tất cả</span>
          </button>
        )}
      </div>

      <div className="border border-border rounded-2xl bg-background overflow-hidden">
        <div className="divide-y divide-border">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id, n.link_url)}
              className={`p-4 hover:bg-background-cream/15 cursor-pointer transition-all flex gap-3 ${
                !n.is_read ? 'bg-background-cream/10 font-medium' : ''
              }`}
            >
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 ${!n.is_read ? 'bg-primary' : 'bg-transparent'}`} />
              <div className="flex-1 space-y-1">
                <p className="text-xs text-foreground font-bold">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.content}</p>
                <p className="text-[10px] text-muted-foreground/60">{new Date(n.created_at).toLocaleString('vi-VN')}</p>
              </div>
              {n.link_url && (
                <div className="shrink-0 flex items-center">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-xs text-muted-foreground italic">
              Không có thông báo nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
