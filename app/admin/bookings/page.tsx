import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState, GlassPanel } from "@/components/admin/AdminUI";
import { listBookings } from "@/lib/db/bookings";
import { BookingsManager } from "@/components/admin/BookingsManager";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const { data, count } = await listBookings({
    search: params.search,
    status: (params.status as never) ?? "all",
    page,
    pageSize: 10,
  });

  return (
    <AdminShell title="Bookings" subtitle="Manage client inquiries and sessions">
      {data.length === 0 && !params.search ? (
        <EmptyState
          title="No bookings yet"
          description="Inquiries from the contact form will appear here once Supabase is connected."
          action={
            <Link href="/contact" className="text-sm text-primary underline">
              View contact form
            </Link>
          }
        />
      ) : (
        <GlassPanel className="p-0">
          <BookingsManager
            bookings={data}
            total={count}
            page={page}
            search={params.search ?? ""}
            status={params.status ?? "all"}
          />
        </GlassPanel>
      )}
    </AdminShell>
  );
}
