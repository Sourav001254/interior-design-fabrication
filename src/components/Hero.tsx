import React from "react";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "../company";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-[#080808] flex items-center overflow-hidden">
      
      {/* Immersive radial glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent rounded-full blur-[180px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-zinc-800 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 min-h-screen items-stretch">
        
        {/* Left block layout with structural aesthetics */}
        <div className="col-span-12 lg:col-span-7 relative flex flex-col justify-center px-6 sm:px-16 xl:px-20 py-28 lg:py-16">
          
          {/* Vertical brand light beam ornament */}
          <div className="absolute left-6 sm:left-12 lg:left-14 top-1/2 -translate-y-1/2 w-[1.5px] h-32 bg-gradient-to-b from-transparent via-accent to-transparent hidden sm:block"></div>
          
          <div className="sm:pl-8 lg:pl-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white border border-accent/50 flex items-center justify-center overflow-hidden shrink-0">
                <img src={COMPANY.logoUrl} alt={`${COMPANY.name} logo`} className="w-full h-full object-contain p-1" />
              </div>
              <p className="text-accent text-[11px] uppercase tracking-[0.32em] sm:tracking-[0.45em] font-semibold font-heading">
                {COMPANY.tagline}
              </p>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-light leading-[1.05] tracking-tight text-white mb-2 font-sans">
              <span className="block uppercase tracking-tight">{COMPANY.name}</span>
              <span className="block italic font-serif text-white/90 font-light pr-4 mt-3">Structural Elegance.</span>
            </h1>

            <p className="max-w-md text-sm text-white/50 leading-relaxed font-light mb-8 font-sans">
              Bespoke interiors and precision metal-glass fabrication for homes, offices, retail spaces, and custom architectural details across North 24 Parganas and West Bengal.
            </p>

            {/* Interactive routes and actions bar */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <button
                onClick={() => setActiveTab("projects")}
                className="group cursor-pointer inline-flex items-center gap-2 text-white/90 hover:text-white"
                id="hero-btn-portfolio"
              >
                <span className="text-xs uppercase tracking-widest border-b border-accent pb-2 group-hover:pr-4 transition-all duration-300 font-heading">
                  View Portfolio
                </span>
                <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActiveTab("contact")}
                className="px-6 py-2.5 border border-accent/45 text-white hover:text-black hover:bg-accent text-[10px] uppercase tracking-widest transition-all duration-300 font-heading cursor-pointer"
                id="hero-btn-consultation"
              >
                Request Quote
              </button>
            </div>

            {/* Premium precision metadata specs row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/5">
              <div>
                <p className="text-2xl font-light text-accent tracking-wider font-heading">0.2mm</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#E5E5E5]/40 mt-1">WELDING TOLERANCE</p>
              </div>
              <div>
                <p className="text-2xl font-light text-white tracking-wider font-heading">150+</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#E5E5E5]/40 mt-1">COMPLETED SPACES</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl font-light text-accent tracking-wider font-heading">10yr</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#E5E5E5]/40 mt-1">STRUCTURAL ASSURANCE</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right showcase split image block container */}
        <div className="col-span-12 lg:col-span-5 relative min-h-[380px] lg:min-h-screen">
          <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center overflow-hidden border-l border-white/5">
            <div 
              className="w-full h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale contrast-125 transition-transform duration-[4000ms] hover:scale-105"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent lg:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent lg:hidden block"></div>
            
            <div className="absolute bottom-12 right-12 text-right z-10">
              <div className="text-4xl font-serif italic mb-1 text-accent font-light">01</div>
              <div className="text-[9px] uppercase tracking-[0.25em] opacity-60 font-heading text-white">Minimalist Penthouse, Zurich</div>
            </div>
          </div>
        </div>

      </div>

      {/* Side structural decoration banner text */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 items-center pointer-events-none z-10 opacity-60">
        <div className="w-px h-16 bg-white/10"></div>
        <div className="text-[8px] [writing-mode:vertical-lr] uppercase tracking-[0.55em] font-mono text-accent opacity-40">
          EST. MMXIV - ATELIER PLATFORM CORE
        </div>
        <div className="w-px h-16 bg-white/10"></div>
      </div>

    </section>
  );
}
