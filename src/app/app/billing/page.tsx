'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, PaymentSchedule, Contract } from '@/services/dbStore';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function GlobalBillingPage() {
  const { user, userRole, loading } = useAuth();
  const [schedules, setSchedules] = useState<PaymentSchedule[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (user) {
      setContracts(DbStore.getContracts());
      setSchedules(DbStore.getPaymentSchedules());
    }
  }, [user]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  const formatCurrency = (val: number) => {
    return val.toLocaleString('vi-VN') + 'đ';
  };

  const getStatusBadge = (status: string) => {
    return status === 'paid' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20';
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground font-space">Hóa đơn & Thanh toán</h1>
        <p className="text-xs text-muted-foreground">Tổng hợp lịch thanh toán và đợt nghiệm thu các hợp đồng hiện hành.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
        <div className="divide-y divide-border">
          {schedules.map((s) => {
            const matchedC = contracts.find(c => c.id === s.contract_id);
            return (
              <div key={s.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h4 className="text-xs font-bold text-foreground">{s.milestone_name}</h4>
                  <p className="text-[10px] text-muted-foreground">
                    Hợp đồng: <span className="font-bold text-primary-dark">{matchedC?.contract_number || 'N/A'}</span> • Hạn: {new Date(s.due_date).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-bold text-foreground font-space">{formatCurrency(s.amount)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider ${getStatusBadge(s.status)}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
