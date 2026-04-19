import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guests } from "@/lib/schema";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { reminderEmail } from "@/lib/email-templates";
import { eq, and } from "drizzle-orm";

const EVENT_DATE_FORMATTED = "01 de Maio de 2026";

function diffDays(eventDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(`${eventDate}T00:00:00`);
  event.setHours(0, 0, 0, 0);
  return Math.round((event.getTime() - today.getTime()) / 86_400_000);
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attendees = await db
    .select()
    .from(guests)
    .where(eq(guests.willAttend, true));

  const results = { sent: 0, skipped: 0 };
  const resend = getResend();

  for (const guest of attendees) {
    const days = diffDays(guest.eventDate);

    if (days === 7 && !guest.reminder7Sent) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: guest.email,
        subject: `🗓️ Faltam 7 dias para o Aniversário do Victor!`,
        html: reminderEmail(guest.name, 7, EVENT_DATE_FORMATTED),
      });
      await db
        .update(guests)
        .set({ reminder7Sent: true })
        .where(eq(guests.id, guest.id));
      results.sent++;
    } else if (days === 3 && !guest.reminder3Sent) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: guest.email,
        subject: `🎂 Faltam 3 dias para o Aniversário do Victor!`,
        html: reminderEmail(guest.name, 3, EVENT_DATE_FORMATTED),
      });
      await db
        .update(guests)
        .set({ reminder3Sent: true })
        .where(eq(guests.id, guest.id));
      results.sent++;
    } else if (days === 0 && !guest.reminderDaySent) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: guest.email,
        subject: `🥳 É hoje! Aniversário do Victor!`,
        html: reminderEmail(guest.name, 0, EVENT_DATE_FORMATTED),
      });
      await db
        .update(guests)
        .set({ reminderDaySent: true })
        .where(and(eq(guests.id, guest.id)));
      results.sent++;
    } else {
      results.skipped++;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
