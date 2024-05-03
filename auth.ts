import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./services/users";
import { ZodError, boolean } from "zod";
import { signInSchema } from "./lib/signInSchema";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
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
          // user = await getUserFromDb(email);

          if (!user) {
            throw new Error("User not found.");
          }

          const checkPassword = bcrypt.compareSync(password, user.password);

          if (!checkPassword) throw new Error("Incorrect Password.");

          return user;
        } catch (error) {
          console.log(error);
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
