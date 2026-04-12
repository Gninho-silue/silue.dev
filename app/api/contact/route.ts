import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false;
  const { name, email, subject, message } = body as Record<string, unknown>;
  if (typeof name !== 'string' || name.trim().length === 0) return false;
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) return false;
  if (typeof subject !== 'string' || subject.trim().length === 0) return false;
  if (typeof message !== 'string' || message.trim().length === 0) return false;
  return true;
}

// ─── Email template ───────────────────────────────────────────────────────────

function buildHtml({ name, email, subject, message }: ContactPayload): string {
  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Casablanca',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const safe = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouveau message — silue.dev</title>
</head>
<body style="margin:0;padding:0;background:#060B18;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060B18;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0D1526;border:1px solid #1E2D4A;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2453D3,#00D4FF);padding:32px 36px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                silue.dev
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">
                Nouveau message via le formulaire de contact
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">

              <!-- Meta row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 14px;background:#060B18;border:1px solid #1E2D4A;border-radius:10px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:0.08em;font-family:monospace;">De</p>
                    <p style="margin:0;font-size:15px;color:#E2E8F0;font-weight:600;">${safe(name)}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#00D4FF;">
                      <a href="mailto:${safe(email)}" style="color:#00D4FF;text-decoration:none;">${safe(email)}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <p style="margin:0 0 6px;font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:0.08em;font-family:monospace;">Sujet</p>
              <p style="margin:0 0 24px;font-size:17px;color:#E2E8F0;font-weight:600;">${safe(subject)}</p>

              <!-- Message -->
              <p style="margin:0 0 10px;font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:0.08em;font-family:monospace;">Message</p>
              <div style="background:#060B18;border:1px solid #1E2D4A;border-radius:10px;padding:18px 20px;">
                <p style="margin:0;font-size:14px;color:#CBD5E1;line-height:1.75;white-space:pre-wrap;">${safe(message)}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px 28px;border-top:1px solid #1E2D4A;">
              <p style="margin:0;font-size:11px;color:#64748B;font-family:monospace;">
                Reçu le ${date} — via silue.dev
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: 'Missing or invalid fields: name, email, subject and message are required.' },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = body;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Contact silue.dev <onboarding@resend.dev>',
      to: 'gninninmaguignonsilue@gmail.com',
      replyTo: email.trim(),
      subject: `[silue.dev] ${subject.trim()} — from ${name.trim()}`,
      html: buildHtml({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }
}
