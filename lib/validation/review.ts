import { getSessionTypes } from "@/data/packages";

export const REVIEW_SESSION_TYPES = [...getSessionTypes(), "Other"];

export type ReviewSubmission = {
  name: string;
  email: string;
  sessionType: string;
  rating: number;
  review: string;
  allowPublish: boolean;
};

export type ReviewFieldErrors = Partial<Record<keyof ReviewSubmission, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REVIEW_MIN_LENGTH = 20;
export const REVIEW_MAX_LENGTH = 2000;

export function validateReview(input: unknown):
  | { success: true; data: ReviewSubmission }
  | { success: false; errors: ReviewFieldErrors; message: string } {
  const raw = (input ?? {}) as Record<string, unknown>;
  const text = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: ReviewSubmission = {
    name: text("name"),
    email: text("email"),
    sessionType: text("sessionType"),
    rating: Number(raw.rating),
    review: text("review"),
    allowPublish: raw.allowPublish === true,
  };

  const errors: ReviewFieldErrors = {};
  if (data.name.length < 2 || data.name.length > 80) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.sessionType && !REVIEW_SESSION_TYPES.includes(data.sessionType)) {
    errors.sessionType = "Please choose a session type from the list.";
  }
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.rating = "Please choose a rating from 1 to 5.";
  }
  if (data.review.length < REVIEW_MIN_LENGTH) {
    errors.review = `Please write at least ${REVIEW_MIN_LENGTH} characters.`;
  } else if (data.review.length > REVIEW_MAX_LENGTH) {
    errors.review = `Please keep it under ${REVIEW_MAX_LENGTH} characters.`;
  }

  if (Object.keys(errors).length) {
    return { success: false, errors, message: "Please check the highlighted fields." };
  }
  return { success: true, data };
}
