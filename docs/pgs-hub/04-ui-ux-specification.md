# 04 — Tài liệu thiết kế UI/UX PGS Hub

## 1. Định hướng thiết kế

PGS Hub cần tạo cảm giác:

- Sáng, sạch và chuyên nghiệp.
- Hiện đại nhưng không phô trương.
- Tập trung vào dữ liệu cần xử lý.
- Dễ hiểu với người không chuyên công nghệ.
- Đồng bộ giữa nhân viên và khách hàng.

Đây là ứng dụng vận hành, không phải landing page. Không dùng animation nặng, background tối hoặc hiệu ứng trang trí làm giảm tốc độ xử lý.

## 2. Design tokens cố định

### Màu

```text
Background primary: #FFFFFF
Background cream:   #FFFBF0
Primary yellow:     #FFC400
Primary dark:       #D99A00
Text primary:       #171717
Text secondary:     #606060
```

- Viền dùng màu trung tính sáng và nhất quán.
- Success, warning, destructive có token riêng và đạt WCAG AA.
- Không dùng màu là tín hiệu duy nhất; luôn kèm label/icon/text.
- Vàng dùng cho CTA, active state, badge quan trọng và progress; không phủ diện tích lớn.

### Font

- Space Grotesk toàn ứng dụng.
- Fallback Inter, Arial, sans-serif.
- Không tự đổi font ở từng module.
- Số liệu dùng tabular numerals nếu component hỗ trợ.

### Hình học

- Card radius mặc định 16px.
- Button, input, badge và modal dùng cùng hệ radius.
- Hệ spacing theo bội số 4/8px.
- Shadow nhẹ, chỉ dùng để phân lớp.
- Không tự thay radius theo trang.

## 3. App shell desktop

```text
┌──────────── Sidebar 256px ────────────┬──────────────── Main ────────────────┐
│ Logo PGS Hub                          │ Topbar: breadcrumb | search | notice │
│ Workspace                             ├───────────────────────────────────────┤
│ Tổng quan                             │ Page header                           │
│ Dự án                                 │ Filters/actions                       │
│ Task                                  │ Main content                          │
│ Khách hàng                            │                                       │
│ Chấm công                             │                                       │
│ ...                                   │                                       │
│ User profile                          │                                       │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

- Sidebar 248–264px, có thể collapse.
- Main max-width khoảng 1440px.
- Topbar sticky nếu không gây lỗi layout.
- Content không sát mép màn hình.
- Header một dòng nếu đủ chỗ; mobile tự wrap.

## 4. App shell tablet/mobile

### Tablet

- Sidebar collapse thành icon rail hoặc drawer.
- Bảng ẩn cột ít quan trọng.
- Dialog lớn thành sheet.

### Mobile dưới 768px

- Topbar có menu, logo, notification, avatar.
- Bottom navigation tối đa 5 mục theo vai trò.
- Danh sách thay bảng khi cần.
- Kanban chuyển thành tab trạng thái hoặc danh sách dọc.
- Task detail và form tạo dự án dùng full-screen sheet.
- CTA chính nằm trong vùng dễ chạm.
- Không có horizontal scroll toàn trang.

## 5. Component system

### Button

- Primary: hành động chính duy nhất của vùng.
- Secondary: hành động phụ.
- Ghost: điều hướng/ít nhấn mạnh.
- Destructive: chỉ xóa/khóa/hủy nghiêm trọng.
- Có loading và disabled.
- Icon-only có aria-label và tooltip.

### Form

- Label luôn hiển thị.
- Placeholder không thay label.
- Error dưới field.
- Required được đánh dấu rõ.
- Form dài chia section/step.
- Nút Save có dirty state khi phù hợp.

### Table

- Header rõ, không dùng quá nhiều đường kẻ dọc.
- Sticky header cho bảng dài.
- Sort/filter nhất quán.
- Row click mở detail nhưng vẫn có menu hành động.
- Empty state không dùng số liệu demo production.

### Badge/status

- Label tiếng Việt.
- Mỗi status có màu và text.
- Không dùng badge cho mọi metadata.

### Toast/alert

- Thành công: ngắn, có thời gian/hành động nếu cần.
- Lỗi: nói rõ nguyên nhân có thể xử lý.
- Không hiển thị raw server error.

### Drawer/sheet/modal

- Task detail ưu tiên drawer desktop.
- Mobile full-screen sheet.
- Hành động destructive có confirm và mô tả đối tượng.

## 6. Màn hình đăng nhập

### Desktop

- Hai cột hoặc card trung tâm tùy không gian.
- Nền trắng/kem, không nền tối.
- Logo PGS Hub.
- Tiêu đề ngắn.
- Form email/password.
- Nút Google.
- Liên kết đăng nhập phone OTP.
- Quên mật khẩu.
- Đăng ký.

### Trạng thái

- Loading.
- Sai thông tin.
- Email chưa xác minh.
- Tài khoản pending.
- Tài khoản bị khóa.
- Provider chưa cấu hình.
- Network error.

## 7. Màn hình chờ phân quyền

Hiển thị đơn giản:

- Icon trạng thái.
- “Tài khoản đã được tạo thành công”.
- “Vui lòng chờ PGS Agency xác nhận và cấp quyền”.
- Email/phone đã xác minh.
- Trạng thái yêu cầu.
- Thời gian gửi.
- Nút đăng xuất.

Không hiển thị menu nghiệp vụ.

## 8. Dashboard Super Admin

### Header

- Lời chào.
- Workspace PGS Agency.
- Ngày hiện tại.
- CTA phù hợp: xử lý yêu cầu hoặc tạo dự án.

### Khối “Cần bạn xử lý”

- Tài khoản chờ duyệt.
- Bất thường chấm công.
- Dự án rủi ro.
- Task quá hạn.
- Thiết bị chờ duyệt.

### KPI

Tối đa 4–6 KPI quan trọng trên một view:

- Doanh nghiệp khách hàng.
- Thành viên.
- Người online.
- Dự án hoạt động.
- Task quá hạn.
- Yêu cầu pending.

### Hoạt động gần đây

Timeline có actor, hành động, entity và thời gian. Không hiển thị raw JSON.

## 9. Quản lý tài khoản và phân quyền

### Danh sách

Cột:

- Người dùng.
- Organization.
- Role.
- Trạng thái.
- Online/last seen.
- Phương thức đăng nhập.
- Ngày tạo.
- Hành động.

Filter:

- Pending/active/suspended.
- Role.
- Organization.
- Project.
- Online.

### Chi tiết người dùng

Tabs:

1. Tổng quan.
2. Tổ chức và dự án.
3. Vai trò và quyền.
4. Session.
5. Thiết bị.
6. Nhật ký.
7. Bảng công nếu có quyền.

### Modal duyệt tài khoản

Step:

1. Xác nhận identity.
2. Chọn/tạo organization.
3. Chọn base role.
4. Chọn custom permissions.
5. Chọn project.
6. Review và xác nhận.

## 10. Màn hình chấm công nhân viên

### Khu vực chính

- Ngày và giờ server.
- Trạng thái hiện tại: Chưa vào/Đã vào/Đã ra.
- Ca làm việc.
- Nút Chấm công vào hoặc ra.
- Trạng thái IP/vị trí/thiết bị/QR.
- Hướng dẫn quét QR.

### Kết quả

Thành công:

```text
Chấm công vào thành công
08:03 · Đi muộn 3 phút
Văn phòng PGS Agency
```

Thất bại:

```text
Chưa thể chấm công
Mã QR đã hết hạn. Vui lòng quét mã mới tại văn phòng.
```

### Bảng công tháng

Header:

- Chọn tháng.
- Công thực tế/công chuẩn.
- Phép còn lại.
- Đi muộn.
- Bất thường.

Calendar/list từng ngày:

- Ngày.
- Ca.
- Check-in/out.
- Trạng thái.
- Phút muộn/sớm.
- Ghi chú.
- Hành động gửi bổ sung.

Mobile dùng list ngày, không ép lịch quá nhỏ.

## 11. Bảng tổng quát dự án

### Header

- Badge ngữ cảnh nếu cần.
- H1 “Bảng tổng quát dự án”.
- Mô tả: “Theo dõi tiến độ, deadline và điểm cần xử lý trong toàn bộ dự án.”
- Nút “Tạo dự án mới” theo quyền.

### KPI

- Tổng dự án.
- Cần chú ý.
- Task quá hạn.
- Chờ khách duyệt.

### Bộ lọc

- Search tên/mã.
- Trạng thái.
- Khách hàng.
- Manager.
- Dịch vụ.
- Sức khỏe.
- Khoảng ngày.

### Bảng desktop

```text
Dự án | Khách hàng | Dịch vụ | Quản lý | Tiến độ | Deadline | Trạng thái
```

Project cell:

- Health dot có label accessible.
- Tên.
- Mã.

Progress:

- Thanh tiến độ.
- Phần trăm.
- Không chỉ màu.

### Mobile card

- Tên/mã.
- Khách hàng.
- Trạng thái.
- Progress.
- Deadline.
- PM.
- Task quá hạn nếu có.

## 12. Wizard tạo dự án

### Step 1 — Khách hàng

- Chọn organization có sẵn.
- Tạo organization mới nếu có quyền.

### Step 2 — Thông tin

- Tên, mã, dịch vụ, mô tả, scope, date, priority.

### Step 3 — Template và milestone

- Chọn template.
- Preview milestone/Task được tạo.
- Điều chỉnh weight và deadline.
- Cảnh báo tổng weight.

### Step 4 — Team

- PM/Account.
- Thành viên PGS.
- Thành viên client.

### Step 5 — Quyền

- Client view/comment/approve/download.
- Internal visibility.

### Step 6 — Review

- Tóm tắt.
- Cảnh báo thiếu.
- Lưu draft hoặc kích hoạt.

## 13. Trang chi tiết dự án

### Header card

- Icon/service.
- Tên và mã.
- Khách hàng.
- Status/health.
- PM.
- Deadline.
- Progress.
- CTA tạo Task/chỉnh sửa.

### Tabs

```text
Tổng quan
Timeline
Task
Duyệt
Trao đổi
Tệp
Hoạt động
```

Nếu module hiện có:

```text
Ads
Hợp đồng
Thanh toán
```

### Tổng quan desktop

Cột chính:

- Milestone timeline.
- Task đang làm/quá hạn.
- Approval.

Cột phụ:

- Task summary.
- Team.
- Mốc tiếp theo.
- Activity.

### Milestone

Mỗi dòng:

- Done/current/future indicator.
- Tên.
- Weight.
- Completion.
- Deadline.
- Owner.
- Task/overdue count.

## 14. Kanban Task

### Header

- Tên view.
- Project selector.
- Assignee filter.
- Priority/deadline filter.
- Nút tạo Task.

### Cột mặc định

1. Cần thực hiện.
2. Đang thực hiện.
3. Chờ duyệt.
4. Hoàn thành.

Trong “Chờ duyệt” có badge:

- Nội bộ.
- Khách hàng.
- Yêu cầu chỉnh sửa.

### Card Task

- Mã.
- Tiêu đề.
- Assignee avatar/name.
- Deadline.
- Priority.
- Checklist progress.
- Comment/file count khi có.
- Overdue label.

Không nhồi tất cả metadata lên card.

### Kéo thả

- Preview vị trí.
- Optimistic update.
- Loading ngắn.
- Rollback và toast nếu server từ chối.
- Keyboard-accessible alternative để đổi trạng thái.

### Mobile

- Segmented tabs theo trạng thái.
- Một cột mỗi lần.
- Swipe chỉ dùng nếu không cản scroll.
- Có dropdown đổi trạng thái trong Task detail.

## 15. Task detail

### Header

- Mã/tiêu đề.
- Status.
- Project/milestone.
- Menu action theo quyền.

### Nội dung

- Description.
- Assignee/reviewer/watchers.
- Priority/date/estimate.
- Checklist/subtasks.
- Dependencies.
- Attachments.
- Deliverable versions.
- Comments.
- Activity.

### Composer bình luận

- Visibility rõ: Nội bộ/Khách hàng nhìn thấy.
- Mention.
- Attach file.
- Không để client chọn internal.

### Approval panel

- Version đang duyệt.
- Reviewer.
- Deadline phản hồi.
- Phê duyệt.
- Yêu cầu chỉnh sửa.
- Bình luận.

## 16. Action Center và notification

Nhóm:

- Cần phê duyệt.
- Sắp đến hạn.
- Quá hạn.
- Yêu cầu tài khoản.
- Chấm công.
- Mention.

Mỗi item có:

- Icon/category.
- Nội dung một dòng.
- Actor/entity.
- Thời gian.
- Deep link.
- Read/unread.

## 17. Empty states

Ví dụ:

- Chưa có dự án: giải thích và CTA tạo nếu có quyền.
- Không có Task được giao: không dùng Task giả.
- Không có yêu cầu pending: xác nhận đã xử lý hết.
- Chưa có dữ liệu chấm công: hướng dẫn chấm công đầu tiên.
- Filter không có kết quả: nút xóa filter.

## 18. Loading và error

- Skeleton phải giống cấu trúc thật, không nhấp nháy quá mức.
- Mutation button disabled và spinner.
- Error có message tiếng Việt và request ID nếu cần hỗ trợ.
- Session expired có modal/redirect rõ.
- Permission denied có trang 403.
- Network error không giả thành công.

## 19. Accessibility checklist

- Contrast AA.
- Heading hierarchy.
- Form label thật.
- Error liên kết bằng aria-describedby.
- Focus trap trong dialog.
- Escape đóng modal nếu an toàn.
- Keyboard cho menu/table/Kanban action.
- Status có text.
- Avatar có tên thay thế.
- Chart có bảng/summary accessible nếu dùng.

## 20. Motion

- 150–250ms cho hover, drawer, menu.
- Không animation layout dài.
- Tôn trọng `prefers-reduced-motion`.
- Không dùng GSAP/Three.js cho app vận hành nếu không có lý do nghiệp vụ.

## 21. Quy tắc không tự thay đổi

- Không đổi font Space Grotesk.
- Không đổi bảng màu vàng–trắng.
- Không đổi radius tùy tiện.
- Không đổi container/breakpoint nếu không có yêu cầu.
- Chỉnh một chi tiết phải giữ nguyên phần còn lại.
- Không dùng dark theme mặc định.
- Không thêm biểu đồ hoặc card chỉ để lấp khoảng trống.

## 22. UI acceptance checklist

- Ba màn hình Dự án gồm Project Overview, Project Detail và Kanban thống nhất.
- Menu thay đổi đúng vai trò.
- Không có nội dung bị khuất trên mobile.
- Bảng chuyển layout hợp lý.
- Modal lớn thành full-screen sheet mobile.
- Mọi action có loading/success/error.
- Không có button chính không hoạt động.
- Không lộ menu hoặc field ngoài quyền.

