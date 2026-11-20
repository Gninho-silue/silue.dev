# Security Policy — silue.dev

## Security Checklist

### ✅ Security Headers (`next.config.ts`)

| Header | Value |
|--------|-------|
| `X-DNS-Prefetch-Control` | `on` |
| `X-XSS-Protection` | `1; mode=block` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

### ✅ Dependency Audit

- `npm audit` — **0 vulnerabilities** (last checked: April 2026)
- `audit-ci` configured at `.auditrc.json` — blocks on HIGH and CRITICAL

### ✅ Environment Variables Policy

- No secrets exposed via `NEXT_PUBLIC_` prefix
- `.env.local` is git-ignored — never committed

### ✅ Contact Form Security (`app/api/contact/route.ts`)

- **Rate limiting**: max 3 requests per IP per hour (in-memory Map)
- **Input sanitization**: HTML tags stripped from all fields
- **Field length limits**:
  - `name`: 200 chars max
  - `email`: 254 chars max
  - `subject`: 200 chars max
  - `message`: 2000 chars max
- **Email validation**: regex + format check
- **Generic error messages**: no internal details exposed to client

## Reporting a Vulnerability

Contact: gninninmaguignonsilue@gmail.com
