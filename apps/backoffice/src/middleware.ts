// middleware.js
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get('isAuth')

  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/';

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*'],
};
