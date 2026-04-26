import { PortfolioNiche, FeatureBlock, PricingPlan, Testimonial } from "./types";

export const PORTFOLIO_NICHES: PortfolioNiche[] = [
  {
    id: "skincare-ugc",
    title: "UGC Skin Care Testimonials",
    category: "Authentic UGC Reviews That Build Trust",
    description: "Real people, real results. Testimonial videos designed to convert skeptics into customers.",
    thumbnailUrl: "https://selfish-orange-q69cnxpywy.edgeone.app/skin%20beauty.png",
    videos: [
      { id: "s1", title: "Serum Texture Shot", coverUrl: "https://picsum.photos/seed/serum-1/400/711", videoUrl: "https://youtube.com/shorts/vdfpEaIKPJE" },
      { id: "s2", title: "Vitamin C Glow", coverUrl: "https://picsum.photos/seed/serum-2/400/711", videoUrl: "https://youtube.com/shorts/iva4Rs1k2ME" },
      { id: "s3", title: "Before & After Oil", coverUrl: "https://picsum.photos/seed/serum-3/400/711", videoUrl: "https://youtube.com/shorts/SOlfTi_BV8o" },
      { id: "s4", title: "Serum Application", coverUrl: "https://picsum.photos/seed/serum-4/400/711", videoUrl: "https://youtube.com/shorts/Ni_8PfIgMkU" },
    ]
  },
  {
    id: "skincare-cinematic",
    title: "Cinematic Skin Care Ads",
    category: "Luxury Cinematic Product Ads",
    description: "High-production ads with multi-angle shots and professional lighting. Designed for premium brands.",
    thumbnailUrl: "https://parliamentary-yellow-q708idzt8m.edgeone.app/commercial.png",
    videos: [
      { id: "c1", title: "Night Cream Routine", coverUrl: "https://picsum.photos/seed/cream-1/400/711", videoUrl: "https://youtube.com/shorts/iHQPQCFxI4g" },
      { id: "c2", title: "Morning Moisturizer", coverUrl: "https://picsum.photos/seed/cream-2/400/711", videoUrl: "https://youtube.com/shorts/Za7PkrpeqMU" },
      { id: "c3", title: "Cream Product Reveal", coverUrl: "https://picsum.photos/seed/cream-3/400/711", videoUrl: "https://www.youtube.com/watch?v=QNC6QNscRSQ" },
      { id: "c4", title: "Face Cream Tutorial", coverUrl: "https://picsum.photos/seed/cream-4/400/711", videoUrl: "https://youtube.com/shorts/nMFw460QEFQ" },
    ]
  },
  {
    id: "skincare-transformations",
    title: "Before and After Transformations",
    category: "Visible Results, Visible Growth",
    description: "Before and after storytelling that proves skincare works and drives purchase intent.",
    thumbnailUrl: "https://selfish-orange-q69cnxpywy.edgeone.app/skin%20beauty.png",
    videos: [
      { id: "w1", title: "Cleansing Routine", coverUrl: "https://picsum.photos/seed/cleanser-1/400/711", videoUrl: "https://youtube.com/shorts/0Y0g6zEtTpc" },
      { id: "w2", title: "Refreshing Reveal", coverUrl: "https://picsum.photos/seed/cleanser-2/400/711", videoUrl: "https://youtube.com/shorts/CrQaD25hJUM" },
      { id: "w3", title: "Customer Review", coverUrl: "https://picsum.photos/seed/cleanser-3/400/711", videoUrl: "https://youtube.com/shorts/0Y0g6zEtTpc" },
      { id: "w4", title: "Facewash Hack", coverUrl: "https://picsum.photos/seed/cleanser-4/400/711", videoUrl: "https://youtube.com/shorts/Ni_8PfIgMkU" },
    ]
  }
];

export const FEATURE_BLOCKS: FeatureBlock[] = [
  { 
    title: "Hook Strategy", 
    description: "First 3-second optimization to arrest attention immediately.", 
    details: "We analyze competitor data and skincare trends to craft hooks that stop the scroll. This includes visual patterns, skin-concern questions, and high-impact motion graphics designed to keep users from swiping past.",
    icon: "Zap" 
  },
  { 
    title: "Script Writing", 
    description: "Direct-response copywriting that triggers emotional buying decisions.", 
    details: "Our scripts follow a proven psychological framework: Hook, Problem, Solution, and Call to Action. We focus on ingredient benefits over features, using language that resonates with your target audience's specific skin concerns.",
    icon: "FileText" 
  },
  { 
    title: "UGC Creator Direction", 
    description: "Coaching creators to deliver authentic, believable performances.", 
    details: "We don't just send products; we provide detailed creative briefs and 1-on-1 coaching to ensure creators deliver authentic skincare testimonials that feel like a recommendation from a friend.",
    icon: "Users" 
  },
  { 
    title: "Performance Editing", 
    description: "Fast-paced cuts and visual effects designed for retention.", 
    details: "Our editors use platform-native styles (TikTok/Reels) with rapid cuts, on-screen text overlays, and trending sound design to maintain high viewer retention rates throughout the entire ad.",
    icon: "Scissors" 
  },
  { 
    title: "AI Workflow", 
    description: "Leveraging AI tools for rapid ideation and asset generation.", 
    details: "We use advanced AI for voiceovers, background removal, and dynamic captioning, allowing us to produce high-quality variations at a fraction of the traditional production time.",
    icon: "Cpu" 
  },
  { 
    title: "Testing Framework", 
    description: "Systematic A/B testing to identify winning variables.", 
    details: "We don't guess; we test. Our framework involves testing different hooks against the same body content to statistically determine which creative elements are driving the most conversions.",
    icon: "BarChart3" 
  },
  { 
    title: "Brand Positioning", 
    description: "Aligning creative output with core brand identity and voice.", 
    details: "We ensure every ad feels like a natural extension of your brand. We match your brand's tone, color palette, and values while maintaining the high-energy performance needed for social platforms.",
    icon: "Target" 
  },
  { 
    title: "24h Editing", 
    description: "Rapid turnaround times for scaling brands that need speed.", 
    details: "For brands that need to move fast, we offer expedited editing services. We can take raw footage and deliver performance-ready ads in as little as 24 hours to keep your ad accounts fresh.",
    icon: "Clock" 
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Single Creative",
    price: "$25",
    basePrice: 25,
    inrPrice: 799,
    subtitle: "Perfect for brands testing new concepts.",
    features: ["1 Skincare Ad (15 sec)", "Script writing", "Hook optimization", "Basic editing", "1 revision", "3–4 day delivery"]
  },
  {
    name: "Starter Testing",
    price: "$199",
    basePrice: 199,
    inrPrice: 6399,
    subtitle: "Best for new brands testing multiple angles.",
    features: ["8 Skincare ads", "2 ad angles per week", "Hook variations", "Script strategy", "2 revisions", "Priority support"]
  },
  {
    name: "Growth Plan",
    price: "$349",
    basePrice: 349,
    inrPrice: 11199,
    subtitle: "Designed for active Shopify brands running Meta/TikTok ads.",
    isPopular: true,
    features: ["15 creatives", "Multiple hooks", "AI-enhanced workflow", "Strategy call", "Advanced editing", "Weekly creative refresh"]
  },
  {
    name: "Scale Plan",
    price: "$699",
    basePrice: 699,
    inrPrice: 22399,
    subtitle: "Built for aggressive ad scales & agencies.",
    features: ["30+ creatives", "Full funnel strategy", "Creative testing framework", "Priority support", "24-48hr Turnaround", "Unlimited minor text revisions"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Marketing Director",
    company: "GlowSkin Co.",
    content: "The ROAS we've seen since switching to Addy's UGC for our serums is insane. Our cost per acquisition dropped by 40% in the first month.",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    stats: "4.2x ROAS"
  },
  {
    id: "t2",
    name: "Jessica Wu",
    role: "Growth Lead",
    company: "PureWellness",
    content: "The attention to detail in the performance editing for our face cream launch is what sets them apart. Every cut is designed to keep people watching.",
    avatarUrl: "https://i.pravatar.cc/150?u=jessica",
    stats: "3.5x ROAS"
  },
  {
    id: "t3",
    name: "Elena Rodriguez",
    role: "E-com Manager",
    company: "VibeBeauty",
    content: "Our CPC for the facewash campaign decreased from $1.20 to $0.45. The quality of editing and script writing is top-tier. Highly recommend!",
    avatarUrl: "https://i.pravatar.cc/150?u=elena",
    stats: "-62% CPC"
  },
  {
    id: "t4",
    name: "Tom Baker",
    role: "Ad Specialist",
    company: "BeautyAgency",
    content: "We use Addy for all our skincare clients. The turnaround time and creative strategy for beauty brands are unmatched in the industry.",
    avatarUrl: "https://i.pravatar.cc/150?u=tom",
    stats: "+85% Conv. Rate"
  }
];
