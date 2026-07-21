'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, AdsReport } from '@/services/dbStore';
import { BarChart3, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function GlobalAdsPage() {
  const { user, loading } = useAuth();
  const [reports, setReports] = useState<AdsReport[]>([]);

  useEffect(() => {
    if (user) {
      setReports(DbStore.getAdsReports());
    }
  }, [user]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground font-space">Hợp nhất chiến dịch quảng cáo</h1>
        <p className="text-xs text-muted-foreground">Theo dõi tổng chi tiêu ngân sách và tỷ lệ leads đa nền tảng.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="text-xs font-bold text-foreground">{report.title}</h3>
              <p className="text-[10px] text-muted-foreground">Chu kỳ: Tháng 07/2026 • Trạng thái: {report.data_status}</p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Chi tiêu</span>
                <h4 className="text-base font-bold font-space text-foreground mt-1">{report.spend.toLocaleString()}đ</h4>
              </div>
              <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Số Leads đạt</span>
                <h4 className="text-base font-bold font-space text-success mt-1">{report.leads} Leads</h4>
              </div>
              <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">CPL trung bình</span>
                <h4 className="text-base font-bold font-space text-warning mt-1">
                  {(Math.round(report.spend / report.leads)).toLocaleString()}đ
                </h4>
              </div>
              <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">CTR</span>
                <h4 className="text-base font-bold font-space text-primary-dark mt-1">
                  {((report.clicks / report.impressions) * 100).toFixed(2)}%
                </h4>
              </div>
            </div>

            {/* Chart */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={[
                    { name: 'Tuần 1', spend: 4000000, leads: 72 },
                    { name: 'Tuần 2', spend: 5600000, leads: 106 },
                    { name: 'Tuần 3', spend: 4800000, leads: 137 },
                    { name: 'Tuần 4', spend: report.spend - 14400000, leads: report.leads - 315 },
                  ]}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar yAxisId="left" dataKey="spend" name="Chi tiêu (VND)" fill="#FFC400" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="leads" name="Leads" stroke="#16803A" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="py-12 text-center text-xs text-muted-foreground italic">
            Chưa có báo cáo chiến dịch nào được đồng bộ.
          </div>
        )}
      </div>
    </div>
  );
}
