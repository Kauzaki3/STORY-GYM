"use client";

import { useState, useEffect } from "react";
import { Search, Filter, UserPlus, UserCheck, UserX, Loader2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

interface MemberRow {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  membership: string;
  status: string;
  startDate: string;
  expiryDate: string;
  profileId: string;
  memberId: string | null;
  role: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [activatingId, setActivatingId] = useState<string | null>(null);

  // Modal state for activation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<MemberRow | null>(null);
  const [activationForm, setActivationForm] = useState({
    membership: "1 Bulan",
    startDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
  });

  // Fetch members from API
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Auto-calculate expiry date based on membership selection
  const handleMembershipChange = (value: string) => {
    setActivationForm((prev) => {
      const start = new Date(prev.startDate);
      let end = new Date(start);

      switch (value) {
        case "Daily Pass":
          end.setDate(end.getDate() + 1);
          break;
        case "1 Bulan":
          end.setMonth(end.getMonth() + 1);
          break;
        case "3 Bulan":
          end.setMonth(end.getMonth() + 3);
          break;
        case "6 Bulan":
          end.setMonth(end.getMonth() + 6);
          break;
        case "1 Tahun":
          end.setFullYear(end.getFullYear() + 1);
          break;
      }

      return {
        ...prev,
        membership: value,
        expiryDate: end.toISOString().split("T")[0],
      };
    });
  };

  // Open activation modal
  const openActivateModal = (member: MemberRow) => {
    setSelectedProfile(member);
    const start = new Date().toISOString().split("T")[0];
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    setActivationForm({
      membership: "1 Bulan",
      startDate: start,
      expiryDate: end.toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  // Submit activation
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile) return;

    setActivatingId(selectedProfile.profileId);

    try {
      const res = await fetch("/api/admin/members/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: selectedProfile.profileId,
          membership: activationForm.membership,
          startDate: activationForm.startDate,
          expiryDate: activationForm.expiryDate,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        await fetchMembers(); // Refresh the list
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Gagal mengaktifkan member. Coba lagi.");
    }

    setActivatingId(null);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Members Management</h1>
          <p className="text-xs text-gray-400">Kelola seluruh data member Story Gym Makassar. Data real-time dari database.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Member (Nama / HP / Email / Code)..."
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
            <option value="GUEST">Guest</option>
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
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin inline-block text-gray-400" />
                    <span className="ml-2 text-gray-400">Memuat data dari database...</span>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    Tidak ada member ditemukan.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td className="font-mono font-bold text-red-400">{m.code}</td>
                    <td className="font-bold text-white">{m.name}</td>
                    <td className="text-gray-300 text-xs">{m.email}</td>
                    <td>{m.phone}</td>
                    <td><StatusBadge status={m.status} /></td>
                    <td>{m.startDate}</td>
                    <td>{m.expiryDate}</td>
                    <td className="text-right">
                      {m.status === "GUEST" ? (
                        <button
                          onClick={() => openActivateModal(m)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs font-bold uppercase tracking-wider hover:bg-green-500/30 transition"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Aktivasi
                        </button>
                      ) : m.status === "ACTIVE" ? (
                        <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">✓ Aktif</span>
                      ) : (
                        <button
                          onClick={() => openActivateModal(m)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded text-xs font-bold uppercase tracking-wider hover:bg-yellow-500/30 transition"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          Perpanjang
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Aktivasi Member — ${selectedProfile?.name}`}
      >
        {selectedProfile && (
          <form onSubmit={handleActivate} className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-sm">
              <p className="text-green-400 font-bold mb-1">Konfirmasi Aktivasi</p>
              <p className="text-gray-300">
                Anda akan mengaktifkan membership untuk <strong className="text-white">{selectedProfile.name}</strong> ({selectedProfile.email}).
                Sistem akan membuat Member ID unik dan mengaktifkan QR Code absensi.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Paket Membership</label>
              <select
                value={activationForm.membership}
                onChange={(e) => handleMembershipChange(e.target.value)}
                className="admin-select"
              >
                <option value="Daily Pass">Daily Pass — Rp50.000</option>
                <option value="1 Bulan">1 Bulan — Rp150.000</option>
                <option value="3 Bulan">3 Bulan — Rp400.000</option>
                <option value="6 Bulan">6 Bulan — Rp700.000</option>
                <option value="1 Tahun">1 Tahun — Rp1.400.000</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={activationForm.startDate}
                  onChange={(e) => {
                    setActivationForm((prev) => ({ ...prev, startDate: e.target.value }));
                    handleMembershipChange(activationForm.membership);
                  }}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={activationForm.expiryDate}
                  onChange={(e) => setActivationForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button
                type="submit"
                disabled={activatingId !== null}
                className="admin-btn-primary flex items-center gap-2"
              >
                {activatingId ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" /> Aktivasi Member
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
