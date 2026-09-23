"use client";

import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { CheckCircle, XCircle, ScanLine, Camera } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AttendanceScanner() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const supabase = createClient();

  const fetchLogs = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          id,
          check_in_time,
          members (
            full_name,
            member_code
          )
        `)
        .gte('check_in_time', today.toISOString())
        .order('check_in_time', { ascending: false });
        
      if (!error && data) {
        setLogs(data);
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    // Only initialize scanner when isScanning is true
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
        },
        /* verbose= */ false
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
    }

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const onScanSuccess = async (decodedText: string) => {
    // Prevent multiple rapid scans of the same code
    if (scannerRef.current) {
      scannerRef.current.pause(true);
    }

    try {
      console.log("Scanned:", decodedText);
      
      let parsed: any;
      try {
        parsed = JSON.parse(decodedText);
      } catch {
        // If not JSON, treat as raw member code (e.g., "SG-2026-0001")
        parsed = { memberId: decodedText };
      }

      // Processing delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Use API route to bypass RLS and query with service role
      const res = await fetch("/api/admin/attendance/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: parsed.memberId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Member tidak ditemukan di database.");
      }

      fetchLogs(); // Refresh logs after successful scan

      setScanResult({
        success: true,
        message: "Check-in Berhasil!",
        member: {
          name: data.member.name,
          id: data.member.code,
          membership: data.member.membership,
          time: new Date().toLocaleTimeString("id-ID")
        }
      });

    } catch (err: any) {
      setScanResult({
        success: false,
        message: err.message || "QR Code tidak valid."
      });
    }

    // Resume scanner after 3 seconds
    setTimeout(() => {
      setScanResult(null);
      if (scannerRef.current) {
        scannerRef.current.resume();
      }
    }, 3000);
  };

  const onScanFailure = (error: any) => {
    // Ignore routine scan failures (when it doesn't see a QR code)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wider">Kehadiran / Absensi</h1>
          <p className="text-xs text-gray-400">Scan QR Code member untuk mencatat kehadiran otomatis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Scanner Area */}
        <div className="admin-card p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
          {!isScanning ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Camera className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mulai Pemindaian</h3>
              <p className="text-sm text-gray-400 mb-6">Aktifkan kamera untuk mulai scan QR Code dari HP member.</p>
              <button 
                onClick={() => setIsScanning(true)}
                className="admin-btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
              >
                <ScanLine className="w-5 h-5" /> Aktifkan Kamera
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center">
              <div id="reader" className="w-full max-w-sm rounded-lg overflow-hidden border-2 border-[#333] shadow-lg"></div>
              <button 
                onClick={() => setIsScanning(false)}
                className="mt-6 admin-btn-secondary text-xs"
              >
                Matikan Kamera
              </button>
            </div>
          )}

          {/* Overlay Result Animation */}
          {scanResult && (
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center transition-all animate-in fade-in zoom-in duration-300 ${scanResult.success ? 'bg-green-600/95' : 'bg-red-600/95'}`}>
              {scanResult.success ? (
                <CheckCircle className="w-24 h-24 text-white mb-4 animate-bounce" />
              ) : (
                <XCircle className="w-24 h-24 text-white mb-4 animate-pulse" />
              )}
              <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
                {scanResult.message}
              </h2>
              {scanResult.success && scanResult.member && (
                <div className="text-white mt-4 bg-black/20 p-4 rounded-lg w-full max-w-sm">
                  <p className="font-bold text-xl">{scanResult.member.name}</p>
                  <p className="text-sm opacity-80 font-mono">{scanResult.member.id}</p>
                  <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-wider">
                    <span>{scanResult.member.membership}</span>
                    <span>{scanResult.member.time}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Manual Input / Stats Area */}
        <div className="space-y-6">
          <div className="admin-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Input Manual (Opsional)</h3>
            <p className="text-xs text-gray-400 mb-4">Jika kamera tidak berfungsi, gunakan Scanner Fisik atau ketik ID secara manual lalu tekan Enter.</p>
            <input 
              type="text" 
              placeholder="SG-2026-..." 
              className="admin-input font-mono text-lg py-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value;
                  onScanSuccess(JSON.stringify({ memberId: val }));
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>

          <div className="admin-card p-6">
             <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Log Hari Ini</h3>
             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {logs.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-4">Belum ada data absensi hari ini.</p>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="flex justify-between items-center py-2 border-b border-white/5">
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-white">{log.members?.full_name || 'Unknown'}</span>
                         <span className="text-xs text-gray-500 font-mono">{log.members?.member_code || '-'}</span>
                       </div>
                       <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                         {new Date(log.check_in_time).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WITA
                       </span>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
