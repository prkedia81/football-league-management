import Sidebar from "@/components/admin/Sidebar";
import LoadingState from "./loading";
import { Suspense } from "react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Sidebar>
        <div className="flex flex-col min-h-screen">
          <div className="my-2 flex-grow">{children}</div>
          <footer className="text-xs text-gray-400 py-3 text-center">
            Developed by Jadavpur University (Institution's Innovation Council).
            Developer -{" "}
            <Link href="www.linkedin.com/in/prannay-kedia">Prannay Kedia</Link>
          </footer>
        </div>
      </Sidebar>
    </Suspense>
  );
}
