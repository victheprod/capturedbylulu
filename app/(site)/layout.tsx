import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandTransition } from "@/components/layout/BrandTransition";
import { ConciergeProvider } from "@/components/concierge/ConciergeContext";
import { ConciergeAssistant } from "@/components/concierge/ConciergeAssistant";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConciergeProvider>
      <BrandTransition>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ConciergeAssistant />
      </BrandTransition>
    </ConciergeProvider>
  );
}
