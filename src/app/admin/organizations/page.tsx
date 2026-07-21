import { Building2, Plus, Users, ShieldCheck, LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions";

export default function AdminOrganizationsPage() {
  // Demo mock organizations when Supabase is not connected
  const organizations = [
    {
      id: "org_pgs",
      name: "PGS Agency",
      code: "PGS",
      isInternal: true,
      memberCount: 25,
      createdAt: "2026-01-01",
    },
    {
      id: "org_client_a",
      name: "Tập đoàn Bất Động Sản Alpha",
      code: "ALPHA",
      isInternal: false,
      memberCount: 4,
      createdAt: "2026-03-15",
    },
    {
      id: "org_client_b",
      name: "Chuỗi Nhà Hàng Beta Food",
      code: "BETAFOOD",
      isInternal: false,
      memberCount: 2,
      createdAt: "2026-05-10",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Bar */}
      <header className="bg-white border-b border-primary/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-text-main font-bold">
            PGS
          </div>
          <div>
            <h1 className="font-bold text-text-main text-lg">PGS Hub — Quản lý Tổ chức & Khách hàng</h1>
            <p className="text-xs text-text-muted">Quản lý các workspace nội bộ và doanh nghiệp khách hàng</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin/approvals"
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-sm font-medium transition-colors"
          >
            Duyệt tài khoản
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-main rounded-xl text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-main">Danh sách Tổ chức & Doanh nghiệp</h2>
            <p className="text-sm text-text-muted">Cách ly dữ liệu dự án giữa các doanh nghiệp khách hàng (Multi-Tenant)</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-text-main font-semibold rounded-xl transition-colors text-sm shadow-sm">
            <Plus className="w-4 h-4" />
            Tạo Tổ chức / Khách hàng mới
          </button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {org.isInternal && (
                <div className="absolute top-0 right-0 bg-primary text-text-main text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Nội bộ PGS
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-primary-dark shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-base line-clamp-1">{org.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-text-muted text-xs font-mono rounded">
                    Mã: {org.code}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary-dark" />
                  <span>{org.memberCount} Thành viên</span>
                </div>
                <span>Tạo: {org.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
