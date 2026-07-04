"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import type { MediaAsset } from "@/lib/types/database";
import { deleteMediaAction, uploadFileAction } from "@/lib/admin/actions";
import { EmptyState, GlassPanel } from "@/components/admin/AdminUI";

export function MediaManager({
  assets,
  search,
}: {
  assets: MediaAsset[];
  search: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "media");

    startTransition(async () => {
      try {
        await uploadFileAction(formData);
        toast.success("File uploaded");
        router.refresh();
      } catch {
        toast.error("Upload failed");
      }
    });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete asset?")) return;
    startTransition(async () => {
      try {
        await deleteMediaAction(id);
        toast.success("Deleted");
        router.refresh();
      } catch {
        toast.error("Delete failed");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          defaultValue={search}
          placeholder="Search files..."
          className="max-w-sm border border-foreground/12 bg-background px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const q = (e.target as HTMLInputElement).value;
              router.push(q ? `/admin/media?search=${encodeURIComponent(q)}` : "/admin/media");
            }
          }}
        />
        <label className="cursor-pointer border border-primary px-4 py-2 text-sm text-primary">
          Upload
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {assets.length === 0 ? (
        <EmptyState title="No media yet" description="Upload images and files to your library." />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <GlassPanel key={asset.id} className="overflow-hidden p-0">
              <div className="relative aspect-square bg-card">
                {asset.mime_type?.startsWith("image/") ? (
                  <Image
                    src={asset.public_url}
                    alt={asset.alt_text ?? asset.filename}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-foreground/40">
                    {asset.mime_type ?? "file"}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm">{asset.filename}</p>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => copyUrl(asset.public_url)} className="text-xs text-primary">
                    Copy URL
                  </button>
                  <button type="button" onClick={() => handleDelete(asset.id)} className="text-xs text-red-400/80">
                    Delete
                  </button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
