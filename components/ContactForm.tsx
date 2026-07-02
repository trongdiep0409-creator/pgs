"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Đang gửi...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ sớm phản hồi.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Liên hệ chúng tôi</h2>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">Họ và tên</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">Nội dung</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#1877F2] text-white py-2 rounded hover:bg-[#0C5FD4] transition"
      >
        Gửi yêu cầu
      </button>
      {status && <p className="text-center text-sm mt-2 text-gray-600">{status}</p>}
    </form>
  );
}
