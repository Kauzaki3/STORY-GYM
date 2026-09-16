"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Dumbbell, 
  Award, 
  Calendar, 
  Package, 
  Boxes, 
  ShoppingBag, 
  UserCheck, 
  Tag, 
  BarChart3, 
  LogOut,
  X,
  ScanLine
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Memberships", href: "/admin/memberships", icon: CreditCard },
  { label: "Attendance", href: "/admin/attendance", icon: ScanLine },
  { label: "Trainers", href: "/admin/trainers", icon: Dumbbell },
  { label: "PT Packages", href: "/admin/pt-packages", icon: Award },
  { label: "Kouta yang ambil PT", href: "/admin/classes", icon: Calendar },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Promotions", href: "/admin/promotions", icon: Tag },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-[#0a0e17] border-r border-white/10 z-50 flex flex-col transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider text-white">
              STORY<span className="text-red-500">GYM</span>
            </span>
            <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30">
              ADMIN
            </span>
          </Link>
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all
                  ${isActive 
                    ? "bg-red-600/90 text-white shadow-lg shadow-red-600/20 font-bold" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-white/10 shrink-0 bg-[#07090e]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <div>
                <p className="text-xs font-bold text-white">Admin Staff</p>
                <p className="text-[10px] text-gray-400">admin@storygym.id</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
