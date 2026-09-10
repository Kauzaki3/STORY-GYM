"use client";

import { useState } from "react";
import { BarChart3, Download, Calendar, DollarSign, Users, Award, Package, ShoppingBag, UserCheck } from "lucide-react";
import { BarChart, LineChart } from "@/components/admin/Chart";
import { formatPrice } from "@/data";

export default function ReportsAdminPage() {
  const [dateRange, setDateRange] = useState("30 Days");

  const revenueSeries = [
    { label: "01 Mar", value: 3500000 },
    { label: "02 Mar", value: 4200000 },
    { label: "03 Mar", value: 2800000 },
    { label: "04 Mar", value: 5100000 },
    { label: "05 Mar", value: 4800000 },
    { label: "06 Mar", value: 6200000 },
    { label: "07 Mar", value: 7100000 },
  ];

  const handleExportCSV = () => {
    alert(`Mengekspor laporan Story Gym (${dateRange}) ke format CSV...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Reports & Analytics</h1>
          <p className="text-xs text-gray-400">Analisis performa pendapatan, pertumbuhan member, penjualan produk, dan konversi trial.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportCSV} className="admin-btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="w-4 h-4 text-red-500" />
          <span className="font-bold uppercase text-white">Filter Periode:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Today", "7 Days", "30 Days", "This Month", "Custom Range"].map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                dateRange === r
                  ? "bg-red-600 border-red-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Report Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-card p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Total Revenue</p>
          <h3 className="text-xl font-black text-white mt-1">{formatPrice(33700000)}</h3>
          <p className="text-[11px] text-emerald-400 mt-2 font-bold">+18.2% vs periode lalu</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Membership Sales</p>
          <h3 className="text-xl font-black text-white mt-1">{formatPrice(18500000)}</h3>
          <p className="text-[11px] text-emerald-400 mt-2 font-bold">42 Transaksi</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase">PT Sales</p>
          <h3 className="text-xl font-black text-white mt-1">{formatPrice(9800000)}</h3>
          <p className="text-[11px] text-emerald-400 mt-2 font-bold">7 Paket Terjual</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Product & Merch Sales</p>
          <h3 className="text-xl font-black text-white mt-1">{formatPrice(5400000)}</h3>
          <p className="text-[11px] text-emerald-400 mt-2 font-bold">28 Pesanan Store</p>
        </div>
      </div>

      {/* Main Revenue Report Chart */}
      <div className="admin-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="admin-card-title">Daily Revenue Trend</h2>
          <span className="text-xs font-bold text-red-400">Periode: {dateRange}</span>
        </div>
        <BarChart data={revenueSeries} height={250} barColor="#ef4444" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6 space-y-4">
          <h2 className="admin-card-title border-b border-white/10 pb-4">Free Trial Conversion Rate</h2>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between"><span>Total Free Trial Leads:</span><span className="font-bold text-white">47 Leads</span></div>
            <div className="flex justify-between"><span>Telah Mengunjungi Gym:</span><span className="font-bold text-blue-400">32 Leads</span></div>
            <div className="flex justify-between"><span>Berhasil Konversi (Beli Member):</span><span className="font-bold text-emerald-400">22 Members</span></div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex justify-between font-bold text-emerald-400 text-sm">
              <span>Conversion Rate:</span>
              <span>68.75%</span>
            </div>
          </div>
        </div>

        <div className="admin-card p-6 space-y-4">
          <h2 className="admin-card-title border-b border-white/10 pb-4">Top Category Revenue Breakdown</h2>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-white"><span>Membership Subscriptions</span><span>54.8%</span></div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[54.8%]" /></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-white"><span>Personal Trainer Packages</span><span>29.1%</span></div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[29.1%]" /></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-white"><span>Supplements Store</span><span>10.2%</span></div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[10.2%]" /></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-white"><span>Merchandise Apparel</span><span>5.9%</span></div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[5.9%]" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
