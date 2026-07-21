-- PGS Hub PostgreSQL / Supabase Schema Definition

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Custom Roles Enum
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'admin',
  'manager',
  'accountant',
  'employee',
  'client_owner',
  'client_member'
);

-- Define Project Status Enum
CREATE TYPE project_status AS ENUM (
  'draft',
  'awaiting_contract',
  'awaiting_deposit',
  'active',
  'on_hold',
  'client_blocked',
  'completed',
  'archived',
  'cancelled'
);

-- Define Task Status Enum
CREATE TYPE task_status AS ENUM (
  'backlog',
  'todo',
  'in_progress',
  'internal_review',
  'waiting_client',
  'revision_requested',
  'done',
  'cancelled'
);

-- Define Deliverable Status Enum
CREATE TYPE deliverable_status AS ENUM (
  'draft',
  'internal_review',
  'ready_for_client',
  'client_review',
  'revision_requested',
  'approved',
  'locked',
  'archived'
);

-- Define Contract Status Enum
CREATE TYPE contract_status AS ENUM (
  'draft',
  'internal_review',
  'approved_for_signing',
  'sent_to_client',
  'client_signed',
  'pgs_signed',
  'active',
  'expired',
  'terminated',
  'cancelled'
);

-- Define Payment Schedule Status Enum
CREATE TYPE payment_status AS ENUM (
  'upcoming',
  'due',
  'partially_paid',
  'paid',
  'overdue',
  'waived',
  'cancelled'
);

-- Define Attendance Status Enum
CREATE TYPE attendance_status AS ENUM (
  'recorded',
  'verified',
  'exception',
  'pending_manager_review',
  'approved',
  'rejected',
  'locked'
);

-- Define Payroll Run Status Enum
CREATE TYPE payroll_status AS ENUM (
  'draft',
  'calculating',
  'accountant_review',
  'management_approval',
  'locked',
  'published',
  'cancelled'
);

-- 1. Identity & Organizations
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  legal_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  tax_code TEXT,
  address TEXT,
  representative TEXT,
  email TEXT,
  phone TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  internal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE organization_members (
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (organization_id, profile_id)
);

CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects & Tasks
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  pm_id UUID REFERENCES profiles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  actual_end_date DATE,
  status project_status DEFAULT 'draft'::project_status NOT NULL,
  contract_value NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
  progress INTEGER DEFAULT 0 NOT NULL,
  risk_level TEXT DEFAULT 'low' NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE project_members (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (project_id, profile_id)
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  weight_percent INTEGER NOT NULL CHECK (weight_percent >= 0 AND weight_percent <= 100),
  completion_percent INTEGER DEFAULT 0 NOT NULL CHECK (completion_percent >= 0 AND completion_percent <= 100),
  status TEXT DEFAULT 'not_started' NOT NULL,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  assignee_id UUID REFERENCES profiles(id),
  reviewer_id UUID REFERENCES profiles(id),
  priority TEXT DEFAULT 'medium' NOT NULL,
  start_date DATE,
  deadline DATE,
  estimate_hours NUMERIC(6, 2),
  status task_status DEFAULT 'todo'::task_status NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE task_dependencies (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  depends_on_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, depends_on_task_id)
);

CREATE TABLE task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  visibility TEXT DEFAULT 'client_visible' NOT NULL, -- internal, client_visible, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Deliverables & Files
CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status deliverable_status DEFAULT 'draft'::deliverable_status NOT NULL,
  current_version INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE deliverable_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES profiles(id),
  assigned_approver_id UUID REFERENCES profiles(id),
  deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE approval_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  approval_request_id UUID REFERENCES approval_requests(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL, -- approved, revision_requested
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  visibility TEXT NOT NULL, -- project_client, project_internal, finance_private, hr_private
  created_by UUID REFERENCES profiles(id),
  is_deleted BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Contracts & Payments
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  contract_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status contract_status DEFAULT 'draft'::contract_status NOT NULL,
  value NUMERIC(15, 2) NOT NULL,
  start_date DATE,
  end_date DATE,
  file_url TEXT,
  signed_file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE contract_signers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  role_title TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  device_metadata TEXT,
  verification_method TEXT
);

CREATE TABLE payment_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  milestone_name TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  due_date DATE NOT NULL,
  status payment_status DEFAULT 'upcoming'::payment_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_schedule_id UUID REFERENCES payment_schedules(id) ON DELETE CASCADE,
  amount_paid NUMERIC(15, 2) NOT NULL,
  paid_date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  proof_file_url TEXT,
  notes TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Ads reporting
CREATE TABLE ads_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- meta, google, tiktok
  account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE ads_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  month_period DATE NOT NULL, -- e.g., '2026-07-01'
  spend NUMERIC(15, 2) NOT NULL,
  impressions BIGINT NOT NULL,
  clicks BIGINT NOT NULL,
  leads INTEGER NOT NULL,
  data_status TEXT DEFAULT 'provisional' NOT NULL, -- provisional, reviewed, published, locked
  analysis TEXT,
  next_actions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. HR & Attendance
CREATE TABLE office_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_meters DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  check_in TIMESTAMP WITH TIME ZONE NOT NULL,
  check_out TIMESTAMP WITH TIME ZONE,
  check_in_lat DOUBLE PRECISION,
  check_in_lng DOUBLE PRECISION,
  check_out_lat DOUBLE PRECISION,
  check_out_lng DOUBLE PRECISION,
  location_type TEXT NOT NULL, -- office, remote, meeting
  status attendance_status DEFAULT 'recorded'::attendance_status NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  period DATE NOT NULL, -- First day of the month
  base_salary NUMERIC(15, 2) NOT NULL,
  allowances NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
  kpi_bonus NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
  deductions NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
  net_salary NUMERIC(15, 2) NOT NULL,
  status TEXT NOT NULL, -- draft, published
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. System and logs
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL, -- info, action_required, deadline, approval, warning, success
  link_url TEXT,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  before_state JSONB,
  after_state JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
