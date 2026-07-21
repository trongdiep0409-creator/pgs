'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, Profile } from '@/services/dbStore';
import { Users } from 'lucide-react';

export default function GlobalTeamPage() {
  const { user, loading } = useAuth();
  const [members, setMembers] = useState<Profile[]>([]);

  useEffect(() => {
    if (user) {
      setMembers(DbStore.getProfiles());
    }
  }, [user]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground font-space">Đội ngũ PGS Agency</h1>
        <p className="text-xs text-muted-foreground">Danh sách thành viên PGS Agency và người đại diện khách hàng tham gia.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((u) => (
            <div key={u.id} className="border border-border rounded-xl p-4 bg-background-cream/10 flex items-center gap-3">
              <img src={u.avatar_url} alt={u.full_name} className="h-10 w-10 rounded-lg bg-background-cream" />
              <div>
                <h4 className="text-xs font-bold text-foreground">{u.full_name}</h4>
                <p className="text-[10px] text-muted-foreground truncate w-40">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
