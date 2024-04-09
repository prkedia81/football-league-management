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
import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"

interface Props {
  props: any;
}

const Login : NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ name: "", password: "" });
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
   try{
    const res = await signIn("credentials", {
      name: userInfo.name,
      password: userInfo.password,
      redirect: false,
    });

    if(res?.error){
      alert("Invalid credentials");
    }
    else{
    router.replace("/myAdminPage");
    }
    console.log(res);//just to see if im logging in
  }catch(err){
    console.error(err);
  }
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Authorized personnel Only!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
        <label className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                  <input
                  value={userInfo.name}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, name: target.value })
                  }
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
        </div>
        <div className="grid gap-2">
        <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Sign in</Button>
      </CardFooter>
    </Card>
    </div>
    </form>
  )
}
export default Login

//TODO:Re-directed to login if not logged in