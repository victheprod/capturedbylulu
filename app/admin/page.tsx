import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassPanel, StatCard } from "@/components/admin/AdminUI";
import { getBookingStats } from "@/lib/db/bookings";
import { getPortfolioCount } from "@/lib/db/portfolio";
import { getActivePackageCount } from "@/lib/cms/packages";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const [bookingStats, portfolioCount, packageCount] = configured
    ? await Promise.all([
        getBookingStats(),
        getPortfolioCount(),
        getActivePackageCount(),
      ])
    : [
        { total: 0, upcoming: 0, recent: [] },
        0,
        0,
      ];

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of your photography business"
    >
      {!configured && (
        <div className="mb-6 border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-sm text-amber-100/90">
          Supabase is not configured. Add env variables and run the migration.
          See <code className="text-primary">docs/SUPABASE.md</code> in the repository.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Inquiries" value={bookingStats.total} />
        <StatCard label="Upcoming Sessions" value={bookingStats.upcoming} />
        <StatCard label="Portfolio Images" value={portfolioCount} />
        <StatCard label="Active Packages" value={packageCount} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassPanel>
          <h2 className="mb-4 font-serif text-xl text-foreground">
            Recent Activity
          </h2>
          {bookingStats.recent.length === 0 ? (
            <p className="text-sm text-foreground/45">No recent inquiries yet.</p>
          ) : (
            <ul className="space-y-3">
              {bookingStats.recent.map((booking) => (
                <li
                  key={booking.id}
                  className="flex items-center justify-between border-b border-foreground/8 pb-3 text-sm"
                >
                  <div>
                    <p className="text-foreground">{booking.client_name}</p>
                    <p className="text-xs text-foreground/40">
                      {booking.session_type} · {booking.preferred_date}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase text-primary">
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel>
          <h2 className="mb-4 font-serif text-xl text-foreground">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/admin/bookings", label: "View Bookings" },
              { href: "/admin/portfolio", label: "Upload Photos" },
              { href: "/admin/packages", label: "Edit Packages" },
              { href: "/admin/availability", label: "Set Availability" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-foreground/12 px-4 py-3 text-sm text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </GlassPanel>
      </div>
    </AdminShell>
  );
}
