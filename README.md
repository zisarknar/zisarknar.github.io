# ZISARKNAR Portfolio

Personal portfolio website showcasing professional work, built with modern web technologies and deployed to [zisarknar.dev](https://zisarknar.dev).

## About

Full Stack & Mobile Engineer from Myanmar, specializing in building scalable web applications, mobile apps, and APIs. This portfolio features a minimal, clean design with smooth transitions and interactive elements.

## Tech Stack

- **Next.js 14** - React framework with App Router and static export
- **TypeScript 5** - Type-safe development with strict mode
- **Tailwind CSS 3** - Utility-first styling with custom design tokens
- **React 18** - Modern functional components with hooks

## Features

- 🎨 Minimal, clean design with grayscale aesthetics
- 🌊 Smooth page transitions with fade-in effects
- 📱 Fully responsive across all devices
- 🔝 Fixed navigation with scroll-aware frosted glass effect
- 🎯 Active route highlighting in navigation
- 📍 Breadcrumb navigation for better UX
- 🔗 Social sidebar with GitHub, LinkedIn, and Email links
- ⚡ Optimized for performance with static export

## Project Structure

```
app/
├── layout.tsx              # Root layout with font loading
├── page.tsx                # Home/landing page
├── about/page.tsx          # About section with work history
├── hobbies/page.tsx        # Personal interests (hiking, gym)
└── components/             # Reusable UI components
    ├── Breadcrumb.tsx      # Navigation breadcrumb
    ├── Footer.tsx          # Site footer
    ├── PageTransition.tsx  # Smooth page transitions
    ├── SocialSidebar.tsx   # Fixed social links
    └── TopNav.tsx          # Fixed navigation bar
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/zisarknar/zisarknar-portfolio.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Build & Export

```bash
# Generate static site
npm run build

# Output will be in out/ directory
```

## Development

- **Hot Reload**: Pages auto-update as you edit files
- **Type Checking**: Run `npm run build` to catch TypeScript errors
- **Linting**: ESLint configured with Next.js rules

## Deployment

This is a static-first Next.js application configured for GitHub Pages:

- Build output: `out/` directory
- Custom domain: Configured via `CNAME` file
- No server-side runtime required

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
# Push the out/ directory to gh-pages branch
```

## Key Design Decisions

### Static Export
- `output: "export"` in next.config.js for static HTML generation
- No API routes, ISR, or SSR dependencies
- `images: { unoptimized: true }` for GitHub Pages compatibility

### Styling Approach
- Utility-first with Tailwind CSS
- Custom `primary` color (#363636) in tailwind.config.ts
- Dark theme with white text on dark backgrounds
- Consistent spacing scale (m-24, p-28, mb-8)

### Component Architecture
- Function components only with TypeScript interfaces
- Client components (`'use client'`) only when needed for interactivity
- Server components by default for better performance
- Reusable components for footer, navigation, and social links

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## License

MIT License - feel free to use this as inspiration for your own portfolio.

## Contact

- Email: [zisarknar.me@gmail.com](mailto:zisarknar.me@gmail.com)
- GitHub: [@zisarknar](https://github.com/zisarknar)
- LinkedIn: [zisarknar](https://linkedin.com/in/zisarknar)

---

Built with ❤️ using Next.js and TypeScript
