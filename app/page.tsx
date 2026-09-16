import Link from "next/link";
import QuickInfo from "@/components/sections/QuickInfo";
import PromoSection from "@/components/sections/PromoSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyStorySection from "@/components/sections/WhyStorySection";
import MembershipSection from "@/components/sections/MembershipSection";
import StatsSection from "@/components/sections/StatsSection";
import TrainingPackagesSection from "@/components/sections/TrainingPackagesSection";
import TrainerSection from "@/components/sections/TrainerSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import StoreSection from "@/components/sections/StoreSection";
import SupplementsSection from "@/components/sections/SupplementsSection";
import MerchSection from "@/components/sections/MerchSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InstagramSection from "@/components/sections/InstagramSection";
import LocationSection from "@/components/sections/LocationSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Noise Texture */}
        <div className="bg-noise" />

        {/* Multi-layer gradient overlay (Heavier on the left for text) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

        {/* Orange light bloom — left */}
        <div
          className="absolute -left-20 top-1/4 w-[600px] h-[500px] rounded-full opacity-[0.08] blur-[140px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff5100 0%, transparent 70%)" }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto pt-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="h-[2px] w-12 bg-[#ff5100]" />
              <p
                className="text-[#ff5100] text-xs tracking-[0.4em] font-bold uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Story Gym · Makassar
              </p>
            </div>

            {/* Main Headline */}
            <h1
              className="animate-fade-in-up opacity-0 mb-6 text-left"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "forwards",
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(4.5rem, 14vw, 11rem)",
                lineHeight: 0.85,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              BUILD YOUR
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #ff5100 0%, #ff7a33 40%, #cc4100 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LEGACY.
              </span>
            </h1>

            {/* Sub headline */}
            <p
              className="text-[#a0a0a0] text-base md:text-xl mb-12 max-w-xl animate-fade-in-up opacity-0 font-medium leading-relaxed"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards", fontFamily: "'Barlow', sans-serif" }}
            >
              Berhenti mencari alasan. Mulai hari ini. Premium facility, brutal workouts, dan komunitas yang menolak untuk menyerah.
            </p>
          </div>
        </div>

        {/* Floating Asymmetric CTA Block overlapping bottom */}
        <div 
          className="absolute bottom-0 right-0 md:right-12 lg:right-24 bg-[#111] p-6 md:p-8 w-full md:w-[450px] border-t-4 border-[#ff5100] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20 animate-slide-in-right opacity-0 translate-x-[100%]"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <div className="bg-noise" />
          <div className="relative z-10">
            <h3 
              className="text-2xl text-white mb-2 uppercase italic font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              Mulai Perjalananmu
            </h3>
            <p className="text-sm text-[#888] mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Klaim sesi trial gratis atau langsung bergabung dengan program kami.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/register" className="btn-gold w-full text-center py-4 text-[13px] tracking-widest">
                DAFTAR SEKARANG
              </Link>
              <Link href="/#membership" className="btn-ghost w-full text-center py-4 text-[12px] tracking-widest hover:border-[#ff5100] hover:text-[#ff5100]">
                LIHAT MEMBERSHIP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTIONS
      ══════════════════════════════ */}
      <QuickInfo />
      <PromoSection />
      <AboutSection />
      <WhyStorySection />
      <MembershipSection />
      <StatsSection />
      <TrainingPackagesSection />
      <TrainerSection />
      <FacilitiesSection />
      <StoreSection />
      <SupplementsSection />
      <MerchSection />
      <TestimonialsSection />
      <InstagramSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}