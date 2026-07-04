import {
  getSessionTypes,
  NOT_SURE_PACKAGE,
} from "@/data/packages";

export type BookingInquiry = {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  package: string;
  preferredDate: string;
  location: string;
  message: string;
};

export type BookingFieldErrors = Partial<Record<keyof BookingInquiry, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_TYPES = [...getSessionTypes(), "Other / Not sure"];

function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime());
}

function isFutureOrToday(value: string): boolean {
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
}

function validateSessionAndPackage(
  sessionType: string,
  pkg: string,
  errors: BookingFieldErrors,
) {
  if (!sessionType || !SESSION_TYPES.includes(sessionType)) {
    errors.sessionType = "Please select a session type.";
  }

  if (!pkg) {
    errors.package = "Please select a package.";
  } else if (
    sessionType &&
    sessionType !== "Other / Not sure" &&
    pkg !== NOT_SURE_PACKAGE &&
    !pkg.startsWith(`${sessionType} —`)
  ) {
    errors.package = "Please choose a package that matches your session type.";
  }
}

function validateContactFields(
  name: string,
  email: string,
  phone: string,
  errors: BookingFieldErrors,
) {
  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (countDigits(phone) < 10) {
    errors.phone = "Please enter a valid phone number.";
  }
}

function validateSessionDetails(
  preferredDate: string,
  message: string,
  errors: BookingFieldErrors,
) {
  if (!preferredDate) {
    errors.preferredDate = "Please select your preferred date.";
  } else if (!isValidDateString(preferredDate)) {
    errors.preferredDate = "Please enter a valid date.";
  } else if (!isFutureOrToday(preferredDate)) {
    errors.preferredDate = "Preferred date must be today or in the future.";
  }

  if (message.length < 10) {
    errors.message =
      "Please share a few details about your vision (10+ characters).";
  }
}

export function validateBookingStep(
  step: number,
  input: Partial<BookingInquiry>,
):
  | { success: true }
  | { success: false; errors: BookingFieldErrors; message: string } {
  const errors: BookingFieldErrors = {};
  const sessionType = input.sessionType?.trim() ?? "";
  const pkg = input.package?.trim() ?? "";
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const preferredDate = input.preferredDate?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (step === 1) {
    validateSessionAndPackage(sessionType, pkg, errors);
  } else if (step === 2) {
    validateContactFields(name, email, phone, errors);
  } else if (step === 3) {
    validateSessionDetails(preferredDate, message, errors);
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please correct the highlighted fields to continue.",
    };
  }

  return { success: true };
}

export function validateBookingInquiry(
  input: unknown,
):
  | { success: true; data: BookingInquiry }
  | { success: false; errors: BookingFieldErrors; message: string } {
  if (!input || typeof input !== "object") {
    return {
      success: false,
      errors: {},
      message: "Invalid submission. Please try again.",
    };
  }

  const raw = input as Record<string, unknown>;
  const errors: BookingFieldErrors = {};

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const sessionType =
    typeof raw.sessionType === "string" ? raw.sessionType.trim() : "";
  const pkg = typeof raw.package === "string" ? raw.package.trim() : "";
  const preferredDate =
    typeof raw.preferredDate === "string" ? raw.preferredDate.trim() : "";
  const location = typeof raw.location === "string" ? raw.location.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  validateContactFields(name, email, phone, errors);
  validateSessionAndPackage(sessionType, pkg, errors);
  validateSessionDetails(preferredDate, message, errors);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please correct the highlighted fields and try again.",
    };
  }

  return {
    success: true,
    data: {
      name,
      email,
      phone,
      sessionType,
      package: pkg,
      preferredDate,
      location,
      message,
    },
  };
}
