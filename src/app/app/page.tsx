'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, Project, Task, Deliverable, PaymentSchedule, AttendanceRecord } from '@/services/dbStore';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  MapPin,
  FileText,
  DollarSign,
  ArrowRight,
  UserCheck,
  Users,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AppDashboard() {
  const router = useRouter();
  const { user, userRole, currentOrg, loading } = useAuth();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [schedules, setSchedules] = useState<PaymentSchedule[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  
  // Geolocation check-in state
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setProjects(DbStore.getProjects());
      setTasks(DbStore.getTasks());
      setDeliverables(DbStore.getDeliverables());
      setSchedules(DbStore.getPaymentSchedules());
      setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Check-in action for Employee / Manager
  const handleCheckIn = () => {
    setCheckingIn(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Office location coords
        const office = DbStore.getOfficeLocations()[0];
        
        // Simple distance calculation in meters
        const rad = (x: number) => (x * Math.PI) / 180;
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(latitude - office.latitude);
        const dLong = rad(longitude - office.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(rad(office.latitude)) * Math.cos(rad(latitude)) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        const isInside = distance <= office.radius_meters;

        const record: AttendanceRecord = {
          id: Math.random().toString(36).substring(7),
          profile_id: user.id,
          check_in: new Date().toISOString(),
          check_in_lat: latitude,
          check_in_lng: longitude,
          location_type: isInside ? 'office' : 'remote',
          status: isInside ? 'verified' : 'pending_manager_review',
          notes: isInside ? 'Chấm công tự động tại văn phòng.' : `Chấm công ngoài văn phòng (${Math.round(distance)}m).`,
          created_at: new Date().toISOString()
        };

        DbStore.checkIn(record);
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckInSuccess(true);
        setCheckingIn(false);
        setTimeout(() => setCheckInSuccess(false), 3000);
      },
      () => {
        // Fallback check-in (e.g. Denied GPS)
        const record: AttendanceRecord = {
          id: Math.random().toString(36).substring(7),
          profile_id: user.id,
          check_in: new Date().toISOString(),
          location_type: 'remote',
          status: 'pending_manager_review',
          notes: 'Không thể truy cập GPS, chấm công thủ công.',
          created_at: new Date().toISOString()
        };
        DbStore.checkIn(record);
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckInSuccess(true);
        setCheckingIn(false);
        setTimeout(() => setCheckInSuccess(false), 3000);
      }
    );
  };

  const isTodayCheckedIn = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.some(a => a.check_in.startsWith(today));
  };

  // Helper for status classes
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'verified':
      case 'done':
        return 'bg-success/10 text-success border-success/20';
      case 'in_progress':
      case 'client_review':
      case 'ready_for_client':
      case 'pending_manager_review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'client_blocked':
      case 'exception':
      case 'overdue':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-space text-foreground">Xin chào, {user.full_name}! 👋</h1>
          <p className="text-sm text-muted-foreground">Chào mừng bạn quay lại quản lý PGS Hub.</p>
        </div>
        <div className="text-xs font-semibold px-4 py-2 border border-border rounded-xl bg-background-cream text-foreground">
          Vai trò hiện tại: <span className="font-bold text-primary-dark uppercase">{userRole}</span>
        </div>
      </div>

      {/* PRIORITIZED SECTION: Cần bạn xử lý (Action Center) */}
      <section className="bg-background-cream/50 border border-border rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary-dark" />
          <h2 className="text-lg font-bold font-space text-foreground">Cần bạn xử lý</h2>
        </div>

        {/* Dynamic Action Tasks based on roles */}
        <div className="space-y-3">
          {/* CLIENT WORKFLOWS */}
          {['client_owner', 'client_member'].includes(userRole!) && (
            <>
              {deliverables.filter(d => ['ready_for_client', 'client_review'].includes(d.status)).map(d => (
                <div key={d.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-xl shadow-xs">
                  <div className="flex items-center gap-3">
                    <FileCheck className="h-5 w-5 text-warning shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{d.title}</h4>
                      <p className="text-[10px] text-muted-foreground">Deliverable mới cần phê duyệt</p>
                    </div>
                  </div>
                  <Link
                    href={`/app/projects/p1111111-1111-1111-1111-111111111111`}
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Xem & Duyệt</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}

              {deliverables.filter(d => ['ready_for_client', 'client_review'].includes(d.status)).length === 0 && (
                <p className="text-xs text-muted-foreground italic">Tuyệt vời! Không có deliverable nào đang chờ bạn duyệt.</p>
              )}
            </>
          )}

          {/* EMPLOYEE WORKFLOWS */}
          {userRole === 'employee' && (
            <>
              {/* Check in prompt */}
              {!isTodayCheckedIn() && (
                <div className="flex justify-between items-center p-4 bg-background border border-border rounded-xl shadow-xs">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary-dark shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Chấm công hôm nay</h4>
                      <p className="text-[10px] text-muted-foreground">Bạn chưa ghi nhận check-in ngày hôm nay</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckIn}
                    disabled={checkingIn}
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-4 py-2 rounded-lg transition-all"
                  >
                    {checkingIn ? 'Đang xác thực GPS...' : 'Check-In Ngay'}
                  </button>
                </div>
              )}

              {/* Task due/doing list */}
              {tasks.filter(t => t.status === 'in_progress').map(t => (
                <div key={t.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-xl shadow-xs">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-warning shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{t.title}</h4>
                      <p className="text-[10px] text-muted-foreground">Task đang thực hiện • Ưu tiên: {t.priority}</p>
                    </div>
                  </div>
                  <Link
                    href={`/app/projects/p1111111-1111-1111-1111-111111111111`}
                    className="text-xs font-semibold border border-border hover:bg-background-cream text-foreground px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Cập nhật</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </>
          )}

          {/* MANAGER WORKFLOWS */}
          {userRole === 'manager' && (
            <>
              {/* Internal review prompt */}
              {deliverables.filter(d => d.status === 'internal_review').map(d => (
                <div key={d.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-xl shadow-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-warning shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{d.title}</h4>
                      <p className="text-[10px] text-muted-foreground">Cần duyệt nội bộ trước khi gửi khách</p>
                    </div>
                  </div>
                  <Link
                    href={`/app/projects/p1111111-1111-1111-1111-111111111111`}
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Duyệt nội bộ</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}

              {deliverables.filter(d => d.status === 'internal_review').length === 0 && (
                <p className="text-xs text-muted-foreground italic">Không có yêu cầu duyệt nội bộ nào đang chờ.</p>
              )}
            </>
          )}

          {/* ACCOUNTANT WORKFLOWS */}
          {userRole === 'accountant' && (
            <>
              {schedules.filter(s => s.status === 'due' || s.status === 'upcoming').map(s => (
                <div key={s.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-xl shadow-xs">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-success shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{s.milestone_name}</h4>
                      <p className="text-[10px] text-muted-foreground">Đợt thanh toán sắp hạn • {s.amount.toLocaleString()}đ</p>
                    </div>
                  </div>
                  <Link
                    href={`/app/projects/p1111111-1111-1111-1111-111111111111`}
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Ghi nhận thu</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </>
          )}

          {/* SUPER ADMIN WORKFLOWS */}
          {userRole === 'super_admin' && (
            <div className="p-4 bg-background border border-border rounded-xl flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <div>
                <h4 className="text-xs font-bold text-foreground">Bạn đang đăng nhập với quyền tối cao</h4>
                <p className="text-[10px] text-muted-foreground">Tất cả chức năng hệ thống đều được hiển thị và hoạt động đầy đủ.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Grid for Dashboard Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Key Metrics & Projects (col-span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-primary-dark" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Dự án hoạt động</span>
                <h3 className="text-xl font-bold font-space text-foreground">{projects.length}</h3>
              </div>
            </div>

            <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Task Hoàn Thành</span>
                <h3 className="text-xl font-bold font-space text-foreground">
                  {tasks.filter(t => t.status === 'done').length}
                </h3>
              </div>
            </div>

            <div className="border border-border rounded-2xl p-5 bg-background shadow-xs flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Tỷ lệ chấm công</span>
                <h3 className="text-xl font-bold font-space text-foreground">
                  {isTodayCheckedIn() ? '100%' : 'Chưa Check-In'}
                </h3>
              </div>
            </div>
          </div>

          {/* Active Projects overview */}
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-space text-foreground">Dự án đang triển khai</h3>
              <Link href="/app/projects" className="text-xs font-semibold text-primary-dark hover:underline flex items-center gap-1">
                <span>Xem tất cả</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {projects.map((proj) => (
                <div key={proj.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-foreground font-space hover:underline">
                        <Link href={`/app/projects/${proj.id}`}>{proj.name}</Link>
                      </span>
                      <span className="text-[10px] font-mono border border-border px-1.5 py-0.5 rounded-md bg-background-cream">
                        {proj.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-full max-w-sm">
                      <div className="flex-1 bg-border h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${proj.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-foreground">{proj.progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-1 border rounded-lg uppercase tracking-wide ${getStatusBadge(proj.status)}`}>
                      {proj.status}
                    </span>
                    <Link
                      href={`/app/projects/${proj.id}`}
                      className="text-xs font-semibold border border-border hover:bg-background-cream/50 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Schedule & Quick Actions (col-span 4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Actions Card */}
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <h3 className="text-base font-bold font-space text-foreground">Thao tác nhanh</h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => router.push('/app/projects')}
                className="w-full text-left p-3.5 rounded-xl border border-border bg-background-cream/35 hover:bg-primary/10 hover:border-primary transition-all text-xs font-bold text-foreground flex justify-between items-center"
              >
                <span>Xem danh sách Task</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => router.push('/app/attendance')}
                className="w-full text-left p-3.5 rounded-xl border border-border bg-background-cream/35 hover:bg-primary/10 hover:border-primary transition-all text-xs font-bold text-foreground flex justify-between items-center"
              >
                <span>Gửi đơn nghỉ phép / tăng ca</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Quick Attendance Check status */}
          <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
            <h3 className="text-base font-bold font-space text-foreground">Chấm công hôm nay</h3>
            <div className="p-4 rounded-xl bg-background-cream/45 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-bold text-foreground">Văn phòng PGS Agency</p>
                  <p className="text-[10px] text-muted-foreground">Geofence: Bán kính 100m</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase ${isTodayCheckedIn() ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
                {isTodayCheckedIn() ? 'Đã Check' : 'Chưa Check'}
              </span>
            </div>
            {!isTodayCheckedIn() && (
              <button
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-black text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                {checkingIn ? 'Đang định vị...' : 'Chấm công bằng Geolocation'}
              </button>
            )}
            {checkInSuccess && (
              <p className="text-[10px] text-success font-semibold text-center mt-1">Chấm công đã được ghi nhận thành công!</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
