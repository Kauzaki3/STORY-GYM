"use client";

import { useState } from "react";
import { UserCheck, Search, Filter, MessageSquare, PhoneCall, CheckCircle } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

const initialLeads = [
  { id: "1", name: "Fajar Ramadhan", phone: "+62 812-4455-6677", email: "fajar@example.com", date: "2026-03-08", time: "Sore (15.00 - 19.00)", goal: "Turun berat badan 10kg & toning otot", status: "NEW" },
  { id: "2", name: "Nabila Putri", phone: "+62 852-1122-3344", email: "nabila@example.com", date: "2026-03-07", time: "Malam (19.00 - 24.00)", goal: "Latihan beban & gabung kelas group", status: "CONTACTED" },
  { id: "3", name: "Hendra Wijaya", phone: "+62 813-9988-7766", email: "hendra@example.com", date: "2026-03-06", time: "Pagi (07.00 - 11.00)", goal: "Bisa deadlift & squat dengan form benar", status: "VISITED" },
  { id: "4", name: "Clarissa Dewi", phone: "+62 878-5544-3322", email: "clarissa@example.com", date: "2026-03-05", time: "Siang (11.00 - 15.00)", goal: "Body transformation & sewa PT 12x", status: "CONVERTED" },
  { id: "5", name: "Reza Anugerah", phone: "+62 821-6677-8899", email: "reza@example.com", date: "2026-03-04", time: "Sore (15.00 - 19.00)", goal: "Coba fasilitas gym dulu", status: "CANCELLED" },
];

export default function FreeTrialCrmPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const filtered = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search);
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    if (selectedLead) setSelectedLead({ ...selectedLead, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Free Trial CRM</h1>
          <p className="text-xs text-gray-400">Kelola calon member yang mendaftar Free Trial dari website customer.</p>
        </div>
      </div>

      <div className="admin-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Nama / WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select w-44"
          >
            <option value="ALL">Semua Status</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="VISITED">VISITED</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>WhatsApp</th>
                <th>Tanggal Visit</th>
                <th>Waktu</th>
                <th>Fitness Goal</th>
                <th>Status Lead</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td className="font-bold text-white">{l.name}</td>
                  <td className="text-xs font-mono text-gray-300">{l.phone}</td>
                  <td>{l.date}</td>
                  <td className="text-xs text-gray-400">{l.time}</td>
                  <td className="text-xs text-gray-300 max-w-xs truncate">{l.goal}</td>
                  <td><StatusBadge status={l.status} /></td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => setSelectedLead(l)}
                      className="admin-btn-secondary py-1 px-3 text-xs"
                    >
                      Kelola Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Detail CRM Free Trial Lead"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span>Nama Lead:</span><span className="font-bold text-white text-sm">{selectedLead.name}</span></div>
              <div className="flex justify-between"><span>WhatsApp:</span><span className="font-bold text-emerald-400 font-mono">{selectedLead.phone}</span></div>
              <div className="flex justify-between"><span>Email:</span><span className="text-gray-300">{selectedLead.email}</span></div>
              <div className="flex justify-between"><span>Rencana Kunjungan:</span><span className="text-white font-bold">{selectedLead.date} ({selectedLead.time})</span></div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs">
              <p className="text-gray-400 uppercase text-[10px] font-bold">Fitness Goal</p>
              <p className="text-white mt-1 leading-relaxed">{selectedLead.goal}</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Update Status Lead:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["NEW", "CONTACTED", "VISITED", "CONVERTED", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedLead.id, st)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition border ${
                      selectedLead.status === st
                        ? "bg-red-600 border-red-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-white/10">
              <button onClick={() => setSelectedLead(null)} className="admin-btn-primary">
                Selesai
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
