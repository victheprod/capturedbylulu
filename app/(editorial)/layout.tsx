import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { RevealObserver } from "@/components/editorial/RevealObserver";

/** The header is fixed, so pages must clear 4rem (mobile) / 5rem (md+) at the top. */
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
