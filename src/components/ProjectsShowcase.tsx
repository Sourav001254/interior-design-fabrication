import React, { useState, useEffect } from "react";
import { ProjectItem } from "../types";
import { 
  X, DollarSign, MapPin, Clock, Star, Sliders, Eye 
} from "lucide-react";

// Interactive Before/After Sliding Image Component
function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const handleMove = (clientX: number, currentTarget: HTMLDivElement) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, e.currentTarget);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || isSliding) {
      handleMove(e.clientX, e.currentTarget);
    }
  };

  return (
    <div 
      className="relative w-full h-[320px] rounded-none overflow-hidden select-none cursor-ew-resize border border-white/5"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsSliding(true)}
      onMouseUp={() => setIsSliding(false)}
      onMouseLeave={() => setIsSliding(false)}
    >
      {/* Before Image (Left Background) */}
      <img 
        src={before} 
        alt="Before layout" 
        className="absolute top-0 left-0 w-full h-full object-cover grayscale brightness-40"
        referrerPolicy="no-referrer"
      />
      <span className="absolute bottom-4 left-4 z-20 bg-black/85 border border-white/10 text-white/60 text-[9px] font-heading tracking-widest px-2.5 py-1 pointer-events-none rounded-none uppercase">
        Structure Baseline
      </span>

      {/* After Image (Right Clapped overlay) */}
      <div 
        className="absolute top-0 right-0 h-full overflow-hidden"
        style={{ width: `${100 - sliderPosition}%` }}
      >
        <img 
          src={after} 
          alt="After finished" 
          className="absolute top-0 right-0 w-full h-full object-cover"
          style={{
            width: `${10000 / Math.max(1, 100 - sliderPosition)}%`,
            height: "100%",
            maxWidth: "none"
          }}
          referrerPolicy="no-referrer"
        />
        <span className="absolute bottom-4 right-4 z-20 bg-accent text-black text-[9px] font-heading font-medium tracking-widest px-2.5 py-1 pointer-events-none rounded-none uppercase">
          Finished Couture
        </span>
      </div>

      {/* Center Sliding Bar */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-accent z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#080808] border border-accent flex items-center justify-center text-accent shadow-xl rotate-45 pointer-events-none rounded-none">
          <Sliders className="w-3 h-3 -rotate-45" />
        </div>
      </div>
    </div>
  );
}

interface ProjectsShowcaseProps {
  onRefreshTrigger?: number;
}

export default function ProjectsShowcase({ onRefreshTrigger = 0 }: ProjectsShowcaseProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to load projects from Express API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [onRefreshTrigger]);

  const categories = ["All", "Home Interior Design", "Office Interior", "Bank & ATM Interior"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-[#080808] py-24 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="relative text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
            Selected Landmarks
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
            Bespoke Portfolio Catalogue
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
          <p className="text-white/50 text-xs mt-6 font-light leading-relaxed">
            Compare before and after views from interiors, office fit-outs, and custom fabrication projects.
          </p>
        </div>

        {/* Category Sorter panel */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 text-[10px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-accent text-black border-accent font-semibold"
                  : "bg-[#0d0d0d] text-white/50 border-white/5 hover:border-accent hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loader status */}
        {isLoading ? (
          <div className="text-center py-24">
            <span className="text-accent text-[10px] font-heading uppercase tracking-widest block animate-pulse">
              Re-drawing master renders...
            </span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-none">
            <span className="text-white/40 text-xs font-heading uppercase tracking-widest block">
              No custom landmarks logged under this segment yet.
            </span>
          </div>
        ) : (
          /* Projects grid cards */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                id={`project-card-${project.id}`}
                className="bg-[#0d0d0d] border border-white/5 p-6 sm:p-8 rounded-none hover:border-accent/40 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  {/* Slider Control Container */}
                  <BeforeAfterSlider 
                    before={project.beforeImage} 
                    after={project.afterImage} 
                    title={project.title} 
                  />

                  {/* Text details below slider */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-semibold">
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-1 text-white/40 font-mono text-[9px] uppercase">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-light text-white uppercase tracking-wider font-heading">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3 font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  {/* Mini detail values */}
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-1.5 text-white/40">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-mono">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-white/40">
                      <DollarSign className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-mono text-[#E5E5E5]/70">{project.costEstimate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="cursor-pointer inline-flex items-center space-x-2 text-accent/80 hover:text-accent text-[10px] font-heading tracking-widest uppercase transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Fullscreen Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-5xl rounded-none my-8 p-6 sm:p-10 text-left shadow-2xl">
              
              {/* Abs Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white border border-white/10 hover:border-accent bg-white/5 p-2.5 rounded-none transition-colors cursor-pointer"
                id="close-project-modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="max-w-3xl mb-8">
                <span className="text-[10px] font-heading tracking-widest text-accent uppercase block mb-2">
                  Completed Project - Year {activeProject.completedYear}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight uppercase font-sans">
                  {activeProject.title}
                </h2>
                <div className="flex flex-wrap gap-4 items-center mt-3 text-white/40 text-[9px] font-heading uppercase tracking-wider">
                  <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-none text-accent">
                    {activeProject.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{activeProject.location}</span>
                  </div>
                  <span>-</span>
                  <span>CLIENT: {activeProject.clientName}</span>
                </div>
              </div>

              {/* Grid split description vs attributes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-12">
                <div className="lg:col-span-2 space-y-6">
                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-zinc-400 text-[10px] font-heading uppercase tracking-[0.2em] mb-3">
                      Design Mandate & Narrative
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Challenge vs Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/5 p-5 rounded-none">
                      <h4 className="text-white text-[10px] font-heading uppercase tracking-wider mb-2">The Structural Challenge</h4>
                      <p className="text-white/50 text-xs leading-relaxed font-light">{activeProject.challenge}</p>
                    </div>
                    <div className="bg-white/5 border border-accent/20 p-5 rounded-none">
                      <h4 className="text-accent text-[10px] font-heading uppercase tracking-wider mb-2">The Engineering Solution</h4>
                      <p className="text-white/60 text-xs leading-relaxed font-light">{activeProject.solution}</p>
                    </div>
                  </div>

                  {/* Project Gallery */}
                  <div>
                    <h3 className="text-zinc-400 text-[10px] font-heading uppercase tracking-[0.2em] mb-4">
                      Internal Details Gallery
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {activeProject.galleryImages && activeProject.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative h-48 rounded-none overflow-hidden border border-white/5">
                          <img 
                            src={img} 
                            alt={`Gallery view ${idx}`} 
                            className="w-full h-full object-cover grayscale brightness-85 hover:grayscale-0 hover:scale-105 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Specs panel */}
                <div className="bg-white/5 border border-white/5 p-6 rounded-none space-y-6">
                  <h3 className="text-white text-[10px] font-heading uppercase tracking-widest border-b border-white/5 pb-3">
                    Technical Specifications
                  </h3>

                  <div className="space-y-4 text-[10px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/40">PROJECT SCALE:</span>
                      <span className="text-white font-medium">{activeProject.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">REALIZE YEAR:</span>
                      <span className="text-white">{activeProject.completedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">BUDGET SCALE:</span>
                      <span className="text-accent font-semibold">{activeProject.costEstimate}</span>
                    </div>
                  </div>

                  {/* Materials list */}
                  <div>
                    <h4 className="text-white/40 text-[9px] font-heading uppercase tracking-widest mb-3">
                      Selected Premium Materials:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.materialsUsed.map((mat, i) => (
                        <span key={i} className="text-[9px] font-heading tracking-widest uppercase bg-black border border-white/5 text-white/80 px-2.5 py-1.5 rounded-none">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mini testimonial review */}
                  {activeProject.clientReview && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center space-x-1 text-accent mb-2">
                        {[...Array(activeProject.clientReview.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-white/50 text-[11px] italic leading-relaxed font-light">
                        &ldquo;{activeProject.clientReview.comment}&rdquo;
                      </p>
                      <div className="mt-3">
                        <p className="text-white text-[10px] font-heading uppercase tracking-wider">{activeProject.clientReview.reviewerName}</p>
                        <p className="text-zinc-500 text-[9px] uppercase font-mono mt-0.5">{activeProject.clientReview.role}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Complete horizontal process timeline */}
              <div className="pt-8 border-t border-white/5">
                <h3 className="text-white text-[10px] font-heading uppercase tracking-widest mb-6">
                  Detailed Integration Timeline Phases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {activeProject.timeline && activeProject.timeline.map((item, idx) => (
                    <div key={idx} className="relative bg-white/5 border border-white/5 p-5 rounded-none">
                      <div className="text-accent font-heading text-xs font-bold mb-2">
                        0{idx + 1}
                      </div>
                      <h4 className="text-white text-[10px] font-heading uppercase tracking-wider mb-2">
                        {item.step}
                      </h4>
                      <p className="text-white/50 text-[11px] leading-relaxed font-light">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
