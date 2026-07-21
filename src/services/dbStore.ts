// Database Service Layer & LocalStorage State Store for PGS Hub
// This acts as our repository to abstract backend logic, allowing easy transition between Supabase & local mock storage.

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  account_status?: 'pending_verification' | 'pending_approval' | 'active' | 'rejected' | 'suspended' | 'disabled';
  created_at?: string;
}

export interface AccessRequest {
  id: string;
  user_id: string;
  requested_organization_name?: string;
  requested_role_note?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reviewed_by?: string;
  reviewed_at?: string;
  internal_reason?: string;
  created_at: string;
}

export interface Organization {
  id: string;
  legal_name: string;
  brand_name: string;
  tax_code?: string;
  address?: string;
  representative?: string;
  email?: string;
  phone?: string;
  logo_url?: string;
  is_active: boolean;
  internal_notes?: string;
}

export interface OrganizationMember {
  organization_id: string;
  profile_id: string;
  role: string;
}

export interface Project {
  id: string;
  organization_id: string;
  code: string;
  name: string;
  service_type: string;
  pm_id: string;
  start_date: string;
  end_date: string;
  actual_end_date?: string;
  status: 'draft' | 'awaiting_contract' | 'awaiting_deposit' | 'active' | 'on_hold' | 'client_blocked' | 'completed' | 'archived' | 'cancelled';
  contract_value: number;
  progress: number;
  risk_level: 'low' | 'medium' | 'high';
  description?: string;
  parent_id?: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  name: string;
  weight_percent: number;
  completion_percent: number;
  status: 'not_started' | 'in_progress' | 'waiting_internal' | 'waiting_client' | 'blocked' | 'completed';
  due_date?: string;
}

export interface Task {
  id: string;
  project_id: string;
  milestone_id?: string;
  title: string;
  description?: string;
  assignee_id?: string;
  reviewer_id?: string;
  priority: 'low' | 'medium' | 'high';
  start_date?: string;
  deadline?: string;
  estimate_hours?: number;
  status: 'backlog' | 'todo' | 'in_progress' | 'internal_review' | 'waiting_client' | 'revision_requested' | 'done' | 'cancelled';
  completed_at?: string;
  completed_by?: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  profile_id: string;
  content: string;
  visibility: 'internal' | 'project_members' | 'client_visible' | 'private';
  created_at: string;
}

export interface Deliverable {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'draft' | 'internal_review' | 'ready_for_client' | 'client_review' | 'revision_requested' | 'approved' | 'locked' | 'archived';
  current_version: number;
  created_at: string;
}

export interface DeliverableVersion {
  id: string;
  deliverable_id: string;
  version: number;
  file_url: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface ApprovalRequest {
  id: string;
  deliverable_id: string;
  requested_by: string;
  assigned_approver_id: string;
  deadline?: string;
  created_at: string;
}

export interface ApprovalEvent {
  id: string;
  approval_request_id: string;
  actor_id: string;
  action: 'approved' | 'revision_requested';
  comments?: string;
  created_at: string;
}

export interface FileMetadata {
  id: string;
  organization_id: string;
  project_id?: string;
  name: string;
  size_bytes: number;
  mime_type: string;
  storage_path: string;
  visibility: 'project_client' | 'project_internal' | 'finance_private' | 'hr_private' | 'user_private';
  created_by: string;
  is_deleted: boolean;
  created_at: string;
}

export interface Contract {
  id: string;
  organization_id: string;
  project_id?: string;
  contract_number: string;
  title: string;
  status: 'draft' | 'internal_review' | 'approved_for_signing' | 'sent_to_client' | 'client_signed' | 'pgs_signed' | 'active' | 'expired' | 'terminated' | 'cancelled';
  value: number;
  start_date?: string;
  end_date?: string;
  file_url?: string;
  signed_file_url?: string;
  created_at: string;
}

export interface ContractSigner {
  id: string;
  contract_id: string;
  profile_id?: string;
  role_title: string;
  signed_at?: string;
  ip_address?: string;
  device_metadata?: string;
  verification_method?: string;
}

export interface PaymentSchedule {
  id: string;
  contract_id: string;
  milestone_name: string;
  amount: number;
  due_date: string;
  status: 'upcoming' | 'due' | 'partially_paid' | 'paid' | 'overdue' | 'waived' | 'cancelled';
}

export interface Payment {
  id: string;
  payment_schedule_id: string;
  amount_paid: number;
  paid_date: string;
  payment_method: string;
  proof_file_url?: string;
  notes?: string;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}

export interface AdsConnection {
  id: string;
  organization_id: string;
  platform: 'meta' | 'google' | 'tiktok';
  account_id: string;
  account_name: string;
  is_active: boolean;
}

export interface AdsReport {
  id: string;
  project_id: string;
  title: string;
  month_period: string; // YYYY-MM-DD
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  data_status: 'draft' | 'syncing' | 'ready_for_review' | 'reviewed' | 'published' | 'locked';
  analysis?: string;
  next_actions?: string;
  created_at: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
}

export interface AttendanceRecord {
  id: string;
  profile_id: string;
  check_in: string;
  check_out?: string;
  check_in_lat?: number;
  check_in_lng?: number;
  check_out_lat?: number;
  check_out_lng?: number;
  location_type: 'office' | 'remote' | 'meeting';
  status: 'recorded' | 'verified' | 'exception' | 'pending_manager_review' | 'approved' | 'rejected' | 'locked';
  notes?: string;
  created_at: string;
}

export interface Payslip {
  id: string;
  profile_id: string;
  period: string; // YYYY-MM-DD
  base_salary: number;
  allowances: number;
  kpi_bonus: number;
  deductions: number;
  net_salary: number;
  status: 'draft' | 'published';
  created_at: string;
}

export interface AppNotification {
  id: string;
  profile_id: string;
  title: string;
  content: string;
  type: 'info' | 'action_required' | 'deadline' | 'approval' | 'warning' | 'success';
  link_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string;
  organization_id?: string;
  entity_type: string;
  entity_id: string;
  action: string;
  before_state?: Record<string, unknown>;
  after_state?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Default Seed Data Arrays
const DEFAULT_PROFILES: Profile[] = [
  { id: 'adminbao-root-root-root-rootrootroot', email: 'adminbao@gmail.com', full_name: 'Admin Bảo (Root)', phone: '0988888888', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bao' },
  { id: '11111111-1111-1111-1111-111111111111', email: 'admin@pgs.demo', full_name: 'Nguyễn Admin', phone: '0901234567', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin' },
  { id: '22222222-2222-2222-2222-222222222222', email: 'manager@pgs.demo', full_name: 'Trần PM / Manager', phone: '0902345678', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=manager' },
  { id: '33333333-3333-3333-3333-333333333333', email: 'accountant@pgs.demo', full_name: 'Lê Kế Toán', phone: '0903456789', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=account' },
  { id: '44444444-4444-4444-4444-444444444444', email: 'employee@pgs.demo', full_name: 'Phạm Nhân Viên', phone: '0904567890', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=employee' },
  { id: '55555555-5555-5555-5555-555555555555', email: 'owner@abc.demo', full_name: 'Vương Khách Hàng (ABC)', phone: '0905678901', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=owner' },
  { id: '66666666-6666-6666-6666-666666666666', email: 'member@abc.demo', full_name: 'Đỗ Thành Viên (ABC)', phone: '0906789012', avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=member' },
];

const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    legal_name: 'Công ty Cổ phần PGS Agency',
    brand_name: 'PGS Agency',
    tax_code: '0101234567',
    address: 'Tầng 5, Tòa nhà PGS, Hà Nội',
    representative: 'Nguyễn Admin',
    email: 'contact@pgs.vn',
    phone: '0247300123',
    is_active: true,
    internal_notes: 'Tài khoản chính điều hành hệ thống'
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    legal_name: 'Công ty TNHH Thương mại và Dịch vụ ABC',
    brand_name: 'Công ty ABC',
    tax_code: '0309876543',
    address: '123 Đường Nguyễn Huệ, Quận 1, TP. HCM',
    representative: 'Vương Khách Hàng',
    email: 'contact@abc.vn',
    phone: '0283821234',
    is_active: true,
    internal_notes: 'Khách hàng ABC Corp'
  }
];

const DEFAULT_MEMBERS: OrganizationMember[] = [
  { organization_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: 'adminbao-root-root-root-rootrootroot', role: 'super_admin' },
  { organization_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: '11111111-1111-1111-1111-111111111111', role: 'admin' },
  { organization_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: '22222222-2222-2222-2222-222222222222', role: 'manager' },
  { organization_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: '33333333-3333-3333-3333-333333333333', role: 'accountant' },
  { organization_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: '44444444-4444-4444-4444-444444444444', role: 'employee' },
  { organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', profile_id: '55555555-5555-5555-5555-555555555555', role: 'client_owner' },
  { organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', profile_id: '66666666-6666-6666-6666-666666666666', role: 'client_member' },
];

const DEFAULT_ACCESS_REQUESTS: AccessRequest[] = [];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1111111-1111-1111-1111-111111111111',
    organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    code: 'PGS-WEB-2026-018',
    name: 'Website Công ty ABC',
    service_type: 'Web Development',
    pm_id: '22222222-2222-2222-2222-222222222222',
    start_date: '2026-05-01',
    end_date: '2026-08-31',
    status: 'active',
    contract_value: 60000000.00,
    progress: 68,
    risk_level: 'low',
    description: 'Thiết kế giao diện và phát triển hệ thống website giới thiệu sản phẩm và bán hàng tích hợp hệ quản lý nội dung.'
  }
];

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1111111-1111-1111-1111-111111111111', project_id: 'p1111111-1111-1111-1111-111111111111', name: 'Khảo sát và chiến lược', weight_percent: 10, completion_percent: 100, status: 'completed', due_date: '2026-05-15' },
  { id: 'm2222222-2222-2222-2222-222222222222', project_id: 'p1111111-1111-1111-1111-111111111111', name: 'UI/UX Design', weight_percent: 30, completion_percent: 100, status: 'completed', due_date: '2026-06-15' },
  { id: 'm3333333-3333-3333-3333-333333333333', project_id: 'p1111111-1111-1111-1111-111111111111', name: 'Lập trình', weight_percent: 35, completion_percent: 40, status: 'in_progress', due_date: '2026-07-31' },
  { id: 'm4444444-4444-4444-4444-444444444444', project_id: 'p1111111-1111-1111-1111-111111111111', name: 'Kiểm thử và bàn giao', weight_percent: 25, completion_percent: 0, status: 'not_started', due_date: '2026-08-31' },
];

const DEFAULT_TASKS: Task[] = [
  { id: 't1111111-1111-1111-1111-111111111111', project_id: 'p1111111-1111-1111-1111-111111111111', milestone_id: 'm3333333-3333-3333-3333-333333333333', title: 'Xây dựng layout Dashboard Admin', description: 'Tạo khung và component điều hướng sidebar, navbar cho trang admin', assignee_id: '44444444-4444-4444-4444-444444444444', reviewer_id: '22222222-2222-2222-2222-222222222222', priority: 'high', start_date: '2026-07-01', deadline: '2026-07-15', estimate_hours: 20, status: 'done' },
  { id: 't2222222-2222-2222-2222-222222222222', project_id: 'p1111111-1111-1111-1111-111111111111', milestone_id: 'm3333333-3333-3333-3333-333333333333', title: 'Tích hợp kết nối database Supabase', description: 'Thiết lập client SDK và viết các schema query ban đầu', assignee_id: '44444444-4444-4444-4444-444444444444', reviewer_id: '22222222-2222-2222-2222-222222222222', priority: 'high', start_date: '2026-07-10', deadline: '2026-07-22', estimate_hours: 15, status: 'in_progress' },
  { id: 't3333333-3333-3333-3333-333333333333', project_id: 'p1111111-1111-1111-1111-111111111111', milestone_id: 'm3333333-3333-3333-3333-333333333333', title: 'Giao diện bảng thanh toán (Billing UI)', description: 'Lập trình UI danh sách hóa đơn và lịch trình thanh toán', assignee_id: '44444444-4444-4444-4444-444444444444', reviewer_id: '22222222-2222-2222-2222-222222222222', priority: 'medium', start_date: '2026-07-20', deadline: '2026-07-28', estimate_hours: 12, status: 'todo' },
];

const DEFAULT_DELIVERABLES: Deliverable[] = [
  { id: 'd1111111-1111-1111-1111-111111111111', project_id: 'p1111111-1111-1111-1111-111111111111', title: 'Thiết kế Mockup Figma v2', description: 'Bản vẽ chi tiết UI và UX cho toàn bộ trang Desktop và Mobile', status: 'ready_for_client', current_version: 2, created_at: '2026-06-16T08:00:00Z' },
  { id: 'd2222222-2222-2222-2222-222222222222', project_id: 'p1111111-1111-1111-1111-111111111111', title: 'Tài liệu Mô tả Chức năng SRS', description: 'Đặc tả chi tiết các luồng nghiệp vụ hệ thống website', status: 'client_review', current_version: 1, created_at: '2026-06-22T09:30:00Z' },
];

const DEFAULT_DELIVERABLE_VERSIONS: DeliverableVersion[] = [
  { id: 'dv111111-1111-1111-1111-111111111111', deliverable_id: 'd1111111-1111-1111-1111-111111111111', version: 1, file_url: 'https://figma.com/file/demo-v1', notes: 'Bản phác thảo sơ bộ các wireframe chính', created_by: '22222222-2222-2222-2222-222222222222', created_at: '2026-06-14T10:00:00Z' },
  { id: 'dv222222-2222-2222-2222-222222222222', deliverable_id: 'd1111111-1111-1111-1111-111111111111', version: 2, file_url: 'https://figma.com/file/demo-v2', notes: 'Cập nhật thêm phong cách vàng-trắng theo yêu cầu', created_by: '22222222-2222-2222-2222-222222222222', created_at: '2026-06-16T08:00:00Z' },
  { id: 'dv333333-3333-3333-3333-333333333333', deliverable_id: 'd2222222-2222-2222-2222-222222222222', version: 1, file_url: '/srs-v1.pdf', notes: 'Bản tài liệu cấu trúc dữ liệu và mô tả API', created_by: '22222222-2222-2222-2222-222222222222', created_at: '2026-06-22T09:30:00Z' },
];

const DEFAULT_CONTRACTS: Contract[] = [
  { id: 'c1111111-1111-1111-1111-111111111111', organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', project_id: 'p1111111-1111-1111-1111-111111111111', contract_number: 'PGS-2026-018', title: 'Hợp đồng Thiết kế & Phát triển Website ABC', status: 'active', value: 60000000.00, start_date: '2026-05-01', end_date: '2026-08-31', file_url: '/contracts/draft_pgs_2026_018.pdf', signed_file_url: '/contracts/signed_pgs_2026_018.pdf', created_at: '2026-05-01T02:00:00Z' }
];

const DEFAULT_CONTRACT_SIGNERS: ContractSigner[] = [
  { id: 'cs111111', contract_id: 'c1111111-1111-1111-1111-111111111111', profile_id: '11111111-1111-1111-1111-111111111111', role_title: 'Đại diện PGS Agency', signed_at: '2026-05-02T08:30:00Z', ip_address: '113.190.230.12', device_metadata: 'Chrome / Windows 11', verification_method: 'OTP Email' },
  { id: 'cs222222', contract_id: 'c1111111-1111-1111-1111-111111111111', profile_id: '55555555-5555-5555-5555-555555555555', role_title: 'Giám đốc Công ty ABC', signed_at: '2026-05-03T10:15:00Z', ip_address: '14.161.40.85', device_metadata: 'Safari / macOS', verification_method: 'OTP Phone' },
];

const DEFAULT_PAYMENT_SCHEDULES: PaymentSchedule[] = [
  { id: 'ps111111-1111-1111-1111-111111111111', contract_id: 'c1111111-1111-1111-1111-111111111111', milestone_name: 'Tạm ứng đợt 1 (Ký hợp đồng)', amount: 24000000.00, due_date: '2026-05-05', status: 'paid' },
  { id: 'ps222222-2222-2222-2222-222222222222', contract_id: 'c1111111-1111-1111-1111-111111111111', milestone_name: 'Thanh toán đợt 2 (Duyệt Design)', amount: 16000000.00, due_date: '2026-06-20', status: 'paid' },
  { id: 'ps333333-3333-3333-3333-333333333333', contract_id: 'c1111111-1111-1111-1111-111111111111', milestone_name: 'Thanh toán đợt 3 (Bàn giao)', amount: 20000000.00, due_date: '2026-08-31', status: 'upcoming' },
];

const DEFAULT_PAYMENTS: Payment[] = [
  { id: 'pay11111', payment_schedule_id: 'ps111111-1111-1111-1111-111111111111', amount_paid: 24000000.00, paid_date: '2026-05-04', payment_method: 'Chuyển khoản ngân hàng', proof_file_url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500', notes: 'Đã chuyển khoản đợt 1 thành công', verified_by: '33333333-3333-3333-3333-333333333333', verified_at: '2026-05-05T02:00:00Z', created_at: '2026-05-04T12:00:00Z' },
  { id: 'pay22222', payment_schedule_id: 'ps222222-2222-2222-2222-222222222222', amount_paid: 16000000.00, paid_date: '2026-06-18', payment_method: 'Chuyển khoản ngân hàng', proof_file_url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500', notes: 'Chuyển khoản thanh toán đợt 2', verified_by: '33333333-3333-3333-3333-333333333333', verified_at: '2026-06-19T04:30:00Z', created_at: '2026-06-18T10:00:00Z' },
];

const DEFAULT_ADS_CONNECTIONS: AdsConnection[] = [
  { id: 'ac111111', organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', platform: 'meta', account_id: 'act_102030405060', account_name: 'Meta Ads ABC Campaign', is_active: true }
];

const DEFAULT_ADS_REPORTS: AdsReport[] = [
  {
    id: 'ar111111',
    project_id: 'p1111111-1111-1111-1111-111111111111',
    title: 'Báo cáo Chiến dịch Quảng cáo Tháng 07/2026',
    month_period: '2026-07-01',
    spend: 18600000.00,
    impressions: 480000,
    clicks: 15400,
    leads: 315,
    data_status: 'published',
    analysis: 'Chiến dịch chạy hiệu quả trong tuần 2 và tuần 3 nhờ tối ưu đối tượng khách hàng mục tiêu và bổ sung các banner phong cách sáng tạo mới. CPL trung bình giảm 12% so với tháng trước.',
    next_actions: '1. Tiếp tục đẩy mạnh ngân sách vào nhóm đối tượng có tỷ lệ chuyển đổi cao.\n2. Thử nghiệm thêm 3 mẫu thiết kế visual mới cho banner quảng cáo.',
    created_at: '2026-07-15T09:00:00Z'
  }
];

const DEFAULT_OFFICE_LOCATIONS: OfficeLocation[] = [
  { id: 'e7a2b97c-87d4-4a41-86f3-6bc38c64bb93', name: 'Văn phòng PGS Agency', latitude: 21.028511, longitude: 105.804817, radius_meters: 100.0 }
];

const DEFAULT_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att11111', profile_id: '44444444-4444-4444-4444-444444444444', check_in: '2026-07-19T08:02:15Z', check_out: '2026-07-19T17:05:00Z', check_in_lat: 21.028522, check_in_lng: 105.804820, location_type: 'office', status: 'verified', notes: 'Đúng giờ làm việc tại văn phòng', created_at: '2026-07-19T08:02:15Z' }
];

const DEFAULT_PAYSLIPS: Payslip[] = [
  { id: 'paylip11', profile_id: '44444444-4444-4444-4444-444444444444', period: '2026-07-01', base_salary: 12000000.00, allowances: 1500000.00, kpi_bonus: 2000000.00, deductions: 500000.00, net_salary: 15000000.00, status: 'published', created_at: '2026-07-01T00:00:00Z' }
];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', profile_id: '22222222-2222-2222-2222-222222222222', title: 'Yêu cầu duyệt Deliverable', content: 'Deliverable "Thiết kế Mockup Figma v2" đang chờ bạn đánh giá nội bộ trước khi gửi khách hàng.', type: 'approval', link_url: '/app/projects/p1111111-1111-1111-1111-111111111111', is_read: false, created_at: '2026-07-19T06:00:00Z' },
  { id: 'n2', profile_id: '55555555-5555-5555-5555-555555555555', title: 'Hợp đồng cần ký duyệt', content: 'Hợp đồng "PGS-2026-018" đã được duyệt và đang chờ chữ ký từ phía bạn.', type: 'action_required', link_url: '/app/projects/p1111111-1111-1111-1111-111111111111', is_read: false, created_at: '2026-07-19T07:15:00Z' }
];

const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', actor_id: '11111111-1111-1111-1111-111111111111', entity_type: 'contract', entity_id: 'c1111111-1111-1111-1111-111111111111', action: 'create_contract', created_at: '2026-05-01T02:00:00Z' }
];

const DEFAULT_COMMENTS: TaskComment[] = [
  { id: 'c_t1', task_id: 't2222222-2222-2222-2222-222222222222', profile_id: '22222222-2222-2222-2222-222222222222', content: 'Lưu ý kiểm tra kỹ RLS policy cho bảng profiles và projects.', visibility: 'internal', created_at: '2026-07-11T09:00:00Z' }
];

const DEFAULT_FILES: FileMetadata[] = [
  { id: 'f1', organization_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', project_id: 'p1111111-1111-1111-1111-111111111111', name: 'srs-v1.pdf', size_bytes: 2048500, mime_type: 'application/pdf', storage_path: '/srs-v1.pdf', visibility: 'project_client', created_by: '22222222-2222-2222-2222-222222222222', is_deleted: false, created_at: '2026-06-22T09:30:00Z' }
];

export class DbStore {
  private static initKey = 'pgs_hub_initialized';

  private static cache: Record<string, unknown> = {};

  private static load<T>(key: string, defaults: T[]): T[] {
    if (typeof window === 'undefined') return defaults;
    if (this.cache[key]) {
      return this.cache[key] as T[];
    }
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaults));
      this.cache[key] = defaults;
      return defaults;
    }
    try {
      const parsed = JSON.parse(data);
      this.cache[key] = parsed;
      return parsed;
    } catch {
      return defaults;
    }
  }

  private static save<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    this.cache[key] = data;
    localStorage.setItem(key, JSON.stringify(data));
  }

  static initialize(): void {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(this.initKey)) return;
    
    localStorage.setItem('pgs_profiles', JSON.stringify(DEFAULT_PROFILES));
    localStorage.setItem('pgs_organizations', JSON.stringify(DEFAULT_ORGANIZATIONS));
    localStorage.setItem('pgs_members', JSON.stringify(DEFAULT_MEMBERS));
    localStorage.setItem('pgs_projects', JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem('pgs_milestones', JSON.stringify(DEFAULT_MILESTONES));
    localStorage.setItem('pgs_tasks', JSON.stringify(DEFAULT_TASKS));
    localStorage.setItem('pgs_comments', JSON.stringify(DEFAULT_COMMENTS));
    localStorage.setItem('pgs_deliverables', JSON.stringify(DEFAULT_DELIVERABLES));
    localStorage.setItem('pgs_deliverable_versions', JSON.stringify(DEFAULT_DELIVERABLE_VERSIONS));
    localStorage.setItem('pgs_contracts', JSON.stringify(DEFAULT_CONTRACTS));
    localStorage.setItem('pgs_contract_signers', JSON.stringify(DEFAULT_CONTRACT_SIGNERS));
    localStorage.setItem('pgs_payment_schedules', JSON.stringify(DEFAULT_PAYMENT_SCHEDULES));
    localStorage.setItem('pgs_payments', JSON.stringify(DEFAULT_PAYMENTS));
    localStorage.setItem('pgs_ads_connections', JSON.stringify(DEFAULT_ADS_CONNECTIONS));
    localStorage.setItem('pgs_ads_reports', JSON.stringify(DEFAULT_ADS_REPORTS));
    localStorage.setItem('pgs_office_locations', JSON.stringify(DEFAULT_OFFICE_LOCATIONS));
    localStorage.setItem('pgs_attendance', JSON.stringify(DEFAULT_ATTENDANCE));
    localStorage.setItem('pgs_payslips', JSON.stringify(DEFAULT_PAYSLIPS));
    localStorage.setItem('pgs_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
    localStorage.setItem('pgs_audit_logs', JSON.stringify(DEFAULT_AUDIT_LOGS));
    localStorage.setItem('pgs_files', JSON.stringify(DEFAULT_FILES));
    
    localStorage.setItem(this.initKey, 'true');
  }

  // --- Profiles & Auth Helpers ---
  static getProfiles(): Profile[] {
    return this.load('pgs_profiles', DEFAULT_PROFILES);
  }

  static saveProfiles(profiles: Profile[]) {
    this.save('pgs_profiles', profiles);
  }

  static saveMembers(members: OrganizationMember[]) {
    // Single Super Admin Constraint Enforcement:
    // If members contain more than 1 super_admin, keep only the latest/first one as super_admin and demote others to admin.
    const superAdminMembers = members.filter(m => m.role === 'super_admin');
    if (superAdminMembers.length > 1) {
      const activeSuperAdminId = superAdminMembers[0].profile_id;
      members = members.map(m => {
        if (m.role === 'super_admin' && m.profile_id !== activeSuperAdminId) {
          return { ...m, role: 'admin' };
        }
        return m;
      });
    }
    this.save('pgs_members', members);
  }

  // --- Access Requests Helpers ---
  static getAccessRequests(): AccessRequest[] {
    return this.load('pgs_access_requests', DEFAULT_ACCESS_REQUESTS);
  }

  static saveAccessRequests(requests: AccessRequest[]) {
    this.save('pgs_access_requests', requests);
  }

  static createAccessRequest(req: AccessRequest) {
    const requests = this.getAccessRequests();
    requests.push(req);
    this.saveAccessRequests(requests);
  }

  static approveAccessRequest(requestId: string, reviewerId: string, orgId: string, role: string) {
    const requests = this.getAccessRequests();
    const reqIndex = requests.findIndex(r => r.id === requestId);
    if (reqIndex === -1) return;

    requests[reqIndex].status = 'approved';
    requests[reqIndex].reviewed_by = reviewerId;
    requests[reqIndex].reviewed_at = new Date().toISOString();
    this.saveAccessRequests(requests);

    // Update profile status to active
    const userId = requests[reqIndex].user_id;
    const profiles = this.getProfiles();
    const profileIndex = profiles.findIndex(p => p.id === userId);
    if (profileIndex !== -1) {
      profiles[profileIndex].account_status = 'active';
      this.saveProfiles(profiles);
    }

    // Assign membership
    const members = this.getMembers();
    const existingMember = members.find(m => m.profile_id === userId && m.organization_id === orgId);
    if (existingMember) {
      existingMember.role = role;
    } else {
      members.push({ organization_id: orgId, profile_id: userId, role });
    }
    this.saveMembers(members);

    this.addAuditLog({
      actor_id: reviewerId,
      organization_id: orgId,
      entity_type: 'auth',
      entity_id: userId,
      action: 'approve_access_request',
      after_state: { role, orgId }
    });
  }

  static rejectAccessRequest(requestId: string, reviewerId: string, reason: string) {
    const requests = this.getAccessRequests();
    const reqIndex = requests.findIndex(r => r.id === requestId);
    if (reqIndex === -1) return;

    requests[reqIndex].status = 'rejected';
    requests[reqIndex].reviewed_by = reviewerId;
    requests[reqIndex].reviewed_at = new Date().toISOString();
    requests[reqIndex].internal_reason = reason;
    this.saveAccessRequests(requests);

    const userId = requests[reqIndex].user_id;
    const profiles = this.getProfiles();
    const profileIndex = profiles.findIndex(p => p.id === userId);
    if (profileIndex !== -1) {
      profiles[profileIndex].account_status = 'rejected';
      this.saveProfiles(profiles);
    }

    this.addAuditLog({
      actor_id: reviewerId,
      entity_type: 'auth',
      entity_id: userId,
      action: 'reject_access_request',
      after_state: { reason }
    });
  }

  static getOrganizations(): Organization[] {
    return this.load('pgs_organizations', DEFAULT_ORGANIZATIONS);
  }

  static getMembers(): OrganizationMember[] {
    return this.load('pgs_members', DEFAULT_MEMBERS);
  }

  // --- Projects ---
  static getProjects(): Project[] {
    return this.load('pgs_projects', DEFAULT_PROJECTS);
  }

  static saveProjects(projects: Project[]) {
    this.save('pgs_projects', projects);
  }

  static getProjectById(id: string): Project | undefined {
    return this.getProjects().find(p => p.id === id);
  }

  static updateProject(project: Project) {
    const list = this.getProjects();
    const index = list.findIndex(p => p.id === project.id);
    if (index !== -1) {
      list[index] = project;
      this.saveProjects(list);
    }
  }

  // --- Milestones ---
  static getMilestones(): Milestone[] {
    return this.load('pgs_milestones', DEFAULT_MILESTONES);
  }

  static saveMilestones(milestones: Milestone[]) {
    this.save('pgs_milestones', milestones);
  }

  static getMilestonesByProjectId(projectId: string): Milestone[] {
    return this.getMilestones().filter(m => m.project_id === projectId);
  }

  static updateMilestone(milestone: Milestone) {
    const list = this.getMilestones();
    const index = list.findIndex(m => m.id === milestone.id);
    if (index !== -1) {
      list[index] = milestone;
      this.saveMilestones(list);
      this.recalculateProjectProgress(milestone.project_id);
    }
  }

  private static recalculateProjectProgress(projectId: string) {
    const milestones = this.getMilestonesByProjectId(projectId);
    if (milestones.length === 0) return;
    
    let totalWeight = 0;
    let completedWeight = 0;
    milestones.forEach(m => {
      totalWeight += m.weight_percent;
      completedWeight += (m.weight_percent * m.completion_percent) / 100;
    });

    const project = this.getProjectById(projectId);
    if (project) {
      // If sum of weights is not 100, normalize it
      const progressValue = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
      project.progress = progressValue;
      this.updateProject(project);
    }
  }

  // --- Tasks ---
  static getTasks(): Task[] {
    return this.load('pgs_tasks', DEFAULT_TASKS);
  }

  static saveTasks(tasks: Task[]) {
    this.save('pgs_tasks', tasks);
  }

  static getTasksByProjectId(projectId: string): Task[] {
    return this.getTasks().filter(t => t.project_id === projectId);
  }

  static updateTask(task: Task) {
    const list = this.getTasks();
    const index = list.findIndex(t => t.id === task.id);
    if (index !== -1) {
      list[index] = task;
      this.saveTasks(list);
    }
  }

  static getComments(): TaskComment[] {
    return this.load('pgs_comments', DEFAULT_COMMENTS);
  }

  static addComment(comment: TaskComment) {
    const list = this.getComments();
    list.push(comment);
    this.save('pgs_comments', list);
  }

  // --- Deliverables ---
  static getDeliverables(): Deliverable[] {
    return this.load('pgs_deliverables', DEFAULT_DELIVERABLES);
  }

  static getDeliverableVersions(delivId: string): DeliverableVersion[] {
    const all = this.load('pgs_deliverable_versions', DEFAULT_DELIVERABLE_VERSIONS);
    return all.filter(v => v.deliverable_id === delivId).sort((a, b) => b.version - a.version);
  }

  static saveDeliverables(deliverables: Deliverable[]) {
    this.save('pgs_deliverables', deliverables);
  }

  static updateDeliverable(deliv: Deliverable) {
    const list = this.getDeliverables();
    const index = list.findIndex(d => d.id === deliv.id);
    if (index !== -1) {
      list[index] = deliv;
      this.saveDeliverables(list);
    }
  }

  static addDeliverableVersion(version: DeliverableVersion) {
    const list = this.load('pgs_deliverable_versions', DEFAULT_DELIVERABLE_VERSIONS);
    list.push(version);
    this.save('pgs_deliverable_versions', list);
  }

  // --- Files ---
  static getFiles(): FileMetadata[] {
    return this.load('pgs_files', DEFAULT_FILES);
  }

  static uploadFile(file: FileMetadata) {
    const list = this.getFiles();
    list.push(file);
    this.save('pgs_files', list);
  }

  static deleteFile(fileId: string) {
    const list = this.getFiles();
    const index = list.findIndex(f => f.id === fileId);
    if (index !== -1) {
      list[index].is_deleted = true;
      this.save('pgs_files', list);
    }
  }

  // --- Contracts ---
  static getContracts(): Contract[] {
    return this.load('pgs_contracts', DEFAULT_CONTRACTS);
  }

  static saveContracts(contracts: Contract[]) {
    this.save('pgs_contracts', contracts);
  }

  static getContractSigners(contractId: string): ContractSigner[] {
    const all = this.load('pgs_contract_signers', DEFAULT_CONTRACT_SIGNERS);
    return all.filter(s => s.contract_id === contractId);
  }

  static updateContract(contract: Contract) {
    const list = this.getContracts();
    const index = list.findIndex(c => c.id === contract.id);
    if (index !== -1) {
      list[index] = contract;
      this.save('pgs_contracts', list);
    }
  }

  static signContract(contractId: string, signerId: string, info: Partial<ContractSigner>) {
    const signers = this.load('pgs_contract_signers', DEFAULT_CONTRACT_SIGNERS);
    const signerIndex = signers.findIndex(s => s.contract_id === contractId && s.profile_id === signerId);
    if (signerIndex !== -1) {
      signers[signerIndex] = {
        ...signers[signerIndex],
        ...info,
        signed_at: new Date().toISOString()
      };
      this.save('pgs_contract_signers', signers);

      // Check if all signed
      const contractSigners = signers.filter(s => s.contract_id === contractId);
      const allSigned = contractSigners.every(s => s.signed_at);
      if (allSigned) {
        const contracts = this.getContracts();
        const cIndex = contracts.findIndex(c => c.id === contractId);
        if (cIndex !== -1) {
          contracts[cIndex].status = 'active';
          this.save('pgs_contracts', contracts);
        }
      }
    }
  }

  // --- Payments ---
  static getPaymentSchedules(): PaymentSchedule[] {
    return this.load('pgs_payment_schedules', DEFAULT_PAYMENT_SCHEDULES);
  }

  static getPayments(): Payment[] {
    return this.load('pgs_payments', DEFAULT_PAYMENTS);
  }

  static addPayment(payment: Payment) {
    const list = this.getPayments();
    list.push(payment);
    this.save('pgs_payments', list);

    // Update payment schedule status
    const schedules = this.getPaymentSchedules();
    const schedIdx = schedules.findIndex(s => s.id === payment.payment_schedule_id);
    if (schedIdx !== -1) {
      schedules[schedIdx].status = 'paid';
      this.save('pgs_payment_schedules', schedules);
    }
  }

  // --- Ads ---
  static getAdsReports(): AdsReport[] {
    return this.load('pgs_ads_reports', DEFAULT_ADS_REPORTS);
  }

  static saveAdsReports(reports: AdsReport[]) {
    this.save('pgs_ads_reports', reports);
  }

  static updateAdsReport(report: AdsReport) {
    const list = this.getAdsReports();
    const index = list.findIndex(r => r.id === report.id);
    if (index !== -1) {
      list[index] = report;
      this.saveAdsReports(list);
    }
  }

  // --- HR ---
  static getOfficeLocations(): OfficeLocation[] {
    return this.load('pgs_office_locations', DEFAULT_OFFICE_LOCATIONS);
  }

  static getAttendance(): AttendanceRecord[] {
    return this.load('pgs_attendance', DEFAULT_ATTENDANCE);
  }

  static checkIn(record: AttendanceRecord) {
    const list = this.getAttendance();
    list.push(record);
    this.save('pgs_attendance', list);
  }

  static checkOut(profileId: string, time: string, lat?: number, lng?: number) {
    const list = this.getAttendance();
    const todayStr = time.split('T')[0];
    const index = list.findIndex(r => r.profile_id === profileId && r.check_in.startsWith(todayStr) && !r.check_out);
    if (index !== -1) {
      list[index].check_out = time;
      list[index].check_out_lat = lat;
      list[index].check_out_lng = lng;
      this.save('pgs_attendance', list);
    }
  }

  static getPayslips(): Payslip[] {
    return this.load('pgs_payslips', DEFAULT_PAYSLIPS);
  }

  // --- Notifications ---
  static getNotifications(profileId: string): AppNotification[] {
    return this.load('pgs_notifications', DEFAULT_NOTIFICATIONS).filter(n => n.profile_id === profileId);
  }

  static markNotificationRead(id: string) {
    const list = this.load('pgs_notifications', DEFAULT_NOTIFICATIONS);
    const index = list.findIndex(n => n.id === id);
    if (index !== -1) {
      list[index].is_read = true;
      this.save('pgs_notifications', list);
    }
  }

  // --- Audit Logs ---
  static getAuditLogs(): AuditLog[] {
    return this.load('pgs_audit_logs', DEFAULT_AUDIT_LOGS);
  }

  static addAuditLog(log: Omit<AuditLog, 'id' | 'created_at'>) {
    const list = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: Math.random().toString(36).substring(7),
      created_at: new Date().toISOString()
    };
    list.push(newLog);
    this.save('pgs_audit_logs', list);
  }
}
