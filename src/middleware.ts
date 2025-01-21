import { NextResponse } from "next/server";
import { auth } from "./service/Auth/auth";
export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const ProtectedRoute =
    nextUrl.pathname.startsWith("/chat") ||
    nextUrl.pathname.startsWith("/verify");

  const isAuthPage = nextUrl.pathname.startsWith("/api/auth");
  if (!isAuthenticated && ProtectedRoute) {
    return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
