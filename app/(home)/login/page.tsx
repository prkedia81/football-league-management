import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const Login = () => {
  // const { toast } = useToast();

  const handleSubmit = async (e: FormData) => {
    "use server";
    const email = e.get("email");
    const password = e.get("password");
    try {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resp) {
        redirect("/admin");
      }
    } catch (error) {
      // toast({
      //   description:
      //     "There was some error! Enter correct username and password.",
      // });
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Authorized personnel Only!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={handleSubmit} className="grid gap-2">
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
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
