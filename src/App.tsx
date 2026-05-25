import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesShowcase from "./components/ServicesShowcase";
import ProjectsShowcase from "./components/ProjectsShowcase";
import AICopilot from "./components/AICopilot";
import CareersBlogGallery from "./components/CareersBlogGallery";
import ContactForm from "./components/ContactForm";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import { Cpu, ArrowRight } from "lucide-react";
import { COMPANY } from "./company";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [preselectedService, setPreselectedService] = useState("Luxury Residential Suite");
  const [refreshProjectsTrigger, setRefreshProjectsTrigger] = useState(0);

  // Read admin token from local state on startup
  useEffect(() => {
    const savedToken = localStorage.getItem("lux_admin_token");
    if (savedToken) {
      setAdminToken(savedToken);
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleSetIsAdminLoggedIn = (val: boolean) => {
    setIsAdminLoggedIn(val);
    if (!val) {
      localStorage.removeItem("lux_admin_token");
      setAdminToken("");
    }
  };

  const handleSetAdminToken = (token: string) => {
    setAdminToken(token);
    localStorage.setItem("lux_admin_token", token);
  };

  const handleLogout = async () => {
    try {
      if (adminToken) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      }
    } catch (err) {
      console.error("Failed to close admin session:", err);
    } finally {
      handleSetIsAdminLoggedIn(false);
      setActiveTab("home");
    }
  };

  const selectServiceForQuote = (serviceName: string) => {
    setPreselectedService(serviceName);
  };

  const handleProjectsChanged = () => {
    setRefreshProjectsTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen relative font-sans selection:bg-accent selection:text-black">
      
      {/* Exquisite global overhead glass header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminLoggedIn={isAdminLoggedIn}
        logoutAdmin={handleLogout}
      />

      {/* Main Tab Routing Portal with elegant animations */}
      <main className="relative pt-20">
        
        {/* VIEW: HOME */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            <Hero setActiveTab={setActiveTab} />
            
            {/* Quick About / Studio Statement */}
            <section className="bg-[#080808] py-24 border-t border-white/5 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-12 xl:col-span-5">
                    <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
                      Atelier Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans leading-snug">
                      Synthesizing Form, Tension & Texture
                    </h2>
                    <div className="w-12 h-px bg-accent mt-6 mb-6" />
                  </div>
                  <div className="lg:col-span-12 xl:col-span-7 text-white/50 text-xs sm:text-sm leading-relaxed font-light space-y-6 font-sans">
                    <p>
                      At {COMPANY.name}, we build custom interiors and fabrication details around one practical promise: measured planning, durable materials, and clean finishing from the first site visit to final handover.
                    </p>
                    <p className="border-l border-accent pl-4 italic text-accent font-serif text-sm">
                      &ldquo;Every custom space we formulate is manufactured down to millimeter tolerances, blending fine-glass structures with heavy-tolerance gating frames under a single blueprint.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Preview of primary services */}
            <ServicesShowcase 
              setActiveTab={setActiveTab} 
              preselectService={selectServiceForQuote} 
            />

            {/* Interactive Before/After sliding designs */}
            <ProjectsShowcase onRefreshTrigger={refreshProjectsTrigger} />

            {/* Call to co-pilot preview badge */}
            <section className="bg-[#080808] py-20 border-t border-white/5 text-center">
              <div className="max-w-4xl mx-auto px-6 bg-[#0d0d0d] border border-white/5 p-8 sm:p-12 rounded-none relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <Cpu className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="text-white text-xs sm:text-sm font-heading uppercase tracking-widest mb-2 font-semibold">
                  Explore Virtual Design Instructions
                </h3>
                <p className="text-white/40 text-xs max-w-lg mx-auto mb-8 leading-relaxed font-sans font-light">
                  Generate material ideas, timeline estimates, and fabrication notes for your next interior or metal-glass project.
                </p>
                <button
                  onClick={() => setActiveTab("copilot")}
                  className="group cursor-pointer inline-flex items-center space-x-2 bg-transparent border border-accent hover:bg-accent text-white hover:text-black text-[10px] font-heading tracking-widest py-3.5 px-8 rounded-none uppercase transition-all duration-300"
                >
                  <span>Open Design Co-Pilot</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:text-black" />
                </button>
              </div>
            </section>

            {/* Testimonials and remaining */}
            <CareersBlogGallery />

            {/* Intake Form */}
            <ContactForm preselectedService={preselectedService} />
          </div>
        )}

        {/* VIEW: SERVICES */}
        {activeTab === "services" && (
          <div className="animate-fade-in">
            <ServicesShowcase 
              setActiveTab={setActiveTab} 
              preselectService={selectServiceForQuote} 
            />
          </div>
        )}

        {/* VIEW: PROJECTS */}
        {activeTab === "projects" && (
          <div className="animate-fade-in">
            <ProjectsShowcase onRefreshTrigger={refreshProjectsTrigger} />
          </div>
        )}

        {/* VIEW: CO-PILOT */}
        {activeTab === "copilot" && (
          <div className="animate-fade-in">
            <AICopilot />
          </div>
        )}

        {/* VIEW: DIRECT CALLOUT SECTIONS (LIGHT Lightbox view wrapper) */}
        {(activeTab === "gallery" || activeTab === "blog" || activeTab === "careers") && (
          <div className="animate-fade-in">
            <CareersBlogGallery />
          </div>
        )}

        {/* VIEW: CONSULTATIVE ENQUIRY FORM */}
        {activeTab === "contact" && (
          <div className="animate-fade-in">
            <ContactForm preselectedService={preselectedService} />
          </div>
        )}

        {/* VIEW: ADMINISTRATIVE CMS */}
        {activeTab === "admin" && (
          <div className="animate-fade-in">
            <AdminPanel
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={handleSetIsAdminLoggedIn}
              adminToken={adminToken}
              setAdminToken={handleSetAdminToken}
              onProjectsChanged={handleProjectsChanged}
            />
          </div>
        )}

      </main>

      {/* Exquisite global brand footers */}
      <Footer setActiveTab={setActiveTab} />

      {/* Dynamic floating quick-assistant panel to Gemini Co-Pilot */}
      {activeTab !== "copilot" && activeTab !== "admin" && (
        <button
          onClick={() => setActiveTab("copilot")}
          className="fixed bottom-6 right-6 z-40 bg-[#0c0c0c] hover:bg-accent border border-accent/40 hover:border-accent text-white hover:text-black p-4 rounded-none shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group"
          id="floating-ai-button"
        >
          <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform text-accent group-hover:text-black shrink-0" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-[9px] font-heading font-semibold tracking-widest uppercase ml-0 group-hover:ml-2">
            AI Co-Pilot
          </span>
        </button>
      )}

    </div>
  );
}
