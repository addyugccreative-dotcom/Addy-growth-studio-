export interface NicheVideo {
  id: string;
  title: string;
  coverUrl: string;
  videoUrl: string;
}

export interface PortfolioNiche {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  videos: NicheVideo[];
}

export interface FeatureBlock {
  title: string;
  description: string;
  details: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  subtitle?: string;
  features: string[];
  isPopular?: boolean;
}
