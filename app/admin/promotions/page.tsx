"use client";

import { useState } from "react";
import { Tag, Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import Modal from "@/components/admin/Modal";

const initialPromos = [
  { id: "1", code: "NEWSTORY", description: "Diskon 20% khusus member baru", type: "PERCENTAGE", value: 20, category: "MEMBERSHIP", startDate: "2026-03-01", endDate: "2026-03-31", isActive: true },
  { id: "2", code: "FREESHIP", description: "Gratis ongkir belanja suplemen minimal Rp300k", type: "FREE_SHIPPING", value: 0, category: "PRODUCT", startDate: "2026-03-01", endDate: "2026-04-30", isActive: true },
  { id: "3", code: "DUOPACK", description: "Potongan Rp200.000 untuk Duo PT Package", type: "AMOUNT", value: 200000, category: "PT", startDate: "2026-02-15", endDate: "2026-03-15", isActive: true },
];

export default function PromotionsAdminPage() {
  const [promos, setPromos] = useState(initialPromos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any>(null);

  const handleToggleActive = (id: string) => {
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus kode promo ini?")) {
      setPromos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo.id) {
      setPromos((prev) => prev.map((p) => (p.id === editingPromo.id ? editingPromo : p)));
    } else {
      setPromos((prev) => [...prev, { ...editingPromo, id: String(Date.now()) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Promotion Management</h1>
          <p className="text-xs text-gray-400">Buat voucher diskon, promo membership, promo PT, dan promo toko.</p>
        </div>
        <button
          onClick={() => {
            setEditingPromo({ code: "", description: "", type: "PERCENTAGE", value: 10, category: "GENERAL", startDate: "2026-03-01", endDate: "2026-03-31", isActive: true });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kode Promo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((p) => (
          <div key={p.id} className={`admin-card p-6 flex flex-col justify-between ${!p.isActive ? 'opacity-50' : ''}`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded uppercase">
                  {p.category}
                </span>
                <span className="text-xs font-mono text-gray-400">{p.startDate} s/d {p.endDate}</span>
              </div>

              <h3 className="text-2xl font-black text-white font-mono tracking-wider">{p.code}</h3>
              <p className="text-xs text-gray-300 mt-2">{p.description}</p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(p.id)}
                className={`flex items-center gap-1 text-xs font-bold ${p.isActive ? 'text-emerald-400' : 'text-gray-400'}`}
              >
                {p.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{p.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingPromo(p);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-yellow-400 hover:bg-white/5 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 text-red-400 hover:bg-white/5 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPromo?.id ? "Edit Kode Promo" : "Buat Kode Promo Baru"}
      >
        {editingPromo && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Kode Voucher / Promo</label>
              <input
                type="text"
                required
                value={editingPromo.code}
                onChange={(e) => setEditingPromo({ ...editingPromo, code: e.target.value.toUpperCase() })}
                className="admin-input font-mono font-bold"
                placeholder="PROMO2026"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Deskripsi Promo</label>
              <input
                type="text"
                required
                value={editingPromo.description}
                onChange={(e) => setEditingPromo({ ...editingPromo, description: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Tipe Diskon</label>
                <select
                  value={editingPromo.type}
                  onChange={(e) => setEditingPromo({ ...editingPromo, type: e.target.value })}
                  className="admin-select"
                >
                  <option value="PERCENTAGE">Persentase (%)</option>
                  <option value="AMOUNT">Potongan Tetap (Rp)</option>
                  <option value="FREE_SHIPPING">Free Shipping</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nilai Diskon</label>
                <input
                  type="number"
                  value={editingPromo.value}
                  onChange={(e) => setEditingPromo({ ...editingPromo, value: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Kategori Promo</label>
              <select
                value={editingPromo.category}
                onChange={(e) => setEditingPromo({ ...editingPromo, category: e.target.value })}
                className="admin-select"
              >
                <option value="MEMBERSHIP">Membership Promo</option>
                <option value="PT">PT Promo</option>
                <option value="PRODUCT">Product Promo</option>
                <option value="MEMBER_EXCLUSIVE">Member Exclusive Promo</option>
                <option value="GENERAL">General Promo</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={editingPromo.startDate}
                  onChange={(e) => setEditingPromo({ ...editingPromo, startDate: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={editingPromo.endDate}
                  onChange={(e) => setEditingPromo({ ...editingPromo, endDate: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Promo
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
