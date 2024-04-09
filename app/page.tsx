import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Calcutta Football League
        </p>
        <Link href="/login"><Button>Log In</Button></Link>
    </div>
    <br/>
        <p> Changed the home page. I used simple <code>alert();</code>for displaying errors, it is quite loosely bound, would fix later</p>
        <p> Changed models/admin.ts commented feature(admin or super admin)</p>
        <p> Changed layout.tsx and added features for children to pass through SessionProvider in providers.tsx</p>
        <p> Added api/adminExists, register verification</p>
        <p> Changed models/admin.ts (admin or super admin)</p>
        <p> Added a NEXTAUTH secret (can be anything now)</p>
        <p> Added Middleware.ts: Now you can protect any route by providing path into it, myAdminPage is a dummy route now</p>
        <a href="https://www.youtube.com/watch?v=PEMfsqZ2-As">Click Here for Youtube Refernence (in javascript)</a>
    </main>
  );
}
