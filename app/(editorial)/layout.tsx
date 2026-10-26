import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { RevealObserver } from "@/components/editorial/RevealObserver";

/**
 * Ivory editorial redesign. Routes move here from app/(site) as each page is
 * redesigned; both groups share the root layout, so navigation stays client-side.
 */
export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="editorial flex min-h-full flex-1 flex-col">
      <EditorialHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <EditorialFooter />
      <RevealObserver />
    </div>
  );
}
