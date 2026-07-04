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

    if (isSupabaseConfigured()) {
      const available = await checkDateAvailability(inquiry.preferredDate);
      if (!available) {
        return Response.json(
          {
            success: false,
            message: "That date is unavailable. Please choose another date.",
            errors: {
              preferredDate: "This date is not available for booking.",
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
    } else {
      console.log("\n========== CapturedByLulu Booking Inquiry ==========");
      console.log("Received at:", new Date().toISOString());
      console.log("Name:", inquiry.name);
      console.log("Email:", inquiry.email);
      console.log("Phone:", inquiry.phone);
      console.log("Session type:", inquiry.sessionType);
      console.log("Package:", inquiry.package);
      console.log("Preferred date:", inquiry.preferredDate);
      console.log("Location:", inquiry.location || "(not provided)");
      console.log("Message:", inquiry.message);
      console.log("Notify:", siteConfig.email);
      console.log("====================================================\n");
    }

    return Response.json({
      success: true,
      message:
        "Your inquiry was received. Lulu will personally respond within 24–48 hours.",
    });
  } catch {
    return Response.json(
      {
        success: false,
        message:
          "Something went wrong on our end. Please try again or email Lulu directly.",
      },
      { status: 500 },
    );
  }
}
