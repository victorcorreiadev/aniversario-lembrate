function base(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aniversário Victor</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e1d8;">
          <!-- Header -->
          <tr>
            <td style="background-color:#8a9a7b;padding:40px 40px 32px;text-align:center;">
              <div style="font-size:48px;margin-bottom:8px;">🎂</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0;letter-spacing:-0.5px;">Aniversário do Victor</h1>
              <p style="color:rgba(255,255,255,0.85);font-size:15px;margin:8px 0 0;">01 de Maio de 2026</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e1d8;text-align:center;">
              <p style="color:#9ca3af;font-size:13px;margin:0;">Victor Correia · Aniversário 2026</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function confirmationEmail(name: string, attendingText: string): string {
  return base(`
    <p style="color:#1a1a1a;font-size:18px;margin:0 0 16px;font-weight:600;">Oi, ${name}! 👋</p>
    <p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Recebi sua confirmação! Você indicou que <strong style="color:#6a7a5b;">${attendingText}</strong> ao meu aniversário.
    </p>
    ${
      attendingText.includes("vai")
        ? `<div style="background-color:#f5f0e8;border:1px solid #e5e1d8;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#6a7a5b;font-size:14px;font-weight:600;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">📅 Salva na agenda</p>
      <p style="color:#1a1a1a;font-size:16px;font-weight:700;margin:0;">01 de Maio de 2026</p>
    </div>
    <p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0;">
      Vou te mandar um lembrete faltando 7 dias, 3 dias e no dia do evento.
    </p>`
        : `<p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0;">
      Que pena que não vai conseguir! Mas fico feliz que respondeu. Obrigado por me avisar!
    </p>`
    }
  `);
}

export function ownerNotificationEmail(
  guestName: string,
  guestEmail: string,
  willAttend: boolean
): string {
  const statusColor = willAttend ? "#22c55e" : "#ef4444";
  const statusText = willAttend ? "✅ VAI COMPARECER" : "❌ NÃO VAI COMPARECER";

  return base(`
    <p style="color:#1a1a1a;font-size:16px;margin:0 0 20px;">Nova resposta de RSVP recebida:</p>
    <div style="background-color:#f5f0e8;border:1px solid #e5e1d8;border-radius:12px;padding:24px;margin-bottom:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:12px;">
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Nome</p>
            <p style="color:#1a1a1a;font-size:16px;font-weight:600;margin:0;">${guestName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:12px;">
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Email</p>
            <p style="color:#1a1a1a;font-size:16px;margin:0;">${guestEmail}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Status</p>
            <p style="color:${statusColor};font-size:16px;font-weight:700;margin:0;">${statusText}</p>
          </td>
        </tr>
      </table>
    </div>
  `);
}

export function ownerDayConfirmationEmail(
  guestName: string,
  guestEmail: string
): string {
  return base(`
    <p style="color:#1a1a1a;font-size:16px;margin:0 0 20px;">Confirmação de presença no dia:</p>
    <div style="background-color:#f5f0e8;border:1px solid #e5e1d8;border-radius:12px;padding:24px;margin-bottom:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:12px;">
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Nome</p>
            <p style="color:#1a1a1a;font-size:16px;font-weight:600;margin:0;">${guestName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:12px;">
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Email</p>
            <p style="color:#1a1a1a;font-size:16px;margin:0;">${guestEmail}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;">Status</p>
            <p style="color:#22c55e;font-size:16px;font-weight:700;margin:0;">✅ CONFIRMOU PRESENÇA NO DIA</p>
          </td>
        </tr>
      </table>
    </div>
  `);
}

export function reminderEmail(
  name: string,
  daysLeft: number,
  eventDateFormatted: string,
  guestId?: string
): string {
  const isDayOf = daysLeft === 0;
  const headline = isDayOf
    ? "É hoje! "
    : daysLeft === 1
    ? "Amanhã é o dia! "
    : `Faltam ${daysLeft} dias! `;

  const messageFormatted = isDayOf
    ? `Hoje é o dia do evento! Nos vemos mais tarde, ${name}`
    : `Oi, ${name}! Só passando para lembrar que o aniversário do Victor está chegando. Faltam apenas <strong style="color:#6a7a5b;">${daysLeft} dia${daysLeft > 1 ? "s" : ""}</strong> para o evento!`;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aniversario-lembrate-production.up.railway.app";
  const confirmButton = isDayOf && guestId
    ? `<div style="text-align:center;margin-top:24px;">
      <a href="${appUrl}/api/confirm-day?id=${guestId}" style="display:inline-block;background-color:#8a9a7b;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;">
        Confirmar presença no dia
      </a>
    </div>`
    : "";

  return base(`
    <p style="color:#1a1a1a;font-size:18px;margin:0 0 8px;font-weight:700;">${headline}</p>
    <p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0 0 24px;">${messageFormatted}</p>
    <div style="background-color:#8a9a7b;border-radius:12px;padding:24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.85);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Data do evento</p>
      <p style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">${eventDateFormatted}</p>
    </div>
    ${confirmButton}
  `);
}
