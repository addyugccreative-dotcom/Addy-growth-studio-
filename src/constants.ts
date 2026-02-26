import { PortfolioNiche, FeatureBlock, PricingPlan } from "./types";

export const PORTFOLIO_NICHES: PortfolioNiche[] = [
  {
    id: "skincare-beauty",
    title: "Skincare / Beauty",
    category: "UGC Ads",
    description: "Trust-building product demos with emotional hooks designed to boost ROAS.",
    thumbnailUrl: "https://selfish-orange-q69cnxpywy.edgeone.app/skin%20beauty.png",
    videos: [
      { id: "v1", title: "Morning Routine", coverUrl: "https://picsum.photos/seed/skincare-1/400/711", videoUrl: "https://youtube.com/shorts/2uaYce9ywGM" },
      { id: "v2", title: "Product Reveal", coverUrl: "https://picsum.photos/seed/skincare-2/400/711", videoUrl: "https://www.youtube.com/watch?v=QNC6QNscRSQ" },
      { id: "v3", title: "Before & After", coverUrl: "https://picsum.photos/seed/skincare-3/400/711", videoUrl: "https://youtube.com/shorts/SOlfTi_BV8o" },
      { id: "v4", title: "Customer Review", coverUrl: "https://picsum.photos/seed/skincare-4/400/711", videoUrl: "https://youtube.com/shorts/0Y0g6zEtTpc" },
    ]
  },
  {
    id: "fitness-health",
    title: "Fitness / Health",
    category: "Performance Ads",
    description: "Performance-driven transformation angles and pain-point hooks for wellness brands.",
    thumbnailUrl: "https://ultimate-amethyst-lksldcvfzc.edgeone.app/gym.png",
    videos: [
      { id: "v1", title: "Workout Hook", coverUrl: "https://picsum.photos/seed/fitness-1/400/711", videoUrl: "https://youtube.com/shorts/qC9Ms59WRQQ" },
      { id: "v2", title: "Supplement Mix", coverUrl: "https://picsum.photos/seed/fitness-2/400/711", videoUrl: "https://youtube.com/shorts/XPCa5uOsfsw" },
      { id: "v3", title: "Transformation", coverUrl: "https://picsum.photos/seed/fitness-3/400/711", videoUrl: "#" },
      { id: "v4", title: "Expert Advice", coverUrl: "https://picsum.photos/seed/fitness-4/400/711", videoUrl: "#" },
    ]
  },
  {
    id: "tech-gadgets",
    title: "Tech / Gadgets",
    category: "Product Demo",
    description: "Scroll-stopping reviews and feature demos that simplify complex products.",
    thumbnailUrl: "https://electronic-bronze-1bwqppl3w1.edgeone.app/tech%20g.png",
    videos: [
      { id: "v1", title: "Unboxing", coverUrl: "https://picsum.photos/seed/tech-1/400/711", videoUrl: "https://youtube.com/shorts/MRBp0-_sYR8" },
      { id: "v2", title: "Feature Highlight", coverUrl: "https://picsum.photos/seed/tech-2/400/711", videoUrl: "https://youtube.com/shorts/Kaim0ETo3a4" },
      { id: "v3", title: "Problem Solver", coverUrl: "https://picsum.photos/seed/tech-3/400/711", videoUrl: "https://youtube.com/shorts/Z5UWUoXBFYg" },
      { id: "v4", title: "Tech Review", coverUrl: "https://picsum.photos/seed/tech-4/400/711", videoUrl: "#" },
    ]
  },
  {
    id: "fashion-jewelry",
    title: "Fashion / Jewelry",
    category: "Lifestyle Ads",
    description: "Aesthetic lifestyle creatives with premium visual appeal and strong hooks.",
    thumbnailUrl: "https://popular-magenta-oftw7eb50a.edgeone.app/ChatGPT%20Image%20Feb%2022,%202026,%2005_51_10%20PM.png",
    videos: [
      { id: "v1", title: "OOTD Hook", coverUrl: "https://picsum.photos/seed/fashion-1/400/711", videoUrl: "https://youtube.com/shorts/-6nk2lzfUiY" },
      { id: "v2", title: "Close-up Detail", coverUrl: "https://picsum.photos/seed/fashion-2/400/711", videoUrl: "#" },
      { id: "v3", title: "Styling Tips", coverUrl: "https://picsum.photos/seed/fashion-3/400/711", videoUrl: "#" },
      { id: "v4", title: "Brand Story", coverUrl: "https://picsum.photos/seed/fashion-4/400/711", videoUrl: "#" },
    ]
  },
  {
    id: "ecommerce-product-ads",
    title: "Dropshipping / Ecommerce",
    category: "Direct Response",
    description: "Direct-response ads optimized for TikTok & Meta with problem-solution structure.",
    thumbnailUrl: "https://combative-gold-jqx3cwbwjx.edgeone.app/ship.png",
    videos: [
      { id: "v1", title: "Hook Test A", coverUrl: "https://picsum.photos/seed/ecommerce-1/400/711", videoUrl: "https://www.youtube.com/embed/k4kGRf6HhWs?autoplay=1&mute=1&loop=1&playlist=k4kGRf6HhWs&modestbranding=1&rel=0" },
      { id: "v2", title: "Social Proof", coverUrl: "https://picsum.photos/seed/ecommerce-2/400/711", videoUrl: "https://youtube.com/shorts/ewP0uFrd48s" },
      { id: "v3", title: "Scarcity Angle", coverUrl: "https://picsum.photos/seed/ecommerce-3/400/711", videoUrl: "https://youtube.com/shorts/BURTRB1d_d4" },
      { id: "v4", title: "Final Call CTA", coverUrl: "https://picsum.photos/seed/ecommerce-4/400/711", videoUrl: "https://youtube.com/shorts/mxRzy6etUbw" },
    ]
  },
  {
    id: "commercial-product-ads",
    title: "Commercial Product Ads",
    category: "Brand Authority",
    description: "Cinematic brand authority ads with high-end visuals and professional editing.",
    thumbnailUrl: "https://parliamentary-yellow-q708idzt8m.edgeone.app/commercial.png",
    videos: [
      { id: "v1", title: "Cinematic Intro", coverUrl: "https://picsum.photos/seed/commercial-1/400/711", videoUrl: "https://youtube.com/shorts/CrQaD25hJUM" },
      { id: "v2", title: "Brand Vision", coverUrl: "https://picsum.photos/seed/commercial-2/400/711", videoUrl: "https://youtube.com/shorts/v84LuiHpJrE" },
      { id: "v3", title: "Product Macro", coverUrl: "https://picsum.photos/seed/commercial-3/400/711", videoUrl: "https://youtube.com/shorts/0h2U6Kp59-w" },
      { id: "v4", title: "Authority Message", coverUrl: "https://picsum.photos/seed/commercial-4/400/711", videoUrl: "https://youtube.com/shorts/qWk_OG3LhdQ" },
    ]
  }
];

export const FEATURE_BLOCKS: FeatureBlock[] = [
  { 
    title: "Hook Strategy", 
    description: "First 3-second optimization to arrest attention immediately.", 
    details: "We analyze competitor data and platform trends to craft hooks that stop the scroll. This includes visual patterns, curiosity-driven questions, and high-impact motion graphics designed to keep users from swiping past.",
    icon: "Zap" 
  },
  { 
    title: "Script Writing", 
    description: "Direct-response copywriting that triggers emotional buying decisions.", 
    details: "Our scripts follow a proven psychological framework: Hook, Problem, Solution, and Call to Action. We focus on benefits over features, using language that resonates with your target audience's specific pain points.",
    icon: "FileText" 
  },
  { 
    title: "UGC Creator Direction", 
    description: "Coaching creators to deliver authentic, believable performances.", 
    details: "We don't just send products; we provide detailed creative briefs and 1-on-1 coaching to ensure creators deliver authentic testimonials that feel like a recommendation from a friend, not a paid ad.",
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
    price: "$49",
    subtitle: "Perfect for brands testing new concepts.",
    features: ["1 UGC Ad (15 sec)", "Script writing", "Hook optimization", "Basic editing", "1 revision", "3–4 day delivery"]
  },
  {
    name: "Starter Testing",
    price: "$299",
    subtitle: "Best for new brands testing multiple angles.",
    features: ["8 UGC ads", "2 ad angles per week", "Hook variations", "Script strategy", "2 revisions", "Priority support"]
  },
  {
    name: "Growth Plan",
    price: "$499",
    subtitle: "Designed for active Shopify brands running Meta/TikTok ads.",
    isPopular: true,
    features: ["15 creatives", "Multiple hooks", "AI-enhanced workflow", "Strategy call", "Advanced editing", "Weekly creative refresh"]
  },
  {
    name: "Scale Plan",
    price: "$999",
    subtitle: "Built for aggressive ad scales & agencies.",
    features: ["30+ creatives", "Full funnel strategy", "Creative testing framework", "Priority support", "24-48hr Turnaround", "Unlimited minor text revisions"]
  }
];
