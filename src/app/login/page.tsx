'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore } from '@/services/dbStore';
import { ShieldCheck, Mail, Lock, Phone, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [authMethod, setAuthMethod] = useState<'password' | 'phone_otp' | 'google'>('password');
  const [email, setEmail] = useState('adminbao@gmail.com');
  const [password, setPassword] = useState('adminbao@gmail.com');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Auto initialize DbStore if needed
      DbStore.initialize();
      const profiles = DbStore.getProfiles();
      const matchedProfile = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());

      if (!matchedProfile) {
        setErrorMsg('Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại.');
        setIsLoading(false);
        return;
      }

      // Check root admin password or default mock password
      if (password !== email && password !== 'adminbao@gmail.com' && password.length < 6) {
        setErrorMsg('Mật khẩu không chính xác.');
        setIsLoading(false);
        return;
      }

      const success = login(matchedProfile.email);
      if (success) {
        if (matchedProfile.account_status === 'pending_approval') {
          router.replace('/pending-approval');
        } else if (matchedProfile.email === 'adminbao@gmail.com') {
          router.replace('/admin/access-requests');
        } else {
          router.replace('/app');
        }
      } else {
        setErrorMsg('Đăng nhập không thành công.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '123456' && otpCode !== '000000') {
      setErrorMsg('Mã OTP không đúng. Vui lòng nhập mã thử nghiệm: 123456');
      return;
    }

    DbStore.initialize();
    const profiles = DbStore.getProfiles();
    const matched = profiles.find(p => p.phone === phone) || profiles[0]; // fallback to admin profile for demo

    const success = login(matched.email);
    if (success) {
      if (matched.account_status === 'pending_approval') {
        router.replace('/pending-approval');
      } else {
        router.replace('/app');
      }
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      DbStore.initialize();
      const profiles = DbStore.getProfiles();
      const matched = profiles.find(p => p.email === 'adminbao@gmail.com') || profiles[0];
      login(matched.email);
      router.replace('/app');
    }, 600);
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
          <h1 className="text-2xl font-bold font-space text-foreground">Đăng nhập PGS Hub</h1>
          <p className="text-xs text-muted-foreground">
            Hệ thống quản trị vận hành nội bộ & Cổng thông tin khách hàng PGS Agency
          </p>
        </div>

        {/* Tab switch method */}
        <div className="flex bg-background-cream/60 border border-border p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthMethod('password'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${authMethod === 'password' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            Email & Mật khẩu
          </button>
          <button
            type="button"
            onClick={() => { setAuthMethod('phone_otp'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${authMethod === 'phone_otp' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            Số điện thoại (OTP)
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-xl bg-error/10 p-3.5 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {authMethod === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Email đăng nhập *</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="adminbao@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Mật khẩu *</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  <span>Đăng nhập ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {authMethod === 'phone_otp' && (
          <div className="space-y-4">
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Số điện thoại đăng ký</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. 0988888888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Gửi mã OTP xác nhận
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-success/10 border border-success/20 rounded-xl text-xs text-success font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mã OTP đã được gửi đến số {phone}. (Mã thử nghiệm: 123456)</span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Mã OTP (6 chữ số)</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="block w-full text-center tracking-widest text-base font-bold rounded-xl border border-border bg-background py-2.5 outline-none focus:border-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Xác nhận & Đăng nhập
                </button>
              </form>
            )}
          </div>
        )}

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-border w-full" />
          <span className="bg-background px-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider shrink-0">
            Hoặc
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 bg-background border border-border hover:bg-background-cream text-foreground font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Đăng nhập với Google</span>
        </button>

        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-foreground font-bold hover:underline">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </main>
  );
}
