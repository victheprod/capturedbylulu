import { getPublicBlockedDates } from "@/lib/cms/availability";

export async function GET() {
  const dates = await getPublicBlockedDates();
  return Response.json({ dates });
}
