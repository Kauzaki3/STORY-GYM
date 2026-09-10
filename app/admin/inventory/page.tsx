"use client";

import { useState } from "react";
import { Boxes, Search, Edit2, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

const initialInventory = [
  { id: "1", name: "Whey Protein", sku: "SUP-WHEY-01", stock: 25, threshold: 10, status: "IN STOCK" },
  { id: "2", name: "Creatine Monohydrate", sku: "SUP-CREA-01", stock: 40, threshold: 15, status: "IN STOCK" },
  { id: "3", name: "Pre-Workout", sku: "SUP-PREW-01", stock: 4, threshold: 10, status: "LOW STOCK" },
  { id: "4", name: "Mass Gainer", sku: "SUP-MASS-01", stock: 0, threshold: 5, status: "OUT OF STOCK" },
  { id: "5", name: "Story Gym T-Shirt", sku: "MER-TSHIRT-BLK", stock: 30, threshold: 10, status: "IN STOCK" },
  { id: "6", name: "Story Gym Hoodie", sku: "MER-HOOD-BLK", stock: 3, threshold: 5, status: "LOW STOCK" },
];

export default function InventoryAdminPage() {
  const [items, setItems] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newStockVal, setNewStockVal] = useState(0);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStatus = newStockVal === 0 ? "OUT OF STOCK" : newStockVal <= editingItem.threshold ? "LOW STOCK" : "IN STOCK";

    setItems((prev) =>
      prev.map((i) => (i.id === editingItem.id ? { ...i, stock: newStockVal, status: updatedStatus } : i))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Inventory Management</h1>
          <p className="text-xs text-gray-400">Pantau stok fisik produk, ambang batas stok menipis (Low Stock Threshold), dan update manual.</p>
        </div>
      </div>

      <div className="admin-card p-4 flex justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari SKU / Produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Low Stock Threshold</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="font-bold text-white">{item.name}</td>
                  <td className="font-mono text-xs text-red-400">{item.sku}</td>
                  <td className="font-bold text-lg text-white">{item.stock}</td>
                  <td className="text-gray-400 font-mono">{item.threshold} pcs</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="text-right">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setNewStockVal(item.stock);
                        setIsModalOpen(true);
                      }}
                      className="admin-btn-secondary py-1 px-3 text-xs"
                    >
                      Update Stok
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Stok Inventaris"
      >
        {editingItem && (
          <form onSubmit={handleUpdateStock} className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Produk:</p>
              <h3 className="text-base font-bold text-white">{editingItem.name}</h3>
              <p className="text-xs text-red-400 font-mono mt-0.5">{editingItem.sku}</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Stok Terbaru</label>
              <input
                type="number"
                required
                value={newStockVal}
                onChange={(e) => setNewStockVal(Number(e.target.value))}
                className="admin-input text-lg font-bold"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
