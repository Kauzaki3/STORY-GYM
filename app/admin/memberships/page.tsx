"use client";

import { useState } from "react";
import { CreditCard, Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { formatPrice } from "@/data";
import Modal from "@/components/admin/Modal";

const initialPlans = [
  { id: "daily", name: "Daily Pass", slug: "daily", tag: "", price: 50000, durationMonths: 0, benefits: "1 Day Full Access, Locker & Shower", isActive: true },
  { id: "1-month", name: "1 Bulan", slug: "1-month", tag: "", price: 150000, durationMonths: 1, benefits: "Full Gym Access, Locker & Shower, All Classes", isActive: true },
  { id: "3-months", name: "3 Bulan", slug: "3-months", tag: "POPULAR", price: 400000, durationMonths: 3, benefits: "Full Gym Access, Locker & Shower, All Classes", isActive: true },
  { id: "6-months", name: "6 Bulan", slug: "6-months", tag: "", price: 700000, durationMonths: 6, benefits: "Full Gym Access, Locker & Shower, All Classes", isActive: true },
  { id: "1-year", name: "1 Tahun", slug: "1-year", tag: "BEST VALUE", price: 1400000, durationMonths: 12, benefits: "Full Gym Access, Locker & Shower, All Classes", isActive: true },
  { id: "member-card", name: "Member Card / Joining", slug: "member-card", tag: "", price: 75000, durationMonths: 0, benefits: "One-time joining fee, Physical Member Card", isActive: true },
];

export default function MembershipsAdminPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const handleToggleActive = (id: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket membership ini?")) {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan.id) {
      setPlans((prev) => prev.map((p) => (p.id === editingPlan.id ? editingPlan : p)));
    } else {
      const newPlan = {
        ...editingPlan,
        id: String(Date.now()),
        slug: editingPlan.name.toLowerCase().replace(/\s+/g, "-"),
      };
      setPlans((prev) => [...prev, newPlan]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Membership Management</h1>
          <p className="text-xs text-gray-400">Atur harga paket membership Story Gym Makassar. Perubahan di sini akan otomatis terupdate di website customer.</p>
        </div>
        <button
          onClick={() => {
            setEditingPlan({ name: "", price: 150000, tag: "", durationMonths: 1, benefits: "Full Gym Access", isActive: true });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Membership</span>
        </button>
      </div>

      {/* Grid of Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`admin-card p-6 flex flex-col justify-between relative ${!plan.isActive ? 'opacity-50' : ''}`}>
            {plan.tag && (
              <span className="absolute top-4 right-4 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                {plan.tag}
              </span>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2 text-red-500">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-lg font-black text-white uppercase">{plan.name}</h3>
              </div>

              <div className="my-4">
                <span className="text-3xl font-black text-white">{formatPrice(plan.price)}</span>
                {plan.durationMonths > 0 && (
                  <span className="text-xs text-gray-400 font-normal"> / {plan.durationMonths} Bulan</span>
                )}
              </div>

              <p className="text-xs text-gray-300 mb-6">{plan.benefits}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(plan.id)}
                className={`flex items-center gap-1 text-xs font-bold ${plan.isActive ? 'text-emerald-400' : 'text-gray-400'}`}
              >
                {plan.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{plan.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingPlan(plan);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-yellow-400 hover:bg-white/5 rounded"
                  title="Edit Plan"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 text-red-400 hover:bg-white/5 rounded"
                  title="Delete Plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan?.id ? "Edit Paket Membership" : "Tambah Paket Baru"}
      >
        {editingPlan && (
          <form onSubmit={handleSavePlan} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nama Paket</label>
              <input
                type="text"
                required
                value={editingPlan.name}
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                className="admin-input"
                placeholder="Contoh: 3 Bulan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Tag (Opsional)</label>
                <input
                  type="text"
                  value={editingPlan.tag || ""}
                  onChange={(e) => setEditingPlan({ ...editingPlan, tag: e.target.value })}
                  className="admin-input"
                  placeholder="POPULAR / BEST VALUE"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Fasilitas / Benefits</label>
              <textarea
                rows={3}
                value={editingPlan.benefits}
                onChange={(e) => setEditingPlan({ ...editingPlan, benefits: e.target.value })}
                className="admin-input"
                placeholder="Pisahkan dengan koma"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Paket
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
