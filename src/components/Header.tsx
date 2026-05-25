import React, { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { COMPANY } from "../company";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
}

export default function Header({ activeTab, setActiveTab, isAdminLoggedIn, logoutAdmin }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "gallery", label: "Gallery" },
    { id: "copilot", label: "AI Co-Pilot" },
    { id: "blog", label: "Journal" },
    { id: "careers", label: "Careers" },
    { id: "contact", label: "Consultation" },
  ];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Immersive Rotating Brand Identity Logo */}
        <button 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 sm:gap-4 group cursor-pointer text-left min-w-0"
          id="btn-header-logo"
        >
          <div className="w-10 h-10 border border-accent/60 flex items-center justify-center shrink-0 bg-white overflow-hidden">
            <img src={COMPANY.logoUrl} alt={`${COMPANY.name} logo`} className="w-full h-full object-contain p-0.5" />
          </div>
          <div className="flex flex-col min-w-0 max-w-[calc(100vw-160px)] sm:max-w-none">
            <span className="text-white text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.35em] font-heading font-light leading-none group-hover:text-accent transition-colors truncate">
              {COMPANY.name}
            </span>
            <span className="hidden sm:block text-[9px] text-zinc-500 tracking-[0.2em] uppercase font-mono mt-1 truncate">
              {COMPANY.tagline}
            </span>
          </div>
        </button>

        {/* Immersive Wide tracking Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-2 text-[10px] uppercase tracking-[0.25em] font-heading font-medium transition-colors duration-300 cursor-pointer ${
                activeTab === link.id
                  ? "text-accent"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-accent" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions & Portal credentials */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAdminLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNavClick("admin")}
                className="flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-accent/40 text-white/80 hover:text-white px-3 py-1.5 rounded-none text-[10px] tracking-wider font-heading cursor-pointer"
              >
                <Terminal className="w-3 h-3 text-accent" />
                <span>ADMIN PANEL</span>
              </button>
              <button
                onClick={logoutAdmin}
                className="text-zinc-500 hover:text-red-400 text-[10px] font-mono tracking-wider cursor-pointer px-2 py-1 uppercase"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick("admin")}
              className="text-zinc-500 hover:text-zinc-300 text-[10px] font-mono tracking-widest cursor-pointer px-3 py-1 uppercase"
            >
              Portal
            </button>
          )}

          <button
            id="header-cta-quote"
            onClick={() => handleNavClick("contact")}
            className="px-5 py-2.5 bg-transparent border border-accent/40 hover:bg-accent text-white hover:text-black text-[10px] uppercase tracking-widest transition-all duration-300 font-heading cursor-pointer"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile triggers */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={() => handleNavClick("contact")}
            className="px-4 py-2 border border-accent/40 bg-transparent text-white text-[9px] uppercase tracking-widest font-heading"
          >
            Quote
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-400 hover:text-white p-2"
            id="mobile-menu-trigger"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#080808]/95 border-b border-white/5 px-6 pt-4 pb-6 space-y-4 shadow-2xl animate-fade-in backdrop-blur-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 px-3 text-left text-[10px] tracking-[0.25em] uppercase font-heading rounded-none ${
                  activeTab === link.id
                    ? "bg-white/5 text-accent font-semibold"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("admin")}
                  className="py-2 px-3 text-left text-[10px] tracking-widest uppercase font-mono text-accent bg-white/5 border border-white/5"
                >
                  ADMIN PANEL
                </button>
                <button
                  onClick={() => {
                    logoutAdmin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 text-left text-[10px] font-mono text-red-400"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick("admin")}
                className="py-2 px-3 text-left text-[10px] font-mono text-zinc-600 uppercase"
              >
                Portal Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
