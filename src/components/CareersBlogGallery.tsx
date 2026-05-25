import React, { useState, useEffect } from "react";
import { 
  Calendar, User, ArrowRight, X, 
  MapPin, Clock, CheckCircle2, Star, Quote, ChevronLeft, ChevronRight 
} from "lucide-react";
import { BlogItem, TestimonialItem } from "../types";
import { COMPANY } from "../company";

export default function CareersBlogGallery() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [activeBlog, setActiveBlog] = useState<BlogItem | null>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeTestIdx, setActiveTestIdx] = useState(0);

  const [selectedGalleryCat, setSelectedGalleryCat] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Careers application
  const [appliedRole, setAppliedRole] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantResume, setApplicantResume] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  // Fetch blogs & testimonials on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const resBlog = await fetch("/api/blogs");
        if (resBlog.ok) {
          const data = await resBlog.json();
          setBlogs(data);
        }

        const resTest = await fetch("/api/testimonials");
        if (resTest.ok) {
          const data = await resTest.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Fail to fetch blogs or testimonials:", err);
      }
    }
    fetchData();
  }, []);

  const galleryCategories = ["All", "Interior", "Metal Fabrication", "ACP Boards", "Glass Work"];

  const galleryItems = [
    { cat: "Interior", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", title: "Luxury Living Room, Alipore" },
    { cat: "Interior", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", title: "Signature Dining Set, Salt Lake" },
    { cat: "Metal Fabrication", img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800", title: "Steel Cantilever Auto-Gate" },
    { cat: "ACP Boards", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", title: "High-spec Brushed ACP Facade" },
    { cat: "Glass Work", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800", title: "Office Dual-Tempered Atrium" },
    { cat: "Metal Fabrication", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800", title: "Bespoke Structural Column Frames" }
  ];

  const filteredGallery = selectedGalleryCat === "All"
    ? galleryItems
    : galleryItems.filter(i => i.cat === selectedGalleryCat);

  const careerRoles = [
    { id: "lead-designer", title: "Senior Spatial Interior Designer", depart: "Atelier Division", location: COMPANY.shortAddress, schedule: "Full-Time" },
    { id: "mig-welder", title: "Certified MIG/TIG Custom Fabricator", depart: "Fabrication Plant", location: "Factory Yard", schedule: "Full-Time" },
    { id: "sales-director", title: "Luxury Brand Director", depart: "Growth Operations", location: COMPANY.shortAddress, schedule: "Full-Time" }
  ];

  const handleCareerApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      alert("Please provide a name and email certificate contact.");
      return;
    }
    setApplySuccess(true);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantPhone("");
    setApplicantResume("");
  };

  const handleNextTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePrevTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
    }
  };

  return (
    <div className="font-sans">
      
      {/* Testimonials Block */}
      {testimonials.length > 0 && (
        <section className="bg-[#080808] py-24 border-t border-white/5 overflow-hidden relative">
          <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <Quote className="w-56 h-56 text-accent" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
              Verified Retrospectives
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans mb-16">
              Client Testimonials
            </h2>

            <div className="bg-[#0d0d0d] border border-white/5 p-8 sm:p-12 rounded-none text-left relative">
              <div className="flex items-center space-x-1 text-accent mb-6">
                {[...Array(testimonials[activeTestIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current text-accent" />
                ))}
              </div>

              <p className="text-[#E5E5E5]/90 text-base sm:text-lg italic leading-relaxed font-serif font-light">
                &ldquo;{testimonials[activeTestIdx].comment}&rdquo;
              </p>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[activeTestIdx].avatarUrl}
                    alt={testimonials[activeTestIdx].name}
                    className="w-11 h-11 border border-white/10 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-white text-xs font-heading uppercase tracking-wider">{testimonials[activeTestIdx].name}</h4>
                    <span className="text-white/40 text-[9px] uppercase font-mono tracking-widest block mt-0.5">
                      {testimonials[activeTestIdx].role} / {testimonials[activeTestIdx].company}
                    </span>
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={handlePrevTestimonial}
                    className="p-2 bg-transparent border border-white/10 hover:border-accent text-white/50 hover:text-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="p-2 bg-transparent border border-white/10 hover:border-accent text-white/50 hover:text-white cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="bg-[#080808] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Title */}
          <div className="relative text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
              Atelier Capacities
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
              Exquisite Finish Gallery
            </h2>
            <div className="w-12 h-px bg-accent mx-auto mt-6" />
            <p className="text-white/50 text-xs mt-6 font-light leading-relaxed">
              High-definition photographic captures detailing spatial installations, custom heavy-tolerance steel gates, and pristine glass system fittings.
            </p>
          </div>

          {/* Sorter panels */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCat(cat)}
                className={`px-5 py-3 text-[10px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                  selectedGalleryCat === cat
                    ? "bg-accent text-black border-accent font-semibold"
                    : "bg-[#0d0d0d] text-white/50 border-white/5 hover:border-accent hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid collage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(item.img)}
                className="group relative h-80 bg-[#0d0d0d] rounded-none overflow-hidden border border-white/5 cursor-zoom-in"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md border border-white/5 text-white text-[9px] font-heading tracking-widest uppercase py-2 px-3 rounded-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal / Blogs Section */}
      {blogs.length > 0 && (
        <section className="bg-[#080808] py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Title */}
            <div className="relative text-center mb-16 max-w-2xl mx-auto">
              <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
                Insights Journal
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
                Architectural Literature
              </h2>
              <div className="w-12 h-px bg-accent mx-auto mt-6" />
            </div>

            {/* Blogs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-[#0d0d0d] border border-white/5 p-6 sm:p-8 rounded-none hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative h-60 rounded-none overflow-hidden border border-white/5 mb-6">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-center space-x-4 text-[#E5E5E5]/40 text-[9px] font-mono uppercase mb-3 tracking-wider">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{blog.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-accent" />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h3 className="text-white text-base font-heading uppercase tracking-wider group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-white/55 text-xs sm:text-sm mt-3 leading-relaxed font-light font-sans">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                    <button
                      onClick={() => setActiveBlog(blog)}
                      className="cursor-pointer text-accent/80 hover:text-accent text-[10px] font-heading tracking-widest uppercase inline-flex items-center space-x-2 transition-colors"
                    >
                      <span>Read Narrative</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-[#E5E5E5]/30 font-mono text-[9px] uppercase tracking-widest">{blog.readTime}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Careers Section */}
      <section className="bg-[#080808] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block">
                Expand Our Atelier
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-4 uppercase font-sans leading-tight">
                Careers & Profession Proposals
              </h2>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                {COMPANY.name} brings designers, site supervisors, fabricators, and project coordinators into one studio workflow. We look for people who care about detail, client communication, and reliable execution.
              </p>
              <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-none">
                <h4 className="text-white text-[10px] font-heading uppercase tracking-widest mb-2 font-semibold">Our Studio Policy</h4>
                <p className="text-white/40 text-xs font-sans font-light leading-relaxed">
                  All active roles are structured around our studio and fabrication workflow at {COMPANY.shortAddress}. We prioritize safe tools, clear communication, and continuous skill development.
                </p>
              </div>
            </div>

            {/* Careers Listing & Interactive Application form */}
            <div className="lg:col-span-7 space-y-4">
              {appliedRole ? (
                /* Interactive application form */
                <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-none animate-fade-in text-left">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div>
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest">Atelier Candidacy</span>
                      <h4 className="text-white text-xs font-heading uppercase tracking-wider mt-1.5 font-medium">Applying: {appliedRole}</h4>
                    </div>
                    <button
                      onClick={() => {
                        setAppliedRole(null);
                        setApplySuccess(false);
                      }}
                      className="text-[#E5E5E5]/40 hover:text-white p-2 border border-white/5 hover:border-accent bg-transparent transition-all rounded-none cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {applySuccess ? (
                    <div className="text-center py-8 space-y-4">
                      <CheckCircle2 className="w-10 h-10 text-accent mx-auto animate-pulse" />
                      <h5 className="text-white text-xs font-heading uppercase text-center tracking-widest">Portfolio Received</h5>
                      <p className="text-white/55 text-xs max-w-sm mx-auto text-center font-sans font-light leading-relaxed">
                        Your application has been received. Our team will review it and respond within 7 business days.
                      </p>
                      <button
                        onClick={() => {
                          setAppliedRole(null);
                          setApplySuccess(false);
                        }}
                        className="px-6 py-2 border border-white/15 text-white/50 hover:text-white text-[10px] font-heading tracking-widest uppercase rounded-none transition"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCareerApply} className="space-y-4 text-xs font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Full Name</label>
                          <input
                            type="text"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full bg-[#080808] border border-white/5 text-white p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Email Address</label>
                          <input
                            type="email"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            className="w-full bg-[#080808] border border-white/5 text-white p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Phone Number</label>
                          <input
                            type="tel"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="w-full bg-[#080808] border border-white/5 text-white p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-mono font-light"
                          />
                        </div>
                        <div>
                          <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Portfolio Link or CV Summary</label>
                          <input
                            type="text"
                            value={applicantResume}
                            onChange={(e) => setApplicantResume(e.target.value)}
                            className="w-full bg-[#080808] border border-white/5 text-white p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light text-xs"
                            placeholder="Link to Behance, LinkedIn, or CV text..."
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 cursor-pointer"
                      >
                        Submit Dossier Application
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* Career lists */
                careerRoles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-accent/40 transition-all duration-300"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{role.depart}</span>
                      <h4 className="text-white text-base font-heading uppercase mt-1 tracking-wider">{role.title}</h4>
                      <div className="flex gap-4 items-center text-white/30 text-[9px] uppercase font-heading tracking-wider mt-2.5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          {role.schedule}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setAppliedRole(role.title)}
                      className="mt-4 sm:mt-0 px-5 py-3 border border-accent/40 hover:border-accent bg-transparent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest shrink-0 uppercase rounded-none cursor-pointer transition-all duration-300"
                    >
                      APPLY ROLE
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Image zoom */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <img
            src={lightboxImage}
            alt=" lightbox maximized"
            className="max-w-full max-h-[90vh] object-contain border border-white/10 shadow-2xl rounded-none"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Blogs Full modal render dialog */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-start justify-center p-4 sm:p-10 animate-fade-in">
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-none my-8 p-6 sm:p-10 text-left">
            <button
              onClick={() => setActiveBlog(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white border border-white/10 hover:border-accent bg-white/5 p-2 rounded-none cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-heading text-accent uppercase tracking-widest block mb-1">
              {COMPANY.name} Insights / {activeBlog.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight max-w-3xl mb-4 font-sans leading-snug">
              {activeBlog.title}
            </h2>

            <div className="flex gap-4 items-center text-white/40 text-[9px] font-heading uppercase tracking-wider mb-8 border-b border-white/5 pb-4">
              <span>Published: {activeBlog.publishedAt}</span>
              <span>/</span>
              <span>Author: {activeBlog.author}</span>
              <span>/</span>
              <span>{activeBlog.readTime}</span>
            </div>

            <div className="relative h-96 rounded-none overflow-hidden border border-white/5 mb-8">
              <img
                src={activeBlog.imageUrl}
                alt="blog cover detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-white/80 space-y-6 leading-relaxed font-serif text-sm sm:text-base text-justify" style={{ whiteSpace: "pre-line" }}>
              {activeBlog.content}
            </div>

            <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[10px]">
              <div className="flex gap-2">
                {activeBlog.tags && activeBlog.tags.map((tg, i) => (
                  <span key={i} className="bg-black text-[#E5E5E5]/50 py-1.5 px-3 rounded-none border border-white/5 uppercase font-mono tracking-wider">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
