import type { ReviewSubmission } from "@/lib/validation/review";
import { sendOwnerEmail } from "@/lib/email/resend";

export function sendReviewNotification(review: ReviewSubmission): Promise<boolean> {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  const text = [
    "New CapturedByLulu client review",
    "",
    "Nothing has been published. Add it in the admin (Testimonials) if you want it on the site.",
    "",
    `Name: ${review.name}`,
    `Email: ${review.email}`,
    `Session: ${review.sessionType || "(not given)"}`,
    `Rating: ${stars} (${review.rating}/5)`,
    `OK to share publicly: ${review.allowPublish ? "Yes" : "No — keep private"}`,
    "",
    "Review:",
    review.review,
  ].join("\n");

  return sendOwnerEmail({
    subject: `New review — ${review.name} (${review.rating}/5)`,
    text,
    replyTo: review.email,
    tag: "review-notification",
  });
}
