import { signUpUser } from "@/services/users";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/signInSchema";
import { ZodError } from "zod";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Authorized personnel Only!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form
          action={async (data) => {
            "use server";
            await signUp(data);
          }}
          className="grid gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}

async function signUp(formData: FormData) {
  "use server";
  try {
    const SALT_ROUNDS = 10;
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { name, email, password } = await signUpSchema.parseAsync(data);
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = await signUpUser(name, email, hash);
    if (newUser) {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/login",
      });
      console.log(resp);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return null;
    }
    return null;
  }
}
