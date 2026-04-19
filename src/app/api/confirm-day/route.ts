import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guests } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getResend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/resend";
import { ownerDayConfirmationEmail } from "@/lib/email-templates";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const [guest] = await db
    .select()
    .from(guests)
    .where(eq(guests.id, id))
    .limit(1);

  if (!guest) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!guest.confirmedDay) {
    await db
      .update(guests)
      .set({ confirmedDay: true })
      .where(eq(guests.id, id));

    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `🎉 ${guest.name} confirmou presença no dia!`,
      html: ownerDayConfirmationEmail(guest.name, guest.email),
    });
  }

  const redirectUrl = new URL("/confirmado", req.url);
  redirectUrl.searchParams.set("name", guest.name);
  return NextResponse.redirect(redirectUrl);
}
