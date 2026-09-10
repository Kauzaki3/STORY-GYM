"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Filter, Eye } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/data";

const initialOrders = [
  { id: "SG-ORD-1008", customer: "Andi Pratama", email: "andi@example.com", phone: "+62 812-3456-7890", total: 450000, itemsCount: 2, paymentMethod: "QRIS", status: "COMPLETED", date: "2026-03-07 10:45" },
  { id: "SG-ORD-1007", customer: "Dian Safitri", email: "dian@example.com", phone: "+62 852-9876-5432", total: 249000, itemsCount: 1, paymentMethod: "Bank Transfer", status: "PAID", date: "2026-03-07 09:30" },
  { id: "SG-ORD-1006", customer: "Budi Santoso", email: "budi@example.com", phone: "+62 821-4455-6677", total: 999000, itemsCount: 4, paymentMethod: "E-Wallet", status: "PROCESSING", date: "2026-03-06 18:20" },
  { id: "SG-ORD-1005", customer: "Siti Nurhaliza", email: "siti@example.com", phone: "+62 878-3344-5566", total: 199000, itemsCount: 1, paymentMethod: "QRIS", status: "SHIPPED", date: "2026-03-06 14:15" },
  { id: "SG-ORD-1004", customer: "Rizky Fadillah", email: "rizky@example.com", phone: "+62 813-1122-3344", total: 350000, itemsCount: 2, paymentMethod: "Credit Card", status: "PENDING", date: "2026-03-05 11:00" },
  { id: "SG-ORD-1003", customer: "Hendra Wijaya", email: "hendra@example.com", phone: "+62 812-9900-1122", total: 550000, itemsCount: 1, paymentMethod: "Bank Transfer", status: "CANCELLED", date: "2026-03-04 16:40" },
];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Order Management</h1>
          <p className="text-xs text-gray-400">Pantau dan kelola pesanan produk dari customer store Story Gym.</p>
        </div>
      </div>

      <div className="admin-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Order ID / Nama Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select w-44"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="font-mono font-bold text-white">{o.id}</td>
                  <td>
                    <div>
                      <p className="font-bold text-white">{o.customer}</p>
                      <p className="text-[10px] text-gray-400">{o.phone}</p>
                    </div>
                  </td>
                  <td className="text-xs text-gray-300">{o.paymentMethod}</td>
                  <td className="font-bold text-white">{formatPrice(o.total)}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td className="text-xs text-gray-400">{o.date}</td>
                  <td className="text-right">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="p-1.5 inline-block text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded"
                      title="Detail Pesanan"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
