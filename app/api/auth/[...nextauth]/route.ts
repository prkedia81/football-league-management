import Admin from "@/model/Admin";
import connectMongo from "@/services/mongoConnect";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          await connectMongo();
          const user = await Admin.findOne({ email });

          if (!user) {
            return null;
          }

        //   const passwordsMatch = await bcrypt.compare(password, user.password);

          if (password===user.password) {
            return user;}
            else{ return null;}

        //   if (!passwordsMatch) {
        //     return null;
        //   }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  pages: {
    signIn: "/myAdminPage",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };