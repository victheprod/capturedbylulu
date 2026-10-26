import { siteConfig } from "@/data/site";
import { sendReviewNotification } from "@/lib/email/review-notification";
import { validateReview } from "@/lib/validation/review";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: real visitors never see or fill this field.
    if (typeof body?.website === "string" && body.website.trim()) {
      return Response.json({ success: true });
    }

    const result = validateReview(body);
    if (!result.success) {
      return Response.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 400 },
      );
    }

    const emailed = await sendReviewNotification(result.data);
    if (!emailed) {
      console.log("\n========== CapturedByLulu Review (not emailed) ==========");
      console.log(JSON.stringify(result.data, null, 2));
      console.log("=========================================================\n");
      return Response.json(
        {
          success: false,
          message: `We couldn't send your review automatically. Please email it to ${siteConfig.email}.`,
        },
        { status: 503 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        success: false,
        message: `Something went wrong on our end. Please email your review to ${siteConfig.email}.`,
      },
      { status: 500 },
    );
  }
}
