# AI Kanban Landing Page - Architecture v1

## 1. System Overview
The AI Kanban Landing Page is a high-performance, SEO-optimized marketing site designed to convert visitors into users. It leverages **Next.js 16 (App Router)** and **React Server Components (RSC)** to ensure near-instant load times and excellent search engine visibility.

## 2. Technical Stack
| Layer | Technology | Version | Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | 16.x | App Router for RSC, optimized metadata, and static export capabilities. |
| **Styling** | Tailwind CSS | 4.x | High-performance atomic CSS, consistent with the main application. |
| **Components** | Radix UI | Latest | Accessible, unstyled primitives for complex UI patterns (Accordions, Tabs). |
| **Animation** | Framer Motion | Latest | Smooth entrance animations and scroll-linked interactions. |
| **Icons** | Lucide React | Latest | Lightweight, tree-shakable SVG icon library. |
| **Performance** | Next/Font & Image | - | Built-in optimization for LCP and CLS. |

## 3. Page Structure & Components
The landing page follows a single-page scrolling architecture with a dedicated pricing sub-page.

### 3.1 Directory Structure
```text
src/
├── app/
│   ├── (marketing)/          # Route group for marketing pages
│   │   ├── page.tsx          # Main Landing Page
│   │   ├── pricing/          # Pricing Details Page
│   │   ├── layout.tsx        # Shared layout (Navbar, Footer)
│   │   └── globals.css       # Marketing-specific styling
├── components/
│   ├── marketing/            # Business-specific components
│   │   ├── Hero.tsx          # Hero section with CTA
│   │   ├── Features.tsx      # Feature grid (Bento box style)
│   │   ├── Showcase.tsx      # Product UI preview
│   │   ├── Testimonials.tsx  # User social proof
│   │   └── PricingTable.tsx  # Pricing comparison
│   └── ui/                   # Shared UI primitives (Buttons, Cards)
├── lib/
│   ├── constants/            # Static content storage
│   │   ├── marketing.ts      # Copy, feature lists
│   │   └── pricing.ts        # Pricing tiers and credits
│   └── utils.ts              # Styling and formatting helpers
└── assets/                   # Local optimized images
```

## 4. Data & State Management
- **No Database**: All marketing copy, feature lists, and pricing tiers are stored as static constants in `src/lib/constants/`.
- **Server-First**: 90% of the page is rendered as React Server Components. Interactive elements (e.g., mobile menu, pricing toggle) are isolated in "use client" leaf components.
- **Credit Logic**: Pricing display reflects the Credit-based system defined in `ARCHITECTURE.md` (e.g., $19 for 1,000 Credits).

## 5. Performance & SEO Strategy
- **Static Site Generation (SSG)**: Pre-render all marketing pages at build time.
- **Metadata API**: Dynamic SEO tags, OpenGraph images, and JSON-LD structured data for "SoftwareApplication" type.
- **Image Optimization**: Use `next/image` with `priority` for the Hero screenshot (`assets/a9514bf9-c435-4cc0-84a1-fd0e282b18e8.png`).
- **Zero CLS**: Define explicit dimensions for all media and use `next/font` for local font hosting.

## 6. Implementation Task Breakdown

### Phase 1: Foundation (P0)
- **Task 1.1**: Initialize Next.js 16 project with Tailwind 4.
- **Task 1.2**: Set up shared Layout (Header/Footer) and global typography.
- **Task 1.3**: Configure SEO metadata and robots.txt.

### Phase 2: Core Sections (P1)
- **Task 2.1**: Implement Hero Section with primary CTA and main product screenshot.
- **Task 2.2**: Build Features Grid using Bento-box layout for Agent & Kanban highlights.
- **Task 2.3**: Create Interactive Pricing Table based on static constants.

### Phase 3: Polish & Launch (P2)
- **Task 3.1**: Add scroll entrance animations using Framer Motion.
- **Task 3.2**: Implement Responsive design for mobile and tablet views.
- **Task 3.3**: Final Lighthouse performance audit and asset optimization.

## 7. Acceptance Criteria
1. **Performance**: Google Lighthouse mobile score > 90.
2. **Responsiveness**: Fully functional on viewport widths from 375px to 1920px.
3. **Connectivity**: All "Login" and "Get Started" buttons link correctly to the `/login` or `/dashboard` routes.
4. **Visuals**: Matches the dark-themed, high-tech aesthetic of the AI Kanban application.
