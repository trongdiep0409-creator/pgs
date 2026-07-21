'use client';

import React, { useState, useEffect } from 'react';
import { DbStore, Project } from '@/services/dbStore';
import { Award, CheckCircle2, ExternalLink, Search, Filter, Calendar, Users, Star, BarChart2, FolderCheck } from 'lucide-react';
import Link from 'next/link';

export default function CompletedProjectsPage() {
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');

  useEffect(() => {
    DbStore.initialize();
    const allProjects = DbStore.getProjects();
    // Filter completed or archived projects + high progress projects for portfolio showcase
    const done = allProjects.filter(p => p.status === 'completed' || p.progress >= 90 || p.status === 'active');
    setCompletedProjects(done);
  }, []);

  const serviceTypes = React.useMemo(() => Array.from(new Set(completedProjects.map(p => p.service_type))), [completedProjects]);

  const filtered = React.useMemo(() => {
    return completedProjects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesService = selectedService === 'all' || p.service_type === selectedService;
      return matchesSearch && matchesService;
    });
  }, [completedProjects, searchTerm, selectedService]);

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-primary-dark font-bold uppercase tracking-wider mb-1">
            <Award className="h-4 w-4" />
            <span>Portfolio & Case Studies</span>
          </div>
          <h1 className="text-2xl font-bold font-space text-foreground">Dự án đã triển khai thành công</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Tổng hợp các dự án Marketing, Branding, UI/UX và Performance Ads đã hoàn thành mang lại kết quả cao cho khách hàng PGS Agency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/projects"
            className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <FolderCheck className="h-4 w-4" />
            <span>Quản lý Tất cả Dự án</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-background border border-border rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tổng dự án hoàn thành</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-space text-foreground">{completedProjects.length}</span>
            <span className="text-xs text-success font-semibold bg-success/10 px-2 py-0.5 rounded">100% On-time</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Đã bàn giao đầy đủ nghiệm thu</p>
        </div>

        <div className="p-5 bg-background border border-border rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tỷ lệ hài lòng khách hàng</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-space text-foreground">98.5%</span>
            <div className="flex text-warning">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">Đánh giá trung bình 5/5 sao</p>
        </div>

        <div className="p-5 bg-background border border-border rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tăng trưởng KPI trung bình</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-space text-foreground">+240%</span>
            <span className="text-xs text-primary-dark font-semibold bg-primary/20 px-2 py-0.5 rounded">ROI Vượt kỳ vọng</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Dựa trên báo cáo hiệu suất Performance</p>
        </div>

        <div className="p-5 bg-background border border-border rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tổng ngân sách tối ưu</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-space text-foreground">3.2 tỷ VNĐ</span>
            <BarChart2 className="h-5 w-5 text-primary-dark" />
          </div>
          <p className="text-[11px] text-muted-foreground">Đã giải ngân và nghiệm thu hợp đồng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-background-cream/40 p-4 border border-border rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo tên dự án hoặc mã..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full sm:w-auto bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">Tất cả dịch vụ</option>
            {serviceTypes.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-background border border-border rounded-2xl p-6 space-y-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-success/10 text-success border border-success/20 text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Hoàn thành 100%</span>
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">{proj.code}</span>
              </div>

              <div>
                <h3 className="text-base font-bold font-space text-foreground hover:text-primary-dark transition-colors line-clamp-1">
                  {proj.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {proj.description || 'Dự án chiến lược được triển khai toàn diện bởi PGS Agency, mang lại hiệu quả nhận diện và doanh số ấn tượng.'}
                </p>
              </div>

              <div className="p-3 bg-background-cream/45 border border-border rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Dịch vụ:</span>
                  <span className="font-bold text-foreground">{proj.service_type}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Giá trị nghiệm thu:</span>
                  <span className="font-bold text-primary-dark">{proj.contract_value.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Thời gian hoàn tất:</span>
                  <span className="font-medium text-foreground">{proj.end_date}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>Client ABC Corp</span>
              </div>

              <Link
                href={`/app/projects/${proj.id}`}
                className="text-xs font-bold text-foreground hover:text-primary-dark flex items-center gap-1 hover:underline"
              >
                <span>Xem Hồ sơ Chi tiết</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
