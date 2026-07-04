import { AdminShell } from "@/components/admin/AdminShell";
import { MediaManager } from "@/components/admin/MediaManager";
import { listMediaAssets } from "@/lib/db/media";

type PageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function AdminMediaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const assets = await listMediaAssets(params.search);

  return (
    <AdminShell title="Media Library" subtitle="Uploaded assets and files">
      <MediaManager assets={assets} search={params.search ?? ""} />
    </AdminShell>
  );
}
