"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { saveSettingAction, uploadFileAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/admin/AdminUI";

type SettingsShape = {
  business: Record<string, string>;
  social: Record<string, string>;
  hours: Record<string, string>;
  branding: Record<string, string>;
};

export function SettingsManager({
  settings,
  defaults,
}: {
  settings: Partial<SettingsShape>;
  defaults: SettingsShape;
}) {
  const [pending, startTransition] = useTransition();

  const saveSection = (key: keyof SettingsShape, form: FormData) => {
    const value: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      value[k] = String(v);
    }
    startTransition(async () => {
      try {
        await saveSettingAction(key, value);
        toast.success("Settings saved");
      } catch {
        toast.error("Failed to save settings");
      }
    });
  };

  const uploadBranding = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "faviconUrl",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "branding");

    startTransition(async () => {
      try {
        const asset = await uploadFileAction(formData);
        const current = {
          ...defaults.branding,
          ...(settings.branding ?? {}),
          [field]: asset.public_url,
        };
        await saveSettingAction("branding", current);
        toast.success("Branding updated");
      } catch {
        toast.error("Upload failed");
      }
    });
  };

  const business = { ...defaults.business, ...(settings.business ?? {}) };
  const social = { ...defaults.social, ...(settings.social ?? {}) };
  const hours = { ...defaults.hours, ...(settings.hours ?? {}) };
  const branding = { ...defaults.branding, ...(settings.branding ?? {}) };

  return (
    <div className="space-y-6">
      <GlassPanel>
        <form action={(fd) => saveSection("business", fd)} className="space-y-3">
          <h3 className="font-serif text-xl">Business</h3>
          {Object.entries(business).map(([name, value]) => (
            <div key={name}>
              <label className="mb-1 block text-xs uppercase text-foreground/40">{name}</label>
              <input name={name} defaultValue={value} className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm" />
            </div>
          ))}
          <Button type="submit" disabled={pending}>Save Business</Button>
        </form>
      </GlassPanel>

      <GlassPanel>
        <form action={(fd) => saveSection("social", fd)} className="space-y-3">
          <h3 className="font-serif text-xl">Social Links</h3>
          {Object.entries(social).map(([name, value]) => (
            <div key={name}>
              <label className="mb-1 block text-xs uppercase text-foreground/40">{name}</label>
              <input name={name} defaultValue={value} className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm" />
            </div>
          ))}
          <Button type="submit" disabled={pending}>Save Social</Button>
        </form>
      </GlassPanel>

      <GlassPanel>
        <form action={(fd) => saveSection("hours", fd)} className="space-y-3">
          <h3 className="font-serif text-xl">Business Hours</h3>
          {Object.entries(hours).map(([name, value]) => (
            <div key={name}>
              <label className="mb-1 block text-xs uppercase text-foreground/40">{name}</label>
              <input name={name} defaultValue={value} className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm" />
            </div>
          ))}
          <Button type="submit" disabled={pending}>Save Hours</Button>
        </form>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 font-serif text-xl">Branding</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="cursor-pointer border border-foreground/12 p-4 text-sm">
            Upload Logo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadBranding(e, "logoUrl")} />
            <p className="mt-2 truncate text-xs text-foreground/40">{branding.logoUrl}</p>
          </label>
          <label className="cursor-pointer border border-foreground/12 p-4 text-sm">
            Upload Favicon
            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadBranding(e, "faviconUrl")} />
            <p className="mt-2 truncate text-xs text-foreground/40">{branding.faviconUrl}</p>
          </label>
        </div>
      </GlassPanel>
    </div>
  );
}
