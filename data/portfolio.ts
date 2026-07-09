// Curated for Vercel — regenerate: node scripts/curate-site-images.mjs
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
  "hero": "/site-images/_hero/weddings/DSC00201.jpg",
  "lulu": "/site-images/lulu/DSC04405-chest.png",
  "about": "/site-images/lulu/DSC04405-chest.png",
  "aboutTeaser": "/site-images/weddings/DSC07766.jpg",
  "cta": "/site-images/weddings/DSC00181.jpg",
  "servicesBanner": "/site-images/portraits/DSC08205.jpg",
  "weddingsBanner": "/site-images/weddings/DSC00201.jpg",
  "weddingsDetail1": "/site-images/weddings/DSC02783.jpg",
  "weddingsDetail2": "/site-images/weddings/DSC02836.jpg",
  "brandBanner": "/site-images/portraits/DSC07888.jpg",
  "brandDetail": "/site-images/portraits/DSC08173.jpg",
  "eventsBanner": "/site-images/events/DSC09813.jpg",
  "eventsDetail": "/site-images/events/DSC09870.jpg",
  "contactBanner": "/site-images/families/IMG_3621.jpg"
} as const;

export const siteImageFraming: Record<keyof typeof siteImages, SiteImageFraming> = {
  "hero": {
    "width": 1800,
    "height": 1012,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "about": {
    "width": 682,
    "height": 491,
    "objectPosition": "50% 42%",
    "aspectRatio": "4/5"
  },
  "lulu": {
    "width": 682,
    "height": 491,
    "objectPosition": "50% 42%",
    "aspectRatio": "4/5"
  },
  "aboutTeaser": {
    "width": 932,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "cta": {
    "width": 1400,
    "height": 787,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "servicesBanner": {
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "weddingsBanner": {
    "width": 1400,
    "height": 787,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "weddingsDetail1": {
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "weddingsDetail2": {
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "brandBanner": {
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "brandDetail": {
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  "eventsBanner": {
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "eventsDetail": {
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  "contactBanner": {
    "width": 1400,
    "height": 1223,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3"
  }
};

export const homePortfolioPreview: HomePreviewItem[] = [
  {
    "id": "weddings/DSC00201",
    "label": "Weddings",
    "src": "/site-images/_hero/weddings/DSC00201.jpg",
    "href": "/weddings",
    "width": 1800,
    "height": 1012,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3",
    "tall": false
  },
  {
    "id": "portraits/DSC08205",
    "label": "Portraits",
    "src": "/site-images/portraits/DSC08205.jpg",
    "href": "/portfolio",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4",
    "tall": true
  },
  {
    "id": "families/IMG_3621",
    "label": "Families",
    "src": "/site-images/families/IMG_3621.jpg",
    "href": "/portfolio",
    "width": 1400,
    "height": 1223,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3",
    "tall": false
  },
  {
    "id": "events/DSC09813",
    "label": "Events",
    "src": "/site-images/events/DSC09813.jpg",
    "href": "/portfolio",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3",
    "tall": false
  }
];

export const instagramPhotos = [
  "/site-images/_hero/weddings/DSC00201.jpg",
  "/site-images/portraits/DSC08205.jpg",
  "/site-images/families/IMG_3621.jpg",
  "/site-images/events/DSC09813.jpg",
  "/site-images/portraits/DSC07888.jpg",
  "/site-images/weddings/DSC07766.jpg",
  "/site-images/portraits/DSC05682.jpg",
  "/site-images/events/DSC09870.jpg",
  "/site-images/families/IMG_3649.jpg"
];

export const instagramPhotoFraming = [
  {
    "src": "/site-images/_hero/weddings/DSC00201.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/portraits/DSC08205.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/site-images/families/IMG_3621.jpg",
    "objectPosition": "50% 35%"
  },
  {
    "src": "/site-images/events/DSC09813.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/portraits/DSC07888.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/weddings/DSC07766.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/site-images/portraits/DSC05682.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/events/DSC09870.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/families/IMG_3649.jpg",
    "objectPosition": "50% 18%"
  }
];

export const servicesTeaserImages: ServiceTeaserImage[] = [
  {
    "label": "Weddings",
    "src": "/site-images/weddings/DSC02880.jpg",
    "href": "/weddings",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  },
  {
    "label": "Portraits",
    "src": "/site-images/portraits/DSC04123.jpg",
    "href": "/portfolio",
    "width": 932,
    "height": 1400,
    "objectPosition": "50% 18%",
    "aspectRatio": "3/4"
  },
  {
    "label": "Families",
    "src": "/site-images/families/DSC00439.jpg",
    "href": "/portfolio",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 35%",
    "aspectRatio": "4/3"
  },
  {
    "label": "Events",
    "src": "/site-images/events/DSC01224.jpg",
    "href": "/portfolio",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%",
    "aspectRatio": "4/3"
  }
];

/** Homepage Instagram strip — unique from hero, philosophy, scroll, and services */
export const homeInstagramStrip = [
  {
    "src": "/site-images/weddings/DSC02774.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/site-images/weddings/DSC02813.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/portraits/DSC05533.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/site-images/portraits/DSC08149.jpg",
    "objectPosition": "50% 18%"
  },
  {
    "src": "/site-images/families/DSC00572.jpg",
    "objectPosition": "50% 35%"
  },
  {
    "src": "/site-images/families/DSC00602.jpg",
    "objectPosition": "50% 35%"
  },
  {
    "src": "/site-images/events/DSC06941.jpg",
    "objectPosition": "50% 50%"
  },
  {
    "src": "/site-images/weddings/DSC03295.jpg",
    "objectPosition": "50% 50%"
  }
];

export const weddingsEditorialPair = [
  {
    "id": "weddings/DSC07789",
    "src": "/site-images/weddings/DSC07789.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 932,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC02748",
    "src": "/site-images/weddings/DSC02748.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  }
];

export const portfolioScrollShowcase: PortfolioScrollItem[] = [
  {
    "id": "weddings/DSC00201",
    "src": "/site-images/_hero/weddings/DSC00201.jpg",
    "category": "Weddings",
    "width": 1800,
    "height": 1012,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC02783",
    "src": "/site-images/weddings/DSC02783.jpg",
    "category": "Weddings",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC02836",
    "src": "/site-images/weddings/DSC02836.jpg",
    "category": "Weddings",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "portraits/DSC08765",
    "src": "/site-images/portraits/DSC08765.jpg",
    "category": "Portraits",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC07766",
    "src": "/site-images/weddings/DSC07766.jpg",
    "category": "Weddings",
    "width": 932,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC07789",
    "src": "/site-images/weddings/DSC07789.jpg",
    "category": "Weddings",
    "width": 932,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "portraits/DSC08205",
    "src": "/site-images/portraits/DSC08205.jpg",
    "category": "Portraits",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "portraits/DSC07888",
    "src": "/site-images/portraits/DSC07888.jpg",
    "category": "Portraits",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "portraits/DSC05682",
    "src": "/site-images/portraits/DSC05682.jpg",
    "category": "Portraits",
    "width": 1400,
    "height": 787,
    "objectPosition": "50% 50%"
  },
  {
    "id": "portraits/DSC08173",
    "src": "/site-images/portraits/DSC08173.jpg",
    "category": "Portraits",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "families/IMG_3621",
    "src": "/site-images/families/IMG_3621.jpg",
    "category": "Families",
    "width": 1400,
    "height": 1223,
    "objectPosition": "50% 35%"
  },
  {
    "id": "families/IMG_3649",
    "src": "/site-images/families/IMG_3649.jpg",
    "category": "Families",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "events/DSC09813",
    "src": "/site-images/events/DSC09813.jpg",
    "category": "Events",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "events/DSC09870",
    "src": "/site-images/events/DSC09870.jpg",
    "category": "Events",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC00181",
    "src": "/site-images/weddings/DSC00181.jpg",
    "category": "Weddings",
    "width": 1400,
    "height": 787,
    "objectPosition": "50% 50%"
  }
];

export const weddingsHighlightGallery = [
  {
    "id": "weddings/DSC02783",
    "src": "/site-images/weddings/DSC02783.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC02836",
    "src": "/site-images/weddings/DSC02836.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC02880",
    "src": "/site-images/weddings/DSC02880.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC02813",
    "src": "/site-images/weddings/DSC02813.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  },
  {
    "id": "weddings/DSC02774",
    "src": "/site-images/weddings/DSC02774.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 933,
    "height": 1400,
    "objectPosition": "50% 18%"
  },
  {
    "id": "weddings/DSC03295",
    "src": "/site-images/weddings/DSC03295.jpg",
    "alt": "Wedding photography by CapturedByLulu",
    "width": 1400,
    "height": 933,
    "objectPosition": "50% 50%"
  }
];
