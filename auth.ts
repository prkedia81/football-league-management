import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./services/users";
import { ZodError } from "zod";
import { signInSchema } from "./lib/signInSchema";
import bcrypt from "bcryptjs";
import { Account, User as AuthUser } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to verify if user exists
          user = await getUserFromDb(email);

          if (!user) {
            throw new Error("User not found.");
          }

          const checkPassword = bcrypt.compareSync(password, user.password);

          if (!checkPassword) throw new Error("Incorrect Password.");

          return user;
        } catch (error) {
          if (error instanceof Error) {
            if (error instanceof ZodError) {
              return null;
            }
            throw new Error(error.message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }) {
      if (account?.provider == "credentials") {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  pages: {
    signIn: "/login",
  },
  trustHost: false,
});
