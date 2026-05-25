import React, { useState } from "react";
import { SERVICES_DATA } from "../servicesData";
import { 
  Home, Crown, Briefcase, ShieldAlert, Sparkles, Hammer, KeyRound, Layers, 
  ArrowLeft, ArrowRight, ArrowDownRight, ShieldCheck, HelpCircle 
} from "lucide-react";

// Helper to resolve icon by key-string
const IconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Home":
      return <Home className={className} />;
    case "Crown":
      return <Crown className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Hammer":
      return <Hammer className={className} />;
    case "KeyRound":
      return <KeyRound className={className} />;
    case "Layers":
      return <Layers className={className} />;
    default:
      return <Hammer className={className} />;
  }
};

interface ServicesShowcaseProps {
  setActiveTab: (tab: string) => void;
  preselectService: (serviceName: string) => void;
}

export default function ServicesShowcase({ setActiveTab, preselectService }: ServicesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "design" | "fabrication" | "specialty">("all");
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const filteredServices = SERVICES_DATA.filter(
    (s) => selectedCategory === "all" || s.category === selectedCategory
  );

  const activeService = SERVICES_DATA.find((s) => s.id === activeServiceId);

  const handleServiceQuoteClick = (serviceName: string) => {
    preselectService(serviceName);
    setActiveTab("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCatalog = () => {
    setActiveServiceId(null);
    const elem = document.getElementById("services-section-head");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#080808] py-24 border-t border-white/5 font-sans" id="services-section-head">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Render detailed view of selected service */}
        {activeService ? (
          <div className="animate-fade-in">
            {/* Header / Back navigation */}
            <button
              onClick={handleBackToCatalog}
              className="group inline-flex items-center space-x-2 text-zinc-400 hover:text-white mb-8 border border-white/10 hover:border-accent bg-white/5 px-4 py-2 rounded-none text-[10px] uppercase tracking-wider font-heading cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-accent" />
              <span>Back to Catalog</span>
            </button>

            {/* Immersive service split screen banner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <span className="text-[10px] font-heading tracking-[0.3em] text-accent uppercase">
                  Service Portfolio - {activeService.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
                  {activeService.name}
                </h2>
                <p className="text-accent text-sm font-serif italic mt-3 font-light text-white/80">
                  &ldquo;{activeService.tagline}&rdquo;
                </p>
                <div className="w-12 h-px bg-accent mt-6 mb-6"></div>
                <p className="text-white/60 text-sm leading-relaxed mt-6 font-light">
                  {activeService.fullDescription}
                </p>

                {/* Benefits / Structural Standards */}
                <div className="mt-8">
                  <h4 className="text-zinc-400 text-[10px] font-heading uppercase tracking-[0.25em] mb-4">
                    Architectural Advantages & Assurance
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-white/5 border border-white/5 p-4 rounded-none">
                        <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-white/80 text-xs leading-normal font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spectacular detailed banner image card with hover light overlay */}
              <div className="relative h-[380px] rounded-none overflow-hidden border border-white/5 shadow-2xl">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.name}
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/85 backdrop-blur-md border border-white/5 rounded-none">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border border-accent flex items-center justify-center shrink-0">
                      <IconResolver name={activeService.icon} className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white text-[10px] font-heading tracking-widest uppercase">Verified Fabrication Yard</h4>
                      <p className="text-white/40 text-[9px] uppercase font-mono mt-1">In-house planning with supervised site execution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Process Outline & Service FAQs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-white/5">
              
              {/* Process Step list */}
              <div className="lg:col-span-2">
                <h3 className="text-white text-base font-heading uppercase tracking-widest mb-8">
                  The Metrology Workflow (Phase 1 to 5)
                </h3>
                <div className="space-y-6">
                  {activeService.process.map((step, idx) => (
                    <div key={idx} className="flex items-stretch space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-none border border-accent flex items-center justify-center text-accent font-sans text-xs shrink-0 bg-black/40">
                          {idx + 1}
                        </div>
                        {idx < activeService.process.length - 1 && (
                          <div className="w-[1px] bg-white/10 grow my-2" />
                        )}
                      </div>
                      <div className="pb-4 sm:pl-2">
                        <h4 className="text-white text-xs font-heading uppercase tracking-wider mt-0.5">
                          {step.split(":")[0]}
                        </h4>
                        <p className="text-white/55 text-xs mt-1.5 font-light leading-relaxed">
                          {step.split(":")[1] || "Full compliance verification, materials mapping metrics, and architectural detail alignments."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service FAQ module inside quick panel */}
              <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-none h-fit">
                <h3 className="text-white text-xs font-heading font-semibold uppercase tracking-widest mb-6 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <span>Frequently Queried</span>
                </h3>
                <div className="space-y-6">
                  {activeService.faqs.map((faq, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-accent text-[11px] font-sans font-medium uppercase tracking-wide">
                        Q: {faq.question}
                      </h4>
                      <p className="text-white/60 text-xs leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleServiceQuoteClick(activeService.name)}
                  className="w-full mt-8 bg-transparent hover:bg-accent border border-accent/60 text-white hover:text-black hover:border-accent text-[10px] uppercase tracking-widest font-heading py-3.5 transition-all duration-300 rounded-none cursor-pointer"
                >
                  Acquire Design Layout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Standard Catalog Listing */}
            <div className="relative text-center mb-16 max-w-2xl mx-auto">
              <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold">
                Core Competencies
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
                Services Catalogue
              </h2>
              <div className="w-12 h-px bg-accent mx-auto mt-6" />
              <p className="text-white/50 text-xs mt-6 font-light leading-relaxed">
                Interiors, office fit-outs, steel work, gates, railings, glass partitions, and custom fabrication planned under one studio workflow.
              </p>
            </div>

            {/* Category Navigation Sorter */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
              {[
                { id: "all", label: "All Formats" },
                { id: "design", label: "Interior Design" },
                { id: "fabrication", label: "Heavy Fabrication" },
                { id: "specialty", label: "Specialty Security" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-5 py-3 text-[10px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                    selectedCategory === cat.id
                      ? "bg-accent text-black border-accent font-semibold"
                      : "bg-[#0d0d0d] text-white/50 border-white/5 hover:border-accent hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Service Grid Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="group relative bg-[#0d0d0d] border border-white/5 hover:border-accent/40 p-8 rounded-none flex flex-col justify-between transition-all duration-300"
                >
                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

                  <div>
                    {/* Header Icon / Label */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 border border-white/10 bg-black/40 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-black group-hover:border-accent rounded-none">
                        <IconResolver name={service.icon} className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-base text-white uppercase tracking-wider group-hover:text-accent transition-colors font-heading leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-white/50 text-[11px] leading-relaxed mt-4 font-light min-h-[44px]">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setActiveServiceId(service.id)}
                      className="inline-flex items-center space-x-2 text-accent/80 hover:text-accent text-[10px] font-heading tracking-widest cursor-pointer uppercase transition-colors"
                    >
                      <span>Review Metrology</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <ArrowDownRight className="w-5 h-5 text-white/10 group-hover:text-accent/35 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
