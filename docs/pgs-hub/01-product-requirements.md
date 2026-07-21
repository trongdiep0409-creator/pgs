# 01 — Tài liệu yêu cầu sản phẩm PGS Hub

## 1. Thông tin tài liệu

- Sản phẩm: PGS Hub.
- Đơn vị sử dụng: PGS Agency và doanh nghiệp khách hàng.
- Loại sản phẩm: Web app quản trị vận hành nội bộ kết hợp cổng khách hàng.
- Ngôn ngữ: Tiếng Việt.
- Múi giờ mặc định: Asia/Bangkok.
- Giai đoạn hiện tại: Hoàn thiện web app trước, mobile app sau.

## 2. Tầm nhìn sản phẩm

PGS Hub là nơi tập trung toàn bộ hoạt động liên quan đến tài khoản, phân quyền, nhân sự, chấm công, khách hàng, dự án, Task, file, phê duyệt và nhật ký vận hành của PGS Agency.

Hệ thống phải giúp:

- Ban quản trị nhìn thấy toàn cảnh hoạt động.
- Quản lý kiểm soát tiến độ và trách nhiệm.
- Nhân viên biết rõ việc cần làm và thời hạn.
- Kế toán nhận bảng công đã tổng hợp, có thể đối soát.
- Khách hàng theo dõi đúng dự án của mình, phê duyệt nội dung và trao đổi minh bạch.
- Mỗi hành động quan trọng đều có người thực hiện, thời gian và lịch sử.

## 3. Phạm vi phiên bản web app

### 3.1 Phạm vi bắt buộc

1. Đăng nhập và quản lý tài khoản.
2. Một tài khoản Super Admin duy nhất.
3. Duyệt tài khoản mới và phân quyền.
4. Quản lý tổ chức, khách hàng và thành viên.
5. Trạng thái online, phiên đăng nhập và nhật ký hoạt động.
6. Chấm công, nghỉ phép, tăng ca, bổ sung công và bảng công tháng.
7. Bảng tổng quát dự án.
8. Tạo và quản lý dự án.
9. Milestone và tiến độ theo trọng số.
10. Task, Kanban, checklist, file, bình luận và phê duyệt.
11. Thông báo trong ứng dụng và email cho sự kiện quan trọng.
12. Nhập lại dữ liệu cũ từ CSV/XLSX.

### 3.2 Phạm vi chuẩn bị để mở rộng

- Hợp đồng điện tử.
- Hóa đơn, thanh toán, công nợ và bảng lương.
- Báo cáo Meta Ads, Google Ads và TikTok Ads.
- Mobile app dùng chung backend.
- Push notification.
- Desktop agent hỗ trợ chấm công tự động khi bật máy.

Không xóa các module mở rộng nếu repository hiện tại đã có.

### 3.3 Ngoài phạm vi MVP

- Không xây clone Zalo hoặc hệ thống chat độc lập hoàn chỉnh.
- Không tự động chuyển tiền hoặc thanh toán lương.
- Không tuyên bố chữ ký điện tử có giá trị pháp lý khi chưa tích hợp nhà cung cấp thật.
- Không tự động chấm công chỉ vì máy kết nối Wi-Fi trong phiên bản web.
- Không theo dõi GPS liên tục.
- Không theo dõi bàn phím hoặc hoạt động ngoài PGS Hub.

## 4. Nhóm người dùng

### 4.1 Super Admin

- Chỉ có một tài khoản đang hoạt động trên toàn hệ thống.
- Quản lý toàn bộ tổ chức, tài khoản, vai trò, quyền, dự án và cấu hình.
- Duyệt hoặc từ chối tài khoản mới.
- Xem người online, session, thiết bị và audit log.
- Cấu hình chấm công và duyệt thiết bị tin cậy.
- Không được xóa audit log từ giao diện.

### 4.2 Manager/Account

- Quản lý tổ chức, phòng ban hoặc dự án được giao.
- Tạo milestone và Task nếu có quyền.
- Phân công, kiểm tra và duyệt nội bộ.
- Duyệt đơn từ theo phạm vi.
- Theo dõi dự án có nguy cơ chậm.

### 4.3 Accountant

- Xem bảng công đã được duyệt hoặc khóa.
- Kiểm tra bất thường, nghỉ phép, tăng ca và điều chỉnh.
- Xuất dữ liệu kế toán.
- Chỉ xem dữ liệu tài chính hoặc nhân sự được cấp.

### 4.4 Employee

- Xem dự án và Task được giao.
- Cập nhật công việc, checklist và file.
- Bình luận, gửi duyệt nội bộ.
- Chấm công và xem bảng công của chính mình.
- Gửi đơn nghỉ, tăng ca hoặc bổ sung công.

### 4.5 Client Owner

- Xem toàn bộ dự án thuộc doanh nghiệp của mình trong phạm vi được cấp.
- Xem nội dung, file và tiến độ được chia sẻ.
- Bình luận, phê duyệt hoặc yêu cầu chỉnh sửa.
- Quản lý thành viên phía khách hàng nếu được cho phép.

### 4.6 Client Member

- Chỉ xem dự án được cấp.
- Quyền có thể giới hạn theo xem, bình luận, duyệt hoặc tải file.

### 4.7 Viewer

- Chỉ xem dữ liệu được cấp.
- Không tạo, sửa, bình luận, tải lên hoặc phê duyệt.

## 5. Yêu cầu đăng nhập và onboarding

### PR-AUTH-01 — Email và mật khẩu

Người dùng có thể đăng nhập bằng email và mật khẩu. Hệ thống có xác minh email, loading, thông báo sai thông tin và khóa tạm thời khi thử sai quá nhiều.

### PR-AUTH-02 — Google

Người dùng có thể chọn “Tiếp tục bằng Google”. Hệ thống dùng OAuth, không lấy hoặc lưu mật khẩu Gmail.

### PR-AUTH-03 — Số điện thoại

Người dùng có thể đăng nhập hoặc xác minh bằng OTP gửi đến số điện thoại. OTP phải có thời hạn, giới hạn gửi lại và giới hạn số lần nhập sai.

### PR-AUTH-04 — Quên mật khẩu

Người dùng có thể yêu cầu liên kết đặt lại mật khẩu qua email. Có thể bổ sung khôi phục bằng OTP nếu số điện thoại đã xác minh.

### PR-AUTH-05 — Tài khoản mới chờ duyệt

Sau khi đăng ký và xác minh danh tính:

- Profile có trạng thái `pending_approval`.
- Người dùng chỉ thấy màn hình chờ phân quyền.
- Hệ thống gửi email cho Super Admin.
- Người dùng chưa được xem tổ chức, dự án, Task, file hoặc dữ liệu chấm công.

### PR-AUTH-06 — Duyệt tài khoản

Super Admin chọn:

- Tổ chức.
- Vai trò.
- Phòng ban nếu có.
- Dự án.
- Quyền tùy chỉnh.

Sau khi duyệt, hệ thống gửi email thông báo và người dùng vào dashboard đúng vai trò.

### PR-AUTH-07 — Phiên và thiết bị

- Người dùng xem thiết bị đang đăng nhập.
- Có thể đăng xuất thiết bị hiện tại hoặc toàn bộ thiết bị.
- Super Admin có thể thu hồi session.
- Hệ thống ghi login success, login failed, logout và reset password vào audit log.

## 6. Yêu cầu tổ chức và phân quyền

### PR-ORG-01 — Tổ chức

Super Admin có thể tạo tổ chức bằng tên nhập tay. Loại tổ chức gồm nội bộ, khách hàng, đối tác hoặc loại tùy chỉnh.

Mỗi tổ chức có:

- Tên pháp nhân.
- Tên thương hiệu.
- Mã số thuế.
- Địa chỉ.
- Đại diện.
- Email, số điện thoại.
- Logo.
- Trạng thái.
- Ghi chú nội bộ.

### PR-RBAC-01 — Vai trò nền tảng

```text
super_admin
manager
accountant
employee
client_owner
client_member
viewer
custom
```

### PR-RBAC-02 — Vai trò tùy chỉnh

Super Admin có thể tạo vai trò như Content, Designer, Developer, SEO, Ads, Trưởng phòng hoặc Cộng tác viên và chọn quyền chi tiết.

### PR-RBAC-03 — Phân quyền theo phạm vi

Quyền được xác định bởi:

- Vai trò nền tảng.
- Tổ chức hiện tại.
- Thành viên dự án.
- Vai trò tùy chỉnh.
- Quyền cấp thêm.
- Quyền bị thu hồi.

Người dùng đoán được URL hoặc ID vẫn không được truy cập dữ liệu ngoài quyền.

## 7. Dashboard quản trị

Dashboard Super Admin phải có:

- Tổng doanh nghiệp khách hàng.
- Tổng thành viên.
- Người đang online.
- Tài khoản đang chờ phân quyền.
- Tổng dự án.
- Dự án đang triển khai.
- Dự án có rủi ro.
- Task quá hạn.
- Bất thường chấm công.
- Hoạt động gần đây.
- Nhật ký login/logout.

Ưu tiên khối “Cần bạn xử lý” thay vì biểu đồ trang trí.

## 8. Yêu cầu chấm công

### PR-ATT-01 — Check-in/check-out

Nhân viên có thể chấm công vào và ra. Kết quả phải hiển thị:

- Thành công hoặc thất bại.
- Giờ máy chủ.
- Đúng giờ hoặc số phút đi muộn.
- Văn phòng/hình thức làm việc.
- Nguyên nhân nếu thất bại.

### PR-ATT-02 — Xác minh

Mỗi lượt có thể kết hợp:

- Tài khoản.
- IP mạng văn phòng.
- Geolocation/geofence.
- Mã thiết bị PGS Hub.
- QR động.
- Thời gian máy chủ.

Không dùng public IP để xác định máy hoặc người dùng duy nhất.

### PR-ATT-03 — Thiết bị tin cậy

Sau 5 lượt chấm công được xác minh trên cùng thiết bị, hệ thống tạo ứng viên thiết bị tin cậy. Super Admin phải duyệt trước khi thiết bị có trạng thái trusted.

### PR-ATT-04 — Đi muộn

Giờ vào mặc định là 08:00 nhưng cấu hình theo ca. Cho phép thiết lập các mức 1–15, 16–30, 31–60 và trên 60 phút. Không tự động trừ lương nếu chưa có bước duyệt.

### PR-ATT-05 — Bảng công tháng

Hiển thị:

- Công thực tế/công chuẩn.
- Phép còn lại/phép được cấp.
- Ngày nghỉ và loại nghỉ.
- Ngày đi muộn, số phút.
- Ngày về sớm.
- Ngày thiếu check-in/check-out.
- Tăng ca.
- Chi tiết từng ngày.

Công chuẩn được tính theo lịch ca, ngày nghỉ, ngày lễ và ngày làm bù; không hardcode 24 công. Hệ thống xử lý đúng tháng 28, 29, 30 và 31 ngày.

### PR-ATT-06 — Đơn từ

Hỗ trợ nghỉ phép, nghỉ không lương, remote, công tác, tăng ca, bổ sung công và giải trình bất thường.

### PR-ATT-07 — Cuối tháng

Bảng công được tổng hợp, Manager duyệt, khóa kỳ, chuyển Accountant và xuất Excel/PDF. Kỳ đã khóa chỉ sửa bằng adjustment có lý do và phê duyệt.

## 9. Yêu cầu bảng tổng quát dự án

### PR-PROJ-01 — KPI

- Tổng dự án.
- Đang triển khai.
- Cần chú ý/có rủi ro.
- Chờ khách hàng.
- Task quá hạn.
- Nội dung chờ duyệt.

### PR-PROJ-02 — Bộ lọc

- Tên/mã dự án.
- Khách hàng.
- Manager/Account.
- Thành viên.
- Dịch vụ.
- Trạng thái.
- Sức khỏe dự án.
- Khoảng ngày.
- Có Task quá hạn.
- Đang chờ khách hàng.

### PR-PROJ-03 — Danh sách

Mỗi dự án hiển thị mã, tên, khách hàng, dịch vụ, PM, tiến độ, mốc tiếp theo, deadline, Task quá hạn, trạng thái và sức khỏe.

### PR-PROJ-04 — Quyền xem

- Super Admin: tất cả.
- Manager: dự án được giao.
- Employee: dự án có membership hoặc Task được giao.
- Client: dự án thuộc tổ chức và được cấp quyền.
- Accountant: thông tin cần thiết theo quyền tài chính/nhân sự.

## 10. Yêu cầu chi tiết dự án

### PR-PROJ-05 — Trường dự án

- Mã và tên.
- Tổ chức khách hàng.
- Dịch vụ.
- PM/Account.
- Thành viên PGS.
- Thành viên khách hàng.
- Ngày bắt đầu và deadline.
- Ngày thực tế.
- Trạng thái.
- Sức khỏe.
- Mức ưu tiên.
- Mô tả và phạm vi.
- Rủi ro.
- Ghi chú nội bộ.
- Hợp đồng/ngân sách nếu module đã có.

### PR-PROJ-06 — Trạng thái

```text
draft
awaiting_contract
awaiting_payment
active
waiting_client
on_hold
at_risk
completed
archived
cancelled
```

### PR-PROJ-07 — Milestone

Mỗi milestone có tên, trọng số, ngày, người phụ trách, trạng thái, tiến độ và Task liên quan.

Tổng trọng số phải bằng 100% trước khi kích hoạt dự án.

```text
project_progress = SUM(
  milestone.weight_percent * milestone.completion_percent / 100
)
```

Không mặc định dùng số Task hoàn thành chia tổng Task.

### PR-PROJ-08 — Sức khỏe dự án

```text
healthy
attention
at_risk
```

Hệ thống đề xuất dựa trên milestone/Task quá hạn, tiến độ lệch kế hoạch, deadline gần và thời gian chờ khách hàng. Manager có thể override nhưng phải ghi lý do.

## 11. Yêu cầu Task và Kanban

### PR-TASK-01 — Trường Task

- Mã và tiêu đề.
- Dự án/milestone.
- Mô tả.
- Người thực hiện.
- Reviewer.
- Watchers.
- Priority.
- Ngày bắt đầu/deadline.
- Estimate/actual time.
- Trạng thái.
- Checklist/task con.
- Dependencies.
- Tags.
- File.
- Bình luận.
- Visibility.
- Người tạo, hoàn thành và thời gian.

### PR-TASK-02 — Trạng thái

```text
backlog
todo
in_progress
internal_review
waiting_client
revision_requested
done
cancelled
```

### PR-TASK-03 — Workflow

- Chỉ người có quyền được thay đổi trạng thái.
- Sang internal review phải có reviewer.
- Sang waiting client phải có nội dung/file cần duyệt.
- Client yêu cầu sửa phải nhập ý kiến.
- Done lưu người và thời gian hoàn thành.
- Reopen bắt buộc lý do.
- Quá hạn tạo cảnh báo nhưng không tự đổi trạng thái nghiệp vụ.

### PR-TASK-04 — View

- My Tasks.
- All Tasks được phép xem.
- Kanban.
- List.
- Calendar.
- Timeline.
- Workload dành cho Manager/Admin.
- Task quá hạn.
- Task chờ khách hàng.

### PR-TASK-05 — Duyệt và phiên bản

- Deliverable phải qua nội bộ trước khi gửi khách, trừ override có lý do.
- Mỗi lần gửi lại tạo version mới.
- Bản approved không ghi đè.
- Client có thể phê duyệt, yêu cầu sửa hoặc bình luận.
- Comment nội bộ không được trả về client qua UI hoặc API.

## 12. Thông báo và nhật ký

Thông báo in-app bắt buộc, email cho sự kiện quan trọng. Mỗi thông báo có deep link đến đúng tài khoản, dự án, Task, file, phê duyệt hoặc yêu cầu chấm công.

Audit log ghi actor, action, entity, tổ chức/dự án, IP, user agent, request ID, thời gian và metadata thay đổi an toàn. Không lưu password, OTP, token hoặc secret.

## 13. Nhập dữ liệu cũ

Hỗ trợ CSV/XLSX cho tổ chức, người dùng, dự án, milestone, Task, chấm công, nghỉ phép và kỳ công.

Luồng:

```text
Upload
→ Chọn loại dữ liệu
→ Map cột
→ Preview/dry-run
→ Validate
→ Báo trùng/lỗi
→ Xác nhận
→ Import batch
→ Báo cáo kết quả
```

Không ghi đè âm thầm. Lưu nguồn, batch ID, người import, thời gian và raw source.

## 14. Tiêu chí thành công sản phẩm

- Người dùng đăng ký và được Admin duyệt không cần can thiệp database thủ công.
- Không có truy cập chéo khách hàng hoặc dự án.
- Admin nhìn thấy người online và hành động quan trọng.
- Nhân viên chấm công và xem bảng công tháng rõ ràng.
- Kế toán nhận được bảng công đã khóa và có thể xuất.
- PM nhìn thấy dự án có nguy cơ và Task quá hạn.
- Tiến độ dự án tính đúng theo milestone trọng số.
- Client duyệt deliverable mà không thấy dữ liệu nội bộ.
- Dữ liệu cũ được import có preview và báo cáo lỗi.
- Giao diện dùng tốt trên desktop, tablet và mobile browser.

## 15. Definition of Done cấp sản phẩm

Một chức năng chỉ hoàn thành khi:

- Có UI đầy đủ trạng thái.
- Có dữ liệu thật và mutation thật.
- Có authorization phía server.
- Có audit nếu là hành động quan trọng.
- Có notification nếu nghiệp vụ yêu cầu.
- Có test cho luồng chính và quyền.
- Responsive và accessible.
- Không làm mất dữ liệu cũ.

