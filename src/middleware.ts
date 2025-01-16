import { NextResponse } from "next/server";
import { auth } from "@/service/auth/auth";

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  console.log("isAuthenticated", isAuthenticated);
  const isAuthPage = nextUrl.pathname.startsWith("/api/auth");
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
