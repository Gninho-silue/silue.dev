# silue.dev — Personal Website

> Professional portfolio & personal website of **Gninninmaguignon Silué** — Full-Stack Developer.  
> Bilingual (FR/EN) · Dark/Light mode · Production-grade · CI/CD automated

🌐 **Live:** [silue-dev.vercel.app](https://silue-dev.vercel.app)

---

## ✨ Features

- 🌍 **Bilingual** — French & English, instant switch, no page reload
- 🌗 **Dark / Light mode** — smooth transition, system preference detected
- 🖱️ **Custom cursor** — animated circle following the mouse
- 📊 **Data-driven** — add projects, skills or experience by editing one file
- 📧 **Contact form** — powered by Resend API with rate limiting
- 📈 **Analytics** — Vercel Analytics (hidden dashboard at `/admin/stats`)
- 🔒 **Security hardened** — security headers, input sanitization, server-side secrets
- ♿ **Accessible** — semantic HTML, keyboard navigable
- 📱 **Mobile-first** — fully responsive on all devices
- ⚡ **Performance** — Lighthouse 90+ on all metrics

---

## 🗂️ Sections

| Section        | Description                                               |
| -------------- | --------------------------------------------------------- |
| **Hero**       | Name, animated title, availability badge, stats           |
| **About**      | Story, philosophy pills, info card                        |
| **Stack**      | Core expertise with progress bars + tech tags by category |
| **Projects**   | Featured project + grid with 3D tilt cards                |
| **Experience** | Animated timeline + education + certifications            |
| **Contact**    | Form with Resend API + social links                       |

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | Next.js 14 (App Router)           |
| Language   | TypeScript (strict)               |
| Styling    | Tailwind CSS                      |
| Animations | Framer Motion                     |
| i18n       | next-intl                         |
| Dark/Light | next-themes                       |
| Contact    | Resend API                        |
| Analytics  | Vercel Analytics + Speed Insights |
| Deployment | Vercel                            |
| CI/CD      | GitHub Actions                    |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Resend API key](https://resend.com) (free — 100 emails/day)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Gninho-silue/silue.dev.git
cd silue.dev

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local`:

```bash
# Required — get it free at resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Required — for hidden analytics dashboard
ADMIN_PASSWORD=your_secret_password

# Optional — Vercel Analytics API (for live dashboard data)
VERCEL_API_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
# → http://localhost:3000
```

---

## 📦 How to Update Content

Everything lives in the `content/` folder — **no need to touch components**.

### ➕ Add a new project

Edit `content/projects.ts`:

```ts
{
  id: "my-new-project",
  titleKey: "projects.myNewProject.title",
  descriptionKey: "projects.myNewProject.description",
  stack: ["React", "Node.js", "PostgreSQL"],
  github: "https://github.com/Gninho-silue/my-new-project",
  live: "https://my-new-project.vercel.app",
  featured: false,
  image: "/projects/my-new-project.png",
  category: "fullstack"
}
```

Then add translations in `messages/fr.json` and `messages/en.json`:

```json
{
  "projects": {
    "myNewProject": {
      "title": "Mon Projet",
      "description": "Description..."
    }
  }
}
```

### ➕ Add a new skill

Edit `content/skills.ts`:

```ts
{ name: "My Skill", level: 75, category: "backend" }
```

Categories: `backend` | `frontend` | `devops` | `database` | `mobile` | `ai`

### ➕ Add a new experience

Edit `content/experience.ts`:

```ts
{
  id: "company-slug",
  company: "Company Name",
  roleKey: "experience.companySlug.role",
  descriptionKey: "experience.companySlug.description",
  startDate: "2026-07",
  endDate: null,
  current: true,
  location: "Casablanca, Maroc",
  remote: true,
  stack: ["Java", "Spring Boot"]
}
```

---

## 📁 Project Structure

```
silue.dev/
├── app/
│   ├── page.tsx                    # Main page — all sections
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── globals.css                 # CSS variables, cursor, base
│   ├── admin/stats/                # Hidden analytics dashboard
│   └── api/contact/                # Contact form API route
├── components/
│   ├── layout/                     # Navbar, Footer
│   ├── sections/                   # Hero, About, Stack, Projects, Experience, Contact
│   └── ui/                         # CustomCursor, ThemeToggle, LanguageToggle
├── content/                        # ← UPDATE THIS to add projects/skills/experience
│   ├── projects.ts
│   ├── experience.ts
│   ├── skills.ts
│   └── personal.ts
├── messages/
│   ├── fr.json                     # French translations
│   └── en.json                     # English translations
├── hooks/
│   ├── useScrollSpy.ts
│   └── useTilt.ts
└── public/
    ├── projects/                   # Project screenshots
    └── cv-silue.pdf                # Downloadable CV
```

---

## 🌿 Git Workflow

This project follows **GitHub Flow** with Conventional Commits.  
Every feature is developed on its own branch and merged via Pull Request.  
Direct commits to `main` are not allowed.

```
main                        # Production — always deployable
  └── feat/hero-section
  └── feat/about-section
  └── feat/stack-section
  └── feat/projects-section
  └── feat/experience-timeline
  └── feat/contact-form
  └── feat/analytics-dashboard
  └── chore/security-audit
  └── chore/seo-metadata
  └── chore/ci-cd
```

**Commit convention:**

```
feat: add new section or feature
fix: bug fix
chore: config, tooling, CI/CD
docs: README or CLAUDE.md
refactor: code change, no feature
content: update projects/skills/experience data
security: security-related changes
```

---

## 🔒 Security

- **Security headers** — X-Frame-Options, HSTS, XSS Protection, CSP
- **Admin page** — password protected, server-side only, `noindex`
- **Contact form** — rate limited (3 req/IP/hour), input sanitized
- **No secrets in client** — all env vars without `NEXT_PUBLIC_` stay server-side
- **robots.txt** — `/admin/` blocked from indexing

See [SECURITY.md](./SECURITY.md) for full details.

---

## 📊 Analytics

Powered by **Vercel Analytics** — no cookies, GDPR compliant, free.

**Hidden dashboard:** `https://silue-dev.vercel.app/admin/stats?password=YOUR_PASSWORD`

Enable in Vercel:

- Project → **Analytics** tab → Enable
- Project → **Speed Insights** tab → Enable

---

## 🚢 Deployment

Deployed on **Vercel** with automated CI/CD via GitHub Actions.

```
Push to feature branch  →  CI: lint + typecheck + build ✅
Merge to main           →  Auto deploy to production 🚀
```

### Manual deploy

```bash
npx vercel --prod
```

### GitHub Secrets required

| Secret              | Description                         |
| ------------------- | ----------------------------------- |
| `VERCEL_TOKEN`      | From vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID`     | From `.vercel/project.json`         |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json`         |
| `RESEND_API_KEY`    | From resend.com                     |
| `ADMIN_PASSWORD`    | Your chosen admin password          |

---

## 👤 Author

**Gninninmaguignon Silué** — Full-Stack Developer

|              |                                                                        |
| ------------ | ---------------------------------------------------------------------- |
| 🌐 Website   | [silue-dev.vercel.app](https://silue-dev.vercel.app)                   |
| 💼 LinkedIn  | [linkedin.com/in/gninema-silue](https://linkedin.com/in/gninema-silue) |
| 🐙 GitHub    | [github.com/Gninho-silue](https://github.com/Gninho-silue)             |
| 🚀 DevScope  | [devscope-lake.vercel.app](https://devscope-lake.vercel.app)           |
| 📧 Email     | gninninmaguignonsilue@gmail.com                                        |
| 📍 Location  | Casablanca, Maroc — Open to Remote                                     |
| 📅 Available | July 2026                                                              |

---

## 📄 License

MIT — free to use, fork, and build upon.

---

_"Code with logic, build with purpose, learn with curiosity."_
