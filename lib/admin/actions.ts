"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/server";
import type { MediaAsset } from "@/lib/types/database";
import * as bookingsDb from "@/lib/db/bookings";
import * as portfolioDb from "@/lib/db/portfolio";
import * as packagesDb from "@/lib/db/packages";
import * as testimonialsDb from "@/lib/db/testimonials";
import * as contentDb from "@/lib/db/content";
import * as availabilityDb from "@/lib/db/availability";
import * as mediaDb from "@/lib/db/media";
import * as settingsDb from "@/lib/db/settings";

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/portfolio");
  revalidatePath("/services");
  revalidatePath("/weddings");
  revalidatePath("/brand-photography");
  revalidatePath("/contact");
}

// Bookings
export async function saveBookingAction(
  id: string | null,
  data: Record<string, unknown>,
) {
  await requireAdmin();
  const result = id
    ? await bookingsDb.updateBooking(id, data)
    : await bookingsDb.createBookingFromInquiry(data as never);
  revalidatePath("/admin/bookings");
  revalidatePublic();
  return result;
}

export async function deleteBookingAction(id: string) {
  await requireAdmin();
  await bookingsDb.deleteBooking(id);
  revalidatePath("/admin/bookings");
}

// Portfolio
export async function savePortfolioAction(
  id: string | null,
  data: Record<string, unknown>,
) {
  await requireAdmin();
  const result = id
    ? await portfolioDb.updatePortfolioImage(id, data)
    : await portfolioDb.createPortfolioImage(data as never);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
  return result;
}

export async function deletePortfolioAction(id: string) {
  await requireAdmin();
  await portfolioDb.deletePortfolioImage(id);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
}

export async function reorderPortfolioAction(
  items: { id: string; display_order: number }[],
) {
  await requireAdmin();
  await portfolioDb.reorderPortfolioImages(items);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
}

// Packages
export async function savePackageCategoryAction(data: Record<string, unknown>) {
  await requireAdmin();
  const result = await packagesDb.upsertPackageCategory(data);
  revalidatePath("/admin/packages");
  revalidatePublic();
  return result;
}

export async function savePackageAction(data: Record<string, unknown>) {
  await requireAdmin();
  const result = await packagesDb.upsertPackage(data);
  revalidatePath("/admin/packages");
  revalidatePublic();
  return result;
}

export async function deletePackageAction(id: string) {
  await requireAdmin();
  await packagesDb.deletePackage(id);
  revalidatePath("/admin/packages");
  revalidatePublic();
}

// Testimonials
export async function saveTestimonialAction(data: Record<string, unknown>) {
  await requireAdmin();
  const result = await testimonialsDb.upsertTestimonial(data);
  revalidatePath("/admin/testimonials");
  revalidatePublic();
  return result;
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await testimonialsDb.deleteTestimonial(id);
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}

// Content
export async function saveContentAction(
  key: string,
  value: Record<string, unknown>,
) {
  await requireAdmin();
  const result = await contentDb.upsertSiteContent(key, value);
  revalidatePath("/admin/content");
  revalidatePublic();
  return result;
}

// Availability
export async function saveAvailabilityAction(data: {
  block_date: string;
  block_type: "blocked" | "vacation" | "booked";
  note?: string;
}) {
  await requireAdmin();
  const result = await availabilityDb.upsertAvailabilityBlock(data);
  revalidatePath("/admin/availability");
  revalidatePublic();
  return result;
}

export async function deleteAvailabilityAction(id: string) {
  await requireAdmin();
  await availabilityDb.deleteAvailabilityBlock(id);
  revalidatePath("/admin/availability");
  revalidatePublic();
}

// Media
export async function saveMediaAction(data: Record<string, unknown>) {
  await requireAdmin();
  return mediaDb.createMediaAsset(data as never);
}

export async function deleteMediaAction(id: string) {
  await requireAdmin();
  await mediaDb.deleteMediaAsset(id);
  revalidatePath("/admin/media");
}

export async function uploadFileAction(formData: FormData): Promise<MediaAsset> {
  await requireAdmin();
  const file = formData.get("file") as File;
  const bucket = (formData.get("bucket") as string) || "media";
  if (!file) throw new Error("No file provided");

  const path = `${Date.now()}-${file.name}`;
  const { publicUrl, path: storagePath } = await mediaDb.uploadToStorage(
    bucket as "portfolio" | "media" | "branding",
    path,
    file,
    file.type,
  );

  const asset = await mediaDb.createMediaAsset({
    filename: file.name,
    storage_path: storagePath,
    public_url: publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
  });

  revalidatePath("/admin/media");
  return asset;
}

// Settings
export async function saveSettingAction(
  key: string,
  value: Record<string, unknown>,
) {
  await requireAdmin();
  const result = await settingsDb.upsertSetting(key, value);
  revalidatePath("/admin/settings");
  revalidatePublic();
  return result;
}
