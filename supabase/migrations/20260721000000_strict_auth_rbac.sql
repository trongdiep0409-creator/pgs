-- Migration: 20260721000000_strict_auth_rbac.sql
-- Description: Strict Auth, RBAC, Single Super Admin constraint, Pending Approval, and RLS policies

-- 1. Account Status Enum & Profile Updates
DO $$ BEGIN
    CREATE TYPE account_status_type AS ENUM (
        'pending_verification',
        'pending_approval',
        'active',
        'rejected',
        'suspended',
        'disabled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add account_status column to profiles if not present
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS account_status account_status_type DEFAULT 'active';

-- Update root admin and default admin profiles to active status
UPDATE public.profiles
SET account_status = 'active'
WHERE email IN ('adminbao@gmail.com', 'admin@pgs.demo', 'manager@pgs.demo', 'accountant@pgs.demo', 'employee@pgs.demo', 'owner@abc.demo', 'member@abc.demo');

-- 2. Access Requests Table
CREATE TABLE IF NOT EXISTS public.access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    requested_organization_name TEXT,
    requested_role_note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    internal_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on access_requests
CREATE INDEX IF NOT EXISTS idx_access_requests_status ON public.access_requests(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_user ON public.access_requests(user_id);

-- 3. SINGLE SUPER ADMIN GUARANTEE CONSTRAINT & TRIGGER
-- We create a function and trigger that strictly ensures ONLY ONE active super_admin exists across all organization memberships.

CREATE OR REPLACE FUNCTION check_single_super_admin()
RETURNS TRIGGER AS $$
DECLARE
    active_super_admin_count INT;
BEGIN
    -- Check for super_admin role assignment
    IF NEW.role = 'super_admin' AND (NEW.status IS NULL OR NEW.status = 'active') THEN
        SELECT COUNT(*)
        INTO active_super_admin_count
        FROM public.organization_members
        WHERE role = 'super_admin'
          AND (status IS NULL OR status = 'active')
          AND profile_id <> NEW.profile_id;

        IF active_super_admin_count > 0 THEN
            RAISE EXCEPTION 'Bảo mật: Chỉ được có duy nhất một tài khoản Super Admin hoạt động trên toàn hệ thống PGS Hub.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_single_super_admin_trigger ON public.organization_members;
CREATE TRIGGER enforce_single_super_admin_trigger
BEFORE INSERT OR UPDATE ON public.organization_members
FOR EACH ROW
EXECUTE FUNCTION check_single_super_admin();

-- 4. RLS POLICIES FOR SERVER-SIDE DATA ISOLATION

-- Enable RLS on core tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is active
CREATE OR REPLACE FUNCTION public.is_user_active(check_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    u_status account_status_type;
BEGIN
    SELECT account_status INTO u_status FROM public.profiles WHERE id = check_user_id;
    RETURN u_status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user belongs to an organization
CREATE OR REPLACE FUNCTION public.is_org_member(check_user_id UUID, check_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE profile_id = check_user_id
          AND organization_id = check_org_id
          AND (status IS NULL OR status = 'active')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE profile_id = check_user_id
          AND role = 'super_admin'
          AND (status IS NULL OR status = 'active')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policy: Organizations
DROP POLICY IF EXISTS org_select_policy ON public.organizations;
CREATE POLICY org_select_policy ON public.organizations
FOR SELECT USING (
    public.is_super_admin(auth.uid()) OR public.is_org_member(auth.uid(), id)
);

-- RLS Policy: Projects (Client A cannot see Client B)
DROP POLICY IF EXISTS projects_select_policy ON public.projects;
CREATE POLICY projects_select_policy ON public.projects
FOR SELECT USING (
    public.is_user_active(auth.uid()) AND (
        public.is_super_admin(auth.uid()) OR
        public.is_org_member(auth.uid(), organization_id)
    )
);

-- RLS Policy: Tasks (Restricted by project membership & organization)
DROP POLICY IF EXISTS tasks_select_policy ON public.tasks;
CREATE POLICY tasks_select_policy ON public.tasks
FOR SELECT USING (
    public.is_user_active(auth.uid()) AND (
        public.is_super_admin(auth.uid()) OR
        EXISTS (
            SELECT 1 FROM public.projects p
            WHERE p.id = project_id
              AND public.is_org_member(auth.uid(), p.organization_id)
        )
    )
);

-- RLS Policy: Access Requests (Super Admin full access, users see own)
DROP POLICY IF EXISTS access_requests_policy ON public.access_requests;
CREATE POLICY access_requests_policy ON public.access_requests
FOR ALL USING (
    public.is_super_admin(auth.uid()) OR user_id = auth.uid()
);
