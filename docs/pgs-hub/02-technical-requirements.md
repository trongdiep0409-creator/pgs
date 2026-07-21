# 02 — Tài liệu yêu cầu kỹ thuật PGS Hub

## 1. Mục tiêu kỹ thuật

Hệ thống phải là một web app production-ready, không phải prototype frontend. Kiến trúc phải bảo đảm:

- Xác thực thật.
- Phân quyền phía server.
- Cách ly dữ liệu theo tổ chức và dự án.
- Migration an toàn, không mất dữ liệu.
- Backend tái sử dụng được cho mobile app.
- File riêng tư.
- Audit log.
- Khả năng backup và khôi phục.
- Test và production build ổn định.

## 2. Stack ưu tiên

Nếu repository chưa có stack tương đương, sử dụng:

- Next.js App Router.
- TypeScript strict mode.
- React Server Components khi phù hợp.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth.
- PostgreSQL/Supabase Database.
- Supabase Storage.
- Supabase Realtime hoặc heartbeat server.
- Zod.
- React Hook Form.
- TanStack Table.
- dnd-kit.
- date-fns với locale Việt Nam.
- Recharts cho biểu đồ cần thiết.
- Vitest hoặc Jest.
- Playwright cho end-to-end.
- Vercel cho triển khai nếu chưa có hạ tầng khác.

Nếu repository đã dùng backend khác, không tự ý migrate. Giữ nền tảng hiện tại nhưng phải cung cấp RLS hoặc authorization layer tương đương, private storage, audit và API dùng lại được.

## 3. Kiến trúc code

Tách theo feature/domain:

```text
src/
  app/
  components/
    ui/
    shared/
  features/
    auth/
    organizations/
    users/
    permissions/
    attendance/
    projects/
    tasks/
    approvals/
    files/
    notifications/
    audit/
    imports/
  server/
    auth/
    authorization/
    services/
    repositories/
    providers/
    jobs/
  lib/
  types/
  tests/
supabase/
  migrations/
  seed/
docs/
```

Luồng phụ thuộc:

```text
UI
→ Feature use case
→ Server Action/Route Handler
→ Authorization policy
→ Domain service
→ Repository
→ Database/provider
```

Không để component frontend truy cập database bằng service role key. Không đặt toàn bộ business logic trong page component.

## 4. Quy tắc TypeScript và code quality

- Bật `strict: true`.
- Không dùng `any` trừ adapter bắt buộc và phải thu hẹp ngay bằng Zod/type guard.
- Tất cả input server được validate.
- Dùng enum/const union thống nhất cho status.
- Không hardcode role check rải rác; dùng authorization service.
- Không hardcode text lỗi ở nhiều nơi; tạo error mapping tiếng Việt.
- Tách server-only module và không import vào client bundle.
- Mutation quan trọng phải idempotent khi có khả năng retry.
- Ghi request/correlation ID.

## 5. Authentication

### 5.1 Provider

- Email/password.
- Google OAuth.
- Phone OTP.
- Email reset password.
- Chuẩn bị MFA cho Super Admin và Accountant.

### 5.2 Yêu cầu

- Không lưu password trong application database.
- Không lưu Google token nếu không cần gọi Google API.
- OTP có TTL, rate limit và attempt limit.
- OAuth callback validate state/PKCE theo provider.
- Session cookie phải secure, HTTP-only khi kiến trúc cho phép.
- Session rotation/refresh an toàn.
- Logout current session và all sessions.
- Pending user bị chặn ở middleware và authorization layer.
- Link tài khoản trùng email/phone chỉ khi identity đã xác minh.

### 5.3 Một Super Admin

- Tạo bằng secure bootstrap/migration.
- Database có unique constraint hoặc trigger bảo đảm chỉ một `super_admin` active.
- Không có endpoint public tạo Super Admin.
- Chuyển giao Super Admin dùng transaction, re-authentication và audit.

## 6. Authorization và RLS

Mọi query nhạy cảm phải xác định:

- User hiện tại.
- Account status.
- Workspace/organization hiện tại.
- Base role.
- Custom permissions.
- Project membership.
- Entity visibility.

Các nguyên tắc:

- Default deny.
- Không tin role/organization ID từ client.
- Server tự lấy user ID từ session.
- Client A không đọc Client B.
- Employee không đọc project ngoài membership.
- Pending account không đọc nghiệp vụ.
- Client không nhận comment/file internal.
- Viewer không mutation.
- Audit log chỉ Super Admin hoặc permission đặc biệt được xem.
- Salary/payroll/HR private có policy riêng.
- Signed file URL chỉ tạo sau authorization.

Tạo integration test cho IDOR và truy cập chéo.

## 7. API và Server Actions

### 7.1 Quy ước response

```ts
type ApiSuccess<T> = {
  ok: true;
  data: T;
  requestId: string;
};

type ApiFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
  requestId: string;
};
```

### 7.2 Quy tắc

- Không trả stack trace cho client.
- Dùng HTTP status phù hợp.
- Mutation quan trọng có idempotency key khi cần.
- Pagination cursor hoặc offset rõ ràng.
- Filter/sort whitelist, không nối SQL từ client.
- API mobile-compatible, không phụ thuộc DOM/web-only state.
- Version API nếu public/mobile client bắt đầu sử dụng.

## 8. Database và migration

- PostgreSQL UUID cho entity chính nếu stack hỗ trợ.
- UTC trong database.
- `created_at`, `created_by`, `updated_at`, `updated_by` cho entity quan trọng.
- Soft delete cho dữ liệu có lịch sử.
- Foreign key đầy đủ.
- Unique constraint cho mã dự án, membership và Super Admin.
- Index theo `organization_id`, `project_id`, `user_id`, `status`, `deadline`, `created_at`.
- Migration forward-only, có phương án rollback hoặc restore backup.
- Không sửa migration đã chạy production.
- Dữ liệu enum phải có chiến lược mở rộng an toàn.

Trước migration production:

1. Backup database.
2. Dry-run trên staging hoặc bản sao.
3. Kiểm tra thời gian lock.
4. Chạy migration.
5. Chạy smoke test.
6. Ghi version triển khai.

## 9. File storage

- Bucket private mặc định.
- Metadata trong database, binary trong object storage.
- Signed URL có thời hạn.
- Validate MIME type, extension và dung lượng.
- Chặn executable nguy hiểm.
- Version file, không ghi đè bản approved.
- Soft delete và khôi phục theo quyền.
- Cấu trúc đề xuất:

```text
organizations/{organizationId}/projects/{projectId}/{scope}/{fileId}/{version}/{filename}
```

Scope:

```text
project_client
project_internal
finance_private
hr_private
user_private
```

Không tuyên bố file được quét virus nếu chưa có service thật. Lưu `scan_status` để tích hợp sau.

## 10. Presence và realtime

- Heartbeat mặc định 60 giây khi app đang mở.
- Online nếu `last_seen_at` trong 2 phút.
- Không ghi heartbeat thành audit event liên tục.
- Realtime dùng cho notification, Task board và presence khi cần.
- Reconnect có backoff.
- Kanban dùng optimistic update nhưng rollback khi server từ chối.
- Conflict update phải có version hoặc `updated_at` check.

## 11. Chấm công kỹ thuật

### 11.1 Nguồn xác minh

- Server timestamp là nguồn thời gian chuẩn.
- Public IP lấy phía server/proxy tin cậy.
- Geolocation từ browser chỉ khi user cho phép.
- QR động ký bằng HMAC hoặc token một lần, TTL ngắn.
- Device ID là UUID ngẫu nhiên của app installation, không phải MAC/fingerprint tuyệt đối.

### 11.2 Không được làm

- Không giả đọc Wi-Fi SSID từ browser.
- Không giả đọc tên máy hoặc MAC.
- Không tin thời gian client.
- Không tự động đánh dấu trusted sau 5 lần mà không có Admin duyệt.
- Không theo dõi GPS nền liên tục.
- Không tự trừ lương chỉ từ event đi muộn.

### 11.3 QR

- QR chứa token có expiry và nonce.
- Server xác minh chữ ký, thời hạn, office ID và replay.
- Token hết hạn có thông báo cụ thể.
- Không để secret tạo QR ở frontend.

### 11.4 Tính ca

- Chuyển timestamp UTC sang timezone ca làm việc.
- Hỗ trợ ca qua đêm trong cấu trúc dù MVP chưa dùng.
- Tách raw event khỏi daily record đã tính.
- Kỳ công khóa bằng snapshot.

## 12. Tính tiến độ dự án

```text
project_progress = SUM(
  milestone.weight_percent * milestone.completion_percent / 100
)
```

Yêu cầu:

- Decimal precision nhất quán.
- Validate tổng weight bằng 100 trước activation.
- Không lấy Task count làm mặc định.
- Lưu history khi completion hoặc weight thay đổi.
- Dự án completed chỉ khi các điều kiện cấu hình được đáp ứng.

## 13. Task workflow

- State machine chạy phía server.
- Permission xác định transition được phép.
- `internal_review` cần reviewer.
- `waiting_client` cần deliverable/file.
- `revision_requested` cần comment.
- `done` lưu completed_by/completed_at.
- Reopen cần reason.
- Drag/drop chỉ là UI của transition service.
- Notification phát từ domain event, không phát trực tiếp rải rác trong component.

## 14. Notification và email

Tạo provider interface:

```ts
interface EmailProvider {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}

interface SmsProvider {
  sendOtp(input: SendOtpInput): Promise<SendOtpResult>;
  verifyOtp(input: VerifyOtpInput): Promise<VerifyOtpResult>;
}
```

- Email outbox có retry và trạng thái.
- Idempotency tránh gửi lặp.
- Template tiếng Việt.
- Không đặt secret trong client bundle.
- Nếu provider chưa cấu hình, trả trạng thái “Chưa cấu hình nhà cung cấp”, không fake success.

## 15. Import CSV/XLSX

- Parse trên server hoặc worker.
- Giới hạn dung lượng và số dòng.
- Preview trước commit.
- Validate theo schema từng loại dữ liệu.
- Batch transaction theo kích thước hợp lý.
- Lưu raw source và row result.
- Dedupe theo business key.
- Không ghi đè âm thầm.
- Export file lỗi.
- Có idempotency/import batch ID.

## 16. Non-functional requirements

### 16.1 Hiệu năng

- Dashboard không query N+1.
- Bảng có pagination.
- Index cho filter phổ biến.
- Route nặng dùng cache phù hợp nhưng không cache chéo user/org.
- Lazy load chart và module không thiết yếu.
- Upload trực tiếp storage bằng signed upload khi phù hợp.

Mục tiêu ban đầu:

- Phản hồi mutation thông thường dưới 1 giây ở điều kiện bình thường, không tính provider ngoài.
- Trang danh sách có dữ liệu hiển thị hữu ích trong khoảng 2 giây trên mạng ổn định.
- Kanban không tải toàn bộ lịch sử/comment ngay từ đầu.

### 16.2 Khả dụng

- Error boundary.
- Retry có kiểm soát.
- Không mất draft form khi network lỗi nếu có thể.
- Provider outage không làm sập toàn app.
- Health check cho database, storage và provider.

### 16.3 Bảo mật

- OWASP cơ bản: XSS, CSRF, IDOR, injection, upload, rate limit.
- CSP phù hợp.
- Secret chỉ ở server.
- Service role key không vào frontend.
- Sanitize rich text.
- Re-auth cho hành động nhạy cảm.
- Audit permission change và Super Admin transfer.

### 16.4 Quyền riêng tư

- Chỉ thu thập IP/vị trí/thiết bị phục vụ chấm công và bảo mật.
- Hiển thị thông báo xin quyền vị trí rõ ràng.
- Có retention policy cho session, presence và audit.
- Không theo dõi ngoài ứng dụng.

## 17. Backup và khôi phục

- Backup database tự động theo khả năng nhà cung cấp.
- Object storage versioning hoặc backup phù hợp.
- Kiểm tra restore định kỳ.
- Tài liệu RPO/RTO.
- Export dữ liệu quan trọng.
- Không coi Git là backup database.

Mục tiêu đề xuất ban đầu:

- RPO tối đa 24 giờ cho backup định kỳ; xem xét thấp hơn cho dữ liệu quan trọng.
- RTO được xác định sau khi chọn hạ tầng production.

## 18. Observability

- Structured logs.
- Request ID.
- Error tracking.
- Provider latency/error.
- Job queue status.
- Database slow query.
- Không log secret hoặc dữ liệu nhạy cảm không cần thiết.

## 19. Testing

### Unit

- Weighted progress.
- Attendance late calculation.
- Working days for 28/29/30/31-day months.
- Permission resolution.
- Task transition.
- Import dedupe.

### Integration

- Pending user cannot read data.
- Cross-organization blocked.
- Client cannot read internal comment/file.
- One Super Admin constraint.
- Project member policy.
- Attendance event to monthly timesheet.

### End-to-end

- Register → pending → Admin approve → correct dashboard.
- Google/phone flows when test provider available.
- Check-in/check-out.
- Create project → milestones total 100 → activate.
- Create Task → internal review → client review → done.
- Import preview → commit → report.

## 20. Môi trường và biến cấu hình

Tạo `.env.example`, không chứa secret thật. Nhóm biến:

```text
APP_URL
APP_TIMEZONE
DATABASE_URL hoặc Supabase URL/key
SERVER_SERVICE_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SMS_PROVIDER
SMS credentials
EMAIL_PROVIDER
EMAIL credentials
SUPER_ADMIN_EMAIL
STORAGE configuration
QR_SIGNING_SECRET
SENTRY/observability configuration
```

Validate biến môi trường lúc khởi động server. Không để app âm thầm chạy thiếu cấu hình bảo mật quan trọng.

## 21. CI/CD

Pipeline tối thiểu:

```text
install locked dependencies
→ lint
→ typecheck
→ unit/integration tests
→ production build
→ migration check
→ deploy preview
→ smoke test
→ deploy production có phê duyệt
```

Không tự chạy destructive migration production từ preview branch.

## 22. Tài liệu bàn giao kỹ thuật

- README.
- `.env.example`.
- Migration và seed development.
- RLS/authorization documentation.
- Auth provider setup.
- Google OAuth setup.
- Phone OTP setup.
- Email setup.
- Storage setup.
- Backup/restore.
- Import templates.
- Test commands.
- Deploy và rollback guide.

