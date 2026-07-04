import { AdminShell } from "@/components/admin/AdminShell";
import { PackagesManager } from "@/components/admin/PackagesManager";
import { listPackageCategories, listPackages } from "@/lib/db/packages";

export default async function AdminPackagesPage() {
  const [categories, packages] = await Promise.all([
    listPackageCategories(true),
    listPackages(true),
  ]);

  return (
    <AdminShell title="Packages" subtitle="Manage pricing and service packages">
      <PackagesManager categories={categories} packages={packages} />
    </AdminShell>
  );
}
