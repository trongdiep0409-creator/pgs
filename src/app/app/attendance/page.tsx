'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, AttendanceRecord } from '@/services/dbStore';
import { MapPin, Calendar, Clock, Send, Check, QrCode, X } from 'lucide-react';

export default function AttendancePage() {
  const { user, loading } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  // Geolocation states
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // QR check-in states
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);

  // Request form state
  const [reqType, setReqType] = useState('leave');
  const [reqReason, setReqReason] = useState('');
  const [reqDate, setReqDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
    }
  }, [user]);

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  const handleCheckIn = () => {
    setCheckingIn(true);
    setStatusMsg('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const office = DbStore.getOfficeLocations()[0];
        
        // simple distance math
        const rad = (x: number) => (x * Math.PI) / 180;
        const R = 6378137;
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
          notes: isInside ? 'Check-in thành công tại văn phòng.' : `Chấm công ngoài văn phòng (${Math.round(distance)}m).`,
          created_at: new Date().toISOString()
        };

        DbStore.checkIn(record);
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckingIn(false);
        setStatusMsg('Check-In thành công!');
      },
      () => {
        const record: AttendanceRecord = {
          id: Math.random().toString(36).substring(7),
          profile_id: user.id,
          check_in: new Date().toISOString(),
          location_type: 'remote',
          status: 'pending_manager_review',
          notes: 'Không thể truy cập GPS, check-in từ xa.',
          created_at: new Date().toISOString()
        };
        DbStore.checkIn(record);
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckingIn(false);
        setStatusMsg('Check-In thành công (Chế độ Remote)!');
      }
    );
  };

  const handleQrCheckInSimulate = () => {
    setQrScanning(true);
    setStatusMsg('');
    setTimeout(() => {
      const record: AttendanceRecord = {
        id: Math.random().toString(36).substring(7),
        profile_id: user.id,
        check_in: new Date().toISOString(),
        location_type: 'office',
        status: 'verified',
        notes: 'Chấm công thành công bằng cách quét Mã QR Động tại văn phòng.',
        created_at: new Date().toISOString()
      };
      
      DbStore.checkIn(record);
      setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
      setQrScanning(false);
      setShowQrModal(false);
      setStatusMsg('Chấm công bằng mã QR văn phòng thành công!');
    }, 1200);
  };

  const handleCheckOut = () => {
    setCheckingOut(true);
    setStatusMsg('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        DbStore.checkOut(user.id, new Date().toISOString(), latitude, longitude);
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckingOut(false);
        setStatusMsg('Check-Out thành công!');
      },
      () => {
        DbStore.checkOut(user.id, new Date().toISOString());
        setAttendance(DbStore.getAttendance().filter(a => a.profile_id === user.id));
        setCheckingOut(false);
        setStatusMsg('Check-Out thành công!');
      }
    );
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqReason || !reqDate) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReqReason('');
      setReqDate('');
      setStatusMsg('Đơn yêu cầu đã được gửi lên cấp quản lý.');
    }, 1200);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = attendance.find(a => a.check_in.startsWith(todayStr));

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground">Chấm công & Nghỉ phép</h1>
        <p className="text-xs text-muted-foreground">Theo dõi giờ công, gửi đơn xin nghỉ hoặc điểm danh bằng mã QR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Action Check In/Out & Requests */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Action Check In/Out */}
          <div className="border border-border bg-background rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-space text-foreground">Ghi nhận giờ làm việc hôm nay</h3>
            
            {statusMsg && (
              <div className="p-3 bg-success/10 border border-success/20 text-success rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>{statusMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCheckIn}
                  disabled={checkingIn || !!todayRecord}
                  className="w-full py-4 rounded-xl border border-primary bg-primary/5 hover:bg-primary text-black font-bold text-xs transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-1.5"
                >
                  <Clock className="h-5 w-5 text-primary-dark" />
                  <span>Check-In (GPS)</span>
                  {todayRecord && (
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Lúc: {new Date(todayRecord.check_in).toLocaleTimeString('vi-VN')}
                    </span>
                  )}
                </button>

                {!todayRecord && (
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="w-full py-2.5 rounded-xl border border-border bg-background-cream/45 hover:bg-background text-foreground font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="h-4 w-4 text-muted-foreground" />
                    <span>Quét mã QR Văn phòng</span>
                  </button>
                )}
              </div>

              <button
                onClick={handleCheckOut}
                disabled={checkingOut || !todayRecord || !!todayRecord.check_out}
                className="py-4 rounded-xl border border-border bg-background hover:bg-background-cream/45 text-foreground font-bold text-xs transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-1.5"
              >
                <LogOutIcon className="h-5 w-5 text-muted-foreground" />
                <span>Check-Out</span>
                {todayRecord?.check_out && (
                  <span className="text-[10px] text-muted-foreground font-normal">
                    Lúc: {new Date(todayRecord.check_out).toLocaleTimeString('vi-VN')}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Leave/OT/Adjustment request form */}
          <div className="border border-border bg-background rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-space text-foreground">Gửi đơn từ & Đề xuất</h3>
            
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Loại đề xuất</label>
                  <select
                    value={reqType}
                    onChange={(e) => setReqType(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="leave">Xin Nghỉ phép</option>
                    <option value="remote">Xin làm Remote</option>
                    <option value="overtime">Đăng ký Tăng ca (OT)</option>
                    <option value="adjustment">Yêu cầu bổ sung công</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Ngày áp dụng</label>
                  <input
                    type="date"
                    required
                    value={reqDate}
                    onChange={(e) => setReqDate(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Lý do chi tiết</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Lý do xin nghỉ, khung giờ làm việc tăng ca hoặc lý do quên check-in..."
                  value={reqReason}
                  onChange={(e) => setReqReason(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-3 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-primary hover:bg-primary-dark text-black font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>{submitted ? 'Đang gửi yêu cầu...' : 'Nộp Đề Xuất'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Attendance History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border bg-background rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-space text-foreground">Lịch sử chấm công gần đây</h3>
            
            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              {attendance.map((rec) => (
                <div key={rec.id} className="p-3 bg-background-cream/35 border border-border rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(rec.check_in).toLocaleDateString('vi-VN')}</span>
                    </span>
                    <span className={`px-2 py-0.5 border rounded-md uppercase text-[9px] font-bold ${
                      rec.status === 'verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-foreground font-bold">
                    <span>Vào: {new Date(rec.check_in).toLocaleTimeString('vi-VN')}</span>
                    <span>Ra: {rec.check_out ? new Date(rec.check_out).toLocaleTimeString('vi-VN') : '--:--'}</span>
                  </div>

                  <p className="text-[10px] text-muted-foreground leading-normal italic">{rec.notes}</p>
                </div>
              ))}

              {attendance.length === 0 && (
                <p className="text-center text-xs text-muted-foreground italic py-8">Chưa có bản ghi chấm công nào.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* QR CODE MODAL FOR OFFICE CHECK-IN */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowQrModal(false)} />
          
          <div className="relative bg-background border border-border rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-xl z-10 text-center font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-xs font-bold text-foreground font-space">Quét mã QR Văn phòng</span>
              <button onClick={() => setShowQrModal(false)} className="p-1 rounded-lg border border-border hover:bg-background-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* Mock QR graphic */}
              <div className="h-44 w-44 bg-background-cream border-2 border-primary rounded-2xl flex items-center justify-center relative p-3">
                <QrCode className="h-36 w-36 text-foreground" />
                <div className="absolute bg-background p-1.5 rounded-lg border border-border">
                  <div className="h-5 w-5 rounded bg-primary flex items-center justify-center font-bold text-[9px] text-black">P</div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                Đặt camera điện thoại khớp với mã QR động hiển thị trên máy tính bảng tại quầy lễ tân văn phòng PGS Agency.
              </p>
            </div>

            <button
              onClick={handleQrCheckInSimulate}
              disabled={qrScanning}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              {qrScanning ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  <QrCode className="h-4 w-4" />
                  <span>Mô phỏng Quét mã QR</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple internal icon
function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
