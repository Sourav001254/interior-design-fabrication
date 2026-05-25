import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4010);
const isProduction = process.env.NODE_ENV === "production";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (isProduction ? "" : "change-me-admin-password");
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const activeAdminTokens = new Set<string>();

app.use(express.json());

// Path to data file
const dataPath = path.join(process.cwd(), "server_data.json");

// Helper to read database
function readDb() {
  try {
    if (fs.existsSync(dataPath)) {
      const content = fs.readFileSync(dataPath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading database file:", err);
  }
  return { projects: [], blogs: [], testimonials: [], leads: [] };
}

// Helper to write database
function writeDb(data: any) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token || !activeAdminTokens.has(token)) {
    return res.status(403).json({ error: "Unauthorized access." });
  }
  next();
}

function cleanText(value: unknown, maxLength = 800) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanTextList(value: unknown, maxItems = 12, maxLength = 120) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function cleanRating(value: unknown) {
  const rating = Number(value);
  return Number.isFinite(rating) ? Math.min(5, Math.max(1, Math.round(rating))) : 5;
}

function cleanUrl(value: unknown, fallback: string) {
  const url = cleanText(value, 500);
  if (!url) return fallback;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : fallback;
  } catch {
    return fallback;
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Make sure DB exists on startup
const currentDb = readDb();
if (!currentDb.leads) {
  currentDb.leads = [];
  writeDb(currentDb);
}

// ==========================================
// GEMINI AI ARCHITECT CO-PILOT INITIALIZATION
// ==========================================
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini AI Client initialized successfully for Co-pilot services.");
  } catch (error) {
    console.error("Failed to initialize Gemini AI SDK:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined in the environment. AI Co-pilot running in simulated mode.");
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Auth Login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, error: "Admin login is not configured." });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    activeAdminTokens.add(token);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, error: "Invalid admin credentials." });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (token) activeAdminTokens.delete(token);
  res.json({ success: true });
});

// GET Projects
app.get("/api/projects", (req, res) => {
  const db = readDb();
  res.json(db.projects || []);
});

// POST Project
app.post("/api/projects", requireAdmin, (req, res) => {
  const db = readDb();
  const title = cleanText(req.body.title, 180);
  const description = cleanText(req.body.description, 1800);
  const category = cleanText(req.body.category, 120) || "Home Interior Design";

  if (!title || !description) {
    return res.status(400).json({ error: "Project title and description are required." });
  }

  const newProject = {
    id: "proj_" + Date.now(),
    title,
    category,
    location: cleanText(req.body.location, 160),
    clientName: cleanText(req.body.clientName, 160),
    description,
    challenge: cleanText(req.body.challenge, 1200),
    solution: cleanText(req.body.solution, 1200),
    duration: cleanText(req.body.duration, 80) || "6 Months",
    costEstimate: cleanText(req.body.costEstimate, 80) || "Upon consultation",
    completedYear: cleanText(req.body.completedYear, 20) || String(new Date().getFullYear()),
    beforeImage: cleanUrl(req.body.beforeImage, "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"),
    afterImage: cleanUrl(req.body.afterImage, "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"),
    materialsUsed: cleanTextList(req.body.materialsUsed),
    clientReview: {
      reviewerName: cleanText(req.body.clientReview?.reviewerName, 160) || cleanText(req.body.clientName, 160) || "Client",
      role: cleanText(req.body.clientReview?.role, 160) || "Project Client",
      comment: cleanText(req.body.clientReview?.comment, 1000) || "Professional execution and strong finish quality.",
      rating: cleanRating(req.body.clientReview?.rating),
      date: new Date().toISOString().split("T")[0],
    },
    galleryImages: cleanTextList(req.body.galleryImages, 8, 500).filter((url) => cleanUrl(url, "") === url),
    timeline: Array.isArray(req.body.timeline)
      ? req.body.timeline.slice(0, 6).map((item: any) => ({
          step: cleanText(item?.step, 140),
          detail: cleanText(item?.detail, 500),
        })).filter((item: any) => item.step && item.detail)
      : [],
  };
  if (newProject.galleryImages.length === 0) newProject.galleryImages = [newProject.afterImage];
  db.projects.push(newProject);
  if (!writeDb(db)) return res.status(500).json({ error: "Could not save project." });
  res.status(201).json(newProject);
});

// UPDATE Project
app.put("/api/projects/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.projects.findIndex((p: any) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  db.projects[index] = { ...db.projects[index], ...req.body };
  writeDb(db);
  res.json(db.projects[index]);
});

// DELETE Project
app.delete("/api/projects/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const filtered = db.projects.filter((p: any) => p.id !== id);
  db.projects = filtered;
  writeDb(db);
  res.json({ success: true, message: "Project deleted successfully" });
});

// GET Blogs
app.get("/api/blogs", (req, res) => {
  const db = readDb();
  res.json(db.blogs || []);
});

// POST Blog
app.post("/api/blogs", requireAdmin, (req, res) => {
  const db = readDb();
  const title = cleanText(req.body.title, 180);
  const content = cleanText(req.body.content, 8000);
  if (!title || !content) {
    return res.status(400).json({ error: "Blog title and content are required." });
  }

  const newBlog = {
    id: "blog_" + Date.now(),
    publishedAt: new Date().toISOString().split("T")[0],
    title,
    slug: cleanText(req.body.slug, 220) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    summary: cleanText(req.body.summary, 400),
    content,
    category: cleanText(req.body.category, 120) || "Design Trends",
    author: cleanText(req.body.author, 120) || "DIMENSION & CO Studio",
    imageUrl: cleanUrl(req.body.imageUrl, "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800"),
    readTime: cleanText(req.body.readTime, 40) || "5 min read",
    tags: cleanTextList(req.body.tags, 8, 40),
  };
  db.blogs.push(newBlog);
  if (!writeDb(db)) return res.status(500).json({ error: "Could not save blog." });
  res.status(201).json(newBlog);
});

// DELETE Blog
app.delete("/api/blogs/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.blogs = db.blogs.filter((b: any) => b.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// GET Testimonials
app.get("/api/testimonials", (req, res) => {
  const db = readDb();
  res.json(db.testimonials || []);
});

// POST Testimonial
app.post("/api/testimonials", requireAdmin, (req, res) => {
  const db = readDb();
  const name = cleanText(req.body.name, 160);
  const comment = cleanText(req.body.comment, 1000);
  if (!name || !comment) {
    return res.status(400).json({ error: "Testimonial name and comment are required." });
  }

  const newTestimonial = {
    id: "test_" + Date.now(),
    name,
    role: cleanText(req.body.role, 160),
    company: cleanText(req.body.company, 160),
    comment,
    rating: cleanRating(req.body.rating),
    avatarUrl: cleanUrl(req.body.avatarUrl, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"),
    isFeatured: Boolean(req.body.isFeatured ?? true),
  };
  db.testimonials.push(newTestimonial);
  if (!writeDb(db)) return res.status(500).json({ error: "Could not save testimonial." });
  res.status(201).json(newTestimonial);
});

// DELETE Testimonial
app.delete("/api/testimonials/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.testimonials = db.testimonials.filter((t: any) => t.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// GET Leads (Admin secure)
app.get("/api/leads", requireAdmin, (req, res) => {
  const db = readDb();
  res.json(db.leads || []);
});

// POST Submit Lead
app.post("/api/leads", (req, res) => {
  const name = cleanText(req.body.name, 120);
  const email = cleanText(req.body.email, 180).toLowerCase();
  const phone = cleanText(req.body.phone, 40);
  const serviceInterested = cleanText(req.body.serviceInterested, 140);
  const budget = cleanText(req.body.budget, 120);
  const description = cleanText(req.body.description, 1500);

  if (!name || !email || !phone || !isEmail(email)) {
    return res.status(400).json({ error: "A valid name, email, and phone number are required." });
  }

  const db = readDb();
  const newLead = {
    id: "lead_" + Date.now(),
    name,
    email,
    phone,
    serviceInterested,
    budget,
    description,
    status: "new",
    submittedAt: new Date().toISOString(),
  };
  if (!db.leads) db.leads = [];
  db.leads.unshift(newLead);
  writeDb(db);
  res.status(201).json({ success: true, lead: newLead });
});

// UPDATE Lead Status
app.put("/api/leads/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowedStatuses = new Set(["new", "contacted", "scheduled", "completed"]);
  if (!allowedStatuses.has(status)) {
    return res.status(400).json({ error: "Invalid lead status." });
  }
  const db = readDb();
  const index = db.leads.findIndex((l: any) => l.id === id);
  if (index === -1) return res.status(404).json({ error: "Lead not found" });

  db.leads[index].status = status;
  writeDb(db);
  res.json(db.leads[index]);
});

// DELETE Lead
app.delete("/api/leads/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.leads = db.leads.filter((l: any) => l.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// ==========================================
// GEMINI INTELLIGENT AI DESIGN CO-PILOT ROUTE
// ==========================================
app.post("/api/gemini/copilot", async (req, res) => {
  const { serviceType, stylePreference, scaleScope, estimatedBudget, extraDetails } = req.body;

  if (!serviceType) {
    return res.status(400).json({ error: "serviceType is required for design co-piloting." });
  }

  const systemInstruction = `You are the lead AI spatial architect and metal fabrication director for a prestigious global luxury design firm. 
Your tone is deeply professional, artistic, confident, and highly design-fluent. 
You will respond with absolute, tailored design schemes, material matching, step-by-step structural workflows, and a custom architectural estimate. 
Do not use conversational fluff. Provide a highly detailed, professional analysis.
You MUST respond with a strictly formatted JSON object matching the requested schema.`;

  const prompt = `Formulate a comprehensive design strategy and fabrication roadmap for this high-end project:
- Service Type & Function: ${serviceType}
- Desired Style Preference: ${stylePreference || "Modern Cinematic Minimalist with Gold Accentuation"}
- Scale and Scope: ${scaleScope || "Premium Residential/Commercial Space"}
- Target Budget: ${estimatedBudget || "High-End Luxury Level"}
- Hand-entered specifics: ${extraDetails || "Focus on pristine textures, heavy metal highlights, and beautiful glass panes."}

Respond ONLY as a structured JSON object. Include:
1. "style": A beautiful curated artistic name of the designed style (e.g. 'Aura-Chamber Metallic Minimalist', 'Noir-Industrial Glass Atrium').
2. "materialsSuggested": A list of 4 highly detailed, luxurious materials paired for this project (including specific metals like champagne gold bronze, marine-grade iron, fluted reeded glass, or calacatta stone).
3. "estimatedTimeline": A professional phase-by-phase structural completion estimate (e.g., '12-14 Weeks with 4 Prefabrication Phases').
4. "fabricationInvolvement": Specific description of custom iron, steel, or aluminum work required (e.g., custom security frame gates, automated ACP board arrays, laser-cut spatial railings, or high-tolerance lift glass chambers).
5. "aiCommentary": A paragraph of profound architectural commentary describing the sensory-mood of the space, spatial depth, dynamic shadow interactions, and aesthetic weight.`;

  try {
    if (aiClient) {
      console.log(`Starting Gemini AI Copilot generation using ${GEMINI_MODEL} for: ${serviceType}`);
      const response = await aiClient.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              style: { type: Type.STRING },
              materialsSuggested: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              estimatedTimeline: { type: Type.STRING },
              fabricationInvolvement: { type: Type.STRING },
              aiCommentary: { type: Type.STRING }
            },
            required: ["style", "materialsSuggested", "estimatedTimeline", "fabricationInvolvement", "aiCommentary"]
          }
        }
      });

      const text = response.text;
      if (text) {
        return res.json(JSON.parse(text.trim()));
      }
    }
  } catch (error) {
    console.error("Gemini real generation failed, falling back to local simulation:", error);
  }

  // Local fallback generator (simulated offline copilot)
  console.log("Using local design co-pilot simulation.");
  const localFallbacks: Record<string, any> = {
    default: {
      style: "Monolithic Slate & Champagne Bronze",
      materialsSuggested: [
        "Champagne Anodized Gold Steel Profiles",
        "Hand-scraped Charcoal Matte Slate Stone",
        "Acoustic Fluted Reeded Glass",
        "Satin-finished Structural Iron Columns"
      ],
      estimatedTimeline: "10-12 Weeks (3 weeks fabrication pre-work, 4 weeks fitting, 3 weeks detail work)",
      fabricationInvolvement: "Custom precision laser-cut steel ceiling track adapters and architectural load-bearing gold metal structural dividers.",
      aiCommentary: "This design celebrates depth through shadow. By nesting satin metallics next to brushed matte slate slabs, local shadows feel soft but crisp. Light filters through the acoustic fluted glass, giving a gentle, rhythmic wash of daylight which keeps the interior private yet visually airy and magnificent."
    }
  };

  return res.json(localFallbacks.default);
});

// ==========================================
// REVERSE PROXY / VITE MIDDLEWARE SETUP
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DIMENSION & CO full-stack design server running on URL: http://0.0.0.0:${PORT}`);
  });
}

startServer();
