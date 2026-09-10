"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, User, ChevronRight } from "lucide-react";
import { gymClasses } from "@/data";

const categories = ["ALL", "STRENGTH", "CARDIO", "HIIT", "FUNCTIONAL", "MOBILITY"];

const levelColor: Record<string, string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-[#f0c040]",
  Advanced: "text-red-400",
};

export default function ClassesSection() {
  const [filter, setFilter] = useState("ALL");

  const filteredClasses =
    filter === "ALL"
      ? gymClasses.slice(0, 6)
      : gymClasses.filter((c) => c.category.toUpperCase() === filter).slice(0, 6);

  return (
    <section className="section-padding bg-[#0e0e0e] relative overflow-hidden">
      {/* Smoke */}
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[400px] opacity-[0.04] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="section-heading-eyebrow">Schedule</p>
            <div className="gold-line mb-4" />
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              FIND YOUR
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CLASS.
              </span>
            </h2>
          </div>
          <Link href="/classes" className="btn-outline hidden md:inline-block text-sm">
            View Full Schedule
          </Link>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-tab ${filter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="flex flex-col gap-2">
          {filteredClasses.length === 0 ? (
            <div className="py-12 text-center text-[#555] text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              No classes available for this category.
            </div>
          ) : (
            filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#111] border border-[#1e1e1e] hover:border-[#f0c040]/30 hover:bg-[#141410] transition-all duration-300 gap-6 group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[9px] font-bold bg-[#f0c040]/10 text-[#f0c040]/80 border border-[#f0c040]/20 px-2.5 py-1 uppercase tracking-wider"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {cls.category}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${levelColor[cls.level] ?? "text-[#888]"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {cls.level}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold tracking-wider uppercase mb-3 group-hover:text-[#f0c040] transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontStyle: "italic" }}
                  >
                    {cls.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-5 text-xs text-[#666]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#f0c040]/50" />
                      {cls.coach}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#f0c040]/50" />
                      {cls.time} ({cls.duration})
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
                  <p
                    className="text-[10px] uppercase tracking-widest text-[#555]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <span className={cls.slots < 3 ? "text-red-400 font-bold" : "text-white font-bold"}>
                      {cls.slots}
                    </span>
                    <span className="text-[#444]"> / {cls.maxSlots} SLOTS</span>
                  </p>
                  <button className="btn-gold text-[10px] py-2.5 px-6 flex items-center gap-1.5">
                    Book
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/classes" className="btn-outline w-full block text-sm">
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
