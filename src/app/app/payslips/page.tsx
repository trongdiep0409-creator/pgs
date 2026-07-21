'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, Payslip } from '@/services/dbStore';
import { FileText, Download, TrendingDown, DollarSign } from 'lucide-react';

export default function PayslipsPage() {
  const { user, userRole, loading } = useAuth();
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  useEffect(() => {
    if (user) {
      setPayslips(DbStore.getPayslips().filter(p => p.profile_id === user.id));
    }
  }, [user]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  const formatCurrency = (val: number) => {
    return val.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground">Phiếu lương Cá nhân</h1>
        <p className="text-xs text-muted-foreground">Xem chi tiết thu nhập, phụ cấp và các khoản khấu trừ lương hàng tháng.</p>
      </div>

      <div className="space-y-6">
        {payslips.map((slip) => (
          <div key={slip.id} className="border border-border bg-background rounded-2xl p-6 space-y-6 shadow-xs">
            
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-border pb-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground">Phiếu lương Tháng {new Date(slip.period).getMonth() + 1}/{new Date(slip.period).getFullYear()}</h3>
                <p className="text-[10px] text-muted-foreground">Mã phiếu: #PAY-{slip.id.toUpperCase()}</p>
              </div>

              <span className="text-[9px] font-bold px-2.5 py-0.5 border border-success/20 bg-success/10 text-success rounded-md uppercase tracking-wider">
                {slip.status === 'published' ? 'Đã phát hành' : 'Bản nháp'}
              </span>
            </div>

            {/* Calculations detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Lương căn bản</span>
                <p className="text-sm font-bold text-foreground font-space">{formatCurrency(slip.base_salary)}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Phụ cấp</span>
                <p className="text-sm font-bold text-foreground font-space">{formatCurrency(slip.allowances)}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">KPI & Thưởng</span>
                <p className="text-sm font-bold text-foreground font-space text-success">{formatCurrency(slip.kpi_bonus)}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Khấu trừ (Bảo hiểm/Phạt)</span>
                <p className="text-sm font-bold text-foreground font-space text-error">-{formatCurrency(slip.deductions)}</p>
              </div>
            </div>

            {/* Net salary total banner */}
            <div className="p-4 bg-background-cream/45 border border-border rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4.5 w-4.5 text-primary-dark" />
                <span className="text-xs font-bold text-foreground font-space">Thực nhận (Net Salary):</span>
              </div>
              <span className="text-base font-bold font-space text-primary-dark">{formatCurrency(slip.net_salary)}</span>
            </div>

            {/* Export action */}
            <div className="flex justify-end">
              <button
                onClick={() => alert('Đang tạo và tải bản PDF in phiếu lương...')}
                className="flex items-center gap-1.5 text-xs text-primary-dark font-bold hover:underline"
              >
                <Download className="h-4 w-4" />
                <span>Tải bảng lương PDF</span>
              </button>
            </div>
          </div>
        ))}

        {payslips.length === 0 && (
          <div className="py-12 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-background-cream/15">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="text-xs font-bold text-foreground">Chưa có phiếu lương</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Hệ thống chưa tạo phiếu lương cho chu kỳ hiện tại.</p>
          </div>
        )}
      </div>
    </div>
  );
}
