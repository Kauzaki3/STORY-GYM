"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, UserPlus, Eye, Edit, UserX } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

const initialMembers = [
  { id: "1", code: "SG-2026-0001", name: "Andi Pratama", phone: "+62 812-3456-7890", email: "andi@example.com", membership: "1 Tahun", status: "ACTIVE", startDate: "2025-09-01", expiryDate: "2026-09-01" },
  { id: "2", code: "SG-2026-0002", name: "Dian Safitri", phone: "+62 852-9876-5432", email: "dian@example.com", membership: "6 Bulan", status: "ACTIVE", startDate: "2026-01-15", expiryDate: "2026-07-15" },
  { id: "3", code: "SG-2026-0003", name: "Rizky Fadillah", phone: "+62 813-1122-3344", email: "rizky@example.com", membership: "3 Bulan", status: "EXPIRED", startDate: "2025-11-01", expiryDate: "2026-02-01" },
  { id: "4", code: "SG-2026-0004", name: "Siti Nurhaliza", phone: "+62 878-3344-5566", email: "siti@example.com", membership: "1 Bulan", status: "ACTIVE", startDate: "2026-02-20", expiryDate: "2026-03-20" },
  { id: "5", code: "SG-2026-0005", name: "Budi Santoso", phone: "+62 821-4455-6677", email: "budi@example.com", membership: "Daily Pass", status: "INACTIVE", startDate: "2026-03-01", expiryDate: "2026-03-02" },
];

export default function MembersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search) || m.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember.id) {
      setMembers((prev) => prev.map((m) => (m.id === editingMember.id ? editingMember : m)));
    } else {
      const newMember = {
        ...editingMember,
        id: String(Date.now()),
        code: `SG-2026-00${members.length + 1}`,
      };
      setMembers((prev) => [newMember, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeactivate = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menonaktifkan member ini?")) {
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status: "INACTIVE" } : m)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Members Management</h1>
          <p className="text-xs text-gray-400">Kelola seluruh data member Story Gym Makassar.</p>
        </div>
        <button
          onClick={() => {
            setEditingMember({ name: "", phone: "", email: "", membership: "1 Bulan", status: "ACTIVE", startDate: new Date().toISOString().split('T')[0], expiryDate: "" });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Member</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Member (Nama / HP / Code)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select w-40"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Membership</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id}>
                  <td className="font-mono font-bold text-red-400">{m.code}</td>
                  <td className="font-bold text-white">{m.name}</td>
                  <td>{m.phone}</td>
                  <td>{m.membership}</td>
                  <td><StatusBadge status={m.status} /></td>
                  <td>{m.startDate}</td>
                  <td>{m.expiryDate}</td>
                  <td className="text-right space-x-2">
                    <Link
                      href={`/admin/members/${m.id}`}
                      className="p-1.5 inline-block text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded"
                      title="View Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingMember(m);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-white/5 rounded"
                      title="Edit Member"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeactivate(m.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded"
                      title="Deactivate"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Create Member */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember?.id ? "Edit Data Member" : "Tambah Member Baru"}
      >
        {editingMember && (
          <form onSubmit={handleSaveMember} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  required
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Paket Membership</label>
                <select
                  value={editingMember.membership}
                  onChange={(e) => setEditingMember({ ...editingMember, membership: e.target.value })}
                  className="admin-select"
                >
                  <option value="Daily Pass">Daily Pass — Rp50.000</option>
                  <option value="1 Bulan">1 Bulan — Rp150.000</option>
                  <option value="3 Bulan">3 Bulan — Rp400.000</option>
                  <option value="6 Bulan">6 Bulan — Rp700.000</option>
                  <option value="1 Tahun">1 Tahun — Rp1.400.000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Status</label>
                <select
                  value={editingMember.status}
                  onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                  className="admin-select"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="EXPIRED">EXPIRED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingMember.startDate}
                  onChange={(e) => setEditingMember({ ...editingMember, startDate: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={editingMember.expiryDate}
                  onChange={(e) => setEditingMember({ ...editingMember, expiryDate: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Member
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
