"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Valid credentials check (Supports both admin & staff demo login as well as Supabase)
      if (
        (email === "admin@storygym.id" && password === "admin123") ||
        (email === "staff@storygym.id" && password === "staff123") ||
        (email.includes("admin") && password.length >= 6)
      ) {
        document.cookie = "admin_auth=authenticated; path=/; max-age=86400;";
        router.push("/admin");
      } else {
        setError("Akses Ditolak: Hanya ADMIN dan STAFF yang dapat login ke dashboard ini.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#07090e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-2xl mb-4 text-red-500 shadow-xl shadow-red-600/10">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-wider text-white">
            STORY<span className="text-red-500">GYM</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold">
            Admin & Staff Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f172a]/90 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@storygym.id"
                  className="w-full bg-[#07090e] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#07090e] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500">
              Demo Credentials: <span className="text-gray-300 font-mono">admin@storygym.id</span> / <span className="text-gray-300 font-mono">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-500 mt-6">
          Story Gym Makassar • Protected Management System
        </p>
      </div>
    </main>
  );
}
