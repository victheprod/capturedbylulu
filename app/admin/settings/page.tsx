import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { getAllSettings } from "@/lib/db/settings";
import { siteConfig } from "@/data/site";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  const defaults = {
    business: {
      name: siteConfig.name,
      email: siteConfig.email,
      phone: siteConfig.phone,
      address: siteConfig.location,
    },
    social: {
      instagram: siteConfig.instagram,
      instagramUrl: siteConfig.instagramUrl,
      facebook: "",
      tiktok: "",
    },
    hours: {
      weekdays: "By appointment",
      saturday: "By appointment",
      sunday: "Closed",
    },
    branding: {
      logoUrl: "/logo.png",
      faviconUrl: "/logo.png",
    },
  };

  return (
    <AdminShell title="Settings" subtitle="Business info, social links, and branding">
      <SettingsManager settings={settings} defaults={defaults} />
    </AdminShell>
  );
}
