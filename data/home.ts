/** Homepage exhibition content. Every image is Lulu's own work from public/site-images. */

export type ExhibitPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, used when the frame crops the photo. */
  position?: string;
};

export const heroPhotos = {
  desktop: {
    src: "/site-images/portraits/DSC09174.jpg",
    alt: "A woman in white tights and a white fur coat sits against a vivid turquoise studio backdrop.",
    width: 1400,
    height: 933,
  },
  mobile: {
    src: "/site-images/portraits/DSC09121.jpg",
    alt: "A woman in a white fur coat looks back over her shoulder against a vivid turquoise studio backdrop.",
    width: 933,
    height: 1400,
  },
  /** Covers both crops, since the browser picks one. */
  alt: "A woman in a white fur coat against a vivid turquoise studio backdrop.",
  caption: "Studio portrait, turquoise and white fur.",
} as const;

export type SelectedWork = ExhibitPhoto & {
  plate: string;
  caption: string;
  /** Grid placement on md+ screens. */
  layout: string;
};

export const selectedWorks: SelectedWork[] = [
  {
    src: "/site-images/weddings/DSC02836.jpg",
    alt: "A couple in green and gold traditional wedding attire stands between the columns of a grand building.",
    width: 1400,
    height: 933,
    plate: "II",
    caption: "Traditional ceremony",
    layout: "md:col-span-5 md:col-start-1",
  },
  {
    src: "/site-images/portraits/DSC09240.jpg",
    alt: "A woman in a white dress and fur coat poses against a vivid turquoise studio backdrop.",
    width: 933,
    height: 1400,
    plate: "III",
    caption: "Studio, colour study",
    layout: "md:col-span-4 md:col-start-8 md:mt-40",
  },
  {
    src: "/site-images/families/IMG_3649.jpg",
    alt: "A couple in matching red and cream patterned outfits embraces for an indoor portrait.",
    width: 933,
    height: 1400,
    plate: "IV",
    caption: "Together, at ease",
    layout: "md:col-span-6 md:col-start-2 md:-mt-10",
  },
  {
    src: "/site-images/events/DSC01224.jpg",
    alt: "A man speaks into a microphone in front of a black, silver and gold birthday balloon display.",
    width: 1400,
    height: 933,
    plate: "V",
    caption: "A milestone, celebrated",
    layout: "md:col-span-4 md:col-start-9 md:mt-24",
  },
  {
    src: "/site-images/weddings/DSC07789.jpg",
    alt: "A smiling bride in red satin pajamas sits on a bed with balloons behind her.",
    width: 932,
    height: 1400,
    plate: "VI",
    caption: "Before the ceremony",
    layout: "md:col-span-7 md:col-start-4 md:mt-8",
  },
];

export type Experience = ExhibitPhoto & {
  title: string;
  href: string;
  line: string;
};

export const experiences: Experience[] = [
  {
    title: "Weddings",
    href: "/weddings",
    src: "/site-images/weddings/DSC02783.jpg",
    alt: "A smiling couple embraces in emerald and gold traditional wedding attire.",
    width: 933,
    height: 1400,
    position: "50% 30%",
    line: "Ceremony to last dance. Quiet in the sacred moments, fully in the mix at the reception.",
  },
  {
    title: "Portraits",
    href: "/services",
    src: "/site-images/portraits/DSC09121.jpg",
    alt: "A woman in a white fur coat looks back over her shoulder against a turquoise studio backdrop.",
    width: 933,
    height: 1400,
    position: "50% 30%",
    line: "Birthdays, milestones, just-because. Direction that makes you feel like the main character.",
  },
  {
    title: "Families",
    href: "/services",
    src: "/site-images/families/IMG_3621.jpg",
    alt: "A family of four in traditional attire poses together in front of a brick fireplace.",
    width: 1400,
    height: 1223,
    position: "50% 35%",
    line: "The real way you hold each other, with enough guidance that everyone looks their best.",
  },
  {
    title: "Events",
    href: "/services",
    src: "/site-images/events/DSC09813.jpg",
    alt: "A singer performs in a narrow beam of light on a dark stage.",
    width: 1400,
    height: 933,
    line: "Thanksgiving services, naming ceremonies, engagements and birthdays, read with care.",
  },
];

export const meetLuluPhoto: ExhibitPhoto = {
  src: "/site-images/lulu/DSC04405-chest.png",
  alt: "Lulu, the photographer, smiling in a light blue suit with a pink pocket square in front of a curved staircase.",
  width: 682,
  height: 491,
  position: "50% 20%",
};

/** Reviews shown on the homepage, in order. The first is featured. Quotes come verbatim from the testimonials source. */
export const homepageReviewNames = ["Michael", "Candee", "Tomisola", "Oba Bunmi"];

export const estimateSteps = [
  { title: "Tell", body: "Share your date, session type and the feeling you want." },
  { title: "Hear back", body: "Lulu reads it personally and replies, usually within a day or two." },
  {
    title: "Confirm",
    body: "Price and date are finalized together by email. No instant booking, no guesswork.",
  },
] as const;
