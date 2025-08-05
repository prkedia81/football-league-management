import Sidebar from "@/components/admin/Sidebar";
import LoadingState from "./loading";
import { Suspense } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Sidebar>
        <div className="flex flex-col min-h-screen">
          <div className="my-2 flex-grow">{children}</div>
          <footer className="text-base text-gray-300 bg-black py-3 text-center">
            Developed by Jadavpur University (Institution&apos;s Innovation Council). Developer -{" "}
            <Link href="https://www.linkedin.com/in/prannay-kedia">Prannay Kedia</Link>,
            <Link href="https://www.linkedin.com/in/kumarpiyushgupta"> Piyush Gupta</Link>
          </footer>
        </div>
      </Sidebar>
    </Suspense>
  );
}