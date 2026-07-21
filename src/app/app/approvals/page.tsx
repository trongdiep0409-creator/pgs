'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, Deliverable } from '@/services/dbStore';
import { FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function GlobalApprovalsPage() {
  const { user, userRole, loading } = useAuth();
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);

  useEffect(() => {
    if (user) {
      // Find all deliverables that need review
      const all = DbStore.getDeliverables();
      if (['super_admin', 'admin', 'manager'].includes(userRole!)) {
        setDeliverables(all.filter(d => ['internal_review', 'ready_for_client', 'client_review'].includes(d.status)));
      } else {
        setDeliverables(all.filter(d => ['ready_for_client', 'client_review'].includes(d.status)));
      }
    }
  }, [user, userRole]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground">Duyệt sản phẩm bàn giao</h1>
        <p className="text-xs text-muted-foreground">Danh sách tất cả các hạng mục thiết kế, tài liệu đang chờ phê duyệt.</p>
      </div>

      <div className="border border-border rounded-2xl bg-background overflow-hidden p-6 space-y-4">
        <div className="divide-y divide-border">
          {deliverables.map((d) => (
            <div key={d.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
              <div>
                <h4 className="text-xs font-bold text-foreground">{d.title}</h4>
                <p className="text-[10px] text-muted-foreground">{d.description}</p>
                <span className="inline-block text-[9px] font-bold px-2 py-0.5 border border-warning/20 bg-warning/10 text-warning rounded-md uppercase tracking-wider mt-1">
                  {d.status}
                </span>
              </div>

              <Link
                href={`/app/projects/p1111111-1111-1111-1111-111111111111/approvals`}
                className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <span>Xử lý</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}

          {deliverables.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-background-cream/15 rounded-xl border border-dashed border-border">
              <FileCheck className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground italic">Không có hạng mục nào cần duyệt lúc này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
