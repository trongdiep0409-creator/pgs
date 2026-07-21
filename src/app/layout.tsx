import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PGS Hub — Quản trị vận hành & Cổng khách hàng",
  description: "Hệ thống quản lý nội bộ PGS Agency và Portal dành cho khách hàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={spaceGrotesk.variable}>
      <body className="antialiased bg-background text-text-main">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
