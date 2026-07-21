'use client';

import React, { useState, useEffect } from 'react';
import { DbStore, Organization, Profile, AuditLog } from '@/services/dbStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { Building, Users, ShieldAlert, History, RefreshCw, ChevronLeft, ChevronRight, Plus, X, User } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, userRole } = useAuth();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Filtering states
  const [actorFilter, setActorFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 6;

  // Add User Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('employee');
  const [newUserOrg, setNewUserOrg] = useState('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'); // PGS Agency

  useEffect(() => {
    setOrgs(DbStore.getOrganizations());
    setUsers(DbStore.getProfiles());
    setLogs(DbStore.getAuditLogs().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }, []);

  const handleRefreshLogs = () => {
    setLogs(DbStore.getAuditLogs().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setCurrentPage(1);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const currentProfiles = DbStore.getProfiles();
    
    // Check duplicate email
    if (currentProfiles.some(p => p.email.toLowerCase() === newUserEmail.toLowerCase())) {
      alert('Email này đã tồn tại trên hệ thống!');
      return;
    }

    const newUserId = `u-${Math.random().toString(36).substring(7)}`;
    const newProfile = {
      id: newUserId,
      email: newUserEmail.toLowerCase(),
      full_name: newUserName,
      phone: '0901234567',
      avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newUserName}`
    };

    // Save Profile
    const updatedProfiles = [...currentProfiles, newProfile];
    DbStore.saveProfiles(updatedProfiles);
    setUsers(updatedProfiles);

    // Save Member Organization Membership
    const currentMembers = DbStore.getMembers();
    const newMembership = {
      organization_id: newUserOrg,
      profile_id: newUserId,
      role: newUserRole
    };
    DbStore.saveMembers([...currentMembers, newMembership]);

    // Save Audit Log
    DbStore.addAuditLog({
      actor_id: user?.id,
      organization_id: newUserOrg,
      entity_type: 'auth',
      entity_id: newUserId,
      action: 'admin_create_and_assign_user',
      after_state: { email: newUserEmail, role: newUserRole }
    });

    // Reset and Refresh
    setNewUserName('');
    setNewUserEmail('');
    setShowAddForm(false);
    handleRefreshLogs();
  };

  // Filter implementation
  const filteredLogs = logs.filter(log => {
    const matchActor = actorFilter === 'all' || log.actor_id === actorFilter;
    const matchEntity = entityFilter === 'all' || log.entity_type === entityFilter;
    return matchActor && matchEntity;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / logsPerPage));
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Adjust page number if it exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredLogs.length, totalPages, currentPage]);

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-space text-foreground">Tổng quan Quản trị</h1>
          <p className="text-xs text-muted-foreground">Theo dõi tài nguyên hệ thống, danh sách doanh nghiệp và nhật ký hoạt động audit logs.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building className="h-5 w-5 text-primary-dark" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Doanh nghiệp khách hàng</span>
            <h3 className="text-lg font-bold font-space text-foreground">{orgs.length}</h3>
          </div>
        </div>

        <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-success" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Thành viên hệ thống</span>
            <h3 className="text-lg font-bold font-space text-foreground">{users.length}</h3>
          </div>
        </div>

        <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5 text-error" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Nhật ký Audit Logs</span>
            <h3 className="text-lg font-bold font-space text-foreground">{logs.length}</h3>
          </div>
        </div>
      </div>

      {/* Grid: Organizations list vs Audit Logs list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Orgs list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <h3 className="text-sm font-bold font-space text-foreground font-space">Danh sách Tổ chức</h3>
            
            <div className="divide-y divide-border">
              {orgs.map(o => (
                <div key={o.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{o.brand_name}</h4>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">{o.legal_name}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 border rounded-md ${o.is_active ? 'bg-success/10 text-success border-success/20' : 'bg-muted/10 text-muted border-border'}`}>
                    {o.is_active ? 'Hoạt động' : 'Tắt'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Management Section */}
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold font-space text-foreground font-space">Người dùng & Phân quyền</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="p-1 rounded-lg border border-border hover:bg-background-cream text-muted-foreground hover:text-foreground flex items-center gap-1 text-[10px] font-bold"
              >
                {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                <span>{showAddForm ? 'Hủy' : 'Thêm mới'}</span>
              </button>
            </div>

            {/* Inline Add User Form */}
            {showAddForm && (
              <form onSubmit={handleAddUserSubmit} className="p-3 bg-background-cream/45 border border-border rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-foreground uppercase tracking-wider block">Thêm tài khoản & Gán quyền</span>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-muted-foreground">Họ và tên</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-lg p-1.5 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-muted-foreground">Email đăng nhập</label>
                  <input
                    type="email"
                    required
                    placeholder="user@pgs.demo"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-lg p-1.5 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-semibold text-muted-foreground">Vai trò</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full text-[11px] bg-background border border-border rounded-lg p-1.5 outline-none"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager / PM</option>
                      <option value="accountant">Accountant</option>
                      <option value="employee">Employee</option>
                      <option value="client_owner">Client Owner</option>
                      <option value="client_member">Client Member</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-semibold text-muted-foreground">Tổ chức</label>
                    <select
                      value={newUserOrg}
                      onChange={(e) => setNewUserOrg(e.target.value)}
                      className="w-full text-[11px] bg-background border border-border rounded-lg p-1.5 outline-none"
                    >
                      <option value="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa">PGS Agency</option>
                      <option value="bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb">Công ty ABC</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-lg transition-all"
                >
                  Khởi tạo & Lưu
                </button>
              </form>
            )}

            <div className="divide-y divide-border max-h-[350px] overflow-y-auto pr-1">
              {users.map(u => (
                <div key={u.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.full_name} className="h-8 w-8 rounded-lg bg-background-cream shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">{u.full_name}</h4>
                    <p className="text-[9px] text-muted-foreground truncate">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Audit Logs list (Strict append-only, NO deletes from UI) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold font-space text-foreground flex items-center gap-2">
                <History className="h-4.5 w-4.5 text-muted-foreground" />
                <span>Nhật ký Audit Logs (Append-only)</span>
              </h3>
              <button
                onClick={handleRefreshLogs}
                className="p-1.5 rounded-lg border border-border hover:bg-background-cream"
              >
                <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-[10px] text-error font-medium leading-relaxed italic bg-error/5 border border-error/10 p-3 rounded-xl">
              * Bảo mật: Nhật ký Audit logs là cơ sở dữ liệu append-only phục vụ đối soát bảo mật. Không có nút xóa từ giao diện người dùng.
            </p>

            {/* Filter Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-background-cream/35 border border-border p-3 rounded-xl">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Người thực hiện</label>
                <select
                  value={actorFilter}
                  onChange={(e) => { setActorFilter(e.target.value); setCurrentPage(1); }}
                  className="w-full text-[11px] bg-background border border-border rounded-lg p-1.5 outline-none"
                >
                  <option value="all">Tất cả người dùng</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.full_name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Loại tài nguyên</label>
                <select
                  value={entityFilter}
                  onChange={(e) => { setEntityFilter(e.target.value); setCurrentPage(1); }}
                  className="w-full text-[11px] bg-background border border-border rounded-lg p-1.5 outline-none"
                >
                  <option value="all">Tất cả tài nguyên</option>
                  <option value="project">Dự án (Project)</option>
                  <option value="task">Công việc (Task)</option>
                  <option value="contract">Hợp đồng (Contract)</option>
                  <option value="auth">Xác thực (Auth)</option>
                </select>
              </div>
            </div>

            {/* Audit Logs list */}
            <div className="divide-y divide-border min-h-[300px]">
              {currentLogs.map((log) => {
                const actor = users.find(u => u.id === log.actor_id);
                return (
                  <div key={log.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span className="font-bold text-foreground">{actor?.full_name || 'Hệ thống / Khách'}</span>
                      <span>{new Date(log.created_at).toLocaleTimeString('vi-VN')} {new Date(log.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <p className="text-xs text-foreground font-mono text-[11px] leading-relaxed">
                      Phạm vi: <span className="font-bold uppercase text-primary-dark">{log.entity_type}</span> • Hành động: <span className="font-semibold text-foreground">{log.action}</span>
                    </p>
                    {log.after_state && (
                      <pre className="text-[9px] bg-background-cream/40 border border-border p-2 rounded-lg overflow-x-auto max-w-full font-mono">
                        {JSON.stringify(log.after_state, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              })}

              {currentLogs.length === 0 && (
                <p className="py-12 text-center text-xs text-muted-foreground italic">Không tìm thấy nhật ký kiểm toán phù hợp bộ lọc.</p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-3 border-t border-border text-xs text-muted-foreground">
                <span>Trang {currentPage} / {totalPages} ({filteredLogs.length} logs)</span>
                <div className="flex gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1 border border-border rounded-lg bg-background hover:bg-background-cream disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-1 border border-border rounded-lg bg-background hover:bg-background-cream disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
