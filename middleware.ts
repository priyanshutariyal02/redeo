import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // public
        if (pathname.startsWith("/") || pathname === "/api/videos") {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: ["'/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
};
