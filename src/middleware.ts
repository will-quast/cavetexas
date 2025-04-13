import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/editor')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user is an editor
    const { data: member } = await supabase
      .from('members')
      .select('editor')
      .eq('user_id', session.user.id)
      .single();

    if (!member?.editor) {
      return NextResponse.redirect(new URL('/members', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
