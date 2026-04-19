import { readFileSync } from "fs";
import { resolve } from "path";

const envContent = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

import { Resend } from "resend";
import {
  confirmationEmail,
  reminderEmail,
} from "../src/lib/email-templates.ts";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "victorcorreia019va@gmail.com";
const FROM = "Aniversário Victor <onboarding@resend.dev>";
const NAME = "Victor";
const EVENT_DATE_FORMATTED = "01 de Maio de 2026";

async function run() {
  console.log("Enviando emails de teste...\n");

  const jobs = [
    {
      label: "Confirmação (vai comparecer)",
      subject: "🎂 Confirmação recebida — Aniversário do Victor",
      html: confirmationEmail(NAME, "vai comparecer"),
    },
    {
      label: "Lembrete 7 dias",
      subject: "🗓️ Faltam 7 dias para o Aniversário do Victor!",
      html: reminderEmail(NAME, 7, EVENT_DATE_FORMATTED),
    },
    {
      label: "Lembrete 3 dias",
      subject: "🎂 Faltam 3 dias para o Aniversário do Victor!",
      html: reminderEmail(NAME, 3, EVENT_DATE_FORMATTED),
    },
    {
      label: "Lembrete no dia",
      subject: "🥳 É hoje! Aniversário do Victor!",
      html: reminderEmail(NAME, 0, EVENT_DATE_FORMATTED),
    },
  ];

  for (const job of jobs) {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: job.subject,
      html: job.html,
    });

    if (error) {
      console.error(`❌ ${job.label}:`, error.message);
    } else {
      console.log(`✅ ${job.label}: enviado (id: ${data?.id})`);
    }
  }
}

run();
