import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Exclude the following from middleware:
     * 1. /login and /signup pages
     * 2. /api routes
     * 3. Next.js internals (_next/static, _next/image)
     * 4. Static files in /public (images, favicons, etc.)
     * 5. Any file ending in common image extensions (including .svg)
     */
    "/((?!login|signup|api|_next/static|_next/image|images|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)",
  ],
};
