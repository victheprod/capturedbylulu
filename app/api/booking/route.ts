import { sendInquiryNotification } from "@/lib/email/inquiry-notification";
import { checkDateAvailability } from "@/lib/cms/availability";
import { siteConfig } from "@/data/site";
import { validateBookingInquiry } from "@/lib/validation/booking";
import { createBookingFromInquiry } from "@/lib/db/bookings";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateBookingInquiry(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: result.message,
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    const inquiry = result.data;
    let savedToCms = false;

    if (isSupabaseConfigured()) {
      const available = await checkDateAvailability(inquiry.preferredDate);
      if (!available) {
        return Response.json(
          {
            success: false,
            message:
              "That date looks unavailable. Choose another date, or request a custom quotation and Lulu will advise.",
            errors: {
              preferredDate: "This date is not available for an estimate request.",
            },
          },
          { status: 400 },
        );
      }

      await createBookingFromInquiry({
        client_name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        session_type: inquiry.sessionType,
        package: inquiry.package,
        preferred_date: inquiry.preferredDate,
        location: inquiry.location,
        message: inquiry.message,
      });
      savedToCms = true;
    } else {
      console.log("\n========== CapturedByLulu Estimate Request ==========");
      console.log("Received at:", new Date().toISOString());
      console.log("Name:", inquiry.name);
      console.log("Email:", inquiry.email);
      console.log("Phone:", inquiry.phone);
      console.log("Session type:", inquiry.sessionType);
      console.log("Package / quote:", inquiry.package);
      console.log("Preferred date:", inquiry.preferredDate);
      console.log("Location:", inquiry.location || "(not provided)");
      console.log("Message:", inquiry.message);
      console.log("Notify owner:", siteConfig.email);
      console.log("=====================================================\n");
    }

    const emailed = await sendInquiryNotification(inquiry);

    if (!emailed && !savedToCms) {
      return Response.json(
        {
          success: false,
          message: `We couldn't send your estimate request automatically. Please email ${siteConfig.email} directly and Lulu will follow up.`,
        },
        { status: 503 },
      );
    }

    if (!emailed && savedToCms) {
      console.warn(
        "[booking] Estimate saved to CMS but owner email notification failed.",
        { email: inquiry.email, package: inquiry.package },
      );
    }

    return Response.json({
      success: true,
      message:
        "Your estimate request was sent to Lulu. This is not a booking — Lulu will reply by email with a custom quotation and next steps within 24–48 hours.",
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: `Something went wrong on our end. Please email ${siteConfig.email} directly.`,
      },
      { status: 500 },
    );
  }
}
