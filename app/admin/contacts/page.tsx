"use client"

import { useEffect, useState } from "react";

interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contacts", {
          headers: {
            // ADMIN_TOKEN should be set in .env.local and will be injected via NEXT_PUBLIC_ if you need it client‑side.
            // For simplicity we use a hard‑coded token here; replace with your own secure method.
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const data = await res.json();
        setContacts(data.contacts);
      } catch (e) {
        console.error(e);
        setError("Không thể tải danh sách liên hệ");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) return <p className="text-center py-4">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Bảng liên hệ khách hàng</h1>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Họ và tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i} className={i % 2 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2 break-words max-w-xs">{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
