import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Login API Routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Not logged in API Routes
  if (pathname.startsWith("/api/")) {
    return Response.json({ message: "Unauthorised" }, { status: 401 });
  }

  // Logged in redirect to admin
  if (
    req.auth !== null &&
    (pathname === "/login" || pathname === "/sign-me-abc-up")
  ) {
    const url = req.url.replace(req.nextUrl.pathname, "/admin");
    return NextResponse.redirect(url);
  }

  // Not logged in redirect to login
  if (
    req.auth === null &&
    pathname !== "/login" &&
    pathname !== "/sign-me-abc-up"
  ) {
    const url = req.url.replace(req.nextUrl.pathname, "/login");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/sign-me-abc-up", "/login", "/admin", "/admin(/.*)", "/api(/.*)"],
  // runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/browser.umd.js",
    "/lib/mongoConnect.ts",
    "/services/users.ts",
    "/auth.ts",
  ],
};
