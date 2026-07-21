# Lệnh khởi chạy dành cho Antigravity

Bạn đang làm việc trong repository của **PGS Hub**, một web app quản trị vận hành nội bộ và cổng khách hàng của PGS Agency.

Trước khi sửa bất kỳ file code nào, bắt buộc đọc đầy đủ 6 tài liệu sau theo đúng thứ tự:

1. `docs/pgs-hub/01-product-requirements.md`
2. `docs/pgs-hub/02-technical-requirements.md`
3. `docs/pgs-hub/03-app-flow.md`
4. `docs/pgs-hub/04-ui-ux-specification.md`
5. `docs/pgs-hub/05-backend-architecture.md`
6. `docs/pgs-hub/06-implementation-plan.md`

Nếu các file đang nằm ở đường dẫn khác, hãy tìm theo đúng tên file; không bỏ qua tài liệu nào.

## Bước 1 — Audit repository

Kiểm tra:

- Framework, package manager và phiên bản runtime.
- Cấu trúc source hiện tại.
- Auth và session.
- Database schema, migrations và RLS/authorization.
- Storage.
- Module tài khoản, chấm công, dự án và Task đang có.
- Dữ liệu cũ và seed/demo.
- Lint, typecheck, test và production build hiện trạng.

Không in secret hoặc nội dung `.env` nhạy cảm.

Sau khi audit, báo cáo ngắn:

1. Hiện repository đã có những gì.
2. Phần nào giữ nguyên.
3. Phần nào thiếu hoặc sai với 6 tài liệu.
4. Migration nào cần tạo.
5. Rủi ro dữ liệu/bảo mật.
6. Kế hoạch thực hiện phase hiện tại.

## Bước 2 — Bắt đầu triển khai

Không dừng sau bản kế hoạch. Hãy bắt đầu code ngay theo thứ tự trong `06-implementation-plan.md`.

Ưu tiên đầu tiên:

```text
Audit và bảo vệ dữ liệu
→ Auth thật
→ Pending approval
→ Một Super Admin duy nhất
→ Organization/workspace
→ Role/permission/RLS
→ Admin quản lý tài khoản và audit
```

Không làm dashboard giả trước khi auth và authorization hoạt động.

## Quy tắc bắt buộc

- Đây không phải landing page.
- Không chỉ dựng giao diện.
- Không làm login giả bằng localStorage hoặc state frontend.
- Không hardcode password, token, role hoặc dữ liệu đăng nhập.
- Không dùng dữ liệu giả production.
- Không để button chính không có chức năng.
- Mọi mutation phải validate và kiểm tra quyền phía server.
- Client A không được xem Client B.
- Pending user không được đọc dữ liệu nghiệp vụ.
- Chỉ có một Super Admin active, được database bảo đảm.
- Không xóa audit log từ UI.
- Không xóa/ghi đè dữ liệu cũ khi chưa có migration và backup.
- Không giả khả năng web browser đọc Wi-Fi SSID, MAC hoặc tên máy.
- Chấm công dùng server time và các yếu tố xác minh đã quy định.
- Project progress dùng milestone trọng số.
- Task transition phải qua server state machine.
- Comment/file internal không được trả về client.
- Approved deliverable version không được ghi đè.

## UI cố định

```text
Nền chính: #FFFFFF
Nền kem: #FFFBF0
Vàng chính: #FFC400
Vàng đậm: #D99A00
Chữ chính: #171717
Chữ phụ: #606060
Font: Space Grotesk
Card radius mặc định: 16px
```

Không tự đổi màu, font, radius, container, breakpoint hoặc responsive structure nếu không có yêu cầu mới.

## Khi thiếu credentials

Nếu thiếu Google OAuth, SMS OTP hoặc email provider:

- Tạo adapter, database, UI, validation và `.env.example` đầy đủ.
- Hiển thị “Chưa cấu hình nhà cung cấp”.
- Mock chỉ được dùng development và phải có nhãn.
- Không fake success production.
- Tiếp tục triển khai phần không bị chặn.

## Kiểm tra sau mỗi phase

Chạy:

- Lint.
- Typecheck.
- Unit/integration tests liên quan.
- Production build.

Sửa hết lỗi trước khi sang phase tiếp theo.

Cuối mỗi phase, báo cáo:

1. File đã thay đổi.
2. Migration/policy đã tạo.
3. Luồng đã hoạt động.
4. Test/build và kết quả.
5. Cấu hình còn thiếu.
6. Rủi ro còn lại.
7. Phase tiếp theo.

Hãy bắt đầu ngay bằng audit repository, sau đó triển khai phase đầu tiên thay vì chỉ đưa thêm một prompt hoặc kế hoạch mới.

