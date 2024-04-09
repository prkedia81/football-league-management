'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, FormEventHandler } from "react"
import { useRouter } from "next/navigation";

export default function Register() {   //probably the super admin will have access to this page
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/adminExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        alert("Account already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.currentTarget;
        form.reset();
        router.push("/login");
      } else {
        alert("registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Authorized personnel Only! You are generating a new admin account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <label className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                  <input
                  onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="someone@example.com"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
        </div>
        <div className="grid gap-2">
        <label className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                  <input
                  onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Your Name goes here"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
        </div>
        <div className="grid gap-2">
        <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                 {/* shoot error messages here if you want, or use alert. */}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Register</Button>
      </CardFooter>
    </Card>
    </div>
    </form>
  )
}