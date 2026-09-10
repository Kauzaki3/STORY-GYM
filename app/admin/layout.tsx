"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // For /admin/login, don't show admin header/sidebar
  if (pathname === "/admin/login") {
    return <div className="admin-body min-h-screen">{children}</div>;
  }

  return (
    <div className="admin-body min-h-screen flex flex-col">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <AdminHeader setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
