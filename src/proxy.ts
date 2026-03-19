import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./service/Auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { nextUrl } = request;
  const isProtectedRoute =
    nextUrl.pathname.startsWith("/chat") ||
    nextUrl.pathname.startsWith("/verify") ||
    nextUrl.pathname.startsWith("/dashboard");

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
