import { AdminShell } from "@/components/admin/AdminShell";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";
import { listAvailabilityBlocks } from "@/lib/db/availability";

export default async function AdminAvailabilityPage() {
  const blocks = await listAvailabilityBlocks();

  return (
    <AdminShell title="Availability" subtitle="Block dates, vacations, and booked days">
      <AvailabilityManager blocks={blocks} />
    </AdminShell>
  );
}
