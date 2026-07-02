import React from "react";
import ContactPageContent from "@/components/ContactPageContent";
import HandoffDoc from "@/components/HandoffDoc";

export const metadata = {
  title: 'Liên hệ PGS Agency | Tư vấn Hệ thống Marketing Tổng thể Tăng Trưởng',
  description: 'Liên hệ PGS Agency để xây dựng hệ thống Marketing tổng thể tối ưu chuyển đổi, tăng trưởng lead và doanh thu bền vững. Nhận tư vấn sơ bộ trong 2 giờ.',
};

export default function ContactPage() {
  return (
    <>
      {/* Premium Header */}
      
      
      {/* Main page sections */}
      <main className="min-h-screen">
        <ContactPageContent />
        <HandoffDoc />
      </main>

      {/* Brand Footer */}
      
    </>
  );
}
