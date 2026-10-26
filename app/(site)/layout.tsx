import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandTransition } from "@/components/layout/BrandTransition";

/**
 * Capture Concierge archived for now (provider + floating assistant removed).
 * Restore ConciergeProvider / ConciergeAssistant when ready.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrandTransition>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </BrandTransition>
  );
}
