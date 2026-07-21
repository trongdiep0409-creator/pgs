'use client';

import React, { useState, useEffect } from 'react';
import { DbStore, AccessRequest, Profile, Organization } from '@/services/dbStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { UserCheck, UserX, Clock, ShieldCheck, Mail, Building, Check, X, AlertCircle } from 'lucide-react';

export default function AccessRequestsPage() {
  const { user, userRole, hasPermission } = useAuth();
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);

  // Selected request for approval wizard
  const [selectedReq, setSelectedReq] = useState<AccessRequest | null>(null);
  const [targetOrgId, setTargetOrgId] = useState('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
  const [targetRole, setTargetRole] = useState('employee');

  // Reject modal state
  const [rejectReq, setRejectReq] = useState<AccessRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRequests(DbStore.getAccessRequests().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setProfiles(DbStore.getProfiles());
    setOrgs(DbStore.getOrganizations());
  };

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq || !user) return;

    DbStore.approveAccessRequest(selectedReq.id, user.id, targetOrgId, targetRole);
    setSelectedReq(null);
    loadData();
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReq || !user) return;

    DbStore.rejectAccessRequest(rejectReq.id, user.id, rejectReason || 'Không đủ điều kiện cấp quyền');
    setRejectReq(null);
    setRejectReason('');
    loadData();
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const reviewedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-space text-foreground">Phê duyệt Yêu cầu Truy cập (Access Requests)</h1>
          <p className="text-xs text-muted-foreground">Quản lý và duyệt phân quyền cho các tài khoản mới đăng ký tham gia hệ thống.</p>
        </div>
      </div>

      {/* Pending Requests List */}
      <div className="border border-border bg-background rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-space text-foreground flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-warning" />
            <span>Yêu cầu đang chờ Super Admin xử lý ({pendingRequests.length})</span>
          </h3>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-12 text-xs text-muted-foreground italic bg-background-cream/30 rounded-xl border border-dashed border-border">
            Không có yêu cầu đăng ký tài khoản nào đang chờ duyệt. Tất cả đều đã được xử lý.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {pendingRequests.map((req) => {
              const applicant = profiles.find(p => p.id === req.user_id);
              return (
                <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground font-space">{applicant?.full_name || 'Người dùng mới'}</span>
                      <span className="text-[10px] bg-warning/10 text-warning border border-warning/20 font-bold px-2 py-0.5 rounded uppercase">
                        Pending Approval
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-2">
                      <span>Email: <strong className="text-foreground">{applicant?.email}</strong></span>
                      <span>•</span>
                      <span>Đề xuất tổ chức: <strong className="text-foreground">{req.requested_organization_name}</strong></span>
                    </p>
                    {req.requested_role_note && (
                      <p className="text-[10px] text-muted-foreground italic bg-background-cream/40 p-2 rounded-lg border border-border">
                        Ghi chú: {req.requested_role_note}
                      </p>
                    )}
                    <span className="text-[9px] text-muted-foreground block">Gửi lúc: {new Date(req.created_at).toLocaleString('vi-VN')}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedReq(req)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Duyệt & Cấp quyền</span>
                    </button>
                    <button
                      onClick={() => setRejectReq(req)}
                      className="px-3 py-1.5 bg-background border border-border hover:bg-error/10 text-error font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <UserX className="h-4 w-4" />
                      <span>Từ chối</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History Reviewed Requests */}
      <div className="border border-border bg-background rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold font-space text-foreground">Lịch sử duyệt tài khoản gần đây</h3>
        <div className="divide-y divide-border max-h-[300px] overflow-y-auto pr-1">
          {reviewedRequests.map((req) => {
            const applicant = profiles.find(p => p.id === req.user_id);
            const reviewer = profiles.find(p => p.id === req.reviewed_by);
            return (
              <div key={req.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-foreground">{applicant?.full_name}</span> ({applicant?.email})
                  <span className="text-[10px] text-muted-foreground block">
                    Đã xử lý bởi: {reviewer?.full_name || 'Admin'} lúc {new Date(req.reviewed_at || req.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase ${
                  req.status === 'approved' ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'
                }`}>
                  {req.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* APPROVAL WIZARD MODAL */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setSelectedReq(null)} />
          
          <div className="relative bg-background border border-border rounded-2xl w-full max-w-md p-6 space-y-6 shadow-xl z-10 font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-xs font-bold text-foreground font-space">Phân quyền & Phê duyệt tài khoản</span>
              <button onClick={() => setSelectedReq(null)} className="p-1 rounded-lg border border-border hover:bg-background-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApproveSubmit} className="space-y-4">
              <div className="p-3 bg-background-cream/45 border border-border rounded-xl space-y-1 text-xs">
                <span className="font-bold text-foreground block">Thông tin ứng viên:</span>
                <p className="text-muted-foreground">Tên: <strong className="text-foreground">{profiles.find(p => p.id === selectedReq.user_id)?.full_name}</strong></p>
                <p className="text-muted-foreground">Email: <strong className="text-foreground">{profiles.find(p => p.id === selectedReq.user_id)?.email}</strong></p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Chọn Tổ chức (Workspace)</label>
                <select
                  value={targetOrgId}
                  onChange={(e) => setTargetOrgId(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary cursor-pointer"
                >
                  {orgs.map(o => (
                    <option key={o.id} value={o.id}>{o.brand_name} ({o.legal_name})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Gán Vai trò (Base Role)</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager / PM</option>
                  <option value="accountant">Accountant</option>
                  <option value="employee">Employee</option>
                  <option value="client_owner">Client Owner</option>
                  <option value="client_member">Client Member</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>Hoàn tất Duyệt & Kích hoạt Tài khoản</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setRejectReq(null)} />
          
          <div className="relative bg-background border border-border rounded-2xl w-full max-w-md p-6 space-y-6 shadow-xl z-10 font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-xs font-bold text-foreground font-space text-error">Từ chối Yêu cầu Truy cập</span>
              <button onClick={() => setRejectReq(null)} className="p-1 rounded-lg border border-border hover:bg-background-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Lý do từ chối (Ghi chú nội bộ)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ghi rõ lý do từ chối tài khoản này..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-3 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-error hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Xác nhận Từ chối
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
