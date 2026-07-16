# Imperial Estates — Luxury Real Estate Website

A world-class, premium Real Estate website for **Imperial Estates**, a Lahore-based luxury real estate company. Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.

## Quick Start

```bash
# 1. Install dependencies
bun install
# or: npm install

# 2. Start the dev server
bun run dev
# or: npm run dev

# 3. Open http://localhost:3000
```

> Requires Node.js 18+ and Bun (recommended) or npm.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — 16 premium sections |
| `/properties` | Property listing with filters |
| `/properties/[slug]` | Property detail (gallery, specs, mortgage calc) |
| `/agents` | Agents listing |
| `/agents/[slug]` | Agent profile |
| `/blog` | Blog listing with search |
| `/blog/[slug]` | Blog post |
| `/buy` | Buy process guide |
| `/sell` | Sell process + valuation form |
| `/invest` | Investment opportunities + ROI calculator |
| `/about` | Company story & timeline |
| `/services` | 6 services + FAQ |
| `/contact` | Contact form + map |

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Animation**: Framer Motion
- **Fonts**: Space Grotesk + Inter
- **ORM**: Prisma (SQLite)
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── about/            # About page
│   ├── agents/           # Agents listing + [slug] detail
│   ├── blog/             # Blog listing + [slug] detail
│   ├── buy/              # Buy page
│   ├── contact/          # Contact page
│   ├── invest/           # Investment page
│   ├── properties/       # Properties listing + [slug] detail
│   ├── sell/             # Sell page
│   ├── services/         # Services page
│   ├── api/contact/      # Contact form API
│   ├── globals.css       # Luxury design system
│   ├── layout.tsx        # Root layout + fonts
│   ├── not-found.tsx     # Custom 404
│   └── page.tsx          # Homepage
├── components/
│   ├── real-estate/      # 20+ section components
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── real-estate-data.ts  # All site content
│   ├── db.ts                # Prisma client
│   └── utils.ts             # cn() helper
└── hooks/
    ├── use-mobile.ts
    └── use-toast.ts
```

## Design System

- **Colors**: Bright white background + royal blue / emerald green / gold accents
- **Typography**: Space Grotesk (headings) + Inter (body)
- **Effects**: Glassmorphism, premium shadows, gradient text, animated buttons
- **Animations**: Framer Motion (scroll reveals, layout transitions, parallax)

## Commands

```bash
bun run dev      # Start dev server (port 3000)
bun run build    # Production build
bun run lint     # ESLint check
bun run db:push  # Push Prisma schema to SQLite
```
