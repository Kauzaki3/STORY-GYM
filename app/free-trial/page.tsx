"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function FreeTrialPage() {
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");

    try {
      const res = await fetch("/api/admin/free-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email,
          visit_date: visitDate,
          visit_time: visitTime,
          fitness_goal: fitnessGoal,
        }),
      });
      if (!res.ok) {
        throw new Error("Gagal mengirim data");
      }
      setSubmitted(true);
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim form. Silakan coba lagi.");
    }
  };

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-xs text-gym-silver hover:text-white mb-8 transition">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Home
        </Link>

        <div className="bg-gym-charcoal border border-gym-border p-8 md:p-12">
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gym-red uppercase mb-2 block">Special Offer</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase mb-4">COBA GRATIS</h1>
            <p className="text-gray-400">Rasakan pengalaman latihan di Story Gym. Isi form di bawah ini dan tim kami akan segera menghubungi kamu.</p>
          </div>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 p-8 text-center">
              <h3 className="text-xl font-bold text-green-400 mb-2">Terima Kasih!</h3>
              <p className="text-gray-300">Tim Story Gym akan segera menghubungi kamu via WhatsApp untuk konfirmasi jadwal trial.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-xs text-gym-silver hover:text-white underline underline-offset-4">
                Kirim form lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Nama Lengkap</label>
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">WhatsApp</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition" placeholder="+62..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Tanggal Kunjungan</label>
                  <input required type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Jam Kunjungan</label>
                  <select required value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition">
                    <option value="">Pilih Jam</option>
                    <option value="Pagi (07.00 - 11.00)">Pagi (07.00 - 11.00)</option>
                    <option value="Siang (11.00 - 15.00)">Siang (11.00 - 15.00)</option>
                    <option value="Sore (15.00 - 19.00)">Sore (15.00 - 19.00)</option>
                    <option value="Malam (19.00 - 24.00)">Malam (19.00 - 24.00)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Fitness Goal</label>
                <textarea required rows={4} value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition" placeholder="Apa target yang ingin kamu capai? (Misal: Turun berat badan, tambah massa otot, dll)"></textarea>
              </div>

              <button type="submit" className="w-full btn-primary bg-gym-red text-white py-4 hover:bg-red-700">
                Claim Free Trial
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
