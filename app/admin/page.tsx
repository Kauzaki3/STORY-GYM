"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import { 
  Users, 
  UserCheck, 
  UserPlus, 
  DollarSign, 
  ShoppingBag, 
  Award, 
  Calendar, 
  Package, 
  Sparkles,
  ArrowUpRight,
  Eye
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import { BarChart, LineChart, DonutChart } from "@/components/admin/Chart";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/data";

// Sample / Initial Live Data for Admin Dashboard
const revenueData = [
  { label: "Oct", value: 45000000 },
  { label: "Nov", value: 52000000 },
  { label: "Dec", value: 68000000 },
  { label: "Jan", value: 74000000 },
  { label: "Feb", value: 81000000 },
  { label: "Mar", value: 95500000 },
];

const growthData = [
  { label: "Oct", value: 120 },
  { label: "Nov", value: 165 },
  { label: "Dec", value: 210 },
  { label: "Jan", value: 275 },
  { label: "Feb", value: 340 },
  { label: "Mar", value: 412 },
];

const productSalesCategory = [
  { label: "Supplements", value: 45, color: "#ef4444" },
  { label: "Merchandise", value: 30, color: "#3b82f6" },
  { label: "Equipment", value: 15, color: "#eab308" },
  { label: "Bundles", value: 10, color: "#a855f7" },
];

const supplementSales = [
  { label: "Whey", value: 65 },
  { label: "Creatine", value: 48 },
  { label: "Pre-Wkt", value: 35 },
  { label: "Gainer", value: 22 },
  { label: "Electrolytes", value: 19 },
];

const merchSales = [
  { label: "T-Shirt", value: 85 },
  { label: "Oversized", value: 62 },
  { label: "Hoodie", value: 41 },
  { label: "Bottle", value: 55 },
  { label: "Cap", value: 30 },
];

const classAttendanceData = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 42 },
  { label: "Thu", value: 50 },
  { label: "Fri", value: 40 },
  { label: "Sat", value: 55 },
];

const initialRecentOrders = [
  { id: "SG-ORD-1008", customer: "Andi Pratama", total: 450000, items: 2, status: "COMPLETED", date: "Today, 10:45" },
  { id: "SG-ORD-1007", customer: "Dian Safitri", total: 249000, items: 1, status: "PAID", date: "Today, 09:30" },
  { id: "SG-ORD-1006", customer: "Budi Santoso", total: 999000, items: 4, status: "PROCESSING", date: "Yesterday" },
  { id: "SG-ORD-1005", customer: "Siti Nurhaliza", total: 199000, items: 1, status: "SHIPPED", date: "Yesterday" },
  { id: "SG-ORD-1004", customer: "Rizky Fadillah", total: 350000, items: 2, status: "PENDING", date: "05 Mar 2026" },
];

const initialRecentMembers = [
  { code: "SG-2026-0412", name: "Fajar Ramadhan", plan: "3 Bulan", phone: "+62 812-4455-6677", status: "ACTIVE", joined: "07 Mar 2026" },
  { code: "SG-2026-0411", name: "Nabila Putri", plan: "1 Tahun", phone: "+62 852-1122-3344", status: "ACTIVE", joined: "06 Mar 2026" },
  { code: "SG-2026-0410", name: "Hendra Wijaya", plan: "1 Bulan", phone: "+62 813-9988-7766", status: "ACTIVE", joined: "05 Mar 2026" },
  { code: "SG-2026-0409", name: "Clarissa Dewi", plan: "Daily Pass", phone: "+62 878-5544-3322", status: "INACTIVE", joined: "04 Mar 2026" },
  { code: "SG-2026-0408", name: "Reza Anugerah", plan: "6 Bulan", phone: "+62 821-6677-8899", status: "ACTIVE", joined: "03 Mar 2026" },
];

export default function AdminDashboardPage() {
  const [recentOrdersList, setRecentOrdersList] = useState<any[]>(initialRecentOrders);
  const [recentMembersList, setRecentMembersList] = useState<any[]>(initialRecentMembers);
  const supabase = createClient();

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const { data: membersData } = await supabase
          .from('profiles')
          .select('id, full_name, email, role, created_at, members(member_code, status)')
          .order('created_at', { ascending: false })
          .limit(5);

        if (membersData && membersData.length > 0) {
          const formattedMembers = membersData.map((m: any, i) => {
             const memberRecord = Array.isArray(m.members) ? m.members[0] : m.members;
             return {
               code: memberRecord?.member_code || `LEAD-${String(i+1).padStart(4, '0')}`,
               name: m.full_name,
               plan: memberRecord ? "Member" : "Guest",
               phone: m.email,
               status: memberRecord?.status || (m.role === 'CUSTOMER' ? 'GUEST' : 'STAFF'),
               joined: new Date(m.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
             };
          });
          setRecentMembersList(formattedMembers);
        }

        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (ordersData && ordersData.length > 0) {
           const formattedOrders = ordersData.map((o: any) => ({
             id: o.order_number,
             customer: o.customer_name,
             total: o.total_amount,
             items: 1,
             status: o.status,
             date: new Date(o.created_at).toLocaleDateString('id-ID')
           }));
           setRecentOrdersList(formattedOrders);
        }
      } catch (err) {
         console.error(err);
      }
    };
    
    fetchRecentData();
  }, [supabase]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Dashboard Overview</h1>
          <p className="text-xs text-gray-400 mt-1">Selamat datang kembali di panel administrasi Story Gym Makassar.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/memberships" className="admin-btn-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kelola Price List</span>
          </Link>
        </div>
      </div>

      {/* 9 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <StatCard title="Total Members" value="412" change="+12% bulan ini" isPositive icon={Users} />
        <StatCard title="Active Members" value="385" change="93.4% aktif" isPositive icon={UserCheck} />
        <StatCard title="New Members" value="34" change="+8 minggu ini" isPositive icon={UserPlus} />
        
        <StatCard title="Total Revenue" value={formatPrice(95500000)} change="+18.5% YoY" isPositive icon={DollarSign} />
        <StatCard title="Today's Sales" value={formatPrice(4850000)} change="14 Transaksi" isPositive icon={ShoppingBag} />
        <StatCard title="PT Bookings" value="68 Sesi" change="+15% bulan ini" isPositive icon={Award} />
        
        <StatCard title="Class Bookings" value="268" change="88% Kapasitas" isPositive icon={Calendar} />
        <StatCard title="Product Orders" value="142" change="+24 Ordr baru" isPositive icon={Package} />
        <StatCard title="Free Trial Leads" value="47 Leads" change="68% Konversi" isPositive icon={UserPlus} />
      </div>

      {/* Charts Grid - 2x3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue Overview */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Revenue Overview (Rp)</h2>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">6 Bulan Terakhir</span>
          </div>
          <BarChart data={revenueData} height={220} barColor="#ef4444" />
        </div>

        {/* Chart 2: Membership Growth */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Membership Growth</h2>
            <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Total Members</span>
          </div>
          <LineChart data={growthData} height={220} lineColor="#3b82f6" />
        </div>

        {/* Chart 3: Product Sales Category */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Product Sales by Category</h2>
            <span className="text-[10px] text-gray-400">Persentase %</span>
          </div>
          <DonutChart data={productSalesCategory} height={220} />
        </div>

        {/* Chart 4: Supplement Sales */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Supplement Top Sales</h2>
            <span className="text-[10px] text-red-400 font-bold">Qty Terjual</span>
          </div>
          <BarChart data={supplementSales} height={220} barColor="#dc2626" />
        </div>

        {/* Chart 5: Merchandise Sales */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Merchandise Top Sales</h2>
            <span className="text-[10px] text-amber-400 font-bold">Qty Terjual</span>
          </div>
          <BarChart data={merchSales} height={220} barColor="#f59e0b" />
        </div>

        {/* Chart 6: Class Attendance */}
        <div className="admin-card p-5">
          <div className="admin-card-header mb-4">
            <h2 className="admin-card-title">Class Attendance Rate</h2>
            <span className="text-[10px] text-emerald-400 font-bold">Peserta / Hari</span>
          </div>
          <LineChart data={classAttendanceData} height={220} lineColor="#10b981" />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card overflow-hidden">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrdersList.map((ord) => (
                  <tr key={ord.id}>
                    <td className="font-mono text-xs text-white font-bold">{ord.id}</td>
                    <td>{ord.customer}</td>
                    <td className="font-bold text-white">{formatPrice(ord.total)}</td>
                    <td><StatusBadge status={ord.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Members */}
        <div className="admin-card overflow-hidden">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Members</h2>
            <Link href="/admin/members" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMembersList.map((m) => (
                  <tr key={m.code}>
                    <td className="font-mono text-xs text-red-400 font-bold">{m.code}</td>
                    <td className="font-bold text-white">{m.name}</td>
                    <td>{m.plan}</td>
                    <td><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
