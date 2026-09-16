"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mail, Lock, ArrowRight } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-gym-black flex flex-col pt-24 pb-12">
      <div className="max-w-md w-full mx-auto px-6 flex-1 flex flex-col justify-center">
        
        <Link href="/" className="inline-flex items-center text-xs text-gym-silver hover:text-white transition mb-8 w-fit">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Home
        </Link>

        <div className="bg-gym-charcoal border border-gym-border p-8 rounded-lg relative overflow-hidden shadow-2xl">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gym-red opacity-10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-3xl font-black uppercase text-white mb-2 tracking-wider">
              Member <span className="text-gym-red">Login</span>
            </h1>
            <p className="text-gym-silver text-sm mb-8">
              Masuk ke akun Story Gym Anda untuk melihat dashboard dan QR Code absensi.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-500/20 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-500/20">
                  {errorMsg}
                </div>
              )}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gym-silver">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gym-silver" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-gym-black border border-gym-border text-white px-10 py-3 text-sm focus:outline-none focus:border-gym-red transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gym-silver">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gym-silver" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-gym-black border border-gym-border text-white px-10 py-3 text-sm focus:outline-none focus:border-gym-red transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gold py-4 flex items-center justify-center gap-2 group"
              >
                {isLoading ? "LOADING..." : "LOGIN SEKARANG"}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-white/5 pt-6">
              <p className="text-xs text-gym-silver">
                Belum punya akun?{" "}
                <Link href="/register" className="text-gym-red hover:text-white font-bold transition">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
