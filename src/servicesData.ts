import { ServiceItem } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "home-interior",
    name: "Home Interior Design",
    category: "design",
    icon: "Home",
    tagline: "Tailor-made luxury residences crafted for personal narrative.",
    shortDescription: "End-to-end luxury residential interior consulting, bespoke millwork, custom palettes, and elite furnishings.",
    fullDescription: "Our residential philosophy centers on creating spatial experiences that are highly personal and meticulously crafted. We coordinate space-planning, lighting layouts, texture pairing, bespoke wood paneling, and custom loose furniture to establish a home that feels warm, expensive, and exceptionally tailored.",
    process: [
      "Initial Spatial consultation & spatial scanning",
      "AI co-pilot color palette & layout formulation",
      "3D design rendering & fine material select",
      "Custom prefabrication of wood veneer wall paneling",
      "On-site installation & professional white-glove styling"
    ],
    benefits: [
      "10-Year structural wood warranty",
      "High-tolerance laser-guided spatial planning",
      "Direct bespoke factory prefab pricing without mediators",
      "Integrated smart home automation support"
    ],
    faqs: [
      {
        "question": "How long does a full home interior design take?",
        "answer": "Typically 8 to 14 weeks depending on the millwork complexity and spatial coverage."
      },
      {
        "question": "Can I integrate custom antique pieces?",
        "answer": "Yes, we structurally align existing antiques with modern bespoke charcoal or gold accents for a timeless transition."
      }
    ],
    accentColor: "amber-500",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "luxury-interior",
    name: "Luxury Interior Design",
    category: "design",
    icon: "Crown",
    tagline: "High-spec couture spaces combining rare stones & metals.",
    shortDescription: "Ultra-premium interiors featuring bespoke bronze structures, Bookmatched marble slabs, and custom ceiling work.",
    fullDescription: "Reserved for high-end properties, corporate penthouses, and executive lounges. This service brings rare finishes together: titanium-coated brass paneling, leather-stitched doors, backlit translucent quartzite walls, and integrated bespoke structural metal works.",
    process: [
      "Exclusive mood consultation & concept rendering",
      "Rare material sourcing (direct from European quarries & labs)",
      "High-precision metalwork mockup in assembly yard",
      "Architectural installation supervised by master builders",
      "Dynamic lighting calibration (day & evening scenarios)"
    ],
    benefits: [
      "Couture artisan finishes",
      "Exclusive access to rare stone batches",
      "Museum-quality lighting design",
      "Architect-supervised turn-key management"
    ],
    faqs: [
      {
        "question": "What premium materials do you work with?",
        "answer": "Calacatta gold marble, titanium-coated steel plates, fluted reeded crystal glass, and custom hand-stitched saddle leather."
      }
    ],
    accentColor: "yellow-600",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "office-interior",
    name: "Office Interior",
    category: "design",
    icon: "Briefcase",
    tagline: "Productivity meets progressive industrial spatial corporate luxury.",
    shortDescription: "Agile tech hubs, executive offices, and luxury acoustic partition systems for modern corporate setups.",
    fullDescription: "We build state-of-the-art office spaces that improve sound dampening, boost natural daylight distribution, and emphasize clean corporate luxury. Features include integrated wire-management desk structures, acoustic wood panel systems, and automatic sliding screen panels.",
    process: [
      "Corporate workflow & department density analysis",
      "Acoustic and decibel mapping simulations",
      "Modular system and workspace setup layout",
      "Fabrication of custom reception desks & structural iron grids",
      "Rapid weekend installation phases to limit disruption"
    ],
    benefits: [
      "Certified STC-45 acoustic wall systems",
      "Ergonomically tuned seating and lighting",
      "High-wear commercial-grade fabrications",
      "Complete electrical-mechanical network integration"
    ],
    faqs: [
      {
        "question": "Do you handle mechanical & electrical (MEP) work?",
        "answer": "Absolutely. Our engineering division manages all server room air-conditioning, custom wire layouts, and building management interfaces."
      }
    ],
    accentColor: "blue-500",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "bank-atm",
    name: "Bank & ATM Interior",
    category: "specialty",
    icon: "ShieldAlert",
    tagline: "Fortified security concealed behind elegant visual designs.",
    shortDescription: "Ultra-secure vaults, bullet-resistant tellers, cash drawers, and custom interactive security-laminated ATM shells.",
    fullDescription: "A specialized service combining heavy-duty physical security elements: reinforced iron cladding, impact-absorbent bullet-resistant glazing, automatic panic systems, warm luxury metal plating, and custom stone finishing.",
    process: [
      "Security audit & threat matrix coordination",
      "Structural steel framing layout fabrication",
      "Installation of high-tensile armored cores",
      "Pristine satin brass surface finish detailing",
      "Secured diagnostic testing validation"
    ],
    benefits: [
      "Meets UL-752 standard ballistic protection levels",
      "Integrated emergency secure locking locks",
      "Long-durability high-contact surface designs",
      "Custom branded ATM housing fabricated offsite"
    ],
    faqs: [
      {
        "question": "Are your security doors heavy?",
        "answer": "Yes, they contain armored structural steel plates, but are pivoted using heavy-duty self-lubricating industrial ball bearings for silent, effortless physical operation."
      }
    ],
    accentColor: "emerald-600",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "salon-parlor",
    name: "Salon & Parlor Interior",
    category: "design",
    icon: "Sparkles",
    tagline: "Luminous ambient studios styled with rich textures.",
    shortDescription: "Ultra-high luxury styling hubs featuring flawless anti-shadow makeup lights, custom hair washing structural modules, and marble countertops.",
    fullDescription: "Salon design relies on beautiful lighting and space separation. We handle custom mirror framing utilizing sandblasted metallic brass alloys, high-durability acrylic stone countertops resistant to intense hair solutions, and quiet acoustic styling pods.",
    process: [
      "Anti-glare shadowless light engineering setup",
      "Plumbing & water network manifold coordination",
      "Bespoke manufacturing of brass cabinetry trims",
      "On-site fitting of full mirrors and stations",
      "Air ventilation filtration setup (chemical odor removal)"
    ],
    benefits: [
      "95+ CRI true-color illumination layouts",
      "Chemical-stain proof hard-surface counter shields",
      "Built-in hot/cold heavy plumbing channels",
      "Lounge-level acoustics and luxury comfort"
    ],
    faqs: [
      {
        "question": "Can you design custom styling shampoo modules with built-in drainage?",
        "answer": "Yes, we prefab custom aluminum-framed sinks that conceal standard drain tubes behind premium removable metal screens."
      }
    ],
    accentColor: "rose-500",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "steel-iron-fab",
    name: "Steel & Iron Fabrication",
    category: "fabrication",
    icon: "Hammer",
    tagline: "Heavy-tolerance precision fabrication engineered to survive generations.",
    shortDescription: "Heavy load beams, custom support skeletons, decorative iron elements, and robust high-spec architectural frameworks.",
    fullDescription: "We operate a high-tech in-house fabrication plant. From structural steel beams mapping layout expansions to hand-welded wrought iron frames, we execute high-tolerance welding with beautiful custom powder coatings and corrosion-resistant seals.",
    process: [
      "AutoCAD / SolidWorks stress simulation drafting",
      "MIG/TIG welding by qualified fabricators",
      "Anti-rust zinc primer hot immersion coating",
      "Electrostatic metallic powder-bake painting",
      "Rigid site anchoring using heavy-duty masonry anchors"
    ],
    benefits: [
      "High-tensile premium quality structural steel",
      "Complete weather-resistance sandblasted primers",
      "Engineered load-rated fabrication blueprints",
      "Seismic and wind-load calculations included"
    ],
    faqs: [
      {
        "question": "Do you do custom site-welding?",
        "answer": "Yes, we dispatch certified welding trucks equipped with high-yield portable generators for flawless site joints."
      }
    ],
    accentColor: "zinc-400",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "gates-railings",
    name: "Gates & Railings",
    category: "fabrication",
    icon: "KeyRound",
    tagline: "Sculptural security framing luxury boundaries.",
    shortDescription: "Laser-cut automatic cantilever steel gates, luxury gold-finished balustrades, and minimalist handrails.",
    fullDescription: "First impressions begin at the gates. We fabricate structural grand entry gates fitted with silent smart-hydraulic automation, and luxury safety railings for interior staircases utilizing brass-pinned double glass templates.",
    process: [
      "Architectural matching & design sketching",
      "CNC precision laser cutting of heavy sheet steel",
      "Hand-finished micro-sanding of joints and corners",
      "Smart motor or hydraulic actuator fitting",
      "Heavy load anchorage into reinforced concrete columns"
    ],
    benefits: [
      "Heavy structural stability against forced entry",
      "Slick silent brushless motor integrations",
      "Zero-warp thermal steel alloy standards",
      "Intricate customized design screens"
    ],
    faqs: [
      {
        "question": "Can your gates be controlled by a smartphone app?",
        "answer": "Yes, we configure advanced smart security setups with remote mobile control and custom PIN panel entry systems."
      }
    ],
    accentColor: "orange-600",
    imageUrl: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=850"
  },
  {
    id: "glass-aluminum",
    name: "Glass & Aluminum works",
    category: "fabrication",
    icon: "Layers",
    tagline: "Breathtaking structural transparency and lightweight engineering.",
    shortDescription: "Slim-line aluminum window systems, structural glass floors, canopies, and architectural curtain walls.",
    fullDescription: "We fabricate custom slim-profile aluminum doors and windows featuring thermal-break technology for temperature isolation, high-load overhead glass canopies, and exquisite fluted-glass partition systems inside minimalist structural framing.",
    process: [
      "Thermal expansion & wind-force modeling",
      "Extruded slimline frame assembly and gasket fitting",
      "Pre-tempered double-glazing vacuum compression",
      "Lobe joint anchor setup on site",
      "Waterproofing testing using direct-hose sprays"
    ],
    benefits: [
      "Thermal-break design saves up to 30% on AC cooling",
      "Anodized weather-resistance resists ocean corrosion",
      "Ultra-thin profiles minimize border visual noise",
      "High-impact safety-tempered glass"
    ],
    faqs: [
      {
        "question": "What is custom fluted glass?",
        "answer": "It is reeded glass with customized wave-like profiles, scattering natural light beautifully while providing strong personal visual privacy."
      }
    ],
    accentColor: "cyan-500",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=850"
  }
];
