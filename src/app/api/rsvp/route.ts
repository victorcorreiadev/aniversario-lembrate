import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guests } from "@/lib/schema";
import { rsvpSchema } from "@/lib/validations";
import { getResend, FROM_EMAIL, OWNER_EMAIL, EVENT_DATE } from "@/lib/resend";
import {
  confirmationEmail,
  ownerNotificationEmail,
} from "@/lib/email-templates";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, willAttend } = parsed.data;

  const existing = await db
    .select({ id: guests.id })
    .from(guests)
    .where(eq(guests.email, email))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Este email já foi cadastrado." },
      { status: 409 }
    );
  }

  await db.insert(guests).values({
    name,
    email,
    willAttend,
    eventDate: EVENT_DATE,
  });

  const attendingText = willAttend ? "vai comparecer" : "não vai comparecer";

  const resend = getResend();

  await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `🎂 Confirmação recebida — Aniversário do Victor`,
      html: confirmationEmail(name, attendingText),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `🎉 Nova resposta de RSVP: ${name}`,
      html: ownerNotificationEmail(name, email, willAttend),
    }),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
