import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile", "/upload"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Check for session token
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    "";

  // If user is logged in (has session token)
  if (sessionToken) {
    // Redirect from login/register pages to home if already authenticated
    if (isPublicRoute) {
      console.log("User is logged in, redirecting from", path, "to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If user is not logged in (no session token)
    // Redirect from protected routes to login if not authenticated
    if (isProtectedRoute) {
      console.log("User not logged in, redirecting from", path, "to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"]
}; 