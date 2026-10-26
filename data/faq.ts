export type FAQItem = { question: string; answer: string };
export type FAQSection = { category: string; items: FAQItem[] };

export const faqSections: FAQSection[] = [
  {
    category: "Estimates & Process",
    items: [
      {
        question: "Can I book directly on the website?",
        answer:
          "No — and that's intentional. The site is for estimates and customized special quotations only. Every booking is finalized directly with me by email so we can tailor coverage to your event.",
      },
      {
        question: "How far in advance should I inquire?",
        answer:
          "For weddings, I recommend reaching out 9–18 months in advance as popular dates fill quickly. For portraits, families, and brand sessions, 4–8 weeks is typically sufficient — though spring and fall peak seasons fill faster.",
      },
      {
        question: "How do I reserve my date?",
        answer:
          "After you request an estimate, I'll email a custom quotation. A signed agreement and 30% retainer (arranged with me directly) officially reserve your date. The remaining balance is due 2 weeks before your session or wedding day.",
      },
      {
        question: "Can I get a custom quotation for any event?",
        answer:
          "Yes. Choose “Custom special quotation” on the estimate form — or email me — for weddings, corporate events, multi-day coverage, or anything outside the listed packages. I'll tailor the quote to your vision.",
      },
      {
        question: "What if I need to reschedule?",
        answer:
          "Life happens — I totally understand. I offer one complimentary reschedule for portrait sessions with 2+ weeks notice. Wedding rescheduling is handled on a case-by-case basis per the contract terms.",
      },
      {
        question: "Do you travel outside the local area?",
        answer:
          "Yes — I’m Texas-based and travel throughout the state and nationally for weddings and brand sessions. Travel is quoted separately (starts at $50) based on distance and location.",
      },
    ],
  },
  {
    category: "The Session",
    items: [
      {
        question: "What should I wear?",
        answer:
          "I send every client a detailed style guide after booking. In general: choose colors that complement each other, avoid busy patterns, and dress for the season. Most importantly — wear something you feel genuinely confident and comfortable in.",
      },
      {
        question: "How long does a session take?",
        answer:
          "Session lengths vary by package — detailed durations are listed on the Services page. I always build in extra time for transitions, golden hour moments, and spontaneous magic.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "For outdoor sessions, I monitor weather closely and reach out 48 hours before your session to assess conditions. Light rain can create beautiful, moody imagery. For heavy rain, we'll reschedule at no charge.",
      },
      {
        question: "Can I bring my pets?",
        answer:
          "Absolutely yes — pets are always welcome and often steal the show. Just give me a heads up when booking so I can plan for it appropriately.",
      },
    ],
  },
  {
    category: "Delivery & Products",
    items: [
      {
        question: "How long until I receive my images?",
        answer:
          "Portrait and family sessions are delivered within 2–3 weeks. Brand sessions within 3 weeks. Weddings within 4–6 weeks. Rush delivery (48-hour turnaround) is available for an additional fee.",
      },
      {
        question: "How will I receive my images?",
        answer:
          "All images are delivered via a private, password-protected online gallery. From there you can download, share, and order professional prints directly.",
      },
      {
        question: "How many images will I receive?",
        answer:
          "Every package includes a minimum number of fully edited images (listed in each package description). I include everything that tells the story — there's no artificial culling of beautiful moments.",
      },
      {
        question: "Do you offer prints and albums?",
        answer:
          "Yes! I partner with professional print labs for heirloom-quality prints, canvases, and albums. Album design is included in The Legacy wedding package, and print consultations are available for all clients.",
      },
    ],
  },
  {
    category: "Pricing & Policies",
    items: [
      {
        question: "Are your prices negotiable?",
        answer:
          "My pricing reflects years of experience, professional equipment, editing time, and gallery delivery. Listed packages are starting estimates — I gladly prepare customized special quotations for large events, multi-session retainers, nonprofit organizations, and anything unique to your day.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "The retainer is non-refundable as it holds your date and turns away other inquiries. Cancellations with 60+ days notice forfeit only the retainer. Cancellations within 60 days forfeit 50% of the remaining balance.",
      },
      {
        question: "Do you have liability insurance?",
        answer:
          "Yes. I am fully insured and can provide a certificate of insurance to venues upon request. Most Texas venues require this for vendors.",
      },
    ],
  },
];
