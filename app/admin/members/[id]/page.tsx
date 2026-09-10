"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, User, CreditCard, CalendarCheck, Award, ShoppingBag, Clock } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/data";

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"profile" | "membership" | "attendance" | "pt" | "classes" | "orders">("profile");

  const member = {
    id: params.id,
    code: "SG-2026-0001",
    name: "Andi Pratama",
    phone: "+62 812-3456-7890",
    email: "andi@example.com",
    membership: "1 Tahun (Story Elite)",
    status: "ACTIVE",
    startDate: "2025-09-01",
    expiryDate: "2026-09-01",
    emergencyContact: "Bapak Pratama (+62 811-9988-7766)",
  };

  const attendanceLog = [
    { date: "2026-03-07", checkIn: "08:15", checkOut: "09:45" },
    { date: "2026-03-05", checkIn: "17:30", checkOut: "19:00" },
    { date: "2026-03-03", checkIn: "07:45", checkOut: "09:15" },
  ];

  const ptSessions = [
    { trainer: "Coach Arief", package: "12x Pertemuan", date: "2026-03-06 08:00", status: "COMPLETED" },
    { trainer: "Coach Arief", package: "12x Pertemuan", date: "2026-03-08 08:00", status: "SCHEDULED" },
  ];

  const classBookings = [
    { class: "Power Lift", coach: "Coach Arief", day: "Monday 07:00", status: "ATTENDED" },
    { class: "Total Body", coach: "Coach Arief", day: "Thursday 18:00", status: "CONFIRMED" },
  ];

  const orderHistory = [
    { orderId: "SG-ORD-1008", items: "Whey Protein (1 lb), Shaker", total: 450000, date: "2026-03-07", status: "COMPLETED" },
  ];

  return (
    <div className="space-y-6">
      <Link href="/admin/members" className="inline-flex items-center text-xs text-gray-400 hover:text-white transition">
        <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Member
      </Link>

      {/* Header Profile Summary */}
      <div className="admin-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-2xl text-red-500">
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white">{member.name}</h1>
              <StatusBadge status={member.status} />
            </div>
            <p className="text-xs text-red-400 font-mono mt-0.5">{member.code}</p>
            <p className="text-xs text-gray-400 mt-1">{member.phone} • {member.email}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-xs">
          <p className="text-gray-400 uppercase text-[10px] font-bold">Current Plan</p>
          <p className="font-bold text-white text-sm mt-0.5">{member.membership}</p>
          <p className="text-gray-400 text-[11px]">Valid till: <span className="text-emerald-400 font-bold">{member.expiryDate}</span></p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "membership", label: "Membership", icon: CreditCard },
          { id: "attendance", label: "Attendance", icon: Clock },
          { id: "pt", label: "PT Sessions", icon: Award },
          { id: "classes", label: "Class Bookings", icon: CalendarCheck },
          { id: "orders", label: "Order History", icon: ShoppingBag },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-red-500 text-red-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="admin-card p-6">
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">Nama Lengkap</p>
              <p className="text-white font-bold text-sm mt-1">{member.name}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">Member Code</p>
              <p className="text-red-400 font-mono font-bold text-sm mt-1">{member.code}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">No. WhatsApp</p>
              <p className="text-white font-bold mt-1">{member.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">Email</p>
              <p className="text-white font-bold mt-1">{member.email}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">Kontak Darurat</p>
              <p className="text-white font-bold mt-1">{member.emergencyContact}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-[10px] font-bold">Tanggal Bergabung</p>
              <p className="text-white font-bold mt-1">{member.startDate}</p>
            </div>
          </div>
        )}

        {activeTab === "membership" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-white">Status Keanggotaan</h3>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-xs space-y-2">
              <div className="flex justify-between"><span>Paket Active:</span><span className="font-bold text-white">{member.membership}</span></div>
              <div className="flex justify-between"><span>Tanggal Mulai:</span><span className="text-gray-300">{member.startDate}</span></div>
              <div className="flex justify-between"><span>Tanggal Berakhir:</span><span className="text-emerald-400 font-bold">{member.expiryDate}</span></div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tanggal Check-in</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map((log, i) => (
                <tr key={i}>
                  <td>{log.date}</td>
                  <td className="text-emerald-400 font-bold">{log.checkIn}</td>
                  <td className="text-gray-400">{log.checkOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "pt" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Paket PT</th>
                <th>Jadwal Sesi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ptSessions.map((pt, i) => (
                <tr key={i}>
                  <td className="font-bold text-white">{pt.trainer}</td>
                  <td>{pt.package}</td>
                  <td>{pt.date}</td>
                  <td><StatusBadge status={pt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "classes" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Kelas</th>
                <th>Coach</th>
                <th>Jadwal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classBookings.map((c, i) => (
                <tr key={i}>
                  <td className="font-bold text-white">{c.class}</td>
                  <td>{c.coach}</td>
                  <td>{c.day}</td>
                  <td><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "orders" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((o, i) => (
                <tr key={i}>
                  <td className="font-mono font-bold text-white">{o.orderId}</td>
                  <td>{o.items}</td>
                  <td className="font-bold text-white">{formatPrice(o.total)}</td>
                  <td>{o.date}</td>
                  <td><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
