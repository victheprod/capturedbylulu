import { AdminShell } from "@/components/admin/AdminShell";
import { GlassPanel, StatCard } from "@/components/admin/AdminUI";
import {
  getBookingStats,
  getMonthlyInquiries,
  getPopularPackage,
} from "@/lib/db/bookings";
import { getPortfolioCategoryDistribution } from "@/lib/db/portfolio";

export default async function AdminAnalyticsPage() {
  const [stats, monthly, popular, distribution] = await Promise.all([
    getBookingStats(),
    getMonthlyInquiries(),
    getPopularPackage(),
    getPortfolioCategoryDistribution(),
  ]);

  const conversionRate =
    stats.total > 0
      ? Math.round(
          ((stats.recent.filter((b) => b.status === "Booked").length || 0) /
            stats.total) *
            100,
        )
      : 0;

  return (
    <AdminShell title="Analytics" subtitle="Business insights and trends">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Inquiries" value={stats.total} />
        <StatCard label="Most Popular Package" value={popular ?? "—"} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
        <StatCard label="Upcoming Sessions" value={stats.upcoming} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassPanel>
          <h3 className="mb-4 font-serif text-xl">Monthly Inquiries</h3>
          {monthly.length === 0 ? (
            <p className="text-sm text-foreground/45">No data yet.</p>
          ) : (
            <ul className="space-y-2">
              {monthly.map((row) => (
                <li key={row.month} className="flex justify-between text-sm">
                  <span>{row.month}</span>
                  <span className="text-primary">{row.count}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel>
          <h3 className="mb-4 font-serif text-xl">Portfolio by Category</h3>
          {distribution.length === 0 ? (
            <p className="text-sm text-foreground/45">No portfolio data.</p>
          ) : (
            <ul className="space-y-2">
              {distribution.map((row) => (
                <li key={row.category} className="flex justify-between text-sm">
                  <span>{row.category}</span>
                  <span className="text-primary">{row.count}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel className="lg:col-span-2">
          <h3 className="mb-4 font-serif text-xl">Recent Bookings</h3>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-foreground/45">No recent bookings.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recent.map((b) => (
                <li key={b.id} className="flex justify-between border-b border-foreground/8 py-2 text-sm">
                  <span>
                    {b.client_name} · {b.package}
                  </span>
                  <span className="text-foreground/40">{b.status}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>
      </div>
    </AdminShell>
  );
}
