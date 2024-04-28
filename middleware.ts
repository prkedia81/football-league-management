// import NextAuth from "next-auth";
// import { authConfig } from "./auth";

// export default NextAuth(authConfig).auth;
export default function middleware() {}

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  //   matcher: ["^admin/.*$", "^api/admin/.*$"],
  matcher: ["/admin"],
};
