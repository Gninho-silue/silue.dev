# silue.dev — Personal Website

> Portfolio of **Gninninmaguignon Silué**, Backend-First Full-Stack Engineer (Java / Spring Boot, React).
> Bilingual (FR/EN) · Dark/Light mode · Content in data files · CI on every push

🌐 **Live:** [silue-dev.vercel.app](https://silue-dev.vercel.app)

---

## ✨ Features

- 🌍 **Bilingual**: French and English, instant switch, no page reload, choice saved in `localStorage`
- 🌗 **Dark / Light mode**: follows the system preference, toggle in the navbar
- 📊 **Data-driven**: projects, skills, experience and recommendations live in `content/`, all text in `messages/`
- 🖼️ **Project cards**: one format for every project, screenshot on top, "private code" badge when the source can't be public
- 📧 **Contact form**: Resend API, validated on client and server, rate limited, HTML + plain-text email
- 📈 **Analytics**: Vercel Analytics and Speed Insights, hidden dashboard at `/admin/stats`
- 🔒 **Security headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- ♿ **Accessible**: semantic HTML, visible keyboard focus, WCAG AA contrast, `prefers-reduced-motion` respected
- 📱 **Responsive**: checked at 1920, 1366 and 390 px wide

---

## 🗂️ Sections

| Section             | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| **Hero**            | Name, rotating title, tagline, key facts (internships, tests, certification) |
| **About**           | Short bio, fact pills, profile card, CV download (FR / EN)                  |
| **Stack**           | Core skills, other skills by category, terminal block                       |
| **Projects**        | Uniform cards: screenshot, year, description, stack tags, Code / Demo links |
| **Experience**      | Timeline, education, certifications with verification links                 |
| **Recommendations** | Verbatim excerpts from recommendation letters                               |
| **Contact**         | Form (Resend) and direct links                                              |

---

## 🎨 Design

- **Palette**: near-black with a blue tint (`#0d1117`), cards one step lighter (`#151b23`), blue-grey secondary text. One accent, amber `#F59E0B`, used for primary buttons, the active nav item and links. All colors are CSS variables in `app/globals.css`, with a light theme that stays neutral.
- **Type**: Geist for text and headings, JetBrains Mono for labels, stack tags and the terminal block.
- **Motion**: short fades only; disabled when the OS asks for reduced motion.

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | Next.js 16 (App Router), React 19 |
| Language   | TypeScript (strict)               |
| Styling    | Tailwind CSS 4                    |
| Animations | Framer Motion                     |
| i18n       | next-intl                         |
| Dark/Light | next-themes                       |
| Contact    | Resend API                        |
| Analytics  | Vercel Analytics + Speed Insights |
| Deployment | Vercel                            |
| CI         | GitHub Actions                    |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A [Resend API key](https://resend.com) (free tier: 100 emails/day)

### Installation

```bash
git clone https://github.com/Gninho-silue/silue.dev.git
cd silue.dev
npm install
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local`:

```bash
# Required: contact form
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Required: hidden analytics dashboard
ADMIN_PASSWORD=your_secret_password

# Optional: live data in the dashboard (Vercel API)
VERCEL_API_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev      # http://localhost:3000
npm run lint
npm run build    # stop `npm run dev` first: both write to .next/
```

---

## 📦 How to Update Content

Data lives in `content/`, text in `messages/fr.json` and `messages/en.json`. Every key must exist in **both** files.

### ➕ Add a project

1. Add an entry to `content/projects.ts`:

```ts
{
  id: 'my-new-project',
  titleKey: 'projects.myNewProject.title',
  descriptionKey: 'projects.myNewProject.description',
  stack: ['Spring Boot', 'React', 'PostgreSQL'],   // first 4 are shown, then "+N"
  github: 'https://github.com/Gninho-silue/my-new-project',
  live: 'https://my-new-project.vercel.app',      // optional
  // privateCode: 'client' | 'personalData',      // instead of github when the code is private
  featured: false,                                // featured projects are listed first
  image: '/projects/my-new-project.png',
  // imageFit: 'contain',                          // show the whole image if it is far from 2:1
  // imageZoom: true,                              // click opens the image full size (diagrams)
  category: 'fullstack',                          // fullstack | mobile | ai | devops | saas
  year: 2026,
}
```

2. Add the screenshot to `public/projects/`. The card frame is **2:1**: a 1920×960 capture fits without cropping.
3. Add the texts (the key is the `id` in camelCase):

```json
"projects": {
  "myNewProject": {
    "title": "My New Project",
    "description": "Two lines are shown in the card; the full text appears on hover."
  }
}
```

### ➕ Add a skill

Edit `content/skills.ts`. Only list what a repo or an internship proves.

```ts
{ name: 'My Skill', category: 'backend' }              // "also work with"
{ name: 'My Core Skill', category: 'backend', core: true } // "core expertise"
```

Categories: `backend` | `frontend` | `devops` | `ai` | `tools`

### ➕ Add an experience

Edit `content/experience.ts`, then add `experience.<companySlug>.role` and `.description` to both message files:

```ts
{
  id: 'company-slug',
  company: 'Company Name',
  roleKey: 'experience.companySlug.role',
  descriptionKey: 'experience.companySlug.description',
  startDate: '2026-09',
  endDate: null,          // null while it is ongoing
  current: true,
  location: 'Casablanca, Maroc',
  remote: false,
  stack: ['Java', 'Spring Boot'],
}
```

---

## 📁 Project Structure

```
silue.dev/
├── app/
│   ├── page.tsx                 # Single page, all sections
│   ├── layout.tsx               # Fonts, theme provider, SEO metadata
│   ├── globals.css              # Design tokens (CSS variables), base styles
│   ├── sitemap.ts
│   ├── admin/stats/             # Hidden analytics dashboard
│   └── api/contact/route.ts     # Contact form API + email template
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── sections/                # Hero, About, Stack, Projects, Experience, Testimonials, Contact
│   ├── ui/                      # ThemeToggle, LanguageToggle, CVDownloadDropdown, ProfilePhoto…
│   └── providers/               # Locale + next-intl + reduced-motion config
├── content/                     # ← projects, skills, experience, testimonials, personal info
├── messages/                    # fr.json, en.json
├── hooks/useScrollSpy.ts        # Active section in the navbar
└── public/
    ├── projects/                # Project screenshots (2:1)
    ├── cv-silue-fr.pdf
    ├── cv-silue-en.pdf
    └── og-image.png             # Link preview (1200×630)
```

---

## 🌿 Git Workflow

GitHub Flow with Conventional Commits. Work happens on a branch; each push gets a Vercel preview, and `main` is only updated by merging a reviewed branch.

```
feat:     new section or feature
fix:      bug fix
style:    visual change only
content:  projects / skills / experience data
docs:     README or CLAUDE.md
chore:    config, tooling, CI
security: security-related change
```

---

## 🔒 Security

- **Headers** (`next.config.ts`): HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Contact form**: 3 requests per IP per hour, HTML stripped and escaped, length limits, validated server-side
- **Admin page**: server-side password check, redirects to `/` when wrong, `/admin/` disallowed in `robots.txt`
- **Secrets**: only server-side env vars (no `NEXT_PUBLIC_` secret is read by the code)

See [SECURITY.md](./SECURITY.md) for details.

---

## 📊 Analytics

Vercel Analytics: no cookies, GDPR friendly. Enable it in the Vercel project (**Analytics** and **Speed Insights** tabs).

Hidden dashboard: `https://silue-dev.vercel.app/admin/stats?password=YOUR_PASSWORD`

---

## 🚢 Deployment

Vercel builds every branch:

```
Push to a branch   →  CI (lint, type check, build) + Vercel preview URL
Merge into main    →  Production deployment
```

Rollback: in Vercel, **Promote to Production** on the previous deployment.

---

## 👤 Author

**Gninninmaguignon Silué**, Backend-First Full-Stack Engineer

|              |                                                                        |
| ------------ | ---------------------------------------------------------------------- |
| 🌐 Website   | [silue-dev.vercel.app](https://silue-dev.vercel.app)                   |
| 💼 LinkedIn  | [linkedin.com/in/gninema-silue](https://linkedin.com/in/gninema-silue) |
| 🐙 GitHub    | [github.com/Gninho-silue](https://github.com/Gninho-silue)             |
| 📧 Email     | gninninmaguignonsilue@gmail.com                                        |
| 📍 Location  | Casablanca, Morocco: on-site, hybrid or remote                         |
| 📅 Available | Now                                                                    |

---

## 📄 License

MIT

---

_"Code with logic, build with purpose, learn with curiosity."_
