# Texas Speleological Association Website Rewrite

This project is a complete rewrite of [cavetexas.org](https://cavetexas.org), modernizing it from a Drupal-based site to a Next.js application.

## Repository

GitHub: [https://github.com/will-quast/cavetexas](https://github.com/will-quast/cavetexas)

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
- ✅ Authentication setup with Supabase
  - ✅ Supabase project created
  - ✅ Environment variables configured
  - ✅ Authentication middleware implemented
  - ✅ Login/Register UI implementation
  - ✅ Protected routes testing
  - ✅ Member database integration

### Pending

- ⏳ Protected routes for members area
  - ✅ Basic member profile display
  - 🔄 Member profile management
  - ⏳ Password reset functionality
  - ⏳ Session management
- ⏳ PDF management system
- ⏳ Calendar integration
- ⏳ Deployment configuration

## Content Management

The website uses a file-based content management system using Markdown files with dynamic routing. This approach provides:

- Simple content editing through standard Markdown files
- Version control through Git
- Easy collaboration for content contributors
- Separation of content from presentation
- Automatic route generation from markdown files

### Content Structure

```
src/content/
├── pages/           # Static page content (auto-routed)
│   ├── about.md     # -> /about
│   ├── join-tsa.md  # -> /join-tsa
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

### Dynamic Routing

The site uses Next.js dynamic routing to automatically generate pages from markdown files:

- Files in `src/content/pages/` are automatically routed to their corresponding URLs
- For example, `about.md` becomes `/about`
- Special routes like `/members` are handled separately with custom React components
- SEO metadata is automatically generated from frontmatter
- 404 handling is built in for non-existent routes

### Adding New Content

1. Create a new `.md` file in the appropriate content directory
2. Include required frontmatter (title, description)
3. Write content using standard Markdown syntax
4. The page will be automatically available at its corresponding route

## Authentication

The website uses Supabase for authentication and user management. This provides:

- Secure email/password authentication
- Protected routes for members area
- Session management with cookies
- Password reset functionality
- Admin dashboard for user management

### Authentication Flow

1. Users visit the login/register page
2. Enter credentials or register new account
3. Supabase handles authentication
4. Session cookie is set
5. Protected routes check session status
6. Unauthenticated users are redirected to login

### Protected Routes

The following routes require authentication:

- `/members/*` - Members area and related pages
- `/texas-caver-magazines/*` - Protected PDF downloads
- `/profile/*` - User profile management

### Environment Variables

Required environment variables for authentication:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

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

- Modernization of www.cavetexas.org from Drupal to Next.js
- Next.js 14 with TypeScript and Tailwind CSS
- Content and routing from Markdown files for easy editing
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

- Public content pages are sourced from Markdown files
- No headless CMS needed, content managed through GitHub commits
- Members only PDF files (20-30 files) will be stored on a CDN
- Members only PDF metadata in frontmatter in Markdown files

### Deployment

- Host: Hawk Host (existing paid hosting)
- No Vercel deployment needed

## Development Setup

The project uses Docker Compose for the development environment, providing a consistent setup across different operating systems. The setup includes:

- Node.js 20 with TypeScript
- Supabase Studio for database management
- PostgreSQL database
- Kong API Gateway
- ESLint and Prettier for code formatting

### Prerequisites

1. Install Docker Desktop
2. Install Docker Compose (included with Docker Desktop)
3. Clone the repository:
   ```bash
   git clone https://github.com/will-quast/cavetexas.git
   cd cavetexas
   ```

### Environment Configuration

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your secure values:
   ```env
   POSTGRES_PASSWORD=your-secure-password
   JWT_SECRET=your-secure-jwt-token
   ANON_KEY=your-anon-key
   SERVICE_ROLE_KEY=your-service-role-key
   SUPABASE_PUBLIC_URL=http://localhost:8000
   ```

### Starting the Development Environment

1. Build and start all services:
   ```bash
   docker-compose up -d
   ```

2. Access the development container:
   ```bash
   docker-compose exec app bash
   ```

3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

4. Access the services:
   - Next.js app: http://localhost:3000
   - Supabase Studio: http://localhost:8000
   - PostgreSQL: localhost:5432

### Development Workflow

1. Make changes to your code in your preferred editor
2. The Next.js development server will automatically reload
3. Access Supabase Studio at http://localhost:8000 to manage your database
4. View logs:
   ```bash
   docker-compose logs -f
   ```

### Stopping the Development Environment

1. Stop all services:
   ```bash
   docker-compose down
   ```

2. To remove volumes (database data):
   ```bash
   docker-compose down -v
   ```

### Troubleshooting

1. If services fail to start:
   ```bash
   # Check service status
   docker-compose ps
   
   # View service logs
   docker-compose logs [service-name]
   ```

2. If you need to rebuild:
   ```bash
   docker-compose up -d --build
   ```

3. For database issues:
   ```bash
   # Access PostgreSQL
   docker-compose exec db psql -U postgres
   ```

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

## Database Structure

The application uses Supabase as the backend, providing both authentication and database services.

### Authentication

Managed by Supabase Auth with email/password authentication. User data is stored in the `auth.users` table.

### Database Tables

#### members

Stores TSA membership information linked to authenticated users.

| Column     | Type                    | Description                      |
| ---------- | ----------------------- | -------------------------------- |
| id         | bigint                  | Primary key                      |
| user_id    | uuid                    | Foreign key to auth.users.id     |
| created_at | timestamp with timezone | Membership creation timestamp    |
| status     | varchar                 | Member status (member/nonmember) |
| expires    | date                    | Membership expiration date       |

#### Relationships

- `members.user_id` → `auth.users.id`: Links membership records to authenticated users

### Security

- Row Level Security (RLS) policies ensure users can only access their own data
- Authentication required for all member-related operations
- Server-side validation of user sessions and permissions

## Database Schema Management

The project uses Supabase CLI for database schema management and type generation.

### Schema Location

```
src/db/
├── types/
│   └── supabase.ts    # Auto-generated TypeScript types
└── migrations/        # Database migration files
```

### Schema Management Commands

```bash
# Generate TypeScript types from database
npx supabase gen types typescript > src/db/types/supabase.ts

# Pull latest database schema
npx supabase db pull

# View schema changes
npx supabase db diff
```

### Keeping Schemas in Sync

1. After making database changes in Supabase Studio:

   ```bash
   # Pull the latest schema
   npx supabase db pull

   # Update TypeScript types
   npx supabase gen types typescript > src/db/types/supabase.ts
   ```

2. Review the changes:

   ```bash
   npx supabase db diff
   ```

3. Commit the updated schema files

### Using Generated Types

```typescript
import { Database } from "@/db/types/supabase";
type Tables = Database["public"]["Tables"];

// Type-safe database query
const { data } = await supabase.from<Tables["members"]>("members").select("*");
```
