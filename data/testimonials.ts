export type Testimonial = {
  name: string;
  type: string;
  quote: string;
  stars: number;
  /** Show in admin / full list */
  featured?: boolean;
  /** Homepage row — classic 3-up layout */
  showOnHomepage?: boolean;
};

/** Verbatim client reviews */
export const testimonials: Testimonial[] = [
  {
    name: "Angelina",
    type: "Client",
    quote:
      "they are beautiful! you did a wonderful job 10 outta 10 would recommend again 🤏🏼🙂‍↕️",
    stars: 5,
    featured: true,
    showOnHomepage: true,
  },
  {
    name: "dami",
    type: "Portrait Session",
    quote:
      "I love them they are beautiful, I always don't like taking pictures cause I always think I'm not photogenic but is a lie oooo… I fineeee. Did a great job 👏🏾",
    stars: 5,
    featured: true,
    showOnHomepage: true,
  },
  {
    name: "Candee",
    type: "Birthday Photoshoot",
    quote:
      "Capturedbylulu did a fantastic job for doing my birthday photoshoot. It was an amazing experience. It was very patient and the photo edit came out perfect got lot of compliments.",
    stars: 5,
    featured: true,
    showOnHomepage: true,
  },
  {
    name: "Michael",
    type: "Truly Exceptional · Events & Weddings",
    quote:
      "Hands down the most versatile photographer I've worked with from solemn church thanksgiving services to the vibrant energy of weddings, naming ceremonies, engagements, and birthdays, every moment was captured beautifully. They read the room perfectly: quiet and reverent during sacred moments, then fully in the mix catching every dance and candid smile at the reception. Editing was crisp, turnaround was fast, and skin tones looked natural and rich. If you need any event covered book them. I'll be using them for every occasion going forward. Ten out of ten.",
    stars: 5,
    featured: true,
    showOnHomepage: true,
  },
  {
    name: "Peter",
    type: "Birthday Photoshoot",
    quote:
      "Captured by Lulu is an amazing photographer. He handled my photo shoot with care and professionalism. I would definitely recommend him, and I got my pictures in time for my birthday. Very excellent.",
    stars: 5,
    featured: true,
    showOnHomepage: true,
  },
];

export const homepageTestimonials = testimonials.filter((t) => t.showOnHomepage);

export const featuredTestimonials = testimonials.filter((t) => t.featured !== false);
