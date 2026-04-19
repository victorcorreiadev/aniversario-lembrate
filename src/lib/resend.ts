import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const FROM_EMAIL = "Aniversário Victor <noreply@victorcorreia.dev>";
export const OWNER_EMAIL = process.env.OWNER_EMAIL!;
export const EVENT_DATE = process.env.BIRTHDAY_DATE ?? "2026-05-01";
