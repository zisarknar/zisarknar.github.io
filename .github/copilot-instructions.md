# Copilot Instructions for zisarknar-portfolio

## Project Overview
Personal portfolio website showcasing professional work, built with modern web technologies and deployed to `zisarknar.dev`. This is a **static-first**, **type-safe** Next.js application prioritizing clean code, performance, and maintainability.

## Tech Stack
- **Next.js 14** (App Router) - Static export configuration
- **TypeScript 5** - Strict type checking enabled
- **Tailwind CSS 3** - Utility-first styling
- **React 18** - Functional components only

## Architecture Principles

### Static Export Philosophy
This is a **purely static site** - no server-side runtime:
- `next.config.js`: `output: "export"` generates static HTML to `out/`
- `images: { unoptimized: true }` required for GitHub Pages
- No API routes, ISR, SSR, or server components
- Deployment target: GitHub Pages with custom domain via `CNAME`

### Project Structure
```
app/
├── layout.tsx          # Root layout: Roboto font, metadata
├── page.tsx            # Home/landing page
├── about/page.tsx      # About section
├── project/page.tsx    # Projects showcase
└── components/         # Shared UI components (flat structure)
    ├── NameTag.tsx
    ├── Navbar.tsx
    └── SectionTitle.tsx
```

## Code Style & Conventions

### TypeScript Patterns
- **Strict typing**: All components must have explicit types
- **Interface definitions**: Props interfaces defined inline above components
  ```tsx
  interface Props {
    title: string
  }
  const SectionTitle: React.FC<Props> = ({ title }) => { ... }
  ```
- **Path aliases**: `@/*` configured in `tsconfig.json` (prefer when importing from root)
- **No `any` types**: Use proper TypeScript types for all variables and function returns

### Component Architecture
- **Function components only**: Use arrow function syntax with const
  ```tsx
  const ComponentName = () => <div>...</div>
  export default ComponentName
  ```
- **No semicolons**: Consistent omission after JSX returns (see all components)
- **Fragment shorthand**: Use `<>...</>` instead of `<React.Fragment>` (see `Navbar.tsx`)
- **Single responsibility**: Each component handles one UI concern
- **No barrel exports**: Direct imports from component files


## Styling System

### Tailwind CSS Configuration
- **Design tokens**: Custom `primary` color (`#363636`) in `tailwind.config.ts`
- **Global base styles**: Dark theme (`#363636` bg, `#ffffff` text) via `@layer base` in `globals.css`
- **Typography**: Roboto font with weights 100-900, loaded via `next/font/google` in root layout

### Styling Best Practices
- **Utility-first**: Prefer Tailwind classes over custom CSS
- **Consistent spacing scale**: Use `m-24`, `p-28`, `mb-8` for large spacing
- **Flexbox layouts**: Standard pattern is `flex justify-center items-center`
- **Component-specific sizing**: Use exact dimensions like `h-[146px] w-[360px]` when design requires precision
- **Color combinations**: 
  - White on dark: `bg-slate-50 text-black` (see `NameTag.tsx`)
  - Full viewport containers: `min-h-full w-full`

### Responsive Design
- Mobile-first approach expected
- Use Tailwind responsive prefixes (`md:`, `lg:`, etc.) when adding breakpoints
- Test layouts at different viewport sizes

## Development Workflow

### Essential Commands
```bash
npm run dev    # Development server on http://localhost:3000
npm run build  # Generate static site to out/ directory
npm run lint   # ESLint check (extends next/core-web-vitals)
```

### Build Process
1. `npm run build` runs Next.js static export
2. Output goes to `out/` directory
3. `CNAME` file ensures custom domain routing on GitHub Pages
4. All pages pre-rendered at build time (no runtime generation)

### Type Safety
- TypeScript strict mode enabled in `tsconfig.json`
- Run `npm run build` to catch type errors before deployment
- No runtime type checking - ensure compile-time type safety

## Next.js Specific Guidelines

### App Router Conventions
- **Pages**: Default export component in `page.tsx` files
- **Layouts**: Shared UI in `layout.tsx` (font loading, metadata)
- **Metadata**: Use `Metadata` type from `next` for SEO configuration
- **Client components**: Use `"use client"` directive only when needed (currently all static)

### Static Export Constraints
- ❌ No `getServerSideProps`, `getStaticProps` (Pages Router APIs)
- ❌ No API routes in `app/api/`
- ❌ No Image Optimization API (must use `unoptimized: true`)
- ❌ No dynamic routes with ISR
- ✅ All routes must be determinable at build time
- ✅ External images allowed (see `about/page.tsx` using Pinimg CDN)

### Navigation
- Use native `<a href>` tags for internal links (Next.js App Router handles client-side navigation)
- Route paths: `/`, `/about`, `/project`
- No programmatic navigation currently implemented

## Clean Code Practices

### Component Design
- **Small & focused**: Each component does one thing well
- **Explicit props**: Always type component props with interfaces
- **No prop drilling**: Keep component trees shallow
- **Semantic HTML**: Use appropriate elements (`<nav>`, `<section>`, `<main>`)

### File Organization
- Flat component structure (no nested folders currently)
- Co-locate related files when components grow complex
- One component per file, matching filename to component name

### Comments & Documentation
- Code should be self-documenting with clear naming
- Add comments only for "why", not "what"
- Document complex business logic or non-obvious decisions

## Project-Specific Context

### Branding
- Site title: `<ZISARKNAR.DEV/>`
- Japanese branding: "ジサーケィナー" (phonetic: "zi sar kay nar")
- Professional identity: Software Engineer based in Tokyo, Japan
- Specialization: Web Apps, APIs, Mobile Apps

### Current State & TODOs
- ✅ Home page with NameTag component (complete)
- ✅ About page layout (needs content update from Lorem Ipsum)
- ⚠️ Navbar component built but not integrated into pages
- ⚠️ Project page is placeholder (needs project showcase implementation)
- ❌ Contact page linked but doesn't exist yet

### Key Files Reference
- `app/layout.tsx`: Site-wide configuration, font loading, metadata
- `app/components/NameTag.tsx`: Home page hero component (fixed dimensions, bilingual text)
- `app/components/Navbar.tsx`: Hamburger menu overlay (not yet integrated)
- `tailwind.config.ts`: Color palette and design tokens
- `globals.css`: Dark theme base styles

## When Making Changes

### Before Adding Code
- Verify TypeScript types compile (`npm run build`)
- Ensure compatibility with static export (no server-side dependencies)
- Check Tailwind classes are valid and follow existing spacing patterns
- Consider mobile responsiveness

### Code Quality Checklist
- [ ] Component has proper TypeScript interface for props
- [ ] No semicolons after JSX returns (maintain consistency)
- [ ] Uses Tailwind utilities (no inline styles)
- [ ] Follows arrow function + const pattern
- [ ] Accessible HTML (semantic elements, alt text on images)
- [ ] Builds successfully with `npm run build`

