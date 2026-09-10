"use client";

import { useState } from "react";
import { Award, Users, Edit2, Plus, Sparkles } from "lucide-react";
import { formatPrice } from "@/data";
import Modal from "@/components/admin/Modal";

const initialPtPackages = [
  { id: "pt-8", type: "Personal Trainer", sessions: "8X PERTEMUAN", price: 1000000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
  { id: "pt-12", type: "Personal Trainer", sessions: "12X PERTEMUAN", price: 1200000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
  { id: "pt-20", type: "Personal Trainer", sessions: "20X PERTEMUAN", price: 2200000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
  { id: "duo-8", type: "Duo Training", sessions: "8X PERTEMUAN", price: 1700000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
  { id: "duo-12", type: "Duo Training", sessions: "12X PERTEMUAN", price: 2200000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
  { id: "duo-20", type: "Duo Training", sessions: "20X PERTEMUAN", price: 4000000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true },
];

export default function PtPackagesAdminPage() {
  const [packages, setPackages] = useState(initialPtPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPkg.id) {
      setPackages((prev) => prev.map((p) => (p.id === editingPkg.id ? editingPkg : p)));
    } else {
      setPackages((prev) => [...prev, { ...editingPkg, id: String(Date.now()) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">PT Package Management</h1>
          <p className="text-xs text-gray-400">Atur harga paket Personal Trainer & Duo Training beserta promosi pendukung.</p>
        </div>
        <button
          onClick={() => {
            setEditingPkg({ type: "Personal Trainer", sessions: "10X PERTEMUAN", price: 1500000, promoText: "FREE MEMBERSHIP 1 BULAN", isActive: true });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket PT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="admin-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded uppercase tracking-wider">
                  {pkg.type}
                </span>
                <button
                  onClick={() => {
                    setEditingPkg(pkg);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-yellow-400 hover:bg-white/5 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-black text-white uppercase">{pkg.sessions}</h3>
              <p className="text-2xl font-extrabold text-red-500 mt-2">{formatPrice(pkg.price)}</p>

              {pkg.promoText && (
                <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-lg flex items-center gap-2 text-xs text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>PROMO: {pkg.promoText}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPkg?.id ? "Edit Paket PT" : "Tambah Paket PT Baru"}
      >
        {editingPkg && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Tipe Latihan</label>
              <select
                value={editingPkg.type}
                onChange={(e) => setEditingPkg({ ...editingPkg, type: e.target.value })}
                className="admin-select"
              >
                <option value="Personal Trainer">Personal Trainer (1-on-1)</option>
                <option value="Duo Training">Duo Training (2 Orang)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Jumlah Pertemuan</label>
                <input
                  type="text"
                  required
                  value={editingPkg.sessions}
                  onChange={(e) => setEditingPkg({ ...editingPkg, sessions: e.target.value })}
                  className="admin-input"
                  placeholder="8X PERTEMUAN"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={editingPkg.price}
                  onChange={(e) => setEditingPkg({ ...editingPkg, price: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Promosi Tambahan</label>
              <input
                type="text"
                value={editingPkg.promoText}
                onChange={(e) => setEditingPkg({ ...editingPkg, promoText: e.target.value })}
                className="admin-input"
                placeholder="FREE MEMBERSHIP 1 BULAN"
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
