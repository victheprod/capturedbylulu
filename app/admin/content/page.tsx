import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAllSiteContent } from "@/lib/db/content";
import { siteConfig } from "@/data/site";

export default async function AdminContentPage() {
  const content = await getAllSiteContent();

  const defaults = {
    hero: {
      eyebrow: "San Antonio, Texas",
      title: "Photographs that breathe with emotion",
      subtitle:
        "Luxury photography for weddings, portraits, families, and brands.",
    },
    about: {
      eyebrow: "About Lulu",
      title: "A photographer who sees what others feel",
      body: "Based in San Antonio with a background in fine art and documentary photography.",
    },
    cta: {
      eyebrow: "Let's Create Together",
      title: "Ready to tell your story?",
      description: "Dates fill quickly. Reach out to check availability.",
      ctaLabel: "Start Your Journey",
    },
    seo: {
      title: "Luxury Photography in San Antonio",
      description: siteConfig.description,
    },
  };

  return (
    <AdminShell title="Website Content" subtitle="Edit public-facing copy and SEO">
      <ContentManager content={content} defaults={defaults} />
    </AdminShell>
  );
}
