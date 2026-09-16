"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Sparkles, CreditCard, Banknote, QrCode } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const MEMBERSHIP_PLANS = [
  { id: "daily", name: "Daily Pass", price: 50000, label: "Rp 50.000" },
  { id: "1m", name: "1 Bulan", price: 150000, label: "Rp 150.000" },
  { id: "3m", name: "3 Bulan", price: 400000, label: "Rp 400.000" },
  { id: "6m", name: "6 Bulan", price: 700000, label: "Rp 700.000" },
  { id: "1y", name: "1 Tahun", price: 1400000, label: "Rp 1.400.000" },
];

const PT_PLANS = {
  single: [
    { id: "s8", name: "8X Pertemuan", price: 1000000, label: "Rp 1.000.000" },
    { id: "s12", name: "12X Pertemuan", price: 1200000, label: "Rp 1.200.000" },
    { id: "s20", name: "20X Pertemuan", price: 2200000, label: "Rp 2.200.000" },
  ],
  duo: [
    { id: "d8", name: "8X Pertemuan", price: 1700000, label: "Rp 1.700.000" },
    { id: "d12", name: "12X Pertemuan", price: 2200000, label: "Rp 2.200.000" },
    { id: "d20", name: "20X Pertemuan", price: 4000000, label: "Rp 4.000.000" },
  ]
};

const PAYMENT_METHODS = [
  { id: "cash", name: "Bayar di Gym", icon: Banknote, desc: "Cash / Debit di Resepsionis" },
  { id: "transfer", name: "Transfer Bank", icon: CreditCard, desc: "BCA, Mandiri, BNI" },
  { id: "qris", name: "QRIS", icon: QrCode, desc: "E-Wallet & M-Banking" },
];

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [membership, setMembership] = useState("1m");
  const [ptType, setPtType] = useState<"none" | "single" | "duo">("none");
  const [ptPackage, setPtPackage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const isPtSelected = ptType !== "none" && ptPackage !== "";

  // Auto-set membership to 1 month if PT is selected to reflect the Special Offer
  useEffect(() => {
    if (ptType !== "none") {
      setMembership("1m");
    }
  }, [ptType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
      return;
    }

    // Submit lead to free_trial_leads as a record of purchase intent
    await supabase.from("free_trial_leads").insert({
      full_name: fullName,
      phone,
      email,
      visit_date: new Date().toISOString().split("T")[0],
      visit_time: "00:00",
      fitness_goal: `Membership: ${membership}, PT: ${ptType}`,
      notes: `Payment: ${paymentMethod}`
    });

    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-xs text-gym-silver hover:text-white mb-8 transition">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Home
        </Link>

        {submitted ? (
          <div className="bg-gym-charcoal border border-gym-border p-8 md:p-16 text-center rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 opacity-5 blur-[100px] pointer-events-none" />
            
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            
            <h3 className="text-2xl md:text-4xl font-black uppercase text-white mb-4">Pendaftaran Berhasil!</h3>
            <p className="text-gym-silver mb-8 max-w-lg mx-auto leading-relaxed">
              Terima kasih, <strong className="text-white">{fullName}</strong>. Data Anda telah kami terima.<br/><br/>
              {paymentMethod === "cash" 
                ? "Silakan datang ke resepsionis Story Gym untuk melakukan pembayaran (termasuk Rp 75.000 untuk Member Card jika Anda member baru) dan mengambil kartu Anda."
                : `Tim kami akan segera mengirimkan instruksi pembayaran via WhatsApp untuk metode ${PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}.`}
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-outline text-xs px-6 py-3">
              Kirim Form Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Title */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gym-red uppercase mb-2 block flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Bergabung Sekarang
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-white mb-4">PENDAFTARAN GYM</h1>
              <p className="text-gym-silver">Isi formulir di bawah ini untuk memulai perjalanan kebugaran Anda bersama Story Gym.</p>
            </div>

            {/* Section 1: Data Diri */}
            <div className="bg-gym-charcoal border border-gym-border p-8 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/5">1. Data Diri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Nama Lengkap</label>
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition rounded-lg" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">WhatsApp</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition rounded-lg" placeholder="+62..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Email</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition rounded-lg" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold tracking-wider text-gym-silver uppercase">Password Akun (Untuk Login)</label>
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gym-black border border-gym-border px-4 py-3 text-white focus:outline-none focus:border-gym-red transition rounded-lg" placeholder="Buat password untuk login member..." />
                </div>
              </div>
            </div>

            {/* Section 2: Paket Personal Trainer */}
            <div className="bg-gym-charcoal border border-gym-border p-8 rounded-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gym-red opacity-5 blur-[100px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. Personal Trainer (Opsional)</h2>
                {isPtSelected && (
                  <span className="bg-gym-red/20 text-gym-red border border-gym-red/30 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Special Offer Aktif
                  </span>
                )}
              </div>

              {/* PT Type Tabs */}
              <div className="flex gap-2 p-1 bg-gym-black rounded-lg w-fit mb-6 border border-gym-border">
                <button type="button" onClick={() => { setPtType("none"); setPtPackage(""); }} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition ${ptType === "none" ? "bg-gym-charcoal text-white shadow" : "text-gym-silver hover:text-white"}`}>Tanpa PT</button>
                <button type="button" onClick={() => setPtType("single")} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition ${ptType === "single" ? "bg-gym-charcoal text-white shadow" : "text-gym-silver hover:text-white"}`}>Single PT</button>
                <button type="button" onClick={() => setPtType("duo")} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition ${ptType === "duo" ? "bg-gym-charcoal text-white shadow" : "text-gym-silver hover:text-white"}`}>Duo PT</button>
              </div>

              {ptType !== "none" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PT_PLANS[ptType].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setPtPackage(plan.id)}
                      className={`cursor-pointer border p-4 rounded-xl transition-all ${
                        ptPackage === plan.id 
                          ? "bg-gym-red/10 border-gym-red shadow-[0_0_15px_rgba(255,81,0,0.2)]" 
                          : "bg-gym-black border-gym-border hover:border-gray-600"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-white uppercase">{plan.name}</h4>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${ptPackage === plan.id ? "border-gym-red bg-gym-red" : "border-gray-600"}`}>
                          {ptPackage === plan.id && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <p className="text-lg font-mono text-gym-silver">{plan.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Membership Gym */}
            <div className="bg-gym-charcoal border border-gym-border p-8 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/5">3. Membership Gym</h2>
              
              {isPtSelected && (
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg mb-6 flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider">Gratis 1 Bulan Membership!</h4>
                    <p className="text-xs text-gym-silver mt-1">Karena Anda mengambil paket Personal Trainer, Anda otomatis mendapatkan membership Gym 1 bulan secara gratis (Senilai Rp 150.000).</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {MEMBERSHIP_PLANS.map((plan) => {
                  const isFree = isPtSelected && plan.id === "1m";
                  const isDisabled = isPtSelected && plan.id !== "1m";

                  return (
                    <div 
                      key={plan.id}
                      onClick={() => !isDisabled && setMembership(plan.id)}
                      className={`relative border p-4 rounded-xl transition-all ${isDisabled ? "opacity-40 cursor-not-allowed bg-gym-black/50" : "cursor-pointer"} ${
                        membership === plan.id 
                          ? "bg-gym-red/10 border-gym-red shadow-[0_0_15px_rgba(255,81,0,0.2)]" 
                          : "bg-gym-black border-gym-border hover:border-gray-600"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-bold text-white uppercase">{plan.name}</h4>
                        {!isDisabled && (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${membership === plan.id ? "border-gym-red bg-gym-red" : "border-gray-600"}`}>
                            {membership === plan.id && <Check className="w-3 h-3 text-white" />}
                          </div>
                        )}
                      </div>
                      
                      {isFree ? (
                        <p className="text-sm font-black text-green-400 tracking-wider">FREE</p>
                      ) : (
                        <p className="text-sm font-mono text-gym-silver">{plan.label}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-gym-silver uppercase tracking-wider mt-4">* Terdapat biaya tambahan Member Card / Joining Fee sebesar Rp 75.000 untuk pendaftar baru.</p>
            </div>

            {/* Section 4: Pembayaran */}
            <div className="bg-gym-charcoal border border-gym-border p-8 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/5">4. Metode Pembayaran</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`cursor-pointer border p-4 rounded-xl flex items-center gap-4 transition-all ${
                        paymentMethod === method.id 
                          ? "bg-white/10 border-white" 
                          : "bg-gym-black border-gym-border hover:border-gray-600"
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${paymentMethod === method.id ? "bg-white text-black" : "bg-gym-charcoal text-gym-silver"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase">{method.name}</h4>
                        <p className="text-[10px] text-gym-silver">{method.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-500/20 text-red-500 p-4 rounded-xl font-bold border border-red-500/20">
                Error: {errorMsg}
              </div>
            )}

            <button type="submit" disabled={isLoading || (!membership && !isPtSelected)} className="w-full btn-gold py-5 hover:bg-yellow-500 disabled:opacity-50 text-sm font-black tracking-widest uppercase shadow-[0_0_30px_rgba(240,192,64,0.2)]">
              {isLoading ? "MEMPROSES..." : "SELESAIKAN PENDAFTARAN"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
