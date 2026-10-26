import type { BookingInquiry } from "@/lib/validation/booking";
import { sendOwnerEmail } from "@/lib/email/resend";

function formatInquiryText(inquiry: BookingInquiry) {
  return [
    "New CapturedByLulu estimate / quote request",
    "",
    "This is not a confirmed booking. Reply to finalize details with the client.",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Session type: ${inquiry.sessionType}`,
    `Package / quote interest: ${inquiry.package}`,
    `Preferred date: ${inquiry.preferredDate}`,
    `Location: ${inquiry.location || "(not provided)"}`,
    "",
    "Message:",
    inquiry.message || "(none)",
  ].join("\n");
}

/** Sends estimate/quote request to the owner's inbox when Resend is configured. */
export function sendInquiryNotification(inquiry: BookingInquiry): Promise<boolean> {
  return sendOwnerEmail({
    subject: `Estimate request — ${inquiry.name} (${inquiry.sessionType})`,
    text: formatInquiryText(inquiry),
    replyTo: inquiry.email,
    tag: "inquiry-notification",
  });
}
