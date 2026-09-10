"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-gym-charcoal border-y border-gym-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gym-silver uppercase mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">ANY QUESTIONS?</h2>
        </div>

        <div className="space-y-4">
          {faqs.slice(0, 5).map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gym-border bg-gym-black overflow-hidden transition-colors ${
                openIndex === index ? "border-gym-silver/30" : "hover:border-gym-border/80"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-sm font-bold tracking-wider uppercase pr-8">{faq.question}</h3>
                <ChevronDown 
                  className={`w-5 h-5 text-gym-silver shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
