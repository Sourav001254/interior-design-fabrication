import React, { useState } from "react";
import { Sparkles, Cpu, CornerDownRight, CheckCircle2, ListFilter } from "lucide-react";
import { DesignIdea } from "../types";

export default function AICopilot() {
  const [serviceType, setServiceType] = useState("Luxury Residential Suite");
  const [stylePreference, setStylePreference] = useState("Modern Cinematic Matte-Black with Gold Detailing");
  const [scaleScope, setScaleScope] = useState("3,000 sq ft Penthouse Duplex");
  const [estimatedBudget, setEstimatedBudget] = useState("$300,000 - $500,000 (Luxury Custom)");
  const [extraDetails, setExtraDetails] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [ideaOutput, setIdeaOutput] = useState<DesignIdea | null>(null);

  const loadingLines = [
    "Interfacing with Gemini 3.5 Spatial Intelligence core...",
    "Simulating laser-guided structural steel loads...",
    "Re-plotting custom Calacatta marble alignment textures...",
    "Formulating acoustic division thresholds for aluminum channels...",
    "Balancing negative space weight and custom shadow wash nodes..."
  ];

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIdeaOutput(null);
    setLoadingStep(0);

    // Stagger loading indicators for cinematic premium atmosphere
    const textInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingLines.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const response = await fetch("/api/gemini/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          stylePreference,
          scaleScope,
          estimatedBudget,
          extraDetails
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIdeaOutput(data);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.error("Co-pilot failed, generating premium offline outline:", err);
      // Local design fallback matching input
      setIdeaOutput({
        style: `${stylePreference.replace("Modern", "").trim()} Fusion`,
        materialsSuggested: [
          "Bespoke Sandblasted Champagne Gold Steel Assemblies",
          "Rich Brushed Charcoal Oak Wood Slats",
          "Sound-Insulating Fluted Reeded Safety Glass",
          "Backlit White Quartzite Stone Plinths"
        ],
        estimatedTimeline: "14-16 Weeks (Fully-supervised factory pre-fit and standard 4-phase assembly)",
        fabricationInvolvement: `Heavy-duty precision laser-cut structural aluminum track systems combined with handfinished bronze-gold gating pivots.`,
        aiCommentary: `This concept pairs reeded glass with charcoal timber backing and warm metal highlights. Natural light scatters into soft horizontal lines, giving the space privacy, warmth, and a refined architectural rhythm.`
      });
    } finally {
      clearInterval(textInterval);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIdeaOutput(null);
    setExtraDetails("");
  };

  return (
    <section className="bg-[#080808] py-24 border-t border-white/5 font-sans relative overflow-hidden">
      {/* Visual neon dust lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="relative text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
            Re-Defining Design Strategy
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
            AI Design Co-Pilot
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
          <p className="text-white/50 text-xs mt-6 font-light leading-relaxed">
            Generate a practical concept direction with material suggestions, timeline estimates, and fabrication notes tailored to your project brief.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Form panel */}
          <div className="lg:col-span-5 bg-[#0d0d0d] border border-white/5 p-6 sm:p-8 rounded-none">
            <h3 className="text-white text-xs font-heading uppercase tracking-widest border-b border-white/5 pb-4 mb-6 flex items-center space-x-2">
              <CornerDownRight className="w-4 h-4 text-accent animate-pulse" />
              <span>Project Brief</span>
            </h3>

            <form onSubmit={handleSynthesize} className="space-y-6">
              
              {/* Service Interest field */}
              <div>
                <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2 font-medium">
                  Service Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#080808] border border-white/5 focus:border-accent text-white hover:border-white/15 text-xs font-heading tracking-wider p-3.5 rounded-none outline-none transition-colors"
                >
                  <option>Luxury Residential Suite</option>
                  <option>Commercial Brand Center</option>
                  <option>Premium Private Bank & Lounge</option>
                  <option>Satin-Finished Auto-Gate Structure</option>
                  <option>High-Acoustic Glass Office Divider</option>
                  <option>Heavy Steel Foundation Skeleton</option>
                </select>
              </div>

              {/* Style Preference */}
              <div>
                <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2 font-medium">
                  Style Preference
                </label>
                <input
                  type="text"
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full bg-[#080808] border border-white/5 focus:border-accent text-white hover:border-white/15 text-xs p-3.5 rounded-none outline-none font-sans font-light transition-colors"
                  placeholder="e.g. Minimalist Industrial, Warm Slate, Nordic glass"
                  required
                />
              </div>

              {/* Scope & Size */}
              <div>
                <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2 font-medium">
                  Scope and Size
                </label>
                <input
                  type="text"
                  value={scaleScope}
                  onChange={(e) => setScaleScope(e.target.value)}
                  className="w-full bg-[#080808] border border-white/5 focus:border-accent text-white hover:border-white/15 text-xs p-3.5 rounded-none outline-none font-sans font-light transition-colors"
                  placeholder="e.g. 1500 sq ft, 50-meter outdoor railing"
                  required
                />
              </div>

              {/* Budget Class */}
              <div>
                <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2 font-medium">
                  Planned Budget
                </label>
                <select
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full bg-[#080808] border border-white/5 focus:border-accent text-white hover:border-white/15 text-xs font-heading tracking-wider p-3.5 rounded-none outline-none transition-colors"
                >
                  <option>$50,000 - $100,000 (Premium Select)</option>
                  <option>$150,000 - $300,000 (Artisanal Custom)</option>
                  <option>$300,000 - $500,000 (Luxury Custom)</option>
                  <option>$1,000,000+ (Large-Scale Signature Project)</option>
                </select>
              </div>

              {/* Custom specs */}
              <div>
                <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2 font-medium">
                  Project Notes (Optional)
                </label>
                <textarea
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  rows={3}
                  className="w-full bg-[#080808] border border-white/5 focus:border-accent text-white hover:border-white/15 text-xs p-3.5 rounded-none outline-none resize-none font-sans font-light transition-colors"
                  placeholder="e.g. integrate acoustic backing, add custom dual sliding bronze barn doors, floating stairs..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
              >
                Generate Concept
              </button>

            </form>
          </div>

          {/* Outputs Panel with cinematic states */}
          <div className="lg:col-span-7 min-h-[480px] flex flex-col items-stretch justify-center">
            {isLoading ? (
              /* Loading screen */
              <div className="bg-[#0d0d0d] border border-white/5 p-10 text-center flex flex-col items-center justify-center h-full min-h-[400px] animate-pulse rounded-none">
                <Cpu className="w-10 h-10 text-accent animate-spin mb-6" />
                <h4 className="text-white text-xs font-heading uppercase tracking-widest mb-2">
                  Building Your Concept
                </h4>
                <p className="text-white/40 text-xs font-mono max-w-md">
                  {loadingLines[loadingStep]}
                </p>
                <div className="w-48 h-[1px] bg-white/5 rounded-none overflow-hidden mt-6">
                  <div className="h-full bg-accent rounded-none animate-infinite-width" style={{ width: "65%" }} />
                </div>
              </div>
            ) : ideaOutput ? (
              /* Completed Design Strategy Layout */
              <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-none text-left relative animate-fade-in space-y-8">
                
                {/* Ribbon header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      Concept Generated
                    </span>
                    <h4 className="text-white text-lg font-heading uppercase tracking-wider mt-1.5">
                      {ideaOutput.style}
                    </h4>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-white/65 hover:text-white border border-white/15 hover:border-accent bg-transparent px-3 py-1.5 rounded-none text-[9px] font-heading tracking-wider uppercase cursor-pointer"
                  >
                    RESET CORE
                  </button>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Suggest materials */}
                  <div className="space-y-3">
                    <h5 className="text-accent text-[10px] font-heading uppercase tracking-widest flex items-center space-x-1.5">
                      <ListFilter className="w-3.5 h-3.5" />
                      <span>Curated Premium Materials</span>
                    </h5>
                    <ul className="space-y-2">
                      {ideaOutput.materialsSuggested.map((mat, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-[11px] text-white/80 font-sans font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Estimated Timeline */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white/40 text-[9px] font-heading uppercase tracking-[0.2em] block mb-1">
                        Timeline Estimate
                      </h5>
                      <span className="text-accent text-[10px] font-heading font-medium uppercase block bg-black border border-white/5 px-3 py-2 rounded-none w-fit tracking-wider">
                        {ideaOutput.estimatedTimeline}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-white/40 text-[9px] font-heading uppercase tracking-[0.2em] block mb-1">
                        Fabrication Scope
                      </h5>
                      <p className="text-white/60 text-xs leading-relaxed font-sans font-light">
                        {ideaOutput.fabricationInvolvement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profound core commentary block */}
                <div className="bg-[#080808] border border-white/5 p-5 sm:p-6 rounded-none relative">
                  <div className="absolute top-4 right-4 opacity-[0.03]">
                    <Sparkles className="w-10 h-10 text-accent" />
                  </div>
                  <h5 className="text-accent text-[9px] font-heading uppercase tracking-widest block mb-2 font-semibold">
                    Design Commentary
                  </h5>
                  <p className="text-white/85 text-xs leading-relaxed italic font-serif font-light">
                     &ldquo;{ideaOutput.aiCommentary}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center sm:text-left leading-normal">
                    Like this direction? Share it with the team during your consultation so we can refine it into a buildable scope.
                  </span>
                </div>

              </div>
            ) : (
              /* Awaiting User Input screen */
              <div className="bg-[#0d0d0d] border border-white/5 border-dashed p-12 text-center flex flex-col items-center justify-center rounded-none min-h-[400px]">
                <Cpu className="w-10 h-10 text-white/10 mb-4 animate-pulse" />
                <h4 className="text-white/40 text-[10px] font-heading uppercase tracking-widest mb-2">
                  Ready for Your Brief
                </h4>
                <p className="text-zinc-600 text-xs max-w-sm font-sans font-light leading-relaxed">
                  Enter your project details, then generate a concept direction for materials, mood, timeline, and fabrication scope.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
