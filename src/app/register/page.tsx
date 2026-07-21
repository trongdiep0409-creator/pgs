'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DbStore } from '@/services/dbStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { ShieldCheck, Mail, User, Lock, AlertCircle, ArrowRight, Building } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [roleNote, setRoleNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const profiles = DbStore.getProfiles();
      
      // Check duplicate email
      if (profiles.some(p => p.email.toLowerCase() === email.toLowerCase())) {
        setErrorMsg('Email này đã được sử dụng. Vui lòng chọn email khác hoặc đăng nhập.');
        setIsSubmitting(false);
        return;
      }

      const newUserId = `u-${Math.random().toString(36).substring(7)}`;
      const newProfile = {
        id: newUserId,
        email: email.toLowerCase(),
        full_name: fullName,
        phone: '0901234567',
        account_status: 'pending_approval' as const,
        avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${fullName}`,
        created_at: new Date().toISOString()
      };

      // 1. Save profile with status pending_approval
      DbStore.saveProfiles([...profiles, newProfile]);

      // 2. Create Access Request entry for Super Admin
      DbStore.createAccessRequest({
        id: `req-${Math.random().toString(36).substring(7)}`,
        user_id: newUserId,
        requested_organization_name: orgName || 'Không xác định',
        requested_role_note: roleNote || 'Nhân viên mới',
        status: 'pending',
        created_at: new Date().toISOString()
      });

      // 3. Log Audit
      DbStore.addAuditLog({
        actor_id: newUserId,
        entity_type: 'auth',
        entity_id: newUserId,
        action: 'user_register_pending_approval',
        after_state: { email, orgName }
      });

      // 4. Login session and redirect to pending-approval page
      login(email);
      router.push('/pending-approval');
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background-cream flex items-center justify-center p-6 font-sans">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-3">
          <img
            src="/pgs-logo.png"
            alt="PGS Agency Logo"
            className="h-16 w-auto mx-auto object-contain drop-shadow-xs"
          />
          <h1 className="text-2xl font-bold font-space text-foreground">Đăng ký tài khoản PGS Hub</h1>
          <p className="text-xs text-muted-foreground">
            Tạo tài khoản mới. Hồ sơ của bạn sẽ được gửi tới Super Admin để xác nhận và phân quyền.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-xl bg-error/10 p-3.5 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Họ và tên *</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Email công việc *</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Tên Doanh nghiệp / Tổ chức</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Building className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="e.g. PGS Agency hoặc Công ty ABC"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Ghi chú vai trò đề xuất</label>
            <textarea
              rows={2}
              placeholder="e.g. Nhân viên Content Marketing mới tuyển dụng..."
              value={roleNote}
              onChange={(e) => setRoleNote(e.target.value)}
              className="block w-full rounded-xl border border-border bg-background p-3 text-xs outline-none focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !fullName || !email}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            ) : (
              <>
                <span>Gửi yêu cầu đăng ký</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-foreground font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </main>
  );
}
