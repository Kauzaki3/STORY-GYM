"use client";

import { useState } from "react";
import { Dumbbell, Plus, Edit, Trash2, CheckCircle, XCircle, Upload } from "lucide-react";
import Modal from "@/components/admin/Modal";

const initialTrainers = [
  { id: "arief", name: "Coach Arief", title: "Head Coach", specialization: "Strength & Conditioning", experience: "8+ Years Experience", image: "https://images.unsplash.com/photo-1567013127542-490d483ba87a?w=400&h=500&fit=crop", bio: "Spesialis strength training dan body transformation.", isActive: true },
  { id: "sisca", name: "Coach Sisca", title: "Fitness Coach", specialization: "Weight Loss & Toning", experience: "6+ Years Experience", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop", bio: "Ahli dalam program penurunan berat badan dan body toning.", isActive: true },
  { id: "appy", name: "Coach Appy", title: "Fitness Coach", specialization: "Functional Training", experience: "5+ Years Experience", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop", bio: "Fokus pada functional movement dan mobilitas.", isActive: true },
  { id: "ilman", name: "Coach Ilman", title: "Fitness Coach", specialization: "Muscle Building", experience: "7+ Years Experience", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop", bio: "Spesialis hypertrophy dan muscle building.", isActive: true },
  { id: "resty", name: "Coach Resty", title: "Fitness Coach", specialization: "HIIT & Group Classes", experience: "4+ Years Experience", image: "https://images.unsplash.com/photo-1609899464926-209b0035b6c1?w=400&h=500&fit=crop", bio: "Energetic group class instructor.", isActive: true },
];

export default function TrainersAdminPage() {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<any>(null);

  const handleToggleActive = (id: string) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrainer.id) {
      setTrainers((prev) => prev.map((t) => (t.id === editingTrainer.id ? editingTrainer : t)));
    } else {
      const newTrainer = {
        ...editingTrainer,
        id: String(Date.now()),
      };
      setTrainers((prev) => [...prev, newTrainer]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Personal Trainers</h1>
          <p className="text-xs text-gray-400">Kelola jajaran Coach & Personal Trainer Story Gym Makassar.</p>
        </div>
        <button
          onClick={() => {
            setEditingTrainer({ name: "", title: "Fitness Coach", specialization: "", experience: "", image: "https://images.unsplash.com/photo-1567013127542-490d483ba87a?w=400&h=500&fit=crop", bio: "", isActive: true });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Trainer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className={`admin-card overflow-hidden flex flex-col justify-between ${!t.isActive ? 'opacity-50' : ''}`}>
            <div className="relative h-64 w-full bg-slate-900">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                  {t.title}
                </span>
                <h3 className="text-xl font-black text-white uppercase mt-1">{t.name}</h3>
                <p className="text-xs text-gray-300 font-semibold">{t.specialization}</p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">{t.bio}</p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(t.id)}
                  className={`flex items-center gap-1 text-xs font-bold ${t.isActive ? 'text-emerald-400' : 'text-gray-400'}`}
                >
                  {t.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{t.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTrainer(t);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-yellow-400 hover:bg-white/5 rounded"
                    title="Edit Coach"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTrainer?.id ? "Edit Personal Trainer" : "Tambah Personal Trainer"}
      >
        {editingTrainer && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nama Coach</label>
              <input
                type="text"
                required
                value={editingTrainer.name}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                className="admin-input"
                placeholder="Coach Arief"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingTrainer.title}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, title: e.target.value })}
                  className="admin-input"
                  placeholder="Head Coach / Fitness Coach"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Specialization</label>
                <input
                  type="text"
                  required
                  value={editingTrainer.specialization}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, specialization: e.target.value })}
                  className="admin-input"
                  placeholder="Strength & Conditioning"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Photo URL</label>
              <input
                type="text"
                required
                value={editingTrainer.image}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, image: e.target.value })}
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Bio / Deskripsi</label>
              <textarea
                rows={3}
                required
                value={editingTrainer.bio}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, bio: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Trainer
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
