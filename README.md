# PGS Hub - Hệ thống Quản lý Hoạt động PGS Agency

PGS Hub là ứng dụng web quản lý toàn bộ quy trình làm việc của PGS Agency, kết nối trực tiếp khách hàng và nhân viên nội bộ.

## 🚀 Tính năng cốt lõi

1. **Bảng điều khiển vai trò (Role-based Dashboard)**: Action Center hiển thị ưu tiên "Cần bạn xử lý" cho từng vai trò người dùng (Super Admin, Admin, Manager, Accountant, Employee, Client Owner, Client Member).
2. **Quản lý Tiến độ trọng số (Weighted Milestones)**: Tiến độ dự án tự động tính toán chính xác theo công thức trọng số phần trăm thực tế.
3. **Trao đổi & Bình luận**: Luồng thảo luận riêng biệt cho từng Task và trạng thái duyệt sản phẩm bàn giao.
4. **Duyệt Deliverables**: Phiên bản hóa deliverables, hỗ trợ phê duyệt trực tiếp hoặc yêu cầu sửa đổi đi kèm ý kiến khách hàng.
5. **Ký số & Thanh toán**: Nhật ký chứng thực ký số, danh sách hóa đơn theo đợt và tải lên ủy nhiệm chi.
6. **Chấm công Geolocation**: Check-in định vị GPS so khớp geofence 100m văn phòng.
7. **Báo cáo Quảng cáo Ads**: Biểu đồ trực quan tích hợp `Recharts` hiển thị chi tiêu, Impressions, Clicks và Leads.

---

## 🛠️ Stack kỹ thuật
- **Framework**: Next.js 15 (App Router) + React + TypeScript strict mode.
- **Styling**: Tailwind CSS + Font Space Grotesk / Inter.
- **Biểu đồ**: Recharts.
- **Cơ sở dữ liệu**: PostgreSQL / Supabase (migrations và seed data có sẵn trong thư mục `/supabase`).

---

## 💻 Cách chạy dự án dưới Local

### 1. Cài đặt các Package phụ thuộc
Chạy lệnh sau tại thư mục gốc:
```bash
npm install
```

### 2. Thiết lập Biến môi trường
Sao chép `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Chạy Dev Server
Khởi động máy chủ phát triển cục bộ:
```bash
npm run dev
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra.

### 4. Tài khoản Demo có sẵn để thử nghiệm
Bạn có thể đăng nhập nhanh bằng một trong các email mẫu tại màn hình đăng nhập:
- `admin@pgs.demo` — Super Admin (Quản trị hệ thống, khôi phục thùng rác, audit logs)
- `manager@pgs.demo` — Manager / PM (Quản lý dự án, phân task, duyệt nội bộ)
- `accountant@pgs.demo` — Accountant (Quản lý lương, bảng công, thanh toán)
- `employee@pgs.demo` — Employee (Nhận việc, báo công, xem lương chính mình)
- `owner@abc.demo` — Client Owner (Doanh nghiệp ABC, xem dự án, duyệt, thanh toán)
- `member@abc.demo` — Client Member (Thành viên ABC được gán quyền xem dự án)

---

## 📂 Supabase Database Setup (Khi tích hợp thật)
Thư mục `/supabase/migrations/` chứa toàn bộ cấu trúc bảng DDL và `/supabase/seed.sql` chứa dữ liệu mẫu để bạn chạy lệnh `supabase db push` hoặc import trực tiếp vào trang quản trị Supabase SQL Editor.
