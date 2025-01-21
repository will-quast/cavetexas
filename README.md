# Texas Speleological Association Website Rewrite

This project is a complete rewrite of [cavetexas.org](https://cavetexas.org), modernizing it from a Drupal-based site to a Next.js application.

## Project Status

### Completed

- ✅ Project initialization with Next.js 14, TypeScript, and Tailwind CSS
- ✅ Development environment setup with devcontainer
- ✅ Navigation component with mobile responsiveness
- ✅ Basic route structure
- ✅ Content management system with Markdown
- ✅ Initial pages created:
  - About TSA
  - Join TSA (Membership)
  - Texas Grottos

### In Progress

- 🔄 Content migration
- 🔄 Route implementation
- 🔄 Authentication setup

### Pending

- ⏳ Supabase integration
- ⏳ Protected routes for members area
- ⏳ PDF management system
- ⏳ Calendar integration
- ⏳ Deployment configuration

## Content Management

The website uses a file-based content management system using Markdown files. This approach provides:

- Simple content editing through standard Markdown files
- Version control through Git
- Easy collaboration for content contributors
- Separation of content from presentation

### Content Structure

```
src/content/
├── pages/           # Static page content
│   ├── about.md
│   ├── join-tsa.md
│   └── ...
├── events/          # Event-related content
│   ├── convention.md
│   ├── tcr.md
│   └── ...
└── projects/        # Project-related content
    ├── cbsp.md
    ├── gcsna.md
    └── ...
```

### Markdown File Format

Each content file follows this structure:

```markdown
---
title: Page Title
description: SEO description
[additional frontmatter fields as needed]
---

# Main Content

Regular markdown content goes here...
```

### Adding New Content

1. Create a new `.md` file in the appropriate content directory
2. Include required frontmatter (title, description)
3. Write content using standard Markdown syntax
4. Content will be automatically processed and displayed on the site

## Authentication States

The website has two main authentication states:

### Logged Out

- Public access to all non-member content
- Navigation shows "Login/Register" button
- Attempting to access member content redirects to login

### Logged In

- Full access to member content
- Navigation shows "Members Area" button
- Access to protected PDF downloads
- Access to member-only features. ex password reset

## Route Structure

```
/ (Home)
├── /join-tsa (Become A TSA Member)
├── /texas-grottos (Find Your Local Grotto)
├── /calendar (Calendar)
├── /about (About TSA)
├── /tsa-officers (Officers)
├── /texas-caver-magazines-archive (The Texas Caver Magazine)
├── /convention (Spring Convention)
├── /tcr (Texas Caver's Reunion)
├── /cave-rescue (Cave Rescue)
├── /cbsp (Colorado Bend State Park Project)
├── /gcsna (Government Canyon SNA Project)
├── /login (Login/Register Page)
├── /members (Protected Members Area)
└── External Links
    └── https://hall.cavetexas.org/ (The Hall of Texas and Mexico Cavers)
```

## Technical Requirements

### Frontend Stack

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Keep current color scheme and cave/nature imagery approach
- Modern web practices while maintaining the current visual identity

### Authentication & Authorization

- Supabase for authentication
- Protected routes using Next.js middleware
- Two authentication states (logged in/out) affecting navigation
- Members Area features:
  1. Protected PDF downloads ("Texas Caver" magazine)
  2. Password reset functionality
  3. Logout option
- Single membership level ("member")
- Manual signup process handled by admin
- Admin functionality handled through Supabase dashboard

### Content Management

- Content to be managed through Markdown files committed to GitHub
- No headless CMS needed
- PDF documents (20-30 files) will be stored on a CDN
- PDF list will be managed through markdown files

### Deployment

- Host: Hawk Host (existing paid hosting)
- No Vercel deployment needed

## Development Setup

- Development environment configured with devcontainer
- Node.js 20 with TypeScript
- ESLint and Prettier for code formatting
- VS Code extensions for development included in devcontainer

## Getting Started

1. Open this project in VS Code with Dev Containers extension
2. Allow VS Code to reopen in container
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Next Steps

1. ✅ Initialize Next.js project with TypeScript and Tailwind
2. ✅ Set up project structure
3. ✅ Begin implementing public pages
4. 🔄 Complete remaining routes
5. ⏳ Set up authentication with Supabase
6. ⏳ Implement members area
7. ⏳ Configure PDF management
8. ⏳ Deploy to production

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Hawk Host

- [Hawk Host](https://hawkhost.com)
- [Hawk Host Shared Web Hosting](https://www.hawkhost.com/shared-web-hosting/)
- [How to Create a Node.JS Application](https://my.hawkhost.com/knowledgebase/230/How-to-Create-a-Node.JS-Application.html)
- [How I Deploy a Next.js App to a CPANEL Web Host](https://medium.com/@dalem.krisnayana/how-i-deploy-a-next-js-app-to-a-cpanel-web-host-3e23b5abacef#:~:text=Uploading%20the%20project%20files%20to,Extracted%20the%20project%20zip%20file.)
