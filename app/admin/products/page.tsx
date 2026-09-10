"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, Boxes } from "lucide-react";
import { products as initialProducts, formatPrice } from "@/data";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

export default function ProductsAdminPage() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);

  const filtered = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (slug: string) => {
    if (confirm("Hapus produk ini dari store?")) {
      setProductsList((prev) => prev.filter((p) => p.slug !== slug));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = productsList.find((p) => p.slug === editingProd.slug);
    if (existing) {
      setProductsList((prev) => prev.map((p) => (p.slug === editingProd.slug ? editingProd : p)));
    } else {
      const newProd = {
        ...editingProd,
        slug: editingProd.name.toLowerCase().replace(/\s+/g, "-"),
        rating: 5.0,
        reviews: 0,
      };
      setProductsList((prev) => [newProd, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Product Management</h1>
          <p className="text-xs text-gray-400">Kelola katalog suplemen, merch, alat gym, dan paket bundle.</p>
        </div>
        <button
          onClick={() => {
            setEditingProd({
              name: "",
              brand: "Story Nutrition",
              category: "supplements",
              price: 250000,
              stock: 20,
              description: "",
              image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=400&h=400&fit=crop",
            });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari produk / brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-select w-44"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="supplements">Supplements</option>
            <option value="merch">Merchandise</option>
            <option value="equipment">Gym Equipment</option>
            <option value="bundles">Bundles</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status Stok</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const stockStatus = p.stock === 0 ? "OUT OF STOCK" : p.stock <= 10 ? "LOW STOCK" : "IN STOCK";

                return (
                  <tr key={p.slug}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded bg-slate-900" />
                        <div>
                          <p className="font-bold text-white text-xs">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="uppercase text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </td>
                    <td className="font-bold text-white">{formatPrice(p.price)}</td>
                    <td className="font-mono">{p.stock} pcs</td>
                    <td><StatusBadge status={stockStatus} /></td>
                    <td className="text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProd(p);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-yellow-400 hover:bg-white/5 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.slug)}
                        className="p-1.5 text-red-400 hover:bg-white/5 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProd?.slug ? "Edit Produk Store" : "Tambah Produk Baru"}
      >
        {editingProd && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nama Produk</label>
              <input
                type="text"
                required
                value={editingProd.name}
                onChange={(e) => setEditingProd({ ...editingProd, name: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Brand</label>
                <input
                  type="text"
                  required
                  value={editingProd.brand}
                  onChange={(e) => setEditingProd({ ...editingProd, brand: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Kategori</label>
                <select
                  value={editingProd.category}
                  onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value })}
                  className="admin-select"
                >
                  <option value="supplements">Supplements</option>
                  <option value="merch">Merchandise</option>
                  <option value="equipment">Gym Equipment</option>
                  <option value="bundles">Bundles</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={editingProd.price}
                  onChange={(e) => setEditingProd({ ...editingProd, price: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Jumlah Stok</label>
                <input
                  type="number"
                  required
                  value={editingProd.stock}
                  onChange={(e) => setEditingProd({ ...editingProd, stock: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Image URL</label>
              <input
                type="text"
                required
                value={editingProd.image}
                onChange={(e) => setEditingProd({ ...editingProd, image: e.target.value })}
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Deskripsi Produk</label>
              <textarea
                rows={3}
                required
                value={editingProd.description}
                onChange={(e) => setEditingProd({ ...editingProd, description: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Produk
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
