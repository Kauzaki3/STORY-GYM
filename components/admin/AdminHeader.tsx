"use client";

import { Menu, Search, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export default function AdminHeader({ setMobileOpen }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#0a0e17]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-gray-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search input */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search members, orders, products..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Link to Customer Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* System Time / Status */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
}
