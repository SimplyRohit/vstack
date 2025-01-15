import { NextResponse } from "next/server";
import { auth } from "@/service/auth/auth";
import { db } from "@/service/database";
import * as schema from "@/service/database/schema";
import { eq } from "drizzle-orm";

export default auth(async function middleware(req) {
  // const session = await auth();

  // const user = await db
  //   .select()
  //   .from(schema.Users)
  //   .where(eq(schema.Users.userid as string, session?.user?.id as string));
  // console.log("user", user);
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
