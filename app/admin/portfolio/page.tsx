import { AdminShell } from "@/components/admin/AdminShell";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { listPortfolioImages } from "@/lib/db/portfolio";

export default async function AdminPortfolioPage() {
  const images = await listPortfolioImages();

  return (
    <AdminShell
      title="Portfolio"
      subtitle="Upload and manage portfolio images"
    >
      <PortfolioManager images={images} />
    </AdminShell>
  );
}
