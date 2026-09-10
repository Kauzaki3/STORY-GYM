"use client";

import { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, Users, Clock } from "lucide-react";
import Modal from "@/components/admin/Modal";

const initialClasses = [
  { id: "1", name: "Power Lift", coach: "Coach Arief", time: "07:00", duration: "60 min", level: "Intermediate", category: "strength", slots: 8, maxSlots: 12, day: "Monday" },
  { id: "2", name: "Fat Burn HIIT", coach: "Coach Resty", time: "08:00", duration: "45 min", level: "All Levels", category: "hiit", slots: 5, maxSlots: 15, day: "Monday" },
  { id: "3", name: "Cardio Blast", coach: "Coach Sisca", time: "09:30", duration: "50 min", level: "Beginner", category: "cardio", slots: 10, maxSlots: 15, day: "Monday" },
  { id: "4", name: "Functional Flow", coach: "Coach Appy", time: "16:00", duration: "55 min", level: "All Levels", category: "functional", slots: 7, maxSlots: 12, day: "Tuesday" },
  { id: "5", name: "Muscle Builder", coach: "Coach Ilman", time: "17:30", duration: "60 min", level: "Advanced", category: "strength", slots: 3, maxSlots: 10, day: "Tuesday" },
];

export default function ClassesAdminPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm("Hapus kelas ini dari jadwal?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass.id) {
      setClasses((prev) => prev.map((c) => (c.id === editingClass.id ? editingClass : c)));
    } else {
      setClasses((prev) => [...prev, { ...editingClass, id: String(Date.now()), slots: 0 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Class Management</h1>
          <p className="text-xs text-gray-400">Atur jadwal kelas, pelatih, dan kuota peserta Story Gym.</p>
        </div>
        <button
          onClick={() => {
            setEditingClass({ name: "", coach: "Coach Arief", time: "08:00", duration: "60 min", level: "All Levels", category: "strength", maxSlots: 12, day: "Monday" });
            setIsModalOpen(true);
          }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kelas Baru</span>
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hari</th>
                <th>Jam</th>
                <th>Nama Kelas</th>
                <th>Coach</th>
                <th>Level</th>
                <th>Peserta / Kapasitas</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id}>
                  <td className="font-bold text-red-400">{c.day}</td>
                  <td className="font-mono text-xs">{c.time} ({c.duration})</td>
                  <td className="font-bold text-white">{c.name}</td>
                  <td>{c.coach}</td>
                  <td>
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                      {c.level}
                    </span>
                  </td>
                  <td>
                    <span className="font-bold text-emerald-400">{c.slots}</span> / {c.maxSlots} Slots
                  </td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingClass(c);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-yellow-400 hover:bg-white/5 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 text-red-400 hover:bg-white/5 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
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
        title={editingClass?.id ? "Edit Kelas Gym" : "Buat Kelas Baru"}
      >
        {editingClass && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nama Kelas</label>
              <input
                type="text"
                required
                value={editingClass.name}
                onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                className="admin-input"
                placeholder="Power Lift"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Coach / Trainer</label>
                <select
                  value={editingClass.coach}
                  onChange={(e) => setEditingClass({ ...editingClass, coach: e.target.value })}
                  className="admin-select"
                >
                  <option value="Coach Arief">Coach Arief</option>
                  <option value="Coach Sisca">Coach Sisca</option>
                  <option value="Coach Appy">Coach Appy</option>
                  <option value="Coach Ilman">Coach Ilman</option>
                  <option value="Coach Resty">Coach Resty</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Hari</label>
                <select
                  value={editingClass.day}
                  onChange={(e) => setEditingClass({ ...editingClass, day: e.target.value })}
                  className="admin-select"
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Jam Mulai</label>
                <input
                  type="text"
                  required
                  value={editingClass.time}
                  onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                  className="admin-input"
                  placeholder="07:00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Durasi</label>
                <input
                  type="text"
                  required
                  value={editingClass.duration}
                  onChange={(e) => setEditingClass({ ...editingClass, duration: e.target.value })}
                  className="admin-input"
                  placeholder="60 min"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Kapasitas (Max)</label>
                <input
                  type="number"
                  required
                  value={editingClass.maxSlots}
                  onChange={(e) => setEditingClass({ ...editingClass, maxSlots: Number(e.target.value) })}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                Batal
              </button>
              <button type="submit" className="admin-btn-primary">
                Simpan Kelas
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
