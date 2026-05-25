import React from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "../company";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-12 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-4">
            <button 
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-4 cursor-pointer text-left group"
            >
              <div className="w-9 h-9 border border-accent/60 bg-white flex items-center justify-center overflow-hidden">
                <img src={COMPANY.logoUrl} alt={`${COMPANY.name} logo`} className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs uppercase tracking-[0.25em] font-heading font-light leading-none group-hover:text-accent transition-colors">{COMPANY.name}</span>
                <span className="text-[8px] text-zinc-500 tracking-[0.15em] uppercase font-mono mt-1">{COMPANY.tagline}</span>
              </div>
            </button>
            <p className="text-white/40 text-xs leading-relaxed font-light">
              Interior design, office fit-outs, structural metal work, and architectural glass fabrication led by {COMPANY.owner}.
            </p>
            {/* Socials */}
            <div className="flex space-x-3 pt-2">
              {[
                { icon: <Phone className="w-3.5 h-3.5" />, url: `tel:+91${COMPANY.phone}` },
                { icon: <Mail className="w-3.5 h-3.5" />, url: `mailto:${COMPANY.email}` },
                { icon: <MessageCircle className="w-3.5 h-3.5" />, url: `https://wa.me/${COMPANY.whatsappNumber}` },
                { icon: <MapPin className="w-3.5 h-3.5" />, url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}` },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none border border-white/5 bg-white/5 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sorter Links Col */}
          <div>
            <h4 className="text-white text-[10px] font-heading uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
              Spatial Formats
            </h4>
            <ul className="space-y-2.5 text-[10px] text-white/40 font-heading uppercase tracking-wider">
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Home Interior Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Office Space Partitions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Bank Security Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Heavy Iron Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Slimline Glass Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-[10px] font-heading uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
              Atelier Platform
            </h4>
            <ul className="space-y-2.5 text-[10px] text-white/40 font-heading uppercase tracking-wider">
              <li>
                <button onClick={() => handleNavClick("projects")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Project Showcases
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("gallery")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Couture Galleries
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("copilot")} className="hover:text-accent text-accent transition-colors cursor-pointer block text-left">
                  AI Spatial Co-Pilot
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("blog")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Insights Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("admin")} className="hover:text-accent transition-colors cursor-pointer block text-left">
                  Executive login
                </button>
              </li>
            </ul>
          </div>

          {/* SEO Structured schemas col */}
          <div className="space-y-4">
            <h4 className="text-white text-[10px] font-heading uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
              Atelier Schema Metrics
            </h4>
            <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-none space-y-2 text-[9px] font-mono text-white/40">
              <p>LOCALITY: {COMPANY.shortAddress}</p>
              <p>FOUNDED: MMXII</p>
              <p>METRO: EN 1090 Steel Compliant</p>
              <p>STRUCTURAL WARRANTY: X Years</p>
              <p>OWNER: {COMPANY.owner}</p>
              <p>PHONE: {COMPANY.phoneDisplay}</p>
            </div>
          </div>
        </div>

        {/* Outer credit line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-[#E5E5E5]/30 font-mono tracking-widest uppercase">
          <div>
            (c) {currentYear} {COMPANY.name}. HIGH-TOLERANCE INTERIOR DESIGN & FABRICATION.
          </div>
          <div className="flex space-x-4">
            <span>Sitemap.xml</span>
            <span>Robots.txt</span>
            <span>GDPR Privacy Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
