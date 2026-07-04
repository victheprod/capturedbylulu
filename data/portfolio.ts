// Auto-generated — run: node scripts/generate-portfolio-data.mjs
import itemsJson from "./portfolio-items.json";

export type PortfolioCategory =
  | "All"
  | "Weddings"
  | "Portraits"
  | "Families"
  | "Events";

export const portfolioFilters: PortfolioCategory[] = [
  "All",
  "Weddings",
  "Portraits",
  "Families",
  "Events",
];

export type PortfolioItem = {
  id: string;
  src: string;
  category: Exclude<PortfolioCategory, "All">;
  height: number;
  width: number;
};

export type HomePreviewItem = {
  id: string;
  label: string;
  tall: boolean;
  src: string;
  href: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectPosition: string;
};

export type ServiceTeaserImage = {
  label: string;
  src: string;
  href: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectPosition: string;
};

export type SiteImageFraming = {
  width: number;
  height: number;
  objectPosition: string;
  aspectRatio: string;
};

export type PortfolioScrollItem = {
  id: string;
  src: string;
  category: Exclude<PortfolioCategory, "All">;
  width: number;
  height: number;
  objectPosition: string;
};

export const portfolioItems = itemsJson as PortfolioItem[];

export const siteImages = {
  "hero": "/portfolio/_hero/weddings/DSC07841.jpg",
  "about": "/portfolio/families/IMG_3621.jpg",
  "aboutTeaser": "/portfolio/_web/weddings/DSC07766.jpg",
  "cta": "/portfolio/_web/weddings/DSC02657.jpg",
  "servicesBanner": "/portfolio/portraits/DSC08205.jpg",
  "weddingsBanner": "/portfolio/_web/weddings/DSC07841.jpg",
  "weddingsDetail1": "/portfolio/_web/weddings/DSC07766.jpg",
  "weddingsDetail2": "/portfolio/_web/weddings/DSC07789.jpg",
  "brandBanner": "/portfolio/portraits/DSC07888.jpg",
  "brandDetail": "/portfolio/portraits/DSC08173.jpg",
  "eventsBanner": "/portfolio/events/DSC09813.jpg",
  "eventsDetail": "/portfolio/events/DSC09870.jpg",
  "contactBanner": "/portfolio/families/IMG_3621.jpg"
} as const;

export const siteImageFraming: Record<keyof typeof siteImages, SiteImageFraming> = {
  "hero": {
    "width": 2400,
    "height": 1600,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "about": {
    "width": 2048,
    "height": 1790,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3"
  },
  "aboutTeaser": {
    "width": 1066,
    "height": 1600,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "cta": {
    "width": 1600,
    "height": 1066,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "servicesBanner": {
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "weddingsBanner": {
    "width": 1600,
    "height": 1066,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "weddingsDetail1": {
    "width": 1066,
    "height": 1600,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "weddingsDetail2": {
    "width": 1066,
    "height": 1600,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "brandBanner": {
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "brandDetail": {
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "eventsBanner": {
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "eventsDetail": {
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "contactBanner": {
    "width": 2048,
    "height": 1790,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3"
  }
};

export const homePortfolioPreview: HomePreviewItem[] = [
  {
    "id": "weddings/DSC07841",
    "label": "Weddings",
    "src": "/portfolio/_hero/weddings/DSC07841.jpg",
    "href": "/weddings",
    "width": 2400,
    "height": 1600,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3",
    "tall": false
  },
  {
    "id": "portraits/DSC08205",
    "label": "Portraits",
    "src": "/portfolio/portraits/DSC08205.jpg",
    "href": "/portfolio",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4",
    "tall": true
  },
  {
    "id": "families/IMG_3621",
    "label": "Families",
    "src": "/portfolio/families/IMG_3621.jpg",
    "href": "/portfolio",
    "width": 2048,
    "height": 1790,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3",
    "tall": false
  },
  {
    "id": "events/DSC09813",
    "label": "Events",
    "src": "/portfolio/events/DSC09813.jpg",
    "href": "/portfolio",
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3",
    "tall": false
  }
];

export const instagramPhotos = [
  "/portfolio/_hero/weddings/DSC07841.jpg",
  "/portfolio/portraits/DSC08205.jpg",
  "/portfolio/families/IMG_3621.jpg",
  "/portfolio/events/DSC09813.jpg",
  "/portfolio/portraits/DSC07888.jpg",
  "/portfolio/_web/weddings/DSC07766.jpg",
  "/portfolio/portraits/DSC05682.jpg",
  "/portfolio/events/DSC09870.jpg",
  "/portfolio/families/IMG_3649.jpg"
];

export const instagramPhotoFraming = [
  {
    "src": "/portfolio/_hero/weddings/DSC07841.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/portfolio/portraits/DSC08205.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/portfolio/families/IMG_3621.jpg",
    "objectPosition": "50% 35%"
  },
  {
    "src": "/portfolio/events/DSC09813.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/portfolio/portraits/DSC07888.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/portfolio/_web/weddings/DSC07766.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/portfolio/portraits/DSC05682.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/portfolio/events/DSC09870.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/portfolio/families/IMG_3649.jpg",
    "objectPosition": "50% 18%"
  }
];

export const servicesTeaserImages: ServiceTeaserImage[] = [
  {
    "label": "Weddings",
    "src": "/portfolio/_web/weddings/DSC07841.jpg",
    "href": "/weddings",
    "width": 1600,
    "height": 1066,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  {
    "label": "Portraits",
    "src": "/portfolio/portraits/DSC08205.jpg",
    "href": "/portfolio",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  {
    "label": "Families",
    "src": "/portfolio/families/IMG_3621.jpg",
    "href": "/portfolio",
    "width": 2048,
    "height": 1790,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3"
  },
  {
    "label": "Events",
    "src": "/portfolio/events/DSC09813.jpg",
    "href": "/portfolio",
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  }
];

export const portfolioScrollShowcase: PortfolioScrollItem[] = [
  {
    "id": "weddings/DSC07841",
    "src": "/portfolio/_hero/weddings/DSC07841.jpg",
    "category": "Weddings",
    "width": 2400,
    "height": 1600,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC07766",
    "src": "/portfolio/_web/weddings/DSC07766.jpg",
    "category": "Weddings",
    "width": 1066,
    "height": 1600,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC07789",
    "src": "/portfolio/_web/weddings/DSC07789.jpg",
    "category": "Weddings",
    "width": 1066,
    "height": 1600,
    "objectPosition": "50% 18%"
  },
  {
    "id": "portraits/DSC08205",
    "src": "/portfolio/portraits/DSC08205.jpg",
    "category": "Portraits",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%"
  },
  {
    "id": "portraits/DSC07888",
    "src": "/portfolio/portraits/DSC07888.jpg",
    "category": "Portraits",
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%"
  },
  {
    "id": "portraits/DSC05682",
    "src": "/portfolio/portraits/DSC05682",
    "category": "Portraits",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%"
  },
  {
    "id": "portraits/DSC08173",
    "src": "/portfolio/portraits/DSC08173.jpg",
    "category": "Portraits",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%"
  },
  {
    "id": "families/IMG_3621",
    "src": "/portfolio/families/IMG_3621.jpg",
    "category": "Families",
    "width": 2048,
    "height": 1790,
    "objectPosition": "50% 35%"
  },
  {
    "id": "families/IMG_3649",
    "src": "/portfolio/families/IMG_3649",
    "category": "Families",
    "width": 1365,
    "height": 2048,
    "objectPosition": "50% 18%"
  },
  {
    "id": "events/DSC09813",
    "src": "/portfolio/events/DSC09813.jpg",
    "category": "Events",
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%"
  },
  {
    "id": "events/DSC09870",
    "src": "/portfolio/events/DSC09870.jpg",
    "category": "Events",
    "width": 2048,
    "height": 1365,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC02657",
    "src": "/portfolio/_web/weddings/DSC02657.jpg",
    "category": "Weddings",
    "width": 1600,
    "height": 1066,
    "objectPosition": "50% 50%"
  }
];
