"use client";

import { useState } from "react";
import {
  UserCheck,
  Shield,
  Building2,
  FolderKanban,
  Clock,
  LogOut,
  Check,
  X,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function AdminApprovalsPage() {
  const [activeTab, setActiveTab] = useState<"approvals" | "users">("approvals");

  // State quản lý danh sách duyệt tài khoản
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: "usr_1",
      fullName: "Trần Văn Bình",
      email: "binh.tv@pgsagency.vn",
      phone: "0987654321",
      createdAt: "2026-07-21 10:30",
      role: "EMPLOYEE",
    },
    {
      id: "usr_2",
      fullName: "Lê Thị Cúc",
      email: "cuc.lt@client-company.com",
      phone: "0912345678",
      createdAt: "2026-07-21 11:15",
      role: "CLIENT_OWNER",
    },
  ]);

  // State quản lý danh sách tài khoản đã duyệt & phân quyền
  const [activeUsers, setActiveUsers] = useState([
    {
      id: "usr_admin",
      fullName: "Bảo Admin (Super Admin)",
      email: "adminhbao@gmail.com",
      phone: "0900000000",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    {
      id: "usr_3",
      fullName: "Nguyễn Văn A (Manager)",
      email: "a.nguyen@pgsagency.vn",
      phone: "0911223344",
      role: "MANAGER",
      status: "ACTIVE",
    },
    {
      id: "usr_4",
      fullName: "Phạm Thị D (Accountant)",
      email: "d.pham@pgsagency.vn",
      phone: "0922334455",
      role: "ACCOUNTANT",
      status: "ACTIVE",
    },
  ]);

  // Hàm xử lý Phê duyệt
  const handleApprove = (user: typeof pendingUsers[0], selectedRole: string) => {
    setPendingUsers(pendingUsers.filter((u) => u.id !== user.id));
    setActiveUsers([
      ...activeUsers,
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: selectedRole,
        status: "ACTIVE",
      },
    ]);
  };

  // Hàm xử lý Từ chối
  const handleReject = (id: string) => {
    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
  };

  // Hàm thay đổi vai trò trực tiếp
  const handleRoleChange = (id: string, newRole: string) => {
    setActiveUsers(
      activeUsers.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation Header */}
      <header className="bg-white border-b border-primary/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-text-main font-bold">
            PGS
          </div>
          <div>
            <h1 className="font-bold text-text-main text-lg">PGS Hub — Super Admin Dashboard</h1>
            <p className="text-xs text-text-muted">Quản trị hệ thống, Phê duyệt & Phân quyền tài khoản</p>
          </div>
        </div>

        {/* Quick Module Switcher Navigation */}
        <div className="flex items-center gap-2 bg-cream p-1.5 rounded-xl border border-primary/20 text-xs font-semibold">
          <Link
            href="/admin/approvals"
            className="px-3 py-2 bg-primary text-text-main rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            Duyệt & Phân quyền
          </Link>
          <Link
            href="/admin/organizations"
            className="px-3 py-2 hover:bg-white text-text-muted rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" />
            Tổ chức & Workspace
          </Link>
          <Link
            href="/attendance"
            className="px-3 py-2 hover:bg-white text-text-muted rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            Chấm công
          </Link>
          <Link
            href="/projects"
            className="px-3 py-2 hover:bg-white text-text-muted rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FolderKanban className="w-4 h-4" />
            Dự án & Task
          </Link>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-text-main rounded-xl text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Đăng xuất
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Security Rule Card */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-card text-amber-900 text-sm flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Ràng buộc phân quyền Super Admin:</p>
            <p className="text-xs text-amber-800 mt-0.5">
              Chỉ duy nhất Super Admin (`adminhbao@gmail.com`) có quyền kích hoạt tài khoản và cấp các vai trò: <strong>Manager, Accountant, Employee, Client Owner, Client Member</strong>.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 gap-4">
          <button
            onClick={() => setActiveTab("approvals")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "approvals"
                ? "border-primary text-text-main"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Yêu cầu chờ duyệt ({pendingUsers.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-primary text-text-main"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Quản lý Phân quyền Tài khoản ({activeUsers.length})
          </button>
        </div>

        {/* Tab 1: Pending Approvals */}
        {activeTab === "approvals" && (
          <div className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary-dark" />
              Danh sách tài khoản đăng ký mới
            </h2>

            {pendingUsers.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">
                Hiện tại không có yêu cầu phê duyệt nào mới.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-cream text-text-muted text-xs uppercase font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3">Họ và tên</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Số điện thoại</th>
                      <th className="px-4 py-3">Phân vai trò cấp</th>
                      <th className="px-4 py-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-amber-50/20">
                        <td className="px-4 py-3 font-medium text-text-main">{u.fullName}</td>
                        <td className="px-4 py-3 text-text-muted">{u.email}</td>
                        <td className="px-4 py-3 text-text-muted">{u.phone}</td>
                        <td className="px-4 py-3">
                          <select
                            defaultValue={u.role}
                            id={`role-select-${u.id}`}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold focus:border-primary focus:outline-none bg-white"
                          >
                            <option value="EMPLOYEE">Employee (Nhân viên)</option>
                            <option value="MANAGER">Manager (Quản lý)</option>
                            <option value="ACCOUNTANT">Accountant (Kế toán)</option>
                            <option value="CLIENT_OWNER">Client Owner (Khách hàng)</option>
                            <option value="CLIENT_MEMBER">Client Member (Thành viên KH)</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              const sel = (document.getElementById(`role-select-${u.id}`) as HTMLSelectElement)?.value;
                              handleApprove(u, sel || u.role);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Phê duyệt & Cấp quyền
                          </button>
                          <button
                            onClick={() => handleReject(u.id)}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            Từ chối
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: User Permission Management */}
        {activeTab === "users" && (
          <div className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-dark" />
              Danh sách tài khoản đang hoạt động & Chỉnh sửa quyền
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream text-text-muted text-xs uppercase font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Họ và tên</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Vai trò hiện tại</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Cập nhật quyền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-amber-50/20">
                      <td className="px-4 py-3 font-medium text-text-main">{u.fullName}</td>
                      <td className="px-4 py-3 text-text-muted">{u.email}</td>
                      <td className="px-4 py-3 font-bold text-xs">
                        <span
                          className={`px-2.5 py-1 rounded-md ${
                            u.role === "SUPER_ADMIN"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : u.role === "MANAGER"
                              ? "bg-purple-100 text-purple-900"
                              : u.role === "ACCOUNTANT"
                              ? "bg-blue-100 text-blue-900"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                          ACTIVE
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {u.role === "SUPER_ADMIN" ? (
                          <span className="text-xs text-text-muted italic">Khóa (Tối cao)</span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold focus:border-primary focus:outline-none bg-white"
                          >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ACCOUNTANT">Accountant</option>
                            <option value="CLIENT_OWNER">Client Owner</option>
                            <option value="CLIENT_MEMBER">Client Member</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
