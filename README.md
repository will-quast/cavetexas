# Texas Speleological Association Website Rewrite

This project is a complete rewrite of [cavetexas.org](https://cavetexas.org) website. The goal is to modernizing from a Drupal-based site to a Next.js application, to simplify security updates for long
term support, and add new capabilities provided by the modern framework. The website consists of a Home page with navigation to informational pages about the organization and our activities and access to the Texas Caver Magazine online, which requires a Supabase login for members to restrict access to new editions. Members can be given the Editor role which allows them to edit the website page content.


## Repository

GitHub: [https://github.com/will-quast/cavetexas](https://github.com/will-quast/cavetexas)


## Content Management

The website uses a WYSIWYG editor-based content management system with Supabase as the backend. This approach provides:

- Easy content editing through a visual interface
- CRUD operations for content pages
- Role-based access control for editors
- Caching for improved performance
- Separation of content from presentation

### Content Structure

Content is stored in the Supabase database with the following structure:

```sql
create table pages (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users not null,
  updated_by uuid references auth.users not null
);
```

### Editor Access

To access the editor:
1. Navigate to `/editor`
2. Log in with your Supabase account
3. Your account must have editor privileges in the `members` table

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
- `/editor/` - Content editor

## Technical Requirements

### Frontend Stack

- Modernization of www.cavetexas.org from Drupal to Next.js
- Next.js 14 with TypeScript and Tailwind CSS
- WYSIWYG editor for content management
- Keep current color scheme and cave/nature imagery approach
- Modern web practices while maintaining the current visual identity

### Authentication & Authorization

- Supabase for authentication
- Protected routes using Next.js middleware
- Two authentication states (logged in/out) affecting navigation
- Members Area features:
  1. Protected PDF downloads ("Texas Caver" magazine)
  2. Password reset functionality
  3. Editor access if user has the "editor" role
  4. Logout option
- Single membership level ("member")
- Manual signup process handled by admin
- Admin functionality handled through Supabase dashboard

### Content Management

- Content managed through WYSIWYG editor
- Role-based access control for editors
- Real-time content updates
- Caching for improved performance

### Deployment

- Host: Hawk Host (existing paid hosting)
- No Vercel deployment needed

## Development Tools

- Node.js 20 with TypeScript
- Supabase Studio for database management
- PostgreSQL database
- Kong API Gateway
- ESLint and Prettier for code formatting
- Docker and Docker Compose of local development

## Development Guide

### Prerequisites

1. Install Docker Desktop & Docker Compose
2. Clone the repository:
   ```bash
   git clone https://github.com/will-quast/cavetexas.git
   cd cavetexas
   ```
3. Setup .env files for local development

### Environment Variables

The project uses different environment configurations for development and production. The environment variables are separated into different files to maintain security and proper configuration for each environment:

1. `.env.local` - Used for local development with Supabase running in Docker
2. `.env.production` - Used for production deployment with the live Supabase instance

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Service Configuration
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PUBLIC_URL=your-project-url

# Database Configuration
POSTGRES_PASSWORD=your-postgres-password
JWT_SECRET=your-jwt-secret
```

For local development, you can copy from `.env.example`:
```bash
cp .env.example .env.local
```

Note: For local development, the Supabase instance uses hardcoded keys for the anon and service roles. In production, you'll need to use the actual keys from our Supabase project settings.

### Starting the dev environment in Docker

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

### Stopping the dev environment in Docker

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


## Deploy on Hawk Host

- [Hawk Host](https://hawkhost.com)
- [Hawk Host Shared Web Hosting](https://www.hawkhost.com/shared-web-hosting/)
- [How to Create a Node.JS Application](https://my.hawkhost.com/knowledgebase/230/How-to-Create-a-Node.JS-Application.html)
- [How I Deploy a Next.js App to a CPANEL Web Host](https://medium.com/@dalem.krisnayana/how-i-deploy-a-next-js-app-to-a-cpanel-web-host-3e23b5abacef#:~:text=Uploading%20the%20project%20files%20to,Extracted%20the%20project%20zip%20file.)

## License

This project is licensed under the MIT License

## Project Status

### Completed

- ✅ Project initialization with Next.js 14, TypeScript, and Tailwind CSS
- ✅ Development environment setup with docker-compose
- ✅ Navigation component with mobile responsiveness
- ✅ Basic route structure
- ✅ Content management system with WYSIWYG editor


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

## Next Steps

1. ✅ Initialize Next.js project with TypeScript and Tailwind
2. ✅ Set up project structure
3. ✅ Docker Compose setup with Supabase
4. 🔄 WYSIWYG editor for public page content
5. ⏳ Set up authentication with Supabase
6. ⏳ Create members area page
7. ⏳ Create members only PDF management and viewing pages (Texas Caver Magazine)
8. ⏳ Create calendar page
9. ⏳ Improve theme and styling
8. ⏳ Deploy to production