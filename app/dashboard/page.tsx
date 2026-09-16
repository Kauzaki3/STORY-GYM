"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Calendar, CreditCard, Clock, Lock, LogOut, CheckCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function MemberDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [latestCheckin, setLatestCheckin] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      
      // Query profile by user_id (NOT id)
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      // Query member record linked to this profile
      let memberData: any = null;
      if (profile) {
        const { data: member } = await supabase
          .from('members')
          .select('*')
          .eq('profile_id', profile.id)
          .single();
        memberData = member;
      }
        
      const isActive = memberData?.status === 'ACTIVE';
      
      setUser({
        id: memberData?.member_code || profile?.id || session.user.id,
        name: profile?.full_name || session.user.email?.split("@")[0],
        email: session.user.email,
        status: isActive ? "ACTIVE" : "GUEST",
        membershipType: isActive ? "Member" : "None",
        memberSince: memberData?.start_date ? new Date(memberData.start_date).toLocaleDateString("id-ID") : "-",
        validUntil: memberData?.expiry_date ? new Date(memberData.expiry_date).toLocaleDateString("id-ID") : "-",
      });
    }
    
    fetchProfile();

    // Fetch attendance history
    async function fetchAttendance() {
      try {
        const res = await fetch("/api/member/attendance");
        const data = await res.json();
        if (data.attendance && data.attendance.length > 0) {
          setAttendance(data.attendance);
          
          // Check if there's a recent check-in (within last 10 minutes)
          const latest = new Date(data.attendance[0].check_in_time);
          const now = new Date();
          const diffMinutes = (now.getTime() - latest.getTime()) / (1000 * 60);
          if (diffMinutes < 10) {
            setLatestCheckin(
              latest.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
            );
            setShowNotif(true);
            // Auto-hide after 8 seconds
            setTimeout(() => setShowNotif(false), 8000);
          }
        }
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      }
    }
    fetchAttendance();
    
    // Poll for new check-ins every 15 seconds
    const attendanceInterval = setInterval(fetchAttendance, 15000);


    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("id-ID"));
    }, 1000);
    return () => {
      clearInterval(timer);
      clearInterval(attendanceInterval);
    };
  }, [router]);

  if (!mounted || !user) return null;

  // The QR value contains the member ID and a timestamp
  const qrValue = JSON.stringify({
    memberId: user.id,
    timestamp: new Date().getTime()
  });



  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-12">
      {/* ── Check-in Notification Banner ── */}
      {showNotif && (
        <div className="fixed top-[70px] left-0 right-0 z-40 flex justify-center px-4 animate-in slide-in-from-top duration-500">
          <div className="bg-green-500/95 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.4)] flex items-center gap-4 max-w-lg w-full">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-black text-sm uppercase tracking-wider">Check-in Berhasil!</p>
              <p className="text-xs text-white/80">Absensi tercatat pukul {latestCheckin} WITA. Selamat berlatih! 💪</p>
            </div>
            <button onClick={() => setShowNotif(false)} className="text-white/60 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-xs text-gym-silver hover:text-white transition">
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Home
          </Link>
          <div className="flex items-center gap-4">
            <p className="text-gym-silver text-xs font-mono">{currentTime}</p>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="text-gym-red hover:text-red-400 flex items-center gap-1 text-xs font-bold uppercase transition"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gym-charcoal border border-gym-border p-8 rounded-lg relative overflow-hidden">
              {/* FX */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gym-red opacity-5 blur-[100px] pointer-events-none" />
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gym-black border border-gym-red flex items-center justify-center">
                  <User className="w-10 h-10 text-gym-silver" />
                </div>
                <div>
                  <h1 className="text-3xl font-black uppercase text-white mb-1">{user.name}</h1>
                  <p className="text-gym-silver font-mono text-sm">{user.id}</p>
                  
                  <div className="mt-4 flex gap-3">
                    <span className={`border text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded ${
                      user.status === 'ACTIVE' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {user.status}
                    </span>
                    <span className="bg-gym-red/10 text-gym-red border border-gym-red/20 text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded">
                      {user.membershipType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gym-charcoal border border-gym-border p-6 rounded-lg">
                <div className="flex items-center gap-3 text-gym-silver mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Member Since</span>
                </div>
                <p className="text-white font-mono">{user.memberSince}</p>
              </div>
              <div className="bg-gym-charcoal border border-gym-border p-6 rounded-lg">
                <div className="flex items-center gap-3 text-gym-silver mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Valid Until</span>
                </div>
                <p className="text-white font-mono">{user.validUntil}</p>
              </div>
            </div>
            
            {/* Real Attendance History */}
            {user.status === 'ACTIVE' && attendance.length > 0 && (
              <div className="bg-gym-charcoal border border-gym-border p-6 rounded-lg">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Riwayat Kehadiran Terakhir</h3>
                 <div className="space-y-3">
                   {attendance.slice(0, 5).map((record: any, i: number) => {
                     const checkInDate = new Date(record.check_in_time);
                     const dateStr = checkInDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
                     const timeStr = checkInDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
                     // Check if this is recent (within 10 minutes)
                     const isRecent = (new Date().getTime() - checkInDate.getTime()) / (1000 * 60) < 10;
                     return (
                       <div key={record.id || i} className={`flex justify-between items-center py-2 border-b border-white/5 last:border-0 ${isRecent ? 'bg-green-500/5 -mx-2 px-2 rounded-lg' : ''}`}>
                         <div className="flex items-center gap-3 text-gym-silver">
                           <Clock className={`w-4 h-4 ${isRecent ? 'text-green-400' : 'text-gym-red'}`} />
                           <span className="text-sm font-mono">{dateStr}</span>
                           {isRecent && <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">Baru</span>}
                         </div>
                         <span className="text-xs text-white bg-white/5 px-2 py-1 rounded">{timeStr} WITA</span>
                       </div>
                     );
                   })}
                 </div>
              </div>
            )}
            {user.status === 'ACTIVE' && attendance.length === 0 && (
              <div className="bg-gym-charcoal border border-gym-border p-6 rounded-lg text-center">
                <p className="text-gym-silver text-sm">Belum ada riwayat kehadiran. Tunjukkan QR Code ke resepsionis untuk check-in pertama Anda!</p>
              </div>
            )}
          </div>

          {/* QR Code Card or Locked Card */}
          <div className="bg-gym-charcoal border border-gym-border p-8 rounded-lg flex flex-col items-center text-center">
            {user.status === 'ACTIVE' ? (
              <>
                <h2 className="text-lg font-black uppercase tracking-wider text-white mb-2">Check-in Pass</h2>
                <p className="text-xs text-gym-silver mb-8">
                  Tunjukkan QR Code ini ke resepsionis untuk melakukan absensi otomatis.
                </p>
                
                <div className="bg-white p-4 rounded-xl shadow-[0_0_30px_rgba(255,81,0,0.15)]">
                  <QRCodeSVG 
                    value={qrValue} 
                    size={200}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                
                <p className="mt-8 text-[10px] text-gym-silver tracking-wider uppercase">
                  Kode otomatis diperbarui
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <div className="w-20 h-20 rounded-full bg-gym-black border border-gym-border flex items-center justify-center mb-6">
                  <Lock className="w-8 h-8 text-gym-silver" />
                </div>
                <h2 className="text-lg font-black uppercase tracking-wider text-white mb-2">Fitur Terkunci</h2>
                <p className="text-xs text-gym-silver mb-8 leading-relaxed">
                  Status Anda saat ini adalah GUEST. Anda belum memiliki paket membership yang aktif.<br/><br/>
                  Silakan beli paket membership untuk mengaktifkan fitur absensi dan akses masuk ke Gym.
                </p>
                
                {/* Simulation Button for UX Demo */}
                <button 
                  onClick={() => router.push('/register')}
                  className="btn-gold w-full text-[10px] py-4 shadow-[0_0_20px_rgba(240,192,64,0.15)]"
                >
                  DAFTAR MEMBERSHIP SEKARANG
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
