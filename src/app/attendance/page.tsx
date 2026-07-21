import { Clock, CalendarCheck, FileText, CheckCircle2, LogOut } from "lucide-react";
import { checkInAction, submitLeaveRequestAction } from "@/features/attendance/actions";
import { logoutAction } from "@/features/auth/actions";

export default function AttendancePage() {
  // Demo mock attendance logs for preview
  const todayLogs = [
    { id: "1", type: "IN", time: "08:15:22", date: "21/07/2026", status: "Đúng giờ" },
    { id: "2", type: "OUT", time: "17:30:10", date: "20/07/2026", status: "Hoàn thành" },
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
            <h1 className="font-bold text-text-main text-lg">PGS Hub — Chấm công & Bảng công</h1>
            <p className="text-xs text-text-muted">Ghi nhận giờ làm bằng Server Time & Đơn xin nghỉ phép</p>
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

      {/* Main Container */}
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Top Check-In Card */}
        <div className="bg-white rounded-card border border-primary/20 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 text-primary-dark justify-center md:justify-start">
              <Clock className="w-5 h-5" />
              <span className="font-semibold text-sm">Chấm công hôm nay (Server Time)</span>
            </div>
            <h2 className="text-2xl font-bold text-text-main">
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p className="text-xs text-text-muted">
              *Thời gian ghi nhận được bảo mật bởi thời gian chuẩn trên Server PostgreSQL.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <form action={checkInAction} className="flex-1 md:flex-initial">
              <input type="hidden" name="type" value="IN" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-text-main font-bold rounded-xl transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Vào ca (Check IN)
              </button>
            </form>

            <form action={checkInAction} className="flex-1 md:flex-initial">
              <input type="hidden" name="type" value="OUT" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-text-main font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                Tan ca (Check OUT)
              </button>
            </form>
          </div>
        </div>

        {/* Grid: Attendance Logs & Leave Request */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Logs Table */}
          <div className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-primary-dark" />
              <h3 className="font-bold text-text-main text-base">Lịch sử chấm công gần đây</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream text-text-muted text-xs uppercase font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-3 py-2">Loại</th>
                    <th className="px-3 py-2">Thời gian</th>
                    <th className="px-3 py-2">Ngày</th>
                    <th className="px-3 py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {todayLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-3 py-2.5 font-bold">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            log.type === "IN"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-mono">{log.time}</td>
                      <td className="px-3 py-2.5 text-text-muted">{log.date}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-emerald-700">
                        {log.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leave Request Form */}
          <div className="bg-white rounded-card border border-primary/20 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-dark" />
              <h3 className="font-bold text-text-main text-base">Tạo đơn xin nghỉ phép</h3>
            </div>

            <form action={submitLeaveRequestAction} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-main mb-1">
                    Từ ngày
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-main mb-1">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-main mb-1">
                  Lý do xin nghỉ
                </label>
                <textarea
                  name="reason"
                  rows={3}
                  required
                  placeholder="Nhập chi tiết lý do..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-dark text-text-main font-semibold rounded-xl transition-colors text-sm shadow-sm"
              >
                Gửi đơn xin nghỉ phép
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
