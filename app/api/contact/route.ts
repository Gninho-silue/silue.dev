import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ─── Rate limiting ─────────────────────────────────────────────────────────────
// Simple in-memory store: ip → { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ─── Sanitization ─────────────────────────────────────────────────────────────

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

// ─── Field limits ─────────────────────────────────────────────────────────────

const LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 2000,
};

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
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > LIMITS.name) return false;
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > LIMITS.email) return false;
  if (typeof subject !== 'string' || subject.trim().length === 0 || subject.length > LIMITS.subject) return false;
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > LIMITS.message) return false;
  return true;
}

// ─── Email template ───────────────────────────────────────────────────────────
// Same palette as the site (app/globals.css, dark theme). Email clients ignore
// CSS variables and web fonts, so colors are inlined and fonts are system stacks.

const SITE_URL = 'https://silue-dev.vercel.app';
const C = {
  bg: '#0d1117',
  card: '#151b23',
  inset: '#0d1117',
  border: '#262f3b',
  text: '#e6edf3',
  secondary: '#9aa6b6',
  muted: '#7a8698',
  accent: '#F59E0B',
  onAccent: '#0d1117',
};
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace";

function buildHtml({ name, email, subject, message }: ContactPayload): string {
  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Casablanca',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const safe = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const label = (text: string) =>
    `<p style="margin:0 0 8px;font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.secondary};">${text}</p>`;

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Nouveau message de ${safe(name)}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 16px 8px !important; }
      .pad { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${SANS};">
  <!-- Preheader: shown in the inbox list, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safe(name)} : ${safe(subject)}</div>

  <table role="presentation" class="wrapper" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${C.card};border:1px solid ${C.border};border-radius:12px;">

          <!-- Header -->
          <tr>
            <td class="pad" style="padding:22px 32px;border-bottom:1px solid ${C.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <a href="${SITE_URL}" target="_blank" style="text-decoration:none;font-family:${MONO};font-size:16px;font-weight:700;">
                      <span style="color:${C.accent};">&lt;/&gt;</span>&nbsp;<span style="color:${C.text};">Silué</span>
                    </a>
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.secondary};">
                    // contact
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="pad" style="padding:28px 32px;">

              <h1 style="margin:0 0 24px;font-family:${SANS};font-size:20px;line-height:1.3;font-weight:600;color:${C.text};">${safe(subject)}</h1>

              ${label('De')}
              <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:${C.text};">${safe(name)}</p>
              <p style="margin:0 0 24px;font-size:14px;"><a href="mailto:${safe(email)}" style="color:${C.secondary};text-decoration:underline;">${safe(email)}</a></p>

              ${label('Message')}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:${C.inset};border:1px solid ${C.border};border-radius:8px;padding:16px 18px;">
                    <p style="margin:0;font-size:15px;line-height:1.6;color:${C.text};white-space:pre-wrap;word-break:break-word;">${safe(message)}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${C.accent};border-radius:8px;">
                    <a href="${replyHref}" style="display:inline-block;padding:11px 20px;font-family:${SANS};font-size:14px;font-weight:600;color:${C.onAccent};text-decoration:none;">Répondre à ${safe(name)}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="pad" style="padding:16px 32px 20px;border-top:1px solid ${C.border};">
              <p style="margin:0;font-size:12px;line-height:1.5;color:${C.muted};">
                Reçu le ${date} via le formulaire de <a href="${SITE_URL}" target="_blank" style="color:${C.muted};">silue-dev.vercel.app</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function buildText({ name, email, subject, message }: ContactPayload): string {
  return `Nouveau message via ${SITE_URL}\n\nDe : ${name} <${email}>\nSujet : ${subject}\n\n${message}\n`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Validate
  if (!validate(body)) {
    return NextResponse.json(
      { error: 'Missing or invalid fields.' },
      { status: 400 },
    );
  }

  // Sanitize
  const payload: ContactPayload = {
    name: stripHtml((body as ContactPayload).name).slice(0, LIMITS.name),
    email: stripHtml((body as ContactPayload).email).slice(0, LIMITS.email),
    subject: stripHtml((body as ContactPayload).subject).slice(0, LIMITS.subject),
    message: stripHtml((body as ContactPayload).message).slice(0, LIMITS.message),
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    // Resend reports API failures in the result, it does not throw.
    const { error } = await resend.emails.send({
      from: 'Portfolio Silué <onboarding@resend.dev>',
      to: 'gninninmaguignonsilue@gmail.com',
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject} (${payload.name})`,
      html: buildHtml(payload),
      text: buildText(payload),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
