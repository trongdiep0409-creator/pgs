-- PGS Hub Attendance & Timesheet Migration

CREATE TYPE attendance_type AS ENUM ('IN', 'OUT');
CREATE TYPE leave_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- ATTENDANCE LOGS TABLE (Server time strictly enforced)
CREATE TABLE IF NOT EXISTS public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  type attendance_type NOT NULL,
  ip_address TEXT,
  device_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LEAVE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status leave_status NOT NULL DEFAULT 'PENDING',
  approved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Attendance RLS Policies
CREATE POLICY "Users can see own attendance" ON public.attendance_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attendance" ON public.attendance_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Managers and Accountants can view all attendance" ON public.attendance_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT') AND status = 'ACTIVE'
    )
  );
