import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  // pathname !== "/sign-up"
  if (req.auth && pathname === "/login") {
    const url = req.url.replace(req.nextUrl.pathname, "/admin");
    return NextResponse.redirect(url);
  }
  if (!req.auth && pathname !== "/login") {
    const url = req.url.replace(req.nextUrl.pathname, "/login");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/login", "/admin", "/admin(/.*)", "/api/admin(/.*)"],
  matcher: [],
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/browser.umd.js",
    "/lib/mongoConnect.ts",
    "/services/users.ts",
    "/auth.ts",
  ],
};
