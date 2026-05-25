import React, { useState } from "react";
import { 
  Mail, Phone, MessageSquare, Send, CheckCircle2, 
  MapPin, Sparkles
} from "lucide-react";
import { COMPANY } from "../company";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || COMPANY.whatsappNumber;

interface ContactFormProps {
  preselectedService?: string;
  onLeadSubmitted?: () => void;
}

export default function ContactForm({ preselectedService = "Luxury Residential Suite", onLeadSubmitted }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService);
  const [budget, setBudget] = useState("$150,000 - $300,000 (Artisanal Custom)");
  const [description, setDescription] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Synchronize selector if prop is altered
  React.useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent, method: "api" | "whatsapp") => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please provide your name, email, and phone number.");
      return;
    }
    if (method === "whatsapp" && !WHATSAPP_NUMBER) {
      alert("WhatsApp contact is not configured yet. Please submit the enquiry form instead.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Write lead dynamically to fullstack Express backend DB!
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          serviceInterested: service,
          budget,
          description
        })
      });

      if (res.ok) {
        setSuccess(true);
        if (onLeadSubmitted) onLeadSubmitted();

        // 2. If client requests WhatsApp, open a pre-formatted redirect link
        if (method === "whatsapp") {
          const txt = `*${COMPANY.name} Consultation Request*\n\n` +
            `- *Name*: ${name}\n` +
            `- *Email*: ${email}\n` +
            `- *Phone*: ${phone}\n` +
            `- *Service Interested*: ${service}\n` +
            `- *Budget Class*: ${budget}\n` +
            `- *Description*: ${description || "No project notes entered."}`;
          
          const encoded = encodeURIComponent(txt);
          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
          window.open(url, "_blank", "noopener,noreferrer");
        }

        // Reset fields
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
      } else {
        throw new Error("Lead capture failed");
      }
    } catch (err) {
      console.error(err);
      alert("We could not submit your enquiry. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#080808] py-24 border-t border-white/5 font-sans relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="relative text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-heading tracking-[0.4em] text-accent uppercase font-semibold block mb-2">
            Start Your Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 uppercase font-sans">
            Book a Consultation
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
          <p className="text-white/50 text-xs mt-6 font-light leading-relaxed">
            Tell us what you want to build, renovate, or fabricate. Our design team will review the brief and respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Studio Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-none space-y-6">
              <h3 className="text-white text-[10px] font-heading uppercase tracking-widest mb-4 border-b border-white/5 pb-3">
                Studio Contact
              </h3>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest">Owner</h4>
                    <p className="text-[#E5E5E5]/75 text-xs leading-relaxed mt-1 font-sans font-light">
                      {COMPANY.owner}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest">Office Location</h4>
                    <p className="text-[#E5E5E5]/75 text-xs leading-relaxed mt-1 font-sans font-light">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest">Email</h4>
                    <p className="text-[#E5E5E5]/75 text-xs mt-1 font-light">{COMPANY.email}</p>
                    <p className="text-[#E5E5E5]/30 text-[9px] uppercase font-mono mt-0.5">For commercial tenders & layout plans</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#E5E5E5]/40 text-[9px] font-heading uppercase tracking-widest">Phone</h4>
                    <p className="text-[#E5E5E5]/75 text-xs mt-1 font-light font-mono">{COMPANY.phoneDisplay}</p>
                    <p className="text-[#E5E5E5]/30 text-[9px] uppercase font-mono mt-0.5">Mon-Fri 09:00 - 18:00 IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QA Guidelines */}
            <div className="bg-[#0c0c0c] border border-white/5 border-dashed p-6 rounded-none">
              <h4 className="text-white text-[10px] font-heading uppercase tracking-widest mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span>Quality Assurance</span>
              </h4>
              <p className="text-white/50 text-[11px] leading-relaxed font-sans font-light">
                Every project is reviewed for measurements, material fit, installation sequence, and finish quality before final handover.
              </p>
            </div>
          </div>

          {/* Form console */}
          <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/5 p-8 rounded-none">
            {success ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-none flex items-center justify-center mx-auto rotate-45">
                  <CheckCircle2 className="w-7 h-7 text-accent -rotate-45" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-sm font-heading uppercase tracking-widest">
                    Enquiry Received
                  </h3>
                  <p className="text-white/60 text-xs max-w-sm mx-auto mt-2 leading-relaxed font-sans font-light">
                    Your project enquiry has been logged. Our team will review the details and respond within one business day.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 border border-white/10 hover:border-accent text-white hover:text-black hover:bg-accent text-[9px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
                >
                  New Submission
                </button>
              </div>
            ) : (
              <form className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent font-sans hover:border-white/15 transition-colors font-light"
                      placeholder="e.g. Elena Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent font-sans hover:border-white/15 transition-colors font-light"
                      placeholder="e.g. elena@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent font-mono hover:border-white/15 transition-colors font-light"
                      placeholder="e.g. +91 98300 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                      Service Interest
                    </label>
                    <select
                      className="w-full bg-[#080808] border border-white/5 text-white hover:border-white/15 text-xs p-3.5 rounded-none outline-none font-heading tracking-wider focus:border-accent transition-colors"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option>Home Interior Design</option>
                      <option>Luxury Interior Design</option>
                      <option>Office Interior</option>
                      <option>Bank & ATM Interior</option>
                      <option>Salon & Parlor Interior</option>
                      <option>Steel & Iron Fabrication</option>
                      <option>Gates & Railings</option>
                      <option>Glass & Aluminum works</option>
                    </select>
                  </div>
                </div>

                {/* Secure Budget selection checkboxes */}
                <div>
                  <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                    Estimated Budget
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-heading text-[10px] tracking-wider">
                    {[
                      "$50,000 - $100,000 (Premium Select)",
                      "$150,000 - $300,000 (Artisanal Custom)",
                      "$300,000 - $500,000 (Luxury Custom)",
                      "$1,000,000+ (Large-Scale Signature Project)"
                    ].map((bVal) => (
                      <button
                        key={bVal}
                        type="button"
                        onClick={() => setBudget(bVal)}
                        className={`py-3.5 px-4 border text-left rounded-none transition-all cursor-pointer ${
                          budget === bVal
                            ? "bg-accent/10 text-accent border-accent font-medium"
                            : "bg-[#080808] text-white/40 border-white/5 hover:border-accent/40"
                        }`}
                      >
                        {bVal}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[9px] font-heading uppercase tracking-widest block mb-2">
                    Project Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#080808] border border-white/5 text-white text-xs p-3.5 rounded-none outline-none focus:border-accent font-sans hover:border-white/15 transition-colors resize-none font-light"
                    placeholder="Share room size, material preferences, site constraints, timeline, or fabrication requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Two submission paths: API lead capture and optional WhatsApp handoff. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "api")}
                    disabled={isSubmitting}
                    className="py-4 bg-[#080808] border border-white/10 hover:border-accent hover:bg-white/5 text-white text-[10px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-accent" />
                    <span>Submit Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "whatsapp")}
                    disabled={isSubmitting}
                    className="group py-4 bg-transparent border border-accent hover:bg-accent text-white hover:text-black hover:border-accent text-[10px] font-heading tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-accent group-hover:text-black" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
