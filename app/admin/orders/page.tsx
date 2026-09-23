"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ShoppingBag, Search, Filter, Eye } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/data";

const initialOrders: any[] = [];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          const formattedOrders = data.map(o => ({
             id: o.order_number,
             customer: o.customer_name,
             email: o.customer_email,
             phone: o.customer_phone,
             total: o.total_amount,
             itemsCount: 1, // Will update when line_items are added
             paymentMethod: o.payment_method || "Midtrans",
             status: o.status,
             date: new Date(o.created_at).toLocaleString("id-ID")
          }));
          setOrders(formattedOrders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [supabase]);

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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">Loading orders...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">Belum ada data pesanan.</td>
                </tr>
              ) : filtered.map((o) => (
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
