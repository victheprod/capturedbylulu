"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { saveContentAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/admin/AdminUI";

type Section = {
  key: string;
  label: string;
  fields: { name: string; label: string; rows?: number }[];
};

const sections: Section[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Heading" },
      { name: "subtitle", label: "Subheading", rows: 3 },
    ],
  },
  {
    key: "about",
    label: "About",
    fields: [
      { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Heading" },
      { name: "body", label: "Body", rows: 5 },
    ],
  },
  {
    key: "cta",
    label: "CTA",
    fields: [
      { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Heading" },
      { name: "description", label: "Description", rows: 3 },
      { name: "ctaLabel", label: "Button Label" },
    ],
  },
  {
    key: "seo",
    label: "SEO",
    fields: [
      { name: "title", label: "Meta Title" },
      { name: "description", label: "Meta Description", rows: 3 },
    ],
  },
];

export function ContentManager({
  content,
  defaults,
}: {
  content: Record<string, unknown>;
  defaults: Record<string, Record<string, string>>;
}) {
  const [pending, startTransition] = useTransition();

  const handleSave = (key: string, form: FormData) => {
    const value: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      value[k] = String(v);
    }
    startTransition(async () => {
      try {
        await saveContentAction(key, value);
        toast.success(`${key} content saved`);
      } catch {
        toast.error("Failed to save content");
      }
    });
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const current = {
          ...defaults[section.key],
          ...((content[section.key] as Record<string, string>) ?? {}),
        };
        return (
          <GlassPanel key={section.key}>
            <form
              action={(formData) => handleSave(section.key, formData)}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl">{section.label}</h3>
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block text-xs uppercase text-foreground/40">
                    {field.label}
                  </label>
                  {field.rows ? (
                    <textarea
                      name={field.name}
                      rows={field.rows}
                      defaultValue={current[field.name] ?? ""}
                      className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <input
                      name={field.name}
                      defaultValue={current[field.name] ?? ""}
                      className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                    />
                  )}
                </div>
              ))}
              <Button type="submit" disabled={pending}>
                Save {section.label}
              </Button>
            </form>
          </GlassPanel>
        );
      })}
    </div>
  );
}
