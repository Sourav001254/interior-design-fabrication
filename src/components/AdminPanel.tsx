import React, { useState, useEffect } from "react";
import { 
  Terminal, ShieldCheck, Mail, Phone, Clock, FileText, 
  Trash2, Plus, LogOut, ChevronRight, HelpCircle, 
  UserPlus, BarChart3, Star, Layers, Calendar, DollarSign 
} from "lucide-react";
import { LeadItem, ProjectItem, BlogItem, TestimonialItem } from "../types";
import { COMPANY } from "../company";

interface AdminPanelProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  adminToken: string;
  setAdminToken: (val: string) => void;
  onProjectsChanged?: () => void;
}

export default function AdminPanel({ 
  isAdminLoggedIn, 
  setIsAdminLoggedIn, 
  adminToken, 
  setAdminToken,
  onProjectsChanged
}: AdminPanelProps) {
  
  // Login Form details
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // DB States
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);

  // Active view
  const [activeSubView, setActiveSubView] = useState<"leads" | "add-project" | "add-blog" | "add-testimonial">("leads");

  // Project Adding Fields Form
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("Home Interior Design");
  const [projLocation, setProjLocation] = useState("");
  const [projClient, setProjClient] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projChallenge, setProjChallenge] = useState("");
  const [projSolution, setProjSolution] = useState("");
  const [projDuration, setProjDuration] = useState("");
  const [projCost, setProjCost] = useState("");
  const [projYear, setProjYear] = useState("");
  const [projBeforeImg, setProjBeforeImg] = useState("");
  const [projAfterImg, setProjAfterImg] = useState("");
  const [projMaterials, setProjMaterials] = useState("");
  const [projReviewer, setProjReviewer] = useState("");
  const [projReviewRole, setProjReviewRole] = useState("");
  const [projReviewComment, setProjReviewComment] = useState("");
  const [projReviewRating, setProjReviewRating] = useState(5);

  const [formSuccessMsg, setFormSuccessMsg] = useState("");

  // Blog Adding Fields Form
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Design Trends");
  const [blogAuthor, setBlogAuthor] = useState("Lead Architect");
  const [blogImg, setBlogImg] = useState("");
  const [blogTime, setBlogTime] = useState("5 min read");
  const [blogTags, setBlogTags] = useState("");

  // Testimonial Adding Form
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testCompany, setTestCompany] = useState("");
  const [testComment, setTestComment] = useState("");
  const [testRating, setTestRating] = useState(5);
  const [testAvatar, setTestAvatar] = useState("");

  // Fetch administrator dashboard stats
  const fetchAdminStats = async () => {
    if (!adminToken) return;
    try {
      // Fetch Leads
      const resLeads = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (resLeads.status === 403) {
        setAdminToken("");
        setIsAdminLoggedIn(false);
        return;
      }
      if (resLeads.ok) {
        const data = await resLeads.json();
        setLeads(data);
      }

      // Fetch projects to get count
      const resProj = await fetch("/api/projects");
      if (resProj.ok) {
        const data = await resProj.json();
        setProjectsCount(data.length);
      }

      // Fetch blogs
      const resBlog = await fetch("/api/blogs");
      if (resBlog.ok) {
        const data = await resBlog.json();
        setBlogsCount(data.length);
      }

      // Testimonials
      const resTest = await fetch("/api/testimonials");
      if (resTest.ok) {
        const data = await resTest.json();
        setTestimonialsCount(data.length);
      }
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminStats();
    }
  }, [isAdminLoggedIn, adminToken]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setAdminToken(data.token);
        setIsAdminLoggedIn(true);
      } else {
        const errorData = await res.json();
        setLoginError(errorData.error || "Fail to authenticate.");
      }
    } catch (err) {
      setLoginError("Offline server error.");
    }
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
      setAdminToken("");
      setIsAdminLoggedIn(false);
    }
  };

  // Change Lead Status
  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAdminStats();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        fetchAdminStats();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Submit Projects
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMsg("");
    
    const payload = {
      title: projTitle,
      category: projCategory,
      location: projLocation,
      clientName: projClient,
      description: projDesc,
      challenge: projChallenge,
      solution: projSolution,
      duration: projDuration || "6 Months",
      costEstimate: projCost || "$200,000",
      completedYear: projYear || "2026",
      beforeImage: projBeforeImg || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      afterImage: projAfterImg || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      materialsUsed: projMaterials.split(",").map(m => m.trim()).filter(m => m !== ""),
      clientReview: {
        reviewerName: projReviewer || projClient,
        role: projReviewRole || "Homeowner",
        comment: projReviewComment || "Spectacular project execution.",
        rating: Number(projReviewRating),
        date: new Date().toISOString().split("T")[0]
      },
      galleryImages: [
        projAfterImg || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
      ],
      timeline: [
        { "step": "Phase 1: Planning", "detail": "Spatial drafting and architectural blueprints locking." },
        { "step": "Phase 2: Fabrication", "detail": "Welding iron skeletons and custom panel anodization." },
        { "step": "Phase 3: Fitting", "detail": "Heavy glass vacuum fittings and on-site trim moldings." }
      ]
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFormSuccessMsg("Project saved to the portfolio.");
        // Reset fields
        setProjTitle("");
        setProjLocation("");
        setProjClient("");
        setProjDesc("");
        setProjChallenge("");
        setProjSolution("");
        setProjMaterials("");
        setProjReviewer("");
        setProjReviewComment("");
        fetchAdminStats();
        if (onProjectsChanged) onProjectsChanged();
      }
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  // Submit test
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMsg("");
    
    const payload = {
      name: testName,
      role: testRole,
      company: testCompany,
      comment: testComment,
      rating: Number(testRating),
      avatarUrl: testAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      isFeatured: true
    };

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormSuccessMsg("Testimonial posted successfully!");
        setTestName("");
        setTestRole("");
        setTestCompany("");
        setTestComment("");
        fetchAdminStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Blog
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMsg("");

    const payload = {
      title: blogTitle,
      slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: blogSummary,
      content: blogContent,
      category: blogCategory,
      author: blogAuthor,
      imageUrl: blogImg || "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800",
      readTime: blogTime,
      tags: blogTags.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormSuccessMsg("Journal story published.");
        setBlogTitle("");
        setBlogSummary("");
        setBlogContent("");
        setBlogTags("");
        fetchAdminStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Logged-out administrative portal
  if (!isAdminLoggedIn) {
    return (
      <section className="min-h-screen bg-[#080808] pt-32 pb-24 flex items-center justify-center font-sans">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative bg-[#0d0d0d] border border-white/5 p-8 rounded-none w-full max-w-md shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-none flex items-center justify-center mx-auto mb-4 rotate-45">
              <Terminal className="w-5 h-5 text-accent -rotate-45" />
            </div>
            <h2 className="text-white text-xs font-heading tracking-widest uppercase">
              Admin Portal Access
            </h2>
            <p className="text-white/40 text-[9px] uppercase tracking-widest block mt-1">
              Protected content management area
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none font-sans focus:border-accent hover:border-white/10 transition-colors"
                placeholder="e.g. admin"
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none font-mono focus:border-accent hover:border-white/10 transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs font-mono text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 shadow-md cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#080808] pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Statistics Header segment */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-white/5 pb-8 mb-8">
          <div>
            <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
              {COMPANY.name} High-Spec System
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1 uppercase font-sans">
              Admin CMS Panel
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-4 py-2 bg-transparent border border-white/10 hover:border-red-400 text-[10px] font-heading tracking-wider uppercase text-red-400 rounded-none cursor-pointer flex items-center justify-center space-x-2 w-fit transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Dynamic statistics overview cards block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none relative">
            <span className="text-[#E5E5E5]/30 text-[9px] font-heading tracking-widest uppercase block mb-1">Incoming Inquiries</span>
            <div className="flex items-center justify-between text-white font-bold mt-2">
              <span className="text-2xl font-sans font-light text-accent">{leads.length}</span>
              <Mail className="w-4 h-4 text-accent/40" />
            </div>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none relative">
            <span className="text-[#E5E5E5]/30 text-[9px] font-heading tracking-widest uppercase block mb-1">Portfolio Projects</span>
            <div className="flex items-center justify-between text-white font-bold mt-2">
              <span className="text-2xl font-sans font-light text-accent">{projectsCount}</span>
              <Layers className="w-4 h-4 text-accent/40" />
            </div>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none relative">
            <span className="text-[#E5E5E5]/30 text-[9px] font-heading tracking-widest uppercase block mb-1">Literature Stories</span>
            <div className="flex items-center justify-between text-white font-bold mt-2">
              <span className="text-2xl font-sans font-light text-accent">{blogsCount}</span>
              <FileText className="w-4 h-4 text-accent/40" />
            </div>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none relative">
            <span className="text-[#E5E5E5]/30 text-[9px] font-heading tracking-widest uppercase block mb-1">Verified Feedbacks</span>
            <div className="flex items-center justify-between text-white font-bold mt-2">
              <span className="text-2xl font-sans font-light text-accent">{testimonialsCount}</span>
              <Star className="w-4 h-4 text-accent/40" />
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sub menu controls */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "leads", label: "Leads Inquiries Pipeline" },
              { id: "add-project", label: "Insert Project Landmark" },
              { id: "add-blog", label: "Publish Journal Block" },
              { id: "add-testimonial", label: "Verify Client Feedback" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubView(tab.id as any);
                  setFormSuccessMsg("");
                }}
                className={`w-full py-3.5 px-4 text-left font-heading text-[10px] uppercase tracking-widest rounded-none cursor-pointer transition-all border ${
                  activeSubView === tab.id
                    ? "bg-accent text-black font-semibold border-accent shadow-sm"
                    : "bg-[#0d0d0d] text-[#E5E5E5]/50 border-white/5 hover:border-accent hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active view detail render */}
          <div className="lg:col-span-9 bg-[#0d0d0d] border border-white/5 p-6 sm:p-8 rounded-none min-h-[400px]">
            {formSuccessMsg && (
              <div className="bg-accent/10 border border-accent text-accent p-4 rounded-none mb-6 text-[11px] font-mono uppercase tracking-widest">
                {formSuccessMsg}
              </div>
            )}

            {/* Leads inquiries tab view */}
            {activeSubView === "leads" && (
              <div>
                <h3 className="text-white text-xs font-heading uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                  Leads Inquiries Incoming Matrix
                </h3>

                {leads.length === 0 ? (
                  <div className="py-16 text-center">
                    <span className="text-white/40 font-heading text-[10px] uppercase block tracking-widest">No active inquiries in the repository.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="bg-[#080808] border border-white/5 p-6 rounded-none relative"
                      >
                        {/* Status badge & delete */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div>
                            <span className="text-xs font-heading font-medium text-white block uppercase tracking-wider">{lead.name}</span>
                            <span className="text-[10px] text-white/40 block font-mono mt-1">{lead.email} / {lead.phone}</span>
                          </div>

                          <div className="flex items-center space-x-3 w-full sm:w-auto self-end">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className="bg-black text-[9px] font-heading uppercase tracking-widest text-accent border border-white/5 p-2 rounded-none outline-none focus:border-accent"
                            >
                              <option value="new">New Inquiry</option>
                              <option value="contacted">Contacted</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="completed">Completed</option>
                            </select>
                            
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-[#E5E5E5]/30 hover:text-red-400 p-2 border border-white/5 hover:border-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Content text */}
                        <div className="space-y-3.5 text-xs text-[#E5E5E5]/70">
                          <div>
                            <strong className="text-[#E5E5E5]/40 font-heading uppercase tracking-widest text-[9px] block mb-1">Aesthetic Interest Focus:</strong>
                            <span className="text-white font-mono bg-black border border-white/5 py-1 px-2.5 rounded-none antialiased">{lead.serviceInterested}</span>
                          </div>
                          <div>
                            <strong className="text-[#E5E5E5]/40 font-heading uppercase tracking-widest text-[9px] block mb-1">Financial Bracket:</strong>
                            <span className="text-accent font-sans text-xs font-light">{lead.budget}</span>
                          </div>
                          <div className="bg-black border border-white/5 p-4 rounded-none">
                            <strong className="text-[#E5E5E5]/40 font-heading uppercase tracking-widest text-[9px] block mb-1">Custom Specs / Mandates:</strong>
                            <p className="text-white/80 font-sans font-light leading-relaxed">
                              {lead.description || "No project message entered."}
                            </p>
                          </div>
                        </div>

                        {/* Timestamp footer code */}
                        <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-[#E5E5E5]/30 font-mono text-right uppercase tracking-widest">
                          Logged: {new Date(lead.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Save Project Landmark */}
            {activeSubView === "add-project" && (
              <form onSubmit={handleAddProject} className="space-y-6">
                <h3 className="text-white text-xs font-heading uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                  Add Completed Project Landmark
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Project High Title Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Format Category</label>
                    <select
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none font-heading tracking-wider focus:border-accent focus:border-opacity-50"
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                    >
                      <option>Home Interior Design</option>
                      <option>Office Interior</option>
                      <option>Bank & ATM Interior</option>
                      <option>Heavy Steel Fabrication</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Location Site / City</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. Zurich, Switzerland"
                      value={projLocation}
                      onChange={(e) => setProjLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Client Reference Persona</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={projClient}
                      onChange={(e) => setProjClient(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Completed Year</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. 2026"
                      value={projYear}
                      onChange={(e) => setProjYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Before State Image URL</label>
                    <input
                      type="url"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={projBeforeImg}
                      onChange={(e) => setProjBeforeImg(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Finished State Image URL</label>
                    <input
                      type="url"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={projAfterImg}
                      onChange={(e) => setProjAfterImg(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Design Project Essence</label>
                  <textarea
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                    rows={4}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">The Structural Challenge</label>
                    <textarea
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                      rows={2}
                      value={projChallenge}
                      onChange={(e) => setProjChallenge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">The Engineering Solution</label>
                    <textarea
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                      rows={2}
                      value={projSolution}
                      onChange={(e) => setProjSolution(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Project Duration Schedule</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. 8 Months"
                      value={projDuration}
                      onChange={(e) => setProjDuration(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Cost Estimate Detail</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. $400,000"
                      value={projCost}
                      onChange={(e) => setProjCost(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Curated Materials Used (Comma split)</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. Brass, Red Oak, Tempered Glass"
                      value={projMaterials}
                      onChange={(e) => setProjMaterials(e.target.value)}
                    />
                  </div>
                </div>

                {/* Secure review specs */}
                <div className="bg-[#080808] border border-white/5 p-5 rounded-none space-y-4">
                  <h4 className="text-white text-[10px] font-heading uppercase tracking-widest border-b border-white/5 pb-2 font-semibold">Client Review Integration</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1 font-medium">Reviewer Persona Name</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/5 text-white text-xs p-2.5 rounded-none outline-none focus:border-accent"
                        value={projReviewer}
                        onChange={(e) => setProjReviewer(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1 font-medium">Association Role</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/5 text-white text-xs p-2.5 rounded-none outline-none focus:border-accent"
                        value={projReviewRole}
                        onChange={(e) => setProjReviewRole(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1 font-medium">Star Feedback (1-5)</label>
                      <select
                        className="w-full bg-black border border-white/5 text-white text-xs p-2.5 rounded-none outline-none focus:border-accent font-heading"
                        value={projReviewRating}
                        onChange={(e) => setProjReviewRating(Number(e.target.value))}
                      >
                        <option value={5}>5 Stars - Perfection</option>
                        <option value={4}>4 Stars - High Spec</option>
                        <option value={3}>3 Stars - Standard</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-1 font-medium">Detailed Testimonial Comment</label>
                    <textarea
                      className="w-full bg-black border border-white/5 text-white text-xs p-2.5 rounded-none outline-none focus:border-accent resize-none font-sans font-light"
                      rows={2}
                      value={projReviewComment}
                      onChange={(e) => setProjReviewComment(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 shadow-md cursor-pointer"
                >
                  Confirm and Write Landmark Portfolio
                </button>
              </form>
            )}

            {/* Save Journal story blogs */}
            {activeSubView === "add-blog" && (
              <form onSubmit={handleAddBlog} className="space-y-6">
                <h3 className="text-white text-xs font-heading uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                  Publish Journal Story Block
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Story Title</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Genre Category</label>
                    <select
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none font-heading tracking-wider focus:border-accent"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                    >
                      <option>Design Trends</option>
                      <option>Fabrication Engineering</option>
                      <option>Project Showcases</option>
                      <option>Company News</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Author Persona</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Read Time Estimate</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={blogTime}
                      placeholder="e.g. 5 min read"
                      onChange={(e) => setBlogTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Tags (Comma split)</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={blogTags}
                      placeholder="e.g. Modern, Iron, Heavy"
                      onChange={(e) => setBlogTags(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Cover Image CDN URL</label>
                  <input
                    type="url"
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                    value={blogImg}
                    placeholder="https://images.unsplash.com/..."
                    onChange={(e) => setBlogImg(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Summary Abstract</label>
                  <textarea
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                    rows={2}
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Story Content Body (Markdown supported)</label>
                  <textarea
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                    rows={6}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 shadow-md cursor-pointer"
                >
                  Publish Story Block
                </button>

              </form>
            )}

            {/* Add Testimonial */}
            {activeSubView === "add-testimonial" && (
              <form onSubmit={handleAddTestimonial} className="space-y-6">
                <h3 className="text-white text-xs font-heading uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                  Verify Client Feedback Reference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Author Name Reference</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Role Designation</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. Managing Partner"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Company Name / Association</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                      placeholder="e.g. Roy Estates Ltd."
                      value={testCompany}
                      onChange={(e) => setTestCompany(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Feedback Star Rating (1-5)</label>
                    <select
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none font-heading tracking-wider focus:border-accent"
                      value={testRating}
                      onChange={(e) => setTestRating(Number(e.target.value))}
                    >
                      <option value={5}>5 Stars - Extreme Perfection</option>
                      <option value={4}>4 Stars - Exceptional Layout</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Avatar Image CDN URL</label>
                  <input
                    type="url"
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors"
                    value={testAvatar}
                    onChange={(e) => setTestAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest block mb-1.5 font-medium">Author Review Comments</label>
                  <textarea
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent hover:border-white/10 font-sans font-light transition-colors resize-none"
                    rows={4}
                    value={testComment}
                    onChange={(e) => setTestComment(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase rounded-none transition-all duration-300 shadow-md cursor-pointer"
                >
                  Publish Testimonial
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
