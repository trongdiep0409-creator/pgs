# PGS Hub — Bộ tài liệu triển khai với Antigravity

Bộ hồ sơ này tách dự án thành 6 tài liệu bắt buộc phải đọc trước khi code:

1. `01-product-requirements.md` — Yêu cầu sản phẩm.
2. `02-technical-requirements.md` — Yêu cầu kỹ thuật.
3. `03-app-flow.md` — Luồng của ứng dụng.
4. `04-ui-ux-specification.md` — Thiết kế UI/UX.
5. `05-backend-architecture.md` — Cấu trúc backend.
6. `06-implementation-plan.md` — Kế hoạch thực hiện.

File `07-antigravity-execution-prompt.md` là lệnh khởi chạy để dán vào Antigravity sau khi đưa toàn bộ thư mục tài liệu vào repository.

## Thứ tự sử dụng

1. Đặt thư mục này vào repository PGS Hub, đề xuất tại `docs/pgs-hub/`.
2. Mở Antigravity tại thư mục gốc của repository.
3. Dán nội dung `07-antigravity-execution-prompt.md`.
4. Yêu cầu Antigravity đọc đủ 6 tài liệu theo thứ tự trước khi sửa code.
5. Chỉ bắt đầu Phase 1 sau khi Antigravity đã báo cáo hiện trạng repository, phần giữ lại và migration cần tạo.

## Quy tắc ưu tiên

- Yêu cầu mới nhất của chủ dự án ưu tiên hơn tài liệu cũ.
- Không tự thay đổi hệ màu vàng–trắng, font Space Grotesk, bo góc, responsive hoặc logic phân quyền.
- Không làm đăng nhập giả, dữ liệu giả hoặc nút không có chức năng trong production.
- Không xóa hoặc ghi đè dữ liệu cũ khi chưa có migration, backup và phương án rollback.
- Trước mắt hoàn thiện web app; backend phải dùng lại được cho mobile app sau này.

