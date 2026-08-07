import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authClient } from './lib/auth-client';


export async function proxy(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const { data: session } = await authClient.getSession()
  // const user = session?.user as any;
  // const role = user?.role;

  // if (!role) {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  // if (pathname.startsWith('/dashboard/store') && role !== 'store') {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  // if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  return NextResponse.next();

}

export const config = {
  matcher: [ '/dashboard:path*'],
};
