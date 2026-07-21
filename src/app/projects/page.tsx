import { FolderKanban, Plus, CheckCircle2, Lock, Eye, LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions";

export default function ProjectsPage() {
  // Demo mock projects & tasks for UI preview
  const projects = [
    {
      id: "prj_1",
      name: "Chiến dịch SEO Tổng Thể Q3",
      code: "SEO-Q3",
      clientName: "Tập đoàn Bất Động Sản Alpha",
      progress: 68,
      status: "Đang thực hiện",
      milestoneCount: 4,
    },
    {
      id: "prj_2",
      name: "Chạy Ads Meta & TikTok Food",
      code: "ADS-BETA",
      clientName: "Chuỗi Nhà Hàng Beta Food",
      progress: 40,
      status: "Đang thực hiện",
      milestoneCount: 3,
    },
  ];

  const tasks = [
    {
      id: "tsk_1",
      title: "Thiết kế Banner Quảng Cáo Meta Ads",
      projectName: "Chạy Ads Meta & TikTok Food",
      status: "IN_REVIEW",
      isInternal: false,
      assignee: "Nguyễn Văn A",
    },
    {
      id: "tsk_2",
      title: "Đối soát Chi Phí Kế Toán Nội Bộ",
      projectName: "Chiến dịch SEO Tổng Thể Q3",
      status: "IN_PROGRESS",
      isInternal: true,
      assignee: "Trần Thị B",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Header */}
      <header className="bg-white border-b border-primary/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-text-main font-bold">
            PGS
          </div>
          <div>
            <h1 className="font-bold text-text-main text-lg">PGS Hub — Quản lý Dự án & Task</h1>
            <p className="text-xs text-text-muted">Kanban Board, Tiến độ trọng số Milestone & Phê duyệt</p>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-main rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Projects List Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-main">Dự án Đang Hoạt Động</h2>
            <p className="text-sm text-text-muted">Tiến độ được tính theo trọng số Milestone chính xác</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-text-main font-semibold rounded-xl transition-colors text-sm shadow-sm">
            <Plus className="w-4 h-4" />
            Tạo Dự án Mới
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 bg-cream text-primary-dark text-xs font-mono font-bold rounded">
                    {p.code}
                  </span>
                  <h3 className="font-bold text-text-main text-lg">{p.name}</h3>
                  <p className="text-xs text-text-muted">Khách hàng: {p.clientName}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  {p.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-text-muted">Tiến độ Milestone</span>
                  <span className="text-text-main font-bold">{p.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tasks Section / Kanban Overview */}
        <div className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-primary-dark" />
              <h3 className="font-bold text-text-main text-lg">Danh sách Task công việc</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream text-text-muted text-xs uppercase font-medium border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Tên Task</th>
                  <th className="px-4 py-3">Dự án</th>
                  <th className="px-4 py-3">Người thực hiện</th>
                  <th className="px-4 py-3">Quyền xem</th>
                  <th className="px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-amber-50/20">
                    <td className="px-4 py-3 font-medium text-text-main">{t.title}</td>
                    <td className="px-4 py-3 text-text-muted">{t.projectName}</td>
                    <td className="px-4 py-3 text-text-muted">{t.assignee}</td>
                    <td className="px-4 py-3">
                      {t.isInternal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded border border-red-200">
                          <Lock className="w-3 h-3" />
                          Nội bộ PGS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-200">
                          <Eye className="w-3 h-3" />
                          Chia sẻ Khách hàng
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold text-xs">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
