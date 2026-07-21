'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, Project, Milestone, Contract, PaymentSchedule, FileMetadata, Organization, Profile } from '@/services/dbStore';
import { FolderKanban, Plus, Clock, Search, X, Check, FileText, AlertTriangle, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsListPage() {
  const { user, userRole, hasPermission } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal Form States
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [orgId, setOrgId] = useState('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'); // Default to ABC Org
  const [serviceType, setServiceType] = useState('Web Development');
  const [pmId, setPmId] = useState('22222222-2222-2222-2222-222222222222'); // Default Trần PM
  const [contractValue, setContractValue] = useState(50000000);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0]);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [description, setDescription] = useState('');

  // Dropdown lists
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pms, setPms] = useState<Profile[]>([]);

  useEffect(() => {
    setProjects(DbStore.getProjects());
    setOrganizations(DbStore.getOrganizations());
    setPms(DbStore.getProfiles().filter(p => p.email.includes('manager') || p.email.includes('admin')));
    
    // Auto-generate project code
    setCode(`PGS-WEB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  }, []);

  const handleCompleteProject = (projId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const list = DbStore.getProjects();
    const idx = list.findIndex(p => p.id === projId);
    if (idx !== -1) {
      list[idx].status = 'completed';
      list[idx].progress = 100;
      list[idx].actual_end_date = new Date().toISOString().split('T')[0];
      DbStore.updateProject(list[idx]);
      setProjects(DbStore.getProjects());

      if (user) {
        DbStore.addAuditLog({
          actor_id: user.id,
          organization_id: list[idx].organization_id,
          entity_type: 'project',
          entity_id: projId,
          action: 'complete_project',
          after_state: { status: 'completed', progress: 100 }
        });
      }

      alert('Dự án đã được đánh dấu HOÀN THÀNH! Đã tự động chuyển qua danh sách "Dự án đã triển khai".');
    }
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    const newProj: Project = {
      id: `p-${Math.random().toString(36).substring(7)}`,
      organization_id: orgId,
      code,
      name,
      service_type: serviceType,
      pm_id: pmId,
      start_date: startDate,
      end_date: endDate,
      status: 'draft',
      contract_value: contractValue,
      progress: 0,
      risk_level: riskLevel,
      description
    };

    // 1. Save new project
    const list = [...projects, newProj];
    DbStore.saveProjects(list);
    setProjects(list);

    // 2. Create 3 Default Milestones (Weights total 100%)
    const defaultMilestones: Milestone[] = [
      {
        id: `m-${Math.random().toString(36).substring(7)}`,
        project_id: newProj.id,
        name: 'Khảo sát & Kịch bản chiến lược',
        weight_percent: 20,
        completion_percent: 0,
        status: 'not_started'
      },
      {
        id: `m-${Math.random().toString(36).substring(7)}`,
        project_id: newProj.id,
        name: 'Thiết kế giao diện UI/UX',
        weight_percent: 30,
        completion_percent: 0,
        status: 'not_started'
      },
      {
        id: `m-${Math.random().toString(36).substring(7)}`,
        project_id: newProj.id,
        name: 'Lập trình & Kiểm thử bàn giao',
        weight_percent: 50,
        completion_percent: 0,
        status: 'not_started'
      }
    ];
    DbStore.saveMilestones([...DbStore.getMilestones(), ...defaultMilestones]);

    // 3. Create Draft Contract
    const newContract: Contract = {
      id: `c-${Math.random().toString(36).substring(7)}`,
      organization_id: orgId,
      project_id: newProj.id,
      contract_number: `HD-${code}`,
      title: `Hợp đồng cung cấp dịch vụ ${name}`,
      status: 'draft',
      value: contractValue,
      start_date: startDate,
      end_date: endDate,
      file_url: 'https://supabase.storage/contracts/draft_contract.pdf',
      created_at: new Date().toISOString()
    };
    const currentContracts = DbStore.getContracts();
    DbStore.saveContracts([...currentContracts, newContract]);

    // 4. Create 3 Payment Schedules (40% - 30% - 30%)
    const defaultSchedules: PaymentSchedule[] = [
      {
        id: `ps-${Math.random().toString(36).substring(7)}`,
        contract_id: newContract.id,
        milestone_name: 'Tạm ứng Đợt 1 (40% sau khi ký hợp đồng)',
        amount: Math.round(contractValue * 0.4),
        due_date: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
        status: 'upcoming'
      },
      {
        id: `ps-${Math.random().toString(36).substring(7)}`,
        contract_id: newContract.id,
        milestone_name: 'Thanh toán Đợt 2 (30% sau khi duyệt giao diện UI/UX)',
        amount: Math.round(contractValue * 0.3),
        due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        status: 'upcoming'
      },
      {
        id: `ps-${Math.random().toString(36).substring(7)}`,
        contract_id: newContract.id,
        milestone_name: 'Thanh toán Đợt 3 (30% khi nghiệm thu bàn giao)',
        amount: Math.round(contractValue * 0.3),
        due_date: endDate,
        status: 'upcoming'
      }
    ];
    const currentSchedules = DbStore.getPaymentSchedules();
    localStorage.setItem('pgs_payment_schedules', JSON.stringify([...currentSchedules, ...defaultSchedules]));

    // 5. Create default starter File
    const defaultFile: FileMetadata = {
      id: `f-${Math.random().toString(36).substring(7)}`,
      organization_id: orgId,
      project_id: newProj.id,
      name: 'ke_hoach_trien_khai_du_an.pdf',
      size_bytes: 1048576, // 1MB
      mime_type: 'application/pdf',
      storage_path: '/documents/ke_hoach_trien_khai_du_an.pdf',
      visibility: 'project_client',
      created_by: user?.id || pmId,
      is_deleted: false,
      created_at: new Date().toISOString()
    };
    DbStore.uploadFile(defaultFile);

    // 6. Log activity and audit trail
    DbStore.addAuditLog({
      actor_id: user?.id,
      organization_id: orgId,
      entity_type: 'project',
      entity_id: newProj.id,
      action: 'create_project_detailed',
      after_state: {
        project: newProj,
        milestonesCount: defaultMilestones.length,
        contractId: newContract.id,
        schedulesCount: defaultSchedules.length,
        initialFile: defaultFile.name
      }
    });

    // Close and reset
    setShowModal(false);
    setName('');
    setDescription('');
    setCode(`PGS-WEB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'draft':
        return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
      case 'on_hold':
      case 'awaiting_contract':
      case 'awaiting_deposit':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'client_blocked':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary-dark border-primary/20';
    }
  };

  const filteredProjects = React.useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold font-space text-foreground">Danh sách Dự án</h1>
          <p className="text-xs text-muted-foreground">Xem và quản lý tất cả các chiến dịch và dự án đang triển khai của bạn.</p>
        </div>

        {hasPermission('create_project') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-black px-4 py-2.5 text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Tạo dự án mới (Chi tiết)</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-background border border-border p-4 rounded-2xl shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo tên dự án hoặc mã (e.g. PGS-WEB)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-background-cream/40 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary transition-all"
          />
        </div>

        <div className="flex gap-2 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold text-foreground bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="draft">Bản nháp (Draft)</option>
            <option value="awaiting_contract">Chờ hợp đồng</option>
            <option value="awaiting_deposit">Chờ đặt cọc</option>
            <option value="active">Đang chạy (Active)</option>
            <option value="on_hold">Tạm dừng</option>
            <option value="client_blocked">Khách hàng chặn</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="border border-border bg-background rounded-2xl p-5 flex flex-col justify-between hover:border-primary transition-all hover:shadow-xs group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 border border-border rounded-md bg-background-cream text-foreground">
                  {proj.code}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wide ${getStatusBadge(proj.status)}`}>
                  {proj.status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground font-space line-clamp-1 group-hover:text-primary-dark transition-all">
                  <Link href={`/app/projects/${proj.id}`}>{proj.name}</Link>
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 min-h-[32px]">
                  {proj.description || 'Không có mô tả chi tiết cho dự án này.'}
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-bold text-foreground">
                  <span>Tiến độ thực tế (trọng số)</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground gap-2">
              <div className="flex items-center gap-1 shrink-0">
                <Clock className="h-3.5 w-3.5" />
                <span>Hạn: {new Date(proj.end_date).toLocaleDateString('vi-VN')}</span>
              </div>

              <div className="flex items-center gap-2">
                {proj.status !== 'completed' ? (
                  <button
                    onClick={(e) => handleCompleteProject(proj.id, e)}
                    title="Đẩy dự án qua danh sách Đã triển khai"
                    className="text-[11px] font-bold text-success bg-success/10 hover:bg-success/20 border border-success/30 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Hoàn thành</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-success bg-success/10 border border-success/20 px-2 py-1 rounded-lg flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>Đã triển khai</span>
                  </span>
                )}

                <Link
                  href={`/app/projects/${proj.id}`}
                  className="text-xs font-bold text-black bg-primary hover:bg-primary-dark px-3 py-1.5 rounded-lg transition-all shrink-0"
                >
                  Chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE DETAILED PROJECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-background border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl z-10 font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-base font-bold font-space text-foreground">Tạo dự án mới & Hồ sơ kèm theo</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg border border-border hover:bg-background-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Tên dự án</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Website Thương mại Điện tử ABC"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Mã dự án (Tự động/Tùy chỉnh)</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Khách hàng (Tổ chức)</label>
                  <select
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none cursor-pointer"
                  >
                    {organizations.map(o => (
                      <option key={o.id} value={o.id}>{o.brand_name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Dịch vụ cung cấp</label>
                  <input
                    type="text"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Project Manager phụ trách</label>
                  <select
                    value={pmId}
                    onChange={(e) => setPmId(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none cursor-pointer"
                  >
                    {pms.map(p => (
                      <option key={p.id} value={p.id}>{p.full_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Giá trị hợp đồng (VND)</label>
                  <input
                    type="number"
                    value={contractValue}
                    onChange={(e) => setContractValue(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Ngày kết thúc dự kiến</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Mức độ rủi ro</label>
                <div className="flex gap-4">
                  {(['low', 'medium', 'high'] as const).map(lvl => (
                    <label key={lvl} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="risk"
                        checked={riskLevel === lvl}
                        onChange={() => setRiskLevel(lvl)}
                        className="accent-primary"
                      />
                      <span className="capitalize">{lvl === 'low' ? 'Thấp' : lvl === 'medium' ? 'Trung bình' : 'Cao'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Mô tả / Phạm vi dự án</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-3 outline-none"
                  placeholder="Ghi chú phạm vi công việc..."
                />
              </div>

              {/* Detail on related files created automatically */}
              <div className="p-4 bg-background-cream/45 border border-border rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  Các hồ sơ tự động khởi tạo đi kèm:
                </span>
                <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>03 Milestones</strong> cốt lõi có tổng trọng số 100% để tính toán tiến độ.</li>
                  <li><strong>01 Hợp đồng bản nháp (Draft Contract)</strong> trị giá {contractValue.toLocaleString()}đ mang mã số <code className="bg-background px-1 rounded font-bold">HD-{code}</code>.</li>
                  <li><strong>Lịch trình thanh toán chia 3 đợt</strong> (40% tạm ứng, 30% sau UI/UX, 30% khi bàn giao).</li>
                  <li>Tài liệu đính kèm ban đầu: <code className="bg-background px-1 rounded font-bold">ke_hoach_trien_khai_du_an.pdf</code>.</li>
                  <li>Ghi nhận nhật ký <strong>Audit Log</strong> kiểm toán hệ thống.</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>Hoàn tất & Khởi tạo hồ sơ</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
