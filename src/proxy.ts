import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const isPublic = pathname === '/' || pathname.startsWith('/blog') || pathname === '/faq' || pathname === '/login' || pathname === '/signup';
  if (isPublic) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
  }

  if (pathname.startsWith('/admin')) {
    const role = request.cookies.get('userRole')?.value;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] };